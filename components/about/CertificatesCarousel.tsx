"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/icons/Icon";
import { aboutContent } from "@/data/about";
import type { CertificateItem } from "@/lib/cms/publicContent";
import type { IntroContent } from "@/lib/cms/publicSections";
import { localeDirection, type Locale } from "@/lib/i18n";

interface Props {
  locale: Locale;
  items?: CertificateItem[];
  intro?: IntroContent | null;
}

/**
 * Certificates as a premium horizontal strip. Native scroll-snap handles
 * touch / trackpad swipe; the arrows page it on desktop. Certificate images
 * sit in a glass frame and are never cropped disproportionately.
 */
export function CertificatesCarousel({ locale, items, intro }: Props) {
  const certItems: CertificateItem[] =
    items ??
    aboutContent.certifications.items.map((c) => ({ id: c.title.en, title: c.title, issuer: c.issuer, year: c.year, image: c.image }));
  const certifications = {
    eyebrow: intro?.eyebrow ?? aboutContent.certifications.eyebrow,
    heading: intro?.title ?? aboutContent.certifications.heading,
    description: intro?.description ?? aboutContent.certifications.description,
    items: certItems,
  };
  const isRtl = localeDirection[locale] === "rtl";
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const x = Math.abs(el.scrollLeft);
    setAtStart(x < 8);
    setAtEnd(x > max - 8);
  }, []);

  useEffect(() => {
    updateEdges();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [updateEdges]);

  const page = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.8, 380) * dir * (isRtl ? -1 : 1);
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  const prevLabel = locale === "ar" ? "السابق" : "Previous";
  const nextLabel = locale === "ar" ? "التالي" : "Next";

  return (
    <Section tint="teal" glow="teal" aria-labelledby="certificates-heading">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeader
          locale={locale}
          align="start"
          headingId="certificates-heading"
          eyebrow={certifications.eyebrow}
          title={certifications.heading}
          description={certifications.description}
        />
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => page(-1)}
            disabled={atStart}
            aria-label={prevLabel}
            className="glass-panel inline-flex h-11 w-11 items-center justify-center rounded-full text-brand-ink transition-all duration-300 hover:-translate-y-0.5 hover:text-brand-teal-deep disabled:pointer-events-none disabled:opacity-40"
          >
            <Icon name="chevron-right" className="h-5 w-5 rotate-180 rtl:rotate-0" />
          </button>
          <button
            type="button"
            onClick={() => page(1)}
            disabled={atEnd}
            aria-label={nextLabel}
            className="glass-panel inline-flex h-11 w-11 items-center justify-center rounded-full text-brand-ink transition-all duration-300 hover:-translate-y-0.5 hover:text-brand-teal-deep disabled:pointer-events-none disabled:opacity-40"
          >
            <Icon name="chevron-right" className="h-5 w-5 rtl:rotate-180" />
          </button>
        </div>
      </div>

      <Reveal className="mt-12">
        <div className="glass-frame relative p-4 sm:p-6">
          <span aria-hidden className="glow-pink absolute -end-8 -top-8 h-40 w-40 rounded-full opacity-30" />

          <div
            ref={scrollerRef}
            className="scrollbar-hide flex snap-x snap-mandatory gap-5 overflow-x-auto pb-1"
            tabIndex={0}
            role="group"
            aria-label={certifications.heading[locale]}
          >
            {certifications.items.map((item, i) => (
              <figure
                key={i}
                className="group/cert relative flex w-[78%] shrink-0 snap-start flex-col overflow-hidden rounded-3xl border border-white/70 bg-white/55 shadow-glass transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 sm:w-[19rem]"
              >
                <span aria-hidden className="glass-sheen pointer-events-none absolute inset-0 rounded-3xl" />
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-teal-wash">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt[locale]}
                    fill
                    sizes="(min-width:640px) 19rem, 78vw"
                    className="object-cover transition-transform duration-700 group-hover/cert:scale-[1.04]"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-brand-ink/45 via-transparent to-transparent" />
                  <span className="absolute end-3 top-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white/85 text-brand-teal-deep backdrop-blur">
                    <Icon name="award" className="h-4 w-4" />
                  </span>
                </div>
                <figcaption className="relative flex flex-1 flex-col p-5">
                  <span className="chip-teal w-fit rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide">
                    {item.year[locale]}
                  </span>
                  <h3 className="mt-2.5 text-sm font-bold leading-snug text-brand-ink">{item.title[locale]}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-brand-muted">{item.issuer[locale]}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
