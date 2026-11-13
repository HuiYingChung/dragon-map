"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { DragonRegion } from "@/data/dragons";

interface DragonSilhouetteProps {
  dragon: DragonRegion;
  isActive: boolean;
}

type Keyframes = number[];

interface FloatProfile {
  x?: Keyframes;
  y?: Keyframes;
  rotate?: Keyframes;
  scale?: Keyframes;
  /** Seconds per loop for each animated property. */
  duration: { x?: number; y?: number; rotate?: number; scale?: number };
  /** Opacity keyframes for the glow behind the dragon. */
  glow?: Keyframes;
  glowDuration?: number;
}

// One motion dialect per creature archetype. Transform and opacity only, so
// every loop stays on the compositor.
const FLOAT_PROFILES: Record<DragonRegion["dragonStyle"], FloatProfile> = {
  // Unhurried drift of a cloud-riding dragon.
  flowing: {
    y: [0, -8, 0, 6, 0],
    rotate: [0, -0.8, 0, 0.8, 0],
    duration: { y: 7.5, rotate: 9 },
  },
  // Side-to-side sway of a body moving through water.
  serpent: {
    x: [0, 6, 0, -6, 0],
    y: [0, -3, 0, 3, 0],
    rotate: [0, 1, 0, -1, 0],
    duration: { x: 8, y: 11, rotate: 8 },
  },
  // Slow tightening and loosening of coils.
  coiling: {
    y: [0, -4, 0, 3, 0],
    rotate: [0, -2.5, 0, 2.5, 0],
    scale: [1, 1.015, 1],
    duration: { y: 9, rotate: 10, scale: 10 },
  },
  // Wingbeat: a quick lift and a slower settle.
  winged: {
    y: [0, -12, -2, -10, 0],
    scale: [1, 1.02, 1, 1.015, 1],
    rotate: [0, -0.6, 0, 0.6, 0],
    duration: { y: 5, scale: 5, rotate: 7 },
  },
  // Lighter and more buoyant than a wingbeat, like a plumed glide.
  feathered: {
    y: [0, -12, 0, 8, 0],
    x: [0, 3, 0, -3, 0],
    scale: [1, 1.02, 1],
    duration: { y: 5.5, x: 9, scale: 5.5 },
  },
  // Restless, with a flickering charge in the glow.
  storm: {
    x: [0, -3, 2, -2, 0],
    y: [0, -6, 2, -4, 0],
    rotate: [0, -1.2, 0.6, -0.6, 0],
    duration: { x: 3.8, y: 3.8, rotate: 4.6 },
    glow: [1, 0.55, 1, 0.7, 0.4, 1],
    glowDuration: 3.2,
  },
  // Almost still: a slow breath at world scale.
  cosmic: {
    scale: [1, 1.03, 1],
    rotate: [0, 0.4, 0, -0.4, 0],
    duration: { scale: 12, rotate: 18 },
    glow: [1, 0.75, 1],
    glowDuration: 12,
  },
};

const loop = (duration: number | undefined) => ({
  duration: duration ?? 8,
  repeat: Infinity,
  ease: "easeInOut" as const,
});

export default function DragonSilhouette({
  dragon,
  isActive,
}: DragonSilhouetteProps) {
  const prefersReducedMotion = useReducedMotion();
  const shouldFloat = isActive && !prefersReducedMotion;
  const fadeDuration = prefersReducedMotion ? 0.2 : 1.2;
  const profile = FLOAT_PROFILES[dragon.dragonStyle];

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${dragon.mapPosition.x}%`,
        top: `${(dragon.mapPosition.y / 62.5) * 100}%`,
        transform: "translate(-50%, -50%)",
        width: "18%",
        maxWidth: "220px",
      }}
    >
      {/* Reveal and dissolve */}
      <motion.div
        initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.85 }}
        animate={{
          opacity: isActive ? 0.9 : 0,
          scale: isActive || prefersReducedMotion ? 1 : 0.85,
        }}
        exit={{
          opacity: 0,
          scale: prefersReducedMotion ? 1 : 0.94,
          transition: {
            duration: prefersReducedMotion ? 0.2 : 0.7,
            ease: "easeInOut",
          },
        }}
        transition={{ duration: fadeDuration, ease: "easeInOut" }}
      >
        {/* Archetype float loop */}
        <motion.div
          animate={
            shouldFloat
              ? {
                  x: profile.x ?? 0,
                  y: profile.y ?? 0,
                  rotate: profile.rotate ?? 0,
                  scale: profile.scale ?? 1,
                }
              : { x: 0, y: 0, rotate: 0, scale: 1 }
          }
          transition={{
            x: loop(profile.duration.x),
            y: loop(profile.duration.y),
            rotate: loop(profile.duration.rotate),
            scale: loop(profile.duration.scale),
          }}
        >
          {/* Glow behind dragon */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              scale: 1.5,
              background: `radial-gradient(circle, ${dragon.glowColor} 0%, transparent 65%)`,
              filter: "blur(10px)",
            }}
            animate={{
              opacity: shouldFloat && profile.glow ? profile.glow : 1,
            }}
            transition={loop(profile.glowDuration)}
          />
          {/* Dragon image */}
          <Image
            src={dragon.image}
            alt={dragon.name}
            width={440}
            height={440}
            loading="lazy"
            quality={65}
            sizes="(max-width: 768px) 28vw, (max-width: 1200px) 18vw, 220px"
            className="relative w-full h-auto"
            style={{
              filter: `brightness(1.1) drop-shadow(0 0 12px ${dragon.color}88)`,
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
