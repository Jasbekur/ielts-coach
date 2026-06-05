"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  GraduationCap, Loader2, ArrowRight, CheckCircle2,
  BookOpen, Mic, BarChart3, Star
} from "lucide-react";
import { toast } from "sonner";

const PRIMARY    = "#dc2626";
const PRIMARY_LT = "#ef4444";
const PRIMARY_DIM = "rgba(220,38,38,0.15)";

const FEATURES = [
  { icon: BookOpen,  label: "IELTS Writing Coach", desc: "Task 1 & Task 2 with instant AI feedback" },
  { icon: Mic,       label: "Speaking Practice",   desc: "All 3 parts with band-accurate scoring" },
  { icon: BarChart3, label: "Progress Tracking",   desc: "See your improvement over time" },
];

const TESTIMONIALS = [
  { name: "Asel T.",  country: "🇰🇿 Kazakhstan",  score: "7.5", text: "Went from Band 6.0 to 7.5 in 6 weeks. The writing corrections are exactly what my examiner would say." },
  { name: "Omar K.",  country: "🇸🇦 Saudi Arabia", score: "8.0", text: "I got Band 8 on my first real attempt. The model answers at each band level completely changed how I think about IELTS." },
];

export default function LoginPage() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);
  const router   = useRouter();
  const supabase = createClient();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        toast.error(error.message);
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  }

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

  return (
    <div className="min-h-screen flex" style={{ background: "#f9fafb" }}>

      {/* ── Left panel — branding ──────────────────────────────────────────── */}
      <div
        className="hidden lg:flex flex-col justify-between w-[480px] shrink-0 p-10 relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #0d1117 0%, #111827 100%)" }}
      >
        {/* Background orbs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${PRIMARY_DIM}, transparent 70%)` }} />
        <div className="absolute -bottom-32 -right-32 w-[420px] h-[420px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(220,38,38,0.06), transparent 70%)" }} />

        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{
                background: PRIMARY,
                boxShadow: `0 4px 16px rgba(220,38,38,0.45)`,
              }}
            >
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-sm leading-none text-white">IELTS Sensei</p>
              <p className="text-[10px] mt-0.5 uppercase tracking-widest font-bold"
                style={{ color: `${PRIMARY}cc` }}>AI Exam Coach</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold leading-snug mb-3 text-white">
            Your path to<br />
            <span style={{
              background: `linear-gradient(135deg, #fca5a5, ${PRIMARY_LT})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Band 7+
            </span>
            {" "}starts here
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
            Examiner-grade feedback on Writing &amp; Speaking in under 15 seconds.
            Most students improve by 0.5–1.0 bands within 4 weeks.
          </p>
        </div>

        {/* Feature list */}
        <div className="relative z-10 space-y-4">
          {FEATURES.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex items-start gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: PRIMARY_DIM }}
              >
                <Icon className="w-4 h-4" style={{ color: PRIMARY_LT }} />
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.85)" }}>
                  {label}
                </p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="relative z-10 space-y-3">
          {TESTIMONIALS.map(({ name, country, score, text }) => (
            <div
              key={name}
              className="rounded-xl p-4"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              <div className="flex items-center gap-1.5 mb-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                ))}
                <span className="ml-auto font-mono font-bold text-sm" style={{ color: PRIMARY_LT }}>
                  Band {score}
                </span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                &ldquo;{text}&rdquo;
              </p>
              <div className="flex items-center gap-2 mt-1.5">
                <p className="text-[10px] font-semibold" style={{ color: "rgba(255,255,255,0.4)" }}>
                  — {name}
                </p>
                <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>
                  {country}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right panel — form ────────────────────────────────────────────── */}
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

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Sign in to continue your preparation
            </p>
          </div>

          {/* Google */}
          <Button
            variant="outline"
            className="w-full gap-2.5 h-11 text-sm font-medium mb-6"
            onClick={handleGoogle}
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </Button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-[11px] uppercase tracking-wider">
              <span className="px-3 text-muted-foreground bg-[#f9fafb]">
                or sign in with email
              </span>
            </div>
          </div>

          {/* Email/password form */}
          <form onSubmit={handleLogin} className="space-y-4">
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

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-medium hover:underline transition-colors"
                  style={{ color: PRIMARY }}
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="h-11"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-11 gap-2 text-sm font-semibold mt-2 text-white"
              disabled={loading}
              style={{
                background: "#dc2626",
                boxShadow: `0 4px 0 #b91c1c, 0 6px 16px rgba(220,38,38,0.35)`,
              }}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>Sign in <ArrowRight className="w-4 h-4" /></>
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 space-y-4">
            <p className="text-center text-sm text-muted-foreground">
              No account?{" "}
              <Link
                href="/signup"
                className="font-semibold hover:underline transition-colors"
                style={{ color: PRIMARY }}
              >
                Create one free
              </Link>
            </p>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-4 pt-2 flex-wrap">
              {["Free to start", "Scores in 15 sec", "4 IELTS criteria"].map((badge) => (
                <div key={badge} className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <CheckCircle2 className="w-3 h-3 text-red-500" />
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
