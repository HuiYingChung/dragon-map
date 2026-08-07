"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { DragonRegion, Locale } from "@/data/dragons";

interface CompareCardProps {
  leftDragon: DragonRegion | null;
  rightDragon: DragonRegion | null;
  locale: Locale;
  landscapeMobile?: boolean;
  onClose: () => void;
}

const LABELS = {
  en: {
    close: "close",
    title: "Dragon Comparison",
    era: "Era",
    role: "Cultural role",
    domains: "Primary domains",
    traits: "Visual traits",
    sources: "Source context",
    associations: "Associated with",
    comparison: "Comparative note",
  },
  zh: {
    close: "關閉",
    title: "龍的比較",
    era: "時代",
    role: "文化角色",
    domains: "主要領域",
    traits: "形象特徵",
    sources: "來源脈絡",
    associations: "關聯象徵",
    comparison: "對照註記",
  },
};

function ValueBlock({
  title,
  children,
  color,
}: {
  title: string;
  children: React.ReactNode;
  color: string;
}) {
  return (
    <div className="rounded-sm border px-4 py-4" style={{ borderColor: `${color}18` }}>
      <p
        className="mb-2 text-[10px] uppercase tracking-[0.2em]"
        style={{ color: `${color}99` }}
      >
        {title}
      </p>
      {children}
    </div>
  );
}

function CompareColumn({
  dragon,
  locale,
  labels,
}: {
  dragon: DragonRegion;
  locale: Locale;
  labels: (typeof LABELS)["en"];
}) {
  const domains = locale === "zh" ? dragon.domainsZh : dragon.domains;
  const traits = locale === "zh" ? dragon.traitsZh : dragon.traits;

  return (
    <div
      className="rounded-sm border px-4 py-4 md:px-5 md:py-5"
      style={{
        borderColor: `${dragon.color}22`,
        background: "rgba(255,255,255,0.02)",
      }}
    >
      <h3
        className="text-[20px] uppercase tracking-[0.1em] md:text-[18px]"
        style={{ color: dragon.color }}
      >
        {locale === "zh" ? dragon.nameZh : dragon.name}
      </h3>
      <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-stone-300">
        {locale === "zh" ? dragon.traditionZh : dragon.tradition}
      </p>
      <p className="mt-1 text-[13px] italic text-stone-200">
        {locale === "zh" ? dragon.regionZh : dragon.region}
      </p>

      <div className="mt-4 space-y-3">
        <ValueBlock title={labels.era} color={dragon.color}>
          <p className="text-[13px] leading-relaxed text-stone-200">
            {locale === "zh" ? dragon.eraZh : dragon.era}
          </p>
        </ValueBlock>

        <ValueBlock title={labels.role} color={dragon.color}>
          <p className="text-[13px] leading-relaxed text-stone-100">
            {locale === "zh" ? dragon.roleZh : dragon.role}
          </p>
        </ValueBlock>

        <ValueBlock title={labels.domains} color={dragon.color}>
          <div className="flex flex-wrap gap-2">
            {domains.map((domain) => (
              <span
                key={domain}
                className="rounded-sm px-2.5 py-1 text-[11px]"
                style={{
                  background: `${dragon.color}12`,
                  border: `1px solid ${dragon.color}20`,
                  color: `${dragon.color}ee`,
                }}
              >
                {domain}
              </span>
            ))}
          </div>
        </ValueBlock>

        <ValueBlock title={labels.traits} color={dragon.color}>
          <div className="flex flex-wrap gap-2">
            {traits.map((trait) => (
              <span
                key={trait}
                className="rounded-sm px-2.5 py-1 text-[11px]"
                style={{
                  background: `${dragon.color}0d`,
                  border: `1px solid ${dragon.color}1a`,
                  color: "rgba(226, 216, 196, 0.9)",
                }}
              >
                {trait}
              </span>
            ))}
          </div>
        </ValueBlock>

        <ValueBlock title={labels.sources} color={dragon.color}>
          <p className="text-[12px] leading-[1.8] text-stone-300">
            {locale === "zh" ? dragon.sourceContextZh : dragon.sourceContext}
          </p>
        </ValueBlock>

        <ValueBlock title={labels.associations} color={dragon.color}>
          <p className="text-[12px] italic leading-[1.8]" style={{ color: `${dragon.color}dd` }}>
            {locale === "zh" ? dragon.associatedWithZh : dragon.associatedWith}
          </p>
        </ValueBlock>

        <ValueBlock title={labels.comparison} color={dragon.color}>
          <p className="text-[12px] leading-[1.8] text-stone-300">
            {locale === "zh" ? dragon.comparativeNoteZh : dragon.comparativeNote}
          </p>
        </ValueBlock>
      </div>
    </div>
  );
}

export default function CompareCard({
  leftDragon,
  rightDragon,
  locale,
  landscapeMobile = false,
  onClose,
}: CompareCardProps) {
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
      {leftDragon && rightDragon && (
        <motion.aside
          key={`${leftDragon.id}-${rightDragon.id}`}
          initial={{ opacity: 0, y: isMobile ? 40 : 0, x: isMobile ? 0 : 24 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: isMobile ? 40 : 0, x: isMobile ? 0 : 18 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`compare-card fixed z-50 pointer-events-auto overflow-hidden
            bottom-2 left-2 right-2 rounded-sm max-h-[80vh] overflow-y-auto
            md:bottom-auto md:top-5 md:left-auto md:right-5 md:w-[min(92vw,760px)] md:max-h-[calc(100vh-2.5rem)] md:rounded-sm ${
              landscapeMobile ? "compare-card-landscape" : ""
            }`}
          style={{
            background:
              "linear-gradient(180deg, rgba(9,8,6,0.95), rgba(9,8,6,0.86) 40%, rgba(9,8,6,0.76) 100%)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            border: "1px solid rgba(201, 168, 76, 0.12)",
            boxShadow: landscapeMobile
              ? "-24px 0 40px rgba(0,0,0,0.34)"
              : isMobile
                ? "0 -12px 40px rgba(0,0,0,0.45)"
                : "-18px 0 40px rgba(0,0,0,0.22)",
          }}
        >
          <div className="px-5 py-5 pb-8 md:px-6 md:py-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-stone-400">
                  {labels.title}
                </p>
                <p className="mt-2 text-[14px] italic text-stone-200">
                  {locale === "zh"
                    ? "以相同欄位並排閱讀兩條龍的文化差異"
                    : "Read two dragon traditions side by side through the same curatorial lens"}
                </p>
              </div>

              <button
                onClick={onClose}
                className="text-[13px] uppercase tracking-[0.22em] text-stone-400 transition-colors hover:text-stone-200 md:text-[11px]"
              >
                {labels.close}
              </button>
            </div>

            <div className={`mt-6 grid gap-4 ${landscapeMobile ? "" : "md:grid-cols-2"}`}>
              <CompareColumn dragon={leftDragon} locale={locale} labels={labels} />
              <CompareColumn dragon={rightDragon} locale={locale} labels={labels} />
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
