"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { DragonRegion } from "@/data/dragons";

type ZoomableMuseumCardProps = {
  dragon: DragonRegion;
};

const CARD_WIDTH_PX = 3.5 * 96;
const CARD_HEIGHT_PX = 2 * 96;

function MuseumCard({ dragon }: { dragon: DragonRegion }) {
  return (
    <section
      className="museum-postcard business-card print-card-surface overflow-hidden rounded-sm border"
      style={{
        width: "3.5in",
        height: "2in",
        borderColor: `${dragon.color}33`,
        background:
          "linear-gradient(135deg, rgba(232, 223, 204, 0.99), rgba(210, 196, 169, 0.98))",
        boxShadow: "0 18px 50px rgba(0,0,0,0.35)",
      }}
    >
      <div className="grid h-full grid-cols-[1fr_1fr]">
        <div
          className="relative flex flex-col justify-between overflow-hidden border-r border-black/10"
          style={{
            padding: "0.1in",
            background: `radial-gradient(circle at 20% 18%, ${dragon.color}22 0%, transparent 28%), radial-gradient(circle at 76% 82%, ${dragon.glowColor} 0%, transparent 34%)`,
          }}
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <p
                className="uppercase tracking-[0.18em] text-[#6b563d]"
                style={{ fontSize: "5pt" }}
              >
                Where Dragons Dwell
              </p>
              <h2
                className="mt-[0.04in] uppercase leading-none tracking-[0.08em] text-[#2f2417]"
                style={{ fontSize: "13pt" }}
              >
                {dragon.name}
              </h2>
              <p
                className="mt-[0.04in] uppercase tracking-[0.18em] text-[#5c4a33]"
                style={{ fontSize: "5.5pt" }}
              >
                {dragon.tradition}
              </p>
            </div>
            <span
              className="rounded-sm border border-black/10 text-[#7a6549]"
              style={{
                padding: "0.02in 0.04in",
                fontSize: "4.5pt",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              Atlas card
            </span>
          </div>

          <div
            className="relative mx-auto my-[0.02in] w-full"
            style={{
              height: "0.82in",
              maxWidth: "1.35in",
            }}
          >
            <div
              className="absolute inset-[0.06in] rounded-full"
              style={{
                background: `radial-gradient(circle, ${dragon.glowColor} 0%, transparent 68%)`,
                filter: "blur(10px)",
              }}
            />
            {/* Using img keeps the visible preview and print output aligned across browsers */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={dragon.image}
              alt={`${dragon.name} museum card artwork`}
              className="relative z-[1] h-full w-full object-contain"
            />
          </div>

          <div className="grid grid-cols-2 gap-[0.06in] text-[#4b3826]">
            <div>
              <p
                className="uppercase tracking-[0.16em] text-[#7a6549]"
                style={{ fontSize: "4.5pt" }}
              >
                Region
              </p>
              <p className="mt-[0.02in] leading-[1.2]" style={{ fontSize: "5.5pt" }}>
                {dragon.region}
              </p>
            </div>
            <div>
              <p
                className="uppercase tracking-[0.16em] text-[#7a6549]"
                style={{ fontSize: "4.5pt" }}
              >
                Era
              </p>
              <p className="mt-[0.02in] leading-[1.2]" style={{ fontSize: "5.5pt" }}>
                {dragon.timelineRangeLabel}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between text-[#372a1d]" style={{ padding: "0.1in" }}>
          <div>
            <div className="flex items-center justify-between gap-[0.06in]">
              <p
                className="uppercase tracking-[0.18em] text-[#7a6549]"
                style={{ fontSize: "4.8pt" }}
              >
                Collection note
              </p>
              <p
                className="uppercase tracking-[0.16em] text-[#7a6549]"
                style={{ fontSize: "4.5pt" }}
              >
                Atlas card
              </p>
            </div>

            <p className="mt-[0.05in] leading-[1.25]" style={{ fontSize: "7pt" }}>
              {dragon.description}
            </p>

            <div className="mt-[0.06in] grid grid-cols-2 gap-[0.06in]">
              <div>
                <p
                  className="uppercase tracking-[0.16em] text-[#7a6549]"
                  style={{ fontSize: "4.5pt" }}
                >
                  Role
                </p>
                <p className="mt-[0.02in] leading-[1.2]" style={{ fontSize: "5.5pt" }}>
                  {dragon.role}
                </p>
              </div>
              <div>
                <p
                  className="uppercase tracking-[0.16em] text-[#7a6549]"
                  style={{ fontSize: "4.5pt" }}
                >
                  Keywords
                </p>
                <p className="mt-[0.02in] leading-[1.2]" style={{ fontSize: "5.5pt" }}>
                  {dragon.domains.slice(0, 3).join(" · ")}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-black/10 pt-[0.05in]">
            <p className="italic leading-[1.2] text-[#4a3826]" style={{ fontSize: "5pt" }}>
              {dragon.atmosphere}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ZoomableMuseumCard({ dragon }: ZoomableMuseumCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });
  const expandedRef = useRef(false);
  const isDesktopPreview = viewportSize.width >= 768;

  const expandedScale = useMemo(() => {
    if (!viewportSize.width || !viewportSize.height) {
      return 1;
    }

    const widthScale = (viewportSize.width - 48) / CARD_WIDTH_PX;
    const heightScale = (viewportSize.height - 112) / CARD_HEIGHT_PX;
    return Math.max(1, Math.min(widthScale, heightScale, 3));
  }, [viewportSize.height, viewportSize.width]);

  const expandedCardWidth = useMemo(
    () => `${Math.round(CARD_WIDTH_PX * expandedScale)}px`,
    [expandedScale],
  );

  useEffect(() => {
    if (!isExpanded) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsExpanded(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isExpanded]);

  useEffect(() => {
    expandedRef.current = isExpanded;
  }, [isExpanded]);

  useEffect(() => {
    const updateViewportSize = () => {
      const nextWidth = window.innerWidth;
      const nextHeight = window.innerHeight;

      setViewportSize({
        width: nextWidth,
        height: nextHeight,
      });

      if (nextWidth < 768 && expandedRef.current) {
        setIsExpanded(false);
      }
    };

    updateViewportSize();

    window.addEventListener("resize", updateViewportSize);
    window.addEventListener("orientationchange", updateViewportSize);

    return () => {
      window.removeEventListener("resize", updateViewportSize);
      window.removeEventListener("orientationchange", updateViewportSize);
    };
  }, []);

  useEffect(() => {
    const handleBeforePrint = () => {
      setIsExpanded(false);
    };

    window.addEventListener("beforeprint", handleBeforePrint);

    return () => {
      window.removeEventListener("beforeprint", handleBeforePrint);
    };
  }, []);

  return (
    <div className="card-preview-stage pb-2">
      <div className="screen-preview-only">
        <div className="card-preview-controls mb-3 flex items-center justify-between gap-3">
          <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500">
            Preview matches print layout
          </p>
          <div className="hidden items-center gap-2 md:flex">
            <div className="min-w-[4.5rem] text-center text-[10px] uppercase tracking-[0.18em] text-stone-400">
              Fixed preview
            </div>
            <button
              type="button"
              onClick={() => setIsExpanded(true)}
              className="rounded-sm border px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] transition-all duration-200 hover:-translate-y-px hover:bg-white/5 hover:text-stone-100 disabled:opacity-35"
              style={{
                color: "rgba(214, 193, 160, 0.88)",
                borderColor: "rgba(201, 168, 76, 0.16)",
                background: "rgba(255,255,255,0.02)",
              }}
              disabled={isExpanded || !isDesktopPreview}
            >
              Zoom In
            </button>
          </div>
        </div>

        <div className="card-preview-viewport flex justify-center overflow-hidden pb-2">
          <MuseumCard dragon={dragon} />
        </div>
      </div>

      <div className="print-card-only">
        <MuseumCard dragon={dragon} />
      </div>

      {typeof document !== "undefined" &&
        isExpanded &&
        createPortal(
          <div className="card-zoom-overlay fixed inset-0 z-[90] flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm">
            <button
              type="button"
              aria-label="Close enlarged card preview"
              className="absolute inset-0"
              onClick={() => setIsExpanded(false)}
            />
            <div className="pointer-events-none fixed right-4 top-4 z-[2] md:right-6 md:top-6">
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="pointer-events-auto rounded-sm border px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] transition-all duration-200 hover:-translate-y-px hover:bg-white/5 hover:text-stone-100"
                style={{
                  color: "rgba(214, 193, 160, 0.92)",
                  borderColor: "rgba(201, 168, 76, 0.26)",
                  background: "rgba(8,7,5,0.42)",
                }}
              >
                Close
              </button>
            </div>
            <div className="relative z-[1] my-auto flex flex-col items-center gap-3">
              <div
                className="flex items-center justify-start"
                style={{ width: expandedCardWidth, maxWidth: "92vw" }}
              >
                <p className="text-[10px] uppercase tracking-[0.2em] text-stone-300">
                  Enlarged print preview
                </p>
              </div>
              <div
                className="origin-center"
                style={{
                  width: `${CARD_WIDTH_PX}px`,
                  height: `${CARD_HEIGHT_PX}px`,
                  transform: `scale(${expandedScale})`,
                  transformOrigin: "center center",
                }}
              >
                <MuseumCard dragon={dragon} />
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
