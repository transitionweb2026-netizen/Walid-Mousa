import type { Metadata } from "next";
import "../globals.css";
import { fontVariables } from "@/lib/fonts";

/**
 * A second, independent root layout (Next.js's "multiple root layouts"
 * pattern) — the admin CMS is a deliberately separate, unlocalized branch
 * from app/[locale]/..., with its own <html>/<body>. It reuses the exact same
 * globals.css design system (glass, brand colors, typography) so the CMS
 * visually matches the site it manages; only the CONTENT it edits is
 * bilingual, the chrome is English.
 */
export const metadata: Metadata = {
  title: { template: "%s | Dr. Walid Moussa CMS", default: "Dr. Walid Moussa CMS" },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={fontVariables} data-theme="light">
      <body className="antialiased">{children}</body>
    </html>
  );
}
