"use client";

import Image from "next/image";
import { Modal } from "@/components/ui/Modal";
import { siteContent } from "@/data/site";
import { localeTag, type Locale } from "@/lib/i18n";
import { formatDate } from "@/lib/utils";
import type { ArticleItem } from "@/data/articles";

interface ArticleModalProps {
  article: ArticleItem | null;
  open: boolean;
  onClose: () => void;
  locale: Locale;
}

export function ArticleModal({ article, open, onClose, locale }: ArticleModalProps) {
  if (!article) return null;

  return (
    <Modal open={open} onClose={onClose} closeLabel={siteContent.actions.close[locale]} className="max-w-2xl">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-3xl">
        <Image
          src={article.image.src}
          alt={article.image.alt[locale]}
          fill
          sizes="(min-width:640px) 42rem, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/65 via-brand-ink/10 to-transparent" />
      </div>

      <article className="p-6 sm:p-9">
        <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-brand-muted">
          <span className="chip-teal rounded-full px-3 py-1 font-semibold">{article.category[locale]}</span>
          <time dateTime={article.date}>{formatDate(article.date, localeTag[locale])}</time>
          <span aria-hidden>·</span>
          <span>
            {article.readTimeMinutes} {siteContent.actions.minRead[locale]}
          </span>
        </div>

        <h1 className="mt-4 text-2xl font-extrabold leading-tight text-brand-ink sm:text-[1.9rem]">
          {article.title[locale]}
        </h1>

        <div className="prose-article mt-6">
          {article.content[locale].map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </article>
    </Modal>
  );
}
