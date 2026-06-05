"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import Link from "next/link";
import {
  LayoutDashboard, ChevronRight, ShieldCheck, Plus, Pencil, Trash2,
  X, Loader2, BookOpen, FileText, ImagePlus, AlertTriangle, Globe,
  FileX2, ChevronDown, Clock, PlusCircle, Trash, Sparkles, BarChart3,
  CheckCircle2, FileEdit, Zap, BookMarked, Mic, AlignLeft, Headphones,
  Users, Mic2, GraduationCap, Music2,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { ProtectedAdminRoute } from "@/components/shared/ProtectedAdminRoute";
import { useUserRole } from "@/hooks/useUserRole";
import { toast } from "sonner";

// ── Types ─────────────────────────────────────────────────────────────────────

type QuestionType =
  | "writing_task1" | "writing_task2"
  | "reading_passage"
  | "speaking_part1" | "speaking_part2" | "speaking_part3"
  | "listening_s1"  | "listening_s2"  | "listening_s3"  | "listening_s4";

type Section       = "writing" | "reading" | "speaking" | "listening";
type Difficulty    = "band_5_6" | "band_6_7" | "band_7_8" | "band_8_9";
type PassageLevel  = "level_1" | "level_2" | "level_3";
type Status        = "published" | "draft";

type LGroupType = "form" | "notes" | "table" | "mcq_single" | "mcq_multi" | "short" | "sentence";

interface LQuestion {
  number:     number;
  text:       string;       // question stem, field label, or sentence fragment
  prefix?:    string;       // sentence_completion: text before blank
  suffix?:    string;       // sentence_completion: text after blank
  options?:   string[];     // mcq: ["A. option text", "B. ...", ...]
  answer:     string;       // correct answer (for mcq_single: "A", mcq_multi: "A,C")
  acceptable?: string[];
}

interface LGroup {
  id:           string;       // uuid for React key
  type:         LGroupType;
  instruction:  string;
  questions:    LQuestion[];
}

const LGROUP_META: Record<LGroupType, { label: string; instruction: string; color: string }> = {
  form:       { label: "Form Completion",     instruction: "Complete the form below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.", color: "#1d4ed8" },
  notes:      { label: "Note Completion",     instruction: "Complete the notes below. Write NO MORE THAN TWO WORDS for each answer.",                color: "#1d4ed8" },
  table:      { label: "Table Completion",    instruction: "Complete the table below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.", color: "#1d4ed8" },
  mcq_single: { label: "Multiple Choice",     instruction: "Choose the correct letter, A, B or C.",                                                   color: "#1d4ed8" },
  mcq_multi:  { label: "MCQ — Choose TWO",   instruction: "Choose TWO correct letters, A–E.",                                                         color: "#1d4ed8" },
  short:      { label: "Short Answer",        instruction: "Answer the questions below. Write NO MORE THAN THREE WORDS AND/OR A NUMBER for each answer.", color: "#1d4ed8" },
  sentence:   { label: "Sentence Completion", instruction: "Complete the sentences below. Write NO MORE THAN TWO WORDS for each answer.",              color: "#1d4ed8" },
};

interface QuestionContent {
  difficulty?:    Difficulty;
  passage_level?: PassageLevel;
  status:         Status;
  image_url?:     string;
  // reading
  passage_text?:  string;
  // speaking part 1 & 3
  questions?:     string[];
  // speaking part 2
  bullets?:       string[];
  follow_up?:     string;
  // listening
  audio_url?:     string;
  context?:       string;
  transcript?:    string;
}

interface Question {
  id:         string;
  title:      string;
  type:       QuestionType;
  content:    QuestionContent;
  created_at: string;
}

interface AdminLog {
  id: string; admin_email: string; action: "added"|"deleted";
  question_id: string|null; question_title: string; created_at: string;
}

// ── Design tokens ─────────────────────────────────────────────────────────────

const S1  = "#f8fafc";
const S2  = "#ffffff";
const S3  = "#f1f5f9";
const BD  = "#e2e8f0";
const BDL = "#cbd5e1";
const T1  = "#0f172a";
const T2  = "#334155";
const T3  = "#64748b";
const AC  = "#1d4ed8";
const ACL = "#ef4444";
const ACG = "linear-gradient(135deg,#1d4ed8,#1e40af)";
const ACG2 = "linear-gradient(135deg,#ef4444,#1d4ed8)";

// ── Config maps ───────────────────────────────────────────────────────────────

const SECTIONS: { value: Section; label: string; icon: React.ElementType; color: string; bg: string }[] = [
  { value: "writing",   label: "Writing",   icon: FileText,   color: "#1d4ed8", bg: "#eff6ff" },
  { value: "reading",   label: "Reading",   icon: BookMarked, color: "#1d4ed8", bg: "#eff6ff" },
  { value: "speaking",  label: "Speaking",  icon: Mic,        color: "#1d4ed8", bg: "#eff6ff" },
  { value: "listening", label: "Listening", icon: Headphones, color: "#1d4ed8", bg: "#eff6ff" },
];

const TYPE_META: Record<QuestionType, { label: string; color: string; bg: string; section: Section }> = {
  writing_task1:   { label: "Task 1 Academic",  color: "#1d4ed8", bg: "#eff6ff", section: "writing"   },
  writing_task2:   { label: "Task 2 Essay",     color: "#1d4ed8", bg: "#eff6ff", section: "writing"   },
  reading_passage: { label: "Reading Passage",  color: "#1d4ed8", bg: "#eff6ff", section: "reading"   },
  speaking_part1:  { label: "Speaking Part 1",  color: "#1d4ed8", bg: "#eff6ff", section: "speaking"  },
  speaking_part2:  { label: "Speaking Part 2",  color: "#1d4ed8", bg: "#eff6ff", section: "speaking"  },
  speaking_part3:  { label: "Speaking Part 3",  color: "#1d4ed8", bg: "#eff6ff", section: "speaking"  },
  listening_s1:    { label: "Listening S1",     color: "#1d4ed8", bg: "#eff6ff", section: "listening" },
  listening_s2:    { label: "Listening S2",     color: "#1d4ed8", bg: "#eff6ff", section: "listening" },
  listening_s3:    { label: "Listening S3",     color: "#1d4ed8", bg: "#eff6ff", section: "listening" },
  listening_s4:    { label: "Listening S4",     color: "#1d4ed8", bg: "#eff6ff", section: "listening" },
};

const WRITING_TYPES:   QuestionType[] = ["writing_task1", "writing_task2"];
const READING_TYPES:   QuestionType[] = ["reading_passage"];
const SPEAKING_TYPES:  QuestionType[] = ["speaking_part1", "speaking_part2", "speaking_part3"];
const LISTENING_TYPES: QuestionType[] = ["listening_s1", "listening_s2", "listening_s3", "listening_s4"];
const ALL_TYPES = [...WRITING_TYPES, ...READING_TYPES, ...SPEAKING_TYPES, ...LISTENING_TYPES];

const LISTENING_SECTION_META = [
  { type: "listening_s1" as QuestionType, label: "Section 1", color: "#1d4ed8", bg: "#eff6ff", desc: "Everyday conversation", start: 1  },
  { type: "listening_s2" as QuestionType, label: "Section 2", color: "#1d4ed8", bg: "#eff6ff", desc: "Social monologue",      start: 11 },
  { type: "listening_s3" as QuestionType, label: "Section 3", color: "#1d4ed8", bg: "#eff6ff", desc: "Academic discussion",   start: 21 },
  { type: "listening_s4" as QuestionType, label: "Section 4", color: "#1d4ed8", bg: "#eff6ff", desc: "Academic lecture",      start: 31 },
];

const DIFFICULTY_OPTIONS = [
  { value: "band_5_6" as Difficulty, label: "Band 5–6", color: "#1d4ed8" },
  { value: "band_6_7" as Difficulty, label: "Band 6–7", color: "#1d4ed8" },
  { value: "band_7_8" as Difficulty, label: "Band 7–8", color: "#1d4ed8" },
  { value: "band_8_9" as Difficulty, label: "Band 8–9", color: "#1d4ed8" },
];

const PASSAGE_LEVEL_OPTIONS: { value: PassageLevel; label: string; desc: string; color: string }[] = [
  { value: "level_1", label: "Passage 1", desc: "Easier · Factual",          color: "#1d4ed8" },
  { value: "level_2", label: "Passage 2", desc: "Medium · Descriptive",      color: "#1d4ed8" },
  { value: "level_3", label: "Passage 3", desc: "Harder · Argumentative",    color: "#1d4ed8" },
];
const DIFFICULTY_LABEL: Record<Difficulty,string> = { band_5_6:"Band 5–6", band_6_7:"Band 6–7", band_7_8:"Band 7–8", band_8_9:"Band 8–9" };
const DIFFICULTY_COLOR: Record<Difficulty,string> = { band_5_6:"#1d4ed8", band_6_7:"#1d4ed8", band_7_8:"#1d4ed8", band_8_9:"#1d4ed8" };
const DIFFICULTY_BG:    Record<Difficulty,string> = { band_5_6:"#eff6ff", band_6_7:"#eff6ff", band_7_8:"#eff6ff", band_8_9:"#eff6ff" };

function typeIcon(type: QuestionType): React.ElementType {
  if (WRITING_TYPES.includes(type))  return type === "writing_task1" ? FileText : BookOpen;
  if (READING_TYPES.includes(type))  return BookMarked;
  return Mic;
}
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { day:"numeric", month:"short", year:"numeric" });
}
function timeAgo(iso: string): string {
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60)    return "just now";
  if (s < 3600)  return `${Math.floor(s/60)}m ago`;
  if (s < 86400) return `${Math.floor(s/3600)}h ago`;
  if (s < 604800) return `${Math.floor(s/86400)}d ago`;
  return formatDate(iso);
}

const STORAGE_BUCKET = "question-images";

// ── Root ──────────────────────────────────────────────────────────────────────

export default function AdminPage() {
  return <ProtectedAdminRoute><AdminContent /></ProtectedAdminRoute>;
}

function AdminContent() {
  const supabase = useMemo(() => createClient(), []);
  const { isAdmin } = useUserRole();

  const [questions,   setQuestions]   = useState<Question[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [logs,        setLogs]        = useState<AdminLog[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(true);
  const [userEmail,   setUserEmail]   = useState("");

  // ── Usage stats ──────────────────────────────────────────────────────────
  const [totalUsers,  setTotalUsers]  = useState<number | null>(null);
  const [testsToday,  setTestsToday]  = useState<number | null>(null);
  const [avgBand,     setAvgBand]     = useState<number | null>(null);

  const [editItem,       setEditItem]       = useState<Question|null>(null);
  const [editTitle,      setEditTitle]      = useState("");
  const [editDifficulty, setEditDifficulty] = useState<Difficulty>("band_6_7");
  const [editStatus,     setEditStatus]     = useState<Status>("draft");
  const [editSubmitting, setEditSubmitting] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<Question|null>(null);
  const [deleting,     setDeleting]     = useState(false);

  // filter
  const [filterSection, setFilterSection] = useState<Section|"all">("all");

  const fetchQuestions = useCallback(async () => {
    setLoadingList(true);
    const { data, error } = await supabase
      .from("test_materials").select("id,title,type,content,created_at")
      .in("type", ALL_TYPES).order("created_at", { ascending: false });
    if (error) toast.error("Failed to load: " + error.message);
    else setQuestions((data as Question[]) ?? []);
    setLoadingList(false);
  }, [supabase]);

  const fetchLogs = useCallback(async () => {
    setLoadingLogs(true);
    const { data, error } = await supabase
      .from("admin_logs").select("id,admin_email,action,question_id,question_title,created_at")
      .order("created_at", { ascending: false }).limit(20);
    if (!error) setLogs((data as AdminLog[]) ?? []);
    setLoadingLogs(false);
  }, [supabase]);

  useEffect(() => {
    fetchQuestions(); fetchLogs();
    supabase.auth.getUser().then(({ data }) => setUserEmail(data.user?.email ?? ""));

    // Fetch usage stats via service-role API (bypasses RLS — accurate counts)
    fetch("/api/admin/stats")
      .then(r => r.json())
      .then(data => {
        if (data.totalUsers  !== undefined) setTotalUsers(data.totalUsers);
        if (data.testsToday  !== undefined) setTestsToday(data.testsToday);
        if (data.avgBand     !== null)      setAvgBand(data.avgBand);
      })
      .catch(() => { /* silent — stats are non-critical */ });
  }, [fetchQuestions, fetchLogs, supabase]);

  const logAction = useCallback(async (action:"added"|"deleted", questionId:string, questionTitle:string) => {
    if (!userEmail) return;
    await supabase.from("admin_logs").insert({ admin_email:userEmail, action, question_id:questionId, question_title:questionTitle });
    fetchLogs();
  }, [supabase, userEmail, fetchLogs]);

  function openEdit(q: Question) {
    setEditItem(q); setEditTitle(q.title);
    setEditDifficulty(q.content?.difficulty ?? "band_6_7");
    setEditStatus(q.content?.status ?? "draft");
  }

  async function handleEditSave(e: React.FormEvent) {
    e.preventDefault();
    if (!editItem || !editTitle.trim()) return toast.error("Title is required.");
    setEditSubmitting(true);
    const { error } = await supabase.from("test_materials")
      .update({ title: editTitle.trim(), content: { ...editItem.content, difficulty: editDifficulty, status: editStatus } })
      .eq("id", editItem.id);
    if (error) toast.error("Failed: " + error.message);
    else { toast.success("Saved!"); setEditItem(null); fetchQuestions(); }
    setEditSubmitting(false);
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    const imgUrl = deleteTarget.content?.image_url;
    if (imgUrl) {
      const path = imgUrl.split(`/${STORAGE_BUCKET}/`)[1];
      if (path) await supabase.storage.from(STORAGE_BUCKET).remove([path]);
    }
    const { error } = await supabase.from("test_materials").delete().eq("id", deleteTarget.id);
    if (error) toast.error("Delete failed: " + error.message);
    else { toast.success("Deleted."); logAction("deleted", deleteTarget.id, deleteTarget.title); setDeleteTarget(null); fetchQuestions(); }
    setDeleting(false);
  }

  const filteredQuestions = filterSection === "all"
    ? questions
    : questions.filter(q => TYPE_META[q.type as QuestionType]?.section === filterSection);

  const bySection = (s: Section) => questions.filter(q => TYPE_META[q.type as QuestionType]?.section === s).length;

  return (
    <div className="space-y-8 pb-16">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs">
        <Link href="/dashboard" className="flex items-center gap-1.5 font-medium transition-colors"
          style={{ color: T3 }}
          onMouseEnter={e => (e.currentTarget.style.color = T2)}
          onMouseLeave={e => (e.currentTarget.style.color = T3)}>
          <LayoutDashboard className="w-3 h-3" /> Dashboard
        </Link>
        <ChevronRight className="w-3 h-3" style={{ color: BD }} />
        <span className="flex items-center gap-1.5 font-semibold" style={{ color: T2 }}>
          <ShieldCheck className="w-3 h-3" style={{ color: ACL }} /> Content Manager
        </span>
      </div>

      {/* ── Usage stats grid ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label:"Total Users",   value: totalUsers  !== null ? totalUsers.toLocaleString()  : "…", icon:<Users className="w-4 h-4"/>,    color:"#1d4ed8", bg:"#eff6ff" },
          { label:"Tests Today",   value: testsToday  !== null ? testsToday.toLocaleString()  : "…", icon:<Zap className="w-4 h-4"/>,      color:"#1d4ed8", bg:"#eff6ff" },
          { label:"Content Items", value: questions.length.toString(),                               icon:<BarChart3 className="w-4 h-4"/>, color:"#1d4ed8", bg:"#eff6ff" },
          { label:"Avg Band",      value: avgBand     !== null ? avgBand.toFixed(1)            : "…", icon:<CheckCircle2 className="w-4 h-4"/>, color:"#1d4ed8", bg:"#eff6ff" },
        ].map(({ label, value, icon, color, bg }) => (
          <div key={label} className="rounded-2xl p-4 flex flex-col gap-2"
            style={{ background: bg, border:`1px solid ${color}25` }}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest" style={{ color }}>{label}</span>
              <span style={{ color }}>{icon}</span>
            </div>
            <span className="text-2xl font-black tabular-nums" style={{ color: T1 }}>{value}</span>
          </div>
        ))}
      </div>

      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl p-7"
        style={{ background:"linear-gradient(135deg,#1e1a38 0%,#1a1830 60%,#161428 100%)", border:`1px solid ${BDL}` }}>
        <div className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 rounded-full"
          style={{ background:"radial-gradient(circle,rgba(124,58,237,0.25) 0%,transparent 70%)" }} />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="p-2.5 rounded-xl" style={{ background:ACG, boxShadow:"0 4px 16px rgba(124,58,237,0.5)" }}>
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.22em] px-2.5 py-1 rounded-full"
                style={{ background:"rgba(124,58,237,0.25)", color:ACL, border:`1px solid rgba(124,58,237,0.4)` }}>
                Admin Console
              </span>
            </div>
            <h1 className="text-3xl font-black tracking-tight leading-none mb-1.5" style={{ color:T1 }}>
              Content Manager
            </h1>
            <p className="text-sm" style={{ color:T2 }}>Manage Writing, Reading &amp; Speaking questions.</p>
          </div>

          {/* Stats */}
          <div className="flex items-stretch gap-3 shrink-0">
            <StatPill icon={<BarChart3 className="w-4 h-4"/>}    label="Total"   value={questions.length} color="#1d4ed8" bg="#eff6ff" />
            <StatPill icon={<FileText className="w-4 h-4"/>}     label="Writing" value={bySection("writing")}  color="#1d4ed8" bg="#eff6ff" />
            <StatPill icon={<BookMarked className="w-4 h-4"/>}   label="Reading" value={bySection("reading")}  color="#1d4ed8" bg="#eff6ff" />
            <StatPill icon={<Mic className="w-4 h-4"/>}          label="Speaking" value={bySection("speaking")} color="#1d4ed8" bg="#eff6ff" />
            <StatPill icon={<Headphones className="w-4 h-4"/>}   label="Listening" value={bySection("listening")} color="#1d4ed8" bg="#eff6ff" />
          </div>
        </div>
      </div>

      {/* ── Section 1: Add ── */}
      <section>
        <SectionHeading number="1" title="Add New Question" subtitle="Writing, Reading or Speaking" />
        <AddQuestionForm onSuccess={fetchQuestions} onLog={logAction} />
      </section>

      {/* ── Section 2: Manage ── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <SectionHeading number="2" title="Manage Questions" subtitle="Edit or remove questions" />
          {!isAdmin && (
            <span className="text-[10px] font-bold px-3 py-1.5 rounded-full"
              style={{ background:"#fef9c3", color:"#d97706", border:"1px solid rgba(217,119,6,0.35)" }}>
              Editor — view &amp; add only
            </span>
          )}
        </div>

        {/* Section filter tabs */}
        <div className="flex items-center gap-2 mb-3">
          {(["all","writing","reading","speaking","listening"] as const).map(s => {
            const active = filterSection === s;
            const sec = s !== "all" ? SECTIONS.find(x => x.value === s) : null;
            const count = s === "all" ? questions.length : bySection(s as Section);
            return (
              <button key={s} onClick={() => setFilterSection(s)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-150"
                style={{
                  background: active ? (sec ? sec.bg : S3) : S2,
                  border:     `1px solid ${active ? (sec ? sec.color+"50" : BDL) : BD}`,
                  color:      active ? (sec ? sec.color : T1) : T3,
                }}>
                {sec && <sec.icon className="w-3 h-3" />}
                {s.charAt(0).toUpperCase() + s.slice(1)}
                <span className="ml-1 text-[10px] opacity-70">({count})</span>
              </button>
            );
          })}
        </div>

        <div className="rounded-2xl overflow-hidden" style={{ background:S1, border:`1px solid ${BD}` }}>
          <div className="grid gap-4 px-5 py-3 text-[10px] font-black uppercase tracking-[0.18em]"
            style={{ gridTemplateColumns:"auto 1fr auto auto auto auto", background:S2, borderBottom:`1px solid ${BD}`, color:T3 }}>
            <span>Type</span><span>Title / Preview</span>
            <span className="text-center">Difficulty</span>
            <span className="text-center">Status</span>
            <span className="text-center">Added</span>
            <span className="text-center">Actions</span>
          </div>

          {loadingList ? <TableSkeleton /> : filteredQuestions.length === 0 ? <EmptyState section={filterSection} /> : (
            <ul>
              {filteredQuestions.map((q, i) => {
                const meta = TYPE_META[q.type as QuestionType];
                const Icon = typeIcon(q.type as QuestionType);
                const diff = q.content?.difficulty;
                const pl   = q.content?.passage_level;
                const plMeta = pl ? PASSAGE_LEVEL_OPTIONS.find(p => p.value === pl) : null;
                const diffLabel = diff ? DIFFICULTY_LABEL[diff] : plMeta ? plMeta.label : "—";
                const diffColor = diff ? DIFFICULTY_COLOR[diff] : plMeta ? plMeta.color : T3;
                const diffBg    = diff ? DIFFICULTY_BG[diff]    : S2;
                const isPublished = q.content?.status === "published";
                const preview = q.title.length > 60 ? q.title.slice(0,60).trimEnd() + "…" : q.title;

                return (
                  <li key={q.id}
                    className="grid gap-4 items-center px-5 py-4 transition-colors"
                    style={{ gridTemplateColumns:"auto 1fr auto auto auto auto", borderBottom: i < filteredQuestions.length-1 ? `1px solid ${BD}` : "none", background:"transparent" }}
                    onMouseEnter={e => (e.currentTarget.style.background = S2)}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>

                    <span className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-bold whitespace-nowrap"
                      style={{ background:meta?.bg ?? S2, color:meta?.color ?? T2, border:`1px solid ${(meta?.color ?? T2)+"40"}` }}>
                      <Icon className="w-3 h-3" />{meta?.label ?? q.type}
                    </span>

                    <div className="flex items-center gap-2.5 min-w-0">
                      {q.content?.image_url && (
                        <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0" style={{ border:`1px solid ${BD}` }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={q.content.image_url} alt="" className="w-full h-full object-cover" />
                        </div>
                      )}
                      <p className="text-sm font-medium leading-snug truncate" style={{ color:T1 }} title={q.title}>{preview}</p>
                    </div>

                    <span className="text-[10px] font-bold px-2.5 py-1.5 rounded-lg whitespace-nowrap text-center"
                      style={{ color:diffColor, background:diffBg, border:`1px solid ${diffColor+"40"}` }}>
                      {diffLabel}
                    </span>

                    <span className="flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1.5 rounded-full whitespace-nowrap"
                      style={{ background:isPublished?"#f0fdf4":S2, color:isPublished?"#16a34a":T3, border:`1px solid ${isPublished?"rgba(22,163,74,0.35)":BD}` }}>
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background:isPublished?"#16a34a":T3 }} />
                      {isPublished ? "Published" : "Draft"}
                    </span>

                    <span className="text-[11px] whitespace-nowrap text-center tabular-nums" style={{ color:T3 }}>
                      {formatDate(q.created_at)}
                    </span>

                    <div className="flex items-center gap-1 justify-center">
                      <ActionBtn label="Edit" color="#1d4ed8" hoverBg="#eff6ff" onClick={() => openEdit(q)}>
                        <Pencil className="w-3.5 h-3.5" />
                      </ActionBtn>
                      {isAdmin && (
                        <ActionBtn label="Delete" color="#f87171" hoverBg="#eff6ff" onClick={() => setDeleteTarget(q)}>
                          <Trash2 className="w-3.5 h-3.5" />
                        </ActionBtn>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>

      {/* ── Section 3: Activity Log ── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <SectionHeading number="3" title="Activity Log" subtitle="Recent content changes" />
          <span className="flex items-center gap-1.5 text-[10px] font-semibold px-3 py-1.5 rounded-full"
            style={{ background:S2, color:T3, border:`1px solid ${BD}` }}>
            <Clock className="w-3 h-3" /> Last 20 events
          </span>
        </div>

        <div className="rounded-2xl overflow-hidden" style={{ background:S1, border:`1px solid ${BD}` }}>
          {loadingLogs ? <LogSkeleton /> : logs.length === 0 ? <LogEmpty /> : (
            <ul>
              {logs.map((log, i) => {
                const isAdded = log.action === "added";
                const accent  = isAdded ? "#16a34a" : "#f87171";
                const logBg   = isAdded ? "#f0fdf4" : "#eff6ff";
                const preview = log.question_title.length > 60
                  ? log.question_title.slice(0,60).trimEnd() + "…" : log.question_title;
                return (
                  <li key={log.id}
                    className="flex items-start gap-4 px-5 py-4 transition-colors"
                    style={{ borderBottom: i < logs.length-1 ? `1px solid ${BD}` : "none", background:"transparent" }}
                    onMouseEnter={e => (e.currentTarget.style.background = S2)}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background:logBg, border:`1px solid ${accent}35` }}>
                      {isAdded ? <PlusCircle className="w-3.5 h-3.5" style={{ color:accent }} />
                               : <Trash      className="w-3.5 h-3.5" style={{ color:accent }} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="text-xs font-bold" style={{ color:accent }}>{isAdded ? "Added" : "Deleted"}</span>
                        <span className="text-sm font-medium truncate" style={{ color:T1 }} title={log.question_title}>{preview}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[11px] font-mono truncate max-w-[180px]" style={{ color:T3 }}>{log.admin_email}</span>
                        <span style={{ color:BD }}>·</span>
                        <span className="text-[11px] tabular-nums" style={{ color:T3 }}>{timeAgo(log.created_at)}</span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>

      {/* Edit Modal */}
      {editItem && (
        <Modal onClose={() => setEditItem(null)}>
          <form onSubmit={handleEditSave} className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl" style={{ background:"#eff6ff", border:"1px solid rgba(220,38,38,0.3)" }}>
                  <Pencil className="w-4 h-4" style={{ color:"#1d4ed8" }} />
                </div>
                <div>
                  <h2 className="text-base font-black" style={{ color:T1 }}>Edit Question</h2>
                  <p className="text-[11px]" style={{ color:T3 }}>Modify title, difficulty and status</p>
                </div>
              </div>
              <CloseBtn onClick={() => setEditItem(null)} />
            </div>

            {(() => { const meta = TYPE_META[editItem.type as QuestionType]; const Icon = typeIcon(editItem.type as QuestionType); return (
              <div className="flex items-center gap-2.5">
                <span className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold"
                  style={{ background:meta?.bg, color:meta?.color, border:`1px solid ${meta?.color+"40"}` }}>
                  <Icon className="w-3.5 h-3.5" />{meta?.label}
                </span>
                <span className="text-xs" style={{ color:T3 }}>type is fixed</span>
              </div>
            ); })()}

            <FieldLabel label="Title / Question Text">
              <StyledTextarea value={editTitle} onChange={e => setEditTitle(e.target.value)} rows={3} />
            </FieldLabel>

            <div className="grid grid-cols-2 gap-4">
              {editItem.content?.difficulty !== undefined && (
                <FieldLabel label="Difficulty">
                  <StyledSelect value={editDifficulty} onChange={v => setEditDifficulty(v as Difficulty)} options={DIFFICULTY_OPTIONS} />
                </FieldLabel>
              )}
              <FieldLabel label="Status">
                <StatusToggle value={editStatus} onChange={setEditStatus} />
              </FieldLabel>
            </div>

            <div className="flex gap-3 pt-1">
              <PrimaryBtn type="submit" loading={editSubmitting} icon={<Pencil className="w-3.5 h-3.5"/>} label="Save Changes" loadingLabel="Saving…" />
              <GhostBtn onClick={() => setEditItem(null)}>Cancel</GhostBtn>
            </div>
          </form>
        </Modal>
      )}

      {/* Delete Modal */}
      {deleteTarget && (
        <Modal onClose={() => setDeleteTarget(null)}>
          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl shrink-0" style={{ background:"#eff6ff", border:"1px solid rgba(248,113,113,0.3)" }}>
                <AlertTriangle className="w-5 h-5" style={{ color:"#f87171" }} />
              </div>
              <div>
                <h2 className="text-base font-black" style={{ color:T1 }}>Delete Question?</h2>
                <p className="mt-1.5 text-sm leading-relaxed" style={{ color:T2 }}>
                  Permanently removes this content{deleteTarget.content?.image_url ? " and its image" : ""}. Cannot be undone.
                </p>
                <p className="mt-3 text-sm font-medium line-clamp-2 leading-snug px-3 py-2.5 rounded-xl"
                  style={{ color:T1, background:S2, border:`1px solid ${BD}` }}>
                  &ldquo;{deleteTarget.title}&rdquo;
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <PrimaryBtn onClick={handleDelete} loading={deleting} icon={<Trash2 className="w-3.5 h-3.5"/>}
                label="Delete permanently" loadingLabel="Deleting…" danger />
              <GhostBtn onClick={() => setDeleteTarget(null)}>Cancel</GhostBtn>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── Add Question Form ─────────────────────────────────────────────────────────

function AddQuestionForm({ onSuccess, onLog }: {
  onSuccess: () => void;
  onLog: (action:"added"|"deleted", id:string, title:string) => void;
}) {
  const supabase = createClient();
  const fileRef  = useRef<HTMLInputElement>(null);

  const [section,      setSection]      = useState<Section>("writing");
  const [qType,        setQType]        = useState<QuestionType>("writing_task1");
  const [title,        setTitle]        = useState("");
  const [difficulty,   setDifficulty]   = useState<Difficulty>("band_6_7");
  const [passageLevel, setPassageLevel] = useState<PassageLevel>("level_1");
  const [status,       setStatus]       = useState<Status>("draft");

  // Listening
  const audioRef2     = useRef<HTMLInputElement>(null);
  const [audioFile,    setAudioFile]    = useState<File | null>(null);
  const [audioName,    setAudioName]    = useState("");
  const [audioPreviewUrl, setAudioPreviewUrl] = useState<string | null>(null);
  const [lContext,     setLContext]     = useState("");
  const [lTranscript,  setLTranscript]  = useState("");
  const [lGroups,      setLGroups]      = useState<LGroup[]>([
    { id: crypto.randomUUID(), type: "form", instruction: LGROUP_META.form.instruction, questions: [{ number: 1, text: "", answer: "", acceptable: [] }] },
  ]);
  const [lUploading,   setLUploading]   = useState(false);
  const [uploading,  setUploading]  = useState(false);
  const [dragOver,   setDragOver]   = useState(false);

  // Writing
  const [imageFile,    setImageFile]    = useState<File|null>(null);
  const [imagePreview, setImagePreview] = useState<string|null>(null);

  // Reading
  const [passageText, setPassageText] = useState("");

  // Speaking Part 1 / 3 — textarea one-per-line
  const [questionsText, setQuestionsText] = useState("");

  // Speaking Part 2
  const [bulletsText, setBulletsText] = useState("");
  const [followUp,    setFollowUp]    = useState("");

  // Listening helpers
  function nextQNum(groups: LGroup[]): number {
    const all = groups.flatMap(g => g.questions.map(q => q.number));
    return all.length > 0 ? Math.max(...all) + 1 : 1;
  }
  function addLGroup() {
    setLGroups(g => [...g, { id: crypto.randomUUID(), type: "form", instruction: LGROUP_META.form.instruction, questions: [{ number: nextQNum(g), text: "", answer: "" }] }]);
  }
  function removeLGroup(gi: number) {
    setLGroups(g => g.filter((_,i) => i !== gi));
  }
  function updateLGroup(gi: number, patch: Partial<LGroup>) {
    setLGroups(g => g.map((grp, i) => i === gi ? { ...grp, ...patch } : grp));
  }
  function addQuestionToGroup(gi: number) {
    setLGroups(g => g.map((grp, i) => {
      if (i !== gi) return grp;
      const allNums = g.flatMap(x => x.questions.map(q => q.number));
      const next = allNums.length > 0 ? Math.max(...allNums) + 1 : 1;
      return { ...grp, questions: [...grp.questions, { number: next, text: "", answer: "" }] };
    }));
  }
  function removeQuestionFromGroup(gi: number, qi: number) {
    setLGroups(g => g.map((grp, i) => i !== gi ? grp : { ...grp, questions: grp.questions.filter((_,j) => j !== qi) }));
  }
  function updateQuestion(gi: number, qi: number, patch: Partial<LQuestion>) {
    setLGroups(g => g.map((grp, i) => i !== gi ? grp : {
      ...grp, questions: grp.questions.map((q, j) => j !== qi ? q : { ...q, ...patch })
    }));
  }

  // Switch section → set default type
  function handleSectionChange(s: Section) {
    setSection(s);
    if (s === "writing")   setQType("writing_task1");
    if (s === "reading")   setQType("reading_passage");
    if (s === "speaking")  setQType("speaking_part1");
    if (s === "listening") {
      setQType("listening_s1");
      // reset groups with section 1 start number
      setLGroups([{ id: crypto.randomUUID(), type: "form", instruction: LGROUP_META.form.instruction, questions: [{ number: 1, text: "", answer: "", acceptable: [] }] }]);
    }
    // clear cross-section state
    setTitle(""); setPassageText(""); setQuestionsText(""); setBulletsText(""); setFollowUp("");
    setLContext(""); setLTranscript(""); setAudioFile(null); setAudioName("");
    if (audioPreviewUrl) { URL.revokeObjectURL(audioPreviewUrl); setAudioPreviewUrl(null); }
  }

  function pickFile(file: File) {
    if (!file.type.startsWith("image/")) return toast.error("Please select an image file.");
    if (file.size > 5 * 1024 * 1024)    return toast.error("Image must be under 5 MB.");
    setImageFile(file); setImagePreview(URL.createObjectURL(file));
  }
  function removeImage() {
    setImageFile(null);
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return toast.error("Title / question text is required.");

    setUploading(true);

    // Build content object per section
    let content: QuestionContent = { status };

    if (section === "writing") {
      content.difficulty = difficulty;
      let imageUrl: string|undefined;
      if (imageFile) {
        const ext = imageFile.name.split(".").pop() ?? "png";
        const filePath = `${crypto.randomUUID()}.${ext}`;
        const { error: uploadErr } = await supabase.storage
          .from(STORAGE_BUCKET).upload(filePath, imageFile, { contentType:imageFile.type, upsert:false });
        if (uploadErr) { setUploading(false); return toast.error("Upload failed: " + uploadErr.message); }
        const { data: urlData } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(filePath);
        imageUrl = urlData.publicUrl;
      }
      if (imageUrl) content.image_url = imageUrl;
    }

    if (section === "reading") {
      if (!passageText.trim()) { setUploading(false); return toast.error("Passage text is required."); }
      content.passage_level = passageLevel;
      content.passage_text  = passageText.trim();
    }

    if (section === "listening") {
      if (!audioFile && !lContext) { setUploading(false); return toast.error("Audio file is required."); }
      if (lGroups.length === 0 || lGroups.every(g => g.questions.length === 0)) { setUploading(false); return toast.error("Add at least one question."); }
      setLUploading(true);

      let audioUrl = "";
      if (audioFile) {
        const ext      = audioFile.name.split(".").pop() ?? "mp3";
        const filePath = `${crypto.randomUUID()}.${ext}`;
        const { error: uploadErr } = await supabase.storage
          .from("listening-audio").upload(filePath, audioFile, { contentType: audioFile.type, upsert: false });
        if (uploadErr) { setUploading(false); setLUploading(false); return toast.error("Audio upload failed: " + uploadErr.message); }
        const { data: urlData } = supabase.storage.from("listening-audio").getPublicUrl(filePath);
        audioUrl = urlData.publicUrl;
      }

      content.audio_url  = audioUrl;
      content.context    = lContext.trim();
      content.transcript = lTranscript.trim() || undefined;
      (content as unknown as Record<string,unknown>)["question_groups"] = lGroups.map(g => ({
        type: g.type,
        instruction: g.instruction,
        questions: g.questions.map(q => ({
          number: q.number, text: q.text.trim(),
          prefix: q.prefix, suffix: q.suffix,
          options: q.options,
          answer: q.answer.trim().toLowerCase(),
          acceptable: (q.acceptable ?? []).filter(Boolean),
        }))
      }));
      setLUploading(false);
    }

    if (section === "speaking") {
      if (qType === "speaking_part2") {
        const bullets = bulletsText.split("\n").map(l => l.trim()).filter(Boolean);
        if (!bullets.length) { setUploading(false); return toast.error("At least one bullet point is required."); }
        if (!followUp.trim()) { setUploading(false); return toast.error("Follow-up prompt is required."); }
        content.bullets  = bullets;
        content.follow_up = followUp.trim();
      } else {
        const questions = questionsText.split("\n").map(l => l.trim()).filter(Boolean);
        if (!questions.length) { setUploading(false); return toast.error("At least one question is required."); }
        content.questions = questions;
      }
    }

    const { data: inserted, error } = await supabase
      .from("test_materials").insert({ title: title.trim(), type: qType, content })
      .select("id").single();

    setUploading(false);
    if (error) return toast.error("Save failed: " + error.message);

    toast.success("Question added!");
    onLog("added", inserted.id, title.trim());
    // reset
    setTitle(""); setPassageText(""); setQuestionsText(""); setBulletsText(""); setFollowUp("");
    setLContext(""); setLTranscript(""); setAudioFile(null); setAudioName("");
    if (audioPreviewUrl) { URL.revokeObjectURL(audioPreviewUrl); setAudioPreviewUrl(null); }
    setLGroups([{ id: crypto.randomUUID(), type: "form", instruction: LGROUP_META.form.instruction, questions: [{ number: 1, text: "", answer: "", acceptable: [] }] }]);
    removeImage(); setDifficulty("band_6_7"); setStatus("draft");
    onSuccess();
  }

  const sectionMeta = SECTIONS.find(s => s.value === section)!;

  return (
    <div className="mt-4 rounded-2xl overflow-hidden" style={{ background:S1, border:`1px solid ${BD}` }}>
      {/* Header */}
      <div className="px-6 py-4 flex items-center gap-3" style={{ background:S2, borderBottom:`1px solid ${BD}` }}>
        <div className="p-2 rounded-xl" style={{ background:ACG, boxShadow:"0 4px 12px rgba(124,58,237,0.4)" }}>
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-sm font-bold" style={{ color:T1 }}>New Question</p>
          <p className="text-[11px]" style={{ color:T3 }}>Choose a section, fill in the details, and click Save</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">

        {/* ── Section tabs ── */}
        <FieldLabel label="Section">
          <div className="grid grid-cols-3 gap-2">
            {SECTIONS.map(({ value, label, icon: Icon, color, bg }) => {
              const active = section === value;
              return (
                <button key={value} type="button" onClick={() => handleSectionChange(value)}
                  className="flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-sm font-bold transition-all duration-150"
                  style={{
                    background: active ? bg    : S2,
                    border:     `1px solid ${active ? color+"55" : BD}`,
                    color:      active ? color : T3,
                    boxShadow:  active ? `0 0 20px ${color}18` : "none",
                  }}>
                  <Icon className="w-4 h-4 shrink-0" />
                  {label}
                </button>
              );
            })}
          </div>
        </FieldLabel>

        {/* ── Sub-type selector (shown for writing & speaking) ── */}
        {(section === "writing" || section === "speaking") && (
          <FieldLabel label={section === "writing" ? "Task Type" : "Speaking Part"}>
            <div className="flex gap-2">
              {(section === "writing" ? WRITING_TYPES : SPEAKING_TYPES).map(t => {
                const meta  = TYPE_META[t];
                const active = qType === t;
                return (
                  <button key={t} type="button" onClick={() => setQType(t)}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 flex-1 justify-center"
                    style={{
                      background: active ? meta.bg : S2,
                      border:     `1px solid ${active ? meta.color+"50" : BD}`,
                      color:      active ? meta.color : T2,
                    }}>
                    {meta.label}
                  </button>
                );
              })}
            </div>
          </FieldLabel>
        )}

        {/* ── Writing fields ── */}
        {section === "writing" && (<>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FieldLabel label="Difficulty Band">
              <StyledSelect value={difficulty} onChange={v => setDifficulty(v as Difficulty)} options={DIFFICULTY_OPTIONS} />
            </FieldLabel>
            <FieldLabel label="Publish Status">
              <StatusToggle value={status} onChange={setStatus} />
            </FieldLabel>
          </div>

          <FieldLabel label="Question Text">
            <StyledTextarea value={title} onChange={e => setTitle(e.target.value)} rows={5}
              placeholder={qType === "writing_task1"
                ? "The chart below shows the percentage of households in different countries who…\n\nSummarise the information by selecting and reporting the main features."
                : "Some people think universities should focus on teaching academic subjects. Others believe they should prepare students for work. Discuss both views and give your own opinion."} />
          </FieldLabel>

          {qType === "writing_task1" && <FieldLabel label={<>Chart / Diagram <span className="font-normal normal-case tracking-normal" style={{ color:T3 }}>— optional · max 5 MB</span></>}>
            {imagePreview ? (
              <div className="relative rounded-xl overflow-hidden" style={{ border:`1px solid ${BD}` }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imagePreview} alt="Preview" className="w-full max-h-52 object-contain" style={{ background:"#0d0c1a" }} />
                <button type="button" onClick={removeImage}
                  className="absolute top-2.5 right-2.5 p-1.5 rounded-lg transition-all"
                  style={{ background:"rgba(0,0,0,0.8)", color:"#f87171", border:"1px solid rgba(248,113,113,0.3)" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#eff6ff")}
                  onMouseLeave={e => (e.currentTarget.style.background = "rgba(0,0,0,0.8)")}>
                  <X className="w-4 h-4" />
                </button>
                <div className="px-4 py-2 flex items-center gap-2" style={{ background:S2, borderTop:`1px solid ${BD}` }}>
                  <FileX2 className="w-3.5 h-3.5 shrink-0" style={{ color:T3 }} />
                  <span className="text-xs truncate" style={{ color:T2 }}>{imageFile?.name}</span>
                </div>
              </div>
            ) : (
              <div onClick={() => fileRef.current?.click()}
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={e => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) pickFile(f); }}
                className="flex flex-col items-center justify-center gap-3 py-10 rounded-xl cursor-pointer transition-all duration-150"
                style={{ border:`1.5px dashed ${dragOver ? ACL : BDL}`, background:dragOver?"rgba(124,58,237,0.1)":S2 }}>
                <div className="p-3.5 rounded-2xl" style={{ background:dragOver?"rgba(124,58,237,0.25)":"rgba(124,58,237,0.15)", border:`1px solid rgba(124,58,237,0.3)` }}>
                  <ImagePlus className="w-5 h-5" style={{ color:ACL }} />
                </div>
                <div className="text-center space-y-1">
                  <p className="text-sm font-semibold" style={{ color:T2 }}>
                    Drop image here or <span style={{ color:ACL }}>click to browse</span>
                  </p>
                  <p className="text-xs" style={{ color:T3 }}>PNG, JPG, WEBP, SVG</p>
                </div>
              </div>
            )}
            <input ref={fileRef} type="file" accept="image/*" className="hidden"
              onChange={e => { const f = e.target.files?.[0]; if (f) pickFile(f); }} />
          </FieldLabel>}
        </>)}

        {/* ── Reading fields ── */}
        {section === "reading" && (<>
          <FieldLabel label="Passage Level">
            <div className="grid grid-cols-3 gap-2">
              {PASSAGE_LEVEL_OPTIONS.map(({ value, label, desc, color }) => {
                const active = passageLevel === value;
                const bg = "#eff6ff";
                return (
                  <button key={value} type="button" onClick={() => setPassageLevel(value)}
                    className="flex flex-col items-center gap-1 px-3 py-3 rounded-xl text-xs font-bold transition-all duration-150"
                    style={{
                      background: active ? bg : S2,
                      border:     `1px solid ${active ? color + "55" : BD}`,
                      color:      active ? color : T3,
                    }}>
                    <span className="font-black">{label}</span>
                    <span className="text-[10px] font-normal opacity-75 text-center leading-tight">{desc}</span>
                  </button>
                );
              })}
            </div>
          </FieldLabel>

          <FieldLabel label="Publish Status">
            <StatusToggle value={status} onChange={setStatus} />
          </FieldLabel>

          <FieldLabel label="Passage Title">
            <StyledInput value={title} onChange={e => setTitle(e.target.value)}
              placeholder="e.g. The History of Urban Planning" />
          </FieldLabel>

          <FieldLabel label="Passage Text">
            <StyledTextarea value={passageText} onChange={e => setPassageText(e.target.value)} rows={10}
              placeholder={"Paste the full reading passage here.\n\nParagraph A\n…\n\nParagraph B\n…"} />
          </FieldLabel>
        </>)}

        {/* ── Speaking fields ── */}
        {section === "speaking" && (<>
          <FieldLabel label="Publish Status">
            <StatusToggle value={status} onChange={setStatus} />
          </FieldLabel>

          {qType === "speaking_part2" ? (<>
            <FieldLabel label="Cue Card Topic (Part 2)">
              <StyledInput value={title} onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Describe a building you find particularly impressive." />
            </FieldLabel>
            <FieldLabel label={<>Bullet Points <span className="font-normal normal-case tracking-normal" style={{ color:T3 }}>— one per line</span></>}>
              <StyledTextarea value={bulletsText} onChange={e => setBulletsText(e.target.value)} rows={4}
                placeholder={"what the building is and where it is\nwhat it looks like\nwhy you visited or saw it"} />
            </FieldLabel>
            <FieldLabel label="Follow-up Prompt">
              <StyledInput value={followUp} onChange={e => setFollowUp(e.target.value)}
                placeholder="e.g. and explain why you find this building impressive." />
            </FieldLabel>
          </>) : (<>
            <FieldLabel label={qType === "speaking_part1" ? "Topic Name" : "Discussion Theme"}>
              <StyledInput value={title} onChange={e => setTitle(e.target.value)}
                placeholder={qType === "speaking_part1" ? "e.g. Hometown & Home" : "e.g. Technology & Society"} />
            </FieldLabel>
            <FieldLabel label={<>Questions <span className="font-normal normal-case tracking-normal" style={{ color:T3 }}>— one per line</span></>}>
              <StyledTextarea value={questionsText} onChange={e => setQuestionsText(e.target.value)} rows={6}
                placeholder={qType === "speaking_part1"
                  ? "Where are you from originally?\nDo you enjoy living there?\nHas your hometown changed recently?"
                  : "How has technology changed communication in your country?\nDo you think people rely too much on technology today?"} />
            </FieldLabel>
          </>)}
        </>)}

        {/* ── Listening fields ── */}
        {section === "listening" && (<>
          {/* Section picker */}
          <FieldLabel label="Listening Section">
            <div className="grid grid-cols-2 gap-2">
              {LISTENING_SECTION_META.map(sec => {
                const active = qType === sec.type;
                return (
                  <button key={sec.type} type="button"
                    onClick={() => {
                      setQType(sec.type);
                      // reset groups with section start number
                      setLGroups([{ id: crypto.randomUUID(), type: "form", instruction: LGROUP_META.form.instruction, questions: [{ number: sec.start, text: "", answer: "", acceptable: [] }] }]);
                    }}
                    className="flex flex-col gap-0.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-150"
                    style={{
                      background: active ? sec.bg : S2,
                      border: `1px solid ${active ? sec.color + "50" : BD}`,
                      color: active ? sec.color : T2,
                    }}>
                    <span className="font-black">{sec.label}</span>
                    <span className="font-normal opacity-75">{sec.desc}</span>
                  </button>
                );
              })}
            </div>
          </FieldLabel>

          {/* Context + Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FieldLabel label="Context / Scenario">
              <StyledInput value={lContext} onChange={e => setLContext(e.target.value)}
                placeholder="e.g. A couple booking a campsite" />
            </FieldLabel>
            <FieldLabel label="Publish Status">
              <StatusToggle value={status} onChange={setStatus} />
            </FieldLabel>
          </div>

          {/* Title (used as heading in practice page) */}
          <FieldLabel label="Section Title">
            <StyledInput value={title} onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Booking a Campsite" />
          </FieldLabel>

          {/* Audio upload */}
          <FieldLabel label={<>Audio File <span className="font-normal normal-case tracking-normal" style={{ color:T3 }}>— MP3 / WAV / M4A · max 20 MB</span></>}>
            {audioFile ? (
              <div className="rounded-xl overflow-hidden" style={{ background: "#eff6ff", border: "1px solid rgba(220,38,38,0.2)" }}>
                <div className="flex items-center gap-3 px-4 py-3">
                  <Music2 className="w-4 h-4 shrink-0" style={{ color: "#1d4ed8" }} />
                  <span className="text-sm flex-1 truncate" style={{ color: "#94a3b8" }}>{audioName}</span>
                  <button type="button" onClick={() => { setAudioFile(null); setAudioName(""); if(audioRef2.current) audioRef2.current.value=""; if(audioPreviewUrl){URL.revokeObjectURL(audioPreviewUrl);setAudioPreviewUrl(null);} }}
                    className="p-1 rounded-lg transition-colors" style={{ color: "#f87171" }}>
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                {audioPreviewUrl && (
                  <div className="px-4 pb-3">
                    <audio controls src={audioPreviewUrl} className="w-full h-8" style={{ accentColor: "#1d4ed8" }} />
                  </div>
                )}
              </div>
            ) : (
              <div onClick={() => audioRef2.current?.click()}
                className="flex flex-col items-center justify-center gap-2 py-8 rounded-xl cursor-pointer transition-all duration-150"
                style={{ border: `1.5px dashed ${BDL}`, background: S2 }}>
                <div className="p-3 rounded-xl" style={{ background: "rgba(251,146,60,0.15)", border: "1px solid rgba(251,146,60,0.25)" }}>
                  <Headphones className="w-5 h-5" style={{ color: "#1d4ed8" }} />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold" style={{ color: T2 }}>
                    Click to upload audio or <span style={{ color: "#1d4ed8" }}>browse</span>
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: T3 }}>MP3, WAV, M4A</p>
                </div>
              </div>
            )}
            <input ref={audioRef2} type="file" accept="audio/*" className="hidden"
              onChange={e => {
                const f = e.target.files?.[0];
                if (!f) return;
                if (f.size > 20 * 1024 * 1024) return toast.error("Audio must be under 20 MB.");
                if (audioPreviewUrl) URL.revokeObjectURL(audioPreviewUrl);
                setAudioFile(f); setAudioName(f.name);
                setAudioPreviewUrl(URL.createObjectURL(f));
              }} />
          </FieldLabel>

          {/* Question Groups */}
          <FieldLabel label="Question Groups">
            <div className="space-y-4">
              {lGroups.map((grp, gi) => {
                const gMeta = LGROUP_META[grp.type];
                return (
                  <div key={grp.id} className="rounded-xl overflow-hidden" style={{ border: `1px solid ${gMeta.color}30`, background: S2 }}>
                    {/* Group header */}
                    <div className="flex items-center justify-between px-4 py-3" style={{ background: S3, borderBottom: `1px solid ${gMeta.color}20` }}>
                      <span className="text-[11px] font-black uppercase tracking-widest" style={{ color: gMeta.color }}>
                        Group {gi + 1} · {gMeta.label}
                      </span>
                      {lGroups.length > 1 && (
                        <button type="button" onClick={() => removeLGroup(gi)}
                          className="p-1 rounded-lg transition-colors" style={{ color: "#f87171" }}>
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <div className="p-4 space-y-4">
                      {/* Group type selector */}
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: T3 }}>Question Type</p>
                        <div className="flex flex-wrap gap-1.5">
                          {(Object.keys(LGROUP_META) as LGroupType[]).map(t => {
                            const m = LGROUP_META[t];
                            const active = grp.type === t;
                            return (
                              <button key={t} type="button"
                                onClick={() => updateLGroup(gi, { type: t, instruction: LGROUP_META[t].instruction })}
                                className="px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all"
                                style={{
                                  background: active ? `${m.color}18` : S3,
                                  border: `1px solid ${active ? m.color+"50" : BD}`,
                                  color: active ? m.color : T3,
                                }}>
                                {m.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Instruction */}
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: T3 }}>Instruction</p>
                        <StyledTextarea value={grp.instruction} rows={2}
                          onChange={e => updateLGroup(gi, { instruction: e.target.value })} />
                      </div>

                      {/* Questions in group */}
                      <div className="space-y-3">
                        {grp.questions.map((q, qi) => {
                          const isMcq = grp.type === "mcq_single" || grp.type === "mcq_multi";
                          const isSentence = grp.type === "sentence";
                          return (
                            <div key={qi} className="rounded-xl p-3 space-y-3" style={{ background: S1, border: `1px solid ${BD}` }}>
                              <div className="flex items-center gap-2">
                                <span className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-black shrink-0"
                                  style={{ background: `${gMeta.color}18`, color: gMeta.color, border: `1px solid ${gMeta.color}30` }}>
                                  {q.number}
                                </span>
                                <div className="flex-1">
                                  {isSentence ? (
                                    <div className="grid grid-cols-2 gap-2">
                                      <StyledInput value={q.prefix ?? ""} onChange={e => updateQuestion(gi, qi, { prefix: e.target.value })} placeholder="Text before blank…" />
                                      <StyledInput value={q.suffix ?? ""} onChange={e => updateQuestion(gi, qi, { suffix: e.target.value })} placeholder="Text after blank…" />
                                    </div>
                                  ) : (
                                    <StyledInput value={q.text} onChange={e => updateQuestion(gi, qi, { text: e.target.value })}
                                      placeholder={isMcq ? "e.g. Why does the speaker mention…?" : "e.g. Name of the booking: ___"} />
                                  )}
                                </div>
                                {grp.questions.length > 1 && (
                                  <button type="button" onClick={() => removeQuestionFromGroup(gi, qi)}
                                    className="p-1 rounded-lg shrink-0" style={{ color: "#f87171" }}>
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>

                              {/* MCQ options */}
                              {isMcq && (
                                <div className="space-y-1.5 pl-9">
                                  {(q.options ?? ["","","",""]).map((opt, oi) => (
                                    <div key={oi} className="flex items-center gap-2">
                                      <span className="text-[11px] font-bold w-5 text-center shrink-0" style={{ color: gMeta.color }}>
                                        {["A","B","C","D","E"][oi]}
                                      </span>
                                      <StyledInput value={opt}
                                        onChange={e => {
                                          const opts = [...(q.options ?? ["","","",""])];
                                          opts[oi] = e.target.value;
                                          updateQuestion(gi, qi, { options: opts });
                                        }}
                                        placeholder={`Option ${["A","B","C","D","E"][oi]}`} />
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* Answer + acceptable */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-9">
                                <div>
                                  <p className="text-[10px] font-black uppercase tracking-widest mb-1.5" style={{ color: gMeta.color }}>
                                    Answer {isMcq ? (grp.type === "mcq_multi" ? "(A,C)" : "(A/B/C)") : ""}
                                  </p>
                                  <StyledInput value={q.answer} onChange={e => updateQuestion(gi, qi, { answer: e.target.value })}
                                    placeholder={grp.type === "mcq_single" ? "A" : grp.type === "mcq_multi" ? "A,C" : "e.g. nine thirty"} />
                                </div>
                                <div>
                                  <p className="text-[10px] font-black uppercase tracking-widest mb-1.5" style={{ color: T3 }}>
                                    Also accept <span className="font-normal normal-case tracking-normal">(comma-separated)</span>
                                  </p>
                                  <StyledInput
                                    value={(q.acceptable ?? []).join(", ")}
                                    onChange={e => updateQuestion(gi, qi, { acceptable: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
                                    placeholder="9:30, 9.30, half nine" />
                                </div>
                              </div>
                            </div>
                          );
                        })}

                        <button type="button" onClick={() => addQuestionToGroup(gi)}
                          className="w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all duration-150"
                          style={{ background: S1, border: `1px dashed ${gMeta.color}40`, color: T3 }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = gMeta.color; (e.currentTarget as HTMLElement).style.borderColor = gMeta.color+"80"; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = T3; (e.currentTarget as HTMLElement).style.borderColor = gMeta.color+"40"; }}>
                          <Plus className="w-3.5 h-3.5" /> Add question to group
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              <button type="button" onClick={addLGroup}
                className="w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all duration-150"
                style={{ background: S2, border: `1px dashed ${BDL}`, color: T2 }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#fb923c"; (e.currentTarget as HTMLElement).style.color = "#1d4ed8"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = BDL; (e.currentTarget as HTMLElement).style.color = T2; }}>
                <Plus className="w-3.5 h-3.5" /> Add question group
              </button>
            </div>
          </FieldLabel>

          {/* Transcript */}
          <FieldLabel label={<>Transcript <span className="font-normal normal-case tracking-normal" style={{ color:T3 }}>— optional · shown after submission</span></>}>
            <StyledTextarea value={lTranscript} onChange={e => setLTranscript(e.target.value)} rows={6}
              placeholder={"Paste the full audio transcript here.\n\nShown to students after they submit so they can check their answers against the original audio."} />
          </FieldLabel>
        </>)}

        {/* Submit */}
        <div className="pt-2 flex items-center gap-4">
          <PrimaryBtn type="submit" loading={uploading || lUploading}
            icon={<Plus className="w-4 h-4"/>}
            label={`Save ${section.charAt(0).toUpperCase() + section.slice(1)} Question`}
            loadingLabel={section === "listening" && audioFile ? "Uploading audio…" : section === "writing" && imageFile ? "Uploading image…" : "Saving…"} />
          <span className="text-xs" style={{ color:T3 }}>
            {status === "draft" ? "Will be saved as draft" : "Will go live immediately"}
          </span>
        </div>
      </form>
    </div>
  );
}

// ── Primitives ────────────────────────────────────────────────────────────────

function StatPill({ icon, label, value, color, bg }: { icon:React.ReactNode; label:string; value:number; color:string; bg:string }) {
  return (
    <div className="flex flex-col items-center gap-1 px-4 py-3 rounded-2xl min-w-[60px]"
      style={{ background:bg, border:`1px solid ${color}35` }}>
      <span style={{ color }}>{icon}</span>
      <span className="text-xl font-black tabular-nums leading-none" style={{ color:T1 }}>{value}</span>
      <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color }}>{label}</span>
    </div>
  );
}

function SectionHeading({ number, title, subtitle }: { number:string; title:string; subtitle:string }) {
  return (
    <div className="flex items-center gap-3 mb-1">
      <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black text-white shrink-0"
        style={{ background:ACG, boxShadow:"0 4px 14px rgba(124,58,237,0.4)" }}>{number}</div>
      <div>
        <h2 className="text-base font-black leading-none" style={{ color:T1 }}>{title}</h2>
        <p className="text-[11px] mt-0.5" style={{ color:T3 }}>{subtitle}</p>
      </div>
    </div>
  );
}

function FieldLabel({ label, children }: { label:React.ReactNode; children:React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="block text-[10px] font-black uppercase tracking-[0.2em]" style={{ color:T2 }}>{label}</label>
      {children}
    </div>
  );
}

function StyledInput({ value, onChange, placeholder }: {
  value:string; onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void; placeholder?:string;
}) {
  return (
    <input value={value} onChange={onChange} placeholder={placeholder}
      className="w-full rounded-xl px-4 py-3.5 text-sm focus:outline-none transition-all duration-150"
      style={{ background:S3, border:`1px solid ${BD}`, color:T1, caretColor:ACL }}
      onFocus={e => { e.currentTarget.style.borderColor = ACL; e.currentTarget.style.background = "#2e2c4a"; }}
      onBlur={e  => { e.currentTarget.style.borderColor = BD;  e.currentTarget.style.background = S3; }} />
  );
}

function StyledTextarea({ value, onChange, rows=4, placeholder }: {
  value:string; onChange:(e:React.ChangeEvent<HTMLTextAreaElement>)=>void; rows?:number; placeholder?:string;
}) {
  return (
    <textarea value={value} onChange={onChange} rows={rows} placeholder={placeholder}
      className="w-full rounded-xl px-4 py-3.5 text-sm resize-none focus:outline-none transition-all duration-150 leading-relaxed"
      style={{ background:S3, border:`1px solid ${BD}`, color:T1, caretColor:ACL }}
      onFocus={e => { e.currentTarget.style.borderColor = ACL; e.currentTarget.style.background = "#2e2c4a"; }}
      onBlur={e  => { e.currentTarget.style.borderColor = BD;  e.currentTarget.style.background = S3; }} />
  );
}

function StyledSelect({ value, onChange, options }: {
  value:string; onChange:(v:string)=>void; options:{value:string; label:string; color:string}[];
}) {
  const selected = options.find(o => o.value === value);
  return (
    <div className="relative">
      <select value={value} onChange={e => onChange(e.target.value)}
        className="w-full appearance-none rounded-xl px-4 py-3.5 pr-10 text-sm font-bold focus:outline-none transition-all duration-150 cursor-pointer"
        style={{ background:S3, border:`1px solid ${BD}`, color:selected?.color ?? T1 }}
        onFocus={e => { e.currentTarget.style.borderColor = ACL; }}
        onBlur={e  => { e.currentTarget.style.borderColor = BD; }}>
        {options.map(o => <option key={o.value} value={o.value} style={{ background:S1, color:"#fff" }}>{o.label}</option>)}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color:T3 }} />
    </div>
  );
}

function StatusToggle({ value, onChange }: { value:Status; onChange:(s:Status)=>void }) {
  return (
    <div className="flex gap-2">
      {(["published","draft"] as Status[]).map(s => {
        const active = value === s;
        const isP    = s === "published";
        return (
          <button key={s} type="button" onClick={() => onChange(s)}
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold transition-all duration-150 flex-1 justify-center"
            style={{
              background: active ? (isP ? "#f0fdf4" : S2) : S2,
              border:     `1px solid ${active ? (isP ? "rgba(52,211,153,0.4)" : BDL) : BD}`,
              color:      active ? (isP ? "#16a34a" : T2) : T3,
            }}>
            {isP ? <Globe className="w-3.5 h-3.5"/> : <FileX2 className="w-3.5 h-3.5"/>}
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        );
      })}
    </div>
  );
}

function PrimaryBtn({ type="button", loading, icon, label, loadingLabel, danger, onClick }: {
  type?:"button"|"submit"; loading:boolean; icon:React.ReactNode; label:string;
  loadingLabel:string; danger?:boolean; onClick?:()=>void;
}) {
  return (
    <button type={type} disabled={loading} onClick={onClick}
      className="flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-black text-white transition-all duration-150 disabled:opacity-50 whitespace-nowrap"
      style={{ background:danger?"linear-gradient(135deg,#1d4ed8,#ef4444)":ACG2, boxShadow:danger?"0 4px 16px rgba(239,68,68,0.35)":"0 4px 16px rgba(124,58,237,0.4)" }}
      onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
      {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin"/> : icon}
      {loading ? loadingLabel : label}
    </button>
  );
}

function GhostBtn({ children, onClick }: { children:React.ReactNode; onClick:()=>void }) {
  return (
    <button type="button" onClick={onClick}
      className="px-5 py-3 rounded-xl text-xs font-bold transition-all duration-150"
      style={{ color:T2, background:S2, border:`1px solid ${BD}` }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = S3; (e.currentTarget as HTMLElement).style.color = T1; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = S2; (e.currentTarget as HTMLElement).style.color = T2; }}>
      {children}
    </button>
  );
}

function CloseBtn({ onClick }: { onClick:()=>void }) {
  return (
    <button type="button" onClick={onClick}
      className="p-2 rounded-xl transition-all duration-150"
      style={{ color:T3, background:S2, border:`1px solid ${BD}` }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = T1; (e.currentTarget as HTMLElement).style.background = S3; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = T3; (e.currentTarget as HTMLElement).style.background = S2; }}>
      <X className="w-4 h-4"/>
    </button>
  );
}

function ActionBtn({ children, label, color, hoverBg, onClick }: {
  children:React.ReactNode; label:string; color:string; hoverBg:string; onClick:()=>void;
}) {
  return (
    <button onClick={onClick} title={label}
      className="p-2 rounded-lg transition-all duration-150"
      style={{ color:T3, background:"transparent" }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = color; (e.currentTarget as HTMLElement).style.background = hoverBg; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = T3; (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
      {children}
    </button>
  );
}

function Modal({ children, onClose }: { children:React.ReactNode; onClose:()=>void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background:"rgba(0,0,0,0.8)", backdropFilter:"blur(8px)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="w-full max-w-lg rounded-2xl p-7 max-h-[90vh] overflow-y-auto"
        style={{ background:S1, border:`1px solid ${BDL}`, boxShadow:"0 32px 80px rgba(0,0,0,0.7)" }}>
        {children}
      </div>
    </div>
  );
}

function TableSkeleton() {
  return (
    <ul>
      {[...Array(4)].map((_, i) => (
        <li key={i} className="grid gap-4 items-center px-5 py-4"
          style={{ gridTemplateColumns:"auto 1fr auto auto auto auto", borderBottom: i<3?`1px solid ${BD}`:"none" }}>
          <div className="h-7 w-28 rounded-lg animate-pulse" style={{ background:S3 }} />
          <div className="h-4 rounded-lg animate-pulse" style={{ background:S3, width:["55%","72%","63%","80%"][i] }} />
          <div className="h-6 w-16 rounded-lg animate-pulse" style={{ background:S3 }} />
          <div className="h-6 w-20 rounded-full animate-pulse" style={{ background:S3 }} />
          <div className="h-4 w-16 rounded-lg animate-pulse" style={{ background:S3 }} />
          <div className="flex gap-1.5 justify-center">
            <div className="h-7 w-7 rounded-lg animate-pulse" style={{ background:S3 }} />
            <div className="h-7 w-7 rounded-lg animate-pulse" style={{ background:S3 }} />
          </div>
        </li>
      ))}
    </ul>
  );
}

function EmptyState({ section }: { section: Section|"all" }) {
  const msg = section === "all" ? "No questions yet" : `No ${section} questions yet`;
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="p-5 rounded-3xl" style={{ background:"rgba(124,58,237,0.15)", border:"1px solid rgba(124,58,237,0.25)" }}>
        <Zap className="w-8 h-8" style={{ color:ACL }} />
      </div>
      <div className="text-center space-y-1">
        <p className="text-sm font-bold" style={{ color:T1 }}>{msg}</p>
        <p className="text-xs" style={{ color:T3 }}>Add your first question using the form above.</p>
      </div>
    </div>
  );
}

function LogSkeleton() {
  return (
    <ul>
      {[...Array(5)].map((_, i) => (
        <li key={i} className="flex items-start gap-4 px-5 py-4" style={{ borderBottom: i<4?`1px solid ${BD}`:"none" }}>
          <div className="w-8 h-8 rounded-xl shrink-0 animate-pulse" style={{ background:S3 }} />
          <div className="flex-1 space-y-2 pt-0.5">
            <div className="h-3.5 rounded-lg animate-pulse" style={{ background:S3, width:`${50+(i*9)%35}%` }} />
            <div className="h-3 rounded-lg animate-pulse w-28" style={{ background:S2 }} />
          </div>
        </li>
      ))}
    </ul>
  );
}

function LogEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-14 gap-3">
      <div className="p-3.5 rounded-2xl" style={{ background:S2, border:`1px solid ${BD}` }}>
        <Clock className="w-5 h-5" style={{ color:T3 }} />
      </div>
      <p className="text-sm" style={{ color:T3 }}>No activity yet</p>
    </div>
  );
}
