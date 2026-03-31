"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  driftX: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

function createParticles(): Particle[] {
  return Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    driftX: Math.random() * 20 - 10,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.15 + 0.03,
  }));
}

export default function AmbientEffects() {
  const [particles] = useState<Particle[]>(createParticles);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Fog layers */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 30% 40%, rgba(80,70,50,0.08) 0%, transparent 70%)",
        }}
        initial={{ opacity: 0.3 }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 70% 60%, rgba(60,80,70,0.06) 0%, transparent 70%)",
        }}
        initial={{ opacity: 0.2 }}
        animate={{
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: "rgba(201, 168, 76, 0.4)",
          }}
          initial={{ opacity: 0 }}
          animate={{
            y: [0, -30, 0],
            x: [0, p.driftX, 0],
            opacity: [0, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, rgba(5,4,3,0.7) 100%)",
        }}
      />
    </div>
  );
}
