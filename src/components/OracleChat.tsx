"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Locale } from "@/data/dragons";

interface Message {
  role: "user" | "oracle";
  content: string;
}

interface OracleChatProps {
  locale: Locale;
  landscapeMobile?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

const QUICK_SCOPES = {
  en: [
    {
      label: "Compare",
      prompt: "Compare Long and the European dragon.",
    },
    {
      label: "Explore",
      prompt: "Recommend what I should explore if I care about water dragons.",
    },
    {
      label: "Patterns",
      prompt: "What symbolic patterns connect dragons with rain, rivers, and kingship?",
    },
    {
      label: "Regions",
      prompt: "Which regions in this atlas treat dragons as guardians rather than threats?",
    },
  ],
  zh: [
    {
      label: "比較",
      prompt: "比較中國龍與歐洲龍。",
    },
    {
      label: "探索",
      prompt: "如果我對水域之龍有興趣，推薦我先探索哪裡？",
    },
    {
      label: "象徵",
      prompt: "龍為何常與雨、水脈與王權連在一起？",
    },
    {
      label: "區域",
      prompt: "這張圖譜中，哪些地區更常把龍視為守護者而非威脅？",
    },
  ],
};

const STARTER_PROMPTS = {
  en: [
    "Compare Long and the European dragon.",
    "Recommend what I should explore if I care about water dragons.",
    "What symbolic patterns connect dragons with rain, rivers, and kingship?",
  ],
  zh: [
    "比較中國龍與歐洲龍。",
    "如果我對水域之龍有興趣，推薦我先探索哪裡？",
    "龍為何常與雨、水脈與王權連在一起？",
  ],
};

const LABELS = {
  en: {
    title: "Ask the Oracle",
    placeholder: "Compare, explore, symbols, or region/theme...",
    send: "Send",
    loading: "The Oracle stirs...",
    close: "close",
    error: "The Oracle's vision clouds. Please try again.",
    scopeTitle: "Oracle scope",
    scopeText:
      "Compare traditions, get exploration recommendations, ask about symbolic patterns, or ask region/theme questions.",
    invalid:
      "The Oracle accepts only comparison, exploration recommendations, symbolic patterns, or region/theme questions from this atlas.",
    usePrompt: "Use prompt",
  },
  zh: {
    title: "問龍使者",
    placeholder: "可問比較、探索建議、象徵模式或區域主題…",
    send: "送出",
    loading: "龍使者正在感應…",
    close: "關閉",
    error: "龍使者的視野蒙塵，請再試一次。",
    scopeTitle: "可詢問範圍",
    scopeText: "可比較不同傳統、請求探索建議、詢問象徵模式，或提出區域與主題問題。",
    invalid: "龍使者只接受圖譜內的比較、探索建議、象徵模式，或區域與主題問題。",
    usePrompt: "帶入問題",
  },
};

function isAtlasScopedQuestion(message: string) {
  const normalized = message.toLowerCase();

  const directAtlasTerms = [
    "dragon",
    "dragons",
    "serpent",
    "serpents",
    "myth",
    "myths",
    "mythology",
    "atlas",
    "oracle",
    "long",
    "ryu",
    "yong",
    "imugi",
    "naga",
    "quetzalcoatl",
    "boiuna",
    "horned serpent",
    "european dragon",
    "jormungandr",
    "zmey",
    "apep",
    "azhdaha",
    "rainbow serpent",
    "taniwha",
    "symbol",
    "symbolic",
    "theme",
    "themes",
    "region",
    "regions",
    "compare",
    "comparison",
    "explore",
    "recommend",
    "pattern",
    "patterns",
    "east asia",
    "japan",
    "korea",
    "india",
    "south asia",
    "mesoamerica",
    "south america",
    "north america",
    "europe",
    "norse",
    "slavic",
    "egypt",
    "persia",
    "middle east",
    "australia",
    "polynesia",
    "ocean",
    "sea",
    "river",
    "storm",
    "creation",
    "kingship",
    "chaos",
    "wisdom",
  ];

  const chineseAtlasTerms = [
    "龍",
    "龙",
    "蛇",
    "神話",
    "神话",
    "圖譜",
    "图谱",
    "地圖",
    "地图",
    "比較",
    "比较",
    "對照",
    "对照",
    "推薦",
    "推荐",
    "探索",
    "象徵",
    "象征",
    "符號",
    "符号",
    "主題",
    "主题",
    "區域",
    "区域",
    "東亞",
    "东亚",
    "日本",
    "韓國",
    "韩国",
    "印度",
    "南亞",
    "南亚",
    "中美洲",
    "南美",
    "北美",
    "歐洲",
    "欧洲",
    "北歐",
    "北欧",
    "斯拉夫",
    "埃及",
    "波斯",
    "中東",
    "中东",
    "澳洲",
    "大洋洲",
    "海洋",
    "河流",
    "風暴",
    "风暴",
    "創世",
    "创世",
    "王權",
    "王权",
    "混沌",
    "智慧",
  ];

  return (
    directAtlasTerms.some((term) => normalized.includes(term)) ||
    chineseAtlasTerms.some((term) => message.includes(term))
  );
}

export default function OracleChat({
  locale,
  landscapeMobile = false,
  onOpenChange,
}: OracleChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMockMode, setIsMockMode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const labels = LABELS[locale];
  const starters = STARTER_PROMPTS[locale];
  const quickScopes = QUICK_SCOPES[locale];

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, messages, scrollToBottom]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  useEffect(() => {
    onOpenChange?.(isOpen);
  }, [isOpen, onOpenChange]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      if (!isAtlasScopedQuestion(trimmed)) {
        setError(labels.invalid);
        return;
      }

      setInput("");
      setError(null);
      setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
      setIsLoading(true);

      try {
        const res = await fetch("/api/oracle", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmed, language: locale }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(
            typeof data?.error === "string" ? data.error : "Oracle did not respond",
          );
        }

        setIsMockMode(data?.mocked === true);
        setMessages((prev) => [...prev, { role: "oracle", content: data.reply }]);
      } catch (error) {
        setIsMockMode(false);
        const message =
          error instanceof Error && error.message ? error.message : labels.error;
        setError(message);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, locale, labels.error, labels.invalid],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const showStarters = messages.length === 0 && !isLoading;

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`oracle-chat-trigger fixed bottom-24 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full pointer-events-auto ${
          landscapeMobile ? "oracle-chat-trigger-landscape" : ""
        }`}
        style={{
          background:
            "linear-gradient(135deg, rgba(22, 18, 12, 0.95), rgba(12, 10, 7, 0.9))",
          border: "1px solid rgba(201, 168, 76, 0.28)",
          boxShadow: isOpen
            ? "0 0 24px rgba(201, 168, 76, 0.22), 0 4px 20px rgba(0,0,0,0.5)"
            : "0 0 12px rgba(201, 168, 76, 0.1), 0 4px 16px rgba(0,0,0,0.4)",
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        aria-label={labels.title}
        title={labels.title}
      >
        <span className="select-none text-[18px] leading-none" role="img" aria-hidden>
          🐉
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="oracle-panel"
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.38, ease: "easeOut" }}
            className={`oracle-chat-panel fixed z-50 pointer-events-auto flex flex-col rounded-t-sm
              bottom-0 left-0 right-0 h-[82vh]
              sm:bottom-24 sm:right-6 sm:left-auto sm:w-[400px] sm:h-[500px] sm:rounded-sm ${
                landscapeMobile ? "oracle-chat-panel-landscape" : ""
              }`}
            style={{
              background:
                "linear-gradient(180deg, rgba(10,8,5,0.97) 0%, rgba(8,7,5,0.95) 100%)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(201, 168, 76, 0.14)",
              boxShadow: "0 -8px 48px rgba(0,0,0,0.55), 0 0 32px rgba(201,168,76,0.06)",
            }}
          >
            <div
              className="flex shrink-0 items-center justify-between px-5 py-4"
              style={{ borderBottom: "1px solid rgba(201, 168, 76, 0.12)" }}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-[16px]" role="img" aria-hidden>
                  🐉
                </span>
                <h2
                  className="text-[15px] sm:text-[13px] tracking-[0.18em] uppercase font-semibold"
                  style={{ color: "rgba(224, 196, 118, 0.95)" }}
                >
                  {labels.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-[13px] sm:text-[11px] tracking-[0.18em] uppercase transition-colors"
                style={{ color: "rgba(180, 158, 110, 0.7)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "rgba(224, 196, 118, 0.95)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(180, 158, 110, 0.7)";
                }}
              >
                {labels.close}
              </button>
            </div>

            {isMockMode && (
              <div
                className="mx-4 mt-3 shrink-0 rounded-sm px-3 py-2"
                style={{
                  background: "rgba(201, 168, 76, 0.06)",
                  border: "1px solid rgba(201, 168, 76, 0.18)",
                  color: "rgba(224, 196, 118, 0.76)",
                }}
              >
                <div className="text-[12px] sm:text-[10px] uppercase tracking-[0.2em]">
                  {locale === "zh" ? "示範模式" : "Demo mode"}
                </div>
                <div className="mt-1 text-[14px] sm:text-[12px] tracking-[0.02em] leading-relaxed">
                  {locale === "zh"
                    ? "目前顯示的是模擬回覆，不會使用 API 額度。"
                    : "Responses are simulated and do not use your API budget."}
                </div>
              </div>
            )}

            <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
              <div
                className="rounded-sm px-3 py-2"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(201, 168, 76, 0.12)",
                }}
              >
                <p
                  className="text-[11px] sm:text-[10px] uppercase tracking-[0.2em]"
                  style={{ color: "rgba(201, 168, 76, 0.72)" }}
                >
                  {labels.scopeTitle}
                </p>
                <p
                  className="mt-1 text-[14px] sm:text-[12px] leading-relaxed"
                  style={{ color: "rgba(214, 193, 160, 0.82)" }}
                >
                  {labels.scopeText}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {quickScopes.map((scope) => (
                    <button
                      key={scope.label}
                      type="button"
                      onClick={() => {
                        setInput(scope.prompt);
                        setError(null);
                        requestAnimationFrame(() => inputRef.current?.focus());
                      }}
                      className="rounded-sm px-2.5 py-1 text-[11px] sm:text-[10px] uppercase tracking-[0.16em] transition-colors"
                      style={{
                        color: "rgba(224, 196, 118, 0.82)",
                        border: "1px solid rgba(201, 168, 76, 0.16)",
                        background: "rgba(201, 168, 76, 0.06)",
                      }}
                      title={`${labels.usePrompt}: ${scope.prompt}`}
                    >
                      {scope.label}
                    </button>
                  ))}
                </div>
              </div>

              {showStarters && (
                <div className="mt-1 flex flex-col gap-2">
                  <p
                    className="mb-2 text-[13px] sm:text-[11px] tracking-[0.14em] uppercase"
                    style={{ color: "rgba(180, 158, 110, 0.65)" }}
                  >
                    {locale === "zh" ? "或試試這些問題" : "Or try these questions"}
                  </p>
                  {starters.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => sendMessage(prompt)}
                      className="rounded-sm px-4 py-3 text-left text-[15px] sm:text-[13px] leading-relaxed tracking-[0.02em] transition-colors"
                      style={{
                        background: "rgba(201, 168, 76, 0.06)",
                        border: "1px solid rgba(201, 168, 76, 0.2)",
                        color: "rgba(214, 193, 160, 0.82)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(201, 168, 76, 0.12)";
                        e.currentTarget.style.color = "rgba(224, 196, 118, 0.95)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(201, 168, 76, 0.06)";
                        e.currentTarget.style.color = "rgba(214, 193, 160, 0.82)";
                      }}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className="max-w-[88%] rounded-sm px-4 py-3 text-[16px] sm:text-[14px] leading-relaxed tracking-[0.02em]"
                    style={
                      msg.role === "user"
                        ? {
                            background: "rgba(201, 168, 76, 0.11)",
                            border: "1px solid rgba(201, 168, 76, 0.22)",
                            color: "rgba(224, 196, 118, 0.92)",
                          }
                        : {
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(201, 168, 76, 0.1)",
                            color: "rgba(214, 193, 160, 0.92)",
                            fontStyle: "italic",
                          }
                    }
                  >
                    {msg.role === "oracle" && (
                      <span
                        className="mb-2 block text-[11px] sm:text-[10px] tracking-[0.2em] uppercase not-italic"
                        style={{ color: "rgba(201, 168, 76, 0.6)" }}
                      >
                        {locale === "zh" ? "龍使者" : "Oracle"}
                      </span>
                    )}
                    {msg.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div
                    className="rounded-sm px-4 py-3 text-[15px] sm:text-[13px] italic tracking-[0.04em]"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(201, 168, 76, 0.1)",
                      color: "rgba(201, 168, 76, 0.65)",
                    }}
                  >
                    <motion.span
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    >
                      {labels.loading}
                    </motion.span>
                  </div>
                </div>
              )}

              {error && (
                <p
                  className="px-2 text-center text-[14px] sm:text-[12px] italic tracking-[0.03em]"
                  style={{ color: "rgba(200, 110, 90, 0.9)" }}
                >
                  {error}
                </p>
              )}

              <div ref={messagesEndRef} />
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex shrink-0 items-center gap-3 px-4 py-3 pb-safe"
              style={{ borderTop: "1px solid rgba(201, 168, 76, 0.12)" }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={labels.placeholder}
                disabled={isLoading}
                className="flex-1 bg-transparent text-[17px] sm:text-[15px] tracking-[0.02em] outline-none placeholder:opacity-50"
                style={{
                  color: "rgba(224, 196, 118, 0.92)",
                  caretColor: "rgba(201, 168, 76, 0.8)",
                }}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="shrink-0 rounded-sm px-4 py-2.5 text-[13px] sm:text-[11px] tracking-[0.18em] uppercase transition-colors disabled:opacity-25"
                style={{
                  background: "rgba(201, 168, 76, 0.16)",
                  border: "1px solid rgba(201, 168, 76, 0.32)",
                  color: "rgba(224, 196, 118, 0.9)",
                }}
              >
                {labels.send}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
