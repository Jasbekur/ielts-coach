"use client";

import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";
import { useTestMode } from "@/contexts/TestModeContext";
import { ArrowLeft } from "lucide-react";

const PRACTICE_PATHS = ["/listening", "/reading", "/writing", "/speaking"];

export function AppContent({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isPractice = PRACTICE_PATHS.some(p => pathname.startsWith(p));
  const { isTestActive, setTestActive } = useTestMode();

  function handleExit() {
    setTestActive(false);
    router.back();
  }

  return (
    <main className={`flex-1 pb-24 md:pb-0 ${isTestActive ? "" : "md:ml-64"}`}>
      {/* Exit bar — shown only during active test */}
      {isTestActive && (
        <div
          className="fixed top-0 left-0 right-0 z-50 flex items-center px-4 h-11"
          style={{
            background: "linear-gradient(180deg, #0d1117 0%, #111827 100%)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <button
            onClick={handleExit}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-150"
            style={{ color: "rgba(255,255,255,0.7)" }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
              (e.currentTarget as HTMLElement).style.color = "#ffffff";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)";
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            Exit
          </button>
        </div>
      )}

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

      <div
        className={`relative z-10 ${isTestActive ? "pt-11" : ""} ${
          isPractice ? "" : "max-w-3xl mx-auto px-4 py-7 md:px-8"
        }`}
      >
        {children}
      </div>
    </main>
  );
}
