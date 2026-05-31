"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Headphones, Play, Pause, Volume2, VolumeX, Clock,
  CheckCircle2, XCircle, Users, Mic2, GraduationCap,
  BookOpen, RotateCcw, ChevronLeft, Trophy, AlertCircle,
  AlignLeft, List,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

// ── Types ─────────────────────────────────────────────────────────────────────

type Phase    = "selector" | "listening" | "results";
type ExamMode = "practice" | "exam";

interface LQuestion {
  number:     number;
  type?:      string;
  text:       string;       // question stem or field label
  prefix?:    string;       // sentence completion: text before blank
  suffix?:    string;       // sentence completion: text after blank
  options?:   string[];     // MCQ: ["A. …", "B. …", "C. …", "D. …"]
  answer:     string;
  acceptable?: string[];
}

interface LGroup {
  type: string;
  instruction: string;
  questions: LQuestion[];
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

// ── Section metadata ──────────────────────────────────────────────────────────

const SECTIONS = [
  {
    type:   "listening_s1",
    num:    1,
    label:  "Section 1",
    icon:   Users,
    color:  "#38bdf8",
    bg:     "#071826",
    border: "#0c3a57",
    context:     "Everyday social situation",
    description: "A conversation between two people — booking, enquiry, social arrangement.",
    qRange:  "Q 1 – 10",
    start:   1,
  },
  {
    type:   "listening_s2",
    num:    2,
    label:  "Section 2",
    icon:   Mic2,
    color:  "#34d399",
    bg:     "#061a10",
    border: "#0a3520",
    context:     "Social monologue",
    description: "One person speaking — tour guide, community announcement, public talk.",
    qRange:  "Q 11 – 20",
    start:   11,
  },
  {
    type:   "listening_s3",
    num:    3,
    label:  "Section 3",
    icon:   GraduationCap,
    color:  "#fbbf24",
    bg:     "#1a1206",
    border: "#3d2a06",
    context:     "Academic discussion",
    description: "Up to four speakers — students and tutor discussing coursework or research.",
    qRange:  "Q 21 – 30",
    start:   21,
  },
  {
    type:   "listening_s4",
    num:    4,
    label:  "Section 4",
    icon:   BookOpen,
    color:  "#c084fc",
    bg:     "#130a20",
    border: "#2d1050",
    context:     "Academic lecture",
    description: "A monologue on an academic or scientific subject — the hardest section.",
    qRange:  "Q 31 – 40",
    start:   31,
  },
] as const;

// ── Band scoring (scaled to 40-question full exam) ────────────────────────────

function scoreToBand(correct: number, outOf: number): number {
  const scaled = Math.round((correct / outOf) * 40);
  if (scaled >= 39) return 9;
  if (scaled >= 37) return 8.5;
  if (scaled >= 35) return 8;
  if (scaled >= 33) return 7.5;
  if (scaled >= 30) return 7;
  if (scaled >= 27) return 6.5;
  if (scaled >= 23) return 6;
  if (scaled >= 20) return 5.5;
  if (scaled >= 16) return 5;
  if (scaled >= 13) return 4.5;
  return 4;
}

function fmtTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

// ── Page ──────────────────────────────────────────────────────────────────────

function getQuestions(mat: LMaterial): LQuestion[] {
  if (mat.content.question_groups?.length) {
    return mat.content.question_groups.flatMap(g => g.questions);
  }
  return mat.content.questions ?? [];
}

export default function ListeningPage() {
  const supabase = createClient();
  const [phase,          setPhase]          = useState<Phase>("selector");
  const [mode,           setMode]           = useState<ExamMode>("practice");
  const [available,      setAvailable]      = useState<Record<string, LMaterial[]>>({});
  const [loadingDB,      setLoadingDB]      = useState(true);
  const [material,       setMaterial]       = useState<LMaterial | null>(null);
  const [section,        setSection]        = useState<typeof SECTIONS[number] | null>(null);
  const [answers,        setAnswers]        = useState<Record<number, string>>({});
  const [results,        setResults]        = useState<{
    correct: number; total: number;
    details: { q: LQuestion; given: string; ok: boolean }[];
  } | null>(null);
  const [showTranscript, setShowTranscript] = useState(false);

  // Audio
  const audioRef  = useRef<HTMLAudioElement>(null);
  const [playing,       setPlaying]       = useState(false);
  const [curTime,       setCurTime]       = useState(0);
  const [dur,           setDur]           = useState(0);
  const [muted,         setMuted]         = useState(false);
  const [audioStarted,  setAudioStarted]  = useState(false);

  // Timer
  const [timeLeft,  setTimeLeft]  = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Fetch available sections ────────────────────────────────────────────────

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
      } catch {
        // silently fall through — sections will show "No content yet"
      }
      setLoadingDB(false);
    })();
  }, []);

  // ── Timer ───────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (phase !== "listening" || mode !== "exam") return;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current!); handleSubmit(); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, mode]);

  // ── Start section ───────────────────────────────────────────────────────────

  function startSection(sec: typeof SECTIONS[number]) {
    const pool = available[sec.type];
    if (!pool?.length) return;
    const m = pool[Math.floor(Math.random() * pool.length)];
    setMaterial(m);
    setSection(sec);
    setAnswers({});
    setResults(null);
    setAudioStarted(false);
    setPlaying(false);
    setCurTime(0);
    setDur(0);
    setShowTranscript(false);
    if (mode === "exam") setTimeLeft(10 * 60); // 10 min per section
    setPhase("listening");
  }

  // ── Submit ──────────────────────────────────────────────────────────────────

  const handleSubmit = useCallback(async () => {
    if (!material) return;
    const questions = getQuestions(material);
    const details = questions.map(q => {
      const given   = (answers[q.number] ?? "").trim().toLowerCase();
      const correct = q.answer.trim().toLowerCase();
      const alts    = (q.acceptable ?? []).map(a => a.trim().toLowerCase());
      const ok      = given === correct || alts.includes(given);
      return { q, given: answers[q.number] ?? "", ok };
    });
    const correct = details.filter(d => d.ok).length;
    setResults({ correct, total: questions.length, details });
    if (timerRef.current) clearInterval(timerRef.current);
    if (audioRef.current) { audioRef.current.pause(); setPlaying(false); }
    setPhase("results");

    // Save to attempts table
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user && section) {
        await supabase.from("attempts").insert({
          user_id: user.id,
          mode: "listening",
          task_type: `section_${section.num}`,
          result: {
            correct,
            total: questions.length,
            band: scoreToBand(correct, questions.length),
            section: section.label,
            details: details.map(d => ({
              number: d.q.number,
              question: d.q.text,
              given: d.given,
              correct: d.q.answer,
              ok: d.ok,
            }))
          }
        });
      }
    } catch { /* silently ignore — don't block results page */ }
  }, [material, answers, supabase, section]);

  // ── Audio controls ──────────────────────────────────────────────────────────

  function togglePlay() {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
    } else {
      a.play();
      if (!audioStarted) setAudioStarted(true);
    }
  }

  function handleSeek(e: React.ChangeEvent<HTMLInputElement>) {
    if (mode === "exam") return;
    const a = audioRef.current;
    if (!a) return;
    const t = parseFloat(e.target.value);
    a.currentTime = t;
    setCurTime(t);
  }

  // ── Loading ─────────────────────────────────────────────────────────────────

  if (loadingDB) return (
    <div className="space-y-4 animate-pulse">
      <div className="h-40 rounded-2xl" style={{ background: "#0f172a" }} />
      <div className="grid grid-cols-2 gap-4">
        {[...Array(4)].map((_,i) => <div key={i} className="h-48 rounded-2xl" style={{ background: "#0f172a" }} />)}
      </div>
    </div>
  );

  // ── Selector ─────────────────────────────────────────────────────────────────

  if (phase === "selector") return (
    <div className="space-y-8 pb-8">

      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl p-7"
        style={{ background:"linear-gradient(135deg,#071826 0%,#060f1a 60%,#040912 100%)", border:"1px solid #0c2a45" }}>
        <div className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 rounded-full"
          style={{ background:"radial-gradient(circle,rgba(56,189,248,0.22) 0%,transparent 70%)" }} />
        <div className="pointer-events-none absolute -bottom-10 left-8 w-40 h-40 rounded-full"
          style={{ background:"radial-gradient(circle,rgba(56,189,248,0.06) 0%,transparent 70%)" }} />

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
              4 sections · 40 questions · 30 minutes · audio plays once in exam mode
            </p>
          </div>

          {/* Mode toggle */}
          <div className="shrink-0 space-y-2">
            <p className="text-[10px] font-black uppercase tracking-[0.18em]" style={{ color:"#475569" }}>Mode</p>
            <div className="flex gap-2">
              {(["practice","exam"] as ExamMode[]).map(m => (
                <button key={m} onClick={() => setMode(m)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-150"
                  style={{
                    background: mode===m ? (m==="exam"?"rgba(248,113,113,0.15)":"rgba(56,189,248,0.15)") : "#0f172a",
                    border: `1px solid ${mode===m ? (m==="exam"?"rgba(248,113,113,0.4)":"rgba(56,189,248,0.4)") : "#1e293b"}`,
                    color: mode===m ? (m==="exam"?"#f87171":"#38bdf8") : "#475569",
                  }}>
                  {m === "practice" ? "🎧 Practice" : "⏱ Exam"}
                </button>
              ))}
            </div>
            <p className="text-[10px]" style={{ color:"#334155" }}>
              {mode==="exam" ? "Audio plays once · no rewind · 10 min timer" : "Full controls · replay anytime · no timer"}
            </p>
          </div>
        </div>
      </div>

      {/* Teacher tip */}
      <div className="rounded-xl px-4 py-3 flex items-start gap-3"
        style={{ background:"rgba(56,189,248,0.06)", border:"1px solid rgba(56,189,248,0.15)" }}>
        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color:"#38bdf8" }} />
        <p className="text-xs leading-relaxed" style={{ color:"#94a3b8" }}>
          <span style={{ fontWeight:700, color:"#f1f5f9" }}>IELTS Examiner tip:</span> In the real exam, you hear each recording <span style={{ fontWeight:600, color:"#f1f5f9" }}>only once</span>.
          Read the questions carefully <span style={{ fontWeight:600, color:"#f1f5f9" }}>before</span> the audio starts. Write your answers as you listen — you&apos;ll have 10 minutes
          at the end to transfer them to the answer sheet. Use <span style={{ fontWeight:600, color:"#38bdf8" }}>Exam mode</span> above to simulate real conditions.
        </p>
      </div>

      {/* Section cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SECTIONS.map(sec => {
          const Icon  = sec.icon;
          const count = available[sec.type]?.length ?? 0;
          const hasContent = count > 0;
          return (
            <button key={sec.num} onClick={() => hasContent && startSection(sec)}
              disabled={!hasContent}
              className="text-left p-6 rounded-2xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background:sec.bg, border:`1px solid ${hasContent ? sec.border : "#1a2332"}` }}
              onMouseEnter={e => { if (hasContent) (e.currentTarget as HTMLElement).style.borderColor = sec.color+"60"; }}
              onMouseLeave={e => { if (hasContent) (e.currentTarget as HTMLElement).style.borderColor = sec.border; }}>

              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl" style={{ background:sec.color+"18", border:`1px solid ${sec.color}30` }}>
                    <Icon className="w-5 h-5" style={{ color:sec.color }} />
                  </div>
                  <div>
                    <p className="font-black text-white text-sm">{sec.label}</p>
                    <p className="text-[10px] font-bold mt-0.5" style={{ color:sec.color }}>{sec.qRange}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                  style={hasContent
                    ? { background:sec.color+"18", color:sec.color, border:`1px solid ${sec.color}30` }
                    : { background:"#0f172a", color:"#334155", border:"1px solid #1e293b" }}>
                  {hasContent ? `${count} set${count>1?"s":""}` : "No content yet"}
                </span>
              </div>

              <p className="text-sm font-bold mb-1 text-white">{sec.context}</p>
              <p className="text-xs leading-relaxed" style={{ color:"#475569" }}>{sec.description}</p>

              {hasContent && (
                <div className="mt-4 flex items-center gap-1.5 text-xs font-bold" style={{ color:sec.color }}>
                  <Play className="w-3.5 h-3.5" /> Start {mode === "exam" ? "exam" : "practice"}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* All sections empty */}
      {Object.keys(available).length === 0 && (
        <div className="text-center py-16 rounded-2xl space-y-3"
          style={{ background:"#0a1520", border:"1px dashed #1e293b" }}>
          <Headphones className="w-10 h-10 mx-auto" style={{ color:"#1e3a5f" }} />
          <p className="font-bold text-white">No listening content yet</p>
          <p className="text-sm" style={{ color:"#475569" }}>
            Admins can add audio + questions in Content Manager → Listening.
          </p>
        </div>
      )}
    </div>
  );

  // ── Listening phase ──────────────────────────────────────────────────────────

  if (phase === "listening" && material && section) {
    const questions = getQuestions(material);
    const progress  = dur > 0 ? (curTime / dur) * 100 : 0;
    const answered  = Object.values(answers).filter(v => v.trim()).length;

    return (
      <div className="space-y-5 pb-8">

        {/* Top bar */}
        <div className="flex items-center justify-between">
          <button onClick={() => { setPhase("selector"); if(timerRef.current) clearInterval(timerRef.current); if(audioRef.current) audioRef.current.pause(); }}
            className="flex items-center gap-1.5 text-sm font-medium transition-colors"
            style={{ color:"#475569" }}
            onMouseEnter={e=>(e.currentTarget.style.color="#94a3b8")}
            onMouseLeave={e=>(e.currentTarget.style.color="#475569")}>
            <ChevronLeft className="w-4 h-4" /> Sections
          </button>

          {mode === "exam" && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
              style={{ background:timeLeft<120?"#2d0f0f":"#0f172a", border:`1px solid ${timeLeft<120?"rgba(248,113,113,0.4)":"#1e293b"}` }}>
              <Clock className="w-3.5 h-3.5" style={{ color:timeLeft<120?"#f87171":"#475569" }} />
              <span className="font-mono font-bold text-sm" style={{ color:timeLeft<120?"#f87171":"#94a3b8" }}>
                {fmtTime(timeLeft)}
              </span>
            </div>
          )}
        </div>

        {/* Section info */}
        <div className="rounded-2xl p-5" style={{ background:section.bg, border:`1px solid ${section.border}` }}>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
              style={{ background:section.color+"22", color:section.color, border:`1px solid ${section.color}35` }}>
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
            onTimeUpdate={()=>setCurTime(audioRef.current?.currentTime??0)}
            onLoadedMetadata={()=>setDur(audioRef.current?.duration??0)}
            onPlay={()=>setPlaying(true)}
            onPause={()=>setPlaying(false)}
            onEnded={()=>setPlaying(false)}
            muted={muted}
          />

          {/* Controls row */}
          <div className="flex items-center gap-4">
            <button onClick={togglePlay}
              className="w-12 h-12 rounded-full flex items-center justify-center text-white shrink-0 transition-all duration-150"
              style={{ background:playing?"#075985":"linear-gradient(135deg,#0369a1,#0ea5e9)", boxShadow:"0 4px 14px rgba(14,165,233,0.35)" }}>
              {playing ? <Pause className="w-5 h-5"/> : <Play className="w-5 h-5 ml-0.5"/>}
            </button>

            <div className="flex-1 space-y-1.5">
              <div className="relative h-2.5 rounded-full overflow-hidden cursor-pointer" style={{ background:"#1e293b" }}>
                <div className="absolute inset-y-0 left-0 rounded-full"
                  style={{ width:`${progress}%`, background:"linear-gradient(90deg,#0369a1,#38bdf8)", transition:"width 0.3s linear" }} />
                {mode === "practice" && dur > 0 && (
                  <input type="range" min={0} max={dur} step={0.5} value={curTime}
                    onChange={handleSeek}
                    className="absolute inset-0 w-full opacity-0 cursor-pointer h-full" />
                )}
              </div>
              <div className="flex justify-between text-[11px] font-mono" style={{ color:"#334155" }}>
                <span>{fmtTime(curTime)}</span>
                <span>{dur ? fmtTime(dur) : "--:--"}</span>
              </div>
            </div>

            <button onClick={()=>{ setMuted(m=>!m); }}
              className="p-2 rounded-lg transition-colors"
              style={{ color:muted?"#475569":"#38bdf8" }}>
              {muted ? <VolumeX className="w-4 h-4"/> : <Volume2 className="w-4 h-4"/>}
            </button>
          </div>

          {/* Exam mode hint */}
          {mode === "exam" && !audioStarted && (
            <p className="text-xs text-center py-2 rounded-lg" style={{ color:"#64748b", background:"rgba(56,189,248,0.04)", border:"1px solid rgba(56,189,248,0.1)" }}>
              ⚠️ Exam mode — audio plays once. Read the questions below, then press play.
            </p>
          )}
          {mode === "exam" && audioStarted && !playing && dur > 0 && curTime >= dur - 0.5 && (
            <p className="text-xs text-center py-2 rounded-lg" style={{ color:"#f87171", background:"rgba(248,113,113,0.06)", border:"1px solid rgba(248,113,113,0.15)" }}>
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
            <span className="text-[10px] font-semibold" style={{ color:answered===questions.length?"#34d399":"#475569" }}>
              {answered}/{questions.length} answered
            </span>
          </div>

          {material.content.question_groups?.length ? (
            <div className="space-y-6">
              {material.content.question_groups.map((group, gi) => (
                <div key={gi} className="space-y-3">
                  {/* Group header */}
                  <div className="rounded-xl px-4 py-3 space-y-1" style={{ background: "#071826", border: "1px solid rgba(56,189,248,0.15)" }}>
                    <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: "#38bdf8" }}>
                      {group.type.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())} · Q{group.questions[0]?.number}–{group.questions[group.questions.length-1]?.number}
                    </p>
                    <p className="text-xs leading-relaxed" style={{ color: "#94a3b8" }}>{group.instruction}</p>
                  </div>
                  {/* Questions in group */}
                  {group.questions.map(q => (
                    <QuestionCard key={q.number} q={q}
                      value={answers[q.number] ?? ""}
                      onChange={v => setAnswers(a => ({ ...a, [q.number]: v }))} />
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {questions.map(q => (
                <QuestionCard key={q.number} q={q}
                  value={answers[q.number]??""}
                  onChange={v => setAnswers(a => ({...a,[q.number]:v}))} />
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <button onClick={handleSubmit}
          className="w-full py-4 rounded-2xl text-sm font-black text-white transition-all duration-150"
          style={{ background:"linear-gradient(135deg,#0369a1,#0ea5e9)", boxShadow:"0 4px 20px rgba(14,165,233,0.35)" }}
          onMouseEnter={e=>(e.currentTarget as HTMLElement).style.transform="translateY(-1px)"}
          onMouseLeave={e=>(e.currentTarget as HTMLElement).style.transform="translateY(0)"}>
          Submit Answers
        </button>
      </div>
    );
  }

  // ── Results ──────────────────────────────────────────────────────────────────

  if (phase === "results" && results && section) {
    const band     = scoreToBand(results.correct, results.total);
    const pct      = Math.round((results.correct / results.total) * 100);
    const bandColor = band >= 7 ? "#34d399" : band >= 5.5 ? "#fbbf24" : "#f87171";

    return (
      <div className="space-y-6 pb-8">
        {/* Score card */}
        <div className="rounded-2xl overflow-hidden" style={{ background:section.bg, border:`1px solid ${section.border}` }}>
          <div className="px-6 pt-6 pb-4 flex flex-col sm:flex-row items-center gap-6">
            {/* Ring */}
            <div className="relative w-28 h-28 shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#1e293b" strokeWidth="10"/>
                <circle cx="50" cy="50" r="42" fill="none" strokeWidth="10"
                  stroke={bandColor}
                  strokeLinecap="round"
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
              <p className="text-sm" style={{ color:bandColor }}>
                {band >= 8 ? "Excellent — near native level" : band >= 7 ? "Good — above average" : band >= 6 ? "Competent — some errors" : band >= 5 ? "Modest — notable difficulties" : "Below threshold — needs practice"}
              </p>
              <div className="flex items-center gap-3 mt-3">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background:bandColor+"18", color:bandColor, border:`1px solid ${bandColor}35` }}>
                  <CheckCircle2 className="w-3 h-3 inline mr-1" />{results.correct} correct
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background:"rgba(248,113,113,0.12)", color:"#f87171", border:"1px solid rgba(248,113,113,0.2)" }}>
                  <XCircle className="w-3 h-3 inline mr-1" />{results.total - results.correct} wrong
                </span>
              </div>
            </div>
          </div>

          {/* Transcript toggle */}
          {material?.content.transcript && (
            <div className="px-6 pb-5">
              <button onClick={() => setShowTranscript(s => !s)}
                className="flex items-center gap-2 text-xs font-bold transition-colors"
                style={{ color:showTranscript?"#38bdf8":"#475569" }}>
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

        {/* Q&A review */}
        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-widest px-1" style={{ color:"#334155" }}>Question Review</p>
          {results.details.map(({ q, given, ok }) => (
            <div key={q.number} className="rounded-xl px-4 py-3 flex items-start gap-3"
              style={{ background:ok?"#062d1e":"#2d0f0f", border:`1px solid ${ok?"rgba(52,211,153,0.2)":"rgba(248,113,113,0.2)"}` }}>
              <span className="w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-black shrink-0 mt-0.5"
                style={{ background:ok?"rgba(52,211,153,0.2)":"rgba(248,113,113,0.2)", color:ok?"#34d399":"#f87171" }}>
                {q.number}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium mb-0.5" style={{ color:"#94a3b8" }}>{q.text}</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {given && (
                    <span className="text-[11px] px-2 py-0.5 rounded font-semibold"
                      style={{ background:ok?"rgba(52,211,153,0.15)":"rgba(248,113,113,0.15)", color:ok?"#34d399":"#f87171" }}>
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
              {ok ? <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color:"#34d399" }} />
                  : <XCircle    className="w-4 h-4 shrink-0 mt-0.5" style={{ color:"#f87171" }} />}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button onClick={() => setPhase("selector")}
            className="flex-1 py-3.5 rounded-xl text-sm font-bold transition-all duration-150"
            style={{ background:"#0f172a", border:"1px solid #1e293b", color:"#94a3b8" }}>
            ← Back to sections
          </button>
          <button onClick={() => { if (section) startSection(section); }}
            className="flex-1 py-3.5 rounded-xl text-sm font-black text-white transition-all duration-150"
            style={{ background:"linear-gradient(135deg,#0369a1,#0ea5e9)", boxShadow:"0 4px 14px rgba(14,165,233,0.3)" }}>
            <RotateCcw className="w-4 h-4 inline mr-1.5" /> Try again
          </button>
        </div>
      </div>
    );
  }

  return null;
}

// ── Question card ─────────────────────────────────────────────────────────────

function QuestionCard({ q, value, onChange }: {
  q: LQuestion; value: string; onChange: (v: string) => void;
}) {
  const filled = value.trim().length > 0;
  const isMcqSingle = q.type === "mcq" || q.type === "mcq_single";
  const isMcqMulti  = q.type === "mcq_multi";
  const isSentence  = q.type === "sentence";

  // mcq_multi: comma-separated letters
  const selectedLetters = isMcqMulti ? value.split(",").map(s => s.trim()).filter(Boolean) : [];

  function toggleMulti(letter: string) {
    const cur = value.split(",").map(s => s.trim()).filter(Boolean);
    const next = cur.includes(letter) ? cur.filter(l => l !== letter) : [...cur, letter];
    onChange(next.sort().join(","));
  }

  return (
    <div className="rounded-xl p-4 transition-all duration-150"
      style={{ background: filled ? "#071e36" : "#0a1520", border:`1px solid ${filled?"rgba(56,189,248,0.25)":"#1a2c3d"}` }}>
      <div className="flex items-start gap-3">
        {/* Question number */}
        <span className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-black shrink-0"
          style={{ background:filled?"rgba(56,189,248,0.2)":"#0f172a", color:filled?"#38bdf8":"#334155", border:`1px solid ${filled?"rgba(56,189,248,0.3)":"#1e293b"}` }}>
          {q.number}
        </span>

        <div className="flex-1 min-w-0">
          {/* Sentence completion layout */}
          {isSentence ? (
            <div className="flex items-center flex-wrap gap-1.5 text-sm leading-relaxed" style={{ color:"#94a3b8" }}>
              {q.prefix && <span>{q.prefix}</span>}
              <input
                type="text"
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder="…"
                className="px-2 py-1 rounded-md text-sm focus:outline-none transition-all duration-150 min-w-[100px] flex-1"
                style={{ background:"#0f172a", border:`1px solid ${filled?"rgba(56,189,248,0.3)":"#1e293b"}`, color:"#e2e8f0", caretColor:"#38bdf8" }}
                onFocus={e => (e.currentTarget.style.borderColor = "#38bdf8")}
                onBlur={e  => (e.currentTarget.style.borderColor = filled?"rgba(56,189,248,0.3)":"#1e293b")}
              />
              {q.suffix && <span>{q.suffix}</span>}
            </div>
          ) : (
            <>
              <p className="text-sm mb-2.5 leading-snug" style={{ color:"#94a3b8" }}>{q.text}</p>

              {/* MCQ single */}
              {isMcqSingle && q.options && (
                <div className="space-y-1.5">
                  {q.options.map((opt, i) => {
                    const letter = ["A","B","C","D","E"][i];
                    const selected = value === letter;
                    return (
                      <button key={i} type="button" onClick={() => onChange(selected ? "" : letter)}
                        className="w-full text-left flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all duration-100"
                        style={{
                          background: selected ? "rgba(56,189,248,0.12)" : "#0f172a",
                          border: `1px solid ${selected ? "rgba(56,189,248,0.35)" : "#1e293b"}`,
                          color: selected ? "#38bdf8" : "#64748b",
                        }}>
                        <span className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black shrink-0"
                          style={{ background:selected?"rgba(56,189,248,0.25)":"#1e293b", color:selected?"#38bdf8":"#334155" }}>
                          {letter}
                        </span>
                        {opt}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* MCQ multi — checkboxes */}
              {isMcqMulti && q.options && (
                <div className="space-y-1.5">
                  {q.options.map((opt, i) => {
                    const letter = ["A","B","C","D","E"][i];
                    const selected = selectedLetters.includes(letter);
                    return (
                      <button key={i} type="button" onClick={() => toggleMulti(letter)}
                        className="w-full text-left flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all duration-100"
                        style={{
                          background: selected ? "rgba(167,139,250,0.12)" : "#0f172a",
                          border: `1px solid ${selected ? "rgba(167,139,250,0.35)" : "#1e293b"}`,
                          color: selected ? "#a78bfa" : "#64748b",
                        }}>
                        <span className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black shrink-0"
                          style={{ background:selected?"rgba(167,139,250,0.25)":"#1e293b", color:selected?"#a78bfa":"#334155" }}>
                          {letter}
                        </span>
                        {opt}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Form / Short / Notes / Table answer */}
              {!isMcqSingle && !isMcqMulti && (
                <input
                  type="text"
                  value={value}
                  onChange={e => onChange(e.target.value)}
                  placeholder={q.type === "short" ? "No more than three words…" : "Write your answer…"}
                  className="w-full px-3 py-2.5 rounded-lg text-sm focus:outline-none transition-all duration-150"
                  style={{ background:"#0f172a", border:`1px solid ${filled?"rgba(56,189,248,0.3)":"#1e293b"}`, color:"#e2e8f0", caretColor:"#38bdf8" }}
                  onFocus={e => (e.currentTarget.style.borderColor = "#38bdf8")}
                  onBlur={e  => (e.currentTarget.style.borderColor = filled?"rgba(56,189,248,0.3)":"#1e293b")}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
