import Link from "next/link";
import {
  GraduationCap, Mic, BookOpen, Headphones, BookMarked,
  ArrowRight, Star, ChevronRight, Shield,
  Users, Star as StarIcon, Target, Zap,
} from "lucide-react";
import { FaqAccordion } from "@/components/landing/FaqAccordion";
import { PricingSection } from "@/components/landing/PricingSection";
import { FAQSchema } from "@/components/shared/StructuredData";
import { PAGE_METADATA } from "@/lib/metadata";

export const metadata = PAGE_METADATA.home;

const FAQ_STRUCTURED_DATA = [
  { q: "How accurate is the AI feedback vs real examiners?", a: "Our AI scores within 0.5 bands of official results 89% of the time, trained on thousands of real IELTS examiner assessments." },
  { q: "What if my band doesn't improve?", a: "We offer a full refund if you don't see any band improvement after 4 weeks of consistent daily practice (30+ min/day)." },
  { q: "How much time per day do I need?", a: "30–60 minutes per day. Students who practice 45 min/day for 6–8 weeks consistently hit their target band." },
  { q: "Is this for Academic or General Training IELTS?", a: "Both. IELTS Sensei covers Academic and General Training across all four skills." },
  { q: "Can I use IELTS Sensei if I'm at Band 5?", a: "Absolutely. Many of our most dramatic improvements (Band 5.5 → 7.5) started at Band 5." },
  { q: "How is IELTS Sensei different from Magoosh or E2Language?", a: "IELTS Sensei combines real exam-format mocks, AI band scoring in under 15 seconds, and a personalised skill map in a single workflow — at a fraction of the price." },
  { q: "When will I see results?", a: "Most students see measurable improvement within 2–3 weeks of consistent daily practice." },
];

const SKILLS = [
  { tag: "Speaking",   Icon: Mic,        color: "#7c3aed", bg: "rgba(124,58,237,0.08)", border: "rgba(124,58,237,0.18)", title: "Sound like a Band 8 candidate.",              body: "50+ real cue cards. AI scores fluency, grammar, and pronunciation in 12 seconds. Parts 1, 2 & 3." },
  { tag: "Writing AI", Icon: BookOpen,   color: "#dc2626", bg: "rgba(220,38,38,0.08)",  border: "rgba(220,38,38,0.18)",  title: "Task 1 & Task 2. Band score in 15 seconds.",  body: "Task Response, Coherence, Lexical Resource, Grammar — scored on the real rubric. Model answers." },
  { tag: "Listening",  Icon: Headphones, color: "#0ea5e9", bg: "rgba(14,165,233,0.08)", border: "rgba(14,165,233,0.18)", title: "Cambridge format. 40 questions. Auto-scored.", body: "Timed Listening across 4 sections. Audio plays once — exactly like the real exam." },
  { tag: "Reading",    Icon: BookMarked, color: "#10b981", bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.18)", title: "10,000+ practice items.",                      body: "Filter by skill, question type, and difficulty. Patterns you keep missing stay in rotation." },
];

const STEPS = [
  { n: "01", title: "Take a full mock",  body: "Set a clean baseline across all four skills under real timed conditions.", color: "#dc2626" },
  { n: "02", title: "Open your map",     body: "See which skill and sub-skill cost the most band points last time.",       color: "#f59e0b" },
  { n: "03", title: "Practice the gaps", body: "Train on the exact question types you missed — not random sets.",          color: "#10b981" },
  { n: "04", title: "Hit your band",     body: "Your dashboard tracks every attempt so progress is always visible.",       color: "#7c3aed" },
];

const REVIEWS = [
  { from: "5.5", to: "7.5", init: "N", color: "#3b82f6", name: "Nurmukhammad N.", country: "🇺🇿", weeks: 10, quote: "I felt like in a real exam. Genuinely the closest to the real thing I've ever seen." },
  { from: "6.0", to: "7.5", init: "S", color: "#8b5cf6", name: "Saltanat S.",      country: "🇺🇿", weeks: 6,  quote: "The reading drills improved my score dramatically. The platform itself is incredibly smooth." },
  { from: "6.5", to: "8.0", init: "S", color: "#10b981", name: "Samandar R.",      country: "🇺🇿", weeks: 8,  quote: "The skill map showed me exactly where I was losing points every single time." },
  { from: "6.0", to: "7.0", init: "D", color: "#f59e0b", name: "Dilnoza T.",       country: "🇺🇿", weeks: 6,  quote: "The AI caught pronunciation mistakes my teacher never noticed in 2 years. Six weeks later — Band 7.0." },
  { from: "6.5", to: "8.0", init: "A", color: "#f43f5e", name: "Arjun P.",          country: "🇮🇳", weeks: 10, quote: "I practised 10 essays a day and watched my score climb in real time." },
  { from: "5.5", to: "7.5", init: "B", color: "#06b6d4", name: "Bekzod U.",         country: "🇺🇿", weeks: 9,  quote: "I had failed IELTS twice before. Nine weeks later: 7.5. My UK visa is approved." },
];

const COMPARE = [
  { label: "Cost",             tutor: "$30–60 / hr", apps: "$20–40 / mo", us: "$12 / mo" },
  { label: "AI band scoring",  tutor: "None",         apps: "None",        us: "< 15 seconds" },
  { label: "Real mock tests",  tutor: "Expensive",    apps: "No",          us: "All 4 skills" },
  { label: "Personalised map", tutor: "Limited",      apps: "No",          us: "Auto-updated" },
  { label: "IELTS focus",      tutor: "Yes",          apps: "Generic",     us: "100% IELTS" },
  { label: "Availability",     tutor: "Scheduled",    apps: "Anytime",     us: "24 / 7" },
];

const STATS = [
  { v: "10,000+", l: "students trained",      Icon: Users,    color: "#dc2626" },
  { v: "4.9 / 5", l: "average rating",        Icon: StarIcon, color: "#f59e0b" },
  { v: "95%",     l: "reach their band goal",  Icon: Target,   color: "#10b981" },
  { v: "< 15s",   l: "AI feedback speed",     Icon: Zap,      color: "#7c3aed" },
];

export default function LandingPage() {
  return (
    <>
      <FAQSchema questions={FAQ_STRUCTURED_DATA} />
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .display {
          font-size: clamp(52px, 6.5vw, 92px);
          font-weight: 900;
          line-height: 1.0;
          letter-spacing: -0.05em;
          color: #0f172a;
        }
        .section-head {
          font-size: clamp(34px, 4vw, 62px);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.04em;
          color: #0f172a;
        }
        .label-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #dc2626;
        }
        .label-tag::before {
          content: '';
          display: inline-block;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #dc2626;
        }

        @keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .ticker { animation: ticker 36s linear infinite; white-space: nowrap; }
        .ticker:hover { animation-play-state: paused; }

        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-16px)} }
        .floating { animation: float 5s ease-in-out infinite; }

        @keyframes pulse-ring { 0%{transform:scale(1);opacity:0.4} 70%{transform:scale(1.15);opacity:0} 100%{transform:scale(1.15);opacity:0} }
        .pulse-dot::after {
          content: '';
          position: absolute; inset: -4px;
          border-radius: 50%;
          border: 2px solid #dc2626;
          animation: pulse-ring 2s ease-out infinite;
        }

        .skill-row {
          display: grid;
          grid-template-columns: 52px 150px 1fr 1fr auto;
          gap: 24px;
          align-items: center;
          padding: 30px 20px;
          border-bottom: 1px solid rgba(0,0,0,0.06);
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s;
          border-radius: 0;
        }
        .skill-row:hover { background: rgba(0,0,0,0.02); border-radius: 14px; margin: 0 -8px; padding: 30px 28px; }
        .skill-row:hover .row-arrow { opacity: 1; transform: translateX(0); }
        .row-arrow { opacity: 0; transform: translateX(-8px); transition: opacity 0.2s, transform 0.2s; }

        .btn-primary { transition: all 0.18s cubic-bezier(0.34,1.56,0.64,1); }
        .btn-primary:hover { transform: translateY(-2px) scale(1.02); box-shadow: 0 12px 40px rgba(220,38,38,0.35) !important; background: #b91c1c !important; }
        .btn-primary:active { transform: scale(0.97); }

        .btn-ghost { transition: all 0.15s; }
        .btn-ghost:hover { background: rgba(0,0,0,0.04) !important; border-color: rgba(0,0,0,0.16) !important; }

        .nav-a { transition: color 0.15s; color: #64748b; cursor: pointer; }
        .nav-a:hover { color: #0f172a; }

        .review-card { transition: all 0.2s; cursor: default; }
        .review-card:hover { transform: translateY(-4px); box-shadow: 0 20px 60px rgba(0,0,0,0.1), 0 0 0 1.5px rgba(220,38,38,0.15) !important; }

        .carousel-track {
          display: flex; gap: 16px;
          overflow-x: auto; padding-bottom: 8px;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .carousel-track::-webkit-scrollbar { display: none; }
        .carousel-card { flex: 0 0 330px; scroll-snap-align: start; }

        .footer-link { color: #64748b; text-decoration: none; transition: color 0.15s; display: block; font-size: 13.5px; margin-bottom: 8px; }
        .footer-link:hover { color: #0f172a; }

        .stat-card { transition: all 0.2s; }
        .stat-card:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,0,0,0.08); }

        .skip-link {
          position: absolute; top: -999px; left: 8px; z-index: 9999;
          padding: 8px 16px; border-radius: 6px;
          background: #dc2626; color: #fff; font-weight: 700; font-size: 13px;
          text-decoration: none;
        }
        .skip-link:focus { top: 8px; }

        @media (prefers-reduced-motion: reduce) {
          .floating, .ticker, .btn-primary:hover, .review-card:hover, .skill-row { animation: none !important; transition: none !important; transform: none !important; }
        }

        @media (max-width: 768px) {
          .grid-2  { grid-template-columns: 1fr !important; }
          .grid-3  { grid-template-columns: 1fr !important; }
          .grid-4  { grid-template-columns: 1fr 1fr !important; }
          .hide-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
          .carousel-card { flex: 0 0 290px; }
          .skill-row { grid-template-columns: 44px 1fr; gap: 14px; padding: 22px 12px; }
          .skill-row .skill-body, .skill-row .row-arrow { display: none; }
          .hero-ctas { flex-direction: column !important; }
          .hero-ctas a { width: 100%; justify-content: center !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      <a href="#main-content" className="skip-link">Skip to main content</a>

      <div style={{ fontFamily: "var(--font-inter, ui-sans-serif, system-ui)", background: "#fff", color: "#0f172a", overflowX: "hidden", minHeight: "100vh" }}>

        {/* ══ NAV ══════════════════════════════════════════════════════════ */}
        <header style={{
          position: "sticky", top: 0, zIndex: 200,
          background: "rgba(255,255,255,0.94)",
          backdropFilter: "blur(24px) saturate(200%)",
          borderBottom: "1px solid rgba(0,0,0,0.07)",
        }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px", height: "66px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "linear-gradient(135deg,#ef4444,#dc2626,#b91c1c)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 14px rgba(220,38,38,0.3)" }}>
                <GraduationCap style={{ width: "18px", height: "18px", color: "#fff" }} />
              </div>
              <span style={{ fontWeight: 800, fontSize: "15px", color: "#0f172a", letterSpacing: "-0.03em" }}>IELTS Sensei</span>
            </Link>

            <nav aria-label="Main navigation" className="hide-mobile" style={{ display: "flex", gap: "32px" }}>
              {[["#platform","Features"],["#route","How it works"],["#plan","Pricing"],["#reviews","Reviews"],["#faq","FAQ"]].map(([href, label]) => (
                <a key={href} href={href} className="nav-a" style={{ fontSize: "14px", fontWeight: 500, textDecoration: "none" }}>{label}</a>
              ))}
            </nav>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Link href="/login" className="nav-a hide-mobile" style={{ fontSize: "13.5px", fontWeight: 500, textDecoration: "none" }}>Sign in</Link>
              <Link href="/demo" className="btn-ghost hide-mobile" style={{
                fontSize: "13px", fontWeight: 600, color: "#64748b", textDecoration: "none",
                border: "1.5px solid rgba(0,0,0,0.1)", borderRadius: "10px", padding: "7px 16px",
              }}>
                Live demo
              </Link>
              <Link href="/signup" className="btn-primary" style={{
                fontSize: "13.5px", fontWeight: 700, color: "#fff", textDecoration: "none",
                background: "linear-gradient(135deg,#ef4444,#dc2626)", borderRadius: "10px", padding: "8px 20px",
                boxShadow: "0 4px 16px rgba(220,38,38,0.28)",
              }}>
                Start free →
              </Link>
            </div>
          </div>
        </header>

        <main id="main-content">

        {/* ══ HERO ══════════════════════════════════════════════════════════ */}
        <section style={{ padding: "96px 32px 80px", maxWidth: "1200px", margin: "0 auto", position: "relative", overflow: "visible" }}>
          {/* Decorative glows */}
          <div style={{ position: "absolute", top: "-80px", right: "-160px", width: "700px", height: "700px", borderRadius: "50%", background: "radial-gradient(circle, rgba(220,38,38,0.06) 0%, transparent 65%)", pointerEvents: "none", zIndex: 0 }} />
          <div style={{ position: "absolute", bottom: "0", left: "-100px", width: "500px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.04) 0%, transparent 65%)", pointerEvents: "none", zIndex: 0 }} />

          {/* Score delta pill */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "rgba(220,38,38,0.06)", border: "1.5px solid rgba(220,38,38,0.15)", borderRadius: "999px", padding: "7px 18px 7px 8px", marginBottom: "32px", position: "relative", zIndex: 1 }}>
            <span style={{ fontSize: "12px", fontWeight: 800, color: "#94a3b8", background: "rgba(0,0,0,0.06)", borderRadius: "999px", padding: "3px 10px" }}>6.0</span>
            <span style={{ fontSize: "14px", color: "#fca5a5" }}>→</span>
            <span style={{ fontSize: "13px", fontWeight: 900, color: "#dc2626", letterSpacing: "-0.02em" }}>7.5</span>
            <span style={{ fontSize: "12px", color: "#fca5a5" }}>·</span>
            <span style={{ fontSize: "12px", color: "#dc2626", opacity: 0.7 }}>in 8 weeks</span>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e", display: "inline-block", position: "relative" }} className="pulse-dot" />
            <span style={{ fontSize: "11px", color: "#22c55e", fontWeight: 600 }}>Live</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "72px", alignItems: "center", position: "relative", zIndex: 1 }} className="grid-2">
            {/* Left */}
            <div>
              <p className="label-tag" style={{ marginBottom: "22px" }}>Your target band. Your route.</p>

              <h1 className="display" style={{ marginBottom: "26px" }}>
                Reach your<br />
                <span style={{
                  background: "linear-gradient(135deg,#f87171 0%,#dc2626 45%,#b91c1c 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>
                  target band.
                </span>
              </h1>

              <p style={{ fontSize: "18px", color: "#64748b", lineHeight: 1.72, maxWidth: "430px", marginBottom: "40px" }}>
                Full mocks, focused practice, AI Writing feedback — in one preparation route built around your real gaps.
              </p>

              <div className="hero-ctas" style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "12px", marginBottom: "22px" }}>
                <Link href="/demo" className="btn-primary" style={{
                  display: "inline-flex", alignItems: "center", gap: "10px",
                  fontSize: "15px", fontWeight: 700, color: "#fff", textDecoration: "none",
                  background: "linear-gradient(135deg,#ef4444,#dc2626,#b91c1c)", borderRadius: "14px", padding: "15px 30px",
                  boxShadow: "0 8px 28px rgba(220,38,38,0.32)",
                }}>
                  See Dashboard Free <ArrowRight style={{ width: "16px", height: "16px" }} />
                </Link>
                <Link href="/signup" className="btn-ghost" style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  fontSize: "14.5px", fontWeight: 600, color: "#475569", textDecoration: "none",
                  border: "1.5px solid rgba(0,0,0,0.1)", borderRadius: "14px", padding: "14px 26px",
                }}>
                  Start Free — No Card
                </Link>
              </div>
              <p style={{ fontSize: "12px", color: "#94a3b8" }}>Free tier available · No credit card · Cancel anytime</p>

              {/* Social proof */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "32px", background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.06)", borderRadius: "12px", padding: "12px 16px", width: "fit-content" }}>
                <div style={{ display: "flex" }}>
                  {["#dc2626","#8b5cf6","#3b82f6","#10b981","#f59e0b"].map((c,i) => (
                    <div key={i} style={{ width: "30px", height: "30px", borderRadius: "50%", background: c, border: "2.5px solid #fff", marginLeft: i>0?"-9px":0, zIndex: 5-i, display:"flex",alignItems:"center",justifyContent:"center",fontSize:"11px",fontWeight:700,color:"#fff" }}>
                      {["N","S","A","D","B"][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ display: "flex", gap: "2px", marginBottom: "2px" }}>
                    {[1,2,3,4,5].map(i => <Star key={i} style={{ width: "11px", height: "11px", color: "#f59e0b", fill: "#f59e0b" }} />)}
                  </div>
                  <p style={{ fontSize: "11.5px", color: "#64748b", fontWeight: 500 }}>10,000+ students trained · 4.9/5</p>
                </div>
              </div>
            </div>

            {/* Right — Dashboard mockup */}
            <div className="floating hide-mobile" style={{ position: "relative" }}>
              {/* Glow behind card */}
              <div style={{ position: "absolute", inset: "-20px", borderRadius: "28px", background: "linear-gradient(135deg, rgba(220,38,38,0.12), rgba(124,58,237,0.08), rgba(14,165,233,0.08))", filter: "blur(32px)", zIndex: 0 }} />
              <div style={{
                position: "relative", zIndex: 1,
                background: "#0f172a",
                borderRadius: "20px",
                border: "1px solid rgba(255,255,255,0.07)",
                overflow: "hidden",
                boxShadow: "0 32px 80px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.12)",
              }}>
                {/* Browser chrome */}
                <div style={{ background: "#060c18", padding: "13px 18px", display: "flex", alignItems: "center", gap: "7px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ef4444" }} />
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#f59e0b" }} />
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#22c55e" }} />
                  <span style={{ marginLeft: "12px", fontSize: "11px", color: "#475569", letterSpacing: "0.02em" }}>ieltssensei.uz/dashboard</span>
                </div>

                <div style={{ padding: "22px 22px 18px", display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <p style={{ fontSize: "11px", color: "#475569", marginBottom: "3px" }}>Your progress</p>
                      <p style={{ fontSize: "15px", fontWeight: 800, color: "#f1f5f9", letterSpacing: "-0.02em" }}>Jasurbek 👋</p>
                    </div>
                    <span style={{ fontSize: "11px", fontWeight: 700, color: "#f59e0b", background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: "8px", padding: "4px 10px", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                      <Zap style={{ width: "10px", height: "10px" }} /> 7-day streak
                    </span>
                  </div>

                  {/* Score rings */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "8px" }}>
                    {[{l:"Listen",s:"7.5",p:82,c:"#3b82f6"},{l:"Read",s:"6.5",p:68,c:"#8b5cf6"},{l:"Write",s:"7.0",p:76,c:"#10b981"},{l:"Speak",s:"6.0",p:62,c:"#f59e0b"}].map(({l,s,p,c})=>{
                      const r=24; const circ=2*Math.PI*r;
                      return(
                        <div key={l} style={{ background:"rgba(255,255,255,0.03)", borderRadius:"12px", padding:"12px 4px", textAlign:"center", border:"1px solid rgba(255,255,255,0.05)" }}>
                          <svg width="58" height="58" viewBox="0 0 58 58" style={{display:"block",margin:"0 auto"}}>
                            <circle cx="29" cy="29" r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="4.5"/>
                            <circle cx="29" cy="29" r={r} fill="none" stroke={c} strokeWidth="4.5"
                              strokeDasharray={`${circ}`} strokeDashoffset={`${circ-(p/100)*circ}`}
                              strokeLinecap="round" style={{transform:"rotate(-90deg)",transformOrigin:"50% 50%"}}/>
                            <text x="29" y="33" textAnchor="middle" fontSize="12.5" fontWeight="800" fill={c}>{s}</text>
                          </svg>
                          <p style={{fontSize:"9.5px",color:"#475569",marginTop:"4px",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em"}}>{l}</p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Next action */}
                  <div style={{ background: "linear-gradient(135deg, rgba(220,38,38,0.14), rgba(239,68,68,0.06))", borderRadius: "12px", padding: "14px 16px", border: "1px solid rgba(220,38,38,0.22)" }}>
                    <p style={{ fontSize: "10px", fontWeight: 700, color: "#f87171", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "5px", display: "flex", alignItems: "center", gap: "5px" }}>
                      <Zap style={{ width: "10px", height: "10px" }} /> Next action
                    </p>
                    <p style={{ fontSize: "12.5px", fontWeight: 600, color: "#f1f5f9", marginBottom: "10px" }}>Practice Writing Task 2 — your weakest area</p>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: "linear-gradient(135deg,#ef4444,#dc2626)", borderRadius: "7px", padding: "5px 12px", fontSize: "10.5px", fontWeight: 700, color: "#fff", cursor: "pointer", boxShadow: "0 2px 10px rgba(220,38,38,0.3)" }}>
                      Start <ArrowRight style={{width:"10px",height:"10px"}} />
                    </span>
                  </div>

                  {/* Mini chart */}
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                      <p style={{ fontSize: "10px", color: "#475569", fontWeight: 600 }}>Band trend — last 8 sessions</p>
                      <span style={{ fontSize: "10px", color: "#22c55e", fontWeight: 700 }}>↑ +0.5</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", height: "36px" }}>
                      {[42,50,48,58,62,60,70,80].map((h,i)=>(
                        <div key={i} style={{ flex:1, height:`${h}%`, borderRadius:"4px 4px 0 0",
                          background: i===7
                            ? "linear-gradient(180deg,#ef4444,#dc2626)"
                            : i>=5
                            ? "rgba(220,38,38,0.25)"
                            : "rgba(255,255,255,0.07)" }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ TRUST STRIP ════════════════════════════════════════════════ */}
        <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", borderBottom: "1px solid rgba(0,0,0,0.06)", padding: "15px 32px", background: "linear-gradient(90deg, rgba(220,38,38,0.02), rgba(124,58,237,0.02), rgba(14,165,233,0.02))" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "32px" }}>
            {[
              { t: "Academic & General Training", c: "#dc2626" },
              { t: "Band 5 to 9", c: "#f59e0b" },
              { t: "All 4 skills", c: "#10b981" },
              { t: "Refund if no improvement", c: "#7c3aed" },
              { t: "Cancel anytime", c: "#0ea5e9" },
            ].map(({ t, c }) => (
              <span key={t} style={{ fontSize: "12.5px", color: "#64748b", display: "flex", alignItems: "center", gap: "8px", fontWeight: 500 }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: c, display: "inline-block", flexShrink: 0 }} />
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* ══ TICKER ═══════════════════════════════════════════════════════ */}
        <div style={{ padding: "14px 0", overflow: "hidden", borderBottom: "1px solid rgba(0,0,0,0.06)", background: "#fafafa" }}>
          <div className="ticker" style={{ display: "flex", gap: "48px", width: "max-content" }}>
            {[...Array(2)].map((_,rep) =>
              ["10,000+ students trained","4.9 / 5 rating","95% reach their goal","AI feedback in < 15s","Free tier always available","Speaking · Writing · Reading · Listening"].map((item,i) => (
                <span key={`${rep}-${i}`} style={{ fontSize: "12.5px", fontWeight: 500, color: "#94a3b8", display: "flex", alignItems: "center", gap: "16px" }}>
                  <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: ["#dc2626","#f59e0b","#10b981","#7c3aed","#0ea5e9","#dc2626"][i], display: "inline-block", flexShrink: 0 }} />
                  {item}
                </span>
              ))
            )}
          </div>
        </div>

        {/* ══ STATS ════════════════════════════════════════════════════════ */}
        <section style={{ padding: "80px 32px", background: "#fff" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "20px" }} className="stats-grid">
              {STATS.map(({ v, l, Icon, color }) => (
                <div key={l} className="stat-card" style={{
                  background: "#fff", borderRadius: "18px",
                  border: "1.5px solid rgba(0,0,0,0.07)",
                  padding: "28px 24px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                }}>
                  <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: `${color}15`, border: `1.5px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                    <Icon style={{ width: "18px", height: "18px", color }} />
                  </div>
                  <p style={{ fontSize: "clamp(28px,3vw,40px)", fontWeight: 900, color: "#0f172a", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: "6px" }}>{v}</p>
                  <p style={{ fontSize: "13px", color: "#64748b", fontWeight: 500 }}>{l}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ COMPARE ════════════════════════════════════════════════════ */}
        <section style={{ padding: "100px 32px", background: "#f8fafc", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <p className="label-tag" style={{ marginBottom: "14px", justifyContent: "center" }}>Why IELTS Sensei</p>
              <h2 className="section-head">The smarter choice.</h2>
            </div>

            <div style={{ border: "1.5px solid rgba(0,0,0,0.08)", borderRadius: "20px", overflow: "hidden", background: "#fff", boxShadow: "0 8px 40px rgba(0,0,0,0.06)" }}>
              {/* Header */}
              <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", background: "#fafafa", padding: "18px 28px", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
                <span />
                {[
                  { label: "Private Tutor",   sub: "$30–60/hr",       hl: false },
                  { label: "Generic Apps",    sub: "No IELTS focus",  hl: false },
                  { label: "IELTS Sensei ✦", sub: "$12/mo",          hl: true  },
                ].map(({ label, sub, hl }) => (
                  <div key={label} style={{ textAlign: "center" }}>
                    <p style={{ fontSize: "13px", fontWeight: 700, color: hl ? "#dc2626" : "#94a3b8", marginBottom: "2px" }}>{label}</p>
                    <p style={{ fontSize: "11px", color: "#cbd5e1" }}>{sub}</p>
                  </div>
                ))}
              </div>
              {COMPARE.map(({ label, tutor, apps, us }, i) => (
                <div key={label} style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", padding: "16px 28px", background: i%2===0 ? "transparent" : "rgba(0,0,0,0.012)", borderBottom: i<COMPARE.length-1 ? "1px solid rgba(0,0,0,0.05)" : "none", alignItems: "center" }}>
                  <span style={{ fontSize: "14px", color: "#334155", fontWeight: 500 }}>{label}</span>
                  <span style={{ fontSize: "13px", color: "#cbd5e1", textAlign: "center" }}>{tutor}</span>
                  <span style={{ fontSize: "13px", color: "#cbd5e1", textAlign: "center" }}>{apps}</span>
                  <span style={{ fontSize: "13px", color: "#dc2626", fontWeight: 800, textAlign: "center" }}>{us}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ PLATFORM / SKILLS ════════════════════════════════════════════ */}
        <section id="platform" style={{ padding: "100px 32px", maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ marginBottom: "56px" }}>
            <p className="label-tag" style={{ marginBottom: "14px" }}>Practice engine</p>
            <h2 className="section-head" style={{ marginBottom: "14px" }}>Mock, map, train.</h2>
            <p style={{ fontSize: "17px", color: "#64748b", maxWidth: "460px", lineHeight: 1.65 }}>
              Start with a timed mock. IELTS Sensei shows exactly what to fix next.
            </p>
          </div>

          <div style={{ borderTop: "1.5px solid rgba(0,0,0,0.07)" }}>
            {SKILLS.map(({ tag, Icon, color, bg, border, title, body }) => (
              <Link key={tag} href="/signup" style={{ textDecoration: "none", display: "block" }}>
                <div className="skill-row">
                  <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: bg, border: `1.5px solid ${border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon style={{ width: "18px", height: "18px", color }} />
                  </div>
                  <span style={{ fontSize: "11px", fontWeight: 800, color, textTransform: "uppercase", letterSpacing: "0.1em" }}>{tag}</span>
                  <p style={{ fontSize: "clamp(15px,1.8vw,20px)", fontWeight: 700, color: "#0f172a", letterSpacing: "-0.02em", lineHeight: 1.25 }}>{title}</p>
                  <p className="skill-body" style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.65 }}>{body}</p>
                  <ChevronRight className="row-arrow" style={{ width: "18px", height: "18px", color, flexShrink: 0 }} />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ══ HOW IT WORKS ════════════════════════════════════════════════ */}
        <section id="route" style={{ padding: "100px 32px", background: "#f8fafc", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "100px", alignItems: "start" }} className="grid-2">
              <div>
                <p className="label-tag" style={{ marginBottom: "14px" }}>Your route</p>
                <h2 className="section-head" style={{ marginBottom: "18px" }}>Know what to practice.</h2>
                <p style={{ fontSize: "17px", color: "#64748b", lineHeight: 1.65, marginBottom: "48px" }}>
                  IELTS Sensei turns mock results, missed questions, and vocab gaps into a focused daily plan.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                  {STEPS.map(({ n, title, body, color }, i) => (
                    <div key={n} style={{ display: "flex", gap: "20px", paddingBottom: "28px", borderBottom: i<STEPS.length-1 ? "1px solid rgba(0,0,0,0.07)" : "none", marginBottom: i<STEPS.length-1 ? "28px" : "0" }}>
                      <div style={{ width: "32px", height: "32px", borderRadius: "10px", background: `${color}15`, border: `1.5px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ fontSize: "10px", fontWeight: 900, color, letterSpacing: "0.02em" }}>{n}</span>
                      </div>
                      <div>
                        <p style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a", marginBottom: "5px", letterSpacing: "-0.01em" }}>{title}</p>
                        <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.65 }}>{body}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Link href="/demo" className="btn-primary" style={{
                  display: "inline-flex", alignItems: "center", gap: "8px", marginTop: "40px",
                  fontSize: "14px", fontWeight: 700, color: "#fff", textDecoration: "none",
                  background: "linear-gradient(135deg,#ef4444,#dc2626)", borderRadius: "12px", padding: "13px 26px",
                  boxShadow: "0 6px 20px rgba(220,38,38,0.28)",
                }}>
                  See live demo <ArrowRight style={{ width: "15px", height: "15px" }} />
                </Link>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {STATS.map(({ v, l, Icon, color }, i) => (
                  <div key={l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 0", borderBottom: i<STATS.length-1 ? "1px solid rgba(0,0,0,0.07)" : "none" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: `${color}12`, border: `1.5px solid ${color}25`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon style={{ width: "16px", height: "16px", color }} />
                      </div>
                      <span style={{ fontSize: "15px", color: "#64748b", fontWeight: 500 }}>{l}</span>
                    </div>
                    <span style={{ fontSize: "28px", fontWeight: 900, color: "#0f172a", letterSpacing: "-0.04em" }}>{v}</span>
                  </div>
                ))}

                {/* Guarantee card */}
                <div style={{ marginTop: "28px", background: "linear-gradient(135deg, rgba(220,38,38,0.05), rgba(239,68,68,0.02))", borderRadius: "16px", padding: "26px", border: "1.5px solid rgba(220,38,38,0.12)" }}>
                  <p style={{ fontSize: "11px", fontWeight: 700, color: "#dc2626", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <Shield style={{ width: "13px", height: "13px" }} /> Our promise
                  </p>
                  <p style={{ fontSize: "15px", fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>
                    95% of consistent users reach their target band.
                  </p>
                  <p style={{ fontSize: "13.5px", color: "#64748b", lineHeight: 1.65 }}>
                    Full refund if no band improvement after 4 weeks of consistent daily practice (30+ min/day).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ REVIEWS ══════════════════════════════════════════════════════ */}
        <section id="reviews" style={{ padding: "100px 0 100px 32px", background: "#fff" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "48px", paddingRight: "32px" }}>
              <div>
                <p className="label-tag" style={{ marginBottom: "14px" }}>Student proof</p>
                <h2 className="section-head">Bands moving up.</h2>
              </div>
              <Link href="/signup" className="btn-ghost" style={{
                display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: 600,
                color: "#64748b", textDecoration: "none", border: "1.5px solid rgba(0,0,0,0.1)",
                borderRadius: "10px", padding: "9px 18px",
              }}>
                See your route <ArrowRight style={{ width: "13px", height: "13px" }} />
              </Link>
            </div>

            <div className="carousel-track" style={{ paddingRight: "32px" }}>
              {REVIEWS.map(({ from, to, init, color, name, country, weeks, quote }) => (
                <div key={name} className="carousel-card review-card" style={{
                  background: "#fff", borderRadius: "16px",
                  border: "1.5px solid rgba(0,0,0,0.07)",
                  padding: "26px",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                    <div style={{ background: `${color}15`, border: `1.5px solid ${color}30`, borderRadius: "10px", padding: "6px 12px" }}>
                      <span style={{ fontSize: "15px", fontWeight: 700, color: "#94a3b8" }}>{from}</span>
                      <span style={{ fontSize: "12px", color: "#e2e8f0", margin: "0 6px" }}>→</span>
                      <span style={{ fontSize: "22px", fontWeight: 900, color, letterSpacing: "-0.03em" }}>{to}</span>
                    </div>
                    <div style={{ flex: 1 }} />
                    <div style={{ display: "flex", gap: "2px" }}>
                      {[1,2,3,4,5].map(i => <Star key={i} style={{ width: "11px", height: "11px", color: "#f59e0b", fill: "#f59e0b" }} />)}
                    </div>
                  </div>

                  <p style={{ fontSize: "13.5px", color: "#64748b", lineHeight: 1.75, marginBottom: "20px" }}>
                    &ldquo;{quote}&rdquo;
                  </p>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: `linear-gradient(135deg,${color},${color}cc)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 800, color: "#fff", flexShrink: 0 }}>
                        {init}
                      </div>
                      <div>
                        <p style={{ fontSize: "13px", fontWeight: 600, color: "#0f172a" }}>{country} {name}</p>
                        <p style={{ fontSize: "10px", color: "#94a3b8" }}>{weeks} weeks</p>
                      </div>
                    </div>
                    <span style={{ fontSize: "10px", fontWeight: 700, color: "#10b981", background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.18)", borderRadius: "6px", padding: "3px 9px" }}>
                      ✓ Verified
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ PRICING ══════════════════════════════════════════════════════ */}
        <section id="plan" style={{ padding: "100px 32px", background: "#f8fafc", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <p className="label-tag" style={{ marginBottom: "14px", justifyContent: "center" }}>Pricing</p>
              <h2 className="section-head" style={{ marginBottom: "12px" }}>Simple pricing.</h2>
              <p style={{ fontSize: "17px", color: "#64748b" }}>Start free. Upgrade when you&apos;re ready.</p>
            </div>
            <PricingSection />
          </div>
        </section>

        {/* ══ FAQ ══════════════════════════════════════════════════════════ */}
        <section id="faq" style={{ padding: "100px 32px", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ maxWidth: "760px", margin: "0 auto" }}>
            <div style={{ marginBottom: "56px" }}>
              <p className="label-tag" style={{ marginBottom: "14px" }}>FAQ</p>
              <h2 className="section-head">Common questions.</h2>
            </div>
            <FaqAccordion />
          </div>
        </section>

        {/* ══ FINAL CTA — full red gradient ════════════════════════════════ */}
        <section style={{ padding: "0 32px 0", maxWidth: "100%", margin: "0" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "100px 0" }}>
            <div style={{
              background: "linear-gradient(135deg, #0f172a 0%, #1e0a0a 40%, #3b0808 100%)",
              borderRadius: "28px",
              padding: "80px 60px",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 32px 80px rgba(0,0,0,0.2)",
            }}>
              {/* Background glows */}
              <div style={{ position: "absolute", top: "-80px", left: "50%", transform: "translateX(-50%)", width: "600px", height: "400px", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(220,38,38,0.25) 0%, transparent 65%)", pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: "-60px", left: "10%", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(124,58,237,0.15) 0%, transparent 65%)", pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: "-60px", right: "10%", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(14,165,233,0.12) 0%, transparent 65%)", pointerEvents: "none" }} />

              {/* Content */}
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(220,38,38,0.2)", border: "1px solid rgba(220,38,38,0.3)", borderRadius: "999px", padding: "6px 16px", marginBottom: "28px" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#f87171", display: "inline-block" }} />
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "#fca5a5", letterSpacing: "0.1em", textTransform: "uppercase" }}>Start today</span>
                </div>

                <h2 style={{ fontSize: "clamp(40px,5.5vw,80px)", fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 1.0, color: "#fff", marginBottom: "22px" }}>
                  Take one mock.<br />
                  <span style={{ background: "linear-gradient(135deg,#fca5a5 0%,#f87171 40%,#ef4444 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    See what costs
                  </span>
                  <br />band points.
                </h2>

                <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.55)", marginBottom: "40px", lineHeight: 1.65, maxWidth: "520px", margin: "0 auto 40px" }}>
                  No guesswork. A clear route from your baseline to your target band.
                </p>

                <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
                  <Link href="/demo" className="btn-primary" style={{
                    display: "inline-flex", alignItems: "center", gap: "10px",
                    fontSize: "16px", fontWeight: 700, color: "#fff", textDecoration: "none",
                    background: "linear-gradient(135deg,#ef4444,#dc2626)", borderRadius: "14px", padding: "17px 36px",
                    boxShadow: "0 8px 32px rgba(220,38,38,0.4)",
                  }}>
                    See Dashboard Free <ArrowRight style={{ width: "17px", height: "17px" }} />
                  </Link>
                  <Link href="/signup" style={{
                    display: "inline-flex", alignItems: "center", fontSize: "15px", fontWeight: 600,
                    color: "rgba(255,255,255,0.7)", textDecoration: "none",
                    border: "1.5px solid rgba(255,255,255,0.15)", borderRadius: "14px", padding: "16px 30px",
                    transition: "all 0.15s",
                  }}>
                    Start Free — No Card Needed
                  </Link>
                </div>

                <p style={{ marginTop: "18px", fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>
                  Free tier available · Full refund if no improvement after 4 weeks
                </p>

                {/* Steps pill */}
                <div style={{ display: "inline-flex", marginTop: "56px", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", overflow: "hidden", background: "rgba(255,255,255,0.04)" }}>
                  {["Mock","Review","Practice","Band 8.0"].map((step, i) => (
                    <div key={step} style={{ padding: "13px 28px", borderRight: i<3 ? "1px solid rgba(255,255,255,0.07)" : "none", display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ fontSize: "13px", fontWeight: i===3 ? 700 : 500, color: i===3 ? "#f87171" : "rgba(255,255,255,0.35)" }}>{step}</span>
                      {i<3 && <ArrowRight style={{ width: "11px", height: "11px", color: "rgba(255,255,255,0.2)" }} />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        </main>

        {/* ══ FOOTER ════════════════════════════════════════════════════════ */}
        <footer style={{ borderTop: "1px solid rgba(0,0,0,0.07)", background: "#f8fafc" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "56px 32px 36px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "48px", marginBottom: "48px" }} className="grid-3">
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "9px", background: "linear-gradient(135deg,#ef4444,#dc2626,#b91c1c)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 3px 10px rgba(220,38,38,0.25)" }}>
                    <GraduationCap style={{ width: "15px", height: "15px", color: "#fff" }} />
                  </div>
                  <span style={{ fontSize: "14px", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em" }}>IELTS Sensei</span>
                </div>
                <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.65, marginBottom: "20px", maxWidth: "280px" }}>
                  AI-powered IELTS preparation. All 4 skills, real exam format, band scores in under 15 seconds.
                </p>
                <div style={{ display: "flex", gap: "8px" }}>
                  {[
                    { name: "Instagram", href: "https://instagram.com/ieltssensei_uz", label: "Ig" },
                    { name: "Telegram",  href: "https://t.me/ieltssensei_uz",         label: "Tg" },
                  ].map(({ name, href, label }) => (
                    <a key={name} href={href} target="_blank" rel="noopener noreferrer"
                      style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(0,0,0,0.05)", border: "1.5px solid rgba(0,0,0,0.08)", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", fontSize: "11px", fontWeight: 700, color: "#64748b", cursor: "pointer", transition: "all 0.15s" }} title={name}>
                      {label}
                    </a>
                  ))}
                </div>
              </div>

              {[
                { heading: "Product", links: [["/#platform","Features"],["/#route","How it works"],["/#plan","Pricing"],["/#faq","FAQ"],["/demo","Live demo"]] },
                { heading: "Account", links: [["/signup","Sign up free"],["/login","Sign in"],["/dashboard","Dashboard"]] },
                { heading: "Legal",   links: [["/privacy","Privacy policy"],["/terms","Terms of service"],["/contact","Contact us"]] },
              ].map(({ heading, links }) => (
                <div key={heading}>
                  <p style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#94a3b8", marginBottom: "16px" }}>{heading}</p>
                  {links.map(([href, label]) => (
                    <a key={label} href={href} className="footer-link">{label}</a>
                  ))}
                </div>
              ))}
            </div>

            <div style={{ borderTop: "1px solid rgba(0,0,0,0.07)", paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
              <p style={{ fontSize: "12px", color: "#94a3b8" }}>© 2026 IELTS Sensei. Built for serious IELTS candidates.</p>
              <p style={{ fontSize: "11px", color: "#cbd5e1", maxWidth: "480px", textAlign: "right", lineHeight: 1.5 }}>
                IELTS Sensei is not affiliated with Cambridge Assessment, IDP, or the British Council.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
