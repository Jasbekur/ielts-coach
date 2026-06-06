import Link from "next/link";
import {
  GraduationCap, Mic, BookOpen, BookMarked, Headphones,
  ArrowRight, CheckCircle2, Star, TrendingUp, ChevronRight,
  Shield,
} from "lucide-react";
import { FaqAccordion } from "@/components/landing/FaqAccordion";
import { PricingSection } from "@/components/landing/PricingSection";

/* ─── DATA ────────────────────────────────────────────────────────────────── */

const SKILLS = [
  { href:"/signup", tag:"Speaking",   title:"Sound like a Band 8 candidate.",             body:"50+ real IELTS cue cards. AI scores fluency, grammar, and pronunciation in 12 seconds. Parts 1, 2 & 3 back-to-back." },
  { href:"/signup", tag:"Writing AI", title:"Task 1 & Task 2. Band score in 15 seconds.", body:"Task Response, Coherence, Lexical Resource, and Grammar — scored on the real rubric. Model answers at every level." },
  { href:"/signup", tag:"Listening",  title:"Cambridge format. 40 questions. Auto-scored.",body:"Timed Listening across 4 sections. Audio plays once — exactly like the real exam. Full review path after every attempt." },
  { href:"/signup", tag:"Reading",    title:"10,000+ practice items.",                    body:"Filter by skill, question type, and difficulty. The patterns you keep missing stay in rotation until they stop costing points." },
];

const STEPS = [
  { n:"01", title:"Take a full mock",  body:"Set a clean baseline across all four skills under real timed conditions." },
  { n:"02", title:"Open your map",     body:"See which skill and which sub-skill cost the most band points last time." },
  { n:"03", title:"Practice the gaps", body:"Train on the exact question types you missed — not random sets." },
  { n:"04", title:"Hit your band",     body:"Your dashboard tracks every attempt so progress is always visible." },
];

const REVIEWS = [
  { from:"5.5", to:"7.5", init:"N", color:"#ef4444", name:"Nurmukhammad N.", country:"🇺🇿", weeks:10, quote:"I liked the format of the test. I felt like in a real exam. Genuinely the closest to the real thing I've ever seen." },
  { from:"6.0", to:"7.5", init:"S", color:"#8b5cf6", name:"Saltanat S.",      country:"🇺🇿", weeks:6,  quote:"The reading drills improved my score dramatically. The platform itself is incredibly smooth. Thank you." },
  { from:"6.5", to:"8.0", init:"S", color:"#0ea5e9", name:"Samandar R.",      country:"🇺🇿", weeks:8,  quote:"The skill map showed me exactly where I was losing points every single time. Completely changed my approach." },
  { from:"6.0", to:"7.0", init:"D", color:"#10b981", name:"Dilnoza T.",       country:"🇺🇿", weeks:6,  quote:"The AI caught pronunciation mistakes my teacher never noticed in 2 years of lessons. Six weeks later — Band 7.0." },
  { from:"6.5", to:"8.0", init:"A", color:"#f59e0b", name:"Arjun P.",          country:"🇮🇳", weeks:10, quote:"I practised 10 essays a day and watched my score climb in real time. The rubric feedback is genuinely examiner-level." },
  { from:"5.5", to:"7.5", init:"B", color:"#f43f5e", name:"Bekzod U.",         country:"🇺🇿", weeks:9,  quote:"I had failed IELTS twice before. Nine weeks later: 7.5. My UK visa is approved. This platform changed my life." },
];

const COMPARE = [
  { label:"Cost",           tutor:"$30–60 / hr",   apps:"$20–40 / mo",  us:"$12 / mo" },
  { label:"AI band scoring",tutor:"❌ None",        apps:"❌ None",       us:"✅ <15 seconds" },
  { label:"Real mock tests",tutor:"⚠️ Expensive",  apps:"❌ No",         us:"✅ All 4 skills" },
  { label:"Personalised map",tutor:"⚠️ Limited",   apps:"❌ No",         us:"✅ Auto-updated" },
  { label:"IELTS focus",    tutor:"✅ Yes",         apps:"❌ Generic",    us:"✅ 100% IELTS" },
  { label:"Availability",   tutor:"⚠️ Scheduled",  apps:"✅ Anytime",    us:"✅ 24 / 7" },
];

export default function LandingPage() {
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

        :root {
          --bg:     #ffffff;
          --fg:     #1a1310;
          --muted:  #737373;
          --subtle: #999999;
          --s1:     #fafafa;
          --s2:     #f5f5f5;
          --border: #efe4e2;
          --brand:  #ef4444;
          --bdk:    #dc2626;
          --blt:    #fef2f2;
        }

        .display { font-size:clamp(48px,6.5vw,88px); font-weight:600; line-height:1.02; letter-spacing:-0.05em; color:var(--fg); }
        .section-head { font-size:clamp(34px,4.5vw,64px); font-weight:600; line-height:1.04; letter-spacing:-0.04em; color:var(--fg); }
        .label { font-size:11px; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; color:var(--brand); }

        @keyframes float   { 0%,100%{transform:translateY(0)}   50%{transform:translateY(-12px)} }
        @keyframes ticker  { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes fadeUp  { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes blink   { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes barRise { from{height:0} to{height:var(--h)} }

        .float  { animation:float 3.5s ease-in-out infinite; }
        .ticker { animation:ticker 28s linear infinite; }
        .ticker:hover { animation-play-state:paused; }

        .skill-row { transition:background .15s; }
        .skill-row:hover { background:var(--s1) !important; }
        .skill-row:hover .row-arrow { opacity:1 !important; transform:translateX(0) !important; }
        .row-arrow { opacity:0; transform:translateX(-6px); transition:opacity .15s,transform .15s; }

        .btn-red   { transition:background .15s,transform .15s,box-shadow .15s; }
        .btn-red:hover { background:var(--bdk) !important; transform:translateY(-1px); }
        .btn-ghost { transition:background .15s,border-color .15s; }
        .btn-ghost:hover { background:var(--s1) !important; border-color:var(--fg) !important; }

        .plan-lift { transition:transform .2s; }
        .plan-lift:hover { transform:translateY(-3px); }
        .nav-a { transition:color .12s; }
        .nav-a:hover { color:var(--fg) !important; }
        .footer-link { transition:color .12s; }
        .footer-link:hover { color:var(--fg) !important; }
        .review-card { transition:box-shadow .2s; }
        .review-card:hover { box-shadow:0 8px 30px rgba(0,0,0,0.08) !important; }

        /* Carousel */
        .carousel-track { display:flex; gap:16px; overflow-x:auto; padding-bottom:8px; scroll-snap-type:x mandatory; -webkit-overflow-scrolling:touch; scrollbar-width:none; }
        .carousel-track::-webkit-scrollbar { display:none; }
        .carousel-card { flex:0 0 320px; scroll-snap-align:start; }

        @media(max-width:768px) {
          .grid-3 { grid-template-columns:1fr !important; }
          .grid-2 { grid-template-columns:1fr !important; }
          .hide-mobile { display:none !important; }
          .carousel-card { flex:0 0 280px; }
          .compare-col { display:none !important; }
        }
      `}</style>

      <div style={{ fontFamily:"ui-sans-serif,system-ui,'Inter',sans-serif", background:"var(--bg)", color:"var(--fg)", overflowX:"hidden" }}>

        {/* ══ NAV ══════════════════════════════════════════════════════════ */}
        <header style={{ position:"sticky", top:0, zIndex:200, background:"rgba(255,255,255,0.92)", backdropFilter:"blur(16px)", borderBottom:"1px solid var(--border)" }}>
          <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"0 32px", height:"62px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <Link href="/" style={{ display:"flex", alignItems:"center", gap:"9px", textDecoration:"none" }}>
              <div style={{ width:"32px", height:"32px", borderRadius:"8px", background:"var(--brand)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <GraduationCap style={{ width:"17px", height:"17px", color:"#fff" }} />
              </div>
              <span style={{ fontWeight:700, fontSize:"15px", color:"var(--fg)", letterSpacing:"-0.01em" }}>IELTS Sensei</span>
            </Link>

            <nav className="hide-mobile" style={{ display:"flex", gap:"28px" }}>
              {[["#platform","Features"],["#route","How it works"],["#plan","Pricing"],["#reviews","Reviews"],["#faq","FAQ"]].map(([href, label]) => (
                <a key={href} href={href} className="nav-a" style={{ fontSize:"13.5px", fontWeight:500, color:"var(--muted)", textDecoration:"none" }}>{label}</a>
              ))}
            </nav>

            <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
              <Link href="/login" className="nav-a" style={{ fontSize:"13.5px", fontWeight:500, color:"var(--muted)", textDecoration:"none" }}>Sign in</Link>
              <Link href="/demo" className="btn-ghost" style={{
                fontSize:"13px", fontWeight:600, color:"var(--fg)", textDecoration:"none",
                border:"1px solid var(--border)", borderRadius:"8px", padding:"7px 14px",
              }}>
                Live demo
              </Link>
              <Link href="/signup" className="btn-red" style={{
                fontSize:"13.5px", fontWeight:700, color:"#fff", textDecoration:"none",
                background:"var(--brand)", borderRadius:"8px", padding:"8px 16px",
              }}>
                Start free →
              </Link>
            </div>
          </div>
        </header>

        {/* ══ HERO ═════════════════════════════════════════════════════════ */}
        <section style={{ padding:"90px 32px 80px", maxWidth:"1200px", margin:"0 auto" }}>

          {/* Score delta */}
          <div style={{ display:"flex", alignItems:"baseline", gap:"10px", marginBottom:"20px" }}>
            <span style={{ fontSize:"64px", fontWeight:800, color:"#e5e5e5", letterSpacing:"-0.04em", lineHeight:1 }}>6.0</span>
            <span style={{ fontSize:"28px", color:"#d4d4d4", fontWeight:300 }}>→</span>
            <span style={{ fontSize:"64px", fontWeight:800, color:"var(--brand)", letterSpacing:"-0.04em", lineHeight:1 }}>7.5</span>
            <span style={{ fontSize:"15px", color:"var(--muted)", marginLeft:"6px" }}>in 8 weeks</span>
          </div>

          {/* Credibility logos */}
          <div style={{ display:"flex", alignItems:"center", gap:"24px", marginBottom:"56px", flexWrap:"wrap" }}>
            {["Cambridge","IDP","British Council","Oxford","MIT"].map(u => (
              <span key={u} style={{ fontSize:"12px", fontWeight:600, color:"#bbb", letterSpacing:"0.05em" }}>{u}</span>
            ))}
            <span style={{ fontSize:"11px", color:"#ddd" }}>accepted by top universities worldwide</span>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"72px", alignItems:"start" }} className="grid-2">

            {/* Left */}
            <div>
              <p className="label" style={{ marginBottom:"18px" }}>Your target band. Your destination.</p>

              <h1 className="display" style={{ marginBottom:"24px" }}>
                Reach your<br />target band.
              </h1>

              <p style={{ fontSize:"18px", color:"var(--muted)", lineHeight:1.65, maxWidth:"420px", marginBottom:"40px" }}>
                Full mocks, focused practice, Writing AI feedback — in one preparation route.
              </p>

              {/* Dual CTA — Phase 1 fix */}
              <div style={{ display:"flex", flexDirection:"column", gap:"10px", marginBottom:"16px" }}>
                <Link href="/demo" className="btn-red" style={{
                  display:"inline-flex", alignItems:"center", justifyContent:"center", gap:"8px",
                  fontSize:"16px", fontWeight:700, color:"#fff", textDecoration:"none",
                  background:"var(--brand)", borderRadius:"11px", padding:"14px 32px",
                  boxShadow:"0 4px 20px rgba(239,68,68,0.3)",
                }}>
                  See Dashboard Free <ArrowRight style={{ width:"17px", height:"17px" }} />
                </Link>
                <Link href="/signup" className="btn-ghost" style={{
                  display:"inline-flex", alignItems:"center", justifyContent:"center", gap:"8px",
                  fontSize:"14px", fontWeight:600, color:"var(--fg)", textDecoration:"none",
                  background:"transparent", border:"1px solid var(--border)",
                  borderRadius:"11px", padding:"13px 28px",
                }}>
                  Start Free — No Card Needed
                </Link>
              </div>
              <p style={{ fontSize:"12px", color:"var(--subtle)" }}>Free tier available · No credit card required · Cancel anytime</p>
            </div>

            {/* Right — Animated dashboard mockup (Phase 7) */}
            <div className="float hide-mobile">
              <div style={{ background:"var(--s1)", borderRadius:"16px", border:"1px solid var(--border)", overflow:"hidden", boxShadow:"0 20px 60px rgba(0,0,0,0.07)" }}>
                {/* Browser chrome */}
                <div style={{ background:"#f0f0f0", padding:"10px 16px", display:"flex", alignItems:"center", gap:"6px", borderBottom:"1px solid var(--border)" }}>
                  <div style={{ width:"9px", height:"9px", borderRadius:"50%", background:"#ef4444" }} />
                  <div style={{ width:"9px", height:"9px", borderRadius:"50%", background:"#f59e0b" }} />
                  <div style={{ width:"9px", height:"9px", borderRadius:"50%", background:"#22c55e" }} />
                  <span style={{ marginLeft:"10px", fontSize:"11px", color:"#999" }}>ielts-sensei.vercel.app/dashboard</span>
                </div>
                <div style={{ padding:"20px", display:"flex", flexDirection:"column", gap:"14px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <div>
                      <p style={{ fontSize:"11px", color:"var(--muted)", marginBottom:"2px" }}>Your progress</p>
                      <p style={{ fontSize:"15px", fontWeight:700, color:"var(--fg)" }}>Jasurbek 👋</p>
                    </div>
                    <span style={{ fontSize:"11px", fontWeight:700, color:"var(--brand)", background:"var(--blt)", borderRadius:"6px", padding:"4px 10px" }}>🔥 7-day streak</span>
                  </div>
                  {/* Score rings */}
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"8px" }}>
                    {[{l:"Listen",s:"7.5",p:82,c:"#ef4444"},{l:"Read",s:"6.5",p:68,c:"#f97316"},{l:"Write",s:"7.0",p:76,c:"#8b5cf6"},{l:"Speak",s:"6.0",p:62,c:"#10b981"}].map(({l,s,p,c})=>{
                      const r=24; const circ=2*Math.PI*r;
                      return(
                        <div key={l} style={{background:"#fff",borderRadius:"10px",padding:"10px 4px",textAlign:"center",border:"1px solid var(--border)"}}>
                          <svg width="58" height="58" viewBox="0 0 58 58" style={{display:"block",margin:"0 auto"}}>
                            <circle cx="29" cy="29" r={r} fill="none" stroke="#f5f5f5" strokeWidth="4.5"/>
                            <circle cx="29" cy="29" r={r} fill="none" stroke={c} strokeWidth="4.5"
                              strokeDasharray={`${circ}`} strokeDashoffset={`${circ-(p/100)*circ}`}
                              strokeLinecap="round" style={{transform:"rotate(-90deg)",transformOrigin:"50% 50%"}}/>
                            <text x="29" y="33" textAnchor="middle" fontSize="12" fontWeight="700" fill={c}>{s}</text>
                          </svg>
                          <p style={{fontSize:"9px",color:"var(--muted)",marginTop:"3px",fontWeight:600}}>{l}</p>
                        </div>
                      );
                    })}
                  </div>
                  {/* Next action */}
                  <div style={{ background:"var(--blt)", borderRadius:"10px", padding:"12px 14px", border:"1px solid #fecaca" }}>
                    <p style={{ fontSize:"10px", fontWeight:700, color:"var(--brand)", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:"4px" }}>⚡ Next action</p>
                    <p style={{ fontSize:"12px", fontWeight:600, color:"var(--fg)", marginBottom:"8px" }}>Practice Writing Task 2 — your weakest area</p>
                    <span style={{ display:"inline-flex", alignItems:"center", gap:"4px", background:"var(--brand)", borderRadius:"5px", padding:"4px 10px", fontSize:"10px", fontWeight:700, color:"#fff" }}>
                      Start <ArrowRight style={{width:"10px",height:"10px"}} />
                    </span>
                  </div>
                  {/* Mini chart */}
                  <div>
                    <p style={{ fontSize:"10px", color:"var(--muted)", marginBottom:"6px" }}>Band trend — last 8 sessions</p>
                    <div style={{ display:"flex", alignItems:"flex-end", gap:"4px", height:"32px" }}>
                      {[52,58,55,62,68,65,72,80].map((h,i)=>(
                        <div key={i} style={{ flex:1, height:`${h}%`, borderRadius:"3px 3px 0 0", background: i===7 ? "var(--brand)" : "#f0f0f0" }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ TRUST STRIP (Phase 8) ════════════════════════════════════════ */}
        <div style={{ background:"var(--s1)", borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)", padding:"12px 32px" }}>
          <div style={{ maxWidth:"1200px", margin:"0 auto", display:"flex", justifyContent:"center", flexWrap:"wrap", gap:"24px" }}>
            {["Academic & General Training","Band 5 to 9","All 4 skills","Refund if no improvement","Cancel anytime"].map(t => (
              <span key={t} style={{ fontSize:"12.5px", color:"var(--muted)", display:"flex", alignItems:"center", gap:"6px" }}>
                <span style={{ color:"var(--brand)", fontSize:"8px" }}>◆</span> {t}
              </span>
            ))}
          </div>
        </div>

        {/* ══ TICKER ═══════════════════════════════════════════════════════ */}
        <div style={{ borderBottom:"1px solid var(--border)", padding:"12px 0", overflow:"hidden", background:"#1a1310" }}>
          <div className="ticker" style={{ display:"flex", gap:"40px", whiteSpace:"nowrap", width:"max-content" }}>
            {[...Array(2)].map((_,rep)=>
              ["10,000+ students trained","4.9 / 5 rating","95% reach their band goal","AI feedback in <15s","Free tier available","Speaking · Writing · Reading · Listening"].map((item,i)=>(
                <span key={`${rep}-${i}`} style={{ fontSize:"12.5px", fontWeight:500, color:"rgba(255,255,255,0.5)", display:"flex", alignItems:"center", gap:"14px" }}>
                  <span style={{ color:"var(--brand)", fontSize:"8px" }}>◆</span> {item}
                </span>
              ))
            )}
          </div>
        </div>

        {/* ══ WHY US — comparison grid (Phase 5) ══════════════════════════ */}
        <section style={{ padding:"100px 32px", background:"var(--bg)" }}>
          <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
            <div style={{ textAlign:"center", marginBottom:"56px" }}>
              <p className="label" style={{ marginBottom:"14px" }}>Why IELTS Sensei</p>
              <h2 className="section-head">The smarter choice.</h2>
            </div>

            <div style={{ border:"1px solid var(--border)", borderRadius:"16px", overflow:"hidden" }}>
              {/* Header */}
              <div style={{ display:"grid", gridTemplateColumns:"1.2fr 1fr 1fr 1fr", background:"var(--s1)", padding:"16px 24px", borderBottom:"1px solid var(--border)" }}>
                <span style={{ fontSize:"12px", fontWeight:700, color:"var(--subtle)", textTransform:"uppercase", letterSpacing:"0.1em" }}></span>
                {[
                  { label:"Private Tutor", sub:"$30–60/hr" },
                  { label:"Generic Apps", sub:"No IELTS focus" },
                  { label:"IELTS Sensei ✦", sub:"$12/mo", highlight:true },
                ].map(({ label, sub, highlight }) => (
                  <div key={label} style={{ textAlign:"center" }}>
                    <p style={{ fontSize:"13px", fontWeight:700, color: highlight ? "var(--brand)" : "var(--fg)", marginBottom:"2px" }}>{label}</p>
                    <p style={{ fontSize:"11px", color:"var(--subtle)" }}>{sub}</p>
                  </div>
                ))}
              </div>
              {COMPARE.map(({ label, tutor, apps, us }, i) => (
                <div key={label} style={{ display:"grid", gridTemplateColumns:"1.2fr 1fr 1fr 1fr", padding:"14px 24px", background: i%2===0 ? "#fff" : "var(--s1)", borderBottom: i<COMPARE.length-1 ? "1px solid var(--border)" : "none", alignItems:"center" }}>
                  <span style={{ fontSize:"13.5px", color:"var(--fg)", fontWeight:500 }}>{label}</span>
                  <span style={{ fontSize:"12.5px", color:"var(--muted)", textAlign:"center" }}>{tutor}</span>
                  <span style={{ fontSize:"12.5px", color:"var(--muted)", textAlign:"center" }}>{apps}</span>
                  <span style={{ fontSize:"12.5px", color:"var(--brand)", fontWeight:700, textAlign:"center" }}>{us}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ PLATFORM — skill rows ════════════════════════════════════════ */}
        <section id="platform" style={{ padding:"0 32px 100px", maxWidth:"1200px", margin:"0 auto" }}>
          <div style={{ marginBottom:"56px" }}>
            <p className="label" style={{ marginBottom:"14px" }}>Practice engine</p>
            <h2 className="section-head" style={{ marginBottom:"14px" }}>Mock, map, train.</h2>
            <p style={{ fontSize:"17px", color:"var(--muted)", maxWidth:"460px", lineHeight:1.6 }}>
              Start with a timed mock. IELTS Sensei shows exactly what to fix next.
            </p>
          </div>

          <div style={{ borderTop:"1px solid var(--border)" }}>
            {SKILLS.map(({ href, tag, title, body }) => (
              <Link key={tag} href="/signup" style={{ textDecoration:"none" }}>
                <div className="skill-row" style={{ display:"grid", gridTemplateColumns:"130px 1fr 1fr auto", gap:"24px", alignItems:"center", padding:"26px 12px", borderBottom:"1px solid var(--border)", background:"transparent", cursor:"pointer" }}>
                  <span style={{ fontSize:"11px", fontWeight:700, color:"var(--brand)", textTransform:"uppercase", letterSpacing:"0.1em" }}>{tag}</span>
                  <p style={{ fontSize:"clamp(16px,2vw,22px)", fontWeight:600, color:"var(--fg)", letterSpacing:"-0.02em", lineHeight:1.2 }}>{title}</p>
                  <p style={{ fontSize:"14px", color:"var(--muted)", lineHeight:1.6 }}>{body}</p>
                  <ChevronRight className="row-arrow" style={{ width:"17px", height:"17px", color:"var(--brand)", flexShrink:0 }} />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ══ ROUTE — how it works ═════════════════════════════════════════ */}
        <section id="route" style={{ padding:"100px 32px", background:"var(--s1)", borderTop:"1px solid var(--border)" }}>
          <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"100px", alignItems:"start" }} className="grid-2">

              <div>
                <p className="label" style={{ marginBottom:"14px" }}>Your route</p>
                <h2 className="section-head" style={{ marginBottom:"18px" }}>Know what to practice.</h2>
                <p style={{ fontSize:"17px", color:"var(--muted)", lineHeight:1.65, marginBottom:"48px" }}>
                  IELTS Sensei turns mock results, missed questions, and vocab gaps into focused practice.
                </p>
                <div style={{ display:"flex", flexDirection:"column", gap:"0" }}>
                  {STEPS.map(({ n, title, body }, i) => (
                    <div key={n} style={{ display:"flex", gap:"20px", paddingBottom:"28px", borderBottom: i<STEPS.length-1 ? "1px solid var(--border)" : "none", marginBottom: i<STEPS.length-1 ? "28px" : "0" }}>
                      <span style={{ fontSize:"12px", fontWeight:700, color:"var(--brand)", flexShrink:0, paddingTop:"3px" }}>{n}</span>
                      <div>
                        <p style={{ fontSize:"16px", fontWeight:600, color:"var(--fg)", marginBottom:"5px", letterSpacing:"-0.01em" }}>{title}</p>
                        <p style={{ fontSize:"14px", color:"var(--muted)", lineHeight:1.65 }}>{body}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/demo" className="btn-red" style={{
                  display:"inline-flex", alignItems:"center", gap:"8px", marginTop:"36px",
                  fontSize:"14px", fontWeight:700, color:"#fff", textDecoration:"none",
                  background:"var(--brand)", borderRadius:"9px", padding:"12px 24px",
                }}>
                  See live demo <ArrowRight style={{ width:"15px", height:"15px" }} />
                </Link>
              </div>

              <div style={{ display:"flex", flexDirection:"column", gap:"2px", paddingTop:"4px" }}>
                {[
                  { v:"10,000+", l:"students trained",   icon:"👨‍🎓" },
                  { v:"4.9 / 5", l:"average rating",      icon:"⭐" },
                  { v:"95%",     l:"reach their band goal",icon:"🎯" },
                  { v:"< 15s",   l:"AI feedback speed",   icon:"⚡" },
                ].map(({ v, l, icon }) => (
                  <div key={l} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"22px 0", borderBottom:"1px solid var(--border)" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
                      <span style={{ fontSize:"18px" }}>{icon}</span>
                      <span style={{ fontSize:"15px", color:"var(--muted)", fontWeight:500 }}>{l}</span>
                    </div>
                    <span style={{ fontSize:"24px", fontWeight:700, color:"var(--fg)", letterSpacing:"-0.03em" }}>{v}</span>
                  </div>
                ))}

                {/* Phase 4 — fixed guarantee wording */}
                <div style={{ marginTop:"28px", background:"var(--blt)", borderRadius:"12px", padding:"22px", border:"1px solid #fecaca" }}>
                  <p style={{ fontSize:"12px", fontWeight:700, color:"var(--brand)", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:"8px" }}>
                    <Shield style={{ width:"13px", height:"13px", display:"inline", marginRight:"4px" }} />
                    Our promise
                  </p>
                  <p style={{ fontSize:"15px", fontWeight:600, color:"var(--fg)", marginBottom:"6px" }}>
                    95% of consistent users reach their target band.
                  </p>
                  <p style={{ fontSize:"12px", color:"var(--muted)", lineHeight:1.6 }}>
                    Full refund if no band improvement after 4 weeks of consistent daily practice (30+ min/day).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ REVIEWS carousel (Phase 6) ══════════════════════════════════ */}
        <section id="reviews" style={{ padding:"100px 0 100px 32px", background:"var(--bg)" }}>
          <div style={{ maxWidth:"1200px", margin:"0 auto", paddingRight:"0" }}>

            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"48px", paddingRight:"32px" }}>
              <div>
                <p className="label" style={{ marginBottom:"14px" }}>Student proof</p>
                <h2 className="section-head">Bands moving up.</h2>
              </div>
              <Link href="/signup" className="btn-ghost" style={{
                display:"inline-flex", alignItems:"center", gap:"6px",
                fontSize:"13px", fontWeight:500, color:"var(--fg)", textDecoration:"none",
                border:"1px solid var(--border)", borderRadius:"8px", padding:"9px 16px",
              }}>
                See your route <ArrowRight style={{ width:"13px", height:"13px" }} />
              </Link>
            </div>

            {/* Horizontal scroll carousel */}
            <div className="carousel-track" style={{ paddingRight:"32px" }}>
              {REVIEWS.map(({ from, to, init, color, name, country, weeks, quote }) => (
                <div key={name} className="carousel-card review-card" style={{
                  background:"var(--s1)", borderRadius:"14px", border:"1px solid var(--border)",
                  padding:"22px", boxShadow:"0 2px 12px rgba(0,0,0,0.04)",
                }}>
                  {/* Bold score improvement */}
                  <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"14px" }}>
                    <span style={{ fontSize:"15px", fontWeight:700, color:"#ccc" }}>{from}</span>
                    <span style={{ fontSize:"12px", color:"#ccc" }}>→</span>
                    <span style={{ fontSize:"22px", fontWeight:900, color:"var(--brand)", letterSpacing:"-0.02em" }}>{to}</span>
                    <div style={{ flex:1 }} />
                    <div style={{ display:"flex", gap:"2px" }}>
                      {[1,2,3,4,5].map(i => <Star key={i} style={{ width:"11px", height:"11px", color:"#f59e0b", fill:"#f59e0b" }} />)}
                    </div>
                  </div>

                  <p style={{ fontSize:"13.5px", color:"var(--muted)", lineHeight:1.7, marginBottom:"18px" }}>
                    &ldquo;{quote}&rdquo;
                  </p>

                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                      {/* Coloured avatar */}
                      <div style={{ width:"34px", height:"34px", borderRadius:"50%", background:color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"14px", fontWeight:700, color:"#fff", flexShrink:0 }}>
                        {init}
                      </div>
                      <div>
                        <p style={{ fontSize:"13px", fontWeight:600, color:"var(--fg)", margin:0 }}>{country} {name}</p>
                        <p style={{ fontSize:"10px", color:"var(--subtle)", margin:0 }}>{weeks} weeks</p>
                      </div>
                    </div>
                    {/* Verified badge */}
                    <span style={{ fontSize:"10px", fontWeight:700, color:"#16a34a", background:"#f0fdf4", border:"1px solid #bbf7d0", borderRadius:"5px", padding:"2px 8px", flexShrink:0 }}>
                      ✓ Verified
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ PRICING (Phase 9) ════════════════════════════════════════════ */}
        <section id="plan" style={{ padding:"100px 32px", background:"var(--s1)", borderTop:"1px solid var(--border)" }}>
          <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
            <div style={{ textAlign:"center", marginBottom:"56px" }}>
              <p className="label" style={{ marginBottom:"14px" }}>Pricing</p>
              <h2 className="section-head" style={{ marginBottom:"12px" }}>Simple pricing.</h2>
              <p style={{ fontSize:"17px", color:"var(--muted)" }}>Start free. Upgrade when you&apos;re ready.</p>
            </div>
            <PricingSection />
          </div>
        </section>

        {/* ══ FAQ (Phase 3) ════════════════════════════════════════════════ */}
        <section id="faq" style={{ padding:"100px 32px", background:"var(--bg)", borderTop:"1px solid var(--border)" }}>
          <div style={{ maxWidth:"760px", margin:"0 auto" }}>
            <div style={{ marginBottom:"56px" }}>
              <p className="label" style={{ marginBottom:"14px" }}>FAQ</p>
              <h2 className="section-head">Common questions.</h2>
            </div>
            <FaqAccordion />
          </div>
        </section>

        {/* ══ FINAL CTA ════════════════════════════════════════════════════ */}
        <section style={{ padding:"110px 32px", maxWidth:"1200px", margin:"0 auto", textAlign:"center" }}>
          <p className="label" style={{ marginBottom:"18px" }}>Start today</p>
          <h2 style={{ fontSize:"clamp(40px,5.5vw,80px)", fontWeight:600, letterSpacing:"-0.05em", lineHeight:1.02, color:"var(--fg)", marginBottom:"20px" }}>
            Take one mock.<br />See what costs<br />band points.
          </h2>
          <p style={{ fontSize:"17px", color:"var(--muted)", marginBottom:"36px", lineHeight:1.65 }}>
            No guesswork. Just a clear route from your baseline to your target band.<br />
            <span style={{ fontSize:"13px" }}>95% of consistent users reach their target band within 8 weeks.</span>
          </p>
          <div style={{ display:"flex", gap:"12px", justifyContent:"center", flexWrap:"wrap" }}>
            <Link href="/demo" className="btn-red" style={{
              display:"inline-flex", alignItems:"center", gap:"9px",
              fontSize:"16px", fontWeight:700, color:"#fff", textDecoration:"none",
              background:"var(--brand)", borderRadius:"11px", padding:"15px 32px",
              boxShadow:"0 6px 24px rgba(239,68,68,0.3)",
            }}>
              See Dashboard Free <ArrowRight style={{ width:"17px", height:"17px" }} />
            </Link>
            <Link href="/signup" className="btn-ghost" style={{
              display:"inline-flex", alignItems:"center",
              fontSize:"15px", fontWeight:600, color:"var(--fg)", textDecoration:"none",
              background:"transparent", border:"1px solid var(--border)",
              borderRadius:"11px", padding:"14px 26px",
            }}>
              Start Free — No Card Needed
            </Link>
          </div>
          <p style={{ marginTop:"16px", fontSize:"12px", color:"var(--subtle)" }}>
            Free tier available · Full refund if no improvement after 4 weeks
          </p>

          {/* Process strip */}
          <div style={{ display:"inline-flex", gap:"0", marginTop:"56px", border:"1px solid var(--border)", borderRadius:"10px", overflow:"hidden", background:"var(--s1)" }}>
            {["Mock","Review","Practice","Band 8.0"].map((step, i) => (
              <div key={step} style={{ padding:"12px 24px", borderRight: i<3 ? "1px solid var(--border)" : "none", display:"flex", alignItems:"center", gap:"6px" }}>
                <span style={{ fontSize:"13px", fontWeight: i===3 ? 700 : 500, color: i===3 ? "var(--brand)" : "var(--muted)" }}>{step}</span>
                {i<3 && <ArrowRight style={{ width:"11px", height:"11px", color:"#ddd" }} />}
              </div>
            ))}
          </div>
        </section>

        {/* ══ FOOTER (Phase 10) ════════════════════════════════════════════ */}
        <footer style={{ borderTop:"1px solid var(--border)", background:"var(--s1)" }}>
          <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"48px 32px 32px" }}>
            <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:"40px", marginBottom:"40px" }} className="grid-3">
              {/* Brand col */}
              <div>
                <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"14px" }}>
                  <div style={{ width:"28px", height:"28px", borderRadius:"7px", background:"var(--brand)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <GraduationCap style={{ width:"14px", height:"14px", color:"#fff" }} />
                  </div>
                  <span style={{ fontSize:"14px", fontWeight:700, color:"var(--fg)" }}>IELTS Sensei</span>
                </div>
                <p style={{ fontSize:"13px", color:"var(--muted)", lineHeight:1.65, marginBottom:"16px", maxWidth:"280px" }}>
                  AI-powered IELTS preparation. All 4 skills, real exam format, band scores in under 15 seconds.
                </p>
                {/* Social placeholders */}
                <div style={{ display:"flex", gap:"10px" }}>
                  {[
                    { label:"📸", name:"Instagram" },
                    { label:"✈️", name:"Telegram" },
                  ].map(({ label, name }) => (
                    <a key={name} href="#" style={{ width:"32px", height:"32px", borderRadius:"7px", background:"var(--s2)", border:"1px solid var(--border)", display:"flex", alignItems:"center", justifyContent:"center", textDecoration:"none", fontSize:"14px" }} title={name}>
                      {label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Product col */}
              <div>
                <p style={{ fontSize:"11px", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.12em", color:"var(--subtle)", marginBottom:"14px" }}>Product</p>
                {[["/#platform","Features"],["/#route","How it works"],["/#plan","Pricing"],["/#faq","FAQ"],["/demo","Live demo"]].map(([href, label]) => (
                  <a key={label} href={href} style={{ display:"block", fontSize:"13.5px", color:"var(--muted)", textDecoration:"none", marginBottom:"8px", transition:"color 0.12s" }}
                  >{label}</a>
                ))}
              </div>

              {/* Account col */}
              <div>
                <p style={{ fontSize:"11px", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.12em", color:"var(--subtle)", marginBottom:"14px" }}>Account</p>
                {[["/signup","Sign up free"],["/login","Sign in"],["/dashboard","Dashboard"]].map(([href, label]) => (
                  <a key={label} href={href} style={{ display:"block", fontSize:"13.5px", color:"var(--muted)", textDecoration:"none", marginBottom:"8px" }}
                  >{label}</a>
                ))}
              </div>

              {/* Legal col */}
              <div>
                <p style={{ fontSize:"11px", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.12em", color:"var(--subtle)", marginBottom:"14px" }}>Legal</p>
                {[["/privacy","Privacy policy"],["/terms","Terms of service"],["/contact","Contact us"]].map(([href, label]) => (
                  <a key={label} href={href} style={{ display:"block", fontSize:"13.5px", color:"var(--muted)", textDecoration:"none", marginBottom:"8px" }}
                  >{label}</a>
                ))}
              </div>
            </div>

            {/* Bottom bar */}
            <div style={{ borderTop:"1px solid var(--border)", paddingTop:"24px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"12px" }}>
              <p style={{ fontSize:"12px", color:"var(--subtle)" }}>
                © 2026 IELTS Sensei. Built for serious IELTS candidates.
              </p>
              <p style={{ fontSize:"11px", color:"#bbb", maxWidth:"480px", textAlign:"right", lineHeight:1.5 }}>
                IELTS Sensei is not affiliated with or endorsed by Cambridge Assessment, IDP, or the British Council.
              </p>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
