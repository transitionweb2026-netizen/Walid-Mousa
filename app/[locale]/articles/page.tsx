import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildAlternates } from "@/lib/seo";
import { heroes } from "@/data/hero";
import { articles, articlesIntro } from "@/data/articles";

import { Hero } from "@/components/layout/Hero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { FeaturedArticle } from "@/components/articles/FeaturedArticle";
import { ArticleLibrary } from "@/components/articles/ArticleLibrary";
import { CtaSection } from "@/components/sections/CtaSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const h = heroes.articles;
  return {
    title: `${h.headline[locale]} ${h.headlineAccent[locale]}`.replace(/،|,/g, ""),
    description: h.description[locale],
    alternates: buildAlternates(locale, "articles"),
  };
}

export default async function ArticlesPage({ params }: PageProps<"/[locale]/articles">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;

  const lead = articles[0];
  const rest = articles.slice(1);

  const moreTitle = { en: "More from the reading room", ar: "المزيد من غرفة القراءة" };

  return (
    <>
      <Hero locale={locale} variant="articles" showPanel />

      <Section tint="neutral" glow="teal" aria-labelledby="articles-library-heading">
        <h1 id="articles-library-heading" className="sr-only">
          {heroes.articles.headline[locale]} {heroes.articles.headlineAccent[locale]}
        </h1>

        <Reveal>
          <FeaturedArticle article={lead} locale={locale} />
        </Reveal>

        <Reveal className="mt-16">
          <h2 className="font-heading text-2xl font-extrabold text-brand-ink sm:text-3xl">{moreTitle[locale]}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-brand-muted sm:text-base">
            {articlesIntro.description[locale]}
          </p>
        </Reveal>

        <div className="mt-8">
          <ArticleLibrary locale={locale} articles={rest} />
        </div>
      </Section>

      <CtaSection locale={locale} />
    </>
  );
}
