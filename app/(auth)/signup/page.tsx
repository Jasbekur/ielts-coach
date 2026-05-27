"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { GraduationCap, Loader2, Mail, KeyRound, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function SignupPage() {
  // Step 1: registration form
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  // Step 2: email verification code
  const [step, setStep] = useState<"register" | "verify">("register");
  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const supabase = createClient();

  // Step 1 — create account (Supabase sends ONE confirmation email with 6-digit code)
  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
        },
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      // User already confirmed — tell them to sign in
      if (data.user?.confirmed_at) {
        toast.error("An account with this email already exists. Please sign in.");
        return;
      }

      // User exists but unconfirmed (identities empty = existing unverified user)
      // Resend the confirmation code explicitly
      if (data.user?.identities?.length === 0) {
        await supabase.auth.resend({ type: "signup", email });
      }

      toast.success("We sent a 6-digit code to " + email);
      setStep("verify");
    } finally {
      setLoading(false);
    }
  }

  // Step 2 — verify the signup confirmation code
  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    if (otp.length !== 8) {
      toast.error("Please enter the 8-digit code from your email");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: "signup",  // "signup" matches the Confirm sign up email
      });
      if (error) {
        toast.error("Wrong or expired code. Check your email or click Resend.");
      } else {
        toast.success("Email verified! Welcome to IELTS AI Coach 🎉");
        router.push("/dashboard");
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    setLoading(true);
    try {
      await supabase.auth.resend({ type: "signup", email });
      toast.success("New code sent to " + email);
      setOtp("");
    } finally {
      setLoading(false);
    }
  }

  // ─── STEP 1: Registration form ──────────────────────────────────────────
  if (step === "register") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="w-full max-w-sm space-y-6">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-violet-500 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold">IELTS AI Coach</h1>
            <p className="text-sm text-muted-foreground">Create your free account</p>
          </div>

          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base">Get started free</CardTitle>
              <CardDescription className="text-xs">
                10 free scoring attempts per day. No credit card required.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegister} className="space-y-3">
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
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPass ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="6+ characters"
                      required
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground">Minimum 6 characters</p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-violet-500 hover:bg-violet-600 text-white"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Create account"
                  )}
                </Button>
              </form>

              <p className="text-center text-xs text-muted-foreground mt-4">
                Already have an account?{" "}
                <Link href="/login" className="underline hover:text-foreground">
                  Sign in
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // ─── STEP 2: Email verification code ────────────────────────────────────
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-violet-500 flex items-center justify-center">
            <Mail className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold">Check your email</h1>
          <p className="text-sm text-muted-foreground text-center">
            We sent a 6-digit code to<br />
            <span className="font-medium text-foreground">{email}</span>
          </p>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-violet-500" />
              Enter verification code
            </CardTitle>
            <CardDescription className="text-xs">
              The code expires in 10 minutes. Check your inbox and spam folder.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerify} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={8}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 8))}
                  placeholder="• • • • • • • •"
                  className="text-center text-2xl font-mono tracking-[0.4em] h-16 border-2 focus:border-violet-400"
                  required
                  autoFocus
                />
                <p className="text-center text-xs text-muted-foreground">
                  {otp.length}/8 digits entered
                </p>
              </div>

              <Button
                type="submit"
                className="w-full bg-violet-500 hover:bg-violet-600 text-white"
                disabled={loading || otp.length !== 8}
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Verify & enter app →"
                )}
              </Button>

              <div className="flex flex-col items-center gap-2 pt-1">
                <p className="text-xs text-muted-foreground">Didn&apos;t receive it?</p>
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={loading}
                  className="text-xs font-medium text-violet-500 hover:text-violet-600 transition-colors underline underline-offset-2"
                >
                  Resend code
                </button>
                <button
                  type="button"
                  onClick={() => { setStep("register"); setOtp(""); }}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mt-1"
                >
                  <ArrowLeft className="w-3 h-3" /> Change email or password
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
