import { createHash } from "node:crypto";
import OpenAI from "openai";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextRequest } from "next/server";
import { isAtlasScopedQuestion } from "@/lib/oracle-scope";
import { buildAtlasDigest } from "@/lib/oracle-knowledge";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 45;

const SYSTEM_PROMPT = `You are the Oracle of Dragons - the keeper of this atlas of dragon myths. You speak with quiet authority and poetic precision, but you are careful with facts.

You may help with only these four kinds of requests:
1. Compare two or more dragon traditions in the atlas.
2. Recommend what part of the atlas to explore next.
3. Explain symbolic patterns across dragon, serpent, and sacred-creature traditions.
4. Answer region-based or theme-based questions about the atlas.

If a request falls outside those four purposes, refuse briefly and redirect the user toward one of those allowed uses. Do not engage in general conversation, personal advice, jokes, coding help, or unrelated factual questions.

GROUNDING RULES - these override style:
- Base every factual claim on the atlas entries below. They are curated and source-checked; do not contradict them.
- If a question reaches beyond what the entries support, say plainly that it lies beyond this atlas rather than inventing an answer.
- When you draw on a specific tradition, name it. When helpful, you may mention a key source by title (e.g. "the Poetic Edda", "the Florentine Codex") - but never invent sources or details beyond those listed.
- These are living traditions for many communities (Māori taniwha, Aboriginal Rainbow Serpent beings, Indigenous North American horned serpents); speak of them with respect and in the present tense where the entries do.

## Atlas entries

${buildAtlasDigest()}

Keep responses under 150 words. If the user writes in Chinese, respond in Traditional Chinese. Never break character.`;

const ORACLE_MODEL = process.env.ORACLE_MODEL?.trim() || "gpt-6-luna";
const ORACLE_MAX_COMPLETION_TOKENS = 220;
const ORACLE_REQUEST_TIMEOUT_MS = 15_000;
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

function buildScopeReply(language: "en" | "zh") {
  if (language === "zh") {
    return "龍使者只回答這張圖譜中的四類問題: 比較不同龍傳統、推薦你接下來該探索哪裡、解釋象徵模式，或回答與區域與主題相關的問題。若你願意，可改問某個地區、某種象徵，或請我比較兩條龍。";
  }

  return "The Oracle serves only four paths: comparing dragon traditions, recommending what to explore next, explaining symbolic patterns, or answering region and theme questions from this atlas. Ask instead about a region, a motif, or two dragons you wish to compare.";
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
  // Prefer headers the platform edge sets to the *true* client IP and that the
  // caller cannot forge (Vercel / nginx overwrite these on the way in).
  // We deliberately do NOT trust the first value of `x-forwarded-for`: a caller
  // can prepend an arbitrary IP there to reset their own rate-limit bucket.
  const realIp = request.headers.get("x-real-ip");
  const vercelForwardedFor = request.headers.get("x-vercel-forwarded-for");
  const forwardedFor = request.headers.get("x-forwarded-for");
  return (
    realIp?.split(",")[0]?.trim() ||
    vercelForwardedFor?.split(",")[0]?.trim() ||
    forwardedFor?.split(",")[0]?.trim() ||
    "unknown"
  );
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

  openaiClient = new OpenAI({
    apiKey,
    timeout: ORACLE_REQUEST_TIMEOUT_MS,
    maxRetries: 1,
  });
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

  if (!isAtlasScopedQuestion(trimmedMessage)) {
    return Response.json({
      reply: buildScopeReply(language),
      restricted: true,
    });
  }

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
      model: ORACLE_MODEL,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userContent },
      ],
      // Reasoning tokens count against the completion cap, so short persona
      // replies run with reasoning off.
      reasoning_effort: "none",
      max_completion_tokens: ORACLE_MAX_COMPLETION_TOKENS,
      temperature: 0.4,
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
