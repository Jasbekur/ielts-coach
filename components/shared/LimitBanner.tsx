"use client";

import { useWeeklyLimit } from "@/hooks/useWeeklyLimit";

export function LimitBanner() {
  const { remaining, isAtLimit, FREE_LIMIT, loading } = useWeeklyLimit();

  if (loading || remaining === null) return null;

  if (isAtLimit) {
    return (
      <div style={{
        background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: "8px",
        padding: "14px 18px", marginBottom: "16px",
        display: "flex", alignItems: "center", gap: "12px",
      }}>
        <span style={{ fontSize: "20px" }}>🚫</span>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: "14px", fontWeight: 700, color: "#991b1b", marginBottom: "2px" }}>
            Weekly limit reached ({FREE_LIMIT}/{FREE_LIMIT} AI scores used)
          </p>
          <p style={{ fontSize: "13px", color: "#64748b" }}>
            Your limit resets in 7 days. Upgrade for unlimited AI scoring.
          </p>
        </div>
        <a href="mailto:kc5769392@gmail.com?subject=IELTS Sensei Pro"
          style={{
            background: "#16a34a", color: "#fff", border: "none",
            borderRadius: "6px", padding: "8px 16px", fontSize: "13px",
            fontWeight: 600, cursor: "pointer", textDecoration: "none",
            whiteSpace: "nowrap",
          }}>
          Upgrade →
        </a>
      </div>
    );
  }

  if (remaining <= 1) {
    return (
      <div style={{
        background: "#fffbeb", border: "1px solid #fde68a", borderRadius: "8px",
        padding: "12px 16px", marginBottom: "16px",
        display: "flex", alignItems: "center", gap: "10px",
      }}>
        <span>⚠️</span>
        <p style={{ fontSize: "13px", color: "#92400e" }}>
          <strong>{remaining} AI score remaining</strong> this week (free plan: {FREE_LIMIT}/week).
          {" "}Use it wisely — submit only when you&apos;ve written your best answer.
        </p>
      </div>
    );
  }

  return (
    <div style={{
      fontSize: "12px", color: "#94a3b8", textAlign: "right",
      marginBottom: "8px",
    }}>
      {remaining}/{FREE_LIMIT} AI scores remaining this week
    </div>
  );
}
