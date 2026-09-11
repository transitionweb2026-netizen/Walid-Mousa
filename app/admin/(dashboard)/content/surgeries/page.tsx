import { getAdminSurgeries } from "@/lib/cms/adminQueries";
import { CollectionManager, type FieldConfig } from "@/components/admin/CollectionManager";

const fields: FieldConfig[] = [
  { key: "slug", label: "Slug", type: "text", required: true },
  { key: "icon", label: "Icon name", type: "text" },
  { key: "image_id", label: "Card Image", type: "media", mediaCategory: "surgeries" },
  { key: "image_alt", label: "Image Alt Text", type: "text", bilingual: true },
  { key: "title", label: "Title", type: "text", bilingual: true, required: true },
  { key: "short_description", label: "Short Description (card)", type: "textarea", bilingual: true, required: true },
  { key: "full_description", label: "Full Description Paragraphs (popup — one per line)", type: "stringArray", bilingual: true },
  { key: "benefits", label: "Key Benefits (popup bullets — one per line)", type: "stringArray", bilingual: true },
  { key: "recovery", label: "Recovery Note", type: "text", bilingual: true },
];

export default async function AdminSurgeriesPage() {
  const rows = await getAdminSurgeries();
  return (
    <CollectionManager
      table="surgeries"
      title="Surgeries"
      description="Home's 'Important Surgeries' section shows the ones marked Featured; the Services page's #surgeries section shows the full list."
      fields={fields}
      rows={rows}
      hasFeatured
      emptyRow={{ slug: "", icon: "procedure", is_active: true, is_featured: true }}
    />
  );
}
