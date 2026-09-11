import { getItemsWithSeo } from "@/lib/cms/adminSeoQueries";
import { ItemSeoManager } from "@/components/admin/ItemSeoManager";

export default async function AdminTreatmentSeoPage() {
  const items = await getItemsWithSeo("treatments", "treatment_seo");
  return (
    <div>
      <h1 className="text-xl font-bold text-brand-ink">Treatment SEO</h1>
      <p className="mt-1 text-sm text-brand-muted">SEO title, meta description, canonical URL, OG image and index/follow for each treatment.</p>
      <div className="mt-6">
        <ItemSeoManager table="treatment_seo" items={items.map((i) => ({ id: i.id, titleEn: i.titleEn, seo: i.seo }))} />
      </div>
    </div>
  );
}
