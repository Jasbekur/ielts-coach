"use client";
import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, X } from "lucide-react";

const BRAND = "#dc2626";

const PLANS = [
  {
    id: "free",
    name: "Free",
    price: { monthly: "$0", yearly: "$0" },
    desc: "Reading + Listening forever free",
    highlight: false,
    perks: [
      "50+ authentic Reading tests",
      "50+ authentic Listening tests",
      "Timed mode (real exam format)",
      "Instant band score (5–9)",
      "Basic score history",
    ],
    cta: "Start Free — No Card",
    href: "/dashboard",
    paid: false,
  },
  {
    id: "starter",
    name: "Starter",
    price: { monthly: "$4.99", yearly: "$3.99" },
    desc: "Add AI Writing feedback",
    highlight: false,
    perks: [
      "Everything in Free",
      "Writing Task 1 AI feedback",
      "Writing Task 2 AI feedback",
      "Unlimited essay submissions",
      "Dashboard score history",
    ],
    cta: "Start Starter",
    href: null,
    paid: true,
  },
  {
    id: "elite",
    name: "Elite",
    price: { monthly: "$12.99", yearly: "$10.99" },
    desc: "All skills — Band 7+ toolkit",
    highlight: true,
    perks: [
      "Everything in Starter",
      "Speaking practice + band score",
      "Full 4-skill mock tests",
      "Band progression analytics",
      "Weak area detection (AI)",
      "Personalised 30-day study plan",
      "1 tutoring call / month",
    ],
    cta: "Start Elite",
    href: null,
    paid: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: { monthly: "$29", yearly: "$24" },
    desc: "For Band 8+ serious candidates",
    highlight: false,
    perks: [
      "Everything in Elite",
      "Unlimited 1-on-1 tutoring",
      "Custom adaptive study plan",
      "Hand-corrected essays",
      "Private Telegram support",
      "Priority 24h response",
    ],
    cta: "Start Premium",
    href: null,
    paid: true,
  },
];

const COMPARISON = [
  { feature: "Reading & Listening tests",        free: true,  starter: true,  elite: true,  premium: true  },
  { feature: "Instant band score",               free: true,  starter: true,  elite: true,  premium: true  },
  { feature: "AI Writing Task 1 feedback",       free: false, starter: true,  elite: true,  premium: true  },
  { feature: "AI Writing Task 2 feedback",       free: false, starter: true,  elite: true,  premium: true  },
  { feature: "Speaking practice + AI score",     free: false, starter: false, elite: true,  premium: true  },
  { feature: "Full 4-skill mock tests",          free: false, starter: false, elite: true,  premium: true  },
  { feature: "Band progression analytics",       free: false, starter: false, elite: true,  premium: true  },
  { feature: "Personalised 30-day study plan",   free: false, starter: false, elite: true,  premium: true  },
  { feature: "1-on-1 tutoring calls",            free: false, starter: false, elite: true,  premium: true  },
  { feature: "Unlimited tutoring",               free: false, starter: false, elite: false, premium: true  },
  { feature: "Hand-corrected essays",            free: false, starter: false, elite: false, premium: true  },
];

async function doCheckout(tier: string) {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tier }),
  });
  if (res.status === 401) {
    window.location.href = `/sign-in?redirect=/pricing`;
    return;
  }
  const data = await res.json();
  if (data.url) window.location.href = data.url;
}

export function PricingSection() {
  const [yearly, setYearly] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (id: string) => {
    setLoading(id);
    try { await doCheckout(id); } finally { setLoading(null); }
  };

  return (
    <div>
      {/* Toggle */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "48px" }}>
        <span style={{ fontSize: "14px", fontWeight: 500, color: yearly ? "#cbd5e1" : "#334155" }}>Monthly</span>
        <button
          onClick={() => setYearly(y => !y)}
          style={{ width: "44px", height: "24px", borderRadius: "999px", border: "none", cursor: "pointer", background: yearly ? BRAND : "rgba(0,0,0,0.1)", position: "relative", transition: "background 0.2s" }}
        >
          <span style={{ position: "absolute", top: "3px", width: "18px", height: "18px", borderRadius: "50%", background: "#fff", transition: "left 0.2s", left: yearly ? "23px" : "3px" }} />
        </button>
        <span style={{ fontSize: "14px", fontWeight: 500, color: yearly ? "#334155" : "#cbd5e1" }}>
          Yearly
          <span style={{ marginLeft: "6px", fontSize: "11px", fontWeight: 700, color: BRAND, background: "rgba(220,38,38,0.08)", borderRadius: "4px", padding: "2px 6px" }}>Save ~17%</span>
        </span>
      </div>

      {/* Plan cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "14px", alignItems: "start", marginBottom: "16px" }}>
        {PLANS.map(({ id, name, price, desc, highlight, perks, cta, href, paid }) => (
          <div key={id} style={{
            background: highlight ? "#fff" : "#fff",
            borderRadius: "16px",
            border: highlight ? `2px solid ${BRAND}` : "1px solid rgba(0,0,0,0.09)",
            padding: "24px",
            boxShadow: highlight
              ? "0 20px 60px rgba(220,38,38,0.12), 0 4px 16px rgba(0,0,0,0.06)"
              : "0 2px 12px rgba(0,0,0,0.04)",
            transform: highlight ? "scale(1.03)" : "none",
            position: "relative",
            transition: "transform 0.2s",
          }}>
            {highlight && (
              <div style={{ position: "absolute", top: "-13px", left: "50%", transform: "translateX(-50%)", background: `linear-gradient(135deg,${BRAND},#b91c1c)`, borderRadius: "999px", padding: "4px 16px", fontSize: "11px", fontWeight: 700, color: "#fff", whiteSpace: "nowrap", boxShadow: "0 4px 12px rgba(220,38,38,0.3)" }}>
                ✦ Most Popular
              </div>
            )}
            <p style={{ fontSize: "11px", fontWeight: 700, color: highlight ? BRAND : "#94a3b8", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "10px" }}>{name}</p>
            <div style={{ display: "flex", alignItems: "baseline", gap: "3px", marginBottom: "4px" }}>
              <span style={{ fontSize: "34px", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.04em" }}>
                {yearly ? price.yearly : price.monthly}
              </span>
              {(yearly ? price.yearly : price.monthly) !== "$0" && (
                <span style={{ fontSize: "13px", color: "#94a3b8" }}>/mo</span>
              )}
            </div>
            <p style={{ fontSize: "13px", color: highlight ? BRAND : "#64748b", marginBottom: "18px" }}>{desc}</p>
            <div style={{ height: "1px", background: highlight ? "rgba(220,38,38,0.12)" : "rgba(0,0,0,0.07)", marginBottom: "16px" }} />
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", marginBottom: "22px" }}>
              {perks.map(p => (
                <li key={p} style={{ display: "flex", gap: "8px", alignItems: "flex-start", fontSize: "12.5px", color: "#64748b" }}>
                  <CheckCircle2 style={{ width: "13px", height: "13px", color: BRAND, marginTop: "2px", flexShrink: 0 }} />
                  {p}
                </li>
              ))}
            </ul>
            {!paid ? (
              <Link href={href!} style={{ display: "block", textAlign: "center", fontSize: "13px", fontWeight: 700, textDecoration: "none", color: "#fff", background: BRAND, borderRadius: "10px", padding: "12px", boxShadow: "0 4px 14px rgba(220,38,38,0.25)" }}>
                {cta}
              </Link>
            ) : (
              <button
                onClick={() => handleCheckout(id)}
                disabled={loading === id}
                style={{ width: "100%", fontSize: "13px", fontWeight: 700, color: highlight ? "#fff" : "#dc2626", background: highlight ? `linear-gradient(135deg,${BRAND},#b91c1c)` : "rgba(220,38,38,0.06)", borderRadius: "10px", padding: "12px", border: highlight ? "none" : `1px solid rgba(220,38,38,0.2)`, cursor: "pointer", opacity: loading === id ? 0.6 : 1, boxShadow: highlight ? "0 6px 20px rgba(220,38,38,0.28)" : "none", transition: "opacity 0.15s" }}
              >
                {loading === id ? "Redirecting..." : cta}
              </button>
            )}
          </div>
        ))}
      </div>

      <p style={{ textAlign: "center", fontSize: "13px", color: "#94a3b8", marginBottom: "48px" }}>
        Free tier requires no card · Paid plans cancel anytime · No interest, no riba
      </p>

      {/* Comparison table */}
      <div style={{ border: "1px solid rgba(0,0,0,0.08)", borderRadius: "14px", overflow: "hidden", background: "#fff" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 80px 80px 80px", background: "rgba(0,0,0,0.02)", padding: "14px 20px", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
          <span style={{ fontSize: "11px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em" }}>Feature</span>
          {["Free","Starter","Elite","Premium"].map(n => (
            <span key={n} style={{ fontSize: "11px", fontWeight: 700, color: n === "Elite" ? BRAND : "#94a3b8", textAlign: "center", textTransform: "uppercase", letterSpacing: "0.08em" }}>{n}</span>
          ))}
        </div>
        {COMPARISON.map(({ feature, free, starter, elite, premium }, i) => (
          <div key={feature} style={{ display: "grid", gridTemplateColumns: "1fr 80px 80px 80px 80px", padding: "13px 20px", background: i % 2 === 0 ? "transparent" : "rgba(0,0,0,0.015)", borderBottom: i < COMPARISON.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none", alignItems: "center" }}>
            <span style={{ fontSize: "13px", color: "#64748b" }}>{feature}</span>
            {[free, starter, elite, premium].map((has, j) => (
              <div key={j} style={{ display: "flex", justifyContent: "center" }}>
                {has
                  ? <CheckCircle2 style={{ width: "14px", height: "14px", color: BRAND }} />
                  : <X style={{ width: "13px", height: "13px", color: "#e2e8f0" }} />}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
