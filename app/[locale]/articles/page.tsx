import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildAlternates } from "@/lib/seo";
import { IMG } from "@/data/images";

import { Hero } from "@/components/layout/Hero";
import { Section } from "@/components/ui/Section";
import { ArticleLibrary } from "@/components/articles/ArticleLibrary";
import { CtaSection } from "@/components/sections/CtaSection";
import type { Localized } from "@/lib/types";

const heroCopy: { eyebrow: Localized; headline: Localized; accent: Localized; description: Localized } = {
  eyebrow: { en: "Articles", ar: "المقالات" },
  headline: { en: "In-depth reading,", ar: "قراءة متعمّقة،" },
  accent: { en: "written for patients", ar: "مكتوبة للمرضى" },
  description: {
    en: "Longer explanations of the conditions Dr. Walid Moussa treats — clear, evidence-based and free of jargon.",
    ar: "شروحات أطول للحالات التي يعالجها د. وليد موسى — واضحة وقائمة على الدليل وخالية من المصطلحات المعقّدة.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  return {
    title: `${heroCopy.headline[locale]} ${heroCopy.accent[locale]}`.replace(/،|,/g, ""),
    description: heroCopy.description[locale],
    alternates: buildAlternates(locale, "articles"),
  };
}

export default async function ArticlesPage({ params }: PageProps<"/[locale]/articles">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;

  return (
    <>
      <Hero
        locale={locale}
        compact
        content={{
          eyebrow: heroCopy.eyebrow,
          headline: heroCopy.headline,
          headlineAccent: heroCopy.accent,
          description: heroCopy.description,
          image: {
            src: IMG.readingDesk,
            alt: { en: "Reading at a desk", ar: "قراءة على المكتب" },
            position: "center 40%",
          },
        }}
      />

      <Section tint="neutral" glow="teal" aria-labelledby="articles-library-heading">
        <h1 id="articles-library-heading" className="sr-only">
          {heroCopy.headline[locale]} {heroCopy.accent[locale]}
        </h1>
        <ArticleLibrary locale={locale} />
      </Section>

      <CtaSection locale={locale} />
    </>
  );
}
