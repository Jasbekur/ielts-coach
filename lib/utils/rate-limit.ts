import { SupabaseClient } from "@supabase/supabase-js";

export async function checkDailyLimit(
  userId: string,
  supabase: SupabaseClient
) {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0); // fix: UTC so limit resets at midnight UTC, not server local time

  const { count } = await supabase
    .from("attempts")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .gte("created_at", today.toISOString());

  const used = count ?? 0;
  const limit = 10;
  return { used, limit, remaining: limit - used };
}
