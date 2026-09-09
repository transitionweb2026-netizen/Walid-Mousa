"use client";

import { useState } from "react";
import Image from "next/image";
import { Icon } from "@/components/icons/Icon";
import { VideoModal } from "@/components/media/VideoModal";
import type { Locale } from "@/lib/i18n";
import type { Localized, MediaVideo } from "@/lib/types";
import { siteContent } from "@/data/site";
import { cn } from "@/lib/utils";

interface InlineVideoProps {
  video: MediaVideo;
  title: Localized;
  locale: Locale;
  className?: string;
}

/** A glass-framed video poster that opens the shared video modal. */
export function InlineVideo({ video, title, locale, className }: InlineVideoProps) {
  const [open, setOpen] = useState(false);
  const portrait = video.aspect === "portrait";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`${siteContent.actions.play[locale]}: ${title[locale]}`}
        className={cn(
          "glass-card glass-card-hover glass-sheen group relative block w-full overflow-hidden rounded-[1.75rem] p-2.5 outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-teal-strong",
          className
        )}
      >
        <span className={cn("relative block w-full overflow-hidden rounded-[1.35rem]", portrait ? "aspect-[9/16]" : "aspect-video")}>
          <Image
            src={video.poster.src}
            alt={video.poster.alt[locale]}
            fill
            sizes="(min-width:1024px) 32rem, 92vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-brand-ink/45 via-transparent to-transparent" />
          <span className="absolute start-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-teal-deep shadow-glass-lg backdrop-blur transition-transform duration-300 group-hover:scale-110 rtl:translate-x-1/2">
            <Icon name="play" className="ms-1 h-7 w-7" />
          </span>
          {video.duration && (
            <span className="absolute end-3 bottom-3 rounded-full bg-brand-ink/70 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
              {video.duration}
            </span>
          )}
        </span>
      </button>

      <VideoModal
        open={open}
        onClose={() => setOpen(false)}
        locale={locale}
        youtubeId={video.youtubeId}
        title={title}
        aspect={video.aspect}
      />
    </>
  );
}
