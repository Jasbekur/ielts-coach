"use client";

import { CueCard as CueCardType } from "@/types/ielts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PencilLine } from "lucide-react";

interface CueCardProps {
  cueCard: CueCardType;
  prepTimeLeft?: number;
  isPrep?: boolean;
}

export function CueCard({ cueCard, prepTimeLeft, isPrep }: CueCardProps) {
  return (
    <Card className="border-violet-200 bg-gradient-to-br from-violet-50 to-white dark:from-violet-950 dark:to-background">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold text-violet-700 dark:text-violet-300">
            {cueCard.topic}
          </CardTitle>
          {isPrep && prepTimeLeft !== undefined && (
            <div className="flex items-center gap-1.5 text-sm font-mono font-bold text-violet-600">
              <PencilLine className="w-3.5 h-3.5" />
              Prep: {prepTimeLeft}s
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-1.5">
          {cueCard.bullets.map((bullet, i) => (
            <li
              key={i}
              className={`text-sm ${
                i === 0
                  ? "text-muted-foreground font-medium"
                  : "text-foreground"
              }`}
            >
              {i === 0 ? bullet : `• ${bullet}`}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
