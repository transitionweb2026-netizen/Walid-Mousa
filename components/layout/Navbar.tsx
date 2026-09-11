"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/icons/Icon";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";
import type { NavbarSettings, SiteBranding, ContactInfo } from "@/lib/cms/publicSettings";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface NavbarProps {
  locale: Locale;
  nav: NavbarSettings;
  branding: SiteBranding;
  contact: ContactInfo;
}

export function Navbar({ locale, nav, branding, contact }: NavbarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const localeRoot = `/${locale}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path: string) => {
    const full = path ? `${localeRoot}/${path}` : localeRoot;
    if (path === "") return pathname === full;
    return pathname === full || pathname.startsWith(`${full}/`);
  };

  const menuLabel = locale === "ar" ? "افتح القائمة" : "Open menu";

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <nav
        aria-label="Primary"
        className={cn(
          "glass-panel mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-2xl px-4 transition-all duration-300 sm:px-6",
          scrolled ? "py-2 shadow-glass-lg" : "py-3"
        )}
      >
        <Link href={localeRoot} className="group flex items-center gap-2.5">
          <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-glass">
            <span className="font-heading text-sm font-black">{branding.orgName.en.replace(/^Dr\.\s*/, "").charAt(0) || "W"}</span>
            <span aria-hidden className="glow-teal absolute -inset-1 -z-10 rounded-2xl opacity-50" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-heading text-[0.95rem] font-extrabold text-brand-ink sm:text-base">
              {branding.orgName[locale]}
            </span>
            <span className="hidden text-[0.66rem] font-medium text-brand-muted sm:block">
              {branding.credentials[locale]}
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {nav.items.map((item) => {
            const active = isActive(item.path);
            const href = item.path ? `${localeRoot}/${item.path}` : localeRoot;
            return (
              <li key={item.key} className="relative">
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative block rounded-full px-3.5 py-2 text-sm font-semibold transition-colors duration-300",
                    active ? "text-brand-teal-deep" : "text-brand-ink-soft hover:text-brand-teal-deep"
                  )}
                >
                  {item.label[locale]}
                  {active && (
                    <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-brand-teal shadow-[0_0_10px_var(--color-brand-teal)]" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          {nav.showLanguageSwitcher && <LanguageSwitcher locale={locale} />}
          <Button href={`${localeRoot}${nav.appointmentUrl}`} size="sm">
            {nav.appointmentLabel[locale]}
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          {nav.showLanguageSwitcher && <LanguageSwitcher locale={locale} />}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={menuLabel}
            aria-expanded={open}
            className="glass-panel inline-flex h-10 w-10 items-center justify-center rounded-xl text-brand-ink transition-transform active:scale-95"
          >
            <Icon name="menu" className="h-5 w-5" />
          </button>
        </div>
      </nav>

      <MobileMenu
        open={open}
        onClose={() => setOpen(false)}
        locale={locale}
        isActive={isActive}
        nav={nav}
        branding={branding}
        contact={contact}
      />
    </header>
  );
}
