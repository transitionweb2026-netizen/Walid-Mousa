import { getAdminStatistics } from "@/lib/cms/adminQueries";
import { CollectionManager, type FieldConfig } from "@/components/admin/CollectionManager";

const fields: FieldConfig[] = [
  { key: "icon", label: "Icon name", type: "text" },
  { key: "value", label: "Number", type: "number", required: true },
  { key: "prefix", label: "Prefix (rarely used)", type: "text" },
  { key: "suffix", label: "Suffix (e.g. \"+\", \"%\")", type: "text" },
  { key: "label", label: "Label", type: "text", bilingual: true, required: true },
  { key: "description", label: "Description (optional)", type: "textarea", bilingual: true },
];

export default async function AdminStatisticsPage() {
  const rows = await getAdminStatistics();
  return (
    <CollectionManager
      table="statistics"
      title="Statistics"
      description="Shared verbatim by Home and About — animated counters, no duplication."
      fields={fields}
      rows={rows}
      hasFeatured={false}
      emptyRow={{ icon: "experience", value: 0, prefix: "", suffix: "+", is_active: true }}
    />
  );
}
