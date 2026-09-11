import { getNotFoundSettingsAdmin } from "@/lib/cms/adminSettingsQueries";
import { SettingsForm } from "@/components/admin/SettingsForm";
import type { FieldConfig } from "@/components/admin/CollectionManager";

const fields: FieldConfig[] = [
  { key: "code", label: "Code (e.g. \"404\")", type: "text" },
  { key: "primary_url", label: "Primary Button URL", type: "url" },
  { key: "secondary_url", label: "Secondary Button URL", type: "url" },
  { key: "image_id", label: "Optional Image", type: "media", mediaCategory: "general" },
  { key: "heading", label: "Heading", type: "text", bilingual: true },
  { key: "description", label: "Description", type: "textarea", bilingual: true },
  { key: "primary_label", label: "Primary Button Label", type: "text", bilingual: true },
  { key: "secondary_label", label: "Secondary Button Label", type: "text", bilingual: true },
];

export default async function AdminNotFoundPage() {
  const settings = await getNotFoundSettingsAdmin();
  return <SettingsForm table="not_found_settings" title="404 Page" fields={fields} initialValues={settings ?? {}} />;
}
