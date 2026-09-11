import { getAdminRedirects } from "@/lib/cms/adminQueries";
import { CollectionManager, type FieldConfig } from "@/components/admin/CollectionManager";

const fields: FieldConfig[] = [
  { key: "from_path", label: "Old Path (root-relative, no locale, e.g. /old-services)", type: "url", required: true },
  { key: "to_path", label: "New Path (where it should redirect to)", type: "url", required: true },
  { key: "status_code", label: "Status Code (301 = permanent, 302 = temporary)", type: "number", required: true },
];

export default async function AdminRedirectsPage() {
  const rows = await getAdminRedirects();
  return (
    <CollectionManager
      table="redirects"
      title="Redirects"
      description="301/302 redirects applied automatically before locale routing — no code changes or redeploys needed."
      fields={fields}
      rows={rows}
      hasOrder={false}
      hasActive
      hasFeatured={false}
      titleField="from_path"
      emptyRow={{ from_path: "", to_path: "", status_code: 301, is_active: true }}
    />
  );
}
