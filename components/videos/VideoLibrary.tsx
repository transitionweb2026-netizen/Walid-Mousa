"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VideoCard } from "@/components/media/VideoCard";
import { EASE_PREMIUM } from "@/lib/motion";
import { videos, videoCategories } from "@/data/videos";
import { siteContent } from "@/data/site";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

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

      {/* Masonry columns pack the mixed portrait / landscape frames without
          leaving big gaps between rows. */}
      <div className="mt-12 gap-8 sm:columns-2 lg:columns-3 [&>*]:mb-8 [&>*]:break-inside-avoid">
        <AnimatePresence initial={false}>
          {filtered.map((video) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE_PREMIUM }}
            >
              <VideoCard video={video} locale={locale} frame={video.aspect === "portrait" ? "phone" : "glass"} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-sm text-brand-muted">{siteContent.actions.noResults[locale]}</p>
      )}
    </div>
  );
}
