import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { geminiFlash } from "@/lib/gemini/client";
import { speakingPrompt } from "@/lib/gemini/prompts";
import { speakingResultSchema } from "@/lib/gemini/schemas";
import { checkDailyLimit } from "@/lib/utils/rate-limit";
import { blobToBase64 } from "@/lib/utils/audio";
import { roundBand } from "@/lib/utils/band-score";

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

    // Parse multipart form data
    const formData = await req.formData();
    const audioFile = formData.get("audio") as Blob | null;
    const partStr = formData.get("part") as string | null;
    const question = formData.get("question") as string | null;

    if (!audioFile || !partStr || !question) {
      return NextResponse.json(
        { error: "Missing audio, part, or question" },
        { status: 400 }
      );
    }

    const part = parseInt(partStr) as 1 | 2 | 3;
    if (![1, 2, 3].includes(part)) {
      return NextResponse.json(
        { error: "Invalid part number" },
        { status: 400 }
      );
    }

    // Convert to base64
    const base64Audio = await blobToBase64(audioFile);
    const mimeType = audioFile.type || "audio/webm";

    // Build prompt + call Gemini with audio
    const prompt = speakingPrompt(part, question);

    let result;
    try {
      const geminiResult = await geminiFlash.generateContent([
        prompt,
        { inlineData: { mimeType, data: base64Audio } },
      ]);
      const rawText = geminiResult.response.text();
      const rawJson = JSON.parse(rawText);
      result = speakingResultSchema.parse(rawJson);
    } catch {
      // Retry once
      const retryPrompt =
        prompt +
        "\n\nReminder: return ONLY valid JSON matching the schema exactly. No markdown, no backticks.";
      try {
        const retryResult = await geminiFlash.generateContent([
          retryPrompt,
          { inlineData: { mimeType, data: base64Audio } },
        ]);
        const rawText = retryResult.response.text();
        const rawJson = JSON.parse(rawText);
        result = speakingResultSchema.parse(rawJson);
      } catch {
        return NextResponse.json(
          { error: "AI scoring failed. Please try again." },
          { status: 500 }
        );
      }
    }

    // Upload audio to Supabase Storage
    const attemptId = crypto.randomUUID();
    let audioUrl: string | null = null;

    try {
      const { error: uploadError } = await supabase.storage
        .from("speaking-audio")
        .upload(`${user.id}/${attemptId}.webm`, audioFile, {
          contentType: mimeType,
          upsert: false,
        });

      if (!uploadError) {
        const { data: signedData } = await supabase.storage
          .from("speaking-audio")
          .createSignedUrl(`${user.id}/${attemptId}.webm`, 60 * 60 * 24 * 7); // 7 days

        audioUrl = signedData?.signedUrl ?? null;
      }
    } catch {
      // Storage failure is non-fatal
    }

    // Round all scores to real IELTS 0.5 increments before saving/returning
    result.scores.overall            = roundBand(result.scores.overall);
    result.scores.fluency_coherence  = roundBand(result.scores.fluency_coherence);
    result.scores.lexical_resource   = roundBand(result.scores.lexical_resource);
    result.scores.grammatical_range  = roundBand(result.scores.grammatical_range);
    result.scores.pronunciation      = roundBand(result.scores.pronunciation);

    // Save attempt
    const { data: attempt } = await supabase
      .from("attempts")
      .insert({
        id: attemptId,
        user_id: user.id,
        mode: "speaking",
        task_type: `part${part}`,
        prompt_text: question,
        audio_url: audioUrl,
        result,
        overall_band: result.scores.overall,
      })
      .select("id")
      .single();

    return NextResponse.json({
      result,
      attemptId: attempt?.id ?? attemptId,
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
