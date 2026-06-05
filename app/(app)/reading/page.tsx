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
  FileText, Clock,
} from "lucide-react";
import {
  READING_TEST_SETS,
  EXAM_DURATION_SECONDS,
  TOTAL_QUESTIONS,
  rawScoreToBand,
  checkAnswer,
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

// Helper: get all questions from a given set of passages
function questionsForPassages(passages: ReadingPassage[]): ReadingQuestion[] {
  return passages.flatMap(p => p.questionGroups.flatMap(g => g.questions));
}

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
      <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
    ) : (
      <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
    )
  ) : null;

  const itemBg = showResult
    ? correct
      ? "bg-red-50 border-red-200"
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
            <span className="text-red-600 font-bold mr-1.5">{question.number}.</span>
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
                      ? "bg-red-500 text-white border-red-500"
                      : "bg-red-500 text-white border-red-500"
                    : "bg-red-700 text-white border-red-600"
                  : "bg-white text-gray-600 border-gray-200 hover:border-red-300 hover:bg-red-50"
              )}
            >
              {opt}
            </button>
          ))}
        </div>
        {showResult && !correct && (
          <p className="text-xs text-red-700 font-medium">
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
            <span className="text-red-600 font-bold mr-1.5">{question.number}.</span>
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
                      ? "bg-red-500 text-white border-red-500"
                      : "bg-red-400 text-white border-red-400"
                    : "bg-red-700 text-white border-red-600"
                  : showResult && opt.letter === question.answer
                    ? "bg-red-100 border-red-300 text-red-800"
                    : "bg-white border-gray-200 hover:border-red-300 hover:bg-red-50 text-gray-700"
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
            <span className="text-red-600 font-bold mr-1.5">{question.number}.</span>
            {prefix}{" "}
            <span className="inline-block border-b-2 border-dashed border-red-400 min-w-[80px] mx-1" />
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
              "flex-1 text-sm px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-red-400 transition-all",
              showResult
                ? correct
                  ? "border-red-400 bg-red-50 text-red-800"
                  : "border-red-400 bg-red-50 text-red-800"
                : "border-gray-300 bg-white"
            )}
          />
        </div>
        {showResult && !correct && (
          <p className="text-xs text-red-700 font-medium">
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
            <span className="text-red-600 font-bold mr-1.5">{question.number}.</span>
            Paragraph <span className="font-bold">{question.paragraph}</span>
          </p>
        </div>
        <select
          disabled={showResult}
          value={value}
          onChange={e => onChange(e.target.value)}
          className={cn(
            "w-full text-sm px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-red-400 bg-white transition-all",
            showResult
              ? correct
                ? "border-red-400 bg-red-50 text-red-800"
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
          <p className="text-xs text-red-700 font-medium">
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
            <span className="text-red-600 font-bold mr-1.5">{question.number}.</span>
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
                      ? "bg-red-500 text-white border-red-500"
                      : "bg-red-500 text-white border-red-500"
                    : "bg-red-700 text-white border-red-600"
                  : showResult && para === question.answer
                    ? "bg-red-100 border-red-400 text-red-700"
                    : "bg-white border-gray-200 hover:border-red-300 text-gray-600"
              )}
            >
              {para}
            </button>
          ))}
        </div>
        {showResult && !correct && (
          <p className="text-xs text-red-700 font-medium">
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
          <span className="text-xs font-bold text-red-600 shrink-0 mt-0.5 w-4">
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
          <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3">
            <p className="text-xs text-red-800 font-medium leading-relaxed whitespace-pre-line">
              {group.instructions}
            </p>
            {group.headingOptions && (
              <div className="mt-3 space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wide text-red-600 mb-1">List of Headings</p>
                {group.headingOptions.map((h, i) => (
                  <p key={i} className="text-xs text-red-700">{h}</p>
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
                              ? "bg-red-100 text-red-800"
                              : "bg-red-100 text-red-700"
                            : "bg-red-100 text-red-700"
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
  const [testSetIdx, setTestSetIdx] = useState(0);
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

  // ── Exam UI enhancements ─────────────────────────────────────────────────
  const [flaggedQ,       setFlaggedQ]      = useState<Set<number>>(new Set());
  const [showQNavigator, setShowQNavigator] = useState(false);
  const [showReadSubmit, setShowReadSubmit] = useState(false);
  const readingRefs = useRef<Record<number, HTMLDivElement | null>>({});

  function toggleReadingFlag(num: number) {
    setFlaggedQ(prev => {
      const next = new Set(prev);
      if (next.has(num)) next.delete(num); else next.add(num);
      return next;
    });
  }
  function scrollToReadingQ(num: number) {
    readingRefs.current[num]?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  // ── Always-fresh submit ref — fixes stale-closure bug in timer ────────────
  // The timer useEffect only runs when `phase` changes, so `handleSubmit`
  // captured inside it would always see answers={} (the value at phase-change
  // time). Instead we keep a ref that is updated on every render, then call
  // handleSubmitRef.current() from inside the timer callback.
  const handleSubmitRef = useRef<() => void>(() => {});
  useEffect(() => {
    handleSubmitRef.current = handleSubmit;
  }); // intentionally no deps — re-sync every render

  // ── Timer ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "reading") return;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          handleSubmitRef.current(); // always calls the latest handleSubmit
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase]); // phase only — no stale closure risk anymore

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
    const currentPassages = READING_TEST_SETS[testSetIdx];
    const qs = questionsForPassages(currentPassages);
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
  const activeTestSetPassages = READING_TEST_SETS[testSetIdx];
  const passagesToShow =
    practiceOnly !== null
      ? [activeTestSetPassages[practiceOnly]]
      : activeTestSetPassages;

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
      <div style={{ background: "#f8fafc", minHeight: "100vh", padding: "28px 32px 48px" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>

        {/* Back button */}
        <div style={{ marginBottom: "16px" }}>
          <a href="/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "transparent", border: "none", color: "#64748b", fontSize: "13.5px", fontWeight: 500, cursor: "pointer", padding: "4px 0", textDecoration: "none" }}>
            ← Dashboard
          </a>
        </div>

        {/* Header card */}
        <div style={{ background: "#ffffff", borderRadius: "8px", border: "1px solid #e2e8f0", borderLeft: "4px solid #dc2626", padding: "20px 24px", marginBottom: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <p style={{ fontSize: "11px", fontWeight: 600, color: "#dc2626", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>IELTS Academic</p>
          <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>Reading</h1>
          <p style={{ fontSize: "13px", color: "#475569" }}>3 passages · 40 questions · 60 minutes · Timed exam</p>
        </div>

        <div className="space-y-6">
        {/* Test set picker */}
        <div>
          <p style={{ fontSize: "11px", fontWeight: 700, color: "#dc2626", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>
            Select Test Set
          </p>
          <div className="flex gap-2">
            {["Test 1", "Test 2", "Test 3"].map((label, idx) => (
              <button
                key={idx}
                onClick={() => setTestSetIdx(idx)}
                style={{
                  padding: "6px 16px", borderRadius: "20px", fontSize: "13px",
                  fontWeight: testSetIdx === idx ? 600 : 400, cursor: "pointer",
                  background: testSetIdx === idx ? "#dc2626" : "#ffffff",
                  color: testSetIdx === idx ? "#ffffff" : "#64748b",
                  border: testSetIdx === idx ? "1px solid #dc2626" : "1px solid #e2e8f0",
                  transition: "all 0.15s",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Full test card */}
        <div
          className="rounded-2xl p-8 relative overflow-hidden cursor-pointer group transition-all hover:scale-[1.01]"
          style={{ background: "linear-gradient(135deg, #0b1c30, #122338)", boxShadow: "0 8px 32px rgba(37,99,235,0.2)" }}
          onClick={() => startExam(null)}
        >
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(37,99,235,0.2), transparent 70%)" }} />
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div>
                <Badge className="mb-3 text-[10px] font-bold tracking-widest" style={{ background: "rgba(37,99,235,0.2)", color: "#93c5fd", border: "1px solid rgba(37,99,235,0.4)" }}>
                  FULL ACADEMIC TEST
                </Badge>
                <h2 className="text-2xl font-display" style={{ color: "white" }}>3 Passages · 40 Questions</h2>
                <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.6)" }}>
                  Complete a full timed exam under real conditions to get your instant AI-calculated band score.
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(37,99,235,0.2)" }}>
                <Trophy className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mb-6">
              {[{ icon: Timer, label: "60 min" }, { icon: FileText, label: "40 questions" }, { icon: Zap, label: "Instant band score" }].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                  <Icon className="w-3.5 h-3.5" />{label}
                </div>
              ))}
            </div>
            <button style={{ background: "#dc2626", color: "#ffffff", border: "none", borderRadius: "6px", padding: "10px 20px", fontSize: "13.5px", fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px" }}>
              Start Full Test <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Passage practice cards */}
        <div>
          <p style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "12px" }}>
            Practice Individual Passages
          </p>
          <div className="space-y-3">
            {activeTestSetPassages.map((p, i) => {
              const range = PASSAGE_RANGES[i];
              return (
                <div
                  key={p.id}
                  className="rounded-xl border border-border bg-card p-4 flex items-center justify-between gap-4 hover:border-blue-300 hover:bg-blue-50/30 cursor-pointer transition-all group"
                  onClick={() => startExam(i)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm"
                      style={{ background: "rgba(37,99,235,0.1)", color: "#dc2626" }}>
                      {p.id}
                    </div>
                    <div>
                      <p className="text-sm font-semibold leading-tight">{p.title}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        {p.topic} · Q{range.start}–{range.end} · 20 min
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-blue-600 transition-colors shrink-0" />
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
      <div style={{ background: "#f8fafc", minHeight: "100vh", padding: "28px 32px 48px" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
      <div style={{ marginBottom: "16px" }}>
        <button onClick={() => setPhase("selector")} style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "transparent", border: "none", color: "#64748b", fontSize: "13.5px", fontWeight: 500, cursor: "pointer", padding: "4px 0" }}>
          ← Back to Reading
        </button>
      </div>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            {isPractice
              ? `Passage ${practiceOnly + 1} Practice Result`
              : "Academic Reading Result"}
          </div>
          {isPractice ? (
            /* Practice: show raw score without band */
            <>
              <div className="text-6xl font-black font-mono tracking-tight text-red-600">
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
            {activeTestSetPassages.map((p, i) => {
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
          {(practiceOnly !== null ? [activeTestSetPassages[practiceOnly]] : activeTestSetPassages).map(passage => (
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
      {/* ── CD-IELTS exam top bar ── */}
      <div className="flex items-center justify-between gap-3 h-12 px-4 shrink-0"
        style={{ background:"var(--exam-bar, #1e2d5a)", borderBottom:"1px solid rgba(255,255,255,0.08)" }}>
        <button
          onClick={() => { if (window.confirm("Leave the test? Your answers will be lost.")) { clearInterval(timerRef.current!); setPhase("selector"); } }}
          className="flex items-center gap-1 text-xs font-semibold text-white/70 hover:text-white transition-colors shrink-0">
          <ChevronLeft className="w-3.5 h-3.5" /> Exit
        </button>
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-white font-black text-sm tracking-tight hidden sm:block">IELTS Sensei</span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest text-white"
            style={{ background:"rgba(255,255,255,0.15)" }}>READING</span>
          <span className="text-white/50 text-xs hidden md:block">
            {practiceOnly !== null ? `Passage ${practiceOnly + 1}` : "Full Test · 3 Passages"}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded"
            style={{ background: timeLeft < 600 ? "rgba(248,113,113,0.25)" : "rgba(255,255,255,0.1)" }}>
            <Clock className="w-3 h-3" style={{ color: timeLeft < 600 ? "#f87171" : "rgba(255,255,255,0.7)" }} />
            <span className="font-mono font-bold text-xs tabular-nums"
              style={{ color: timeLeft < 600 ? "#f87171" : "white" }}>
              {formatTime(timeLeft)}
            </span>
          </div>
          <span className="text-xs font-semibold tabular-nums hidden sm:block text-white/60">
            {countAnswered(answers, 1, 40)}/40
          </span>
          <button onClick={() => setShowQNavigator(v => !v)}
            className="text-xs font-semibold px-2 py-1 rounded text-white transition-colors"
            style={{ background: showQNavigator ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.1)" }}>
            Nav
          </button>
          <button onClick={() => setShowReadSubmit(true)}
            className="text-xs font-black px-3 py-1.5 rounded text-white"
            style={{ background:"#16a34a" }}>
            Submit
          </button>
        </div>
      </div>

      {/* Reading question navigator */}
      {showQNavigator && (
        <div className="fixed inset-y-0 right-0 z-30 w-52 flex flex-col shadow-2xl"
          style={{ background:"#1e2432", borderLeft:"1px solid rgba(255,255,255,0.08)", top:"48px" }}>
          <div className="px-4 py-3 flex items-center justify-between"
            style={{ borderBottom:"1px solid rgba(255,255,255,0.08)" }}>
            <span className="text-xs font-black text-white uppercase tracking-wider">Questions</span>
            <button onClick={() => setShowQNavigator(false)} className="text-white/50 hover:text-white text-xs">✕</button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
            {PASSAGE_RANGES.map((range, pi) => (
              <div key={pi}>
                <p className="text-[10px] font-black text-white/50 uppercase mb-2">Passage {pi + 1}</p>
                <div className="grid grid-cols-5 gap-1.5">
                  {Array.from({ length: range.end - range.start + 1 }, (_, i) => range.start + i).map(num => {
                    const answered = !!(answers[num] ?? "").trim();
                    const flagged  = flaggedQ.has(num);
                    return (
                      <button key={num} onClick={() => { scrollToReadingQ(num); setShowQNavigator(false); }}
                        className="h-7 w-full rounded text-xs font-bold transition-all hover:scale-105"
                        style={{
                          background: flagged ? "#d97706" : answered ? "#dc2626" : "rgba(255,255,255,0.12)",
                          color: (flagged || answered) ? "white" : "rgba(255,255,255,0.5)",
                        }}>
                        {num}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Mobile: passage / questions toggle ───────────────────────────── */}
      <div className="flex md:hidden border-b border-border shrink-0 bg-white">
        <button
          onClick={() => setMobileView("passage")}
          className={cn(
            "flex-1 py-2 text-xs font-semibold transition-all",
            mobileView === "passage"
              ? "text-red-600 border-b-2 border-emerald-600"
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
              ? "text-red-600 border-b-2 border-emerald-600"
              : "text-muted-foreground"
          )}
        >
          <FileText className="w-3.5 h-3.5 inline mr-1" />Questions
          {answered > 0 && (
            <span className="ml-1 text-[9px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full font-bold">
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
                    ? "bg-red-500"
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

      {/* Reading submit confirmation */}
      {showReadSubmit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background:"rgba(0,0,0,0.75)", backdropFilter:"blur(4px)" }}>
          <div className="w-full max-w-sm rounded-2xl p-6 space-y-5 bg-card border">
            <div>
              <p className="font-black text-lg mb-1">Submit reading test?</p>
              <p className="text-muted-foreground text-sm">
                {40 - countAnswered(answers, 1, 40) > 0
                  ? `${40 - countAnswered(answers, 1, 40)} questions unanswered.`
                  : "All 40 questions answered ✓"}
                {flaggedQ.size > 0 && ` ${flaggedQ.size} flagged.`}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => setShowReadSubmit(false)}
                className="py-2.5 rounded-xl text-sm font-bold border border-border hover:bg-muted transition-colors">
                Keep reviewing
              </button>
              <button onClick={() => { setShowReadSubmit(false); handleSubmit(); }}
                className="py-2.5 rounded-xl text-sm font-black text-white"
                style={{ background:"#16a34a" }}>
                Submit test
              </button>
            </div>
          </div>
        </div>
      )}
    </div>,
    document.body
  );
}
