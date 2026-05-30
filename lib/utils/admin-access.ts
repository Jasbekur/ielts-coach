/**
 * admin-access.ts
 * ───────────────
 * Utility functions for granting / revoking admin role by email.
 * Calls the server-side API route which uses the service-role key,
 * so RLS is bypassed safely on the server.
 *
 * Usage from browser console (after the dev page has loaded):
 *   await grantAdminAccess("someone@example.com")
 *   await revokeAdminAccess("someone@example.com")
 *
 * Or import them directly in any client component:
 *   import { grantAdminAccess } from "@/lib/utils/admin-access";
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
  action: "grant" | "revoke"
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
 * Revoke admin role from a user by email (resets to "student").
 * The caller must already be authenticated as an admin.
 *
 * @example
 *   await revokeAdminAccess("jasurbek@example.com")
 */
export async function revokeAdminAccess(email: string): Promise<AdminAccessResult> {
  return callAdminAccessApi(email, "revoke");
}
