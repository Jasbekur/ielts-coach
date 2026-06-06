"use client";
import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, X } from "lucide-react";

const PLANS = [
  {
    name: "Starter", price: { monthly: "Free", yearly: "Free" }, desc: "Try every skill. No commitment.",
    highlight: false,
    perks: ["10 AI writing scores / month","5 speaking attempts / month","Full reading & listening","Basic score history"],
    cta: "Start free", href: "/signup",
  },
  {
    name: "Coach", price: { monthly: "$12", yearly: "$10" }, desc: "Everything to reach your target band.",
    highlight: true,
    perks: ["Unlimited writing & speaking AI","Full mock tests — all 4 skills","Band trend analytics","Model answers every level","Priority AI response","Personalised weak-point alerts"],
    cta: "Start Free — No Card Needed", href: "/signup",
  },
  {
    name: "Elite", price: { monthly: "$29", yearly: "$23" }, desc: "For serious Band 8+ candidates.",
    highlight: false,
    perks: ["Everything in Coach","Personalised study plan","Weak-point AI detection","1-on-1 tutor 2× per month","Exam-day strategy guide","Lifetime score archive"],
    cta: "Go Elite", href: "/signup",
  },
];

const COMPARISON = [
  { feature: "AI Writing & Speaking scores", starter: true,  coach: true,  elite: true  },
  { feature: "Reading & Listening practice", starter: true,  coach: true,  elite: true  },
  { feature: "Full mock tests (all 4 skills)", starter: false, coach: true,  elite: true  },
  { feature: "Band trend analytics",          starter: false, coach: true,  elite: true  },
  { feature: "Model answers every band level",starter: false, coach: true,  elite: true  },
  { feature: "Personalised study plan",       starter: false, coach: false, elite: true  },
  { feature: "Weak-point AI detection",       starter: false, coach: false, elite: true  },
  { feature: "1-on-1 tutor sessions",         starter: false, coach: false, elite: true  },
];

const BRAND = "#ef4444";

export function PricingSection() {
  const [yearly, setYearly] = useState(false);

  return (
    <div>
      {/* Toggle */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "48px" }}>
        <span style={{ fontSize: "14px", fontWeight: 500, color: yearly ? "#999" : "#1a1310" }}>Monthly</span>
        <button
          onClick={() => setYearly(y => !y)}
          style={{
            width: "44px", height: "24px", borderRadius: "999px", border: "none", cursor: "pointer",
            background: yearly ? BRAND : "#e5e5e5", position: "relative", transition: "background 0.2s",
          }}
        >
          <span style={{
            position: "absolute", top: "3px", width: "18px", height: "18px", borderRadius: "50%",
            background: "#fff", transition: "left 0.2s",
            left: yearly ? "23px" : "3px",
          }} />
        </button>
        <span style={{ fontSize: "14px", fontWeight: 500, color: yearly ? "#1a1310" : "#999" }}>
          Yearly
          <span style={{ marginLeft: "6px", fontSize: "11px", fontWeight: 700, color: BRAND, background: "#fef2f2", borderRadius: "4px", padding: "2px 6px" }}>–20%</span>
        </span>
      </div>

      {/* Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px", alignItems: "start", marginBottom: "16px" }}>
        {PLANS.map(({ name, price, desc, highlight, perks, cta, href }) => (
          <div key={name} style={{
            background: highlight ? "#1a1310" : "#fff",
            borderRadius: "14px",
            border: highlight ? "none" : "1px solid #efe4e2",
            padding: "28px",
            boxShadow: highlight ? "0 20px 50px rgba(0,0,0,0.15)" : "0 2px 12px rgba(0,0,0,0.04)",
            transform: highlight ? "scale(1.03)" : "none",
            transition: "transform 0.2s",
            position: "relative",
          }}>
            {highlight && (
              <div style={{ position: "absolute", top: "-13px", left: "50%", transform: "translateX(-50%)", background: `linear-gradient(135deg,${BRAND},#dc2626)`, borderRadius: "999px", padding: "4px 16px", fontSize: "11px", fontWeight: 700, color: "#fff", whiteSpace: "nowrap" }}>
                ✦ Most Popular
              </div>
            )}
            <p style={{ fontSize: "11px", fontWeight: 700, color: highlight ? "rgba(255,255,255,0.45)" : BRAND, textTransform: "uppercase", letterSpacing: "0.13em", marginBottom: "10px" }}>{name}</p>
            <div style={{ display: "flex", alignItems: "baseline", gap: "3px", marginBottom: "6px" }}>
              <span style={{ fontSize: "40px", fontWeight: 700, color: highlight ? "#fff" : "#1a1310", letterSpacing: "-0.03em" }}>
                {yearly ? price.yearly : price.monthly}
              </span>
              {(yearly ? price.yearly : price.monthly) !== "Free" && (
                <span style={{ fontSize: "14px", color: highlight ? "rgba(255,255,255,0.4)" : "#737373" }}>/mo</span>
              )}
            </div>
            {yearly && price.monthly !== "Free" && (
              <p style={{ fontSize: "11px", color: highlight ? "rgba(255,255,255,0.4)" : "#999", marginBottom: "4px" }}>
                Billed annually · Save 20%
              </p>
            )}
            <p style={{ fontSize: "14px", color: highlight ? "rgba(255,255,255,0.5)" : "#737373", marginBottom: "20px" }}>{desc}</p>
            <div style={{ height: "1px", background: highlight ? "rgba(255,255,255,0.1)" : "#efe4e2", marginBottom: "16px" }} />
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
              {perks.map(p => (
                <li key={p} style={{ display: "flex", gap: "9px", alignItems: "flex-start", fontSize: "13.5px", color: highlight ? "rgba(255,255,255,0.75)" : "#737373" }}>
                  <CheckCircle2 style={{ width: "14px", height: "14px", color: highlight ? BRAND : BRAND, marginTop: "1px", flexShrink: 0 }} />
                  {p}
                </li>
              ))}
            </ul>
            <Link href={href} style={{
              display: "block", textAlign: "center",
              fontSize: "14px", fontWeight: 700, textDecoration: "none",
              color: highlight ? "#1a1310" : "#fff",
              background: highlight ? `linear-gradient(135deg,${BRAND},#dc2626)` : BRAND,
              borderRadius: "9px", padding: "12px",
              boxShadow: highlight ? `0 6px 20px ${BRAND}44` : "none",
            }}>
              {cta}
            </Link>
          </div>
        ))}
      </div>

      {/* 7-day trial note */}
      <p style={{ textAlign: "center", fontSize: "13px", color: "#737373", marginBottom: "48px" }}>
        All plans include a <strong style={{ color: "#1a1310" }}>7-day free trial</strong> · Cancel anytime · No credit card for Starter
      </p>

      {/* Comparison table */}
      <div style={{ border: "1px solid #efe4e2", borderRadius: "14px", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 100px 100px 100px", background: "#fafafa", padding: "14px 20px", borderBottom: "1px solid #efe4e2" }}>
          <span style={{ fontSize: "12px", fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.1em" }}>Feature</span>
          {["Starter","Coach","Elite"].map(n => (
            <span key={n} style={{ fontSize: "12px", fontWeight: 700, color: n === "Coach" ? BRAND : "#1a1310", textAlign: "center", textTransform: "uppercase", letterSpacing: "0.1em" }}>{n}</span>
          ))}
        </div>
        {COMPARISON.map(({ feature, starter, coach, elite }, i) => (
          <div key={feature} style={{ display: "grid", gridTemplateColumns: "1fr 100px 100px 100px", padding: "13px 20px", background: i % 2 === 0 ? "#fff" : "#fafafa", borderBottom: i < COMPARISON.length - 1 ? "1px solid #efe4e2" : "none", alignItems: "center" }}>
            <span style={{ fontSize: "13.5px", color: "#1a1310" }}>{feature}</span>
            {[starter, coach, elite].map((has, j) => (
              <div key={j} style={{ display: "flex", justifyContent: "center" }}>
                {has
                  ? <CheckCircle2 style={{ width: "15px", height: "15px", color: BRAND }} />
                  : <X style={{ width: "14px", height: "14px", color: "#d4d4d4" }} />}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
