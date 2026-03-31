import OpenAI from "openai";
import { NextRequest } from "next/server";

const SYSTEM_PROMPT = `You are the Oracle of Dragons — a keeper of ancient myths from every corner of the world. You speak with quiet authority and poetic precision. When asked about dragons, serpents, or mythological creatures, you draw connections across cultures, reveal hidden patterns, and illuminate what these creatures meant to the people who imagined them. You know these dragons from the atlas: Long (China), Ryū (Japan), Yong/Imugi (Korea), Nāga (South Asia), Quetzalcoatl (Mesoamerica), Boiuna (South America), Horned Serpent (Indigenous North America), European Dragon, Jormungandr (Norse), Zmey (Slavic), Apep (Egypt), Azhdaha (Persia), Rainbow Serpent (Australia), Taniwha (Polynesia). Keep responses under 150 words. If the user writes in Chinese, respond in Traditional Chinese. Never break character.`;

export async function POST(request: NextRequest) {
  const { message, language } = await request.json();

  if (!message || typeof message !== "string") {
    return Response.json({ error: "Invalid message" }, { status: 400 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey === "your_openai_api_key_here") {
    return Response.json(
      {
        error:
          "OPENAI_API_KEY is missing for local dev. Add your real key to .env.local and restart npm run dev.",
      },
      { status: 500 }
    );
  }

  try {
    const client = new OpenAI({ apiKey });
    const userContent =
      language === "zh" ? `[使用者以繁體中文提問] ${message}` : message;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userContent },
      ],
      max_tokens: 200,
      temperature: 0.85,
    });

    const reply = completion.choices[0]?.message?.content ?? "";
    return Response.json({ reply });
  } catch (error) {
    const detail =
      error instanceof Error ? error.message : "Unknown OpenAI request failure.";

    return Response.json(
      { error: `Oracle request failed: ${detail}` },
      { status: 500 }
    );
  }
}
