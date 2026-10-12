import { getAdminClinicLocations } from "@/lib/cms/adminQueries";
import { CollectionManager, type FieldConfig } from "@/components/admin/CollectionManager";

const fields: FieldConfig[] = [
  { key: "slug", label: "Slug (unique, e.g. \"nasr-city\")", type: "text", required: true },
  { key: "name", label: "Location Name", type: "text", bilingual: true, required: true },
  { key: "address", label: "Full Address", type: "textarea", bilingual: true, required: true },
  { key: "address_short", label: "Short Address (shown in the footer)", type: "text", bilingual: true, required: true },
  { key: "notes", label: "Notes (e.g. entrance instructions)", type: "text", bilingual: true },
  {
    key: "working_hours",
    label: "Working Hours (JSON)",
    type: "json",
    help: 'Array of { "day": {"en":"...","ar":"..."}, "hours": {"en":"...","ar":"..."}, "closed": false }',
  },
  {
    key: "map_embed_url",
    label: "Google Maps Embed URL (leave blank to show a placeholder panel)",
    type: "url",
    help: "Google Maps → Share → Embed a map → copy the src=\"...\" URL. A share link (maps.app.goo.gl) won't work here — it has to be an embed URL.",
  },
  { key: "map_link_url", label: "\"Open in Maps\" URL", type: "url" },
  { key: "map_directions_url", label: "\"Get Directions\" URL", type: "url" },
];

export default async function AdminClinicLocationsPage() {
  const rows = await getAdminClinicLocations();
  return (
    <CollectionManager
      table="clinic_locations"
      title="Clinic Locations"
      description="Every physical clinic location. Each gets its own address, hours and map on the Contact page — the first one (by order) also appears in the footer."
      fields={fields}
      rows={rows}
      titleField="name"
      emptyRow={{ slug: "", working_hours: [], map_embed_url: "", map_link_url: "", map_directions_url: "", is_active: true }}
    />
  );
}
