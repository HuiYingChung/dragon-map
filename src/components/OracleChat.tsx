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
            typeof data?.error === "string" ? data.error : "Oracle did not respond"
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
    [isLoading, locale, labels.error]
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
            className="fixed z-50 pointer-events-auto flex flex-col
              bottom-3 left-3 right-3 h-[76vh] overflow-hidden rounded-sm
              sm:bottom-24 sm:right-6 sm:left-auto sm:w-[388px] sm:h-[500px]"
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
              className="flex shrink-0 items-center justify-between px-6 py-4"
              style={{ borderBottom: "1px solid rgba(201, 168, 76, 0.1)" }}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-[14px]" role="img" aria-hidden>
                  🐉
                </span>
                <h2
                  className="text-[11px] tracking-[0.28em] uppercase font-semibold"
                  style={{ color: "rgba(224, 196, 118, 0.9)" }}
                >
                  {labels.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-[9px] tracking-[0.22em] uppercase transition-colors"
                style={{ color: "rgba(160, 140, 100, 0.6)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "rgba(224, 196, 118, 0.9)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(160, 140, 100, 0.6)";
                }}
              >
                {labels.close}
              </button>
            </div>

            {isMockMode && (
              <div
                className="mx-6 mt-4 mr-8 shrink-0 rounded-sm px-4 py-3"
                style={{
                  background: "rgba(201, 168, 76, 0.06)",
                  border: "1px solid rgba(201, 168, 76, 0.18)",
                  color: "rgba(224, 196, 118, 0.76)",
                }}
              >
                <div className="text-[8px] uppercase tracking-[0.28em]">
                  {locale === "zh" ? "示範模式" : "Demo mode"}
                </div>
                <div className="mt-1.5 text-[10px] leading-relaxed tracking-[0.04em]">
                  {locale === "zh"
                    ? "目前顯示的是模擬回覆，不會使用 API 額度。"
                    : "Responses are simulated right now and do not use your API budget."}
                </div>
              </div>
            )}

            <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-7 py-6">
              {showStarters && (
                <div className="mt-2 flex flex-col gap-3.5">
                  <p
                    className="mb-1 px-1 text-[9px] tracking-[0.2em] uppercase"
                    style={{ color: "rgba(160, 140, 100, 0.5)" }}
                  >
                    {locale === "zh" ? "或試試這些問題" : "Or try these questions"}
                  </p>
                  {starters.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => sendMessage(prompt)}
                      className="rounded-sm px-4 py-3 text-left text-[11px] leading-relaxed tracking-[0.04em] transition-colors"
                      style={{
                        background: "rgba(201, 168, 76, 0.05)",
                        border: "1px solid rgba(201, 168, 76, 0.14)",
                        color: "rgba(201, 178, 139, 0.75)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(201, 168, 76, 0.1)";
                        e.currentTarget.style.color = "rgba(224, 196, 118, 0.9)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(201, 168, 76, 0.05)";
                        e.currentTarget.style.color = "rgba(201, 178, 139, 0.75)";
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
                  className={`flex px-1 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className="max-w-[78%] rounded-sm px-5 py-4 text-[12px] leading-[2] tracking-[0.03em]"
                    style={
                      msg.role === "user"
                        ? {
                            background: "rgba(201, 168, 76, 0.1)",
                            border: "1px solid rgba(201, 168, 76, 0.18)",
                            color: "rgba(224, 196, 118, 0.88)",
                          }
                        : {
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(201, 168, 76, 0.08)",
                            color: "rgba(191, 168, 129, 0.9)",
                            fontStyle: "italic",
                          }
                    }
                  >
                    {msg.role === "oracle" && (
                      <span
                        className="mb-1.5 block text-[8px] tracking-[0.25em] uppercase not-italic"
                        style={{ color: "rgba(201, 168, 76, 0.45)" }}
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
                    className="rounded-sm px-3.5 py-2.5 text-[11px] italic tracking-[0.06em]"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(201, 168, 76, 0.08)",
                      color: "rgba(201, 168, 76, 0.5)",
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
                  className="px-2 text-center text-[10px] italic tracking-[0.04em]"
                  style={{ color: "rgba(180, 100, 80, 0.8)" }}
                >
                  {error}
                </p>
              )}

              <div ref={messagesEndRef} />
            </div>

            <form
              onSubmit={handleSubmit}
              className="px-6 py-4"
              style={{ borderTop: "1px solid rgba(201, 168, 76, 0.1)" }}
            >
              <div
                className="flex items-center gap-3 rounded-sm px-4 py-3"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(201, 168, 76, 0.16)",
                }}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={labels.placeholder}
                  disabled={isLoading}
                  className="flex-1 bg-transparent text-[12px] tracking-[0.04em] outline-none placeholder:opacity-40"
                  style={{
                    color: "rgba(224, 196, 118, 0.88)",
                    caretColor: "rgba(201, 168, 76, 0.7)",
                  }}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="shrink-0 rounded-sm px-3 py-1.5 text-[9px] tracking-[0.22em] uppercase transition-colors disabled:opacity-30"
                  style={{
                    background: "rgba(201, 168, 76, 0.12)",
                    border: "1px solid rgba(201, 168, 76, 0.22)",
                    color: "rgba(224, 196, 118, 0.82)",
                  }}
                >
                  {labels.send}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
