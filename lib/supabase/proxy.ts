import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Runs inside the root proxy.ts for every /admin request. Two jobs:
 *  1. Refresh the Supabase auth cookie (must happen in proxy — a Server
 *     Component alone cannot write cookies, see lib/supabase/server.ts).
 *  2. Redirect signed-out visitors away from any /admin/* page except the
 *     login page itself, and signed-in users away from the login page.
 *
 * This is the redirect gate for "unauthenticated users must not access the
 * CMS" — RLS (supabase/migrations) is what actually protects the DATA even if
 * this were ever bypassed, and app/admin/(dashboard)/layout.tsx re-checks.
 *
 * If Supabase isn't configured yet, every /admin request is bounced to the
 * login page (which renders a "connect Supabase first" message).
 */
export async function updateAdminSession(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === "/admin/login";

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    if (isLoginPage) return NextResponse.next({ request });
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          for (const { name, value } of cookiesToSet) {
            request.cookies.set(name, value);
          }
          response = NextResponse.next({ request });
          for (const { name, value, options } of cookiesToSet) {
            response.cookies.set(name, value, options);
          }
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !isLoginPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (user && isLoginPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return response;
}
