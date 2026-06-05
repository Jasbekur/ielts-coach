"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Headphones, Play, Pause, Volume2, VolumeX, Clock,
  CheckCircle2, XCircle, Users, Mic2, GraduationCap,
  BookOpen, RotateCcw, ChevronLeft, Trophy, AlertCircle,
  AlignLeft, Zap, ClipboardList, ChevronRight,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useLocalDraft } from "@/hooks/useLocalDraft";
import { ShareScoreCard } from "@/components/shared/ShareScoreCard";

// ── Types ─────────────────────────────────────────────────────────────────────

type ExamMode = "practice" | "exam";
type PageMode = "practice" | "fulltest";

interface LQuestion {
  number:      number;
  type?:       string;
  text:        string;
  prefix?:     string;
  suffix?:     string;
  options?:    string[];
  answer:      string;
  acceptable?: string[];
}

interface LGroup {
  type:        string;
  instruction: string;
  questions:   LQuestion[];
}

interface LContent {
  status:           "published" | "draft";
  audio_url:        string;
  context?:         string;
  transcript?:      string;
  questions?:       LQuestion[];
  question_groups?: LGroup[];
}

interface LMaterial {
  id:         string;
  title:      string;
  type:       string;
  content:    LContent;
  created_at: string;
}

interface SectionResult {
  label:   string;
  color:   string;
  correct: number;
  total:   number;
  band:    number;
  details: { q: LQuestion; given: string; ok: boolean }[];
}

interface FullTestResult {
  overallBand:    number;
  totalCorrect:   number;
  totalQuestions: number;
  sections:       SectionResult[];
}

// ── Section metadata ──────────────────────────────────────────────────────────

const SECTIONS = [
  { type:"listening_s1", num:1, label:"Part 1", icon:Users,          color:"#38bdf8", bg:"#071826", border:"#0c3a57", context:"Everyday social situation",  description:"A conversation between two people — booking, enquiry, social arrangement.",           qRange:"Q 1–10",  start:1  },
  { type:"listening_s2", num:2, label:"Part 2", icon:Mic2,           color:"#34d399", bg:"#061a10", border:"#0a3520", context:"Social monologue",            description:"One person speaking — tour guide, community announcement, public talk.",              qRange:"Q 11–20", start:11 },
  { type:"listening_s3", num:3, label:"Part 3", icon:GraduationCap,  color:"#fbbf24", bg:"#1a1206", border:"#3d2a06", context:"Academic discussion",         description:"Up to four speakers — students and tutor discussing coursework or research.",          qRange:"Q 21–30", start:21 },
  { type:"listening_s4", num:4, label:"Part 4", icon:BookOpen,       color:"#c084fc", bg:"#130a20", border:"#2d1050", context:"Academic lecture",            description:"A monologue on an academic or scientific subject — the hardest section.",             qRange:"Q 31–40", start:31 },
] as const;

// ── Helpers ───────────────────────────────────────────────────────────────────

// Official Cambridge Listening band conversion table (differs from Reading)
function scoreToBand(correct: number, outOf: number): number {
  if (outOf === 0) return 0;
  const scaled = Math.round((correct / outOf) * 40);
  if (scaled >= 39) return 9;
  if (scaled >= 37) return 8.5;
  if (scaled >= 35) return 8;
  if (scaled >= 33) return 7.5;
  if (scaled >= 30) return 7;
  if (scaled >= 27) return 6.5;
  if (scaled >= 23) return 6;
  if (scaled >= 18) return 5.5;  // fix: was >= 20 — official table 18–22 → 5.5
  if (scaled >= 16) return 5;
  if (scaled >= 13) return 4.5;
  return 4;
}

function fmtTime(s: number) {
  const m   = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

function getQuestions(mat: LMaterial): LQuestion[] {
  if (mat.content.question_groups?.length)
    return mat.content.question_groups.flatMap(g => g.questions);
  return mat.content.questions ?? [];
}

function bandColor(band: number) {
  if (band >= 7)   return "#34d399";
  if (band >= 5.5) return "#fbbf24";
  return "#f87171";
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ListeningPage() {
  const supabase = createClient();

  // ── Shared ─────────────────────────────────────────────────────────────────
  const [pageMode,  setPageMode]  = useState<PageMode>("practice");
  const [examMode,  setExamMode]  = useState<ExamMode>("practice");
  const [available, setAvailable] = useState<Record<string, LMaterial[]>>({});
  const [loadingDB, setLoadingDB] = useState(true);

  // ── Audio ──────────────────────────────────────────────────────────────────
  const audioRef                    = useRef<HTMLAudioElement>(null);
  const [playing,      setPlaying]  = useState(false);
  const [curTime,      setCurTime]  = useState(0);
  const [dur,          setDur]      = useState(0);
  const [muted,        setMuted]       = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  const [audioBlocked, setAudioBlocked] = useState(false); // autoplay blocked overlay
  const [audioProgress, setAudioProgress] = useState(0);   // 0-100 for progress bar

  // ── Practice mode ──────────────────────────────────────────────────────────
  const [practicePhase,    setPracticePhase]    = useState<"selector"|"listening"|"results">("selector");
  const [material,         setMaterial]         = useState<LMaterial | null>(null);
  const [section,          setSection]          = useState<typeof SECTIONS[number] | null>(null);
  const [answers,          setAnswers]          = useState<Record<number, string>>({});
  const [results,          setResults]          = useState<{ correct: number; total: number; details: { q: LQuestion; given: string; ok: boolean }[] } | null>(null);
  const [showTranscript,   setShowTranscript]   = useState(false);
  const [ptTimeLeft,       setPtTimeLeft]       = useState(0);
  const ptTimerRef                              = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Full-test mode ─────────────────────────────────────────────────────────
  const [ftPhase,      setFtPhase]      = useState<"active"|"results">("active");
  const [ftActiveTab,  setFtActiveTab]  = useState(0);
  const [ftAnswers,    setFtAnswers]    = useState<Record<number, string>>({});
  const [ftResult,     setFtResult]     = useState<FullTestResult | null>(null);
  const [ftSections,   setFtSections]   = useState<Array<{ meta: typeof SECTIONS[number]; mat: LMaterial }>>([]);
  const [ftTimeLeft,   setFtTimeLeft]   = useState(40 * 60);
  const [ftRunning,    setFtRunning]    = useState(false);
  const ftTimerRef                      = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Answer persistence ─────────────────────────────────────────────────────
  const answerDraft = useLocalDraft<Record<number, string>>("ielts-listening-ft-answers");
  useEffect(() => {
    if (pageMode === "fulltest" && ftPhase === "active") {
      const saved = answerDraft.load();
      if (saved && Object.keys(saved).length > 0) setFtAnswers(saved);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageMode, ftPhase]);
  useEffect(() => {
    if (pageMode === "fulltest" && ftPhase === "active" && Object.keys(ftAnswers).length > 0) {
      answerDraft.save(ftAnswers);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ftAnswers]);

  // ── Question navigator & flagging ──────────────────────────────────────────
  const [ftFlagged,        setFtFlagged]        = useState<Set<number>>(new Set());
  const [showSubmitModal,  setShowSubmitModal]  = useState(false);
  const [showNavigator,    setShowNavigator]    = useState(false);
  const questionRefs = useRef<Record<number, HTMLDivElement | null>>({});

  function toggleFlag(num: number) {
    setFtFlagged(prev => {
      const next = new Set(prev);
      if (next.has(num)) next.delete(num); else next.add(num);
      return next;
    });
  }
  function scrollToQuestion(num: number) {
    setFtActiveTab(
      ftSections.findIndex(({ mat }) =>
        getQuestions(mat).some(q => q.number === num)
      ) || 0
    );
    setTimeout(() => {
      questionRefs.current[num]?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 80);
  }

  // ── Fetch sections from DB ──────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      setLoadingDB(true);
      try {
        const res  = await fetch("/api/listening/sections");
        const json = await res.json();
        const grouped: Record<string, LMaterial[]> = {};
        (json.data ?? []).forEach((m: LMaterial) => {
          if (!grouped[m.type]) grouped[m.type] = [];
          grouped[m.type].push(m);
        });
        setAvailable(grouped);
      } catch { /* silent */ }
      setLoadingDB(false);
    })();
  }, []);

  // ── Practice timer ──────────────────────────────────────────────────────────
  const handlePracticeSubmit = useCallback(async () => {
    if (!material) return;
    const questions = getQuestions(material);
    const details   = questions.map(q => {
      const given   = (answers[q.number] ?? "").trim().toLowerCase();
      const correct = q.answer.trim().toLowerCase();
      const alts    = (q.acceptable ?? []).map(a => a.trim().toLowerCase());
      const ok      = given === correct || alts.includes(given);
      return { q, given: answers[q.number] ?? "", ok };
    });
    const correct = details.filter(d => d.ok).length;
    setResults({ correct, total: questions.length, details });
    if (ptTimerRef.current) clearInterval(ptTimerRef.current);
    if (audioRef.current)   { audioRef.current.pause(); setPlaying(false); }
    setPracticePhase("results");
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user && section) {
        await supabase.from("attempts").insert({
          user_id:      user.id,
          mode:         "listening",
          task_type:    `section_${section.num}`,
          overall_band: scoreToBand(correct, questions.length),
          result:       { correct, total: questions.length, band: scoreToBand(correct, questions.length), section: section.label },
        });
      }
    } catch { /* silent */ }
  }, [material, answers, supabase, section]);

  useEffect(() => {
    if (practicePhase !== "listening" || examMode !== "exam") return;
    if (ptTimerRef.current) clearInterval(ptTimerRef.current);
    ptTimerRef.current = setInterval(() => {
      setPtTimeLeft(t => {
        if (t <= 1) { clearInterval(ptTimerRef.current!); handlePracticeSubmit(); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => { if (ptTimerRef.current) clearInterval(ptTimerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [practicePhase, examMode]);

  // ── Full-test submit ────────────────────────────────────────────────────────
  const submitFullTest = useCallback(async () => {
    if (!ftSections.length) return;
    const secResults: SectionResult[] = ftSections.map(({ meta, mat }) => {
      const questions = getQuestions(mat);
      const details   = questions.map(q => {
        const given   = (ftAnswers[q.number] ?? "").trim().toLowerCase();
        const correct = q.answer.trim().toLowerCase();
        const alts    = (q.acceptable ?? []).map(a => a.trim().toLowerCase());
        const ok      = given === correct || alts.includes(given);
        return { q, given: ftAnswers[q.number] ?? "", ok };
      });
      const correct = details.filter(d => d.ok).length;
      return { label: meta.label, color: meta.color, correct, total: questions.length, band: scoreToBand(correct, questions.length), details };
    });
    const totalCorrect   = secResults.reduce((s, r) => s + r.correct, 0);
    const totalQuestions = secResults.reduce((s, r) => s + r.total, 0);
    const overallBand    = scoreToBand(totalCorrect, totalQuestions);
    setFtResult({ overallBand, totalCorrect, totalQuestions, sections: secResults });
    if (ftTimerRef.current) clearInterval(ftTimerRef.current);
    if (audioRef.current)   { audioRef.current.pause(); setPlaying(false); }
    setFtRunning(false);
    answerDraft.clear(); // wipe persisted answers after submit
    setFtPhase("results");
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("attempts").insert({
          user_id:      user.id,
          mode:         "listening",
          task_type:    "full_test",
          overall_band: overallBand,
          result:       { totalCorrect, totalQuestions, overallBand, sections: secResults.map(r => ({ label: r.label, correct: r.correct, total: r.total, band: r.band })) },
        });
      }
    } catch { /* silent */ }
  }, [ftSections, ftAnswers, supabase]);

  // ── Full-test timer ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (!ftRunning || examMode !== "exam") return;
    if (ftTimerRef.current) clearInterval(ftTimerRef.current);
    ftTimerRef.current = setInterval(() => {
      setFtTimeLeft(t => {
        if (t <= 1) { clearInterval(ftTimerRef.current!); submitFullTest(); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => { if (ftTimerRef.current) clearInterval(ftTimerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ftRunning, examMode]);

  // ── Audio helpers ───────────────────────────────────────────────────────────
  function togglePlay() {
    const a = audioRef.current;
    if (!a) return;
    if (playing) { a.pause(); }
    else         { a.play(); if (!audioStarted) setAudioStarted(true); }
  }

  // ── Practice: start section ─────────────────────────────────────────────────
  function startSection(sec: typeof SECTIONS[number]) {
    const pool = available[sec.type];
    if (!pool?.length) return;
    const m = pool[Math.floor(Math.random() * pool.length)];
    setMaterial(m); setSection(sec);
    setAnswers({}); setResults(null);
    setAudioStarted(false); setPlaying(false); setCurTime(0); setDur(0);
    setShowTranscript(false);
    if (examMode === "exam") setPtTimeLeft(10 * 60);
    setPracticePhase("listening");
  }

  // ── Full-test: start ────────────────────────────────────────────────────────
  function startFullTest() {
    const secs = SECTIONS.map(sec => {
      const pool = available[sec.type];
      if (!pool?.length) return null;
      return { meta: sec, mat: pool[Math.floor(Math.random() * pool.length)] };
    }).filter(Boolean) as Array<{ meta: typeof SECTIONS[number]; mat: LMaterial }>;
    if (!secs.length) return;
    setFtSections(secs);
    setFtAnswers({}); setFtActiveTab(0); setFtResult(null);
    setAudioStarted(false); setAudioBlocked(false); setAudioProgress(0);
    setPlaying(false); setCurTime(0); setDur(0);
    setFtTimeLeft(40 * 60); setFtRunning(true);
    setFtPhase("active");
  }

  // ── Auto-play audio when full test goes active ──────────────────────────────
  useEffect(() => {
    if (pageMode !== "fulltest" || ftPhase !== "active" || !ftSections.length) return;
    const audio = audioRef.current;
    if (!audio) return;
    const timer = setTimeout(async () => {
      try {
        await audio.play();
        setAudioStarted(true);
        setAudioBlocked(false);
      } catch {
        setAudioBlocked(true); // browser blocked autoplay → show overlay
      }
    }, 800);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageMode, ftPhase, ftSections.length]);

  // ─────────────────────────────────────────────────────────────────────────────
  // LOADING
  // ─────────────────────────────────────────────────────────────────────────────

  if (loadingDB) return (
    <div className="space-y-4 animate-pulse">
      <div className="h-40 rounded-2xl" style={{ background:"#0f172a" }} />
      <div className="grid grid-cols-2 gap-4">
        {[...Array(4)].map((_,i) => <div key={i} className="h-48 rounded-2xl" style={{ background:"#0f172a" }} />)}
      </div>
    </div>
  );

  const hasAllSections = SECTIONS.every(s => (available[s.type]?.length ?? 0) > 0);

  // ─────────────────────────────────────────────────────────────────────────────
  // FULL TEST — ACTIVE
  // ─────────────────────────────────────────────────────────────────────────────

  if (pageMode === "fulltest" && ftPhase === "active" && ftSections.length > 0) {
    const currentSec     = ftSections[ftActiveTab];
    const audioUrl       = ftSections[0].mat.content.audio_url;
    const totalAnswered  = Object.values(ftAnswers).filter(v => v.trim()).length;
    const totalQuestions = ftSections.reduce((s, sec) => s + getQuestions(sec.mat).length, 0);
    const currentQs      = getQuestions(currentSec.mat);
    const qStart         = currentQs[0]?.number ?? 1;
    const qEnd           = currentQs[currentQs.length - 1]?.number ?? 10;

    // ── OneIELTS-style full-screen exam interface ──────────────────────────────
    return (
      <div className="fixed inset-0 z-50 flex flex-col bg-white" style={{ fontFamily: "var(--font-inter, sans-serif)" }}>

        {/* Hidden audio — no controls, no seeking */}
        <audio ref={audioRef} src={audioUrl} preload="auto"
          onTimeUpdate={() => {
            const a = audioRef.current;
            if (!a) return;
            setCurTime(a.currentTime);
            if (a.duration) setAudioProgress((a.currentTime / a.duration) * 100);
          }}
          onLoadedMetadata={() => setDur(audioRef.current?.duration ?? 0)}
          onPlay={() => { setPlaying(true); setAudioStarted(true); }}
          onPause={() => setPlaying(false)}
          onEnded={() => { setPlaying(false); }}
          muted={muted}
        />

        {/* Autoplay-blocked overlay */}
        {audioBlocked && (
          <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.75)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:999 }}>
            <div style={{ background:"#ffffff", borderRadius:"12px", padding:"32px 40px", textAlign:"center", maxWidth:"400px" }}>
              <p style={{ fontSize:"16px", fontWeight:700, marginBottom:"8px", color:"#0f172a" }}>Ready to start?</p>
              <p style={{ fontSize:"13px", color:"#64748b", marginBottom:"20px", lineHeight:"1.5" }}>
                The audio will play once and cannot be paused or rewound. Make sure your volume is turned up.
              </p>
              <button
                onClick={async () => { await audioRef.current?.play(); setAudioBlocked(false); setAudioStarted(true); }}
                style={{ background:"#2563eb", color:"#fff", border:"none", borderRadius:"6px", padding:"12px 28px", fontSize:"14px", fontWeight:600, cursor:"pointer" }}>
                Begin Listening Test →
              </button>
            </div>
          </div>
        )}

        {/* ── TOP BAR ── */}
        <div className="flex-shrink-0 h-14 flex items-center justify-between px-4 bg-white border-b border-gray-200 shadow-sm z-10">
          {/* Left: logo + test info */}
          <div className="flex items-center gap-3 min-w-0">
            {/* Exit */}
            <button
              onClick={() => {
                if (audioRef.current) audioRef.current.pause();
                setPlaying(false);
                if (ftTimerRef.current) clearInterval(ftTimerRef.current);
                setFtRunning(false); setFtSections([]);
              }}
              className="text-gray-400 hover:text-gray-600 transition-colors mr-1">
              <ChevronLeft className="w-5 h-5" />
            </button>
            {/* Brand dot */}
            <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center shrink-0">
              <Headphones className="w-4 h-4 text-white" />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-gray-800 text-sm leading-none">Listening Test</p>
              <p className="text-xs text-gray-400 mt-0.5 leading-none">Full Mock · 40 Questions</p>
            </div>
          </div>

          {/* Centre: timer + audio status */}
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-1.5 text-sm font-medium ${ftTimeLeft < 300 ? "text-red-500" : "text-gray-600"}`}>
              <Clock className="w-4 h-4" />
              <span className="font-mono tabular-nums">{fmtTime(ftTimeLeft)} remaining</span>
            </div>
            {/* Audio status — NO manual play button */}
            <div className="flex items-center gap-2">
              {playing ? (
                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                  <Volume2 className="w-4 h-4 text-blue-500 animate-pulse" />
                  <span className="text-xs font-medium text-gray-600">Audio playing</span>
                </div>
              ) : audioStarted ? (
                <span className="text-xs text-gray-400">Audio complete</span>
              ) : (
                <span className="text-xs text-gray-400 italic">Loading audio…</span>
              )}
              {/* Volume only */}
              <button onClick={() => setMuted(m => !m)} className="text-gray-400 hover:text-gray-600 ml-1">
                {muted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Right: submit */}
          <button
            onClick={() => setShowSubmitModal(true)}
            className="bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-5 py-2 rounded transition-colors shrink-0">
            Submit
          </button>
        </div>

        {/* ── READ-ONLY audio progress bar ── */}
        <div className="flex-shrink-0 px-4 py-2 bg-white border-b border-gray-100 flex items-center gap-3">
          <span className="text-xs font-mono text-gray-400 tabular-nums shrink-0">{fmtTime(curTime)}</span>
          <div style={{ flex:1, height:"4px", background:"#e5e7eb", borderRadius:"2px", overflow:"hidden" }}>
            <div style={{ height:"100%", background: playing ? "#2563eb" : "#94a3b8", width:`${audioProgress}%`, borderRadius:"2px", transition:"width 0.5s linear" }} />
          </div>
          <span className="text-xs font-mono text-gray-400 tabular-nums shrink-0">{dur ? fmtTime(dur) : "--:--"}</span>
          <span className="text-[10px] text-gray-400 italic hidden sm:inline">🎧 plays once</span>
        </div>

        {/* ── CONTENT (Fix 3, 4, 5, 6) ── */}
        <div className="flex-1 overflow-y-auto" style={{ background: "#f9fafb" }}>
          <div style={{ maxWidth: "760px", margin: "0 auto", padding: "32px 24px 80px" }}>

            {/* Fix 3 — Cambridge part header above the box */}
            <div style={{ marginBottom: "24px", fontFamily: "'Times New Roman', Georgia, serif" }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "4px" }}>
                <span style={{ fontWeight: 700, fontSize: "15px", letterSpacing: "3px", color: "#111827" }}>
                  PART {currentSec.meta.num}
                </span>
                <span style={{ fontStyle: "italic", fontWeight: 700, fontSize: "14px", color: "#111827" }}>
                  Questions {qStart}–{qEnd}
                </span>
              </div>
              <p style={{ fontStyle: "italic", fontSize: "14px", color: "#374151", marginBottom: "2px" }}>
                Questions {qStart}–{qEnd}
              </p>
              {(() => {
                const firstGroup = currentSec.mat.content.question_groups?.[0];
                const instr = firstGroup?.instruction ?? "";
                const isNotes = instr.toLowerCase().includes("complete") || instr.toLowerCase().includes("note") || instr.toLowerCase().includes("form");
                return (
                  <>
                    <p style={{ fontStyle: "italic", fontSize: "14px", color: "#374151", marginBottom: "2px" }}>
                      {isNotes ? "Complete the notes below." : instr ? instr.split(".")[0] + "." : "Answer the questions below."}
                    </p>
                    <p style={{ fontSize: "14px", color: "#374151", marginBottom: "0" }}>
                      Write{" "}
                      <strong style={{ fontStyle: "normal" }}>NO MORE THAN TWO WORDS AND/OR A NUMBER</strong>
                      {" "}for each answer.
                    </p>
                  </>
                );
              })()}
            </div>

            {/* Fix 4 — Bordered Cambridge box */}
            <OneIELTSQuestionsBlock
              mat={currentSec.mat}
              answers={ftAnswers}
              onChange={(num, val) => setFtAnswers(a => ({ ...a, [num]: val }))}
              flagged={ftFlagged}
              onFlag={toggleFlag}
              questionRefs={questionRefs}
            />
          </div>
        </div>

        {/* ── BOTTOM NAVIGATOR (OneIELTS style) ── */}
        <div className="flex-shrink-0 h-14 flex items-center border-t border-gray-200 bg-white px-3 gap-3 overflow-x-auto">
          {ftSections.map(({ meta, mat }, i) => {
            const qs       = getQuestions(mat);
            const answered = qs.filter(q => !!(ftAnswers[q.number] ?? "").trim()).length;
            const isActive = ftActiveTab === i;
            return (
              <div key={i} className="flex items-center gap-1.5 flex-shrink-0">
                {/* Part label */}
                <button
                  onClick={() => setFtActiveTab(i)}
                  className={`text-xs font-bold whitespace-nowrap ${isActive ? "text-gray-800" : "text-gray-400 hover:text-gray-600"}`}>
                  Part {meta.num}
                </button>

                {isActive ? (
                  /* Active part: show individual numbered squares */
                  <div className="flex gap-1">
                    {qs.map(q => {
                      const isAns  = !!(ftAnswers[q.number] ?? "").trim();
                      const isFlagged = ftFlagged.has(q.number);
                      return (
                        <button key={q.number}
                          onClick={() => scrollToQuestion(q.number)}
                          className="w-6 h-6 text-[10px] font-bold rounded flex items-center justify-center transition-all hover:scale-110"
                          style={{
                            background: isFlagged ? "#fef3c7" : isAns ? "#2563eb" : "#f3f4f6",
                            color:      isFlagged ? "#d97706"  : isAns ? "white"   : "#6b7280",
                            border:     isFlagged ? "1px solid #fbbf24" : isAns ? "none" : "1px solid #e5e7eb",
                          }}>
                          {q.number}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  /* Inactive parts: show "X of 10" */
                  <span className="text-xs text-gray-400">{answered} of {qs.length}</span>
                )}

                {/* Divider */}
                {i < ftSections.length - 1 && (
                  <div className="w-px h-5 bg-gray-200 ml-1.5" />
                )}
              </div>
            );
          })}

          {/* Navigation arrows */}
          <div className="flex gap-1 ml-auto flex-shrink-0">
            <button
              onClick={() => ftActiveTab > 0 && setFtActiveTab(t => t - 1)}
              disabled={ftActiveTab === 0}
              className="w-9 h-9 rounded bg-gray-100 hover:bg-gray-200 flex items-center justify-center disabled:opacity-30 transition-colors">
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={() => ftActiveTab < ftSections.length - 1 ? setFtActiveTab(t => t + 1) : setShowSubmitModal(true)}
              className="w-9 h-9 rounded bg-gray-800 hover:bg-gray-900 flex items-center justify-center transition-colors">
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* ── SUBMIT MODAL ── */}
        {showSubmitModal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm space-y-5">
              <div>
                <p className="font-bold text-gray-900 text-lg mb-1">Submit your answers?</p>
                <p className="text-gray-500 text-sm">
                  {totalAnswered < totalQuestions
                    ? `${totalQuestions - totalAnswered} question${totalQuestions - totalAnswered > 1 ? "s" : ""} unanswered.`
                    : "All 40 questions answered ✓"}
                  {ftFlagged.size > 0 && ` ${ftFlagged.size} flagged for review.`}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => setShowSubmitModal(false)}
                  className="py-2.5 rounded-xl text-sm font-semibold border border-gray-200 hover:bg-gray-50 transition-colors text-gray-700">
                  Keep reviewing
                </button>
                <button onClick={() => { setShowSubmitModal(false); submitFullTest(); }}
                  className="py-2.5 rounded-xl text-sm font-bold text-white bg-red-600 hover:bg-red-700 transition-colors">
                  Submit test
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // FULL TEST — RESULTS
  // ─────────────────────────────────────────────────────────────────────────────

  if (pageMode === "fulltest" && ftPhase === "results" && ftResult) {
    const { overallBand, totalCorrect, totalQuestions, sections: secResults } = ftResult;
    const pct  = Math.round((totalCorrect / totalQuestions) * 100);
    const bc   = bandColor(overallBand);

    return (
      <div className="space-y-6 pb-8">

        {/* ── Overall score ── */}
        <div className="rounded-2xl overflow-hidden"
          style={{ background:"linear-gradient(135deg,#071826,#060f1a)", border:"1px solid #0c2a45" }}>
          <div className="px-6 pt-6 pb-5 flex flex-col sm:flex-row items-center gap-6">
            {/* Ring */}
            <div className="relative w-32 h-32 shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#1e293b" strokeWidth="10"/>
                <circle cx="50" cy="50" r="42" fill="none" strokeWidth="10"
                  stroke={bc} strokeLinecap="round"
                  strokeDasharray={`${2*Math.PI*42}`}
                  strokeDashoffset={`${2*Math.PI*42*(1 - pct/100)}`}
                  style={{ transition:"stroke-dashoffset 1s ease" }} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-white">{totalCorrect}</span>
                <span className="text-[10px] font-semibold" style={{ color:"#475569" }}>/{totalQuestions}</span>
              </div>
            </div>

            <div className="flex-1 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-2"
                style={{ background:"rgba(56,189,248,0.1)", color:"#38bdf8", border:"1px solid rgba(56,189,248,0.2)" }}>
                <Trophy className="w-3.5 h-3.5" /> Full Test Complete
              </div>
              <p className="text-4xl font-black text-white">Band {overallBand}</p>
              <p className="text-sm mt-1" style={{ color: bc }}>
                {overallBand >= 8 ? "Excellent — near native level"
                  : overallBand >= 7 ? "Good — above average"
                  : overallBand >= 6 ? "Competent — some errors"
                  : overallBand >= 5 ? "Modest — notable difficulties"
                  : "Below threshold — keep practising"}
              </p>
            </div>
          </div>

          {/* Section breakdown bar */}
          <div className="grid grid-cols-4 border-t"
            style={{ borderColor:"#0c2a45" }}>
            {secResults.map((r, i) => (
              <div key={i} className="flex flex-col items-center py-4 px-2 text-center"
                style={{ borderRight: i < 3 ? "1px solid #0c2a45" : "none" }}>
                <span className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: r.color }}>{r.label}</span>
                <span className="text-2xl font-black text-white">{r.band}</span>
                <span className="text-[11px] tabular-nums mt-0.5" style={{ color:"#475569" }}>{r.correct}/{r.total}</span>
              </div>
            ))}
          </div>
        </div>

        <ShareScoreCard band={overallBand} mode="Listening" detail="Full Mock Test" />

        {/* ── Per-section answer review ── */}
        {secResults.map((r, si) => (
          <div key={si} className="space-y-2">
            <div className="flex items-center gap-2 px-1">
              <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: r.color }}>
                {r.label}
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                style={{ background:`${r.color}15`, color: r.color, border:`1px solid ${r.color}30` }}>
                Band {r.band} · {r.correct}/{r.total}
              </span>
            </div>
            {r.details.map(({ q, given, ok }) => (
              <div key={q.number} className="rounded-xl px-4 py-3 flex items-start gap-3"
                style={{ background: ok ? "#062d1e" : "#2d0f0f", border:`1px solid ${ok ? "rgba(52,211,153,0.2)" : "rgba(248,113,113,0.2)"}` }}>
                <span className="w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-black shrink-0 mt-0.5"
                  style={{ background: ok ? "rgba(52,211,153,0.2)" : "rgba(248,113,113,0.2)", color: ok ? "#34d399" : "#f87171" }}>
                  {q.number}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium mb-1" style={{ color:"#94a3b8" }}>{q.text}</p>
                  <div className="flex flex-wrap gap-2">
                    {given ? (
                      <span className="text-[11px] px-2 py-0.5 rounded font-semibold"
                        style={{ background: ok ? "rgba(52,211,153,0.15)" : "rgba(248,113,113,0.15)", color: ok ? "#34d399" : "#f87171" }}>
                        You: {given}
                      </span>
                    ) : (
                      <span className="text-[11px]" style={{ color:"#475569" }}>No answer</span>
                    )}
                    {!ok && (
                      <span className="text-[11px] px-2 py-0.5 rounded font-semibold"
                        style={{ background:"rgba(52,211,153,0.15)", color:"#34d399" }}>
                        ✓ {q.answer}
                      </span>
                    )}
                  </div>
                </div>
                {ok
                  ? <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color:"#34d399" }}/>
                  : <XCircle     className="w-4 h-4 shrink-0 mt-0.5" style={{ color:"#f87171" }}/>}
              </div>
            ))}
          </div>
        ))}

        {/* ── Actions ── */}
        <div className="flex gap-3">
          <button onClick={() => { setFtSections([]); setFtPhase("active"); }}
            className="flex-1 py-3.5 rounded-xl text-sm font-bold"
            style={{ background:"#0f172a", border:"1px solid #1e293b", color:"#94a3b8" }}>
            ← Back
          </button>
          <button onClick={startFullTest}
            className="flex-1 py-3.5 rounded-xl text-sm font-black text-white"
            style={{ background:"linear-gradient(135deg,#0369a1,#0ea5e9)", boxShadow:"0 4px 14px rgba(14,165,233,0.3)" }}>
            <RotateCcw className="w-4 h-4 inline mr-1.5" /> Try Again
          </button>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // PRACTICE — LISTENING (single section)
  // ─────────────────────────────────────────────────────────────────────────────

  if (pageMode === "practice" && practicePhase === "listening" && material && section) {
    const questions = getQuestions(material);
    const answered  = Object.values(answers).filter(v => v.trim()).length;

    return (
      <div className="space-y-5 pb-8">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <button onClick={() => { setPracticePhase("selector"); if (ptTimerRef.current) clearInterval(ptTimerRef.current); if (audioRef.current) audioRef.current.pause(); }}
            className="flex items-center gap-1.5 text-sm font-medium transition-colors"
            style={{ color:"#475569" }}
            onMouseEnter={e=>(e.currentTarget.style.color="#94a3b8")}
            onMouseLeave={e=>(e.currentTarget.style.color="#475569")}>
            <ChevronLeft className="w-4 h-4" /> Sections
          </button>
          {examMode === "exam" && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
              style={{ background: ptTimeLeft < 120 ? "#2d0f0f" : "#0f172a", border:`1px solid ${ptTimeLeft < 120 ? "rgba(248,113,113,0.4)" : "#1e293b"}` }}>
              <Clock className="w-3.5 h-3.5" style={{ color: ptTimeLeft < 120 ? "#f87171" : "#475569" }} />
              <span className="font-mono font-bold text-sm" style={{ color: ptTimeLeft < 120 ? "#f87171" : "#94a3b8" }}>
                {fmtTime(ptTimeLeft)}
              </span>
            </div>
          )}
        </div>

        {/* Section info */}
        <div className="rounded-2xl p-5" style={{ background: section.bg, border:`1px solid ${section.border}` }}>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
              style={{ background:`${section.color}22`, color:section.color, border:`1px solid ${section.color}35` }}>
              {section.label} · {section.qRange}
            </span>
            <span className="text-[10px] font-medium" style={{ color:"#334155" }}>{section.context}</span>
          </div>
          <p className="text-lg font-black text-white">{material.title}</p>
          {material.content.context && (
            <p className="text-sm mt-0.5" style={{ color:"#475569" }}>{material.content.context}</p>
          )}
        </div>

        {/* Audio player */}
        <div className="rounded-2xl p-6 space-y-4" style={{ background:"#0a1520", border:"1px solid #0c2a45" }}>
          <audio ref={audioRef}
            src={material.content.audio_url}
            onTimeUpdate={() => setCurTime(audioRef.current?.currentTime ?? 0)}
            onLoadedMetadata={() => setDur(audioRef.current?.duration ?? 0)}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
            muted={muted}
          />
          <div className="flex items-center gap-4">
            <button onClick={togglePlay}
              className="w-12 h-12 rounded-full flex items-center justify-center text-white shrink-0 transition-all"
              style={{ background: playing ? "#075985" : "linear-gradient(135deg,#0369a1,#0ea5e9)", boxShadow:"0 4px 14px rgba(14,165,233,0.35)" }}>
              {playing ? <Pause className="w-5 h-5"/> : <Play className="w-5 h-5 ml-0.5"/>}
            </button>
            <div className="flex-1 space-y-1.5">
              <div className="relative h-2.5 rounded-full overflow-hidden" style={{ background:"#1e293b" }}>
                <div className="absolute inset-y-0 left-0 rounded-full"
                  style={{ width:`${dur > 0 ? (curTime/dur)*100 : 0}%`, background:"linear-gradient(90deg,#0369a1,#38bdf8)", transition:"width 0.3s linear" }} />
                {examMode === "practice" && dur > 0 && (
                  <input type="range" min={0} max={dur} step={0.5} value={curTime}
                    onChange={e => {
                      const v = parseFloat(e.target.value);
                      if (audioRef.current) audioRef.current.currentTime = v;
                      setCurTime(v);
                    }}
                    className="absolute inset-0 w-full opacity-0 cursor-pointer h-full" />
                )}
              </div>
              <div className="flex justify-between text-[11px] font-mono" style={{ color:"#334155" }}>
                <span>{fmtTime(curTime)}</span>
                <span>{dur ? fmtTime(dur) : "--:--"}</span>
              </div>
            </div>
            <button onClick={() => setMuted(m => !m)} className="p-2 rounded-lg transition-colors"
              style={{ color: muted ? "#475569" : "#38bdf8" }}>
              {muted ? <VolumeX className="w-4 h-4"/> : <Volume2 className="w-4 h-4"/>}
            </button>
          </div>
          {examMode === "exam" && !audioStarted && (
            <p className="text-xs text-center py-2 rounded-lg"
              style={{ color:"#64748b", background:"rgba(56,189,248,0.04)", border:"1px solid rgba(56,189,248,0.1)" }}>
              ⚠️ Exam mode — audio plays once. Read the questions below, then press play.
            </p>
          )}
          {examMode === "exam" && audioStarted && !playing && dur > 0 && curTime >= dur - 0.5 && (
            <p className="text-xs text-center py-2 rounded-lg"
              style={{ color:"#f87171", background:"rgba(248,113,113,0.06)", border:"1px solid rgba(248,113,113,0.15)" }}>
              Audio finished. Complete your answers and submit below.
            </p>
          )}
        </div>

        {/* Questions */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <p className="text-[10px] font-black uppercase tracking-widest" style={{ color:"#334155" }}>
              Questions {questions[0]?.number}–{questions[questions.length-1]?.number}
            </p>
            <span className="text-[10px] font-semibold"
              style={{ color: answered === questions.length ? "#34d399" : "#475569" }}>
              {answered}/{questions.length} answered
            </span>
          </div>
          <QuestionsBlock
            mat={material}
            answers={answers}
            sectionColor={section.color}
            onChange={(num, val) => setAnswers(a => ({ ...a, [num]: val }))}
          />
        </div>

        <button onClick={handlePracticeSubmit}
          className="w-full py-4 rounded-2xl text-sm font-black text-white transition-all duration-150"
          style={{ background:"linear-gradient(135deg,#0369a1,#0ea5e9)", boxShadow:"0 4px 20px rgba(14,165,233,0.35)" }}
          onMouseEnter={e=>(e.currentTarget as HTMLElement).style.transform="translateY(-1px)"}
          onMouseLeave={e=>(e.currentTarget as HTMLElement).style.transform="translateY(0)"}>
          Submit Answers
        </button>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // PRACTICE — RESULTS (single section)
  // ─────────────────────────────────────────────────────────────────────────────

  if (pageMode === "practice" && practicePhase === "results" && results && section) {
    const band = scoreToBand(results.correct, results.total);
    const pct  = Math.round((results.correct / results.total) * 100);
    const bc   = bandColor(band);

    return (
      <div className="space-y-6 pb-8">
        <div className="rounded-2xl overflow-hidden" style={{ background: section.bg, border:`1px solid ${section.border}` }}>
          <div className="px-6 pt-6 pb-4 flex flex-col sm:flex-row items-center gap-6">
            <div className="relative w-28 h-28 shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#1e293b" strokeWidth="10"/>
                <circle cx="50" cy="50" r="42" fill="none" strokeWidth="10"
                  stroke={bc} strokeLinecap="round"
                  strokeDasharray={`${2*Math.PI*42}`}
                  strokeDashoffset={`${2*Math.PI*42*(1-pct/100)}`}
                  style={{ transition:"stroke-dashoffset 0.8s ease" }} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-white">{results.correct}</span>
                <span className="text-[10px] font-semibold" style={{ color:"#475569" }}>/ {results.total}</span>
              </div>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <p className="text-sm font-semibold mb-1" style={{ color:"#64748b" }}>{section.label} — {section.context}</p>
              <p className="text-3xl font-black text-white mb-0.5">Band {band}</p>
              <p className="text-sm" style={{ color: bc }}>
                {band >= 8 ? "Excellent" : band >= 7 ? "Good — above average" : band >= 6 ? "Competent" : band >= 5 ? "Modest" : "Below threshold"}
              </p>
              <div className="flex items-center gap-3 mt-3">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background:`${bc}18`, color:bc, border:`1px solid ${bc}35` }}>
                  <CheckCircle2 className="w-3 h-3 inline mr-1" />{results.correct} correct
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background:"rgba(248,113,113,0.12)", color:"#f87171", border:"1px solid rgba(248,113,113,0.2)" }}>
                  <XCircle className="w-3 h-3 inline mr-1" />{results.total - results.correct} wrong
                </span>
              </div>
            </div>
          </div>

          {material?.content.transcript && (
            <div className="px-6 pb-5">
              <button onClick={() => setShowTranscript(s => !s)}
                className="flex items-center gap-2 text-xs font-bold transition-colors"
                style={{ color: showTranscript ? "#38bdf8" : "#475569" }}>
                <AlignLeft className="w-3.5 h-3.5" />
                {showTranscript ? "Hide transcript" : "Show transcript"}
              </button>
              {showTranscript && (
                <div className="mt-3 p-4 rounded-xl text-sm leading-relaxed whitespace-pre-wrap"
                  style={{ background:"#0f172a", color:"#94a3b8", border:"1px solid #1e293b" }}>
                  {material.content.transcript}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-widest px-1" style={{ color:"#334155" }}>Question Review</p>
          {results.details.map(({ q, given, ok }) => (
            <div key={q.number} className="rounded-xl px-4 py-3 flex items-start gap-3"
              style={{ background: ok ? "#062d1e" : "#2d0f0f", border:`1px solid ${ok ? "rgba(52,211,153,0.2)" : "rgba(248,113,113,0.2)"}` }}>
              <span className="w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-black shrink-0 mt-0.5"
                style={{ background: ok ? "rgba(52,211,153,0.2)" : "rgba(248,113,113,0.2)", color: ok ? "#34d399" : "#f87171" }}>
                {q.number}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium mb-0.5" style={{ color:"#94a3b8" }}>{q.text}</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {given && (
                    <span className="text-[11px] px-2 py-0.5 rounded font-semibold"
                      style={{ background: ok ? "rgba(52,211,153,0.15)" : "rgba(248,113,113,0.15)", color: ok ? "#34d399" : "#f87171" }}>
                      You: {given}
                    </span>
                  )}
                  {!ok && (
                    <span className="text-[11px] px-2 py-0.5 rounded font-semibold"
                      style={{ background:"rgba(52,211,153,0.15)", color:"#34d399" }}>
                      ✓ {q.answer}
                    </span>
                  )}
                  {!given && <span className="text-[11px]" style={{ color:"#475569" }}>No answer</span>}
                </div>
              </div>
              {ok ? <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color:"#34d399" }}/>
                  : <XCircle    className="w-4 h-4 shrink-0 mt-0.5" style={{ color:"#f87171" }}/>}
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <button onClick={() => setPracticePhase("selector")}
            className="flex-1 py-3.5 rounded-xl text-sm font-bold transition-all"
            style={{ background:"#0f172a", border:"1px solid #1e293b", color:"#94a3b8" }}>
            ← Back to sections
          </button>
          <button onClick={() => startSection(section)}
            className="flex-1 py-3.5 rounded-xl text-sm font-black text-white transition-all"
            style={{ background:"linear-gradient(135deg,#0369a1,#0ea5e9)", boxShadow:"0 4px 14px rgba(14,165,233,0.3)" }}>
            <RotateCcw className="w-4 h-4 inline mr-1.5" /> Try again
          </button>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // SELECTOR — Cambridge / British Council institutional style
  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh", padding: "28px 32px 48px" }}>
      <div style={{ maxWidth: "860px" }}>

        {/* ── Section 1: Header card ── */}
        <div style={{
          background: "#ffffff", borderRadius: "8px",
          border: "1px solid #e2e8f0", borderLeft: "4px solid #2563eb",
          padding: "24px 28px", marginBottom: "16px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
            <div>
              <p style={{ fontSize: "11px", fontWeight: 600, color: "#2563eb", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" }}>
                IELTS Academic
              </p>
              <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#0f172a", marginBottom: "6px" }}>
                Listening
              </h1>
              <p style={{ fontSize: "13.5px", color: "#475569", lineHeight: "1.5" }}>
                4 parts · 40 questions · 30 minutes · Parts play continuously
              </p>
            </div>

            {/* Practice / Exam Mode toggle */}
            <div style={{ flexShrink: 0 }}>
              <div style={{ display: "flex", background: "#f1f5f9", borderRadius: "6px", padding: "3px" }}>
                {(["practice", "exam"] as ExamMode[]).map(m => (
                  <button key={m} onClick={() => setExamMode(m)} style={{
                    padding: "6px 16px", borderRadius: "5px",
                    background: examMode === m ? "#ffffff" : "transparent",
                    color: examMode === m ? "#0f172a" : "#64748b",
                    fontSize: "13px", fontWeight: 500, border: "none", cursor: "pointer",
                    boxShadow: examMode === m ? "0 1px 2px rgba(0,0,0,0.08)" : "none",
                    transition: "all 0.15s",
                  }}>
                    {m === "practice" ? "Practice" : "Exam Mode"}
                  </button>
                ))}
              </div>
              <p style={{ fontSize: "11px", color: "#94a3b8", marginTop: "6px", textAlign: "right" }}>
                {examMode === "exam" ? "Audio plays once · no rewind · timed" : "Full controls · replay anytime"}
              </p>
            </div>
          </div>
        </div>

        {/* ── Section 2: Mode selector ── */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "16px", flexWrap: "wrap" }}>
          <button onClick={() => setPageMode("practice")} style={{
            padding: "10px 20px", borderRadius: "6px", cursor: "pointer",
            border: pageMode === "practice" ? "2px solid #2563eb" : "1px solid #e2e8f0",
            background: pageMode === "practice" ? "#eff6ff" : "#ffffff",
            color: pageMode === "practice" ? "#2563eb" : "#64748b",
            fontSize: "13.5px", fontWeight: 600,
            display: "flex", alignItems: "center", gap: "8px", transition: "all 0.15s",
          }}>
            ▷ Practice
            <span style={{ fontSize: "11px", fontWeight: 400, color: "#94a3b8" }}>
              Choose parts · replay anytime
            </span>
          </button>
          <button onClick={() => setPageMode("fulltest")} style={{
            padding: "10px 20px", borderRadius: "6px", cursor: "pointer",
            border: pageMode === "fulltest" ? "2px solid #2563eb" : "1px solid #e2e8f0",
            background: pageMode === "fulltest" ? "#eff6ff" : "#ffffff",
            color: pageMode === "fulltest" ? "#2563eb" : "#64748b",
            fontSize: "13.5px", fontWeight: 600,
            display: "flex", alignItems: "center", gap: "8px", transition: "all 0.15s",
          }}>
            📋 Full Mock Test
            <span style={{ fontSize: "11px", fontWeight: 400, color: "#94a3b8" }}>
              ~40 min · timed
            </span>
          </button>
        </div>

        {/* ── Section 3: Info notice ── */}
        <div style={{
          background: "#eff6ff", border: "1px solid #bfdbfe",
          borderRadius: "6px", padding: "12px 16px", marginBottom: "24px",
          display: "flex", alignItems: "flex-start", gap: "10px",
        }}>
          <span style={{ color: "#2563eb", fontSize: "15px", flexShrink: 0, lineHeight: "1.5" }}>ℹ</span>
          <p style={{ fontSize: "13px", color: "#1e40af", lineHeight: "1.6", margin: 0 }}>
            In the real exam each recording plays <strong>once only</strong>.
            Read all questions <strong>before</strong> the audio starts.
            Use <strong>Full Mock Test</strong> to simulate real exam conditions with all 4 parts as one continuous session.
          </p>
        </div>

        {/* ── Section 4: Part cards (Practice) ── */}
        {pageMode === "practice" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginBottom: "24px" }}
            className="sm:grid-cols-4 grid-cols-2">
            {SECTIONS.map(sec => {
              const count      = available[sec.type]?.length ?? 0;
              const hasContent = count > 0;
              return (
                <button
                  key={sec.num}
                  onClick={() => hasContent && startSection(sec)}
                  disabled={!hasContent}
                  style={{
                    background: "#ffffff", borderRadius: "8px", textAlign: "left",
                    border: "1px solid #e2e8f0", padding: "18px 16px",
                    cursor: hasContent ? "pointer" : "not-allowed",
                    opacity: hasContent ? 1 : 0.5, transition: "all 0.15s",
                  }}
                  onMouseEnter={e => {
                    if (hasContent) {
                      (e.currentTarget as HTMLElement).style.borderColor = "#2563eb";
                      (e.currentTarget as HTMLElement).style.background = "#f8fafc";
                    }
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#e2e8f0";
                    (e.currentTarget as HTMLElement).style.background = "#ffffff";
                  }}
                >
                  {/* Part label */}
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#2563eb", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" }}>
                    {sec.label}
                  </div>
                  {/* Description */}
                  <div style={{ fontSize: "12.5px", color: "#475569", lineHeight: "1.4", marginBottom: "12px", minHeight: "36px" }}>
                    {sec.description}
                  </div>
                  {/* Q range badge + content count */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "4px" }}>
                    <span style={{ display: "inline-block", background: "#f1f5f9", color: "#475569", fontSize: "11px", fontWeight: 600, padding: "2px 8px", borderRadius: "4px" }}>
                      {sec.qRange}
                    </span>
                    {hasContent && (
                      <span style={{ fontSize: "11px", color: "#94a3b8" }}>
                        {count} set{count > 1 ? "s" : ""}
                      </span>
                    )}
                  </div>
                  {/* Start CTA */}
                  {hasContent && (
                    <div style={{ marginTop: "12px", fontSize: "12px", fontWeight: 600, color: "#2563eb" }}>
                      Start {examMode === "exam" ? "exam" : "practice"} →
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* ── Section 5: Full Mock Test CTA ── */}
        {pageMode === "fulltest" && (
          <div>
            {/* Parts overview row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginBottom: "16px" }}>
              {SECTIONS.map(sec => {
                const hasContent = (available[sec.type]?.length ?? 0) > 0;
                return (
                  <div key={sec.num} style={{
                    background: "#ffffff", border: "1px solid #e2e8f0",
                    borderRadius: "8px", padding: "16px 14px", textAlign: "center",
                  }}>
                    <div style={{ fontSize: "11px", fontWeight: 700, color: "#2563eb", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" }}>
                      {sec.label}
                    </div>
                    <div style={{ fontSize: "12px", color: "#475569", lineHeight: "1.4", marginBottom: "10px", minHeight: "32px" }}>
                      {sec.context}
                    </div>
                    <span style={{
                      display: "inline-block", fontSize: "11px", fontWeight: 600,
                      padding: "2px 8px", borderRadius: "4px",
                      background: hasContent ? "#f1f5f9" : "#fef2f2",
                      color: hasContent ? "#475569" : "#dc2626",
                    }}>
                      {hasContent ? sec.qRange : "No content"}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* CTA card */}
            <div style={{
              background: "#ffffff", border: "1px solid #e2e8f0",
              borderRadius: "8px", padding: "32px 28px", textAlign: "center",
              boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
            }}>
              <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>
                Full IELTS Listening Mock Test
              </h2>
              <p style={{ fontSize: "13.5px", color: "#64748b", marginBottom: "20px", lineHeight: "1.5" }}>
                All 4 parts in one continuous session · Navigate freely between parts · Single audio playback
              </p>

              {/* Stats row */}
              <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginBottom: "24px", flexWrap: "wrap" }}>
                {[
                  { icon: "🎧", text: "40 questions" },
                  { icon: "⏱", text: examMode === "exam" ? "40 min timer" : "No timer" },
                  { icon: "📊", text: "Instant band score" },
                ].map((s, i) => (
                  <div key={i} style={{ fontSize: "13px", color: "#64748b", display: "flex", alignItems: "center", gap: "5px" }}>
                    <span>{s.icon}</span><span>{s.text}</span>
                  </div>
                ))}
              </div>

              {!hasAllSections ? (
                <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "6px", padding: "12px 16px", display: "inline-block" }}>
                  <p style={{ fontSize: "13px", color: "#dc2626", margin: 0 }}>
                    ⚠️ Some parts have no content yet. Add audio + questions in the Content Manager.
                  </p>
                </div>
              ) : (
                <button
                  onClick={startFullTest}
                  style={{
                    background: "#2563eb", color: "#ffffff", border: "none",
                    borderRadius: "6px", padding: "13px 36px",
                    fontSize: "14px", fontWeight: 600, cursor: "pointer",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#1d4ed8"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#2563eb"}
                >
                  Start Full Mock Test →
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// ── Questions block ───────────────────────────────────────────────────────────

function QuestionsBlock({ mat, answers, sectionColor, onChange, flagged, onFlag, questionRefs }: {
  mat:           LMaterial;
  answers:       Record<number, string>;
  sectionColor:  string;
  onChange:      (num: number, val: string) => void;
  flagged?:      Set<number>;
  onFlag?:       (num: number) => void;
  questionRefs?: React.MutableRefObject<Record<number, HTMLDivElement | null>>;
}) {
  const questions = getQuestions(mat);
  if (mat.content.question_groups?.length) {
    return (
      <div className="space-y-6">
        {mat.content.question_groups.map((group, gi) => (
          <div key={gi} className="space-y-3">
            <div className="rounded-xl px-4 py-3 space-y-1"
              style={{ background:"#071826", border:"1px solid rgba(56,189,248,0.15)" }}>
              <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: sectionColor }}>
                {group.type.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
                {group.questions[0] && ` · Q${group.questions[0].number}–${group.questions[group.questions.length-1].number}`}
              </p>
              <p className="text-xs leading-relaxed" style={{ color:"#94a3b8" }}>{group.instruction}</p>
            </div>
            {group.questions.map(q => (
              <QuestionCard key={q.number} q={q}
                value={answers[q.number] ?? ""}
                onChange={v => onChange(q.number, v)}
                isFlagged={flagged?.has(q.number) ?? false}
                onFlag={onFlag ? () => onFlag(q.number) : undefined}
                questionRef={el => { if (questionRefs) questionRefs.current[q.number] = el; }}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="space-y-3">
      {questions.map(q => (
        <QuestionCard key={q.number} q={q}
          value={answers[q.number] ?? ""}
          onChange={v => onChange(q.number, v)}
          isFlagged={flagged?.has(q.number) ?? false}
          onFlag={onFlag ? () => onFlag(q.number) : undefined}
          questionRef={el => { if (questionRefs) questionRefs.current[q.number] = el; }}
        />
      ))}
    </div>
  );
}

// ── Question card ─────────────────────────────────────────────────────────────

function QuestionCard({ q, value, onChange, isFlagged, onFlag, questionRef }: {
  q:           LQuestion;
  value:       string;
  onChange:    (v: string) => void;
  isFlagged?:  boolean;
  onFlag?:     () => void;
  questionRef?: (el: HTMLDivElement | null) => void;
}) {
  const filled       = value.trim().length > 0;
  const isMcqSingle  = q.type === "mcq" || q.type === "mcq_single";
  const isMcqMulti   = q.type === "mcq_multi";
  const isSentence   = q.type === "sentence";
  const selectedLetters = isMcqMulti ? value.split(",").map(s => s.trim()).filter(Boolean) : [];

  function toggleMulti(letter: string) {
    const cur  = value.split(",").map(s => s.trim()).filter(Boolean);
    const next = cur.includes(letter) ? cur.filter(l => l !== letter) : [...cur, letter];
    onChange(next.sort().join(","));
  }

  return (
    <div ref={questionRef} className="rounded-xl p-4 transition-all duration-150 relative"
      style={{ background: filled ? "#071e36" : "#0a1520", border:`1px solid ${filled ? "rgba(56,189,248,0.25)" : "#1a2c3d"}` }}>
      {onFlag && (
        <button
          onClick={onFlag}
          className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full transition-all"
          style={{
            background: isFlagged ? "rgba(217,119,6,0.25)" : "rgba(255,255,255,0.06)",
            color:      isFlagged ? "#fbbf24"              : "rgba(255,255,255,0.3)",
            border:     `1px solid ${isFlagged ? "rgba(217,119,6,0.4)" : "transparent"}`,
          }}>
          {isFlagged ? "🚩 Flagged" : "Flag"}
        </button>
      )}
      <div className="flex items-start gap-3">
        <span className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-black shrink-0"
          style={{ background: filled ? "rgba(56,189,248,0.2)" : "#0f172a", color: filled ? "#38bdf8" : "#334155", border:`1px solid ${filled ? "rgba(56,189,248,0.3)" : "#1e293b"}` }}>
          {q.number}
        </span>

        <div className="flex-1 min-w-0">
          {isSentence ? (
            <div className="flex items-center flex-wrap gap-1.5 text-sm leading-relaxed" style={{ color:"#94a3b8" }}>
              {q.prefix && <span>{q.prefix}</span>}
              <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder="…"
                className="px-2 py-1 rounded-md text-sm focus:outline-none transition-all min-w-[100px] flex-1"
                style={{ background:"#0f172a", border:`1px solid ${filled ? "rgba(56,189,248,0.3)" : "#1e293b"}`, color:"#e2e8f0", caretColor:"#38bdf8" }}
                onFocus={e => (e.currentTarget.style.borderColor="#38bdf8")}
                onBlur={e  => (e.currentTarget.style.borderColor = filled ? "rgba(56,189,248,0.3)" : "#1e293b")} />
              {q.suffix && <span>{q.suffix}</span>}
            </div>
          ) : (
            <>
              <p className="text-sm mb-2.5 leading-snug" style={{ color:"#94a3b8" }}>{q.text}</p>

              {isMcqSingle && q.options && (
                <div className="space-y-1.5">
                  {q.options.map((opt, i) => {
                    const letter   = ["A","B","C","D","E","F","G"][i];
                    const selected = value === letter;
                    return (
                      <button key={i} type="button" onClick={() => onChange(selected ? "" : letter)}
                        className="w-full text-left flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all"
                        style={{ background: selected ? "rgba(56,189,248,0.12)" : "#0f172a", border:`1px solid ${selected ? "rgba(56,189,248,0.35)" : "#1e293b"}`, color: selected ? "#38bdf8" : "#64748b" }}>
                        <span className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black shrink-0"
                          style={{ background: selected ? "rgba(56,189,248,0.25)" : "#1e293b", color: selected ? "#38bdf8" : "#334155" }}>
                          {letter}
                        </span>
                        {opt}
                      </button>
                    );
                  })}
                </div>
              )}

              {isMcqMulti && q.options && (
                <div className="space-y-1.5">
                  {q.options.map((opt, i) => {
                    const letter   = ["A","B","C","D","E","F","G"][i];
                    const selected = selectedLetters.includes(letter);
                    return (
                      <button key={i} type="button" onClick={() => toggleMulti(letter)}
                        className="w-full text-left flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all"
                        style={{ background: selected ? "rgba(167,139,250,0.12)" : "#0f172a", border:`1px solid ${selected ? "rgba(167,139,250,0.35)" : "#1e293b"}`, color: selected ? "#a78bfa" : "#64748b" }}>
                        <span className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black shrink-0"
                          style={{ background: selected ? "rgba(167,139,250,0.25)" : "#1e293b", color: selected ? "#a78bfa" : "#334155" }}>
                          {letter}
                        </span>
                        {opt}
                      </button>
                    );
                  })}
                </div>
              )}

              {!isMcqSingle && !isMcqMulti && (
                <input type="text" value={value} onChange={e => onChange(e.target.value)}
                  placeholder={q.type === "short" ? "No more than three words…" : "Write your answer…"}
                  className="w-full px-3 py-2.5 rounded-lg text-sm focus:outline-none transition-all"
                  style={{ background:"#0f172a", border:`1px solid ${filled ? "rgba(56,189,248,0.3)" : "#1e293b"}`, color:"#e2e8f0", caretColor:"#38bdf8" }}
                  onFocus={e => (e.currentTarget.style.borderColor="#38bdf8")}
                  onBlur={e  => (e.currentTarget.style.borderColor = filled ? "rgba(56,189,248,0.3)" : "#1e293b")} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Cambridge IELTS paper-style questions block ───────────────────────────────

const PAPER: React.CSSProperties = {
  border:      "1px solid #374151",
  borderRadius:"3px",
  padding:     "28px 36px",
  background:  "#ffffff",
  fontFamily:  "'Times New Roman', Georgia, serif",
  fontSize:    "14px",
  lineHeight:  "2.4",
  color:       "#111827",
};

function OneIELTSQuestionsBlock({ mat, answers, onChange, flagged, onFlag, questionRefs }: {
  mat:           LMaterial;
  answers:       Record<number, string>;
  onChange:      (num: number, val: string) => void;
  flagged?:      Set<number>;
  onFlag?:       (num: number) => void;
  questionRefs?: React.MutableRefObject<Record<number, HTMLDivElement | null>>;
}) {
  const groups = mat.content.question_groups ?? [];
  const flatQs = mat.content.questions ?? [];

  const renderQ = (q: LQuestion) => (
    <CambridgeQuestionLine key={q.number} q={q}
      value={answers[q.number] ?? ""}
      onChange={v => onChange(q.number, v)}
      isFlagged={flagged?.has(q.number) ?? false}
      onFlag={onFlag ? () => onFlag(q.number) : undefined}
      questionRef={el => { if (questionRefs) questionRefs.current[q.number] = el; }} />
  );

  const renderMCQ = (q: LQuestion, isMulti: boolean) => (
    <CambridgeMCQ key={q.number} q={q}
      value={answers[q.number] ?? ""}
      onChange={v => onChange(q.number, v)}
      isMulti={isMulti}
      isFlagged={flagged?.has(q.number) ?? false}
      onFlag={onFlag ? () => onFlag(q.number) : undefined}
      questionRef={el => { if (questionRefs) questionRefs.current[q.number] = el; }} />
  );

  return (
    <div style={PAPER}>
      {/* Fix 4 — section title centered bold inside box */}
      {mat.title && (
        <p style={{ fontWeight: 700, textAlign: "center", fontSize: "15px", marginBottom: "18px", lineHeight: "1.4" }}>
          {mat.title}
        </p>
      )}

      {groups.length === 0
        ? flatQs.map(renderQ)
        : groups.map((group, gi) => {
            const isMcq = group.type === "mcq_single" || group.type === "mcq_multi";
            return (
              <div key={gi} style={{ marginBottom: "20px" }}>
                {/* Fix 4 — subsection heading bold left if group has a label */}
                {(group as LGroup & { title?: string }).title && (
                  <p style={{ fontWeight: 700, fontSize: "14px", marginBottom: "10px", lineHeight: "1.4" }}>
                    {(group as LGroup & { title?: string }).title}
                  </p>
                )}
                {isMcq
                  ? group.questions.map(q => renderMCQ(q, group.type === "mcq_multi"))
                  : group.questions.map(renderQ)}
              </div>
            );
          })
      }
    </div>
  );
}

// Fix 2 + 5 — Cambridge fill-blank line with smart layout detection
function CambridgeQuestionLine({ q, value, onChange, isFlagged, onFlag, questionRef }: {
  q:           LQuestion;
  value:       string;
  onChange:    (v: string) => void;
  isFlagged?:  boolean;
  onFlag?:     () => void;
  questionRef?: (el: HTMLDivElement | null) => void;
}) {
  const isSentence  = q.type === "sentence";
  const colonIdx    = q.text.indexOf(":");
  // Fix 5 — detect "Label: content" two-column pattern
  const isTwoCol    = !isSentence && colonIdx > 0 && colonIdx < 30;
  // Fix 2 — detect inline blank marker
  const hasBlank    = /_{2,}/.test(q.text);

  const flagBtn = onFlag ? (
    <button onClick={onFlag} className="group-hover:opacity-100 transition-opacity"
      style={{ fontSize:"10px", opacity: isFlagged ? 1 : 0, color: isFlagged ? "#d97706" : "#9ca3af",
               background:"none", border:"none", cursor:"pointer", padding:"0 4px 0 0", lineHeight:"1", flexShrink:0 }}>
      🚩
    </button>
  ) : null;

  const inlineRow = (content: React.ReactNode) => (
    <div ref={questionRef} className="group"
      style={{ display:"flex", alignItems:"baseline", flexWrap:"wrap", gap:"0 5px", lineHeight:"2.4" }}>
      {flagBtn}{content}
    </div>
  );

  if (isSentence) {
    return inlineRow(<>
      {q.prefix && <span>{q.prefix}</span>}
      <strong>{q.number}</strong>
      <CambridgeInput value={value} onChange={onChange} />
      {q.suffix && <span>{q.suffix}</span>}
    </>);
  }

  if (isTwoCol) {
    const label   = q.text.slice(0, colonIdx + 1);
    const rest    = q.text.slice(colonIdx + 1).trim();
    const parts   = rest.split(/_{2,}/);
    return (
      <div ref={questionRef} className="group"
        style={{ display:"grid", gridTemplateColumns:"160px 1fr", gap:"0 16px", alignItems:"baseline", lineHeight:"2.4" }}>
        <span style={{ display:"flex", alignItems:"baseline", gap:"4px" }}>{flagBtn}{label}</span>
        <span style={{ display:"flex", alignItems:"baseline", flexWrap:"wrap", gap:"0 5px" }}>
          {parts.length > 1 ? (
            <>{parts[0] && <span>{parts[0]}</span>}<strong>{q.number}</strong><CambridgeInput value={value} onChange={onChange} />{parts[1] && <span>{parts[1]}</span>}</>
          ) : (
            <>{rest && <span>{rest}</span>}<strong>{q.number}</strong><CambridgeInput value={value} onChange={onChange} /></>
          )}
        </span>
      </div>
    );
  }

  if (hasBlank) {
    const parts = q.text.split(/_{2,}/);
    return inlineRow(<>
      {parts[0] && <span>{parts[0]}</span>}
      <strong>{q.number}</strong>
      <CambridgeInput value={value} onChange={onChange} />
      {parts[1] && <span>{parts[1]}</span>}
    </>);
  }

  // Default: full text then number + input at end
  return inlineRow(<>
    <span>{q.text}</span>
    <strong>{q.number}</strong>
    <CambridgeInput value={value} onChange={onChange} />
  </>);
}

// Fix 2 — fixed-width underline input (Cambridge dotted-line replacement)
function CambridgeInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [focused, setFocused] = React.useState(false);
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      spellCheck={false}
      autoComplete="off"
      style={{
        border:       "none",
        borderBottom: focused ? "2px solid #2563eb" : "1.5px solid #374151",
        background:   "transparent",
        width:        "140px",
        flexShrink:   0,
        padding:      "0 4px 1px",
        fontSize:     "14px",
        fontFamily:   "'Times New Roman', Georgia, serif",
        outline:      "none",
        color:        "#111827",
        fontWeight:   value.trim() ? 600 : 400,
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}

// Cambridge MCQ
function CambridgeMCQ({ q, value, onChange, isMulti, isFlagged, onFlag, questionRef }: {
  q:           LQuestion;
  value:       string;
  onChange:    (v: string) => void;
  isMulti:     boolean;
  isFlagged?:  boolean;
  onFlag?:     () => void;
  questionRef?: (el: HTMLDivElement | null) => void;
}) {
  const selected = isMulti ? value.split(",").map(s => s.trim()).filter(Boolean) : [value];

  function toggle(letter: string) {
    if (!isMulti) { onChange(value === letter ? "" : letter); return; }
    const cur  = value.split(",").map(s => s.trim()).filter(Boolean);
    const next = cur.includes(letter) ? cur.filter(l => l !== letter) : [...cur, letter];
    onChange(next.sort().join(","));
  }

  return (
    <div ref={questionRef} style={{ marginBottom: "12px" }}>
      <div style={{ display:"flex", alignItems:"flex-start", gap:"6px" }}>
        {onFlag && (
          <button onClick={onFlag}
            style={{ fontSize:"10px", color: isFlagged ? "#d97706" : "#9ca3af", background:"none", border:"none", cursor:"pointer", paddingTop:"2px", flexShrink:0 }}>
            🚩
          </button>
        )}
        <p style={{ margin:0, lineHeight:"1.6" }}>
          <strong>{q.number}.</strong> {q.text}
        </p>
      </div>
      <div style={{ paddingLeft:"20px", marginTop:"4px" }}>
        {(q.options ?? []).map((opt, oi) => {
          const letter     = ["A","B","C","D","E","F","G"][oi];
          const isSelected = selected.includes(letter);
          return (
            <button key={oi} onClick={() => toggle(letter)}
              style={{
                display:"flex", alignItems:"center", gap:"8px",
                width:"100%", textAlign:"left", padding:"5px 10px", margin:"3px 0",
                borderRadius:"4px",
                border:`1px solid ${isSelected ? "#2563eb" : "#e5e7eb"}`,
                background: isSelected ? "#dbeafe" : "white",
                color:      isSelected ? "#1d4ed8" : "#374151",
                fontFamily:"'Times New Roman', Georgia, serif", fontSize:"14px", cursor:"pointer",
              }}>
              <span style={{
                width:"20px", height:"20px", borderRadius:"50%", flexShrink:0,
                border:`1px solid ${isSelected ? "#2563eb" : "#d1d5db"}`,
                background: isSelected ? "#2563eb" : "white",
                color:      isSelected ? "white" : "#6b7280",
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:"11px", fontWeight:700,
              }}>{letter}</span>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
