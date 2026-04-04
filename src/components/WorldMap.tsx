"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { DragonRegion, Locale, TimelinePeriod } from "@/data/dragons";
import DragonSilhouette from "./DragonSilhouette";

interface WorldMapProps {
  regions: DragonRegion[];
  locale: Locale;
  activeRegion: string | null;
  hoveredRegion: string | null;
  activeTimeline: TimelinePeriod | "all";
  onRegionHover: (id: string | null) => void;
  onRegionClick: (id: string) => void;
}

export default function WorldMap({
  regions,
  locale,
  activeRegion,
  hoveredRegion,
  activeTimeline,
  onRegionHover,
  onRegionClick,
}: WorldMapProps) {
  const visibleRegions = regions.filter(
    (region) => hoveredRegion === region.id || activeRegion === region.id,
  );

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {/* Antique map background image */}
      <div className="world-map-frame relative h-full w-full max-w-[1480px] max-h-[940px] scale-[1.05] md:scale-100">
        <Image
          src="/map.webp"
          alt="Ancient world map"
          fill
          priority
          quality={70}
          sizes="(max-width: 768px) 100vw, (max-width: 1400px) 92vw, 1400px"
          className="w-full h-full object-contain"
          style={{
            filter: "brightness(0.45) sepia(0.3) saturate(0.7)",
            mixBlendMode: "lighten",
          }}
          draggable={false}
        />

        {/* Dark overlay to deepen atmosphere */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 20%, rgba(8,7,5,0.6) 100%)",
          }}
        />

        {/* SVG overlay for hotspots and dragons */}
        <svg
          viewBox="0 0 100 62.5"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid meet"
          style={{ touchAction: "manipulation" }}
        >
          <defs>
            {/* Radial glow for hotspots */}
            {regions.map((r) => (
              <radialGradient
                key={`grad-${r.id}`}
                id={`hotspot-${r.id}`}
                cx="50%"
                cy="50%"
                r="50%"
              >
                <stop offset="0%" stopColor={r.color} stopOpacity="0.68" />
                <stop offset="55%" stopColor={r.color} stopOpacity="0.22" />
                <stop offset="100%" stopColor={r.color} stopOpacity="0" />
              </radialGradient>
            ))}
            <filter id="label-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow
                dx="0"
                dy="0.25"
                stdDeviation="0.45"
                floodColor="rgba(8,7,5,0.9)"
              />
            </filter>
          </defs>

          {/* Region hotspots */}
          {regions.map((region) => {
            const isHovered = hoveredRegion === region.id;
            const isActive = activeRegion === region.id;
            const isHighlighted = isHovered || isActive;
            const matchesTimeline =
              activeTimeline === "all" || region.timelinePeriod === activeTimeline;
            const idleOpacity = matchesTimeline ? 0.5 : 0.16;
            const ringOpacity = matchesTimeline ? 0.34 : 0.12;
            const labelOpacity = matchesTimeline ? 0.7 : 0.2;
            const dotOpacity = matchesTimeline ? 0.82 : 0.28;

            return (
              <g key={region.id}>
                {/* Glow area */}
                <motion.circle
                  cx={region.mapPosition.x}
                  cy={region.mapPosition.y}
                  r="5"
                  fill={`url(#hotspot-${region.id})`}
                  initial={false}
                  style={{ opacity: isHighlighted ? 1 : idleOpacity }}
                  animate={{
                    r: isHighlighted ? 7.5 : 5.4,
                  }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />

                {/* Pulse ring */}
                <motion.circle
                  cx={region.mapPosition.x}
                  cy={region.mapPosition.y}
                  r="2"
                  fill="none"
                  stroke={region.color}
                  strokeWidth="0.14"
                  style={{ opacity: isHighlighted ? 0.72 : ringOpacity }}
                  animate={{
                    r: isHighlighted ? [2.2, 6.4, 2.2] : [1.9, 4.1, 1.9],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Center dot */}
                <motion.circle
                  cx={region.mapPosition.x}
                  cy={region.mapPosition.y}
                  r="0.62"
                  fill={region.color}
                  initial={false}
                  style={{ opacity: isHighlighted ? 1 : dotOpacity }}
                  animate={{
                    r: isHighlighted ? 0.95 : 0.56,
                  }}
                  transition={{ duration: 0.4 }}
                />

                {/* Region label */}
                <text
                  x={region.mapPosition.x}
                  y={region.mapPosition.y + 3.5}
                  textAnchor="middle"
                  fill={region.color}
                  fontSize="1.7"
                  fontFamily="'Cormorant Garamond', serif"
                  letterSpacing="0.08"
                  style={{
                    opacity: isHighlighted ? 0.98 : labelOpacity,
                    filter: "drop-shadow(0 1px 2px rgba(8,7,5,0.9))",
                    transition: "opacity 0.5s ease",
                  }}
                >
                  {locale === "zh" ? region.nameZh : region.name}
                </text>

                {/* Invisible hit area */}
                <circle
                  cx={region.mapPosition.x}
                  cy={region.mapPosition.y}
                  r="7"
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => onRegionHover(region.id)}
                  onMouseLeave={() => onRegionHover(null)}
                  onClick={() => onRegionClick(region.id)}
                />

              </g>
            );
          })}
        </svg>

        {/* Dragon image overlays (HTML layer on top of SVG) */}
        {visibleRegions.map((region) => {
          const isHovered = hoveredRegion === region.id;
          const isActive = activeRegion === region.id;
          const isHighlighted = isHovered || isActive;

          return (
            <DragonSilhouette
              key={`dragon-${region.id}`}
              dragon={region}
              isActive={isHighlighted}
            />
          );
        })}
      </div>
    </div>
  );
}
