import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { geminiFlash } from "@/lib/gemini/client";
import { writingTask1Prompt, writingTask2Prompt } from "@/lib/gemini/prompts";
import { writingResultSchema } from "@/lib/gemini/schemas";
import { checkDailyLimit } from "@/lib/utils/rate-limit";
import { z } from "zod";

const requestSchema = z.object({
  taskType: z.enum(["task1", "task2"]),
  question: z.string().min(10),
  essay: z.string().min(20),
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

    const { taskType, question, essay } = parsed.data;
    const prompt =
      taskType === "task1"
        ? writingTask1Prompt(essay, question)
        : writingTask2Prompt(essay, question);

    // Call Gemini — retry once on Zod fail
    let result;
    let rawText = "";
    try {
      const geminiResult = await geminiFlash.generateContent(prompt);
      rawText = geminiResult.response.text();
      const rawJson = JSON.parse(rawText);
      result = writingResultSchema.parse(rawJson);
    } catch {
      // Retry with stricter suffix
      const retryPrompt =
        prompt +
        "\n\nReminder: return ONLY valid JSON matching the schema exactly. No markdown, no backticks, no preamble.";
      try {
        const retryResult = await geminiFlash.generateContent(retryPrompt);
        rawText = retryResult.response.text();
        const rawJson = JSON.parse(rawText);
        result = writingResultSchema.parse(rawJson);
      } catch {
        return NextResponse.json(
          { error: "AI scoring failed. Please try again." },
          { status: 500 }
        );
      }
    }

    // Save to DB
    const overallBand = result.scores.overall;
    const { data: attempt, error: dbError } = await supabase
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

    if (dbError) {
      // Still return result even if DB fails
    }

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
