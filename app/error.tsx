"use client";

import { useEffect } from "react";
import Link from "next/link";
import { GraduationCap, RefreshCw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log internally — do NOT expose full error details to the user
    console.error("[error-boundary] digest:", error.digest, "message:", error.message);
  }, [error]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 text-center"
      style={{ background: "oklch(0.982 0.005 285)" }}
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
        style={{
          background: "linear-gradient(135deg, oklch(0.577 0.245 27), oklch(0.55 0.22 15))",
          boxShadow: "0 4px 20px oklch(0.577 0.245 27 / 30%)",
        }}
      >
        <GraduationCap className="w-7 h-7 text-white" />
      </div>

      <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
      <p className="text-sm text-muted-foreground max-w-xs mb-2">
        An unexpected error occurred. This has been logged and we&apos;ll look into it.
      </p>
      <p className="text-xs text-muted-foreground font-mono mb-6 bg-muted px-3 py-1 rounded-lg">
        Ref: {error.digest ? error.digest.slice(0, 8).toUpperCase() : "UNKNOWN"}
      </p>

      <div className="flex gap-3">
        <button
          onClick={reset}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.02]"
          style={{
            background: "linear-gradient(135deg, oklch(0.546 0.245 274), oklch(0.48 0.22 290))",
            boxShadow: "0 4px 14px oklch(0.546 0.245 274 / 35%)",
          }}
        >
          <RefreshCw className="w-4 h-4" />
          Try again
        </button>
        <Link
          href="/dashboard"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border border-border hover:border-violet-300 transition-all hover:scale-[1.02]"
        >
          <Home className="w-4 h-4" />
          Dashboard
        </Link>
      </div>
    </div>
  );
}
