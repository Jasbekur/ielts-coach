"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen, Timer, ChevronLeft, ChevronRight,
  CheckCircle2, XCircle, AlertCircle, RotateCcw,
  Trophy, Zap, BookMarked, ArrowRight, X,
  FileText,
} from "lucide-react";
import {
  READING_PASSAGES,
  EXAM_DURATION_SECONDS,
  TOTAL_QUESTIONS,
  rawScoreToBand,
  checkAnswer,
  allQuestions,
  type ReadingPassage,
  type ReadingQuestion,
  type MatchingHeadingQuestion,
  type SummaryCompletionQuestion,
} from "@/lib/data/reading-passages";
import { getBandTailwind } from "@/types/ielts";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────────────────
type Phase = "selector" | "reading" | "results";
type Answers = Record<number, string>; // question number → student answer

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatTime(secs: number) {
  const m = Math.floor(secs / 60).toString().padStart(2, "0");
  const s = (secs % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function bandLabel(band: number) {
  if (band >= 9) return "Expert";
  if (band >= 8.5) return "Very Good+";
  if (band >= 8) return "Very Good";
  if (band >= 7.5) return "Good+";
  if (band >= 7) return "Good";
  if (band >= 6.5) return "Competent+";
  if (band >= 6) return "Competent";
  if (band >= 5.5) return "Modest+";
  if (band >= 5) return "Modest";
  return "Limited";
}

// Question range per passage
const PASSAGE_RANGES = [
  { start: 1, end: 13 },
  { start: 14, end: 26 },
  { start: 27, end: 40 },
];

function countAnswered(answers: Answers, start: number, end: number) {
  let n = 0;
  for (let i = start; i <= end; i++) if (answers[i]) n++;
  return n;
}

// ── Render one question ───────────────────────────────────────────────────────
function QuestionItem({
  question,
  value,
  onChange,
  showResult,
  headingOptions,
}: {
  question: ReadingQuestion;
  value: string;
  onChange: (v: string) => void;
  showResult: boolean;
  headingOptions?: string[];
}) {
  const correct = showResult ? checkAnswer(question, value) : null;
  const correctAnswer =
    "answer" in question ? (question as { answer: string }).answer : "";

  const resultIcon = showResult ? (
    correct ? (
      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
    ) : (
      <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
    )
  ) : null;

  const itemBg = showResult
    ? correct
      ? "bg-emerald-50 border-emerald-200"
      : "bg-red-50 border-red-200"
    : "bg-white border-border";

  // ── TFNG / YNNG ──────────────────────────────────────────────────────────
  if (question.type === "tfng" || question.type === "ynng") {
    const opts =
      question.type === "tfng"
        ? ["TRUE", "FALSE", "NOT GIVEN"]
        : ["YES", "NO", "NOT GIVEN"];
    return (
      <div className={cn("rounded-xl border p-4 space-y-3", itemBg)}>
        <div className="flex gap-2">
          {resultIcon}
          <p className="text-sm font-medium text-gray-800 leading-snug">
            <span className="text-emerald-600 font-bold mr-1.5">{question.number}.</span>
            {question.type === "tfng" ? (
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mr-1">T/F/NG</span>
            ) : (
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mr-1">Y/N/NG</span>
            )}
            {question.text}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {opts.map(opt => (
            <button
              key={opt}
              disabled={showResult}
              onClick={() => onChange(opt)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all",
                value === opt
                  ? showResult
                    ? correct
                      ? "bg-emerald-500 text-white border-emerald-500"
                      : "bg-red-500 text-white border-red-500"
                    : "bg-emerald-700 text-white border-violet-600"
                  : "bg-white text-gray-600 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50"
              )}
            >
              {opt}
            </button>
          ))}
        </div>
        {showResult && !correct && (
          <p className="text-xs text-emerald-700 font-medium">
            ✓ Correct: <span className="font-bold">{correctAnswer}</span>
          </p>
        )}
      </div>
    );
  }

  // ── MCQ ──────────────────────────────────────────────────────────────────
  if (question.type === "mcq") {
    return (
      <div className={cn("rounded-xl border p-4 space-y-3", itemBg)}>
        <div className="flex gap-2">
          {resultIcon}
          <p className="text-sm font-medium text-gray-800 leading-snug">
            <span className="text-emerald-600 font-bold mr-1.5">{question.number}.</span>
            {question.text}
          </p>
        </div>
        <div className="space-y-2">
          {question.options.map(opt => (
            <button
              key={opt.letter}
              disabled={showResult}
              onClick={() => onChange(opt.letter)}
              className={cn(
                "w-full text-left flex items-start gap-2.5 px-3 py-2 rounded-lg border text-sm transition-all",
                value === opt.letter
                  ? showResult
                    ? correct
                      ? "bg-emerald-500 text-white border-emerald-500"
                      : "bg-red-400 text-white border-red-400"
                    : "bg-emerald-700 text-white border-violet-600"
                  : showResult && opt.letter === question.answer
                    ? "bg-emerald-100 border-emerald-300 text-emerald-800"
                    : "bg-white border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 text-gray-700"
              )}
            >
              <span className="font-bold shrink-0">{opt.letter}.</span>
              <span>{opt.text}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ── Short Answer / Sentence Completion / Summary Completion ──────────────
  if (
    question.type === "short_answer" ||
    question.type === "sentence_completion" ||
    question.type === "summary_completion"
  ) {
    const maxW =
      question.type === "short_answer"
        ? `≤ ${question.maxWords} words from the passage`
        : `≤ ${question.maxWords} words from the passage`;

    const prefix =
      question.type === "short_answer"
        ? question.text
        : question.prefix;
    const suffix =
      question.type === "short_answer" ? "" : question.suffix;

    return (
      <div className={cn("rounded-xl border p-4 space-y-2.5", itemBg)}>
        <div className="flex gap-2 items-start">
          {resultIcon}
          <p className="text-sm font-medium text-gray-700">
            <span className="text-emerald-600 font-bold mr-1.5">{question.number}.</span>
            {prefix}{" "}
            <span className="inline-block border-b-2 border-dashed border-violet-400 min-w-[80px] mx-1" />
            {suffix && <span> {suffix}</span>}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            disabled={showResult}
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={maxW}
            className={cn(
              "flex-1 text-sm px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all",
              showResult
                ? correct
                  ? "border-emerald-400 bg-emerald-50 text-emerald-800"
                  : "border-red-400 bg-red-50 text-red-800"
                : "border-gray-300 bg-white"
            )}
          />
        </div>
        {showResult && !correct && (
          <p className="text-xs text-emerald-700 font-medium">
            ✓ Correct: <span className="font-bold">{correctAnswer}</span>
          </p>
        )}
      </div>
    );
  }

  // ── Matching Heading ──────────────────────────────────────────────────────
  if (question.type === "matching_heading") {
    const opts = headingOptions ?? [];
    return (
      <div className={cn("rounded-xl border p-4 space-y-2.5", itemBg)}>
        <div className="flex gap-2 items-center">
          {resultIcon}
          <p className="text-sm font-medium text-gray-800">
            <span className="text-emerald-600 font-bold mr-1.5">{question.number}.</span>
            Paragraph <span className="font-bold">{question.paragraph}</span>
          </p>
        </div>
        <select
          disabled={showResult}
          value={value}
          onChange={e => onChange(e.target.value)}
          className={cn(
            "w-full text-sm px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white transition-all",
            showResult
              ? correct
                ? "border-emerald-400 bg-emerald-50 text-emerald-800"
                : "border-red-400 bg-red-50"
              : "border-gray-300"
          )}
        >
          <option value="">— Select heading —</option>
          {opts.map((h, i) => {
            const key = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix"][i];
            return (
              <option key={key} value={key}>
                {h}
              </option>
            );
          })}
        </select>
        {showResult && !correct && (
          <p className="text-xs text-emerald-700 font-medium">
            ✓ Correct: <span className="font-bold">{correctAnswer}</span>
          </p>
        )}
      </div>
    );
  }

  // ── Matching Paragraph ────────────────────────────────────────────────────
  if (question.type === "matching_paragraph") {
    return (
      <div className={cn("rounded-xl border p-4 space-y-2.5", itemBg)}>
        <div className="flex gap-2">
          {resultIcon}
          <p className="text-sm font-medium text-gray-800 leading-snug">
            <span className="text-emerald-600 font-bold mr-1.5">{question.number}.</span>
            {question.text}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {["A", "B", "C", "D", "E", "F", "G"].map(para => (
            <button
              key={para}
              disabled={showResult}
              onClick={() => onChange(para)}
              className={cn(
                "w-9 h-9 rounded-lg text-sm font-bold border transition-all",
                value === para
                  ? showResult
                    ? correct
                      ? "bg-emerald-500 text-white border-emerald-500"
                      : "bg-red-500 text-white border-red-500"
                    : "bg-emerald-700 text-white border-violet-600"
                  : showResult && para === question.answer
                    ? "bg-emerald-100 border-emerald-400 text-emerald-700"
                    : "bg-white border-gray-200 hover:border-emerald-300 text-gray-600"
              )}
            >
              {para}
            </button>
          ))}
        </div>
        {showResult && !correct && (
          <p className="text-xs text-emerald-700 font-medium">
            ✓ Correct: paragraph <span className="font-bold">{correctAnswer}</span>
          </p>
        )}
      </div>
    );
  }

  return null;
}

// ── Passage text panel ────────────────────────────────────────────────────────
function PassagePanel({ passage }: { passage: ReadingPassage }) {
  return (
    <div className="h-full overflow-y-auto p-5 space-y-4">
      <div className="pb-2 border-b border-gray-200">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">
          Reading Passage {passage.id}
        </p>
        <h2 className="text-base font-bold text-gray-900 leading-snug">
          {passage.title}
        </h2>
        <Badge variant="outline" className="mt-1.5 text-[10px]">
          {passage.topic}
        </Badge>
      </div>
      {passage.paragraphs.map(para => (
        <div key={para.label} className="flex gap-3">
          <span className="text-xs font-bold text-emerald-600 shrink-0 mt-0.5 w-4">
            {para.label}
          </span>
          <p className="text-sm text-gray-700 leading-relaxed">{para.text}</p>
        </div>
      ))}
    </div>
  );
}

// ── Questions panel ───────────────────────────────────────────────────────────
function QuestionsPanel({
  passage,
  answers,
  onAnswer,
  showResult,
}: {
  passage: ReadingPassage;
  answers: Answers;
  onAnswer: (n: number, v: string) => void;
  showResult: boolean;
}) {
  return (
    <div className="h-full overflow-y-auto p-5 space-y-6">
      {passage.questionGroups.map((group, gi) => (
        <div key={gi} className="space-y-3">
          {/* Instructions */}
          <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3">
            <p className="text-xs text-violet-800 font-medium leading-relaxed whitespace-pre-line">
              {group.instructions}
            </p>
            {group.headingOptions && (
              <div className="mt-3 space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wide text-emerald-600 mb-1">List of Headings</p>
                {group.headingOptions.map((h, i) => (
                  <p key={i} className="text-xs text-emerald-700">{h}</p>
                ))}
              </div>
            )}
          </div>

          {/* Summary context (passage 2 summary) */}
          {group.context && (
            <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3">
              <p className="text-xs font-semibold text-amber-700 mb-2">Complete the summary:</p>
              <p className="text-sm text-gray-700 leading-relaxed">
                {group.context.split(/(__\d+__)/).map((part, i) => {
                  const match = part.match(/^__(\d+)__$/);
                  if (match) {
                    const num = parseInt(match[1]);
                    const q = group.questions.find(q => q.number === num);
                    const correct = showResult && q ? checkAnswer(q, answers[num] ?? "") : null;
                    return (
                      <span
                        key={i}
                        className={cn(
                          "inline-flex items-center mx-0.5 px-2 py-0.5 rounded font-bold text-xs",
                          showResult
                            ? correct
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-red-100 text-red-700"
                            : "bg-emerald-100 text-emerald-700"
                        )}
                      >
                        {num}
                      </span>
                    );
                  }
                  return <span key={i}>{part}</span>;
                })}
              </p>
            </div>
          )}

          {/* Questions */}
          <div className="space-y-3">
            {group.questions.map(q => (
              <QuestionItem
                key={q.number}
                question={q}
                value={answers[q.number] ?? ""}
                onChange={v => onAnswer(q.number, v)}
                showResult={showResult}
                headingOptions={group.headingOptions}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ════════════════════════════════════════════════════════════════════════════════
export default function ReadingPage() {
  const [phase, setPhase] = useState<Phase>("selector");
  const [activePassage, setActivePassage] = useState(0);
  const [mobileView, setMobileView] = useState<"passage" | "questions">("passage");
  const [answers, setAnswers] = useState<Answers>({});
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION_SECONDS);
  const [practiceOnly, setPracticeOnly] = useState<number | null>(null); // null = full test
  const [results, setResults] = useState<{
    correct: number;
    total: number;
    byPassage: number[];
    band: number;
  } | null>(null);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Timer ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "reading") return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          handleSubmit();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // ── Start exam ────────────────────────────────────────────────────────────
  function startExam(passageIndex: number | null) {
    setPracticeOnly(passageIndex);
    setActivePassage(passageIndex ?? 0);
    setAnswers({});
    const duration =
      passageIndex !== null ? 20 * 60 : EXAM_DURATION_SECONDS;
    setTimeLeft(duration);
    setPhase("reading");
  }

  // ── Answer handler ────────────────────────────────────────────────────────
  const handleAnswer = useCallback((num: number, val: string) => {
    setAnswers(prev => ({ ...prev, [num]: val }));
  }, []);

  // ── Submit ────────────────────────────────────────────────────────────────
  function handleSubmit() {
    clearInterval(timerRef.current!);
    const qs = allQuestions();
    const relevant = practiceOnly !== null
      ? qs.filter(q => {
          const r = PASSAGE_RANGES[practiceOnly];
          return q.number >= r.start && q.number <= r.end;
        })
      : qs;

    const total = relevant.length;
    let correct = 0;
    const byPassage = [0, 0, 0];

    relevant.forEach(q => {
      const ok = checkAnswer(q, answers[q.number] ?? "");
      if (ok) {
        correct++;
        const pi = PASSAGE_RANGES.findIndex(r => q.number >= r.start && q.number <= r.end);
        if (pi >= 0) byPassage[pi]++;
      }
    });

    // Scale band: for practice (13-14 Qs) scale to 40 for band calculation
    const scaledCorrect = practiceOnly !== null
      ? Math.round((correct / total) * 40)
      : correct;

    setResults({ correct, total, byPassage, band: rawScoreToBand(scaledCorrect) });
    setPhase("results");
  }

  // ── Passage tabs ──────────────────────────────────────────────────────────
  const passagesToShow =
    practiceOnly !== null
      ? [READING_PASSAGES[practiceOnly]]
      : READING_PASSAGES;

  // ── Keyboard shortcut (Esc to go back in selector) ───────────────────────
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && phase === "reading") {
        if (window.confirm("Leave the test? Your answers will be lost.")) {
          clearInterval(timerRef.current!);
          setPhase("selector");
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase]);

  // ══════════════════════════════════════════════════════════════════════════
  // PHASE: SELECTOR
  // ══════════════════════════════════════════════════════════════════════════
  if (phase === "selector") {
    return (
      <div className="space-y-7">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            <h1 className="text-3xl font-display tracking-tight">Reading</h1>
          </div>
          <p className="text-base text-muted-foreground">
            IELTS Academic · 3 passages · 40 questions · 60 minutes
          </p>
        </div>

        {/* Full test card */}
        <div
          className="rounded-2xl p-8 relative overflow-hidden cursor-pointer group transition-all hover:scale-[1.01]"
          style={{
            background: "linear-gradient(135deg, #0b1c30, #122338)",
            boxShadow: "0 8px 32px rgba(5,150,105,0.2)",
          }}
          onClick={() => startExam(null)}
        >
          <div
            className="absolute -top-12 -right-12 w-48 h-48 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(5,150,105,0.2), transparent 70%)" }}
          />
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div>
                <Badge className="mb-3 text-[10px] font-bold tracking-widest" style={{ background: "rgba(16,185,129,0.15)", color: "#4ade80", border: "1px solid rgba(16,185,129,0.3)" }}>
                  FULL ACADEMIC TEST
                </Badge>
                <h2 className="text-2xl font-display" style={{ color: "white" }}>
                  3 Passages · 40 Questions
                </h2>
                <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.6)" }}>
                  Complete a full timed exam under real conditions to get your instant AI-calculated band score.
                </p>
              </div>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(16,185,129,0.15)" }}
              >
                <Trophy className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mb-6">
              {[
                { icon: Timer, label: "60 min" },
                { icon: FileText, label: "40 questions" },
                { icon: Zap, label: "Instant band score" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </div>
              ))}
            </div>
            <Button
              className="gap-2 font-bold text-white text-sm"
              style={{
                background: "#10b981",
                boxShadow: "0 4px 0 #059669, 0 6px 16px rgba(5,150,105,0.4)",
              }}
            >
              Start Full Test <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Passage practice cards */}
        <div>
          <p className="text-sm font-bold mb-3 uppercase tracking-widest text-[11px]" style={{ color: "#059669" }}>
            Practice Individual Passages
          </p>
          <div className="space-y-3">
            {READING_PASSAGES.map((p, i) => {
              const range = PASSAGE_RANGES[i];
              return (
                <div
                  key={p.id}
                  className="rounded-xl border border-border bg-card p-4 flex items-center justify-between gap-4 hover:border-emerald-300 hover:bg-emerald-50/30 cursor-pointer transition-all group"
                  onClick={() => startExam(i)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm"
                      style={{ background: "rgba(5,150,105,0.1)", color: "#059669" }}>
                      {p.id}
                    </div>
                    <div>
                      <p className="text-sm font-semibold leading-tight">{p.title}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        {p.topic} · Q{range.start}–{range.end} · 20 min
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-emerald-600 transition-colors shrink-0" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Tips */}
        <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 space-y-2">
          <p className="text-xs font-bold text-amber-800 uppercase tracking-wide">📖 Reading Tips</p>
          <ul className="text-xs text-amber-700 space-y-1 list-disc list-inside">
            <li>Skim the passage first to get the general idea (2 min per passage)</li>
            <li>Read questions before reading carefully — know what to look for</li>
            <li>Answers follow the order of the passage for most question types</li>
            <li>Never leave a question blank — guess if unsure (no penalty)</li>
          </ul>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════
  // PHASE: RESULTS
  // ══════════════════════════════════════════════════════════════════════════
  if (phase === "results" && results) {
    const band = results.band;
    const pct = Math.round((results.correct / results.total) * 100);
    // For practice (single passage), show raw score only — no band
    const isPractice = practiceOnly !== null;

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            {isPractice
              ? `Passage ${practiceOnly + 1} Practice Result`
              : "Academic Reading Result"}
          </div>
          {isPractice ? (
            /* Practice: show raw score without band */
            <>
              <div className="text-6xl font-black font-mono tracking-tight text-emerald-600">
                {results.correct}<span className="text-3xl text-muted-foreground font-bold">/{results.total}</span>
              </div>
              <p className="text-lg font-semibold mt-1 text-gray-700">
                {results.correct === results.total ? "Perfect Score! 🎉" : `${pct}% correct`}
              </p>
            </>
          ) : (
            /* Full test: show band score */
            <>
              <div className={cn("text-6xl font-black font-mono tracking-tight", getBandTailwind(band))}>
                {band.toFixed(1)}
              </div>
              <p className="text-lg font-semibold mt-1 text-gray-700">{bandLabel(band)}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {results.correct} / {results.total} correct ({pct}%)
              </p>
            </>
          )}
        </div>

        {/* Progress bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Score</span>
            <span>{results.correct}/{results.total}</span>
          </div>
          <Progress value={pct} className="h-3" />
        </div>

        {/* By passage breakdown */}
        {practiceOnly === null && (
          <div className="grid grid-cols-3 gap-3">
            {READING_PASSAGES.map((p, i) => {
              const range = PASSAGE_RANGES[i];
              const total = range.end - range.start + 1;
              const correct = results.byPassage[i];
              const ppct = Math.round((correct / total) * 100);
              return (
                <div key={p.id} className="rounded-xl border border-border p-3 text-center">
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                    P{p.id}
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {correct}<span className="text-sm text-muted-foreground font-normal">/{total}</span>
                  </p>
                  <Progress value={ppct} className="h-1.5 mt-1.5" />
                </div>
              );
            })}
          </div>
        )}

        {/* Review answers */}
        <div className="space-y-4">
          <h3 className="font-semibold text-sm text-gray-800">Review answers</h3>
          {(practiceOnly !== null ? [READING_PASSAGES[practiceOnly]] : READING_PASSAGES).map(passage => (
            <div key={passage.id} className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold"
                  style={{ background: "oklch(0.546 0.245 274 / 15%)", color: "oklch(0.546 0.245 274)" }}>
                  {passage.id}
                </div>
                <p className="text-sm font-semibold text-gray-800">{passage.title}</p>
              </div>
              {passage.questionGroups.map((group, gi) => (
                <div key={gi} className="space-y-2">
                  <QuestionsPanel
                    passage={passage}
                    answers={answers}
                    onAnswer={() => {}}
                    showResult={true}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 pb-8">
          <Button
            onClick={() => {
              setPhase("selector");
              setResults(null);
              setAnswers({});
            }}
            variant="outline"
            className="gap-2"
          >
            <RotateCcw className="w-4 h-4" /> Back to Reading
          </Button>
          <Button
            onClick={() => startExam(practiceOnly)}
            className="gap-2"
            style={{
              background: "linear-gradient(135deg, oklch(0.62 0.245 274), oklch(0.52 0.22 300))",
              color: "white",
            }}
          >
            <RotateCcw className="w-4 h-4" /> Try Again
          </Button>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════
  // PHASE: READING EXAM (full-screen overlay)
  // ══════════════════════════════════════════════════════════════════════════
  const currentPassage = passagesToShow[activePassage];
  const range = PASSAGE_RANGES[practiceOnly !== null ? practiceOnly : activePassage];
  const answered = countAnswered(answers, range.start, range.end);
  const totalInPassage = range.end - range.start + 1;
  const pctAnswered =
    practiceOnly !== null
      ? Math.round((countAnswered(answers, PASSAGE_RANGES[practiceOnly].start, PASSAGE_RANGES[practiceOnly].end) / TOTAL_QUESTIONS * 100))
      : Math.round((Object.keys(answers).length / TOTAL_QUESTIONS) * 100);

  const isUrgent = timeLeft < 5 * 60;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex flex-col"
      style={{ background: "oklch(0.982 0.005 285)" }}
    >
      {/* ── Top bar ─────────────────────────────────────────────────────── */}
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b border-border shrink-0 gap-3"
        style={{ background: "white" }}
      >
        {/* Left: title */}
        <div className="flex items-center gap-2 min-w-0">
          <BookOpen className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="text-sm font-semibold truncate hidden sm:block">
            {practiceOnly !== null
              ? `Passage ${practiceOnly + 1} Practice`
              : "IELTS Academic Reading"}
          </span>
          <span className="text-xs text-muted-foreground hidden md:block">
            · {Object.keys(answers).length}/{practiceOnly !== null ? totalInPassage : TOTAL_QUESTIONS} answered
          </span>
        </div>

        {/* Center: passage tabs (full test only) */}
        {practiceOnly === null && (
          <div className="flex gap-1 shrink-0">
            {READING_PASSAGES.map((p, i) => {
              const r = PASSAGE_RANGES[i];
              const done = countAnswered(answers, r.start, r.end);
              const tot = r.end - r.start + 1;
              return (
                <button
                  key={i}
                  onClick={() => setActivePassage(i)}
                  className={cn(
                    "flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all",
                    activePassage === i
                      ? "text-white"
                      : "text-muted-foreground hover:bg-muted"
                  )}
                  style={activePassage === i ? {
                    background: "linear-gradient(135deg, oklch(0.62 0.245 274), oklch(0.52 0.22 300))",
                  } : {}}
                >
                  P{i + 1}
                  <span className={cn(
                    "text-[9px]",
                    activePassage === i ? "text-violet-200" : "text-muted-foreground"
                  )}>
                    {done}/{tot}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Right: timer + finish */}
        <div className="flex items-center gap-2 shrink-0">
          <div className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-mono font-bold border",
            isUrgent
              ? "text-red-600 bg-red-50 border-red-200 animate-pulse"
              : "text-gray-700 bg-gray-50 border-gray-200"
          )}>
            <Timer className="w-3.5 h-3.5 shrink-0" />
            {formatTime(timeLeft)}
          </div>
          <Button
            size="sm"
            onClick={handleSubmit}
            className="text-xs font-semibold gap-1.5"
            style={{
              background: "linear-gradient(135deg, oklch(0.62 0.245 274), oklch(0.52 0.22 300))",
              color: "white",
            }}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Finish</span>
          </Button>
          <button
            onClick={() => {
              if (window.confirm("Leave test? Progress will be lost.")) {
                clearInterval(timerRef.current!);
                setPhase("selector");
              }
            }}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Mobile: passage / questions toggle ───────────────────────────── */}
      <div className="flex md:hidden border-b border-border shrink-0 bg-white">
        <button
          onClick={() => setMobileView("passage")}
          className={cn(
            "flex-1 py-2 text-xs font-semibold transition-all",
            mobileView === "passage"
              ? "text-emerald-600 border-b-2 border-emerald-600"
              : "text-muted-foreground"
          )}
        >
          <BookMarked className="w-3.5 h-3.5 inline mr-1" />Passage
        </button>
        <button
          onClick={() => setMobileView("questions")}
          className={cn(
            "flex-1 py-2 text-xs font-semibold transition-all relative",
            mobileView === "questions"
              ? "text-emerald-600 border-b-2 border-emerald-600"
              : "text-muted-foreground"
          )}
        >
          <FileText className="w-3.5 h-3.5 inline mr-1" />Questions
          {answered > 0 && (
            <span className="ml-1 text-[9px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-bold">
              {answered}/{totalInPassage}
            </span>
          )}
        </button>
      </div>

      {/* ── Main content area ─────────────────────────────────────────────── */}
      <div className="flex-1 overflow-hidden flex">

        {/* ── Desktop: left (passage) + right (questions) ─────────────────── */}
        <div
          className={cn(
            "flex-1 border-r border-gray-200",
            "hidden md:block"
          )}
          style={{ maxWidth: "50%" }}
        >
          <PassagePanel passage={currentPassage} />
        </div>
        <div
          className="flex-1 hidden md:block bg-gray-50"
        >
          <QuestionsPanel
            passage={currentPassage}
            answers={answers}
            onAnswer={handleAnswer}
            showResult={false}
          />
        </div>

        {/* ── Mobile: single panel with toggle ────────────────────────────── */}
        <div className="flex-1 md:hidden">
          {mobileView === "passage" ? (
            <PassagePanel passage={currentPassage} />
          ) : (
            <QuestionsPanel
              passage={currentPassage}
              answers={answers}
              onAnswer={handleAnswer}
              showResult={false}
            />
          )}
        </div>
      </div>

      {/* ── Bottom bar: passage nav + progress ───────────────────────────── */}
      <div
        className="flex items-center justify-between px-4 py-2 border-t border-border shrink-0 gap-4"
        style={{ background: "white" }}
      >
        <button
          disabled={activePassage === 0}
          onClick={() => setActivePassage(p => Math.max(0, p - 1))}
          className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-gray-800 disabled:opacity-30 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Prev
        </button>

        {/* Progress dots */}
        <div className="flex items-center gap-1.5">
          {passagesToShow.map((_, i) => {
            const r = PASSAGE_RANGES[practiceOnly !== null ? practiceOnly : i];
            const done = countAnswered(answers, r.start, r.end);
            const tot = r.end - r.start + 1;
            const full = done === tot;
            return (
              <button
                key={i}
                onClick={() => setActivePassage(i)}
                className={cn(
                  "rounded-full transition-all",
                  i === activePassage ? "w-6 h-2" : "w-2 h-2",
                  full
                    ? "bg-emerald-500"
                    : i === activePassage
                      ? "bg-emerald-600"
                      : "bg-gray-300"
                )}
              />
            );
          })}
          <span className="text-[11px] text-muted-foreground ml-2">
            {Object.keys(answers).length}/{practiceOnly !== null ? totalInPassage : TOTAL_QUESTIONS}
          </span>
        </div>

        <button
          disabled={activePassage === passagesToShow.length - 1}
          onClick={() => setActivePassage(p => Math.min(passagesToShow.length - 1, p + 1))}
          className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-gray-800 disabled:opacity-30 transition-colors"
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>,
    document.body
  );
}
