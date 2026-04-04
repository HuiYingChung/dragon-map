"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface CursorState {
  x: number;
  y: number;
  visible: boolean;
  interactive: boolean;
}

export default function CursorAura() {
  const [cursor, setCursor] = useState<CursorState>({
    x: 0,
    y: 0,
    visible: false,
    interactive: false,
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine) and (min-width: 1024px)");
    if (!mediaQuery.matches) {
      return;
    }

    const isInteractiveTarget = (target: EventTarget | null) => {
      if (!(target instanceof Element)) {
        return false;
      }

      return Boolean(
        target.closest(
          "button, a, input, textarea, select, [role='button'], .cursor-pointer"
        )
      );
    };

    const handleMove = (event: MouseEvent) => {
      setCursor({
        x: event.clientX,
        y: event.clientY,
        visible: true,
        interactive: isInteractiveTarget(event.target),
      });
    };

    const handleLeave = () => {
      setCursor((prev) => ({ ...prev, visible: false, interactive: false }));
    };

    const handleEnter = () => {
      setCursor((prev) => ({ ...prev, visible: true }));
    };

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, []);

  return (
    <motion.div
      aria-hidden="true"
      className="cursor-aura pointer-events-none fixed top-0 left-0 z-[120] hidden lg:block"
      animate={{
        x: cursor.x,
        y: cursor.y,
        opacity: cursor.visible ? 1 : 0,
        scale: cursor.interactive ? 1.18 : 1,
      }}
      transition={{
        x: { type: "spring", stiffness: 520, damping: 38, mass: 0.35 },
        y: { type: "spring", stiffness: 520, damping: 38, mass: 0.35 },
        opacity: { duration: 0.18 },
        scale: { duration: 0.2 },
      }}
      style={{ marginLeft: -14, marginTop: -14 }}
    >
      <div
        className="relative h-7 w-7 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(214, 186, 106, 0.95) 0%, rgba(214, 186, 106, 0.22) 26%, rgba(214, 186, 106, 0.08) 52%, transparent 72%)",
          boxShadow: cursor.interactive
            ? "0 0 18px rgba(214, 186, 106, 0.28)"
            : "0 0 12px rgba(214, 186, 106, 0.18)",
        }}
      >
        <div
          className="absolute top-1/2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: "rgba(245, 224, 172, 0.9)",
            boxShadow: "0 0 8px rgba(245, 224, 172, 0.45)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 h-5.5 w-5.5 -translate-x-1/2 -translate-y-1/2 rounded-full border"
          style={{
            borderColor: cursor.interactive
              ? "rgba(214, 186, 106, 0.55)"
              : "rgba(214, 186, 106, 0.24)",
          }}
        />
      </div>
    </motion.div>
  );
}
