import { getAdminWhyItems } from "@/lib/cms/adminQueries";
import { CollectionManager, type FieldConfig } from "@/components/admin/CollectionManager";

const fields: FieldConfig[] = [
  { key: "icon", label: "Icon name", type: "text" },
  { key: "title", label: "Title", type: "text", bilingual: true, required: true },
  { key: "text", label: "Text", type: "textarea", bilingual: true, required: true },
];

export default async function AdminWhyPage() {
  const rows = await getAdminWhyItems();
  return (
    <CollectionManager
      table="why_items"
      title="Why Dr. Walid Moussa Points"
      description="The icon/title/text points on the About page's 'Why Dr. Walid Moussa?' section. The section's own heading/description/image is edited under Pages → About Dr. Walid Moussa."
      fields={fields}
      rows={rows}
      hasFeatured={false}
      emptyRow={{ icon: "shield", is_active: true }}
    />
  );
}
