"use client";

import { WritingResult } from "@/types/ielts";
import { BandScoreRing } from "@/components/shared/BandScoreRing";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ScoreCardProps {
  result: WritingResult;
  taskType: "task1" | "task2";
}

const CRITERIA_LABELS_T2: Record<string, string> = {
  task_response: "Task Response",
  coherence_cohesion: "Coherence & Cohesion",
  lexical_resource: "Lexical Resource",
  grammatical_range: "Grammatical Range",
};

const CRITERIA_LABELS_T1: Record<string, string> = {
  task_achievement: "Task Achievement",
  coherence_cohesion: "Coherence & Cohesion",
  lexical_resource: "Lexical Resource",
  grammatical_range: "Grammatical Range",
};

export function ScoreCard({ result, taskType }: ScoreCardProps) {
  const labels = taskType === "task1" ? CRITERIA_LABELS_T1 : CRITERIA_LABELS_T2;

  const criteria = Object.entries(result.scores)
    .filter(([key]) => key !== "overall")
    .map(([key, value]) => ({
      key,
      label: labels[key] || key,
      value: value as number,
    }))
    .filter((c) => c.value !== undefined);

  return (
    <div className="space-y-4">
      {/* Overall band + summary */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <BandScoreRing band={result.scores.overall} size={130} />
            <div className="flex-1 space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Overall Band</p>
                <p className="text-2xl font-mono font-bold">
                  {result.scores.overall.toFixed(1)}
                </p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {result.summary}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Criterion rings */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Criterion Scores
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {criteria.map(({ key, label, value }) => (
              <BandScoreRing
                key={key}
                band={value}
                size={80}
                strokeWidth={7}
                label={label}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Strengths & Weaknesses */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-emerald-600">
              ✓ Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1.5">
              {result.strengths.map((s, i) => (
                <li key={i} className="text-sm text-muted-foreground flex gap-2">
                  <span className="text-emerald-500 shrink-0">•</span>
                  {s}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-red-600">
              ✗ Weaknesses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1.5">
              {result.weaknesses.map((w, i) => (
                <li key={i} className="text-sm text-muted-foreground flex gap-2">
                  <span className="text-red-500 shrink-0">•</span>
                  {w}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Next actions */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Next Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {result.next_actions.map((action, i) => (
              <Badge key={i} variant="secondary" className="text-xs">
                {i + 1}. {action}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
