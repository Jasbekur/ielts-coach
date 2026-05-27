export const revalidate = 0;

import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { BookOpen, Mic, TrendingUp, ArrowRight, Flame, Lightbulb } from "lucide-react";
import { getBandTailwind, getBandBg, Attempt } from "@/types/ielts";
import { TargetBandSetter } from "@/components/dashboard/TargetBandSetter";

// ─── Daily IELTS Tips (rotate by day of year) ─────────────────────────────
const IELTS_TIPS = [
  { category: "Writing T2", tip: 'Never write "I am agree". Correct: "I agree" or "I strongly agree". There is no "am" with agree/disagree.' },
  { category: "Writing T2", tip: 'Don\'t say "According to my opinion". Say "In my opinion" or "I believe" or "From my perspective".' },
  { category: "Writing T2", tip: '"Peoples", "informations", "advices" are WRONG. People, information, advice — these words have no plural form in English.' },
  { category: "Writing T2", tip: "Always address ALL parts of the question. If it says 'Discuss both views AND give your opinion' — you must do all three." },
  { category: "Writing T1", tip: 'Every Task 1 report MUST have an overview paragraph. Start it with: "Overall, it is clear that..." Without an overview, your score is capped at 5.0.' },
  { category: "Writing T1", tip: "Task 1 is NOT about your opinion. Never write 'I think' or 'In my opinion'. Just describe the data objectively." },
  { category: "Writing T1", tip: "Always include specific numbers: not just 'increased' but 'increased by 15%, from 20% to 35%'." },
  { category: "Speaking", tip: 'Extend your Part 1 answers! Use the AREA technique: Answer → Reason → Example → Alternative. Never give a one-word answer.' },
  { category: "Speaking", tip: 'Practice the "th" sound: put your tongue between your teeth. "the", "this", "think", "three". Not "ze", "dis", "tink".' },
  { category: "Speaking", tip: 'In Part 2, speak for the FULL 2 minutes. Prepare these 4 points: what/who, when/where, how/why, how you felt. That is 30 seconds each.' },
  { category: "Speaking", tip: 'Replace basic words: "nice" → "fascinating/delightful", "good" → "exceptional/beneficial", "bad" → "detrimental/concerning".' },
  { category: "Grammar", tip: 'Use "the" before specific/known nouns: "I go to the university where I study" (specific one). "I want to go to university" (general idea).' },
  { category: "Grammar", tip: '"depend on" NOT "depend of". "interested in" NOT "interested on". "good at" NOT "good in". Prepositions must be memorised.' },
  { category: "Grammar", tip: 'Vary your sentence structures. Use: relative clauses (which/that/who), conditionals (If... would...), and passive voice (It is believed that...).' },
  { category: "Vocabulary", tip: 'Learn collocations, not just single words. "make a decision" ✅, "do a decision" ❌. "do research" ✅, "make a research" ❌.' },
  { category: "Exam Strategy", tip: "Task 2 is worth more marks than Task 1. Spend 40 minutes on Task 2 and 20 minutes on Task 1. Always do Task 2 first if you are short on time." },
  { category: "Exam Strategy", tip: "For Band 7 Writing: 250+ words, clear paragraphs, varied vocabulary, no repeated word errors, address ALL parts of the question." },
  { category: "Exam Strategy", tip: "For Band 7 Speaking: speak without long pauses, use a range of tenses, self-correct naturally, use discourse markers: Well, Actually, Having said that, As far as I know..." },
];

function getDailyTip() {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  return IELTS_TIPS[dayOfYear % IELTS_TIPS.length];
}

// ─── Mini sparkline for last 7 attempts ───────────────────────────────────
function BandSparkline({ attempts }: { attempts: Attempt[] }) {
  const last7 = [...attempts].reverse().slice(-7);
  if (last7.length < 2) return null;

  const min = 4;
  const max = 9;
  const w = 160;
  const h = 40;

  const points = last7.map((a, i) => {
    const x = (i / (last7.length - 1)) * w;
    const y = h - ((a.overall_band - min) / (max - min)) * h;
    return `${x},${y}`;
  });

  const lastBand = last7[last7.length - 1].overall_band;
  const firstBand = last7[0].overall_band;
  const improving = lastBand >= firstBand;

  return (
    <div className="flex items-center gap-3">
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="shrink-0">
        <polyline
          points={points.join(" ")}
          fill="none"
          stroke={improving ? "#10b981" : "#f59e0b"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {last7.map((a, i) => {
          const x = (i / (last7.length - 1)) * w;
          const y = h - ((a.overall_band - min) / (max - min)) * h;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="3"
              fill={i === last7.length - 1 ? "#8b5cf6" : "#e5e7eb"}
              stroke={i === last7.length - 1 ? "#8b5cf6" : "#9ca3af"}
              strokeWidth="1.5"
            />
          );
        })}
      </svg>
      <div className="text-xs text-muted-foreground">
        <span className={improving ? "text-emerald-500" : "text-amber-500"}>
          {improving ? "↑" : "↓"} {Math.abs(lastBand - firstBand).toFixed(1)} bands
        </span>
        <span className="ml-1">this week</span>
      </div>
    </div>
  );
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles").select("*").eq("id", user!.id).single();

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const { data: recentAttempts } = await supabase
    .from("attempts").select("*").eq("user_id", user!.id)
    .gte("created_at", sevenDaysAgo.toISOString())
    .order("created_at", { ascending: false }).limit(20);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const { count: todayCount } = await supabase
    .from("attempts").select("id", { count: "exact", head: true })
    .eq("user_id", user!.id).gte("created_at", today.toISOString());

  // Streak: count consecutive days with at least 1 attempt
  const { data: allAttempts } = await supabase
    .from("attempts").select("created_at").eq("user_id", user!.id)
    .order("created_at", { ascending: false }).limit(100);

  let streak = 0;
  if (allAttempts && allAttempts.length > 0) {
    const uniqueDays = new Set(allAttempts.map(a => new Date(a.created_at).toDateString()));
    const checkDate = new Date();
    while (uniqueDays.has(checkDate.toDateString())) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    }
  }

  const attempts = (recentAttempts ?? []) as Attempt[];
  const bestBand = attempts.length ? Math.max(...attempts.map(a => a.overall_band)) : null;
  const writingAttempts = attempts.filter(a => a.mode === "writing");
  const speakingAttempts = attempts.filter(a => a.mode === "speaking");
  const avgBand = attempts.length ? (attempts.reduce((s, a) => s + a.overall_band, 0) / attempts.length).toFixed(1) : null;

  const firstName = profile?.full_name?.split(" ")[0] || "there";
  const dailyTip = getDailyTip();
  const remaining = 10 - (todayCount ?? 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Hey, {firstName} 👋</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Every attempt gets you closer to your target. Let&apos;s practice.
        </p>
      </div>

      {/* Daily tip */}
      <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950 dark:border-amber-800">
        <CardContent className="pt-4 pb-4">
          <div className="flex gap-3 items-start">
            <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-wider mb-1">
                Daily Tip — {dailyTip.category}
              </p>
              <p className="text-sm text-amber-900 dark:text-amber-100 leading-relaxed">
                {dailyTip.tip}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card>
          <CardContent className="pt-4 pb-3">
            <p className="text-xs text-muted-foreground">Today</p>
            <p className="text-2xl font-mono font-bold mt-1">
              {todayCount ?? 0}
              <span className="text-sm font-normal text-muted-foreground">/10</span>
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {remaining > 0 ? `${remaining} left` : "Limit reached"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 pb-3">
            <div className="flex items-center gap-1.5 mb-1">
              <Flame className={`w-3.5 h-3.5 ${streak > 0 ? "text-orange-500" : "text-muted-foreground"}`} />
              <p className="text-xs text-muted-foreground">Streak</p>
            </div>
            <p className="text-2xl font-mono font-bold">{streak}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{streak === 1 ? "day" : "days"} in a row</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 pb-3">
            <p className="text-xs text-muted-foreground">Best this week</p>
            <p className={`text-2xl font-mono font-bold mt-1 ${bestBand ? getBandTailwind(bestBand) : "text-muted-foreground"}`}>
              {bestBand ? bestBand.toFixed(1) : "—"}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">overall band</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 pb-3">
            <TargetBandSetter userId={user!.id} currentTarget={profile?.target_band ?? null} />
            <p className="text-2xl font-mono font-bold text-violet-500 mt-1">
              {profile?.target_band ? profile.target_band.toFixed(1) : "—"}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">goal band</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress sparkline */}
      {attempts.length >= 2 && (
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                This Week&apos;s Progress
              </CardTitle>
              {avgBand && (
                <span className="text-xs text-muted-foreground">
                  Avg: <span className="font-mono font-semibold">{avgBand}</span>
                </span>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <BandSparkline attempts={attempts} />
            <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
              <span>✍️ {writingAttempts.length} writing</span>
              <span>🎤 {speakingAttempts.length} speaking</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick actions */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Link href="/writing">
          <Card className="group hover:border-violet-300 hover:shadow-sm transition-all cursor-pointer h-full">
            <CardContent className="pt-5 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-900 flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-violet-500" />
                    </div>
                    <span className="font-semibold text-sm">Writing</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Task 1 (Academic) & Task 2 (Essay)</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{writingAttempts.length} sessions this week</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/speaking">
          <Card className="group hover:border-violet-300 hover:shadow-sm transition-all cursor-pointer h-full">
            <CardContent className="pt-5 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
                      <Mic className="w-4 h-4 text-emerald-500" />
                    </div>
                    <span className="font-semibold text-sm">Speaking</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Parts 1, 2 (Cue Card), and 3</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{speakingAttempts.length} sessions this week</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Band target progress bar */}
      {profile?.target_band && bestBand && (
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Progress to Band {profile.target_band.toFixed(1)}
              </p>
              <span className="text-xs text-muted-foreground">
                {bestBand.toFixed(1)} / {profile.target_band.toFixed(1)}
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${getBandBg(bestBand)}`}
                style={{ width: `${Math.min(100, (bestBand / profile.target_band) * 100)}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1.5">
              {bestBand >= profile.target_band
                ? "🎉 You've reached your target band this week!"
                : `${(profile.target_band - bestBand).toFixed(1)} bands to go`}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Recent attempts */}
      {attempts.length > 0 ? (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-sm">Recent attempts</h2>
            <Link href="/history" className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2">
              View all
            </Link>
          </div>
          <div className="space-y-2">
            {attempts.slice(0, 5).map((attempt) => (
              <Link key={attempt.id} href={`/history/${attempt.id}`}>
                <Card className="hover:border-violet-300 transition-colors cursor-pointer">
                  <CardContent className="py-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 ${
                        attempt.mode === "writing" ? "bg-violet-100 dark:bg-violet-900" : "bg-emerald-100 dark:bg-emerald-900"
                      }`}>
                        {attempt.mode === "writing"
                          ? <BookOpen className="w-3.5 h-3.5 text-violet-500" />
                          : <Mic className="w-3.5 h-3.5 text-emerald-500" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium capitalize">
                          {attempt.mode} — {attempt.task_type.replace(/([a-z])([0-9])/g, "$1 $2").toUpperCase()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(attempt.created_at).toLocaleDateString("en-US", {
                            month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
                          })}
                        </p>
                      </div>
                      <span className={`font-mono font-bold text-lg shrink-0 ${getBandTailwind(attempt.overall_band)}`}>
                        {attempt.overall_band.toFixed(1)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <Card className="border-dashed">
          <CardContent className="pt-8 pb-8 flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-muted-foreground" />
            </div>
            <div className="text-center">
              <p className="font-medium text-sm">No attempts yet this week</p>
              <p className="text-xs text-muted-foreground mt-1">Start with Writing or Speaking to get your first band score</p>
            </div>
            <div className="flex gap-2">
              <Link href="/writing" className="text-xs bg-violet-500 text-white px-3 py-1.5 rounded-md hover:bg-violet-600 transition-colors">
                Try Writing
              </Link>
              <Link href="/speaking" className="text-xs border border-border px-3 py-1.5 rounded-md hover:bg-accent transition-colors">
                Try Speaking
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
