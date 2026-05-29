import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function SpeakingLoading() {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-36" />
        <Skeleton className="h-4 w-64" />
      </div>

      {/* Mode toggle */}
      <div className="flex gap-2 p-1 rounded-xl w-fit"
        style={{ background: "oklch(0.958 0.008 285)" }}>
        <Skeleton className="h-8 w-28 rounded-lg" />
        <Skeleton className="h-8 w-28 rounded-lg" />
      </div>

      {/* Part selector */}
      <div className="flex gap-2">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-10 flex-1 rounded-xl" />
        ))}
      </div>

      {/* Question card */}
      <Card>
        <CardContent className="pt-5 pb-5 space-y-3">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-4/5" />
        </CardContent>
      </Card>

      {/* Recorder */}
      <Card>
        <CardContent className="pt-6 pb-6 flex flex-col items-center gap-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-9 w-40 rounded-xl" />
        </CardContent>
      </Card>
    </div>
  );
}
