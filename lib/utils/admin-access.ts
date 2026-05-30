/**
 * admin-access.ts
 * ───────────────
 * Utility functions for granting / revoking roles by email.
 * Calls the server-side API route which uses the service-role key,
 * so RLS is bypassed safely on the server.
 *
 * Usage from browser console (after the /dev page has loaded):
 *   await grantAdminAccess("someone@example.com")   // → "admin"
 *   await grantEditorAccess("someone@example.com")  // → "editor"
 *   await revokeAdminAccess("someone@example.com")  // → "student"
 *
 * Or import directly in any client component:
 *   import { grantAdminAccess, grantEditorAccess } from "@/lib/utils/admin-access";
 */

interface AdminAccessResult {
  ok:      boolean;
  email?:  string;
  userId?: string;
  role?:   string;
  message: string;
  error?:  string;
}

async function callAdminAccessApi(
  email: string,
  action: "grant" | "grant-editor" | "revoke"
): Promise<AdminAccessResult> {
  if (!email?.trim()) {
    const result = { ok: false, message: "❌ email is required.", error: "email is required." };
    console.error(result.message);
    return result;
  }

  try {
    const res = await fetch("/api/dev/admin-access", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ email: email.trim(), action }),
    });

    const data: AdminAccessResult = await res.json();

    if (data.ok) {
      console.log(`%c${data.message}`, "color: #10b981; font-weight: bold;");
    } else {
      console.error(`❌ ${data.error ?? data.message}`);
    }

    return data;
  } catch (err) {
    const message = "❌ Network error: " + (err instanceof Error ? err.message : String(err));
    console.error(message);
    return { ok: false, message, error: message };
  }
}

/**
 * Grant admin role to a user by email.
 * The caller must already be authenticated as an admin.
 *
 * @example
 *   await grantAdminAccess("jasurbek@example.com")
 */
export async function grantAdminAccess(email: string): Promise<AdminAccessResult> {
  return callAdminAccessApi(email, "grant");
}

/**
 * Grant editor role to a user by email.
 * Editors can INSERT and UPDATE questions but cannot DELETE.
 * The caller must already be authenticated as an admin.
 *
 * @example
 *   await grantEditorAccess("jasurbek@example.com")
 */
export async function grantEditorAccess(email: string): Promise<AdminAccessResult> {
  return callAdminAccessApi(email, "grant-editor");
}

/**
 * Revoke elevated role from a user by email (resets to "student").
 * Works for both admin and editor roles.
 * The caller must already be authenticated as an admin.
 *
 * @example
 *   await revokeAdminAccess("jasurbek@example.com")
 */
export async function revokeAdminAccess(email: string): Promise<AdminAccessResult> {
  return callAdminAccessApi(email, "revoke");
}
