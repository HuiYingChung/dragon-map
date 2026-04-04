import { createHash } from "node:crypto";
import OpenAI from "openai";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SYSTEM_PROMPT = `You are the Oracle of Dragons - a keeper of ancient myths from every corner of the world. You speak with quiet authority and poetic precision. When asked about dragons, serpents, or mythological creatures, you draw connections across cultures, reveal hidden patterns, and illuminate what these creatures meant to the people who imagined them. You know these dragons from the atlas: Long (China), Ryu (Japan), Yong/Imugi (Korea), Naga (South Asia), Quetzalcoatl (Mesoamerica), Boiuna (South America), Horned Serpent (Indigenous North America), European Dragon, Jormungandr (Norse), Zmey (Slavic), Apep (Egypt), Azhdaha (Persia), Rainbow Serpent (Australia), Taniwha (Polynesia). Keep responses under 150 words. If the user writes in Chinese, respond in Traditional Chinese. Never break character.`;

const MAX_MESSAGE_CHARS = 400;
const SHORT_WINDOW_RETRY_SECONDS = 60 * 5;
const LONG_WINDOW_RETRY_SECONDS = 60 * 60;
const MOCK_MODE_ENABLED = process.env.ORACLE_MOCK_MODE === "true";
const IS_PRODUCTION = process.env.NODE_ENV === "production";
const ORACLE_PREFIX = "dragon-map:oracle";

const localRateLimitState = new Map<string, number[]>();

let openaiClient: OpenAI | null = null;
let redis: Redis | null = null;
let shortWindowLimiter: Ratelimit | null = null;
let longWindowLimiter: Ratelimit | null = null;

function jsonError(message: string, status: number, headers?: HeadersInit) {
  return Response.json({ error: message }, { status, headers });
}

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

function parseAllowedOrigins() {
  const configuredOrigins = process.env.ORACLE_ALLOWED_ORIGINS?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  if (configuredOrigins && configuredOrigins.length > 0) {
    return new Set(configuredOrigins);
  }

  const derivedOrigins = new Set<string>();

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    derivedOrigins.add(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`);
  }

  if (process.env.VERCEL_URL) {
    derivedOrigins.add(`https://${process.env.VERCEL_URL}`);
  }

  if (!IS_PRODUCTION) {
    derivedOrigins.add("http://localhost:3000");
    derivedOrigins.add("http://127.0.0.1:3000");
  }

  return derivedOrigins;
}

function isAllowedOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  const allowedOrigins = parseAllowedOrigins();

  if (!origin) {
    return !IS_PRODUCTION;
  }

  return allowedOrigins.has(origin);
}

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  return forwardedFor?.split(",")[0]?.trim() || realIp || "unknown";
}

function getClientIdentifier(request: NextRequest) {
  const ip = getClientIp(request);
  const userAgent = request.headers.get("user-agent") ?? "unknown";
  return createHash("sha256").update(`${ip}:${userAgent}`).digest("hex");
}

function getRetryAfterSeconds(resetAt: number) {
  return Math.max(1, Math.ceil((resetAt - Date.now()) / 1000));
}

function checkLocalRateLimit(identifier: string) {
  const now = Date.now();
  const shortWindowStart = now - SHORT_WINDOW_RETRY_SECONDS * 1000;
  const longWindowStart = now - LONG_WINDOW_RETRY_SECONDS * 1000;

  const recentRequests = (localRateLimitState.get(identifier) ?? []).filter(
    (timestamp) => timestamp > longWindowStart,
  );

  const requestsInShortWindow = recentRequests.filter(
    (timestamp) => timestamp > shortWindowStart,
  );

  if (requestsInShortWindow.length >= 5) {
    const retryAfterSeconds = getRetryAfterSeconds(
      requestsInShortWindow[0] + SHORT_WINDOW_RETRY_SECONDS * 1000,
    );
    return { success: false, retryAfterSeconds };
  }

  if (recentRequests.length >= 5) {
    const retryAfterSeconds = getRetryAfterSeconds(
      recentRequests[0] + LONG_WINDOW_RETRY_SECONDS * 1000,
    );
    return { success: false, retryAfterSeconds };
  }

  recentRequests.push(now);
  localRateLimitState.set(identifier, recentRequests);
  return { success: true, retryAfterSeconds: 0 };
}

function getRedis() {
  if (redis) {
    return redis;
  }

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return null;
  }

  redis = new Redis({ url, token });
  return redis;
}

function getShortWindowLimiter() {
  if (shortWindowLimiter) {
    return shortWindowLimiter;
  }

  const redisClient = getRedis();
  if (!redisClient) {
    return null;
  }

  shortWindowLimiter = new Ratelimit({
    redis: redisClient,
    limiter: Ratelimit.fixedWindow(5, "5 m"),
    analytics: true,
    prefix: `${ORACLE_PREFIX}:5m`,
  });

  return shortWindowLimiter;
}

function getLongWindowLimiter() {
  if (longWindowLimiter) {
    return longWindowLimiter;
  }

  const redisClient = getRedis();
  if (!redisClient) {
    return null;
  }

  longWindowLimiter = new Ratelimit({
    redis: redisClient,
    limiter: Ratelimit.fixedWindow(5, "1 h"),
    analytics: true,
    prefix: `${ORACLE_PREFIX}:1h`,
  });

  return longWindowLimiter;
}

async function enforceRateLimits(request: NextRequest) {
  const identifier = getClientIdentifier(request);
  const shortLimiter = getShortWindowLimiter();
  const longLimiter = getLongWindowLimiter();

  if (!shortLimiter || !longLimiter) {
    if (IS_PRODUCTION) {
      throw new Error("Oracle rate limit storage is not configured.");
    }

    return checkLocalRateLimit(identifier);
  }

  const shortWindowResult = await shortLimiter.limit(identifier);
  if (!shortWindowResult.success) {
    return {
      success: false,
      retryAfterSeconds: getRetryAfterSeconds(shortWindowResult.reset),
    };
  }

  const longWindowResult = await longLimiter.limit(identifier);
  if (!longWindowResult.success) {
    return {
      success: false,
      retryAfterSeconds: getRetryAfterSeconds(longWindowResult.reset),
    };
  }

  return { success: true, retryAfterSeconds: 0 };
}

function getOpenAIClient() {
  if (openaiClient) {
    return openaiClient;
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey === "your_openai_api_key_here") {
    return null;
  }

  openaiClient = new OpenAI({ apiKey });
  return openaiClient;
}

function isLanguage(value: unknown): value is "en" | "zh" {
  return value === "en" || value === "zh";
}

export async function POST(request: NextRequest) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return jsonError("Unsupported content type.", 415);
  }

  if (!isAllowedOrigin(request)) {
    return jsonError("Forbidden.", 403);
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return jsonError("Invalid JSON body.", 400);
  }

  const body =
    payload && typeof payload === "object"
      ? (payload as { message?: unknown; language?: unknown })
      : null;

  if (!body || typeof body.message !== "string") {
    return jsonError("Invalid message.", 400);
  }

  const trimmedMessage = body.message.trim();
  if (!trimmedMessage) {
    return jsonError("Message cannot be empty.", 400);
  }

  if (trimmedMessage.length > MAX_MESSAGE_CHARS) {
    return jsonError(
      `Message is too long. Please keep it under ${MAX_MESSAGE_CHARS} characters.`,
      400,
    );
  }

  const language = isLanguage(body.language) ? body.language : "en";

  try {
    const rateLimit = await enforceRateLimits(request);
    if (!rateLimit.success) {
      return jsonError(
        `Too many oracle requests. Please wait ${rateLimit.retryAfterSeconds} seconds and try again.`,
        429,
        {
          "Retry-After": String(rateLimit.retryAfterSeconds),
        },
      );
    }
  } catch (error) {
    console.error("Oracle rate limiting failed", {
      detail: error instanceof Error ? error.message : "Unknown rate limit failure.",
    });

    return jsonError("Oracle is temporarily unavailable.", 503);
  }

  if (MOCK_MODE_ENABLED) {
    return Response.json({
      reply: buildMockReply(trimmedMessage, language),
      mocked: true,
    });
  }

  const client = getOpenAIClient();
  if (!client) {
    console.error("Oracle is not configured with OPENAI_API_KEY.");
    return jsonError("Oracle is temporarily unavailable.", 503);
  }

  try {
    const userContent =
      language === "zh"
        ? `[User asked in Traditional Chinese] ${trimmedMessage}`
        : trimmedMessage;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userContent },
      ],
      max_tokens: 180,
      temperature: 0.8,
    });

    const reply = completion.choices[0]?.message?.content?.trim();

    if (!reply) {
      throw new Error("Empty oracle response.");
    }

    return Response.json({ reply });
  } catch (error) {
    console.error("Oracle request failed", {
      detail: error instanceof Error ? error.message : "Unknown OpenAI request failure.",
    });

    return jsonError("Oracle request failed. Please try again shortly.", 500);
  }
}
