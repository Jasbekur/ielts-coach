"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import {
  BookOpen, Mic, LayoutDashboard, History, LogOut,
  BookMarked, ChevronUp, ShieldCheck, Headphones, GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { useUserRole } from "@/hooks/useUserRole";
import { useTestMode } from "@/contexts/TestModeContext";

/* ── Design tokens (matches landing page) ────────────────────────────────────
   bg      : #ffffff
   border  : #efe4e2
   fg      : #1a1310
   muted   : #737373
   brand   : #ef4444  (red)
   surface : #fafafa
────────────────────────────────────────────────────────────────────────────── */

const BRAND = "#ef4444";
const BRAND_BG = "#fef2f2";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, desc: "Overview & stats" },
  { href: "/writing",   label: "Writing",   icon: BookOpen,        desc: "Task 1 & Task 2" },
  { href: "/listening", label: "Listening", icon: Headphones,      desc: "4 sections, 40 Q" },
  { href: "/speaking",  label: "Speaking",  icon: Mic,             desc: "Parts 1, 2 & 3" },
  { href: "/reading",   label: "Reading",   icon: BookMarked,      desc: "3 passages, 40 Q" },
  { href: "/history",   label: "History",   icon: History,         desc: "All attempts" },
];

export function Sidebar() {
  const pathname   = usePathname();
  const router     = useRouter();
  const supabase   = useMemo(() => createClient(), []);
  const [userEmail, setUserEmail]     = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const { isAdmin, isEditor }         = useUserRole();
  const { isTestActive }              = useTestMode();

  if (isTestActive) return null;

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUserEmail(data.user?.email ?? null));
  }, [supabase]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  const initials = userEmail ? userEmail[0].toUpperCase() : "?";

  return (
    <aside
      className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 z-40"
      style={{ background: "#ffffff", borderRight: "1px solid #efe4e2" }}
    >
      {/* ── Logo ─────────────────────────────────────────────────────────── */}
      <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid #efe4e2" }}>
        <Link href="/dashboard" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <div style={{ width: "34px", height: "34px", borderRadius: "9px", background: BRAND, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <GraduationCap style={{ width: "18px", height: "18px", color: "#fff" }} />
          </div>
          <div>
            <p style={{ fontWeight: 700, fontSize: "14px", color: "#1a1310", lineHeight: 1, margin: 0 }}>IELTS Sensei</p>
            <p style={{ fontSize: "9px", fontWeight: 600, color: BRAND, textTransform: "uppercase", letterSpacing: "1.4px", margin: 0, marginTop: "2px" }}>AI Exam Coach</p>
          </div>
        </Link>
      </div>

      {/* ── Nav ──────────────────────────────────────────────────────────── */}
      <nav style={{ flex: 1, padding: "12px 10px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "2px" }}>
        <p style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "#999", padding: "0 10px", marginBottom: "6px" }}>
          Practice
        </p>

        {navItems.map(({ href, label, icon: Icon, desc }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              prefetch={true}
              style={{
                display: "flex", alignItems: "center", gap: "10px",
                padding: "9px 10px", borderRadius: "8px",
                textDecoration: "none", transition: "background 0.12s",
                background: active ? BRAND_BG : "transparent",
                color: active ? BRAND : "#1a1310",
              }}
              onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = "#fafafa"; }}
              onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              <div style={{
                width: "30px", height: "30px", borderRadius: "7px", flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: active ? `${BRAND}18` : "#f5f5f5",
              }}>
                <Icon style={{ width: "15px", height: "15px", color: active ? BRAND : "#737373" }} />
              </div>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: "13px", fontWeight: active ? 700 : 500, color: active ? BRAND : "#1a1310", margin: 0, letterSpacing: "-0.01em" }}>{label}</p>
                <p style={{ fontSize: "10px", color: "#999", margin: 0 }}>{desc}</p>
              </div>
              {active && (
                <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: BRAND, marginLeft: "auto", flexShrink: 0 }} />
              )}
            </Link>
          );
        })}

        {/* Admin section */}
        {(isAdmin || isEditor) && (
          <>
            <div style={{ height: "1px", background: "#efe4e2", margin: "8px 10px" }} />
            <p style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "#999", padding: "0 10px", marginBottom: "4px" }}>
              {isAdmin ? "Admin" : "Editor"}
            </p>
            {(() => {
              const href = "/admin";
              const active = pathname === href || pathname.startsWith(href + "/");
              return (
                <Link href={href} prefetch={true} style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "9px 10px", borderRadius: "8px",
                  textDecoration: "none", transition: "background 0.12s",
                  background: active ? BRAND_BG : "transparent",
                  color: active ? BRAND : "#1a1310",
                }}
                  onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = "#fafafa"; }}
                  onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  <div style={{ width: "30px", height: "30px", borderRadius: "7px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: active ? `${BRAND}18` : "#f5f5f5" }}>
                    <ShieldCheck style={{ width: "15px", height: "15px", color: active ? BRAND : "#737373" }} />
                  </div>
                  <p style={{ fontSize: "13px", fontWeight: active ? 700 : 500, color: active ? BRAND : "#1a1310", margin: 0 }}>Content Manager</p>
                </Link>
              );
            })()}
          </>
        )}
      </nav>

      {/* ── Profile ──────────────────────────────────────────────────────── */}
      <div style={{ padding: "10px", borderTop: "1px solid #efe4e2" }}>
        <button
          onClick={() => setProfileOpen(o => !o)}
          style={{
            width: "100%", display: "flex", alignItems: "center", gap: "10px",
            padding: "9px 10px", borderRadius: "8px", border: "none", cursor: "pointer",
            background: profileOpen ? "#fafafa" : "transparent", transition: "background 0.12s",
          }}
          onMouseEnter={e => { if (!profileOpen) (e.currentTarget as HTMLElement).style.background = "#fafafa"; }}
          onMouseLeave={e => { if (!profileOpen) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
        >
          <div style={{ width: "30px", height: "30px", borderRadius: "7px", background: BRAND, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "13px", fontWeight: 700, color: "#fff" }}>
            {initials}
          </div>
          <div style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
            <p style={{ fontSize: "12px", fontWeight: 600, color: "#1a1310", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {userEmail ?? "Loading…"}
            </p>
            <p style={{ fontSize: "10px", color: isAdmin ? BRAND : isEditor ? "#f59e0b" : "#999", margin: 0, fontWeight: 500 }}>
              {isAdmin ? "Admin" : isEditor ? "Editor" : "Student"}
            </p>
          </div>
          <ChevronUp style={{ width: "13px", height: "13px", color: "#999", transform: profileOpen ? "rotate(0deg)" : "rotate(180deg)", transition: "transform 0.2s", flexShrink: 0 }} />
        </button>

        {profileOpen && (
          <div style={{ marginTop: "4px", borderRadius: "8px", border: "1px solid #efe4e2", overflow: "hidden", background: "#fafafa" }}>
            <button
              onClick={handleLogout}
              style={{ width: "100%", display: "flex", alignItems: "center", gap: "10px", padding: "10px 14px", border: "none", cursor: "pointer", background: "transparent", transition: "background 0.12s", color: "#737373", fontSize: "13px" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#fef2f2"; (e.currentTarget as HTMLElement).style.color = BRAND; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "#737373"; }}
            >
              <LogOut style={{ width: "13px", height: "13px", flexShrink: 0 }} />
              <span style={{ fontWeight: 500 }}>Sign out</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}

export function MobileNav() {
  const pathname = usePathname();
  const { isAdmin, isEditor } = useUserRole();
  const { isTestActive } = useTestMode();

  if (isTestActive) return null;

  const adminItem = (isAdmin || isEditor) ? [{ href: "/admin", label: "Admin", icon: ShieldCheck }] : [];
  const mobileItems = [...navItems, ...adminItem];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50"
      style={{ background: "#ffffff", borderTop: "1px solid #efe4e2" }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", height: "60px", padding: "0 8px" }}>
        {mobileItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              prefetch={true}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px", padding: "8px 10px", borderRadius: "8px", textDecoration: "none", position: "relative" }}
            >
              <Icon style={{ width: "19px", height: "19px", color: active ? BRAND : "#999" }} />
              <span style={{ fontSize: "9px", fontWeight: 600, color: active ? BRAND : "#999" }}>{label}</span>
              {active && (
                <span style={{ position: "absolute", bottom: "2px", left: "50%", transform: "translateX(-50%)", width: "14px", height: "2px", borderRadius: "999px", background: BRAND }} />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
