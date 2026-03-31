"use client";

import { motion } from "framer-motion";
import type { Locale } from "@/data/dragons";

interface MarginaliaProps {
  dimmed?: boolean;
  locale: Locale;
}

export default function Marginalia({
  dimmed = false,
  locale,
}: MarginaliaProps) {
  return (
    <motion.div
      className="fixed z-40 pointer-events-none rounded-sm px-3 py-2
        left-4 top-[4.5rem] w-[min(calc(100%-2rem),260px)]
        md:left-6 md:top-auto md:bottom-[15%] md:w-[240px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: dimmed ? 0.15 : 1 }}
      transition={{ duration: 0.8 }}
      style={{
        background:
          "linear-gradient(90deg, rgba(8, 7, 5, 0.72), rgba(8, 7, 5, 0.2) 78%, transparent)",
        backdropFilter: "blur(1.5px)",
      }}
    >
      <div
        className="h-[1px] w-16 mb-4"
        style={{
          background:
            "linear-gradient(90deg, rgba(201, 168, 76, 0.25), transparent)",
        }}
      />

      <p
        className="text-[12px] md:text-[14px] leading-[1.7] font-medium italic"
        style={{ color: "rgba(214, 193, 160, 0.88)" }}
      >
        {locale === "zh"
          ? "此處所標示的並非怪物，而是記憶。"
          : "Here be not monsters, but memory."}
      </p>
      <p
        className="text-[12px] md:text-[14px] leading-[1.7] font-medium italic mt-1"
        style={{ color: "rgba(204, 184, 152, 0.8)" }}
      >
        {locale === "zh"
          ? "是不同民族賦予風暴、河流、火焰與天空的形貌。"
          : "The shapes that different peoples gave to storm, river, fire, and sky."}
      </p>

      <div
        className="h-[1px] w-10 mt-4"
        style={{
          background:
            "linear-gradient(90deg, rgba(201, 168, 76, 0.15), transparent)",
        }}
      />

      <p
        className="text-[10px] tracking-[0.18em] uppercase mt-3 font-medium"
        style={{ color: "rgba(181, 158, 118, 0.66)" }}
      >
        {locale === "zh" ? "眾多傳統 · 同一世界" : "Many traditions · One world"}
      </p>
    </motion.div>
  );
}
