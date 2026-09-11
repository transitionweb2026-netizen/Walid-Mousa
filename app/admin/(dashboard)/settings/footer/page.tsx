import { getFooterSettingsAdmin } from "@/lib/cms/adminSettingsQueries";
import { SettingsForm } from "@/components/admin/SettingsForm";
import type { FieldConfig } from "@/components/admin/CollectionManager";

const fields: FieldConfig[] = [
  { key: "credit_url", label: "\"Crafted by Transition\" link URL (optional)", type: "url" },
  { key: "tagline", label: "Tagline", type: "textarea", bilingual: true },
  { key: "quick_links_title", label: "\"Quick Links\" Column Title", type: "text", bilingual: true },
  { key: "contact_title", label: "\"Get in Touch\" Column Title", type: "text", bilingual: true },
  { key: "hours_title", label: "\"Clinic Hours\" Column Title", type: "text", bilingual: true },
  { key: "copyright", label: "Copyright Line", type: "text", bilingual: true },
  { key: "credit_label", label: "Credit Label", type: "text", bilingual: true },
  { key: "privacy_note", label: "Privacy Note", type: "textarea", bilingual: true },
];

export default async function AdminFooterPage() {
  const settings = await getFooterSettingsAdmin();
  return <SettingsForm table="footer_settings" title="Footer" fields={fields} initialValues={settings ?? {}} />;
}
