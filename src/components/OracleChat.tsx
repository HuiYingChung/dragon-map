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
}

const STARTER_PROMPTS = {
  en: [
    "What do Eastern and Western dragons have in common?",
    "Which dragon rules the ocean?",
    "Why do some cultures fear dragons while others revere them?",
  ],
  zh: [
    "東方與西方的龍有什麼共同之處？",
    "哪條龍統治著海洋？",
    "為什麼某些文化畏懼龍，而另一些文化卻崇敬龍？",
  ],
};

const LABELS = {
  en: {
    title: "Ask the Oracle",
    placeholder: "Speak your question...",
    send: "Send",
    loading: "The Oracle stirs...",
    close: "close",
    error: "The Oracle's vision clouds. Please try again.",
  },
  zh: {
    title: "問龍使者",
    placeholder: "請提出您的問題…",
    send: "送出",
    loading: "龍使者正在感應…",
    close: "關閉",
    error: "龍使者的視野蒙塵，請再試一次。",
  },
};

export default function OracleChat({ locale }: OracleChatProps) {
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

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

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
    [isLoading, locale, labels.error],
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
        className="fixed bottom-24 right-6 z-50 pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full"
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
            className="fixed z-50 pointer-events-auto flex flex-col rounded-t-sm
              bottom-0 left-0 right-0 h-[82vh]
              sm:bottom-24 sm:right-6 sm:left-auto sm:w-[400px] sm:h-[500px] sm:rounded-sm"
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
