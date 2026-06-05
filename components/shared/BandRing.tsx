"use client";

/**
 * BandRing — animated SVG circular progress ring for a band score out of 9.0.
 *
 * Design notes:
 *  • The SVG is rotated -90° so the arc starts at 12 o'clock.
 *  • stroke-dashoffset is set to C (full empty) on the SVG attribute, then
 *    a single RAF loop drives both the ring fill AND the centre numeral in
 *    lock-step — one animation, zero jank.
 *  • Band colour thresholds intentionally mirror getBandColor() in
 *    types/ielts.ts: <5 red, <7 amber, <8.5 emerald, ≥8.5 violet.
 *  • prefers-reduced-motion: snaps straight to the final state.
 *  • The centre text lives in an absolute overlay div (not inside the SVG)
 *    so it stays upright despite the -90° rotation on the <svg> element.
 */

import { useEffect, useRef, useState } from "react";

// ── Ring geometry ─────────────────────────────────────────────────────────────
const MAX_BAND = 9.0;
const SIZE     = 72;          // overall SVG canvas (px)
const STROKE   = 5;           // ring thickness (px)
const R        = (SIZE - STROKE) / 2;      // 33.5 px — circle radius
const C        = 2 * Math.PI * R;          // ≈ 210.49 px — full circumference

// ── Helpers ───────────────────────────────────────────────────────────────────
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/** OKLCH stroke colours matched to Tailwind's colour palette */
function ringStroke(band: number): string {
  if (band < 5)   return "oklch(0.628 0.258 29.2)";   // red-500
  if (band < 7)   return "oklch(0.769 0.189 70.1)";   // amber-500
  if (band < 8.5) return "oklch(0.627 0.194 149.6)";  // green-600
  return                  "oklch(0.527 0.194 149.6)";  // green-700
}

/** Track glow colour — softer, lower chroma */
function ringGlow(band: number): string {
  if (band < 5)   return "oklch(0.628 0.258 29.2  / 25%)";
  if (band < 7)   return "oklch(0.769 0.189 70.1  / 25%)";
  if (band < 8.5) return "oklch(0.627 0.194 149.6 / 25%)";
  return                  "oklch(0.527 0.194 149.6 / 25%)";
}

/** Tailwind text class for the centre numeral */
function numClass(band: number): string {
  if (band < 5)   return "text-red-500";
  if (band < 7)   return "text-amber-500";
  if (band < 8.5) return "text-green-600";
  return                  "text-green-700";
}

// ── Component ─────────────────────────────────────────────────────────────────
interface BandRingProps {
  /** Rounded IELTS band score (0.5 increments). Pass null when no data. */
  band: number | null;
  /** Animation duration in ms. Default 1400. */
  duration?: number;
}

export function BandRing({ band, duration = 1400 }: BandRingProps) {
  const circleRef = useRef<SVGCircleElement>(null);
  const rafRef    = useRef<number | null>(null);
  const startRef  = useRef<number | null>(null);
  const [display, setDisplay] = useState("—");

  const targetPct    = band != null ? Math.min(band / MAX_BAND, 1) : 0;
  const targetOffset = C * (1 - targetPct);

  useEffect(() => {
    const circle = circleRef.current;
    if (band == null || !circle) return;

    // ── Reduced-motion: snap to final ─────────────────────────────────────
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      circle.style.strokeDashoffset = String(targetOffset);
      setDisplay(band.toFixed(1));
      return;
    }

    // ── Animated path ─────────────────────────────────────────────────────
    circle.style.strokeDashoffset = String(C); // reset to empty before loop
    setDisplay("0.0");
    startRef.current = null;

    function tick(ts: number) {
      if (startRef.current === null) startRef.current = ts;
      const elapsed  = ts - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = easeOutCubic(progress);

      // Drive both ring and number from the same eased value
      circle!.style.strokeDashoffset = String(C - eased * targetPct * C);
      setDisplay((eased * band!).toFixed(1));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // Clamp to exact final values to eliminate float drift
        circle!.style.strokeDashoffset = String(targetOffset);
        setDisplay(band!.toFixed(1));
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [band, duration, targetOffset, targetPct]);

  const stroke   = band != null ? ringStroke(band) : "currentColor";
  const textCls  = band != null ? numClass(band)   : "text-muted-foreground";

  return (
    <div
      className="relative inline-flex items-center justify-center"
      role="img"
      aria-label={band != null ? `Band ${band.toFixed(1)} out of 9.0` : "No score yet"}
    >
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        aria-hidden="true"
        /* Rotated so the arc begins at 12 o'clock */
        style={{ transform: "rotate(-90deg)" }}
      >
        {/* ── Track ring — muted backdrop ──────────────────────────────── */}
        <circle
          cx={SIZE / 2} cy={SIZE / 2} r={R}
          fill="none"
          stroke="currentColor"
          strokeWidth={STROKE}
          strokeDasharray={C}
          strokeDashoffset={0}
          strokeLinecap="round"
          className="text-muted-foreground/12"
        />

        {/* ── Progress ring — RAF drives strokeDashoffset ──────────────── */}
        <circle
          ref={circleRef}
          cx={SIZE / 2} cy={SIZE / 2} r={R}
          fill="none"
          stroke={stroke}
          strokeWidth={STROKE}
          strokeDasharray={C}
          /* Starts fully empty — overwritten by the RAF loop on the client */
          strokeDashoffset={C}
          strokeLinecap="round"
          style={{
            /* Soft glow behind the stroke — appears after animation settles */
            filter: band != null
              ? `drop-shadow(0 0 4px ${ringGlow(band)})`
              : "none",
          }}
        />
      </svg>

      {/* ── Centre text overlay — NOT inside the <svg> so it stays upright ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className={`text-lg font-mono font-bold leading-none tracking-nums ${textCls}`}>
          {display}
        </span>
        <span className="text-[9px] leading-none text-muted-foreground/60 mt-[3px]">
          / 9.0
        </span>
      </div>
    </div>
  );
}
