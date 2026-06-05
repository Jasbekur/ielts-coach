"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

// Practice pages manage their own max-width / padding (860px wrappers).
// All other pages (dashboard, history, admin) use the standard constrained layout.
const PRACTICE_PATHS = ["/listening", "/reading", "/writing", "/speaking"];

export function AppContent({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isPractice = PRACTICE_PATHS.some(p => pathname.startsWith(p));

  return (
    <main className="flex-1 md:ml-64 pb-24 md:pb-0">
      {/* Subtle gradient — only on non-practice pages */}
      {!isPractice && (
        <div
          className="fixed inset-0 md:left-64 pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 60% -10%, rgba(22,163,74,0.04), transparent)",
          }}
        />
      )}
      {/* Practice pages: no padding/max-width constraint — they handle their own layout */}
      {/* Other pages: standard constrained layout with padding */}
      <div className={`relative z-10 ${isPractice ? "" : "max-w-3xl mx-auto px-4 py-7 md:px-8"}`}>
        {children}
      </div>
    </main>
  );
}
