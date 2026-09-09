"use client";

import { CareCard } from "@/components/cards/CareCard";
import { CareDetailModal, type CareDetailItem } from "@/components/cards/CareDetailModal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { useHashSelection } from "@/lib/useHashSelection";
import type { Locale } from "@/lib/i18n";
import type { CareCardData } from "@/components/cards/CareCard";
import { cn } from "@/lib/utils";

interface CareGridItem {
  id: string;
  slug: string;
  card: CareCardData;
  detail: CareDetailItem;
}

interface CareGridProps {
  items: CareGridItem[];
  locale: Locale;
  /** `#{hashPrefix}-{slug}` deep-links open that item's modal on load. */
  hashPrefix: string;
  tilt?: boolean;
  columns?: 2 | 3 | 4;
  className?: string;
}

const colClass = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export function CareGrid({ items, locale, hashPrefix, tilt = false, columns = 4, className }: CareGridProps) {
  const { selected, select, close } = useHashSelection(hashPrefix, items);

  return (
    <>
      <Stagger className={cn("grid grid-cols-1 gap-6", colClass[columns], className)}>
        {items.map((item) => (
          <StaggerItem
            key={item.id}
            id={`${hashPrefix}-${item.slug}`}
            className="h-full scroll-mt-28"
          >
            <CareCard data={item.card} locale={locale} onSelect={() => select(item)} tilt={tilt} />
          </StaggerItem>
        ))}
      </Stagger>

      <CareDetailModal item={selected?.detail ?? null} open={selected !== null} onClose={close} locale={locale} />
    </>
  );
}
