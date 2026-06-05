"use client";

import { useState } from "react";
import { WritingResult } from "@/types/ielts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check, ChevronDown, ChevronUp, Sparkles } from "lucide-react";

interface BandRewriteProps {
  result: WritingResult;
}

type BandKey = "band5" | "band6" | "band7" | "band8";

const BAND_TABS: { key: BandKey; label: string; color: string; bg: string; ring: string; desc: string }[] = [
  {
    key: "band5",
    label: "Band 5",
    color: "text-red-600",
    bg: "bg-red-500",
    ring: "ring-red-300",
    desc: "Simple sentences, basic vocabulary — a good first step",
  },
  {
    key: "band6",
    label: "Band 6",
    color: "text-amber-600",
    bg: "bg-amber-500",
    ring: "ring-amber-300",
    desc: "Adequate structure, reasonable vocabulary — clear and competent",
  },
  {
    key: "band7",
    label: "Band 7",
    color: "text-green-600",
    bg: "bg-green-500",
    ring: "ring-red-300",
    desc: "Good range, mostly accurate — well organised and convincing",
  },
  {
    key: "band8",
    label: "Band 8+",
    color: "text-green-600",
    bg: "bg-red-600",
    ring: "ring-red-300",
    desc: "Sophisticated, idiomatic — examiner-level quality",
  },
];

function getDefaultBand(score: number): BandKey {
  if (score <= 5.0) return "band5";
  if (score <= 6.0) return "band6";
  if (score <= 7.0) return "band7";
  return "band8";
}

export function BandRewrite({ result }: BandRewriteProps) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  // Support both new model_answers and legacy band_8_rewrite
  const hasMultiBand = !!result.model_answers;
  const defaultBand = getDefaultBand(result.scores.overall);
  const [selectedBand, setSelectedBand] = useState<BandKey>(defaultBand);

  const currentText = hasMultiBand
    ? result.model_answers![selectedBand]
    : (result.band_8_rewrite ?? "");

  async function handleCopy() {
    await navigator.clipboard.writeText(currentText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const selectedTab = BAND_TABS.find(t => t.key === selectedBand)!;

  return (
    <Card className="border-red-200 dark:border-red-800">
      <CardHeader className="pb-0">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-sm font-medium text-green-600 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Model Answer
          </CardTitle>
          <div className="flex items-center gap-1">
            {expanded && (
              <Button variant="ghost" size="sm" onClick={handleCopy} className="h-7 w-7 p-0">
                {copied
                  ? <Check className="w-3.5 h-3.5 text-green-600" />
                  : <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                }
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)} className="h-7 w-7 p-0">
              {expanded
                ? <ChevronUp className="w-3.5 h-3.5 text-muted-foreground" />
                : <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
              }
            </Button>
          </div>
        </div>

        {!expanded && (
          <p className="text-xs text-muted-foreground pb-3">
            Choose your target band · click to reveal
          </p>
        )}
      </CardHeader>

      {expanded && (
        <CardContent className="space-y-4 pt-3">
          {hasMultiBand ? (
            <>
              {/* Band selector pills */}
              <div className="flex flex-wrap gap-2">
                {BAND_TABS.map(tab => {
                  const isSelected = selectedBand === tab.key;
                  const isDefault = tab.key === defaultBand;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setSelectedBand(tab.key)}
                      className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                        isSelected
                          ? `${tab.bg} text-white border-transparent shadow-sm`
                          : "bg-background border-border text-muted-foreground hover:border-red-300 hover:text-foreground"
                      }`}
                    >
                      {tab.label}
                      {isDefault && (
                        <span className={`text-[10px] font-normal ${isSelected ? "text-white/80" : "text-green-600"}`}>
                          ← your level
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Description */}
              <div className={`text-xs rounded-lg px-3 py-2 border ${
                selectedBand === "band5" ? "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300" :
                selectedBand === "band6" ? "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300" :
                selectedBand === "band7" ? "bg-green-50 dark:bg-emerald-950/20 border-red-200 dark:border-red-800 text-emerald-700 dark:text-emerald-300" :
                "bg-green-50 dark:bg-emerald-950/20 border-red-200 dark:border-red-800 text-emerald-700 dark:text-emerald-300"
              }`}>
                <span className="font-semibold">{selectedTab.label}:</span> {selectedTab.desc}
              </div>
            </>
          ) : (
            <div className="text-xs text-muted-foreground italic">
              Band-level selector available on new submissions.
            </div>
          )}

          {/* The answer text */}
          <div className="relative">
            <p className="text-sm leading-relaxed whitespace-pre-wrap text-foreground">
              {currentText}
            </p>
          </div>

          {/* Upgrade nudge */}
          {hasMultiBand && selectedBand !== "band8" && (
            <div className="text-xs text-muted-foreground border-t pt-3 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-red-400" />
              Compare with{" "}
              <button
                onClick={() => setSelectedBand("band8")}
                className="text-green-600 hover:underline font-medium"
              >
                Band 8+ answer
              </button>{" "}
              to see the full range of improvement.
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}
