import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { geminiFlash } from "@/lib/gemini/client";
import { writingTask1Prompt, writingTask2Prompt } from "@/lib/gemini/prompts";
import { writingResultSchema } from "@/lib/gemini/schemas";
import { checkDailyLimit } from "@/lib/utils/rate-limit";
import { roundBand } from "@/lib/utils/band-score";
import { z } from "zod";

const requestSchema = z.object({
  taskType: z.enum(["task1", "task2"]),
  question: z.string().min(10),
  essay: z.string().min(20),
  imageBase64: z.string().optional(),
  imageMimeType: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Rate limit
    const { remaining } = await checkDailyLimit(user.id, supabase);
    if (remaining <= 0) {
      return NextResponse.json(
        { error: "Daily limit reached. Resets at midnight UTC." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = requestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { taskType, question, essay, imageBase64, imageMimeType } = parsed.data;

    const prompt =
      taskType === "task1"
        ? writingTask1Prompt(essay, question, !!imageBase64)
        : writingTask2Prompt(essay, question);

    // Build content parts — include image for Task 1 if provided
    type GeminiPart = string | { inlineData: { data: string; mimeType: string } };
    const parts: GeminiPart[] = [prompt];
    if (taskType === "task1" && imageBase64 && imageMimeType) {
      parts.push({
        inlineData: {
          data: imageBase64,
          mimeType: imageMimeType,
        },
      });
    }

    // Call Gemini — retry once on Zod/parse fail
    let result;
    let rawText = "";
    try {
      const geminiResult = await geminiFlash.generateContent(parts);
      rawText = geminiResult.response.text();
      // Strip markdown fences if Gemini wraps in ```json ... ```
      const cleaned = rawText.replace(/^```(?:json)?\s*/i, "").replace(/\s*```\s*$/i, "").trim();
      const rawJson = JSON.parse(cleaned);
      result = writingResultSchema.parse(rawJson);
    } catch (firstErr) {
      console.error("[writing/score] First attempt failed:", firstErr, "\nRaw:", rawText.slice(0, 500));
      const retryPrompt =
        prompt +
        "\n\nIMPORTANT: Return ONLY valid JSON. No markdown code fences, no backticks, no text before or after the JSON object.";
      const retryParts: GeminiPart[] = [retryPrompt];
      if (taskType === "task1" && imageBase64 && imageMimeType) {
        retryParts.push({ inlineData: { data: imageBase64, mimeType: imageMimeType } });
      }
      try {
        const retryResult = await geminiFlash.generateContent(retryParts);
        rawText = retryResult.response.text();
        const cleaned2 = rawText.replace(/^```(?:json)?\s*/i, "").replace(/\s*```\s*$/i, "").trim();
        const rawJson = JSON.parse(cleaned2);
        result = writingResultSchema.parse(rawJson);
      } catch (secondErr) {
        console.error("[writing/score] Retry also failed:", secondErr, "\nRaw:", rawText.slice(0, 500));
        return NextResponse.json(
          { error: "AI scoring failed. Please try again." },
          { status: 500 }
        );
      }
    }

    // Round all scores to real IELTS 0.5 increments before saving/returning
    result.scores.overall = roundBand(result.scores.overall);
    if (result.scores.task_response)   result.scores.task_response   = roundBand(result.scores.task_response);
    if (result.scores.task_achievement) result.scores.task_achievement = roundBand(result.scores.task_achievement);
    if (result.scores.coherence_cohesion) result.scores.coherence_cohesion = roundBand(result.scores.coherence_cohesion);
    if (result.scores.lexical_resource) result.scores.lexical_resource = roundBand(result.scores.lexical_resource);
    if (result.scores.grammatical_range) result.scores.grammatical_range = roundBand(result.scores.grammatical_range);

    // Save to DB
    const overallBand = result.scores.overall;
    const { data: attempt } = await supabase
      .from("attempts")
      .insert({
        user_id: user.id,
        mode: "writing",
        task_type: taskType,
        input_text: essay,
        prompt_text: question,
        result,
        overall_band: overallBand,
      })
      .select("id")
      .single();

    return NextResponse.json({
      result,
      attemptId: attempt?.id,
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
