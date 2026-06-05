"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import {
  BookOpen,
  Mic,
  LayoutDashboard,
  History,
  LogOut,
  BookMarked,
  ChevronUp,
  ShieldCheck,
  Headphones,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { useUserRole } from "@/hooks/useUserRole";

const navItems = [
  { href: "/dashboard",  label: "Dashboard",  icon: LayoutDashboard, description: "Overview & stats" },
  { href: "/writing",    label: "Writing",    icon: BookOpen,        description: "Task 1 & Task 2" },
  { href: "/listening",  label: "Listening",  icon: Headphones,      description: "4 sections, 40 Q" },
  { href: "/speaking",   label: "Speaking",   icon: Mic,             description: "Parts 1, 2 & 3" },
  { href: "/reading",    label: "Reading",    icon: BookMarked,      description: "3 passages, 40 Q" },
  { href: "/history",    label: "History",    icon: History,         description: "All attempts" },
];

const PRIMARY = "#dc2626";
const EXAM_PATHS = ["/listening", "/reading", "/writing", "/speaking"];

// ── Sensei logo mark ─────────────────────────────────────────────────────────
function SenseiLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="12" fill={PRIMARY} />
      {/* Graduation cap */}
      <polygon points="20,9 32,15 20,21 8,15" fill="white" opacity="0.95" />
      <rect x="17" y="21" width="6" height="7" rx="1" fill="white" opacity="0.7" />
      <line x1="32" y1="15" x2="32" y2="22" stroke="white" strokeWidth="2.2" strokeLinecap="round" opacity="0.8" />
      <circle cx="32" cy="23" r="1.5" fill="white" opacity="0.8" />
    </svg>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const router   = useRouter();
  if (EXAM_PATHS.some(p => pathname.startsWith(p))) return null;
  const supabase = useMemo(() => createClient(), []);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const { isAdmin, isEditor } = useUserRole();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserEmail(data.user?.email ?? null);
    });
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
      style={{
        background: "linear-gradient(180deg, #0d1117 0%, #111827 100%)",
        borderRight: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* ── Logo ── */}
      <div className="px-6 py-5 flex items-center gap-3">
        <SenseiLogo size={40} />
        <div>
          <p className="font-bold text-sm leading-none text-white tracking-wide">IELTS Sensei</p>
          <p className="text-[10px] mt-0.5 uppercase tracking-widest font-bold"
            style={{ color: `${PRIMARY}cc` }}>
            AI Exam Coach
          </p>
        </div>
      </div>

      {/* ── Nav ── */}
      <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] px-3 mb-3"
          style={{ color: "rgba(255,255,255,0.3)" }}>
          Practice
        </p>

        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              prefetch={true}
              className={cn(
                "flex items-center gap-3.5 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-150",
                active ? "text-white shadow-lg" : "hover:text-white"
              )}
              style={
                active
                  ? { background: PRIMARY, boxShadow: `0 4px 14px ${PRIMARY}40` }
                  : { color: "rgba(255,255,255,0.6)" }
              }
              onMouseEnter={e => {
                if (!active) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)";
              }}
              onMouseLeave={e => {
                if (!active) (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="font-semibold">{label}</span>
            </Link>
          );
        })}

        {/* ── Admin / Editor section ── */}
        {(isAdmin || isEditor) && (
          <>
            {/* Divider */}
            <div className="my-3 mx-3 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }} />

            <p className="text-[10px] font-bold uppercase tracking-[0.2em] px-3 mb-2"
              style={{ color: "rgba(255,255,255,0.3)" }}>
              {isAdmin ? "Admin" : "Editor"}
            </p>

            {(() => {
              const href   = "/admin";
              const active = pathname === href || pathname.startsWith(href + "/");
              return (
                <Link
                  href={href}
                  prefetch={true}
                  className={cn(
                    "flex items-center gap-3.5 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-150",
                    active ? "text-white shadow-lg" : "hover:text-white"
                  )}
                  style={
                    active
                      ? { background: "#dc2626", boxShadow: "0 4px 14px rgba(220,38,38,0.35)" }
                      : { color: "rgba(255,255,255,0.6)" }
                  }
                  onMouseEnter={e => {
                    if (!active) (e.currentTarget as HTMLElement).style.background = "rgba(220,38,38,0.12)";
                  }}
                  onMouseLeave={e => {
                    if (!active) (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                >
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span className="font-semibold">Content Manager</span>
                </Link>
              );
            })()}
          </>
        )}
      </nav>

      {/* ── Profile card ── */}
      <div className="px-3 pb-4 pt-2 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        {/* Profile toggle button */}
        <button
          onClick={() => setProfileOpen(o => !o)}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group"
          style={{ background: profileOpen ? "rgba(255,255,255,0.07)" : "transparent" }}
          onMouseEnter={e => { if (!profileOpen) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; }}
          onMouseLeave={e => { if (!profileOpen) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
        >
          {/* Avatar */}
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-white text-sm font-bold"
            style={{ background: `linear-gradient(135deg, ${PRIMARY}, #b91c1c)` }}
          >
            {initials}
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="text-xs font-semibold text-white truncate">
              {userEmail ?? "Loading…"}
            </p>
            <p className="text-[10px] font-semibold"
              style={{ color: isAdmin ? "#dc2626" : isEditor ? "#fbbf24" : "rgba(255,255,255,0.35)" }}>
              {isAdmin ? "Admin" : isEditor ? "Editor" : "Student"}
            </p>
          </div>
          <ChevronUp
            className="w-3.5 h-3.5 shrink-0 transition-transform duration-200"
            style={{
              color: "rgba(255,255,255,0.4)",
              transform: profileOpen ? "rotate(0deg)" : "rotate(180deg)",
            }}
          />
        </button>

        {/* Dropdown */}
        {profileOpen && (
          <div
            className="mt-1 rounded-xl overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)" }}
          >
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-150"
              style={{ color: "rgba(255,255,255,0.55)" }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = "#f87171";
                (e.currentTarget as HTMLElement).style.background = "rgba(248,113,113,0.08)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.55)";
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              <LogOut className="w-3.5 h-3.5 shrink-0" />
              <span className="font-medium">Sign out</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}

export function MobileNav() {
  const pathname  = usePathname();
  if (EXAM_PATHS.some(p => pathname.startsWith(p))) return null;
  const { isAdmin, isEditor } = useUserRole();

  const adminItem = (isAdmin || isEditor)
    ? [{ href: "/admin", label: "Admin", icon: ShieldCheck }]
    : [];
  const mobileItems = [...navItems, ...adminItem];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t"
      style={{
        background: "linear-gradient(180deg, #111827 0%, #0d1117 100%)",
        borderColor: "rgba(255,255,255,0.08)",
      }}>
      <div className="flex items-center justify-around h-16 px-2">
        {mobileItems.map(({ href, label, icon: Icon }) => {
          const active     = pathname === href || pathname.startsWith(href + "/");
          const isAdminTab = href === "/admin";
          const activeColor = isAdminTab ? "#dc2626" : PRIMARY;
          return (
            <Link
              key={href}
              href={href}
              prefetch={true}
              className="relative flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-150 min-w-[44px]"
            >
              <Icon
                className="w-5 h-5 transition-colors"
                style={{ color: active ? activeColor : "rgba(255,255,255,0.45)" }}
              />
              <span
                className="text-[10px] font-semibold leading-none transition-colors"
                style={{ color: active ? activeColor : "rgba(255,255,255,0.45)" }}
              >
                {label}
              </span>
              {active && (
                <span
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                  style={{ background: activeColor }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
