"use client";

import { Modal } from "@/components/ui/Modal";
import type { Locale } from "@/lib/i18n";
import { siteContent } from "@/data/site";
import type { Localized } from "@/lib/types";

interface VideoModalProps {
  open: boolean;
  onClose: () => void;
  locale: Locale;
  youtubeId: string;
  title: Localized;
  aspect?: "portrait" | "landscape";
}

/** A YouTube video playing inside the shared glass modal. */
export function VideoModal({ open, onClose, locale, youtubeId, title, aspect = "landscape" }: VideoModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeLabel={siteContent.actions.close[locale]}
      className={aspect === "portrait" ? "max-w-sm" : "max-w-3xl"}
    >
      <div className="p-2 sm:p-3">
        <div
          className={
            "relative w-full overflow-hidden rounded-2xl bg-brand-ink " +
            (aspect === "portrait" ? "aspect-[9/16]" : "aspect-video")
          }
        >
          {open && (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
              title={title[locale]}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
        <p className="px-2 pb-1 pt-3 text-sm font-semibold text-brand-ink">{title[locale]}</p>
      </div>
    </Modal>
  );
}
