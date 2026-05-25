"use client";

import { Progress } from "@/components/ui/progress";
import { formatDuration } from "@/lib/utils/audio";
import { cn } from "@/lib/utils";

interface SpeakingTimerProps {
  elapsed: number;
  limit: number;
  label?: string;
  warning?: number; // seconds before limit to show warning
}

export function SpeakingTimer({
  elapsed,
  limit,
  label,
  warning = 10,
}: SpeakingTimerProps) {
  const remaining = Math.max(0, limit - elapsed);
  const pct = Math.min(100, (elapsed / limit) * 100);
  const isWarning = remaining <= warning && remaining > 0;
  const isOver = elapsed >= limit;

  return (
    <div className="space-y-1.5">
      {label && (
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">{label}</span>
          <span
            className={cn(
              "font-mono font-bold",
              isOver
                ? "text-red-500"
                : isWarning
                ? "text-amber-500"
                : "text-foreground"
            )}
          >
            {isOver ? "TIME" : formatDuration(remaining)}
          </span>
        </div>
      )}
      <Progress
        value={pct}
        className={cn(
          "h-2",
          isOver
            ? "[&>div]:bg-red-500"
            : isWarning
            ? "[&>div]:bg-amber-500"
            : "[&>div]:bg-violet-500"
        )}
      />
      <p className="text-xs text-muted-foreground">
        {formatDuration(elapsed)} elapsed
      </p>
    </div>
  );
}
