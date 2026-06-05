"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const EXAM_PATHS = ["/listening", "/reading", "/writing", "/speaking"];

export function AppContent({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isExam = EXAM_PATHS.some(p => pathname.startsWith(p));

  return (
    <main className={`flex-1 pb-24 md:pb-0 ${isExam ? "" : "md:ml-64"}`}>
      {!isExam && (
        <div
          className="fixed inset-0 md:left-64 pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 60% -10%, rgba(5,150,105,0.04), transparent)",
          }}
        />
      )}
      <div className={`relative z-10 ${isExam ? "" : "max-w-3xl mx-auto px-4 py-7 md:px-8"}`}>
        {children}
      </div>
    </main>
  );
}
