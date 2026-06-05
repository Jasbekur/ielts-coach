"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

const FREE_LIMIT = 3; // AI scores per week

export function useWeeklyLimit() {
  const [usedThisWeek, setUsedThisWeek] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { setLoading(false); return; }
      const { count } = await supabase
        .from("attempts")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id)
        .gte("created_at", weekAgo.toISOString());
      setUsedThisWeek(count ?? 0);
      setLoading(false);
    });
  }, []);

  const remaining = usedThisWeek !== null ? Math.max(0, FREE_LIMIT - usedThisWeek) : null;
  const isAtLimit = usedThisWeek !== null && usedThisWeek >= FREE_LIMIT;

  return { usedThisWeek, remaining, isAtLimit, loading, FREE_LIMIT };
}
