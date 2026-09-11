import Link from "next/link";
import { getSiteSettings } from "@/lib/cms/adminSettingsQueries";
import { SettingsForm } from "@/components/admin/SettingsForm";
import type { FieldConfig } from "@/components/admin/CollectionManager";

const fields: FieldConfig[] = [
  { key: "default_robots", label: "Default Robots Directive", type: "text", help: "e.g. index,follow" },
  { key: "default_og_image_id", label: "Default OG / Social Share Image", type: "media", mediaCategory: "seo" },
  { key: "default_meta_description", label: "Default Meta Description (used when a page has none of its own)", type: "textarea", bilingual: true },
];

export default async function AdminGlobalSeoPage() {
  const settings = await getSiteSettings();
  return (
    <div>
      <SettingsForm
        table="site_settings"
        title="Global SEO"
        description="Sitewide SEO fallbacks. Per-page titles/descriptions live under SEO → Page SEO; logo/favicon live under Global Settings → Website Settings."
        fields={fields}
        initialValues={settings ?? {}}
      />
      <p className="mt-6 text-sm text-brand-muted">
        Looking for the favicon or logo?{" "}
        <Link href="/admin/settings/website" className="font-semibold text-brand-teal-deep hover:underline">
          Go to Website Settings →
        </Link>
      </p>
    </div>
  );
}
