import Link from "next/link";
import { Icon } from "@/components/icons/Icon";
import { navigationItems } from "@/data/navigation";
import { siteContent } from "@/data/site";
import { contactInfo, socialLinks, workingHours } from "@/data/contact";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import type { Locale } from "@/lib/i18n";

export function Footer({ locale }: { locale: Locale }) {
  const localeRoot = `/${locale}`;
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-8 overflow-hidden px-3 pb-4 sm:px-6">
      <div className="glass-card relative mx-auto max-w-7xl rounded-[2rem] p-8 sm:p-12" >
        <span aria-hidden className="glow-teal absolute -top-20 end-10 h-56 w-56 rounded-full opacity-40" />
        <span aria-hidden className="glow-pink absolute -bottom-24 start-10 h-56 w-56 rounded-full opacity-30" />

        <div className="relative grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand text-sm font-black text-white shadow-glass">
                W
              </span>
              <span className="font-heading text-base font-extrabold text-brand-ink">
                {siteContent.brand.nameLocalized[locale]}
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-brand-muted">
              {siteContent.footer.tagline[locale]}
            </p>
            <div className="mt-5 flex gap-2">
              {socialLinks.map((s) => (
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

          {/* Quick links */}
          <nav aria-label="Footer">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-teal-deep">
              {siteContent.footer.quickLinksTitle[locale]}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {navigationItems.map((item) => (
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

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-teal-deep">
              {siteContent.footer.contactTitle[locale]}
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-brand-ink-soft">
              <li>
                <a href={`tel:${contactInfo.phone}`} className="flex items-start gap-2.5 hover:text-brand-teal-deep">
                  <Icon name="phone" className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" />
                  <span dir="ltr">{contactInfo.phoneDisplay[locale]}</span>
                </a>
              </li>
              <li>
                <a
                  href={buildWhatsAppUrl(contactInfo.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 hover:text-brand-teal-deep"
                >
                  <Icon name="whatsapp" className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${contactInfo.email}`} className="flex items-start gap-2.5 break-all hover:text-brand-teal-deep">
                  <Icon name="mail" className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" />
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="map-pin" className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" />
                {contactInfo.addressShort[locale]}
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-teal-deep">
              {siteContent.footer.hoursTitle[locale]}
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-brand-ink-soft">
              {workingHours.map((row, i) => (
                <li key={i} className="flex items-center justify-between gap-3">
                  <span>{row.day[locale]}</span>
                  <span className={row.closed ? "text-brand-pink-deep" : "font-medium text-brand-ink"}>
                    {row.hours[locale]}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-brand-muted">
              <Icon name="lock" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-teal" />
              {siteContent.footer.privacyNote[locale]}
            </p>
          </div>
        </div>

        <div className="relative mt-10 flex flex-col items-center justify-between gap-3 border-t border-brand-line/70 pt-6 text-xs text-brand-muted sm:flex-row">
          <p>
            © {year} {siteContent.brand.nameLocalized[locale]}. {siteContent.footer.rights[locale]}
          </p>
          <p>{siteContent.footer.credit[locale]}</p>
        </div>
      </div>
    </footer>
  );
}
