import type { Localized, MediaVideo } from "@/lib/types";
import { IMG } from "./images";

export const doctorIntro: {
  eyebrow: Localized;
  heading: Localized;
  paragraphs: Localized<string[]>;
  highlights: { value: Localized; label: Localized }[];
  video: MediaVideo;
} = {
  eyebrow: { en: "Meet Your Doctor", ar: "تعرّف على طبيبك" },
  heading: {
    en: "A calm, expert voice on questions most men hesitate to ask",
    ar: "صوت هادئ وخبير في أسئلة يتردد معظم الرجال في طرحها",
  },
  paragraphs: {
    en: [
      "Dr. Walid Moussa has spent his career focused entirely on andrology — the branch of medicine concerned with male reproductive and sexual health. That focus means faster answers, fewer unnecessary tests, and treatment plans shaped by thousands of similar cases.",
      "His approach is deliberately unhurried: a private conversation first, a clear explanation of what is happening and why, and only then a plan you choose together. Microsurgery, when it is needed, is performed with the same precision he would want for his own family.",
    ],
    ar: [
      "كرّس د. وليد موسى مسيرته بالكامل لأمراض الذكورة — فرع الطب المعني بالصحة الإنجابية والجنسية للرجل. هذا التركيز يعني إجابات أسرع، وفحوصات أقل بلا داعٍ، وخطط علاج مبنية على آلاف الحالات المشابهة.",
      "أسلوبه هادئ عن قصد: حوار خاص أولًا، ثم شرح واضح لما يحدث ولماذا، وبعد ذلك فقط خطة تختارها معًا. وتُجرى الجراحة الميكروسكوبية، عند الحاجة إليها، بنفس الدقة التي يتمناها لأفراد عائلته.",
    ],
  },
  highlights: [
    { value: { en: "18+", ar: "+18" }, label: { en: "Years in andrology", ar: "عامًا في أمراض الذكورة" } },
    { value: { en: "100%", ar: "100%" }, label: { en: "Confidential", ar: "سرية تامة" } },
    { value: { en: "Micro", ar: "ميكرو" }, label: { en: "Surgery trained", ar: "تدريب على الجراحة الدقيقة" } },
  ],
  video: {
    poster: {
      src: IMG.doctorScrubs,
      alt: {
        en: "Dr. Walid Moussa introduction video",
        ar: "فيديو تعريفي عن د. وليد موسى",
      },
    },
    // TODO: replace with Dr. Walid Moussa's real introduction video id
    // (the value after `v=` in the YouTube URL). Placeholder shown for now.
    youtubeId: "aqz-KE-bpKQ",
    aspect: "landscape",
    duration: "2:14",
  },
};
