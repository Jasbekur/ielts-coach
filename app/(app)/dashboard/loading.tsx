import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

// ── Reusable exact-shape skeletons ──────────────────────────────────────────

/** Mirrors the real stat card DOM exactly:
 *  row(label + icon-chip) / big-number / sub-label */
function StatCardSkeleton() {
  return (
    <Card>
      <CardContent className="pt-4 pb-4">
        {/* row: label text + icon chip */}
        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-2.5 w-14 rounded-sm" />
          <Skeleton className="h-6 w-6 rounded-lg" />
        </div>
        {/* big number — text-3xl leading-none ≈ 36px tall */}
        <Skeleton className="h-9 w-16 rounded-md mt-0.5" />
        {/* sub-label — text-xs mt-1.5 */}
        <Skeleton className="h-2.5 w-20 rounded-sm mt-2" />
      </CardContent>
    </Card>
  );
}

/** Mirrors the BandSparkline + trend card DOM exactly:
 *  title / (svg-160×40 + trend-text) / (3 small stat pills) */
function TrendCardSkeleton() {
  return (
    <Card>
      <CardContent className="pt-4 pb-4">
        {/* "THIS WEEK'S TREND" — text-xs uppercase mb-3 */}
        <Skeleton className="h-2.5 w-36 rounded-sm mb-4" />

        {/* Sparkline row: svg placeholder + arrow-text */}
        <div className="flex items-center gap-3">
          {/* SVG is exactly width=160 height=40 with className="shrink-0" */}
          <Skeleton className="h-10 rounded-lg shrink-0" style={{ width: 160 }} />
          {/* "↑ 2.0 bands  this week" — two lines of text-xs */}
          <div className="space-y-1.5 flex-1">
            <Skeleton className="h-2.5 w-24 rounded-sm" />
            <Skeleton className="h-2.5 w-16 rounded-sm" />
          </div>
        </div>

        {/* "✍️ 4 writing  🎤 2 speaking  Avg: 6.5" — text-xs flex gap-4 mt-3 */}
        <div className="flex gap-4 mt-3">
          <Skeleton className="h-2.5 w-16 rounded-sm" />
          <Skeleton className="h-2.5 w-18 rounded-sm" />
          <Skeleton className="h-2.5 w-12 rounded-sm" />
        </div>
      </CardContent>
    </Card>
  );
}

// ── Full dashboard loading screen ───────────────────────────────────────────

export default function DashboardLoading() {
  return (
    <div className="space-y-5">

      {/* Hero greeting */}
      <div className="rounded-2xl px-5 py-5 space-y-3"
        style={{
          background: "linear-gradient(135deg, oklch(0.546 0.245 274 / 12%) 0%, oklch(0.62 0.22 300 / 8%) 100%)",
          border: "1px solid oklch(0.546 0.245 274 / 20%)",
        }}>
        <Skeleton className="h-7 w-44 rounded-lg" />
        <Skeleton className="h-3 w-64 rounded-sm" />
        <div className="flex gap-2 mt-1">
          <Skeleton className="h-9 w-28 rounded-xl" />
          <Skeleton className="h-9 w-28 rounded-xl" />
        </div>
      </div>

      {/* Daily tip */}
      <Skeleton className="h-16 w-full rounded-2xl" />

      {/* 4 stat cards — each one mirrors StatCardSkeleton exactly */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>

      {/* Progress-to-target / trend card */}
      <TrendCardSkeleton />

      {/* Practice cards */}
      <div className="grid sm:grid-cols-2 gap-3">
        <Skeleton className="h-32 rounded-2xl" />
        <Skeleton className="h-32 rounded-2xl" />
      </div>

      {/* Recent attempts list */}
      <div className="space-y-2">
        <div className="flex items-center justify-between mb-1">
          <Skeleton className="h-3 w-28 rounded-sm" />
          <Skeleton className="h-3 w-12 rounded-sm" />
        </div>
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="py-3 flex items-center gap-3.5">
              {/* mode icon chip */}
              <Skeleton className="h-9 w-9 rounded-xl shrink-0" />
              {/* mode + date */}
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-3 w-32 rounded-sm" />
                <Skeleton className="h-2.5 w-24 rounded-sm" />
              </div>
              {/* band badge */}
              <Skeleton className="h-7 w-12 rounded-xl shrink-0" />
            </CardContent>
          </Card>
        ))}
      </div>

    </div>
  );
}
