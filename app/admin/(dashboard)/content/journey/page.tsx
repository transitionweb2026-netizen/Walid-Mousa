import { getAdminJourneySteps } from "@/lib/cms/adminQueries";
import { CollectionManager, type FieldConfig } from "@/components/admin/CollectionManager";

const fields: FieldConfig[] = [
  { key: "step_number", label: "Step Number (the badge shown on the node)", type: "number", required: true },
  { key: "icon", label: "Icon name", type: "text" },
  { key: "title", label: "Title", type: "text", bilingual: true, required: true },
  { key: "description", label: "Description", type: "textarea", bilingual: true, required: true },
];

export default async function AdminJourneyPage() {
  const rows = await getAdminJourneySteps();
  return (
    <CollectionManager
      table="journey_steps"
      title="Patient Journey Steps"
      description="The horizontal (desktop) / vertical (mobile) patient-journey timeline on Home."
      fields={fields}
      rows={rows}
      hasFeatured={false}
      emptyRow={{ step_number: 1, icon: "consultation", is_active: true }}
    />
  );
}
