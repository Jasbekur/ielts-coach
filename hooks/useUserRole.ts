"use client";

/**
 * useUserRole
 * -----------
 * Fetches the current authenticated user's role from public.profiles.
 *
 * Returns:
 *   role      — the raw role string ("student" | "admin" | "editor" | null)
 *   isAdmin   — true when role === "admin"
 *   isEditor  — true when role === "editor"
 *   loading   — true while the network request is in flight
 *   error     — error message string, or null if no error
 *   refresh   — call this to manually re-fetch (e.g. after a role change)
 */

import { useEffect, useState, useCallback, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";

type Role = "student" | "admin" | "editor" | string | null;

interface UseUserRoleResult {
  role:     Role;
  isAdmin:  boolean;
  isEditor: boolean;
  loading:  boolean;
  error:    string | null;
  refresh:  () => void;
}

export function useUserRole(): UseUserRoleResult {
  const [role, setRole]       = useState<Role>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError]     = useState<string | null>(null);

  const supabase = useMemo(() => createClient(), []);

  const fetchRole = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // 1. Get the currently authenticated user
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) throw new Error(authError.message);

      if (!user) {
        // Not logged in — role is null, not an error
        setRole(null);
        return;
      }

      // 2. Fetch the role from public.profiles
      const { data, error: dbError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (dbError) throw new Error(dbError.message);

      setRole(data?.role ?? "student");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch user role";
      setError(message);
      setRole(null);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  // Fetch on mount
  useEffect(() => {
    fetchRole();
  }, [fetchRole]);

  // Re-fetch whenever the auth session changes (login / logout / token refresh)
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      fetchRole();
    });

    return () => subscription.unsubscribe();
  }, [supabase, fetchRole]);

  return {
    role,
    isAdmin:  role === "admin",
    isEditor: role === "editor",
    loading,
    error,
    refresh: fetchRole,
  };
}
