import type { Metadata } from "next";
import Link from "next/link";

const BASE_URL = "https://ieltssensei.uz";

export const metadata: Metadata = {
  title: "IELTS Sensei | O'zbekistonda AI bilan IELTS tayyorgarlik",
  description:
    "IELTS Sensei — O'zbekiston uchun AI yordamida IELTS tayyorgarlik platformasi. Toshkent va butun O'zbekiston bo'ylab band score oshiring.",
  keywords: [
    "IELTS tayyorgarlik Toshkent",
    "IELTS kurslari O'zbekiston",
    "IELTS AI mashq",
    "IELTS band score oshirish",
    "IELTS Sensei",
    "ieltssensei.uz",
    "IELTS onlayn",
    "IELTS imtihon Toshkent",
  ],
  alternates: {
    canonical: `${BASE_URL}/uz`,
    languages: {
      en:          BASE_URL,
      "uz-UZ":     `${BASE_URL}/uz`,
      "x-default": BASE_URL,
    },
  },
  openGraph: {
    title:       "IELTS Sensei | O'zbekistonda AI bilan IELTS tayyorgarlik",
    description: "IELTS Sensei — O'zbekiston uchun AI yordamida IELTS tayyorgarlik platformasi. Toshkent va butun O'zbekiston bo'ylab band score oshiring.",
    url:         `${BASE_URL}/uz`,
    siteName:    "IELTS Sensei",
    type:        "website",
    locale:      "uz_UZ",
    images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "IELTS Sensei Uzbekiston" }],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "IELTS Sensei | O'zbekistonda AI bilan IELTS tayyorgarlik",
    description: "AI yordamida IELTS tayyorgarlik. Toshkent va O'zbekiston uchun.",
    images:      [`${BASE_URL}/og-image.png`],
  },
  robots: { index: true, follow: true },
};

export default function UzbekHomePage() {
  return (
    <main lang="uz" style={{ fontFamily: "var(--font-jakarta, sans-serif)", background: "#fff", color: "#0f172a", minHeight: "100vh" }}>

      {/* Nav */}
      <nav style={{ borderBottom: "1px solid #e2e8f0", padding: "1rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 1200, margin: "0 auto" }}>
        <Link href="/uz" style={{ fontWeight: 800, fontSize: "1.25rem", color: "#dc2626", textDecoration: "none" }}>
          IELTS Sensei
        </Link>
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          <Link href={BASE_URL} style={{ fontSize: "0.875rem", color: "#64748b", textDecoration: "none" }}>🇬🇧 English</Link>
          <Link href="/signup" style={{ background: "#dc2626", color: "#fff", padding: "0.5rem 1.25rem", borderRadius: "0.5rem", fontWeight: 600, fontSize: "0.875rem", textDecoration: "none" }}>
            Bepul boshlash
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ textAlign: "center", padding: "5rem 1.5rem 4rem", maxWidth: 800, margin: "0 auto" }}>
        <div style={{ display: "inline-block", background: "#fef2f2", color: "#dc2626", borderRadius: 999, padding: "0.4rem 1rem", fontSize: "0.8rem", fontWeight: 600, marginBottom: "1.5rem" }}>
          🇺🇿 O'zbekiston #1 IELTS AI Platformasi
        </div>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, lineHeight: 1.15, marginBottom: "1.5rem", letterSpacing: "-0.03em" }}>
          AI bilan <span style={{ color: "#dc2626" }}>IELTS</span> ballini<br />15 soniyada oling
        </h1>
        <p style={{ fontSize: "1.125rem", color: "#475569", lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: 600, margin: "0 auto 2.5rem" }}>
          Toshkent, Samarqand, Farg&apos;ona va Buxoro talabalari uchun.
          Yozish va Gapirish bo&apos;yicha haqiqiy imtihonchi darajasida
          AI baholash — bepul boshlang.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/signup" style={{ background: "#dc2626", color: "#fff", padding: "0.875rem 2rem", borderRadius: "0.75rem", fontWeight: 700, fontSize: "1rem", textDecoration: "none", display: "inline-block" }}>
            Bepul ro&apos;yxatdan o&apos;ting →
          </Link>
          <Link href="/demo" style={{ background: "#fff", color: "#0f172a", border: "1px solid #e2e8f0", padding: "0.875rem 2rem", borderRadius: "0.75rem", fontWeight: 600, fontSize: "1rem", textDecoration: "none", display: "inline-block" }}>
            Demo ko&apos;rish
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: "#fafafa", padding: "3rem 1.5rem", borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "3rem", flexWrap: "wrap", maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          {[
            { num: "10 000+", label: "Faol talaba" },
            { num: "4.9/5", label: "O'rtacha baho" },
            { num: "15 son", label: "AI baholash vaqti" },
            { num: "Band 7+", label: "O'rtacha natija" },
          ].map(({ num, label }) => (
            <div key={label}>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "#dc2626" }}>{num}</div>
              <div style={{ fontSize: "0.875rem", color: "#64748b", marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section style={{ padding: "4rem 1.5rem", maxWidth: 1100, margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", fontSize: "2rem", fontWeight: 800, marginBottom: "2.5rem" }}>
          Barcha 4 ko&apos;nikma — bitta platformada
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem" }}>
          {[
            { href: "/writing",   emoji: "✍️", title: "Yozish",    desc: "Task 1 va Task 2. AI 15 soniyada TR, CC, LR, GRA mezonlarini baholaydi." },
            { href: "/speaking",  emoji: "🎤", title: "Gapirish",  desc: "1, 2, 3-qismlar. Talaffuz, grammatika, ravonlik — AI tahlili." },
            { href: "/reading",   emoji: "📖", title: "O'qish",    desc: "Academic va General. 10 000+ savol, vaqt cheklovli rejim." },
            { href: "/listening", emoji: "🎧", title: "Eshitish",  desc: "Cambridge formati. 4 bo'lim, 40 savol, bir marta audio." },
          ].map(({ href, emoji, title, desc }) => (
            <Link key={href} href={href} style={{ display: "block", border: "1px solid #e2e8f0", borderRadius: "1rem", padding: "1.5rem", textDecoration: "none", color: "inherit" }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{emoji}</div>
              <div style={{ fontWeight: 700, fontSize: "1.125rem", marginBottom: "0.5rem" }}>{title}</div>
              <div style={{ fontSize: "0.875rem", color: "#64748b", lineHeight: 1.6 }}>{desc}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#dc2626", color: "#fff", textAlign: "center", padding: "4rem 1.5rem" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "1rem" }}>
          Bugun boshlang — bepul
        </h2>
        <p style={{ color: "#fecaca", marginBottom: "2rem", maxWidth: 500, margin: "0 auto 2rem" }}>
          Kredit karta kerak emas. Ro&apos;yxatdan o&apos;ting va birinchi AI bahongizni 2 daqiqada oling.
        </p>
        <Link href="/signup" style={{ background: "#fff", color: "#dc2626", padding: "0.875rem 2.5rem", borderRadius: "0.75rem", fontWeight: 700, fontSize: "1rem", textDecoration: "none", display: "inline-block" }}>
          Bepul ro&apos;yxatdan o&apos;ting →
        </Link>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #e2e8f0", padding: "2rem 1.5rem", textAlign: "center", color: "#94a3b8", fontSize: "0.875rem" }}>
        <p>© 2025 IELTS Sensei · <Link href={BASE_URL} style={{ color: "#dc2626", textDecoration: "none" }}>ieltssensei.uz</Link> · Toshkent, O&apos;zbekiston</p>
        <p style={{ marginTop: "0.5rem" }}>
          <Link href={BASE_URL} style={{ color: "#94a3b8", marginRight: "1rem", textDecoration: "none" }}>🇬🇧 English</Link>
          <Link href="/uz" style={{ color: "#dc2626", textDecoration: "none" }}>🇺🇿 O&apos;zbek</Link>
        </p>
      </footer>

    </main>
  );
}
