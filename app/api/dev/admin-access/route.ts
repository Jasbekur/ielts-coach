/**
 * POST /api/dev/admin-access
 *
 * Dev-only endpoint to grant or revoke admin role by email.
 * Uses the Supabase service-role key so it bypasses RLS and
 * can look up auth.users directly.
 *
 * Body: { email: string; action: "grant" | "revoke" }
 *
 * Only callable by already-authenticated admins (checked via
 * the anon session cookie before the service client is used).
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient, createServiceClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  // ── 1. Parse body ────────────────────────────────────────────────────────
  let body: { email?: string; action?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { email, action } = body;

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "email is required." }, { status: 400 });
  }
  if (!["grant", "grant-editor", "revoke"].includes(action ?? "")) {
    return NextResponse.json(
      { error: 'action must be "grant", "grant-editor", or "revoke".' },
      { status: 400 }
    );
  }

  // ── 2. Verify the caller is an authenticated admin ───────────────────────
  const anonClient = await createClient();
  const {
    data: { user: caller },
    error: authErr,
  } = await anonClient.auth.getUser();

  if (authErr || !caller) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const { data: callerProfile } = await anonClient
    .from("profiles")
    .select("role")
    .eq("id", caller.id)
    .single();

  if (callerProfile?.role !== "admin") {
    return NextResponse.json(
      { error: "Forbidden — caller is not an admin." },
      { status: 403 }
    );
  }

  // ── 3. Look up target user via admin auth API ────────────────────────────
  const svc = await createServiceClient();

  // listUsers returns up to 1000 by default; search by email
  const { data: listData, error: listErr } =
    await svc.auth.admin.listUsers({ perPage: 1000 });

  if (listErr) {
    return NextResponse.json(
      { error: "Could not list users: " + listErr.message },
      { status: 500 }
    );
  }

  const target = listData.users.find(
    (u) => u.email?.toLowerCase() === email.toLowerCase()
  );

  if (!target) {
    return NextResponse.json(
      { error: `No user found with email "${email}".` },
      { status: 404 }
    );
  }

  // ── 4. Update profiles table ─────────────────────────────────────────────
  const newRole =
    action === "grant"        ? "admin"   :
    action === "grant-editor" ? "editor"  : "student";

  const { error: updateErr } = await svc
    .from("profiles")
    .update({ role: newRole })
    .eq("id", target.id);

  if (updateErr) {
    return NextResponse.json(
      { error: "Update failed: " + updateErr.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok:      true,
    email:   target.email,
    userId:  target.id,
    role:    newRole,
    message: `✅ ${target.email} is now "${newRole}".`,
  });
}
