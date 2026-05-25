"use client";

import { SpeakingPart } from "@/types/ielts";
import { cn } from "@/lib/utils";

interface PartSelectorProps {
  selected: SpeakingPart;
  onChange: (part: SpeakingPart) => void;
}

const PARTS: { value: SpeakingPart; label: string; desc: string }[] = [
  { value: 1, label: "Part 1", desc: "Interview (4–5 questions)" },
  { value: 2, label: "Part 2", desc: "Cue Card (2 min)" },
  { value: 3, label: "Part 3", desc: "Discussion (4–5 questions)" },
];

export function PartSelector({ selected, onChange }: PartSelectorProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {PARTS.map(({ value, label, desc }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={cn(
            "rounded-lg border p-3 text-left transition-all",
            selected === value
              ? "border-violet-400 bg-violet-50 dark:bg-violet-950"
              : "border-border hover:border-violet-300 hover:bg-accent/50"
          )}
        >
          <div
            className={cn(
              "text-sm font-semibold",
              selected === value ? "text-violet-600" : "text-foreground"
            )}
          >
            {label}
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">{desc}</div>
        </button>
      ))}
    </div>
  );
}
