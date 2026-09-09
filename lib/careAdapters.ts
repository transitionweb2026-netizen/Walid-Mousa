import type { CareCardData } from "@/components/cards/CareCard";
import type { CareDetailItem } from "@/components/cards/CareDetailModal";
import type { SurgeryItem } from "@/data/surgeries";
import type { TreatmentItem } from "@/data/treatments";
import type { TechnologyItem } from "@/data/technologies";
import { siteContent } from "@/data/site";

const recoveryLabel = { en: "Recovery", ar: "التعافي" };

export function surgeryToCard(s: SurgeryItem): CareCardData {
  return { icon: s.icon, image: s.image, title: s.title, description: s.shortDescription };
}

export function surgeryToDetail(s: SurgeryItem): CareDetailItem {
  return {
    icon: s.icon,
    image: s.image,
    title: s.title,
    description: s.shortDescription,
    paragraphs: s.details,
    sections: [{ label: siteContent.actions.keyBenefits, items: s.benefits, tone: "teal" }],
    footnote: { label: recoveryLabel, value: s.recovery },
  };
}

export function treatmentToCard(t: TreatmentItem): CareCardData {
  return { icon: t.icon, image: t.image, title: t.title, description: t.shortDescription };
}

export function treatmentToDetail(t: TreatmentItem): CareDetailItem {
  return {
    icon: t.icon,
    image: t.image,
    title: t.title,
    description: t.shortDescription,
    paragraphs: t.details,
    sections: [
      { label: siteContent.actions.commonSigns, items: t.signs, tone: "pink" },
      { label: { en: "How it's treated", ar: "كيف يُعالَج" }, items: t.options, tone: "teal" },
    ],
  };
}

export function technologyToCard(t: TechnologyItem): CareCardData {
  return { icon: t.icon, image: t.image, title: t.name, description: t.explanation };
}

export function technologyToDetail(t: TechnologyItem): CareDetailItem {
  return {
    icon: t.icon,
    image: t.image,
    title: t.name,
    description: t.explanation,
    paragraphs: t.details,
    sections: [],
  };
}
