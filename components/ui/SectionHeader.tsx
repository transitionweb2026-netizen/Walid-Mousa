import type { Locale } from "@/lib/i18n";
import type { Localized } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";

interface SectionHeaderProps {
  eyebrow?: Localized;
  title: Localized;
  description?: Localized;
  locale: Locale;
  align?: "center" | "start";
  tone?: "teal" | "pink";
  className?: string;
  titleAs?: "h1" | "h2";
  headingId?: string;
}

/** Consistent eyebrow + heading + description block for every section. */
export function SectionHeader({
  eyebrow,
  title,
  description,
  locale,
  align = "center",
  tone = "teal",
  className,
  titleAs: TitleTag = "h2",
  headingId,
}: SectionHeaderProps) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-start",
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] shadow-glass",
            tone === "teal" ? "chip-teal" : "chip-pink"
          )}
        >
          <span className={cn("h-1.5 w-1.5 rounded-full", tone === "teal" ? "bg-brand-teal" : "bg-brand-pink")} />
          {eyebrow[locale]}
        </span>
      )}
      <TitleTag
        id={headingId}
        className="mt-5 text-3xl font-extrabold text-balance text-brand-ink sm:text-4xl lg:text-[2.6rem] lg:leading-[1.15]"
      >
        {title[locale]}
      </TitleTag>
      {description && (
        <p className="mt-4 text-pretty text-base leading-relaxed text-brand-muted sm:text-lg">
          {description[locale]}
        </p>
      )}
    </Reveal>
  );
}
