import type { Localized, MediaImage } from "@/lib/types";
import type { IconName } from "@/components/icons/Icon";
import { IMG } from "./images";

export const aboutContent: {
  bio: {
    eyebrow: Localized;
    heading: Localized;
    paragraphs: Localized<string[]>;
    portrait: MediaImage;
    signatureName: Localized;
    signatureRole: Localized;
  };
  philosophy: {
    eyebrow: Localized;
    heading: Localized;
    points: { icon: IconName; title: Localized; text: Localized }[];
  };
  experience: {
    eyebrow: Localized;
    heading: Localized;
    items: { period: Localized; role: Localized; place: Localized; detail: Localized }[];
  };
  education: {
    eyebrow: Localized;
    heading: Localized;
    items: { year: Localized; title: Localized; place: Localized }[];
  };
  certifications: {
    eyebrow: Localized;
    heading: Localized;
    items: { title: Localized; issuer: Localized; image: MediaImage }[];
  };
  achievements: {
    eyebrow: Localized;
    heading: Localized;
    items: { icon: IconName; title: Localized; text: Localized }[];
  };
  gallery: {
    eyebrow: Localized;
    heading: Localized;
    images: MediaImage[];
  };
} = {
  bio: {
    eyebrow: { en: "Biography", ar: "السيرة الذاتية" },
    heading: {
      en: "A career built entirely around men's health",
      ar: "مسيرة مهنية بُنيت بالكامل حول صحة الرجل",
    },
    paragraphs: {
      en: [
        "Dr. Walid Moussa is a consultant andrologist and reproductive microsurgeon based in Giza, Egypt. He completed his medical degree and urology residency at Cairo University, then chose to sub-specialise entirely in andrology — the medicine of male reproductive, sexual and hormonal health — at a time when it was still a small field.",
        "That decision shaped everything since. Fellowship training in reproductive microsurgery in Europe gave him the operating-microscope skills that define his surgical practice today: varicocele repair, vasectomy reversal, and micro-TESE for men previously told fatherhood was impossible.",
        "Alongside the surgery, most of his week is spent in consultation — with men managing erectile dysfunction, couples working through infertility, and patients navigating the hormonal changes of midlife. He is known for explaining things plainly, for not rushing, and for treating subjects many find difficult to discuss as simply part of medicine.",
        "He teaches andrology to urology trainees, contributes to regional practice guidelines, and lectures regularly at fertility and men's-health meetings. His clinic is built around one principle: the same standard of care he would want for his own family, delivered with complete discretion.",
      ],
      ar: [
        "د. وليد موسى استشاري أمراض ذكورة وجرّاح ميكروسكوبي للخصوبة، مقرّه الجيزة بمصر. حصل على درجة الطب وأكمل الإقامة في جراحة المسالك البولية بجامعة القاهرة، ثم اختار التخصص الدقيق بالكامل في أمراض الذكورة — طب الصحة الإنجابية والجنسية والهرمونية للرجل — في وقت كان لا يزال مجالًا صغيرًا.",
        "هذا القرار شكّل كل ما تلاه. أتاح له التدريب التخصصي في الجراحة الميكروسكوبية للخصوبة في أوروبا مهارات المجهر الجراحي التي تُعرّف ممارسته الجراحية اليوم: إصلاح الدوالي، وعكس قطع الحبل المنوي، وميكرو-تيسي لرجال قيل لهم سابقًا إن الأبوة مستحيلة.",
        "إلى جانب الجراحة، يقضي معظم أسبوعه في الاستشارات — مع رجال يتعاملون مع ضعف الانتصاب، وأزواج يواجهون العقم، ومرضى يمرون بالتغيّرات الهرمونية في منتصف العمر. ويُعرف بشرحه البسيط، وعدم استعجاله، ومعاملته لمواضيع يجدها كثيرون صعبة النقاش كجزء طبيعي من الطب.",
        "يُدرّس أمراض الذكورة لأطباء المسالك البولية تحت التدريب، ويُسهم في إرشادات الممارسة الإقليمية، ويحاضر بانتظام في مؤتمرات الخصوبة وصحة الرجل. وعيادته مبنية على مبدأ واحد: نفس مستوى الرعاية الذي يتمناه لعائلته، مع سرية تامة.",
      ],
    },
    portrait: {
      src: IMG.doctorPortrait,
      alt: { en: "Portrait of Dr. Walid Moussa", ar: "صورة د. وليد موسى" },
      position: "center 20%",
    },
    signatureName: { en: "Dr. Walid Moussa", ar: "د. وليد موسى" },
    signatureRole: { en: "Consultant Andrologist & Reproductive Microsurgeon", ar: "استشاري أمراض الذكورة وجرّاح الخصوبة الميكروسكوبي" },
  },

  philosophy: {
    eyebrow: { en: "How I Work", ar: "أسلوبي في العمل" },
    heading: { en: "Three things every patient can expect", ar: "ثلاثة أشياء يتوقعها كل مريض" },
    points: [
      {
        icon: "lock",
        title: { en: "Absolute discretion", ar: "سرية مطلقة" },
        text: {
          en: "Discreet scheduling, confidential records, and nothing shared with anyone without your consent.",
          ar: "حجز بتكتّم، وسجلات سرية، ولا شيء يُشارك مع أحد دون موافقتك.",
        },
      },
      {
        icon: "diagnosis",
        title: { en: "Cause before treatment", ar: "السبب قبل العلاج" },
        text: {
          en: "The right tests, read properly, so the plan targets what's actually wrong — not just the symptom.",
          ar: "الفحوصات الصحيحة، مقروءة بدقة، لتستهدف الخطة ما هو خاطئ فعلًا — لا العرض فقط.",
        },
      },
      {
        icon: "consultation",
        title: { en: "Your decision", ar: "قرارك أنت" },
        text: {
          en: "Every option explained with its evidence and trade-offs. You choose the direction; I guide it.",
          ar: "كل خيار مشروح بدليله وموازناته. أنت تختار الاتجاه؛ وأنا أوجّهه.",
        },
      },
    ],
  },

  experience: {
    eyebrow: { en: "Professional Journey", ar: "المسيرة المهنية" },
    heading: { en: "Where the work has taken place", ar: "أين جرى العمل" },
    items: [
      {
        period: { en: "2015 — present", ar: "2015 — حتى الآن" },
        role: { en: "Consultant Andrologist", ar: "استشاري أمراض الذكورة" },
        place: { en: "Private Practice — Nile Medical Tower, Giza", ar: "عيادة خاصة — برج النيل الطبي، الجيزة" },
        detail: {
          en: "Full-time andrology and reproductive microsurgery practice, with a dedicated on-site andrology laboratory.",
          ar: "ممارسة متفرّغة لأمراض الذكورة والجراحة الميكروسكوبية للخصوبة، مع مختبر أمراض ذكورة مخصّص في الموقع.",
        },
      },
      {
        period: { en: "2012 — 2015", ar: "2012 — 2015" },
        role: { en: "Lecturer & Consultant, Andrology Unit", ar: "مدرّس واستشاري، وحدة أمراض الذكورة" },
        place: { en: "University Teaching Hospital, Cairo", ar: "المستشفى الجامعي التعليمي، القاهرة" },
        detail: {
          en: "Ran the male-infertility clinic and trained urology residents in microsurgical technique.",
          ar: "أدار عيادة عقم الرجال ودرّب أطباء المسالك البولية على التقنية الميكروسكوبية.",
        },
      },
      {
        period: { en: "2010 — 2012", ar: "2010 — 2012" },
        role: { en: "Clinical Fellow, Reproductive Microsurgery", ar: "زميل إكلينيكي، الجراحة الميكروسكوبية للخصوبة" },
        place: { en: "European Centre for Reproductive Medicine", ar: "المركز الأوروبي لطب الخصوبة" },
        detail: {
          en: "Sub-specialty training in varicocelectomy, vasal reconstruction and surgical sperm retrieval.",
          ar: "تدريب تخصصي دقيق في جراحة الدوالي وإعادة توصيل الحبل المنوي واستخلاص الحيوانات المنوية جراحيًا.",
        },
      },
      {
        period: { en: "2005 — 2010", ar: "2005 — 2010" },
        role: { en: "Residency, Urology", ar: "الإقامة، جراحة المسالك البولية" },
        place: { en: "Cairo University Hospitals", ar: "مستشفيات جامعة القاهرة" },
        detail: {
          en: "General urological surgery, with growing focus on andrology and men's health.",
          ar: "جراحة المسالك البولية العامة، مع تركيز متزايد على أمراض الذكورة وصحة الرجل.",
        },
      },
    ],
  },

  education: {
    eyebrow: { en: "Education", ar: "التعليم" },
    heading: { en: "Training and qualifications", ar: "التدريب والمؤهلات" },
    items: [
      { year: { en: "2014", ar: "2014" }, title: { en: "MD, Andrology & Reproductive Medicine", ar: "دكتوراه في أمراض الذكورة وطب الخصوبة" }, place: { en: "Cairo University", ar: "جامعة القاهرة" } },
      { year: { en: "2010", ar: "2010" }, title: { en: "Master of Urology (MSc)", ar: "ماجستير جراحة المسالك البولية" }, place: { en: "Cairo University", ar: "جامعة القاهرة" } },
      { year: { en: "2012", ar: "2012" }, title: { en: "Fellowship in Reproductive Microsurgery", ar: "زمالة في الجراحة الميكروسكوبية للخصوبة" }, place: { en: "European Centre for Reproductive Medicine", ar: "المركز الأوروبي لطب الخصوبة" } },
      { year: { en: "2004", ar: "2004" }, title: { en: "MBBCh, Bachelor of Medicine & Surgery", ar: "بكالوريوس الطب والجراحة" }, place: { en: "Cairo University, Faculty of Medicine", ar: "جامعة القاهرة، كلية الطب" } },
    ],
  },

  certifications: {
    eyebrow: { en: "Memberships & Certification", ar: "العضويات والاعتماد" },
    heading: { en: "Boards and societies", ar: "المجالس والجمعيات" },
    items: [
      { title: { en: "Board Certification in Andrology", ar: "شهادة البورد في أمراض الذكورة" }, issuer: { en: "Egyptian Board of Urology", ar: "البورد المصري لجراحة المسالك البولية" }, image: { src: IMG.lecture, alt: { en: "Board certification", ar: "شهادة البورد" } } },
      { title: { en: "Member", ar: "عضو" }, issuer: { en: "European Association of Urology (EAU)", ar: "الرابطة الأوروبية للمسالك البولية" }, image: { src: IMG.meeting, alt: { en: "EAU membership", ar: "عضوية الرابطة الأوروبية" } } },
      { title: { en: "Member", ar: "عضو" }, issuer: { en: "International Society for Sexual Medicine (ISSM)", ar: "الجمعية الدولية للطب الجنسي" }, image: { src: IMG.surgeryTeam, alt: { en: "ISSM membership", ar: "عضوية الجمعية الدولية للطب الجنسي" } } },
      { title: { en: "Member", ar: "عضو" }, issuer: { en: "American Society for Reproductive Medicine (ASRM)", ar: "الجمعية الأمريكية لطب الخصوبة" }, image: { src: IMG.labResearch, alt: { en: "ASRM membership", ar: "عضوية الجمعية الأمريكية لطب الخصوبة" } } },
      { title: { en: "Fellow", ar: "زميل" }, issuer: { en: "Middle East Society for Male Health", ar: "جمعية الشرق الأوسط لصحة الرجل" }, image: { src: IMG.doctorCorridor, alt: { en: "Society fellowship", ar: "زمالة الجمعية" } } },
    ],
  },

  achievements: {
    eyebrow: { en: "Recognition", ar: "التقدير" },
    heading: { en: "Contributions beyond the clinic", ar: "إسهامات خارج العيادة" },
    items: [
      {
        icon: "microscope",
        title: { en: "4,500+ microsurgical procedures", ar: "أكثر من 4,500 عملية ميكروسكوبية" },
        text: { en: "One of the highest reproductive-microsurgery volumes in the region.", ar: "من أعلى معدلات الجراحة الميكروسكوبية للخصوبة في المنطقة." },
      },
      {
        icon: "consultation",
        title: { en: "Teaching faculty", ar: "هيئة تدريس" },
        text: { en: "Trains urology residents in andrology and microsurgical technique.", ar: "يدرّب أطباء المسالك البولية على أمراض الذكورة والتقنية الميكروسكوبية." },
      },
      {
        icon: "plan",
        title: { en: "Guideline contributor", ar: "مساهم في الإرشادات" },
        text: { en: "Contributed to regional consensus statements on male infertility and TRT.", ar: "أسهم في بيانات التوافق الإقليمية حول عقم الرجال والعلاج بالتستوستيرون." },
      },
      {
        icon: "youtube",
        title: { en: "Public education", ar: "توعية عامة" },
        text: { en: "Regular talks and videos demystifying men's health for a general audience.", ar: "محاضرات وفيديوهات منتظمة تبسّط صحة الرجل للجمهور العام." },
      },
    ],
  },

  gallery: {
    eyebrow: { en: "Inside the Clinic", ar: "داخل العيادة" },
    heading: { en: "Where you'll be seen", ar: "أين ستتم رعايتك" },
    images: [
      { src: IMG.consultRoom, alt: { en: "Consultation room", ar: "غرفة الاستشارة" } },
      { src: IMG.operatingRoom, alt: { en: "Operating theatre", ar: "غرفة العمليات" } },
      { src: IMG.labCorridor, alt: { en: "Andrology laboratory", ar: "مختبر أمراض الذكورة" } },
      { src: IMG.doctorCorridor, alt: { en: "Clinic corridor", ar: "ممر العيادة" } },
      { src: IMG.corridor, alt: { en: "Diagnostic equipment", ar: "أجهزة التشخيص" } },
      { src: IMG.doctorScrubs, alt: { en: "Dr. Walid Moussa", ar: "د. وليد موسى" } },
    ],
  },
};
