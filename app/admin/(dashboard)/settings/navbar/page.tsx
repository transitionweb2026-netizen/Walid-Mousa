import { getNavbarSettingsAdmin } from "@/lib/cms/adminSettingsQueries";
import { getAdminNavigationItems } from "@/lib/cms/adminQueries";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { CollectionManager, type FieldConfig } from "@/components/admin/CollectionManager";

const settingsFields: FieldConfig[] = [
  { key: "appointment_url", label: "Appointment Button URL", type: "url" },
  { key: "appointment_label", label: "Appointment Button Label", type: "text", bilingual: true },
];

const navFields: FieldConfig[] = [
  { key: "url", label: "URL (e.g. /about, /)", type: "url", required: true },
  { key: "label", label: "Label", type: "text", bilingual: true, required: true },
];

export default async function AdminNavbarPage() {
  const [settings, navItems] = await Promise.all([getNavbarSettingsAdmin(), getAdminNavigationItems()]);
  return (
    <SettingsForm
      table="navbar_settings"
      title="Navbar"
      description="The appointment button, plus the navigation links shared by the Navbar, Mobile Menu and Footer."
      fields={settingsFields}
      initialValues={settings ?? {}}
    >
      <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-brand-ink-soft">Navigation Links</h2>
      <CollectionManager table="navigation_items" fields={navFields} rows={navItems} hasActive hasFeatured={false} titleField="label" emptyRow={{ url: "/", is_active: true }} />
    </SettingsForm>
  );
}
