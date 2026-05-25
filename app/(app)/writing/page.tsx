"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { EssayEditor } from "@/components/writing/EssayEditor";
import { ScoreCard } from "@/components/writing/ScoreCard";
import { CorrectionsView } from "@/components/writing/CorrectionsView";
import { BandRewrite } from "@/components/writing/BandRewrite";
import { WritingResult } from "@/types/ielts";
import { Loader2, FileText, RotateCcw, Timer, ChevronDown, ChevronUp, Shuffle, ImagePlus, X, BarChart3 } from "lucide-react";
import confetti from "canvas-confetti";
import { wordCount } from "@/lib/utils/word-count";

// ─── Question banks ────────────────────────────────────────────────────────
const TASK2_QUESTIONS = [
  { type: "opinion", q: "Some people think that children should begin their formal education at a very early age. Others think they should start school when they are older (around 6 or 7 years old). Discuss both these views and give your own opinion." },
  { type: "opinion", q: "Some people believe that unpaid community service should be a compulsory part of high school programmes. To what extent do you agree or disagree?" },
  { type: "discuss_both_views", q: "Some people think that the best way to reduce crime is to give longer prison sentences. Others, however, believe that there are better alternative ways of reducing crime. Discuss both views and give your own opinion." },
  { type: "problem_solution", q: "In many cities, the amount of traffic is increasing rapidly. What problems does traffic cause, and what can be done to reduce it?" },
  { type: "advantages_disadvantages", q: "Some people think that it is better for children to grow up in the countryside than in a big city. Do the advantages of growing up in the countryside outweigh the disadvantages?" },
  { type: "opinion", q: "Many people believe that technology is making people less social. To what extent do you agree or disagree?" },
  { type: "discuss_both_views", q: "Some people think that parents should teach children how to be good members of society. Others, however, believe that school is the place to learn this. Discuss both views and give your own opinion." },
  { type: "problem_solution", q: "In many countries, the number of people choosing to work from home is increasing. What are the problems this creates, and what can be done to solve them?" },
  { type: "advantages_disadvantages", q: "Some people think that studying online is better than going to a university. Do the advantages of online study outweigh the disadvantages?" },
  { type: "direct_question", q: "In some countries, people who are older than 65 should not be allowed to drive. Do you agree or disagree? What other measures could be taken to improve road safety?" },
];

const TASK1_QUESTIONS = [
  "The chart below shows the percentage of households in owned and rented accommodation in England and Wales between 1918 and 2011. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
  "The graph below shows the number of university graduates in Canada from 1992 to 2007. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
  "The diagram below shows the water cycle. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
  "The table below gives information about the underground railway systems in six cities. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
  "The pie charts below compare water usage in San Diego (USA) and Sydney (Australia). Summarise the information by selecting and reporting the main features.",
];

const ESSAY_TYPE_LABELS: Record<string, { label: string; color: string; tip: string }> = {
  opinion:                    { label: "Opinion Essay",              color: "bg-violet-100 text-violet-700", tip: "Give a CLEAR opinion. Support with 2 reasons + examples." },
  discuss_both_views:         { label: "Discuss Both Views",         color: "bg-blue-100 text-blue-700",    tip: "Discuss BOTH sides fairly. State your opinion in the introduction AND conclusion." },
  problem_solution:           { label: "Problem & Solution",         color: "bg-amber-100 text-amber-700",  tip: "Name specific problems, then give realistic solutions. Avoid vague answers." },
  advantages_disadvantages:   { label: "Advantages & Disadvantages", color: "bg-emerald-100 text-emerald-700", tip: "Compare advantages and disadvantages. Give your opinion at the end." },
  direct_question:            { label: "Direct Question",            color: "bg-pink-100 text-pink-700",    tip: "Answer ALL parts of the question directly. Don't just give one side." },
};

const BAND_DESCRIPTIONS: Record<string, { label: string; desc: string }> = {
  "9.0": { label: "Expert",       desc: "Fully operational command of English. No errors." },
  "8.5": { label: "Very Good+",   desc: "Highly accurate. Minor errors only. Near-native." },
  "8.0": { label: "Very Good",    desc: "Fully competent with occasional inaccuracies. Very few errors." },
  "7.5": { label: "Good+",        desc: "Operates effectively. Good range with some errors under pressure." },
  "7.0": { label: "Good",         desc: "Handles complex language well. Some inaccuracies in less common situations." },
  "6.5": { label: "Competent+",   desc: "Effective basic competence. Errors occur in complex language." },
  "6.0": { label: "Competent",    desc: "Generally effective in familiar situations. Frequent errors in complex language." },
  "5.5": { label: "Modest+",      desc: "Partial command. Makes notable errors, but basic meaning is clear." },
  "5.0": { label: "Modest",       desc: "Partial command. Significant errors. Can handle general meaning." },
};

function WritingSkeletonLoader() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 py-2">
        <div className="w-8 h-8 rounded-full bg-violet-100 animate-pulse flex items-center justify-center">
          <span className="text-violet-500 text-sm">🎓</span>
        </div>
        <p className="text-sm text-muted-foreground animate-pulse font-medium">
          IELTS Sensei is analysing your essay…
        </p>
      </div>
      <Skeleton className="h-40 w-full rounded-xl" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-20 rounded-lg" />)}
      </div>
      <Skeleton className="h-32 w-full rounded-xl" />
      <Skeleton className="h-48 w-full rounded-xl" />
    </div>
  );
}

function TimerDisplay({ seconds, limit }: { seconds: number; limit: number }) {
  const remaining = limit - seconds;
  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const isWarning = remaining <= 300;
  const isOver = remaining <= 0;

  return (
    <div className={`flex items-center gap-2 text-sm font-mono font-bold px-3 py-1.5 rounded-lg border ${
      isOver    ? "text-red-500 border-red-200 bg-red-50" :
      isWarning ? "text-amber-500 border-amber-200 bg-amber-50" :
                  "text-emerald-600 border-emerald-200 bg-emerald-50"
    }`}>
      <Timer className="w-3.5 h-3.5" />
      {isOver ? "TIME UP" : `${mins}:${secs.toString().padStart(2, "0")}`}
    </div>
  );
}

// ─── Chart image upload component ──────────────────────────────────────────
function ChartUpload({
  preview,
  onFileSelect,
  onRemove,
}: {
  preview: string | null;
  onFileSelect: (file: File) => void;
  onRemove: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) onFileSelect(file);
    else toast.error("Please drop an image file (PNG, JPG, etc.)");
  }

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
    e.target.value = "";
  }

  if (preview) {
    return (
      <div className="relative rounded-xl border overflow-hidden bg-muted/30">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={preview} alt="Chart" className="w-full max-h-80 object-contain" />
        <button
          type="button"
          onClick={onRemove}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-background/90 border flex items-center justify-center hover:bg-red-50 hover:border-red-300 transition-colors"
        >
          <X className="w-3.5 h-3.5 text-muted-foreground hover:text-red-500" />
        </button>
        <div className="absolute bottom-2 left-2">
          <span className="text-xs bg-background/90 border px-2 py-0.5 rounded-full font-medium">
            ✓ Chart uploaded — Sensei will analyse it
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`relative flex flex-col items-center justify-center gap-3 p-8 rounded-xl border-2 border-dashed cursor-pointer transition-all ${
        dragging
          ? "border-violet-400 bg-violet-50 dark:bg-violet-950"
          : "border-border hover:border-violet-300 hover:bg-muted/30"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileInput}
      />
      <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-900 flex items-center justify-center">
        <BarChart3 className="w-5 h-5 text-violet-500" />
      </div>
      <div className="text-center">
        <p className="text-sm font-medium">Upload your chart or diagram</p>
        <p className="text-xs text-muted-foreground mt-1">
          Drag &amp; drop or click — PNG, JPG, GIF supported
        </p>
      </div>
      <Button type="button" variant="outline" size="sm" className="gap-1.5 pointer-events-none">
        <ImagePlus className="w-3.5 h-3.5" /> Choose image
      </Button>
    </div>
  );
}

export default function WritingPage() {
  const [taskType, setTaskType] = useState<"task1" | "task2">("task2");
  const [question, setQuestion] = useState("");
  const [essay, setEssay] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<WritingResult | null>(null);
  const [timerActive, setTimerActive] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [showBandGuide, setShowBandGuide] = useState(false);
  const [chartFile, setChartFile] = useState<File | null>(null);
  const [chartPreview, setChartPreview] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeLimit = taskType === "task1" ? 1200 : 2400;

  const minWords = taskType === "task1" ? 150 : 250;
  const wc = wordCount(essay);

  function toggleTimer() {
    if (timerActive) {
      clearInterval(timerRef.current!);
      setTimerActive(false);
    } else {
      setTimerSeconds(0);
      setTimerActive(true);
      timerRef.current = setInterval(() => setTimerSeconds((s) => s + 1), 1000);
    }
  }

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  useEffect(() => {
    if (timerSeconds < timeLimit || !timerActive) return;
    clearInterval(timerRef.current!);
    timerRef.current = null;
    const t = setTimeout(() => {
      setTimerActive(false);
      toast.warning("Time is up! Submit your essay now.");
    }, 0);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerSeconds, timeLimit]);

  const handleChartSelect = useCallback((file: File) => {
    setChartFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setChartPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleChartRemove = useCallback(() => {
    setChartFile(null);
    setChartPreview(null);
  }, []);

  function pickRandomQuestion() {
    if (taskType === "task2") {
      const q = TASK2_QUESTIONS[Math.floor(Math.random() * TASK2_QUESTIONS.length)];
      setQuestion(q.q);
    } else {
      const q = TASK1_QUESTIONS[Math.floor(Math.random() * TASK1_QUESTIONS.length)];
      setQuestion(q);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!question.trim()) { toast.error("Please enter the question first"); return; }
    if (!essay.trim()) { toast.error("Please write your answer first"); return; }
    if (wc < minWords) {
      toast.warning(`Your essay is only ${wc} words. IELTS requires at least ${minWords} words. Submit anyway?`);
    }

    setLoading(true);
    setResult(null);
    if (timerActive) { clearInterval(timerRef.current!); setTimerActive(false); }

    try {
      let imageBase64: string | undefined;
      let imageMimeType: string | undefined;

      // Convert chart image to base64 if provided
      if (chartFile) {
        const buffer = await chartFile.arrayBuffer();
        const bytes = new Uint8Array(buffer);
        let binary = "";
        for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
        imageBase64 = btoa(binary);
        imageMimeType = chartFile.type || "image/jpeg";
      }

      const res = await fetch("/api/writing/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskType, question, essay, imageBase64, imageMimeType }),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error || "Scoring failed. Please try again."); return; }
      setResult(data.result);
      if (data.result.scores.overall >= 7) {
        confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 }, colors: ["#8b5cf6", "#10b981", "#f59e0b"] });
      }
      setTimeout(() => document.getElementById("results")?.scrollIntoView({ behavior: "smooth" }), 100);
    } catch {
      toast.error("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setResult(null);
    setEssay("");
    setTimerSeconds(0);
    if (timerRef.current) clearInterval(timerRef.current);
    setTimerActive(false);
    setChartFile(null);
    setChartPreview(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Writing Practice</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Paste or type your answer and get instant examiner-grade feedback
          </p>
        </div>
        <button
          onClick={() => setShowBandGuide(!showBandGuide)}
          className="text-xs text-violet-500 hover:text-violet-600 flex items-center gap-1 shrink-0 mt-1"
        >
          Band guide {showBandGuide ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
      </div>

      {/* Band guide */}
      {showBandGuide && (
        <div className="border rounded-xl p-4 bg-muted/30 space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">IELTS Band Descriptions</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {Object.entries(BAND_DESCRIPTIONS).map(([band, { label, desc }]) => (
              <div key={band} className="text-xs bg-card border rounded-lg p-2">
                <span className="font-mono font-bold text-sm">{band}</span>
                <span className="text-muted-foreground ml-1.5">{label}</span>
                <p className="text-muted-foreground mt-0.5 leading-tight">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <Tabs
        value={taskType}
        onValueChange={(v) => {
          setTaskType(v as "task1" | "task2");
          setResult(null);
          setEssay("");
          setQuestion("");
          setTimerSeconds(0);
          if (timerRef.current) clearInterval(timerRef.current);
          setTimerActive(false);
          setChartFile(null);
          setChartPreview(null);
        }}
      >
        <TabsList className="grid grid-cols-2 w-full max-w-xs">
          <TabsTrigger value="task2">Task 2 — Essay</TabsTrigger>
          <TabsTrigger value="task1">Task 1 — Report</TabsTrigger>
        </TabsList>

        <TabsContent value={taskType} className="mt-4">
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Task 1: Chart / diagram upload */}
            {taskType === "task1" && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium flex items-center gap-1.5">
                    <BarChart3 className="w-3.5 h-3.5 text-violet-500" />
                    Chart or diagram
                    <span className="text-xs text-muted-foreground font-normal">(optional but recommended)</span>
                  </label>
                </div>
                <ChartUpload
                  preview={chartPreview}
                  onFileSelect={handleChartSelect}
                  onRemove={handleChartRemove}
                />
              </div>
            )}

            {/* Question */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">
                  {taskType === "task1" ? "Question / task instructions" : "Essay question"}
                </label>
                <button
                  type="button"
                  onClick={pickRandomQuestion}
                  className="flex items-center gap-1 text-xs text-violet-500 hover:text-violet-600 transition-colors"
                >
                  <Shuffle className="w-3 h-3" /> Practice question
                </button>
              </div>
              <Textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder={
                  taskType === "task1"
                    ? "Paste the task instructions here, e.g. 'The graph below shows... Summarise the information by selecting and reporting the main features...'"
                    : "Paste the essay question here, or click 'Practice question' for a sample..."
                }
                className="resize-none min-h-[100px] text-sm"
              />
            </div>

            {/* Essay / report */}
            <EssayEditor
              value={essay}
              onChange={setEssay}
              minWords={minWords}
              label={taskType === "task1" ? "Your report" : "Your essay"}
              placeholder={`Write your ${taskType === "task1" ? "report" : "essay"} here...`}
            />

            {/* Timer + submit */}
            <div className="flex flex-wrap items-center gap-2">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 sm:flex-none sm:min-w-[180px] gap-2 bg-violet-500 hover:bg-violet-600 text-white"
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Scoring…</>
                ) : (
                  <><FileText className="w-4 h-4" /> Get Band Score</>
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={toggleTimer}
                className="gap-1.5"
              >
                <Timer className="w-3.5 h-3.5" />
                {timerActive ? "Pause timer" : "Start exam timer"}
              </Button>

              {timerActive && <TimerDisplay seconds={timerSeconds} limit={timeLimit} />}

              {result && (
                <Button type="button" variant="outline" onClick={handleReset} className="gap-2">
                  <RotateCcw className="w-4 h-4" /> New attempt
                </Button>
              )}
            </div>

            {timerActive && (
              <p className="text-xs text-muted-foreground">
                {taskType === "task1" ? "Task 1 recommended time: 20 minutes" : "Task 2 recommended time: 40 minutes"}
              </p>
            )}
          </form>
        </TabsContent>
      </Tabs>

      {/* Loading */}
      {loading && <WritingSkeletonLoader />}

      {/* Results */}
      {result && !loading && (
        <div id="results" className="space-y-4 pt-2">
          {result.essay_type && ESSAY_TYPE_LABELS[result.essay_type] && (
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className={`text-xs ${ESSAY_TYPE_LABELS[result.essay_type].color} border-0`}>
                {ESSAY_TYPE_LABELS[result.essay_type].label}
              </Badge>
              <span className="text-xs text-muted-foreground">
                💡 {ESSAY_TYPE_LABELS[result.essay_type].tip}
              </span>
            </div>
          )}

          {taskType === "task1" && result.has_overview === false && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-700">
              ⚠️ <strong>No overview detected.</strong> Task 1 requires an overview paragraph (what the chart shows overall). This caps your Task Achievement score at 5.0.
            </div>
          )}

          <div className="flex items-center gap-2">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Your Results</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <ScoreCard result={result} taskType={taskType} />
          <CorrectionsView result={result} />
          <BandRewrite result={result} />
        </div>
      )}
    </div>
  );
}
