"use client";

import { useState, useTransition } from "react";
import { createClient } from "@/lib/supabase/client";
import { Target, Check, Pencil } from "lucide-react";

const BAND_OPTIONS = [5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0];

interface Props {
  userId: string;
  currentTarget: number | null;
  currentAvg?: number | null; // user's recent average band
}

export function TargetBandSetter({ userId, currentTarget, currentAvg }: Props) {
  const [editing, setEditing] = useState(!currentTarget); // open picker if no target set yet
  const [selected, setSelected] = useState<number | null>(currentTarget);
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();
  const supabase = createClient();

  function handleSave(band: number) {
    setSelected(band);
    startTransition(async () => {
      await supabase
        .from("profiles")
        .update({ target_band: band })
        .eq("id", userId);
      setSaved(true);
      setEditing(false);
      setTimeout(() => setSaved(false), 2000);
    });
  }

  const gap = selected && currentAvg ? selected - currentAvg : null;

  if (!editing) {
    return (
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-violet-100 dark:bg-violet-900 flex items-center justify-center shrink-0">
            <Target className="w-3.5 h-3.5 text-violet-500" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground leading-tight">Target Band</p>
            <p className="font-mono font-bold text-lg leading-tight">{selected?.toFixed(1) ?? "—"}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {gap !== null && (
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              gap <= 0
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"
                : "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300"
            }`}>
              {gap <= 0 ? "✓ Goal reached!" : `+${gap.toFixed(1)} to go`}
            </span>
          )}
          <button
            onClick={() => setEditing(true)}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            title="Change target band"
          >
            {saved ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Pencil className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Target className="w-4 h-4 text-violet-500" />
        <p className="text-sm font-medium">
          {currentTarget ? "Change your target band" : "Set your target band score"}
        </p>
      </div>
      <p className="text-xs text-muted-foreground">
        What IELTS band score do you need? (e.g. university usually requires 6.5 or 7.0)
      </p>
      <div className="flex flex-wrap gap-1.5">
        {BAND_OPTIONS.map((band) => (
          <button
            key={band}
            onClick={() => handleSave(band)}
            disabled={isPending}
            className={`text-xs px-3 py-1.5 rounded-full border transition-all font-mono font-semibold ${
              selected === band
                ? "bg-violet-500 text-white border-violet-500 shadow-sm"
                : "border-border hover:border-violet-300 hover:bg-violet-50 dark:hover:bg-violet-950/50"
            }`}
          >
            {band.toFixed(1)}
          </button>
        ))}
        {currentTarget && (
          <button
            onClick={() => setEditing(false)}
            className="text-xs px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:text-foreground transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
