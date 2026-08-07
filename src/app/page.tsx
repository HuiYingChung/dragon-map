"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { dragonRegions, type Locale } from "@/data/dragons";
import WorldMap from "@/components/WorldMap";
import MythCard from "@/components/MythCard";
import CompareCard from "@/components/CompareCard";
import TimelineFilter from "@/components/TimelineFilter";
import Marginalia from "@/components/Marginalia";
import CursorAura from "@/components/CursorAura";
import OracleChat from "@/components/OracleChat";
import DailyDragonCard from "@/components/DailyDragonCard";
import type { TimelinePeriod } from "@/data/dragons";

const AmbientEffects = dynamic(() => import("@/components/AmbientEffects"), {
  ssr: false,
});

export default function Home() {
  const [locale, setLocale] = useState<Locale>("en");
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [compareTargetId, setCompareTargetId] = useState("");
  const [comparisonIds, setComparisonIds] = useState<[string, string] | null>(null);
  const [activeTimeline, setActiveTimeline] = useState<TimelinePeriod | "all">("all");
  const [isOracleOpen, setIsOracleOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isLandscapeMobile, setIsLandscapeMobile] = useState(false);
  const [isSmallViewport, setIsSmallViewport] = useState(false);

  useEffect(() => {
    const updateViewportMode = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setIsLandscapeMobile(width < 1024 && width > height && height <= 560);
      setIsSmallViewport(width < 768);
    };

    updateViewportMode();
    window.addEventListener("resize", updateViewportMode);
    window.addEventListener("orientationchange", updateViewportMode);

    return () => {
      window.removeEventListener("resize", updateViewportMode);
      window.removeEventListener("orientationchange", updateViewportMode);
    };
  }, []);

  const handleRegionClick = useCallback((id: string) => {
    setComparisonIds(null);
    setCompareTargetId("");
    setActiveRegion((prev) => (prev === id ? null : id));
  }, []);

  const handleRegionHover = useCallback((id: string | null) => {
    setHoveredRegion(id);
  }, []);

  const handleClose = useCallback(() => {
    setComparisonIds(null);
    setCompareTargetId("");
    setActiveRegion(null);
  }, []);

  const handleStartCompare = useCallback(() => {
    if (!activeRegion || !compareTargetId) return;
    setComparisonIds([activeRegion, compareTargetId]);
  }, [activeRegion, compareTargetId]);

  const handleCloseComparison = useCallback(() => {
    setComparisonIds(null);
  }, []);

  const activeDragon = dragonRegions.find((r) => r.id === activeRegion) ?? null;
  const hoveredDragon = dragonRegions.find((r) => r.id === hoveredRegion);
  const compareOptions = activeDragon
    ? dragonRegions.filter((region) => region.id !== activeDragon.id)
    : [];
  const comparisonLeft = comparisonIds
    ? dragonRegions.find((region) => region.id === comparisonIds[0]) ?? null
    : null;
  const comparisonRight = comparisonIds
    ? dragonRegions.find((region) => region.id === comparisonIds[1]) ?? null
    : null;
  const guideSteps =
    locale === "zh"
      ? [
          "滑過地圖上的區域即可預覽該地的龍與氛圍，點擊後展開詳細卡片。",
          "使用時間軸可聚焦特定時代；其他傳統會被淡化，但仍可繼續探索。",
          "在右側卡片底部選擇第二條龍，即可進入並列比較模式。",
          "使用底部的抽卡按鈕可領取今日龍卡；每天只會隨機抽出一張，並可開啟列印版本收藏。",
          "打開 Oracle，向它詢問不同文化之間的龍、蛇與神話聯繫。",
        ]
      : [
          "Hover over a region to preview its dragon tradition and click to open the full entry.",
          "Use the timeline to focus on a period; other traditions dim, but remain explorable.",
          "Choose a second dragon at the bottom of the card to enter side-by-side comparison mode.",
          "Use the draw-card button along the bottom controls to claim today's dragon card. Each day yields one random keepsake that you can open and print.",
          "Open the Oracle to ask about cross-cultural dragon, serpent, and myth connections.",
        ];

  return (
    <main
      className={`page-shell relative h-[100dvh] min-h-[100dvh] w-screen overflow-hidden bg-[#080705] ${
        isLandscapeMobile ? "page-shell-landscape" : ""
      }`}
    >
      <CursorAura />
      <AmbientEffects />

      <div
        className={`page-map-wrap relative z-10 flex h-full w-full items-center justify-center pb-[5.5rem] transition-[padding,transform] duration-700 ease-out lg:pl-[17rem] ${
          activeDragon ? "pb-[34vh] md:pb-0 md:pr-[320px] lg:pr-[360px]" : ""
        } ${activeDragon || comparisonIds ? "page-map-with-panel" : ""} ${
          isLandscapeMobile ? "page-map-wrap-landscape" : ""
        } md:-translate-x-4 lg:-translate-x-6`}
      >
        <WorldMap
          regions={dragonRegions}
          locale={locale}
          activeRegion={activeRegion}
          hoveredRegion={hoveredRegion}
          activeTimeline={activeTimeline}
          onRegionHover={handleRegionHover}
          onRegionClick={handleRegionClick}
        />

        <AnimatePresence>
          {hoveredDragon && !activeRegion && !isLandscapeMobile && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="page-hover-note pointer-events-none z-20 fixed left-4 right-4 top-[10rem] md:absolute md:bottom-9 md:left-1/2 md:right-auto md:top-auto md:w-[min(88vw,42rem)] md:-translate-x-1/2"
            >
              <div
                className="rounded-sm px-5 py-3 text-center"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(13, 11, 8, 0.16), rgba(13, 11, 8, 0.78) 32%, rgba(13, 11, 8, 0.28) 100%)",
                  backdropFilter: "blur(3px)",
                  border: `1px solid ${hoveredDragon.color}22`,
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                }}
              >
                <div className="mb-2 flex items-center gap-3">
                  <div
                    className="h-px flex-1"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${hoveredDragon.color}44)`,
                    }}
                  />
                  <span
                    className="text-[10px] uppercase tracking-[0.28em]"
                    style={{ color: `${hoveredDragon.color}aa` }}
                  >
                    {locale === "zh" ? "邊註" : "Marginal Note"}
                  </span>
                  <div
                    className="h-px flex-1"
                    style={{
                      background: `linear-gradient(90deg, ${hoveredDragon.color}44, transparent)`,
                    }}
                  />
                </div>

                <p
                  className="text-[16px] font-medium italic leading-relaxed tracking-[0.04em] md:text-[15px]"
                  style={{
                    color: `${hoveredDragon.color}f0`,
                    textShadow: "0 1px 12px rgba(8, 7, 5, 0.95)",
                  }}
                >
                  {locale === "zh" ? hoveredDragon.atmosphereZh : hoveredDragon.atmosphere}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {comparisonIds ? (
        <CompareCard
          leftDragon={comparisonLeft}
          rightDragon={comparisonRight}
          locale={locale}
          landscapeMobile={isLandscapeMobile}
          onClose={handleCloseComparison}
        />
      ) : (
        <MythCard
          dragon={activeDragon}
          locale={locale}
          landscapeMobile={isLandscapeMobile}
          compareOptions={compareOptions}
          compareTargetId={compareTargetId}
          onCompareTargetChange={setCompareTargetId}
          onStartCompare={handleStartCompare}
          onClose={handleClose}
        />
      )}

      <div className="hidden lg:absolute lg:bottom-6 lg:left-6 lg:top-5 lg:z-40 lg:flex lg:w-60 lg:flex-col lg:justify-between">
        <div className="pointer-events-none rounded-sm px-3 py-2">
          <h1
            className="text-[12px] font-semibold uppercase tracking-[0.3em]"
            style={{
              color: "rgba(224, 196, 118, 0.92)",
              textShadow: "0 1px 8px rgba(8, 7, 5, 0.55)",
            }}
          >
            {locale === "zh" ? "群龍所居之處" : "Where Dragons Dwell"}
          </h1>
          <p
            className="mt-1 text-[9px] uppercase tracking-[0.17em]"
            style={{ color: "rgba(201, 178, 139, 0.78)" }}
          >
            {locale === "zh" ? "世界龍神話圖譜" : "An Atlas of Dragon Myths"}
          </p>
        </div>

        <div className="my-6">
          <TimelineFilter
            locale={locale}
            activeTimeline={activeTimeline}
            onChange={setActiveTimeline}
            compact={isLandscapeMobile}
            mobileHidden={!!activeRegion || !!comparisonIds || isOracleOpen}
            desktopInline
          />
        </div>

        <div className="space-y-5">
          <Marginalia dimmed={!!activeRegion} locale={locale} desktopInline />

          <div className="pointer-events-none rounded-sm px-3 py-2">
            <p
              className="text-[9px] uppercase tracking-[0.16em]"
              style={{ color: "rgba(191, 168, 129, 0.62)" }}
            >
              Copyright © 2026 Huiying Chung
            </p>
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <TimelineFilter
          locale={locale}
          activeTimeline={activeTimeline}
          onChange={setActiveTimeline}
          compact={isLandscapeMobile}
          mobileHidden={!!activeRegion || !!comparisonIds || isOracleOpen}
        />
      </div>

      <div className="lg:hidden">
        <Marginalia dimmed={!!activeRegion} locale={locale} />
      </div>

      <OracleChat
        locale={locale}
        landscapeMobile={isLandscapeMobile}
        onOpenChange={setIsOracleOpen}
      />

      <AnimatePresence>
        {isGuideOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/45 backdrop-blur-[2px]"
            onClick={() => setIsGuideOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className={`page-guide-panel absolute left-4 right-4 top-[5.5rem] mx-auto max-w-[28rem] rounded-sm border px-5 py-5 md:left-auto md:bottom-28 md:right-6 md:top-auto md:w-[24rem] ${
                isLandscapeMobile ? "page-guide-panel-landscape" : ""
              }`}
              style={{
                borderColor: "rgba(201, 168, 76, 0.2)",
                background:
                  "linear-gradient(180deg, rgba(10,8,5,0.97), rgba(8,7,5,0.92) 100%)",
                boxShadow: "0 20px 50px rgba(0,0,0,0.45)",
              }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p
                    className="text-[10px] uppercase tracking-[0.24em]"
                    style={{ color: "rgba(224, 196, 118, 0.78)" }}
                  >
                    {locale === "zh" ? "使用說明" : "How to Explore"}
                  </p>
                  <h2
                    className="mt-2 text-[18px] tracking-[0.04em] md:text-[20px]"
                    style={{ color: "rgba(231, 220, 198, 0.94)" }}
                  >
                    {locale === "zh"
                      ? "從地圖、時間與對照中閱讀龍的世界"
                      : "Read dragon traditions through map, time, and comparison"}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setIsGuideOpen(false)}
                  className="text-[11px] uppercase tracking-[0.18em] transition-colors"
                  style={{ color: "rgba(191, 168, 129, 0.72)" }}
                >
                  {locale === "zh" ? "關閉" : "close"}
                </button>
              </div>

              <div className="mt-5 space-y-3">
                {guideSteps.map((step, index) => (
                  <div
                    key={step}
                    className="grid grid-cols-[1.8rem_minmax(0,1fr)] items-start gap-3 rounded-sm border px-3 py-3"
                    style={{
                      borderColor: "rgba(201, 168, 76, 0.12)",
                      background: "rgba(255,255,255,0.025)",
                    }}
                  >
                    <div
                      className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] uppercase"
                      style={{
                        color: "rgba(224, 196, 118, 0.92)",
                        border: "1px solid rgba(201, 168, 76, 0.22)",
                        background: "rgba(201, 168, 76, 0.08)",
                      }}
                    >
                      {index + 1}
                    </div>
                    <p className="pt-0.5 text-[13px] leading-[1.75] text-stone-200 md:text-[12px]">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={`page-mobile-title fixed left-3 top-3 z-40 max-w-[calc(100vw-7.5rem)] pointer-events-none rounded-sm px-2.5 py-2 md:left-5 md:top-5 md:max-w-none md:px-3 lg:hidden ${
          isLandscapeMobile ? "page-mobile-title-landscape" : ""
        }`}
      >
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(8, 7, 5, 0.76), rgba(8, 7, 5, 0.2) 78%, transparent)",
            backdropFilter: "blur(2px)",
          }}
        >
          <h1
            className="text-[10px] font-semibold uppercase tracking-[0.24em] md:text-[12px] md:tracking-[0.3em]"
            style={{
              color: "rgba(224, 196, 118, 0.92)",
              textShadow: "0 1px 8px rgba(8, 7, 5, 0.55)",
            }}
          >
            {locale === "zh" ? "群龍所居之處" : "Where Dragons Dwell"}
          </h1>
          <p
            className="mt-1 text-[8px] uppercase tracking-[0.14em] md:text-[9px] md:tracking-[0.17em]"
            style={{ color: "rgba(201, 178, 139, 0.78)" }}
          >
            {locale === "zh" ? "世界龍神話圖譜" : "An Atlas of Dragon Myths"}
          </p>
        </div>
      </div>

      <div
        className={`page-mobile-copyright fixed bottom-[4.75rem] left-4 z-30 pointer-events-none rounded-sm px-3 py-2 lg:hidden ${
          isLandscapeMobile ? "page-mobile-copyright-landscape" : ""
        }`}
        style={{
          background:
            "linear-gradient(90deg, rgba(8, 7, 5, 0.72), rgba(8, 7, 5, 0.18) 78%, transparent)",
          backdropFilter: "blur(1.5px)",
        }}
      >
        <p
          className="text-[9px] uppercase tracking-[0.16em]"
          style={{ color: "rgba(191, 168, 129, 0.62)" }}
        >
          Copyright © 2026 Huiying Chung
        </p>
      </div>

      <div
        className={`page-bottom-controls fixed bottom-3 left-3 right-16 z-40 flex items-center justify-center gap-2 rounded-sm border px-3 py-2 md:bottom-6 md:left-auto md:right-24 md:flex-col md:items-end md:justify-start md:gap-3 md:border-0 md:px-0 md:py-0 ${
          isLandscapeMobile ? "page-bottom-controls-landscape" : ""
        }`}
        style={{
          borderColor:
            isSmallViewport || isLandscapeMobile
              ? "rgba(201, 168, 76, 0.14)"
              : "transparent",
          background:
            isSmallViewport || isLandscapeMobile
              ? "linear-gradient(180deg, rgba(8, 7, 5, 0.92), rgba(8, 7, 5, 0.74))"
              : "transparent",
          backdropFilter:
            isSmallViewport || isLandscapeMobile ? "blur(6px)" : "none",
        }}
      >
        <p
          className={`pointer-events-none text-right text-[9px] font-light uppercase tracking-[0.15em] ${
            isLandscapeMobile ? "hidden" : "hidden md:block"
          }`}
          style={{
            color: "rgba(224, 196, 118, 0.82)",
            textShadow: "0 1px 12px rgba(8, 7, 5, 0.6)",
          }}
        >
          {locale === "zh" ? "滑過以喚醒 · 點擊以展開" : "Hover to awaken · Click to reveal"}
        </p>
        <p
          className={`pointer-events-none block text-right text-[9px] font-light uppercase tracking-[0.15em] ${
            isLandscapeMobile ? "hidden" : "hidden"
          }`}
          style={{ color: "rgba(140, 120, 90, 0.3)" }}
        >
          {locale === "zh" ? "點擊以展開" : "Tap to reveal"}
        </p>
        <button
          type="button"
          onClick={() => setIsGuideOpen(true)}
          className="pointer-events-auto flex-1 rounded-sm border px-3 py-2 text-[10px] uppercase tracking-[0.18em] transition-colors hover:text-stone-100 md:flex-none"
          style={{
            color: "rgba(214, 193, 160, 0.86)",
            borderColor: "rgba(201, 168, 76, 0.18)",
            background:
              "linear-gradient(180deg, rgba(8, 7, 5, 0.72), rgba(8, 7, 5, 0.38))",
            backdropFilter: "blur(2px)",
          }}
        >
          {locale === "zh" ? "如何探索" : "How to Explore"}
        </button>
        <DailyDragonCard />
        <button
          type="button"
          onClick={() => setLocale((prev) => (prev === "en" ? "zh" : "en"))}
          className="pointer-events-auto flex-1 rounded-sm border px-3 py-2 text-[10px] uppercase tracking-[0.2em] transition-colors hover:text-stone-100 md:flex-none"
          style={{
            color: "rgba(214, 193, 160, 0.86)",
            borderColor: "rgba(201, 168, 76, 0.22)",
            background:
              "linear-gradient(180deg, rgba(8, 7, 5, 0.8), rgba(8, 7, 5, 0.45))",
            backdropFilter: "blur(2px)",
          }}
          aria-label={locale === "zh" ? "切換至英文" : "切換至中文"}
        >
          {locale === "zh" ? "EN / 英文" : "中文 / ZH"}
        </button>
      </div>

      <section className="sr-only" aria-label="About this dragon mythology atlas">
        <h2>About Where Dragons Dwell</h2>
        <p>
          Where Dragons Dwell is an interactive mythology atlas about dragon stories,
          serpent beings, and sacred creatures across world cultures. The project
          compares how East Asian, Japanese, Korean, South Asian, Mesoamerican,
          European, Norse, Egyptian, Persian, Aboriginal Australian, Polynesian, and
          Indigenous American traditions imagined dragons in relation to rivers,
          storms, creation, kingship, wisdom, danger, and cosmic order.
        </p>
        <p>
          Visitors can explore dragon myths including Long, Ryu, Yong, Imugi, Naga,
          Quetzalcoatl, Boiuna, Horned Serpent, the medieval European dragon,
          Jormungandr, Zmey, Apep, Azhdaha, the Rainbow Serpent, and Taniwha.
        </p>
        <h3>Topics covered</h3>
        <ul>
          <li>Dragon mythology by region</li>
          <li>Comparative folklore and symbolic meanings</li>
          <li>Sacred serpents, weather beings, and creation myths</li>
          <li>Interactive world map of dragon traditions</li>
        </ul>
        <h3>Dragon entries</h3>
        <ul>
          {dragonRegions.map((dragon) => (
            <li key={dragon.id}>
              <Link href={`/dragons/${dragon.id}`}>
                {dragon.name} - {dragon.tradition}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
