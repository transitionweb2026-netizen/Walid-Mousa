/**
 * Hand-written types mirroring supabase/migrations exactly. Verified
 * field-for-field against the live project's `information_schema.columns`
 * after migrations 0001–0013 were applied (2026-09-11) — zero drift, all 38
 * tables match exactly. `npx supabase gen types typescript --db-url <url>`
 * would regenerate this file, but that command shells out to Docker in the
 * current CLI and none was available here; the Supabase Dashboard's
 * Project Settings → API page also has a copy-pasteable generated-types
 * panel if you want the CLI-generated version later. Insert/Update are typed
 * loosely as Partial<Row> here — RLS policies and NOT NULL / CHECK
 * constraints (supabase/migrations) are the real write-safety boundary, not
 * these types (see app/admin/actions/collections.ts).
 */

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

type SeoCols = {
  seo_title_en: string | null;
  seo_title_ar: string | null;
  meta_description_en: string | null;
  meta_description_ar: string | null;
  canonical_url: string | null;
  og_title_en: string | null;
  og_title_ar: string | null;
  og_description_en: string | null;
  og_description_ar: string | null;
  og_image_id: string | null;
  is_indexed: boolean;
  is_followed: boolean;
  updated_at: string;
};
type Stamps = { created_at: string; updated_at: string };
type Orderable = { display_order: number; is_active: boolean };

type Table<Row> = {
  Row: Row;
  Insert: Partial<Row> & Record<string, unknown>;
  Update: Partial<Row> & Record<string, unknown>;
  Relationships: never[];
};

export interface Database {
  public: {
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
    Tables: {
      profiles: Table<{
        id: string;
        email: string;
        full_name: string | null;
        role: "admin" | "editor";
      } & Stamps>;

      media: Table<{
        id: string;
        bucket_id: "media" | "video-covers" | "videos" | null;
        storage_path: string | null;
        external_url: string | null;
        file_name: string;
        mime_type: string;
        file_size: number | null;
        kind: "image" | "video" | "document";
        category:
          | "doctor" | "hero" | "services" | "conditions" | "treatments"
          | "surgeries" | "technologies" | "certificates" | "career"
          | "expertise" | "videos" | "articles" | "reviews" | "gallery"
          | "general" | "seo";
        alt_text_en: string | null;
        alt_text_ar: string | null;
        width: number | null;
        height: number | null;
        duration_seconds: number | null;
        uploaded_by: string | null;
      } & Stamps>;

      site_settings: Table<{
        id: true;
        website_title: string;
        website_url: string;
        org_name_en: string; org_name_ar: string;
        doctor_specialty_en: string; doctor_specialty_ar: string;
        doctor_credentials_en: string; doctor_credentials_ar: string;
        logo_media_id: string | null;
        favicon_media_id: string | null;
        apple_touch_icon_media_id: string | null;
        default_meta_description_en: string | null;
        default_meta_description_ar: string | null;
        default_og_image_id: string | null;
        default_language: "en" | "ar";
        default_robots: string;
        updated_at: string;
      }>;

      navbar_settings: Table<{
        id: true;
        appointment_label_en: string; appointment_label_ar: string;
        appointment_url: string;
        show_language_switcher: boolean;
        updated_at: string;
      }>;

      footer_settings: Table<{
        id: true;
        tagline_en: string | null; tagline_ar: string | null;
        quick_links_title_en: string; quick_links_title_ar: string;
        contact_title_en: string; contact_title_ar: string;
        hours_title_en: string; hours_title_ar: string;
        copyright_en: string; copyright_ar: string;
        credit_label_en: string; credit_label_ar: string; credit_url: string;
        privacy_note_en: string | null; privacy_note_ar: string | null;
        updated_at: string;
      }>;

      cta_settings: Table<{
        id: true;
        eyebrow_en: string; eyebrow_ar: string;
        heading_en: string; heading_ar: string;
        description_en: string | null; description_ar: string | null;
        primary_label_en: string; primary_label_ar: string;
        primary_is_whatsapp: boolean;
        primary_url: string;
        whatsapp_message_en: string; whatsapp_message_ar: string;
        secondary_label_en: string; secondary_label_ar: string;
        secondary_url: string;
        background_image_id: string | null;
        is_visible: boolean;
        updated_at: string;
      }>;

      contact_settings: Table<{
        id: true;
        phone_display: string; phone_href: string;
        whatsapp_number: string;
        email: string;
        address_en: string; address_ar: string;
        address_short_en: string; address_short_ar: string;
        working_hours: Json;
        map_embed_url: string; map_link_url: string; map_directions_url: string;
        location_image_id: string | null;
        location_image_alt_en: string | null;
        location_image_alt_ar: string | null;
        updated_at: string;
      }>;

      contact_form_settings: Table<{
        id: true;
        title_en: string; title_ar: string;
        description_en: string | null; description_ar: string | null;
        field_labels: Json;
        topic_options: Json;
        submit_label_en: string; submit_label_ar: string;
        actions_note_en: string | null; actions_note_ar: string | null;
        required_message_en: string; required_message_ar: string;
        invalid_phone_en: string; invalid_phone_ar: string;
        fix_errors_en: string; fix_errors_ar: string;
        success_message_en: string; success_message_ar: string;
        whatsapp_template_en: string; whatsapp_template_ar: string;
        updated_at: string;
      }>;

      not_found_settings: Table<{
        id: true;
        code: string;
        heading_en: string; heading_ar: string;
        description_en: string; description_ar: string;
        primary_label_en: string; primary_label_ar: string; primary_url: string;
        secondary_label_en: string; secondary_label_ar: string; secondary_url: string;
        image_id: string | null;
        updated_at: string;
      }>;

      ui_strings: Table<{ id: true; strings: Json; updated_at: string }>;

      navigation_items: Table<{
        id: string;
        label_en: string; label_ar: string;
        url: string;
      } & Orderable & Stamps>;

      social_links: Table<{
        id: string;
        platform: "phone" | "whatsapp" | "facebook" | "instagram" | "youtube" | "tiktok" | "twitter" | "linkedin";
        label_en: string; label_ar: string;
        value: string;
        icon: string;
      } & Orderable & Stamps>;

      redirects: Table<{
        id: string;
        from_path: string;
        to_path: string;
        status_code: 301 | 302;
        is_active: boolean;
      } & Stamps>;

      pages: Table<{
        id: string;
        slug: string;
        name_en: string; name_ar: string;
        display_order: number;
      } & Stamps>;

      page_sections: Table<{
        id: string;
        page_id: string;
        section_type: string;
        display_order: number;
        is_visible: boolean;
        content: Json;
      } & Stamps>;

      page_seo: Table<{
        id: string;
        page_id: string;
        twitter_title_en: string | null; twitter_title_ar: string | null;
        twitter_description_en: string | null; twitter_description_ar: string | null;
        twitter_image_id: string | null;
        created_at: string;
      } & SeoCols>;

      conditions: Table<{
        id: string;
        slug: string;
        icon: string;
        title_en: string; title_ar: string;
        tagline_en: string; tagline_ar: string;
        short_description_en: string; short_description_ar: string;
        full_description_en: string[]; full_description_ar: string[];
        signs_en: string[]; signs_ar: string[];
        image_id: string | null;
        image_alt_en: string | null; image_alt_ar: string | null;
        is_featured: boolean;
      } & Orderable & Stamps>;

      condition_seo: Table<{ id: string; condition_id: string } & SeoCols>;

      treatments: Table<{
        id: string;
        slug: string;
        icon: string;
        title_en: string; title_ar: string;
        short_description_en: string; short_description_ar: string;
        full_description_en: string[]; full_description_ar: string[];
        bullets: Json;
        footnote: Json | null;
        image_id: string | null;
        image_alt_en: string | null; image_alt_ar: string | null;
        cta_label_en: string | null; cta_label_ar: string | null; cta_url: string | null;
        is_featured: boolean;
      } & Orderable & Stamps>;

      treatment_seo: Table<{ id: string; treatment_id: string } & SeoCols>;

      condition_treatments: Table<{
        condition_id: string;
        treatment_id: string;
        display_order: number;
        created_at: string;
      }>;

      surgeries: Table<{
        id: string;
        slug: string;
        icon: string;
        title_en: string; title_ar: string;
        short_description_en: string; short_description_ar: string;
        full_description_en: string[]; full_description_ar: string[];
        benefits_en: string[]; benefits_ar: string[];
        recovery_en: string | null; recovery_ar: string | null;
        image_id: string | null;
        image_alt_en: string | null; image_alt_ar: string | null;
        is_featured: boolean;
      } & Orderable & Stamps>;

      surgery_seo: Table<{ id: string; surgery_id: string } & SeoCols>;

      technologies: Table<{
        id: string;
        slug: string;
        icon: string;
        name_en: string; name_ar: string;
        explanation_en: string; explanation_ar: string;
        details_en: string[]; details_ar: string[];
        image_id: string | null;
        image_alt_en: string | null; image_alt_ar: string | null;
      } & Orderable & Stamps>;

      statistics: Table<{
        id: string;
        icon: string;
        value: number;
        prefix: string; suffix: string;
        label_en: string; label_ar: string;
        description_en: string | null; description_ar: string | null;
      } & Orderable & Stamps>;

      certificates: Table<{
        id: string;
        image_id: string | null;
        image_alt_en: string | null; image_alt_ar: string | null;
        title_en: string; title_ar: string;
        institution_en: string; institution_ar: string;
        year: string;
        description_en: string | null; description_ar: string | null;
      } & Orderable & Stamps>;

      career_items: Table<{
        id: string;
        year: string;
        kind: "role" | "education";
        icon: string;
        position_en: string; position_ar: string;
        institution_en: string; institution_ar: string;
        description_en: string | null; description_ar: string | null;
        image_id: string | null;
      } & Orderable & Stamps>;

      expertise_areas: Table<{
        id: string;
        icon: string;
        image_id: string | null;
        image_alt_en: string | null; image_alt_ar: string | null;
        title_en: string; title_ar: string;
        description_en: string; description_ar: string;
        is_featured: boolean;
      } & Orderable & Stamps>;

      why_items: Table<{
        id: string;
        icon: string;
        title_en: string; title_ar: string;
        text_en: string; text_ar: string;
      } & Orderable & Stamps>;

      journey_steps: Table<{
        id: string;
        step_number: number;
        icon: string;
        title_en: string; title_ar: string;
        description_en: string; description_ar: string;
      } & Orderable & Stamps>;

      reviews: Table<{
        id: string;
        display_name: string;
        context_en: string; context_ar: string;
        rating: number;
        quote_en: string; quote_ar: string;
        image_id: string | null;
        video_media_id: string | null;
        is_featured: boolean;
      } & Orderable & Stamps>;

      other_services: Table<{
        id: string;
        icon: string;
        title_en: string; title_ar: string;
        text_en: string; text_ar: string;
      } & Orderable & Stamps>;

      gallery_images: Table<{
        id: string;
        image_id: string | null;
        image_alt_en: string | null; image_alt_ar: string | null;
        caption_en: string | null; caption_ar: string | null;
      } & Orderable & Stamps>;

      contact_assurances: Table<{
        id: string;
        icon: string;
        title_en: string; title_ar: string;
        text_en: string; text_ar: string;
      } & Orderable & Stamps>;

      videos: Table<{
        id: string;
        slug: string;
        title_en: string; title_ar: string;
        description_en: string | null; description_ar: string | null;
        category_en: string | null; category_ar: string | null;
        cover_media_id: string | null;
        cover_alt_en: string | null; cover_alt_ar: string | null;
        video_media_id: string | null;
        external_url: string | null;
        youtube_id: string | null;
        aspect: "portrait" | "landscape";
        duration_label: string | null;
        display_order: number;
        status: "draft" | "published";
        is_featured: boolean;
        published_at: string;
      } & Stamps>;

      articles: Table<{
        id: string;
        slug: string;
        title_en: string; title_ar: string;
        excerpt_en: string | null; excerpt_ar: string | null;
        content_en: Json | null; content_ar: Json | null;
        image_id: string | null;
        image_alt_en: string | null; image_alt_ar: string | null;
        category_en: string | null; category_ar: string | null;
        author: string;
        read_time_minutes: number;
        status: "draft" | "published" | "archived";
        is_featured: boolean;
        display_order: number;
        published_at: string | null;
      } & Stamps>;

      article_seo: Table<{ id: string; article_id: string } & SeoCols>;

      faqs: Table<{
        id: string;
        question_en: string; question_ar: string;
        answer_en: string; answer_ar: string;
        scope: "all" | "home" | "services";
      } & Orderable & Stamps>;
    };
  };
}

export type Tables<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Row"];
export type TablesInsert<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Insert"];
export type TablesUpdate<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Update"];
