"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  ChevronRight,
  ShieldCheck,
  Plus,
  Pencil,
  Trash2,
  X,
  Loader2,
  BookOpen,
  FileText,
  ImagePlus,
  AlertTriangle,
  Globe,
  FileX2,
  ChevronDown,
  Clock,
  PlusCircle,
  Trash,
  Sparkles,
  BarChart3,
  CheckCircle2,
  FileEdit,
  Zap,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { ProtectedAdminRoute } from "@/components/shared/ProtectedAdminRoute";
import { useUserRole } from "@/hooks/useUserRole";
import { toast } from "sonner";

// ── Types ─────────────────────────────────────────────────────────────────────

type QuestionType = "writing_task1" | "writing_task2";
type Difficulty   = "band_5_6" | "band_6_7" | "band_7_8" | "band_8_9";
type Status       = "published" | "draft";

interface QuestionContent {
  image_url?: string;
  difficulty: Difficulty;
  status:     Status;
}

interface Question {
  id:         string;
  title:      string;
  type:       QuestionType;
  content:    QuestionContent;
  created_at: string;
}

interface AdminLog {
  id:             string;
  admin_email:    string;
  action:         "added" | "deleted";
  question_id:    string | null;
  question_title: string;
  created_at:     string;
}

// ── Tokens — visible on oklch(0.128) dark background ─────────────────────────
// Surface layers (progressively lighter)
const S1 = "#1c1a2e";   // card surface
const S2 = "#22203a";   // elevated surface
const S3 = "#2a2845";   // hover / input bg
const BD = "#35325a";   // border
const BDL = "#433f6e";  // border focus / lighter

// Text
const T1 = "#f0effe";   // heading white
const T2 = "#b8b5d8";   // body / secondary
const T3 = "#7a7898";   // muted / placeholder

// Accent purple
const AC = "#7c3aed";
const ACL = "#a78bfa";
const ACG = "linear-gradient(135deg,#7c3aed,#6d28d9)";
const ACG2 = "linear-gradient(135deg,#8b5cf6,#7c3aed)";

// ── Lookup maps ───────────────────────────────────────────────────────────────

const TYPE_OPTIONS: { value: QuestionType; label: string; icon: React.ElementType; color: string; bg: string }[] = [
  { value: "writing_task1", label: "Task 1 Academic", icon: FileText, color: "#38bdf8", bg: "#0c2a3d" },
  { value: "writing_task2", label: "Task 2 Essay",    icon: BookOpen, color: "#34d399", bg: "#0a2d22" },
];

const DIFFICULTY_OPTIONS: { value: Difficulty; label: string; color: string }[] = [
  { value: "band_5_6", label: "Band 5–6", color: "#fbbf24" },
  { value: "band_6_7", label: "Band 6–7", color: "#34d399" },
  { value: "band_7_8", label: "Band 7–8", color: "#38bdf8" },
  { value: "band_8_9", label: "Band 8–9", color: "#c084fc" },
];

const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  band_5_6: "Band 5–6", band_6_7: "Band 6–7", band_7_8: "Band 7–8", band_8_9: "Band 8–9",
};
const DIFFICULTY_COLOR: Record<Difficulty, string> = {
  band_5_6: "#fbbf24", band_6_7: "#34d399", band_7_8: "#38bdf8", band_8_9: "#c084fc",
};
const DIFFICULTY_BG: Record<Difficulty, string> = {
  band_5_6: "#2d1f06", band_6_7: "#062d1e", band_7_8: "#062630", band_8_9: "#1d0d38",
};

function typeConfig(type: QuestionType) {
  return TYPE_OPTIONS.find(t => t.value === type) ?? TYPE_OPTIONS[0];
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
}

function timeAgo(iso: string): string {
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60)    return "just now";
  if (s < 3600)  return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  if (s < 604800) return `${Math.floor(s / 86400)}d ago`;
  return formatDate(iso);
}

const STORAGE_BUCKET = "question-images";

// ── Root ──────────────────────────────────────────────────────────────────────

export default function AdminPage() {
  return <ProtectedAdminRoute><AdminContent /></ProtectedAdminRoute>;
}

// ── Main content ──────────────────────────────────────────────────────────────

function AdminContent() {
  const supabase = createClient();
  const { isAdmin } = useUserRole();

  const [questions,   setQuestions]   = useState<Question[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [logs,        setLogs]        = useState<AdminLog[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(true);
  const [userEmail,   setUserEmail]   = useState("");

  const [editItem,       setEditItem]       = useState<Question | null>(null);
  const [editTitle,      setEditTitle]      = useState("");
  const [editDifficulty, setEditDifficulty] = useState<Difficulty>("band_6_7");
  const [editStatus,     setEditStatus]     = useState<Status>("draft");
  const [editSubmitting, setEditSubmitting] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<Question | null>(null);
  const [deleting,     setDeleting]     = useState(false);

  const fetchQuestions = useCallback(async () => {
    setLoadingList(true);
    const { data, error } = await supabase
      .from("test_materials").select("id,title,type,content,created_at")
      .in("type", ["writing_task1","writing_task2"]).order("created_at", { ascending: false });
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
  }, [fetchQuestions, fetchLogs, supabase]);

  const logAction = useCallback(async (action: "added"|"deleted", questionId: string, questionTitle: string) => {
    if (!userEmail) return;
    await supabase.from("admin_logs").insert({ admin_email: userEmail, action, question_id: questionId, question_title: questionTitle });
    fetchLogs();
  }, [supabase, userEmail, fetchLogs]);

  function openEdit(q: Question) {
    setEditItem(q); setEditTitle(q.title);
    setEditDifficulty(q.content?.difficulty ?? "band_6_7");
    setEditStatus(q.content?.status ?? "draft");
  }

  async function handleEditSave(e: React.FormEvent) {
    e.preventDefault();
    if (!editItem || !editTitle.trim()) return toast.error("Question text is required.");
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

  const published = questions.filter(q => q.content?.status === "published").length;
  const drafts    = questions.filter(q => q.content?.status === "draft").length;

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

      {/* ── Hero ── */}
      <div className="relative overflow-hidden rounded-2xl p-7"
        style={{ background: `linear-gradient(135deg, #1e1a38 0%, #1a1830 60%, #161428 100%)`, border: `1px solid ${BDL}` }}>
        {/* Glow */}
        <div className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)" }} />
        <div className="pointer-events-none absolute bottom-0 left-0 w-40 h-40 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%)" }} />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="p-2.5 rounded-xl" style={{ background: ACG, boxShadow: "0 4px 16px rgba(124,58,237,0.5)" }}>
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.22em] px-2.5 py-1 rounded-full"
                style={{ background: "rgba(124,58,237,0.25)", color: ACL, border: `1px solid rgba(124,58,237,0.4)` }}>
                Admin Console
              </span>
            </div>
            <h1 className="text-3xl font-black tracking-tight leading-none mb-1.5" style={{ color: T1 }}>
              Content Manager
            </h1>
            <p className="text-sm" style={{ color: T2 }}>Manage IELTS Writing practice questions for students.</p>
          </div>

          {/* Stats */}
          <div className="flex items-stretch gap-3 shrink-0">
            <StatPill icon={<BarChart3 className="w-4 h-4" />}  label="Total"     value={questions.length} color="#c084fc" bg="#1d0d38" />
            <StatPill icon={<CheckCircle2 className="w-4 h-4" />} label="Published" value={published}        color="#34d399" bg="#062d1e" />
            <StatPill icon={<FileEdit className="w-4 h-4" />}   label="Draft"     value={drafts}           color="#fbbf24" bg="#2d1f06" />
          </div>
        </div>
      </div>

      {/* ── Section 1 ── */}
      <section>
        <SectionHeading number="1" title="Add New Question" subtitle="Create a new practice prompt" />
        <AddQuestionForm onSuccess={fetchQuestions} onLog={logAction} />
      </section>

      {/* ── Section 2 ── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <SectionHeading number="2" title="Manage Questions" subtitle="Edit or remove existing questions" />
          {!isAdmin && (
            <span className="text-[10px] font-bold px-3 py-1.5 rounded-full"
              style={{ background: "#2d1f06", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.35)" }}>
              Editor — view &amp; add only
            </span>
          )}
        </div>

        <div className="rounded-2xl overflow-hidden" style={{ background: S1, border: `1px solid ${BD}` }}>
          {/* Header */}
          <div className="grid gap-4 px-5 py-3 text-[10px] font-black uppercase tracking-[0.18em]"
            style={{ gridTemplateColumns: "auto 1fr auto auto auto auto", background: S2, borderBottom: `1px solid ${BD}`, color: T3 }}>
            <span>Type</span><span>Question</span>
            <span className="text-center">Difficulty</span>
            <span className="text-center">Status</span>
            <span className="text-center">Added</span>
            <span className="text-center">Actions</span>
          </div>

          {loadingList ? <TableSkeleton /> : questions.length === 0 ? <EmptyState /> : (
            <ul>
              {questions.map((q, i) => {
                const cfg = typeConfig(q.type);
                const Icon = cfg.icon;
                const diff = q.content?.difficulty;
                const diffLabel = diff ? DIFFICULTY_LABEL[diff] : "—";
                const diffColor = diff ? DIFFICULTY_COLOR[diff] : T3;
                const diffBg    = diff ? DIFFICULTY_BG[diff]   : S2;
                const isPublished = q.content?.status === "published";
                const preview = q.title.length > 65 ? q.title.slice(0,65).trimEnd() + "…" : q.title;

                return (
                  <li key={q.id}
                    className="grid gap-4 items-center px-5 py-4 transition-colors"
                    style={{ gridTemplateColumns:"auto 1fr auto auto auto auto", borderBottom: i < questions.length-1 ? `1px solid ${BD}` : "none", background:"transparent" }}
                    onMouseEnter={e => (e.currentTarget.style.background = S2)}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>

                    {/* Type */}
                    <span className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-bold whitespace-nowrap"
                      style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.color}40` }}>
                      <Icon className="w-3 h-3" />{cfg.label}
                    </span>

                    {/* Preview */}
                    <div className="flex items-center gap-2.5 min-w-0">
                      {q.content?.image_url && (
                        <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0" style={{ border: `1px solid ${BD}` }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={q.content.image_url} alt="" className="w-full h-full object-cover" />
                        </div>
                      )}
                      <p className="text-sm font-medium leading-snug truncate" style={{ color: T1 }} title={q.title}>{preview}</p>
                    </div>

                    {/* Difficulty */}
                    <span className="text-[10px] font-bold px-2.5 py-1.5 rounded-lg whitespace-nowrap text-center"
                      style={{ color: diffColor, background: diffBg, border: `1px solid ${diffColor}40` }}>
                      {diffLabel}
                    </span>

                    {/* Status */}
                    <span className="flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1.5 rounded-full whitespace-nowrap"
                      style={{
                        background: isPublished ? "#062d1e" : S2,
                        color:      isPublished ? "#34d399" : T3,
                        border:     `1px solid ${isPublished ? "rgba(52,211,153,0.35)" : BD}`,
                      }}>
                      <span className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: isPublished ? "#34d399" : T3 }} />
                      {isPublished ? "Published" : "Draft"}
                    </span>

                    {/* Date */}
                    <span className="text-[11px] whitespace-nowrap text-center tabular-nums" style={{ color: T3 }}>
                      {formatDate(q.created_at)}
                    </span>

                    {/* Actions */}
                    <div className="flex items-center gap-1 justify-center">
                      <ActionBtn label="Edit" color="#38bdf8" hoverBg="#0c2a3d" onClick={() => openEdit(q)}>
                        <Pencil className="w-3.5 h-3.5" />
                      </ActionBtn>
                      {isAdmin && (
                        <ActionBtn label="Delete" color="#f87171" hoverBg="#2d0f0f" onClick={() => setDeleteTarget(q)}>
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

      {/* ── Section 3 ── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <SectionHeading number="3" title="Activity Log" subtitle="Recent content changes" />
          <span className="flex items-center gap-1.5 text-[10px] font-semibold px-3 py-1.5 rounded-full"
            style={{ background: S2, color: T3, border: `1px solid ${BD}` }}>
            <Clock className="w-3 h-3" /> Last 20 events
          </span>
        </div>

        <div className="rounded-2xl overflow-hidden" style={{ background: S1, border: `1px solid ${BD}` }}>
          {loadingLogs ? <LogSkeleton /> : logs.length === 0 ? <LogEmpty /> : (
            <ul>
              {logs.map((log, i) => {
                const isAdded = log.action === "added";
                const accent  = isAdded ? "#34d399" : "#f87171";
                const logBg   = isAdded ? "#062d1e" : "#2d0f0f";
                const preview = log.question_title.length > 60
                  ? log.question_title.slice(0,60).trimEnd() + "…"
                  : log.question_title;

                return (
                  <li key={log.id}
                    className="flex items-start gap-4 px-5 py-4 transition-colors"
                    style={{ borderBottom: i < logs.length-1 ? `1px solid ${BD}` : "none", background:"transparent" }}
                    onMouseEnter={e => (e.currentTarget.style.background = S2)}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: logBg, border: `1px solid ${accent}35` }}>
                      {isAdded
                        ? <PlusCircle className="w-3.5 h-3.5" style={{ color: accent }} />
                        : <Trash      className="w-3.5 h-3.5" style={{ color: accent }} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="text-xs font-bold" style={{ color: accent }}>
                          {isAdded ? "Added" : "Deleted"}
                        </span>
                        <span className="text-sm font-medium truncate" style={{ color: T1 }} title={log.question_title}>
                          {preview}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[11px] font-mono truncate max-w-[180px]" style={{ color: T3 }}>
                          {log.admin_email}
                        </span>
                        <span style={{ color: BD }}>·</span>
                        <span className="text-[11px] tabular-nums" style={{ color: T3 }}>
                          {timeAgo(log.created_at)}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>

      {/* ── Edit Modal ── */}
      {editItem && (
        <Modal onClose={() => setEditItem(null)}>
          <form onSubmit={handleEditSave} className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl" style={{ background: "#0c2a3d", border: "1px solid rgba(56,189,248,0.3)" }}>
                  <Pencil className="w-4 h-4" style={{ color: "#38bdf8" }} />
                </div>
                <div>
                  <h2 className="text-base font-black" style={{ color: T1 }}>Edit Question</h2>
                  <p className="text-[11px]" style={{ color: T3 }}>Modify question details</p>
                </div>
              </div>
              <CloseBtn onClick={() => setEditItem(null)} />
            </div>

            {(() => { const cfg = typeConfig(editItem.type); const Icon = cfg.icon; return (
              <div className="flex items-center gap-2.5">
                <span className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold"
                  style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.color}40` }}>
                  <Icon className="w-3.5 h-3.5" />{cfg.label}
                </span>
                <span className="text-xs" style={{ color: T3 }}>type is fixed</span>
              </div>
            ); })()}

            <FieldLabel label="Question Text">
              <StyledTextarea value={editTitle} onChange={e => setEditTitle(e.target.value)} rows={4} />
            </FieldLabel>

            <div className="grid grid-cols-2 gap-4">
              <FieldLabel label="Difficulty">
                <StyledSelect value={editDifficulty} onChange={v => setEditDifficulty(v as Difficulty)} options={DIFFICULTY_OPTIONS} />
              </FieldLabel>
              <FieldLabel label="Status">
                <StatusToggle value={editStatus} onChange={setEditStatus} />
              </FieldLabel>
            </div>

            <div className="flex gap-3 pt-1">
              <PrimaryBtn type="submit" loading={editSubmitting} icon={<Pencil className="w-3.5 h-3.5" />} label="Save Changes" loadingLabel="Saving…" />
              <GhostBtn onClick={() => setEditItem(null)}>Cancel</GhostBtn>
            </div>
          </form>
        </Modal>
      )}

      {/* ── Delete Modal ── */}
      {deleteTarget && (
        <Modal onClose={() => setDeleteTarget(null)}>
          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl shrink-0" style={{ background: "#2d0f0f", border: "1px solid rgba(248,113,113,0.3)" }}>
                <AlertTriangle className="w-5 h-5" style={{ color: "#f87171" }} />
              </div>
              <div>
                <h2 className="text-base font-black" style={{ color: T1 }}>Delete Question?</h2>
                <p className="mt-1.5 text-sm leading-relaxed" style={{ color: T2 }}>
                  Permanently removes the question{deleteTarget.content?.image_url ? " and its image" : ""}. Cannot be undone.
                </p>
                <p className="mt-3 text-sm font-medium line-clamp-2 leading-snug px-3 py-2.5 rounded-xl"
                  style={{ color: T1, background: S2, border: `1px solid ${BD}` }}>
                  &ldquo;{deleteTarget.title}&rdquo;
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <PrimaryBtn onClick={handleDelete} loading={deleting} icon={<Trash2 className="w-3.5 h-3.5" />}
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
  const supabase   = createClient();
  const fileRef    = useRef<HTMLInputElement>(null);
  const [qType,    setQType]    = useState<QuestionType>("writing_task1");
  const [qText,    setQText]    = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("band_6_7");
  const [status,   setStatus]   = useState<Status>("draft");
  const [imageFile,    setImageFile]    = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver,  setDragOver] = useState(false);

  function pickFile(file: File) {
    if (!file.type.startsWith("image/")) return toast.error("Please select an image file.");
    if (file.size > 5 * 1024 * 1024)    return toast.error("Image must be under 5 MB.");
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  function removeImage() {
    setImageFile(null);
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!qText.trim()) return toast.error("Question text is required.");
    setUploading(true);

    let imageUrl: string | undefined;
    if (imageFile) {
      const ext = imageFile.name.split(".").pop() ?? "png";
      const filePath = `${crypto.randomUUID()}.${ext}`;
      const { error: uploadErr } = await supabase.storage
        .from(STORAGE_BUCKET).upload(filePath, imageFile, { contentType: imageFile.type, upsert: false });
      if (uploadErr) { setUploading(false); return toast.error("Upload failed: " + uploadErr.message); }
      const { data: urlData } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(filePath);
      imageUrl = urlData.publicUrl;
    }

    const content: QuestionContent = { difficulty, status, ...(imageUrl ? { image_url: imageUrl } : {}) };
    const { data: inserted, error } = await supabase
      .from("test_materials").insert({ title: qText.trim(), type: qType, content })
      .select("id").single();

    setUploading(false);
    if (error) return toast.error("Save failed: " + error.message);
    toast.success("Question added!");
    onLog("added", inserted.id, qText.trim());
    setQText(""); removeImage(); setDifficulty("band_6_7"); setStatus("draft");
    onSuccess();
  }

  return (
    <div className="mt-4 rounded-2xl overflow-hidden" style={{ background: S1, border: `1px solid ${BD}` }}>
      {/* Header strip */}
      <div className="px-6 py-4 flex items-center gap-3" style={{ background: S2, borderBottom: `1px solid ${BD}` }}>
        <div className="p-2 rounded-xl" style={{ background: ACG, boxShadow: "0 4px 12px rgba(124,58,237,0.4)" }}>
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-sm font-bold" style={{ color: T1 }}>New Question</p>
          <p className="text-[11px]" style={{ color: T3 }}>Fill in the details and click Save</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">

        {/* Row 1: Type + Difficulty */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FieldLabel label="Question Type">
            <div className="grid grid-cols-2 gap-2">
              {TYPE_OPTIONS.map(({ value, label, icon: Icon, color, bg }) => {
                const active = qType === value;
                return (
                  <button key={value} type="button" onClick={() => setQType(value)}
                    className="flex items-center gap-2 px-3 py-3 rounded-xl text-xs font-bold transition-all duration-150"
                    style={{
                      background: active ? bg : S2,
                      border:     `1px solid ${active ? color + "50" : BD}`,
                      color:      active ? color : T2,
                    }}>
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="text-left leading-tight">{label}</span>
                  </button>
                );
              })}
            </div>
          </FieldLabel>

          <FieldLabel label="Difficulty Band">
            <StyledSelect value={difficulty} onChange={v => setDifficulty(v as Difficulty)} options={DIFFICULTY_OPTIONS} />
          </FieldLabel>
        </div>

        {/* Row 2: Text */}
        <FieldLabel label="Question Text">
          <StyledTextarea value={qText} onChange={e => setQText(e.target.value)} rows={5}
            placeholder={qType === "writing_task1"
              ? "The chart below shows the percentage of adults in different countries who…\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant."
              : "Some people believe that universities should focus on teaching academic subjects, while others think they should prepare students for work. Discuss both views and give your own opinion."} />
        </FieldLabel>

        {/* Row 3: Image */}
        <FieldLabel label={<>Chart / Diagram <span className="font-normal normal-case tracking-normal" style={{ color: T3 }}>— optional · max 5 MB</span></>}>
          {imagePreview ? (
            <div className="relative rounded-xl overflow-hidden" style={{ border: `1px solid ${BD}` }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imagePreview} alt="Preview" className="w-full max-h-52 object-contain"
                style={{ background: "#0d0c1a" }} />
              <button type="button" onClick={removeImage}
                className="absolute top-2.5 right-2.5 p-1.5 rounded-lg transition-all"
                style={{ background: "rgba(0,0,0,0.8)", color: "#f87171", border: "1px solid rgba(248,113,113,0.3)" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#2d0f0f")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(0,0,0,0.8)")}>
                <X className="w-4 h-4" />
              </button>
              <div className="px-4 py-2 flex items-center gap-2" style={{ background: S2, borderTop: `1px solid ${BD}` }}>
                <FileX2 className="w-3.5 h-3.5 shrink-0" style={{ color: T3 }} />
                <span className="text-xs truncate" style={{ color: T2 }}>{imageFile?.name}</span>
              </div>
            </div>
          ) : (
            <div onClick={() => fileRef.current?.click()}
              onDragOver={e  => { e.preventDefault(); setDragOver(true);  }}
              onDragLeave={() => setDragOver(false)}
              onDrop={e => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) pickFile(f); }}
              className="flex flex-col items-center justify-center gap-3 py-10 rounded-xl cursor-pointer transition-all duration-150"
              style={{
                border:     `1.5px dashed ${dragOver ? ACL : BDL}`,
                background: dragOver ? "rgba(124,58,237,0.1)" : S2,
              }}>
              <div className="p-3.5 rounded-2xl" style={{ background: dragOver ? "rgba(124,58,237,0.25)" : "rgba(124,58,237,0.15)", border: `1px solid rgba(124,58,237,0.3)` }}>
                <ImagePlus className="w-5 h-5" style={{ color: ACL }} />
              </div>
              <div className="text-center space-y-1">
                <p className="text-sm font-semibold" style={{ color: T2 }}>
                  Drop image here or <span style={{ color: ACL }}>click to browse</span>
                </p>
                <p className="text-xs" style={{ color: T3 }}>PNG, JPG, WEBP, SVG</p>
              </div>
            </div>
          )}
          <input ref={fileRef} type="file" accept="image/*" className="hidden"
            onChange={e => { const f = e.target.files?.[0]; if (f) pickFile(f); }} />
        </FieldLabel>

        {/* Row 4: Status */}
        <FieldLabel label="Publish Status">
          <StatusToggle value={status} onChange={setStatus} />
        </FieldLabel>

        {/* Submit */}
        <div className="pt-2 flex items-center gap-4">
          <PrimaryBtn type="submit" loading={uploading}
            icon={<Plus className="w-4 h-4" />}
            label="Save Question"
            loadingLabel={imageFile ? "Uploading…" : "Saving…"} />
          <span className="text-xs" style={{ color: T3 }}>
            {status === "draft" ? "Will be saved as draft" : "Will go live immediately"}
          </span>
        </div>
      </form>
    </div>
  );
}

// ── Primitives ────────────────────────────────────────────────────────────────

function StatPill({ icon, label, value, color, bg }: { icon: React.ReactNode; label: string; value: number; color: string; bg: string }) {
  return (
    <div className="flex flex-col items-center gap-1 px-5 py-3 rounded-2xl min-w-[72px]"
      style={{ background: bg, border: `1px solid ${color}35` }}>
      <span style={{ color }}>{icon}</span>
      <span className="text-2xl font-black tabular-nums leading-none" style={{ color: T1 }}>{value}</span>
      <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color }}>{label}</span>
    </div>
  );
}

function SectionHeading({ number, title, subtitle }: { number: string; title: string; subtitle: string }) {
  return (
    <div className="flex items-center gap-3 mb-1">
      <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black text-white shrink-0"
        style={{ background: ACG, boxShadow: "0 4px 14px rgba(124,58,237,0.4)" }}>
        {number}
      </div>
      <div>
        <h2 className="text-base font-black leading-none" style={{ color: T1 }}>{title}</h2>
        <p className="text-[11px] mt-0.5" style={{ color: T3 }}>{subtitle}</p>
      </div>
    </div>
  );
}

function FieldLabel({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="block text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: T2 }}>{label}</label>
      {children}
    </div>
  );
}

function StyledTextarea({ value, onChange, rows = 4, placeholder }: {
  value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; rows?: number; placeholder?: string;
}) {
  return (
    <textarea value={value} onChange={onChange} rows={rows} placeholder={placeholder}
      className="w-full rounded-xl px-4 py-3.5 text-sm resize-none focus:outline-none transition-all duration-150 leading-relaxed"
      style={{ background: S3, border: `1px solid ${BD}`, color: T1, caretColor: ACL }}
      onFocus={e => { e.currentTarget.style.borderColor = ACL; e.currentTarget.style.background = "#2e2c4a"; }}
      onBlur={e  => { e.currentTarget.style.borderColor = BD;  e.currentTarget.style.background = S3; }}
    />
  );
}

function StyledSelect({ value, onChange, options }: {
  value: string; onChange: (v: string) => void; options: { value: string; label: string; color: string }[];
}) {
  const selected = options.find(o => o.value === value);
  return (
    <div className="relative">
      <select value={value} onChange={e => onChange(e.target.value)}
        className="w-full appearance-none rounded-xl px-4 py-3.5 pr-10 text-sm font-bold focus:outline-none transition-all duration-150 cursor-pointer"
        style={{ background: S3, border: `1px solid ${BD}`, color: selected?.color ?? T1 }}
        onFocus={e => { e.currentTarget.style.borderColor = ACL; }}
        onBlur={e  => { e.currentTarget.style.borderColor = BD; }}>
        {options.map(o => (
          <option key={o.value} value={o.value} style={{ background: S1, color: "#fff" }}>{o.label}</option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: T3 }} />
    </div>
  );
}

function StatusToggle({ value, onChange }: { value: Status; onChange: (s: Status) => void }) {
  return (
    <div className="flex gap-2">
      {(["published","draft"] as Status[]).map(s => {
        const active      = value === s;
        const isPublished = s === "published";
        const color  = isPublished ? "#34d399" : T2;
        const activeBg  = isPublished ? "#062d1e" : S2;
        const activeBdr = isPublished ? "rgba(52,211,153,0.4)" : BDL;
        return (
          <button key={s} type="button" onClick={() => onChange(s)}
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold transition-all duration-150 flex-1 justify-center"
            style={{
              background: active ? activeBg : S2,
              border:     `1px solid ${active ? activeBdr : BD}`,
              color:      active ? color : T3,
            }}>
            {isPublished ? <Globe className="w-3.5 h-3.5" /> : <FileX2 className="w-3.5 h-3.5" />}
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        );
      })}
    </div>
  );
}

function PrimaryBtn({ type="button", loading, icon, label, loadingLabel, danger, onClick }: {
  type?: "button"|"submit"; loading: boolean; icon: React.ReactNode; label: string;
  loadingLabel: string; danger?: boolean; onClick?: () => void;
}) {
  const bg   = danger ? "linear-gradient(135deg,#dc2626,#ef4444)" : ACG2;
  const glow = danger ? "rgba(239,68,68,0.35)" : "rgba(124,58,237,0.4)";
  return (
    <button type={type} disabled={loading} onClick={onClick}
      className="flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-black text-white transition-all duration-150 disabled:opacity-50 whitespace-nowrap"
      style={{ background: bg, boxShadow: `0 4px 16px ${glow}` }}
      onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
      {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : icon}
      {loading ? loadingLabel : label}
    </button>
  );
}

function GhostBtn({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick}
      className="px-5 py-3 rounded-xl text-xs font-bold transition-all duration-150"
      style={{ color: T2, background: S2, border: `1px solid ${BD}` }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = S3; (e.currentTarget as HTMLElement).style.color = T1; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = S2; (e.currentTarget as HTMLElement).style.color = T2; }}>
      {children}
    </button>
  );
}

function CloseBtn({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick}
      className="p-2 rounded-xl transition-all duration-150"
      style={{ color: T3, background: S2, border: `1px solid ${BD}` }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = T1; (e.currentTarget as HTMLElement).style.background = S3; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = T3; (e.currentTarget as HTMLElement).style.background = S2; }}>
      <X className="w-4 h-4" />
    </button>
  );
}

function ActionBtn({ children, label, color, hoverBg, onClick }: {
  children: React.ReactNode; label: string; color: string; hoverBg: string; onClick: () => void;
}) {
  return (
    <button onClick={onClick} title={label}
      className="p-2 rounded-lg transition-all duration-150"
      style={{ color: T3, background: "transparent" }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = color; (e.currentTarget as HTMLElement).style.background = hoverBg; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = T3; (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
      {children}
    </button>
  );
}

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="w-full max-w-lg rounded-2xl p-7 max-h-[90vh] overflow-y-auto"
        style={{ background: S1, border: `1px solid ${BDL}`, boxShadow: "0 32px 80px rgba(0,0,0,0.7)" }}>
        {children}
      </div>
    </div>
  );
}

function TableSkeleton() {
  const widths = ["55%","72%","63%","80%"];
  return (
    <ul>
      {[...Array(4)].map((_, i) => (
        <li key={i} className="grid gap-4 items-center px-5 py-4"
          style={{ gridTemplateColumns:"auto 1fr auto auto auto auto", borderBottom: i < 3 ? `1px solid ${BD}` : "none" }}>
          <div className="h-7 w-28 rounded-lg animate-pulse" style={{ background: S3 }} />
          <div className="h-4 rounded-lg animate-pulse" style={{ background: S3, width: widths[i] }} />
          <div className="h-6 w-16 rounded-lg animate-pulse" style={{ background: S3 }} />
          <div className="h-6 w-20 rounded-full animate-pulse" style={{ background: S3 }} />
          <div className="h-4 w-16 rounded-lg animate-pulse" style={{ background: S3 }} />
          <div className="flex gap-1.5 justify-center">
            <div className="h-7 w-7 rounded-lg animate-pulse" style={{ background: S3 }} />
            <div className="h-7 w-7 rounded-lg animate-pulse" style={{ background: S3 }} />
          </div>
        </li>
      ))}
    </ul>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="p-5 rounded-3xl" style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.25)" }}>
        <Zap className="w-8 h-8" style={{ color: ACL }} />
      </div>
      <div className="text-center space-y-1">
        <p className="text-sm font-bold" style={{ color: T1 }}>No questions yet</p>
        <p className="text-xs" style={{ color: T3 }}>Add your first question using the form above.</p>
      </div>
    </div>
  );
}

function LogSkeleton() {
  return (
    <ul>
      {[...Array(5)].map((_, i) => (
        <li key={i} className="flex items-start gap-4 px-5 py-4"
          style={{ borderBottom: i < 4 ? `1px solid ${BD}` : "none" }}>
          <div className="w-8 h-8 rounded-xl shrink-0 animate-pulse" style={{ background: S3 }} />
          <div className="flex-1 space-y-2 pt-0.5">
            <div className="h-3.5 rounded-lg animate-pulse" style={{ background: S3, width: `${50+(i*9)%35}%` }} />
            <div className="h-3 rounded-lg animate-pulse w-28" style={{ background: S2 }} />
          </div>
        </li>
      ))}
    </ul>
  );
}

function LogEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-14 gap-3">
      <div className="p-3.5 rounded-2xl" style={{ background: S2, border: `1px solid ${BD}` }}>
        <Clock className="w-5 h-5" style={{ color: T3 }} />
      </div>
      <p className="text-sm" style={{ color: T3 }}>No activity yet</p>
    </div>
  );
}
