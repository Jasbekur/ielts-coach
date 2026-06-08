"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Loader2, Eye, EyeOff, ShieldCheck, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const [password, setPassword]   = useState("");
  const [confirm, setConfirm]     = useState("");
  const [showPass, setShowPass]   = useState(false);
  const [loading, setLoading]     = useState(false);
  const [validSession, setValidSession] = useState<boolean | null>(null);
  const router = useRouter();
  const supabase = createClient();

  // Guard: only allow access when Supabase has set a recovery session via the email link
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setValidSession(!!user);
      if (!user) {
        // No recovery session — redirect to forgot-password so user can request a new link
        router.replace("/forgot-password");
      }
    });
  }, [supabase, router]);

  const passwordOk = password.length >= 8;
  const confirmOk  = password === confirm && confirm.length > 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!passwordOk) { toast.error("Password must be at least 8 characters"); return; }
    if (!confirmOk)  { toast.error("Passwords do not match"); return; }
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Password updated! Taking you to your dashboard…");
        setTimeout(() => router.push("/dashboard"), 1500);
      }
    } finally {
      setLoading(false);
    }
  }

  // Show spinner while we verify the session to avoid flash
  if (validSession === null) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "oklch(0.982 0.005 285)" }}>
      <div className="w-8 h-8 rounded-full border-2 border-red-500 border-t-transparent animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen flex" style={{ background: "oklch(0.982 0.005 285)" }}>
      {/* Left panel */}
      <div
        className="hidden lg:flex flex-col items-center justify-center w-[480px] shrink-0 p-10 relative overflow-hidden"
        style={{ background: "oklch(0.155 0.032 278)" }}
      >
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(220,38,38,0.15), transparent 70%)" }} />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(220,38,38,0.08), transparent 70%)" }} />

        <div className="relative z-10 text-center space-y-5 max-w-xs">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto"
            style={{
              background: "#16a34a",
              boxShadow: "0 4px 24px rgba(220,38,38,0.4)",
            }}
          >
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <div>
            <p className="text-2xl font-bold mb-2" style={{ color: "oklch(0.94 0.01 278)" }}>
              Set a new password
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "oklch(0.62 0.015 278)" }}>
              Choose a strong password to secure your account and get back to practising.
            </p>
          </div>
          <div className="space-y-2 text-left">
            {[
              "At least 6 characters long",
              "Mix letters and numbers for strength",
              "Avoid using personal information",
            ].map((tip) => (
              <div key={tip} className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: "#16a34a" }} />
                <p className="text-xs" style={{ color: "oklch(0.65 0.012 278)" }}>{tip}</p>
              </div>
            ))}
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
              style={{ background: "#16a34a" }}
            >
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <p className="font-bold text-base">IELTS Sensei</p>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight">New password</h1>
            <p className="text-sm text-muted-foreground mt-1">Choose something strong and memorable</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-sm font-medium">New password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="6+ characters"
                  required
                  autoFocus
                  className="h-11 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {/* Strength indicator */}
              {password.length > 0 && (
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex gap-1 flex-1">
                    {[1,2,3].map(i => (
                      <div key={i} className="h-1 flex-1 rounded-full transition-all duration-300"
                        style={{
                          background: password.length >= i * 3
                            ? i === 3 ? "#16a34a" : i === 2 ? "oklch(0.75 0.18 55)" : "oklch(0.65 0.2 27)"
                            : "oklch(0.912 0.012 285)"
                        }} />
                    ))}
                  </div>
                  <p className="text-[10px] text-muted-foreground">
                    {password.length < 4 ? "Weak" : password.length < 8 ? "Fair" : "Good"}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="confirm" className="text-sm font-medium">Confirm password</Label>
              <Input
                id="confirm"
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Same password again"
                required
                className="h-11"
              />
              {confirm && !confirmOk && (
                <p className="text-xs text-destructive">Passwords don&apos;t match</p>
              )}
              {confirmOk && (
                <p className="text-xs" style={{ color: "#16a34a" }}>✓ Passwords match</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-11 font-semibold mt-2"
              disabled={loading || !passwordOk || !confirmOk}
              style={{
                background: "#16a34a",
                boxShadow: "0 4px 16px rgba(220,38,38,0.35)",
              }}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Update password"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
