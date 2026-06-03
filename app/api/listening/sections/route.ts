import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";

export async function GET() {
  // ── 1. Verify user is authenticated ──────────────────────────────────────
  const client = await createClient();
  const { data: { user } } = await client.auth.getUser();
  if (!user) return NextResponse.json({ data: [] }, { status: 401 });

  // ── 2. Use a plain admin client (bypasses RLS, no cookies needed) ─────────
  const admin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  const { data, error } = await admin
    .from("test_materials")
    .select("id,title,type,content,created_at")
    .in("type", ["listening_s1", "listening_s2", "listening_s3", "listening_s4"])
    .eq("content->>status", "published")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[listening/sections] DB error:", error.message);
    return NextResponse.json({ error: error.message, data: [] }, { status: 500 });
  }

  return NextResponse.json({ data: data ?? [] });
}
