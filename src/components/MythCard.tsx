"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import type { DragonRegion, Locale } from "@/data/dragons";

interface MythCardProps {
  dragon: DragonRegion | null;
  locale: Locale;
  onClose: () => void;
}

export default function MythCard({ dragon, locale, onClose }: MythCardProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <AnimatePresence>
      {dragon && (
        <motion.aside
          key={dragon.id}
          initial={{ opacity: 0, y: isMobile ? 40 : 0, x: isMobile ? 0 : 24 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: isMobile ? 40 : 0, x: isMobile ? 0 : 18 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="fixed z-50 pointer-events-auto overflow-hidden
            bottom-0 left-0 right-0 rounded-t-sm max-h-[78vh] overflow-y-auto
            md:bottom-auto md:top-5 md:left-auto md:right-5 md:max-h-[calc(100vh-2.5rem)] md:overflow-y-auto md:w-[256px] md:rounded-sm"
          style={{
            background:
              "linear-gradient(180deg, rgba(9,8,6,0.92), rgba(9,8,6,0.78) 40%, rgba(9,8,6,0.68) 100%)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            border: `1px solid ${dragon.color}18`,
            boxShadow: isMobile
              ? `0 -12px 40px rgba(0,0,0,0.45)`
              : `-18px 0 40px rgba(0,0,0,0.22)`,
          }}
        >
          <div className="flex flex-col px-5 py-5 md:px-6 md:py-6 pb-8 md:pb-6">
            <button
              onClick={onClose}
              className="self-end text-stone-400 hover:text-stone-200 transition-colors text-[13px] md:text-[11px] tracking-[0.22em] uppercase"
            >
              {locale === "zh" ? "關閉" : "close"}
            </button>

            <div className="mt-5 mb-5 flex items-center gap-2">
              <div
                className="h-[1px] flex-1"
                style={{
                  background: `linear-gradient(90deg, transparent, ${dragon.color}55)`,
                }}
              />
              <span
                className="text-[10px] tracking-[0.3em] uppercase"
                style={{ color: `${dragon.color}88` }}
              >
                &#9674;
              </span>
              <div
                className="h-[1px] flex-1"
                style={{
                  background: `linear-gradient(90deg, ${dragon.color}55, transparent)`,
                }}
              />
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="mb-2 text-[26px] md:text-[20px] font-light tracking-[0.11em] uppercase text-left"
              style={{ color: dragon.color }}
            >
              {locale === "zh" ? dragon.nameZh : dragon.name}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.78 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="mb-4 text-[13px] md:text-[11px] tracking-[0.18em] uppercase text-stone-300 text-left"
            >
              {locale === "zh" ? dragon.traditionZh : dragon.tradition}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="mb-5"
            >
              <p className="text-[15px] md:text-[13px] text-stone-200 font-light italic leading-relaxed">
                {locale === "zh" ? dragon.regionZh : dragon.region}
              </p>
              <p
                className="mt-2 text-[13px] md:text-[11px] leading-[1.7] font-light italic"
                style={{ color: `${dragon.color}cc` }}
              >
                {locale === "zh" ? dragon.associatedWithZh : dragon.associatedWith}
              </p>
            </motion.div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mb-6 h-[1px] origin-left"
              style={{
                background: `linear-gradient(90deg, ${dragon.color}55, transparent)`,
              }}
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-[16px] md:text-[13px] leading-[1.9] text-stone-200 font-light"
            >
              {locale === "zh" ? dragon.descriptionZh : dragon.description}
            </motion.p>

            <div className="pt-6">
              <div className="flex items-center gap-2">
                <div
                  className="h-[1px] flex-1"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${dragon.color}33)`,
                  }}
                />
                <span
                  className="text-[10px] tracking-[0.3em] uppercase"
                  style={{ color: `${dragon.color}55` }}
                >
                  &#9674;
                </span>
                <div
                  className="h-[1px] flex-1"
                  style={{
                    background: `linear-gradient(90deg, ${dragon.color}33, transparent)`,
                  }}
                />
              </div>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
