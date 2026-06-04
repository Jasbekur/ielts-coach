"use client";

import { Textarea } from "@/components/ui/textarea";
import { wordCount } from "@/lib/utils/word-count";
import { cn } from "@/lib/utils";

interface EssayEditorProps {
  value: string;
  onChange: (value: string) => void;
  minWords: number;
  placeholder?: string;
  label?: string;
}

export function EssayEditor({
  value,
  onChange,
  minWords,
  placeholder,
  label = "Your answer",
}: EssayEditorProps) {
  const count = wordCount(value);
  const isUnder = count < minWords;
  const isGood = count >= minWords && count <= minWords + 150;

  return (
    <div className="space-y-1.5">
      {label && (
        <label className="text-sm font-medium text-foreground">{label}</label>
      )}
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-h-[280px] resize-none"
        /* IELTS exam: disable browser writing aids */
        spellCheck={false}
        autoCorrect="off"
        autoCapitalize="off"
        autoComplete="off"
        style={{
          fontFamily: "'Lora', Georgia, serif",
          fontSize: "16px",
          lineHeight: "1.8",
          letterSpacing: "0.01em",
        }}
      />
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">
          Minimum {minWords} words
        </span>
        <span
          className={cn(
            "font-mono font-semibold transition-colors",
            isUnder
              ? "text-red-600 font-bold"   /* bold red below minimum */
              : isGood
              ? "text-emerald-600"          /* green at target range  */
              : "text-amber-600"            /* amber when very long   */
          )}
        >
          {count} / {minWords}+ words
          {isUnder && count > 0 && (
            <span className="ml-1.5 text-red-400 font-normal">
              ({minWords - count} more)
            </span>
          )}
        </span>
      </div>
    </div>
  );
}
