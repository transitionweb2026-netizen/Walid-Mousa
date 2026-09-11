import { createClient } from "@/lib/supabase/server";
import type { MediaRow } from "@/lib/cms/media";
import type { ItemSeoTable } from "@/app/admin/actions/pageSeo";

// Joined by hand (two plain `select("*")` queries + an in-memory match)
// rather than PostgREST's `alias:media!fk(*)` embed syntax — that syntax's
// TypeScript support statically parses the select string against each
// table's `Relationships` metadata, which the hand-written types.ts doesn't
// populate. A real `supabase gen types` run will let this simplify.
export async function getAllPagesWithSeo() {
  const supabase = await createClient();
  const [{ data: pages }, { data: seo }, { data: media }] = await Promise.all([
    supabase.from("pages").select("*").order("display_order"),
    supabase.from("page_seo").select("*"),
    supabase.from("media").select("*"),
  ]);

  const mediaById = new Map((media ?? []).map((m) => [m.id, m]));

  return (pages ?? []).map((page) => {
    const seoRow = (seo ?? []).find((s) => s.page_id === page.id) ?? null;
    const og_image_id: MediaRow | null = seoRow?.og_image_id ? (mediaById.get(seoRow.og_image_id) ?? null) : null;
    return { page, seo: seoRow ? { ...seoRow, og_image_id } : null };
  });
}

const FK_COLUMN: Record<ItemSeoTable, string> = {
  condition_seo: "condition_id",
  treatment_seo: "treatment_id",
  surgery_seo: "surgery_id",
  article_seo: "article_id",
};

/** items: [{ id, title_en }] for the parent table (conditions/treatments/surgeries/articles). */
export async function getItemsWithSeo(
  itemsTable: "conditions" | "treatments" | "surgeries" | "articles",
  seoTable: ItemSeoTable
) {
  const supabase = await createClient();
  const [{ data: items }, { data: seo }] = await Promise.all([
    supabase.from(itemsTable).select("id, title_en").order("display_order"),
    supabase.from(seoTable).select("*"),
  ]);
  const fk = FK_COLUMN[seoTable];
  return (items ?? []).map((item) => ({
    id: item.id as string,
    titleEn: (item.title_en as string) ?? "(untitled)",
    seo: (seo ?? []).find((s) => (s as Record<string, unknown>)[fk] === item.id) ?? null,
  }));
}
