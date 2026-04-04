"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import type { DragonRegion, Locale } from "@/data/dragons";

interface MythCardProps {
  dragon: DragonRegion | null;
  locale: Locale;
  onClose: () => void;
}

const LABELS = {
  en: {
    close: "close",
    era: "Era",
    role: "Cultural role",
    domains: "Primary domains",
    traits: "Visual traits",
    sources: "Source context",
    associations: "Associated with",
    comparison: "Comparative note",
    description: "Curatorial note",
  },
  zh: {
    close: "關閉",
    era: "時代",
    role: "文化角色",
    domains: "主要領域",
    traits: "形象特徵",
    sources: "來源脈絡",
    associations: "關聯象徵",
    comparison: "對照註記",
    description: "策展說明",
  },
};

function SectionTitle({
  label,
  color,
}: {
  label: string;
  color: string;
}) {
  return (
    <p
      className="mb-2 text-[10px] tracking-[0.22em] uppercase"
      style={{ color: `${color}aa` }}
    >
      {label}
    </p>
  );
}

function ChipList({
  items,
  color,
}: {
  items: string[];
  color: string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-sm px-2.5 py-1 text-[11px] leading-none"
          style={{
            border: `1px solid ${color}26`,
            background: `${color}10`,
            color: `${color}dd`,
          }}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export default function MythCard({ dragon, locale, onClose }: MythCardProps) {
  const [isMobile, setIsMobile] = useState(false);
  const labels = LABELS[locale];

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
            bottom-0 left-0 right-0 rounded-t-sm max-h-[82vh] overflow-y-auto
            md:bottom-auto md:top-5 md:left-auto md:right-5 md:max-h-[calc(100vh-2.5rem)] md:w-[320px] md:rounded-sm"
          style={{
            background:
              "linear-gradient(180deg, rgba(9,8,6,0.94), rgba(9,8,6,0.84) 42%, rgba(9,8,6,0.74) 100%)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            border: `1px solid ${dragon.color}18`,
            boxShadow: isMobile
              ? "0 -12px 40px rgba(0,0,0,0.45)"
              : "-18px 0 40px rgba(0,0,0,0.22)",
          }}
        >
          <div className="flex flex-col px-5 py-5 pb-8 md:px-6 md:py-6">
            <button
              onClick={onClose}
              className="self-end text-[13px] uppercase tracking-[0.22em] text-stone-400 transition-colors hover:text-stone-200 md:text-[11px]"
            >
              {labels.close}
            </button>

            <div className="mb-5 mt-5 flex items-center gap-2">
              <div
                className="h-px flex-1"
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
                className="h-px flex-1"
                style={{
                  background: `linear-gradient(90deg, ${dragon.color}55, transparent)`,
                }}
              />
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.45 }}
              className="mb-2 text-left text-[26px] font-light uppercase tracking-[0.11em] md:text-[20px]"
              style={{ color: dragon.color }}
            >
              {locale === "zh" ? dragon.nameZh : dragon.name}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.78 }}
              transition={{ delay: 0.2, duration: 0.45 }}
              className="mb-2 text-left text-[13px] uppercase tracking-[0.18em] text-stone-300 md:text-[11px]"
            >
              {locale === "zh" ? dragon.traditionZh : dragon.tradition}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.86 }}
              transition={{ delay: 0.26, duration: 0.45 }}
              className="mb-5 text-[14px] italic leading-relaxed text-stone-200 md:text-[12px]"
            >
              {locale === "zh" ? dragon.regionZh : dragon.region}
            </motion.p>

            <div className="space-y-5">
              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.34, duration: 0.45 }}
              >
                <SectionTitle label={labels.era} color={dragon.color} />
                <p className="text-[13px] leading-relaxed text-stone-200 md:text-[12px]">
                  {locale === "zh" ? dragon.eraZh : dragon.era}
                </p>
              </motion.section>

              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.45 }}
              >
                <SectionTitle label={labels.role} color={dragon.color} />
                <p className="text-[14px] leading-relaxed text-stone-100 md:text-[12px]">
                  {locale === "zh" ? dragon.roleZh : dragon.role}
                </p>
              </motion.section>

              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.46, duration: 0.45 }}
              >
                <SectionTitle label={labels.domains} color={dragon.color} />
                <ChipList
                  items={locale === "zh" ? dragon.domainsZh : dragon.domains}
                  color={dragon.color}
                />
              </motion.section>

              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.52, duration: 0.45 }}
              >
                <SectionTitle label={labels.traits} color={dragon.color} />
                <ChipList
                  items={locale === "zh" ? dragon.traitsZh : dragon.traits}
                  color={dragon.color}
                />
              </motion.section>

              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.58, duration: 0.45 }}
              >
                <SectionTitle label={labels.sources} color={dragon.color} />
                <p className="text-[13px] leading-[1.8] text-stone-300 md:text-[12px]">
                  {locale === "zh" ? dragon.sourceContextZh : dragon.sourceContext}
                </p>
              </motion.section>

              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.64, duration: 0.45 }}
              >
                <SectionTitle label={labels.associations} color={dragon.color} />
                <p
                  className="text-[13px] italic leading-[1.8] md:text-[12px]"
                  style={{ color: `${dragon.color}dd` }}
                >
                  {locale === "zh"
                    ? dragon.associatedWithZh
                    : dragon.associatedWith}
                </p>
              </motion.section>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.68, duration: 0.8 }}
                className="h-px origin-left"
                style={{
                  background: `linear-gradient(90deg, ${dragon.color}55, transparent)`,
                }}
              />

              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.72, duration: 0.5 }}
              >
                <SectionTitle label={labels.description} color={dragon.color} />
                <p className="text-[15px] leading-[1.9] text-stone-200 md:text-[13px]">
                  {locale === "zh" ? dragon.descriptionZh : dragon.description}
                </p>
              </motion.section>

              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.78, duration: 0.5 }}
              >
                <SectionTitle label={labels.comparison} color={dragon.color} />
                <p className="text-[13px] leading-[1.8] text-stone-300 md:text-[12px]">
                  {locale === "zh"
                    ? dragon.comparativeNoteZh
                    : dragon.comparativeNote}
                </p>
              </motion.section>
            </div>

            <div className="pt-6">
              <div className="flex items-center gap-2">
                <div
                  className="h-px flex-1"
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
                  className="h-px flex-1"
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
