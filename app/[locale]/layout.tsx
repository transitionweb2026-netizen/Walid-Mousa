import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { fontVariables } from "@/lib/fonts";
import { isLocale, locales, localeDirection, localeTag, type Locale } from "@/lib/i18n";
import { siteContent } from "@/data/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { PageTransition } from "@/components/motion/PageTransition";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.drwalidmoussa.com";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      template: siteContent.seo.titleTemplate[locale],
      default: siteContent.seo.defaultTitle[locale],
    },
    description: siteContent.seo.defaultDescription[locale],
    keywords: siteContent.seo.keywords[locale],
    applicationName: siteContent.brand.name,
    authors: [{ name: siteContent.brand.name }],
    openGraph: {
      title: siteContent.seo.defaultTitle[locale],
      description: siteContent.seo.defaultDescription[locale],
      url: `${SITE_URL}/${locale}`,
      siteName: siteContent.brand.name,
      locale: localeTag[locale],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: siteContent.seo.defaultTitle[locale],
      description: siteContent.seo.defaultDescription[locale],
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;

  return (
    <html
      lang={localeTag[locale]}
      dir={localeDirection[locale]}
      className={fontVariables}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="antialiased">
        <MotionProvider>
          <a
            href="#main-content"
            className="sr-only rounded-full bg-white px-4 py-2 font-semibold text-brand-teal-deep shadow-glass focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100]"
          >
            {siteContent.actions.skipToContent[locale]}
          </a>
          <Navbar locale={locale} />
          <PageTransition>
            <main id="main-content">{children}</main>
          </PageTransition>
          <Footer locale={locale} />
        </MotionProvider>
      </body>
    </html>
  );
}
