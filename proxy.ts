import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { defaultLocale, locales, type Locale } from "@/lib/i18n";
import { updateAdminSession } from "@/lib/supabase/proxy";

const LOCALE_COOKIE = "NEXT_LOCALE";

/**
 * Looks up an active row in the `redirects` table for this exact,
 * non-localized pathname (e.g. "/old-services" — see the column comment on
 * supabase/migrations/0004_global_settings.sql). A plain anon client is
 * enough since "read active redirects" is a public RLS policy; returns null
 * (no redirect) when unconfigured, unreachable, or no row matches.
 */
async function findRedirect(pathname: string): Promise<{ to: string; status: number } | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) return null;
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    const { data } = await supabase
      .from("redirects")
      .select("to_path, status_code")
      .eq("from_path", pathname)
      .eq("is_active", true)
      .maybeSingle();
    return data ? { to: data.to_path, status: data.status_code } : null;
  } catch {
    return null;
  }
}

function getPreferredLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && (locales as readonly string[]).includes(cookieLocale)) {
    return cookieLocale as Locale;
  }

  const acceptLanguage = request.headers.get("accept-language") ?? "";
  const preferred = acceptLanguage
    .split(",")
    .map((entry) => entry.split(";")[0]?.trim().toLowerCase().slice(0, 2))
    .find((lang) => lang && (locales as readonly string[]).includes(lang));

  return (preferred as Locale) ?? defaultLocale;
}

// Runs before rendering. `/admin/*` is a separate, unlocalized zone — it goes
// through Supabase session refresh + the signed-in check. Everything else:
// bare paths (e.g. "/", "/services") are redirected to their localized
// equivalent ("/en/services"); paths that already carry a locale pass through.
// (Next 16 renames `middleware.ts` to `proxy.ts`.)
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return updateAdminSession(request);
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  const redirect = await findRedirect(pathname);
  if (redirect) {
    const url = request.nextUrl.clone();
    url.pathname = redirect.to;
    return NextResponse.redirect(url, redirect.status);
  }

  const locale = getPreferredLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  const response = NextResponse.redirect(url);
  response.cookies.set(LOCALE_COOKIE, locale, { path: "/", maxAge: 60 * 60 * 24 * 365 });
  return response;
}

export const config = {
  matcher: [
    // Skip Next.js internals, API routes and files with an extension.
    "/((?!_next|api|.*\\..*).*)",
  ],
};
