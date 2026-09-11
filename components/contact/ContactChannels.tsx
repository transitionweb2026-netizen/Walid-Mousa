import { GlassCard } from "@/components/ui/GlassCard";
import { Icon } from "@/components/icons/Icon";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import type { ContactInfo, FooterContent } from "@/lib/cms/publicSettings";
import type { SocialLink } from "@/data/contact";
import type { Locale } from "@/lib/i18n";
import type { Localized } from "@/lib/types";

interface Props {
  locale: Locale;
  contact: ContactInfo;
  social: SocialLink[];
  footer: FooterContent;
  labels: {
    channelsTitle: Localized;
    channelsNote: Localized;
    whatsapp: Localized;
    bookAppointment: Localized;
  };
}

export function ContactChannels({ locale, contact, social, footer, labels }: Props) {
  return (
    <div className="flex flex-col gap-5 lg:sticky lg:top-24">
      <GlassCard hover={false} className="p-6 sm:p-7">
        <h2 className="font-heading text-lg font-extrabold text-brand-ink">{labels.channelsTitle[locale]}</h2>
        <p className="mt-1.5 text-sm text-brand-muted">{labels.channelsNote[locale]}</p>

        <div className="mt-5 flex flex-col gap-3">
          {contact.phone && (
            <a href={`tel:${contact.phone}`} className="group flex items-center gap-3.5 rounded-2xl bg-white/55 p-3.5 transition-colors hover:bg-white/85">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-brand text-white">
                <Icon name="phone" className="h-5 w-5" />
              </span>
              <span className="flex flex-col text-start">
                <span className="text-xs text-brand-muted">{locale === "ar" ? "هاتف العيادة" : "Clinic phone"}</span>
                <span dir="ltr" className="text-sm font-bold text-brand-ink">{contact.phoneDisplay[locale]}</span>
              </span>
            </a>
          )}

          {contact.whatsapp && (
            <a
              href={buildWhatsAppUrl(contact.whatsapp, labels.bookAppointment[locale])}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3.5 rounded-2xl bg-white/55 p-3.5 transition-colors hover:bg-white/85"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-teal-deep text-white">
                <Icon name="whatsapp" className="h-5 w-5" />
              </span>
              <span className="flex flex-col text-start">
                <span className="text-xs text-brand-muted">WhatsApp</span>
                <span className="text-sm font-bold text-brand-ink">{labels.whatsapp[locale]}</span>
              </span>
            </a>
          )}

          {contact.email && (
            <a href={`mailto:${contact.email}`} className="group flex items-center gap-3.5 rounded-2xl bg-white/55 p-3.5 transition-colors hover:bg-white/85">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-pink text-white">
                <Icon name="mail" className="h-5 w-5" />
              </span>
              <span className="flex min-w-0 flex-col text-start">
                <span className="text-xs text-brand-muted">{locale === "ar" ? "البريد الإلكتروني" : "Email"}</span>
                <span className="truncate text-sm font-bold text-brand-ink">{contact.email}</span>
              </span>
            </a>
          )}
        </div>

        {social.length > 0 && (
          <div className="mt-5 flex gap-2">
            {social.map((s) => (
              <a
                key={s.key}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="glass-panel inline-flex h-10 w-10 items-center justify-center rounded-xl text-brand-ink-soft transition-all duration-300 hover:-translate-y-0.5 hover:text-brand-teal-deep"
              >
                <Icon name={s.icon} className="h-4 w-4" />
              </a>
            ))}
          </div>
        )}
      </GlassCard>

      <GlassCard hover={false} className="p-6 sm:p-7">
        <h2 className="flex items-center gap-2 font-heading text-lg font-extrabold text-brand-ink">
          <Icon name="clock" className="h-5 w-5 text-brand-teal-deep" />
          {footer.hoursTitle[locale]}
        </h2>
        <ul className="mt-4 divide-y divide-brand-line/70">
          {contact.workingHours.map((row, i) => (
            <li key={i} className="flex items-center justify-between gap-3 py-2.5 text-sm">
              <span className="text-brand-ink-soft">{row.day[locale]}</span>
              <span className={row.closed ? "font-semibold text-brand-pink-deep" : "font-semibold text-brand-ink"}>
                {row.hours[locale]}
              </span>
            </li>
          ))}
        </ul>
        {footer.privacyNote[locale] && (
          <p className="mt-4 flex items-start gap-2 rounded-xl bg-brand-teal-tint/60 p-3 text-xs leading-relaxed text-brand-ink-soft">
            <Icon name="lock" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-teal-deep" />
            {footer.privacyNote[locale]}
          </p>
        )}
      </GlassCard>
    </div>
  );
}
