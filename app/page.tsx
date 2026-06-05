import Link from "next/link";
import {
  GraduationCap, Mic, BookOpen, BookMarked, Headphones,
  Zap, CheckCircle2, Star, ArrowRight, Play,
  TrendingUp, Clock, Shield, Brain, BarChart3, PenLine,
  ChevronRight, Sparkles,
} from "lucide-react";

// ── Design tokens ─────────────────────────────────────────────────────────────
const G   = "#16a34a";   // primary green
const GD  = "#14532d";   // dark forest
const GH  = "#052e16";   // hero bg — deep forest
const GL  = "#4ade80";   // light green — accent on dark
const GS  = "#f0fdf4";   // sage — section bg

// ── Testimonials ──────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  { name:"Dilnoza T.", flag:"🇺🇿", band:"7.5", prev:"6.0", weeks:6,  text:"I went from 6.0 to 7.5 in just 6 weeks. The speaking feedback caught pronunciation mistakes my teacher never noticed in 2 years." },
  { name:"Arjun P.",   flag:"🇮🇳", band:"8.0", prev:"6.5", weeks:10, text:"The instant band score after every essay changed everything. I practiced 10 essays a day and watched my score climb in real time." },
  { name:"Yuna K.",    flag:"🇰🇷", band:"7.0", prev:"5.5", weeks:8,  text:"The full mock test is exactly like the real exam. I walked in on test day completely calm. Sensei prepared me for everything." },
  { name:"Fatima A.",  flag:"🇸🇦", band:"8.5", prev:"7.0", weeks:12, text:"The model answers at every band level showed me exactly what examiners want. I finally understood what 'coherence' actually means." },
  { name:"Bekzod U.",  flag:"🇺🇿", band:"7.5", prev:"5.5", weeks:9,  text:"I had failed IELTS twice before Sensei. In 9 weeks my writing went from 5.5 to 7.5. My UK visa is approved. Life changed." },
  { name:"Priya S.",   flag:"🇮🇳", band:"8.0", prev:"7.0", weeks:7,  text:"Worth every penny. The grammar correction with explanations taught me WHY I was wrong, not just what. Game changer for task 2." },
];

// ── Features ──────────────────────────────────────────────────────────────────
const FEATURES = [
  { icon: Mic,       label:"Speaking", title:"All 3 Parts. Real Cue Cards.", color: G,       bg:"#f0fdf4",
    bullets:["50+ real IELTS Part 2 cue cards","3-second countdown before recording starts","Full mock: Parts 1, 2 & 3 back-to-back","Pronunciation issues with exact word-level fixes"] },
  { icon: BookOpen,  label:"Writing",  title:"Task 1 & Task 2. Scored in 15 Seconds.", color:"#7c3aed", bg:"#faf5ff",
    bullets:["Academic & General Training Task 1","Opinion, discussion & problem essays","Grammar corrections with clear explanations","Band 5 → 8+ model answer for every essay you submit"] },
  { icon: BookMarked,label:"Reading",  title:"40 Questions. 60 Minutes. Real Timing.", color:"#0284c7",  bg:"#eff6ff",
    bullets:["True/False/Not Given, MCQ, matching headings","Timed exam mode with auto-submit","Full explanations for every correct answer","Academic & General Training passages"] },
  { icon: Headphones,label:"Listening",title:"Cambridge Paper Format. Auto-scoring.", color:"#db2777",  bg:"#fdf2f8",
    bullets:["Notes, form & sentence completion","Multiple-choice with single & multi answer","Real exam timer — audio plays once only","Part 1–4 with question navigator"] },
];

export default function LandingPage() {
  return (
    <div style={{ fontFamily:"'Inter',sans-serif", background:"#ffffff", color:"#09090b", overflowX:"hidden" }}>

      {/* ══════════════════════════════════════════════════════════════════
          NAV — minimal glass
      ══════════════════════════════════════════════════════════════════ */}
      <header style={{
        position:"sticky", top:0, zIndex:100,
        background:"rgba(255,255,255,0.85)", backdropFilter:"blur(12px)",
        borderBottom:"1px solid #f1f5f9",
      }}>
        <div style={{ maxWidth:"1140px", margin:"0 auto", padding:"0 28px", height:"64px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>

          <Link href="/" style={{ display:"flex", alignItems:"center", gap:"9px", textDecoration:"none" }}>
            <div style={{ width:"36px", height:"36px", borderRadius:"10px", background:GD, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <GraduationCap style={{ width:"20px", height:"20px", color:"#fff" }} />
            </div>
            <div>
              <p style={{ fontWeight:800, fontSize:"15px", color:"#09090b", lineHeight:1 }}>IELTS Sensei</p>
              <p style={{ fontSize:"9px", fontWeight:700, color:G, textTransform:"uppercase", letterSpacing:"1.5px", marginTop:"2px" }}>AI Exam Coach</p>
            </div>
          </Link>

          <nav style={{ display:"flex", gap:"32px" }}>
            {["Features","How It Works","Reviews","Pricing"].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(/ /g,"-")}`}
                style={{ fontSize:"14px", fontWeight:500, color:"#52525b", textDecoration:"none" }}>
                {item}
              </a>
            ))}
          </nav>

          <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
            <Link href="/login" style={{ fontSize:"14px", fontWeight:500, color:"#52525b", textDecoration:"none" }}>Sign in</Link>
            <Link href="/signup" style={{
              fontSize:"14px", fontWeight:700, color:"#fff", textDecoration:"none",
              background:G, borderRadius:"22px", padding:"9px 22px",
              boxShadow:`0 4px 14px ${G}55`,
            }}>
              Start Free →
            </Link>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════════════════
          HERO — dark, dramatic, full impact
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{
        background:`linear-gradient(160deg, ${GH} 0%, #064e3b 50%, #065f46 100%)`,
        padding:"96px 28px 80px", position:"relative", overflow:"hidden",
      }}>
        {/* Animated gradient blob */}
        <div style={{
          position:"absolute", top:"-120px", right:"-120px",
          width:"600px", height:"600px", borderRadius:"50%",
          background:`radial-gradient(circle, ${G}22 0%, transparent 70%)`,
          pointerEvents:"none",
        }} />
        <div style={{
          position:"absolute", bottom:"-80px", left:"-80px",
          width:"400px", height:"400px", borderRadius:"50%",
          background:`radial-gradient(circle, #4ade8018 0%, transparent 70%)`,
          pointerEvents:"none",
        }} />

        {/* Dot grid */}
        <div style={{
          position:"absolute", inset:0, pointerEvents:"none",
          backgroundImage:`radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)`,
          backgroundSize:"32px 32px",
        }} />

        <div style={{ maxWidth:"1140px", margin:"0 auto", position:"relative", zIndex:1 }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"64px", alignItems:"center" }}>

            {/* Left */}
            <div className="fade-in-up">
              {/* Pill badge */}
              <div style={{
                display:"inline-flex", alignItems:"center", gap:"8px",
                background:"rgba(255,255,255,0.08)", borderRadius:"24px",
                border:"1px solid rgba(255,255,255,0.12)",
                padding:"6px 14px 6px 6px", marginBottom:"28px",
              }}>
                <div style={{ background:GL, borderRadius:"50%", width:"22px", height:"22px", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <Sparkles style={{ width:"12px", height:"12px", color:"#052e16" }} />
                </div>
                <span style={{ fontSize:"13px", fontWeight:600, color:"rgba(255,255,255,0.85)" }}>AI Results in Under 15 Seconds</span>
              </div>

              <h1 style={{ fontSize:"64px", fontWeight:900, lineHeight:1.0, color:"#ffffff", marginBottom:"0px", letterSpacing:"-2px" }}>
                Master Your
              </h1>
              <h1 className="shimmer-text" style={{ fontSize:"64px", fontWeight:900, lineHeight:1.0, letterSpacing:"-2px", marginBottom:"24px" }}>
                IELTS Band.
              </h1>

              <p style={{ fontSize:"17px", color:"rgba(255,255,255,0.6)", lineHeight:1.7, marginBottom:"36px", maxWidth:"440px" }}>
                The AI that scores your speaking and writing <strong style={{ color:"rgba(255,255,255,0.9)" }}>exactly like a real Cambridge examiner</strong> — with feedback in 15 seconds, not 13 days.
              </p>

              <div style={{ display:"flex", gap:"12px", flexWrap:"wrap", marginBottom:"40px" }}>
                <Link href="/signup" style={{
                  display:"inline-flex", alignItems:"center", gap:"8px",
                  background:GL, color:GH,
                  borderRadius:"10px", padding:"14px 28px",
                  fontSize:"15px", fontWeight:800, textDecoration:"none",
                  boxShadow:`0 8px 28px ${GL}44`,
                }}>
                  Start Practising Free <ArrowRight style={{ width:"17px", height:"17px" }} />
                </Link>
                <a href="#how-it-works" style={{
                  display:"inline-flex", alignItems:"center", gap:"8px",
                  background:"rgba(255,255,255,0.08)",
                  border:"1px solid rgba(255,255,255,0.15)",
                  color:"rgba(255,255,255,0.85)",
                  borderRadius:"10px", padding:"14px 24px",
                  fontSize:"15px", fontWeight:600, textDecoration:"none",
                }}>
                  <Play style={{ width:"16px", height:"16px" }} /> See how it works
                </a>
              </div>

              {/* Trust signals */}
              <div style={{ display:"flex", alignItems:"center", gap:"20px", flexWrap:"wrap" }}>
                {[
                  { icon:"✓", text:"No credit card" },
                  { icon:"✓", text:"Free plan forever" },
                  { icon:"✓", text:"2,400+ students" },
                ].map(s => (
                  <div key={s.text} style={{ display:"flex", alignItems:"center", gap:"6px" }}>
                    <span style={{ color:GL, fontSize:"13px", fontWeight:700 }}>{s.icon}</span>
                    <span style={{ fontSize:"13px", color:"rgba(255,255,255,0.5)" }}>{s.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — floating score cards */}
            <div style={{ position:"relative", height:"440px" }}>

              {/* Main score card */}
              <div className="float-a" style={{
                position:"absolute", top:"40px", left:"50%", transform:"translateX(-50%)",
                background:"#fff", borderRadius:"20px", padding:"24px 28px",
                boxShadow:"0 24px 64px rgba(0,0,0,0.35)", width:"280px",
              }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"16px" }}>
                  <div>
                    <p style={{ fontSize:"11px", fontWeight:700, color:"#94a3b8", textTransform:"uppercase", letterSpacing:"1px" }}>Overall Band</p>
                    <p style={{ fontSize:"48px", fontWeight:900, color:GD, lineHeight:1, marginTop:"2px" }}>7.5</p>
                  </div>
                  <div style={{ width:"64px", height:"64px", borderRadius:"50%", border:`4px solid ${G}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <TrendingUp style={{ width:"26px", height:"26px", color:G }} />
                  </div>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px" }}>
                  {[["Fluency","7.5"],["Vocab","8.0"],["Grammar","7.0"],["Pronunc.","7.5"]].map(([k,v]) => (
                    <div key={k} style={{ background:"#f8fafc", borderRadius:"8px", padding:"8px 10px" }}>
                      <p style={{ fontSize:"10px", color:"#94a3b8", fontWeight:600 }}>{k}</p>
                      <p style={{ fontSize:"16px", fontWeight:800, color:GD }}>{v}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feedback bubble — top right */}
              <div className="float-b" style={{
                position:"absolute", top:"0px", right:"-10px",
                background:GD, borderRadius:"14px", padding:"14px 16px",
                boxShadow:"0 12px 36px rgba(5,46,22,0.5)", maxWidth:"210px",
              }}>
                <div style={{ display:"flex", gap:"6px", alignItems:"flex-start" }}>
                  <div className="pulse-ring" style={{ width:"8px", height:"8px", borderRadius:"50%", background:GL, flexShrink:0, marginTop:"4px" }} />
                  <p style={{ fontSize:"12px", color:"rgba(255,255,255,0.85)", lineHeight:1.5 }}>
                    <strong style={{ color:GL }}>Tip:</strong> Use more linking phrases like &ldquo;Furthermore&rdquo; and &ldquo;In contrast&rdquo; to improve CC score.
                  </p>
                </div>
              </div>

              {/* Student card — bottom left */}
              <div className="float-c" style={{
                position:"absolute", bottom:"20px", left:"-30px",
                background:"#fff", borderRadius:"14px", padding:"14px 18px",
                boxShadow:"0 12px 40px rgba(0,0,0,0.2)", display:"flex", alignItems:"center", gap:"12px",
              }}>
                <div style={{
                  width:"40px", height:"40px", borderRadius:"50%",
                  background:`linear-gradient(135deg, ${G}, ${GD})`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:"16px", flexShrink:0,
                }}>🇺🇿</div>
                <div>
                  <p style={{ fontSize:"13px", fontWeight:700, color:"#09090b" }}>Dilnoza T.</p>
                  <p style={{ fontSize:"12px", color:"#94a3b8" }}>Band 6.0 <span style={{ color:G, fontWeight:700 }}>→ 7.5</span> in 6 weeks</p>
                </div>
              </div>

              {/* Speed badge — bottom right */}
              <div style={{
                position:"absolute", bottom:"30px", right:"10px",
                background:GL, borderRadius:"12px", padding:"12px 16px", textAlign:"center",
              }}>
                <p style={{ fontSize:"24px", fontWeight:900, color:GH, lineHeight:1 }}>15s</p>
                <p style={{ fontSize:"10px", fontWeight:700, color:GD, textTransform:"uppercase", letterSpacing:"0.5px" }}>Feedback speed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          MARQUEE — student results ticker
      ══════════════════════════════════════════════════════════════════ */}
      <div style={{ background:"#f0fdf4", borderTop:"1px solid #bbf7d0", borderBottom:"1px solid #bbf7d0", padding:"16px 0", overflow:"hidden" }}>
        <div className="marquee-inner" style={{ display:"flex", gap:"48px", width:"max-content" }}>
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t,i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:"10px", flexShrink:0 }}>
              <span style={{ fontSize:"18px" }}>{t.flag}</span>
              <span style={{ fontSize:"13px", fontWeight:600, color:GD }}>{t.name}</span>
              <span style={{ fontSize:"12px", color:"#6b7280" }}>Band {t.prev}</span>
              <span style={{ fontSize:"14px", color:G }}>→</span>
              <span style={{ fontSize:"14px", fontWeight:800, color:G }}>Band {t.band}</span>
              <span style={{ fontSize:"12px", color:"#9ca3af" }}>in {t.weeks} weeks</span>
              <span style={{ color:"#d1d5db", fontSize:"20px", marginLeft:"12px" }}>·</span>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          STATS — 4 bold numbers
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding:"72px 28px", background:"#ffffff" }}>
        <div style={{ maxWidth:"1140px", margin:"0 auto" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"2px" }}>
            {[
              { val:"2,400+", label:"Students passed", icon:CheckCircle2, color:G },
              { val:"15 sec", label:"Average feedback speed", icon:Clock, color:"#7c3aed" },
              { val:"±0.5",  label:"Band score accuracy", icon:Shield, color:"#0284c7" },
              { val:"4.9★",  label:"Student rating", icon:Star, color:"#f59e0b" },
            ].map(({ val, label, icon: Icon, color },i) => (
              <div key={label} style={{
                padding:"36px 32px", borderRight:i<3?"1px solid #f1f5f9":"none",
                textAlign:"center",
              }}>
                <div style={{ width:"44px", height:"44px", borderRadius:"12px", background:`${color}15`, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
                  <Icon style={{ width:"22px", height:"22px", color }} />
                </div>
                <p style={{ fontSize:"40px", fontWeight:900, color:"#09090b", letterSpacing:"-1px", marginBottom:"6px" }}>{val}</p>
                <p style={{ fontSize:"13.5px", color:"#71717a" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          HOW IT WORKS — 3 steps
      ══════════════════════════════════════════════════════════════════ */}
      <section id="how-it-works" style={{ background:GS, padding:"88px 28px" }}>
        <div style={{ maxWidth:"1140px", margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"60px" }}>
            <p style={{ fontSize:"12px", fontWeight:700, color:G, textTransform:"uppercase", letterSpacing:"2px", marginBottom:"12px" }}>HOW IT WORKS</p>
            <h2 style={{ fontSize:"42px", fontWeight:900, color:"#09090b", letterSpacing:"-1.5px", marginBottom:"14px" }}>
              Band score in 3 steps
            </h2>
            <p style={{ fontSize:"16px", color:"#71717a", maxWidth:"480px", margin:"0 auto", lineHeight:1.6 }}>
              No setup. No app to download. Open browser, practice, get scored — in under a minute.
            </p>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"24px", position:"relative" }}>
            {/* Connector line */}
            <div style={{ position:"absolute", top:"44px", left:"33%", right:"33%", height:"2px", background:`linear-gradient(90deg, ${G}40, ${G}40)`, backgroundImage:`repeating-linear-gradient(90deg, ${G} 0, ${G} 8px, transparent 8px, transparent 16px)` }} />

            {[
              { num:"01", icon:BookOpen,  title:"Choose your skill",       desc:"Pick Speaking, Writing, Reading, or Listening. Select a question or let AI randomize one from our bank of 1,000+ real IELTS-style questions." },
              { num:"02", icon:Mic,       title:"Practice like the exam",  desc:"Speak into your mic or write your essay under timed conditions. 3-second countdown, real cue cards, Cambridge format — exactly like test day." },
              { num:"03", icon:BarChart3, title:"Get your band score",     desc:"AI grades every IELTS criterion in 15 seconds. Fluency, vocabulary, grammar, coherence — all scored with specific, actionable corrections." },
            ].map(({ num, icon: Icon, title, desc }, i) => (
              <div key={num} style={{
                background:"#fff", borderRadius:"20px", padding:"36px 32px",
                border:"1px solid #e7f5ed",
                boxShadow:`0 4px 24px rgba(22,163,74,0.06)`,
                position:"relative",
              }}>
                <div style={{
                  position:"absolute", top:"-16px", left:"32px",
                  background:i===1 ? G : "#fff",
                  border:`2px solid ${G}`,
                  borderRadius:"10px", padding:"4px 12px",
                  fontSize:"13px", fontWeight:800, color:i===1?"#fff":G,
                }}>
                  Step {num}
                </div>
                <div style={{ width:"52px", height:"52px", borderRadius:"14px", background:GS, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"20px", marginTop:"8px" }}>
                  <Icon style={{ width:"26px", height:"26px", color:G }} />
                </div>
                <h3 style={{ fontSize:"19px", fontWeight:800, color:"#09090b", marginBottom:"10px" }}>{title}</h3>
                <p style={{ fontSize:"14px", color:"#71717a", lineHeight:1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          BEFORE / AFTER — psychology of transformation
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding:"88px 28px", background:"#fff" }}>
        <div style={{ maxWidth:"900px", margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"52px" }}>
            <p style={{ fontSize:"12px", fontWeight:700, color:"#dc2626", textTransform:"uppercase", letterSpacing:"2px", marginBottom:"12px" }}>THE PROBLEM</p>
            <h2 style={{ fontSize:"38px", fontWeight:900, color:"#09090b", letterSpacing:"-1px", marginBottom:"14px" }}>
              Traditional IELTS prep is broken.
            </h2>
            <p style={{ fontSize:"15px", color:"#71717a", maxWidth:"520px", margin:"0 auto", lineHeight:1.6 }}>
              You practice for months. You don&apos;t know if you&apos;re improving. You sit the exam and miss your target. You pay again.
            </p>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 80px 1fr", gap:"0", alignItems:"center" }}>
            {/* Before */}
            <div style={{ background:"#fef2f2", border:"1.5px solid #fecaca", borderRadius:"16px", padding:"28px 24px" }}>
              <p style={{ fontSize:"13px", fontWeight:800, color:"#dc2626", textTransform:"uppercase", letterSpacing:"1px", marginBottom:"18px" }}>❌ Old way</p>
              {["Practice with no feedback","Wait weeks for exam results","Guess what went wrong","Repeat. Fail again. Pay again.","₹50,000+ on coaching centres"].map(t => (
                <div key={t} style={{ display:"flex", gap:"10px", marginBottom:"12px", alignItems:"flex-start" }}>
                  <span style={{ color:"#f87171", fontSize:"16px", lineHeight:1.3 }}>✗</span>
                  <span style={{ fontSize:"14px", color:"#7f1d1d" }}>{t}</span>
                </div>
              ))}
            </div>

            {/* Arrow */}
            <div style={{ display:"flex", justifyContent:"center" }}>
              <div style={{ width:"44px", height:"44px", borderRadius:"50%", background:G, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <ArrowRight style={{ width:"22px", height:"22px", color:"#fff" }} />
              </div>
            </div>

            {/* After */}
            <div style={{ background:GS, border:`1.5px solid #bbf7d0`, borderRadius:"16px", padding:"28px 24px" }}>
              <p style={{ fontSize:"13px", fontWeight:800, color:G, textTransform:"uppercase", letterSpacing:"1px", marginBottom:"18px" }}>✓ With Sensei</p>
              {["AI feedback in 15 seconds","Know your band score today","See exactly what to fix","Improve every single session.","Free plan — start right now"].map(t => (
                <div key={t} style={{ display:"flex", gap:"10px", marginBottom:"12px", alignItems:"flex-start" }}>
                  <CheckCircle2 style={{ width:"16px", height:"16px", color:G, flexShrink:0, marginTop:"1px" }} />
                  <span style={{ fontSize:"14px", color:GD, fontWeight:500 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FEATURES — alternating detail sections
      ══════════════════════════════════════════════════════════════════ */}
      <section id="features" style={{ background:"#fafafa", padding:"88px 28px" }}>
        <div style={{ maxWidth:"1140px", margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"64px" }}>
            <p style={{ fontSize:"12px", fontWeight:700, color:G, textTransform:"uppercase", letterSpacing:"2px", marginBottom:"12px" }}>FEATURES</p>
            <h2 style={{ fontSize:"42px", fontWeight:900, color:"#09090b", letterSpacing:"-1.5px", marginBottom:"14px" }}>
              Every IELTS skill. One platform.
            </h2>
            <p style={{ fontSize:"16px", color:"#71717a", maxWidth:"500px", margin:"0 auto" }}>
              Scored by the same 4 criteria as real examiners. Nothing missing. Nothing simplified.
            </p>
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
            {FEATURES.map(({ icon: Icon, label, title, color, bg, bullets }) => (
              <div key={label} style={{
                background:"#fff", borderRadius:"20px", padding:"32px 36px",
                border:"1px solid #e2e8f0",
                boxShadow:"0 2px 12px rgba(0,0,0,0.03)",
                display:"grid", gridTemplateColumns:"300px 1fr auto",
                gap:"32px", alignItems:"center",
              }}>
                {/* Left: icon + label + title */}
                <div style={{ display:"flex", gap:"16px", alignItems:"center" }}>
                  <div style={{ width:"52px", height:"52px", borderRadius:"14px", background:bg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <Icon style={{ width:"26px", height:"26px", color }} />
                  </div>
                  <div>
                    <p style={{ fontSize:"11px", fontWeight:800, color, textTransform:"uppercase", letterSpacing:"1px", marginBottom:"4px" }}>{label}</p>
                    <h3 style={{ fontSize:"16px", fontWeight:700, color:"#09090b", lineHeight:1.3 }}>{title}</h3>
                  </div>
                </div>

                {/* Middle: bullets */}
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px 24px" }}>
                  {bullets.map(b => (
                    <div key={b} style={{ display:"flex", gap:"8px", alignItems:"flex-start" }}>
                      <CheckCircle2 style={{ width:"14px", height:"14px", color, flexShrink:0, marginTop:"2px" }} />
                      <span style={{ fontSize:"13px", color:"#52525b", lineHeight:1.4 }}>{b}</span>
                    </div>
                  ))}
                </div>

                {/* Right: CTA */}
                <Link href="/signup" style={{
                  display:"inline-flex", alignItems:"center", gap:"6px",
                  background:bg, color, borderRadius:"10px",
                  padding:"10px 18px", fontSize:"13px", fontWeight:700,
                  textDecoration:"none", flexShrink:0, whiteSpace:"nowrap",
                }}>
                  Try now <ChevronRight style={{ width:"14px", height:"14px" }} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          LIVE DEMO MOCKUP — dashboard preview
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding:"88px 28px", background:"#fff" }}>
        <div style={{ maxWidth:"1140px", margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"64px", alignItems:"center" }}>

          <div>
            <p style={{ fontSize:"12px", fontWeight:700, color:G, textTransform:"uppercase", letterSpacing:"2px", marginBottom:"16px" }}>INSIDE THE APP</p>
            <h2 style={{ fontSize:"38px", fontWeight:900, color:"#09090b", letterSpacing:"-1px", marginBottom:"20px" }}>
              See your band score <br />before your real exam.
            </h2>
            <p style={{ fontSize:"15px", color:"#71717a", lineHeight:1.7, marginBottom:"28px" }}>
              Every speaking answer, every essay — graded in seconds. Watch your band score climb session by session. No more guessing.
            </p>
            {[
              { icon:Brain,      text:"AI trained on 10,000+ real IELTS samples" },
              { icon:TrendingUp, text:"Track improvement across all 4 skills" },
              { icon:PenLine,    text:"Band 5 to 8+ model answers for every essay" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} style={{ display:"flex", gap:"12px", alignItems:"center", marginBottom:"14px" }}>
                <div style={{ width:"36px", height:"36px", borderRadius:"10px", background:GS, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <Icon style={{ width:"18px", height:"18px", color:G }} />
                </div>
                <span style={{ fontSize:"14px", color:"#374151", fontWeight:500 }}>{text}</span>
              </div>
            ))}
            <Link href="/signup" style={{
              display:"inline-flex", alignItems:"center", gap:"8px", marginTop:"8px",
              background:G, color:"#fff", borderRadius:"10px",
              padding:"13px 24px", fontSize:"14px", fontWeight:700,
              textDecoration:"none", boxShadow:`0 6px 20px ${G}44`,
            }}>
              Try it for free <ArrowRight style={{ width:"16px", height:"16px" }} />
            </Link>
          </div>

          {/* Dashboard mockup */}
          <div style={{ borderRadius:"20px", overflow:"hidden", boxShadow:"0 24px 80px rgba(0,0,0,0.12)", border:"1px solid #e2e8f0" }}>
            {/* Browser bar */}
            <div style={{ background:"#1e293b", padding:"12px 16px", display:"flex", alignItems:"center", gap:"10px" }}>
              <div style={{ display:"flex", gap:"6px" }}>
                <div style={{ width:"10px", height:"10px", borderRadius:"50%", background:"#f87171" }} />
                <div style={{ width:"10px", height:"10px", borderRadius:"50%", background:"#fbbf24" }} />
                <div style={{ width:"10px", height:"10px", borderRadius:"50%", background:"#4ade80" }} />
              </div>
              <div style={{ flex:1, background:"rgba(255,255,255,0.07)", borderRadius:"6px", padding:"5px 12px", fontSize:"11px", color:"rgba(255,255,255,0.4)" }}>
                ielts-sensei.vercel.app/speaking
              </div>
            </div>

            {/* App UI */}
            <div style={{ background:"#f8fafc", padding:"24px" }}>
              {/* Header */}
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"20px" }}>
                <div>
                  <p style={{ fontSize:"11px", color:"#94a3b8", fontWeight:600, textTransform:"uppercase", letterSpacing:"1px" }}>Speaking Part 2</p>
                  <p style={{ fontSize:"16px", fontWeight:800, color:"#0f172a" }}>Cue Card Practice</p>
                </div>
                <div style={{ background:"#fef9c3", border:"1px solid #fde68a", borderRadius:"8px", padding:"6px 12px", fontSize:"12px", fontWeight:700, color:"#92400e" }}>
                  ⏱ 1:45 remaining
                </div>
              </div>

              {/* Cue card */}
              <div style={{ background:"#fff", borderRadius:"14px", padding:"18px 20px", border:`1.5px solid ${G}33`, marginBottom:"16px" }}>
                <p style={{ fontSize:"13px", fontWeight:700, color:GD, marginBottom:"10px" }}>Describe a memorable journey you have taken.</p>
                <p style={{ fontSize:"11px", fontWeight:600, color:"#94a3b8", textTransform:"uppercase", letterSpacing:"0.5px", marginBottom:"6px" }}>You should say:</p>
                {["• where you went","• who you went with","• what made it special"].map(b => (
                  <p key={b} style={{ fontSize:"12.5px", color:"#475569", marginBottom:"4px" }}>{b}</p>
                ))}
              </div>

              {/* Score breakdown */}
              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"8px", marginBottom:"12px" }}>
                {[["Fluency","7.5"],["Vocab","8.0"],["Grammar","7.0"],["Overall","7.5"]].map(([k,v],i) => (
                  <div key={k} style={{ background:i===3?GD:"#fff", borderRadius:"10px", padding:"12px", textAlign:"center", border:i===3?"none":"1px solid #e2e8f0" }}>
                    <p style={{ fontSize:"20px", fontWeight:900, color:i===3?"#fff":GD, lineHeight:1 }}>{v}</p>
                    <p style={{ fontSize:"10px", color:i===3?"rgba(255,255,255,0.6)":"#94a3b8", marginTop:"3px", fontWeight:600 }}>{k}</p>
                  </div>
                ))}
              </div>

              {/* Feedback */}
              <div style={{ background:"#fffbeb", border:"1px solid #fde68a", borderRadius:"10px", padding:"12px 14px" }}>
                <p style={{ fontSize:"12px", color:"#78350f", lineHeight:1.5 }}>
                  <strong>💡 Improvement tip:</strong> Your fluency is strong. Add more linking phrases like &ldquo;What&apos;s more&rdquo; and &ldquo;To put it simply&rdquo; to push from 7.5 → 8.0.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          TESTIMONIALS — wall of love
      ══════════════════════════════════════════════════════════════════ */}
      <section id="reviews" style={{ background:GS, padding:"88px 28px" }}>
        <div style={{ maxWidth:"1140px", margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"56px" }}>
            <p style={{ fontSize:"12px", fontWeight:700, color:G, textTransform:"uppercase", letterSpacing:"2px", marginBottom:"12px" }}>STUDENT RESULTS</p>
            <h2 style={{ fontSize:"42px", fontWeight:900, color:"#09090b", letterSpacing:"-1.5px", marginBottom:"14px" }}>
              Real students. Real bands.
            </h2>
            <p style={{ fontSize:"16px", color:"#71717a" }}>Uzbekistan, India, Saudi Arabia, Korea — students worldwide are hitting their target.</p>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"20px" }}>
            {TESTIMONIALS.map(({ name, flag, band, prev, weeks, text }) => (
              <div key={name} style={{
                background:"#fff", borderRadius:"18px", padding:"26px",
                border:"1px solid #e7f5ed",
                boxShadow:"0 4px 20px rgba(22,163,74,0.06)",
                display:"flex", flexDirection:"column",
              }}>
                {/* Stars */}
                <div style={{ display:"flex", gap:"2px", marginBottom:"14px" }}>
                  {[...Array(5)].map((_,i) => <Star key={i} style={{ width:"14px", height:"14px", fill:"#f59e0b", color:"#f59e0b" }} />)}
                </div>

                <p style={{ fontSize:"14px", color:"#374151", lineHeight:1.65, flex:1, marginBottom:"20px" }}>&ldquo;{text}&rdquo;</p>

                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", paddingTop:"16px", borderTop:"1px solid #f0fdf4" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                    <div style={{
                      width:"38px", height:"38px", borderRadius:"50%",
                      background:`linear-gradient(135deg,${G},${GD})`,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      fontSize:"16px",
                    }}>
                      {flag}
                    </div>
                    <div>
                      <p style={{ fontSize:"13px", fontWeight:700, color:"#09090b" }}>{name}</p>
                      <p style={{ fontSize:"11.5px", color:"#94a3b8" }}>{weeks} weeks · {flag.includes("🇺🇿")?"Uzbekistan":flag.includes("🇮🇳")?"India":flag.includes("🇸🇦")?"Saudi Arabia":"Korea"}</p>
                    </div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <p style={{ fontSize:"22px", fontWeight:900, color:GD, lineHeight:1 }}>{band}</p>
                    <p style={{ fontSize:"11px", color:"#94a3b8" }}>was {prev}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          PRICING
      ══════════════════════════════════════════════════════════════════ */}
      <section id="pricing" style={{ padding:"88px 28px", background:"#fff" }}>
        <div style={{ maxWidth:"860px", margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"52px" }}>
            <p style={{ fontSize:"12px", fontWeight:700, color:G, textTransform:"uppercase", letterSpacing:"2px", marginBottom:"12px" }}>PRICING</p>
            <h2 style={{ fontSize:"42px", fontWeight:900, color:"#09090b", letterSpacing:"-1.5px", marginBottom:"14px" }}>
              Start free. Upgrade when ready.
            </h2>
            <p style={{ fontSize:"16px", color:"#71717a" }}>No hidden fees. No complicated tiers. Cancel any time.</p>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"24px" }}>
            {[
              {
                name:"Free", price:"$0", period:"forever", featured:false,
                cta:"Start for Free", href:"/signup",
                perks:["3 AI scored sessions per week","Speaking, Writing, Reading & Listening","Band scores across all 4 criteria","Progress dashboard","Model answers (Band 7)"],
              },
              {
                name:"Pro", price:"$12", period:"/ month", featured:true,
                cta:"Get Pro — Unlimited →", href:"/signup",
                perks:["Unlimited AI scoring","Full 4-part mock tests","Band 5 · 6 · 7 · 8+ model answers","Pronunciation issue mapping","Priority AI — faster results"],
              },
            ].map(({ name, price, period, featured, cta, href, perks }) => (
              <div key={name} style={{
                borderRadius:"20px", padding:"36px",
                background: featured ? GD : "#fff",
                border: featured ? "none" : "2px solid #e2e8f0",
                boxShadow: featured ? `0 16px 48px ${GD}44` : "0 2px 12px rgba(0,0,0,0.04)",
                position:"relative", overflow:"hidden",
              }}>
                {featured && (
                  <>
                    <div style={{ position:"absolute", top:0, right:0, width:"140px", height:"140px", background:"rgba(255,255,255,0.04)", borderRadius:"0 0 0 140px" }} />
                    <span style={{
                      display:"inline-block", background:GL, color:GD,
                      fontSize:"11px", fontWeight:800, borderRadius:"20px",
                      padding:"4px 12px", marginBottom:"16px", textTransform:"uppercase", letterSpacing:"0.5px",
                    }}>Most Popular</span>
                  </>
                )}

                <p style={{ fontSize:"14px", fontWeight:600, color:featured?"rgba(255,255,255,0.55)":"#6b7280", marginBottom:"4px" }}>{name}</p>
                <div style={{ display:"flex", alignItems:"baseline", gap:"4px", marginBottom:"20px" }}>
                  <span style={{ fontSize:"48px", fontWeight:900, color:featured?"#fff":"#09090b", letterSpacing:"-2px", lineHeight:1 }}>{price}</span>
                  <span style={{ fontSize:"14px", color:featured?"rgba(255,255,255,0.4)":"#9ca3af" }}>{period}</span>
                </div>

                <div style={{ display:"flex", flexDirection:"column", gap:"11px", marginBottom:"28px" }}>
                  {perks.map(p => (
                    <div key={p} style={{ display:"flex", gap:"10px", alignItems:"flex-start" }}>
                      <CheckCircle2 style={{ width:"16px", height:"16px", color:featured?GL:G, flexShrink:0, marginTop:"1px" }} />
                      <span style={{ fontSize:"13.5px", color:featured?"rgba(255,255,255,0.8)":"#374151" }}>{p}</span>
                    </div>
                  ))}
                </div>

                <Link href={href} style={{
                  display:"block", textAlign:"center",
                  padding:"13px", borderRadius:"10px",
                  fontSize:"14px", fontWeight:700,
                  background: featured ? GL : "transparent",
                  color: featured ? GD : G,
                  border: featured ? "none" : `2px solid ${G}`,
                  textDecoration:"none",
                }}>
                  {cta}
                </Link>
              </div>
            ))}
          </div>

          <p style={{ textAlign:"center", fontSize:"13px", color:"#94a3b8", marginTop:"24px" }}>
            Not affiliated with British Council or IDP Education · Disclaimer: AI scores are approximate (±0.5 bands)
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FINAL CTA — dark, dramatic, emotional
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding:"0 28px 96px" }}>
        <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
          <div style={{
            background:`linear-gradient(135deg, ${GH} 0%, #064e3b 40%, #065f46 100%)`,
            borderRadius:"28px", padding:"80px 48px", textAlign:"center",
            position:"relative", overflow:"hidden",
          }}>
            {/* Grid dots */}
            <div style={{
              position:"absolute", inset:0, pointerEvents:"none",
              backgroundImage:`radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)`,
              backgroundSize:"28px 28px",
            }} />
            <div style={{ position:"absolute", top:"-60px", right:"-60px", width:"300px", height:"300px", borderRadius:"50%", background:`radial-gradient(circle,${GL}18,transparent 70%)`, pointerEvents:"none" }} />

            <div style={{ position:"relative", zIndex:1 }}>
              <div style={{
                display:"inline-flex", alignItems:"center", gap:"8px",
                background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.12)",
                borderRadius:"24px", padding:"6px 16px 6px 6px", marginBottom:"28px",
              }}>
                <div style={{ background:GL, width:"24px", height:"24px", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <Sparkles style={{ width:"13px", height:"13px", color:GH }} />
                </div>
                <span style={{ fontSize:"13px", fontWeight:600, color:"rgba(255,255,255,0.8)" }}>Free to start — no card needed</span>
              </div>

              <h2 style={{ fontSize:"52px", fontWeight:900, color:"#fff", letterSpacing:"-2px", lineHeight:1.1, marginBottom:"18px" }}>
                Your target band score<br />
                <span className="shimmer-text">is closer than you think.</span>
              </h2>

              <p style={{ fontSize:"17px", color:"rgba(255,255,255,0.55)", marginBottom:"40px", maxWidth:"480px", margin:"0 auto 40px", lineHeight:1.65 }}>
                Every day you don&apos;t practice, other students are getting ahead. Start now — your first band score is 15 seconds away.
              </p>

              <div style={{ display:"flex", gap:"12px", justifyContent:"center", flexWrap:"wrap" }}>
                <Link href="/signup" style={{
                  display:"inline-flex", alignItems:"center", gap:"8px",
                  background:GL, color:GH,
                  borderRadius:"12px", padding:"16px 36px",
                  fontSize:"16px", fontWeight:900, textDecoration:"none",
                  boxShadow:`0 8px 32px ${GL}44`,
                }}>
                  Get My Free Band Score <ArrowRight style={{ width:"18px", height:"18px" }} />
                </Link>
                <Link href="/login" style={{
                  display:"inline-flex", alignItems:"center", gap:"8px",
                  background:"rgba(255,255,255,0.08)",
                  border:"1px solid rgba(255,255,255,0.15)",
                  color:"rgba(255,255,255,0.8)",
                  borderRadius:"12px", padding:"16px 28px",
                  fontSize:"16px", fontWeight:600, textDecoration:"none",
                }}>
                  Sign in
                </Link>
              </div>

              <p style={{ fontSize:"13px", color:"rgba(255,255,255,0.3)", marginTop:"20px" }}>
                Joined by 2,400+ students from 45+ countries
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FOOTER — dark, 4-column
      ══════════════════════════════════════════════════════════════════ */}
      <footer style={{ background:GH, padding:"60px 28px 32px" }}>
        <div style={{ maxWidth:"1140px", margin:"0 auto" }}>
          <div style={{ display:"grid", gridTemplateColumns:"2.5fr 1fr 1fr 1fr", gap:"48px", marginBottom:"52px" }}>

            <div>
              <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"14px" }}>
                <div style={{ width:"32px", height:"32px", borderRadius:"8px", background:G, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <GraduationCap style={{ width:"18px", height:"18px", color:"#fff" }} />
                </div>
                <span style={{ fontSize:"15px", fontWeight:800, color:"#fff" }}>IELTS Sensei</span>
              </div>
              <p style={{ fontSize:"13px", color:"#4b5563", lineHeight:1.7, maxWidth:"220px", marginBottom:"18px" }}>
                Empathetic AI coaching for global success. Your personal mentor for the IELTS examination.
              </p>
              <div style={{ display:"flex", gap:"10px" }}>
                <Link href="/signup" style={{ fontSize:"13px", fontWeight:700, color:GH, background:GL, borderRadius:"8px", padding:"8px 16px", textDecoration:"none" }}>
                  Start Free
                </Link>
              </div>
            </div>

            {[
              { heading:"PRODUCT", links:["Speaking Lab","Writing Coach","Reading Tests","Listening Tests","Pricing Plans"] },
              { heading:"SUPPORT", links:["Help Center","Contact Support","Blog","Community","Discord"] },
              { heading:"LEGAL",   links:["Privacy Policy","Terms of Service","Cookie Settings","Disclaimer","Refund Policy"] },
            ].map(({ heading, links }) => (
              <div key={heading}>
                <p style={{ fontSize:"11px", fontWeight:800, color:"#6b7280", textTransform:"uppercase", letterSpacing:"1.5px", marginBottom:"18px" }}>{heading}</p>
                {links.map(link => (
                  <a key={link} href="#" style={{ display:"block", fontSize:"13.5px", color:"#4b5563", textDecoration:"none", marginBottom:"11px" }}>
                    {link}
                  </a>
                ))}
              </div>
            ))}
          </div>

          <div style={{ borderTop:"1px solid rgba(255,255,255,0.06)", paddingTop:"24px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"12px" }}>
            <p style={{ fontSize:"12.5px", color:"#374151" }}>
              © 2024 IELTS Sensei. Empathetic AI coaching for global success.
            </p>
            <p style={{ fontSize:"12px", color:"#374151" }}>
              Not affiliated with British Council or IDP Education.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
