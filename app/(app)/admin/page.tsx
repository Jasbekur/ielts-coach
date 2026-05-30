"use client";

import { useState, useEffect, useCallback } from "react";
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
  Mic,
  BookMarked,
  FileText,
  AlertTriangle,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { ProtectedAdminRoute } from "@/components/shared/ProtectedAdminRoute";
import { toast } from "sonner";

// ── Types ────────────────────────────────────────────────────────────────────

type QuestionType = "writing_task1" | "writing_task2" | "speaking" | "reading";

interface Question {
  id: string;
  title: string;
  type: QuestionType;
  content: Record<string, unknown>;
  created_at: string;
}

// ── Constants ────────────────────────────────────────────────────────────────

const QUESTION_TYPES: { value: QuestionType; label: string; icon: React.ElementType; color: string }[] = [
  { value: "writing_task1", label: "Writing Task 1", icon: FileText,  color: "#0ea5e9" },
  { value: "writing_task2", label: "Writing Task 2", icon: BookOpen,  color: "#10b981" },
  { value: "speaking",      label: "Speaking",       icon: Mic,       color: "#f59e0b" },
  { value: "reading",       label: "Reading",        icon: BookMarked,color: "#8b5cf6" },
];

function typeConfig(type: QuestionType) {
  return QUESTION_TYPES.find(t => t.value === type) ?? QUESTION_TYPES[0];
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    day:   "numeric",
    month: "short",
    year:  "numeric",
  });
}

// ── Main page ────────────────────────────────────────────────────────────────

export default function AdminPage() {
  return (
    <ProtectedAdminRoute>
      <AdminContent />
    </ProtectedAdminRoute>
  );
}

// ── Inner content (only renders once role confirmed) ─────────────────────────

function AdminContent() {
  const supabase = createClient();

  // ── Questions state ──
  const [questions, setQuestions]       = useState<Question[]>([]);
  const [loadingList, setLoadingList]   = useState(true);

  // ── Add-form state ──
  const [formType,    setFormType]    = useState<QuestionType>("writing_task2");
  const [formTitle,   setFormTitle]   = useState("");
  const [formContent, setFormContent] = useState("");
  const [submitting,  setSubmitting]  = useState(false);

  // ── Edit modal state ──
  const [editItem,       setEditItem]       = useState<Question | null>(null);
  const [editTitle,      setEditTitle]      = useState("");
  const [editContent,    setEditContent]    = useState("");
  const [editSubmitting, setEditSubmitting] = useState(false);

  // ── Delete confirm state ──
  const [deleteTarget, setDeleteTarget] = useState<Question | null>(null);
  const [deleting,     setDeleting]     = useState(false);

  // ── Fetch questions ──────────────────────────────────────────────────────

  const fetchQuestions = useCallback(async () => {
    setLoadingList(true);
    const { data, error } = await supabase
      .from("test_materials")
      .select("id, title, type, content, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load questions: " + error.message);
    } else {
      setQuestions((data as Question[]) ?? []);
    }
    setLoadingList(false);
  }, [supabase]);

  useEffect(() => { fetchQuestions(); }, [fetchQuestions]);

  // ── Add question ─────────────────────────────────────────────────────────

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!formTitle.trim()) return toast.error("Title is required.");

    let parsed: Record<string, unknown> = {};
    if (formContent.trim()) {
      try { parsed = JSON.parse(formContent); }
      catch { return toast.error("Content must be valid JSON (or leave it empty)."); }
    }

    setSubmitting(true);
    const { error } = await supabase.from("test_materials").insert({
      title:   formTitle.trim(),
      type:    formType,
      content: parsed,
    });

    if (error) {
      toast.error("Failed to add question: " + error.message);
    } else {
      toast.success("Question added!");
      setFormTitle("");
      setFormContent("");
      fetchQuestions();
    }
    setSubmitting(false);
  }

  // ── Open edit modal ──────────────────────────────────────────────────────

  function openEdit(q: Question) {
    setEditItem(q);
    setEditTitle(q.title);
    setEditContent(Object.keys(q.content).length ? JSON.stringify(q.content, null, 2) : "");
  }

  // ── Save edit ────────────────────────────────────────────────────────────

  async function handleEditSave(e: React.FormEvent) {
    e.preventDefault();
    if (!editItem || !editTitle.trim()) return toast.error("Title is required.");

    let parsed: Record<string, unknown> = {};
    if (editContent.trim()) {
      try { parsed = JSON.parse(editContent); }
      catch { return toast.error("Content must be valid JSON (or leave it empty)."); }
    }

    setEditSubmitting(true);
    const { error } = await supabase
      .from("test_materials")
      .update({ title: editTitle.trim(), content: parsed })
      .eq("id", editItem.id);

    if (error) {
      toast.error("Failed to save: " + error.message);
    } else {
      toast.success("Question updated!");
      setEditItem(null);
      fetchQuestions();
    }
    setEditSubmitting(false);
  }

  // ── Delete ───────────────────────────────────────────────────────────────

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    const { error } = await supabase
      .from("test_materials")
      .delete()
      .eq("id", deleteTarget.id);

    if (error) {
      toast.error("Failed to delete: " + error.message);
    } else {
      toast.success("Question deleted.");
      setDeleteTarget(null);
      fetchQuestions();
    }
    setDeleting(false);
  }

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="space-y-8">

      {/* ── Breadcrumb ── */}
      <div className="flex items-center gap-1.5 text-sm">
        <Link
          href="/dashboard"
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

      {/* ── Page header ── */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Content Manager</h1>
        <p className="mt-1 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
          Add and manage practice questions for students.
        </p>
      </div>

      {/* ════════════════════════════════════════
          SECTION 1 — Add New Question
      ════════════════════════════════════════ */}
      <section>
        <SectionHeading number="1" title="Add New Question" />

        <form onSubmit={handleAdd} className="mt-4 rounded-2xl p-6 space-y-5"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>

          {/* Type pills */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "rgba(255,255,255,0.4)" }}>
              Question Type
            </label>
            <div className="flex flex-wrap gap-2">
              {QUESTION_TYPES.map(({ value, label, icon: Icon, color }) => {
                const active = formType === value;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setFormType(value)}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-150"
                    style={{
                      background: active ? `${color}22` : "rgba(255,255,255,0.05)",
                      border:     `1px solid ${active ? color + "55" : "rgba(255,255,255,0.08)"}`,
                      color:      active ? color : "rgba(255,255,255,0.5)",
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest mb-2"
              style={{ color: "rgba(255,255,255,0.4)" }}>
              Question Title / Prompt
            </label>
            <textarea
              value={formTitle}
              onChange={e => setFormTitle(e.target.value)}
              rows={3}
              placeholder="e.g. The chart below shows the percentage of adults who…"
              className="w-full rounded-xl px-4 py-3 text-sm text-white resize-none focus:outline-none transition-colors"
              style={{
                background:  "rgba(255,255,255,0.06)",
                border:      "1px solid rgba(255,255,255,0.1)",
                caretColor:  "#7c3aed",
              }}
              onFocus={e  => (e.currentTarget.style.borderColor = "rgba(124,58,237,0.5)")}
              onBlur={e   => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
            />
          </div>

          {/* Content JSON */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest mb-2"
              style={{ color: "rgba(255,255,255,0.4)" }}>
              Content <span style={{ color: "rgba(255,255,255,0.25)", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(optional JSON — e.g. image URLs, passages, sub-questions)</span>
            </label>
            <textarea
              value={formContent}
              onChange={e => setFormContent(e.target.value)}
              rows={4}
              placeholder={'{\n  "image_url": "https://…",\n  "hint": "Describe the trend…"\n}'}
              className="w-full rounded-xl px-4 py-3 text-sm resize-none focus:outline-none transition-colors font-mono"
              style={{
                background:  "rgba(255,255,255,0.04)",
                border:      "1px solid rgba(255,255,255,0.08)",
                color:       "rgba(255,255,255,0.6)",
                caretColor:  "#7c3aed",
              }}
              onFocus={e  => (e.currentTarget.style.borderColor = "rgba(124,58,237,0.4)")}
              onBlur={e   => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-150 disabled:opacity-50"
            style={{ background: "#7c3aed", boxShadow: "0 4px 14px rgba(124,58,237,0.3)" }}
          >
            {submitting
              ? <Loader2 className="w-4 h-4 animate-spin" />
              : <Plus className="w-4 h-4" />}
            {submitting ? "Adding…" : "Add Question"}
          </button>
        </form>
      </section>

      {/* ════════════════════════════════════════
          SECTION 2 — Manage Questions
      ════════════════════════════════════════ */}
      <section className="pb-8">
        <div className="flex items-center justify-between">
          <SectionHeading number="2" title="Manage Questions" />
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ background: "rgba(124,58,237,0.15)", color: "#a78bfa" }}>
            {questions.length} total
          </span>
        </div>

        <div className="mt-4 rounded-2xl overflow-hidden"
          style={{ border: "1px solid rgba(255,255,255,0.08)" }}>

          {/* Table header */}
          <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-5 py-3 text-[11px] font-bold uppercase tracking-widest"
            style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.3)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <span>Question</span>
            <span className="text-center">Type</span>
            <span className="text-center">Added</span>
            <span className="text-center">Actions</span>
          </div>

          {/* Rows */}
          {loadingList ? (
            <TableSkeleton />
          ) : questions.length === 0 ? (
            <EmptyState />
          ) : (
            <ul>
              {questions.map((q, i) => {
                const cfg = typeConfig(q.type);
                const Icon = cfg.icon;
                return (
                  <li
                    key={q.id}
                    className="grid grid-cols-[1fr_auto_auto_auto] gap-4 items-center px-5 py-4 transition-colors"
                    style={{
                      borderBottom: i < questions.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                      background: "transparent",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                  >
                    {/* Title */}
                    <p className="text-sm font-medium text-white leading-snug line-clamp-2 pr-2">
                      {q.title}
                    </p>

                    {/* Type badge */}
                    <span
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap"
                      style={{
                        background: `${cfg.color}18`,
                        color:      cfg.color,
                        border:     `1px solid ${cfg.color}30`,
                      }}
                    >
                      <Icon className="w-3 h-3" />
                      {cfg.label}
                    </span>

                    {/* Date */}
                    <span className="text-xs whitespace-nowrap text-center"
                      style={{ color: "rgba(255,255,255,0.35)" }}>
                      {formatDate(q.created_at)}
                    </span>

                    {/* Actions */}
                    <div className="flex items-center gap-1.5">
                      <ActionBtn
                        label="Edit"
                        color="#0ea5e9"
                        onClick={() => openEdit(q)}
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </ActionBtn>
                      <ActionBtn
                        label="Delete"
                        color="#ef4444"
                        onClick={() => setDeleteTarget(q)}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </ActionBtn>
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
          <form onSubmit={handleEditSave} className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold text-white">Edit Question</h2>
              <button type="button" onClick={() => setEditItem(null)}
                className="p-1.5 rounded-lg transition-colors"
                style={{ color: "rgba(255,255,255,0.4)" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Type badge (read-only in edit) */}
            <div className="flex items-center gap-2">
              {(() => { const cfg = typeConfig(editItem.type); const Icon = cfg.icon; return (
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold"
                  style={{ background: `${cfg.color}18`, color: cfg.color, border: `1px solid ${cfg.color}30` }}>
                  <Icon className="w-3 h-3" />{cfg.label}
                </span>
              ); })()}
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>type cannot be changed</span>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest mb-2"
                style={{ color: "rgba(255,255,255,0.4)" }}>Title / Prompt</label>
              <textarea
                value={editTitle}
                onChange={e => setEditTitle(e.target.value)}
                rows={3}
                className="w-full rounded-xl px-4 py-3 text-sm text-white resize-none focus:outline-none"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", caretColor: "#7c3aed" }}
                onFocus={e  => (e.currentTarget.style.borderColor = "rgba(124,58,237,0.5)")}
                onBlur={e   => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest mb-2"
                style={{ color: "rgba(255,255,255,0.4)" }}>Content JSON</label>
              <textarea
                value={editContent}
                onChange={e => setEditContent(e.target.value)}
                rows={5}
                className="w-full rounded-xl px-4 py-3 text-sm resize-none focus:outline-none font-mono"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)", caretColor: "#7c3aed" }}
                onFocus={e  => (e.currentTarget.style.borderColor = "rgba(124,58,237,0.4)")}
                onBlur={e   => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
              />
            </div>

            <div className="flex gap-3 pt-1">
              <button type="submit" disabled={editSubmitting}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-50"
                style={{ background: "#7c3aed", boxShadow: "0 4px 14px rgba(124,58,237,0.25)" }}>
                {editSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Pencil className="w-4 h-4" />}
                {editSubmitting ? "Saving…" : "Save Changes"}
              </button>
              <button type="button" onClick={() => setEditItem(null)}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
                style={{ color: "rgba(255,255,255,0.5)", background: "rgba(255,255,255,0.06)" }}>
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* ── Delete Confirm Modal ── */}
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
                  This will permanently remove:
                </p>
                <p className="mt-2 text-sm font-medium text-white line-clamp-2 leading-snug">
                  "{deleteTarget.title}"
                </p>
              </div>
            </div>

            <div className="flex gap-3 pt-1">
              <button onClick={handleDelete} disabled={deleting}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-50"
                style={{ background: "#ef4444", boxShadow: "0 4px 14px rgba(239,68,68,0.25)" }}>
                {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                {deleting ? "Deleting…" : "Yes, delete"}
              </button>
              <button onClick={() => setDeleteTarget(null)}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
                style={{ color: "rgba(255,255,255,0.5)", background: "rgba(255,255,255,0.06)" }}>
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── Sub-components ───────────────────────────────────────────────────────────

function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black text-white shrink-0"
        style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}
      >
        {number}
      </span>
      <h2 className="text-base font-bold text-white">{title}</h2>
    </div>
  );
}

function ActionBtn({
  children,
  label,
  color,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  color: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      title={label}
      className="p-2 rounded-lg transition-all duration-150"
      style={{ color: "rgba(255,255,255,0.35)", background: "transparent" }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.color      = color;
        (e.currentTarget as HTMLElement).style.background = `${color}18`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.color      = "rgba(255,255,255,0.35)";
        (e.currentTarget as HTMLElement).style.background = "transparent";
      }}
    >
      {children}
    </button>
  );
}

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full max-w-lg rounded-2xl p-6"
        style={{
          background: "#1a1625",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 24px 48px rgba(0,0,0,0.5)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function TableSkeleton() {
  return (
    <ul>
      {[...Array(4)].map((_, i) => (
        <li key={i} className="grid grid-cols-[1fr_auto_auto_auto] gap-4 items-center px-5 py-4"
          style={{ borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
          <div className="h-4 rounded-md animate-pulse" style={{ background: "rgba(255,255,255,0.06)", width: `${60 + (i * 7) % 30}%` }} />
          <div className="h-6 w-24 rounded-lg animate-pulse" style={{ background: "rgba(255,255,255,0.06)" }} />
          <div className="h-4 w-16 rounded-md animate-pulse" style={{ background: "rgba(255,255,255,0.06)" }} />
          <div className="flex gap-1.5">
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
