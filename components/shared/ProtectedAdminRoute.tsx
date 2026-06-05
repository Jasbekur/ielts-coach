"use client";

/**
 * ProtectedAdminRoute
 * -------------------
 * Wraps any page and restricts access to users whose role is in `allowedRoles`.
 * Defaults to ["admin", "editor"] so both roles reach the Content Manager.
 *
 * Behaviour:
 *   • While role is loading          → centred spinner
 *   • Role not in allowedRoles       → silent redirect to /dashboard
 *   • Role is allowed                → renders children
 *
 * Usage:
 *   // Admin + editor (default)
 *   <ProtectedAdminRoute>
 *     <AdminPage />
 *   </ProtectedAdminRoute>
 *
 *   // Admin only
 *   <ProtectedAdminRoute allowedRoles={["admin"]}>
 *     <SuperSecretPage />
 *   </ProtectedAdminRoute>
 */

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserRole } from "@/hooks/useUserRole";

interface ProtectedAdminRouteProps {
  children:     React.ReactNode;
  /** Roles that may access this route. Defaults to ["admin", "editor"]. */
  allowedRoles?: string[];
}

export function ProtectedAdminRoute({
  children,
  allowedRoles = ["admin", "editor"],
}: ProtectedAdminRouteProps) {
  const { role, loading } = useUserRole();
  const router = useRouter();

  const hasAccess = role !== null && allowedRoles.includes(role);

  useEffect(() => {
    if (!loading && !hasAccess) {
      router.replace("/dashboard");
    }
  }, [loading, hasAccess, router]);

  /* ── Loading ── */
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

  /* ── No access — render nothing while redirect fires ── */
  if (!hasAccess) return null;

  /* ── Allowed ── */
  return <>{children}</>;
}

/* ── Spinner ── */
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
      <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="3"
        className="text-muted-foreground/20" />
      <path d="M36 20a16 16 0 0 0-16-16" stroke="#dc2626" strokeWidth="3"
        strokeLinecap="round" />
    </svg>
  );
}
