import { getContactSettingsAdmin } from "@/lib/cms/adminSettingsQueries";
import { SettingsForm } from "@/components/admin/SettingsForm";
import type { FieldConfig } from "@/components/admin/CollectionManager";

const fields: FieldConfig[] = [
  { key: "phone_display", label: "Phone (display format, e.g. +20 100 000 0000)", type: "text" },
  { key: "phone_href", label: "Phone (tel: link, e.g. tel:+201000000000)", type: "url" },
  { key: "whatsapp_number", label: "WhatsApp Number (digits only, no + — e.g. 201000000000)", type: "text" },
  { key: "email", label: "Email", type: "text" },
  { key: "location_image_id", label: "Location Photo (optional)", type: "media", mediaCategory: "general" },
  { key: "location_image_alt_en", label: "Location Photo Alt (English)", type: "text" },
  { key: "location_image_alt_ar", label: "Location Photo Alt (Arabic)", type: "text" },
  { key: "map_embed_url", label: "Google Maps Embed URL (leave blank to show a placeholder panel)", type: "url", help: "Google Maps → Share → Embed a map → copy the src=\"...\" URL." },
  { key: "map_link_url", label: "\"Open in Maps\" URL", type: "url" },
  { key: "map_directions_url", label: "\"Get Directions\" URL", type: "url" },
  { key: "working_hours", label: "Working Hours (JSON — see help)", type: "json", help: 'Array of { "day": {"en":"...","ar":"..."}, "hours": {"en":"...","ar":"..."}, "closed": false }' },
  { key: "address", label: "Full Address", type: "textarea", bilingual: true },
  { key: "address_short", label: "Short Address (footer)", type: "text", bilingual: true },
];

export default async function AdminContactSettingsPage() {
  const settings = await getContactSettingsAdmin();
  return (
    <SettingsForm
      table="contact_settings"
      title="Contact Information"
      description="The single source of truth for phone, WhatsApp, email, address, hours and the map — read by the Navbar, Footer, Hero panel and Contact page."
      fields={fields}
      initialValues={settings ?? {}}
    />
  );
}
