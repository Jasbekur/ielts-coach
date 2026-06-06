// Server Component — data fetched on the server, zero client-side waterfall
export const revalidate = 30; // revalidate every 30 s — allows prefetch to cache

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { BookOpen, Mic, TrendingUp, ArrowRight, Flame, Lightbulb, GraduationCap, Headphones, BookMarked } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getBandTailwind, getBandBg, Attempt } from "@/types/ielts";
import { TargetBandSetter } from "@/components/dashboard/TargetBandSetter";
import { formatBand, roundBand } from "@/lib/utils/band-score";
import { CountUp } from "@/components/shared/CountUp";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { BandRing } from "@/components/shared/BandRing";
import { ExamCountdown } from "@/components/dashboard/ExamCountdown";
import { PracticeToday } from "@/components/dashboard/PracticeToday";

// ─── Daily IELTS Tips ─────────────────────────────────────────────────────
const IELTS_TIPS = [
  { category: "Writing T2", tip: 'Never write "I am agree". Correct: "I agree" or "I strongly agree".' },
  { category: "Writing T2", tip: 'Don\'t say "According to my opinion". Say "In my opinion" or "I believe".' },
  { category: "Writing T2", tip: '"Peoples", "informations", "advices" are WRONG. These words have no plural form in English.' },
  { category: "Writing T2", tip: "Always address ALL parts of the question. If it says 'Discuss both views AND give your opinion' — you must do all three." },
  { category: "Writing T1", tip: 'Every Task 1 MUST have an overview paragraph. Start with: "Overall, it is clear that..." Without it, score is capped at 5.0.' },
  { category: "Writing T1", tip: "Task 1 is NOT about your opinion. Never write 'I think'. Just describe the data objectively." },
  { category: "Writing T1", tip: "Always include specific numbers: not just 'increased' but 'increased by 15%, from 20% to 35%'." },
  { category: "Speaking", tip: 'Extend your Part 1 answers! Use AREA: Answer → Reason → Example → Alternative.' },
  { category: "Speaking", tip: 'Practice the "th" sound: put your tongue between your teeth. "the", "this", "think", "three".' },
  { category: "Speaking", tip: 'In Part 2, speak for the FULL 2 minutes. Prepare: what/who, when/where, how/why, how you felt.' },
  { category: "Grammar", tip: '"depend on" NOT "depend of". "interested in" NOT "interested on". Prepositions must be memorised.' },
  { category: "Vocabulary", tip: 'Learn collocations: "make a decision" ✅, "do a decision" ❌. "do research" ✅, "make a research" ❌.' },
  { category: "Exam Strategy", tip: "Task 2 is worth more marks than Task 1. Spend 40 minutes on Task 2 and 20 on Task 1." },
  { category: "Exam Strategy", tip: "For Band 7 Writing: 250+ words, clear paragraphs, varied vocabulary, address ALL parts." },
];

function getDailyTip() {
  const day = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  return IELTS_TIPS[day % IELTS_TIPS.length];
}

function BandSparkline({ attempts }: { attempts: Attempt[] }) {
  const last7 = [...attempts].reverse().slice(-7);
  if (last7.length < 2) return null;
  const min = 4, max = 9, w = 160, h = 40;
  const points = last7.map((a, i) => {
    const x = (i / (last7.length - 1)) * w;
    const y = h - ((a.overall_band - min) / (max - min)) * h;
    return `${x},${y}`;
  });
  const improving = last7[last7.length - 1].overall_band >= last7[0].overall_band;
  return (
    <div className="flex items-center gap-3">
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="shrink-0">
        <polyline points={points.join(" ")} fill="none"
          stroke={improving ? "#ef4444" : "#f59e0b"} strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round" />
        {last7.map((a, i) => {
          const x = (i / (last7.length - 1)) * w;
          const y = h - ((a.overall_band - min) / (max - min)) * h;
          return <circle key={i} cx={x} cy={y} r="3"
            fill={i === last7.length - 1 ? "#ef4444" : "#e5e7eb"}
            stroke={i === last7.length - 1 ? "#ef4444" : "#9ca3af"} strokeWidth="1.5" />;
        })}
      </svg>
      <div className="text-xs text-muted-foreground">
        <span className={improving ? "text-red-600" : "text-amber-500"}>
          {improving ? "↑" : "↓"} {Math.abs(last7[last7.length - 1].overall_band - last7[0].overall_band).toFixed(1)} bands
        </span>
        <span className="ml-1">this week</span>
      </div>
    </div>
  );
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const userId    = user.id;
  const firstName = (user.user_metadata?.full_name as string)?.split(" ")[0] || "there";

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const today = new Date(); today.setHours(0, 0, 0, 0);

  // All queries run in parallel on the server — allSettled so one failure won't crash the page
  const [profileRes, recentRes, todayRes, allRes] = await Promise.allSettled([
    supabase.from("profiles").select("*").eq("id", userId).single(),
    supabase.from("attempts").select("*").eq("user_id", userId)
      .gte("created_at", sevenDaysAgo.toISOString())
      .order("created_at", { ascending: false }).limit(20),
    supabase.from("attempts").select("id", { count: "exact", head: true })
      .eq("user_id", userId).gte("created_at", today.toISOString()),
    supabase.from("attempts").select("created_at").eq("user_id", userId)
      .order("created_at", { ascending: false }).limit(100),
  ]);

  const profile    = profileRes.status === "fulfilled" ? profileRes.value.data as Record<string, unknown> | null : null;
  const attempts   = (recentRes.status === "fulfilled" ? recentRes.value.data ?? [] : []) as Attempt[];
  const todayCount = todayRes.status === "fulfilled" ? (todayRes.value.count ?? 0) : 0;
  const allData    = allRes.status === "fulfilled" ? allRes.value.data : null;

  // Compute streak server-side
  let streak = 0;
  if (allData?.length) {
    const uniqueDays = new Set(allData.map((a: { created_at: string }) => new Date(a.created_at).toDateString()));
    const d = new Date();
    while (uniqueDays.has(d.toDateString())) { streak++; d.setDate(d.getDate() - 1); }
  }

  const bestBand         = attempts.length ? Math.max(...attempts.map(a => a.overall_band)) : null;
  const writingAttempts  = attempts.filter(a => a.mode === "writing");
  const speakingAttempts = attempts.filter(a => a.mode === "speaking");
  const listeningAttempts= attempts.filter(a => a.mode === "listening");
  const readingAttempts  = attempts.filter(a => a.mode === "reading");
  const avgBand          = attempts.length ? (attempts.reduce((s, a) => s + a.overall_band, 0) / attempts.length).toFixed(1) : null;
  const remaining       = 10 - todayCount;
  const dailyTip        = getDailyTip();

  // ── IELTS Readiness: average of best Writing + best Speaking this week ────
  const bestWriting  = writingAttempts.length  ? Math.max(...writingAttempts.map(a => a.overall_band))  : null;
  const bestSpeaking = speakingAttempts.length ? Math.max(...speakingAttempts.map(a => a.overall_band)) : null;
  const readinessBand: number | null =
    bestWriting != null && bestSpeaking != null
      ? roundBand((bestWriting + bestSpeaking) / 2)
      : bestWriting  != null ? roundBand(bestWriting)
      : bestSpeaking != null ? roundBand(bestSpeaking)
      : null;

  return (
    <div className="space-y-5">

      {/* ── Hero greeting ──────────────────────────────────────────────── */}
      <div className="fade-up rounded-2xl px-5 py-5 relative overflow-hidden"
        style={{
          animationDelay: "0ms",  // keep at 0 — hero is instant
          background: "#ffffff",
          border: "1px solid #efe4e2",
        }}>

        {/* Noise texture — feTurbulence fractal noise at 3% opacity */}
        <svg
          aria-hidden="true"
          focusable="false"
          className="absolute inset-0 h-full w-full pointer-events-none"
          style={{ opacity: 0.03 }}
        >
          <defs>
            <filter id="hero-grain" x="0%" y="0%" width="100%" height="100%"
              colorInterpolationFilters="sRGB">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.68 0.68"
                numOctaves="4"
                stitchTiles="stitch"
                result="noise"
              />
              <feColorMatrix type="saturate" values="0" />
            </filter>
          </defs>
          <rect width="100%" height="100%" filter="url(#hero-grain)" />
        </svg>

        <div className="relative">
          <h1 className="text-2xl font-display tracking-heading">Hey, {firstName} 👋</h1>
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
            {streak > 0
              ? <><span className="flame">🔥</span>{` ${streak}-day streak! Keep the momentum going.`}</>
              : "Every attempt gets you closer to your target. Let's practice."}
          </p>
          <div className="flex gap-2 mt-4">
            <Link href="/writing"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: "#ef4444",
                boxShadow: "0 4px 0 #dc2626, 0 6px 16px #ef444440",
              }}>
              <BookOpen className="w-3.5 h-3.5" /> Write now
            </Link>
            <Link href="/speaking"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: "white",
                color: "#0b1c30",
                border: "1px solid #d1d5db",
                boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
              }}>
              <Mic className="w-3.5 h-3.5" style={{ color: "#ef4444" }} /> Speak now
            </Link>
          </div>
        </div>
      </div>

      {/* ── Practice Today — tells student exactly what to do ── */}
      <PracticeToday attempts={attempts} />

      {/* ── Exam date countdown ── */}
      <ExamCountdown />

      {/* ── Onboarding card — shown only on first visit (zero attempts ever) ── */}
      {!allData?.length && (
        <div className="fade-up rounded-2xl border-2 border-dashed px-5 py-5 space-y-4"
          style={{ borderColor: "#fecaca", animationDelay: "20ms" }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "rgba(220,38,38,0.12)" }}>
              <span className="text-lg">🚀</span>
            </div>
            <div>
              <p className="font-semibold text-sm">Welcome! Here&apos;s how to get started</p>
              <p className="text-xs text-muted-foreground mt-0.5">Complete your first attempt to unlock progress tracking</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { step: "1", icon: "✍️", title: "Try Writing Task 2", desc: "Write a 250-word essay. Get scored on 4 real IELTS criteria in under 15 seconds.", href: "/writing", cta: "Start Writing" },
              { step: "2", icon: "🎙️", title: "Try Speaking Part 1", desc: "Record a 30–40 second answer. Get band scores for fluency, vocabulary, grammar & pronunciation.", href: "/speaking", cta: "Start Speaking" },
              { step: "3", icon: "📈", title: "Track your progress", desc: "After 2+ attempts your band score chart appears here automatically.", href: "/history", cta: "View History" },
            ].map(({ step, icon, title, desc, href, cta }) => (
              <Link key={step} href={href}
                className="group flex flex-col gap-2 p-3.5 rounded-xl border bg-card card-hover-default">
                <div className="flex items-center gap-2">
                  <span className="text-base">{icon}</span>
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Step {step}</span>
                </div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                <span className="text-xs font-semibold flex items-center gap-1 mt-auto" style={{ color: "#ef4444" }}>
                  {cta} <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── Daily tip ───────────────────────────────────────────────────── */}
      <div className="fade-up rounded-2xl px-4 py-3.5 flex gap-3 items-start"
        style={{
          animationDelay: "40ms",
          background: "linear-gradient(135deg, oklch(0.82 0.14 55 / 12%), oklch(0.82 0.14 55 / 6%))",
          border: "1px solid oklch(0.82 0.14 55 / 25%)",
        }}>
        <div className="w-7 h-7 rounded-lg shrink-0 flex items-center justify-center mt-0.5"
          style={{ background: "oklch(0.82 0.14 55 / 20%)" }}>
          <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
        </div>
        <div>
          <p className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-0.5">
            Tip of the day · {dailyTip.category}
          </p>
          <p className="text-sm text-foreground leading-relaxed">{dailyTip.tip}</p>
        </div>
      </div>

      {/* ── Stats row — each card fades up individually ─────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="fade-up stat-card" style={{ animationDelay: "60ms" }}>
          <CardContent className="card-inner">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Today</p>
              <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "rgba(5,150,105,0.12)" }}>
                <TrendingUp className="w-3 h-3" style={{ color: "#ef4444" }} />
              </div>
            </div>
            <p className="text-3xl font-display leading-none tracking-nums">
              <CountUp to={todayCount} />
              <span className="text-sm font-normal text-muted-foreground">/10</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1.5">
              {remaining > 0
                ? <span className="text-red-600 dark:text-red-400 font-medium">{remaining} remaining</span>
                : <span className="text-amber-600 font-medium">Limit reached</span>}
            </p>
          </CardContent>
        </Card>

        <Card className="fade-up stat-card" style={{ animationDelay: "80ms" }}>
          <CardContent className="card-inner">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Streak</p>
              <div className="w-6 h-6 rounded-lg bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center">
                <Flame className="w-3 h-3 text-orange-500" />
              </div>
            </div>
            <p className="text-3xl font-display leading-none tracking-nums">
              {streak > 0
                ? <CountUp to={streak} className="text-orange-500" />
                : <span className="text-muted-foreground">0</span>}
            </p>
            <p className="text-xs text-muted-foreground mt-1.5">
              {streak > 2
                ? <span className="text-orange-500 font-medium"><span className="flame">🔥</span> on fire!</span>
                : streak === 1 ? "day in a row" : "days in a row"}
            </p>
          </CardContent>
        </Card>

        <Card className="fade-up stat-card" style={{ animationDelay: "100ms" }}>
          <CardContent className="card-inner flex flex-col items-center gap-2.5">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider self-start">
              Best this week
            </p>
            <BandRing band={bestBand != null ? roundBand(bestBand) : null} />
          </CardContent>
        </Card>

        <Card className="fade-up stat-card" style={{ animationDelay: "120ms" }}>
          <CardContent className="card-inner">
            <TargetBandSetter
              userId={userId}
              currentTarget={(profile?.target_band as number) ?? null}
              currentAvg={bestBand}
            />
          </CardContent>
        </Card>
      </div>

      {/* ── IELTS Readiness band ────────────────────────────────────────── */}
      {readinessBand != null && (
        <ScrollReveal>
        <Card className="fade-up" style={{ animationDelay: "140ms" }}>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "linear-gradient(135deg, rgba(220,38,38,0.12), rgba(220,38,38,0.06))" }}>
                  <GraduationCap className="w-4 h-4" style={{ color: "#ef4444" }} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    IELTS Readiness
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {bestWriting != null && bestSpeaking != null
                      ? `Writing ${formatBand(bestWriting)} + Speaking ${formatBand(bestSpeaking)} avg`
                      : bestWriting != null
                      ? "Based on Writing — add Speaking for full score"
                      : "Based on Speaking — add Writing for full score"}
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className={`text-3xl font-mono font-bold tracking-nums ${getBandTailwind(readinessBand)}`}>
                  {formatBand(readinessBand)}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {readinessBand >= 7 ? "University ready ✓"
                    : readinessBand >= 6 ? "Almost there"
                    : readinessBand >= 5 ? "Keep practising"
                    : "Needs improvement"}
                </p>
              </div>
            </div>
            {/* Sub-skill breakdown bar */}
            {bestWriting != null && bestSpeaking != null && (
              <div className="mt-3 pt-3 border-t border-border/60 grid grid-cols-2 gap-3">
                {[
                  { label: "Writing",  band: bestWriting,  icon: "✍️" },
                  { label: "Speaking", band: bestSpeaking, icon: "🎤" },
                ].map(({ label, band, icon }) => (
                  <div key={label} className="flex items-center gap-2">
                    <span className="text-sm">{icon}</span>
                    <div className="flex-1">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">{label}</span>
                        <span className={`font-mono font-semibold ${getBandTailwind(band)}`}>{formatBand(band)}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                        <div className={`h-full rounded-full ${getBandBg(band)}`}
                          style={{ width: `${Math.min(100, (band / 9) * 100)}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        </ScrollReveal>
      )}

      {/* ── Progress to target ──────────────────────────────────────────── */}
      {profile?.target_band != null && bestBand != null && (() => {
        const target = profile!.target_band as number;
        const pct    = Math.min(100, (bestBand / target) * 100);
        const reached = bestBand >= target;
        return (
          <ScrollReveal>
          <Card>
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Journey to Band {target.toFixed(1)}
                  </p>
                  {reached && (
                    <p className="text-xs text-red-600 dark:text-red-400 font-medium mt-0.5">
                      🎉 Target reached this week!
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <CountUp to={roundBand(bestBand)} decimals={1} className={`text-xl font-mono font-bold tracking-nums ${getBandTailwind(bestBand)}`} />
                  <span className="text-xs text-muted-foreground"> / {target.toFixed(1)}</span>
                </div>
              </div>
              <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${getBandBg(bestBand)}`}
                  style={{ width: `${pct}%`, boxShadow: reached ? "0 0 8px currentColor" : undefined }}
                />
              </div>
              {!reached && (
                <p className="text-xs text-muted-foreground mt-2">
                  <CountUp to={parseFloat((target - bestBand).toFixed(1))} decimals={1} className="font-semibold text-foreground" suffix=" bands" />
                  {" "}to reach your goal — you&apos;re <CountUp to={Math.round(pct)} suffix="%" /> there
                </p>
              )}
              {attempts.length >= 2 && (
                <div className="mt-3 pt-3 border-t border-border/60">
                  <BandSparkline attempts={attempts} />
                </div>
              )}
            </CardContent>
          </Card>
          </ScrollReveal>
        );
      })()}

      {/* Progress card without target */}
      {(profile?.target_band == null || bestBand == null) && attempts.length >= 2 && (
        <ScrollReveal>
        <Card>
          <CardContent className="pt-4 pb-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">This week&apos;s trend</p>
            <BandSparkline attempts={attempts} />
            <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
              <span>✍️ <CountUp to={writingAttempts.length} /> writing</span>
              <span>🎤 <CountUp to={speakingAttempts.length} /> speaking</span>
              {avgBand && (
                <span>Avg: <CountUp to={parseFloat(avgBand)} decimals={1} className="font-mono font-semibold" /></span>
              )}
            </div>
          </CardContent>
        </Card>
        </ScrollReveal>
      )}

      {/* ── All 4 module cards ──────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            href: "/writing", label: "Writing",
            sub: "Task 1 & Task 2",
            icon: BookOpen, iconColor: "text-red-600",
            bg: "linear-gradient(135deg, rgba(220,38,38,0.06), rgba(220,38,38,0.03))",
            iconBg: "linear-gradient(135deg, rgba(220,38,38,0.18), rgba(220,38,38,0.08))",
            statColor: "text-red-600 dark:text-red-400",
            arrowColor: "text-red-400",
            count: writingAttempts.length,
            bestBandVal: writingAttempts.length ? Math.max(...writingAttempts.map(a => a.overall_band)) : null,
          },
          {
            href: "/speaking", label: "Speaking",
            sub: "Parts 1, 2 & 3",
            icon: Mic, iconColor: "text-red-600",
            bg: "linear-gradient(135deg, rgba(220,38,38,0.06), rgba(220,38,38,0.03))",
            iconBg: "linear-gradient(135deg, rgba(220,38,38,0.18), rgba(220,38,38,0.08))",
            statColor: "text-red-600 dark:text-red-400",
            arrowColor: "text-red-400",
            count: speakingAttempts.length,
            bestBandVal: speakingAttempts.length ? Math.max(...speakingAttempts.map(a => a.overall_band)) : null,
          },
          {
            href: "/reading", label: "Reading",
            sub: "3 passages · 40 Q",
            icon: BookMarked, iconColor: "text-sky-500",
            bg: "linear-gradient(135deg, rgba(14,165,233,0.07), rgba(56,189,248,0.04))",
            iconBg: "linear-gradient(135deg, rgba(14,165,233,0.2), rgba(14,165,233,0.1))",
            statColor: "text-sky-600 dark:text-sky-400",
            arrowColor: "text-sky-400",
            count: readingAttempts.length,
            bestBandVal: readingAttempts.length ? Math.max(...readingAttempts.map(a => a.overall_band)) : null,
          },
          {
            href: "/listening", label: "Listening",
            sub: "4 parts · 40 Q",
            icon: Headphones, iconColor: "text-amber-500",
            bg: "linear-gradient(135deg, rgba(245,158,11,0.07), rgba(251,191,36,0.04))",
            iconBg: "linear-gradient(135deg, rgba(245,158,11,0.2), rgba(245,158,11,0.1))",
            statColor: "text-amber-600 dark:text-amber-400",
            arrowColor: "text-amber-400",
            count: listeningAttempts.length,
            bestBandVal: listeningAttempts.length ? Math.max(...listeningAttempts.map(a => a.overall_band)) : null,
          },
        ].map(({ href, label, sub, icon: Icon, iconColor, bg, iconBg, statColor, arrowColor, count, bestBandVal }, i) => (
          <ScrollReveal key={label} className="h-full" delay={i * 40}>
          <Link href={href} className="group h-full block">
            <div className="rounded-2xl p-4 h-full cursor-pointer transition-all duration-150 hover:scale-[1.02]"
              style={{ background: bg, border: "1px solid rgba(0,0,0,0.04)" }}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="w-9 h-9 rounded-xl mb-2.5 flex items-center justify-center" style={{ background: iconBg }}>
                    <Icon className={`w-4 h-4 ${iconColor}`} />
                  </div>
                  <p className="text-sm font-extrabold tracking-tight">{label}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{sub}</p>
                  {/* Progress bar */}
                  <div className="mt-2.5 space-y-1">
                    <div className="h-1 rounded-full bg-black/5 dark:bg-white/10 overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: bestBandVal ? `${Math.min(100, (bestBandVal / 9) * 100)}%` : "0%",
                          background: bestBandVal ? iconBg.replace("0.2", "0.6").replace("0.1","0.4") : "transparent",
                        }} />
                    </div>
                    <p className={`text-[10px] font-semibold ${statColor}`}>
                      {count > 0
                        ? bestBandVal
                          ? `Best: ${bestBandVal.toFixed(1)} · ${count} session${count > 1 ? "s" : ""}`
                          : `${count} session${count > 1 ? "s" : ""} this week`
                        : "Start practising →"}
                    </p>
                  </div>
                </div>
                <ArrowRight className={`w-3.5 h-3.5 ${arrowColor} group-hover:translate-x-0.5 transition-transform duration-150 mt-1 shrink-0`} />
              </div>
            </div>
          </Link>
          </ScrollReveal>
        ))}
      </div>


      {/* ── Recent attempts ─────────────────────────────────────────────── */}
      {attempts.length > 0 ? (
        <div>
          <ScrollReveal>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold tracking-tight text-foreground">Recent attempts</h2>
            <Link href="/history"
              className="text-xs font-medium text-red-600 dark:text-red-400 hover:underline underline-offset-2 flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          </ScrollReveal>
          <div className="space-y-2">
            {attempts.slice(0, 5).map((attempt, i) => (
              <ScrollReveal key={attempt.id} delay={i * 60}>
              <Link href={`/history/${attempt.id}`} className="block">
                <div className="flex items-center gap-3.5 px-4 py-3 rounded-2xl bg-card shadow-card cursor-pointer card-hover-default">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    attempt.mode === "writing" ? "bg-red-100 dark:bg-red-900/50" : "bg-red-100 dark:bg-red-900/50"
                  }`}>
                    {attempt.mode === "writing"
                      ? <BookOpen className="w-4 h-4 text-red-600" />
                      : <Mic className="w-4 h-4 text-red-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold capitalize leading-none tracking-tight">
                      {attempt.mode} · {attempt.task_type.replace(/([a-z])([0-9])/g, "$1 $2").toUpperCase()}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(attempt.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                  <div className={`px-2.5 py-1 rounded-xl font-mono font-bold text-sm tracking-nums shrink-0 ${
                    attempt.overall_band >= 7
                      ? "bg-red-50 dark:bg-red-900/40 text-red-700 dark:text-red-300"
                      : attempt.overall_band >= 5.5
                      ? "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300"
                      : "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300"
                  }`}>
                    <CountUp to={attempt.overall_band} decimals={1} duration={1000} />
                  </div>
                </div>
              </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      ) : (
        <ScrollReveal>
        <div className="rounded-2xl border-2 border-dashed border-border p-10 text-center">
          <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-7 h-7 text-muted-foreground" />
          </div>
          <p className="text-lg font-bold tracking-tight mb-1">Start your first session</p>
          <p className="text-sm text-muted-foreground mb-5 max-w-xs mx-auto">
            Complete a Writing or Speaking task to receive your first band score and personalised feedback.
          </p>
          <div className="flex gap-2 justify-center">
            <Link href="/writing"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.02]"
              style={{ background: "#ef4444", boxShadow: "0 4px 12px rgba(220,38,38,0.3)" }}>
              <BookOpen className="w-3.5 h-3.5" /> Try Writing
            </Link>
            <Link href="/speaking"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border border-border hover:border-red-300 transition-all hover:scale-[1.02]">
              <Mic className="w-3.5 h-3.5 text-red-600" /> Try Speaking
            </Link>
          </div>
        </div>
        </ScrollReveal>
      )}
    </div>
  );
}
