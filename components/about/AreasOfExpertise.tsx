import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { IconBadge } from "@/components/ui/IconBadge";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { aboutContent } from "@/data/about";
import type { ExpertiseItem } from "@/lib/cms/publicContent";
import type { IntroContent } from "@/lib/cms/publicSections";
import type { Locale } from "@/lib/i18n";

interface Props {
  locale: Locale;
  items?: ExpertiseItem[];
  intro?: IntroContent | null;
}

export function AreasOfExpertise({ locale, items, intro }: Props) {
  const expertise = {
    eyebrow: intro?.eyebrow ?? aboutContent.expertise.eyebrow,
    heading: intro?.title ?? aboutContent.expertise.heading,
    description: intro?.description ?? aboutContent.expertise.description,
    items: items ?? aboutContent.expertise.items.map((x, i) => ({ id: String(i), ...x })),
  };

  return (
    <Section tint="teal" glow="teal" aria-labelledby="expertise-heading">
      <SectionHeader
        locale={locale}
        headingId="expertise-heading"
        eyebrow={expertise.eyebrow}
        title={expertise.heading}
        description={expertise.description}
      />

      <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {expertise.items.map((item, i) => (
          <StaggerItem key={i} className="h-full">
            <article className="glass-card glass-card-hover glass-sheen group/card relative flex h-full flex-col overflow-hidden rounded-3xl">
              <div className="relative aspect-[16/11] w-full overflow-hidden">
                <Image
                  src={item.image.src}
                  alt={item.image.alt[locale]}
                  fill
                  sizes="(min-width:1024px) 20rem, (min-width:640px) 45vw, 90vw"
                  className="object-cover transition-transform duration-700 group-hover/card:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/60 via-brand-ink/10 to-transparent" />
                <div className="absolute -bottom-5 start-5">
                  <IconBadge icon={item.icon} size="md" />
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6 pt-8">
                <h3 className="text-base font-bold leading-snug text-brand-ink">{item.title[locale]}</h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-brand-muted">{item.description[locale]}</p>
              </div>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
