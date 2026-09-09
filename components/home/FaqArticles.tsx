import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { faqItems, faqIntro } from "@/data/faq";
import { featuredArticles, articlesIntro } from "@/data/articles";
import { siteContent } from "@/data/site";
import type { Locale } from "@/lib/i18n";

export function FaqArticles({ locale }: { locale: Locale }) {
  return (
    <Section tint="duo" glow="both" aria-labelledby="faq-articles-heading">
      <h2 id="faq-articles-heading" className="sr-only">
        {faqIntro.title[locale]} — {articlesIntro.title[locale]}
      </h2>

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-14">
        {/* Articles (left) */}
        <div>
          <Reveal>
            <span className="chip-pink inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] shadow-glass">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-pink" />
              {articlesIntro.eyebrow[locale]}
            </span>
            <h3 className="mt-4 text-2xl font-extrabold text-brand-ink sm:text-3xl">{articlesIntro.title[locale]}</h3>
            <p className="mt-3 text-base leading-relaxed text-brand-muted">{articlesIntro.description[locale]}</p>
          </Reveal>

          <Stagger className="mt-8 flex flex-col gap-4">
            {featuredArticles.map((article) => (
              <StaggerItem key={article.id}>
                <ArticleCard article={article} locale={locale} layout="row" />
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="mt-8">
            <Button href={`/${locale}/articles`} variant="secondary" withArrow>
              {siteContent.actions.viewAllArticles[locale]}
            </Button>
          </Reveal>
        </div>

        {/* FAQ (right) */}
        <div>
          <Reveal>
            <span className="chip-teal inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] shadow-glass">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-teal" />
              {faqIntro.eyebrow[locale]}
            </span>
            <h3 className="mt-4 text-2xl font-extrabold text-brand-ink sm:text-3xl">{faqIntro.title[locale]}</h3>
            <p className="mt-3 text-base leading-relaxed text-brand-muted">{faqIntro.description[locale]}</p>
          </Reveal>

          <Reveal className="mt-8">
            <FaqAccordion items={faqItems} locale={locale} />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
