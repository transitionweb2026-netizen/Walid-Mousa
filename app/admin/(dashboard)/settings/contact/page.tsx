import { getContactSettingsAdmin } from "@/lib/cms/adminSettingsQueries";
import { SettingsForm } from "@/components/admin/SettingsForm";
import type { FieldConfig } from "@/components/admin/CollectionManager";

const fields: FieldConfig[] = [
  { key: "phone_display", label: "Phone (display format, e.g. +20 100 000 0000)", type: "text" },
  { key: "phone_href", label: "Phone (tel: link, e.g. tel:+201000000000)", type: "url" },
  { key: "whatsapp_number", label: "WhatsApp Number (digits only, no + — e.g. 201000000000)", type: "text" },
  { key: "email", label: "Email", type: "text" },
];

export default async function AdminContactSettingsPage() {
  const settings = await getContactSettingsAdmin();
  return (
    <SettingsForm
      table="contact_settings"
      title="Contact Information"
      description="Phone, WhatsApp and email — shared across every clinic location. For addresses, hours and maps, see Content → Clinic Locations."
      fields={fields}
      initialValues={settings ?? {}}
    />
  );
}
