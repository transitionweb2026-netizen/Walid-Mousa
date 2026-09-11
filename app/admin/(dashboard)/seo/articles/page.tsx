import { getItemsWithSeo } from "@/lib/cms/adminSeoQueries";
import { ItemSeoManager } from "@/components/admin/ItemSeoManager";

export default async function AdminArticleSeoPage() {
  const items = await getItemsWithSeo("articles", "article_seo");
  return (
    <div>
      <h1 className="text-xl font-bold text-brand-ink">Article SEO</h1>
      <p className="mt-1 text-sm text-brand-muted">SEO title, meta description, canonical URL, OG image and index/follow for each article.</p>
      <div className="mt-6">
        <ItemSeoManager table="article_seo" items={items.map((i) => ({ id: i.id, titleEn: i.titleEn, seo: i.seo }))} />
      </div>
    </div>
  );
}
