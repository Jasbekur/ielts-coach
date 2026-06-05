"use client";

// Block this page entirely in production — redirect happens server-side via Next.js
if (process.env.NODE_ENV === "production") {
  if (typeof window !== "undefined") window.location.replace("/dashboard");
}

/**
 * /dev  — Hidden developer utilities page (localhost only)
 * In production this page redirects to /dashboard immediately.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Terminal,
  ShieldCheck,
  ShieldX,
  ChevronRight,
  LayoutDashboard,
  Loader2,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { ProtectedAdminRoute } from "@/components/shared/ProtectedAdminRoute";
import { grantAdminAccess, grantEditorAccess, revokeAdminAccess } from "@/lib/utils/admin-access";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Result {
  ok:      boolean;
  message: string;
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function DevPage() {
  return (
    <ProtectedAdminRoute>
      <DevContent />
    </ProtectedAdminRoute>
  );
}

// ── Content ───────────────────────────────────────────────────────────────────

function DevContent() {
  // Attach to window so DevTools console can call them directly
  useEffect(() => {
    if (typeof window !== "undefined") {
      // @ts-expect-error — intentional global for dev console use
      window.grantAdminAccess  = grantAdminAccess;
      // @ts-expect-error — intentional global for dev console use
      window.grantEditorAccess = grantEditorAccess;
      // @ts-expect-error — intentional global for dev console use
      window.revokeAdminAccess = revokeAdminAccess;

      console.log(
        "%c🛡 Role utilities loaded",
        "color:#7c3aed;font-weight:bold;font-size:14px;"
      );
      console.log(
        "%cAvailable in this console:\n" +
        "  await grantAdminAccess(\"email@example.com\")   // → admin\n" +
        "  await grantEditorAccess(\"email@example.com\")  // → editor\n" +
        "  await revokeAdminAccess(\"email@example.com\")  // → student",
        "color:#a78bfa;"
      );
    }
    return () => {
      // @ts-expect-error
      delete window.grantAdminAccess;
      // @ts-expect-error
      delete window.grantEditorAccess;
      // @ts-expect-error
      delete window.revokeAdminAccess;
    };
  }, []);

  return (
    <div className="space-y-8 max-w-xl">

      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-sm">
        <Link href="/dashboard"
          className="flex items-center gap-1.5 font-medium transition-colors"
          style={{ color: "rgba(255,255,255,0.45)" }}
          onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          Dashboard
        </Link>
        <ChevronRight className="w-3.5 h-3.5" style={{ color: "rgba(255,255,255,0.2)" }} />
        <span className="flex items-center gap-1.5 font-semibold text-white">
          <Terminal className="w-3.5 h-3.5" style={{ color: "#7c3aed" }} />
          Dev Utilities
        </span>
      </div>

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-2xl font-bold text-white tracking-tight">Dev Utilities</h1>
          <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
            style={{ background: "rgba(239,68,68,0.15)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }}>
            Admin only
          </span>
        </div>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
          Role management utilities. Also available in the browser console on this page.
        </p>
      </div>

      {/* Console hint */}
      <div className="rounded-xl px-4 py-3 font-mono text-xs space-y-1"
        style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.07)" }}>
        <p style={{ color: "rgba(255,255,255,0.3)" }}>// Open DevTools (⌥⌘I) and run:</p>
        <p><span style={{ color: "#a78bfa" }}>await</span> <span style={{ color: "#10b981" }}>grantAdminAccess</span>(<span style={{ color: "#fbbf24" }}>&quot;email@example.com&quot;</span>)</p>
        <p><span style={{ color: "#a78bfa" }}>await</span> <span style={{ color: "#f59e0b" }}>grantEditorAccess</span>(<span style={{ color: "#fbbf24" }}>&quot;email@example.com&quot;</span>)</p>
        <p><span style={{ color: "#a78bfa" }}>await</span> <span style={{ color: "#ef4444" }}>revokeAdminAccess</span>(<span style={{ color: "#fbbf24" }}>&quot;email@example.com&quot;</span>)</p>
      </div>

      {/* Grant admin card */}
      <AdminAccessCard
        action="grant"
        title="Grant Admin Access"
        description="Full access — can add, edit, and delete questions. Sees /dev and Content Manager."
        buttonLabel="Grant Admin"
        icon={<ShieldCheck className="w-4 h-4" />}
        accentColor="#7c3aed"
      />

      {/* Grant editor card */}
      <AdminAccessCard
        action="grant-editor"
        title="Grant Editor Access"
        description="Can add and edit questions but cannot delete them. Sees Content Manager, not /dev."
        buttonLabel="Grant Editor"
        icon={<ShieldCheck className="w-4 h-4" />}
        accentColor="#f59e0b"
      />

      {/* Revoke card */}
      <AdminAccessCard
        action="revoke"
        title="Revoke Access"
        description="Resets a user back to student role. All elevated UI will be hidden for them."
        buttonLabel="Revoke Role"
        icon={<ShieldX className="w-4 h-4" />}
        accentColor="#ef4444"
      />
    </div>
  );
}

// ── Action card ───────────────────────────────────────────────────────────────

function AdminAccessCard({
  action,
  title,
  description,
  buttonLabel,
  icon,
  accentColor,
}: {
  action:      "grant" | "grant-editor" | "revoke";
  title:       string;
  description: string;
  buttonLabel: string;
  icon:        React.ReactNode;
  accentColor: string;
}) {
  const [email,   setEmail]   = useState("");
  const [loading, setLoading] = useState(false);
  const [result,  setResult]  = useState<Result | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setResult(null);

    const fn =
      action === "grant"        ? grantAdminAccess  :
      action === "grant-editor" ? grantEditorAccess :
                                  revokeAdminAccess;
    const res = await fn(email.trim());
    setResult({ ok: res.ok, message: res.message });
    setLoading(false);
    if (res.ok) setEmail("");
  }

  return (
    <form onSubmit={handleSubmit}
      className="rounded-2xl p-5 space-y-4"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>

      {/* Title row */}
      <div className="flex items-center gap-2.5">
        <div className="p-2 rounded-lg" style={{ background: `${accentColor}18` }}>
          <span style={{ color: accentColor }}>{icon}</span>
        </div>
        <div>
          <h2 className="text-sm font-bold text-white">{title}</h2>
          <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
            {description}
          </p>
        </div>
      </div>

      {/* Email input + button */}
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={e => { setEmail(e.target.value); setResult(null); }}
          placeholder="user@example.com"
          required
          className="flex-1 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
          style={{
            background:  "rgba(255,255,255,0.06)",
            border:      "1px solid rgba(255,255,255,0.1)",
            caretColor:  accentColor,
          }}
          onFocus={e => (e.currentTarget.style.borderColor = `${accentColor}60`)}
          onBlur={e  => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
        />
        <button
          type="submit"
          disabled={loading || !email.trim()}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-40 whitespace-nowrap"
          style={{ background: accentColor, boxShadow: `0 4px 12px ${accentColor}30` }}
        >
          {loading
            ? <Loader2 className="w-4 h-4 animate-spin" />
            : icon}
          {loading ? "Working…" : buttonLabel}
        </button>
      </div>

      {/* Result banner */}
      {result && (
        <div
          className="flex items-start gap-2.5 px-3.5 py-2.5 rounded-xl text-sm"
          style={{
            background: result.ok ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)",
            border:     `1px solid ${result.ok ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.2)"}`,
            color:      result.ok ? "#10b981" : "#f87171",
          }}
        >
          {result.ok
            ? <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            : <XCircle      className="w-4 h-4 shrink-0 mt-0.5" />}
          <span className="font-medium">{result.message}</span>
        </div>
      )}
    </form>
  );
}
