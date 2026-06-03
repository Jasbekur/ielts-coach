"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Headphones, Play, Pause, Volume2, VolumeX, Clock,
  CheckCircle2, XCircle, Users, Mic2, GraduationCap,
  BookOpen, RotateCcw, ChevronLeft, Trophy, AlertCircle,
  AlignLeft, Zap, ClipboardList, ChevronRight,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

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
  const [muted,        setMuted]    = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);

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
    setAudioStarted(false); setPlaying(false); setCurTime(0); setDur(0);
    setFtTimeLeft(40 * 60); setFtRunning(true);
    setFtPhase("active");
  }

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
    // Full Mock Test: audio NEVER seekable — simulates real IELTS exam conditions
    const canSeek        = false;

    return (
      <div className="space-y-4 pb-8">

        {/* ── Sticky top bar ── */}
        <div className="sticky top-0 z-20 flex items-center justify-between py-3 -mx-4 px-4"
          style={{ background:"rgba(6,11,18,0.95)", backdropFilter:"blur(12px)", borderBottom:"1px solid #0c2a45" }}>
          <button
            onClick={() => {
              if (audioRef.current) audioRef.current.pause();
              setPlaying(false);
              if (ftTimerRef.current) clearInterval(ftTimerRef.current);
              setFtRunning(false);
              setFtSections([]);
            }}
            className="flex items-center gap-1.5 text-sm font-medium transition-colors"
            style={{ color:"#475569" }}
            onMouseEnter={e=>(e.currentTarget.style.color="#94a3b8")}
            onMouseLeave={e=>(e.currentTarget.style.color="#475569")}>
            <ChevronLeft className="w-4 h-4" /> Exit
          </button>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold tabular-nums"
              style={{ color: totalAnswered === totalQuestions ? "#34d399" : "#475569" }}>
              {totalAnswered} / {totalQuestions} answered
            </span>
            {examMode === "exam" && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
                style={{ background: ftTimeLeft < 300 ? "#2d0f0f" : "#0f172a", border:`1px solid ${ftTimeLeft < 300 ? "rgba(248,113,113,0.4)" : "#1e293b"}` }}>
                <Clock className="w-3.5 h-3.5" style={{ color: ftTimeLeft < 300 ? "#f87171" : "#475569" }} />
                <span className="font-mono font-bold text-sm" style={{ color: ftTimeLeft < 300 ? "#f87171" : "#94a3b8" }}>
                  {fmtTime(ftTimeLeft)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ── Test title ── */}
        <div className="rounded-2xl p-5"
          style={{ background:"linear-gradient(135deg,#071826 0%,#060f1a 60%,#040912 100%)", border:"1px solid #0c2a45" }}>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 rounded-xl" style={{ background:"linear-gradient(135deg,#0369a1,#0ea5e9)", boxShadow:"0 4px 12px rgba(14,165,233,0.4)" }}>
              <Headphones className="w-4 h-4 text-white" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-full"
              style={{ background:"rgba(56,189,248,0.12)", color:"#38bdf8", border:"1px solid rgba(56,189,248,0.25)" }}>
              Full IELTS Listening Test
            </span>
          </div>
          <p className="text-lg font-black text-white">Parts 1–4 · 40 Questions</p>
          <p className="text-xs mt-1" style={{ color:"#475569" }}>
            Audio plays the full test — switch freely between parts and answer as you listen.
          </p>
        </div>

        {/* ── Audio player ── */}
        <div className="rounded-2xl p-5 space-y-3" style={{ background:"#0a1520", border:"1px solid #0c2a45" }}>
          {/* Non-seekable audio — onSeeking snaps back to prevent scrubbing */}
          <audio ref={audioRef}
            src={audioUrl}
            onTimeUpdate={() => setCurTime(audioRef.current?.currentTime ?? 0)}
            onLoadedMetadata={() => setDur(audioRef.current?.duration ?? 0)}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
            onSeeking={() => {
              // Block any seek attempt — snap back to current real position
              if (audioRef.current) {
                audioRef.current.currentTime = curTime;
              }
            }}
            muted={muted}
          />

          <div className="flex items-center gap-4">

            {/* Before audio starts: one-time START button. After: non-clickable LIVE badge */}
            {!audioStarted ? (
              <button
                onClick={() => { audioRef.current?.play(); setAudioStarted(true); }}
                className="w-12 h-12 rounded-full flex items-center justify-center text-white shrink-0 transition-all active:scale-95"
                style={{ background:"linear-gradient(135deg,#0369a1,#0ea5e9)", boxShadow:"0 4px 14px rgba(14,165,233,0.35)" }}>
                <Play className="w-5 h-5 ml-0.5"/>
              </button>
            ) : (
              /* Audio is running — show LIVE dot, no stop/pause button */
              <div className="w-12 h-12 rounded-full flex flex-col items-center justify-center shrink-0"
                style={{ background:"#071826", border:"1px solid rgba(56,189,248,0.25)" }}>
                <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background:"#38bdf8" }} />
                <span className="text-[9px] font-black mt-1" style={{ color:"#38bdf8" }}>LIVE</span>
              </div>
            )}

            <div className="flex-1 space-y-1.5">
              {/* Progress bar — display only, not interactive */}
              <div className="relative h-2.5 rounded-full overflow-hidden" style={{ background:"#1e293b", cursor:"default" }}>
                <div className="absolute inset-y-0 left-0 rounded-full pointer-events-none"
                  style={{ width:`${dur > 0 ? (curTime/dur)*100 : 0}%`, background:"linear-gradient(90deg,#0369a1,#38bdf8)", transition:"width 0.3s linear" }} />
              </div>
              <div className="flex justify-between text-[11px] font-mono" style={{ color:"#334155" }}>
                <span>{fmtTime(curTime)}</span>
                <span>{dur ? fmtTime(dur) : "--:--"}</span>
              </div>
            </div>

            <button onClick={() => setMuted(m => !m)}
              className="p-2 rounded-lg transition-colors"
              style={{ color: muted ? "#475569" : "#38bdf8" }}>
              {muted ? <VolumeX className="w-4 h-4"/> : <Volume2 className="w-4 h-4"/>}
            </button>
          </div>

          {!audioStarted && (
            <p className="text-xs text-center py-2 rounded-lg"
              style={{ color:"#64748b", background:"rgba(56,189,248,0.04)", border:"1px solid rgba(56,189,248,0.1)" }}>
              🎧 Press Play when ready — audio plays once, cannot be paused or rewound.
            </p>
          )}
          {audioStarted && (
            <p className="text-xs text-center py-1.5 rounded-lg"
              style={{ color:"#38bdf8", background:"rgba(56,189,248,0.06)", border:"1px solid rgba(56,189,248,0.15)" }}>
              ● Answer questions as you listen — switch parts freely using the tabs above.
            </p>
          )}
        </div>

        {/* ── Part tabs ── */}
        <div className="grid grid-cols-4 gap-2">
          {ftSections.map(({ meta, mat }, i) => {
            const qs         = getQuestions(mat);
            const answered   = qs.filter(q => (ftAnswers[q.number] ?? "").trim()).length;
            const isActive   = ftActiveTab === i;
            const isComplete = answered === qs.length;
            return (
              <button key={i} onClick={() => setFtActiveTab(i)}
                className="flex flex-col items-center gap-1 px-2 py-3 rounded-xl transition-all duration-150"
                style={{
                  background: isActive ? meta.bg : "#0a1520",
                  border:     `1px solid ${isActive ? meta.color+"70" : "#1a2c3d"}`,
                }}>
                <span className="text-[11px] font-black" style={{ color: isActive || isComplete ? meta.color : "#475569" }}>
                  {meta.label}
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] tabular-nums" style={{ color: isComplete ? meta.color : "#334155" }}>
                    {answered}/{qs.length}
                  </span>
                  {isComplete && <CheckCircle2 className="w-3 h-3" style={{ color: meta.color }} />}
                </div>
                <span className="text-[9px]" style={{ color:"#1e3a5f" }}>{meta.qRange}</span>
              </button>
            );
          })}
        </div>

        {/* ── Current section header ── */}
        <div className="rounded-xl px-4 py-3"
          style={{ background: currentSec.meta.bg, border:`1px solid ${currentSec.meta.border}` }}>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
              style={{ background:`${currentSec.meta.color}22`, color:currentSec.meta.color, border:`1px solid ${currentSec.meta.color}35` }}>
              {currentSec.meta.label} · {currentSec.meta.qRange}
            </span>
            <span className="text-[10px] font-medium" style={{ color:"#334155" }}>{currentSec.meta.context}</span>
          </div>
          <p className="text-sm font-bold text-white mt-1">{currentSec.mat.title}</p>
          {currentSec.mat.content.context && (
            <p className="text-xs mt-0.5" style={{ color:"#475569" }}>{currentSec.mat.content.context}</p>
          )}
        </div>

        {/* ── Questions ── */}
        <QuestionsBlock
          mat={currentSec.mat}
          answers={ftAnswers}
          sectionColor={currentSec.meta.color}
          onChange={(num, val) => setFtAnswers(a => ({ ...a, [num]: val }))}
        />

        {/* ── Navigation + Submit ── */}
        <div className="flex gap-3 pt-2">
          {ftActiveTab > 0 && (
            <button onClick={() => setFtActiveTab(t => t - 1)}
              className="flex items-center gap-1.5 px-5 py-3.5 rounded-xl text-sm font-bold transition-all"
              style={{ background:"#0f172a", border:"1px solid #1e293b", color:"#94a3b8" }}>
              <ChevronLeft className="w-4 h-4" /> {ftSections[ftActiveTab - 1].meta.label}
            </button>
          )}
          {ftActiveTab < ftSections.length - 1 ? (
            <button onClick={() => setFtActiveTab(t => t + 1)}
              className="flex-1 flex items-center justify-center gap-1.5 py-3.5 rounded-xl text-sm font-black text-white transition-all"
              style={{ background:`linear-gradient(135deg,${ftSections[ftActiveTab+1].meta.color}99,${ftSections[ftActiveTab+1].meta.color})` }}>
              {ftSections[ftActiveTab + 1].meta.label} <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button onClick={submitFullTest}
              className="flex-1 py-3.5 rounded-xl text-sm font-black text-white transition-all"
              style={{ background:"linear-gradient(135deg,#059669,#10b981)", boxShadow:"0 4px 20px rgba(5,150,105,0.4)" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform="translateY(-1px)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform="translateY(0)"}>
              <Trophy className="w-4 h-4 inline mr-2" />
              Submit Full Test
            </button>
          )}
        </div>
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
  // SELECTOR (default view for both modes)
  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-8 pb-8">

      {/* ── Hero ── */}
      <div className="relative overflow-hidden rounded-2xl p-7"
        style={{ background:"linear-gradient(135deg,#071826 0%,#060f1a 60%,#040912 100%)", border:"1px solid #0c2a45" }}>
        <div className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 rounded-full"
          style={{ background:"radial-gradient(circle,rgba(56,189,248,0.22) 0%,transparent 70%)" }} />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="p-2.5 rounded-xl" style={{ background:"linear-gradient(135deg,#0369a1,#0ea5e9)", boxShadow:"0 4px 16px rgba(14,165,233,0.5)" }}>
                <Headphones className="w-5 h-5 text-white" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.22em] px-2.5 py-1 rounded-full"
                style={{ background:"rgba(56,189,248,0.15)", color:"#38bdf8", border:"1px solid rgba(56,189,248,0.3)" }}>
                IELTS Listening
              </span>
            </div>
            <h1 className="text-3xl font-black tracking-tight leading-none mb-1.5 text-white">Listening Practice</h1>
            <p className="text-sm" style={{ color:"#64748b" }}>
              4 parts · 40 questions · 30 minutes audio · choose practice or full mock test
            </p>
          </div>

          {/* Exam mode toggle */}
          <div className="shrink-0 space-y-2">
            <p className="text-[10px] font-black uppercase tracking-[0.18em]" style={{ color:"#475569" }}>Mode</p>
            <div className="flex gap-2">
              {(["practice","exam"] as ExamMode[]).map(m => (
                <button key={m} onClick={() => setExamMode(m)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold transition-all"
                  style={{
                    background: examMode === m ? (m==="exam" ? "rgba(248,113,113,0.15)" : "rgba(56,189,248,0.15)") : "#0f172a",
                    border:     `1px solid ${examMode === m ? (m==="exam" ? "rgba(248,113,113,0.4)" : "rgba(56,189,248,0.4)") : "#1e293b"}`,
                    color:      examMode === m ? (m==="exam" ? "#f87171" : "#38bdf8") : "#475569",
                  }}>
                  {m === "practice" ? "🎧 Practice" : "⏱ Exam"}
                </button>
              ))}
            </div>
            <p className="text-[10px]" style={{ color:"#334155" }}>
              {examMode === "exam" ? "Audio plays once · no rewind · timer active" : "Full controls · replay anytime · no timer"}
            </p>
          </div>
        </div>
      </div>

      {/* ── Mode tabs ── */}
      <div className="flex gap-1.5 p-1.5 rounded-2xl w-fit" style={{ background:"#0f172a" }}>
        <button onClick={() => setPageMode("practice")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
          style={pageMode === "practice"
            ? { background:"#071826", color:"#38bdf8", boxShadow:"0 1px 4px rgba(0,0,0,0.4)", border:"1px solid rgba(56,189,248,0.25)" }
            : { color:"#475569" }}>
          <Zap className="w-3.5 h-3.5" /> Practice
        </button>
        <button onClick={() => setPageMode("fulltest")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
          style={pageMode === "fulltest"
            ? { background:"#071826", color:"#38bdf8", boxShadow:"0 1px 4px rgba(0,0,0,0.4)", border:"1px solid rgba(56,189,248,0.25)" }
            : { color:"#475569" }}>
          <ClipboardList className="w-3.5 h-3.5" /> Full Mock Test
          <span className="text-[10px] font-normal hidden sm:inline" style={{ color:"#334155" }}>~40 min</span>
        </button>
      </div>

      {/* ── Tip ── */}
      <div className="rounded-xl px-4 py-3 flex items-start gap-3"
        style={{ background:"rgba(56,189,248,0.06)", border:"1px solid rgba(56,189,248,0.15)" }}>
        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color:"#38bdf8" }} />
        <p className="text-xs leading-relaxed" style={{ color:"#94a3b8" }}>
          <span style={{ fontWeight:700, color:"#f1f5f9" }}>IELTS tip:</span> In the real exam each recording plays <span style={{ fontWeight:600, color:"#f1f5f9" }}>once only</span>.
          Read all questions <span style={{ fontWeight:600, color:"#f1f5f9" }}>before</span> the audio starts.
          Use <span style={{ fontWeight:600, color:"#38bdf8" }}>Full Mock Test</span> to simulate real exam conditions with all 4 parts as one continuous session.
        </p>
      </div>

      {/* ── PRACTICE: individual section cards ── */}
      {pageMode === "practice" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SECTIONS.map(sec => {
            const Icon       = sec.icon;
            const count      = available[sec.type]?.length ?? 0;
            const hasContent = count > 0;
            return (
              <button key={sec.num} onClick={() => hasContent && startSection(sec)}
                disabled={!hasContent}
                className="text-left p-6 rounded-2xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: sec.bg, border:`1px solid ${hasContent ? sec.border : "#1a2332"}` }}
                onMouseEnter={e => { if (hasContent) (e.currentTarget as HTMLElement).style.borderColor = sec.color+"60"; }}
                onMouseLeave={e => { if (hasContent) (e.currentTarget as HTMLElement).style.borderColor = sec.border; }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl" style={{ background:`${sec.color}18`, border:`1px solid ${sec.color}30` }}>
                      <Icon className="w-5 h-5" style={{ color: sec.color }} />
                    </div>
                    <div>
                      <p className="font-black text-white text-sm">{sec.label}</p>
                      <p className="text-[10px] font-bold mt-0.5" style={{ color: sec.color }}>{sec.qRange}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                    style={hasContent
                      ? { background:`${sec.color}18`, color: sec.color, border:`1px solid ${sec.color}30` }
                      : { background:"#0f172a", color:"#334155", border:"1px solid #1e293b" }}>
                    {hasContent ? `${count} set${count > 1 ? "s" : ""}` : "No content"}
                  </span>
                </div>
                <p className="text-sm font-bold mb-1 text-white">{sec.context}</p>
                <p className="text-xs leading-relaxed" style={{ color:"#475569" }}>{sec.description}</p>
                {hasContent && (
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-bold" style={{ color: sec.color }}>
                    <Play className="w-3.5 h-3.5" /> Start {examMode === "exam" ? "exam" : "practice"}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* ── FULL MOCK TEST: launcher ── */}
      {pageMode === "fulltest" && (
        <div className="rounded-2xl overflow-hidden"
          style={{ background:"linear-gradient(135deg,#071826,#060f1a)", border:"1px solid #0c2a45" }}>

          {/* Parts overview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-[#0c2a45]"
            style={{ borderBottom:"1px solid #0c2a45" }}>
            {SECTIONS.map(sec => {
              const Icon       = sec.icon;
              const hasContent = (available[sec.type]?.length ?? 0) > 0;
              return (
                <div key={sec.num} className="flex flex-col items-center gap-2 px-4 py-5"
                  style={{ borderColor:"#0c2a45" }}>
                  <div className="p-2.5 rounded-xl" style={{ background:`${sec.color}18`, border:`1px solid ${sec.color}30` }}>
                    <Icon className="w-4 h-4" style={{ color: sec.color }} />
                  </div>
                  <p className="text-xs font-black text-white">{sec.label}</p>
                  <p className="text-[10px] text-center leading-tight" style={{ color:"#475569" }}>{sec.context}</p>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={hasContent
                      ? { background:`${sec.color}15`, color: sec.color }
                      : { background:"#0f172a", color:"#334155" }}>
                    {hasContent ? sec.qRange : "No content"}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Launch */}
          <div className="px-8 py-8 text-center space-y-4">
            <div>
              <p className="text-xl font-black text-white mb-1">Full IELTS Listening Mock Test</p>
              <p className="text-sm" style={{ color:"#475569" }}>
                All 4 parts in one continuous session · navigate freely between parts · single audio playback
              </p>
            </div>

            <div className="flex justify-center gap-6 text-xs" style={{ color:"#334155" }}>
              <span>🎧 40 questions</span>
              <span>⏱ {examMode === "exam" ? "40 min timer" : "No timer"}</span>
              <span>📋 Instant band score</span>
            </div>

            {!hasAllSections ? (
              <div className="rounded-xl px-4 py-3" style={{ background:"rgba(248,113,113,0.08)", border:"1px solid rgba(248,113,113,0.2)" }}>
                <p className="text-xs font-semibold" style={{ color:"#f87171" }}>
                  ⚠️ Some parts have no content yet. Ask an admin to add audio + questions in the Content Manager.
                </p>
              </div>
            ) : (
              <button onClick={startFullTest}
                className="w-full sm:w-auto px-10 py-4 rounded-2xl text-base font-black text-white transition-all duration-150"
                style={{ background:"linear-gradient(135deg,#0369a1,#0ea5e9)", boxShadow:"0 6px 24px rgba(14,165,233,0.45)" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform="translateY(-2px)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform="translateY(0)"}>
                <Headphones className="w-5 h-5 inline mr-2" />
                Start Full Test
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Questions block ───────────────────────────────────────────────────────────

function QuestionsBlock({ mat, answers, sectionColor, onChange }: {
  mat:          LMaterial;
  answers:      Record<number, string>;
  sectionColor: string;
  onChange:     (num: number, val: string) => void;
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
                onChange={v => onChange(q.number, v)} />
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
          onChange={v => onChange(q.number, v)} />
      ))}
    </div>
  );
}

// ── Question card ─────────────────────────────────────────────────────────────

function QuestionCard({ q, value, onChange }: {
  q:        LQuestion;
  value:    string;
  onChange: (v: string) => void;
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
    <div className="rounded-xl p-4 transition-all duration-150"
      style={{ background: filled ? "#071e36" : "#0a1520", border:`1px solid ${filled ? "rgba(56,189,248,0.25)" : "#1a2c3d"}` }}>
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
