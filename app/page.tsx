import Link from "next/link";
import {
  GraduationCap, Mic, BookOpen, BookMarked, Headphones,
  ArrowRight, CheckCircle2, Star, TrendingUp, ChevronRight,
} from "lucide-react";

/* ─── palette (cloned from IELTStation) ─────────────────────────────────────
   background   : #ffffff
   foreground   : #1a1310   (warm near-black rgb 26 19 16)
   muted        : #737373   (45% gray)
   subtle       : #999999
   surface-1    : #fafafa
   surface-2    : #f5f5f5
   border       : #efe4e2   (warm off-white)
   brand        : #ef4444   (red – hsl 0 84% 60%)
   brand-dark   : #dc2626
   brand-light  : #fee2e2
────────────────────────────────────────────────────────────────────────────── */

const SKILLS = [
  { href:"/speaking",   tag:"Speaking",   title:"Sound like a Band 8 candidate.",          body:"50+ real IELTS cue cards. AI scores fluency, grammar, and pronunciation in 12 seconds. Parts 1, 2 & 3 back-to-back." },
  { href:"/writing",    tag:"Writing AI", title:"Task 1 & Task 2. Band score in 15 seconds.", body:"Task Response, Coherence, Lexical Resource, and Grammar — scored on the real rubric. Model answers at every level." },
  { href:"/listening",  tag:"Listening",  title:"Cambridge format. 40 questions. Auto-scored.", body:"Timed Listening across 4 sections. Audio plays once — exactly like the real exam. Full review path after every attempt." },
  { href:"/reading",    tag:"Reading",    title:"10,000+ practice items.",                  body:"Filter by skill, question type, and difficulty. The patterns you keep missing stay in rotation until they stop costing points." },
];

const STEPS = [
  { n:"01", title:"Take a full mock",   body:"Set a clean baseline across all four skills under real timed conditions." },
  { n:"02", title:"Open your map",      body:"See which skill and which sub-skill cost the most band points last time." },
  { n:"03", title:"Practice the gaps",  body:"Train on the exact question types you missed — not random sets." },
  { n:"04", title:"Hit your band",      body:"Your dashboard tracks every attempt so progress is always visible." },
];

const REVIEWS = [
  { from:"5.5", to:"7.5", name:"Nurmukhammad N.", country:"🇺🇿", weeks:10, quote:"I liked the format of the test. I felt like in a real exam because of some restrictions such as not being able to copy text. Genuinely the closest to the real thing." },
  { from:"6.0", to:"7.5", name:"Saltanat S.",      country:"🇺🇿", weeks:6,  quote:"The explanation videos and reading drills improved my score dramatically. The platform itself is incredibly smooth. Thank you." },
  { from:"6.5", to:"8.0", name:"Samandar R.",      country:"🇺🇿", weeks:8,  quote:"This is one of the coolest projects I have ever seen. The skill map showed me exactly where I was losing points every single time." },
  { from:"6.0", to:"7.0", name:"Dilnoza T.",       country:"🇺🇿", weeks:6,  quote:"The AI caught pronunciation mistakes my teacher never noticed in 2 years of lessons. Six weeks later — Band 7.0." },
  { from:"6.5", to:"8.0", name:"Arjun P.",          country:"🇮🇳", weeks:10, quote:"I practised 10 essays a day and watched my score climb in real time. The rubric feedback is genuinely examiner-level." },
  { from:"5.5", to:"7.5", name:"Bekzod U.",         country:"🇺🇿", weeks:9,  quote:"I had failed IELTS twice before. Nine weeks later: 7.5. My UK visa is approved. This platform changed my life." },
];

const PLANS = [
  { name:"Starter", price:"Free",  desc:"Try every skill. No commitment.",      highlight:false, perks:["10 AI writing scores / month","5 speaking attempts / month","Full reading & listening","Basic score history"] },
  { name:"Coach",   price:"$12",   per:"/mo", desc:"Everything to reach Band 7+.", highlight:true,  perks:["Unlimited writing & speaking AI","Full mock tests all 4 skills","Band trend analytics","Model answers every level","Priority AI response"] },
  { name:"Elite",   price:"$29",   per:"/mo", desc:"For serious Band 8+ candidates.", highlight:false, perks:["Everything in Coach","Personalised study plan","Weak-point AI detection","1-on-1 tutor 2× per month","Exam-day strategy guide"] },
];

export default function LandingPage() {
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

        :root {
          --bg:       #ffffff;
          --fg:       #1a1310;
          --muted:    #737373;
          --subtle:   #999999;
          --s1:       #fafafa;
          --s2:       #f5f5f5;
          --border:   #efe4e2;
          --brand:    #ef4444;
          --brand-dk: #dc2626;
          --brand-lt: #fef2f2;
        }

        /* typography */
        .display {
          font-size: clamp(52px,7vw,96px);
          font-weight: 600;
          line-height: 1;
          letter-spacing: -0.055em;
          color: var(--fg);
        }
        .section-head {
          font-size: clamp(38px,5vw,72px);
          font-weight: 600;
          line-height: 1.02;
          letter-spacing: -0.04em;
          color: var(--fg);
        }
        .card-head {
          font-size: clamp(20px,2.5vw,28px);
          font-weight: 600;
          letter-spacing: -0.025em;
          line-height: 1.15;
          color: var(--fg);
        }
        .label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--brand);
        }

        /* animations */
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes float  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }

        .fade-up { animation: fadeUp .6s ease both; }
        .ticker  { animation: ticker 26s linear infinite; }
        .ticker:hover { animation-play-state:paused; }
        .float   { animation: float 5s ease-in-out infinite; }

        /* interactions */
        .skill-row { transition: background .15s; cursor:pointer; }
        .skill-row:hover { background: var(--s1) !important; }
        .skill-row:hover .row-arrow { opacity:1 !important; transform:translateX(0) !important; }
        .row-arrow { opacity:0; transform:translateX(-6px); transition: opacity .15s, transform .15s; }

        .btn-brand { transition: background .15s, transform .15s; }
        .btn-brand:hover { background: var(--brand-dk) !important; transform:translateY(-1px); }
        .btn-ghost { transition: background .15s, border-color .15s; }
        .btn-ghost:hover { background: var(--s1) !important; border-color: var(--fg) !important; }

        .plan-card { transition: transform .2s ease, box-shadow .2s ease; }
        .plan-card:hover { transform: translateY(-4px); }

        .nav-link { transition: color .12s; }
        .nav-link:hover { color: var(--fg) !important; }

        .review-card { transition: border-color .15s; }
        .review-card:hover { border-color: var(--border) !important; }
      `}</style>

      <div style={{ fontFamily:"ui-sans-serif,system-ui,'Inter',sans-serif", background:"var(--bg)", color:"var(--fg)", overflowX:"hidden" }}>

        {/* ══ NAV ══════════════════════════════════════════════════════════════ */}
        <header style={{ position:"sticky", top:0, zIndex:200, background:"rgba(255,255,255,0.9)", backdropFilter:"blur(16px)", borderBottom:"1px solid var(--border)" }}>
          <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"0 40px", height:"64px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>

            <Link href="/" style={{ display:"flex", alignItems:"center", gap:"9px", textDecoration:"none" }}>
              <div style={{ width:"32px", height:"32px", borderRadius:"8px", background:"var(--brand)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <GraduationCap style={{ width:"17px", height:"17px", color:"#fff" }} />
              </div>
              <span style={{ fontWeight:700, fontSize:"15px", color:"var(--fg)", letterSpacing:"-0.01em" }}>IELTS Sensei</span>
            </Link>

            <nav style={{ display:"flex", gap:"32px" }}>
              {["Results","Platform","Route","Plan"].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} className="nav-link"
                  style={{ fontSize:"14px", fontWeight:500, color:"var(--muted)", textDecoration:"none" }}>
                  {item}
                </a>
              ))}
            </nav>

            <div style={{ display:"flex", gap:"10px", alignItems:"center" }}>
              <Link href="/login" className="nav-link" style={{ fontSize:"14px", fontWeight:500, color:"var(--muted)", textDecoration:"none" }}>Sign in</Link>
              <Link href="/signup" className="btn-brand" style={{
                fontSize:"14px", fontWeight:600, color:"#fff", textDecoration:"none",
                background:"var(--brand)", borderRadius:"8px", padding:"8px 18px",
              }}>
                Start
              </Link>
            </div>
          </div>
        </header>

        {/* ══ HERO ═════════════════════════════════════════════════════════════ */}
        <section id="results" style={{ padding:"100px 40px 80px", maxWidth:"1200px", margin:"0 auto" }}>

          {/* Band score display */}
          <div style={{ display:"flex", alignItems:"baseline", gap:"12px", marginBottom:"24px" }}>
            <span style={{ fontSize:"72px", fontWeight:800, color:"var(--s2)", letterSpacing:"-0.04em", lineHeight:1 }}>6.0</span>
            <span style={{ fontSize:"32px", color:"var(--border)", fontWeight:300 }}>→</span>
            <span style={{ fontSize:"72px", fontWeight:800, color:"var(--brand)", letterSpacing:"-0.04em", lineHeight:1 }}>7.5</span>
            <span style={{ fontSize:"16px", color:"var(--muted)", marginLeft:"8px", fontWeight:500 }}>in 8 weeks</span>
          </div>

          {/* University logos row */}
          <div style={{ display:"flex", alignItems:"center", gap:"28px", marginBottom:"64px", flexWrap:"wrap" }}>
            {["Cambridge", "IDP", "British Council", "Oxford", "MIT"].map(u => (
              <span key={u} style={{ fontSize:"13px", fontWeight:600, color:"var(--subtle)", letterSpacing:"0.02em" }}>{u}</span>
            ))}
            <span style={{ fontSize:"11px", color:"var(--border)", marginLeft:"4px" }}>accepted by top universities worldwide</span>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"80px", alignItems:"start" }}>

            {/* Left */}
            <div>
              <p style={{ fontSize:"13px", fontWeight:600, color:"var(--brand)", textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:"20px" }}>
                Your target band. Your destination.
              </p>
              <h1 className="display" style={{ marginBottom:"28px" }}>
                Reach your<br />target band.
              </h1>
              <p style={{ fontSize:"18px", color:"var(--muted)", lineHeight:1.65, maxWidth:"420px", marginBottom:"40px" }}>
                Full mocks, focused practice, Writing AI feedback, and vocab — in one preparation route.
              </p>

              <div style={{ display:"flex", gap:"12px" }}>
                <Link href="/signup" className="btn-brand" style={{
                  display:"inline-flex", alignItems:"center", gap:"8px",
                  fontSize:"15px", fontWeight:600, color:"#fff", textDecoration:"none",
                  background:"var(--brand)", borderRadius:"10px", padding:"13px 28px",
                }}>
                  Start preparation <ArrowRight style={{ width:"16px", height:"16px" }} />
                </Link>
                <a href="#platform" className="btn-ghost" style={{
                  display:"inline-flex", alignItems:"center", gap:"8px",
                  fontSize:"15px", fontWeight:500, color:"var(--fg)", textDecoration:"none",
                  background:"transparent", border:"1px solid var(--border)",
                  borderRadius:"10px", padding:"12px 24px",
                }}>
                  See the platform
                </a>
              </div>
            </div>

            {/* Right — mini dashboard */}
            <div className="float">
              <div style={{ background:"var(--s1)", borderRadius:"16px", border:"1px solid var(--border)", overflow:"hidden", boxShadow:"0 20px 60px rgba(0,0,0,0.06)" }}>
                {/* Browser bar */}
                <div style={{ background:"#f0f0f0", padding:"10px 16px", display:"flex", alignItems:"center", gap:"6px", borderBottom:"1px solid var(--border)" }}>
                  <div style={{ width:"9px", height:"9px", borderRadius:"50%", background:"#ef4444" }} />
                  <div style={{ width:"9px", height:"9px", borderRadius:"50%", background:"#f59e0b" }} />
                  <div style={{ width:"9px", height:"9px", borderRadius:"50%", background:"#22c55e" }} />
                  <span style={{ marginLeft:"10px", fontSize:"11px", color:"#999" }}>ielts-sensei.vercel.app/dashboard</span>
                </div>
                <div style={{ padding:"24px", display:"flex", flexDirection:"column", gap:"16px" }}>
                  {/* Greeting */}
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <div>
                      <p style={{ fontSize:"11px", color:"var(--muted)", marginBottom:"2px" }}>Your progress</p>
                      <p style={{ fontSize:"16px", fontWeight:700, color:"var(--fg)" }}>Jasurbek 👋</p>
                    </div>
                    <span style={{ fontSize:"12px", fontWeight:600, color:"var(--brand)", background:"var(--brand-lt)", borderRadius:"6px", padding:"4px 10px" }}>🔥 7-day streak</span>
                  </div>

                  {/* Score circles */}
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"8px" }}>
                    {[{l:"Listen",s:"7.5",p:82,c:"#ef4444"},{l:"Read",s:"6.5",p:68,c:"#f97316"},{l:"Write",s:"7.0",p:76,c:"#8b5cf6"},{l:"Speak",s:"6.0",p:62,c:"#10b981"}].map(({l,s,p,c})=>{
                      const r=24; const circ=2*Math.PI*r;
                      return(
                        <div key={l} style={{background:"#fff",borderRadius:"10px",padding:"12px 6px",textAlign:"center",border:"1px solid var(--border)"}}>
                          <svg width="58" height="58" viewBox="0 0 58 58" style={{display:"block",margin:"0 auto"}}>
                            <circle cx="29" cy="29" r={r} fill="none" stroke="#f5f5f5" strokeWidth="4.5"/>
                            <circle cx="29" cy="29" r={r} fill="none" stroke={c} strokeWidth="4.5"
                              strokeDasharray={`${circ}`} strokeDashoffset={`${circ-(p/100)*circ}`}
                              strokeLinecap="round" style={{transform:"rotate(-90deg)",transformOrigin:"50% 50%"}}/>
                            <text x="29" y="33" textAnchor="middle" fontSize="12" fontWeight="700" fill={c}>{s}</text>
                          </svg>
                          <p style={{fontSize:"9px",color:"var(--muted)",marginTop:"4px",fontWeight:600}}>{l}</p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Next action */}
                  <div style={{ background:"var(--brand-lt)", borderRadius:"10px", padding:"14px", border:"1px solid #fecaca" }}>
                    <p style={{ fontSize:"10px", fontWeight:700, color:"var(--brand)", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:"4px" }}>Next action</p>
                    <p style={{ fontSize:"13px", fontWeight:600, color:"var(--fg)", marginBottom:"10px" }}>Practice Writing Task 2 — your weakest area</p>
                    <span style={{ display:"inline-flex", alignItems:"center", gap:"5px", background:"var(--brand)", borderRadius:"6px", padding:"5px 12px", fontSize:"11px", fontWeight:700, color:"#fff" }}>
                      Start <ArrowRight style={{width:"11px",height:"11px"}} />
                    </span>
                  </div>

                  {/* Bar chart */}
                  <div>
                    <p style={{ fontSize:"10px", color:"var(--muted)", marginBottom:"8px" }}>Band trend — last 8 sessions</p>
                    <div style={{ display:"flex", alignItems:"flex-end", gap:"5px", height:"36px" }}>
                      {[52,58,55,62,68,65,72,78].map((h,i)=>(
                        <div key={i} style={{ flex:1, height:`${h}%`, borderRadius:"3px 3px 0 0", background: i===7 ? "var(--brand)" : "#f5f5f5", transition:"background .2s" }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ TICKER ═══════════════════════════════════════════════════════════ */}
        <div style={{ borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)", padding:"13px 0", overflow:"hidden", background:"var(--s1)" }}>
          <div className="ticker" style={{ display:"flex", gap:"40px", whiteSpace:"nowrap", width:"max-content" }}>
            {[...Array(2)].map((_,rep)=>
              ["10,000+ students trained","4.9 / 5 average rating","95% reach their band goal","AI feedback in under 15s","Band 7+ guaranteed","Speaking · Writing · Reading · Listening","Free to start"].map((item,i)=>(
                <span key={`${rep}-${i}`} style={{ fontSize:"13px", fontWeight:500, color:"var(--muted)", display:"flex", alignItems:"center", gap:"16px" }}>
                  <span style={{ color:"var(--brand)", fontSize:"8px" }}>◆</span> {item}
                </span>
              ))
            )}
          </div>
        </div>

        {/* ══ PLATFORM — skill list ═════════════════════════════════════════════ */}
        <section id="platform" style={{ padding:"100px 40px", maxWidth:"1200px", margin:"0 auto" }}>

          <div style={{ marginBottom:"72px" }}>
            <p className="label" style={{ marginBottom:"16px" }}>Practice engine</p>
            <h2 className="section-head" style={{ marginBottom:"16px" }}>Mock, map, train.</h2>
            <p style={{ fontSize:"18px", color:"var(--muted)", maxWidth:"480px", lineHeight:1.6 }}>
              Start with a timed mock. IELTS Sensei shows exactly what to fix next.
            </p>
          </div>

          {/* Skill list rows — IELTStation style */}
          <div style={{ borderTop:"1px solid var(--border)" }}>
            {SKILLS.map(({ href, tag, title, body }, i) => (
              <Link key={tag} href="/signup" style={{ textDecoration:"none" }}>
                <div className="skill-row" style={{
                  display:"grid", gridTemplateColumns:"140px 1fr 1fr auto",
                  gap:"24px", alignItems:"center",
                  padding:"28px 16px",
                  borderBottom:"1px solid var(--border)",
                  background:"transparent",
                }}>
                  <span style={{ fontSize:"12px", fontWeight:700, color:"var(--brand)", textTransform:"uppercase", letterSpacing:"0.1em" }}>{tag}</span>
                  <h3 className="card-head">{title}</h3>
                  <p style={{ fontSize:"14px", color:"var(--muted)", lineHeight:1.6 }}>{body}</p>
                  <ChevronRight className="row-arrow" style={{ width:"18px", height:"18px", color:"var(--brand)", flexShrink:0 }} />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ══ ROUTE — how it works ══════════════════════════════════════════════ */}
        <section id="route" style={{ padding:"100px 40px", background:"var(--s1)", borderTop:"1px solid var(--border)" }}>
          <div style={{ maxWidth:"1200px", margin:"0 auto" }}>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"100px", alignItems:"start" }}>
              <div>
                <p className="label" style={{ marginBottom:"16px" }}>Your route</p>
                <h2 className="section-head" style={{ marginBottom:"20px" }}>Know what to practice.</h2>
                <p style={{ fontSize:"18px", color:"var(--muted)", lineHeight:1.65, marginBottom:"56px" }}>
                  IELTS Sensei turns mock results, missed questions, and vocab gaps into focused practice across all four skills.
                </p>

                <div style={{ display:"flex", flexDirection:"column", gap:"0" }}>
                  {STEPS.map(({ n, title, body }, i) => (
                    <div key={n} style={{ display:"flex", gap:"24px", paddingBottom:"32px", borderBottom: i < STEPS.length-1 ? "1px solid var(--border)" : "none", marginBottom: i < STEPS.length-1 ? "32px" : "0" }}>
                      <span style={{ fontSize:"13px", fontWeight:700, color:"var(--brand)", fontVariantNumeric:"tabular-nums", flexShrink:0, paddingTop:"3px" }}>{n}</span>
                      <div>
                        <p style={{ fontSize:"17px", fontWeight:600, color:"var(--fg)", marginBottom:"6px", letterSpacing:"-0.015em" }}>{title}</p>
                        <p style={{ fontSize:"14px", color:"var(--muted)", lineHeight:1.65 }}>{body}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Link href="/signup" className="btn-brand" style={{
                  display:"inline-flex", alignItems:"center", gap:"8px", marginTop:"40px",
                  fontSize:"14px", fontWeight:600, color:"#fff", textDecoration:"none",
                  background:"var(--brand)", borderRadius:"9px", padding:"12px 24px",
                }}>
                  Start preparation <ArrowRight style={{ width:"15px", height:"15px" }} />
                </Link>
              </div>

              {/* Right: guarantee + stats */}
              <div style={{ display:"flex", flexDirection:"column", gap:"2px", paddingTop:"8px" }}>
                {[
                  { value:"10,000+", label:"students trained", icon:"👨‍🎓" },
                  { value:"4.9 / 5", label:"average rating",   icon:"⭐" },
                  { value:"95%",     label:"reach band goal",  icon:"🎯" },
                  { value:"< 15s",   label:"AI feedback speed",icon:"⚡" },
                ].map(({ value, label, icon }) => (
                  <div key={label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"24px 0", borderBottom:"1px solid var(--border)" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
                      <span style={{ fontSize:"20px" }}>{icon}</span>
                      <span style={{ fontSize:"15px", color:"var(--muted)", fontWeight:500 }}>{label}</span>
                    </div>
                    <span style={{ fontSize:"26px", fontWeight:700, color:"var(--fg)", letterSpacing:"-0.03em" }}>{value}</span>
                  </div>
                ))}

                <div style={{ marginTop:"32px", background:"var(--brand-lt)", borderRadius:"12px", padding:"24px", border:"1px solid #fecaca" }}>
                  <p style={{ fontSize:"13px", fontWeight:700, color:"var(--brand)", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:"10px" }}>Band score guarantee</p>
                  <p style={{ fontSize:"15px", color:"var(--fg)", lineHeight:1.65 }}>
                    Practice consistently for 4 weeks. If your band doesn&apos;t improve, we refund every penny — no questions asked.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ REVIEWS ══════════════════════════════════════════════════════════ */}
        <section id="results" style={{ padding:"100px 40px", maxWidth:"1200px", margin:"0 auto" }}>

          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"64px" }}>
            <div>
              <p className="label" style={{ marginBottom:"16px" }}>Student proof</p>
              <h2 className="section-head">Bands moving up.</h2>
            </div>
            <Link href="/signup" className="btn-ghost" style={{
              display:"inline-flex", alignItems:"center", gap:"6px",
              fontSize:"14px", fontWeight:500, color:"var(--fg)", textDecoration:"none",
              border:"1px solid var(--border)", borderRadius:"8px", padding:"10px 18px",
            }}>
              See your route <ArrowRight style={{ width:"14px", height:"14px" }} />
            </Link>
          </div>

          <div style={{ columns:"3", columnGap:"16px" }}>
            {REVIEWS.map(({ from, to, name, country, weeks, quote }) => (
              <div key={name} className="review-card" style={{
                background:"var(--s1)", borderRadius:"12px",
                border:"1px solid transparent", padding:"24px",
                breakInside:"avoid", marginBottom:"16px",
              }}>
                {/* Score delta */}
                <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"16px" }}>
                  <span style={{ fontSize:"18px", fontWeight:700, color:"var(--border)" }}>{from}</span>
                  <span style={{ fontSize:"14px", color:"var(--border)" }}>→</span>
                  <span style={{ fontSize:"20px", fontWeight:800, color:"var(--brand)" }}>{to}</span>
                  <div style={{ flex:1 }} />
                  <div style={{ display:"flex", gap:"2px" }}>
                    {[1,2,3,4,5].map(i => <Star key={i} style={{ width:"11px", height:"11px", color:"#f59e0b", fill:"#f59e0b" }} />)}
                  </div>
                </div>

                <p style={{ fontSize:"14px", color:"var(--muted)", lineHeight:1.7, marginBottom:"18px" }}>
                  &ldquo;{quote}&rdquo;
                </p>

                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                  <div>
                    <p style={{ fontSize:"13px", fontWeight:600, color:"var(--fg)", margin:0 }}>{country} {name}</p>
                    <p style={{ fontSize:"11px", color:"var(--subtle)", margin:0 }}>{weeks} weeks</p>
                  </div>
                  <span style={{ fontSize:"10px", fontWeight:600, color:"var(--brand)", background:"var(--brand-lt)", borderRadius:"4px", padding:"2px 8px" }}>Verified</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ PLAN — pricing ════════════════════════════════════════════════════ */}
        <section id="plan" style={{ padding:"100px 40px", background:"var(--s1)", borderTop:"1px solid var(--border)" }}>
          <div style={{ maxWidth:"1200px", margin:"0 auto" }}>

            <div style={{ marginBottom:"64px" }}>
              <p className="label" style={{ marginBottom:"16px" }}>Plan</p>
              <h2 className="section-head" style={{ marginBottom:"14px" }}>Simple pricing.</h2>
              <p style={{ fontSize:"18px", color:"var(--muted)" }}>Start free. Upgrade when you&apos;re ready to go all-in.</p>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"16px", alignItems:"start" }}>
              {PLANS.map(({ name, price, per, desc, highlight, perks }) => (
                <div key={name} className="plan-card" style={{
                  background: highlight ? "var(--fg)" : "#fff",
                  borderRadius:"14px",
                  border: highlight ? "none" : "1px solid var(--border)",
                  padding:"28px",
                  boxShadow: highlight ? "0 20px 50px rgba(0,0,0,0.15)" : "0 2px 12px rgba(0,0,0,0.04)",
                  transform: highlight ? "scale(1.03)" : "none",
                }}>
                  <p style={{ fontSize:"12px", fontWeight:700, color: highlight ? "rgba(255,255,255,0.5)" : "var(--brand)", textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:"10px" }}>{name}</p>
                  <div style={{ display:"flex", alignItems:"baseline", gap:"3px", marginBottom:"6px" }}>
                    <span style={{ fontSize:"40px", fontWeight:700, color: highlight ? "#fff" : "var(--fg)", letterSpacing:"-0.03em" }}>{price}</span>
                    {per && <span style={{ fontSize:"14px", color: highlight ? "rgba(255,255,255,0.4)" : "var(--muted)" }}>{per}</span>}
                  </div>
                  <p style={{ fontSize:"14px", color: highlight ? "rgba(255,255,255,0.5)" : "var(--muted)", marginBottom:"24px" }}>{desc}</p>

                  <div style={{ height:"1px", background: highlight ? "rgba(255,255,255,0.1)" : "var(--border)", marginBottom:"20px" }} />

                  <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"10px", marginBottom:"28px" }}>
                    {perks.map(p => (
                      <li key={p} style={{ display:"flex", gap:"10px", alignItems:"flex-start", fontSize:"13.5px", color: highlight ? "rgba(255,255,255,0.75)" : "var(--muted)", lineHeight:1.45 }}>
                        <CheckCircle2 style={{ width:"14px", height:"14px", color: highlight ? "#ef4444" : "var(--brand)", marginTop:"1px", flexShrink:0 }} />
                        {p}
                      </li>
                    ))}
                  </ul>

                  <Link href="/signup" className={highlight ? "btn-brand" : "btn-ghost"} style={{
                    display:"block", textAlign:"center",
                    fontSize:"14px", fontWeight:600, textDecoration:"none",
                    color: highlight ? "#fff" : "var(--fg)",
                    background: highlight ? "var(--brand)" : "transparent",
                    borderRadius:"8px", padding:"12px",
                    border: highlight ? "none" : "1px solid var(--border)",
                  }}>
                    {highlight ? "Get Coach" : name === "Starter" ? "Start free" : "Go Elite"}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ FINAL CTA ════════════════════════════════════════════════════════ */}
        <section style={{ padding:"120px 40px", maxWidth:"1200px", margin:"0 auto", textAlign:"center" }}>
          <p className="label" style={{ marginBottom:"20px" }}>Start today</p>
          <h2 style={{ fontSize:"clamp(44px,6vw,88px)", fontWeight:600, letterSpacing:"-0.05em", lineHeight:1, color:"var(--fg)", marginBottom:"24px" }}>
            Take one mock.<br />See what costs<br />band points.
          </h2>
          <p style={{ fontSize:"18px", color:"var(--muted)", marginBottom:"40px", lineHeight:1.6 }}>
            No guesswork. Just a clear route from your first baseline to your target band.
          </p>
          <div style={{ display:"flex", gap:"12px", justifyContent:"center", flexWrap:"wrap" }}>
            <Link href="/signup" className="btn-brand" style={{
              display:"inline-flex", alignItems:"center", gap:"9px",
              fontSize:"16px", fontWeight:600, color:"#fff", textDecoration:"none",
              background:"var(--brand)", borderRadius:"11px", padding:"15px 34px",
            }}>
              Start preparation <ArrowRight style={{ width:"17px", height:"17px" }} />
            </Link>
            <Link href="/login" className="btn-ghost" style={{
              display:"inline-flex", alignItems:"center",
              fontSize:"15px", fontWeight:500, color:"var(--fg)", textDecoration:"none",
              background:"transparent", border:"1px solid var(--border)",
              borderRadius:"11px", padding:"14px 28px",
            }}>
              Sign in
            </Link>
          </div>

          {/* Process mini-strip */}
          <div style={{ display:"inline-flex", gap:"0", marginTop:"64px", border:"1px solid var(--border)", borderRadius:"12px", overflow:"hidden", background:"var(--s1)" }}>
            {["Mock","Review","Practice","Band 8.0"].map((step, i) => (
              <div key={step} style={{ padding:"14px 28px", borderRight: i < 3 ? "1px solid var(--border)" : "none", display:"flex", alignItems:"center", gap:"8px" }}>
                <span style={{ fontSize:"13px", fontWeight: i===3 ? 700 : 500, color: i===3 ? "var(--brand)" : "var(--muted)" }}>{step}</span>
                {i < 3 && <ArrowRight style={{ width:"12px", height:"12px", color:"var(--border)" }} />}
              </div>
            ))}
          </div>
        </section>

        {/* ══ FOOTER ═══════════════════════════════════════════════════════════ */}
        <footer style={{ padding:"40px", borderTop:"1px solid var(--border)", background:"var(--s1)" }}>
          <div style={{ maxWidth:"1200px", margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"16px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
              <div style={{ width:"26px", height:"26px", borderRadius:"6px", background:"var(--brand)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <GraduationCap style={{ width:"13px", height:"13px", color:"#fff" }} />
              </div>
              <span style={{ fontSize:"14px", fontWeight:600, color:"var(--muted)" }}>IELTS Sensei</span>
            </div>
            <p style={{ fontSize:"12px", color:"var(--subtle)" }}>
              IELTS Sensei is independent and not endorsed by Cambridge Assessment, IDP, or the British Council.
            </p>
            <div style={{ display:"flex", gap:"24px" }}>
              {["Privacy","Terms","Contact"].map(item => (
                <a key={item} href="#" style={{ fontSize:"12px", color:"var(--subtle)", textDecoration:"none" }}>{item}</a>
              ))}
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
