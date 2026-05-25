import { NextResponse } from "next/server";
import { geminiFlash } from "@/lib/gemini/client";
import { cueCardPrompt } from "@/lib/gemini/prompts";
import { cueCardSchema } from "@/lib/gemini/schemas";

// In-memory cache (1 hour)
let cachedCard: { data: unknown; expiresAt: number } | null = null;

export async function GET() {
  try {
    const now = Date.now();
    if (cachedCard && now < cachedCard.expiresAt) {
      return NextResponse.json(cachedCard.data);
    }

    const result = await geminiFlash.generateContent(cueCardPrompt());
    const rawText = result.response.text();
    const rawJson = JSON.parse(rawText);
    const card = cueCardSchema.parse(rawJson);

    cachedCard = { data: card, expiresAt: now + 60 * 60 * 1000 };

    return NextResponse.json(card);
  } catch {
    return NextResponse.json(
      { error: "Failed to generate cue card" },
      { status: 500 }
    );
  }
}
