"use client";

import { motion } from "framer-motion";
import { Icon } from "@/components/icons/Icon";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { EASE_PREMIUM } from "@/lib/motion";
import type { Locale } from "@/lib/i18n";
import type { Localized } from "@/lib/types";
import type { ContactInfo } from "@/lib/cms/publicSettings";
import type { SocialLink } from "@/data/contact";
import { cn } from "@/lib/utils";

interface Props {
  locale: Locale;
  contact: ContactInfo;
  social: SocialLink[];
  contactTitle?: Localized;
  className?: string;
}

/** Floating liquid-glass panel: social icons + phone, with gentle motion. */
export function HeroContactPanel({ locale, contact, social, contactTitle, className }: Props) {
  const title = contactTitle?.[locale] ?? (locale === "ar" ? "تواصل معنا" : "Get in Touch");
  const iconSocials = social.filter((s) => s.key !== "phone" && s.key !== "whatsapp").slice(0, 3);
  const bookLabel = locale === "ar" ? "احجز موعدك" : "Book an Appointment";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.7, ease: EASE_PREMIUM }}
      className={cn("w-full max-w-xs", className)}
    >
      <div className="glass-card-strong glass-sheen relative overflow-hidden rounded-3xl p-5">
        <span aria-hidden className="glow-pink absolute -end-6 -top-8 h-24 w-24 rounded-full opacity-50" />
        <p className="relative text-xs font-bold uppercase tracking-wider text-brand-teal-deep">{title}</p>

        {contact.phone && (
          <a
            href={`tel:${contact.phone}`}
            className="relative mt-3 flex items-center gap-3 rounded-2xl bg-white/55 px-3.5 py-3 transition-colors hover:bg-white/80"
          >
            <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand text-white">
              <Icon name="phone" className="h-4 w-4" />
              <span aria-hidden className="animate-pulse-ring absolute inset-0 rounded-xl border border-brand-teal" />
            </span>
            <span className="flex flex-col">
              <span className="text-[0.7rem] text-brand-muted">{locale === "ar" ? "العيادة" : "Clinic"}</span>
              <span dir="ltr" className="text-sm font-bold text-brand-ink">
                {contact.phoneDisplay[locale]}
              </span>
            </span>
          </a>
        )}

        <div className="relative mt-3 flex items-center gap-2">
          {contact.whatsapp && (
            <a
              href={buildWhatsAppUrl(contact.whatsapp, bookLabel)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-brand-teal-deep text-xs font-bold text-white transition-transform hover:-translate-y-0.5"
            >
              <Icon name="whatsapp" className="h-4 w-4" />
              WhatsApp
            </a>
          )}
          {iconSocials.map((s, i) => (
            <motion.a
              key={s.key}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
              className="glass-panel inline-flex h-10 w-10 items-center justify-center rounded-xl text-brand-ink-soft transition-colors hover:text-brand-pink-deep"
            >
              <Icon name={s.icon} className="h-4 w-4" />
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
