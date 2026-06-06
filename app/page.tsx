import Link from "next/link";
import {
  GraduationCap, Mic, BookOpen, BookMarked, Headphones,
  Zap, CheckCircle2, Star, ArrowRight, Play,
  TrendingUp, Clock, BarChart3, Users, Sparkles,
  Brain, Trophy, Target, ChevronRight, Flame,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const SKILLS = [
  {
    icon: Headphones, label: "Listening", color: "#f59e0b", bg: "#78350f",
    progress: 78,
    desc: "4 sections · 40 questions · Cambridge paper format",
    features: ["Audio plays once — real exam conditions", "Part 1–4 with question navigator", "Notes, form & sentence completion", "Auto-scored with full answer review"],
  },
  {
    icon: BookMarked, label: "Reading", color: "#38bdf8", bg: "#0c4a6e",
    progress: 65,
    desc: "3 passages · 40 questions · 60-minute timed exam",
    features: ["True/False/Not Given, MCQ, matching", "Timed exam mode with auto-submit", "Full explanations for every answer", "Academic & General Training passages"],
  },
  {
    icon: BookOpen, label: "Writing", color: "#a78bfa", bg: "#4c1d95",
    progress: 82,
    desc: "Task 1 & Task 2 · AI scored in under 15 seconds",
    features: ["Academic & General Training Task 1", "Opinion, discussion & problem essays", "Grammar corrections with explanations", "Band 5→8+ model answers for every essay"],
  },
  {
    icon: Mic, label: "Speaking", color: "#4ade80", bg: "#14532d",
    progress: 71,
    desc: "3 parts · AI feedback · Real cue cards",
    features: ["50+ real IELTS Part 2 cue cards", "3-second countdown before recording", "Full mock: Parts 1, 2 & 3 back-to-back", "Pronunciation fixes at word level"],
  },
];

const TESTIMONIALS = [
  { initials:"DT", color:"#0d9488", name:"Dilnoza T.", flag:"🇺🇿", band:"7.5", prev:"6.0", text:"I went from 6.0 to 7.5 in 6 weeks. The speaking feedback caught pronunciation mistakes my teacher never noticed in 2 years." },
  { initials:"AP", color:"#7c3aed", name:"Arjun P.",   flag:"🇮🇳", band:"8.0", prev:"6.5", text:"The instant band score after every essay changed everything. I practiced 10 essays a day and watched my score climb in real time." },
  { initials:"YK", color:"#0284c7", name:"Yuna K.",    flag:"🇰🇷", band:"7.0", prev:"5.5", text:"The full mock test is exactly like the real exam. I walked in on test day completely calm. Sensei prepared me for everything." },
  { initials:"FA", color:"#db2777", name:"Fatima A.",  flag:"🇸🇦", band:"8.5", prev:"7.0", text:"The model answers showed me exactly what examiners want. I finally understood what 'coherence' actually means." },
  { initials:"BU", color:"#f59e0b", name:"Bekzod U.",  flag:"🇺🇿", band:"7.5", prev:"5.5", text:"I had failed IELTS twice before Sensei. In 9 weeks my writing went from 5.5 to 7.5. My UK visa is approved." },
  { initials:"PS", color:"#10b981", name:"Priya S.",   flag:"🇮🇳", band:"8.0", prev:"7.0", text:"Worth every penny. The grammar correction with explanations taught me WHY I was wrong, not just what. Game changer." },
];

const PLANS = [
  {
    name: "Starter", price: "Free", period: "",
    desc: "Try all 4 skills with no commitment",
    highlight: false,
    features: ["10 AI writing scores / month", "5 speaking attempts / month", "Full reading & listening access", "Basic score history"],
    cta: "Start Free", ctaHref: "/signup",
  },
  {
    name: "Coach", price: "$12", period: "/mo",
    desc: "Everything you need to reach Band 7+",
    highlight: true,
    features: ["Unlimited AI writing scores", "Unlimited speaking attempts", "Full mock tests (all 4 skills)", "Band trend charts & analytics", "Model answers at every band level", "Priority AI response speed"],
    cta: "Get Coach", ctaHref: "/signup",
  },
  {
    name: "Elite", price: "$29", period: "/mo",
    desc: "For serious Band 8+ candidates",
    highlight: false,
    features: ["Everything in Coach", "Personalised study plan", "Weak-point detection AI", "1-on-1 tutor session (2×/mo)", "Exam-day strategy guide", "Lifetime score archive"],
    cta: "Go Elite", ctaHref: "/signup",
  },
];

// ─── AI Character SVG ────────────────────────────────────────────────────────

function AICharacter() {
  return (
    <svg width="180" height="220" viewBox="0 0 180 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Glow */}
      <ellipse cx="90" cy="200" rx="55" ry="12" fill="#0d9488" opacity="0.25" />

      {/* Body */}
      <rect x="42" y="110" width="96" height="80" rx="18" fill="#134e4a" stroke="#0d9488" strokeWidth="2"/>
      {/* Body shine */}
      <rect x="52" y="118" width="36" height="6" rx="3" fill="#0d9488" opacity="0.4"/>

      {/* Chest panel */}
      <rect x="58" y="130" width="64" height="44" rx="10" fill="#0f172a" stroke="#0d9488" strokeWidth="1.5" opacity="0.9"/>

      {/* Animated bars inside chest */}
      <rect x="66" y="142" width="10" height="20" rx="3" fill="#f59e0b" opacity="0.9"/>
      <rect x="80" y="148" width="10" height="14" rx="3" fill="#4ade80" opacity="0.9"/>
      <rect x="94" y="138" width="10" height="24" rx="3" fill="#38bdf8" opacity="0.9"/>
      <rect x="108" y="144" width="10" height="18" rx="3" fill="#a78bfa" opacity="0.9"/>

      {/* Arms */}
      <rect x="14" y="116" width="28" height="14" rx="7" fill="#134e4a" stroke="#0d9488" strokeWidth="1.5"/>
      <rect x="138" y="116" width="28" height="14" rx="7" fill="#134e4a" stroke="#0d9488" strokeWidth="1.5"/>
      {/* Hand circles */}
      <circle cx="14" cy="123" r="7" fill="#0d9488" opacity="0.6"/>
      <circle cx="166" cy="123" r="7" fill="#0d9488" opacity="0.6"/>

      {/* Neck */}
      <rect x="78" y="100" width="24" height="14" rx="5" fill="#134e4a" stroke="#0d9488" strokeWidth="1.5"/>

      {/* Head */}
      <rect x="32" y="34" width="116" height="76" rx="22" fill="#134e4a" stroke="#0d9488" strokeWidth="2"/>
      {/* Head shine */}
      <rect x="46" y="42" width="44" height="8" rx="4" fill="white" opacity="0.07"/>

      {/* Eyes */}
      <rect x="50" y="54" width="28" height="20" rx="8" fill="#0f172a"/>
      <rect x="102" y="54" width="28" height="20" rx="8" fill="#0f172a"/>
      {/* Eye glow */}
      <rect x="54" y="58" width="20" height="12" rx="5" fill="#0d9488" opacity="0.9"/>
      <rect x="106" y="58" width="20" height="12" rx="5" fill="#0d9488" opacity="0.9"/>
      {/* Pupil */}
      <circle cx="64" cy="64" r="4" fill="#fff" opacity="0.9"/>
      <circle cx="116" cy="64" r="4" fill="#fff" opacity="0.9"/>
      <circle cx="65" cy="63" r="1.5" fill="#0f172a"/>
      <circle cx="117" cy="63" r="1.5" fill="#0f172a"/>

      {/* Smile */}
      <path d="M 66 86 Q 90 98 114 86" stroke="#0d9488" strokeWidth="3" strokeLinecap="round" fill="none"/>

      {/* Graduation cap */}
      <polygon points="90,6 140,20 90,34 40,20" fill="#f59e0b"/>
      <rect x="80" y="20" width="20" height="18" rx="2" fill="#d97706"/>
      <line x1="140" y1="20" x2="140" y2="34" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="140" cy="36" r="4" fill="#f59e0b"/>

      {/* Legs */}
      <rect x="60" y="186" width="22" height="28" rx="8" fill="#134e4a" stroke="#0d9488" strokeWidth="1.5"/>
      <rect x="98" y="186" width="22" height="28" rx="8" fill="#134e4a" stroke="#0d9488" strokeWidth="1.5"/>
      {/* Feet */}
      <rect x="54" y="206" width="32" height="12" rx="6" fill="#0d9488" opacity="0.7"/>
      <rect x="94" y="206" width="32" height="12" rx="6" fill="#0d9488" opacity="0.7"/>

      {/* Floating sparkles */}
      <circle cx="22" cy="60" r="4" fill="#f59e0b" opacity="0.7"/>
      <circle cx="158" cy="80" r="3" fill="#4ade80" opacity="0.7"/>
      <circle cx="20" cy="90" r="2" fill="#38bdf8" opacity="0.5"/>
      <circle cx="162" cy="50" r="2.5" fill="#a78bfa" opacity="0.6"/>
    </svg>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <>
      {/* Keyframe animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-18px); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(13,148,136,0.3), 0 0 60px rgba(13,148,136,0.1); }
          50%       { box-shadow: 0 0 40px rgba(13,148,136,0.6), 0 0 80px rgba(13,148,136,0.2); }
        }
        @keyframes bar-grow {
          from { height: 0; }
          to   { height: var(--h); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes fade-up {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes eye-blink {
          0%,90%,100% { transform: scaleY(1); }
          95%          { transform: scaleY(0.1); }
        }
        .float-anim { animation: float 3.5s ease-in-out infinite; }
        .glow-anim  { animation: pulse-glow 3s ease-in-out infinite; }
        .fade-up    { animation: fade-up 0.7s ease both; }

        .nav-link:hover { color: #0d9488 !important; }
        .skill-card:hover { transform: translateY(-4px); box-shadow: 0 20px 60px rgba(0,0,0,0.4) !important; }
        .skill-card { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .plan-card:hover { transform: translateY(-4px); }
        .plan-card { transition: transform 0.25s ease; }
        .cta-btn:hover { opacity: 0.9; transform: translateY(-1px); }
        .cta-btn { transition: opacity 0.15s, transform 0.15s; }
        .quote-card:hover { border-color: rgba(13,148,136,0.4) !important; }
        .quote-card { transition: border-color 0.2s; }
        .progress-bar { transition: width 1s ease; }
      `}</style>

      <div style={{ fontFamily:"'Inter',system-ui,sans-serif", background:"#0f172a", color:"#f8fafc", overflowX:"hidden" }}>

        {/* ══ NAV ══════════════════════════════════════════════════════════════ */}
        <header style={{
          position:"sticky", top:0, zIndex:100,
          background:"rgba(15,23,42,0.85)", backdropFilter:"blur(20px)",
          borderBottom:"1px solid rgba(13,148,136,0.2)",
        }}>
          <div style={{ maxWidth:"1180px", margin:"0 auto", padding:"0 28px", height:"64px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>

            <Link href="/" style={{ display:"flex", alignItems:"center", gap:"10px", textDecoration:"none" }}>
              <div style={{ width:"38px", height:"38px", borderRadius:"10px", background:"linear-gradient(135deg,#0d9488,#0f766e)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <GraduationCap style={{ width:"20px", height:"20px", color:"#fff" }} />
              </div>
              <div>
                <p style={{ fontWeight:800, fontSize:"15px", color:"#f8fafc", lineHeight:1, margin:0 }}>IELTS Sensei</p>
                <p style={{ fontSize:"9px", fontWeight:700, color:"#0d9488", textTransform:"uppercase", letterSpacing:"1.5px", margin:0 }}>AI Exam Coach</p>
              </div>
            </Link>

            <nav style={{ display:"flex", gap:"32px" }}>
              {["Features","Pricing","Reviews"].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} className="nav-link"
                  style={{ fontSize:"14px", fontWeight:500, color:"rgba(248,250,252,0.6)", textDecoration:"none", transition:"color 0.15s" }}>
                  {item}
                </a>
              ))}
            </nav>

            <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
              <Link href="/login" style={{ fontSize:"14px", fontWeight:500, color:"rgba(248,250,252,0.6)", textDecoration:"none" }}>Sign in</Link>
              <Link href="/signup" className="cta-btn" style={{
                fontSize:"14px", fontWeight:700, color:"#0f172a", textDecoration:"none",
                background:"linear-gradient(135deg,#f59e0b,#d97706)",
                borderRadius:"22px", padding:"9px 22px",
                boxShadow:"0 4px 16px rgba(245,158,11,0.4)",
              }}>
                Start Free →
              </Link>
            </div>
          </div>
        </header>

        {/* ══ HERO ═════════════════════════════════════════════════════════════ */}
        <section style={{
          background:"linear-gradient(135deg, #0d4f4a 0%, #0f172a 45%, #0f2a5f 100%)",
          padding:"80px 28px 100px", position:"relative", overflow:"hidden",
          minHeight:"90vh", display:"flex", alignItems:"center",
        }}>
          {/* Grid dots */}
          <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(13,148,136,0.15) 1px,transparent 1px)", backgroundSize:"40px 40px", pointerEvents:"none" }} />
          {/* Top radial glow */}
          <div style={{ position:"absolute", top:"-200px", left:"50%", transform:"translateX(-50%)", width:"800px", height:"600px", background:"radial-gradient(ellipse,rgba(13,148,136,0.12) 0%,transparent 65%)", pointerEvents:"none" }} />

          <div style={{ maxWidth:"1180px", margin:"0 auto", width:"100%", position:"relative", zIndex:1 }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"80px", alignItems:"center" }}>

              {/* Left — Text */}
              <div>
                {/* Badge */}
                <div style={{ display:"inline-flex", alignItems:"center", gap:"8px", background:"rgba(13,148,136,0.15)", border:"1px solid rgba(13,148,136,0.35)", borderRadius:"999px", padding:"6px 16px 6px 8px", marginBottom:"28px" }}>
                  <div style={{ width:"22px", height:"22px", borderRadius:"50%", background:"#0d9488", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <Sparkles style={{ width:"12px", height:"12px", color:"#fff" }} />
                  </div>
                  <span style={{ fontSize:"13px", fontWeight:600, color:"rgba(248,250,252,0.85)" }}>AI Results in Under 15 Seconds</span>
                </div>

                <h1 style={{ fontSize:"clamp(36px,4.5vw,58px)", fontWeight:900, lineHeight:1.08, letterSpacing:"-0.03em", margin:"0 0 16px", color:"#f8fafc" }}>
                  Your Personal<br />
                  <span style={{ background:"linear-gradient(90deg,#0d9488,#38bdf8)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                    IELTS Coach
                  </span>
                </h1>

                <p style={{ fontSize:"20px", fontWeight:500, color:"rgba(248,250,252,0.7)", lineHeight:1.55, margin:"0 0 12px" }}>
                  Practice Speaking. Get Feedback.
                </p>
                <p style={{ fontSize:"22px", fontWeight:700, color:"#f59e0b", margin:"0 0 36px" }}>
                  Achieve Band 7+ ✦
                </p>

                <div style={{ display:"flex", gap:"14px", flexWrap:"wrap" }}>
                  <Link href="/signup" className="cta-btn" style={{
                    display:"inline-flex", alignItems:"center", gap:"8px",
                    fontSize:"16px", fontWeight:700, color:"#0f172a", textDecoration:"none",
                    background:"linear-gradient(135deg,#f59e0b,#d97706)",
                    borderRadius:"14px", padding:"15px 32px",
                    boxShadow:"0 8px 30px rgba(245,158,11,0.45)",
                  }}>
                    Start for Free <ArrowRight style={{ width:"18px", height:"18px" }} />
                  </Link>
                  <a href="#features" className="cta-btn" style={{
                    display:"inline-flex", alignItems:"center", gap:"8px",
                    fontSize:"15px", fontWeight:600, color:"rgba(248,250,252,0.8)", textDecoration:"none",
                    background:"rgba(255,255,255,0.06)", border:"1.5px solid rgba(255,255,255,0.12)",
                    borderRadius:"14px", padding:"14px 28px",
                  }}>
                    <Play style={{ width:"15px", height:"15px" }} /> Watch Demo
                  </a>
                </div>

                {/* Trust row */}
                <div style={{ display:"flex", gap:"28px", marginTop:"44px", flexWrap:"wrap" }}>
                  {[
                    { icon:Users,      v:"10,000+", l:"Students" },
                    { icon:Star,       v:"4.9 / 5",  l:"Rating" },
                    { icon:TrendingUp, v:"95%",      l:"Success Rate" },
                  ].map(({ icon:Icon, v, l }) => (
                    <div key={l} style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                      <div style={{ width:"32px", height:"32px", borderRadius:"8px", background:"rgba(13,148,136,0.15)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                        <Icon style={{ width:"15px", height:"15px", color:"#0d9488" }} />
                      </div>
                      <div>
                        <p style={{ fontSize:"15px", fontWeight:700, color:"#f8fafc", margin:0 }}>{v}</p>
                        <p style={{ fontSize:"11px", color:"rgba(248,250,252,0.45)", margin:0 }}>{l}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — AI Character */}
              <div style={{ display:"flex", justifyContent:"center", alignItems:"center", position:"relative" }}>
                {/* Outer glow ring */}
                <div className="glow-anim" style={{ position:"absolute", width:"280px", height:"280px", borderRadius:"50%", background:"rgba(13,148,136,0.06)", border:"1px solid rgba(13,148,136,0.2)" }} />
                <div style={{ position:"absolute", width:"220px", height:"220px", borderRadius:"50%", background:"rgba(13,148,136,0.08)" }} />

                {/* Floating character */}
                <div className="float-anim" style={{ position:"relative", zIndex:2 }}>
                  <AICharacter />
                </div>

                {/* Floating badges */}
                <div style={{ position:"absolute", top:"10%", right:"2%", background:"rgba(15,23,42,0.9)", border:"1px solid rgba(13,148,136,0.4)", borderRadius:"12px", padding:"10px 14px", backdropFilter:"blur(10px)" }}>
                  <p style={{ fontSize:"10px", color:"rgba(248,250,252,0.5)", margin:"0 0 2px" }}>Speaking Score</p>
                  <p style={{ fontSize:"20px", fontWeight:800, color:"#4ade80", margin:0 }}>7.5 ✦</p>
                </div>
                <div style={{ position:"absolute", bottom:"18%", left:"2%", background:"rgba(15,23,42,0.9)", border:"1px solid rgba(245,158,11,0.4)", borderRadius:"12px", padding:"10px 14px", backdropFilter:"blur(10px)" }}>
                  <p style={{ fontSize:"10px", color:"rgba(248,250,252,0.5)", margin:"0 0 2px" }}>Writing feedback</p>
                  <p style={{ fontSize:"12px", fontWeight:600, color:"#f59e0b", margin:0 }}>Ready in 12s ⚡</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ SKILLS ═══════════════════════════════════════════════════════════ */}
        <section id="features" style={{ padding:"100px 28px", background:"#0f172a" }}>
          <div style={{ maxWidth:"1180px", margin:"0 auto" }}>

            <div style={{ textAlign:"center", marginBottom:"64px" }}>
              <p style={{ fontSize:"12px", fontWeight:700, color:"#0d9488", textTransform:"uppercase", letterSpacing:"2px", marginBottom:"12px" }}>All Four Skills</p>
              <h2 style={{ fontSize:"clamp(28px,4vw,44px)", fontWeight:800, letterSpacing:"-0.025em", margin:"0 0 14px", color:"#f8fafc" }}>
                Complete IELTS preparation<br />in one platform
              </h2>
              <p style={{ fontSize:"17px", color:"rgba(248,250,252,0.5)", maxWidth:"500px", margin:"0 auto" }}>
                Practice every skill with real exam conditions — AI scores your performance instantly.
              </p>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:"20px" }}>
              {SKILLS.map(({ icon:Icon, label, color, bg, progress, desc, features }) => (
                <div key={label} className="skill-card" style={{
                  background:"linear-gradient(180deg,#1e293b 0%,#162032 100%)",
                  border:`1.5px solid rgba(255,255,255,0.06)`,
                  borderRadius:"20px", padding:"28px", position:"relative", overflow:"hidden",
                  boxShadow:"0 8px 32px rgba(0,0,0,0.3)",
                }}>
                  {/* Color accent top bar */}
                  <div style={{ position:"absolute", top:0, left:0, right:0, height:"3px", background:`linear-gradient(90deg,${color},transparent)` }} />

                  {/* Icon */}
                  <div style={{ width:"48px", height:"48px", borderRadius:"14px", background:`rgba(${color === '#f59e0b' ? '245,158,11' : color === '#38bdf8' ? '56,189,248' : color === '#a78bfa' ? '167,139,250' : '74,222,128'},0.15)`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"16px" }}>
                    <Icon style={{ width:"24px", height:"24px", color }} />
                  </div>

                  <p style={{ fontSize:"11px", fontWeight:700, color, textTransform:"uppercase", letterSpacing:"1.5px", margin:"0 0 6px" }}>{label}</p>
                  <p style={{ fontSize:"17px", fontWeight:700, color:"#f8fafc", margin:"0 0 8px" }}>{label} Practice</p>
                  <p style={{ fontSize:"13px", color:"rgba(248,250,252,0.45)", margin:"0 0 20px" }}>{desc}</p>

                  {/* Progress bar */}
                  <div style={{ marginBottom:"20px" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"6px" }}>
                      <span style={{ fontSize:"11px", color:"rgba(248,250,252,0.4)" }}>Avg. student progress</span>
                      <span style={{ fontSize:"12px", fontWeight:700, color }}>{progress}%</span>
                    </div>
                    <div style={{ height:"5px", background:"rgba(255,255,255,0.06)", borderRadius:"999px" }}>
                      <div className="progress-bar" style={{ height:"100%", width:`${progress}%`, background:`linear-gradient(90deg,${color},${color}99)`, borderRadius:"999px" }} />
                    </div>
                  </div>

                  {/* Features */}
                  <ul style={{ margin:0, padding:0, listStyle:"none", display:"flex", flexDirection:"column", gap:"7px" }}>
                    {features.map(f => (
                      <li key={f} style={{ display:"flex", alignItems:"flex-start", gap:"8px", fontSize:"13px", color:"rgba(248,250,252,0.6)", lineHeight:1.45 }}>
                        <CheckCircle2 style={{ width:"13px", height:"13px", color, marginTop:"2px", flexShrink:0 }} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Bottom link */}
                  <Link href="/signup" style={{ display:"inline-flex", alignItems:"center", gap:"5px", marginTop:"20px", fontSize:"13px", fontWeight:600, color, textDecoration:"none" }}>
                    Practice now <ChevronRight style={{ width:"14px", height:"14px" }} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ DASHBOARD PREVIEW ════════════════════════════════════════════════ */}
        <section style={{ padding:"100px 28px", background:"linear-gradient(180deg,#0a1628 0%,#0f172a 100%)" }}>
          <div style={{ maxWidth:"1180px", margin:"0 auto" }}>

            <div style={{ textAlign:"center", marginBottom:"56px" }}>
              <p style={{ fontSize:"12px", fontWeight:700, color:"#f59e0b", textTransform:"uppercase", letterSpacing:"2px", marginBottom:"12px" }}>Dashboard</p>
              <h2 style={{ fontSize:"clamp(28px,4vw,44px)", fontWeight:800, letterSpacing:"-0.025em", margin:"0 0 14px", color:"#f8fafc" }}>
                Track every step of your journey
              </h2>
            </div>

            {/* Dashboard mockup */}
            <div style={{ background:"#1e293b", borderRadius:"24px", border:"1px solid rgba(255,255,255,0.08)", overflow:"hidden", boxShadow:"0 40px 100px rgba(0,0,0,0.5)" }}>
              {/* Titlebar */}
              <div style={{ background:"#0f172a", padding:"14px 20px", display:"flex", alignItems:"center", gap:"8px", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ width:"12px", height:"12px", borderRadius:"50%", background:"#ef4444" }} />
                <div style={{ width:"12px", height:"12px", borderRadius:"50%", background:"#f59e0b" }} />
                <div style={{ width:"12px", height:"12px", borderRadius:"50%", background:"#22c55e" }} />
                <span style={{ marginLeft:"12px", fontSize:"13px", color:"rgba(248,250,252,0.4)" }}>ielts-sensei.vercel.app/dashboard</span>
              </div>

              <div style={{ padding:"32px", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:"20px" }}>
                {/* Progress circles */}
                {[
                  { label:"Listening", score:7.5, color:"#f59e0b", pct:85 },
                  { label:"Reading",   score:6.5, color:"#38bdf8", pct:70 },
                  { label:"Writing",   score:7.0, color:"#a78bfa", pct:78 },
                  { label:"Speaking",  score:6.0, color:"#4ade80", pct:65 },
                ].map(({ label, score, color, pct }) => {
                  const r = 36; const c = 2 * Math.PI * r;
                  const offset = c - (pct / 100) * c;
                  return (
                    <div key={label} style={{ background:"#0f172a", borderRadius:"16px", padding:"20px", textAlign:"center", border:"1px solid rgba(255,255,255,0.06)" }}>
                      <svg width="90" height="90" viewBox="0 0 90 90" style={{ display:"block", margin:"0 auto" }}>
                        <circle cx="45" cy="45" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="7"/>
                        <circle cx="45" cy="45" r={r} fill="none" stroke={color} strokeWidth="7"
                          strokeDasharray={`${c}`} strokeDashoffset={`${offset}`}
                          strokeLinecap="round" style={{ transform:"rotate(-90deg)", transformOrigin:"50% 50%" }}/>
                        <text x="45" y="49" textAnchor="middle" fontSize="16" fontWeight="800" fill={color}>{score}</text>
                      </svg>
                      <p style={{ fontSize:"13px", fontWeight:600, color:"rgba(248,250,252,0.7)", margin:"10px 0 0" }}>{label}</p>
                    </div>
                  );
                })}
              </div>

              {/* Bottom row — next action + quick practice */}
              <div style={{ padding:"0 32px 32px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"20px" }}>
                {/* Next action */}
                <div style={{ background:"linear-gradient(135deg,rgba(13,148,136,0.15),rgba(13,148,136,0.05))", borderRadius:"16px", padding:"20px", border:"1px solid rgba(13,148,136,0.25)" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"12px" }}>
                    <Flame style={{ width:"16px", height:"16px", color:"#f59e0b" }} />
                    <p style={{ fontSize:"12px", fontWeight:700, color:"#0d9488", textTransform:"uppercase", letterSpacing:"1px", margin:0 }}>Next action</p>
                  </div>
                  <p style={{ fontSize:"16px", fontWeight:700, color:"#f8fafc", margin:"0 0 6px" }}>Practice Writing Task 2</p>
                  <p style={{ fontSize:"13px", color:"rgba(248,250,252,0.5)", margin:"0 0 14px" }}>Your weakest skill this week — 6 attempts needed</p>
                  <Link href="/signup" style={{ display:"inline-flex", alignItems:"center", gap:"6px", fontSize:"13px", fontWeight:700, color:"#0f172a", textDecoration:"none", background:"#f59e0b", borderRadius:"8px", padding:"8px 16px" }}>
                    Start now <ArrowRight style={{ width:"13px", height:"13px" }} />
                  </Link>
                </div>

                {/* Quick practice */}
                <div style={{ background:"#0f172a", borderRadius:"16px", padding:"20px", border:"1px solid rgba(255,255,255,0.06)" }}>
                  <p style={{ fontSize:"12px", fontWeight:700, color:"rgba(248,250,252,0.4)", textTransform:"uppercase", letterSpacing:"1px", margin:"0 0 14px" }}>Quick practice</p>
                  <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
                    {[
                      { label:"Full Listening Mock",  color:"#f59e0b" },
                      { label:"Writing Task 2",        color:"#a78bfa" },
                      { label:"Speaking Part 2",       color:"#4ade80" },
                    ].map(({ label, color }) => (
                      <Link key={label} href="/signup" style={{ display:"flex", alignItems:"center", justifyContent:"space-between", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:"8px", padding:"10px 14px", textDecoration:"none", transition:"border-color 0.2s" }}>
                        <span style={{ fontSize:"13px", fontWeight:500, color:"rgba(248,250,252,0.75)" }}>{label}</span>
                        <ChevronRight style={{ width:"14px", height:"14px", color }} />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ REVIEWS ══════════════════════════════════════════════════════════ */}
        <section id="reviews" style={{ padding:"100px 28px", background:"#0f172a" }}>
          <div style={{ maxWidth:"1180px", margin:"0 auto" }}>

            <div style={{ textAlign:"center", marginBottom:"60px" }}>
              <p style={{ fontSize:"12px", fontWeight:700, color:"#0d9488", textTransform:"uppercase", letterSpacing:"2px", marginBottom:"12px" }}>Real Students</p>
              <h2 style={{ fontSize:"clamp(28px,4vw,44px)", fontWeight:800, letterSpacing:"-0.025em", margin:"0 0 14px", color:"#f8fafc" }}>
                They hit Band 7+. Now it's your turn.
              </h2>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))", gap:"16px" }}>
              {TESTIMONIALS.map(({ initials, color, name, flag, band, prev, text }) => (
                <div key={name} className="quote-card" style={{
                  background:"#1e293b", borderRadius:"16px",
                  border:"1.5px solid rgba(255,255,255,0.06)", padding:"24px",
                }}>
                  {/* Stars */}
                  <div style={{ display:"flex", gap:"3px", marginBottom:"14px" }}>
                    {[1,2,3,4,5].map(i => <Star key={i} style={{ width:"13px", height:"13px", color:"#f59e0b", fill:"#f59e0b" }} />)}
                  </div>
                  <p style={{ fontSize:"14px", color:"rgba(248,250,252,0.7)", lineHeight:1.65, margin:"0 0 20px" }}>
                    &ldquo;{text}&rdquo;
                  </p>
                  {/* Author */}
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                      <div style={{ width:"38px", height:"38px", borderRadius:"50%", background:color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"14px", fontWeight:700, color:"#fff" }}>
                        {initials}
                      </div>
                      <div>
                        <p style={{ fontSize:"13px", fontWeight:600, color:"#f8fafc", margin:0 }}>{flag} {name}</p>
                      </div>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <p style={{ fontSize:"16px", fontWeight:800, color:"#f59e0b", margin:0 }}>Band {band}</p>
                      <p style={{ fontSize:"11px", color:"rgba(248,250,252,0.35)", margin:0 }}>was {prev}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ PRICING ══════════════════════════════════════════════════════════ */}
        <section id="pricing" style={{ padding:"100px 28px", background:"linear-gradient(180deg,#0a1628 0%,#0f172a 100%)" }}>
          <div style={{ maxWidth:"1180px", margin:"0 auto" }}>

            <div style={{ textAlign:"center", marginBottom:"60px" }}>
              <p style={{ fontSize:"12px", fontWeight:700, color:"#f59e0b", textTransform:"uppercase", letterSpacing:"2px", marginBottom:"12px" }}>Pricing</p>
              <h2 style={{ fontSize:"clamp(28px,4vw,44px)", fontWeight:800, letterSpacing:"-0.025em", margin:"0 0 14px", color:"#f8fafc" }}>
                Simple, transparent pricing
              </h2>
              <p style={{ fontSize:"16px", color:"rgba(248,250,252,0.5)", maxWidth:"420px", margin:"0 auto" }}>
                Start free. Upgrade when you&apos;re ready to go all-in.
              </p>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:"20px", alignItems:"start" }}>
              {PLANS.map(({ name, price, period, desc, highlight, features, cta, ctaHref }) => (
                <div key={name} className="plan-card" style={{
                  background: highlight ? "linear-gradient(180deg,#1e293b 0%,#162032 100%)" : "#1e293b",
                  borderRadius:"20px",
                  border: highlight ? "2px solid #f59e0b" : "1.5px solid rgba(255,255,255,0.08)",
                  padding:"32px",
                  position:"relative",
                  boxShadow: highlight ? "0 20px 60px rgba(245,158,11,0.2), 0 0 0 1px rgba(245,158,11,0.1)" : "none",
                  transform: highlight ? "scale(1.02)" : "none",
                }}>
                  {highlight && (
                    <div style={{ position:"absolute", top:"-14px", left:"50%", transform:"translateX(-50%)", background:"linear-gradient(135deg,#f59e0b,#d97706)", borderRadius:"999px", padding:"5px 16px", fontSize:"11px", fontWeight:700, color:"#0f172a", whiteSpace:"nowrap" }}>
                      ✦ Most Popular
                    </div>
                  )}

                  <p style={{ fontSize:"13px", fontWeight:700, color: highlight ? "#f59e0b" : "rgba(248,250,252,0.5)", textTransform:"uppercase", letterSpacing:"1.5px", margin:"0 0 8px" }}>{name}</p>
                  <div style={{ display:"flex", alignItems:"baseline", gap:"4px", margin:"0 0 8px" }}>
                    <span style={{ fontSize:"40px", fontWeight:900, color:"#f8fafc" }}>{price}</span>
                    <span style={{ fontSize:"15px", color:"rgba(248,250,252,0.4)" }}>{period}</span>
                  </div>
                  <p style={{ fontSize:"14px", color:"rgba(248,250,252,0.5)", margin:"0 0 24px" }}>{desc}</p>

                  <ul style={{ margin:"0 0 28px", padding:0, listStyle:"none", display:"flex", flexDirection:"column", gap:"10px" }}>
                    {features.map(f => (
                      <li key={f} style={{ display:"flex", alignItems:"flex-start", gap:"9px", fontSize:"14px", color:"rgba(248,250,252,0.7)", lineHeight:1.45 }}>
                        <CheckCircle2 style={{ width:"15px", height:"15px", color: highlight ? "#f59e0b" : "#0d9488", marginTop:"1px", flexShrink:0 }} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link href={ctaHref} className="cta-btn" style={{
                    display:"block", textAlign:"center",
                    fontSize:"15px", fontWeight:700, color: highlight ? "#0f172a" : "#f8fafc", textDecoration:"none",
                    background: highlight ? "linear-gradient(135deg,#f59e0b,#d97706)" : "rgba(255,255,255,0.08)",
                    borderRadius:"12px", padding:"13px",
                    border: highlight ? "none" : "1px solid rgba(255,255,255,0.1)",
                    boxShadow: highlight ? "0 4px 20px rgba(245,158,11,0.4)" : "none",
                  }}>
                    {cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ FINAL CTA ════════════════════════════════════════════════════════ */}
        <section style={{ padding:"100px 28px", background:"linear-gradient(135deg,#0d4f4a,#0f172a,#0f2a5f)", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(13,148,136,0.12) 1px,transparent 1px)", backgroundSize:"32px 32px", pointerEvents:"none" }} />
          <div style={{ maxWidth:"640px", margin:"0 auto", textAlign:"center", position:"relative", zIndex:1 }}>
            <div style={{ fontSize:"48px", marginBottom:"16px" }}>🎓</div>
            <h2 style={{ fontSize:"clamp(28px,4vw,48px)", fontWeight:900, color:"#f8fafc", letterSpacing:"-0.03em", margin:"0 0 16px" }}>
              Your Band 7+ is<br />
              <span style={{ color:"#f59e0b" }}>one session away.</span>
            </h2>
            <p style={{ fontSize:"17px", color:"rgba(248,250,252,0.6)", margin:"0 0 36px", lineHeight:1.65 }}>
              Join 10,000+ students already training smarter. No credit card required.
            </p>
            <Link href="/signup" className="cta-btn" style={{
              display:"inline-flex", alignItems:"center", gap:"10px",
              fontSize:"17px", fontWeight:700, color:"#0f172a", textDecoration:"none",
              background:"linear-gradient(135deg,#f59e0b,#d97706)",
              borderRadius:"16px", padding:"18px 40px",
              boxShadow:"0 10px 40px rgba(245,158,11,0.5)",
            }}>
              Start for Free <ArrowRight style={{ width:"20px", height:"20px" }} />
            </Link>
          </div>
        </section>

        {/* ══ FOOTER ═══════════════════════════════════════════════════════════ */}
        <footer style={{ padding:"40px 28px", background:"#070d1a", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ maxWidth:"1180px", margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"16px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
              <div style={{ width:"30px", height:"30px", borderRadius:"8px", background:"rgba(13,148,136,0.2)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <GraduationCap style={{ width:"15px", height:"15px", color:"#0d9488" }} />
              </div>
              <span style={{ fontSize:"14px", fontWeight:600, color:"rgba(248,250,252,0.5)" }}>IELTS Sensei</span>
            </div>
            <p style={{ fontSize:"13px", color:"rgba(248,250,252,0.25)", margin:0 }}>
              © {new Date().getFullYear()} IELTS Sensei. All rights reserved.
            </p>
            <div style={{ display:"flex", gap:"24px" }}>
              {["Privacy","Terms","Contact"].map(item => (
                <a key={item} href="#" style={{ fontSize:"13px", color:"rgba(248,250,252,0.35)", textDecoration:"none" }}>{item}</a>
              ))}
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
