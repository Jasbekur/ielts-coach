export type TaskType = "task1" | "task2";
export type SpeakingPart = 1 | 2 | 3;
export type AttemptMode = "writing" | "speaking" | "listening" | "reading";

export interface WritingScores {
  task_response?: number;
  task_achievement?: number;
  coherence_cohesion: number;
  lexical_resource: number;
  grammatical_range: number;
  overall: number;
}

export interface SpeakingScores {
  fluency_coherence: number;
  lexical_resource: number;
  grammatical_range: number;
  pronunciation: number;
  overall: number;
}

export interface Correction {
  original: string;
  fixed: string;
  reason: string;
  category: "grammar" | "vocabulary" | "cohesion" | "task";
}

export interface PronunciationIssue {
  word: string;
  issue: string;
  fix: string;
}

export interface GrammarIssue {
  said: string;
  should_be: string;
  reason: string;
}

export interface ModelAnswers {
  band5: string;
  band6: string;
  band7: string;
  band8: string;
}

export interface WritingResult {
  essay_type?: "opinion" | "discuss_both_views" | "problem_solution" | "advantages_disadvantages" | "direct_question";
  has_overview?: boolean;
  scores: WritingScores;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  corrections: Correction[];
  /** @deprecated use model_answers */
  band_8_rewrite?: string;
  model_answers?: ModelAnswers;
  next_actions: string[];
}

export interface VocabSuggestion {
  basic_word: string;
  better_word: string;
  example: string;
}

export interface SpeakingResult {
  transcript: string;
  scores: SpeakingScores;
  duration_seconds: number;
  word_count: number;
  words_per_minute?: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  pronunciation_issues: PronunciationIssue[];
  grammar_issues: GrammarIssue[];
  vocabulary_suggestions?: VocabSuggestion[];
  /** @deprecated use model_answers */
  model_answer?: string;
  model_answers?: ModelAnswers;
  next_actions: string[];
}

export interface CueCard {
  topic: string;
  bullets: string[];
}

export interface Attempt {
  id: string;
  user_id: string;
  mode: AttemptMode;
  task_type: string;
  input_text?: string;
  audio_url?: string;
  prompt_text?: string;
  result: WritingResult | SpeakingResult;
  overall_band: number;
  created_at: string;
}

export interface Profile {
  id: string;
  full_name?: string;
  target_band?: number;
  created_at: string;
}

export type BandColor =
  | "red"
  | "amber"
  | "emerald"
  | "violet";

export function getBandColor(band: number): BandColor {
  if (band < 5) return "red";
  if (band < 7) return "amber";
  if (band < 8.5) return "emerald";
  return "violet";
}

export function getBandTailwind(band: number): string {
  if (band < 5) return "text-red-500";
  if (band < 7) return "text-amber-500";
  if (band < 8.5) return "text-emerald-500";
  return "text-violet-500";
}

export function getBandBg(band: number): string {
  if (band < 5) return "bg-red-500";
  if (band < 7) return "bg-amber-500";
  if (band < 8.5) return "bg-emerald-500";
  return "bg-violet-500";
}
