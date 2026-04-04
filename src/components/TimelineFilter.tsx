"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Locale, TimelinePeriod } from "@/data/dragons";
import { timelinePeriods } from "@/data/dragons";

interface TimelineFilterProps {
  locale: Locale;
  activeTimeline: TimelinePeriod | "all";
  onChange: (period: TimelinePeriod | "all") => void;
  mobileHidden?: boolean;
  desktopInline?: boolean;
  compact?: boolean;
}

export default function TimelineFilter({
  locale,
  activeTimeline,
  onChange,
  mobileHidden = false,
  desktopInline = false,
  compact = false,
}: TimelineFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const activePeriod =
    activeTimeline === "all"
      ? null
      : timelinePeriods.find((period) => period.id === activeTimeline) ?? null;

  return (
    <div
      className={`timeline-filter fixed left-1/2 top-[4.6rem] z-40 w-[min(96vw,56rem)] -translate-x-1/2 rounded-sm px-3 py-3 transition-opacity duration-300 md:top-16 md:w-[min(94vw,56rem)] md:px-3 md:py-3 ${
        desktopInline
          ? "lg:static lg:left-auto lg:top-auto lg:z-auto lg:w-full lg:-translate-x-0 lg:translate-y-0 lg:px-0 lg:py-0"
          : "lg:left-6 lg:top-[9.25rem] lg:w-60 lg:-translate-x-0 lg:translate-y-0 lg:px-3 lg:py-4"
      } ${
        mobileHidden ? "pointer-events-none opacity-0 md:pointer-events-auto md:opacity-100" : "opacity-100"
      } ${compact ? "timeline-filter-compact" : ""} ${
        compact && isExpanded ? "timeline-filter-expanded" : ""
      }`}
      style={{
        background:
          "linear-gradient(180deg, rgba(8, 7, 5, 0.82), rgba(8, 7, 5, 0.5) 78%, rgba(8,7,5,0.24))",
        backdropFilter: "blur(3px)",
        border: "1px solid rgba(201, 168, 76, 0.12)",
      }}
    >
      <div className="mb-2 flex items-center justify-between gap-3 lg:mb-3 lg:flex-col lg:items-start lg:justify-start">
        <p
          className="text-[10px] uppercase tracking-[0.24em]"
          style={{ color: "rgba(224, 196, 118, 0.78)" }}
        >
          {locale === "zh" ? "時間軸" : "Timeline"}
        </p>

        {compact ? (
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="rounded-sm border px-2.5 py-1 text-[9px] uppercase tracking-[0.18em]"
            style={{
              color: "rgba(214, 193, 160, 0.86)",
              borderColor: "rgba(201, 168, 76, 0.18)",
              background: "rgba(255,255,255,0.03)",
            }}
          >
            {activePeriod
              ? locale === "zh"
                ? activePeriod.labelZh
                : activePeriod.label
              : locale === "zh"
                ? "全部"
                : "All"}
          </button>
        ) : (
          <p
            className="hidden text-right text-[9px] uppercase tracking-[0.14em] md:block lg:text-left"
            style={{ color: "rgba(191, 168, 129, 0.46)" }}
          >
            {locale === "zh"
              ? "只淡化不符合時期的文化區域"
              : "Dims unmatched regions without disabling them"}
          </p>
        )}
      </div>

      <div
        className={`-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 md:mx-0 md:grid md:grid-cols-6 md:gap-2 md:overflow-visible md:px-0 md:pb-0 lg:flex lg:flex-col lg:gap-2 lg:overflow-visible lg:px-0 lg:pb-0 ${
          compact && !isExpanded ? "hidden" : ""
        }`}
      >
        {timelinePeriods.map((period) => {
          const isActive = activeTimeline === period.id;
          return (
            <button
              key={period.id}
              type="button"
              onClick={() => {
                onChange(period.id);
                if (compact) {
                  setIsExpanded(false);
                }
              }}
              className="relative min-w-[7.5rem] shrink-0 rounded-sm border px-3 py-2 text-left transition-colors md:min-w-0 lg:w-full"
              style={{
                borderColor: isActive
                  ? "rgba(201, 168, 76, 0.32)"
                  : "rgba(201, 168, 76, 0.12)",
                background: isActive
                  ? "rgba(201, 168, 76, 0.12)"
                  : "rgba(255,255,255,0.02)",
              }}
            >
              {isActive && (
                <motion.span
                  layoutId="timeline-active"
                  className="absolute inset-0 rounded-sm"
                  style={{
                    boxShadow: "0 0 0 1px rgba(201, 168, 76, 0.16) inset",
                  }}
                />
              )}
              <span
                className="block text-[10px] uppercase tracking-[0.2em]"
                style={{
                  color: isActive
                    ? "rgba(224, 196, 118, 0.92)"
                    : "rgba(214, 193, 160, 0.8)",
                }}
              >
                {locale === "zh" ? period.labelZh : period.label}
              </span>
              <span
                className="mt-1 block text-[9px] leading-relaxed md:text-[10px]"
                style={{
                  color: isActive
                    ? "rgba(226, 216, 196, 0.84)"
                    : "rgba(191, 168, 129, 0.62)",
                }}
              >
                <span className="md:hidden">
                  {locale === "zh" ? period.labelZh : period.label}
                </span>
                <span className="hidden md:inline">
                  {locale === "zh" ? period.noteZh : period.note}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
