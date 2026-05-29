"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  /** Target value to count up to */
  to: number;
  /** Decimal places shown (0 for integers, 1 for band scores) */
  decimals?: number;
  /** Total animation duration in ms */
  duration?: number;
  /** Optional className forwarded to the wrapping <span> */
  className?: string;
  /** Optional text appended after the number (e.g. "%") */
  suffix?: string;
}

/** Cubic ease-out: fast start, decelerates to a stop */
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Counts a number from 0 to `to` over `duration` ms using a cubic ease-out
 * curve driven by requestAnimationFrame.  Renders server-side as "0" (or the
 * formatted zero) so there is no hydration mismatch.
 */
export function CountUp({
  to,
  decimals = 0,
  duration = 1200,
  className,
  suffix = "",
}: CountUpProps) {
  const [display, setDisplay] = useState(
    decimals > 0 ? (0).toFixed(decimals) : "0"
  );
  const rafRef   = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    // Reset if `to` changes (e.g. data refresh)
    startRef.current = null;

    function tick(timestamp: number) {
      if (startRef.current === null) startRef.current = timestamp;

      const elapsed  = timestamp - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const value    = easeOutCubic(progress) * to;

      setDisplay(
        decimals > 0 ? value.toFixed(decimals) : String(Math.round(value))
      );

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // Guarantee exact landing value — no floating-point drift
        setDisplay(decimals > 0 ? to.toFixed(decimals) : String(Math.round(to)));
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [to, decimals, duration]);

  return (
    <span className={className}>
      {display}{suffix}
    </span>
  );
}
