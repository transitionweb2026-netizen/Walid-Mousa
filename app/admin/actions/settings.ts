"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const SINGLETON_TABLES = [
  "site_settings",
  "navbar_settings",
  "footer_settings",
  "cta_settings",
  "contact_settings",
  "contact_form_settings",
  "not_found_settings",
  "ui_strings",
] as const;
export type SettingsTable = (typeof SINGLETON_TABLES)[number];

export interface ActionResult {
  ok: boolean;
  error?: string;
}

/** Updates the single row of a singleton settings table (id = true). */
export async function updateSettings(table: string, patch: Record<string, unknown>): Promise<ActionResult> {
  if (!(SINGLETON_TABLES as readonly string[]).includes(table)) {
    return { ok: false, error: `"${table}" is not a settings table.` };
  }
  const supabase = await createClient();
  const { error } = await supabase.from(table as SettingsTable).update(patch as never).eq("id", true);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/", "layout");
  return { ok: true };
}
