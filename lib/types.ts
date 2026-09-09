/**
 * Shared content types. Every editable string on the site is a
 * `Localized<T>` value carrying both languages together, so each file in
 * `/data` is one self-contained content group — swappable for a real CMS
 * later without touching a single component.
 */

export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];

export type Localized<T = string> = Record<Locale, T>;

/** A link with a localized label. `href` is relative to the locale root. */
export interface LocalizedLink {
  label: Localized;
  href: string;
}

/** Any raster/vector image reference. Swappable without touching layout. */
export interface MediaImage {
  /** Path under /public, or a fully-qualified URL (see next.config.ts hosts). */
  src: string;
  alt: Localized;
  /** Optional focal point, e.g. "center 30%" — passed to objectPosition. */
  position?: string;
}

/** A video entry. Real footage arrives as one `youtubeId` swap per item. */
export interface MediaVideo {
  /** Thumbnail shown before playback. */
  poster: MediaImage;
  /** YouTube video id (the `v=` value). Empty while awaiting real footage. */
  youtubeId: string;
  /** Card framing — phone-style vertical vs. standard 16:9. */
  aspect: "portrait" | "landscape";
  /** mm:ss label shown on the card. */
  duration?: string;
}
