import Link from "next/link";
import {
  GraduationCap, Mic, BookOpen, BookMarked, Headphones,
  ArrowRight, CheckCircle2, Star, Zap, TrendingUp,
  Users, Clock, Shield, ChevronRight, Play,
} from "lucide-react";

/* ─── DATA ────────────────────────────────────────────────────────────────── */

const STATS = [
  { value: "10,000+", label: "active students" },
  { value: "4.9★",   label: "avg. rating" },
  { value: "95%",    label: "hit their band goal" },
  { value: "<15s",   label: "AI feedback speed" },
];

const BENTO = [
  {
    size: "large", // spans 2 cols
    icon: Mic, color: "#10b981", label: "Speaking",
    headline: "Sound like a Band 8 candidate.",
    body: "50+ real IELTS cue cards. AI analyses fluency, grammar, pronunciation and lexical range — all in 12 seconds.",
    tags: ["Parts 1, 2 & 3", "Pronunciation analysis", "Real cue cards"],
  },
  {
    size: "small",
    icon: BookOpen, color: "#818cf8", label: "Writing",
    headline: "Task 1 & Task 2. Scored in 15 seconds.",
    body: "Get examiner-grade band scores + model answers at every band level.",
    tags: ["Academic & GT", "Grammar correction"],
  },
  {
    size: "small",
    icon: Headphones, color: "#f59e0b", label: "Listening",
    headline: "Cambridge format. Auto-scored.",
    body: "4 sections, 40 questions, one-play audio — just like the real exam.",
    tags: ["Full mock test", "Part 1–4"],
  },
  {
    size: "small",
    icon: BookMarked, color: "#38bdf8", label: "Reading",
    headline: "60 min. 40 Qs. Instant results.",
    body: "Academic passages with full answer explanations and band breakdown.",
    tags: ["Timed exam", "Answer review"],
  },
  {
    size: "small",
    icon: TrendingUp, color: "#f43f5e", label: "Progress",
    headline: "Track every score. Spot every gap.",
    body: "Band trend charts, weak-point detection and a personalised study plan.",
    tags: ["History", "Analytics"],
  },
];

const STEPS = [
  { n: "01", title: "Pick your skill", body: "Choose any of the four IELTS skills, or run a full mock test that mirrors the real exam." },
  { n: "02", title: "Practice freely", body: "Work at your own pace or under timed exam conditions — the choice is yours." },
  { n: "03", title: "Get AI feedback", body: "Receive examiner-grade scores and corrections in under 15 seconds, any time of day." },
  { n: "04", title: "Hit your band", body: "Your personalised dashboard shows exactly what to fix next so every session counts." },
];

const TESTIMONIALS = [
  { initials:"D", color:"#10b981", name:"Dilnoza T.", country:"🇺🇿", band:"7.5", prev:"6.0", weeks:6,
    quote:"The AI caught pronunciation mistakes my teacher never noticed in 2 years. 6 weeks later — 7.5." },
  { initials:"A", color:"#818cf8", name:"Arjun P.",   country:"🇮🇳", band:"8.0", prev:"6.5", weeks:10,
    quote:"I practiced 10 essays a day and watched my score climb in real time. Nothing else comes close." },
  { initials:"Y", color:"#38bdf8", name:"Yuna K.",    country:"🇰🇷", band:"7.0", prev:"5.5", weeks:8,
    quote:"I walked into the exam completely calm. The full mock tests prepared me for absolutely everything." },
  { initials:"F", color:"#f59e0b", name:"Fatima A.",  country:"🇸🇦", band:"8.5", prev:"7.0", weeks:12,
    quote:"The model answers showed me exactly what examiners want. I finally understood what 'coherence' means." },
  { initials:"B", color:"#f43f5e", name:"Bekzod U.",  country:"🇺🇿", band:"7.5", prev:"5.5", weeks:9,
    quote:"I failed IELTS twice before Sensei. 9 weeks later: 7.5. My UK visa is approved. Life changed." },
  { initials:"P", color:"#a3e635", name:"Priya S.",   country:"🇮🇳", band:"8.0", prev:"7.0", weeks:7,
    quote:"The grammar corrections teach you WHY you were wrong, not just what. Absolute game changer." },
];

const PLANS = [
  {
    name: "Starter", badge: null, price: "Free",
    desc: "Try everything with no commitment.",
    highlight: false,
    perks: [
      "10 AI writing scores / month",
      "5 speaking attempts / month",
      "Full reading & listening",
      "Basic score history",
    ],
    cta: "Start free",
  },
  {
    name: "Coach", badge: "Most Popular", price: "$12", per: "/mo",
    desc: "Everything you need to reach Band 7+.",
    highlight: true,
    perks: [
      "Unlimited AI writing scores",
      "Unlimited speaking attempts",
      "Full mock tests (all 4 skills)",
      "Band trend charts & analytics",
      "Model answers every band level",
      "Priority AI response",
    ],
    cta: "Get Coach",
  },
  {
    name: "Elite", badge: null, price: "$29", per: "/mo",
    desc: "For serious Band 8+ candidates.",
    highlight: false,
    perks: [
      "Everything in Coach",
      "Personalised study plan",
      "Weak-point detection AI",
      "1-on-1 tutor (2× / month)",
      "Exam-day strategy guide",
      "Lifetime score archive",
    ],
    cta: "Go Elite",
  },
];

/* ─── PAGE ────────────────────────────────────────────────────────────────── */

export default function LandingPage() {
  return (
    <>
      <style>{`
        /* ── reset & tokens ── */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --black: #080c14;
          --surface: #0d1220;
          --surface2: #111827;
          --border: rgba(255,255,255,0.07);
          --muted: rgba(255,255,255,0.45);
          --text: #f0f4ff;
          --accent: #10b981;
          --gold: #f59e0b;
          --font: 'Inter', system-ui, -apple-system, sans-serif;
        }

        /* ── typography ── */
        .display {
          font-size: clamp(44px, 6vw, 76px);
          font-weight: 900;
          line-height: 1.03;
          letter-spacing: -0.04em;
          color: var(--text);
        }
        .h2 {
          font-size: clamp(28px, 3.5vw, 44px);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.03em;
          color: var(--text);
        }
        .label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--accent);
        }

        /* ── animations ── */
        @keyframes fadeUp   { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes shimmer  { 0%,100% { opacity:.6; } 50% { opacity:1; } }
        @keyframes float    { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-12px); } }
        @keyframes orb      { 0%,100% { transform:scale(1) translate(0,0); } 33% { transform:scale(1.08) translate(20px,-12px); } 66% { transform:scale(.95) translate(-16px,8px); } }
        @keyframes ticker   { 0% { transform:translateX(0); } 100% { transform:translateX(-50%); } }

        .fade-up   { animation: fadeUp .6s ease both; }
        .shimmer   { animation: shimmer 2.4s ease-in-out infinite; }
        .float     { animation: float 4s ease-in-out infinite; }
        .ticker    { animation: ticker 28s linear infinite; }
        .ticker:hover { animation-play-state: paused; }

        /* ── interactive ── */
        .card-hover { transition: transform .22s ease, box-shadow .22s ease, border-color .22s ease; }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 24px 60px rgba(0,0,0,.5); border-color: rgba(255,255,255,.13) !important; }
        .btn-primary { transition: opacity .15s, transform .15s, box-shadow .15s; }
        .btn-primary:hover { opacity:.92; transform:translateY(-1px); box-shadow:0 12px 36px rgba(245,158,11,.45); }
        .btn-ghost  { transition: background .15s, border-color .15s; }
        .btn-ghost:hover { background:rgba(255,255,255,.08) !important; border-color:rgba(255,255,255,.2) !important; }
        .nav-link   { transition: color .15s; }
        .nav-link:hover { color: var(--text) !important; }
        .plan-hover { transition: transform .22s ease; }
        .plan-hover:hover { transform: translateY(-3px); }

        /* ── mesh gradient orbs ── */
        .orb-1 { animation: orb 12s ease-in-out infinite; }
        .orb-2 { animation: orb 16s ease-in-out infinite reverse; }

        /* ── score badge ── */
        @keyframes badge-in { from { opacity:0; transform:scale(.8) translateY(8px); } to { opacity:1; transform:scale(1) translateY(0); } }
        .badge-pop { animation: badge-in .5s ease both; }
      `}</style>

      <div style={{ fontFamily:"var(--font)", background:"var(--black)", color:"var(--text)", overflowX:"hidden" }}>

        {/* ══════════════════════════════════════════════════════════════════════
            NAV
        ══════════════════════════════════════════════════════════════════════ */}
        <header style={{
          position:"sticky", top:0, zIndex:200,
          background:"rgba(8,12,20,0.75)", backdropFilter:"blur(24px) saturate(180%)",
          borderBottom:"1px solid var(--border)",
        }}>
          <nav style={{ maxWidth:"1200px", margin:"0 auto", padding:"0 32px", height:"60px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:"24px" }}>

            <Link href="/" style={{ display:"flex", alignItems:"center", gap:"9px", textDecoration:"none", flexShrink:0 }}>
              <div style={{ width:"34px", height:"34px", borderRadius:"9px", background:"linear-gradient(135deg,#10b981,#059669)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <GraduationCap style={{ width:"18px", height:"18px", color:"#fff" }} />
              </div>
              <span style={{ fontWeight:800, fontSize:"15px", color:"var(--text)", letterSpacing:"-0.01em" }}>IELTS Sensei</span>
            </Link>

            <div style={{ display:"flex", gap:"28px" }}>
              {["Features","How it works","Pricing","Reviews"].map(item => (
                <a key={item} href={`#${item.toLowerCase().replace(/ /g,"-")}`} className="nav-link"
                  style={{ fontSize:"13.5px", fontWeight:500, color:"var(--muted)", textDecoration:"none" }}>
                  {item}
                </a>
              ))}
            </div>

            <div style={{ display:"flex", alignItems:"center", gap:"10px", flexShrink:0 }}>
              <Link href="/login" className="nav-link" style={{ fontSize:"13.5px", fontWeight:500, color:"var(--muted)", textDecoration:"none" }}>
                Sign in
              </Link>
              <Link href="/signup" className="btn-primary" style={{
                fontSize:"13.5px", fontWeight:700, color:"#0a0a0a", textDecoration:"none",
                background:"linear-gradient(135deg,#f59e0b,#d97706)",
                borderRadius:"8px", padding:"8px 18px",
                boxShadow:"0 4px 14px rgba(245,158,11,0.3)",
              }}>
                Start free →
              </Link>
            </div>
          </nav>
        </header>

        {/* ══════════════════════════════════════════════════════════════════════
            HERO  —  Linear + Stripe-inspired
        ══════════════════════════════════════════════════════════════════════ */}
        <section style={{ position:"relative", minHeight:"100vh", display:"flex", alignItems:"center", overflow:"hidden", padding:"80px 32px" }}>

          {/* Mesh gradient background */}
          <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 80% 70% at 50% -10%, rgba(16,185,129,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 60% at 80% 80%, rgba(56,189,248,0.05) 0%, transparent 60%)", pointerEvents:"none" }} />

          {/* Animated orbs */}
          <div className="orb-1" style={{ position:"absolute", top:"15%", left:"60%", width:"600px", height:"600px", borderRadius:"50%", background:"radial-gradient(circle,rgba(16,185,129,0.07) 0%,transparent 65%)", pointerEvents:"none" }} />
          <div className="orb-2" style={{ position:"absolute", bottom:"10%", right:"5%", width:"400px", height:"400px", borderRadius:"50%", background:"radial-gradient(circle,rgba(99,102,241,0.06) 0%,transparent 65%)", pointerEvents:"none" }} />

          {/* Fine grid */}
          <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize:"60px 60px", pointerEvents:"none", maskImage:"radial-gradient(ellipse 80% 80% at 50% 0%,black 0%,transparent 75%)" }} />

          <div style={{ maxWidth:"1200px", margin:"0 auto", width:"100%", position:"relative", zIndex:1 }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"80px", alignItems:"center" }}>

              {/* ── Left ── */}
              <div>
                {/* Pill */}
                <div style={{ display:"inline-flex", alignItems:"center", gap:"8px", border:"1px solid rgba(16,185,129,0.3)", background:"rgba(16,185,129,0.07)", borderRadius:"999px", padding:"5px 14px 5px 8px", marginBottom:"32px" }}>
                  <div style={{ width:"20px", height:"20px", borderRadius:"50%", background:"#10b981", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <Zap style={{ width:"11px", height:"11px", color:"#fff" }} />
                  </div>
                  <span style={{ fontSize:"12.5px", fontWeight:600, color:"rgba(240,244,255,0.8)" }}>AI feedback in under 15 seconds</span>
                </div>

                {/* Headline */}
                <h1 className="display" style={{ marginBottom:"8px" }}>
                  Your personal
                </h1>
                <h1 className="display" style={{
                  marginBottom:"24px",
                  background:"linear-gradient(90deg,#10b981 0%,#38bdf8 50%,#818cf8 100%)",
                  WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
                  backgroundClip:"text",
                }}>
                  IELTS coach.
                </h1>

                <p style={{ fontSize:"19px", lineHeight:1.65, color:"var(--muted)", maxWidth:"460px", marginBottom:"14px" }}>
                  Practice Speaking. Get Feedback.
                </p>
                <p style={{ fontSize:"22px", fontWeight:700, color:"var(--gold)", marginBottom:"40px" }}>
                  Achieve Band 7+ — guaranteed. ✦
                </p>

                {/* CTA row */}
                <div style={{ display:"flex", gap:"12px", flexWrap:"wrap", marginBottom:"52px" }}>
                  <Link href="/signup" className="btn-primary" style={{
                    display:"inline-flex", alignItems:"center", gap:"8px",
                    fontSize:"15px", fontWeight:700, color:"#080c14", textDecoration:"none",
                    background:"linear-gradient(135deg,#f59e0b,#d97706)",
                    borderRadius:"12px", padding:"14px 30px",
                    boxShadow:"0 8px 28px rgba(245,158,11,0.4)",
                  }}>
                    Start for Free <ArrowRight style={{ width:"17px", height:"17px" }} />
                  </Link>
                  <a href="#how-it-works" className="btn-ghost" style={{
                    display:"inline-flex", alignItems:"center", gap:"8px",
                    fontSize:"14px", fontWeight:600, color:"var(--text)", textDecoration:"none",
                    background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)",
                    borderRadius:"12px", padding:"13px 24px",
                  }}>
                    <Play style={{ width:"14px", height:"14px" }} /> See how it works
                  </a>
                </div>

                {/* Trust stats */}
                <div style={{ display:"flex", gap:"0", borderRadius:"12px", border:"1px solid var(--border)", overflow:"hidden", background:"rgba(255,255,255,0.02)" }}>
                  {STATS.map(({ value, label }, i) => (
                    <div key={label} style={{
                      flex:1, padding:"14px 16px", textAlign:"center",
                      borderRight: i < STATS.length - 1 ? "1px solid var(--border)" : "none",
                    }}>
                      <p style={{ fontSize:"20px", fontWeight:800, color:"var(--text)", lineHeight:1, marginBottom:"4px" }}>{value}</p>
                      <p style={{ fontSize:"11px", color:"var(--muted)" }}>{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Right — Dashboard mockup ── */}
              <div className="float" style={{ position:"relative" }}>
                {/* Browser chrome */}
                <div style={{ background:"var(--surface2)", borderRadius:"16px", border:"1px solid var(--border)", overflow:"hidden", boxShadow:"0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)" }}>
                  {/* Title bar */}
                  <div style={{ background:"var(--surface)", padding:"11px 16px", display:"flex", alignItems:"center", gap:"7px", borderBottom:"1px solid var(--border)" }}>
                    <div style={{ width:"10px", height:"10px", borderRadius:"50%", background:"#ef4444", opacity:.8 }} />
                    <div style={{ width:"10px", height:"10px", borderRadius:"50%", background:"#f59e0b", opacity:.8 }} />
                    <div style={{ width:"10px", height:"10px", borderRadius:"50%", background:"#22c55e", opacity:.8 }} />
                    <div style={{ flex:1, background:"rgba(255,255,255,0.05)", borderRadius:"6px", padding:"4px 12px", marginLeft:"8px", fontSize:"11px", color:"rgba(255,255,255,0.3)" }}>
                      ielts-sensei.vercel.app/dashboard
                    </div>
                  </div>

                  {/* Dashboard UI */}
                  <div style={{ padding:"20px", display:"flex", flexDirection:"column", gap:"14px" }}>

                    {/* Greeting */}
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <div>
                        <p style={{ fontSize:"11px", color:"var(--muted)", marginBottom:"2px" }}>Good morning</p>
                        <p style={{ fontSize:"15px", fontWeight:700, color:"var(--text)" }}>Jasurbek 👋</p>
                      </div>
                      <div style={{ background:"rgba(16,185,129,0.12)", border:"1px solid rgba(16,185,129,0.25)", borderRadius:"8px", padding:"6px 12px", fontSize:"11px", fontWeight:600, color:"#10b981" }}>
                        🔥 7-day streak
                      </div>
                    </div>

                    {/* Score circles row */}
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"8px" }}>
                      {[
                        { label:"Listen", score:7.5, color:"#f59e0b", pct:82 },
                        { label:"Read",   score:6.5, color:"#38bdf8", pct:68 },
                        { label:"Write",  score:7.0, color:"#818cf8", pct:76 },
                        { label:"Speak",  score:6.0, color:"#10b981", pct:62 },
                      ].map(({ label, score, color, pct }) => {
                        const r = 26; const c = 2 * Math.PI * r;
                        return (
                          <div key={label} style={{ background:"var(--surface)", borderRadius:"10px", padding:"12px 8px", textAlign:"center", border:"1px solid var(--border)" }}>
                            <svg width="64" height="64" viewBox="0 0 64 64" style={{ display:"block", margin:"0 auto" }}>
                              <circle cx="32" cy="32" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="5"/>
                              <circle cx="32" cy="32" r={r} fill="none" stroke={color} strokeWidth="5"
                                strokeDasharray={`${c}`} strokeDashoffset={`${c - (pct/100)*c}`}
                                strokeLinecap="round" style={{ transform:"rotate(-90deg)", transformOrigin:"50% 50%", transition:"stroke-dashoffset 1s ease" }}/>
                              <text x="32" y="36" textAnchor="middle" fontSize="13" fontWeight="800" fill={color}>{score}</text>
                            </svg>
                            <p style={{ fontSize:"10px", color:"var(--muted)", marginTop:"4px" }}>{label}</p>
                          </div>
                        );
                      })}
                    </div>

                    {/* Next action */}
                    <div style={{ background:"linear-gradient(135deg,rgba(16,185,129,0.1),rgba(16,185,129,0.03))", border:"1px solid rgba(16,185,129,0.2)", borderRadius:"10px", padding:"14px" }}>
                      <p style={{ fontSize:"10px", fontWeight:700, color:"#10b981", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:"4px" }}>⚡ Next action</p>
                      <p style={{ fontSize:"13px", fontWeight:600, color:"var(--text)", marginBottom:"8px" }}>Practice Writing Task 2 — your weakest area</p>
                      <div style={{ display:"inline-flex", alignItems:"center", gap:"5px", background:"#f59e0b", borderRadius:"6px", padding:"5px 12px", fontSize:"11px", fontWeight:700, color:"#080c14" }}>
                        Start now <ArrowRight style={{ width:"11px", height:"11px" }} />
                      </div>
                    </div>

                    {/* Mini chart bars */}
                    <div>
                      <p style={{ fontSize:"10px", color:"var(--muted)", marginBottom:"8px" }}>Band trend — last 8 sessions</p>
                      <div style={{ display:"flex", alignItems:"flex-end", gap:"5px", height:"40px" }}>
                        {[55,60,58,65,70,68,75,78].map((h, i) => (
                          <div key={i} style={{ flex:1, height:`${h}%`, borderRadius:"3px 3px 0 0", background:`rgba(16,185,129,${0.3 + i*0.09})` }} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating badges */}
                <div className="badge-pop" style={{ position:"absolute", top:"-20px", right:"-24px", background:"var(--surface2)", border:"1px solid rgba(16,185,129,0.4)", borderRadius:"12px", padding:"10px 14px", boxShadow:"0 8px 32px rgba(0,0,0,0.4)", backdropFilter:"blur(12px)" }}>
                  <p style={{ fontSize:"10px", color:"var(--muted)", marginBottom:"2px" }}>Speaking score</p>
                  <p style={{ fontSize:"22px", fontWeight:900, color:"#10b981", lineHeight:1 }}>7.5 ✦</p>
                </div>
                <div className="badge-pop" style={{ position:"absolute", bottom:"-16px", left:"-20px", background:"var(--surface2)", border:"1px solid rgba(245,158,11,0.4)", borderRadius:"12px", padding:"10px 14px", boxShadow:"0 8px 32px rgba(0,0,0,0.4)", backdropFilter:"blur(12px)", animationDelay:"0.2s" }}>
                  <p style={{ fontSize:"10px", color:"var(--muted)", marginBottom:"2px" }}>Writing feedback</p>
                  <p style={{ fontSize:"13px", fontWeight:700, color:"#f59e0b" }}>Ready in 12s ⚡</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            TICKER — social proof strip
        ══════════════════════════════════════════════════════════════════════ */}
        <div style={{ borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)", padding:"14px 0", overflow:"hidden", background:"rgba(255,255,255,0.015)" }}>
          <div className="ticker" style={{ display:"flex", gap:"48px", whiteSpace:"nowrap", width:"max-content" }}>
            {[...Array(2)].map((_, rep) => (
              ["10,000+ students trained","4.9 / 5 average rating","95% success rate","AI feedback in &lt;15s","Band 7+ guaranteed","Speaking · Writing · Reading · Listening","Cambridge exam format","Free to start"].map((item, i) => (
                <span key={`${rep}-${i}`} style={{ fontSize:"13px", fontWeight:500, color:"var(--muted)", display:"flex", alignItems:"center", gap:"20px" }}>
                  <span style={{ color:"#10b981", fontSize:"8px" }}>◆</span>
                  <span dangerouslySetInnerHTML={{ __html: item }} />
                </span>
              ))
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            BENTO FEATURES  —  Ramp / Attio inspired grid
        ══════════════════════════════════════════════════════════════════════ */}
        <section id="features" style={{ padding:"120px 32px", background:"var(--black)" }}>
          <div style={{ maxWidth:"1200px", margin:"0 auto" }}>

            <div style={{ textAlign:"center", marginBottom:"72px" }}>
              <p className="label" style={{ marginBottom:"14px" }}>Features</p>
              <h2 className="h2" style={{ marginBottom:"16px" }}>
                All four skills.<br />One intelligent platform.
              </h2>
              <p style={{ fontSize:"17px", color:"var(--muted)", maxWidth:"480px", margin:"0 auto", lineHeight:1.65 }}>
                Real exam conditions. AI examiner feedback. Results that actually move your band score.
              </p>
            </div>

            {/* Bento grid */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(12,1fr)", gridTemplateRows:"auto", gap:"16px" }}>

              {/* Large card — Speaking */}
              <div className="card-hover" style={{
                gridColumn:"1 / 8", gridRow:"1",
                background:"var(--surface)", borderRadius:"20px",
                border:"1px solid var(--border)", padding:"36px",
                position:"relative", overflow:"hidden",
              }}>
                <div style={{ position:"absolute", top:0, left:0, width:"100%", height:"3px", background:"linear-gradient(90deg,#10b981,transparent)" }} />
                <div style={{ position:"absolute", bottom:"-60px", right:"-60px", width:"220px", height:"220px", borderRadius:"50%", background:"radial-gradient(circle,rgba(16,185,129,0.08) 0%,transparent 70%)" }} />

                <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"20px" }}>
                  <div style={{ width:"44px", height:"44px", borderRadius:"12px", background:"rgba(16,185,129,0.12)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <Mic style={{ width:"22px", height:"22px", color:"#10b981" }} />
                  </div>
                  <span style={{ fontSize:"11px", fontWeight:700, color:"#10b981", textTransform:"uppercase", letterSpacing:"0.13em" }}>Speaking</span>
                </div>

                <h3 style={{ fontSize:"26px", fontWeight:800, color:"var(--text)", letterSpacing:"-0.025em", marginBottom:"12px", lineHeight:1.2 }}>
                  Sound like a<br />Band 8 candidate.
                </h3>
                <p style={{ fontSize:"15px", color:"var(--muted)", lineHeight:1.65, marginBottom:"24px", maxWidth:"360px" }}>
                  50+ real IELTS cue cards. AI analyses fluency, grammar, pronunciation and lexical range — all in 12 seconds.
                </p>

                <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
                  {["Parts 1, 2 & 3","Pronunciation analysis","Real cue cards","Full mock"].map(tag => (
                    <span key={tag} style={{ fontSize:"12px", fontWeight:500, color:"#10b981", background:"rgba(16,185,129,0.1)", border:"1px solid rgba(16,185,129,0.2)", borderRadius:"6px", padding:"4px 10px" }}>{tag}</span>
                  ))}
                </div>

                <Link href="/signup" style={{ display:"inline-flex", alignItems:"center", gap:"6px", marginTop:"24px", fontSize:"13px", fontWeight:600, color:"#10b981", textDecoration:"none" }}>
                  Practice Speaking <ChevronRight style={{ width:"14px", height:"14px" }} />
                </Link>
              </div>

              {/* Writing */}
              <div className="card-hover" style={{
                gridColumn:"8 / 13", gridRow:"1",
                background:"var(--surface)", borderRadius:"20px",
                border:"1px solid var(--border)", padding:"28px",
                position:"relative", overflow:"hidden",
              }}>
                <div style={{ position:"absolute", top:0, left:0, width:"100%", height:"3px", background:"linear-gradient(90deg,#818cf8,transparent)" }} />
                <div style={{ width:"40px", height:"40px", borderRadius:"11px", background:"rgba(129,140,248,0.12)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"14px" }}>
                  <BookOpen style={{ width:"20px", height:"20px", color:"#818cf8" }} />
                </div>
                <span style={{ fontSize:"10px", fontWeight:700, color:"#818cf8", textTransform:"uppercase", letterSpacing:"0.13em", display:"block", marginBottom:"8px" }}>Writing</span>
                <h3 style={{ fontSize:"19px", fontWeight:800, color:"var(--text)", letterSpacing:"-0.02em", marginBottom:"10px", lineHeight:1.25 }}>Task 1 & Task 2.<br />Scored in 15 seconds.</h3>
                <p style={{ fontSize:"13.5px", color:"var(--muted)", lineHeight:1.6, marginBottom:"16px" }}>Examiner-grade band scores + model answers at every level.</p>
                <div style={{ display:"flex", gap:"6px", flexWrap:"wrap" }}>
                  {["Academic & GT","Grammar fix","Model answers"].map(t => (
                    <span key={t} style={{ fontSize:"11px", color:"#818cf8", background:"rgba(129,140,248,0.1)", border:"1px solid rgba(129,140,248,0.2)", borderRadius:"5px", padding:"3px 8px" }}>{t}</span>
                  ))}
                </div>
              </div>

              {/* Listening */}
              <div className="card-hover" style={{
                gridColumn:"1 / 5", gridRow:"2",
                background:"var(--surface)", borderRadius:"20px",
                border:"1px solid var(--border)", padding:"28px",
                position:"relative", overflow:"hidden",
              }}>
                <div style={{ position:"absolute", top:0, left:0, width:"100%", height:"3px", background:"linear-gradient(90deg,#f59e0b,transparent)" }} />
                <div style={{ width:"40px", height:"40px", borderRadius:"11px", background:"rgba(245,158,11,0.12)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"14px" }}>
                  <Headphones style={{ width:"20px", height:"20px", color:"#f59e0b" }} />
                </div>
                <span style={{ fontSize:"10px", fontWeight:700, color:"#f59e0b", textTransform:"uppercase", letterSpacing:"0.13em", display:"block", marginBottom:"8px" }}>Listening</span>
                <h3 style={{ fontSize:"19px", fontWeight:800, color:"var(--text)", letterSpacing:"-0.02em", marginBottom:"10px", lineHeight:1.25 }}>Cambridge format.<br />Auto-scored.</h3>
                <p style={{ fontSize:"13.5px", color:"var(--muted)", lineHeight:1.6 }}>4 sections, 40 questions, one-play audio — exactly like the real exam.</p>
              </div>

              {/* Reading */}
              <div className="card-hover" style={{
                gridColumn:"5 / 9", gridRow:"2",
                background:"var(--surface)", borderRadius:"20px",
                border:"1px solid var(--border)", padding:"28px",
                position:"relative", overflow:"hidden",
              }}>
                <div style={{ position:"absolute", top:0, left:0, width:"100%", height:"3px", background:"linear-gradient(90deg,#38bdf8,transparent)" }} />
                <div style={{ width:"40px", height:"40px", borderRadius:"11px", background:"rgba(56,189,248,0.12)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"14px" }}>
                  <BookMarked style={{ width:"20px", height:"20px", color:"#38bdf8" }} />
                </div>
                <span style={{ fontSize:"10px", fontWeight:700, color:"#38bdf8", textTransform:"uppercase", letterSpacing:"0.13em", display:"block", marginBottom:"8px" }}>Reading</span>
                <h3 style={{ fontSize:"19px", fontWeight:800, color:"var(--text)", letterSpacing:"-0.02em", marginBottom:"10px", lineHeight:1.25 }}>60 min. 40 Qs.<br />Instant results.</h3>
                <p style={{ fontSize:"13.5px", color:"var(--muted)", lineHeight:1.6 }}>Academic passages with full answer explanations and per-skill band breakdown.</p>
              </div>

              {/* Analytics stat card */}
              <div className="card-hover" style={{
                gridColumn:"9 / 13", gridRow:"2",
                background:"linear-gradient(135deg,rgba(16,185,129,0.08),rgba(56,189,248,0.05))",
                borderRadius:"20px", border:"1px solid rgba(16,185,129,0.2)", padding:"28px",
                display:"flex", flexDirection:"column", justifyContent:"space-between",
              }}>
                <div>
                  <TrendingUp style={{ width:"32px", height:"32px", color:"#10b981", marginBottom:"12px" }} />
                  <h3 style={{ fontSize:"19px", fontWeight:800, color:"var(--text)", letterSpacing:"-0.02em", marginBottom:"10px" }}>Track every score.</h3>
                  <p style={{ fontSize:"13.5px", color:"var(--muted)", lineHeight:1.6 }}>Band trends, weak-point detection, personalised study plan.</p>
                </div>
                <div style={{ display:"flex", alignItems:"flex-end", gap:"5px", height:"44px", marginTop:"20px" }}>
                  {[40,55,50,65,70,68,80,85].map((h, i) => (
                    <div key={i} style={{ flex:1, height:`${h}%`, borderRadius:"3px 3px 0 0", background:`rgba(16,185,129,${0.25 + i*0.09})` }} />
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            HOW IT WORKS  —  numbered steps
        ══════════════════════════════════════════════════════════════════════ */}
        <section id="how-it-works" style={{ padding:"120px 32px", background:"var(--surface)" }}>
          <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"80px", alignItems:"center" }}>

              <div>
                <p className="label" style={{ marginBottom:"14px" }}>How it works</p>
                <h2 className="h2" style={{ marginBottom:"48px" }}>Four steps to your<br />target band score.</h2>

                <div style={{ display:"flex", flexDirection:"column", gap:"32px" }}>
                  {STEPS.map(({ n, title, body }) => (
                    <div key={n} style={{ display:"flex", gap:"20px" }}>
                      <div style={{ flexShrink:0, width:"40px", height:"40px", borderRadius:"10px", border:"1px solid var(--border)", background:"var(--black)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"12px", fontWeight:800, color:"var(--accent)", letterSpacing:"-0.01em" }}>
                        {n}
                      </div>
                      <div>
                        <p style={{ fontSize:"16px", fontWeight:700, color:"var(--text)", marginBottom:"6px" }}>{title}</p>
                        <p style={{ fontSize:"14px", color:"var(--muted)", lineHeight:1.65 }}>{body}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Link href="/signup" className="btn-primary" style={{
                  display:"inline-flex", alignItems:"center", gap:"8px", marginTop:"40px",
                  fontSize:"14px", fontWeight:700, color:"#080c14", textDecoration:"none",
                  background:"linear-gradient(135deg,#f59e0b,#d97706)",
                  borderRadius:"10px", padding:"12px 26px",
                  boxShadow:"0 6px 20px rgba(245,158,11,0.35)",
                }}>
                  Try it free <ArrowRight style={{ width:"16px", height:"16px" }} />
                </Link>
              </div>

              {/* Right — guarantee box */}
              <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
                <div style={{ background:"var(--black)", borderRadius:"20px", border:"1px solid var(--border)", padding:"32px" }}>
                  <Shield style={{ width:"32px", height:"32px", color:"#10b981", marginBottom:"16px" }} />
                  <h3 style={{ fontSize:"22px", fontWeight:800, color:"var(--text)", letterSpacing:"-0.02em", marginBottom:"12px" }}>Band score guarantee.</h3>
                  <p style={{ fontSize:"15px", color:"var(--muted)", lineHeight:1.65, marginBottom:"20px" }}>
                    Practice consistently for 4 weeks. If your band score doesn&apos;t improve, we refund every penny — no questions.
                  </p>
                  <div style={{ display:"flex", gap:"16px" }}>
                    {[{ v:"95%", l:"Success rate" }, { v:"4 wks", l:"Average to improve" }, { v:"0 risk", l:"Money-back" }].map(({ v, l }) => (
                      <div key={l} style={{ textAlign:"center" }}>
                        <p style={{ fontSize:"20px", fontWeight:800, color:"#10b981", marginBottom:"2px" }}>{v}</p>
                        <p style={{ fontSize:"11px", color:"var(--muted)" }}>{l}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ background:"var(--black)", borderRadius:"20px", border:"1px solid var(--border)", padding:"28px" }}>
                  <Clock style={{ width:"28px", height:"28px", color:"#f59e0b", marginBottom:"12px" }} />
                  <h3 style={{ fontSize:"18px", fontWeight:700, color:"var(--text)", marginBottom:"8px" }}>Available 24 / 7.</h3>
                  <p style={{ fontSize:"14px", color:"var(--muted)", lineHeight:1.6 }}>
                    No waiting for a tutor. Practice at 2 am before your exam. Your AI coach never sleeps.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            REVIEWS  —  masonry-style
        ══════════════════════════════════════════════════════════════════════ */}
        <section id="reviews" style={{ padding:"120px 32px", background:"var(--black)" }}>
          <div style={{ maxWidth:"1200px", margin:"0 auto" }}>

            <div style={{ textAlign:"center", marginBottom:"72px" }}>
              <p className="label" style={{ marginBottom:"14px" }}>Real students</p>
              <h2 className="h2" style={{ marginBottom:"16px" }}>They made it to Band 7+.<br />You&apos;re next.</h2>
            </div>

            <div style={{ columns:"3", columnGap:"16px" }}>
              {TESTIMONIALS.map(({ initials, color, name, country, band, prev, quote }) => (
                <div key={name} className="card-hover" style={{
                  background:"var(--surface)", borderRadius:"16px",
                  border:"1px solid var(--border)", padding:"24px",
                  breakInside:"avoid", marginBottom:"16px", display:"block",
                }}>
                  <div style={{ display:"flex", gap:"3px", marginBottom:"14px" }}>
                    {[1,2,3,4,5].map(i => <Star key={i} style={{ width:"12px", height:"12px", color:"#f59e0b", fill:"#f59e0b" }} />)}
                  </div>
                  <p style={{ fontSize:"14px", color:"rgba(240,244,255,0.75)", lineHeight:1.7, marginBottom:"20px" }}>
                    &ldquo;{quote}&rdquo;
                  </p>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                      <div style={{ width:"36px", height:"36px", borderRadius:"50%", background:color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"14px", fontWeight:700, color:"#fff" }}>
                        {initials}
                      </div>
                      <div>
                        <p style={{ fontSize:"13px", fontWeight:600, color:"var(--text)", margin:0 }}>{country} {name}</p>
                      </div>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <p style={{ fontSize:"17px", fontWeight:900, color:"#f59e0b", margin:0, letterSpacing:"-0.01em" }}>Band {band}</p>
                      <p style={{ fontSize:"10px", color:"var(--muted)", margin:0 }}>was {prev}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            PRICING
        ══════════════════════════════════════════════════════════════════════ */}
        <section id="pricing" style={{ padding:"120px 32px", background:"var(--surface)" }}>
          <div style={{ maxWidth:"1200px", margin:"0 auto" }}>

            <div style={{ textAlign:"center", marginBottom:"72px" }}>
              <p className="label" style={{ marginBottom:"14px", color:"var(--gold)" }}>Pricing</p>
              <h2 className="h2" style={{ marginBottom:"14px" }}>Simple, honest pricing.</h2>
              <p style={{ fontSize:"16px", color:"var(--muted)" }}>Start free. Upgrade when you&apos;re ready to go all-in.</p>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"20px", alignItems:"start" }}>
              {PLANS.map(({ name, badge, price, per, desc, highlight, perks, cta }) => (
                <div key={name} className="plan-hover" style={{
                  background: highlight ? "var(--black)" : "var(--black)",
                  borderRadius:"20px",
                  border: highlight ? "2px solid #f59e0b" : "1.5px solid var(--border)",
                  padding:"32px",
                  position:"relative",
                  boxShadow: highlight ? "0 0 0 1px rgba(245,158,11,0.1), 0 24px 60px rgba(245,158,11,0.12)" : "none",
                  transform: highlight ? "scale(1.03)" : "none",
                }}>
                  {badge && (
                    <div style={{ position:"absolute", top:"-14px", left:"50%", transform:"translateX(-50%)", background:"linear-gradient(135deg,#f59e0b,#d97706)", borderRadius:"999px", padding:"5px 16px", fontSize:"11px", fontWeight:700, color:"#080c14", whiteSpace:"nowrap" }}>
                      ✦ {badge}
                    </div>
                  )}

                  <p style={{ fontSize:"12px", fontWeight:700, color: highlight ? "#f59e0b" : "var(--muted)", textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:"10px" }}>{name}</p>

                  <div style={{ display:"flex", alignItems:"baseline", gap:"4px", marginBottom:"8px" }}>
                    <span style={{ fontSize:"42px", fontWeight:900, color:"var(--text)", letterSpacing:"-0.03em" }}>{price}</span>
                    {per && <span style={{ fontSize:"15px", color:"var(--muted)" }}>{per}</span>}
                  </div>
                  <p style={{ fontSize:"14px", color:"var(--muted)", marginBottom:"28px" }}>{desc}</p>

                  <div style={{ height:"1px", background:"var(--border)", marginBottom:"24px" }} />

                  <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"12px", marginBottom:"28px" }}>
                    {perks.map(p => (
                      <li key={p} style={{ display:"flex", gap:"10px", alignItems:"flex-start", fontSize:"14px", color:"rgba(240,244,255,0.75)", lineHeight:1.45 }}>
                        <CheckCircle2 style={{ width:"15px", height:"15px", color: highlight ? "#f59e0b" : "#10b981", marginTop:"1px", flexShrink:0 }} />
                        {p}
                      </li>
                    ))}
                  </ul>

                  <Link href="/signup" className={highlight ? "btn-primary" : "btn-ghost"} style={{
                    display:"block", textAlign:"center",
                    fontSize:"14px", fontWeight:700, textDecoration:"none",
                    color: highlight ? "#080c14" : "var(--text)",
                    background: highlight ? "linear-gradient(135deg,#f59e0b,#d97706)" : "rgba(255,255,255,0.05)",
                    borderRadius:"10px", padding:"13px",
                    border: highlight ? "none" : "1px solid var(--border)",
                    boxShadow: highlight ? "0 6px 24px rgba(245,158,11,0.35)" : "none",
                  }}>
                    {cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            FINAL CTA
        ══════════════════════════════════════════════════════════════════════ */}
        <section style={{ padding:"140px 32px", position:"relative", overflow:"hidden", background:"var(--black)" }}>
          <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 70% 60% at 50% 50%,rgba(16,185,129,0.07) 0%,transparent 65%)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)", backgroundSize:"60px 60px", pointerEvents:"none" }} />

          <div style={{ maxWidth:"700px", margin:"0 auto", textAlign:"center", position:"relative", zIndex:1 }}>
            <div style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", width:"64px", height:"64px", borderRadius:"18px", background:"rgba(16,185,129,0.1)", border:"1px solid rgba(16,185,129,0.25)", marginBottom:"28px" }}>
              <GraduationCap style={{ width:"30px", height:"30px", color:"#10b981" }} />
            </div>

            <h2 style={{ fontSize:"clamp(36px,5vw,64px)", fontWeight:900, color:"var(--text)", letterSpacing:"-0.04em", lineHeight:1.05, marginBottom:"20px" }}>
              Your Band 7+ is<br />
              <span style={{ background:"linear-gradient(90deg,#f59e0b,#f97316)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                one session away.
              </span>
            </h2>
            <p style={{ fontSize:"18px", color:"var(--muted)", lineHeight:1.65, marginBottom:"40px" }}>
              Join 10,000+ students already training smarter.<br />Free to start. No credit card required.
            </p>

            <div style={{ display:"flex", gap:"12px", justifyContent:"center", flexWrap:"wrap" }}>
              <Link href="/signup" className="btn-primary" style={{
                display:"inline-flex", alignItems:"center", gap:"10px",
                fontSize:"16px", fontWeight:700, color:"#080c14", textDecoration:"none",
                background:"linear-gradient(135deg,#f59e0b,#d97706)",
                borderRadius:"14px", padding:"16px 36px",
                boxShadow:"0 10px 40px rgba(245,158,11,0.45)",
              }}>
                Start for Free <ArrowRight style={{ width:"18px", height:"18px" }} />
              </Link>
              <Link href="/login" className="btn-ghost" style={{
                display:"inline-flex", alignItems:"center", gap:"8px",
                fontSize:"15px", fontWeight:600, color:"var(--text)", textDecoration:"none",
                background:"rgba(255,255,255,0.04)", border:"1px solid var(--border)",
                borderRadius:"14px", padding:"15px 28px",
              }}>
                Sign in
              </Link>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            FOOTER
        ══════════════════════════════════════════════════════════════════════ */}
        <footer style={{ padding:"40px 32px", background:"var(--surface)", borderTop:"1px solid var(--border)" }}>
          <div style={{ maxWidth:"1200px", margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"16px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"9px" }}>
              <div style={{ width:"28px", height:"28px", borderRadius:"7px", background:"rgba(16,185,129,0.15)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <GraduationCap style={{ width:"14px", height:"14px", color:"#10b981" }} />
              </div>
              <span style={{ fontSize:"14px", fontWeight:700, color:"var(--muted)" }}>IELTS Sensei</span>
            </div>
            <p style={{ fontSize:"12px", color:"rgba(255,255,255,0.2)", margin:0 }}>
              © {new Date().getFullYear()} IELTS Sensei. All rights reserved.
            </p>
            <div style={{ display:"flex", gap:"24px" }}>
              {["Privacy","Terms","Contact"].map(item => (
                <a key={item} href="#" style={{ fontSize:"12px", color:"rgba(255,255,255,0.3)", textDecoration:"none" }}>{item}</a>
              ))}
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
