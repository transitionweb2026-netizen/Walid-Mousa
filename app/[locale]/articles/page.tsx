import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { heroes } from "@/data/hero";
import { buildPageMetadata } from "@/lib/cms/publicSeo";
import { getArticlesSections } from "@/lib/cms/publicSections";
import { getArticles } from "@/lib/cms/publicContent";
import { getFinalCta, getContactInfo, getSocialLinks } from "@/lib/cms/publicSettings";

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
  return buildPageMetadata({
    locale,
    path: "articles",
    fallbackTitle: `${h.headline[locale]} ${h.headlineAccent[locale]}`.replace(/،|,/g, ""),
    fallbackDescription: h.description[locale],
  });
}

export default async function ArticlesPage({ params }: PageProps<"/[locale]/articles">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;

  const [sections, articles, cta, contact, social] = await Promise.all([
    getArticlesSections(),
    getArticles(),
    getFinalCta(),
    getContactInfo(),
    getSocialLinks(),
  ]);
  const cref = (c: { url: string }) => `/${locale}${c.url}`;

  const lead = articles[0];
  const rest = articles.slice(1);

  return (
    <>
      <Hero
        locale={locale}
        content={sections.hero.content}
        primaryCta={{ label: sections.hero.primaryCta.label, href: cref(sections.hero.primaryCta) }}
        secondaryCta={{ label: sections.hero.secondaryCta.label, href: cref(sections.hero.secondaryCta) }}
        showPanel
        contact={contact}
        social={social}
      />

      <Section tint="neutral" glow="teal" aria-labelledby="articles-library-heading">
        <h1 id="articles-library-heading" className="sr-only">
          {sections.featuredIntro.title[locale]}
        </h1>

        {lead && (
          <Reveal>
            <FeaturedArticle article={lead} locale={locale} />
          </Reveal>
        )}

        <Reveal className="mt-16">
          <h2 className="font-heading text-2xl font-extrabold text-brand-ink sm:text-3xl">
            {sections.gridIntro.title[locale]}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-brand-muted sm:text-base">
            {sections.gridIntro.description[locale]}
          </p>
        </Reveal>

        <div className="mt-8">
          <ArticleLibrary locale={locale} articles={rest} />
        </div>
      </Section>

      {cta.isVisible && <CtaSection locale={locale} cta={cta} contact={contact} />}
    </>
  );
}
