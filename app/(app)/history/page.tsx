export const revalidate = 0;

import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { BookOpen, Mic, Clock } from "lucide-react";
import { getBandTailwind, Attempt } from "@/types/ielts";

export default async function HistoryPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: attempts } = await supabase
    .from("attempts")
    .select("*")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false })
    .limit(100);

  const allAttempts = (attempts ?? []) as Attempt[];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">History</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {allAttempts.length} total attempt{allAttempts.length !== 1 ? "s" : ""}
        </p>
      </div>

      {allAttempts.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="pt-10 pb-10 flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
              <Clock className="w-6 h-6 text-muted-foreground" />
            </div>
            <div className="text-center">
              <p className="font-medium text-sm">No attempts yet</p>
              <p className="text-xs text-muted-foreground mt-1">
                Complete a Writing or Speaking session to see it here
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {allAttempts.map((attempt) => (
            <Link key={attempt.id} href={`/history/${attempt.id}`}>
              <Card className="hover:border-violet-300 transition-colors cursor-pointer">
                <CardContent className="py-3.5">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-lg shrink-0 flex items-center justify-center ${
                        attempt.mode === "writing"
                          ? "bg-violet-100 dark:bg-violet-950"
                          : "bg-emerald-100 dark:bg-emerald-950"
                      }`}
                    >
                      {attempt.mode === "writing" ? (
                        <BookOpen className="w-4 h-4 text-violet-500" />
                      ) : (
                        <Mic className="w-4 h-4 text-emerald-500" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-sm capitalize">
                          {attempt.mode}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {attempt.task_type
                            .replace(/([a-z])([0-9])/g, "$1 $2")
                            .toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">
                        {attempt.prompt_text || "—"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(attempt.created_at).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>

                    <span
                      className={`font-mono font-bold text-xl shrink-0 ${getBandTailwind(
                        attempt.overall_band
                      )}`}
                    >
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
