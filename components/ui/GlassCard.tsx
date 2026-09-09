import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  as?: ElementType;
  /** Heavier glass — hero / CTA / modal centrepieces. */
  strong?: boolean;
  /** Lift + edge glow on hover. Turn off for static surfaces. */
  hover?: boolean;
  /** Top inner-highlight "reflection". */
  sheen?: boolean;
  children: ReactNode;
  className?: string;
}

/**
 * The site's signature liquid-glass surface. Every card, panel and floating
 * element is built from this so the glass language stays identical.
 */
export function GlassCard({
  as: Tag = "div",
  strong = false,
  hover = true,
  sheen = true,
  className,
  children,
  ...rest
}: GlassCardProps) {
  return (
    <Tag
      className={cn(
        strong ? "glass-card-strong" : "glass-card",
        hover && "glass-card-hover",
        sheen && "glass-sheen overflow-hidden",
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
