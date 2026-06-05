"use client";

import { useState } from "react";

interface Props {
  band: number;
  mode: "Writing" | "Speaking" | "Listening" | "Reading";
  detail?: string; // e.g. "Task 2 Essay" or "Full Mock"
}

export function ShareScoreCard({ band, mode, detail }: Props) {
  const [copied, setCopied] = useState(false);

  const bandLabel =
    band >= 8.5 ? "Very Good" :
    band >= 7.5 ? "Good" :
    band >= 6.5 ? "Competent" :
    band >= 5.5 ? "Modest" : "Limited";

  const msg = `🎯 I scored Band ${band.toFixed(1)} (${bandLabel}) on IELTS ${mode}${detail ? ` · ${detail}` : ""} using IELTS Sensei!\n\nPractice free at ielts-coach-three.vercel.app`;

  const waLink = `https://wa.me/?text=${encodeURIComponent(msg)}`;

  async function copyText() {
    try {
      await navigator.clipboard.writeText(msg);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* fallback: select + copy */
    }
  }

  const bandColor =
    band >= 7.5 ? "#2563eb" :
    band >= 6   ? "#d97706" : "#dc2626";

  return (
    <div style={{
      background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "10px",
      padding: "20px 24px", marginTop: "16px",
    }}>
      {/* Score display */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "14px" }}>
        <div style={{
          width: "64px", height: "64px", borderRadius: "12px",
          background: "#fff", border: `2px solid ${bandColor}`,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <span style={{ fontSize: "22px", fontWeight: 800, color: bandColor, lineHeight: 1 }}>
            {band.toFixed(1)}
          </span>
          <span style={{ fontSize: "9px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Band
          </span>
        </div>
        <div>
          <p style={{ fontSize: "15px", fontWeight: 700, color: "#0f172a", marginBottom: "2px" }}>
            {bandLabel} — IELTS {mode}
          </p>
          {detail && (
            <p style={{ fontSize: "12px", color: "#64748b" }}>{detail}</p>
          )}
          <p style={{ fontSize: "11px", color: "#94a3b8", marginTop: "4px" }}>
            Scored by IELTS Sensei AI
          </p>
        </div>
      </div>

      {/* Share buttons */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            background: "#25D366", color: "#fff", border: "none",
            borderRadius: "6px", padding: "8px 14px",
            fontSize: "12.5px", fontWeight: 600, cursor: "pointer",
            textDecoration: "none",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Share on WhatsApp
        </a>

        <button
          onClick={copyText}
          style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            background: copied ? "#f0fdf4" : "#fff",
            color: copied ? "#16a34a" : "#475569",
            border: `1px solid ${copied ? "#86efac" : "#e2e8f0"}`,
            borderRadius: "6px", padding: "8px 14px",
            fontSize: "12.5px", fontWeight: 600, cursor: "pointer",
          }}
        >
          {copied ? "✓ Copied!" : "Copy result"}
        </button>
      </div>
    </div>
  );
}
