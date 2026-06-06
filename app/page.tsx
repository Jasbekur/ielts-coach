import Link from "next/link";
import {
  GraduationCap, Mic, BookOpen, BookMarked, Headphones,
  Zap, CheckCircle2, Star, ArrowRight, Play,
  TrendingUp, Clock, Shield, Brain, BarChart3, Users,
} from "lucide-react";

// ── Testimonials ──────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  { name:"Dilnoza T.", flag:"🇺🇿", band:"7.5", prev:"6.0", weeks:6,  text:"I went from 6.0 to 7.5 in just 6 weeks. The speaking feedback caught pronunciation mistakes my teacher never noticed in 2 years." },
  { name:"Arjun P.",   flag:"🇮🇳", band:"8.0", prev:"6.5", weeks:10, text:"The instant band score after every essay changed everything. I practiced 10 essays a day and watched my score climb in real time." },
  { name:"Yuna K.",    flag:"🇰🇷", band:"7.0", prev:"5.5", weeks:8,  text:"The full mock test is exactly like the real exam. I walked in on test day completely calm. Sensei prepared me for everything." },
  { name:"Fatima A.",  flag:"🇸🇦", band:"8.5", prev:"7.0", weeks:12, text:"The model answers at every band level showed me exactly what examiners want. I finally understood what 'coherence' actually means." },
  { name:"Bekzod U.",  flag:"🇺🇿", band:"7.5", prev:"5.5", weeks:9,  text:"I had failed IELTS twice before Sensei. In 9 weeks my writing went from 5.5 to 7.5. My UK visa is approved. Life changed." },
  { name:"Priya S.",   flag:"🇮🇳", band:"8.0", prev:"7.0", weeks:7,  text:"Worth every penny. The grammar correction with explanations taught me WHY I was wrong, not just what. Game changer for task 2." },
];

const FEATURES = [
  { icon: Mic,        label:"Speaking",  title:"All 3 Parts. Real Cue Cards.",             color:"#16a34a",
    bullets:["50+ real IELTS Part 2 cue cards","3-second countdown before recording starts","Full mock: Parts 1, 2 & 3 back-to-back","Pronunciation issues with exact word-level fixes"] },
  { icon: BookOpen,   label:"Writing",   title:"Task 1 & Task 2. Scored in 15 Seconds.",   color:"#7c3aed",
    bullets:["Academic & General Training Task 1","Opinion, discussion & problem essays","Grammar corrections with clear explanations","Band 5 → 8+ model answer for every essay"] },
  { icon: BookMarked, label:"Reading",   title:"40 Questions. 60 Minutes. Real Timing.",   color:"#0284c7",
    bullets:["True/False/Not Given, MCQ, matching headings","Timed exam mode with auto-submit","Full explanations for every correct answer","Academic & General Training passages"] },
  { icon: Headphones, label:"Listening", title:"Cambridge Format. Auto-scoring.",           color:"#db2777",
    bullets:["Notes, form & sentence completion","Multiple-choice with single & multi answer","Real exam timer — audio plays once only","Part 1–4 with question navigator"] },
];

const STATS = [
  { icon: Users,     value:"10,000+", label:"Students trained" },
  { icon: Star,      value:"4.9/5",   label:"Average rating" },
  { icon: TrendingUp,value:"95%",     label:"Success rate" },
  { icon: Clock,     value:"<15s",    label:"AI feedback speed" },
];

const HOW = [
  { n:"01", title:"Pick a skill",      desc:"Choose Writing, Speaking, Listening or Reading — or run a full mock exam." },
  { n:"02", title:"Practice freely",   desc:"Complete tasks at your own pace or under real exam conditions with timers." },
  { n:"03", title:"Get AI feedback",   desc:"Receive examiner-grade band scores and corrections in under 15 seconds." },
  { n:"04", title:"Track progress",    desc:"Your history dashboard shows every attempt, score trend, and weak points." },
];

export default function LandingPage() {
  return (
    <div style={{ fontFamily:"'Inter',system-ui,sans-serif", background:"#ffffff", color:"#09090b", overflowX:"hidden" }}>

      {/* ── NAV ─────────────────────────────────────────────────────────────── */}
      <header style={{
        position:"sticky", top:0, zIndex:100,
        background:"rgba(255,255,255,0.92)", backdropFilter:"blur(16px)",
        borderBottom:"1px solid #f1f5f9",
      }}>
        <div style={{ maxWidth:"1120px", margin:"0 auto", padding:"0 24px", height:"60px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>

          {/* Logo */}
          <Link href="/" style={{ display:"flex", alignItems:"center", gap:"8px", textDecoration:"none" }}>
            <div style={{ width:"32px", height:"32px", borderRadius:"8px", background:"#09090b", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <GraduationCap style={{ width:"17px", height:"17px", color:"#fff" }} />
            </div>
            <span style={{ fontWeight:700, fontSize:"15px", color:"#09090b" }}>IELTS Sensei</span>
          </Link>

          {/* Nav links */}
          <nav style={{ display:"flex", gap:"28px" }}>
            {["Features","How It Works","Reviews"].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(/ /g,"-")}`}
                style={{ fontSize:"14px", fontWeight:500, color:"#52525b", textDecoration:"none" }}>
                {item}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
            <Link href="/login"
              style={{ fontSize:"14px", fontWeight:500, color:"#52525b", textDecoration:"none", padding:"7px 14px" }}>
              Sign in
            </Link>
            <Link href="/signup" style={{
              fontSize:"14px", fontWeight:600, color:"#fff", textDecoration:"none",
              background:"#09090b", borderRadius:"8px", padding:"8px 18px",
            }}>
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section style={{ padding:"100px 24px 80px", textAlign:"center", background:"#ffffff" }}>
        <div style={{ maxWidth:"720px", margin:"0 auto" }}>

          {/* Badge */}
          <div style={{
            display:"inline-flex", alignItems:"center", gap:"6px",
            background:"#f4f4f5", borderRadius:"999px", padding:"5px 14px",
            marginBottom:"28px",
          }}>
            <Zap style={{ width:"13px", height:"13px", color:"#16a34a" }} />
            <span style={{ fontSize:"13px", fontWeight:500, color:"#52525b" }}>AI-Powered IELTS Training</span>
          </div>

          {/* Heading */}
          <h1 style={{ fontSize:"clamp(40px,6vw,68px)", fontWeight:800, lineHeight:1.1, letterSpacing:"-0.03em", margin:"0 0 20px", color:"#09090b" }}>
            Master IELTS with<br />
            <span style={{ color:"#16a34a" }}>AI Coaching</span>
          </h1>

          {/* Sub */}
          <p style={{ fontSize:"18px", lineHeight:1.7, color:"#71717a", margin:"0 0 36px", maxWidth:"520px", marginLeft:"auto", marginRight:"auto" }}>
            Personalized AI coaching for Speaking, Writing, Listening, and Reading. Get your target band score with intelligent feedback and practice.
          </p>

          {/* CTAs */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"12px", flexWrap:"wrap" }}>
            <Link href="/signup" style={{
              display:"inline-flex", alignItems:"center", gap:"8px",
              fontSize:"15px", fontWeight:600, color:"#fff", textDecoration:"none",
              background:"#09090b", borderRadius:"10px", padding:"13px 28px",
            }}>
              Start Training <ArrowRight style={{ width:"16px", height:"16px" }} />
            </Link>
            <a href="#how-it-works" style={{
              display:"inline-flex", alignItems:"center", gap:"8px",
              fontSize:"15px", fontWeight:500, color:"#09090b", textDecoration:"none",
              background:"#ffffff", borderRadius:"10px", padding:"12px 24px",
              border:"1.5px solid #e4e4e7",
            }}>
              <Play style={{ width:"15px", height:"15px" }} /> Watch Demo
            </a>
          </div>

          {/* Trust row */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"32px", marginTop:"48px", flexWrap:"wrap" }}>
            {STATS.map(({ icon: Icon, value, label }) => (
              <div key={label} style={{ display:"flex", alignItems:"center", gap:"7px" }}>
                <Icon style={{ width:"15px", height:"15px", color:"#a1a1aa" }} />
                <span style={{ fontSize:"14px", fontWeight:600, color:"#09090b" }}>{value}</span>
                <span style={{ fontSize:"14px", color:"#a1a1aa" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIVIDER ─────────────────────────────────────────────────────────── */}
      <div style={{ background:"#f4f4f5", height:"1px", margin:"0" }} />

      {/* ── FEATURES ────────────────────────────────────────────────────────── */}
      <section id="features" style={{ padding:"96px 24px", background:"#fafafa" }}>
        <div style={{ maxWidth:"1120px", margin:"0 auto" }}>

          <div style={{ textAlign:"center", marginBottom:"60px" }}>
            <p style={{ fontSize:"13px", fontWeight:600, color:"#16a34a", textTransform:"uppercase", letterSpacing:"1.5px", marginBottom:"10px" }}>Features</p>
            <h2 style={{ fontSize:"clamp(28px,4vw,40px)", fontWeight:800, letterSpacing:"-0.025em", margin:"0 0 14px", color:"#09090b" }}>
              Everything you need to hit your band score
            </h2>
            <p style={{ fontSize:"16px", color:"#71717a", maxWidth:"480px", margin:"0 auto" }}>
              All four IELTS skills in one platform — with real exam conditions and instant AI feedback.
            </p>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:"20px" }}>
            {FEATURES.map(({ icon: Icon, label, title, color, bullets }) => (
              <div key={label} style={{
                background:"#ffffff", borderRadius:"16px",
                border:"1.5px solid #e4e4e7", padding:"28px",
                transition:"box-shadow 0.2s",
              }}>
                <div style={{ width:"40px", height:"40px", borderRadius:"10px", background:`${color}15`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"16px" }}>
                  <Icon style={{ width:"20px", height:"20px", color }} />
                </div>
                <p style={{ fontSize:"11px", fontWeight:700, color, textTransform:"uppercase", letterSpacing:"1px", marginBottom:"6px" }}>{label}</p>
                <h3 style={{ fontSize:"16px", fontWeight:700, color:"#09090b", margin:"0 0 16px", lineHeight:1.35 }}>{title}</h3>
                <ul style={{ margin:0, padding:0, listStyle:"none", display:"flex", flexDirection:"column", gap:"8px" }}>
                  {bullets.map(b => (
                    <li key={b} style={{ display:"flex", alignItems:"flex-start", gap:"8px", fontSize:"13.5px", color:"#52525b", lineHeight:1.5 }}>
                      <CheckCircle2 style={{ width:"14px", height:"14px", color:"#16a34a", marginTop:"2px", flexShrink:0 }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────────────────────── */}
      <section id="how-it-works" style={{ padding:"96px 24px", background:"#ffffff" }}>
        <div style={{ maxWidth:"1120px", margin:"0 auto" }}>

          <div style={{ textAlign:"center", marginBottom:"60px" }}>
            <p style={{ fontSize:"13px", fontWeight:600, color:"#16a34a", textTransform:"uppercase", letterSpacing:"1.5px", marginBottom:"10px" }}>How It Works</p>
            <h2 style={{ fontSize:"clamp(28px,4vw,40px)", fontWeight:800, letterSpacing:"-0.025em", margin:"0 0 14px", color:"#09090b" }}>
              Four steps to your target band
            </h2>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:"24px" }}>
            {HOW.map(({ n, title, desc }) => (
              <div key={n} style={{ padding:"28px 24px" }}>
                <p style={{ fontSize:"13px", fontWeight:700, color:"#d4d4d8", fontVariantNumeric:"tabular-nums", marginBottom:"16px" }}>{n}</p>
                <h3 style={{ fontSize:"17px", fontWeight:700, color:"#09090b", margin:"0 0 10px" }}>{title}</h3>
                <p style={{ fontSize:"14px", color:"#71717a", lineHeight:1.65, margin:0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ─────────────────────────────────────────────────────────── */}
      <section id="reviews" style={{ padding:"96px 24px", background:"#fafafa" }}>
        <div style={{ maxWidth:"1120px", margin:"0 auto" }}>

          <div style={{ textAlign:"center", marginBottom:"60px" }}>
            <p style={{ fontSize:"13px", fontWeight:600, color:"#16a34a", textTransform:"uppercase", letterSpacing:"1.5px", marginBottom:"10px" }}>Reviews</p>
            <h2 style={{ fontSize:"clamp(28px,4vw,40px)", fontWeight:800, letterSpacing:"-0.025em", margin:"0 0 14px", color:"#09090b" }}>
              Students who made it
            </h2>
            <p style={{ fontSize:"16px", color:"#71717a", maxWidth:"440px", margin:"0 auto" }}>
              Real results from real students across the globe.
            </p>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:"16px" }}>
            {TESTIMONIALS.map(({ name, flag, band, prev, weeks, text }) => (
              <div key={name} style={{
                background:"#ffffff", borderRadius:"14px",
                border:"1.5px solid #e4e4e7", padding:"24px",
              }}>
                {/* Stars */}
                <div style={{ display:"flex", gap:"3px", marginBottom:"14px" }}>
                  {[1,2,3,4,5].map(i => <Star key={i} style={{ width:"13px", height:"13px", color:"#eab308", fill:"#eab308" }} />)}
                </div>
                <p style={{ fontSize:"14px", color:"#3f3f46", lineHeight:1.65, margin:"0 0 18px" }}>&ldquo;{text}&rdquo;</p>
                {/* Footer */}
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"9px" }}>
                    <div style={{ width:"34px", height:"34px", borderRadius:"50%", background:"#f4f4f5", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"16px" }}>{flag}</div>
                    <div>
                      <p style={{ fontSize:"13px", fontWeight:600, color:"#09090b", margin:0 }}>{name}</p>
                      <p style={{ fontSize:"11px", color:"#a1a1aa", margin:0 }}>{weeks} weeks</p>
                    </div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <p style={{ fontSize:"15px", fontWeight:700, color:"#16a34a", margin:0 }}>Band {band}</p>
                    <p style={{ fontSize:"11px", color:"#a1a1aa", margin:0 }}>from {prev}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ──────────────────────────────────────────────────────── */}
      <section style={{ padding:"80px 24px", background:"#09090b" }}>
        <div style={{ maxWidth:"640px", margin:"0 auto", textAlign:"center" }}>
          <h2 style={{ fontSize:"clamp(28px,4vw,44px)", fontWeight:800, color:"#ffffff", letterSpacing:"-0.025em", margin:"0 0 16px" }}>
            Ready to ace your IELTS?
          </h2>
          <p style={{ fontSize:"16px", color:"#a1a1aa", margin:"0 0 36px", lineHeight:1.65 }}>
            Join 10,000+ students already training smarter. Free to start — no credit card needed.
          </p>
          <Link href="/signup" style={{
            display:"inline-flex", alignItems:"center", gap:"8px",
            fontSize:"15px", fontWeight:600, color:"#09090b", textDecoration:"none",
            background:"#ffffff", borderRadius:"10px", padding:"14px 32px",
          }}>
            Start Training Free <ArrowRight style={{ width:"16px", height:"16px" }} />
          </Link>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer style={{ padding:"40px 24px", background:"#09090b", borderTop:"1px solid #27272a" }}>
        <div style={{ maxWidth:"1120px", margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"16px" }}>

          <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
            <div style={{ width:"28px", height:"28px", borderRadius:"7px", background:"#27272a", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <GraduationCap style={{ width:"15px", height:"15px", color:"#a1a1aa" }} />
            </div>
            <span style={{ fontSize:"14px", fontWeight:600, color:"#a1a1aa" }}>IELTS Sensei</span>
          </div>

          <p style={{ fontSize:"13px", color:"#52525b", margin:0 }}>
            © {new Date().getFullYear()} IELTS Sensei. All rights reserved.
          </p>

          <div style={{ display:"flex", gap:"20px" }}>
            {["Privacy","Terms","Contact"].map(item => (
              <a key={item} href="#" style={{ fontSize:"13px", color:"#52525b", textDecoration:"none" }}>{item}</a>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
}
