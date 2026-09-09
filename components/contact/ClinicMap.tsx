import { Icon } from "@/components/icons/Icon";
import { contactInfo, contactIntro } from "@/data/contact";
import type { Locale } from "@/lib/i18n";

export function ClinicMap({ locale }: { locale: Locale }) {
  return (
    <div className="glass-card glass-sheen overflow-hidden rounded-3xl">
      <div className="flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
        <div>
          <h2 className="flex items-center gap-2 font-heading text-lg font-extrabold text-brand-ink">
            <Icon name="map-pin" className="h-5 w-5 text-brand-teal-deep" />
            {contactIntro.locationTitle[locale]}
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-brand-ink-soft">{contactInfo.address[locale]}</p>
        </div>
        <a
          href={contactInfo.mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-brand-teal-deep transition-colors hover:bg-brand-teal-tint"
        >
          {contactIntro.openInMaps[locale]}
          <Icon name="arrow-up-right" className="h-4 w-4" />
        </a>
      </div>
      <div className="surface-dots relative h-[280px] w-full border-t border-brand-line/70 bg-brand-teal-wash sm:h-[340px]">
        <iframe
          title={contactIntro.locationTitle[locale]}
          src={contactInfo.mapEmbedSrc}
          className="absolute inset-0 h-full w-full"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
