import OpenAI from "openai";
import { NextRequest } from "next/server";

const SYSTEM_PROMPT = `You are the Oracle of Dragons - a keeper of ancient myths from every corner of the world. You speak with quiet authority and poetic precision. When asked about dragons, serpents, or mythological creatures, you draw connections across cultures, reveal hidden patterns, and illuminate what these creatures meant to the people who imagined them. You know these dragons from the atlas: Long (China), Ryu (Japan), Yong/Imugi (Korea), Naga (South Asia), Quetzalcoatl (Mesoamerica), Boiuna (South America), Horned Serpent (Indigenous North America), European Dragon, Jormungandr (Norse), Zmey (Slavic), Apep (Egypt), Azhdaha (Persia), Rainbow Serpent (Australia), Taniwha (Polynesia). Keep responses under 150 words. If the user writes in Chinese, respond in Traditional Chinese. Never break character.`;

const MAX_MESSAGE_CHARS = 400;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 8;
const MOCK_MODE_ENABLED = process.env.ORACLE_MOCK_MODE === "true";

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const requestCounts = new Map<string, RateLimitEntry>();

function getClientKey(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const ip = forwardedFor?.split(",")[0]?.trim() || realIp || "unknown";
  return `oracle:${ip}`;
}

function checkRateLimit(key: string) {
  const now = Date.now();
  const current = requestCounts.get(key);

  if (!current || current.resetAt <= now) {
    requestCounts.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  current.count += 1;
  requestCounts.set(key, current);
  return { allowed: true, retryAfterSeconds: 0 };
}

export async function POST(request: NextRequest) {
  const { message, language } = await request.json();

  if (!message || typeof message !== "string") {
    return Response.json({ error: "Invalid message." }, { status: 400 });
  }

  const trimmedMessage = message.trim();
  if (!trimmedMessage) {
    return Response.json({ error: "Message cannot be empty." }, { status: 400 });
  }

  if (trimmedMessage.length > MAX_MESSAGE_CHARS) {
    return Response.json(
      {
        error: `Message is too long. Please keep it under ${MAX_MESSAGE_CHARS} characters.`,
      },
      { status: 400 }
    );
  }

  const clientKey = getClientKey(request);
  const rateLimit = checkRateLimit(clientKey);
  if (!rateLimit.allowed) {
    return Response.json(
      {
        error: `Too many oracle requests. Please wait ${rateLimit.retryAfterSeconds} seconds and try again.`,
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.retryAfterSeconds),
        },
      }
    );
  }

  if (MOCK_MODE_ENABLED) {
    const mockReply =
      language === "zh"
        ? "龍使者暫以節流之法沉思。若你想節省成本，現在會先回傳這段模擬答覆；等你準備好真正測試時，再關閉 ORACLE_MOCK_MODE。"
        : "The Oracle is answering in low-cost mock mode. This is a simulated reply so you can keep building the experience without spending API budget. Disable ORACLE_MOCK_MODE when you want to test real model responses.";

    return Response.json({ reply: mockReply, mocked: true });
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
      language === "zh" ? `[User asked in Traditional Chinese] ${trimmedMessage}` : trimmedMessage;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userContent },
      ],
      max_tokens: 180,
      temperature: 0.8,
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
