"use client";

import { useState } from "react";
import { WritingResult, Correction } from "@/types/ielts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";

const CATEGORY_COLORS: Record<string, string> = {
  grammar: "bg-red-100 text-red-700 border-red-200",
  vocabulary: "bg-amber-100 text-amber-700 border-amber-200",
  cohesion: "bg-blue-100 text-blue-700 border-blue-200",
  task: "bg-purple-100 text-purple-700 border-purple-200",
};

const CATEGORY_LABELS: Record<string, string> = {
  grammar: "Grammar",
  vocabulary: "Vocabulary",
  cohesion: "Cohesion",
  task: "Task",
};

function CorrectionItem({ correction }: { correction: Correction }) {
  const [open, setOpen] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className="w-full text-left border rounded-lg p-3 bg-card hover:border-violet-300 transition-colors"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <Badge
          variant="outline"
          className={cn("text-xs capitalize shrink-0", CATEGORY_COLORS[correction.category])}
        >
          {CATEGORY_LABELS[correction.category]}
        </Badge>
        {open ? (
          <ChevronUp className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
        )}
      </div>

      <div className="space-y-1.5 text-sm text-left">
        {/* Original — always visible */}
        <div className={cn("leading-snug", open && "line-through text-muted-foreground")}>
          <span className="text-xs text-muted-foreground mr-1">❌</span>
          <span className="text-red-600">{correction.original}</span>
        </div>

        {/* Fix — revealed on tap/click */}
        {open && (
          <>
            <div className="leading-snug">
              <span className="text-xs text-muted-foreground mr-1">✅</span>
              <span className="text-emerald-600 font-medium">{correction.fixed}</span>
            </div>
            <p className="text-xs text-muted-foreground border-t border-border pt-1.5 mt-1.5">
              {correction.reason}
            </p>
          </>
        )}

        {!open && (
          <p className="text-xs text-muted-foreground">Tap to see the fix →</p>
        )}
      </div>
    </button>
  );
}

interface CorrectionsViewProps {
  result: WritingResult;
}

export function CorrectionsView({ result }: CorrectionsViewProps) {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? result.corrections : result.corrections.slice(0, 6);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Corrections ({result.corrections.length})
          </CardTitle>
          <span className="text-xs text-muted-foreground">Tap each card to reveal fix</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="grid sm:grid-cols-2 gap-2">
          {displayed.map((c, i) => (
            <CorrectionItem key={i} correction={c} />
          ))}
        </div>
        {result.corrections.length > 6 && (
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="w-full text-xs text-violet-500 hover:text-violet-600 py-2 border border-dashed border-violet-200 rounded-lg transition-colors"
          >
            {showAll
              ? "Show less"
              : `Show ${result.corrections.length - 6} more corrections`}
          </button>
        )}
      </CardContent>
    </Card>
  );
}
