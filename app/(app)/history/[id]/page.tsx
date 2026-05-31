export const revalidate = 0;

import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { ScoreCard } from "@/components/writing/ScoreCard";
import { CorrectionsView } from "@/components/writing/CorrectionsView";
import { BandRewrite } from "@/components/writing/BandRewrite";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BandScoreRing } from "@/components/shared/BandScoreRing";
import Link from "next/link";
import { ArrowLeft, BookOpen, Mic, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { WritingResult, SpeakingResult, getBandTailwind } from "@/types/ielts";

const ESSAY_TYPE_LABELS: Record<string, { label: string; color: string }> = {
  opinion:                    { label: "Opinion Essay",               color: "bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300" },
  discuss_both_views:         { label: "Discuss Both Views",          color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" },
  problem_solution:           { label: "Problem & Solution",          color: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300" },
  advantages_disadvantages:   { label: "Advantages & Disadvantages",  color: "bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300" },
  direct_question:            { label: "Direct Question",             color: "bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300" },
};

export default async function AttemptDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const { redirect } = await import("next/navigation");
    redirect("/login");
  }

  const userId = user!.id;

  const { data: attempt, error } = await supabase
    .from("attempts")
    .select("*")
    .eq("id", id)
    .eq("user_id", userId)
    .single();

  if (error || !attempt) notFound();

  const isWriting = attempt.mode === "writing";
  const result = attempt.result as WritingResult | SpeakingResult;
  const taskLabel = attempt.task_type
    .replace(/([a-z])([0-9])/g, "$1 $2")
    .toUpperCase();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-3">
        <Link
          href="/history"
          className="mt-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <div
              className={`w-7 h-7 rounded-md flex items-center justify-center ${
                isWriting
                  ? "bg-violet-100 dark:bg-violet-950"
                  : "bg-emerald-100 dark:bg-emerald-950"
              }`}
            >
              {isWriting ? (
                <BookOpen className="w-3.5 h-3.5 text-violet-500" />
              ) : (
                <Mic className="w-3.5 h-3.5 text-emerald-500" />
              )}
            </div>
            <h1 className="text-xl font-bold capitalize">{attempt.mode}</h1>
            <Badge variant="outline">{taskLabel}</Badge>
            {/* Essay type badge for writing */}
            {isWriting && (result as WritingResult).essay_type && (() => {
              const et = ESSAY_TYPE_LABELS[(result as WritingResult).essay_type!];
              return et ? (
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${et.color}`}>
                  {et.label}
                </span>
              ) : null;
            })()}
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {new Date(attempt.created_at).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <div className="text-right shrink-0">
          <span
            className={`font-mono font-bold text-2xl ${getBandTailwind(
              attempt.overall_band
            )}`}
          >
            {attempt.overall_band.toFixed(1)}
          </span>
          <p className="text-xs text-muted-foreground mt-0.5">
            {attempt.overall_band >= 8.5 ? "Very Good+" :
             attempt.overall_band >= 8   ? "Very Good" :
             attempt.overall_band >= 7.5 ? "Good+" :
             attempt.overall_band >= 7   ? "Good" :
             attempt.overall_band >= 6.5 ? "Competent+" :
             attempt.overall_band >= 6   ? "Competent" :
             attempt.overall_band >= 5.5 ? "Modest+" :
             attempt.overall_band >= 5   ? "Modest" : "Limited"}
          </p>
        </div>
      </div>

      {/* Task 1 overview warning */}
      {isWriting && attempt.task_type === "task1" && (result as WritingResult).has_overview === false && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-200 dark:bg-red-950 dark:border-red-800">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
          <p className="text-sm text-red-700 dark:text-red-300">
            <strong>Missing Overview!</strong> Task 1 reports must have an overview paragraph. Without it, your score is capped at Band 5. Start your overview with: <em>&quot;Overall, it is clear that...&quot;</em>
          </p>
        </div>
      )}

      {/* Prompt */}
      {attempt.prompt_text && (
        <Card className="bg-muted/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {isWriting ? "Question" : "Prompt"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">{attempt.prompt_text}</p>
          </CardContent>
        </Card>
      )}

      {/* Writing results */}
      {isWriting && (() => {
        const writingResult = result as WritingResult;
        return (
          <>
            {attempt.input_text && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Your answer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed font-mono whitespace-pre-wrap">
                    {attempt.input_text}
                  </p>
                </CardContent>
              </Card>
            )}
            <ScoreCard
              result={writingResult}
              taskType={attempt.task_type as "task1" | "task2"}
            />

            {/* Strengths & Weaknesses */}
            {(writingResult.strengths?.length > 0 || writingResult.weaknesses?.length > 0) && (
              <div className="grid sm:grid-cols-2 gap-4">
                {writingResult.strengths?.length > 0 && (
                  <Card className="border-emerald-200 dark:border-emerald-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xs font-medium uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                        ✓ Strengths
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1.5">
                        {writingResult.strengths.map((s, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
                {writingResult.weaknesses?.length > 0 && (
                  <Card className="border-red-200 dark:border-red-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xs font-medium uppercase tracking-wider text-red-600 dark:text-red-400">
                        ✗ Areas to Improve
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1.5">
                        {writingResult.weaknesses.map((w, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <AlertCircle className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                            <span>{w}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            <CorrectionsView result={writingResult} />
            <BandRewrite result={writingResult} />

            {/* Next Actions */}
            {writingResult.next_actions?.length > 0 && (
              <Card className="border-violet-200 dark:border-violet-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-medium uppercase tracking-wider text-violet-600 dark:text-violet-400">
                    📋 Action Plan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-2">
                    {writingResult.next_actions.map((action, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="w-5 h-5 rounded-full bg-violet-100 dark:bg-violet-900 text-violet-600 dark:text-violet-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span>{action}</span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            )}
          </>
        );
      })()}

      {/* Speaking results */}
      {!isWriting && (() => {
        const speakingResult = result as SpeakingResult;
        const criteria = [
          { key: "fluency_coherence", label: "Fluency & Coherence", value: speakingResult.scores.fluency_coherence },
          { key: "lexical_resource", label: "Lexical Resource", value: speakingResult.scores.lexical_resource },
          { key: "grammatical_range", label: "Grammar & Accuracy", value: speakingResult.scores.grammatical_range },
          { key: "pronunciation", label: "Pronunciation", value: speakingResult.scores.pronunciation },
        ];

        return (
          <div className="space-y-4">
            {/* Overview card */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <BandScoreRing band={speakingResult.scores.overall} size={130} />
                  <div className="flex-1 space-y-2">
                    <p className="text-sm text-muted-foreground">{speakingResult.summary}</p>
                    <div className="flex gap-3 text-xs text-muted-foreground flex-wrap">
                      <span>{speakingResult.word_count} words</span>
                      <span>{Math.round(speakingResult.duration_seconds)}s spoken</span>
                      {speakingResult.words_per_minute && (
                        <span>{speakingResult.words_per_minute} wpm</span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Criterion scores */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Criterion Scores</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {criteria.map(({ key, label, value }) => (
                    <BandScoreRing key={key} band={value} size={80} strokeWidth={7} label={label} />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Strengths & Weaknesses */}
            {(speakingResult.strengths?.length > 0 || speakingResult.weaknesses?.length > 0) && (
              <div className="grid sm:grid-cols-2 gap-4">
                {speakingResult.strengths?.length > 0 && (
                  <Card className="border-emerald-200 dark:border-emerald-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xs font-medium uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                        ✓ Strengths
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1.5">
                        {speakingResult.strengths.map((s, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
                {speakingResult.weaknesses?.length > 0 && (
                  <Card className="border-red-200 dark:border-red-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xs font-medium uppercase tracking-wider text-red-600 dark:text-red-400">
                        ✗ Areas to Improve
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1.5">
                        {speakingResult.weaknesses.map((w, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <AlertCircle className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                            <span>{w}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Transcript */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Transcript</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-mono leading-relaxed whitespace-pre-wrap">{speakingResult.transcript}</p>
              </CardContent>
            </Card>

            {/* Pronunciation issues */}
            {speakingResult.pronunciation_issues?.length > 0 && (
              <Card className="border-orange-200 dark:border-orange-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-medium uppercase tracking-wider text-orange-600 dark:text-orange-400">
                    🗣 Pronunciation Issues
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {speakingResult.pronunciation_issues.map((p, i) => (
                      <div key={i} className="text-sm">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-mono font-semibold text-orange-600 dark:text-orange-400">&quot;{p.word}&quot;</span>
                          <ArrowRight className="w-3 h-3 text-muted-foreground" />
                          <span className="font-medium">{p.fix}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{p.issue}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Grammar issues */}
            {speakingResult.grammar_issues?.length > 0 && (
              <Card className="border-red-200 dark:border-red-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-medium uppercase tracking-wider text-red-600 dark:text-red-400">
                    ✗ Grammar Corrections
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {speakingResult.grammar_issues.map((g, i) => (
                      <div key={i} className="text-sm">
                        <div className="flex items-center gap-2 flex-wrap mb-0.5">
                          <span className="line-through text-red-500 font-mono">&quot;{g.said}&quot;</span>
                          <ArrowRight className="w-3 h-3 text-muted-foreground shrink-0" />
                          <span className="text-emerald-600 dark:text-emerald-400 font-mono font-medium">&quot;{g.should_be}&quot;</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{g.reason}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Vocabulary suggestions */}
            {speakingResult.vocabulary_suggestions && speakingResult.vocabulary_suggestions.length > 0 && (
              <Card className="border-blue-200 dark:border-blue-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-medium uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    💬 Vocabulary Upgrades
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {speakingResult.vocabulary_suggestions.map((v, i) => (
                      <div key={i} className="text-sm">
                        <div className="flex items-center gap-2 flex-wrap mb-0.5">
                          <span className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">{v.basic_word}</span>
                          <ArrowRight className="w-3 h-3 text-muted-foreground shrink-0" />
                          <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded text-xs font-mono font-semibold">{v.better_word}</span>
                        </div>
                        <p className="text-xs text-muted-foreground italic">&quot;{v.example}&quot;</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Model answer */}
            <Card className="border-violet-200 dark:border-violet-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-violet-600 dark:text-violet-400">✦ Band 8+ Model Answer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">{speakingResult.model_answer}</p>
              </CardContent>
            </Card>

            {/* Next actions */}
            {speakingResult.next_actions?.length > 0 && (
              <Card className="border-violet-200 dark:border-violet-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-medium uppercase tracking-wider text-violet-600 dark:text-violet-400">
                    📋 Action Plan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-2">
                    {speakingResult.next_actions.map((action, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="w-5 h-5 rounded-full bg-violet-100 dark:bg-violet-900 text-violet-600 dark:text-violet-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span>{action}</span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            )}
          </div>
        );
      })()}
    </div>
  );
}
