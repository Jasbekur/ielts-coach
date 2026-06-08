import Link from "next/link";
import { GraduationCap, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 text-center"
      style={{ background: "#ffffff" }}
    >
      {/* Logo */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
        style={{
          background: "linear-gradient(135deg, #dc2626, #b91c1c)",
          boxShadow: "0 4px 20px rgba(220, 38, 38, 0.3)",
        }}
      >
        <GraduationCap className="w-7 h-7 text-white" />
      </div>

      {/* 404 */}
      <p
        className="text-8xl font-black mb-2 leading-none"
        style={{
          background: "linear-gradient(135deg, #ef4444, #dc2626)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        404
      </p>

      <h1 className="text-2xl font-bold mb-2" style={{ color: "#0f172a" }}>Page not found</h1>
      <p className="text-sm max-w-xs mb-8" style={{ color: "#64748b" }}>
        This page doesn&apos;t exist or was removed. Let&apos;s get you back on track.
      </p>

      <div className="flex gap-3">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.02]"
          style={{
            background: "linear-gradient(135deg, #dc2626, #b91c1c)",
            boxShadow: "0 4px 14px rgba(220, 38, 38, 0.3)",
          }}
        >
          <Home className="w-4 h-4" />
          Go to Dashboard
        </Link>
        <Link
          href="/"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02]"
          style={{ border: "1px solid #e2e8f0", color: "#0f172a" }}
        >
          <ArrowLeft className="w-4 h-4" />
          Home
        </Link>
      </div>
    </div>
  );
}
