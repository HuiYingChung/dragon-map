"use client";

import { useEffect } from "react";

type NativeCursorModeProps = {
  active?: boolean;
};

export default function NativeCursorMode({
  active = true,
}: NativeCursorModeProps) {
  useEffect(() => {
    if (!active || typeof document === "undefined") {
      return;
    }

    document.body.classList.add("native-cursor-page");

    return () => {
      document.body.classList.remove("native-cursor-page");
    };
  }, [active]);

  return null;
}
