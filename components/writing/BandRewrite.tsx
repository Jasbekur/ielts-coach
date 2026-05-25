"use client";

import { useState } from "react";
import { WritingResult } from "@/types/ielts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Copy, Check } from "lucide-react";

interface BandRewriteProps {
  result: WritingResult;
}

export function BandRewrite({ result }: BandRewriteProps) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(result.band_8_rewrite);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Card className="border-violet-200">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-violet-600">
            ✦ Band 8 Model Answer
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={handleCopy}>
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </Button>
          </div>
        </div>
        {!expanded && (
          <p className="text-xs text-muted-foreground">
            Click to reveal examiner-level rewrite
          </p>
        )}
      </CardHeader>
      {expanded && (
        <CardContent>
          <p className="text-sm leading-relaxed whitespace-pre-wrap text-foreground">
            {result.band_8_rewrite}
          </p>
        </CardContent>
      )}
    </Card>
  );
}
