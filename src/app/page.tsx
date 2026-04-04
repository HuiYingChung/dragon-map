"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { dragonRegions, type Locale } from "@/data/dragons";
import WorldMap from "@/components/WorldMap";
import MythCard from "@/components/MythCard";
import CompareCard from "@/components/CompareCard";
import Marginalia from "@/components/Marginalia";
import CursorAura from "@/components/CursorAura";
import OracleChat from "@/components/OracleChat";

const AmbientEffects = dynamic(() => import("@/components/AmbientEffects"), {
  ssr: false,
});

export default function Home() {
  const [locale, setLocale] = useState<Locale>("en");
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [compareTargetId, setCompareTargetId] = useState("");
  const [comparisonIds, setComparisonIds] = useState<[string, string] | null>(null);

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

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#080705]">
      <CursorAura />
      <AmbientEffects />

      <div
        className={`relative z-10 flex h-full w-full items-center justify-center transition-[padding,transform] duration-700 ease-out ${
          activeDragon ? "md:pr-[320px] lg:pr-[360px] pb-[40vh] md:pb-0" : ""
        } md:-translate-x-4 lg:-translate-x-6`}
      >
        <WorldMap
          regions={dragonRegions}
          locale={locale}
          activeRegion={activeRegion}
          hoveredRegion={hoveredRegion}
          onRegionHover={handleRegionHover}
          onRegionClick={handleRegionClick}
        />

        <AnimatePresence>
          {hoveredDragon && !activeRegion && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="pointer-events-none z-20
                fixed top-[10rem] left-4 right-4
                md:absolute md:top-auto md:bottom-9 md:left-1/2 md:right-auto md:w-[min(88vw,42rem)] md:-translate-x-1/2"
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
                  className="text-[16px] md:text-[15px] font-medium italic tracking-[0.04em] leading-relaxed"
                  style={{
                    color: `${hoveredDragon.color}f0`,
                    textShadow: "0 1px 12px rgba(8, 7, 5, 0.95)",
                  }}
                >
                  {locale === "zh"
                    ? hoveredDragon.atmosphereZh
                    : hoveredDragon.atmosphere}
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
          onClose={handleCloseComparison}
        />
      ) : (
        <MythCard
          dragon={activeDragon}
          locale={locale}
          compareOptions={compareOptions}
          compareTargetId={compareTargetId}
          onCompareTargetChange={setCompareTargetId}
          onStartCompare={handleStartCompare}
          onClose={handleClose}
        />
      )}

      <Marginalia dimmed={!!activeRegion} locale={locale} />

      <OracleChat locale={locale} />

      <div
        className="fixed top-5 left-5 z-40 pointer-events-none rounded-sm px-3 py-2"
        style={{
          background:
            "linear-gradient(135deg, rgba(8, 7, 5, 0.76), rgba(8, 7, 5, 0.2) 78%, transparent)",
          backdropFilter: "blur(2px)",
        }}
      >
        <h1
          className="text-[12px] tracking-[0.3em] uppercase font-semibold"
          style={{
            color: "rgba(224, 196, 118, 0.92)",
            textShadow: "0 1px 8px rgba(8, 7, 5, 0.55)",
          }}
        >
          {locale === "zh" ? "群龍所居之處" : "Where Dragons Dwell"}
        </h1>
        <p
          className="mt-1 text-[9px] tracking-[0.17em] uppercase"
          style={{ color: "rgba(201, 178, 139, 0.78)" }}
        >
          {locale === "zh" ? "世界龍神話圖譜" : "An Atlas of Dragon Myths"}
        </p>
      </div>

      <div
        className="fixed left-6 bottom-6 z-40 pointer-events-none rounded-sm px-3 py-2"
        style={{
          background:
            "linear-gradient(90deg, rgba(8, 7, 5, 0.72), rgba(8, 7, 5, 0.18) 78%, transparent)",
          backdropFilter: "blur(1.5px)",
        }}
      >
        <p
          className="text-[9px] tracking-[0.16em] uppercase"
          style={{ color: "rgba(191, 168, 129, 0.62)" }}
        >
          Copyright © 2026 Huiying Chung
        </p>
      </div>

      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        <p
          className="pointer-events-none hidden text-right text-[9px] tracking-[0.15em] uppercase font-light md:block"
          style={{ color: "rgba(140, 120, 90, 0.2)" }}
        >
          {locale === "zh" ? "滑過以喚醒 · 點擊以展開" : "Hover to awaken · Click to reveal"}
        </p>
        <p
          className="pointer-events-none block text-right text-[9px] tracking-[0.15em] uppercase font-light md:hidden"
          style={{ color: "rgba(140, 120, 90, 0.3)" }}
        >
          {locale === "zh" ? "點擊以展開" : "Tap to reveal"}
        </p>
        <button
          type="button"
          onClick={() => setLocale((prev) => (prev === "en" ? "zh" : "en"))}
          className="pointer-events-auto rounded-sm border px-3 py-2 text-[10px] tracking-[0.2em] uppercase transition-colors hover:text-stone-100"
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
          Where Dragons Dwell is an interactive mythology atlas about dragon
          stories, serpent beings, and sacred creatures across world cultures.
          The project compares how East Asian, Japanese, Korean, South Asian,
          Mesoamerican, European, Norse, Egyptian, Persian, Aboriginal
          Australian, Polynesian, and Indigenous American traditions imagined
          dragons in relation to rivers, storms, creation, kingship, wisdom,
          danger, and cosmic order.
        </p>
        <p>
          Visitors can explore dragon myths including Long, Ryu, Yong, Imugi,
          Naga, Quetzalcoatl, Boiuna, Horned Serpent, the medieval European
          dragon, Jormungandr, Zmey, Apep, Azhdaha, the Rainbow Serpent, and
          Taniwha.
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
