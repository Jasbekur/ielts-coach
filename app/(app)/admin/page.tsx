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

// ── Lookup maps ───────────────────────────────────────────────────────────────

const TYPE_OPTIONS: { value: QuestionType; label: string; icon: React.ElementType; color: string }[] = [
  { value: "writing_task1", label: "Task 1 Academic", icon: FileText,  color: "#0ea5e9" },
  { value: "writing_task2", label: "Task 2 Essay",    icon: BookOpen,  color: "#10b981" },
];

const DIFFICULTY_OPTIONS: { value: Difficulty; label: string; color: string }[] = [
  { value: "band_5_6", label: "Band 5–6", color: "#f59e0b" },
  { value: "band_6_7", label: "Band 6–7", color: "#10b981" },
  { value: "band_7_8", label: "Band 7–8", color: "#0ea5e9" },
  { value: "band_8_9", label: "Band 8–9", color: "#8b5cf6" },
];

const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  band_5_6: "Band 5–6",
  band_6_7: "Band 6–7",
  band_7_8: "Band 7–8",
  band_8_9: "Band 8–9",
};

const DIFFICULTY_COLOR: Record<Difficulty, string> = {
  band_5_6: "#f59e0b",
  band_6_7: "#10b981",
  band_7_8: "#0ea5e9",
  band_8_9: "#8b5cf6",
};

function typeConfig(type: QuestionType) {
  return TYPE_OPTIONS.find(t => t.value === type) ?? TYPE_OPTIONS[0];
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    day: "numeric", month: "short", year: "numeric",
  });
}

const STORAGE_BUCKET = "question-images";

// ── Root page ─────────────────────────────────────────────────────────────────

export default function AdminPage() {
  return (
    <ProtectedAdminRoute>
      <AdminContent />
    </ProtectedAdminRoute>
  );
}

// ── Admin content ─────────────────────────────────────────────────────────────

function AdminContent() {
  const supabase = createClient();
  const { isAdmin } = useUserRole();

  // questions list
  const [questions,   setQuestions]   = useState<Question[]>([]);
  const [loadingList, setLoadingList] = useState(true);

  // edit modal
  const [editItem,       setEditItem]       = useState<Question | null>(null);
  const [editTitle,      setEditTitle]      = useState("");
  const [editDifficulty, setEditDifficulty] = useState<Difficulty>("band_6_7");
  const [editStatus,     setEditStatus]     = useState<Status>("draft");
  const [editSubmitting, setEditSubmitting] = useState(false);

  // delete confirm
  const [deleteTarget, setDeleteTarget] = useState<Question | null>(null);
  const [deleting,     setDeleting]     = useState(false);

  // ── Fetch ──────────────────────────────────────────────────────────────────

  const fetchQuestions = useCallback(async () => {
    setLoadingList(true);
    const { data, error } = await supabase
      .from("test_materials")
      .select("id, title, type, content, created_at")
      .in("type", ["writing_task1", "writing_task2"])
      .order("created_at", { ascending: false });

    if (error) toast.error("Failed to load questions: " + error.message);
    else       setQuestions((data as Question[]) ?? []);
    setLoadingList(false);
  }, [supabase]);

  useEffect(() => { fetchQuestions(); }, [fetchQuestions]);

  // ── Open edit modal ────────────────────────────────────────────────────────

  function openEdit(q: Question) {
    setEditItem(q);
    setEditTitle(q.title);
    setEditDifficulty(q.content?.difficulty ?? "band_6_7");
    setEditStatus(q.content?.status ?? "draft");
  }

  // ── Save edit ──────────────────────────────────────────────────────────────

  async function handleEditSave(e: React.FormEvent) {
    e.preventDefault();
    if (!editItem || !editTitle.trim()) return toast.error("Question text is required.");

    setEditSubmitting(true);
    const { error } = await supabase
      .from("test_materials")
      .update({
        title:   editTitle.trim(),
        content: {
          ...editItem.content,
          difficulty: editDifficulty,
          status:     editStatus,
        },
      })
      .eq("id", editItem.id);

    if (error) toast.error("Failed to save: " + error.message);
    else { toast.success("Question updated!"); setEditItem(null); fetchQuestions(); }
    setEditSubmitting(false);
  }

  // ── Delete ─────────────────────────────────────────────────────────────────

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);

    // Also remove image from storage if present
    const imgUrl = deleteTarget.content?.image_url;
    if (imgUrl) {
      const path = imgUrl.split(`/${STORAGE_BUCKET}/`)[1];
      if (path) await supabase.storage.from(STORAGE_BUCKET).remove([path]);
    }

    const { error } = await supabase
      .from("test_materials")
      .delete()
      .eq("id", deleteTarget.id);

    if (error) toast.error("Failed to delete: " + error.message);
    else { toast.success("Question deleted."); setDeleteTarget(null); fetchQuestions(); }
    setDeleting(false);
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-8">

      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-sm">
        <Link href="/dashboard"
          className="flex items-center gap-1.5 font-medium transition-colors"
          style={{ color: "rgba(255,255,255,0.45)" }}
          onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          Dashboard
        </Link>
        <ChevronRight className="w-3.5 h-3.5" style={{ color: "rgba(255,255,255,0.2)" }} />
        <span className="flex items-center gap-1.5 font-semibold text-white">
          <ShieldCheck className="w-3.5 h-3.5" style={{ color: "#7c3aed" }} />
          Content Manager
        </span>
      </div>

      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Content Manager</h1>
        <p className="mt-1 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
          Add and manage Writing practice questions for students.
        </p>
      </div>

      {/* ── Section 1: Add New Question ── */}
      <section>
        <SectionHeading number="1" title="Add New Question" />
        <AddQuestionForm onSuccess={fetchQuestions} />
      </section>

      {/* ── Section 2: Manage Questions ── */}
      <section className="pb-8">
        <div className="flex items-center justify-between">
          <SectionHeading number="2" title="Manage Questions" />
          <div className="flex items-center gap-2">
            {!isAdmin && (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                style={{ background: "rgba(245,158,11,0.12)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.2)" }}>
                Editor — read &amp; add only
              </span>
            )}
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ background: "rgba(124,58,237,0.15)", color: "#a78bfa" }}>
              {questions.length} total
            </span>
          </div>
        </div>

        <div className="mt-4 rounded-2xl overflow-hidden"
          style={{ border: "1px solid rgba(255,255,255,0.08)" }}>

          {/* Table header — 6 cols: Type | Question | Difficulty | Status | Date | Actions */}
          <div className="grid gap-3 px-5 py-3 text-[11px] font-bold uppercase tracking-widest"
            style={{
              gridTemplateColumns: "auto 1fr auto auto auto auto",
              background: "rgba(255,255,255,0.04)",
              color: "rgba(255,255,255,0.3)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}>
            <span>Type</span>
            <span>Question</span>
            <span className="text-center">Difficulty</span>
            <span className="text-center">Status</span>
            <span className="text-center">Date added</span>
            <span className="text-center">Actions</span>
          </div>

          {loadingList ? <TableSkeleton /> : questions.length === 0 ? <EmptyState /> : (
            <ul>
              {questions.map((q, i) => {
                const cfg         = typeConfig(q.type);
                const Icon        = cfg.icon;
                const diff        = q.content?.difficulty;
                const diffLabel   = diff ? DIFFICULTY_LABEL[diff] : "—";
                const diffColor   = diff ? DIFFICULTY_COLOR[diff] : "rgba(255,255,255,0.3)";
                const isPublished = q.content?.status === "published";
                const preview     = q.title.length > 60
                  ? q.title.slice(0, 60).trimEnd() + "…"
                  : q.title;

                return (
                  <li key={q.id}
                    className="grid gap-3 items-center px-5 py-4 transition-colors"
                    style={{
                      gridTemplateColumns: "auto 1fr auto auto auto auto",
                      borderBottom: i < questions.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                      background: "transparent",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                  >
                    {/* Col 1 — Type badge */}
                    <span
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap"
                      style={{ background: `${cfg.color}18`, color: cfg.color, border: `1px solid ${cfg.color}30` }}
                    >
                      <Icon className="w-3 h-3" />
                      {cfg.label}
                    </span>

                    {/* Col 2 — Question preview (60 chars) + optional thumbnail */}
                    <div className="flex items-center gap-2.5 min-w-0">
                      {q.content?.image_url && (
                        <div className="w-7 h-7 rounded-md overflow-hidden shrink-0 border"
                          style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={q.content.image_url} alt="" className="w-full h-full object-cover" />
                        </div>
                      )}
                      <p className="text-sm text-white leading-snug truncate" title={q.title}>
                        {preview}
                      </p>
                    </div>

                    {/* Col 3 — Difficulty */}
                    <span
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-lg whitespace-nowrap text-center"
                      style={{ color: diffColor, background: `${diffColor}15`, border: `1px solid ${diffColor}25` }}
                    >
                      {diffLabel}
                    </span>

                    {/* Col 4 — Status */}
                    <span
                      className="flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap"
                      style={{
                        background: isPublished ? "rgba(16,185,129,0.12)" : "rgba(255,255,255,0.06)",
                        color:      isPublished ? "#10b981"               : "rgba(255,255,255,0.4)",
                        border:     `1px solid ${isPublished ? "rgba(16,185,129,0.25)" : "rgba(255,255,255,0.08)"}`,
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: isPublished ? "#10b981" : "rgba(255,255,255,0.3)" }} />
                      {isPublished ? "Published" : "Draft"}
                    </span>

                    {/* Col 5 — Date added */}
                    <span
                      className="text-[11px] whitespace-nowrap text-center tabular-nums"
                      style={{ color: "rgba(255,255,255,0.35)" }}
                    >
                      {formatDate(q.created_at)}
                    </span>

                    {/* Col 6 — Actions (Delete hidden for editors) */}
                    <div className="flex items-center gap-1 justify-center">
                      <ActionBtn label="Edit" color="#0ea5e9" onClick={() => openEdit(q)}>
                        <Pencil className="w-3.5 h-3.5" />
                      </ActionBtn>
                      {isAdmin && (
                        <ActionBtn label="Delete" color="#ef4444" onClick={() => setDeleteTarget(q)}>
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

      {/* ── Edit Modal ── */}
      {editItem && (
        <Modal onClose={() => setEditItem(null)}>
          <form onSubmit={handleEditSave} className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">Edit Question</h2>
              <CloseBtn onClick={() => setEditItem(null)} />
            </div>

            {/* Type badge (read-only) */}
            <div className="flex items-center gap-2">
              {(() => { const cfg = typeConfig(editItem.type); const Icon = cfg.icon; return (
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold"
                  style={{ background: `${cfg.color}18`, color: cfg.color, border: `1px solid ${cfg.color}30` }}>
                  <Icon className="w-3 h-3" />{cfg.label}
                </span>
              ); })()}
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>type cannot be changed</span>
            </div>

            {/* Question text */}
            <FieldLabel label="Question Text">
              <StyledTextarea value={editTitle} onChange={e => setEditTitle(e.target.value)} rows={4} />
            </FieldLabel>

            {/* Difficulty + Status side by side */}
            <div className="grid grid-cols-2 gap-4">
              <FieldLabel label="Difficulty">
                <StyledSelect
                  value={editDifficulty}
                  onChange={v => setEditDifficulty(v as Difficulty)}
                  options={DIFFICULTY_OPTIONS}
                />
              </FieldLabel>
              <FieldLabel label="Status">
                <StatusToggle value={editStatus} onChange={setEditStatus} />
              </FieldLabel>
            </div>

            <div className="flex gap-3 pt-1">
              <PrimaryBtn type="submit" loading={editSubmitting} icon={<Pencil className="w-4 h-4" />} label="Save Changes" loadingLabel="Saving…" />
              <GhostBtn onClick={() => setEditItem(null)}>Cancel</GhostBtn>
            </div>
          </form>
        </Modal>
      )}

      {/* ── Delete Confirm ── */}
      {deleteTarget && (
        <Modal onClose={() => setDeleteTarget(null)}>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl shrink-0" style={{ background: "rgba(239,68,68,0.12)" }}>
                <AlertTriangle className="w-5 h-5" style={{ color: "#ef4444" }} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Delete Question?</h2>
                <p className="mt-1 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                  This will permanently remove the question{deleteTarget.content?.image_url ? " and its uploaded image" : ""}.
                </p>
                <p className="mt-2 text-sm font-medium text-white line-clamp-2 leading-snug">
                  &ldquo;{deleteTarget.title}&rdquo;
                </p>
              </div>
            </div>
            <div className="flex gap-3 pt-1">
              <PrimaryBtn onClick={handleDelete} loading={deleting} icon={<Trash2 className="w-4 h-4" />}
                label="Yes, delete" loadingLabel="Deleting…" danger />
              <GhostBtn onClick={() => setDeleteTarget(null)}>Cancel</GhostBtn>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── Add Question Form ─────────────────────────────────────────────────────────

function AddQuestionForm({ onSuccess }: { onSuccess: () => void }) {
  const supabase = createClient();
  const fileRef  = useRef<HTMLInputElement>(null);

  const [qType,      setQType]      = useState<QuestionType>("writing_task1");
  const [qText,      setQText]      = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("band_6_7");
  const [status,     setStatus]     = useState<Status>("draft");
  const [imageFile,  setImageFile]  = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading,  setUploading]  = useState(false);
  const [dragOver,   setDragOver]   = useState(false);

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

    // 1. Upload image if provided
    let imageUrl: string | undefined;
    if (imageFile) {
      const ext      = imageFile.name.split(".").pop() ?? "png";
      const filePath = `${crypto.randomUUID()}.${ext}`;
      const { error: uploadErr } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(filePath, imageFile, { contentType: imageFile.type, upsert: false });

      if (uploadErr) {
        setUploading(false);
        return toast.error("Image upload failed: " + uploadErr.message);
      }

      const { data: urlData } = supabase.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(filePath);
      imageUrl = urlData.publicUrl;
    }

    // 2. Insert row
    const content: QuestionContent = { difficulty, status, ...(imageUrl ? { image_url: imageUrl } : {}) };
    const { error } = await supabase.from("test_materials").insert({
      title:   qText.trim(),
      type:    qType,
      content,
    });

    setUploading(false);

    if (error) return toast.error("Failed to save question: " + error.message);

    toast.success("Question added!");
    setQText("");
    removeImage();
    setDifficulty("band_6_7");
    setStatus("draft");
    onSuccess();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 rounded-2xl p-6 space-y-6"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>

      {/* ── Row 1: Type + Difficulty ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

        {/* Question Type */}
        <FieldLabel label="Question Type">
          <div className="grid grid-cols-2 gap-2">
            {TYPE_OPTIONS.map(({ value, label, icon: Icon, color }) => {
              const active = qType === value;
              return (
                <button key={value} type="button" onClick={() => setQType(value)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150"
                  style={{
                    background: active ? `${color}20` : "rgba(255,255,255,0.04)",
                    border:     `1px solid ${active ? color + "50" : "rgba(255,255,255,0.08)"}`,
                    color:      active ? color : "rgba(255,255,255,0.45)",
                  }}>
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="leading-tight text-left">{label}</span>
                </button>
              );
            })}
          </div>
        </FieldLabel>

        {/* Difficulty */}
        <FieldLabel label="Difficulty">
          <StyledSelect
            value={difficulty}
            onChange={v => setDifficulty(v as Difficulty)}
            options={DIFFICULTY_OPTIONS}
          />
        </FieldLabel>
      </div>

      {/* ── Row 2: Question Text ── */}
      <FieldLabel label="Question Text">
        <StyledTextarea
          value={qText}
          onChange={e => setQText(e.target.value)}
          rows={5}
          placeholder={
            qType === "writing_task1"
              ? "The chart below shows the percentage of adults in different countries who…\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant."
              : "Some people believe that universities should focus on teaching academic subjects, while others think they should prepare students for work. Discuss both views and give your own opinion."
          }
        />
      </FieldLabel>

      {/* ── Row 3: Image Upload ── */}
      <FieldLabel label={<>Chart or Diagram <span style={{ color: "rgba(255,255,255,0.25)", fontWeight: 400 }}>(optional · max 5 MB)</span></>}>
        {imagePreview ? (
          /* Preview */
          <div className="relative rounded-xl overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imagePreview} alt="Preview" className="w-full max-h-56 object-contain"
              style={{ background: "rgba(0,0,0,0.4)" }} />
            <button type="button" onClick={removeImage}
              className="absolute top-2 right-2 p-1.5 rounded-lg transition-all"
              style={{ background: "rgba(0,0,0,0.6)", color: "#f87171" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(239,68,68,0.3)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(0,0,0,0.6)")}>
              <X className="w-4 h-4" />
            </button>
            <div className="px-3 py-2 flex items-center gap-2"
              style={{ background: "rgba(0,0,0,0.4)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <FileX2 className="w-3.5 h-3.5 shrink-0" style={{ color: "rgba(255,255,255,0.4)" }} />
              <span className="text-xs truncate" style={{ color: "rgba(255,255,255,0.5)" }}>
                {imageFile?.name}
              </span>
            </div>
          </div>
        ) : (
          /* Drop zone */
          <div
            onClick={() => fileRef.current?.click()}
            onDragOver={e  => { e.preventDefault(); setDragOver(true);  }}
            onDragLeave={() => setDragOver(false)}
            onDrop={e => {
              e.preventDefault(); setDragOver(false);
              const f = e.dataTransfer.files[0];
              if (f) pickFile(f);
            }}
            className="flex flex-col items-center justify-center gap-2.5 py-8 rounded-xl cursor-pointer transition-all duration-150"
            style={{
              border:     `1.5px dashed ${dragOver ? "rgba(124,58,237,0.6)" : "rgba(255,255,255,0.12)"}`,
              background: dragOver ? "rgba(124,58,237,0.06)" : "rgba(255,255,255,0.02)",
            }}>
            <div className="p-3 rounded-xl" style={{ background: "rgba(124,58,237,0.1)" }}>
              <ImagePlus className="w-5 h-5" style={{ color: "#a78bfa" }} />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>
                Click to upload or drag &amp; drop
              </p>
              <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>
                PNG, JPG, WEBP, SVG
              </p>
            </div>
          </div>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={e => { const f = e.target.files?.[0]; if (f) pickFile(f); }}
        />
      </FieldLabel>

      {/* ── Row 4: Status ── */}
      <FieldLabel label="Status">
        <StatusToggle value={status} onChange={setStatus} />
      </FieldLabel>

      {/* ── Submit ── */}
      <div className="pt-1">
        <PrimaryBtn
          type="submit"
          loading={uploading}
          icon={<Plus className="w-4 h-4" />}
          label="Save Question"
          loadingLabel={imageFile ? "Uploading image…" : "Saving…"}
        />
      </div>
    </form>
  );
}

// ── Reusable primitives ───────────────────────────────────────────────────────

function FieldLabel({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold uppercase tracking-widest"
        style={{ color: "rgba(255,255,255,0.4)" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

function StyledTextarea({ value, onChange, rows = 4, placeholder }: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      rows={rows}
      placeholder={placeholder}
      className="w-full rounded-xl px-4 py-3 text-sm text-white resize-none focus:outline-none transition-colors placeholder:opacity-30"
      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", caretColor: "#7c3aed" }}
      onFocus={e => (e.currentTarget.style.borderColor = "rgba(124,58,237,0.5)")}
      onBlur={e  => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
    />
  );
}

function StyledSelect({ value, onChange, options }: {
  value:    string;
  onChange: (v: string) => void;
  options:  { value: string; label: string; color: string }[];
}) {
  const selected = options.find(o => o.value === value);
  return (
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full appearance-none rounded-xl px-4 py-3 pr-10 text-sm font-semibold focus:outline-none transition-colors cursor-pointer"
        style={{
          background:  "rgba(255,255,255,0.06)",
          border:      "1px solid rgba(255,255,255,0.1)",
          color:       selected?.color ?? "rgba(255,255,255,0.7)",
          caretColor:  "#7c3aed",
        }}
        onFocus={e => (e.currentTarget.style.borderColor = "rgba(124,58,237,0.5)")}
        onBlur={e  => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
      >
        {options.map(o => (
          <option key={o.value} value={o.value}
            style={{ background: "#1a1625", color: "#fff" }}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4"
        style={{ color: "rgba(255,255,255,0.3)" }} />
    </div>
  );
}

function StatusToggle({ value, onChange }: { value: Status; onChange: (s: Status) => void }) {
  return (
    <div className="flex gap-2">
      {(["published", "draft"] as Status[]).map(s => {
        const active     = value === s;
        const isPublished = s === "published";
        const color      = isPublished ? "#10b981" : "rgba(255,255,255,0.45)";
        const activeBg   = isPublished ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.08)";
        const activeBdr  = isPublished ? "rgba(16,185,129,0.35)" : "rgba(255,255,255,0.15)";
        return (
          <button key={s} type="button" onClick={() => onChange(s)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 flex-1 justify-center"
            style={{
              background: active ? activeBg  : "rgba(255,255,255,0.03)",
              border:     `1px solid ${active ? activeBdr : "rgba(255,255,255,0.07)"}`,
              color:      active ? color : "rgba(255,255,255,0.3)",
            }}>
            {isPublished
              ? <Globe   className="w-3.5 h-3.5" />
              : <FileX2  className="w-3.5 h-3.5" />}
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        );
      })}
    </div>
  );
}

function PrimaryBtn({ type = "button", loading, icon, label, loadingLabel, danger, onClick }: {
  type?:        "button" | "submit";
  loading:      boolean;
  icon:         React.ReactNode;
  label:        string;
  loadingLabel: string;
  danger?:      boolean;
  onClick?:     () => void;
}) {
  const bg  = danger ? "#ef4444" : "#7c3aed";
  const glow = danger ? "rgba(239,68,68,0.25)" : "rgba(124,58,237,0.3)";
  return (
    <button type={type} disabled={loading} onClick={onClick}
      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-50"
      style={{ background: bg, boxShadow: `0 4px 14px ${glow}` }}>
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : icon}
      {loading ? loadingLabel : label}
    </button>
  );
}

function GhostBtn({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick}
      className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
      style={{ color: "rgba(255,255,255,0.5)", background: "rgba(255,255,255,0.06)" }}>
      {children}
    </button>
  );
}

function CloseBtn({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick}
      className="p-1.5 rounded-lg transition-colors"
      style={{ color: "rgba(255,255,255,0.4)" }}
      onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
      <X className="w-4 h-4" />
    </button>
  );
}

function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black text-white shrink-0"
        style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}>
        {number}
      </span>
      <h2 className="text-base font-bold text-white">{title}</h2>
    </div>
  );
}

function ActionBtn({ children, label, color, onClick }: {
  children: React.ReactNode; label: string; color: string; onClick: () => void;
}) {
  return (
    <button onClick={onClick} title={label}
      className="p-2 rounded-lg transition-all duration-150"
      style={{ color: "rgba(255,255,255,0.35)", background: "transparent" }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.color      = color;
        (e.currentTarget as HTMLElement).style.background = `${color}18`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.color      = "rgba(255,255,255,0.35)";
        (e.currentTarget as HTMLElement).style.background = "transparent";
      }}>
      {children}
    </button>
  );
}

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="w-full max-w-lg rounded-2xl p-6 max-h-[90vh] overflow-y-auto"
        style={{ background: "#1a1625", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 24px 48px rgba(0,0,0,0.5)" }}>
        {children}
      </div>
    </div>
  );
}

function TableSkeleton() {
  const widths = ["55%", "72%", "63%", "80%"];
  return (
    <ul>
      {[...Array(4)].map((_, i) => (
        <li key={i}
          className="grid gap-3 items-center px-5 py-4"
          style={{
            gridTemplateColumns: "auto 1fr auto auto auto auto",
            borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none",
          }}>
          {/* Type */}
          <div className="h-6 w-24 rounded-lg animate-pulse" style={{ background: "rgba(255,255,255,0.06)" }} />
          {/* Question */}
          <div className="h-4 rounded-md animate-pulse" style={{ background: "rgba(255,255,255,0.06)", width: widths[i] }} />
          {/* Difficulty */}
          <div className="h-5 w-16 rounded-lg animate-pulse" style={{ background: "rgba(255,255,255,0.06)" }} />
          {/* Status */}
          <div className="h-6 w-20 rounded-full animate-pulse" style={{ background: "rgba(255,255,255,0.06)" }} />
          {/* Date */}
          <div className="h-4 w-16 rounded-md animate-pulse" style={{ background: "rgba(255,255,255,0.06)" }} />
          {/* Actions */}
          <div className="flex gap-1 justify-center">
            <div className="h-7 w-7 rounded-lg animate-pulse" style={{ background: "rgba(255,255,255,0.06)" }} />
            <div className="h-7 w-7 rounded-lg animate-pulse" style={{ background: "rgba(255,255,255,0.06)" }} />
          </div>
        </li>
      ))}
    </ul>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <div className="p-4 rounded-2xl" style={{ background: "rgba(124,58,237,0.1)" }}>
        <ShieldCheck className="w-8 h-8" style={{ color: "rgba(124,58,237,0.6)" }} />
      </div>
      <p className="text-sm font-semibold text-white">No questions yet</p>
      <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
        Use the form above to add your first question.
      </p>
    </div>
  );
}
