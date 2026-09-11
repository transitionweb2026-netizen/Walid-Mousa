import Link from "next/link";
import { Icon } from "@/components/icons/Icon";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import type { Locale } from "@/lib/i18n";
import type {
  NavbarSettings,
  FooterContent,
  ContactInfo,
  SiteBranding,
} from "@/lib/cms/publicSettings";
import type { SocialLink } from "@/data/contact";

interface FooterProps {
  locale: Locale;
  nav: NavbarSettings;
  footer: FooterContent;
  social: SocialLink[];
  contact: ContactInfo;
  branding: SiteBranding;
}

export function Footer({ locale, nav, footer, social, contact, branding }: FooterProps) {
  const localeRoot = `/${locale}`;
  const year = new Date().getFullYear();
  const initial = branding.orgName.en.replace(/^Dr\.\s*/, "").charAt(0) || "W";

  return (
    <footer className="relative mt-8 overflow-hidden px-3 pb-4 sm:px-6">
      <div className="glass-card relative mx-auto max-w-7xl rounded-[2rem] p-8 sm:p-12">
        <span aria-hidden className="glow-teal absolute -top-20 end-10 h-56 w-56 rounded-full opacity-40" />
        <span aria-hidden className="glow-pink absolute -bottom-24 start-10 h-56 w-56 rounded-full opacity-30" />

        <div className="relative grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand text-sm font-black text-white shadow-glass">
                {initial}
              </span>
              <span className="font-heading text-base font-extrabold text-brand-ink">{branding.orgName[locale]}</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-brand-muted">{footer.tagline[locale]}</p>
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
          </div>

          <nav aria-label="Footer">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-teal-deep">
              {footer.quickLinksTitle[locale]}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {nav.items.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.path ? `${localeRoot}/${item.path}` : localeRoot}
                    className="text-sm text-brand-ink-soft transition-colors hover:text-brand-teal-deep"
                  >
                    {item.label[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-teal-deep">{footer.contactTitle[locale]}</h3>
            <ul className="mt-4 space-y-3 text-sm text-brand-ink-soft">
              {contact.phone && (
                <li>
                  <a href={`tel:${contact.phone}`} className="flex items-start gap-2.5 hover:text-brand-teal-deep">
                    <Icon name="phone" className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" />
                    <span dir="ltr">{contact.phoneDisplay[locale]}</span>
                  </a>
                </li>
              )}
              {contact.whatsapp && (
                <li>
                  <a
                    href={buildWhatsAppUrl(contact.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-2.5 hover:text-brand-teal-deep"
                  >
                    <Icon name="whatsapp" className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" />
                    WhatsApp
                  </a>
                </li>
              )}
              {contact.email && (
                <li>
                  <a href={`mailto:${contact.email}`} className="flex items-start gap-2.5 break-all hover:text-brand-teal-deep">
                    <Icon name="mail" className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" />
                    {contact.email}
                  </a>
                </li>
              )}
              {contact.addressShort[locale] && (
                <li className="flex items-start gap-2.5">
                  <Icon name="map-pin" className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" />
                  {contact.addressShort[locale]}
                </li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-teal-deep">{footer.hoursTitle[locale]}</h3>
            <ul className="mt-4 space-y-2 text-sm text-brand-ink-soft">
              {contact.workingHours.map((row, i) => (
                <li key={i} className="flex items-center justify-between gap-3">
                  <span>{row.day[locale]}</span>
                  <span className={row.closed ? "text-brand-pink-deep" : "font-medium text-brand-ink"}>
                    {row.hours[locale]}
                  </span>
                </li>
              ))}
            </ul>
            {footer.privacyNote[locale] && (
              <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-brand-muted">
                <Icon name="lock" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-teal" />
                {footer.privacyNote[locale]}
              </p>
            )}
          </div>
        </div>

        <div className="relative mt-10 flex flex-col items-center justify-between gap-3 border-t border-brand-line/70 pt-6 text-xs text-brand-muted sm:flex-row">
          <p>
            © {year} {branding.orgName[locale]}. {footer.copyright[locale]}
          </p>
          {footer.creditUrl ? (
            <a href={footer.creditUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand-teal-deep">
              {footer.credit[locale]}
            </a>
          ) : (
            <p>{footer.credit[locale]}</p>
          )}
        </div>
      </div>
    </footer>
  );
}
