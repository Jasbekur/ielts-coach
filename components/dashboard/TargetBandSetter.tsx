"use client";

import { useState, useTransition } from "react";
import { createClient } from "@/lib/supabase/client";
import { Target, Check, Pencil } from "lucide-react";
import { toast } from "sonner";

const BAND_OPTIONS = [5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0];

interface Props {
  userId: string;
  currentTarget: number | null;
  currentAvg?: number | null;
}

export function TargetBandSetter({ userId, currentTarget, currentAvg }: Props) {
  const [editing, setEditing] = useState(!currentTarget);
  const [selected, setSelected] = useState<number | null>(currentTarget);
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();
  const supabase = createClient();

  function handleSave(band: number) {
    setSelected(band);
    startTransition(async () => {
      const { error } = await supabase.from("profiles").update({ target_band: band }).eq("id", userId);
      if (error) { toast.error("Failed to save target band"); return; }
      toast.success("Target band saved!");
      setSaved(true);
      setEditing(false);
      setTimeout(() => setSaved(false), 2000);
    });
  }

  const gap = selected && currentAvg ? selected - currentAvg : null;

  if (!editing) {
    return (
      <div>
        {/* Header row */}
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Target</p>
          <div className="flex items-center gap-1">
            <div className="w-6 h-6 rounded-lg bg-red-100 dark:bg-red-900/50 flex items-center justify-center">
              <Target className="w-3 h-3 text-red-600" />
            </div>
          </div>
        </div>

        {/* Band number */}
        <p className="text-3xl font-display leading-none tracking-nums mb-1.5">
          {selected?.toFixed(1) ?? "—"}
        </p>

        {/* Gap status + edit */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            {gap === null ? (
              <span>band goal</span>
            ) : gap <= 0 ? (
              <span className="text-red-600 dark:text-red-400 font-medium">✓ Reached!</span>
            ) : (
              <span className="text-amber-600 dark:text-amber-400 font-medium">+{gap.toFixed(1)} to go</span>
            )}
          </p>
          <button
            onClick={() => setEditing(true)}
            className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            title="Change target band"
          >
            {saved
              ? <Check className="w-3 h-3 text-green-600" />
              : <Pencil className="w-3 h-3" />}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2 -mt-0.5">
      <div className="flex items-center gap-1.5">
        <Target className="w-3.5 h-3.5 text-red-600 shrink-0" />
        <p className="text-xs font-semibold">
          {currentTarget ? "Change target" : "Set target band"}
        </p>
      </div>
      <div className="flex flex-wrap gap-1">
        {BAND_OPTIONS.map((band) => (
          <button
            key={band}
            onClick={() => handleSave(band)}
            disabled={isPending}
            className={`text-[11px] px-2 py-1 rounded-lg border transition-all font-mono font-bold ${
              selected === band
                ? "bg-red-600 text-white border-red-600"
                : "border-border hover:border-red-300 hover:bg-red-50 dark:hover:bg-red-950/50"
            }`}
          >
            {band.toFixed(1)}
          </button>
        ))}
        {currentTarget && (
          <button
            onClick={() => setEditing(false)}
            className="text-[11px] px-2 py-1 rounded-lg border border-border text-muted-foreground hover:text-foreground transition-colors"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
