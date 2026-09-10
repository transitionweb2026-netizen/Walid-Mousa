"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface NavLeaf {
  label: string;
  href: string;
}
interface NavGroup {
  label: string;
  items: NavLeaf[];
}

const PAGES: NavLeaf[] = [
  { label: "Home", href: "/admin/pages/home" },
  { label: "About Dr. Walid Moussa", href: "/admin/pages/about" },
  { label: "Services", href: "/admin/pages/services" },
  { label: "Videos", href: "/admin/pages/videos" },
  { label: "Articles", href: "/admin/pages/articles" },
  { label: "Contact Us", href: "/admin/pages/contact" },
];

const CONTENT: NavLeaf[] = [
  { label: "Conditions / Problems", href: "/admin/content/conditions" },
  { label: "Treatments", href: "/admin/content/treatments" },
  { label: "Condition → Treatment links", href: "/admin/content/condition-treatments" },
  { label: "Surgeries", href: "/admin/content/surgeries" },
  { label: "Technologies", href: "/admin/content/technologies" },
  { label: "Certificates", href: "/admin/content/certificates" },
  { label: "Career Journey", href: "/admin/content/career" },
  { label: "Areas of Expertise", href: "/admin/content/expertise" },
  { label: "Why Dr. Walid Moussa Points", href: "/admin/content/why" },
  { label: "Patient Journey Steps", href: "/admin/content/journey" },
  { label: "Statistics", href: "/admin/content/statistics" },
  { label: "Patient Reviews", href: "/admin/content/reviews" },
  { label: "FAQs", href: "/admin/content/faqs" },
  { label: "Videos", href: "/admin/content/videos" },
  { label: "Articles", href: "/admin/content/articles" },
  { label: "Other Services", href: "/admin/content/other-services" },
  { label: "Clinic Gallery", href: "/admin/content/gallery" },
  { label: "Contact Assurances", href: "/admin/content/assurances" },
];

const SETTINGS: NavLeaf[] = [
  { label: "Navbar", href: "/admin/settings/navbar" },
  { label: "Footer", href: "/admin/settings/footer" },
  { label: "Final CTA", href: "/admin/settings/cta" },
  { label: "Contact Information", href: "/admin/settings/contact" },
  { label: "Contact Form", href: "/admin/settings/contact-form" },
  { label: "Social Media", href: "/admin/settings/social" },
  { label: "UI Strings", href: "/admin/settings/ui-strings" },
  { label: "404 Page", href: "/admin/settings/not-found" },
  { label: "Website Settings", href: "/admin/settings/website" },
];

const SEO: NavLeaf[] = [
  { label: "Global SEO", href: "/admin/seo/global" },
  { label: "Page SEO", href: "/admin/seo/pages" },
  { label: "Condition SEO", href: "/admin/seo/conditions" },
  { label: "Treatment SEO", href: "/admin/seo/treatments" },
  { label: "Surgery SEO", href: "/admin/seo/surgeries" },
  { label: "Article SEO", href: "/admin/seo/articles" },
];

const GROUPS: NavGroup[] = [
  { label: "Pages", items: PAGES },
  { label: "Content", items: CONTENT },
  { label: "Global Settings", items: SETTINGS },
  { label: "SEO", items: SEO },
  { label: "Redirects", items: [{ label: "Redirects", href: "/admin/redirects" }] },
];

function NavLink({ item, onNavigate }: { item: NavLeaf; onNavigate?: () => void }) {
  const pathname = usePathname();
  const active = pathname === item.href;
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        "block rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-gradient-brand text-white shadow-glass"
          : "text-brand-muted hover:bg-white/60 hover:text-brand-ink"
      )}
    >
      {item.label}
    </Link>
  );
}

function Group({ group, onNavigate }: { group: NavGroup; onNavigate?: () => void }) {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-3 py-2 text-xs font-bold uppercase tracking-wider text-brand-ink-soft"
      >
        {group.label}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && <div className="flex flex-col gap-0.5">{group.items.map((item) => <NavLink key={item.href} item={item} onNavigate={onNavigate} />)}</div>}
    </div>
  );
}

function Nav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      <Link href="/admin" onClick={onNavigate} className="mb-4 block px-3 py-2">
        <span className="text-sm font-extrabold text-brand-ink">Dr. Walid Moussa</span>
        <span className="block text-xs text-brand-muted">CMS Dashboard</span>
      </Link>
      <NavLink item={{ label: "Dashboard", href: "/admin" }} onNavigate={onNavigate} />
      <NavLink item={{ label: "Media Library", href: "/admin/media" }} onNavigate={onNavigate} />
      <div className="my-2 border-t border-brand-line/70" />
      {GROUPS.map((group) => (
        <Group key={group.label} group={group} onNavigate={onNavigate} />
      ))}
    </>
  );
}

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <>
      {/* Desktop */}
      <aside className="glass-panel hidden w-64 shrink-0 flex-col gap-1 overflow-y-auto rounded-none border-e p-4 lg:flex">
        <Nav />
      </aside>

      {/* Mobile trigger */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="glass-panel fixed bottom-4 end-4 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full text-brand-ink shadow-glass-lg lg:hidden"
        aria-label="Open menu"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-brand-ink/40" onClick={() => setMobileOpen(false)} />
          <aside className="glass-card-strong absolute inset-y-0 start-0 flex w-72 max-w-[85%] flex-col gap-1 overflow-y-auto p-4">
            <button type="button" onClick={() => setMobileOpen(false)} className="mb-2 self-end text-sm text-brand-muted">
              Close
            </button>
            <Nav onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}
    </>
  );
}
