import { getAdminAchievementItems } from "@/lib/cms/adminQueries";
import { CollectionManager, type FieldConfig } from "@/components/admin/CollectionManager";

const fields: FieldConfig[] = [
  { key: "icon", label: "Icon name", type: "text" },
  { key: "title", label: "Title", type: "text", bilingual: true, required: true },
  { key: "text", label: "Text", type: "textarea", bilingual: true, required: true },
];

export default async function AdminAchievementsPage() {
  const rows = await getAdminAchievementItems();
  return (
    <CollectionManager
      table="achievement_items"
      title="Recognition / Achievements"
      description="The icon/title/text cards on the About page's 'Recognition' section. The section's own heading/description is edited under Pages → About Dr. Walid Moussa."
      fields={fields}
      rows={rows}
      hasFeatured={false}
      emptyRow={{ icon: "award", is_active: true }}
    />
  );
}
