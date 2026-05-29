import Link from "next/link";
import { GraduationCap, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 text-center"
      style={{ background: "oklch(0.982 0.005 285)" }}
    >
      {/* Logo */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
        style={{
          background: "linear-gradient(135deg, oklch(0.62 0.245 274), oklch(0.52 0.22 300))",
          boxShadow: "0 4px 20px oklch(0.546 0.245 274 / 35%)",
        }}
      >
        <GraduationCap className="w-7 h-7 text-white" />
      </div>

      {/* 404 */}
      <p
        className="text-8xl font-black mb-2 leading-none"
        style={{
          background: "linear-gradient(135deg, oklch(0.72 0.18 274), oklch(0.55 0.245 274))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        404
      </p>

      <h1 className="text-2xl font-bold mb-2">Page not found</h1>
      <p className="text-sm text-muted-foreground max-w-xs mb-8">
        This page doesn&apos;t exist or was removed. Let&apos;s get you back on track.
      </p>

      <div className="flex gap-3">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.02]"
          style={{
            background: "linear-gradient(135deg, oklch(0.546 0.245 274), oklch(0.48 0.22 290))",
            boxShadow: "0 4px 14px oklch(0.546 0.245 274 / 35%)",
          }}
        >
          <Home className="w-4 h-4" />
          Go to Dashboard
        </Link>
        <Link
          href="/history"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border border-border hover:border-violet-300 transition-all hover:scale-[1.02]"
        >
          <ArrowLeft className="w-4 h-4" />
          History
        </Link>
      </div>
    </div>
  );
}
