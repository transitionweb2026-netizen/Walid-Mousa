import { getCtaSettingsAdmin } from "@/lib/cms/adminSettingsQueries";
import { SettingsForm } from "@/components/admin/SettingsForm";
import type { FieldConfig } from "@/components/admin/CollectionManager";

const fields: FieldConfig[] = [
  { key: "is_visible", label: "Show this CTA", type: "boolean", help: "Visible on every page" },
  { key: "background_image_id", label: "Optional Background Image", type: "media", mediaCategory: "general" },
  { key: "primary_is_whatsapp", label: "Primary Button Behaviour", type: "boolean", help: "Opens WhatsApp with the message below (uncheck to use the Primary URL instead)" },
  { key: "primary_url", label: "Primary URL (used only if not WhatsApp)", type: "url" },
  { key: "secondary_url", label: "Secondary Button URL", type: "url" },
  { key: "eyebrow", label: "Eyebrow", type: "text", bilingual: true },
  { key: "heading", label: "Heading", type: "text", bilingual: true },
  { key: "description", label: "Description", type: "textarea", bilingual: true },
  { key: "primary_label", label: "Primary Button Label", type: "text", bilingual: true },
  { key: "whatsapp_message", label: "Pre-filled WhatsApp Message", type: "textarea", bilingual: true },
  { key: "secondary_label", label: "Secondary Button Label", type: "text", bilingual: true },
];

export default async function AdminCtaPage() {
  const settings = await getCtaSettingsAdmin();
  return (
    <SettingsForm table="cta_settings" title="Final CTA" description="The ONE glass CTA card shown at the bottom of every page." fields={fields} initialValues={settings ?? {}} />
  );
}
