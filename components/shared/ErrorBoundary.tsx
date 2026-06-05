"use client";

import React from "react";

interface State { hasError: boolean; message: string }

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  State
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(err: Error): State {
    return { hasError: true, message: err?.message ?? "Unknown error" };
  }

  componentDidCatch(err: Error, info: React.ErrorInfo) {
    console.error("[ErrorBoundary]", err, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        justifyContent: "center", background: "#f8fafc", padding: "32px",
      }}>
        <div style={{
          background: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px",
          borderLeft: "4px solid #dc2626", padding: "32px 36px",
          maxWidth: "520px", width: "100%", boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        }}>
          <p style={{ fontSize: "11px", fontWeight: 700, color: "#dc2626", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>
            Something went wrong
          </p>
          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>
            Page failed to load
          </h2>
          <p style={{ fontSize: "13px", color: "#64748b", marginBottom: "20px", lineHeight: "1.6" }}>
            An unexpected error occurred. Your answers are safe — please refresh the page to continue.
          </p>
          <code style={{
            display: "block", background: "#f1f5f9", borderRadius: "4px",
            padding: "8px 12px", fontSize: "11px", color: "#475569",
            marginBottom: "20px", wordBreak: "break-all",
          }}>
            {this.state.message}
          </code>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: "#2563eb", color: "#fff", border: "none",
              borderRadius: "6px", padding: "10px 20px", fontSize: "13px",
              fontWeight: 600, cursor: "pointer",
            }}
          >
            Reload page
          </button>
        </div>
      </div>
    );
  }
}
