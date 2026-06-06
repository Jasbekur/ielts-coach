import Link from "next/link";
import {
  GraduationCap, Mic, BookOpen, BookMarked, Headphones,
  ArrowRight, CheckCircle2, Star, Zap, TrendingUp,
  Users, Clock, Shield, ChevronRight, Play, Sparkles,
} from "lucide-react";

/* ─── DATA ────────────────────────────────────────────────────────────────── */

const STATS = [
  { value: "10,000+", label: "active students",   color: "#6366f1" },
  { value: "4.9★",   label: "average rating",     color: "#f59e0b" },
  { value: "95%",    label: "hit their band goal", color: "#10b981" },
  { value: "<15s",   label: "AI feedback speed",   color: "#f43f5e" },
];

const SKILLS = [
  { icon: Mic,        label: "Speaking",  color: "#ffffff", bg: "linear-gradient(135deg,#10b981,#059669)",
    desc: "50+ real cue cards. AI scores fluency, grammar & pronunciation in 12 seconds.",
    tags: ["Parts 1–3", "Pronunciation", "Full mock"] },
  { icon: BookOpen,   label: "Writing",   color: "#ffffff", bg: "linear-gradient(135deg,#8b5cf6,#6d28d9)",
    desc: "Task 1 & Task 2 scored in 15 seconds with model answers at every band level.",
    tags: ["Academic & GT", "Grammar fix", "Model answers"] },
  { icon: Headphones, label: "Listening", color: "#ffffff", bg: "linear-gradient(135deg,#f59e0b,#d97706)",
    desc: "Cambridge format. 4 sections. 40 questions. Audio plays once — just like the real exam.",
    tags: ["Full mock", "Part 1–4", "Auto-scored"] },
  { icon: BookMarked, label: "Reading",   color: "#ffffff", bg: "linear-gradient(135deg,#0ea5e9,#0284c7)",
    desc: "3 passages. 60 minutes. Instant results with full answer explanations.",
    tags: ["Timed exam", "Answer review", "All question types"] },
];

const STEPS = [
  { n: "1", title: "Pick your skill",   body: "Choose any of the four IELTS skills, or run a full mock that mirrors the real exam.", color: "#6366f1" },
  { n: "2", title: "Practice freely",   body: "Work at your own pace or under timed exam conditions — your choice, anytime.", color: "#10b981" },
  { n: "3", title: "Get AI feedback",   body: "Receive examiner-grade scores and corrections in under 15 seconds, day or night.", color: "#f59e0b" },
  { n: "4", title: "Hit your band",     body: "Your dashboard shows exactly what to fix next so every session moves the needle.", color: "#f43f5e" },
];

const TESTIMONIALS = [
  { initials:"D", grad:"linear-gradient(135deg,#10b981,#059669)", name:"Dilnoza T.", country:"🇺🇿", band:"7.5", prev:"6.0", weeks:6,
    quote:"The AI caught pronunciation mistakes my teacher never noticed in 2 years. 6 weeks later — 7.5." },
  { initials:"A", grad:"linear-gradient(135deg,#8b5cf6,#6d28d9)", name:"Arjun P.",   country:"🇮🇳", band:"8.0", prev:"6.5", weeks:10,
    quote:"I practiced 10 essays a day and watched my score climb in real time. Nothing else comes close." },
  { initials:"Y", grad:"linear-gradient(135deg,#0ea5e9,#0284c7)", name:"Yuna K.",    country:"🇰🇷", band:"7.0", prev:"5.5", weeks:8,
    quote:"I walked into the exam completely calm. The full mock tests prepared me for absolutely everything." },
  { initials:"F", grad:"linear-gradient(135deg,#f59e0b,#d97706)", name:"Fatima A.",  country:"🇸🇦", band:"8.5", prev:"7.0", weeks:12,
    quote:"The model answers showed me exactly what examiners want. I finally understood coherence." },
  { initials:"B", grad:"linear-gradient(135deg,#f43f5e,#e11d48)", name:"Bekzod U.",  country:"🇺🇿", band:"7.5", prev:"5.5", weeks:9,
    quote:"I failed IELTS twice before Sensei. 9 weeks later: 7.5. My UK visa is approved. Life changed." },
  { initials:"P", grad:"linear-gradient(135deg,#06b6d4,#0891b2)", name:"Priya S.",   country:"🇮🇳", band:"8.0", prev:"7.0", weeks:7,
    quote:"The grammar corrections teach you WHY you were wrong, not just what. Absolute game changer." },
];

const PLANS = [
  {
    name: "Starter", badge: null, price: "Free", desc: "Try everything, no commitment.",
    highlight: false, accentColor: "#6366f1",
    perks: ["10 AI writing scores / month","5 speaking attempts / month","Full reading & listening","Basic score history"],
    cta: "Start free",
  },
  {
    name: "Coach", badge: "Most Popular", price: "$12", per: "/mo", desc: "Everything to reach Band 7+.",
    highlight: true, accentColor: "#f59e0b",
    perks: ["Unlimited AI writing scores","Unlimited speaking attempts","Full mock tests (all 4 skills)","Band trend charts","Model answers every level","Priority AI response"],
    cta: "Get Coach",
  },
  {
    name: "Elite", badge: null, price: "$29", per: "/mo", desc: "For serious Band 8+ candidates.",
    highlight: false, accentColor: "#10b981",
    perks: ["Everything in Coach","Personalised study plan","Weak-point AI detection","1-on-1 tutor (2×/mo)","Exam-day strategy guide","Lifetime score archive"],
    cta: "Go Elite",
  },
];

/* ─── PAGE ────────────────────────────────────────────────────────────────── */

export default function LandingPage() {
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes float    { 0%,100%{ transform:translateY(0);     } 50%{ transform:translateY(-14px);   } }
        @keyframes fadeUp   { from{ opacity:0;transform:translateY(22px); } to{ opacity:1;transform:translateY(0); } }
        @keyframes ticker   { 0%{ transform:translateX(0); } 100%{ transform:translateX(-50%); } }
        @keyframes spin     { from{transform:rotate(0deg);}to{transform:rotate(360deg);} }
        @keyframes pulse-ring { 0%,100%{box-shadow:0 0 0 0 rgba(99,102,241,.35);} 50%{box-shadow:0 0 0 14px rgba(99,102,241,0);} }

        .float   { animation: float 4s ease-in-out infinite; }
        .ticker  { animation: ticker 30s linear infinite; }
        .ticker:hover{ animation-play-state:paused; }
        .fade-up { animation: fadeUp .65s ease both; }

        .card-lift { transition: transform .2s ease, box-shadow .2s ease; }
        .card-lift:hover { transform: translateY(-6px); box-shadow: 0 28px 60px rgba(0,0,0,.13) !important; }

        .btn-gold { transition: transform .15s, box-shadow .15s; }
        .btn-gold:hover { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(245,158,11,.5) !important; }

        .btn-outline { transition: background .15s, border-color .15s; }
        .btn-outline:hover { background: rgba(255,255,255,.15) !important; }

        .plan-lift { transition: transform .2s ease; }
        .plan-lift:hover { transform: translateY(-4px); }

        .nav-a { transition: color .15s; }
        .nav-a:hover { color: #6366f1 !important; }

        .skill-card { transition: transform .2s ease, box-shadow .2s ease; }
        .skill-card:hover { transform: translateY(-5px) scale(1.01); box-shadow: 0 30px 60px rgba(0,0,0,.15) !important; }
      `}</style>

      <div style={{ fontFamily:"'Inter',system-ui,sans-serif", background:"#ffffff", color:"#0f172a", overflowX:"hidden" }}>

        {/* ══ NAV ══════════════════════════════════════════════════════════════ */}
        <header style={{
          position:"sticky", top:0, zIndex:200,
          background:"rgba(255,255,255,0.85)", backdropFilter:"blur(20px)",
          borderBottom:"1px solid rgba(0,0,0,0.07)",
        }}>
          <nav style={{ maxWidth:"1200px", margin:"0 auto", padding:"0 32px", height:"64px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>

            <Link href="/" style={{ display:"flex", alignItems:"center", gap:"10px", textDecoration:"none" }}>
              <div style={{ width:"38px", height:"38px", borderRadius:"10px", background:"linear-gradient(135deg,#6366f1,#4f46e5)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 14px rgba(99,102,241,0.4)" }}>
                <GraduationCap style={{ width:"20px", height:"20px", color:"#fff" }} />
              </div>
              <div>
                <p style={{ fontWeight:800, fontSize:"15px", color:"#0f172a", lineHeight:1, margin:0 }}>IELTS Sensei</p>
                <p style={{ fontSize:"9px", fontWeight:700, color:"#6366f1", textTransform:"uppercase", letterSpacing:"1.5px", margin:0 }}>AI Exam Coach</p>
              </div>
            </Link>

            <div style={{ display:"flex", gap:"32px" }}>
              {["Features","How it works","Pricing","Reviews"].map(item => (
                <a key={item} href={`#${item.toLowerCase().replace(/ /g,"-")}`} className="nav-a"
                  style={{ fontSize:"14px", fontWeight:500, color:"#64748b", textDecoration:"none" }}>
                  {item}
                </a>
              ))}
            </div>

            <div style={{ display:"flex", gap:"10px", alignItems:"center" }}>
              <Link href="/login" className="nav-a" style={{ fontSize:"14px", fontWeight:500, color:"#64748b", textDecoration:"none" }}>Sign in</Link>
              <Link href="/signup" className="btn-gold" style={{
                fontSize:"14px", fontWeight:700, color:"#fff", textDecoration:"none",
                background:"linear-gradient(135deg,#f59e0b,#d97706)",
                borderRadius:"10px", padding:"9px 20px",
                boxShadow:"0 4px 16px rgba(245,158,11,0.35)",
              }}>
                Start free →
              </Link>
            </div>
          </nav>
        </header>

        {/* ══ HERO ═════════════════════════════════════════════════════════════ */}
        <section style={{
          background:"linear-gradient(135deg, #4f46e5 0%, #7c3aed 25%, #0ea5e9 60%, #10b981 100%)",
          padding:"90px 32px 110px", position:"relative", overflow:"hidden",
          minHeight:"92vh", display:"flex", alignItems:"center",
        }}>
          {/* Texture overlay */}
          <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(255,255,255,0.12) 1px,transparent 1px)", backgroundSize:"32px 32px", pointerEvents:"none" }} />
          {/* Light flare */}
          <div style={{ position:"absolute", top:"-30%", right:"-10%", width:"700px", height:"700px", borderRadius:"50%", background:"radial-gradient(circle,rgba(255,255,255,0.12) 0%,transparent 65%)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", bottom:"-20%", left:"-5%", width:"500px", height:"500px", borderRadius:"50%", background:"radial-gradient(circle,rgba(255,255,255,0.08) 0%,transparent 65%)", pointerEvents:"none" }} />

          <div style={{ maxWidth:"1200px", margin:"0 auto", width:"100%", position:"relative", zIndex:1 }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"72px", alignItems:"center" }}>

              {/* LEFT */}
              <div>
                {/* Pill */}
                <div style={{ display:"inline-flex", alignItems:"center", gap:"8px", background:"rgba(255,255,255,0.18)", backdropFilter:"blur(12px)", border:"1px solid rgba(255,255,255,0.3)", borderRadius:"999px", padding:"6px 16px 6px 8px", marginBottom:"28px" }}>
                  <div style={{ width:"22px", height:"22px", borderRadius:"50%", background:"rgba(255,255,255,0.9)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <Sparkles style={{ width:"12px", height:"12px", color:"#6366f1" }} />
                  </div>
                  <span style={{ fontSize:"13px", fontWeight:600, color:"rgba(255,255,255,0.95)" }}>AI feedback in under 15 seconds</span>
                </div>

                <h1 style={{ fontSize:"clamp(42px,5.5vw,72px)", fontWeight:900, lineHeight:1.06, letterSpacing:"-0.035em", color:"#ffffff", marginBottom:"10px" }}>
                  Your Personal
                </h1>
                <h1 style={{ fontSize:"clamp(42px,5.5vw,72px)", fontWeight:900, lineHeight:1.06, letterSpacing:"-0.035em", color:"rgba(255,255,255,0.9)", marginBottom:"24px", textShadow:"0 2px 30px rgba(0,0,0,0.15)" }}>
                  IELTS Coach. 🎓
                </h1>

                <p style={{ fontSize:"20px", lineHeight:1.6, color:"rgba(255,255,255,0.85)", marginBottom:"10px", fontWeight:500 }}>
                  Practice Speaking. Get Feedback.
                </p>
                <p style={{ fontSize:"22px", fontWeight:800, color:"#fef08a", marginBottom:"40px", letterSpacing:"-0.01em" }}>
                  Achieve Band 7+ — guaranteed. ✦
                </p>

                <div style={{ display:"flex", gap:"12px", flexWrap:"wrap", marginBottom:"52px" }}>
                  <Link href="/signup" className="btn-gold" style={{
                    display:"inline-flex", alignItems:"center", gap:"9px",
                    fontSize:"16px", fontWeight:800, color:"#0f172a", textDecoration:"none",
                    background:"linear-gradient(135deg,#fbbf24,#f59e0b)",
                    borderRadius:"14px", padding:"15px 32px",
                    boxShadow:"0 8px 32px rgba(0,0,0,0.25)",
                  }}>
                    Start for Free <ArrowRight style={{ width:"18px", height:"18px" }} />
                  </Link>
                  <a href="#how-it-works" className="btn-outline" style={{
                    display:"inline-flex", alignItems:"center", gap:"8px",
                    fontSize:"15px", fontWeight:600, color:"#ffffff", textDecoration:"none",
                    background:"rgba(255,255,255,0.12)", border:"1.5px solid rgba(255,255,255,0.35)",
                    borderRadius:"14px", padding:"14px 26px", backdropFilter:"blur(8px)",
                  }}>
                    <Play style={{ width:"15px", height:"15px" }} /> Watch demo
                  </a>
                </div>

                {/* Stats row */}
                <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"2px", background:"rgba(255,255,255,0.15)", borderRadius:"14px", overflow:"hidden", border:"1px solid rgba(255,255,255,0.2)" }}>
                  {STATS.map(({ value, label }) => (
                    <div key={label} style={{ padding:"14px 12px", textAlign:"center", background:"rgba(255,255,255,0.08)", backdropFilter:"blur(8px)" }}>
                      <p style={{ fontSize:"20px", fontWeight:900, color:"#ffffff", lineHeight:1, marginBottom:"4px", letterSpacing:"-0.02em" }}>{value}</p>
                      <p style={{ fontSize:"10px", color:"rgba(255,255,255,0.7)", fontWeight:500 }}>{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT — floating dashboard */}
              <div className="float" style={{ position:"relative" }}>
                <div style={{
                  background:"rgba(255,255,255,0.95)", backdropFilter:"blur(20px)",
                  borderRadius:"20px", overflow:"hidden",
                  boxShadow:"0 40px 100px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.5)",
                }}>
                  {/* Browser bar */}
                  <div style={{ background:"#f1f5f9", padding:"11px 16px", display:"flex", alignItems:"center", gap:"7px", borderBottom:"1px solid #e2e8f0" }}>
                    <div style={{ width:"10px", height:"10px", borderRadius:"50%", background:"#ef4444" }} />
                    <div style={{ width:"10px", height:"10px", borderRadius:"50%", background:"#f59e0b" }} />
                    <div style={{ width:"10px", height:"10px", borderRadius:"50%", background:"#22c55e" }} />
                    <div style={{ flex:1, background:"#e2e8f0", borderRadius:"6px", padding:"4px 12px", marginLeft:"8px", fontSize:"11px", color:"#94a3b8" }}>
                      ielts-sensei.vercel.app/dashboard
                    </div>
                  </div>

                  <div style={{ padding:"20px", display:"flex", flexDirection:"column", gap:"14px" }}>
                    {/* Greeting */}
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <div>
                        <p style={{ fontSize:"11px", color:"#94a3b8", marginBottom:"2px" }}>Good morning</p>
                        <p style={{ fontSize:"16px", fontWeight:800, color:"#0f172a" }}>Jasurbek 👋</p>
                      </div>
                      <div style={{ background:"linear-gradient(135deg,#fef3c7,#fde68a)", border:"1px solid #fbbf24", borderRadius:"8px", padding:"6px 12px", fontSize:"11px", fontWeight:700, color:"#92400e" }}>
                        🔥 7-day streak
                      </div>
                    </div>

                    {/* Score circles */}
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"8px" }}>
                      {[
                        { label:"Listen", score:7.5, color:"#f59e0b", pct:82, bg:"#fffbeb" },
                        { label:"Read",   score:6.5, color:"#0ea5e9", pct:68, bg:"#f0f9ff" },
                        { label:"Write",  score:7.0, color:"#8b5cf6", pct:76, bg:"#f5f3ff" },
                        { label:"Speak",  score:6.0, color:"#10b981", pct:62, bg:"#f0fdf4" },
                      ].map(({ label, score, color, pct, bg }) => {
                        const r = 26; const c = 2 * Math.PI * r;
                        return (
                          <div key={label} style={{ background:bg, borderRadius:"12px", padding:"12px 6px", textAlign:"center", border:`1px solid ${color}22` }}>
                            <svg width="64" height="64" viewBox="0 0 64 64" style={{ display:"block", margin:"0 auto" }}>
                              <circle cx="32" cy="32" r={r} fill="none" stroke={`${color}22`} strokeWidth="5"/>
                              <circle cx="32" cy="32" r={r} fill="none" stroke={color} strokeWidth="5"
                                strokeDasharray={`${c}`} strokeDashoffset={`${c-(pct/100)*c}`}
                                strokeLinecap="round" style={{ transform:"rotate(-90deg)", transformOrigin:"50% 50%" }}/>
                              <text x="32" y="36" textAnchor="middle" fontSize="13" fontWeight="800" fill={color}>{score}</text>
                            </svg>
                            <p style={{ fontSize:"10px", color:"#64748b", marginTop:"4px", fontWeight:600 }}>{label}</p>
                          </div>
                        );
                      })}
                    </div>

                    {/* Next action */}
                    <div style={{ background:"linear-gradient(135deg,#eff6ff,#dbeafe)", border:"1px solid #bfdbfe", borderRadius:"12px", padding:"14px" }}>
                      <p style={{ fontSize:"10px", fontWeight:700, color:"#3b82f6", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:"5px" }}>⚡ Next action</p>
                      <p style={{ fontSize:"13px", fontWeight:700, color:"#1e40af", marginBottom:"10px" }}>Practice Writing Task 2 — your weakest area</p>
                      <div style={{ display:"inline-flex", alignItems:"center", gap:"5px", background:"linear-gradient(135deg,#3b82f6,#2563eb)", borderRadius:"7px", padding:"6px 14px", fontSize:"11px", fontWeight:700, color:"#fff" }}>
                        Start now <ArrowRight style={{ width:"11px", height:"11px" }} />
                      </div>
                    </div>

                    {/* Mini chart */}
                    <div>
                      <p style={{ fontSize:"10px", color:"#94a3b8", fontWeight:500, marginBottom:"8px" }}>Band trend — last 8 sessions</p>
                      <div style={{ display:"flex", alignItems:"flex-end", gap:"5px", height:"40px" }}>
                        {[55,60,58,65,70,68,75,82].map((h,i) => (
                          <div key={i} style={{ flex:1, height:`${h}%`, borderRadius:"4px 4px 0 0", background:`linear-gradient(180deg,#6366f1,#818cf8)`, opacity:0.4+i*0.08 }} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating badges */}
                <div style={{ position:"absolute", top:"-18px", right:"-28px", background:"linear-gradient(135deg,#10b981,#059669)", borderRadius:"14px", padding:"12px 16px", boxShadow:"0 12px 36px rgba(16,185,129,0.45)" }}>
                  <p style={{ fontSize:"10px", color:"rgba(255,255,255,0.8)", marginBottom:"2px" }}>Speaking score</p>
                  <p style={{ fontSize:"24px", fontWeight:900, color:"#ffffff", lineHeight:1 }}>7.5 ✦</p>
                </div>
                <div style={{ position:"absolute", bottom:"-16px", left:"-24px", background:"linear-gradient(135deg,#f59e0b,#d97706)", borderRadius:"14px", padding:"12px 16px", boxShadow:"0 12px 36px rgba(245,158,11,0.45)" }}>
                  <p style={{ fontSize:"10px", color:"rgba(255,255,255,0.85)", marginBottom:"2px" }}>Writing feedback</p>
                  <p style={{ fontSize:"13px", fontWeight:800, color:"#ffffff" }}>Ready in 12s ⚡</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ TICKER ═══════════════════════════════════════════════════════════ */}
        <div style={{ background:"#0f172a", padding:"13px 0", overflow:"hidden" }}>
          <div className="ticker" style={{ display:"flex", gap:"40px", whiteSpace:"nowrap", width:"max-content" }}>
            {[...Array(2)].map((_,rep) =>
              ["10,000+ students","4.9 / 5 rating","95% success rate","AI feedback in 15s","Band 7+ guaranteed","Speaking · Writing · Reading · Listening","Cambridge exam format","Free to start"].map((item,i) => (
                <span key={`${rep}-${i}`} style={{ fontSize:"13px", fontWeight:600, color:"rgba(255,255,255,0.6)", display:"flex", alignItems:"center", gap:"16px" }}>
                  <span style={{ color:"#f59e0b" }}>✦</span> {item}
                </span>
              ))
            )}
          </div>
        </div>

        {/* ══ SKILL CARDS ══════════════════════════════════════════════════════ */}
        <section id="features" style={{ padding:"100px 32px", background:"#f8fafc" }}>
          <div style={{ maxWidth:"1200px", margin:"0 auto" }}>

            <div style={{ textAlign:"center", marginBottom:"64px" }}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:"6px", background:"linear-gradient(135deg,#ede9fe,#ddd6fe)", borderRadius:"999px", padding:"6px 16px", marginBottom:"16px" }}>
                <Zap style={{ width:"13px", height:"13px", color:"#7c3aed" }} />
                <span style={{ fontSize:"12px", fontWeight:700, color:"#7c3aed", textTransform:"uppercase", letterSpacing:"1.5px" }}>All Four Skills</span>
              </div>
              <h2 style={{ fontSize:"clamp(30px,4vw,48px)", fontWeight:900, letterSpacing:"-0.03em", color:"#0f172a", marginBottom:"14px" }}>
                Complete IELTS prep.<br />One smart platform.
              </h2>
              <p style={{ fontSize:"17px", color:"#64748b", maxWidth:"500px", margin:"0 auto", lineHeight:1.65 }}>
                Real exam conditions. AI examiner feedback. Results that actually move your band score.
              </p>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:"20px" }}>
              {SKILLS.map(({ icon:Icon, label, bg, desc, tags }) => (
                <div key={label} className="skill-card" style={{
                  borderRadius:"20px", overflow:"hidden",
                  boxShadow:"0 10px 40px rgba(0,0,0,0.1)",
                }}>
                  {/* Gradient header */}
                  <div style={{ background:bg, padding:"28px 24px 24px" }}>
                    <div style={{ width:"48px", height:"48px", borderRadius:"14px", background:"rgba(255,255,255,0.2)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"14px" }}>
                      <Icon style={{ width:"24px", height:"24px", color:"#ffffff" }} />
                    </div>
                    <h3 style={{ fontSize:"22px", fontWeight:800, color:"#ffffff", letterSpacing:"-0.02em", marginBottom:"8px" }}>{label}</h3>
                    <p style={{ fontSize:"14px", color:"rgba(255,255,255,0.85)", lineHeight:1.6 }}>{desc}</p>
                  </div>
                  {/* White body */}
                  <div style={{ background:"#ffffff", padding:"20px 24px" }}>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:"7px", marginBottom:"16px" }}>
                      {tags.map(t => (
                        <span key={t} style={{ fontSize:"11px", fontWeight:600, color:"#475569", background:"#f1f5f9", borderRadius:"6px", padding:"4px 10px" }}>{t}</span>
                      ))}
                    </div>
                    <Link href="/signup" style={{ display:"inline-flex", alignItems:"center", gap:"5px", fontSize:"13px", fontWeight:700, color:"#6366f1", textDecoration:"none" }}>
                      Practice now <ChevronRight style={{ width:"14px", height:"14px" }} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ HOW IT WORKS ═════════════════════════════════════════════════════ */}
        <section id="how-it-works" style={{ padding:"100px 32px", background:"#ffffff" }}>
          <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"80px", alignItems:"center" }}>

              <div>
                <div style={{ display:"inline-flex", alignItems:"center", gap:"6px", background:"linear-gradient(135deg,#dcfce7,#bbf7d0)", borderRadius:"999px", padding:"6px 16px", marginBottom:"16px" }}>
                  <Zap style={{ width:"13px", height:"13px", color:"#16a34a" }} />
                  <span style={{ fontSize:"12px", fontWeight:700, color:"#16a34a", textTransform:"uppercase", letterSpacing:"1.5px" }}>How it works</span>
                </div>
                <h2 style={{ fontSize:"clamp(28px,3.5vw,44px)", fontWeight:900, letterSpacing:"-0.03em", color:"#0f172a", marginBottom:"48px" }}>
                  Four steps to your<br />target band score.
                </h2>

                <div style={{ display:"flex", flexDirection:"column", gap:"28px" }}>
                  {STEPS.map(({ n, title, body, color }) => (
                    <div key={n} style={{ display:"flex", gap:"16px", alignItems:"flex-start" }}>
                      <div style={{ flexShrink:0, width:"44px", height:"44px", borderRadius:"12px", background:`linear-gradient(135deg,${color},${color}cc)`, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 6px 18px ${color}44` }}>
                        <span style={{ fontSize:"16px", fontWeight:900, color:"#fff" }}>{n}</span>
                      </div>
                      <div style={{ paddingTop:"4px" }}>
                        <p style={{ fontSize:"16px", fontWeight:700, color:"#0f172a", marginBottom:"5px" }}>{title}</p>
                        <p style={{ fontSize:"14px", color:"#64748b", lineHeight:1.65 }}>{body}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Link href="/signup" className="btn-gold" style={{
                  display:"inline-flex", alignItems:"center", gap:"8px", marginTop:"40px",
                  fontSize:"15px", fontWeight:700, color:"#0f172a", textDecoration:"none",
                  background:"linear-gradient(135deg,#fbbf24,#f59e0b)",
                  borderRadius:"12px", padding:"13px 28px",
                  boxShadow:"0 6px 22px rgba(245,158,11,0.4)",
                }}>
                  Try it free <ArrowRight style={{ width:"16px", height:"16px" }} />
                </Link>
              </div>

              {/* Right cards */}
              <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
                <div className="card-lift" style={{ background:"linear-gradient(135deg,#eff6ff,#dbeafe)", borderRadius:"20px", border:"1px solid #bfdbfe", padding:"28px", boxShadow:"0 8px 30px rgba(59,130,246,0.1)" }}>
                  <Shield style={{ width:"32px", height:"32px", color:"#3b82f6", marginBottom:"14px" }} />
                  <h3 style={{ fontSize:"20px", fontWeight:800, color:"#1e40af", marginBottom:"10px" }}>Band score guarantee.</h3>
                  <p style={{ fontSize:"14px", color:"#3b82f6", lineHeight:1.65, marginBottom:"20px" }}>
                    Practice consistently for 4 weeks. If your band score doesn&apos;t improve, we refund every penny — no questions.
                  </p>
                  <div style={{ display:"flex", gap:"20px" }}>
                    {[{ v:"95%", l:"Success rate" }, { v:"4 wks", l:"To improve" }, { v:"0 risk", l:"Money-back" }].map(({ v, l }) => (
                      <div key={l}>
                        <p style={{ fontSize:"20px", fontWeight:800, color:"#1d4ed8", marginBottom:"2px" }}>{v}</p>
                        <p style={{ fontSize:"11px", color:"#60a5fa" }}>{l}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card-lift" style={{ background:"linear-gradient(135deg,#fef9c3,#fef08a)", borderRadius:"20px", border:"1px solid #fde047", padding:"28px", boxShadow:"0 8px 30px rgba(234,179,8,0.15)" }}>
                  <Clock style={{ width:"32px", height:"32px", color:"#ca8a04", marginBottom:"14px" }} />
                  <h3 style={{ fontSize:"20px", fontWeight:800, color:"#713f12", marginBottom:"10px" }}>Available 24 / 7.</h3>
                  <p style={{ fontSize:"14px", color:"#92400e", lineHeight:1.65 }}>
                    No waiting for a tutor. Practice at 2 am before your exam. Your AI coach never sleeps.
                  </p>
                </div>

                <div className="card-lift" style={{ background:"linear-gradient(135deg,#f0fdf4,#dcfce7)", borderRadius:"20px", border:"1px solid #86efac", padding:"28px", boxShadow:"0 8px 30px rgba(16,185,129,0.1)" }}>
                  <TrendingUp style={{ width:"32px", height:"32px", color:"#16a34a", marginBottom:"14px" }} />
                  <h3 style={{ fontSize:"20px", fontWeight:800, color:"#14532d", marginBottom:"10px" }}>Track every session.</h3>
                  <p style={{ fontSize:"14px", color:"#15803d", lineHeight:1.65 }}>
                    Band trend charts, weak-point detection and a personalised study plan that adapts as you improve.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ REVIEWS ══════════════════════════════════════════════════════════ */}
        <section id="reviews" style={{ padding:"100px 32px", background:"#f8fafc" }}>
          <div style={{ maxWidth:"1200px", margin:"0 auto" }}>

            <div style={{ textAlign:"center", marginBottom:"64px" }}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:"6px", background:"linear-gradient(135deg,#fef3c7,#fde68a)", borderRadius:"999px", padding:"6px 16px", marginBottom:"16px" }}>
                <Star style={{ width:"13px", height:"13px", color:"#d97706", fill:"#d97706" }} />
                <span style={{ fontSize:"12px", fontWeight:700, color:"#d97706", textTransform:"uppercase", letterSpacing:"1.5px" }}>Real Students</span>
              </div>
              <h2 style={{ fontSize:"clamp(28px,4vw,48px)", fontWeight:900, letterSpacing:"-0.03em", color:"#0f172a", marginBottom:"14px" }}>
                They made it to Band 7+.<br />You&apos;re next.
              </h2>
            </div>

            <div style={{ columns:"3", columnGap:"16px" }}>
              {TESTIMONIALS.map(({ initials, grad, name, country, band, prev, weeks, quote }) => (
                <div key={name} className="card-lift" style={{
                  background:"#ffffff", borderRadius:"16px",
                  border:"1px solid #e2e8f0", padding:"24px",
                  breakInside:"avoid", marginBottom:"16px",
                  boxShadow:"0 4px 20px rgba(0,0,0,0.05)",
                }}>
                  <div style={{ display:"flex", gap:"3px", marginBottom:"14px" }}>
                    {[1,2,3,4,5].map(i => <Star key={i} style={{ width:"13px", height:"13px", color:"#f59e0b", fill:"#f59e0b" }} />)}
                  </div>
                  <p style={{ fontSize:"14px", color:"#475569", lineHeight:1.7, marginBottom:"20px" }}>
                    &ldquo;{quote}&rdquo;
                  </p>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                      <div style={{ width:"38px", height:"38px", borderRadius:"50%", background:grad, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"14px", fontWeight:800, color:"#fff" }}>
                        {initials}
                      </div>
                      <div>
                        <p style={{ fontSize:"13px", fontWeight:700, color:"#0f172a", margin:0 }}>{country} {name}</p>
                        <p style={{ fontSize:"11px", color:"#94a3b8", margin:0 }}>{weeks} weeks</p>
                      </div>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <p style={{ fontSize:"18px", fontWeight:900, color:"#16a34a", margin:0 }}>Band {band}</p>
                      <p style={{ fontSize:"10px", color:"#94a3b8", margin:0 }}>was {prev}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ PRICING ══════════════════════════════════════════════════════════ */}
        <section id="pricing" style={{ padding:"100px 32px", background:"#ffffff" }}>
          <div style={{ maxWidth:"1200px", margin:"0 auto" }}>

            <div style={{ textAlign:"center", marginBottom:"64px" }}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:"6px", background:"linear-gradient(135deg,#fef3c7,#fde68a)", borderRadius:"999px", padding:"6px 16px", marginBottom:"16px" }}>
                <Zap style={{ width:"13px", height:"13px", color:"#d97706" }} />
                <span style={{ fontSize:"12px", fontWeight:700, color:"#d97706", textTransform:"uppercase", letterSpacing:"1.5px" }}>Pricing</span>
              </div>
              <h2 style={{ fontSize:"clamp(28px,4vw,48px)", fontWeight:900, letterSpacing:"-0.03em", color:"#0f172a", marginBottom:"14px" }}>
                Simple, honest pricing.
              </h2>
              <p style={{ fontSize:"16px", color:"#64748b" }}>Start free. Upgrade when you&apos;re ready to go all-in.</p>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"20px", alignItems:"start" }}>
              {PLANS.map(({ name, badge, price, per, desc, highlight, perks, cta, accentColor }) => (
                <div key={name} className="plan-lift" style={{
                  background: highlight ? "linear-gradient(160deg,#0f172a,#1e293b)" : "#ffffff",
                  borderRadius:"20px",
                  border: highlight ? "2px solid #f59e0b" : "1.5px solid #e2e8f0",
                  padding:"32px",
                  position:"relative",
                  boxShadow: highlight ? "0 24px 60px rgba(245,158,11,0.25)" : "0 4px 20px rgba(0,0,0,0.06)",
                  transform: highlight ? "scale(1.04)" : "none",
                }}>
                  {badge && (
                    <div style={{ position:"absolute", top:"-14px", left:"50%", transform:"translateX(-50%)", background:"linear-gradient(135deg,#f59e0b,#d97706)", borderRadius:"999px", padding:"5px 18px", fontSize:"11px", fontWeight:800, color:"#0f172a", whiteSpace:"nowrap", boxShadow:"0 4px 14px rgba(245,158,11,0.4)" }}>
                      ✦ {badge}
                    </div>
                  )}

                  <p style={{ fontSize:"12px", fontWeight:700, color: highlight ? "#f59e0b" : accentColor, textTransform:"uppercase", letterSpacing:"0.13em", marginBottom:"10px" }}>{name}</p>
                  <div style={{ display:"flex", alignItems:"baseline", gap:"4px", marginBottom:"8px" }}>
                    <span style={{ fontSize:"44px", fontWeight:900, color: highlight ? "#ffffff" : "#0f172a", letterSpacing:"-0.03em" }}>{price}</span>
                    {per && <span style={{ fontSize:"15px", color: highlight ? "rgba(255,255,255,0.5)" : "#94a3b8" }}>{per}</span>}
                  </div>
                  <p style={{ fontSize:"14px", color: highlight ? "rgba(255,255,255,0.6)" : "#64748b", marginBottom:"24px" }}>{desc}</p>

                  <div style={{ height:"1px", background: highlight ? "rgba(255,255,255,0.1)" : "#f1f5f9", marginBottom:"20px" }} />

                  <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"11px", marginBottom:"28px" }}>
                    {perks.map(p => (
                      <li key={p} style={{ display:"flex", gap:"10px", alignItems:"flex-start", fontSize:"14px", color: highlight ? "rgba(255,255,255,0.8)" : "#475569", lineHeight:1.45 }}>
                        <CheckCircle2 style={{ width:"15px", height:"15px", color: highlight ? "#f59e0b" : accentColor, marginTop:"1px", flexShrink:0 }} />
                        {p}
                      </li>
                    ))}
                  </ul>

                  <Link href="/signup" className="btn-gold" style={{
                    display:"block", textAlign:"center",
                    fontSize:"14px", fontWeight:800, textDecoration:"none",
                    color: highlight ? "#0f172a" : "#ffffff",
                    background: highlight ? "linear-gradient(135deg,#fbbf24,#f59e0b)" : `linear-gradient(135deg,${accentColor},${accentColor}cc)`,
                    borderRadius:"12px", padding:"13px",
                    boxShadow: highlight ? "0 6px 24px rgba(245,158,11,0.45)" : `0 4px 16px ${accentColor}44`,
                  }}>
                    {cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ FINAL CTA ════════════════════════════════════════════════════════ */}
        <section style={{
          padding:"120px 32px",
          background:"linear-gradient(135deg,#4f46e5 0%,#7c3aed 30%,#0ea5e9 70%,#10b981 100%)",
          position:"relative", overflow:"hidden",
        }}>
          <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(255,255,255,0.1) 1px,transparent 1px)", backgroundSize:"30px 30px", pointerEvents:"none" }} />
          <div style={{ position:"absolute", top:"-30%", right:"-10%", width:"600px", height:"600px", borderRadius:"50%", background:"radial-gradient(circle,rgba(255,255,255,0.08) 0%,transparent 65%)", pointerEvents:"none" }} />

          <div style={{ maxWidth:"680px", margin:"0 auto", textAlign:"center", position:"relative", zIndex:1 }}>
            <div style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", width:"70px", height:"70px", borderRadius:"20px", background:"rgba(255,255,255,0.2)", backdropFilter:"blur(12px)", border:"1px solid rgba(255,255,255,0.3)", marginBottom:"28px" }}>
              <GraduationCap style={{ width:"34px", height:"34px", color:"#ffffff" }} />
            </div>
            <h2 style={{ fontSize:"clamp(36px,5vw,60px)", fontWeight:900, color:"#ffffff", letterSpacing:"-0.035em", lineHeight:1.08, marginBottom:"18px" }}>
              Your Band 7+ is<br />
              <span style={{ color:"#fef08a" }}>one session away. ✦</span>
            </h2>
            <p style={{ fontSize:"18px", color:"rgba(255,255,255,0.85)", lineHeight:1.65, marginBottom:"40px" }}>
              Join 10,000+ students already training smarter.<br />Free to start. No credit card required.
            </p>
            <div style={{ display:"flex", gap:"12px", justifyContent:"center", flexWrap:"wrap" }}>
              <Link href="/signup" className="btn-gold" style={{
                display:"inline-flex", alignItems:"center", gap:"10px",
                fontSize:"17px", fontWeight:800, color:"#0f172a", textDecoration:"none",
                background:"linear-gradient(135deg,#fbbf24,#f59e0b)",
                borderRadius:"14px", padding:"17px 38px",
                boxShadow:"0 12px 40px rgba(0,0,0,0.25)",
              }}>
                Start for Free <ArrowRight style={{ width:"19px", height:"19px" }} />
              </Link>
              <Link href="/login" className="btn-outline" style={{
                display:"inline-flex", alignItems:"center", gap:"8px",
                fontSize:"15px", fontWeight:600, color:"#ffffff", textDecoration:"none",
                background:"rgba(255,255,255,0.12)", border:"1.5px solid rgba(255,255,255,0.35)",
                borderRadius:"14px", padding:"16px 28px", backdropFilter:"blur(8px)",
              }}>
                Sign in
              </Link>
            </div>
          </div>
        </section>

        {/* ══ FOOTER ═══════════════════════════════════════════════════════════ */}
        <footer style={{ padding:"40px 32px", background:"#0f172a", borderTop:"none" }}>
          <div style={{ maxWidth:"1200px", margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"16px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"9px" }}>
              <div style={{ width:"30px", height:"30px", borderRadius:"8px", background:"linear-gradient(135deg,#6366f1,#4f46e5)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <GraduationCap style={{ width:"15px", height:"15px", color:"#fff" }} />
              </div>
              <span style={{ fontSize:"14px", fontWeight:700, color:"rgba(255,255,255,0.5)" }}>IELTS Sensei</span>
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
