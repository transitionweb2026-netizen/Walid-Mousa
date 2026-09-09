"use client";

import { useSyncExternalStore } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import type { PointerEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees. */
  max?: number;
  /** Strength of the moving light reflection (0–1). */
  glare?: number;
}

/* The tilt turns on only for a fine pointer with motion allowed. Resolved
   with useSyncExternalStore so server + first client render always agree
   (plain container) — no hydration mismatch, no setState-in-effect. */
const FINE = "(pointer: fine)";
const REDUCE = "(prefers-reduced-motion: reduce)";

function subscribe(cb: () => void) {
  const a = window.matchMedia(FINE);
  const b = window.matchMedia(REDUCE);
  a.addEventListener("change", cb);
  b.addEventListener("change", cb);
  return () => {
    a.removeEventListener("change", cb);
    b.removeEventListener("change", cb);
  };
}
const getSnapshot = () =>
  window.matchMedia(FINE).matches && !window.matchMedia(REDUCE).matches;
const getServerSnapshot = () => false;

/**
 * A glass surface that responds to the pointer with a subtle 3D tilt and a
 * moving light reflection.
 */
export function TiltCard({ children, className, max = 6, glare = 0.28 }: TiltCardProps) {
  const enabled = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 150, damping: 18 });
  const glareX = useTransform(px, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(py, [0, 1], ["0%", "100%"]);
  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,${glare}), transparent 55%)`;

  function handleMove(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "touch") return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }
  function reset() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.div
      onPointerMove={enabled ? handleMove : undefined}
      onPointerLeave={enabled ? reset : undefined}
      style={enabled ? { rotateX, rotateY, transformPerspective: 1000 } : undefined}
      className={cn("relative", enabled && "group/tilt [transform-style:preserve-3d]", className)}
    >
      {children}
      {enabled && (
        <motion.span
          aria-hidden="true"
          style={{ background: glareBg }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
        />
      )}
    </motion.div>
  );
}
