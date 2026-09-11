import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Icon } from "@/components/icons/Icon";
import { aboutContent } from "@/data/about";
import type { GalleryImage } from "@/lib/cms/publicContent";
import type { IntroContent } from "@/lib/cms/publicSections";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface Props {
  locale: Locale;
  images?: GalleryImage[];
  intro?: IntroContent | null;
}

export function AchievementsGallery({ locale, images, intro }: Props) {
  const achievements = {
    eyebrow: intro?.eyebrow ?? aboutContent.achievements.eyebrow,
    heading: intro?.title ?? aboutContent.achievements.heading,
    items: aboutContent.achievements.items,
  };
  const gallery = {
    eyebrow: aboutContent.gallery.eyebrow,
    heading: aboutContent.gallery.heading,
    images: images ?? aboutContent.gallery.images.map((g, i) => ({ id: String(i), src: g.src, alt: g.alt })),
  };

  return (
    <Section tint="pink" glow="pink" aria-labelledby="achievements-heading">
      <SectionHeader
        locale={locale}
        tone="pink"
        headingId="achievements-heading"
        eyebrow={achievements.eyebrow}
        title={achievements.heading}
      />

      <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {achievements.items.map((item, i) => (
          <StaggerItem key={i} className="h-full">
            <div className="glass-card glass-card-hover glass-sheen flex h-full flex-col rounded-3xl p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-glass">
                <Icon name={item.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-sm font-bold text-brand-ink">{item.title[locale]}</h3>
              <p className="mt-2 text-xs leading-relaxed text-brand-muted">{item.text[locale]}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      {/* Photo gallery */}
      <Reveal className="mt-16">
        <div className="mb-6 flex items-center gap-3">
          <span className="chip-teal rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider">
            {gallery.eyebrow[locale]}
          </span>
          <h3 className="font-heading text-lg font-bold text-brand-ink">{gallery.heading[locale]}</h3>
        </div>
        <div className="grid auto-rows-[8.5rem] grid-cols-2 gap-3 sm:auto-rows-[10.5rem] sm:grid-cols-3">
          {gallery.images.map((img, i) => (
            <div
              key={i}
              className={cn(
                "group relative overflow-hidden rounded-2xl border border-white/60 shadow-glass",
                i === 0 && "col-span-2 row-span-2"
              )}
            >
              <Image
                src={img.src}
                alt={img.alt[locale]}
                fill
                sizes="(min-width:1024px) 22rem, 45vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
