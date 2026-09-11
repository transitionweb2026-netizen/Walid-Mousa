import { getAdminOtherServices } from "@/lib/cms/adminQueries";
import { CollectionManager, type FieldConfig } from "@/components/admin/CollectionManager";

const fields: FieldConfig[] = [
  { key: "icon", label: "Icon name", type: "text" },
  { key: "title", label: "Title", type: "text", bilingual: true, required: true },
  { key: "text", label: "Text", type: "textarea", bilingual: true, required: true },
];

export default async function AdminOtherServicesPage() {
  const rows = await getAdminOtherServices();
  return (
    <CollectionManager
      table="other_services"
      title="Other Services"
      description="The 'Beyond procedures and prescriptions' cards near the bottom of the Services page."
      fields={fields}
      rows={rows}
      hasFeatured={false}
      emptyRow={{ icon: "consultation", is_active: true }}
    />
  );
}
