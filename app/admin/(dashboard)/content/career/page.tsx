import { getAdminCareerItems } from "@/lib/cms/adminQueries";
import { CollectionManager, type FieldConfig } from "@/components/admin/CollectionManager";

const fields: FieldConfig[] = [
  { key: "year", label: "Year / Period (e.g. \"2015 — present\")", type: "text", required: true },
  { key: "kind", label: "Kind", type: "select", options: [{ value: "role", label: "Career role" }, { value: "education", label: "Education / degree" }] },
  { key: "icon", label: "Icon name", type: "text" },
  { key: "image_id", label: "Optional Image", type: "media", mediaCategory: "career" },
  { key: "position", label: "Position / Degree Title", type: "text", bilingual: true, required: true },
  { key: "institution", label: "Institution", type: "text", bilingual: true, required: true },
  { key: "description", label: "Description (optional)", type: "textarea", bilingual: true },
];

export default async function AdminCareerPage() {
  const rows = await getAdminCareerItems();
  return (
    <CollectionManager
      table="career_items"
      title="Career Journey"
      description="The alternating timeline on the About page — merges career roles and education, sorted by year."
      fields={fields}
      rows={rows}
      hasFeatured={false}
      titleField="position"
      emptyRow={{ year: "", kind: "role", icon: "procedure", is_active: true }}
    />
  );
}
