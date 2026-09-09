"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Icon } from "@/components/icons/Icon";
import { EASE_PREMIUM } from "@/lib/motion";
import type { FaqItem } from "@/data/faq";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function FaqAccordion({ items, locale }: { items: FaqItem[]; locale: Locale }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className={cn(
              "glass-card glass-sheen overflow-hidden rounded-2xl transition-colors duration-300",
              isOpen && "border-brand-teal/40"
            )}
          >
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="flex w-full items-center justify-between gap-4 p-5 text-start"
              >
                <span className="text-sm font-bold text-brand-ink sm:text-[0.95rem]">{item.question[locale]}</span>
                <span
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                    isOpen ? "rotate-180 bg-gradient-brand text-white" : "chip-teal"
                  )}
                >
                  <Icon name="chevron-down" className="h-4 w-4" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE_PREMIUM }}
                >
                  <p className="px-5 pb-5 text-sm leading-relaxed text-brand-ink-soft">{item.answer[locale]}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
