import { getAdminTechnologies } from "@/lib/cms/adminQueries";
import { CollectionManager, type FieldConfig } from "@/components/admin/CollectionManager";

const fields: FieldConfig[] = [
  { key: "slug", label: "Slug", type: "text", required: true },
  { key: "icon", label: "Icon name", type: "text" },
  { key: "image_id", label: "Card Image", type: "media", mediaCategory: "technologies" },
  { key: "image_alt", label: "Image Alt Text", type: "text", bilingual: true },
  { key: "name", label: "Name", type: "text", bilingual: true, required: true },
  { key: "explanation", label: "Short Explanation (card)", type: "textarea", bilingual: true, required: true },
  { key: "details", label: "Full Details (popup — one per line)", type: "stringArray", bilingual: true },
];

export default async function AdminTechnologiesPage() {
  const rows = await getAdminTechnologies();
  return (
    <CollectionManager
      table="technologies"
      title="Technologies"
      description="Shown on Home and on the Services page's #technologies section. No Home CTA button by design."
      fields={fields}
      rows={rows}
      hasFeatured={false}
      emptyRow={{ slug: "", icon: "microscope", is_active: true }}
    />
  );
}
