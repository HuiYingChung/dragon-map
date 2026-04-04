"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import { dragonRegions, type DragonRegion } from "@/data/dragons";

const STORAGE_KEY = "dragon-map:daily-card-v1";

type StoredDailyCard = {
  date: string;
  dragonId: string;
};

const CARD_LABELS = {
  trigger: "Draw Today's Dragon Card",
  reveal: "Reveal Today's Card",
  title: "Today's Museum Card",
  eyebrow: "Daily Keepsake",
  lead:
    "The atlas yields one dragon each day. Once drawn, today's card remains yours until tomorrow.",
  drawnToday: "Drawn today",
  placeholder: "Museum card artwork",
  placeholderNote:
    "This card is ready to keep, print, or revisit from the atlas archive.",
  onePerDay: "One random draw per local day",
  returnTomorrow: "Return tomorrow for another dragon.",
  print: "Open Print Card",
  detail: "Open Dragon Entry",
  close: "Close",
} as const;

function getLocalDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function findDragonById(id: string | null) {
  if (!id) return null;
  return dragonRegions.find((dragon) => dragon.id === id) ?? null;
}

function readStoredDailyCard() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<StoredDailyCard>;
    if (typeof parsed.date !== "string" || typeof parsed.dragonId !== "string") {
      return null;
    }

    return parsed as StoredDailyCard;
  } catch {
    return null;
  }
}

function persistDailyCard(card: StoredDailyCard) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(card));
}

function drawRandomDragon() {
  const randomIndex = Math.floor(Math.random() * dragonRegions.length);
  return dragonRegions[randomIndex] ?? null;
}

export default function DailyDragonCard() {
  const labels = CARD_LABELS;
  const [isOpen, setIsOpen] = useState(false);
  const [todaysCard, setTodaysCard] = useState<DragonRegion | null>(null);
  const [hasDrawnToday, setHasDrawnToday] = useState(false);

  const drawOrRevealCard = useCallback(() => {
    const today = getLocalDateKey();
    const stored = readStoredDailyCard();

    if (stored?.date === today) {
      const existingDragon = findDragonById(stored.dragonId);
      if (existingDragon) {
        setTodaysCard(existingDragon);
        setHasDrawnToday(true);
        setIsOpen(true);
        return;
      }
    }

    const dragon = drawRandomDragon();
    if (!dragon) {
      return;
    }

    persistDailyCard({ date: today, dragonId: dragon.id });
    setTodaysCard(dragon);
    setHasDrawnToday(true);
    setIsOpen(true);
  }, []);

  const availabilityLabel = useMemo(
    () => (hasDrawnToday ? labels.reveal : labels.trigger),
    [hasDrawnToday, labels.reveal, labels.trigger],
  );

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    document.body.classList.toggle("daily-card-open", isOpen);

    return () => {
      document.body.classList.remove("daily-card-open");
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={drawOrRevealCard}
        className="pointer-events-auto flex-1 rounded-sm border px-3 py-2 text-[10px] uppercase tracking-[0.18em] transition-all duration-200 hover:-translate-y-px hover:text-stone-100 hover:shadow-[0_10px_24px_rgba(201,168,76,0.16)] disabled:opacity-40 md:flex-none"
        style={{
          color: "rgba(230, 210, 173, 0.92)",
          borderColor: "rgba(224, 196, 118, 0.34)",
          background:
            "linear-gradient(180deg, rgba(76, 50, 21, 0.92), rgba(31, 21, 11, 0.84))",
          boxShadow: hasDrawnToday ? "0 0 0 1px rgba(224, 196, 118, 0.12) inset" : "none",
          backdropFilter: "blur(2px)",
        }}
      >
        {availabilityLabel}
      </button>

      <AnimatePresence>
        {isOpen && todaysCard ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/65 backdrop-blur-[4px]"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.98 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute left-4 right-4 top-[5.5rem] mx-auto max-w-[62rem] overflow-hidden rounded-sm border md:left-6 md:right-6 md:top-12"
              style={{
                borderColor: `${todaysCard.color}33`,
                background:
                  "linear-gradient(180deg, rgba(11, 9, 6, 0.98), rgba(8, 7, 5, 0.94) 100%)",
                boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
              }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="grid gap-0 md:grid-cols-[minmax(0,1.1fr)_minmax(320px,24rem)]">
                <section className="relative min-h-[22rem] overflow-hidden px-5 py-5 md:px-7 md:py-7">
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(circle at 22% 18%, ${todaysCard.glowColor} 0%, transparent 38%), radial-gradient(circle at 80% 68%, ${todaysCard.color}1c 0%, transparent 34%)`,
                    }}
                  />

                  <div className="relative flex h-full flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p
                          className="text-[10px] uppercase tracking-[0.24em]"
                          style={{ color: `${todaysCard.color}bb` }}
                        >
                          {labels.eyebrow}
                        </p>
                        <h2
                          className="mt-2 text-[24px] uppercase tracking-[0.1em] md:text-[32px]"
                          style={{ color: "rgba(236, 226, 207, 0.96)" }}
                        >
                          {labels.title}
                        </h2>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="rounded-sm border px-2.5 py-1.5 text-[11px] uppercase tracking-[0.18em] transition-all duration-200 hover:-translate-y-px hover:bg-white/5 hover:text-stone-100"
                        style={{ color: "rgba(191, 168, 129, 0.74)" }}
                      >
                        {labels.close}
                      </button>
                    </div>

                    <p
                      className="mt-4 max-w-2xl text-[14px] leading-[1.8] md:text-[15px]"
                      style={{ color: "rgba(220, 210, 188, 0.88)" }}
                    >
                      {labels.lead}
                    </p>

                    <div className="mt-6 grid gap-4 md:grid-cols-[minmax(0,1fr)_14rem]">
                      <div
                        className="relative overflow-hidden rounded-sm border p-4"
                        style={{
                          borderColor: `${todaysCard.color}28`,
                          background:
                            "linear-gradient(180deg, rgba(245, 238, 223, 0.08), rgba(255,255,255,0.03))",
                        }}
                      >
                        <div
                          className="absolute inset-x-6 top-5 h-px"
                          style={{
                            background: `linear-gradient(90deg, transparent, ${todaysCard.color}55, transparent)`,
                          }}
                        />

                        <div className="relative aspect-[3/2] overflow-hidden rounded-[0.1rem] border border-black/20 bg-[#19140f]">
                          <div
                            className="absolute inset-0"
                            style={{
                              background:
                                "linear-gradient(135deg, rgba(246, 240, 224, 0.08), rgba(11, 9, 6, 0.16) 65%, rgba(246, 240, 224, 0.05))",
                            }}
                          />
                          <Image
                            src={todaysCard.image}
                            alt={`${todaysCard.name} museum card artwork`}
                            fill
                            sizes="(max-width: 768px) 100vw, 420px"
                            className="object-contain p-5 opacity-80"
                          />
                          <div className="absolute left-3 top-3 rounded-sm border border-white/10 bg-black/35 px-2 py-1">
                            <p className="text-[9px] uppercase tracking-[0.18em] text-stone-100">
                              {labels.placeholder}
                            </p>
                          </div>
                        </div>

                        <p className="mt-4 text-[13px] leading-[1.7] text-stone-300">
                          {labels.placeholderNote}
                        </p>
                      </div>

                      <div className="flex flex-col justify-between gap-4">
                        <div
                          className="rounded-sm border px-4 py-4"
                          style={{
                            borderColor: `${todaysCard.color}24`,
                            background: `${todaysCard.color}10`,
                          }}
                        >
                          <p
                            className="text-[10px] uppercase tracking-[0.22em]"
                            style={{ color: `${todaysCard.color}bb` }}
                          >
                            {labels.drawnToday}
                          </p>
                          <h3
                            className="mt-3 text-[26px] uppercase tracking-[0.1em]"
                            style={{ color: `${todaysCard.color}f2` }}
                          >
                            {todaysCard.name}
                          </h3>
                          <p className="mt-2 text-[12px] uppercase tracking-[0.18em] text-stone-300">
                            {todaysCard.tradition}
                          </p>
                          <p className="mt-4 text-[13px] italic leading-[1.8] text-stone-200">
                            {todaysCard.atmosphere}
                          </p>
                        </div>

                        <div className="space-y-3">
                          <div
                            className="rounded-sm border px-4 py-3"
                            style={{
                              borderColor: "rgba(201, 168, 76, 0.12)",
                              background: "rgba(255,255,255,0.025)",
                            }}
                          >
                            <p className="text-[10px] uppercase tracking-[0.18em] text-stone-400">
                              {labels.onePerDay}
                            </p>
                            <p className="mt-2 text-[13px] leading-[1.7] text-stone-200">
                              {labels.returnTomorrow}
                            </p>
                          </div>

                          <div className="flex flex-col gap-2">
                            <Link
                              href={`/dragons/${todaysCard.id}/card`}
                              className="rounded-sm border px-3 py-3 text-center text-[11px] uppercase tracking-[0.22em] transition-all duration-200 hover:-translate-y-px hover:brightness-110 hover:shadow-[0_10px_24px_rgba(201,168,76,0.18)]"
                              style={{
                                borderColor: `${todaysCard.color}34`,
                                background: `linear-gradient(180deg, ${todaysCard.color}28, ${todaysCard.color}14)`,
                                color: `${todaysCard.color}f0`,
                              }}
                            >
                              {labels.print}
                            </Link>
                            <Link
                              href={`/dragons/${todaysCard.id}`}
                              className="rounded-sm border px-3 py-3 text-center text-[11px] uppercase tracking-[0.22em] text-stone-200 transition-all duration-200 hover:-translate-y-px hover:border-[rgba(201,168,76,0.28)] hover:bg-[rgba(255,255,255,0.05)] hover:text-stone-100"
                              style={{
                                borderColor: "rgba(201, 168, 76, 0.16)",
                                background: "rgba(255,255,255,0.03)",
                              }}
                            >
                              {labels.detail}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
