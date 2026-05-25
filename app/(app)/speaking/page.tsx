"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { PartSelector } from "@/components/speaking/PartSelector";
import { Recorder } from "@/components/speaking/Recorder";
import { CueCard } from "@/components/speaking/CueCard";
import { SpeakingTimer } from "@/components/speaking/SpeakingTimer";
import { BandScoreRing } from "@/components/shared/BandScoreRing";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { SpeakingPart, SpeakingResult, CueCard as CueCardType } from "@/types/ielts";
import { Mic, RefreshCw, Loader2, Shuffle } from "lucide-react";
import confetti from "canvas-confetti";

// ─── Question Banks ────────────────────────────────────────────────────────
const PART1_QUESTIONS = [
  // Hometown & Home
  "Where are you from originally? What do you like most about your hometown?",
  "Do you live in a house or an apartment? What do you like about it?",
  "Has your hometown changed much in recent years? How?",
  // Work & Study
  "Do you work or are you a student? What do you do?",
  "What subject do you enjoy most in your studies? Why?",
  "Do you prefer studying alone or with others? Why?",
  // Free Time & Hobbies
  "What do you do in your free time?",
  "How do you usually spend your weekends?",
  "Do you prefer indoor or outdoor activities? Why?",
  // Technology
  "How often do you use the internet? What do you mainly use it for?",
  "Do you think smartphones have changed people's lives? How?",
  "Do you prefer reading books or reading on a screen? Why?",
  // Food
  "What is your favourite food? Why do you like it?",
  "Do you prefer eating at home or eating out? Why?",
  "Is there any food from other countries that you enjoy?",
  // Travel & Transport
  "How do you usually travel around your city?",
  "Have you ever visited another country? Where would you like to go?",
  "Do you prefer travelling by train, bus, or plane? Why?",
  // Nature & Weather
  "What kind of weather do you like best? Why?",
  "Do you enjoy spending time in nature? What do you do there?",
  // Shopping
  "Do you enjoy shopping? What do you usually buy?",
  "Do you prefer shopping online or in a shop? Why?",
  // Health & Sport
  "Do you do any sport or exercise regularly?",
  "How do you try to stay healthy?",
  // Art & Culture
  "Are you interested in art? Do you visit museums or galleries?",
  "What traditional customs from your culture do you enjoy?",
  // Future
  "What are your plans for the future?",
  "What job would you like to have in the future? Why?",
];

const PART3_QUESTIONS = [
  // Technology & Society
  "How has technology changed the way people communicate in your country?",
  "Do you think people rely too much on technology today? Why?",
  "What are the advantages and disadvantages of social media?",
  "How do you think technology will change education in the next 20 years?",
  // Education
  "What qualities should a good teacher have?",
  "Do you think university education is necessary for success? Why or why not?",
  "How has education in your country changed over the last generation?",
  "Should children learn a foreign language from a very young age?",
  // Environment
  "What role should governments play in protecting the environment?",
  "Do you think individuals or companies are more responsible for environmental problems?",
  "What lifestyle changes could people make to help the environment?",
  // Work & Economy
  "Do you think it is better to work for yourself or for an employer? Why?",
  "How has the nature of work changed in recent decades?",
  "What skills will be most important in the workplace of the future?",
  // Society & Values
  "Do you think traditional values are still important in modern society?",
  "How important is it to keep in touch with older generations?",
  "What are the main causes of stress in modern life, and how can people deal with it?",
  // Cities & Travel
  "What are the advantages and disadvantages of living in a big city?",
  "How do you think cities will change in the future?",
  "Is tourism always a good thing for a country? Explain your view.",
  // Health
  "Who is responsible for people's health — individuals or governments?",
  "Why do you think many people today have an unhealthy lifestyle?",
];

const PART_LIMITS: Record<SpeakingPart, number> = { 1: 35, 2: 120, 3: 50 };
const PART_MIN: Record<SpeakingPart, number> = { 1: 10, 2: 60, 3: 15 };

// ─── Skeleton ─────────────────────────────────────────────────────────────
function SpeakingSkeletonLoader() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-24 w-full rounded-xl" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-20 rounded-lg" />)}
      </div>
      <Skeleton className="h-32 w-full rounded-xl" />
      <Skeleton className="h-24 w-full rounded-xl" />
    </div>
  );
}

// ─── Results view ─────────────────────────────────────────────────────────
function SpeakingResultView({ result }: { result: SpeakingResult }) {
  const criteria = [
    { key: "fluency_coherence", label: "Fluency & Coherence", value: result.scores.fluency_coherence },
    { key: "lexical_resource", label: "Lexical Resource", value: result.scores.lexical_resource },
    { key: "grammatical_range", label: "Grammar & Accuracy", value: result.scores.grammatical_range },
    { key: "pronunciation", label: "Pronunciation", value: result.scores.pronunciation },
  ];

  return (
    <div className="space-y-4">
      {/* Overall */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <BandScoreRing band={result.scores.overall} size={130} />
            <div className="flex-1 space-y-2">
              <div>
                <p className="text-sm text-muted-foreground">Overall Band</p>
                <p className="text-2xl font-mono font-bold">{result.scores.overall.toFixed(1)}</p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{result.summary}</p>
              <div className="flex gap-3 text-xs text-muted-foreground flex-wrap">
                <span>{result.word_count} words</span>
                <span>{Math.round(result.duration_seconds)}s spoken</span>
                {result.words_per_minute && <span>~{Math.round(result.words_per_minute)} wpm</span>}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Criteria */}
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

      {/* Transcript */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Your Transcript</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-foreground leading-relaxed font-mono whitespace-pre-wrap">{result.transcript}</p>
        </CardContent>
      </Card>

      {/* Strengths / Weaknesses */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-emerald-600">✓ Strengths</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1.5">
              {result.strengths.map((s, i) => (
                <li key={i} className="text-sm text-muted-foreground flex gap-2">
                  <span className="text-emerald-500 shrink-0">•</span>{s}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-red-600">✗ Weaknesses</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1.5">
              {result.weaknesses.map((w, i) => (
                <li key={i} className="text-sm text-muted-foreground flex gap-2">
                  <span className="text-red-500 shrink-0">•</span>{w}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Pronunciation issues */}
      {result.pronunciation_issues.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Pronunciation Issues
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {result.pronunciation_issues.map((p, i) => (
              <div key={i} className="text-sm border rounded-md p-3 bg-card">
                <span className="font-mono font-semibold text-amber-600">&ldquo;{p.word}&rdquo;</span>
                <span className="text-muted-foreground mx-1.5">—</span>
                <span className="text-muted-foreground">{p.issue}</span>
                <p className="text-emerald-600 text-xs mt-1.5 font-medium">✓ Fix: {p.fix}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Grammar issues */}
      {result.grammar_issues.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Grammar Issues</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {result.grammar_issues.map((g, i) => (
              <div key={i} className="text-sm border rounded-md p-3 bg-card">
                <div className="line-through text-red-500 text-sm">&ldquo;{g.said}&rdquo;</div>
                <div className="text-emerald-600 font-medium text-sm mt-1">&ldquo;{g.should_be}&rdquo;</div>
                <p className="text-xs text-muted-foreground mt-1.5">{g.reason}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Vocabulary upgrades */}
      {result.vocabulary_suggestions && result.vocabulary_suggestions.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Vocabulary Upgrades
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {result.vocabulary_suggestions.map((v, i) => (
              <div key={i} className="text-sm border rounded-md p-3 bg-card flex gap-3 items-start">
                <div className="flex-1">
                  <span className="text-muted-foreground line-through">{v.basic_word}</span>
                  <span className="mx-2 text-muted-foreground">→</span>
                  <span className="text-violet-600 font-semibold">{v.better_word}</span>
                  <p className="text-xs text-muted-foreground mt-1 italic">&ldquo;{v.example}&rdquo;</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Model answer */}
      <Card className="border-violet-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-violet-600">✦ Band 8+ Model Answer</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-foreground">{result.model_answer}</p>
        </CardContent>
      </Card>

      {/* Next actions */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Next Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {result.next_actions.map((action, i) => (
            <div key={i} className="flex gap-2.5 text-sm">
              <span className="font-mono font-bold text-violet-500 shrink-0">{i + 1}.</span>
              <span className="text-foreground">{action}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────
export default function SpeakingPage() {
  const [part, setPart] = useState<SpeakingPart>(1);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [cueCard, setCueCard] = useState<CueCardType | null>(null);
  const [loadingCueCard, setLoadingCueCard] = useState(false);
  const [prepTimeLeft, setPrepTimeLeft] = useState(60);
  const [prepActive, setPrepActive] = useState(false);
  const [recordingEnabled, setRecordingEnabled] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SpeakingResult | null>(null);

  const prepTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentQuestion =
    part === 1
      ? PART1_QUESTIONS[questionIdx]
      : part === 3
      ? PART3_QUESTIONS[questionIdx]
      : cueCard?.topic || "";

  // Load cue card when Part 2 selected
  useEffect(() => {
    if (part !== 2 || cueCard) return;
    let cancelled = false;
    async function loadCard() {
      try {
        setLoadingCueCard(true);
        const r = await fetch("/api/speaking/cue-card");
        const data = await r.json();
        if (!cancelled && data.topic) setCueCard(data);
      } catch {
        if (!cancelled) toast.error("Failed to load cue card");
      } finally {
        if (!cancelled) setLoadingCueCard(false);
      }
    }
    loadCard();
    return () => { cancelled = true; };
  }, [part, cueCard]);

  function fetchNewCueCard() {
    setCueCard(null);
    setAudioBlob(null);
    setResult(null);
    setRecordingEnabled(false);
    setPrepActive(false);
    setPrepTimeLeft(60);
  }

  function startPrep() {
    setPrepActive(true);
    setPrepTimeLeft(60);
    setRecordingEnabled(false);
    prepTimerRef.current = setInterval(() => {
      setPrepTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(prepTimerRef.current!);
          setRecordingEnabled(true);
          setPrepActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  function handleReset() {
    setResult(null);
    setAudioBlob(null);
    setRecordingEnabled(part !== 2);
    setPrepActive(false);
    setPrepTimeLeft(60);
    if (prepTimerRef.current) clearInterval(prepTimerRef.current);
  }

  function pickRandomQuestion() {
    const bank = part === 1 ? PART1_QUESTIONS : PART3_QUESTIONS;
    const newIdx = Math.floor(Math.random() * bank.length);
    setQuestionIdx(newIdx);
    setResult(null);
    setAudioBlob(null);
  }

  async function handleScore() {
    if (!audioBlob) { toast.error("No recording found"); return; }
    setLoading(true);
    setResult(null);
    try {
      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.webm");
      formData.append("part", String(part));
      formData.append("question", currentQuestion);
      const res = await fetch("/api/speaking/score", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error || "Scoring failed"); return; }
      setResult(data.result);
      if (data.result.scores.overall >= 7) {
        confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 }, colors: ["#8b5cf6", "#10b981", "#f59e0b"] });
      }
      setTimeout(() => {
        document.getElementById("speaking-results")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Speaking Practice</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Record your answer and get instant examiner feedback
        </p>
      </div>

      {/* Part selector */}
      <PartSelector selected={part} onChange={(p) => {
        setPart(p);
        setResult(null);
        setAudioBlob(null);
        setRecordingEnabled(p !== 2);
        setCueCard(null);
        setQuestionIdx(0);
      }} />

      {/* Question display */}
      <Card>
        <CardContent className="pt-5 pb-5">
          {part === 2 ? (
            loadingCueCard ? (
              <div className="space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>
            ) : cueCard ? (
              <div className="space-y-3">
                <CueCard
                  cueCard={cueCard}
                  prepTimeLeft={prepActive ? prepTimeLeft : undefined}
                  isPrep={prepActive}
                />
                {!prepActive && !recordingEnabled && !result && (
                  <button
                    onClick={fetchNewCueCard}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Shuffle className="w-3 h-3" /> Get a different topic
                  </button>
                )}
              </div>
            ) : null
          ) : (
            <div className="space-y-3">
              <p className="font-medium text-base leading-relaxed">{currentQuestion}</p>
              <div className="flex items-center gap-2 flex-wrap">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={pickRandomQuestion}
                  className="gap-1.5 h-7 text-xs"
                >
                  <Shuffle className="w-3 h-3" /> Random question
                </Button>
                <div className="flex gap-1">
                  {Array.from({ length: Math.min(8, (part === 1 ? PART1_QUESTIONS : PART3_QUESTIONS).length) }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { setQuestionIdx(i); setResult(null); setAudioBlob(null); }}
                      className={`w-6 h-6 rounded-full text-[10px] font-mono transition-colors ${
                        i === questionIdx % 8
                          ? "bg-violet-500 text-white"
                          : "bg-muted text-muted-foreground hover:bg-accent"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Part 2: Prep timer */}
      {part === 2 && cueCard && !prepActive && !recordingEnabled && !result && (
        <Button onClick={startPrep} className="w-full gap-2 bg-violet-500 hover:bg-violet-600 text-white">
          ✏️ Start 1-minute preparation time
        </Button>
      )}
      {part === 2 && prepActive && (
        <SpeakingTimer elapsed={60 - prepTimeLeft} limit={60} label="Preparation time (make notes)" warning={10} />
      )}

      {/* Recorder */}
      {(part !== 2 || recordingEnabled) && !result && (
        <Card>
          <CardContent className="pt-6 pb-6">
            <Recorder
              limitSeconds={PART_LIMITS[part]}
              minSeconds={PART_MIN[part]}
              onRecordingComplete={(blob) => setAudioBlob(blob)}
              disabled={loading}
              label={
                part === 1 ? "Answer in 20–30 seconds"
                : part === 2 ? "Speak for 1–2 minutes"
                : "Answer in 30–45 seconds"
              }
            />
          </CardContent>
        </Card>
      )}

      {/* Submit */}
      {audioBlob && !result && (
        <Button
          onClick={handleScore}
          disabled={loading}
          className="w-full gap-2 bg-violet-500 hover:bg-violet-600 text-white"
        >
          {loading ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Scoring your answer…</>
          ) : (
            <><Mic className="w-4 h-4" /> Get Band Score</>
          )}
        </Button>
      )}

      {/* Retry */}
      {result && (
        <Button variant="outline" onClick={handleReset} className="w-full gap-2">
          <RefreshCw className="w-4 h-4" /> Try another question
        </Button>
      )}

      {/* Skeleton */}
      {loading && (
        <div>
          <p className="text-sm text-muted-foreground mb-4 animate-pulse">Analysing your speaking…</p>
          <SpeakingSkeletonLoader />
        </div>
      )}

      {/* Results */}
      {result && !loading && (
        <div id="speaking-results" className="pt-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Your Results</span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <SpeakingResultView result={result} />
        </div>
      )}
    </div>
  );
}
