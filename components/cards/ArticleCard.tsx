"use client";

import { useState } from "react";
import Image from "next/image";
import { ArticleModal } from "@/components/cards/ArticleModal";
import { Icon } from "@/components/icons/Icon";
import { siteContent } from "@/data/site";
import { localeTag, type Locale } from "@/lib/i18n";
import { formatDate } from "@/lib/utils";
import type { ArticleItem } from "@/data/articles";
import { cn } from "@/lib/utils";

interface ArticleCardProps {
  article: ArticleItem;
  locale: Locale;
  layout?: "row" | "stacked";
  className?: string;
}

export function ArticleCard({ article, locale, layout = "stacked", className }: ArticleCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "glass-card glass-card-hover glass-sheen group flex w-full overflow-hidden rounded-3xl text-start outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal-strong",
          layout === "row" ? "flex-row items-stretch" : "flex-col",
          className
        )}
      >
        <span
          className={cn(
            "relative block shrink-0 overflow-hidden",
            layout === "row" ? "w-32 sm:w-40" : "aspect-[16/10] w-full"
          )}
        >
          <Image
            src={article.image.src}
            alt={article.image.alt[locale]}
            fill
            sizes={layout === "row" ? "10rem" : "(min-width:1024px) 24rem, 90vw"}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-brand-ink/40 to-transparent" />
        </span>

        <span className="flex flex-1 flex-col p-5">
          <span className="flex flex-wrap items-center gap-2 text-[0.7rem] font-medium text-brand-muted">
            <span className="chip-teal rounded-full px-2.5 py-0.5 font-semibold">{article.category[locale]}</span>
            <span>{formatDate(article.date, localeTag[locale])}</span>
          </span>
          <span className="mt-2 block font-heading text-base font-bold leading-snug text-brand-ink group-hover:text-brand-teal-deep">
            {article.title[locale]}
          </span>
          <span className="mt-1.5 line-clamp-2 flex-1 text-sm leading-relaxed text-brand-muted">
            {article.excerpt[locale]}
          </span>
          <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-teal-deep">
            {siteContent.actions.readArticle[locale]}
            <Icon name="arrow" className="h-3.5 w-3.5 rtl:rotate-180" />
          </span>
        </span>
      </button>

      <ArticleModal article={open ? article : null} open={open} onClose={() => setOpen(false)} locale={locale} />
    </>
  );
}
