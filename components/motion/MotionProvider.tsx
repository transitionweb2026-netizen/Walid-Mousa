"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_PREMIUM } from "@/lib/motion";

/**
 * Global animation defaults. `reducedMotion="user"` makes every Framer
 * Motion animation respect `prefers-reduced-motion` with no per-component
 * checks.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.6, ease: EASE_PREMIUM }}>
      {children}
    </MotionConfig>
  );
}
