"use client";

import { useState } from "react";
import Link from "next/link";
import {
  GraduationCap, ArrowRight, TrendingUp, Flame,
  BookOpen, Mic, Headphones, BookMarked, CheckCircle2,
  ChevronRight, Star,
} from "lucide-react";

const BRAND = "#ef4444";

/* ── Fake student data ─────────────────────────────────────────────────────── */
const SKILLS = [
  { label:"Listening", score:6.5, pct:70, color:BRAND,    icon:Headphones },
  { label:"Reading",   score:7.0, pct:76, color:"#f97316", icon:BookMarked },
  { label:"Writing",   score:6.0, pct:64, color:"#8b5cf6", icon:BookOpen   },
  { label:"Speaking",  score:5.5, pct:58, color:"#10b981", icon:Mic        },
];

const SESSIONS = [
  { day:"Mon", band:5.8 }, { day:"Tue", band:6.0 }, { day:"Wed", band:5.5 },
  { day:"Thu", band:6.2 }, { day:"Fri", band:6.5 }, { day:"Sat", band:6.8 },
  { day:"Sun", band:7.0 },
];

const MIN_BAND = 5, MAX_BAND = 9;

/* ── Writing AI feedback sample ───────────────────────────────────────────── */
const ESSAY_ORIGINAL = `Some people think that the government should invest more money into public transport. Others believe that money should be spent on building more roads. Discuss both views and give your own opinion.

In today's world, the question of whether governments should prioritize public transport or road infrastructure has become increasingly important. Many peoples argue that investing in public transport is more better for the environment and can reduce traffic jams. On the other hand, roads is also very important for economic development.

From my point of view, I strongly believe that governments should focus on public transport because it has more benefits for society. Public transport such as buses and trains can carry a large amount of people and this reduce carbon emissions in significant way. If more people use public transport, they will contribute for a cleaner environment.`;

type Highlight = {
  from: string;
  to: string;
  type: "grammar" | "vocab" | "style";
  note: string;
};

const HIGHLIGHTS: Highlight[] = [
  { from:"Many peoples",         to:"Many people",            type:"grammar", note:"'People' is already plural — no 's' needed." },
  { from:"more better",          to:"better",                 type:"grammar", note:"Double comparative — remove 'more'." },
  { from:"roads is",             to:"roads are",              type:"grammar", note:"Subject-verb agreement: 'roads' is plural." },
  { from:"this reduce",          to:"this reduces",           type:"grammar", note:"Third-person singular needs '-s'." },
  { from:"in significant way",   to:"in a significant way",   type:"grammar", note:"Missing article 'a' before the adjective." },
  { from:"contribute for",       to:"contribute to",          type:"vocab",   note:"Correct collocation: 'contribute to', not 'for'." },
  { from:"traffic jams",         to:"traffic congestion",     type:"vocab",   note:"More academic vocabulary for IELTS Task 2." },
];

const TYPE_COLOR: Record<Highlight["type"], string> = {
  grammar: "#ef4444",
  vocab:   "#8b5cf6",
  style:   "#0ea5e9",
};

const CRITERIA = [
  { label:"Task Response",             score:"6.0", note:"Addresses the question but development is limited." },
  { label:"Coherence & Cohesion",      score:"6.5", note:"Generally clear progression; some over-use of 'and'." },
  { label:"Lexical Resource",          score:"5.5", note:"Basic vocabulary — upgrade to academic synonyms." },
  { label:"Grammatical Range",         score:"6.0", note:"Some errors but meaning is clear throughout." },
];

function HighlightedEssay() {
  const [active, setActive] = useState<number | null>(null);

  let text = ESSAY_ORIGINAL;
  const parts: { text: string; idx: number | null }[] = [];

  HIGHLIGHTS.forEach((h, i) => {
    const pos = text.indexOf(h.from);
    if (pos === -1) return;
    if (pos > 0) parts.push({ text: text.slice(0, pos), idx: null });
    parts.push({ text: h.from, idx: i });
    text = text.slice(pos + h.from.length);
  });
  if (text) parts.push({ text, idx: null });

  return (
    <div style={{ display:"grid", gridTemplateColumns:"1fr 280px", gap:"20px", alignItems:"start" }}>
      <div style={{ background:"#fff", border:"1px solid #efe4e2", borderRadius:"12px", padding:"20px", fontSize:"14px", lineHeight:1.8, color:"#1a1310" }}>
        {parts.map((p, i) => (
          p.idx === null ? <span key={i}>{p.text}</span> : (
            <span key={i}
              onClick={() => setActive(active === p.idx ? null : p.idx!)}
              style={{
                background: active === p.idx ? TYPE_COLOR[HIGHLIGHTS[p.idx].type] + "30" : TYPE_COLOR[HIGHLIGHTS[p.idx].type] + "18",
                borderBottom: `2px solid ${TYPE_COLOR[HIGHLIGHTS[p.idx].type]}`,
                borderRadius:"3px", padding:"0 2px", cursor:"pointer",
                fontWeight: active === p.idx ? 600 : 400,
                transition:"background 0.15s",
              }}
            >
              {p.text}
            </span>
          )
        ))}
      </div>

      {/* Annotation panel */}
      <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
        {active !== null ? (
          <div style={{ background:"#fff", border:`1px solid ${TYPE_COLOR[HIGHLIGHTS[active].type]}44`, borderRadius:"12px", padding:"16px", boxShadow:"0 4px 16px rgba(0,0,0,0.08)" }}>
            <p style={{ fontSize:"10px", fontWeight:700, color:TYPE_COLOR[HIGHLIGHTS[active].type], textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:"10px" }}>
              {HIGHLIGHTS[active].type} error
            </p>
            <p style={{ fontSize:"13px", color:"#999", marginBottom:"6px", textDecoration:"line-through" }}>{HIGHLIGHTS[active].from}</p>
            <p style={{ fontSize:"14px", fontWeight:700, color:"#16a34a", marginBottom:"8px" }}>→ {HIGHLIGHTS[active].to}</p>
            <p style={{ fontSize:"13px", color:"#737373", lineHeight:1.6 }}>{HIGHLIGHTS[active].note}</p>
          </div>
        ) : (
          <div style={{ background:"#fafafa", border:"1px solid #efe4e2", borderRadius:"12px", padding:"16px" }}>
            <p style={{ fontSize:"12px", color:"#999", lineHeight:1.6, textAlign:"center", marginTop:"8px" }}>
              👆 Click any highlighted word to see the AI correction
            </p>
          </div>
        )}

        <div style={{ fontSize:"11px", display:"flex", flexDirection:"column", gap:"6px" }}>
          {Object.entries(TYPE_COLOR).map(([type, color]) => (
            <div key={type} style={{ display:"flex", alignItems:"center", gap:"6px" }}>
              <div style={{ width:"10px", height:"10px", borderRadius:"2px", background:color + "40", border:`1px solid ${color}` }} />
              <span style={{ color:"#999", textTransform:"capitalize" }}>{type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "writing">("dashboard");

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        .float { animation:float 4s ease-in-out infinite; }
        .tab-btn { transition:all .15s; cursor:pointer; border:none; }
        .tab-btn:hover { opacity:0.8; }
        .skill-bar { transition:width 1s ease; }
        @media(max-width:768px) { .demo-grid { grid-template-columns:1fr !important; } }
      `}</style>

      <div style={{ fontFamily:"ui-sans-serif,system-ui,'Inter',sans-serif", background:"#fafafa", minHeight:"100vh" }}>

        {/* ── Top nav ── */}
        <header style={{ background:"#fff", borderBottom:"1px solid #efe4e2", position:"sticky", top:0, zIndex:100 }}>
          <div style={{ maxWidth:"1100px", margin:"0 auto", padding:"0 24px", height:"58px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <Link href="/" style={{ display:"flex", alignItems:"center", gap:"9px", textDecoration:"none" }}>
              <div style={{ width:"30px", height:"30px", borderRadius:"7px", background:BRAND, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <GraduationCap style={{ width:"15px", height:"15px", color:"#fff" }} />
              </div>
              <span style={{ fontWeight:700, fontSize:"14px", color:"#1a1310" }}>IELTS Sensei</span>
            </Link>

            <div style={{ background:"#fef2f2", border:"1px solid #fecaca", borderRadius:"8px", padding:"6px 14px", fontSize:"12px", fontWeight:600, color:BRAND }}>
              🎭 Demo — No login required
            </div>

            <Link href="/signup" style={{
              display:"inline-flex", alignItems:"center", gap:"7px",
              fontSize:"13px", fontWeight:700, color:"#fff", textDecoration:"none",
              background:BRAND, borderRadius:"8px", padding:"8px 18px",
            }}>
              Start Free <ArrowRight style={{ width:"14px", height:"14px" }} />
            </Link>
          </div>
        </header>

        <div style={{ maxWidth:"1100px", margin:"0 auto", padding:"32px 24px 80px" }}>

          {/* ── Page title ── */}
          <div style={{ marginBottom:"28px", textAlign:"center" }}>
            <h1 style={{ fontSize:"clamp(28px,4vw,44px)", fontWeight:700, color:"#1a1310", letterSpacing:"-0.03em", marginBottom:"10px" }}>
              Your dashboard — live preview
            </h1>
            <p style={{ fontSize:"16px", color:"#737373" }}>
              This is what a <strong style={{ color:"#1a1310" }}>real student</strong> sees after 8 sessions. Band 6.5 → trending to 7.5.
            </p>
          </div>

          {/* ── Tab switcher ── */}
          <div style={{ display:"flex", gap:"0", background:"#fff", border:"1px solid #efe4e2", borderRadius:"10px", padding:"4px", marginBottom:"24px", width:"fit-content", margin:"0 auto 28px" }}>
            {(["dashboard","writing"] as const).map(tab => (
              <button key={tab} className="tab-btn"
                onClick={() => setActiveTab(tab)}
                style={{
                  padding:"9px 22px", borderRadius:"7px", fontSize:"13px", fontWeight:600,
                  background: activeTab === tab ? BRAND : "transparent",
                  color: activeTab === tab ? "#fff" : "#737373",
                  textTransform:"capitalize",
                }}
              >
                {tab === "writing" ? "Writing AI Feedback" : "Dashboard"}
              </button>
            ))}
          </div>

          {activeTab === "dashboard" && (
            <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>

              {/* Hero greeting card */}
              <div style={{ background:"#fff", borderRadius:"14px", border:"1px solid #efe4e2", padding:"22px 24px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:"12px" }}>
                  <div>
                    <h2 style={{ fontSize:"22px", fontWeight:700, color:"#1a1310", letterSpacing:"-0.02em", marginBottom:"4px" }}>
                      Hey, Asel 👋
                    </h2>
                    <p style={{ fontSize:"14px", color:"#737373" }}>
                      <Flame style={{ width:"14px", height:"14px", color:"#f97316", display:"inline", marginRight:"4px" }} />
                      7-day streak! Keep the momentum going.
                    </p>
                  </div>
                  <div style={{ display:"flex", gap:"10px" }}>
                    <Link href="/signup" style={{ display:"inline-flex", alignItems:"center", gap:"6px", fontSize:"13px", fontWeight:700, color:"#fff", textDecoration:"none", background:BRAND, borderRadius:"8px", padding:"9px 18px" }}>
                      <BookOpen style={{ width:"13px", height:"13px" }} /> Write now
                    </Link>
                    <Link href="/signup" style={{ display:"inline-flex", alignItems:"center", gap:"6px", fontSize:"13px", fontWeight:600, color:"#1a1310", textDecoration:"none", background:"#fff", border:"1px solid #efe4e2", borderRadius:"8px", padding:"9px 16px" }}>
                      <Mic style={{ width:"13px", height:"13px", color:BRAND }} /> Speak now
                    </Link>
                  </div>
                </div>
              </div>

              {/* Score rings row */}
              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"12px" }} className="demo-grid">
                {SKILLS.map(({ label, score, pct, color, icon: Icon }) => {
                  const r = 32; const circ = 2 * Math.PI * r;
                  return (
                    <div key={label} style={{ background:"#fff", borderRadius:"14px", border:"1px solid #efe4e2", padding:"20px 16px", textAlign:"center" }}>
                      <svg width="80" height="80" viewBox="0 0 80 80" style={{ display:"block", margin:"0 auto" }}>
                        <circle cx="40" cy="40" r={r} fill="none" stroke="#f5f5f5" strokeWidth="6"/>
                        <circle cx="40" cy="40" r={r} fill="none" stroke={color} strokeWidth="6"
                          strokeDasharray={`${circ}`} strokeDashoffset={`${circ - (pct / 100) * circ}`}
                          strokeLinecap="round" style={{ transform:"rotate(-90deg)", transformOrigin:"50% 50%" }}/>
                        <text x="40" y="44" textAnchor="middle" fontSize="16" fontWeight="800" fill={color}>{score}</text>
                      </svg>
                      <div style={{ width:"28px", height:"28px", borderRadius:"7px", background:`${color}18`, display:"flex", alignItems:"center", justifyContent:"center", margin:"10px auto 6px" }}>
                        <Icon style={{ width:"14px", height:"14px", color }} />
                      </div>
                      <p style={{ fontSize:"13px", fontWeight:600, color:"#1a1310" }}>{label}</p>
                      <p style={{ fontSize:"11px", color:"#999", marginTop:"2px" }}>
                        {label === "Writing" ? "⚠️ Focus here" : label === "Speaking" ? "⚠️ Focus here" : "✓ On track"}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Band trend chart */}
              <div style={{ background:"#fff", borderRadius:"14px", border:"1px solid #efe4e2", padding:"22px 24px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"20px" }}>
                  <div>
                    <p style={{ fontSize:"11px", color:"#999", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:"4px" }}>Band Trend</p>
                    <p style={{ fontSize:"16px", fontWeight:700, color:"#1a1310" }}>Last 8 sessions — going up ↑</p>
                  </div>
                  <div style={{ background:"#f0fdf4", border:"1px solid #bbf7d0", borderRadius:"8px", padding:"6px 12px", fontSize:"12px", fontWeight:700, color:"#16a34a" }}>
                    +1.2 bands this week
                  </div>
                </div>
                {/* Chart */}
                <div style={{ display:"flex", alignItems:"flex-end", gap:"8px", height:"80px" }}>
                  {SESSIONS.map(({ day, band }, i) => {
                    const pct = ((band - MIN_BAND) / (MAX_BAND - MIN_BAND)) * 100;
                    const isLast = i === SESSIONS.length - 1;
                    return (
                      <div key={day} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:"6px" }}>
                        <div style={{ width:"100%", background: isLast ? BRAND : "#f0f0f0", borderRadius:"4px 4px 0 0", height:`${Math.max(pct, 8)}%`, minHeight:"6px", transition:"height 0.8s ease" }} />
                        <div>
                          <p style={{ fontSize:"10px", fontWeight: isLast ? 700 : 400, color: isLast ? BRAND : "#999", textAlign:"center" }}>{day}</p>
                          <p style={{ fontSize:"10px", fontWeight:700, color: isLast ? BRAND : "#bbb", textAlign:"center" }}>{band}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Skill map */}
              <div style={{ background:"#fff", borderRadius:"14px", border:"1px solid #efe4e2", padding:"22px 24px" }}>
                <p style={{ fontSize:"11px", color:"#999", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:"4px" }}>Skill Map</p>
                <p style={{ fontSize:"16px", fontWeight:700, color:"#1a1310", marginBottom:"20px" }}>Sub-skills that cost band points</p>

                <div style={{ display:"flex", flexDirection:"column", gap:"14px" }}>
                  {[
                    { skill:"Lexical Resource (Writing)",    pct:48, label:"Weak", color:BRAND },
                    { skill:"Fluency & Pronunciation",       pct:55, label:"Weak", color:"#f97316" },
                    { skill:"Task Response (Writing T2)",    pct:62, label:"Fair",  color:"#f59e0b" },
                    { skill:"Reading — Matching Headings",   pct:70, label:"Fair",  color:"#8b5cf6" },
                    { skill:"Listening Part 3 (Academic)",   pct:78, label:"Good",  color:"#10b981" },
                  ].map(({ skill, pct, label, color }) => (
                    <div key={skill}>
                      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"5px" }}>
                        <span style={{ fontSize:"13px", color:"#1a1310", fontWeight:500 }}>{skill}</span>
                        <div style={{ display:"flex", gap:"8px", alignItems:"center" }}>
                          <span style={{ fontSize:"12px", fontWeight:700, color }}>{label}</span>
                          <span style={{ fontSize:"12px", color:"#999" }}>{pct}%</span>
                        </div>
                      </div>
                      <div style={{ height:"6px", background:"#f5f5f5", borderRadius:"999px", overflow:"hidden" }}>
                        <div style={{ height:"100%", width:`${pct}%`, background:color, borderRadius:"999px" }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next action */}
              <div style={{ background:"#fef2f2", borderRadius:"14px", border:"1px solid #fecaca", padding:"22px 24px" }}>
                <p style={{ fontSize:"11px", fontWeight:700, color:BRAND, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:"8px" }}>⚡ Next action — based on your skill map</p>
                <p style={{ fontSize:"17px", fontWeight:700, color:"#1a1310", marginBottom:"6px" }}>Practice Writing Task 2 — Lexical Resource</p>
                <p style={{ fontSize:"13px", color:"#737373", marginBottom:"16px" }}>Your lowest sub-skill. 3 targeted exercises will move it from 48% → 65%.</p>
                <Link href="/signup" style={{ display:"inline-flex", alignItems:"center", gap:"7px", fontSize:"14px", fontWeight:700, color:"#fff", textDecoration:"none", background:BRAND, borderRadius:"8px", padding:"10px 22px" }}>
                  Start this exercise <ArrowRight style={{ width:"14px", height:"14px" }} />
                </Link>
              </div>
            </div>
          )}

          {activeTab === "writing" && (
            <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>

              {/* Criteria scores */}
              <div style={{ background:"#fff", borderRadius:"14px", border:"1px solid #efe4e2", padding:"22px 24px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"20px", flexWrap:"wrap", gap:"12px" }}>
                  <div>
                    <p style={{ fontSize:"11px", color:"#999", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:"4px" }}>AI Band Score</p>
                    <div style={{ display:"flex", alignItems:"baseline", gap:"8px" }}>
                      <span style={{ fontSize:"48px", fontWeight:800, color:BRAND, letterSpacing:"-0.04em", lineHeight:1 }}>6.5</span>
                      <span style={{ fontSize:"14px", color:"#999" }}>/ 9.0</span>
                    </div>
                  </div>
                  <div style={{ display:"flex", gap:"3px" }}>
                    {[1,2,3,4,5].map(i => <Star key={i} style={{ width:"14px", height:"14px", color:"#f59e0b", fill: i <= 3 ? "#f59e0b" : "none" }} />)}
                  </div>
                </div>

                <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"12px" }} className="demo-grid">
                  {CRITERIA.map(({ label, score, note }) => (
                    <div key={label} style={{ background:"#fafafa", borderRadius:"10px", padding:"14px", border:"1px solid #efe4e2" }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"6px" }}>
                        <span style={{ fontSize:"12px", fontWeight:600, color:"#1a1310" }}>{label}</span>
                        <span style={{ fontSize:"18px", fontWeight:800, color:BRAND }}>{score}</span>
                      </div>
                      <p style={{ fontSize:"11.5px", color:"#737373", lineHeight:1.5 }}>{note}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlighted essay */}
              <div style={{ background:"#fff", borderRadius:"14px", border:"1px solid #efe4e2", padding:"22px 24px" }}>
                <div style={{ marginBottom:"16px" }}>
                  <p style={{ fontSize:"11px", color:"#999", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:"4px" }}>Essay with AI corrections</p>
                  <p style={{ fontSize:"15px", fontWeight:700, color:"#1a1310" }}>
                    {HIGHLIGHTS.length} issues found — click any highlight to see the fix
                  </p>
                </div>
                <HighlightedEssay />
              </div>

              {/* Model answer snippet */}
              <div style={{ background:"#f0fdf4", borderRadius:"14px", border:"1px solid #bbf7d0", padding:"22px 24px" }}>
                <p style={{ fontSize:"11px", color:"#16a34a", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:"10px" }}>✦ Band 7.5 model answer — opening paragraph</p>
                <p style={{ fontSize:"14px", color:"#14532d", lineHeight:1.8, fontStyle:"italic" }}>
                  &ldquo;The debate over whether governments should channel public funds into mass transit systems or road infrastructure has intensified as urban populations continue to grow. While proponents of road construction argue that it stimulates economic activity and improves connectivity in rural areas, I contend that the case for public transport investment is considerably stronger, given its environmental and social benefits.&rdquo;
                </p>
                <p style={{ fontSize:"12px", color:"#16a34a", marginTop:"10px", fontWeight:600 }}>
                  Notice: no errors, varied vocabulary, clear position in first paragraph.
                </p>
              </div>
            </div>
          )}

          {/* ── Bottom CTA ── */}
          <div style={{ marginTop:"48px", background:"#1a1310", borderRadius:"18px", padding:"40px 36px", textAlign:"center" }}>
            <p style={{ fontSize:"11px", fontWeight:700, color:BRAND, textTransform:"uppercase", letterSpacing:"0.14em", marginBottom:"14px" }}>Ready to start?</p>
            <h2 style={{ fontSize:"clamp(24px,3.5vw,38px)", fontWeight:700, color:"#fff", letterSpacing:"-0.03em", marginBottom:"12px" }}>
              This could be your dashboard.
            </h2>
            <p style={{ fontSize:"15px", color:"rgba(255,255,255,0.6)", marginBottom:"28px", lineHeight:1.65 }}>
              Start free — no credit card needed. Get your first AI band score in under 15 minutes.
            </p>
            <div style={{ display:"flex", gap:"12px", justifyContent:"center", flexWrap:"wrap" }}>
              <Link href="/signup" style={{
                display:"inline-flex", alignItems:"center", gap:"9px",
                fontSize:"16px", fontWeight:700, color:"#1a1310", textDecoration:"none",
                background:`linear-gradient(135deg,#fbbf24,#f59e0b)`,
                borderRadius:"11px", padding:"14px 32px",
                boxShadow:"0 8px 28px rgba(245,158,11,0.4)",
              }}>
                Start Free — No Card Needed <ArrowRight style={{ width:"17px", height:"17px" }} />
              </Link>
              <Link href="/" style={{
                display:"inline-flex", alignItems:"center",
                fontSize:"14px", fontWeight:500, color:"rgba(255,255,255,0.6)", textDecoration:"none",
                border:"1px solid rgba(255,255,255,0.15)", borderRadius:"11px", padding:"13px 24px",
              }}>
                ← Back to home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
