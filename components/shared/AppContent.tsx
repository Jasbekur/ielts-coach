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
    <main
      className={`flex-1 pb-24 md:pb-0 ${isTestActive ? "" : "md:ml-64"}`}
      style={{ background: "#fafafa", minHeight: "100vh" }}
    >
      {/* Exit bar — light theme, shown during active test */}
      {isTestActive && (
        <div
          className="fixed top-0 left-0 right-0 z-50 flex items-center px-5 h-11"
          style={{ background: "#ffffff", borderBottom: "1px solid #efe4e2" }}
        >
          <button
            onClick={handleExit}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-150"
            style={{ color: "#737373", background: "transparent", border: "none", cursor: "pointer" }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = "#fef2f2";
              (e.currentTarget as HTMLElement).style.color = "#ef4444";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "#737373";
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            Exit test
          </button>
        </div>
      )}

      <div
        className={`relative z-10 ${isTestActive ? "pt-11" : ""} ${
          isPractice ? "" : "max-w-3xl mx-auto px-5 py-7 md:px-8"
        }`}
      >
        {children}
      </div>
    </main>
  );
}
