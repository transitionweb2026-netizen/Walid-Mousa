"use client";

import Image from "next/image";
import { IconBadge } from "@/components/ui/IconBadge";
import { Icon, type IconName } from "@/components/icons/Icon";
import { TiltCard } from "@/components/motion/TiltCard";
import type { Locale } from "@/lib/i18n";
import type { Localized, MediaImage } from "@/lib/types";
import { siteContent } from "@/data/site";
import { cn } from "@/lib/utils";

export interface CareCardData {
  icon: IconName;
  image: MediaImage;
  title: Localized;
  description: Localized;
  kicker?: Localized;
}

interface CareCardProps {
  data: CareCardData;
  locale: Locale;
  onSelect?: () => void;
  /** Pointer-driven 3D tilt (used on the Home surgeries grid + CTA). */
  tilt?: boolean;
  className?: string;
}

/**
 * The one card design shared by Surgeries, Treatments and Technologies —
 * liquid glass, raised 3D border, inner sheen, teal/pink accents.
 */
export function CareCard({ data, locale, onSelect, tilt = false, className }: CareCardProps) {
  const card = (
    <article className="glass-card glass-card-hover glass-sheen group/card relative flex h-full flex-col overflow-hidden rounded-3xl">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={data.image.src}
          alt={data.image.alt[locale]}
          fill
          sizes="(min-width:1024px) 22rem, (min-width:640px) 45vw, 90vw"
          className="object-cover transition-transform duration-700 group-hover/card:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/55 via-brand-ink/5 to-transparent" />
        <div className="absolute -bottom-5 start-5">
          <IconBadge icon={data.icon} size="md" />
        </div>
        {data.kicker && (
          <span className="absolute end-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-brand-pink-deep backdrop-blur">
            {data.kicker[locale]}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6 pt-8">
        <h3 className="text-lg font-bold leading-snug text-brand-ink">{data.title[locale]}</h3>
        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-brand-muted">{data.description[locale]}</p>
        {onSelect && (
          <button
            type="button"
            onClick={onSelect}
            className="mt-5 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-brand-teal-deep transition-colors hover:text-brand-pink-deep"
          >
            {siteContent.actions.viewDetails[locale]}
            <Icon name="arrow" className="h-4 w-4 rtl:rotate-180" />
          </button>
        )}
      </div>
    </article>
  );

  if (tilt) {
    return <TiltCard className={cn("h-full", className)}>{card}</TiltCard>;
  }
  return <div className={cn("h-full", className)}>{card}</div>;
}
