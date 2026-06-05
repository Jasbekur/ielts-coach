"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  GraduationCap, Loader2, Mail, ArrowLeft,
  Eye, EyeOff, ArrowRight, CheckCircle2, Sparkles
} from "lucide-react";
import { toast } from "sonner";

function GoogleIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

const PRIMARY    = "#dc2626";
const PRIMARY_LT = "#ef4444";
const PRIMARY_DIM = "rgba(220,38,38,0.15)";

const PERKS = [
  "AI band scoring on every attempt",
  "Speaking & Writing practice",
  "Band 5–8+ model answers",
  "Progress tracking over time",
];

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [step, setStep]         = useState<"register" | "verify">("register");
  const [otp, setOtp]           = useState("");
  const [loading, setLoading]   = useState(false);
  const router   = useRouter();
  const supabase = createClient();

  async function handleGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: { access_type: "offline", prompt: "consent" },
      },
    });
    if (error) toast.error("Google sign-in failed: " + error.message);
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 6) { toast.error("Password must be at least 6 characters"); return; }
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email, password, options: { data: { full_name: fullName } },
      });
      if (error) { toast.error(error.message); return; }
      if (data.user?.confirmed_at) {
        toast.error("An account with this email already exists. Please sign in.");
        return;
      }
      if (data.user?.identities?.length === 0) await supabase.auth.resend({ type: "signup", email });
      toast.success("We sent a 6-digit verification code to " + email);
      setStep("verify");
    } finally { setLoading(false); }
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    if (otp.length !== 6) { toast.error("Please enter the 6-digit code from your email"); return; }
    setLoading(true);
    try {
      const { error } = await supabase.auth.verifyOtp({ email, token: otp, type: "signup" });
      if (error) {
        toast.error("Wrong or expired code. Check your email or click Resend.");
      } else {
        toast.success("Email verified! Welcome to IELTS Sensei 🎉");
        router.push("/dashboard");
        router.refresh();
      }
    } finally { setLoading(false); }
  }

  async function handleResend() {
    setLoading(true);
    try {
      await supabase.auth.resend({ type: "signup", email });
      toast.success("New code sent to " + email);
      setOtp("");
    } finally { setLoading(false); }
  }

  // ── Verify step ────────────────────────────────────────────────────────────
  if (step === "verify") {
    return (
      <div className="min-h-screen flex" style={{ background: "#f9fafb" }}>
        {/* Left panel */}
        <div
          className="hidden lg:flex flex-col items-center justify-center w-[480px] shrink-0 p-10 relative overflow-hidden"
          style={{ background: "linear-gradient(180deg, #0d1117 0%, #111827 100%)" }}
        >
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full pointer-events-none"
            style={{ background: `radial-gradient(circle, ${PRIMARY_DIM}, transparent 70%)` }} />
          <div className="relative z-10 text-center space-y-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto"
              style={{
                background: PRIMARY,
                boxShadow: `0 4px 24px rgba(220,38,38,0.4)`,
              }}
            >
              <Mail className="w-8 h-8 text-white" />
            </div>
            <p className="text-2xl font-bold text-white">Check your inbox</p>
            <p className="text-sm leading-relaxed max-w-xs mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
              We sent a verification code to<br />
              <span style={{ color: PRIMARY_LT, fontWeight: 600 }}>{email}</span>
            </p>
          </div>
        </div>

        {/* Right panel */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-[400px]">
            <div className="mb-8">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 lg:hidden"
                style={{ background: PRIMARY }}
              >
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight">Verify your email</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Enter the 6-digit code we sent to <span className="font-medium text-foreground">{email}</span>
              </p>
            </div>

            <form onSubmit={handleVerify} className="space-y-5">
              <div className="space-y-2">
                <Input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="• • • • • •"
                  className="text-center text-2xl font-mono tracking-[0.4em] h-16 border-2 focus:border-red-400"
                  required
                  autoFocus
                />
                <p className="text-center text-xs text-muted-foreground">{otp.length}/6 digits entered</p>
              </div>

              <Button
                type="submit"
                className="w-full h-11 gap-2 font-semibold text-white"
                disabled={loading || otp.length !== 6}
                style={{
                  background: "#dc2626",
                  boxShadow: `0 4px 0 #b91c1c, 0 6px 16px rgba(220,38,38,0.35)`,
                }}
              >
                {loading
                  ? <Loader2 className="w-4 h-4 animate-spin" />
                  : <><span>Verify & enter app</span><ArrowRight className="w-4 h-4" /></>
                }
              </Button>
            </form>

            <div className="flex flex-col items-center gap-2 mt-6 text-sm">
              <p className="text-muted-foreground text-xs">Didn&apos;t receive it?</p>
              <button
                onClick={handleResend}
                disabled={loading}
                className="text-xs font-semibold hover:underline transition-colors"
                style={{ color: PRIMARY }}
              >
                Resend code
              </button>
              <button
                onClick={() => { setStep("register"); setOtp(""); }}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mt-1"
              >
                <ArrowLeft className="w-3 h-3" /> Change email or password
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Register step ──────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex" style={{ background: "#f9fafb" }}>

      {/* Left panel */}
      <div
        className="hidden lg:flex flex-col justify-between w-[480px] shrink-0 p-10 relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #0d1117 0%, #111827 100%)" }}
      >
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${PRIMARY_DIM}, transparent 70%)` }} />
        <div className="absolute -bottom-32 -right-32 w-[420px] h-[420px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(220,38,38,0.06), transparent 70%)" }} />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: PRIMARY, boxShadow: `0 4px 16px rgba(220,38,38,0.45)` }}
          >
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-sm leading-none text-white">IELTS Sensei</p>
            <p className="text-[10px] mt-0.5 uppercase tracking-widest font-bold"
              style={{ color: `${PRIMARY}cc` }}>AI Exam Coach</p>
          </div>
        </div>

        {/* Hero text */}
        <div className="relative z-10 space-y-4">
          <div
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
            style={{ background: PRIMARY_DIM, color: PRIMARY_LT }}
          >
            <Sparkles className="w-3 h-3" />
            Free to start · No card needed
          </div>
          <h2 className="text-3xl font-bold leading-snug text-white">
            Start your IELTS<br />
            <span style={{
              background: `linear-gradient(135deg, #fca5a5, ${PRIMARY_LT})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              journey today
            </span>
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
            Join thousands of students improving their band score with AI-powered feedback.
          </p>
        </div>

        {/* Perks */}
        <div className="relative z-10 space-y-3">
          {PERKS.map((perk) => (
            <div key={perk} className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: PRIMARY_LT }} />
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>{perk}</p>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="relative z-10 text-[11px]" style={{ color: "rgba(255,255,255,0.3)" }}>
          By creating an account you agree to our Terms of Service.
        </p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-[400px]">

          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: PRIMARY, boxShadow: `0 4px 12px rgba(220,38,38,0.4)` }}
            >
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <p className="font-bold text-base">IELTS Sensei</p>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight">Create your account</h1>
            <p className="text-sm text-muted-foreground mt-1">Free forever · 10 AI sessions per day</p>
          </div>

          {/* Google */}
          <Button
            type="button"
            variant="outline"
            className="w-full gap-2.5 h-11 text-sm font-medium mb-6"
            onClick={handleGoogle}
          >
            <GoogleIcon />
            Continue with Google
          </Button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-[11px] uppercase tracking-wider">
              <span className="px-3 text-muted-foreground bg-[#f9fafb]">
                or sign up with email
              </span>
            </div>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="fullName" className="text-sm font-medium">Full name</Label>
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your name"
                required
                autoFocus
                className="h-11"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium">Email address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="h-11"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="6+ characters"
                  required
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
              <p className="text-xs text-muted-foreground">Minimum 6 characters</p>
            </div>

            <Button
              type="submit"
              className="w-full h-11 gap-2 font-semibold mt-2 text-white"
              disabled={loading}
              style={{
                background: "#dc2626",
                boxShadow: `0 4px 0 #b91c1c, 0 6px 16px rgba(220,38,38,0.35)`,
              }}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>Create account <ArrowRight className="w-4 h-4" /></>
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold hover:underline transition-colors"
              style={{ color: PRIMARY }}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
