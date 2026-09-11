import { getItemsWithSeo } from "@/lib/cms/adminSeoQueries";
import { ItemSeoManager } from "@/components/admin/ItemSeoManager";

export default async function AdminConditionSeoPage() {
  const items = await getItemsWithSeo("conditions", "condition_seo");
  return (
    <div>
      <h1 className="text-xl font-bold text-brand-ink">Condition SEO</h1>
      <p className="mt-1 text-sm text-brand-muted">SEO title, meta description, canonical URL, OG image and index/follow for each condition.</p>
      <div className="mt-6">
        <ItemSeoManager table="condition_seo" items={items.map((i) => ({ id: i.id, titleEn: i.titleEn, seo: i.seo }))} />
      </div>
    </div>
  );
}
