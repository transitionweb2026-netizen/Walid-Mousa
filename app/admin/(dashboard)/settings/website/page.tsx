import { getSiteSettings } from "@/lib/cms/adminSettingsQueries";
import { SettingsForm } from "@/components/admin/SettingsForm";
import type { FieldConfig } from "@/components/admin/CollectionManager";

const fields: FieldConfig[] = [
  { key: "website_title", label: "Website Title", type: "text" },
  { key: "website_url", label: "Canonical Website URL", type: "url" },
  { key: "default_language", label: "Default Language", type: "select", options: [{ value: "en", label: "English" }, { value: "ar", label: "Arabic" }] },
  { key: "default_robots", label: "Default Robots Directive", type: "text", help: "e.g. index,follow" },
  { key: "logo_media_id", label: "Logo", type: "media", mediaCategory: "general" },
  { key: "favicon_media_id", label: "Favicon", type: "media", mediaCategory: "general" },
  { key: "apple_touch_icon_media_id", label: "Apple Touch Icon", type: "media", mediaCategory: "general" },
  { key: "default_og_image_id", label: "Default OG / Social Share Image", type: "media", mediaCategory: "seo" },
  { key: "org_name", label: "Doctor / Organization Name", type: "text", bilingual: true },
  { key: "doctor_specialty", label: "Doctor Specialty (long form)", type: "text", bilingual: true },
  { key: "doctor_credentials", label: "Doctor Credentials (short, shown under the name in the Navbar)", type: "text", bilingual: true },
  { key: "default_meta_description", label: "Default Meta Description", type: "textarea", bilingual: true },
];

export default async function AdminWebsiteSettingsPage() {
  const settings = await getSiteSettings();
  return (
    <SettingsForm
      table="site_settings"
      title="Website Settings"
      description="Brand identity and the sitewide SEO defaults every page falls back to."
      fields={fields}
      initialValues={settings ?? {}}
    />
  );
}
