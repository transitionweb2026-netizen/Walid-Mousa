import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { fontVariables } from "@/lib/fonts";
import { isLocale, locales, localeDirection, localeTag, type Locale } from "@/lib/i18n";
import { siteContent } from "@/data/site";
import {
  getNavbarSettings,
  getFooterContent,
  getSocialLinks,
  getContactInfo,
  getSiteBranding,
  getUiStrings,
} from "@/lib/cms/publicSettings";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { PageTransition } from "@/components/motion/PageTransition";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPhysicianJsonLd, buildMedicalOrganizationJsonLd, buildWebSiteJsonLd } from "@/lib/structuredData";
import { SITE_URL } from "@/lib/seo";

// The whole [locale] tree reads from Supabase (global settings here, page
// content in each page.tsx) — CMS edits must appear without a rebuild, so it
// can't be statically cached. When Supabase is unconfigured, everything
// falls back to /data (see lib/cms/publicClient.ts).
export const dynamic = "force-dynamic";

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
  const branding = await getSiteBranding();

  return {
    metadataBase: new URL(branding.websiteUrl || SITE_URL),
    title: {
      template: siteContent.seo.titleTemplate[locale],
      default: siteContent.seo.defaultTitle[locale],
    },
    description: branding.defaultMetaDescription[locale],
    keywords: siteContent.seo.keywords[locale],
    applicationName: branding.orgName[locale],
    authors: [{ name: branding.orgName[locale] }],
    openGraph: {
      title: siteContent.seo.defaultTitle[locale],
      description: branding.defaultMetaDescription[locale],
      url: `${branding.websiteUrl || SITE_URL}/${locale}`,
      siteName: branding.orgName[locale],
      locale: localeTag[locale],
      type: "website",
      images: branding.defaultOgImage ? [branding.defaultOgImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: siteContent.seo.defaultTitle[locale],
      description: branding.defaultMetaDescription[locale],
    },
    icons: branding.favicon ? { icon: branding.favicon, apple: branding.appleTouchIcon ?? undefined } : undefined,
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;

  const [nav, footer, social, contact, branding, ui] = await Promise.all([
    getNavbarSettings(),
    getFooterContent(),
    getSocialLinks(),
    getContactInfo(),
    getSiteBranding(),
    getUiStrings(),
  ]);

  return (
    <html
      lang={localeTag[locale]}
      dir={localeDirection[locale]}
      className={fontVariables}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="antialiased">
        <JsonLd
          data={[
            buildPhysicianJsonLd(branding, contact, locale),
            buildMedicalOrganizationJsonLd(branding, contact, locale, social),
            buildWebSiteJsonLd(branding, locale),
          ]}
        />
        <MotionProvider>
          <a
            href="#main-content"
            className="sr-only rounded-full bg-white px-4 py-2 font-semibold text-brand-teal-deep shadow-glass focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100]"
          >
            {(ui.skipToContent ?? siteContent.actions.skipToContent)[locale]}
          </a>
          <Navbar locale={locale} nav={nav} branding={branding} contact={contact} />
          <PageTransition>
            <main id="main-content">{children}</main>
          </PageTransition>
          <Footer
            locale={locale}
            nav={nav}
            footer={footer}
            social={social}
            contact={contact}
            branding={branding}
          />
        </MotionProvider>
      </body>
    </html>
  );
}
