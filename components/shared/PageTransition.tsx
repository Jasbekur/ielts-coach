"use client";

/**
 * PageTransition — pure-CSS fade-in on every route change.
 *
 * Why CSS instead of JS state:
 *   The old approach kept OLD content visible for 40 ms (JS setTimeout fade-out)
 *   THEN swapped + faded in — adding a mandatory ~100 ms delay on top of whatever
 *   the network took.  With key={pathname}, React remounts this div the instant
 *   the new page arrives, which resets the CSS animation automatically.
 *   Zero JS timers, zero forced delay — the new page appears as fast as Next.js
 *   can deliver it, with only a subtle 80 ms opacity fade-in.
 */

import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  );
}
