"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BookOpen,
  Mic,
  LayoutDashboard,
  History,
  LogOut,
  GraduationCap,
  BookMarked,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  { href: "/dashboard", label: "Dashboard",  icon: LayoutDashboard, description: "Overview & stats" },
  { href: "/writing",   label: "Writing",    icon: BookOpen,        description: "Task 1 & Task 2" },
  { href: "/speaking",  label: "Speaking",   icon: Mic,             description: "Parts 1, 2 & 3" },
  { href: "/reading",   label: "Reading",    icon: BookMarked,      description: "3 passages, 40 Q" },
  { href: "/history",   label: "History",    icon: History,         description: "All attempts" },
];

// Primary green colour – matches design system
const PRIMARY = "#059669";

export function Sidebar() {
  const pathname = usePathname();
  const router   = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

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
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: PRIMARY, boxShadow: `0 4px 12px ${PRIMARY}55` }}
        >
          <GraduationCap className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="font-bold text-sm leading-none text-white">IELTS AI</p>
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
      </nav>

      {/* ── Bottom ── */}
      <div className="px-3 py-4 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3.5 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-150"
          style={{ color: "rgba(255,255,255,0.45)" }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.color = "#f87171";
            (e.currentTarget as HTMLElement).style.background = "rgba(248,113,113,0.1)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)";
            (e.currentTarget as HTMLElement).style.background = "transparent";
          }}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  );
}

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t"
      style={{
        background: "linear-gradient(180deg, #111827 0%, #0d1117 100%)",
        borderColor: "rgba(255,255,255,0.08)",
      }}>
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              prefetch={true}
              className="relative flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-150 min-w-[52px]"
            >
              <Icon
                className="w-5 h-5 transition-colors"
                style={{ color: active ? PRIMARY : "rgba(255,255,255,0.45)" }}
              />
              <span
                className="text-[10px] font-semibold leading-none transition-colors"
                style={{ color: active ? PRIMARY : "rgba(255,255,255,0.45)" }}
              >
                {label}
              </span>
              {active && (
                <span
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                  style={{ background: PRIMARY }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
