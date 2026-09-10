"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VideoCard } from "@/components/media/VideoCard";
import { EASE_PREMIUM } from "@/lib/motion";
import { videos, videoCategories } from "@/data/videos";
import { siteContent } from "@/data/site";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * Videos page gallery — a 3-across grid (3×3 for "All"). Every clip is
 * phone-portrait, so the rows stay perfectly aligned; cards never stretch.
 */
export function VideoLibrary({ locale }: { locale: Locale }) {
  const [active, setActive] = useState("all");

  const filtered = useMemo(() => {
    if (active === "all") return videos;
    const label = videoCategories.find((c) => c.key === active)?.label.en;
    return videos.filter((v) => v.category.en === label);
  }, [active]);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        {videoCategories.map((cat) => (
          <button
            key={cat.key}
            type="button"
            onClick={() => setActive(cat.key)}
            aria-pressed={active === cat.key}
            className={cn(
              "rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 sm:text-sm",
              active === cat.key
                ? "bg-gradient-brand text-white shadow-glass"
                : "glass-panel text-brand-ink-soft hover:text-brand-teal-deep"
            )}
          >
            {cat.label[locale]}
          </button>
        ))}
      </div>

      <motion.div layout className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((video) => (
            <motion.div
              key={video.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: EASE_PREMIUM }}
            >
              <VideoCard video={video} locale={locale} frame="phone" />
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
