import type { Localized } from "@/lib/types";

export interface NavItem {
  key: string;
  label: Localized;
  /** Path relative to the locale root, e.g. "" for home, "about" for /about. */
  path: string;
}

/** Primary navigation, shared by the Navbar, MobileMenu and Footer. */
export const navigationItems: NavItem[] = [
  { key: "home", label: { en: "Home", ar: "الرئيسية" }, path: "" },
  { key: "about", label: { en: "About Doctor", ar: "عن الدكتور" }, path: "about" },
  { key: "services", label: { en: "Services", ar: "الخدمات" }, path: "services" },
  { key: "videos", label: { en: "Videos", ar: "الفيديوهات" }, path: "videos" },
  { key: "articles", label: { en: "Articles", ar: "المقالات" }, path: "articles" },
  { key: "contact", label: { en: "Contact Us", ar: "تواصل معنا" }, path: "contact" },
];
