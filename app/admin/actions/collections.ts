"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

/**
 * One generic, table-agnostic set of CRUD actions backing every "Content"
 * collection screen. Safe specifically BECAUSE authorization lives in
 * Postgres RLS (supabase/migrations — every table's "manage" policy), not in
 * this code: the table name is never trusted as a capability, it's just
 * routing. A non-admin session gets a database-level permission error on
 * every one of these calls — this layer only moves data and revalidates.
 */
const ALLOWED_TABLES = [
  "conditions",
  "condition_seo",
  "treatments",
  "treatment_seo",
  "surgeries",
  "surgery_seo",
  "technologies",
  "statistics",
  "certificates",
  "career_items",
  "expertise_areas",
  "why_items",
  "journey_steps",
  "reviews",
  "other_services",
  "gallery_images",
  "contact_assurances",
  "videos",
  "articles",
  "article_seo",
  "faqs",
  "navigation_items",
  "social_links",
  "redirects",
] as const;

export type CollectionTable = (typeof ALLOWED_TABLES)[number];

function assertAllowed(table: string): asserts table is CollectionTable {
  if (!(ALLOWED_TABLES as readonly string[]).includes(table)) {
    throw new Error(`"${table}" is not an editable CMS collection.`);
  }
}

export interface ActionResult {
  ok: boolean;
  error?: string;
  id?: string;
}

export async function upsertCollectionRow(table: string, values: Record<string, unknown>): Promise<ActionResult> {
  assertAllowed(table);
  const supabase = await createClient();

  const { id, ...patch } = values as { id?: string } & Record<string, unknown>;

  // `table` is a runtime-dynamic union — Supabase's per-table Insert/Update
  // types can't be statically verified against a generic patch object here.
  // Authorization and column validity are enforced by Postgres RLS and
  // NOT NULL / CHECK constraints (supabase/migrations), the real boundary.
  const query = id
    ? supabase.from(table).update(patch as never).eq("id", id).select("id").single()
    : supabase.from(table).insert(patch as never).select("id").single();

  const { data, error } = await query;
  if (error) return { ok: false, error: error.message };

  revalidateCollection(table);
  return { ok: true, id: (data as { id?: string } | null)?.id };
}

export async function deleteCollectionRow(table: string, id: string): Promise<ActionResult> {
  assertAllowed(table);
  const supabase = await createClient();

  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) return { ok: false, error: error.message };

  revalidateCollection(table);
  return { ok: true };
}

export async function reorderCollectionRows(table: string, orderedIds: string[]): Promise<ActionResult> {
  assertAllowed(table);
  const supabase = await createClient();

  const updates = orderedIds.map((id, index) =>
    supabase.from(table).update({ display_order: index + 1 } as never).eq("id", id)
  );
  const results = await Promise.all(updates);
  const failed = results.find((r) => r.error);
  if (failed?.error) return { ok: false, error: failed.error.message };

  revalidateCollection(table);
  return { ok: true };
}

export async function toggleCollectionField(table: string, id: string, field: string, value: boolean): Promise<ActionResult> {
  assertAllowed(table);
  const supabase = await createClient();

  const { error } = await supabase.from(table).update({ [field]: value } as never).eq("id", id);
  if (error) return { ok: false, error: error.message };

  revalidateCollection(table);
  return { ok: true };
}

/** Revalidates every public route that could show this table's data. */
function revalidateCollection(table: CollectionTable) {
  revalidatePath("/", "layout");
  const pathsByTable: Partial<Record<CollectionTable, string[]>> = {
    conditions: ["/[locale]", "/[locale]/services", "/[locale]/about"],
    condition_seo: ["/[locale]/services"],
    treatments: ["/[locale]/services"],
    treatment_seo: ["/[locale]/services"],
    surgeries: ["/[locale]", "/[locale]/services"],
    surgery_seo: ["/[locale]/services"],
    technologies: ["/[locale]", "/[locale]/services"],
    statistics: ["/[locale]", "/[locale]/about"],
    certificates: ["/[locale]/about"],
    career_items: ["/[locale]/about"],
    expertise_areas: ["/[locale]/about"],
    why_items: ["/[locale]/about"],
    journey_steps: ["/[locale]"],
    reviews: ["/[locale]"],
    other_services: ["/[locale]/services"],
    gallery_images: ["/[locale]/about"],
    contact_assurances: ["/[locale]/contact"],
    videos: ["/[locale]", "/[locale]/videos"],
    articles: ["/[locale]", "/[locale]/articles"],
    article_seo: ["/[locale]/articles"],
    faqs: ["/[locale]", "/[locale]/services"],
    navigation_items: ["/[locale]"],
    social_links: ["/[locale]", "/[locale]/contact"],
    redirects: ["/[locale]"],
  };
  for (const path of pathsByTable[table] ?? []) {
    revalidatePath(path, "page");
  }
}
