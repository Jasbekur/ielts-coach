// Server Component — fetches all attempts on the server, zero client waterfall
export const revalidate = 30; // revalidate every 30 s — allows prefetch to cache

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Attempt } from "@/types/ielts";
import { HistoryClient } from "@/components/history/HistoryClient";

export default async function HistoryPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data } = await supabase
    .from("attempts")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(100);

  const attempts = (data ?? []) as Attempt[];

  // Pass pre-fetched data to client component (only filter logic runs client-side)
  return <HistoryClient attempts={attempts} />;
}
