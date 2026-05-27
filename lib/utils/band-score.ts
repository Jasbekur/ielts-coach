/**
 * Real IELTS band scores are always in 0.5 increments:
 * 1.0, 1.5, 2.0 ... 8.5, 9.0
 * AI may return raw decimals (6.3, 7.2) — always round before display or storage.
 */
export function roundBand(score: number): number {
  // Clamp to IELTS range [1, 9] then round to nearest 0.5
  const clamped = Math.min(9, Math.max(1, score));
  return Math.round(clamped * 2) / 2;
}

/**
 * Format band score for display: always shows one decimal (e.g. 7.0, 6.5)
 */
export function formatBand(score: number): string {
  return roundBand(score).toFixed(1);
}
