"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@/components/icons/Icon";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { EASE_PREMIUM } from "@/lib/motion";
import { articles as allArticles, articleCategories, type ArticleItem } from "@/data/articles";
import { siteContent } from "@/data/site";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function ArticleLibrary({ locale, articles = allArticles }: { locale: Locale; articles?: ArticleItem[] }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const catLabel = articleCategories.find((c) => c.key === active)?.label.en;
    return articles.filter((a) => {
      const matchesCat = active === "all" || a.category.en === catLabel;
      const matchesQuery =
        !q ||
        a.title.en.toLowerCase().includes(q) ||
        a.title.ar.includes(q) ||
        a.excerpt.en.toLowerCase().includes(q) ||
        a.excerpt.ar.includes(q);
      return matchesCat && matchesQuery;
    });
  }, [query, active, articles]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Icon name="search" className="absolute start-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={siteContent.actions.searchArticles[locale]}
            aria-label={siteContent.actions.searchArticles[locale]}
            className="glass-panel w-full rounded-full border-transparent py-2.5 ps-10 pe-4 text-sm text-brand-ink outline-none placeholder:text-brand-muted/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal-strong"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {articleCategories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActive(cat.key)}
              aria-pressed={active === cat.key}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-300",
                active === cat.key
                  ? "bg-gradient-brand text-white shadow-glass"
                  : "glass-panel text-brand-ink-soft hover:text-brand-teal-deep"
              )}
            >
              {cat.label[locale]}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((article) => (
            <motion.div
              key={article.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: EASE_PREMIUM }}
              className="h-full"
            >
              <ArticleCard article={article} locale={locale} layout="stacked" className="h-full" />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-sm text-brand-muted">{siteContent.actions.noResults[locale]}</p>
      )}
    </div>
  );
}
