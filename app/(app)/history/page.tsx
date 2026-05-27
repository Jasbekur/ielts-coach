"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { BookOpen, Mic, Clock } from "lucide-react";
import { getBandTailwind, Attempt } from "@/types/ielts";

function HistorySkeleton() {
  return (
    <div className="space-y-2">
      {[...Array(6)].map((_, i) => (
        <Card key={i}><CardContent className="py-3.5">
          <div className="flex items-center gap-3">
            <Skeleton className="w-9 h-9 rounded-lg shrink-0" />
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-48" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-7 w-10 shrink-0" />
          </div>
        </CardContent></Card>
      ))}
    </div>
  );
}

export default function HistoryPage() {
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const load = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { data } = await supabase
      .from("attempts")
      .select("*")
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false })
      .limit(100);

    setAttempts((data ?? []) as Attempt[]);
    setLoading(false);
  }, [supabase]);

  useEffect(() => { load(); }, [load]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">History</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {loading ? "Loading…" : `${attempts.length} total attempt${attempts.length !== 1 ? "s" : ""}`}
        </p>
      </div>

      {loading ? (
        <HistorySkeleton />
      ) : attempts.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="pt-10 pb-10 flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
              <Clock className="w-6 h-6 text-muted-foreground" />
            </div>
            <div className="text-center">
              <p className="font-medium text-sm">No attempts yet</p>
              <p className="text-xs text-muted-foreground mt-1">Complete a Writing or Speaking session to see it here</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {attempts.map((attempt) => (
            <Link key={attempt.id} href={`/history/${attempt.id}`}>
              <Card className="hover:border-violet-300 transition-colors cursor-pointer">
                <CardContent className="py-3.5">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg shrink-0 flex items-center justify-center ${
                      attempt.mode === "writing" ? "bg-violet-100 dark:bg-violet-950" : "bg-emerald-100 dark:bg-emerald-950"
                    }`}>
                      {attempt.mode === "writing"
                        ? <BookOpen className="w-4 h-4 text-violet-500" />
                        : <Mic className="w-4 h-4 text-emerald-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-sm capitalize">{attempt.mode}</span>
                        <Badge variant="outline" className="text-xs">
                          {attempt.task_type.replace(/([a-z])([0-9])/g, "$1 $2").toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">{attempt.prompt_text || "—"}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(attempt.created_at).toLocaleDateString("en-US", {
                          weekday: "short", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <span className={`font-mono font-bold text-xl shrink-0 ${getBandTailwind(attempt.overall_band)}`}>
                      {attempt.overall_band.toFixed(1)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
