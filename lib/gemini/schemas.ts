import { z } from "zod";

const modelAnswersSchema = z.object({
  band5: z.string(),
  band6: z.string(),
  band7: z.string(),
  band8: z.string(),
});

export const writingResultSchema = z.object({
  essay_type: z
    .enum(["opinion", "discuss_both_views", "problem_solution", "advantages_disadvantages", "direct_question"])
    .optional(),
  has_overview: z.boolean().optional(),
  scores: z.object({
    task_response: z.number().min(0).max(9).optional(),
    task_achievement: z.number().min(0).max(9).optional(),
    coherence_cohesion: z.number().min(0).max(9),
    lexical_resource: z.number().min(0).max(9),
    grammatical_range: z.number().min(0).max(9),
    overall: z.number().min(0).max(9),
  }),
  summary: z.string(),
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  corrections: z.array(
    z.object({
      original: z.string(),
      fixed: z.string(),
      reason: z.string(),
      category: z.enum(["grammar", "vocabulary", "cohesion", "task"]),
    })
  ),
  band_8_rewrite: z.string().optional(),
  model_answers: modelAnswersSchema.optional(),
  next_actions: z.array(z.string()),
});

export const speakingResultSchema = z.object({
  transcript: z.string(),
  scores: z.object({
    fluency_coherence: z.number().min(0).max(9),
    lexical_resource: z.number().min(0).max(9),
    grammatical_range: z.number().min(0).max(9),
    pronunciation: z.number().min(0).max(9),
    overall: z.number().min(0).max(9),
  }),
  duration_seconds: z.number(),
  word_count: z.number(),
  words_per_minute: z.number().optional(),
  summary: z.string(),
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  pronunciation_issues: z.array(
    z.object({
      word: z.string(),
      issue: z.string(),
      fix: z.string(),
    })
  ),
  grammar_issues: z.array(
    z.object({
      said: z.string(),
      should_be: z.string(),
      reason: z.string(),
    })
  ),
  vocabulary_suggestions: z
    .array(
      z.object({
        basic_word: z.string(),
        better_word: z.string(),
        example: z.string(),
      })
    )
    .optional(),
  model_answer: z.string().optional(),
  model_answers: modelAnswersSchema.optional(),
  next_actions: z.array(z.string()),
});

export const cueCardSchema = z.object({
  topic: z.string(),
  bullets: z.array(z.string()),
});

export type WritingResultSchema = z.infer<typeof writingResultSchema>;
export type SpeakingResultSchema = z.infer<typeof speakingResultSchema>;
export type CueCardSchema = z.infer<typeof cueCardSchema>;
