"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Loader2, Mail, ArrowLeft, CheckCircle2, KeyRound } from "lucide-react";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail]   = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent]     = useState(false);
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
      });
      if (error) toast.error(error.message);
      else setSent(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex" style={{ background: "oklch(0.982 0.005 285)" }}>
      {/* Left panel */}
      <div
        className="hidden lg:flex flex-col items-center justify-center w-[480px] shrink-0 p-10 relative overflow-hidden"
        style={{ background: "oklch(0.155 0.032 278)" }}
      >
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(220,38,38,0.15), transparent 70%)" }} />
        <div className="relative z-10 text-center space-y-5 max-w-xs">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto"
            style={{
              background: "#dc2626",
              boxShadow: "0 4px 24px rgba(220,38,38,0.4)",
            }}
          >
            <KeyRound className="w-8 h-8 text-white" />
          </div>
          <div>
            <p className="text-2xl font-bold mb-2" style={{ color: "oklch(0.94 0.01 278)" }}>
              Forgot your password?
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "oklch(0.62 0.015 278)" }}>
              No worries — it happens to everyone. Enter your email and we&apos;ll send you a secure reset link instantly.
            </p>
          </div>
          <div
            className="rounded-xl p-4 text-left"
            style={{ background: "oklch(0.22 0.028 278)" }}
          >
            <p className="text-xs font-semibold mb-1" style={{ color: "#dc2626" }}>
              💡 Quick tip
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "oklch(0.65 0.012 278)" }}>
              Check your spam folder if you don&apos;t see the email within 2 minutes.
            </p>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-[400px]">

          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "#dc2626" }}
            >
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <p className="font-bold text-base">IELTS Sensei</p>
          </div>

          {sent ? (
            /* ── Success state ── */
            <div className="text-center space-y-5">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
                style={{ background: "rgba(220,38,38,0.1)" }}
              >
                <CheckCircle2 className="w-8 h-8" style={{ color: "#dc2626" }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-2">Check your email</h1>
                <p className="text-sm text-muted-foreground">
                  We sent a reset link to{" "}
                  <span className="font-semibold text-foreground">{email}</span>
                </p>
              </div>
              <p className="text-xs text-muted-foreground">
                Click the link in the email to set your new password. Check spam if you don&apos;t see it.
              </p>
              <div className="flex flex-col gap-2 pt-2">
                <Button
                  variant="outline"
                  className="w-full h-11"
                  onClick={() => { setSent(false); setEmail(""); }}
                >
                  Try a different email
                </Button>
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-1.5 text-sm font-medium hover:underline transition-colors"
                  style={{ color: "#dc2626" }}
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to sign in
                </Link>
              </div>
            </div>
          ) : (
            /* ── Form state ── */
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold tracking-tight">Reset password</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Enter your account email to receive a reset link
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-sm font-medium">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    autoFocus
                    className="h-11"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-11 gap-2 font-semibold"
                  disabled={loading}
                  style={{
                    background: "linear-gradient(135deg, #dc2626, oklch(0.52 0.22 300))",
                    boxShadow: "0 4px 16px rgba(220,38,38,0.35)",
                  }}
                >
                  {loading
                    ? <Loader2 className="w-4 h-4 animate-spin" />
                    : <><Mail className="w-4 h-4" /> Send reset link</>}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-sm font-medium hover:underline transition-colors"
                  style={{ color: "#dc2626" }}
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to sign in
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
