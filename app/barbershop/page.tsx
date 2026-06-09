"use client";

import { useState, useEffect, useRef } from "react";
import { translations, type Lang } from "./components/translations";

// ─── Utility ────────────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── Reveal wrapper ──────────────────────────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}) {
  const { ref, inView } = useInView();
  const transforms: Record<string, string> = {
    up: "translateY(40px)",
    left: "translateX(-40px)",
    right: "translateX(40px)",
    none: "none",
  };
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : transforms[direction],
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Color tokens ────────────────────────────────────────────────────────────
const GOLD = "#C89B3C";
const GOLD_DARK = "#A57C2A";
const BLACK = "#111111";
const BG = "#F8F6F2";
const TEXT = "#1A1A1A";
const TEXT_MUTED = "#6B6B6B";

// ─── Shared styles ───────────────────────────────────────────────────────────
const displayFont = { fontFamily: "var(--font-display), 'Bebas Neue', sans-serif" };
const headingFont = { fontFamily: "var(--font-heading), 'Oswald', sans-serif" };
const bodyFont = { fontFamily: "var(--font-body), 'IBM Plex Sans', sans-serif" };

// ─── Navbar ──────────────────────────────────────────────────────────────────
function Navbar({ lang, setLang, t }: { lang: Lang; setLang: (l: Lang) => void; t: (typeof translations)[Lang] }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { label: t.nav.services, href: "#xizmatlar" },
    { label: t.nav.pricing, href: "#narxlar" },
    { label: t.nav.gallery, href: "#galereya" },
    { label: t.nav.barbers, href: "#ustalar" },
    { label: t.nav.contact, href: "#manzil" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "background 0.4s ease, box-shadow 0.4s ease, padding 0.3s ease",
        background: scrolled ? "rgba(17,17,17,0.97)" : "transparent",
        boxShadow: scrolled ? "0 2px 40px rgba(0,0,0,0.4)" : "none",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        padding: scrolled ? "14px 0" : "24px 0",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <a href="#" style={{ textDecoration: "none", display: "flex", flexDirection: "column", lineHeight: 1 }}>
          <span style={{ ...displayFont, fontSize: 28, color: GOLD, letterSpacing: "0.1em" }}>BARBER</span>
          <span style={{ ...headingFont, fontSize: 11, color: "#fff", letterSpacing: "0.35em", fontWeight: 300 }}>CRAFT</span>
        </a>

        {/* Desktop Links */}
        <div style={{ display: "flex", gap: 36, alignItems: "center" }} className="desktop-nav">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                ...bodyFont,
                color: "#ccc",
                textDecoration: "none",
                fontSize: 13,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontWeight: 500,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#ccc")}
            >
              {l.label}
            </a>
          ))}

          {/* Language switcher */}
          <div style={{ display: "flex", gap: 2, background: "rgba(255,255,255,0.08)", borderRadius: 4, padding: 3 }}>
            {(["uz", "ru"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{
                  ...bodyFont,
                  background: lang === l ? GOLD : "transparent",
                  color: lang === l ? BLACK : "#888",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px 10px",
                  borderRadius: 3,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  transition: "all 0.2s",
                  textTransform: "uppercase",
                }}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <a
            href="#band-qilish"
            style={{
              ...bodyFont,
              background: GOLD,
              color: BLACK,
              border: "none",
              padding: "11px 24px",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
              cursor: "pointer",
              transition: "background 0.2s, transform 0.2s",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = GOLD_DARK;
              (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = GOLD;
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            {t.nav.book}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "none" }}
          aria-label="Menu"
        >
          <div style={{ width: 24, height: 2, background: GOLD, marginBottom: 5, transition: "transform 0.2s" }} />
          <div style={{ width: 18, height: 2, background: GOLD, marginBottom: 5 }} />
          <div style={{ width: 24, height: 2, background: GOLD }} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            background: "rgba(17,17,17,0.98)",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{ ...bodyFont, color: "#ccc", textDecoration: "none", fontSize: 14, letterSpacing: "0.1em", textTransform: "uppercase" }}
            >
              {l.label}
            </a>
          ))}
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 8 }}>
            {(["uz", "ru"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{
                  background: lang === l ? GOLD : "transparent",
                  color: lang === l ? BLACK : "#888",
                  border: `1px solid ${lang === l ? GOLD : "#444"}`,
                  cursor: "pointer",
                  padding: "6px 14px",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {l.toUpperCase()}
              </button>
            ))}
            <a
              href="#band-qilish"
              onClick={() => setMenuOpen(false)}
              style={{
                background: GOLD,
                color: BLACK,
                padding: "8px 20px",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textDecoration: "none",
                marginLeft: "auto",
              }}
            >
              {t.nav.book}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────
function Hero({ t }: { t: (typeof translations)[Lang] }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <section
      id="top"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: BLACK,
      }}
    >
      {/* Background image from Unsplash */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url('https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1920&q=85&auto=format&fit=crop')`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          transform: "scale(1.04)",
          transition: "transform 8s ease",
          filter: "brightness(0.35) saturate(0.8)",
        }}
      />

      {/* Cinematic gradient overlay */}
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, rgba(17,17,17,0.9) 40%, rgba(17,17,17,0.3) 100%)` }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, rgba(17,17,17,0.8) 0%, transparent 60%)` }} />

      {/* Gold accent line */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: `linear-gradient(to bottom, transparent, ${GOLD}, transparent)` }} />

      <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto", padding: "0 24px", width: "100%" }}>
        <div style={{ maxWidth: 720 }}>
          {/* Pre-title */}
          <div
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "none" : "translateY(20px)",
              transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
            }}
          >
            <span style={{
              ...bodyFont,
              color: GOLD,
              fontSize: 11,
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              fontWeight: 600,
              display: "block",
              marginBottom: 28,
            }}>
              — PREMIUM BARBERSHOP · TOSHKENT
            </span>
          </div>

          {/* Headline */}
          <h1
            style={{
              ...displayFont,
              fontSize: "clamp(52px, 8vw, 110px)",
              color: "#fff",
              lineHeight: 0.95,
              margin: "0 0 28px",
              letterSpacing: "0.02em",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "none" : "translateY(30px)",
              transition: "opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s",
            }}
          >
            {t.hero.headline.split(" ").slice(0, 3).join(" ")}
            <br />
            <span style={{ color: GOLD }}>{t.hero.headline.split(" ").slice(3).join(" ")}</span>
          </h1>

          {/* Sub */}
          <p
            style={{
              ...bodyFont,
              color: "rgba(255,255,255,0.65)",
              fontSize: "clamp(15px, 2vw, 18px)",
              lineHeight: 1.7,
              maxWidth: 480,
              margin: "0 0 48px",
              fontWeight: 300,
              opacity: loaded ? 1 : 0,
              transform: loaded ? "none" : "translateY(20px)",
              transition: "opacity 0.8s ease 0.6s, transform 0.8s ease 0.6s",
            }}
          >
            {t.hero.sub}
          </p>

          {/* CTAs */}
          <div
            style={{
              display: "flex",
              gap: 16,
              flexWrap: "wrap",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "none" : "translateY(20px)",
              transition: "opacity 0.8s ease 0.8s, transform 0.8s ease 0.8s",
            }}
          >
            <a
              href="#band-qilish"
              style={{
                ...bodyFont,
                background: GOLD,
                color: BLACK,
                padding: "16px 40px",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                textDecoration: "none",
                display: "inline-block",
                transition: "background 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = GOLD_DARK;
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = GOLD;
                (e.currentTarget as HTMLElement).style.transform = "none";
              }}
            >
              {t.hero.cta1}
            </a>
            <a
              href="#narxlar"
              style={{
                ...bodyFont,
                background: "transparent",
                color: "#fff",
                padding: "15px 40px",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                textDecoration: "none",
                display: "inline-block",
                border: "1px solid rgba(255,255,255,0.3)",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = GOLD;
                (e.currentTarget as HTMLElement).style.color = GOLD;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.3)";
                (e.currentTarget as HTMLElement).style.color = "#fff";
              }}
            >
              {t.hero.cta2}
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute",
        bottom: 40,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        opacity: 0.5,
      }}>
        <span style={{ ...bodyFont, color: "#fff", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase" }}>{t.hero.scroll}</span>
        <div style={{
          width: 1,
          height: 48,
          background: `linear-gradient(to bottom, ${GOLD}, transparent)`,
          animation: "scrollPulse 2s ease infinite",
        }} />
      </div>
    </section>
  );
}

// ─── Trust Stats ─────────────────────────────────────────────────────────────
function Trust({ t }: { t: (typeof translations)[Lang] }) {
  const stats = [
    { value: "5000+", label: t.trust.clients },
    { value: "4.9", label: t.trust.rating },
    { value: "7+", label: t.trust.experience },
    { value: "10 000+", label: t.trust.cuts },
  ];

  return (
    <section style={{ background: BLACK, padding: "0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          borderTop: `1px solid rgba(200,155,60,0.2)`,
        }}>
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 100}>
              <div
                style={{
                  padding: "52px 32px",
                  textAlign: "center",
                  borderRight: i < 3 ? `1px solid rgba(200,155,60,0.15)` : "none",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(200,155,60,0.05)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                <div style={{ ...displayFont, fontSize: "clamp(40px, 5vw, 64px)", color: GOLD, lineHeight: 1, marginBottom: 10 }}>
                  {s.value}
                </div>
                <div style={{ ...bodyFont, color: "rgba(255,255,255,0.45)", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500 }}>
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Services ────────────────────────────────────────────────────────────────
function Services({ t }: { t: (typeof translations)[Lang] }) {
  return (
    <section id="xizmatlar" style={{ background: BG, padding: "120px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <Reveal>
          <div style={{ marginBottom: 80, maxWidth: 560 }}>
            <span style={{ ...bodyFont, color: GOLD, fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", fontWeight: 600, display: "block", marginBottom: 16 }}>
              — {t.nav.services}
            </span>
            <h2 style={{ ...displayFont, fontSize: "clamp(40px, 5vw, 72px)", color: TEXT, lineHeight: 0.95, margin: "0 0 20px", letterSpacing: "0.02em" }}>
              {t.services.title}
            </h2>
            <p style={{ ...bodyFont, color: TEXT_MUTED, fontSize: 16, lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
              {t.services.sub}
            </p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 1, background: "rgba(0,0,0,0.08)" }}>
          {t.services.items.map((svc, i) => (
            <Reveal key={i} delay={i * 80} direction="none">
              <div
                style={{
                  background: "#fff",
                  padding: "44px 40px",
                  position: "relative",
                  overflow: "hidden",
                  cursor: "default",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(-4px)";
                  el.style.boxShadow = "0 20px 60px rgba(200,155,60,0.12)";
                  const bar = el.querySelector(".svc-bar") as HTMLElement;
                  if (bar) bar.style.width = "100%";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "none";
                  el.style.boxShadow = "none";
                  const bar = el.querySelector(".svc-bar") as HTMLElement;
                  if (bar) bar.style.width = "0%";
                }}
              >
                <div className="svc-bar" style={{ position: "absolute", bottom: 0, left: 0, height: 2, width: "0%", background: GOLD, transition: "width 0.4s ease" }} />

                <div style={{ fontSize: 32, marginBottom: 20 }}>{svc.icon}</div>
                <h3 style={{ ...headingFont, fontSize: 22, color: TEXT, margin: "0 0 12px", letterSpacing: "0.04em", fontWeight: 600 }}>{svc.name}</h3>
                <p style={{ ...bodyFont, color: TEXT_MUTED, fontSize: 14, lineHeight: 1.7, margin: "0 0 28px", fontWeight: 300 }}>{svc.desc}</p>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                  <div>
                    <div style={{ ...bodyFont, color: TEXT_MUTED, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 4 }}>
                      {svc.duration} {t.services.min}
                    </div>
                    <div style={{ ...headingFont, color: GOLD, fontSize: 20, fontWeight: 600 }}>
                      {t.services.from} {svc.price} <span style={{ fontSize: 12, fontWeight: 400, color: TEXT_MUTED }}>so&apos;m</span>
                    </div>
                  </div>
                  <div style={{ width: 36, height: 36, border: `1px solid ${GOLD}`, display: "flex", alignItems: "center", justifyContent: "center", color: GOLD, fontSize: 18 }}>
                    →
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Pricing ─────────────────────────────────────────────────────────────────
function Pricing({ t }: { t: (typeof translations)[Lang] }) {
  return (
    <section id="narxlar" style={{ background: BLACK, padding: "120px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 80 }}>
            <span style={{ ...bodyFont, color: GOLD, fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", fontWeight: 600, display: "block", marginBottom: 16 }}>
              — {t.nav.pricing}
            </span>
            <h2 style={{ ...displayFont, fontSize: "clamp(40px, 5vw, 72px)", color: "#fff", lineHeight: 0.95, margin: "0 0 20px" }}>
              {t.pricing.title}
            </h2>
            <p style={{ ...bodyFont, color: "rgba(255,255,255,0.45)", fontSize: 16, margin: 0 }}>{t.pricing.sub}</p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 2, maxWidth: 960, margin: "0 auto" }}>
          {t.pricing.plans.map((plan, i) => {
            const isPopular = "popular" in plan && plan.popular;
            return (
              <Reveal key={i} delay={i * 120}>
                <div
                  style={{
                    background: isPopular ? GOLD : "rgba(255,255,255,0.04)",
                    border: isPopular ? "none" : "1px solid rgba(255,255,255,0.08)",
                    padding: "52px 40px",
                    position: "relative",
                    transition: "transform 0.3s",
                  }}
                  onMouseEnter={(e) => { if (!isPopular) (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "none"; }}
                >
                  {isPopular && (
                    <div style={{
                      position: "absolute",
                      top: -1,
                      left: 40,
                      right: 40,
                      height: 3,
                      background: BLACK,
                    }} />
                  )}
                  {isPopular && (
                    <div style={{ ...bodyFont, fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: BLACK, marginBottom: 20, opacity: 0.6 }}>
                      ★ {t.pricing.popular}
                    </div>
                  )}
                  <div style={{ ...displayFont, fontSize: 28, color: isPopular ? BLACK : "#fff", letterSpacing: "0.1em", marginBottom: 8 }}>{plan.name}</div>
                  <div style={{ marginBottom: 40 }}>
                    <span style={{ ...displayFont, fontSize: 52, color: isPopular ? BLACK : GOLD, lineHeight: 1 }}>{plan.price}</span>
                    <span style={{ ...bodyFont, color: isPopular ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.4)", fontSize: 13, marginLeft: 6 }}>{plan.currency}</span>
                  </div>

                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 40px", display: "flex", flexDirection: "column", gap: 14 }}>
                    {plan.features.map((f, fi) => (
                      <li key={fi} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ color: isPopular ? BLACK : GOLD, fontSize: 14, flexShrink: 0 }}>✓</span>
                        <span style={{ ...bodyFont, color: isPopular ? "rgba(0,0,0,0.75)" : "rgba(255,255,255,0.6)", fontSize: 14, fontWeight: 400 }}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#band-qilish"
                    style={{
                      ...bodyFont,
                      display: "block",
                      textAlign: "center",
                      padding: "14px 0",
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      textDecoration: "none",
                      background: isPopular ? BLACK : "transparent",
                      color: isPopular ? "#fff" : GOLD,
                      border: isPopular ? "none" : `1px solid ${GOLD}`,
                      transition: "opacity 0.2s",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.8"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                  >
                    {t.pricing.cta}
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Barbers ─────────────────────────────────────────────────────────────────
function Barbers({ t }: { t: (typeof translations)[Lang] }) {
  const photos = [
    "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&q=80&auto=format&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&q=80&auto=format&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&q=80&auto=format&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&q=80&auto=format&fit=crop&crop=face",
  ];

  return (
    <section id="ustalar" style={{ background: BG, padding: "120px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <Reveal>
          <div style={{ marginBottom: 80 }}>
            <span style={{ ...bodyFont, color: GOLD, fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", fontWeight: 600, display: "block", marginBottom: 16 }}>
              — {t.nav.barbers}
            </span>
            <h2 style={{ ...displayFont, fontSize: "clamp(40px, 5vw, 72px)", color: TEXT, lineHeight: 0.95, margin: 0, letterSpacing: "0.02em" }}>
              {t.barbers.title}
            </h2>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 2 }}>
          {t.barbers.team.map((b, i) => (
            <Reveal key={i} delay={i * 100}>
              <div
                style={{ position: "relative", overflow: "hidden", cursor: "pointer" }}
                onMouseEnter={(e) => {
                  const overlay = (e.currentTarget as HTMLElement).querySelector(".barber-overlay") as HTMLElement;
                  const img = (e.currentTarget as HTMLElement).querySelector(".barber-img") as HTMLElement;
                  if (overlay) overlay.style.opacity = "1";
                  if (img) img.style.transform = "scale(1.06)";
                }}
                onMouseLeave={(e) => {
                  const overlay = (e.currentTarget as HTMLElement).querySelector(".barber-overlay") as HTMLElement;
                  const img = (e.currentTarget as HTMLElement).querySelector(".barber-img") as HTMLElement;
                  if (overlay) overlay.style.opacity = "0";
                  if (img) img.style.transform = "scale(1)";
                }}
              >
                <div style={{ aspectRatio: "3/4", overflow: "hidden", background: "#222" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="barber-img"
                    src={photos[i]}
                    alt={b.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", transition: "transform 0.5s ease", display: "block" }}
                  />
                </div>

                <div className="barber-overlay" style={{
                  position: "absolute",
                  inset: 0,
                  background: `linear-gradient(to top, rgba(17,17,17,0.95) 30%, rgba(17,17,17,0.3) 100%)`,
                  opacity: 0,
                  transition: "opacity 0.4s ease",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: 32,
                }}>
                  <a
                    href={`https://instagram.com/${b.instagram.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ ...bodyFont, color: GOLD, fontSize: 12, letterSpacing: "0.1em", textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    {b.instagram}
                  </a>
                </div>

                <div style={{ background: "#fff", padding: "24px 28px" }}>
                  <div style={{ ...headingFont, fontSize: 18, color: TEXT, fontWeight: 600, marginBottom: 4 }}>{b.name}</div>
                  <div style={{ ...bodyFont, color: GOLD, fontSize: 12, letterSpacing: "0.08em", marginBottom: 8 }}>{b.specialty}</div>
                  <div style={{ ...bodyFont, color: TEXT_MUTED, fontSize: 12 }}>{b.exp} {t.barbers.exp}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Gallery ─────────────────────────────────────────────────────────────────
function Gallery({ t }: { t: (typeof translations)[Lang] }) {
  const photos = [
    { src: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&q=80&auto=format&fit=crop", tall: true, label: "Skin Fade" },
    { src: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&q=80&auto=format&fit=crop", tall: false, label: "Beard Styling" },
    { src: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&q=80&auto=format&fit=crop", tall: false, label: "Classic Cut" },
    { src: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=600&q=80&auto=format&fit=crop", tall: true, label: "Shop Interior" },
    { src: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&q=80&auto=format&fit=crop", tall: false, label: "Hot Towel Shave" },
    { src: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&q=80&auto=format&fit=crop", tall: false, label: "Modern Style" },
  ];

  return (
    <section id="galereya" style={{ background: BLACK, padding: "120px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <Reveal>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 60, flexWrap: "wrap", gap: 20 }}>
            <div>
              <span style={{ ...bodyFont, color: GOLD, fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", fontWeight: 600, display: "block", marginBottom: 16 }}>
                — {t.nav.gallery}
              </span>
              <h2 style={{ ...displayFont, fontSize: "clamp(40px, 5vw, 72px)", color: "#fff", lineHeight: 0.95, margin: 0 }}>
                {t.gallery.title}
              </h2>
            </div>
            <p style={{ ...bodyFont, color: "rgba(255,255,255,0.4)", fontSize: 14, maxWidth: 280, margin: 0 }}>{t.gallery.sub}</p>
          </div>
        </Reveal>

        {/* Masonry-style grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "auto", gap: 4 }}>
          {photos.map((p, i) => (
            <Reveal key={i} delay={i * 80} direction="none">
              <div
                style={{
                  gridRow: p.tall ? "span 2" : "span 1",
                  position: "relative",
                  overflow: "hidden",
                  background: "#1a1a1a",
                  aspectRatio: p.tall ? undefined : "4/3",
                  height: p.tall ? "100%" : undefined,
                  minHeight: p.tall ? "460px" : "200px",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  const img = el.querySelector("img") as HTMLElement;
                  const label = el.querySelector(".gallery-label") as HTMLElement;
                  if (img) img.style.transform = "scale(1.06)";
                  if (label) label.style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  const img = el.querySelector("img") as HTMLElement;
                  const label = el.querySelector(".gallery-label") as HTMLElement;
                  if (img) img.style.transform = "scale(1)";
                  if (label) label.style.opacity = "0";
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.src}
                  alt={p.label}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease" }}
                />
                <div className="gallery-label" style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(17,17,17,0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                }}>
                  <span style={{ ...headingFont, color: "#fff", fontSize: 18, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase" }}>{p.label}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Booking ─────────────────────────────────────────────────────────────────
function Booking({ t, lang }: { t: (typeof translations)[Lang]; lang: Lang }) {
  const [form, setForm] = useState({ name: "", phone: "", service: "", barber: "", date: "", time: "" });
  const [submitted, setSubmitted] = useState(false);

  const inputStyle: React.CSSProperties = {
    ...bodyFont,
    width: "100%",
    padding: "16px 20px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#fff",
    fontSize: 14,
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
    appearance: "none",
  };

  const labelStyle: React.CSSProperties = {
    ...bodyFont,
    color: "rgba(255,255,255,0.4)",
    fontSize: 11,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    fontWeight: 600,
    display: "block",
    marginBottom: 8,
  };

  const times = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"];

  if (submitted) {
    return (
      <section id="band-qilish" style={{ background: "#0d0d0d", padding: "120px 0" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center", padding: "0 24px" }}>
          <div style={{ fontSize: 64, marginBottom: 24 }}>✓</div>
          <h3 style={{ ...displayFont, fontSize: 48, color: GOLD, margin: "0 0 16px" }}>
            {lang === "ru" ? "Записано!" : "Qabul qilindi!"}
          </h3>
          <p style={{ ...bodyFont, color: "rgba(255,255,255,0.5)", fontSize: 16 }}>
            {lang === "ru" ? "Мы свяжемся с вами для подтверждения." : "Tez orada siz bilan bog'lanamiz."}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="band-qilish" style={{ background: "#0d0d0d", padding: "120px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
          {/* Left side */}
          <Reveal direction="left">
            <span style={{ ...bodyFont, color: GOLD, fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", fontWeight: 600, display: "block", marginBottom: 24 }}>
              — {t.nav.book}
            </span>
            <h2 style={{ ...displayFont, fontSize: "clamp(40px, 5vw, 80px)", color: "#fff", lineHeight: 0.9, margin: "0 0 28px", letterSpacing: "0.02em" }}>
              {t.booking.title}
            </h2>
            <p style={{ ...bodyFont, color: "rgba(255,255,255,0.4)", fontSize: 16, lineHeight: 1.8, margin: "0 0 48px", fontWeight: 300 }}>
              {t.booking.sub}
            </p>

            {/* Contact info */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { icon: "📍", text: "Toshkent, Yunusobod, Amir Temur ko'chasi 15" },
                { icon: "📞", text: "+998 90 123 45 67" },
                { icon: "🕐", text: "09:00 — 22:00" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 18, flexShrink: 0, marginTop: 2 }}>{item.icon}</span>
                  <span style={{ ...bodyFont, color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.6 }}>{item.text}</span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Form */}
          <Reveal direction="right" delay={150}>
            <form
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
              style={{ display: "flex", flexDirection: "column", gap: 20 }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div>
                  <label style={labelStyle}>{t.booking.name}</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    style={inputStyle}
                    onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = GOLD; }}
                    onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>{t.booking.phone}</label>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    style={inputStyle}
                    onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = GOLD; }}
                    onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; }}
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>{t.booking.service}</label>
                <select
                  required
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  style={{ ...inputStyle, cursor: "pointer" }}
                  onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = GOLD; }}
                  onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; }}
                >
                  <option value="" style={{ background: "#1a1a1a" }}>—</option>
                  {t.booking.services.map((s) => (
                    <option key={s} value={s} style={{ background: "#1a1a1a" }}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={labelStyle}>{t.booking.barber}</label>
                <select
                  value={form.barber}
                  onChange={(e) => setForm({ ...form, barber: e.target.value })}
                  style={{ ...inputStyle, cursor: "pointer" }}
                  onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = GOLD; }}
                  onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; }}
                >
                  <option value="" style={{ background: "#1a1a1a" }}>{t.booking.any}</option>
                  {t.barbers.team.map((b) => (
                    <option key={b.name} value={b.name} style={{ background: "#1a1a1a" }}>{b.name}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div>
                  <label style={labelStyle}>{t.booking.date}</label>
                  <input
                    required
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    style={{ ...inputStyle, colorScheme: "dark" }}
                    onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = GOLD; }}
                    onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>{t.booking.time}</label>
                  <select
                    required
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    style={{ ...inputStyle, cursor: "pointer" }}
                    onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = GOLD; }}
                    onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; }}
                  >
                    <option value="" style={{ background: "#1a1a1a" }}>—</option>
                    {times.map((time) => (
                      <option key={time} value={time} style={{ background: "#1a1a1a" }}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                style={{
                  ...bodyFont,
                  background: GOLD,
                  color: BLACK,
                  border: "none",
                  padding: "18px 0",
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "background 0.2s, transform 0.2s",
                  marginTop: 8,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = GOLD_DARK;
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = GOLD;
                  (e.currentTarget as HTMLElement).style.transform = "none";
                }}
              >
                {t.booking.cta}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ────────────────────────────────────────────────────────────
function Testimonials({ t }: { t: (typeof translations)[Lang] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActive((a) => (a + 1) % t.testimonials.items.length), 5000);
    return () => clearInterval(timer);
  }, [t.testimonials.items.length]);

  return (
    <section style={{ background: BG, padding: "120px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <span style={{ ...bodyFont, color: GOLD, fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", fontWeight: 600, display: "block", marginBottom: 16 }}>
              — {t.testimonials.title}
            </span>
            <h2 style={{ ...displayFont, fontSize: "clamp(36px, 4vw, 60px)", color: TEXT, lineHeight: 0.95, margin: 0 }}>
              {t.testimonials.sub}
            </h2>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 2 }}>
          {t.testimonials.items.map((review, i) => (
            <Reveal key={i} delay={i * 80} direction="none">
              <div
                style={{
                  background: active === i ? BLACK : "#fff",
                  padding: "40px 36px",
                  cursor: "pointer",
                  transition: "background 0.4s ease, transform 0.3s",
                  transform: active === i ? "translateY(-4px)" : "none",
                }}
                onClick={() => setActive(i)}
              >
                {/* Stars */}
                <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
                  {Array.from({ length: review.rating }).map((_, si) => (
                    <span key={si} style={{ color: GOLD, fontSize: 14 }}>★</span>
                  ))}
                </div>

                {/* Quote */}
                <p style={{ ...bodyFont, color: active === i ? "rgba(255,255,255,0.75)" : TEXT_MUTED, fontSize: 15, lineHeight: 1.8, margin: "0 0 32px", fontStyle: "italic", fontWeight: 300 }}>
                  &ldquo;{review.text}&rdquo;
                </p>

                {/* Author */}
                <div style={{ borderTop: `1px solid ${active === i ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`, paddingTop: 20 }}>
                  <div style={{ ...headingFont, fontSize: 15, color: active === i ? "#fff" : TEXT, fontWeight: 600, marginBottom: 4 }}>{review.name}</div>
                  <div style={{ ...bodyFont, fontSize: 12, color: active === i ? GOLD : TEXT_MUTED, letterSpacing: "0.05em" }}>{review.role}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 40 }}>
          {t.testimonials.items.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: active === i ? 28 : 8,
                height: 8,
                background: active === i ? GOLD : "rgba(0,0,0,0.2)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "width 0.3s ease, background 0.3s",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Location ────────────────────────────────────────────────────────────────
function Location({ t }: { t: (typeof translations)[Lang] }) {
  return (
    <section id="manzil" style={{ background: BLACK, padding: "120px 0 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center", marginBottom: 80 }}>
            <div>
              <span style={{ ...bodyFont, color: GOLD, fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", fontWeight: 600, display: "block", marginBottom: 24 }}>
                — {t.nav.contact}
              </span>
              <h2 style={{ ...displayFont, fontSize: "clamp(40px, 5vw, 72px)", color: "#fff", lineHeight: 0.9, margin: "0 0 48px" }}>
                {t.location.title}
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                <div>
                  <div style={{ ...bodyFont, color: GOLD, fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 600, marginBottom: 10 }}>
                    📍 Address
                  </div>
                  <div style={{ ...bodyFont, color: "rgba(255,255,255,0.65)", fontSize: 16, lineHeight: 1.7 }}>{t.location.address}</div>
                </div>
                <div>
                  <div style={{ ...bodyFont, color: GOLD, fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 600, marginBottom: 10 }}>
                    🕐 {t.location.hours}
                  </div>
                  <div style={{ ...bodyFont, color: "rgba(255,255,255,0.65)", fontSize: 16 }}>{t.location.hoursVal}</div>
                </div>
                <div>
                  <div style={{ ...bodyFont, color: GOLD, fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 600, marginBottom: 10 }}>
                    📞 Phone
                  </div>
                  <a href={`tel:${t.location.phone}`} style={{ ...bodyFont, color: "rgba(255,255,255,0.65)", fontSize: 16, textDecoration: "none" }}>
                    {t.location.phone}
                  </a>
                </div>
              </div>

              <a
                href={`https://maps.google.com/?q=Tashkent+Amir+Temur+15`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  ...bodyFont,
                  display: "inline-block",
                  marginTop: 40,
                  background: GOLD,
                  color: BLACK,
                  padding: "14px 32px",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = GOLD_DARK; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = GOLD; }}
              >
                {t.location.directions}
              </a>
            </div>

            {/* Map iframe */}
            <div style={{ position: "relative", aspectRatio: "1", overflow: "hidden", filter: "grayscale(0.3) contrast(1.1)" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.0!2d69.2831!3d41.2995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b0cc379e9c3%3A0xa5a9323b4aa5cb98!2sAmir+Temur+Square!5e0!3m2!1sen!2suz!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="BarberCraft Location"
              />
              <div style={{ position: "absolute", inset: 0, border: `2px solid rgba(200,155,60,0.3)`, pointerEvents: "none" }} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────
function Footer({ t }: { t: (typeof translations)[Lang] }) {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: "#080808", borderTop: `1px solid rgba(200,155,60,0.15)`, padding: "72px 0 40px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 60, marginBottom: 60 }}>
          {/* Brand */}
          <div>
            <div style={{ marginBottom: 20 }}>
              <span style={{ ...displayFont, fontSize: 32, color: GOLD, letterSpacing: "0.1em" }}>BARBER</span>
              <span style={{ ...headingFont, display: "block", fontSize: 11, color: "#666", letterSpacing: "0.4em" }}>CRAFT</span>
            </div>
            <p style={{ ...bodyFont, color: "#555", fontSize: 14, lineHeight: 1.8, maxWidth: 300, fontStyle: "italic" }}>
              {t.footer.tagline}
            </p>

            {/* Social links */}
            <div style={{ display: "flex", gap: 16, marginTop: 28 }}>
              {[
                { icon: "📷", label: "Instagram", url: "https://instagram.com" },
                { icon: "✈️", label: "Telegram", url: "https://t.me" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    ...bodyFont,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    color: "#555",
                    textDecoration: "none",
                    fontSize: 13,
                    letterSpacing: "0.05em",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = GOLD; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#555"; }}
                >
                  {s.icon} {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <div style={{ ...headingFont, color: "#fff", fontSize: 14, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500, marginBottom: 24 }}>Links</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
              {Object.entries(t.footer.links).map(([key, label]) => (
                <li key={key}>
                  <a
                    href={`#${key === "book" ? "band-qilish" : key}`}
                    style={{ ...bodyFont, color: "#555", textDecoration: "none", fontSize: 13, transition: "color 0.2s" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = GOLD; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#555"; }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div style={{ ...headingFont, color: "#fff", fontSize: 14, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500, marginBottom: 24 }}>Contact</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { label: t.location.phone, href: `tel:${t.location.phone}` },
                { label: "barbercraft@example.com", href: "mailto:barbercraft@example.com" },
                { label: "Toshkent, Yunusobod", href: "#manzil" },
              ].map((c, i) => (
                <a
                  key={i}
                  href={c.href}
                  style={{ ...bodyFont, color: "#555", textDecoration: "none", fontSize: 13, lineHeight: 1.5, transition: "color 0.2s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = GOLD; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#555"; }}
                >
                  {c.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <span style={{ ...bodyFont, color: "#333", fontSize: 12 }}>
            © {year} BarberCraft. {t.footer.rights}
          </span>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ width: 6, height: 6, background: "#22c55e", borderRadius: "50%" }} />
            <span style={{ ...bodyFont, color: "#333", fontSize: 12 }}>Open today · 09:00–22:00</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function BarbershopPage() {
  const [lang, setLang] = useState<Lang>("uz");
  const t = translations[lang];

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.15); }
        }
        ::selection { background: rgba(200,155,60,0.3); }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.2); }
        select option { background: #1a1a1a; color: #fff; }

        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        @media (max-width: 768px) {
          #band-qilish > div > div { grid-template-columns: 1fr !important; gap: 48px !important; }
          #manzil > div > div { grid-template-columns: 1fr !important; gap: 48px !important; }
          footer > div > div:first-child { grid-template-columns: 1fr !important; gap: 40px !important; }
          section > div > div[style*="grid-template-columns: repeat(4"] { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          section > div > div[style*="grid-template-columns: repeat(3"] { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      <Navbar lang={lang} setLang={setLang} t={t} />
      <Hero t={t} />
      <Trust t={t} />
      <Services t={t} />
      <Pricing t={t} />
      <Barbers t={t} />
      <Gallery t={t} />
      <Booking t={t} lang={lang} />
      <Testimonials t={t} />
      <Location t={t} />
      <Footer t={t} />
    </>
  );
}
