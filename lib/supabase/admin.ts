import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

/**
 * SERVICE-ROLE client — bypasses Row Level Security entirely.
 *
 * The `server-only` import makes any accidental import from a Client
 * Component a BUILD ERROR. Every routine CMS read/write must go through the
 * user's own authenticated session (lib/supabase/server.ts or client.ts) and
 * the RLS policies in supabase/migrations — NOT this file. It exists only for
 * the tiny number of operations RLS can't express, e.g. creating the first
 * admin user (`auth.admin.createUser`) from a one-off script.
 *
 * SUPABASE_SERVICE_ROLE_KEY must never be prefixed with NEXT_PUBLIC_ and must
 * never reach the browser.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "createAdminClient(): NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must both be set."
    );
  }

  return createSupabaseClient<Database>(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
