"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface ActionResult {
  ok: boolean;
  error?: string;
}

/** page_seo has one row per page (unique page_id) rather than a fixed id=true singleton. */
export async function updatePageSeo(pageId: string, patch: Record<string, unknown>): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.from("page_seo").update(patch as never).eq("page_id", pageId);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/", "layout");
  return { ok: true };
}

const ITEM_SEO_TABLES = ["condition_seo", "treatment_seo", "surgery_seo", "article_seo"] as const;
export type ItemSeoTable = (typeof ITEM_SEO_TABLES)[number];
const FK_COLUMN: Record<ItemSeoTable, string> = {
  condition_seo: "condition_id",
  treatment_seo: "treatment_id",
  surgery_seo: "surgery_id",
  article_seo: "article_id",
};

/** condition_seo / treatment_seo / surgery_seo / article_seo each have one row per item (unique FK) — upsert since a row may not exist yet. */
export async function upsertItemSeo(table: string, itemId: string, patch: Record<string, unknown>): Promise<ActionResult> {
  if (!(ITEM_SEO_TABLES as readonly string[]).includes(table)) {
    return { ok: false, error: `"${table}" is not an item SEO table.` };
  }
  const seoTable = table as ItemSeoTable;
  const fk = FK_COLUMN[seoTable];
  const supabase = await createClient();
  const { error } = await supabase.from(seoTable).upsert({ [fk]: itemId, ...patch } as never, { onConflict: fk });
  if (error) return { ok: false, error: error.message };

  revalidatePath("/", "layout");
  return { ok: true };
}
