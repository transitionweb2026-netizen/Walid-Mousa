"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@/components/icons/Icon";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { EASE_PREMIUM } from "@/lib/motion";
import type { Locale } from "@/lib/i18n";
import { localeDirection } from "@/lib/i18n";
import type { NavItem } from "@/data/navigation";
import { siteContent } from "@/data/site";
import { contactInfo } from "@/data/contact";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  locale: Locale;
  isActive: (path: string) => boolean;
  navigationItems: NavItem[];
}

export function MobileMenu({ open, onClose, locale, isActive, navigationItems }: MobileMenuProps) {
  const localeRoot = `/${locale}`;
  const isRtl = localeDirection[locale] === "rtl";

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[90] lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div
            className="absolute inset-0 bg-brand-ink/45 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.aside
            className="glass-card-strong absolute inset-y-0 end-0 flex w-[86%] max-w-sm flex-col rounded-s-[2rem] p-6"
            initial={{ x: isRtl ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: isRtl ? "-100%" : "100%" }}
            transition={{ duration: 0.4, ease: EASE_PREMIUM }}
            role="dialog"
            aria-modal="true"
            aria-label={siteContent.actions.menu[locale]}
          >
            <div className="flex items-center justify-between">
              <span className="font-heading text-base font-extrabold text-brand-ink">
                {siteContent.brand.nameLocalized[locale]}
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label={siteContent.actions.close[locale]}
                className="glass-panel inline-flex h-10 w-10 items-center justify-center rounded-xl text-brand-ink transition-transform active:scale-95"
              >
                <Icon name="close" className="h-5 w-5" />
              </button>
            </div>

            <nav className="mt-8 flex flex-col gap-1.5" aria-label="Mobile">
              {navigationItems.map((item, i) => {
                const href = item.path ? `${localeRoot}/${item.path}` : localeRoot;
                const active = isActive(item.path);
                return (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, x: isRtl ? -16 : 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, ease: EASE_PREMIUM }}
                  >
                    <Link
                      href={href}
                      onClick={onClose}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-semibold transition-colors duration-300",
                        active
                          ? "bg-brand-teal-tint text-brand-teal-deep"
                          : "text-brand-ink-soft hover:bg-white/60 hover:text-brand-teal-deep"
                      )}
                    >
                      {item.label[locale]}
                      <Icon name="chevron-right" className="h-4 w-4 opacity-60 rtl:rotate-180" />
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <div className="mt-auto space-y-4 pt-6">
              <a
                href={`tel:${contactInfo.phone}`}
                className="flex items-center gap-3 rounded-2xl bg-white/55 px-4 py-3 text-sm font-semibold text-brand-ink"
              >
                <Icon name="phone" className="h-4 w-4 text-brand-teal-deep" />
                <span dir="ltr">{contactInfo.phoneDisplay[locale]}</span>
              </a>
              <div className="flex items-center justify-between">
                <LanguageSwitcher locale={locale} />
                <Button href={`${localeRoot}/contact`} size="sm" onClick={onClose}>
                  {siteContent.actions.bookAppointment[locale]}
                </Button>
              </div>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
