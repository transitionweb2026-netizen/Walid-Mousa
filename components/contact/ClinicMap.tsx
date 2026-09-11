import { Icon } from "@/components/icons/Icon";
import type { ContactInfo } from "@/lib/cms/publicSettings";
import type { Locale } from "@/lib/i18n";
import type { Localized } from "@/lib/types";

interface Props {
  locale: Locale;
  contact: ContactInfo;
  labels: {
    locationTitle: Localized;
    openInMaps: Localized;
    getDirections: Localized;
    mapHint: Localized;
    mapPending: Localized;
  };
}

/**
 * Clinic location. The whole map area is a link to Google Maps directions.
 * Everything comes from the CMS (Global Settings → Contact Information):
 * `map_embed_url` (leave blank for the placeholder panel), `map_link_url`,
 * `map_directions_url`, `address`.
 */
export function ClinicMap({ locale, contact, labels }: Props) {
  const hasEmbed = Boolean(contact.mapEmbedSrc);
  const directions = contact.mapDirectionsLink || contact.mapLink;

  return (
    <div className="glass-card glass-sheen overflow-hidden rounded-3xl">
      <div className="flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
        <div>
          <h2 className="flex items-center gap-2 font-heading text-lg font-extrabold text-brand-ink">
            <Icon name="map-pin" className="h-5 w-5 text-brand-teal-deep" />
            {labels.locationTitle[locale]}
          </h2>
          {contact.address[locale] && (
            <p className="mt-1.5 text-sm leading-relaxed text-brand-ink-soft">{contact.address[locale]}</p>
          )}
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          {contact.mapLink && (
            <a
              href={contact.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-brand-teal-deep transition-colors hover:bg-brand-teal-tint"
            >
              {labels.openInMaps[locale]}
              <Icon name="arrow-up-right" className="h-4 w-4" />
            </a>
          )}
          {directions && (
            <a
              href={directions}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-brand px-4 py-2 text-sm font-semibold text-white shadow-glass transition-transform hover:-translate-y-0.5"
            >
              <Icon name="map-pin" className="h-4 w-4" />
              {labels.getDirections[locale]}
            </a>
          )}
        </div>
      </div>

      <a
        href={directions || "#"}
        target={directions ? "_blank" : undefined}
        rel="noopener noreferrer"
        aria-label={labels.getDirections[locale]}
        className="group relative block h-[280px] w-full border-t border-brand-line/70 outline-none focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-brand-teal-strong sm:h-[340px]"
      >
        {hasEmbed ? (
          <iframe
            title={labels.locationTitle[locale]}
            src={contact.mapEmbedSrc}
            className="pointer-events-none absolute inset-0 h-full w-full opacity-90"
            referrerPolicy="no-referrer-when-downgrade"
            loading="lazy"
          />
        ) : (
          <span className="surface-dots absolute inset-0 flex flex-col items-center justify-center gap-3 bg-brand-teal-wash px-6 text-center">
            <span className="animate-pulse-ring absolute h-16 w-16 rounded-full border border-brand-teal" />
            <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-glass-lg">
              <Icon name="map-pin" className="h-6 w-6" />
            </span>
            <span className="relative max-w-xs text-sm font-medium text-brand-ink-soft">{labels.mapPending[locale]}</span>
          </span>
        )}

        <span className="absolute inset-0 bg-brand-ink/0 transition-colors duration-300 group-hover:bg-brand-ink/5" />
        <span className="absolute bottom-3 start-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-brand-teal-deep shadow-glass backdrop-blur rtl:translate-x-1/2">
          <Icon name="arrow-up-right" className="h-3.5 w-3.5" />
          {labels.mapHint[locale]}
        </span>
      </a>
    </div>
  );
}
