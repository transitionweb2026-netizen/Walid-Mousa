import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rating } from "@/components/ui/Rating";
import { Icon } from "@/components/icons/Icon";
import { Reveal } from "@/components/motion/Reveal";
import { reviews as fallbackReviews, reviewsIntro } from "@/data/reviews";
import type { ReviewItem } from "@/data/reviews";
import type { IntroContent } from "@/lib/cms/publicSections";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

interface Props {
  locale: Locale;
  reviews?: ReviewItem[];
  intro?: IntroContent | null;
}

export function ReviewsSection({ locale, reviews = fallbackReviews, intro }: Props) {
  const header = intro ?? reviewsIntro;
  return (
    <Section tint="teal" glow="teal" aria-labelledby="reviews-heading">
      <SectionHeader
        locale={locale}
        headingId="reviews-heading"
        eyebrow={header.eyebrow}
        title={header.title}
        description={header.description}
      />

      <div className="mt-14 gap-6 [column-fill:_balance] sm:columns-2 lg:columns-3">
        {reviews.map((review, i) => (
          <Reveal key={review.id} delay={i * 0.05} className="mb-6 break-inside-avoid">
            <figure
              className={cn(
                "glass-card glass-card-hover glass-sheen relative flex flex-col rounded-3xl p-6",
                i % 3 === 1 && "lg:p-7"
              )}
            >
              <Icon name="quote" className="h-7 w-7 text-brand-pink-soft" />
              <blockquote className="mt-3 text-sm leading-relaxed text-brand-ink-soft">{review.quote[locale]}</blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-brand-line/70 pt-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-brand text-sm font-bold text-white">
                  {initials(review.name.en)}
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-bold text-brand-ink">{review.name[locale]}</span>
                  <span className="text-xs text-brand-muted">{review.context[locale]}</span>
                </span>
                <Rating value={review.rating} className="ms-auto" />
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
