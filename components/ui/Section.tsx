import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tint = "plain" | "teal" | "pink" | "neutral" | "duo";

const tintClass: Record<Tint, string> = {
  plain: "",
  teal: "section-wash-teal",
  pink: "section-wash-pink",
  neutral: "section-wash-neutral",
  duo: "section-wash-duo",
};

interface SectionProps {
  children: ReactNode;
  /** Background treatment from the design system. */
  tint?: Tint;
  /** Decorative blurred colour blobs behind the content. */
  glow?: "none" | "teal" | "pink" | "both";
  id?: string;
  className?: string;
  /** Removes the default max-width container (for full-bleed inner layouts). */
  bare?: boolean;
  "aria-labelledby"?: string;
  "aria-label"?: string;
}

/**
 * Every page section is wrapped in this — one place that owns vertical
 * rhythm, the tinted-background system and anchor scroll offset.
 */
export function Section({
  children,
  tint = "plain",
  glow = "none",
  id,
  className,
  bare = false,
  ...aria
}: SectionProps) {
  return (
    <section
      id={id}
      {...aria}
      className={cn(
        "relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-8",
        id && "scroll-mt-24",
        tintClass[tint],
        className
      )}
    >
      {(glow === "teal" || glow === "both") && (
        <span
          aria-hidden="true"
          className="glow-teal animate-float-slower pointer-events-none absolute -top-24 -start-24 h-72 w-72 rounded-full opacity-60"
        />
      )}
      {(glow === "pink" || glow === "both") && (
        <span
          aria-hidden="true"
          className="glow-pink animate-float-slow pointer-events-none absolute -bottom-28 -end-20 h-80 w-80 rounded-full opacity-50 [animation-delay:-4s]"
        />
      )}
      <div className={cn("relative", !bare && "mx-auto max-w-7xl")}>{children}</div>
    </section>
  );
}
