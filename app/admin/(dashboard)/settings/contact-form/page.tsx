import { getContactFormSettingsAdmin } from "@/lib/cms/adminSettingsQueries";
import { SettingsForm } from "@/components/admin/SettingsForm";
import type { FieldConfig } from "@/components/admin/CollectionManager";

const fields: FieldConfig[] = [
  { key: "field_labels", label: "Field Labels & Placeholders (JSON — see help)", type: "json", help: '{ "fullName": {"label":{"en":"...","ar":"..."},"placeholder":{...}}, "phone": {...}, "topic": {"label":{...}}, "preferredTime": {...}, "message": {...} }' },
  { key: "topic_options", label: "\"What is it about?\" Options (JSON — see help)", type: "json", help: '[{ "value": "general", "label": {"en":"General enquiry","ar":"استفسار عام"} }, ...]' },
  { key: "title", label: "Form Title", type: "text", bilingual: true },
  { key: "description", label: "Form Description", type: "textarea", bilingual: true },
  { key: "submit_label", label: "Submit Button Label", type: "text", bilingual: true },
  { key: "actions_note", label: "Note Under the Buttons", type: "textarea", bilingual: true },
  { key: "required_message", label: "\"Required\" Validation Message", type: "text", bilingual: true },
  { key: "invalid_phone", label: "\"Invalid Phone\" Validation Message", type: "text", bilingual: true },
  { key: "fix_errors", label: "\"Please Fix\" Summary Message", type: "text", bilingual: true },
  { key: "success_message", label: "Success Message", type: "textarea", bilingual: true },
  { key: "whatsapp_template", label: "WhatsApp Message Template (use {{name}} {{phone}} {{topic}} {{time}} {{message}})", type: "textarea", bilingual: true },
];

export default async function AdminContactFormPage() {
  const settings = await getContactFormSettingsAdmin();
  return (
    <SettingsForm
      table="contact_form_settings"
      title="Contact Form"
      description="Every label, validation message and the WhatsApp template the Contact page's form submits."
      fields={fields}
      initialValues={settings ?? {}}
    />
  );
}
