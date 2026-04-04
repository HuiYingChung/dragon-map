"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { DragonRegion } from "@/data/dragons";

type ZoomableMuseumCardProps = {
  dragon: DragonRegion;
};

type CardVariant = "preview" | "expanded";

function MuseumCard({
  dragon,
  variant,
}: {
  dragon: DragonRegion;
  variant: CardVariant;
}) {
  const isExpanded = variant === "expanded";

  return (
    <section
      className="museum-postcard business-card print-card-surface overflow-hidden rounded-sm border"
      style={{
        width: isExpanded ? "min(92vw, 960px)" : "3.5in",
        height: isExpanded ? "auto" : "2in",
        aspectRatio: "7 / 4",
        borderColor: `${dragon.color}33`,
        background:
          "linear-gradient(135deg, rgba(232, 223, 204, 0.99), rgba(210, 196, 169, 0.98))",
        boxShadow: isExpanded
          ? "0 30px 80px rgba(0,0,0,0.55)"
          : "0 18px 50px rgba(0,0,0,0.35)",
      }}
    >
      <div className="grid h-full grid-cols-[1fr_1fr]">
        <div
          className="relative flex flex-col justify-between overflow-hidden border-r border-black/10"
          style={{
            padding: isExpanded ? "min(2.8vw, 1.15rem)" : "0.1in",
            background: `radial-gradient(circle at 20% 18%, ${dragon.color}22 0%, transparent 28%), radial-gradient(circle at 76% 82%, ${dragon.glowColor} 0%, transparent 34%)`,
          }}
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <p
                className="uppercase tracking-[0.18em] text-[#6b563d]"
                style={{ fontSize: isExpanded ? "clamp(10px, 1vw, 14px)" : "5pt" }}
              >
                Where Dragons Dwell
              </p>
              <h2
                className="mt-[0.04in] uppercase leading-none tracking-[0.08em] text-[#2f2417]"
                style={{ fontSize: isExpanded ? "clamp(24px, 3vw, 44px)" : "13pt" }}
              >
                {dragon.name}
              </h2>
              <p
                className="mt-[0.04in] uppercase tracking-[0.18em] text-[#5c4a33]"
                style={{ fontSize: isExpanded ? "clamp(11px, 1.1vw, 16px)" : "5.5pt" }}
              >
                {dragon.tradition}
              </p>
            </div>
            <span
              className="rounded-sm border border-black/10 text-[#7a6549]"
              style={{
                padding: isExpanded
                  ? "clamp(4px, 0.45vw, 8px) clamp(8px, 0.75vw, 12px)"
                  : "0.02in 0.04in",
                fontSize: isExpanded ? "clamp(9px, 0.9vw, 13px)" : "4.5pt",
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
              height: isExpanded ? "clamp(150px, 23vw, 320px)" : "0.82in",
              maxWidth: isExpanded ? "min(78%, 360px)" : "1.35in",
            }}
          >
            <div
              className="absolute inset-[0.06in] rounded-full"
              style={{
                background: `radial-gradient(circle, ${dragon.glowColor} 0%, transparent 68%)`,
                filter: isExpanded ? "blur(24px)" : "blur(10px)",
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
                style={{ fontSize: isExpanded ? "clamp(9px, 0.9vw, 13px)" : "4.5pt" }}
              >
                Region
              </p>
              <p
                className="mt-[0.02in] leading-[1.2]"
                style={{ fontSize: isExpanded ? "clamp(11px, 1vw, 15px)" : "5.5pt" }}
              >
                {dragon.region}
              </p>
            </div>
            <div>
              <p
                className="uppercase tracking-[0.16em] text-[#7a6549]"
                style={{ fontSize: isExpanded ? "clamp(9px, 0.9vw, 13px)" : "4.5pt" }}
              >
                Era
              </p>
              <p
                className="mt-[0.02in] leading-[1.2]"
                style={{ fontSize: isExpanded ? "clamp(11px, 1vw, 15px)" : "5.5pt" }}
              >
                {dragon.timelineRangeLabel}
              </p>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col justify-between text-[#372a1d]"
          style={{ padding: isExpanded ? "min(2.8vw, 1.15rem)" : "0.1in" }}
        >
          <div>
            <div className="flex items-center justify-between gap-[0.06in]">
              <p
                className="uppercase tracking-[0.18em] text-[#7a6549]"
                style={{ fontSize: isExpanded ? "clamp(9px, 0.95vw, 14px)" : "4.8pt" }}
              >
                Collection note
              </p>
              <p
                className="uppercase tracking-[0.16em] text-[#7a6549]"
                style={{ fontSize: isExpanded ? "clamp(9px, 0.9vw, 13px)" : "4.5pt" }}
              >
                Atlas card
              </p>
            </div>

            <p
              className="mt-[0.05in] leading-[1.25]"
              style={{ fontSize: isExpanded ? "clamp(13px, 1.35vw, 20px)" : "7pt" }}
            >
              {dragon.description}
            </p>

            <div className="mt-[0.06in] grid grid-cols-2 gap-[0.06in]">
              <div>
                <p
                  className="uppercase tracking-[0.16em] text-[#7a6549]"
                  style={{ fontSize: isExpanded ? "clamp(9px, 0.9vw, 13px)" : "4.5pt" }}
                >
                  Role
                </p>
                <p
                  className="mt-[0.02in] leading-[1.2]"
                  style={{ fontSize: isExpanded ? "clamp(11px, 1vw, 15px)" : "5.5pt" }}
                >
                  {dragon.role}
                </p>
              </div>
              <div>
                <p
                  className="uppercase tracking-[0.16em] text-[#7a6549]"
                  style={{ fontSize: isExpanded ? "clamp(9px, 0.9vw, 13px)" : "4.5pt" }}
                >
                  Keywords
                </p>
                <p
                  className="mt-[0.02in] leading-[1.2]"
                  style={{ fontSize: isExpanded ? "clamp(11px, 1vw, 15px)" : "5.5pt" }}
                >
                  {dragon.domains.slice(0, 3).join(" · ")}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-black/10 pt-[0.05in]">
            <p
              className="italic leading-[1.2] text-[#4a3826]"
              style={{ fontSize: isExpanded ? "clamp(10px, 1vw, 15px)" : "5pt" }}
            >
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
              disabled={isExpanded}
            >
              Zoom In
            </button>
          </div>
        </div>

        <div className="card-preview-viewport flex justify-center overflow-hidden pb-2">
          <MuseumCard dragon={dragon} variant="preview" />
        </div>
      </div>

      <div className="print-card-only">
        <MuseumCard dragon={dragon} variant="preview" />
      </div>

      {typeof document !== "undefined" &&
        isExpanded &&
        createPortal(
          <div className="card-zoom-overlay fixed inset-0 z-[90] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
            <button
              type="button"
              aria-label="Close enlarged card preview"
              className="absolute inset-0"
              onClick={() => setIsExpanded(false)}
            />
            <div className="relative z-[1] flex w-full max-w-[1100px] flex-col items-center gap-3">
              <div className="flex w-full items-center justify-between gap-3">
                <p className="text-[10px] uppercase tracking-[0.2em] text-stone-300">
                  Enlarged print preview
                </p>
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="rounded-sm border px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] transition-all duration-200 hover:-translate-y-px hover:bg-white/5 hover:text-stone-100"
                  style={{
                    color: "rgba(214, 193, 160, 0.88)",
                    borderColor: "rgba(201, 168, 76, 0.16)",
                    background: "rgba(255,255,255,0.02)",
                  }}
                >
                  Close
                </button>
              </div>
              <MuseumCard dragon={dragon} variant="expanded" />
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
