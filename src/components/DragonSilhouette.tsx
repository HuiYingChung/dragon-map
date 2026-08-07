"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { DragonRegion } from "@/data/dragons";

interface DragonSilhouetteProps {
  dragon: DragonRegion;
  isActive: boolean;
}

export default function DragonSilhouette({
  dragon,
  isActive,
}: DragonSilhouetteProps) {
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
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{
          opacity: isActive ? 0.9 : 0,
          scale: isActive ? 1 : 0.85,
          y: isActive ? [0, -8, 0, 6, 0] : 0,
          rotate: isActive ? [0, -0.8, 0, 0.8, 0] : 0,
        }}
        transition={{
          opacity: { duration: 1.2, ease: "easeInOut" },
          scale: { duration: 1.2, ease: "easeInOut" },
          y: {
            duration: 7.5,
            repeat: Infinity,
            ease: "easeInOut",
          },
          rotate: {
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        {/* Glow behind dragon */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            transform: "scale(1.5)",
            background: `radial-gradient(circle, ${dragon.glowColor} 0%, transparent 65%)`,
            filter: "blur(10px)",
          }}
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
    </div>
  );
}
