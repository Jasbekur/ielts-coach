"use client";

/**
 * ProtectedAdminRoute
 * -------------------
 * Wrap any page (or section) with this component to restrict access to admins.
 *
 * Behaviour:
 *   • While role is loading  → centred spinner
 *   • Role fetched, not admin → silent redirect to /dashboard
 *   • Role fetched, is admin  → renders children
 *
 * Usage:
 *   <ProtectedAdminRoute>
 *     <YourAdminPage />
 *   </ProtectedAdminRoute>
 */

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserRole } from "@/hooks/useUserRole";

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

export function ProtectedAdminRoute({ children }: ProtectedAdminRouteProps) {
  const { isAdmin, loading } = useUserRole();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.replace("/dashboard");
    }
  }, [loading, isAdmin, router]);

  /* ── Loading state ─────────────────────────────────────────────────── */
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <Spinner />
          <p className="text-sm text-muted-foreground font-medium animate-pulse">
            Checking permissions…
          </p>
        </div>
      </div>
    );
  }

  /* ── Not admin — render nothing while redirect fires ──────────────── */
  if (!isAdmin) return null;

  /* ── Admin — render the protected content ─────────────────────────── */
  return <>{children}</>;
}

/* ── Spinner ────────────────────────────────────────────────────────────── */
function Spinner() {
  return (
    <svg
      className="animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
    >
      {/* Track */}
      <circle
        cx="20"
        cy="20"
        r="16"
        stroke="currentColor"
        strokeWidth="3"
        className="text-muted-foreground/20"
      />
      {/* Arc */}
      <path
        d="M36 20a16 16 0 0 0-16-16"
        stroke="#059669"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
