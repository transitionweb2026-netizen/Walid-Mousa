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

/** Consistent heading + description block for every section. */
export function SectionHeader({
  title,
  description,
  locale,
  align = "center",
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
      <TitleTag
        id={headingId}
        className="text-3xl font-extrabold text-balance text-brand-ink sm:text-4xl lg:text-[2.6rem] lg:leading-[1.15]"
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
