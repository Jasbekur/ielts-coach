"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createBrowserClient } from "@supabase/ssr";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { GraduationCap, Loader2, Mail, KeyRound, ArrowLeft, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function SignupPage() {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    if (!fullName.trim()) { toast.error("Please enter your full name"); return; }
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
          data: { full_name: fullName },
        },
      });
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Code sent! Check your email inbox.");
        setStep("otp");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    if (otp.length !== 6) { toast.error("Enter the 6-digit code from your email"); return; }
    setLoading(true);
    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: "email",
      });
      if (error) {
        toast.error("Invalid or expired code. Try again.");
      } else {
        toast.success("Account created! Welcome to IELTS AI Coach 🎉");
        router.push("/dashboard");
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm space-y-6">
        {/* Logo */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-violet-500 flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold">IELTS AI Coach</h1>
          <p className="text-sm text-muted-foreground">
            {step === "email" ? "Create your free account" : "Check your email"}
          </p>
        </div>

        <Card>
          <CardHeader className="pb-4">
            {step === "email" ? (
              <>
                <CardTitle className="text-base">Get started free</CardTitle>
                <CardDescription className="text-xs">
                  We&apos;ll send a 6-digit code to your email — no password needed.
                </CardDescription>
              </>
            ) : (
              <>
                <CardTitle className="text-base flex items-center gap-2">
                  <Mail className="w-4 h-4 text-violet-500" />
                  Enter your code
                </CardTitle>
                <CardDescription className="text-xs">
                  We sent a 6-digit code to <strong>{email}</strong>. It expires in 10 minutes.
                </CardDescription>
              </>
            )}
          </CardHeader>

          <CardContent>
            {step === "email" ? (
              <form onSubmit={handleSendOtp} className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="fullName">Full name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Jasur Sobirov"
                    required
                    autoFocus
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@gmail.com"
                    required
                  />
                </div>
                <Button type="submit" className="w-full gap-2" disabled={loading}>
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Mail className="w-4 h-4" /> Send verification code
                    </>
                  )}
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  Already have an account?{" "}
                  <Link href="/login" className="underline hover:text-foreground">
                    Sign in
                  </Link>
                </p>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                {/* Code steps visual */}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-violet-50 dark:bg-violet-950 border border-violet-200 dark:border-violet-800">
                  <CheckCircle2 className="w-4 h-4 text-violet-500 shrink-0" />
                  <p className="text-xs text-violet-700 dark:text-violet-300">
                    Code sent to <strong>{email}</strong>. Check your inbox (and spam folder).
                  </p>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="otp" className="flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5" /> 6-digit code
                  </Label>
                  <Input
                    id="otp"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="123456"
                    className="text-center text-2xl font-mono tracking-widest h-14"
                    required
                    autoFocus
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full gap-2 bg-violet-500 hover:bg-violet-600"
                  disabled={loading || otp.length !== 6}
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Verify & create account"
                  )}
                </Button>

                <button
                  type="button"
                  onClick={() => { setStep("email"); setOtp(""); }}
                  className="w-full flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="w-3 h-3" /> Use a different email
                </button>
              </form>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          10 free attempts per day · No credit card required
        </p>
      </div>
    </div>
  );
}
