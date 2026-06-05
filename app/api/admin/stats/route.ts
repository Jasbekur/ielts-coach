import { NextResponse } from "next/server";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { createClient } from "@supabase/supabase-js";

/**
 * GET /api/admin/stats
 * Returns total users, tests today, avg band.
 * Uses service-role key to bypass RLS — only callable by authenticated admins.
 */
export async function GET() {
  // 1. Verify caller is authenticated (anon key client)
  const userClient = await createServerClient();
  const { data: { user } } = await userClient.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. Check admin role in profiles table
  const { data: profile } = await userClient
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || !["admin", "editor"].includes(profile.role ?? "")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // 3. Use service-role client — bypasses ALL RLS policies
  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  const todayUTC = new Date();
  todayUTC.setUTCHours(0, 0, 0, 0);

  const [usersRes, todayRes, bandsRes] = await Promise.all([
    // Total users — from auth.users via admin API (most accurate)
    admin.auth.admin.listUsers({ page: 1, perPage: 1 }),
    // Tests today — all attempts today across all users
    admin
      .from("attempts")
      .select("id", { count: "exact", head: true })
      .gte("created_at", todayUTC.toISOString()),
    // All bands — filter out invalid (0 or null)
    admin
      .from("attempts")
      .select("overall_band")
      .gt("overall_band", 0),
  ]);

  // `total` exists on the paginated response when users exist; fall back to array length
  const usersData = usersRes.data;
  const totalUsers = (usersData && "total" in usersData ? (usersData as { total: number }).total : usersData?.users?.length) ?? 0;
  const testsToday = todayRes.count ?? 0;

  let avgBand: number | null = null;
  const validBands = (bandsRes.data ?? [])
    .map((a: { overall_band: number }) => a.overall_band)
    .filter((b: number) => b >= 1 && b <= 9);

  if (validBands.length > 0) {
    const sum = validBands.reduce((s: number, b: number) => s + b, 0);
    avgBand = Math.round((sum / validBands.length) * 10) / 10;
  }

  return NextResponse.json({ totalUsers, testsToday, avgBand, totalAttempts: validBands.length });
}
