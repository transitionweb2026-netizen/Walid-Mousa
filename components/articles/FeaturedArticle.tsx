"use client";

import { useState } from "react";
import Image from "next/image";
import { ArticleModal } from "@/components/cards/ArticleModal";
import { Icon } from "@/components/icons/Icon";
import { siteContent } from "@/data/site";
import { localeTag, type Locale } from "@/lib/i18n";
import { formatDate } from "@/lib/utils";
import type { ArticleItem } from "@/data/articles";

/** The lead article — a wide horizontal glass card that opens the reading modal. */
export function FeaturedArticle({ article, locale }: { article: ArticleItem; locale: Locale }) {
  const [open, setOpen] = useState(false);
  const featuredLabel = locale === "ar" ? "مقال مميّز" : "Featured";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`${siteContent.actions.readArticle[locale]}: ${article.title[locale]}`}
        className="glass-card-strong glass-sheen group relative grid w-full overflow-hidden rounded-[2rem] text-start outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal-strong lg:grid-cols-[1.05fr_0.95fr]"
      >
        <span aria-hidden className="glow-teal absolute -start-16 -top-16 h-56 w-56 rounded-full opacity-45" />
        <span aria-hidden className="glow-pink absolute -bottom-20 -end-12 h-64 w-64 rounded-full opacity-35" />

        <span className="relative order-1 block min-h-[15rem] w-full overflow-hidden lg:order-2 lg:min-h-full">
          <Image
            src={article.image.src}
            alt={article.image.alt[locale]}
            fill
            sizes="(min-width:1024px) 40rem, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-brand-ink/45 via-transparent to-transparent" />
          <span className="absolute start-4 top-4 rounded-full bg-white/85 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wide text-brand-pink-deep backdrop-blur">
            {featuredLabel}
          </span>
        </span>

        <span className="relative order-2 flex flex-col justify-center p-7 sm:p-10 lg:order-1">
          <span className="flex flex-wrap items-center gap-3 text-xs font-medium text-brand-muted">
            <span className="chip-teal rounded-full px-3 py-1 font-semibold">{article.category[locale]}</span>
            <span>{formatDate(article.date, localeTag[locale])}</span>
            <span aria-hidden>·</span>
            <span>
              {article.readTimeMinutes} {siteContent.actions.minRead[locale]}
            </span>
          </span>

          <span className="mt-4 block text-pretty font-heading text-2xl font-extrabold leading-tight text-brand-ink group-hover:text-brand-teal-deep sm:text-3xl">
            {article.title[locale]}
          </span>
          <span className="mt-3 block text-pretty text-sm leading-relaxed text-brand-ink-soft sm:text-base">
            {article.excerpt[locale]}
          </span>

          <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 font-heading text-sm font-semibold text-white shadow-glass transition-transform duration-300 group-hover:-translate-y-0.5">
            {siteContent.actions.readArticle[locale]}
            <Icon name="arrow" className="h-4 w-4 rtl:rotate-180" />
          </span>
        </span>
      </button>

      <ArticleModal article={open ? article : null} open={open} onClose={() => setOpen(false)} locale={locale} />
    </>
  );
}
