"use client";

import { SpeakingPart } from "@/types/ielts";
import { cn } from "@/lib/utils";
import { MessageSquare, FileText, Users } from "lucide-react";

interface PartSelectorProps {
  selected: SpeakingPart;
  onChange: (part: SpeakingPart) => void;
}

const PARTS: { value: SpeakingPart; label: string; sublabel: string; desc: string; icon: React.ElementType }[] = [
  { value: 1, icon: MessageSquare, label: "Part 1",    sublabel: "Interview",   desc: "Introduction and general questions about familiar topics. 3–4 topics, 4–5 questions each." },
  { value: 2, icon: FileText,      label: "Part 2",    sublabel: "Cue Card",    desc: "1 min prep time followed by a 2 min uninterrupted talk on a specific topic." },
  { value: 3, icon: Users,         label: "Part 3",    sublabel: "Discussion",  desc: "In-depth discussion on abstract themes linked to the topic in Part 2. 2–3 min each." },
];

const PRIMARY = "#1d4ed8";

export function PartSelector({ selected, onChange }: PartSelectorProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {PARTS.map(({ value, label, sublabel, desc, icon: Icon }) => {
        const active = selected === value;
        return (
          <button
            key={value}
            onClick={() => onChange(value)}
            className={cn(
              "rounded-2xl p-4 text-left transition-all hover:-translate-y-0.5",
              active ? "ring-2" : "border hover:border-blue-300"
            )}
            style={active ? {
              background: "white",
              border: `2px solid ${PRIMARY}`,
              boxShadow: `0 0 0 4px rgba(5,150,105,0.1), 0 4px 16px rgba(5,150,105,0.15)`,
            } : {
              background: "white",
              border: "1px solid #e5e7eb",
              boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
            }}
          >
            <div className="flex justify-between items-start mb-4">
              <div
                className="p-2.5 rounded-xl"
                style={active
                  ? { background: PRIMARY, color: "white" }
                  : { background: "#f3f4f6", color: "#6b7280" }}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span
                className="text-base font-bold"
                style={{ color: active ? PRIMARY : "#6b7280" }}
              >
                {label}
              </span>
            </div>
            <p className="text-sm font-bold text-foreground mb-1">{sublabel}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
            {active && (
              <div className="mt-3 h-1 rounded-full" style={{ background: PRIMARY }} />
            )}
          </button>
        );
      })}
    </div>
  );
}
