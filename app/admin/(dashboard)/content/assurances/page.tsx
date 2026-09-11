import { getAdminContactAssurances } from "@/lib/cms/adminQueries";
import { CollectionManager, type FieldConfig } from "@/components/admin/CollectionManager";

const fields: FieldConfig[] = [
  { key: "icon", label: "Icon name", type: "text" },
  { key: "title", label: "Title", type: "text", bilingual: true, required: true },
  { key: "text", label: "Text", type: "textarea", bilingual: true, required: true },
];

export default async function AdminAssurancesPage() {
  const rows = await getAdminContactAssurances();
  return (
    <CollectionManager
      table="contact_assurances"
      title="Contact Assurances"
      description="The 3 small reassurance cards under the contact form ('Held in confidence', 'A quick reply', 'No obligation')."
      fields={fields}
      rows={rows}
      hasFeatured={false}
      emptyRow={{ icon: "lock", is_active: true }}
    />
  );
}
