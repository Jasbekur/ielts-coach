"use client";

import { getBandTailwind } from "@/types/ielts";

interface BandScoreRingProps {
  band: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  animated?: boolean;
}

export function BandScoreRing({
  band,
  size = 120,
  strokeWidth = 10,
  label,
  animated = true,
}: BandScoreRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (band / 9) * circumference;
  const colorClass = getBandTailwind(band);

  const getStrokeColor = () => {
    if (band < 5) return "#ef4444"; // red-500
    if (band < 7) return "#f59e0b"; // amber-500
    if (band < 8.5) return "#10b981"; // emerald-500
    return "#8b5cf6"; // violet-500
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90"
        >
          {/* Background ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-muted"
            opacity={0.15}
          />
          {/* Progress ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={getStrokeColor()}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            style={
              animated
                ? { transition: "stroke-dashoffset 1s ease-in-out" }
                : undefined
            }
          />
        </svg>
        {/* Band score text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className={`font-mono font-bold ${colorClass}`}
            style={{ fontSize: size * 0.28 }}
          >
            {band.toFixed(1)}
          </span>
        </div>
      </div>
      {label && (
        <span className="text-xs text-muted-foreground text-center leading-tight max-w-[80px]">
          {label}
        </span>
      )}
    </div>
  );
}
