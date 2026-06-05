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
    // Total users — fetch up to 1000 users and count.
    // Service-role bypasses RLS so we get ALL accounts, not just the admin's.
    // For scale > 1000 users, switch to a DB function. For now this is fine.
    admin.auth.admin.listUsers({ page: 1, perPage: 1000 }),
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

  // Count from the actual users array — always accurate up to 1000 users
  const totalUsers = usersRes.data?.users?.length ?? 0;
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
