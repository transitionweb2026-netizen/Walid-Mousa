import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { faqItems as fbFaqs, faqIntro as fbFaqIntro } from "@/data/faq";
import type { FaqItem } from "@/data/faq";
import { featuredArticles as fbArticles, articlesIntro as fbArticlesIntro } from "@/data/articles";
import type { ArticleItem } from "@/data/articles";
import { siteContent } from "@/data/site";
import type { IntroContent } from "@/lib/cms/publicSections";
import type { Locale } from "@/lib/i18n";

interface Props {
  locale: Locale;
  faqs?: FaqItem[];
  articles?: ArticleItem[];
  faqIntro?: IntroContent | null;
  articlesIntro?: IntroContent | null;
}

export function FaqArticles({ locale, faqs = fbFaqs, articles = fbArticles, faqIntro, articlesIntro }: Props) {
  const fh = faqIntro ?? fbFaqIntro;
  const ah = articlesIntro ?? fbArticlesIntro;

  return (
    <Section tint="duo" glow="both" aria-labelledby="faq-articles-heading">
      <h2 id="faq-articles-heading" className="sr-only">
        {fh.title[locale]} — {ah.title[locale]}
      </h2>

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-14">
        {articlesIntro !== null && (
          <div>
            <Reveal>
              <span className="chip-pink inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] shadow-glass">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-pink" />
                {ah.eyebrow[locale]}
              </span>
              <h3 className="mt-4 text-2xl font-extrabold text-brand-ink sm:text-3xl">{ah.title[locale]}</h3>
              <p className="mt-3 text-base leading-relaxed text-brand-muted">{ah.description[locale]}</p>
            </Reveal>

            <Stagger className="mt-8 flex flex-col gap-4">
              {articles.slice(0, 4).map((article) => (
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
        )}

        {faqIntro !== null && (
          <div>
            <Reveal>
              <span className="chip-teal inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] shadow-glass">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-teal" />
                {fh.eyebrow[locale]}
              </span>
              <h3 className="mt-4 text-2xl font-extrabold text-brand-ink sm:text-3xl">{fh.title[locale]}</h3>
              <p className="mt-3 text-base leading-relaxed text-brand-muted">{fh.description[locale]}</p>
            </Reveal>

            <Reveal className="mt-8">
              <FaqAccordion items={faqs} locale={locale} />
            </Reveal>
          </div>
        )}
      </div>
    </Section>
  );
}
