import Link from "next/link";
import {
  GraduationCap, Mic, BookOpen, BookMarked,
  Headphones, Zap, PenLine, CheckCircle2,
  Star, ArrowRight, BarChart3, Users,
} from "lucide-react";

// ── Colors ────────────────────────────────────────────────────────────────────
const G   = "#16a34a";   // green-600 — primary
const GD  = "#14532d";   // green-900 — very dark green (buttons, nav dark)
const GS  = "#f0fdf4";   // green-50  — soft green bg

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ══════════════════════════════════════════════════════════════════
          NAV
      ══════════════════════════════════════════════════════════════════ */}
      <header style={{ background: "#fff", borderBottom: "1px solid #f1f5f9", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: GD, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <GraduationCap style={{ width: "18px", height: "18px", color: "#fff" }} />
            </div>
            <span style={{ fontWeight: 700, fontSize: "15px", color: "#0f172a" }}>IELTS Sensei</span>
          </Link>

          {/* Nav links */}
          <nav style={{ display: "flex", gap: "28px", alignItems: "center" }}>
            {["Home", "Features", "Pricing", "About Us"].map((item, i) => (
              <a key={item}
                href={item === "Home" ? "/" : `#${item.toLowerCase().replace(" ", "-")}`}
                style={{
                  fontSize: "14px", fontWeight: 500, color: i === 0 ? "#0f172a" : "#64748b",
                  textDecoration: "none",
                  borderBottom: i === 0 ? `2px solid ${G}` : "none",
                  paddingBottom: i === 0 ? "2px" : "0",
                }}>
                {item}
              </a>
            ))}
          </nav>

          {/* Auth */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link href="/login" style={{ fontSize: "14px", fontWeight: 500, color: "#64748b", textDecoration: "none" }}>
              Sign in
            </Link>
            <Link href="/signup" style={{
              fontSize: "14px", fontWeight: 600, color: "#fff",
              background: G, borderRadius: "20px", padding: "8px 20px",
              textDecoration: "none", display: "inline-block",
            }}>
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: "#edf2ee", padding: "64px 24px 72px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "center" }}>

          {/* Left: Text */}
          <div>
            {/* Badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#fff", border: `1px solid ${G}40`, borderRadius: "20px", padding: "5px 12px 5px 5px", marginBottom: "24px" }}>
              <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: G, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CheckCircle2 style={{ width: "12px", height: "12px", color: "#fff" }} />
              </div>
              <span style={{ fontSize: "12px", fontWeight: 600, color: GD }}>The World&apos;s #1 AI IELTS Coach</span>
            </div>

            <h1 style={{ fontSize: "48px", fontWeight: 800, lineHeight: 1.1, color: "#0f172a", marginBottom: "8px" }}>
              Master Your IELTS
            </h1>
            <h1 style={{ fontSize: "48px", fontWeight: 800, lineHeight: 1.1, color: GD, marginBottom: "20px" }}>
              with AI Sensei
            </h1>

            <p style={{ fontSize: "15px", color: "#475569", lineHeight: 1.65, marginBottom: "32px", maxWidth: "420px" }}>
              The best AI Simulator for IELTS Speaking, Writing, and Listening parts 1, 2, and 3
              with instant grading and empathetic feedback.
            </p>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link href="/signup" style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                background: GD, color: "#fff", borderRadius: "8px",
                padding: "12px 24px", fontSize: "14px", fontWeight: 600,
                textDecoration: "none",
              }}>
                Start Now <ArrowRight style={{ width: "16px", height: "16px" }} />
              </Link>
              <Link href="/login" style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                background: "#fff", color: "#0f172a", borderRadius: "8px",
                border: "1.5px solid #cbd5e1", padding: "12px 24px",
                fontSize: "14px", fontWeight: 600, textDecoration: "none",
              }}>
                View Demo
              </Link>
            </div>
          </div>

          {/* Right: Visual */}
          <div style={{ display: "flex", justifyContent: "center", position: "relative" }}>

            {/* Circle with gradient + icon (photo replacement) */}
            <div style={{
              width: "340px", height: "340px", borderRadius: "50%",
              background: "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 40%, #6ee7b7 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative", boxShadow: "0 20px 60px rgba(22,163,74,0.2)",
            }}>
              {/* Inner circle with darker bg */}
              <div style={{
                width: "280px", height: "280px", borderRadius: "50%",
                background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexDirection: "column", gap: "8px",
              }}>
                <Users style={{ width: "64px", height: "64px", color: "rgba(255,255,255,0.9)" }} />
                <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "13px", fontWeight: 600 }}>AI Examiner</p>
              </div>

              {/* 8.5 Band badge — top right */}
              <div style={{
                position: "absolute", top: "20px", right: "-10px",
                background: "#fff", borderRadius: "10px", padding: "10px 14px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
                textAlign: "center", minWidth: "70px",
              }}>
                <p style={{ fontSize: "22px", fontWeight: 800, color: GD, lineHeight: 1 }}>8.5</p>
                <p style={{ fontSize: "10px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px", marginTop: "2px" }}>SPEAKING</p>
              </div>

              {/* Analyzing chip — bottom */}
              <div style={{
                position: "absolute", bottom: "24px", left: "50%", transform: "translateX(-50%)",
                background: "#0f172a", borderRadius: "20px", padding: "8px 14px",
                display: "flex", alignItems: "center", gap: "6px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                whiteSpace: "nowrap",
              }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: G, animation: "pulse 1.5s infinite" }} />
                <span style={{ fontSize: "12px", fontWeight: 600, color: "#fff" }}>Sensei Analyzing...</span>
              </div>
            </div>

            {/* Small floating card — left side */}
            <div style={{
              position: "absolute", left: "-20px", top: "50%", transform: "translateY(-50%)",
              background: "#fff", borderRadius: "12px", padding: "12px 16px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
            }}>
              <p style={{ fontSize: "10px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>Avg Improvement</p>
              <p style={{ fontSize: "20px", fontWeight: 800, color: GD }}>+1.5</p>
              <p style={{ fontSize: "11px", color: G, fontWeight: 600 }}>Band Score</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: "#0d1a10", padding: "36px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr auto", gap: "40px", alignItems: "center" }}>
          <div>
            <p style={{ fontSize: "20px", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>
              Helping 2,400+ students achieve Band 8.0
            </p>
            <p style={{ fontSize: "13px", color: "#6b7280" }}>
              Trusted by global learners from over 45 countries.
            </p>
          </div>
          <div style={{ display: "flex", gap: "48px" }}>
            {[
              { val: "98%",  label: "Success Rate"   },
              { val: "150k+",label: "Tests Taken"    },
              { val: "4.9/5",label: "Student Rating" },
            ].map(({ val, label }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <p style={{ fontSize: "24px", fontWeight: 800, color: "#4ade80", lineHeight: 1 }}>{val}</p>
                <p style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          WHY CHOOSE — 2×2 FEATURE GRID
      ══════════════════════════════════════════════════════════════════ */}
      <section id="features" style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

          {/* Heading */}
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2 style={{ fontSize: "32px", fontWeight: 800, color: "#0f172a", marginBottom: "12px" }}>
              Why choose IELTS Sensei?
            </h2>
            <p style={{ fontSize: "15px", color: "#64748b", maxWidth: "500px", margin: "0 auto", lineHeight: 1.6 }}>
              Our AI doesn&apos;t just grade you—it understands your unique speaking patterns
              and writing style to provide coaching that feels human.
            </p>
          </div>

          {/* 2×2 grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>

            {/* Card 1 — Speaking Simulator (white) */}
            <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "32px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                <Users style={{ width: "22px", height: "22px", color: G }} />
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a", marginBottom: "10px" }}>
                Real-time Speaking Simulator
              </h3>
              <p style={{ fontSize: "13.5px", color: "#64748b", lineHeight: 1.6, marginBottom: "20px" }}>
                Practice with an interactive AI avatar that responds to your answers in real-time,
                simulating the pressure and flow of a live examiner.
              </p>
              <Link href="/signup" style={{
                fontSize: "13px", fontWeight: 600, color: G,
                textDecoration: "none", display: "flex", alignItems: "center", gap: "4px",
              }}>
                Try Simulator <ArrowRight style={{ width: "14px", height: "14px" }} />
              </Link>
            </div>

            {/* Card 2 — Instant AI Feedback (dark green) */}
            <div style={{ background: GD, border: "none", borderRadius: "16px", padding: "32px" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                <Zap style={{ width: "22px", height: "22px", color: "#fff" }} />
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#fff", marginBottom: "10px" }}>
                Instant AI Feedback
              </h3>
              <p style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.65)", lineHeight: 1.6, marginBottom: "20px" }}>
                Get your band score and detailed breakdown within 30 seconds of finishing.
                No more waiting days for results.
              </p>
              {/* Sample feedback chip */}
              <div style={{
                background: "rgba(255,255,255,0.1)", borderRadius: "10px",
                padding: "12px 14px", fontSize: "12.5px", color: "rgba(255,255,255,0.85)",
                fontStyle: "italic", lineHeight: 1.5,
              }}>
                &ldquo;Sensei Tip: Your fluency is improving, but focus on varied linking words in Part 2.&rdquo;
              </div>
            </div>

            {/* Card 3 — Writing Analysis (white) */}
            <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "32px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: "#fefce8", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                <PenLine style={{ width: "22px", height: "22px", color: "#d97706" }} />
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a", marginBottom: "10px" }}>
                Comprehensive Writing Analysis
              </h3>
              <p style={{ fontSize: "13.5px", color: "#64748b", lineHeight: 1.6, marginBottom: "20px" }}>
                Our engine analyzes Task Response, Cohesion, Vocabulary, and Grammar
                using the official IELTS rubric.
              </p>
              {/* Animated lines */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {[100, 75, 90].map((w, i) => (
                  <div key={i} style={{ height: "6px", borderRadius: "3px", background: "#f1f5f9", overflow: "hidden" }}>
                    <div style={{ width: `${w}%`, height: "100%", background: G, borderRadius: "3px" }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Card 4 — Adaptive Listening (dashed / coming soon) */}
            <div style={{
              background: "#fafafa", border: "2px dashed #e2e8f0",
              borderRadius: "16px", padding: "32px",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              textAlign: "center",
            }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                <Headphones style={{ width: "22px", height: "22px", color: "#94a3b8" }} />
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>
                Adaptive Listening
              </h3>
              <p style={{ fontSize: "13.5px", color: "#94a3b8", lineHeight: 1.6 }}>
                Coming Soon: AI-generated tracks tailored to your weak points.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════════════════════════ */}
      <section id="testimonials" style={{ background: "#f8fafc", padding: "72px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2 style={{ fontSize: "30px", fontWeight: 800, color: "#0f172a", marginBottom: "10px" }}>
              Real students. Real band improvements.
            </h2>
            <p style={{ fontSize: "14px", color: "#64748b" }}>
              From Uzbekistan to India — students worldwide are hitting their target bands.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
            {[
              { name: "Dilnoza T.", flag: "🇺🇿", band: "7.5", prev: "6.0", text: "I went from 6.0 to 7.5 in 6 weeks. The speaking feedback is unreal — it caught pronunciation mistakes my teacher never noticed." },
              { name: "Arjun P.",   flag: "🇮🇳", band: "8.0", prev: "6.5", text: "The instant band score after every essay is what made the difference. I could practice 10 essays a day and see progress immediately." },
              { name: "Yuna K.",   flag: "🇰🇷", band: "7.0", prev: "5.5", text: "The full mock test feature is incredible. It's exactly like the real exam. I walked in on test day completely calm." },
              { name: "Fatima A.", flag: "🇸🇦", band: "8.5", prev: "7.0", text: "Best IELTS prep tool I've ever used. The model answers at different band levels taught me exactly what examiners want." },
            ].map(({ name, flag, band, prev, text }) => (
              <div key={name} style={{ background: "#fff", borderRadius: "14px", padding: "22px", border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                <div style={{ display: "flex", gap: "2px", marginBottom: "12px" }}>
                  {[...Array(5)].map((_, i) => <Star key={i} style={{ width: "13px", height: "13px", fill: "#f59e0b", color: "#f59e0b" }} />)}
                </div>
                <p style={{ fontSize: "13px", color: "#475569", lineHeight: 1.6, marginBottom: "16px" }}>&ldquo;{text}&rdquo;</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <p style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a" }}>{flag} {name}</p>
                    <p style={{ fontSize: "11px", color: "#94a3b8" }}>Band {prev} → <span style={{ color: G, fontWeight: 700 }}>Band {band}</span></p>
                  </div>
                  <span style={{ fontSize: "22px", fontWeight: 800, color: GD }}>{band}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          PRICING
      ══════════════════════════════════════════════════════════════════ */}
      <section id="pricing" style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2 style={{ fontSize: "30px", fontWeight: 800, color: "#0f172a", marginBottom: "10px" }}>Simple, honest pricing</h2>
            <p style={{ fontSize: "14px", color: "#64748b" }}>Start free. Upgrade when you&apos;re ready. No hidden fees.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            {[
              { name: "Free", price: "$0", period: "forever", featured: false, cta: "Start for Free", href: "/signup",
                perks: ["3 AI scores per week", "Speaking Parts 1, 2 & 3", "Writing Task 1 & Task 2", "Reading practice", "Band scores + feedback"] },
              { name: "Pro", price: "$12", period: "per month", featured: true, cta: "Get Pro →", href: "/signup",
                perks: ["Unlimited AI scores", "Full mock test mode", "Band 5–8+ model answers", "Vocabulary upgrades", "Priority AI processing"] },
            ].map(({ name, price, period, featured, cta, href, perks }) => (
              <div key={name} style={{
                background: featured ? GD : "#fff",
                border: featured ? "none" : "1px solid #e2e8f0",
                borderRadius: "16px", padding: "28px",
                boxShadow: featured ? `0 8px 32px ${GD}33` : "0 2px 8px rgba(0,0,0,0.04)",
              }}>
                {featured && (
                  <span style={{ fontSize: "11px", fontWeight: 700, background: "rgba(255,255,255,0.15)", color: "#fff", borderRadius: "20px", padding: "4px 12px", display: "inline-block", marginBottom: "12px" }}>
                    Most Popular
                  </span>
                )}
                <p style={{ fontSize: "13px", fontWeight: 600, color: featured ? "rgba(255,255,255,0.6)" : "#6b7280", marginBottom: "4px" }}>{name}</p>
                <div style={{ marginBottom: "4px" }}>
                  <span style={{ fontSize: "36px", fontWeight: 800, color: featured ? "#fff" : "#0f172a" }}>{price}</span>
                  <span style={{ fontSize: "13px", color: featured ? "rgba(255,255,255,0.4)" : "#9ca3af" }}>/{period}</span>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: "20px 0 24px", display: "flex", flexDirection: "column", gap: "10px" }}>
                  {perks.map(p => (
                    <li key={p} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: featured ? "rgba(255,255,255,0.8)" : "#374151" }}>
                      <CheckCircle2 style={{ width: "15px", height: "15px", color: featured ? "#4ade80" : G, flexShrink: 0 }} />
                      {p}
                    </li>
                  ))}
                </ul>
                <Link href={href} style={{
                  display: "block", textAlign: "center", padding: "11px",
                  borderRadius: "8px", fontSize: "14px", fontWeight: 600,
                  background: featured ? "#fff" : "transparent",
                  color: featured ? GD : G,
                  border: featured ? "none" : `2px solid ${G}`,
                  textDecoration: "none",
                }}>
                  {cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CTA CARD
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "0 24px 80px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <div style={{
            background: "#f8fafc", border: "1px solid #e2e8f0",
            borderRadius: "20px", padding: "64px 40px", textAlign: "center",
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
          }}>
            <h2 style={{ fontSize: "34px", fontWeight: 800, color: "#0f172a", marginBottom: "12px" }}>
              Ready to hit Band 8.0?
            </h2>
            <p style={{ fontSize: "15px", color: "#64748b", marginBottom: "32px", lineHeight: 1.6 }}>
              Join thousands of students who have already transformed their IELTS prep<br />
              with Sensei&apos;s empathetic guidance.
            </p>
            <Link href="/signup" style={{
              display: "inline-block", background: GD, color: "#fff",
              borderRadius: "30px", padding: "14px 40px",
              fontSize: "15px", fontWeight: 700, textDecoration: "none",
              boxShadow: `0 6px 20px ${GD}44`,
            }}>
              Get Started for Free
            </Link>
            <p style={{ fontSize: "12px", color: "#94a3b8", marginTop: "14px" }}>
              No credit card required • Instant access
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════════════════ */}
      <footer style={{ background: "#0d1a10", padding: "56px 24px 28px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

          {/* 4-column grid */}
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "48px", marginBottom: "48px" }}>

            {/* Col 1 — Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <div style={{ width: "28px", height: "28px", borderRadius: "6px", background: G, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <GraduationCap style={{ width: "16px", height: "16px", color: "#fff" }} />
                </div>
                <span style={{ fontSize: "14px", fontWeight: 700, color: "#fff" }}>IELTS Sensei</span>
              </div>
              <p style={{ fontSize: "12.5px", color: "#6b7280", lineHeight: 1.6, maxWidth: "200px" }}>
                Empathetic AI coaching for global success. Your personal mentor for the IELTS examination.
              </p>
            </div>

            {/* Col 2 — Product */}
            <div>
              <p style={{ fontSize: "11px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "16px" }}>PRODUCT</p>
              {["Speaking Lab", "Writing Coach", "Pricing Plans"].map(link => (
                <Link key={link} href="/signup" style={{ display: "block", fontSize: "13px", color: "#6b7280", textDecoration: "none", marginBottom: "10px" }}>
                  {link}
                </Link>
              ))}
            </div>

            {/* Col 3 — Support */}
            <div>
              <p style={{ fontSize: "11px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "16px" }}>SUPPORT</p>
              {["Help Center", "Contact Support", "Blog"].map(link => (
                <a key={link} href="#" style={{ display: "block", fontSize: "13px", color: "#6b7280", textDecoration: "none", marginBottom: "10px" }}>
                  {link}
                </a>
              ))}
            </div>

            {/* Col 4 — Legal */}
            <div>
              <p style={{ fontSize: "11px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "16px" }}>LEGAL</p>
              {["Privacy Policy", "Terms of Service", "Cookie Settings"].map(link => (
                <a key={link} href="#" style={{ display: "block", fontSize: "13px", color: "#6b7280", textDecoration: "none", marginBottom: "10px" }}>
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "24px" }}>
            <p style={{ fontSize: "12px", color: "#4b5563", textAlign: "center" }}>
              © 2024 IELTS Sensei. Empathetic AI coaching for global success.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
