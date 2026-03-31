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

function buildMockReply(message: string, language: string) {
  const normalized = message.toLowerCase();
  const isChinese = language === "zh";

  const defaultReply = isChinese
    ? "龍使者此刻以示範之聲回應。這張地圖上的龍雖來自不同文明，卻都守著邊界之地: 水域、風暴、山嶺、王權與創世記憶。你現在看到的是模擬回覆，用來呈現語氣與體驗，不會使用 API 額度。"
    : "The Oracle answers in a demo voice for now. The dragons on this atlas come from different civilizations, yet many gather around thresholds: waters, storms, mountains, kingship, and creation itself. This is a simulated reply for the experience and does not use API budget.";

  if (/(common|similar|same|difference|compare|western|eastern|east|west)/.test(normalized)) {
    return isChinese
      ? "若你問東西方龍有何相通之處，答案往往不在外形，而在職責。牠們都盤踞於力量最濃之處: 水、天候、疆界、秩序與未知。差別在於，有些文明將龍視為賜福之靈，有些則視為必須被征服的試煉。此刻你讀到的是示範回覆，不會消耗 API 額度。"
      : "If you ask what Eastern and Western dragons share, the answer lies less in shape than in function. They gather where power is strongest: water, weather, borders, kingship, and the unknown. The difference is that some cultures cast the dragon as a blessing, while others cast it as a trial to overcome. This is a simulated reply and uses no API budget.";
  }

  if (/(ocean|sea|water|river|lake|storm)/.test(normalized)) {
    return isChinese
      ? "若你尋找統治海與水道的龍，北方海域的約爾蒙岡德、南太平洋的塔尼法、南亞的那伽，以及東亞與澳洲諸龍都會現身。對許多文化而言，龍不是棲於遠空，而是藏在潮汐、暴雨與深水之中。這是一段模擬回覆，不會動用 API。"
      : "If you seek the dragon of ocean and waterway, look to Jormungandr in the north, Taniwha in the South Pacific, the Naga of South Asia, and the rain-bearing dragons of East Asia and Australia. In many traditions, dragons do not live far above the world at all, but within tide, storm, and deep water. This is a simulated reply and does not call the API.";
  }

  if (/(fear|revere|worship|blessing|good|evil|why)/.test(normalized)) {
    return isChinese
      ? "人們敬龍或懼龍，往往取決於他們如何理解自然本身。當洪水、雷雨與王權被視為天命時，龍可能成為祥瑞與守護；當荒野、火焰與混沌被視為威脅時，龍便成為英雄必須面對的敵手。你現在看到的是模擬文案，僅用來呈現體驗。"
      : "Whether people fear dragons or revere them depends on how they read nature itself. Where flood, rain, and kingship are seen as sacred order, the dragon may become a blessing or guardian. Where wilderness, flame, and chaos are framed as threats, the dragon becomes the adversary a hero must face. This is simulated copy for the experience only.";
  }

  return defaultReply;
}

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
    return Response.json({
      reply: buildMockReply(trimmedMessage, language),
      mocked: true,
    });
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

    console.error("Oracle request failed", {
      detail,
    });

    return Response.json(
      { error: "Oracle request failed. Please try again shortly." },
      { status: 500 }
    );
  }
}
