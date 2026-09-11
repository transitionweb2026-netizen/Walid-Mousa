import { getAdminTreatments } from "@/lib/cms/adminQueries";
import { CollectionManager, type FieldConfig } from "@/components/admin/CollectionManager";

const fields: FieldConfig[] = [
  { key: "slug", label: "Slug", type: "text", required: true },
  { key: "icon", label: "Icon name", type: "text" },
  { key: "image_id", label: "Card Image", type: "media", mediaCategory: "treatments" },
  { key: "image_alt", label: "Image Alt Text", type: "text", bilingual: true },
  { key: "cta_url", label: "Optional CTA URL", type: "url" },
  { key: "bullets", label: "Bullet Sections (JSON — see help)", type: "json", help: 'Array of { "label": {"en":"...","ar":"..."}, "items": {"en":["..."],"ar":["..."]}, "tone": "teal"|"pink" }' },
  { key: "footnote", label: "Footnote (JSON, optional)", type: "json", help: 'null or { "label": {"en":"Recovery","ar":"التعافي"}, "value": {"en":"...","ar":"..."} }' },
  { key: "title", label: "Title", type: "text", bilingual: true, required: true },
  { key: "short_description", label: "Short Description (card)", type: "textarea", bilingual: true, required: true },
  { key: "full_description", label: "Full Description Paragraphs (popup — one per line)", type: "stringArray", bilingual: true },
  { key: "cta_label", label: "CTA Label", type: "text", bilingual: true },
];

export default async function AdminTreatmentsPage() {
  const rows = await getAdminTreatments();
  return (
    <CollectionManager
      table="treatments"
      title="Treatments"
      description="Every individual treatment route. Link each one to a condition under Content → Condition → Treatment Links so it appears in that condition's Services-page section."
      fields={fields}
      rows={rows}
      hasFeatured
      emptyRow={{ slug: "", icon: "procedure", bullets: [], footnote: null, is_active: true, is_featured: false }}
    />
  );
}
