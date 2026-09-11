import { getAdminFaqs } from "@/lib/cms/adminQueries";
import { CollectionManager, type FieldConfig } from "@/components/admin/CollectionManager";

const fields: FieldConfig[] = [
  { key: "scope", label: "Show on", type: "select", options: [
    { value: "all", label: "Home and Services" },
    { value: "home", label: "Home only" },
    { value: "services", label: "Services only" },
  ] },
  { key: "question", label: "Question", type: "text", bilingual: true, required: true },
  { key: "answer", label: "Answer", type: "textarea", bilingual: true, required: true },
];

export default async function AdminFaqsPage() {
  const rows = await getAdminFaqs();
  return (
    <CollectionManager
      table="faqs"
      title="FAQs"
      description="Shared between Home and Services — set 'Show on' per question rather than duplicating."
      fields={fields}
      rows={rows}
      hasFeatured={false}
      titleField="question"
      emptyRow={{ scope: "all", is_active: true }}
    />
  );
}
