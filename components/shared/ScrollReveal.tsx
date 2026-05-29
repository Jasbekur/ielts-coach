"use client";

/**
 * ScrollReveal — wraps any server-rendered content with an IntersectionObserver
 * that fades it up when it enters the viewport.
 *
 * Design notes:
 *  • Starts opacity:0 / translateY(20px) set as *inline styles* (not a CSS class)
 *    so the values are present on the first SSR render, preventing a flash of
 *    visible → hidden → revealed on hydration.
 *  • Uses `will-change: transform, opacity` to keep the animation on the GPU
 *    compositor layer; cleaned up after the reveal fires to free the layer.
 *  • Respects `prefers-reduced-motion`: skips the animation entirely and shows
 *    the content immediately.
 *  • `delay` is applied via setTimeout *after* the IntersectionObserver fires,
 *    allowing sibling elements that enter the viewport together to stagger.
 */

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: React.ReactNode;
  /** Extra className forwarded to the wrapper div (e.g. "h-full") */
  className?: string;
  /**
   * Stagger delay in ms.  Applied after intersection fires so that siblings
   * entering the viewport simultaneously still cascade.
   */
  delay?: number;
}

export function ScrollReveal({ children, className, delay = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // ── Honour the user's motion preference ───────────────────────────────
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.opacity = "1";
      el.style.transform = "none";
      el.style.willChange = "auto";
      return;
    }

    // ── IntersectionObserver: threshold 0.2 = 20% of element visible ──────
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const timer = setTimeout(() => {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";

          // Release the compositor layer once the animation settles
          const cleanup = setTimeout(() => {
            el.style.willChange = "auto";
          }, 170); // slightly after 150ms transition ends

          return () => clearTimeout(cleanup);
        }, delay);

        // Only animate once — unobserve immediately after firing
        observer.unobserve(el);
        return () => clearTimeout(timer);
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        opacity: 0,
        transform: "translateY(6px)",
        transition: "opacity 150ms ease-out, transform 150ms ease-out",
        willChange: "transform, opacity",
      }}
    >
      {children}
    </div>
  );
}
