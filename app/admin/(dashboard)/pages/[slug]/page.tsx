import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SectionEditor } from "@/components/admin/SectionEditor";
import type { MediaRow } from "@/lib/cms/media";

const URL_TO_SLUG: Record<string, string> = {
  home: "",
  about: "about",
  services: "services",
  videos: "videos",
  articles: "articles",
  contact: "contact",
};

const MEDIA_KEYS = ["image_id", "image_mobile_id", "video_cover_media_id", "video_media_id", "portrait_media_id", "portrait_layer_1_media_id", "portrait_layer_2_media_id"];

export default async function AdminPageEditorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: urlSlug } = await params;
  if (!(urlSlug in URL_TO_SLUG)) notFound();
  const dbSlug = URL_TO_SLUG[urlSlug];

  const supabase = await createClient();
  const { data: page } = await supabase.from("pages").select("*").eq("slug", dbSlug).single();
  if (!page) notFound();

  const { data: sections } = await supabase.from("page_sections").select("*").eq("page_id", page.id).order("display_order");

  const ids = new Set<string>();
  for (const s of sections ?? []) {
    const content = (s.content ?? {}) as Record<string, unknown>;
    for (const key of MEDIA_KEYS) {
      const v = content[key];
      if (typeof v === "string") ids.add(v);
    }
  }
  const mediaMap: Record<string, MediaRow> = {};
  if (ids.size > 0) {
    const { data: media } = await supabase.from("media").select("*").in("id", [...ids]);
    for (const m of media ?? []) mediaMap[m.id] = m;
  }

  return (
    <div>
      <h1 className="text-xl font-bold uppercase tracking-wide text-brand-ink">{page.name_en}</h1>
      <p className="mt-1 text-sm text-brand-muted">
        Sections below appear in the exact order they render on the live page. The Final CTA at the bottom of every page
        is edited once, globally, under Global Settings → Final CTA.
      </p>

      <div className="mt-6 flex flex-col gap-3">
        {(sections ?? []).map((section) => (
          <SectionEditor
            key={section.id}
            id={section.id}
            sectionType={section.section_type}
            displayOrder={section.display_order}
            initialContent={(section.content as Record<string, unknown>) ?? {}}
            initialVisible={section.is_visible}
            initialMedia={mediaMap}
          />
        ))}
        {(sections ?? []).length === 0 && (
          <p className="glass-panel rounded-xl p-6 text-center text-sm text-brand-muted">
            No sections found for this page yet — run <code>npm run seed</code> to populate them.
          </p>
        )}
      </div>
    </div>
  );
}
