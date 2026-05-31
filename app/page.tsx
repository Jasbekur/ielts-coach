import Link from "next/link";
import {
  GraduationCap, Mic, BookOpen, BookMarked,
  Zap, BarChart3, Target, CheckCircle2,
  Star, ArrowRight, ChevronDown, Sparkles,
  Clock, TrendingUp, Shield, Brain,
} from "lucide-react";

// ── Colour tokens ─────────────────────────────────────────────────────────────
const G   = "#059669"; // emerald-600
const GD  = "#047857"; // emerald-700

// ─────────────────────────────────────────────────────────────────────────────
// Small reusable pieces
// ─────────────────────────────────────────────────────────────────────────────

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
      style={{ background: "rgba(5,150,105,0.10)", color: G, border: `1px solid rgba(5,150,105,0.20)` }}>
      {children}
    </span>
  );
}

function SectionHeading({ badge, title, sub }: { badge?: string; title: React.ReactNode; sub?: string }) {
  return (
    <div className="text-center mb-14">
      {badge && <Badge><Sparkles className="w-3 h-3" />{badge}</Badge>}
      <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-4 mb-4 text-gray-900">{title}</h2>
      {sub && <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">{sub}</p>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

const STATS = [
  { value: "50,000+", label: "Active Students" },
  { value: "4.9 ★",  label: "Average Rating" },
  { value: "0.3",    label: "Avg Band Increase" },
  { value: "15 sec", label: "Feedback Speed" },
];

const STEPS = [
  {
    num: "01",
    icon: BookOpen,
    title: "Choose Your Practice",
    desc:  "Pick Speaking, Writing, or Reading. Select a real IELTS-style question or let AI randomize one for you.",
  },
  {
    num: "02",
    icon: Mic,
    title: "Attempt Like the Real Exam",
    desc:  "Record your speech or write your essay. Full exam conditions — timer, cue cards, question types, everything.",
  },
  {
    num: "03",
    icon: Zap,
    title: "Get Your Band Score Instantly",
    desc:  "Our AI grades each IELTS criterion in seconds. Fluency, vocabulary, grammar, coherence — all scored with explanations.",
  },
];

const FEATURES = [
  {
    icon: Mic,
    color: "#059669",
    bg:   "rgba(5,150,105,0.08)",
    tag:  "Speaking",
    title: "All 3 Parts. Real Cue Cards.",
    bullets: [
      "50+ real IELTS Part 2 cue cards",
      "1-minute prep timer with auto-start recording",
      "Full mock test: Parts 1, 2 & 3 back-to-back",
      "Pronunciation issues with exact fixes",
    ],
  },
  {
    icon: BookOpen,
    color: "#7c3aed",
    bg:   "rgba(124,58,237,0.08)",
    tag:  "Writing",
    title: "Task 1 & Task 2 Graded in Seconds.",
    bullets: [
      "Academic & General Training Task 1",
      "Task 2 opinion, discussion & problem essays",
      "Grammar corrections with explanations",
      "Band 5 → 8+ model answers for every essay",
    ],
  },
  {
    icon: BookMarked,
    color: "#0284c7",
    bg:   "rgba(2,132,199,0.08)",
    tag:  "Reading",
    title: "3 Passages. 40 Questions. Real Timing.",
    bullets: [
      "True/False/Not Given, MCQ, matching headings",
      "Timed exam mode with auto-submit",
      "Full answer explanations for every question",
      "Academic & General Training passages",
    ],
  },
];

const TESTIMONIALS = [
  {
    name:   "Dilnoza T.",
    flag:   "🇺🇿",
    band:   "7.5",
    prev:   "6.0",
    text:   "I went from 6.0 to 7.5 in 6 weeks. The speaking feedback is unreal — it caught pronunciation mistakes my teacher never noticed.",
  },
  {
    name:   "Arjun P.",
    flag:   "🇮🇳",
    band:   "8.0",
    prev:   "6.5",
    text:   "The instant band score after every essay is what made the difference. I could practice 10 essays a day and see progress immediately.",
  },
  {
    name:   "Yuna K.",
    flag:   "🇰🇷",
    band:   "7.0",
    prev:   "5.5",
    text:   "The full mock test feature is incredible. It's exactly like the real exam. I walked in on test day completely calm.",
  },
  {
    name:   "Fatima A.",
    flag:   "🇸🇦",
    band:   "8.5",
    prev:   "7.0",
    text:   "Best IELTS prep tool I've ever used. The model answers at different band levels taught me exactly what examiners want.",
  },
];

const PRICING = [
  {
    name:     "Free",
    price:    "$0",
    period:   "forever",
    desc:     "Perfect for getting started.",
    color:    "#374151",
    cta:      "Start for Free",
    href:     "/signup",
    featured: false,
    perks: [
      "10 scored attempts per day",
      "Speaking Parts 1, 2 & 3",
      "Writing Task 1 & Task 2",
      "Reading practice",
      "Band scores + feedback",
      "Progress dashboard",
    ],
  },
  {
    name:     "Pro",
    price:    "$12",
    period:   "per month",
    desc:     "For serious exam takers.",
    color:    G,
    cta:      "Get Pro",
    href:     "/signup",
    featured: true,
    perks: [
      "Unlimited scored attempts",
      "Full mock test mode",
      "Band 5–8+ model answers",
      "Vocabulary upgrade suggestions",
      "Detailed pronunciation analysis",
      "Priority AI processing",
    ],
  },
];

const FAQS = [
  {
    q: "How accurate is the AI band score?",
    a: "Our AI is trained on thousands of real IELTS exams and consistently scores within ±0.5 bands of human examiners. It evaluates the same four criteria: Fluency & Coherence, Lexical Resource, Grammatical Range & Accuracy, and Pronunciation.",
  },
  {
    q: "Do I need any special equipment?",
    a: "No. Just a microphone (your laptop's built-in mic works fine) and a browser. No downloads or installs needed.",
  },
  {
    q: "Is this for Academic or General Training?",
    a: "Both. The platform covers Academic and General Training tasks for Writing, and all three Speaking parts. Reading includes both Academic and GT passages.",
  },
  {
    q: "How is this different from other IELTS apps?",
    a: "Most apps give multiple-choice questions. We give you real open-ended practice — you speak, you write — and our AI grades it exactly like an IELTS examiner. You also get model answers at every band level so you can see precisely what 'better' looks like.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. No contracts, no hidden fees. Cancel in one click from your account settings.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">

      {/* ════════════════════════════════════════════════════════════════════
          HEADER
      ════════════════════════════════════════════════════════════════════ */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${G}, ${GD})`, boxShadow: `0 4px 12px ${G}44` }}>
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-sm leading-none text-gray-900">IELTS Sensei</p>
              <p className="text-[9px] font-bold tracking-widest uppercase leading-none mt-0.5" style={{ color: G }}>AI Exam Coach</p>
            </div>
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <Link href="#how-it-works" className="hover:text-gray-900 transition-colors">How it works</Link>
            <Link href="#features"     className="hover:text-gray-900 transition-colors">Features</Link>
            <Link href="#testimonials" className="hover:text-gray-900 transition-colors">Reviews</Link>
            <Link href="#pricing"      className="hover:text-gray-900 transition-colors">Pricing</Link>
            <Link href="#faq"          className="hover:text-gray-900 transition-colors">FAQ</Link>
          </nav>

          {/* Auth */}
          <div className="flex items-center gap-3">
            <Link href="/login"
              className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors hidden sm:block">
              Sign in
            </Link>
            <Link href="/signup"
              className="text-sm font-bold text-white px-5 py-2.5 rounded-xl transition-all hover:brightness-110 hover:scale-[1.02]"
              style={{ background: G, boxShadow: `0 4px 12px ${G}44` }}>
              Start Free
            </Link>
          </div>
        </div>
      </header>

      {/* ════════════════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #f0fdf9 0%, #ffffff 100%)" }}>

        {/* Soft radial blob */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 70% 50% at 50% -10%, ${G}18, transparent)` }} />

        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-24 text-center">

          <Badge><Zap className="w-3 h-3" /> AI-Powered · Results in 15 Seconds</Badge>

          <h1 className="text-4xl sm:text-5xl md:text-[64px] font-extrabold leading-[1.08] tracking-tight mt-6 mb-6 text-gray-900">
            Ace IELTS with{" "}
            <span style={{ color: G }}>AI Feedback</span>
            <br />that feels like a real examiner.
          </h1>

          <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Practice Speaking, Writing, and Reading with instant AI-graded band scores,
            personalised corrections, and model answers — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-6">
            <Link href="/signup"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-white transition-all hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: G, boxShadow: `0 6px 20px ${G}55` }}>
              Start Practising Free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/login"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold text-gray-700 bg-white border border-gray-200 transition-all hover:border-gray-300 hover:scale-[1.02] active:scale-[0.98]"
              style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}>
              Sign in to dashboard
            </Link>
          </div>

          <p className="text-xs text-gray-400 font-medium">No credit card required · Free forever plan available</p>

          {/* ── Dashboard mockup ────────────────────────────────────────── */}
          <div className="mt-16 relative max-w-4xl mx-auto">

            {/* Glow */}
            <div className="absolute -inset-4 rounded-3xl opacity-30 blur-3xl"
              style={{ background: `radial-gradient(ellipse, ${G}66, transparent 70%)` }} />

            {/* Browser chrome */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200"
              style={{ background: "#0d1117" }}>

              {/* Browser bar */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10"
                style={{ background: "#161b22" }}>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500 opacity-80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-80" />
                  <div className="w-3 h-3 rounded-full bg-green-500 opacity-80" />
                </div>
                <div className="flex-1 mx-4 h-6 rounded-md flex items-center px-3 text-xs text-gray-400"
                  style={{ background: "#0d1117", border: "1px solid rgba(255,255,255,0.08)" }}>
                  app.ielts-ai.com/speaking
                </div>
              </div>

              {/* Mock UI */}
              <div className="p-6 grid grid-cols-4 gap-0" style={{ minHeight: 280 }}>

                {/* Sidebar */}
                <div className="col-span-1 pr-4 border-r border-white/10 space-y-1">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{ background: G }}>
                      <GraduationCap className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-white text-xs font-bold">IELTS Sensei</span>
                  </div>
                  {[
                    { label: "Dashboard", icon: BarChart3, active: false },
                    { label: "Speaking",  icon: Mic,       active: true  },
                    { label: "Writing",   icon: BookOpen,  active: false },
                    { label: "Reading",   icon: BookMarked,active: false },
                  ].map(({ label, icon: Icon, active }) => (
                    <div key={label}
                      className="flex items-center gap-2 px-2 py-2 rounded-lg text-xs font-medium"
                      style={{
                        background: active ? G : "transparent",
                        color: active ? "white" : "rgba(255,255,255,0.45)",
                      }}>
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      {label}
                    </div>
                  ))}
                </div>

                {/* Main panel */}
                <div className="col-span-3 pl-5 space-y-4">
                  <div>
                    <p className="text-white text-sm font-bold mb-1">Speaking Practice</p>
                    <p className="text-gray-400 text-xs">Part 2 — Cue Card</p>
                  </div>

                  {/* Cue card */}
                  <div className="rounded-xl p-4 border" style={{ background: "rgba(5,150,105,0.08)", borderColor: "rgba(5,150,105,0.25)" }}>
                    <p className="text-white text-xs font-semibold mb-2">Describe a memorable journey you have taken.</p>
                    <div className="space-y-1">
                      {["where you went", "who you went with", "what you did there"].map((b) => (
                        <p key={b} className="text-xs text-gray-400 flex items-center gap-1.5">
                          <span style={{ color: G }}>•</span> {b}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Score cards */}
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { label: "Fluency",   score: "7.5" },
                      { label: "Vocab",     score: "8.0" },
                      { label: "Grammar",   score: "7.0" },
                      { label: "Overall",   score: "7.5", highlight: true },
                    ].map(({ label, score, highlight }) => (
                      <div key={label} className="rounded-lg p-2 text-center"
                        style={{
                          background: highlight ? G : "rgba(255,255,255,0.05)",
                          border: highlight ? "none" : "1px solid rgba(255,255,255,0.08)",
                        }}>
                        <p className="text-xs font-bold" style={{ color: highlight ? "white" : "#e5e7eb" }}>{score}</p>
                        <p className="text-[10px] mt-0.5" style={{ color: highlight ? "rgba(255,255,255,0.8)" : "#9ca3af" }}>{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          STATS BAR
      ════════════════════════════════════════════════════════════════════ */}
      <section className="border-y border-gray-100 py-10" style={{ background: "#f9fafb" }}>
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {STATS.map(({ value, label }) => (
            <div key={label}>
              <p className="text-3xl font-extrabold text-gray-900 tracking-tight">{value}</p>
              <p className="text-sm text-gray-500 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          HOW IT WORKS
      ════════════════════════════════════════════════════════════════════ */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-24">
        <SectionHeading
          badge="How It Works"
          title="From zero to band score in 3 steps"
          sub="No setup. No downloads. Open the app, practice, and get your band score in under a minute."
        />

        <div className="grid sm:grid-cols-3 gap-8">
          {STEPS.map(({ num, icon: Icon, title, desc }) => (
            <div key={num} className="relative">
              {/* Connector line */}
              <div className="hidden sm:block absolute top-8 left-full w-full h-px -ml-4 -mr-4"
                style={{ background: "linear-gradient(90deg, #e5e7eb, transparent)", zIndex: 0 }} />

              <div className="relative rounded-2xl p-7 border border-gray-100 bg-white hover:border-gray-200 hover:shadow-lg transition-all"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>

                <div className="flex items-start gap-4 mb-5">
                  <span className="text-xs font-black text-gray-300 tabular-nums leading-none pt-0.5">{num}</span>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${G}15` }}>
                    <Icon className="w-5 h-5" style={{ color: G }} />
                  </div>
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2 leading-tight">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          FEATURES
      ════════════════════════════════════════════════════════════════════ */}
      <section id="features" className="py-24" style={{ background: "#f9fafb" }}>
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading
            badge="Features"
            title="Everything you need to hit your target band"
            sub="Speaking, Writing, and Reading — all graded by AI with the same criteria as real IELTS examiners."
          />

          <div className="space-y-6">
            {FEATURES.map(({ icon: Icon, color, bg, tag, title, bullets }) => (
              <div key={tag}
                className="rounded-2xl p-8 sm:p-10 bg-white border border-gray-100 hover:shadow-lg transition-all"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                <div className="flex flex-col sm:flex-row sm:items-center gap-6">

                  {/* Icon + tag */}
                  <div className="shrink-0 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{ background: bg }}>
                      <Icon className="w-7 h-7" style={{ color }} />
                    </div>
                    <div>
                      <span className="text-xs font-bold tracking-widest uppercase"
                        style={{ color }}>
                        {tag}
                      </span>
                      <h3 className="text-xl font-extrabold text-gray-900 mt-0.5 leading-tight">{title}</h3>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="hidden sm:block w-px self-stretch bg-gray-100 mx-4" />

                  {/* Bullets */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8 flex-1">
                    {bullets.map((b) => (
                      <div key={b} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: G }} />
                        {b}
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link href="/signup"
                    className="shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold px-5 py-2.5 rounded-xl transition-all hover:brightness-110"
                    style={{ background: `${color}15`, color }}>
                    Try now <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Extra perks row */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Clock,      text: "Results in 15 seconds"     },
              { icon: TrendingUp, text: "Track progress over time"   },
              { icon: Brain,      text: "AI model answers by band"   },
              { icon: Shield,     text: "Same criteria as examiners" },
            ].map(({ icon: Icon, text }) => (
              <div key={text}
                className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-gray-100 text-sm font-medium text-gray-700"
                style={{ boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
                <Icon className="w-4 h-4 shrink-0" style={{ color: G }} />
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          TESTIMONIALS
      ════════════════════════════════════════════════════════════════════ */}
      <section id="testimonials" className="max-w-6xl mx-auto px-6 py-24">
        <SectionHeading
          badge="Student Reviews"
          title="Real students. Real band improvements."
          sub="See what students from around the world say about practising with IELTS Sensei."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TESTIMONIALS.map(({ name, flag, band, prev, text }) => (
            <div key={name}
              className="rounded-2xl p-6 bg-white border border-gray-100 flex flex-col"
              style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" style={{ color: "#f59e0b" }} />
                ))}
              </div>

              <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-5">&ldquo;{text}&rdquo;</p>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-900">{flag} {name}</p>
                  <p className="text-xs text-gray-400">Band {prev} → <span style={{ color: G }} className="font-bold">Band {band}</span></p>
                </div>
                <div className="text-2xl font-black" style={{ color: G }}>{band}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          PRICING
      ════════════════════════════════════════════════════════════════════ */}
      <section id="pricing" className="py-24" style={{ background: "#f9fafb" }}>
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeading
            badge="Pricing"
            title="Simple, honest pricing"
            sub="Start free. Upgrade when you're ready. No hidden fees, no complicated tiers."
          />

          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {PRICING.map(({ name, price, period, desc, color, cta, href, featured, perks }) => (
              <div key={name}
                className="rounded-2xl p-8 flex flex-col"
                style={{
                  background:   featured ? "#0d1117" : "white",
                  border:       featured ? `2px solid ${G}` : "1px solid #e5e7eb",
                  boxShadow:    featured ? `0 8px 32px ${G}33` : "0 2px 12px rgba(0,0,0,0.05)",
                }}>

                {featured && (
                  <span className="text-xs font-bold px-3 py-1 rounded-full self-start mb-4"
                    style={{ background: `${G}25`, color: G }}>
                    Most Popular
                  </span>
                )}

                <p className="text-sm font-bold mb-1" style={{ color: featured ? "rgba(255,255,255,0.6)" : "#6b7280" }}>{name}</p>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-4xl font-extrabold" style={{ color: featured ? "white" : "#111827" }}>{price}</span>
                  <span className="text-sm pb-1.5" style={{ color: featured ? "rgba(255,255,255,0.4)" : "#9ca3af" }}>/{period}</span>
                </div>
                <p className="text-sm mb-6" style={{ color: featured ? "rgba(255,255,255,0.5)" : "#6b7280" }}>{desc}</p>

                <ul className="space-y-3 mb-8 flex-1">
                  {perks.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm"
                      style={{ color: featured ? "rgba(255,255,255,0.8)" : "#374151" }}>
                      <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: G }} />
                      {p}
                    </li>
                  ))}
                </ul>

                <Link href={href}
                  className="w-full py-3 rounded-xl text-sm font-bold text-center transition-all hover:brightness-110 hover:scale-[1.01]"
                  style={{
                    background: featured ? G : "transparent",
                    color:      featured ? "white" : color,
                    border:     featured ? "none" : `2px solid ${color}`,
                    boxShadow:  featured ? `0 4px 16px ${G}55` : "none",
                  }}>
                  {cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          FAQ
      ════════════════════════════════════════════════════════════════════ */}
      <section id="faq" className="max-w-3xl mx-auto px-6 py-24">
        <SectionHeading
          badge="FAQ"
          title="Frequently asked questions"
        />

        <div className="space-y-3">
          {FAQS.map(({ q, a }) => (
            <details key={q}
              className="group rounded-2xl border border-gray-100 bg-white overflow-hidden"
              style={{ boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
              <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none font-semibold text-gray-900 hover:text-gray-700 transition-colors">
                {q}
                <ChevronDown className="w-4 h-4 text-gray-400 shrink-0 ml-3 group-open:rotate-180 transition-transform duration-200" />
              </summary>
              <p className="px-6 pb-5 text-sm text-gray-500 leading-relaxed border-t border-gray-50 pt-4">
                {a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          FINAL CTA
      ════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="rounded-3xl px-8 py-20 text-center text-white relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)" }}>

          {/* Background pattern */}
          <div className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px),
                                radial-gradient(circle at 80% 20%, white 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }} />

          <div className="relative">
            <Badge><Sparkles className="w-3 h-3" /> Free to start</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-6 mb-4 leading-tight">
              Your target band score<br />is closer than you think.
            </h2>
            <p className="text-emerald-200 text-base mb-10 max-w-md mx-auto leading-relaxed">
              Join 50,000+ students already improving their IELTS band score with AI-powered practice.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/signup"
                className="inline-flex items-center justify-center gap-2 px-9 py-4 rounded-2xl font-bold text-base transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: "white", color: "#064e3b", boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}>
                Start for Free
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/login"
                className="inline-flex items-center justify-center gap-2 px-9 py-4 rounded-2xl font-semibold text-base border border-emerald-500 text-white transition-all hover:bg-white/10 hover:scale-[1.02]">
                Sign in
              </Link>
            </div>
            <p className="mt-5 text-xs text-emerald-400">No credit card · Cancel anytime</p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════════════════════════════════ */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: G }}>
              <GraduationCap className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-bold text-gray-800">IELTS Sensei</span>
          </Link>

          {/* Links */}
          <div className="flex items-center gap-6 text-xs text-gray-400">
            <Link href="#features"     className="hover:text-gray-600 transition-colors">Features</Link>
            <Link href="#pricing"      className="hover:text-gray-600 transition-colors">Pricing</Link>
            <Link href="#faq"          className="hover:text-gray-600 transition-colors">FAQ</Link>
            <Link href="/login"        className="hover:text-gray-600 transition-colors">Sign In</Link>
            <Link href="/signup"       className="hover:text-gray-600 transition-colors">Sign Up</Link>
          </div>

          <p className="text-xs text-gray-400 text-center">
            Not affiliated with British Council or IDP Education.
          </p>
        </div>
      </footer>

    </div>
  );
}
