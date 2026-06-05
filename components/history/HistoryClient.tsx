"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { BookOpen, Mic, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { getBandTailwind, Attempt } from "@/types/ielts";
import { formatBand, roundBand } from "@/lib/utils/band-score";

// Band scale labels — shown next to score for context
const BAND_LABELS: Record<number, string> = {
  9:   "Expert",
  8.5: "Very Good+",
  8:   "Very Good",
  7.5: "Good+",
  7:   "Good",
  6.5: "Competent+",
  6:   "Competent",
  5.5: "Modest+",
  5:   "Modest",
  4.5: "Limited+",
  4:   "Limited",
};
function getBandLabel(band: number): string {
  const rounded = Math.round(band * 2) / 2;
  return BAND_LABELS[rounded] ?? "";
}

// ─── Progress chart ────────────────────────────────────────────────────────
function ProgressChart({ attempts }: { attempts: Attempt[] }) {
  const data = [...attempts].reverse().slice(-20);
  if (data.length < 2) return null;

  const W = 600, H = 160, PAD_L = 48, PAD_R = 16, PAD_T = 16, PAD_B = 32;
  const innerW = W - PAD_L - PAD_R;
  const innerH = H - PAD_T - PAD_B;

  const bands = data.map(a => roundBand(a.overall_band));
  const minB  = Math.max(1, Math.floor(Math.min(...bands)) - 0.5);
  const maxB  = Math.min(9, Math.ceil(Math.max(...bands)) + 0.5);

  const toX = (i: number) => PAD_L + (i / (data.length - 1)) * innerW;
  const toY = (b: number) => PAD_T + innerH - ((b - minB) / (maxB - minB)) * innerH;

  const points = data.map((a, i) => `${toX(i)},${toY(roundBand(a.overall_band))}`).join(" ");
  const area   = `M${toX(0)},${toY(roundBand(data[0].overall_band))} ` +
    data.slice(1).map((a, i) => `L${toX(i + 1)},${toY(roundBand(a.overall_band))}`).join(" ") +
    ` L${toX(data.length - 1)},${PAD_T + innerH} L${PAD_L},${PAD_T + innerH} Z`;

  const last  = roundBand(data[data.length - 1].overall_band);
  const first = roundBand(data[0].overall_band);
  const trend = last - first;
  const color = trend > 0 ? "#10b981" : trend < 0 ? "#f59e0b" : "#8b5cf6";

  const ySteps: number[] = [];
  for (let b = Math.ceil(minB * 2) / 2; b <= maxB; b += 0.5) ySteps.push(b);

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Band Score Progress
          </CardTitle>
          <div className="flex items-center gap-3 text-xs">
            <span className="text-muted-foreground">{data.length} attempts shown</span>
            <span className={`flex items-center gap-1 font-semibold ${
              trend > 0 ? "text-red-600" : trend < 0 ? "text-amber-500" : "text-red-600"
            }`}>
              {trend > 0 ? <TrendingUp className="w-3.5 h-3.5" /> :
               trend < 0 ? <TrendingDown className="w-3.5 h-3.5" /> :
               <Minus className="w-3.5 h-3.5" />}
              {trend > 0 ? `+${trend.toFixed(1)}` : trend.toFixed(1)} overall
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full overflow-x-auto">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ minWidth: 300, height: H }}>
            {ySteps.map(b => (
              <g key={b}>
                <line x1={PAD_L} y1={toY(b)} x2={W - PAD_R} y2={toY(b)}
                  stroke="#e5e7eb" strokeWidth="1" strokeDasharray={b % 1 === 0 ? "none" : "4,4"} />
                <text x={PAD_L - 6} y={toY(b) + 4} textAnchor="end" fontSize="10" fill="#9ca3af">
                  {b.toFixed(1)}
                </text>
              </g>
            ))}
            <path d={area} fill={color} fillOpacity="0.08" />
            <polyline points={points} fill="none" stroke={color} strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round" />
            {data.map((a, i) => {
              const x = toX(i), y = toY(roundBand(a.overall_band));
              const isLast = i === data.length - 1;
              return (
                <g key={a.id}>
                  <circle cx={x} cy={y} r={isLast ? 5 : 3.5}
                    fill={isLast ? color : "#fff"}
                    stroke={color} strokeWidth={isLast ? 0 : 2} />
                  {isLast && (
                    <text x={x} y={y - 9} textAnchor="middle" fontSize="10" fontWeight="700" fill={color}>
                      {formatBand(a.overall_band)}
                    </text>
                  )}
                </g>
              );
            })}
            {[0, Math.floor((data.length - 1) / 2), data.length - 1]
              .filter((v, i, arr) => arr.indexOf(v) === i)
              .map(i => (
                <text key={i} x={toX(i)} y={H - 4} textAnchor="middle" fontSize="9" fill="#9ca3af">
                  {new Date(data[i].created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </text>
              ))}
          </svg>
        </div>
        <div className="flex gap-4 mt-1 text-xs text-muted-foreground flex-wrap">
          <span>First: <span className="font-mono font-semibold">{formatBand(first)}</span></span>
          <span>Latest: <span className="font-mono font-semibold" style={{ color }}>{formatBand(last)}</span></span>
          <span>Best: <span className="font-mono font-semibold text-red-600">{formatBand(Math.max(...bands))}</span></span>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Main client shell (filter state only) ────────────────────────────────
export function HistoryClient({ attempts }: { attempts: Attempt[] }) {
  const [filter, setFilter] = useState<"all" | "writing" | "speaking">("all");
  const filtered = filter === "all" ? attempts : attempts.filter(a => a.mode === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">History</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {attempts.length} total attempt{attempts.length !== 1 ? "s" : ""}
          </p>
        </div>
        {attempts.length > 0 && (
          <div className="flex gap-1 p-1 rounded-xl shrink-0"
            style={{ background: "oklch(0.958 0.008 285)" }}>
            {(["all", "writing", "speaking"] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-all capitalize font-medium ${
                  filter === f
                    ? "bg-white text-foreground border-border shadow-sm"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}>
                {f}
              </button>
            ))}
          </div>
        )}
      </div>

      {attempts.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="pt-10 pb-10 flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-muted-foreground" />
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
        <>
          {filter === "all" && attempts.length >= 2 && <ProgressChart attempts={attempts} />}
          {filter !== "all" && filtered.length >= 2 && <ProgressChart attempts={filtered} />}

          <div className="space-y-2">
            {filtered.map((attempt) => (
              <Link key={attempt.id} href={`/history/${attempt.id}`}>
                <Card className="hover:border-red-300 transition-colors cursor-pointer">
                  <CardContent className="py-3.5">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg shrink-0 flex items-center justify-center ${
                        attempt.mode === "writing"
                          ? "bg-red-100 dark:bg-red-950"
                          : "bg-red-100 dark:bg-red-950"
                      }`}>
                        {attempt.mode === "writing"
                          ? <BookOpen className="w-4 h-4 text-red-600" />
                          : <Mic className="w-4 h-4 text-red-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-sm capitalize">{attempt.mode}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full border border-border text-muted-foreground">
                            {attempt.task_type.replace(/([a-z])([0-9])/g, "$1 $2").toUpperCase()}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5 truncate">{attempt.prompt_text || "—"}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(attempt.created_at).toLocaleDateString("en-US", {
                            weekday: "short", month: "short", day: "numeric",
                            hour: "2-digit", minute: "2-digit",
                          })}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className={`font-mono font-bold text-xl ${getBandTailwind(attempt.overall_band)}`}>
                          {formatBand(attempt.overall_band)}
                        </span>
                        {getBandLabel(attempt.overall_band) && (
                          <p className="text-[10px] text-muted-foreground mt-0.5 leading-none">
                            {getBandLabel(attempt.overall_band)}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
            {filtered.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-8">
                No {filter} attempts yet.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
