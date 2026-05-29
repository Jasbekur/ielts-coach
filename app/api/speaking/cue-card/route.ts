import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { geminiFlash } from "@/lib/gemini/client";
import { cueCardPrompt } from "@/lib/gemini/prompts";
import { cueCardSchema } from "@/lib/gemini/schemas";

// Cache TTL: 1 hour
const CACHE_TTL_MS = 60 * 60 * 1000;

export async function GET() {
  const supabase = await createClient();

  // Require authentication — prevents unauthenticated API abuse
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Try DB-backed cache first (works across serverless instances)
    const { data: cached } = await supabase
      .from("cue_card_cache")
      .select("card_data, expires_at")
      .eq("id", "shared")
      .single();

    if (cached && new Date(cached.expires_at) > new Date()) {
      return NextResponse.json(cached.card_data);
    }

    // Generate a new card
    const result = await geminiFlash.generateContent(cueCardPrompt());
    const rawText = result.response.text();
    const cleaned = rawText.replace(/^```(?:json)?\s*/i, "").replace(/\s*```\s*$/i, "").trim();
    const rawJson = JSON.parse(cleaned);
    const card = cueCardSchema.parse(rawJson);

    // Upsert into DB cache (non-fatal if table doesn't exist yet)
    try {
      const expiresAt = new Date(Date.now() + CACHE_TTL_MS).toISOString();
      await supabase
        .from("cue_card_cache")
        .upsert({ id: "shared", card_data: card, expires_at: expiresAt });
    } catch {
      // Cache write failure is non-fatal — card still returned
    }

    return NextResponse.json(card);
  } catch {
    return NextResponse.json(
      { error: "Failed to generate cue card" },
      { status: 500 }
    );
  }
}
