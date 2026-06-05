"use client";

import { useState, useEffect } from "react";

export function ExamCountdown() {
  const [examDate, setExamDate] = useState<string>("");
  const [editing, setEditing]   = useState(false);
  const [input,   setInput]     = useState("");

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("ielts-exam-date");
    if (saved) setExamDate(saved);
  }, []);

  function save() {
    if (!input) return;
    localStorage.setItem("ielts-exam-date", input);
    setExamDate(input);
    setEditing(false);
    setInput("");
  }

  function clear() {
    localStorage.removeItem("ielts-exam-date");
    setExamDate("");
  }

  const daysLeft = examDate
    ? Math.ceil((new Date(examDate).getTime() - Date.now()) / 86_400_000)
    : null;

  const urgency =
    daysLeft === null ? "blue" :
    daysLeft <= 7     ? "#dc2626" :
    daysLeft <= 21    ? "#d97706" : "#2563eb";

  if (editing) {
    return (
      <div style={{
        background: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px",
        padding: "16px 20px", display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap",
      }}>
        <span style={{ fontSize: "13px", fontWeight: 600, color: "#0f172a" }}>📅 My exam date:</span>
        <input
          type="date"
          value={input}
          onChange={e => setInput(e.target.value)}
          style={{
            border: "1px solid #e2e8f0", borderRadius: "5px", padding: "5px 10px",
            fontSize: "13px", color: "#0f172a", outline: "none",
          }}
          min={new Date().toISOString().slice(0, 10)}
        />
        <button onClick={save}
          style={{ background: "#2563eb", color: "#fff", border: "none", borderRadius: "5px", padding: "6px 14px", fontSize: "12.5px", fontWeight: 600, cursor: "pointer" }}>
          Save
        </button>
        <button onClick={() => setEditing(false)}
          style={{ background: "none", border: "none", color: "#94a3b8", fontSize: "12px", cursor: "pointer" }}>
          Cancel
        </button>
      </div>
    );
  }

  if (!examDate || daysLeft === null) {
    return (
      <button onClick={() => setEditing(true)} style={{
        width: "100%", background: "#fff", border: "1px dashed #cbd5e1", borderRadius: "8px",
        padding: "14px 20px", display: "flex", alignItems: "center", gap: "10px",
        cursor: "pointer", color: "#64748b", fontSize: "13px", fontWeight: 500,
      }}>
        <span>📅</span>
        Set your exam date — see a countdown every time you log in
      </button>
    );
  }

  if (daysLeft < 0) {
    return (
      <div style={{
        background: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: "8px",
        padding: "14px 20px", display: "flex", alignItems: "center", gap: "10px",
      }}>
        <span style={{ fontSize: "20px" }}>🎓</span>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: "13px", fontWeight: 600, color: "#0f172a" }}>Exam date has passed</p>
          <p style={{ fontSize: "12px", color: "#64748b" }}>How did it go? Set a new exam date to keep practising.</p>
        </div>
        <button onClick={clear} style={{ background: "none", border: "none", color: "#94a3b8", fontSize: "12px", cursor: "pointer" }}>✕</button>
      </div>
    );
  }

  return (
    <div style={{
      background: "#fff", border: `1px solid ${urgency}40`,
      borderLeft: `4px solid ${urgency}`,
      borderRadius: "8px", padding: "14px 20px",
      display: "flex", alignItems: "center", gap: "14px",
    }}>
      <div style={{
        width: "52px", height: "52px", borderRadius: "8px", background: `${urgency}12`,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        <span style={{ fontSize: "22px", fontWeight: 800, color: urgency, lineHeight: 1 }}>{daysLeft}</span>
        <span style={{ fontSize: "9px", fontWeight: 700, color: urgency, textTransform: "uppercase", letterSpacing: "0.5px" }}>days</span>
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: "14px", fontWeight: 700, color: "#0f172a", marginBottom: "2px" }}>
          {daysLeft <= 7 ? "⚠️ Exam is very soon!" : daysLeft <= 21 ? "📚 Final push!" : "🎯 Exam countdown"}
        </p>
        <p style={{ fontSize: "12px", color: "#64748b" }}>
          {new Date(examDate).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          {" · "}{daysLeft <= 7 ? "Practise every day now" : daysLeft <= 21 ? "3+ sessions per week" : "Stay consistent"}
        </p>
      </div>
      <button onClick={() => setEditing(true)}
        style={{ background: "none", border: "1px solid #e2e8f0", borderRadius: "5px", padding: "5px 10px", fontSize: "12px", color: "#64748b", cursor: "pointer" }}>
        Edit
      </button>
    </div>
  );
}
