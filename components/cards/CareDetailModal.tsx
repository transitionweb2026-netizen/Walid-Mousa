"use client";

import Image from "next/image";
import { Modal } from "@/components/ui/Modal";
import { Icon, type IconName } from "@/components/icons/Icon";
import { IconBadge } from "@/components/ui/IconBadge";
import { siteContent } from "@/data/site";
import type { Locale } from "@/lib/i18n";
import type { Localized, MediaImage } from "@/lib/types";

export interface CareDetailItem {
  icon: IconName;
  image: MediaImage;
  title: Localized;
  description: Localized;
  paragraphs: Localized<string[]>;
  sections: {
    label: Localized;
    items: Localized<string[]>;
    tone: "teal" | "pink";
  }[];
  footnote?: { label: Localized; value: Localized };
}

interface CareDetailModalProps {
  item: CareDetailItem | null;
  open: boolean;
  onClose: () => void;
  locale: Locale;
}

/** One reusable glass detail modal for Surgery / Treatment / Technology cards. */
export function CareDetailModal({ item, open, onClose, locale }: CareDetailModalProps) {
  if (!item) return null;

  return (
    <Modal open={open} onClose={onClose} closeLabel={siteContent.actions.close[locale]} className="max-w-2xl">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-3xl">
        <Image
          src={item.image.src}
          alt={item.image.alt[locale]}
          fill
          sizes="(min-width:640px) 42rem, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/60 via-brand-ink/10 to-transparent" />
        <div className="absolute bottom-4 start-4">
          <IconBadge icon={item.icon} />
        </div>
      </div>

      <div className="p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-brand-ink sm:text-[1.7rem]">{item.title[locale]}</h2>
        <p className="mt-3 text-base leading-relaxed text-brand-muted">{item.description[locale]}</p>

        <div className="prose-article mt-6">
          {item.paragraphs[locale].map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {item.sections.map((section, si) => (
          <div key={si} className="mt-7">
            <h3
              className={
                "text-xs font-bold uppercase tracking-wider " +
                (section.tone === "teal" ? "text-brand-teal-deep" : "text-brand-pink-deep")
              }
            >
              {section.label[locale]}
            </h3>
            <ul className="mt-3 space-y-2.5">
              {section.items[locale].map((it, ii) => (
                <li key={ii} className="flex items-start gap-3 text-sm leading-relaxed text-brand-ink-soft">
                  <span
                    className={
                      "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full " +
                      (section.tone === "teal" ? "chip-teal" : "chip-pink")
                    }
                  >
                    <Icon name={section.tone === "teal" ? "check" : "sparkle"} className="h-3 w-3" />
                  </span>
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {item.footnote && (
          <div className="mt-7 flex items-start gap-3 rounded-2xl bg-brand-teal-tint/70 p-4">
            <Icon name="clock" className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal-deep" />
            <p className="text-sm text-brand-ink-soft">
              <span className="font-semibold text-brand-ink">{item.footnote.label[locale]}: </span>
              {item.footnote.value[locale]}
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
}
