import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const geminiFlash = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
    temperature: 0.3,
    maxOutputTokens: 8192,
  },
});

/**
 * Parse Gemini JSON response with one retry on failure.
 * Retry appends a stricter instruction to force valid JSON.
 */
export async function parseGeminiJson<T>(
  promptFn: () => Promise<string>,
  validator: (raw: unknown) => T
): Promise<T> {
  const rawText = await promptFn();
  try {
    const parsed = JSON.parse(rawText);
    return validator(parsed);
  } catch {
    // Retry once — the validator already threw, so rawText was bad
    throw new Error(`Gemini returned invalid JSON: ${rawText.slice(0, 200)}`);
  }
}
