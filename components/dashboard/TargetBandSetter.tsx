"use client";

import { useState, useTransition } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { Target, Check, Pencil } from "lucide-react";

const BAND_OPTIONS = [5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0];

interface Props {
  userId: string;
  currentTarget: number | null;
}

export function TargetBandSetter({ userId, currentTarget }: Props) {
  const [editing, setEditing] = useState(false);
  const [selected, setSelected] = useState<number | null>(currentTarget);
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

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

  if (!editing) {
    return (
      <div className="flex items-center gap-1.5">
        <Target className="w-3.5 h-3.5 text-violet-500" />
        <p className="text-xs text-muted-foreground">Target</p>
        <button
          onClick={() => setEditing(true)}
          className="ml-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Edit target band"
        >
          {saved ? (
            <Check className="w-3 h-3 text-emerald-500" />
          ) : (
            <Pencil className="w-3 h-3" />
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-1.5">
        <Target className="w-3.5 h-3.5 text-violet-500" />
        <p className="text-xs font-medium text-muted-foreground">Set your target band</p>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {BAND_OPTIONS.map((band) => (
          <button
            key={band}
            onClick={() => handleSave(band)}
            disabled={isPending}
            className={`text-xs px-2.5 py-1 rounded-full border transition-all font-mono font-semibold ${
              selected === band
                ? "bg-violet-500 text-white border-violet-500"
                : "border-border hover:border-violet-300 hover:bg-violet-50 dark:hover:bg-violet-950"
            }`}
          >
            {band.toFixed(1)}
          </button>
        ))}
        <button
          onClick={() => setEditing(false)}
          className="text-xs px-2.5 py-1 rounded-full border border-border text-muted-foreground hover:text-foreground transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
