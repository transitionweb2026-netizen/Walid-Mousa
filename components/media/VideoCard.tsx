"use client";

import { useState } from "react";
import Image from "next/image";
import { Icon } from "@/components/icons/Icon";
import { VideoModal } from "@/components/media/VideoModal";
import type { Locale } from "@/lib/i18n";
import type { VideoItem } from "@/data/videos";
import { siteContent } from "@/data/site";
import { cn } from "@/lib/utils";

interface VideoCardProps {
  video: VideoItem;
  locale: Locale;
  /** `phone` = device-style vertical frame; `glass` = liquid-glass card. */
  frame?: "phone" | "glass";
  className?: string;
}

export function VideoCard({ video, locale, frame = "glass", className }: VideoCardProps) {
  const [open, setOpen] = useState(false);
  const portrait = video.aspect === "portrait";

  return (
    <>
      <figure className={cn("group flex h-full flex-col", className)}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`${siteContent.actions.play[locale]}: ${video.title[locale]}`}
          className={cn(
            "relative block w-full overflow-hidden outline-none transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-teal-strong group-hover:-translate-y-1.5",
            frame === "phone"
              ? "mx-auto max-w-[16rem] rounded-[2rem] border-[6px] border-white/70 bg-white/40 p-1 shadow-glass-lg backdrop-blur-md"
              : "glass-card glass-card-hover glass-sheen rounded-3xl p-2",
            portrait ? "aspect-[9/16]" : "aspect-video"
          )}
        >
          <span className="relative block h-full w-full overflow-hidden rounded-[1.4rem]">
            <Image
              src={video.thumbnail.src}
              alt={video.thumbnail.alt[locale]}
              fill
              sizes={portrait ? "(min-width:1024px) 20rem, 60vw" : "(min-width:1024px) 22rem, 90vw"}
              className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-brand-ink/70 via-brand-ink/10 to-transparent" />
            <span className="absolute inset-x-0 bottom-0 p-4 text-start">
              <span className="text-[0.7rem] font-semibold uppercase tracking-wider text-white/80">
                {video.category[locale]}
              </span>
              <span className="mt-1 line-clamp-2 text-sm font-bold leading-snug text-white">
                {video.title[locale]}
              </span>
            </span>
            <span className="absolute start-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-brand-teal-deep shadow-glass-lg backdrop-blur transition-transform duration-300 group-hover:scale-110 rtl:translate-x-1/2">
              <Icon name="play" className="ms-0.5 h-6 w-6" />
            </span>
            {video.duration && (
              <span className="absolute end-2 top-2 rounded-full bg-brand-ink/70 px-2 py-0.5 text-[0.65rem] font-semibold text-white backdrop-blur">
                {video.duration}
              </span>
            )}
          </span>
        </button>
        <figcaption className="mt-4 px-1">
          <p className="text-sm leading-relaxed text-brand-muted line-clamp-2">{video.description[locale]}</p>
        </figcaption>
      </figure>

      <VideoModal
        open={open}
        onClose={() => setOpen(false)}
        locale={locale}
        youtubeId={video.youtubeId}
        title={video.title}
        aspect={video.aspect}
      />
    </>
  );
}
