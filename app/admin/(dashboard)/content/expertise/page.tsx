import { getAdminExpertiseAreas } from "@/lib/cms/adminQueries";
import { CollectionManager, type FieldConfig } from "@/components/admin/CollectionManager";

const fields: FieldConfig[] = [
  { key: "icon", label: "Icon name", type: "text" },
  { key: "image_id", label: "Card Image", type: "media", mediaCategory: "expertise" },
  { key: "image_alt", label: "Image Alt Text", type: "text", bilingual: true },
  { key: "title", label: "Title", type: "text", bilingual: true, required: true },
  { key: "description", label: "Description", type: "textarea", bilingual: true, required: true },
];

export default async function AdminExpertisePage() {
  const rows = await getAdminExpertiseAreas();
  return (
    <CollectionManager
      table="expertise_areas"
      title="Areas of Expertise"
      description="The 4 cards on the About page's 'Areas of Expertise' section."
      fields={fields}
      rows={rows}
      hasFeatured
      emptyRow={{ icon: "vitality", is_active: true, is_featured: true }}
    />
  );
}
