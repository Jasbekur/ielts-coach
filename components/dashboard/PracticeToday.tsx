"use client";

import Link from "next/link";

interface Attempt {
  mode: string;
  created_at: string;
  overall_band: number;
}

interface Props {
  attempts: Attempt[];
}

const SKILLS = [
  { mode: "writing",  label: "Writing",   emoji: "✍️", href: "/writing",  desc: "Task 1 & Task 2 — AI band score in 15 seconds" },
  { mode: "speaking", label: "Speaking",  emoji: "🎤", href: "/speaking", desc: "Part 1, 2 & 3 — AI pronunciation & fluency feedback" },
  { mode: "listening",label: "Listening", emoji: "🎧", href: "/listening",desc: "40 questions — Cambridge-style paper format" },
  { mode: "reading",  label: "Reading",   emoji: "📖", href: "/reading",  desc: "3 passages — 60 minute full mock" },
];

export function PracticeToday({ attempts }: Props) {
  // Find which skill was practiced least recently (or never)
  const lastPracticed: Record<string, Date | null> = {};
  SKILLS.forEach(s => { lastPracticed[s.mode] = null; });
  attempts.forEach(a => {
    const d = new Date(a.created_at);
    if (!lastPracticed[a.mode] || d > lastPracticed[a.mode]!) {
      lastPracticed[a.mode] = d;
    }
  });

  // Sort: null (never) first, then oldest
  const sorted = [...SKILLS].sort((a, b) => {
    const da = lastPracticed[a.mode];
    const db = lastPracticed[b.mode];
    if (!da && !db) return 0;
    if (!da) return -1;
    if (!db) return 1;
    return da.getTime() - db.getTime();
  });

  const primary   = sorted[0];
  const secondary = sorted[1];

  function daysAgo(mode: string): string {
    const d = lastPracticed[mode];
    if (!d) return "Never practiced";
    const days = Math.floor((Date.now() - d.getTime()) / 86400000);
    if (days === 0) return "Practiced today ✓";
    if (days === 1) return "1 day ago";
    return `${days} days ago`;
  }

  const primaryDays = lastPracticed[primary.mode]
    ? Math.floor((Date.now() - lastPracticed[primary.mode]!.getTime()) / 86400000)
    : null;

  return (
    <div style={{
      background: "#ffffff", border: "1px solid #e2e8f0",
      borderLeft: "4px solid #16a34a", borderRadius: "10px",
      padding: "18px 20px", marginBottom: "0",
    }}>
      <p style={{ fontSize: "11px", fontWeight: 700, color: "#16a34a", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>
        PRACTICE TODAY
      </p>

      {/* Primary recommendation */}
      <Link href={primary.href} style={{ textDecoration: "none" }}>
        <div style={{
          background: "#f0fdf4", border: "1px solid #dcfce7", borderRadius: "8px",
          padding: "14px 16px", marginBottom: "10px", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "24px" }}>{primary.emoji}</span>
            <div>
              <p style={{ fontSize: "14px", fontWeight: 700, color: "#0f172a", marginBottom: "2px" }}>
                {primary.label}
                {primaryDays !== null && primaryDays > 2 && (
                  <span style={{ fontSize: "11px", fontWeight: 400, color: "#dc2626", marginLeft: "8px" }}>
                    ⚠ {primaryDays} days without practice
                  </span>
                )}
              </p>
              <p style={{ fontSize: "12px", color: "#64748b" }}>{primary.desc}</p>
              <p style={{ fontSize: "11px", color: "#94a3b8", marginTop: "2px" }}>{daysAgo(primary.mode)}</p>
            </div>
          </div>
          <span style={{ fontSize: "18px", color: "#16a34a", fontWeight: 700, flexShrink: 0 }}>→</span>
        </div>
      </Link>

      {/* Secondary recommendation */}
      <div style={{ display: "flex", gap: "8px" }}>
        <Link href={secondary.href} style={{ flex: 1, textDecoration: "none" }}>
          <div style={{
            background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px",
            padding: "10px 12px", cursor: "pointer",
            display: "flex", alignItems: "center", gap: "8px",
          }}>
            <span style={{ fontSize: "18px" }}>{secondary.emoji}</span>
            <div>
              <p style={{ fontSize: "13px", fontWeight: 600, color: "#0f172a" }}>{secondary.label}</p>
              <p style={{ fontSize: "11px", color: "#94a3b8" }}>{daysAgo(secondary.mode)}</p>
            </div>
          </div>
        </Link>

        {/* Weakest score highlight */}
        {attempts.length > 0 && (() => {
          const byMode: Record<string, number[]> = {};
          attempts.forEach(a => {
            if (!byMode[a.mode]) byMode[a.mode] = [];
            byMode[a.mode].push(a.overall_band);
          });
          const avgByMode = Object.entries(byMode).map(([mode, bands]) => ({
            mode, avg: bands.reduce((s, b) => s + b, 0) / bands.length,
          }));
          const weakest = avgByMode.sort((a, b) => a.avg - b.avg)[0];
          const skill = SKILLS.find(s => s.mode === weakest?.mode);
          if (!skill || skill.mode === primary.mode) return null;
          return (
            <Link href={skill.href} style={{ flex: 1, textDecoration: "none" }}>
              <div style={{
                background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: "8px",
                padding: "10px 12px", cursor: "pointer",
              }}>
                <p style={{ fontSize: "11px", fontWeight: 700, color: "#d97706", marginBottom: "2px" }}>
                  WEAKEST SKILL
                </p>
                <p style={{ fontSize: "13px", fontWeight: 600, color: "#0f172a" }}>
                  {skill.emoji} {skill.label}
                </p>
                <p style={{ fontSize: "11px", color: "#94a3b8" }}>
                  Avg Band {weakest.avg.toFixed(1)}
                </p>
              </div>
            </Link>
          );
        })()}
      </div>
    </div>
  );
}
