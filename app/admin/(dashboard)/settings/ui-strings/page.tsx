import { getUiStringsAdmin } from "@/lib/cms/adminSettingsQueries";
import { SettingsForm } from "@/components/admin/SettingsForm";
import type { FieldConfig } from "@/components/admin/CollectionManager";

const fields: FieldConfig[] = [
  {
    key: "strings",
    label: "Shared Micro-Labels (JSON)",
    type: "json",
    help:
      'Every small label used sitewide — buttons, "min read", "View Details", search placeholders, aria labels, skip-link, etc. — as { "key": {"en":"...","ar":"..."} }. Advanced: keep the shape the same as the existing keys.',
  },
];

export default async function AdminUiStringsPage() {
  const settings = await getUiStringsAdmin();
  return (
    <SettingsForm
      table="ui_strings"
      title="UI Strings"
      description="Every shared, sitewide micro-label that isn't part of a specific page section. These rarely need to change, but nothing on the site is un-editable."
      fields={fields}
      initialValues={settings ?? {}}
    />
  );
}
