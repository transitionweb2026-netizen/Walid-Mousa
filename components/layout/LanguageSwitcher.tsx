"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeLabel, locales, oppositeLocale, switchLocalePath, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** Toggles between EN and AR, preserving the current path. */
export function LanguageSwitcher({ locale, className }: { locale: Locale; className?: string }) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full border border-brand-line/70 bg-white/50 p-0.5 backdrop-blur-sm",
        className
      )}
      role="group"
      aria-label="Language"
    >
      {locales.map((loc) => {
        const active = loc === locale;
        return (
          <Link
            key={loc}
            href={active ? pathname : switchLocalePath(pathname, loc)}
            hrefLang={loc}
            aria-current={active ? "true" : undefined}
            onClick={() => {
              if (!active) {
                document.cookie = `NEXT_LOCALE=${loc}; path=/; max-age=${60 * 60 * 24 * 365}`;
              }
            }}
            className={cn(
              "min-w-8 rounded-full px-2.5 py-1 text-center text-xs font-bold transition-colors duration-300",
              active
                ? "bg-gradient-brand text-white shadow-glass"
                : "text-brand-muted hover:text-brand-teal-deep"
            )}
          >
            {localeLabel[loc]}
          </Link>
        );
      })}
      <span className="sr-only">{`Switch to ${localeLabel[oppositeLocale[locale]]}`}</span>
    </div>
  );
}
