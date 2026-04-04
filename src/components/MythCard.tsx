"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import type { DragonRegion, Locale } from "@/data/dragons";

interface MythCardProps {
  dragon: DragonRegion | null;
  locale: Locale;
  compareOptions: DragonRegion[];
  compareTargetId: string;
  onCompareTargetChange: (id: string) => void;
  onStartCompare: () => void;
  onClose: () => void;
}

const LABELS = {
  en: {
    close: "close",
    overview: "Overview",
    quickFacts: "At a glance",
    era: "Era",
    role: "Cultural role",
    domains: "Primary domains",
    traits: "Visual traits",
    sources: "Source context",
    associations: "Associated with",
    comparison: "Comparative note",
    description: "Curatorial note",
    compareTitle: "Comparison mode",
    compareLead: "Place this tradition beside another dragon in the atlas.",
    compareFieldLabel: "Select a second dragon",
    comparePlaceholder: "Choose another dragon",
    compareAction: "Compare",
  },
  zh: {
    close: "關閉",
    overview: "概覽",
    quickFacts: "快速閱讀",
    era: "時代",
    role: "文化角色",
    domains: "主要領域",
    traits: "形象特徵",
    sources: "來源脈絡",
    associations: "關聯象徵",
    comparison: "對照註記",
    description: "策展說明",
    compareTitle: "比較模式",
    compareLead: "將這條龍與地圖中的另一條龍並列閱讀。",
    compareFieldLabel: "選擇第二條龍",
    comparePlaceholder: "選擇另一條龍",
    compareAction: "開始比較",
  },
};

function SectionTitle({
  label,
  color,
  muted = false,
}: {
  label: string;
  color: string;
  muted?: boolean;
}) {
  return (
    <p
      className="mb-2 text-[10px] tracking-[0.24em] uppercase"
      style={{ color: muted ? "rgba(191, 168, 129, 0.58)" : `${color}aa` }}
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

function FactCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div
      className="rounded-sm border px-3 py-3"
      style={{
        borderColor: `${color}16`,
        background: "rgba(255,255,255,0.025)",
      }}
    >
      <p
        className="text-[9px] uppercase tracking-[0.18em]"
        style={{ color: "rgba(191, 168, 129, 0.56)" }}
      >
        {label}
      </p>
      <p className="mt-2 text-[13px] leading-relaxed text-stone-100 md:text-[12px]">
        {value}
      </p>
    </div>
  );
}

export default function MythCard({
  dragon,
  locale,
  compareOptions,
  compareTargetId,
  onCompareTargetChange,
  onStartCompare,
  onClose,
}: MythCardProps) {
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
          className="myth-card fixed z-50 pointer-events-auto overflow-hidden
            bottom-2 left-2 right-2 rounded-sm max-h-[78vh] overflow-y-auto
            md:bottom-auto md:top-5 md:left-auto md:right-5 md:max-h-[calc(100vh-2.5rem)] md:w-[340px] md:rounded-sm lg:w-[360px]"
          style={{
            background:
              "linear-gradient(180deg, rgba(9,8,6,0.96), rgba(9,8,6,0.88) 40%, rgba(9,8,6,0.78) 100%)",
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

            <div className="mb-4 mt-5 flex items-center gap-2">
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

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.45 }}
            >
              <SectionTitle label={labels.overview} color={dragon.color} />
              <h2
                className="text-left text-[28px] font-light uppercase tracking-[0.11em] md:text-[22px]"
                style={{ color: dragon.color }}
              >
                {locale === "zh" ? dragon.nameZh : dragon.name}
              </h2>

              <p className="mt-2 text-[12px] uppercase tracking-[0.18em] text-stone-300 md:text-[11px]">
                {locale === "zh" ? dragon.traditionZh : dragon.tradition}
              </p>

              <p className="mt-1 text-[14px] italic leading-relaxed text-stone-200 md:text-[12px]">
                {locale === "zh" ? dragon.regionZh : dragon.region}
              </p>

              <div
                className="mt-4 rounded-sm border px-4 py-4"
                style={{
                  borderColor: `${dragon.color}1d`,
                  background: `${dragon.color}08`,
                }}
              >
                <p className="text-[15px] leading-[1.9] text-stone-100 md:text-[13px]">
                  {locale === "zh" ? dragon.descriptionZh : dragon.description}
                </p>
              </div>
            </motion.div>

            <div className="mt-5 space-y-5">
              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.22, duration: 0.45 }}
              >
                <SectionTitle label={labels.quickFacts} color={dragon.color} />
                <div className="grid gap-3 md:grid-cols-2">
                  <FactCard
                    label={labels.era}
                    value={locale === "zh" ? dragon.eraZh : dragon.era}
                    color={dragon.color}
                  />
                  <FactCard
                    label={labels.role}
                    value={locale === "zh" ? dragon.roleZh : dragon.role}
                    color={dragon.color}
                  />
                </div>
              </motion.section>

              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.45 }}
              >
                <div className="grid gap-4">
                  <div>
                    <SectionTitle label={labels.domains} color={dragon.color} />
                    <ChipList
                      items={locale === "zh" ? dragon.domainsZh : dragon.domains}
                      color={dragon.color}
                    />
                  </div>

                  <div>
                    <SectionTitle label={labels.traits} color={dragon.color} />
                    <ChipList
                      items={locale === "zh" ? dragon.traitsZh : dragon.traits}
                      color={dragon.color}
                    />
                  </div>
                </div>
              </motion.section>

              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.38, duration: 0.45 }}
                className="rounded-sm border px-4 py-4"
                style={{
                  borderColor: `${dragon.color}18`,
                  background: "rgba(255,255,255,0.02)",
                }}
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
                transition={{ delay: 0.46, duration: 0.8 }}
                className="h-px origin-left"
                style={{
                  background: `linear-gradient(90deg, ${dragon.color}55, transparent)`,
                }}
              />

              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.54, duration: 0.45 }}
                className="space-y-4"
              >
                <div>
                  <SectionTitle label={labels.sources} color={dragon.color} muted />
                  <p className="text-[13px] leading-[1.8] text-stone-300 md:text-[12px]">
                    {locale === "zh" ? dragon.sourceContextZh : dragon.sourceContext}
                  </p>
                </div>

                <div>
                  <SectionTitle label={labels.comparison} color={dragon.color} muted />
                  <p className="text-[13px] leading-[1.8] text-stone-300 md:text-[12px]">
                    {locale === "zh"
                      ? dragon.comparativeNoteZh
                      : dragon.comparativeNote}
                  </p>
                </div>
              </motion.section>

              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.62, duration: 0.45 }}
                className="rounded-sm border px-4 py-4"
                style={{
                  borderColor: `${dragon.color}30`,
                  background: `linear-gradient(180deg, ${dragon.color}12, rgba(255,255,255,0.02))`,
                  boxShadow: `0 0 0 1px ${dragon.color}10 inset`,
                }}
              >
                <SectionTitle label={labels.compareTitle} color={dragon.color} />
                <p className="mb-4 text-[13px] leading-[1.75] text-stone-200 md:text-[12px]">
                  {labels.compareLead}
                </p>
                <div className="flex flex-col gap-3">
                  <div>
                    <p
                      className="mb-2 text-[9px] uppercase tracking-[0.18em]"
                      style={{ color: "rgba(191, 168, 129, 0.62)" }}
                    >
                      {labels.compareFieldLabel}
                    </p>
                    <div className="relative">
                      <select
                        value={compareTargetId}
                        onChange={(e) => onCompareTargetChange(e.target.value)}
                        className="w-full appearance-none rounded-sm border bg-transparent px-3 py-3 pr-10 text-[13px] outline-none"
                        style={{
                          borderColor: `${dragon.color}38`,
                          color: "rgba(226, 216, 196, 0.94)",
                          background: "rgba(8,7,5,0.26)",
                        }}
                      >
                        <option value="" style={{ background: "#12100c", color: "#e2d8c4" }}>
                          {labels.comparePlaceholder}
                        </option>
                        {compareOptions.map((option) => (
                          <option
                            key={option.id}
                            value={option.id}
                            style={{ background: "#12100c", color: "#e2d8c4" }}
                          >
                            {locale === "zh" ? option.nameZh : option.name}
                          </option>
                        ))}
                      </select>
                      <span
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[14px]"
                        style={{ color: `${dragon.color}cc` }}
                      >
                        ▾
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={!compareTargetId}
                    onClick={onStartCompare}
                    className="rounded-sm border px-3 py-3 text-[11px] uppercase tracking-[0.22em] transition-colors disabled:opacity-35"
                    style={{
                      borderColor: `${dragon.color}40`,
                      background: `${dragon.color}22`,
                      color: `${dragon.color}f4`,
                      boxShadow: compareTargetId
                        ? `0 10px 24px ${dragon.color}18`
                        : "none",
                    }}
                  >
                    {labels.compareAction}
                  </button>
                </div>
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
