import type { Localized, MediaImage } from "@/lib/types";
import type { IconName } from "@/components/icons/Icon";
import { IMG } from "./images";

export const aboutContent: {
  bio: {
    eyebrow: Localized;
    heading: Localized;
    paragraphs: Localized<string[]>;
    portrait: MediaImage;
    /** Layered behind the main portrait card — partially visible, offset. */
    portraitLayers: MediaImage[];
    highlight: { value: Localized; label: Localized };
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
    description: Localized;
    items: { title: Localized; issuer: Localized; year: Localized; image: MediaImage }[];
  };
  why: {
    eyebrow: Localized;
    heading: Localized;
    description: Localized;
    image: MediaImage;
    points: { icon: IconName; title: Localized; text: Localized }[];
  };
  expertise: {
    eyebrow: Localized;
    heading: Localized;
    description: Localized;
    items: { icon: IconName; image: MediaImage; title: Localized; description: Localized }[];
  };
  word: {
    eyebrow: Localized;
    heading: Localized;
    image: MediaImage;
    quote: Localized<string[]>;
    name: Localized;
    role: Localized;
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
    eyebrow: { en: "About Dr. Walid Moussa", ar: "عن د. وليد موسى" },
    heading: {
      en: "A career built entirely around men's health",
      ar: "مسيرة مهنية بُنيت بالكامل حول صحة الرجل",
    },
    portraitLayers: [
      { src: IMG.scrubsTeal, alt: { en: "Dr. Walid Moussa in the clinic", ar: "د. وليد موسى في العيادة" } },
      { src: IMG.doctorConsult, alt: { en: "Dr. Walid Moussa reviewing a scan", ar: "د. وليد موسى يراجع أشعة" } },
    ],
    highlight: {
      value: { en: "18+ years", ar: "+18 عامًا" },
      label: {
        en: "sub-specialised in andrology, microsurgery and men's sexual & reproductive health",
        ar: "من التخصص الدقيق في أمراض الذكورة والجراحة الميكروسكوبية والصحة الجنسية والإنجابية للرجل",
      },
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
    eyebrow: { en: "Certificates & Credentials", ar: "الشهادات والاعتمادات" },
    heading: { en: "Board certification and international membership", ar: "اعتماد البورد والعضويات الدولية" },
    description: {
      en: "Formal qualifications and the professional bodies whose standards guide the clinic's practice.",
      ar: "المؤهلات الرسمية والهيئات المهنية التي توجّه معايير ممارسة العيادة.",
    },
    items: [
      { title: { en: "Board Certification in Andrology", ar: "شهادة البورد في أمراض الذكورة" }, issuer: { en: "Egyptian Board of Urology", ar: "البورد المصري لجراحة المسالك البولية" }, year: { en: "2014", ar: "2014" }, image: { src: IMG.lecture, alt: { en: "Board certification in andrology", ar: "شهادة البورد في أمراض الذكورة" } } },
      { title: { en: "Fellowship, Reproductive Microsurgery", ar: "زمالة الجراحة الميكروسكوبية للخصوبة" }, issuer: { en: "European Centre for Reproductive Medicine", ar: "المركز الأوروبي لطب الخصوبة" }, year: { en: "2012", ar: "2012" }, image: { src: IMG.surgeryTeam, alt: { en: "Microsurgery fellowship certificate", ar: "شهادة زمالة الجراحة الميكروسكوبية" } } },
      { title: { en: "Member", ar: "عضو" }, issuer: { en: "European Association of Urology (EAU)", ar: "الرابطة الأوروبية للمسالك البولية" }, year: { en: "2013", ar: "2013" }, image: { src: IMG.meeting, alt: { en: "EAU membership certificate", ar: "شهادة عضوية الرابطة الأوروبية" } } },
      { title: { en: "Member", ar: "عضو" }, issuer: { en: "International Society for Sexual Medicine (ISSM)", ar: "الجمعية الدولية للطب الجنسي" }, year: { en: "2015", ar: "2015" }, image: { src: IMG.labResearch, alt: { en: "ISSM membership certificate", ar: "شهادة عضوية الجمعية الدولية للطب الجنسي" } } },
      { title: { en: "Member", ar: "عضو" }, issuer: { en: "American Society for Reproductive Medicine (ASRM)", ar: "الجمعية الأمريكية لطب الخصوبة" }, year: { en: "2016", ar: "2016" }, image: { src: IMG.labCorridor, alt: { en: "ASRM membership certificate", ar: "شهادة عضوية الجمعية الأمريكية لطب الخصوبة" } } },
      { title: { en: "Fellow", ar: "زميل" }, issuer: { en: "Middle East Society for Male Health", ar: "جمعية الشرق الأوسط لصحة الرجل" }, year: { en: "2018", ar: "2018" }, image: { src: IMG.doctorCorridor, alt: { en: "Society fellowship certificate", ar: "شهادة زمالة الجمعية" } } },
    ],
  },

  why: {
    eyebrow: { en: "Why Dr. Walid Moussa?", ar: "لماذا د. وليد موسى؟" },
    heading: { en: "What patients say makes the difference", ar: "ما يقول المرضى إنه يصنع الفارق" },
    description: {
      en: "The reasons men choose this clinic — and travel to it — are consistent, and none of them are about marketing.",
      ar: "أسباب اختيار الرجال لهذه العيادة — وسفرهم إليها — ثابتة، ولا علاقة لأي منها بالدعاية.",
    },
    image: {
      src: IMG.doctorScrubs,
      alt: { en: "Dr. Walid Moussa", ar: "د. وليد موسى" },
      position: "center 20%",
    },
    points: [
      {
        icon: "microscope",
        title: { en: "A true sub-specialist", ar: "تخصص دقيق حقيقي" },
        text: {
          en: "Andrology is the whole practice, not a sideline — thousands of similar cases inform every plan.",
          ar: "أمراض الذكورة هي الممارسة بأكملها، لا نشاطًا جانبيًا — آلاف الحالات المشابهة توجّه كل خطة.",
        },
      },
      {
        icon: "lock",
        title: { en: "Discretion by design", ar: "خصوصية مصمَّمة" },
        text: {
          en: "Private scheduling, confidential records, and nothing discussed outside the room without your consent.",
          ar: "حجز خاص، وسجلات سرية، ولا شيء يُناقَش خارج الغرفة دون موافقتك.",
        },
      },
      {
        icon: "diagnosis",
        title: { en: "Cause before prescription", ar: "السبب قبل الوصفة" },
        text: {
          en: "The right tests, read properly, so treatment targets the actual problem — not just the symptom.",
          ar: "الفحوصات الصحيحة، مقروءة بدقة، ليستهدف العلاج المشكلة الفعلية — لا العرض فقط.",
        },
      },
      {
        icon: "microscope",
        title: { en: "Microsurgical precision", ar: "دقة الجراحة الميكروسكوبية" },
        text: {
          en: "European fellowship training and an operating microscope for varicocele, reversal and micro-TESE.",
          ar: "تدريب زمالة أوروبي ومجهر جراحي لجراحات الدوالي وعكس القطع وميكرو-تيسي.",
        },
      },
      {
        icon: "consultation",
        title: { en: "Unhurried consultations", ar: "استشارات غير متعجّلة" },
        text: {
          en: "Time to explain what is happening and why, and to answer every question before any decision.",
          ar: "وقت لشرح ما يحدث ولماذا، وللإجابة عن كل سؤال قبل أي قرار.",
        },
      },
      {
        icon: "handshake",
        title: { en: "Care for the couple", ar: "رعاية للزوجين" },
        text: {
          en: "Fertility is a shared journey — partners are welcome, and joint appointments are encouraged.",
          ar: "الخصوبة رحلة مشتركة — الشريكات مُرحَّب بهنّ، والمواعيد المشتركة مُشجَّعة.",
        },
      },
    ],
  },

  expertise: {
    eyebrow: { en: "Areas of Expertise", ar: "مجالات الخبرة" },
    heading: { en: "Four fields, one focus", ar: "أربعة مجالات، تركيز واحد" },
    description: {
      en: "Every part of male reproductive and sexual health, handled under one roof by one specialist.",
      ar: "كل جانب من الصحة الإنجابية والجنسية للرجل، يُدار في مكان واحد على يد متخصص واحد.",
    },
    items: [
      {
        icon: "vitality",
        image: { src: IMG.handsRings, alt: { en: "Erectile and sexual health", ar: "صحة الانتصاب والصحة الجنسية" } },
        title: { en: "Erectile & Sexual Health", ar: "صحة الانتصاب والصحة الجنسية" },
        description: {
          en: "Erectile dysfunction, premature ejaculation and Peyronie's — from first-line therapy to shockwave, injections and implants.",
          ar: "ضعف الانتصاب وسرعة القذف ومرض بيروني — من العلاج الأولي إلى الموجات التصادمية والحقن والدعامات.",
        },
      },
      {
        icon: "fertility",
        image: { src: IMG.familyBaby, alt: { en: "Male fertility and microsurgery", ar: "خصوبة الرجل والجراحة الميكروسكوبية" } },
        title: { en: "Male Fertility & Microsurgery", ar: "خصوبة الرجل والجراحة الميكروسكوبية" },
        description: {
          en: "Full couple work-ups, microsurgical varicocelectomy, vasectomy reversal and micro-TESE for azoospermia.",
          ar: "فحوصات شاملة للزوجين، وجراحة دوالي ميكروسكوبية، وعكس القطع، وميكرو-تيسي لانعدام الحيوانات المنوية.",
        },
      },
      {
        icon: "diagnosis",
        image: { src: IMG.manActive, alt: { en: "Hormonal and men's health", ar: "الهرمونات وصحة الرجل" } },
        title: { en: "Hormonal & Men's Health", ar: "الهرمونات وصحة الرجل" },
        description: {
          en: "Low testosterone, andropause and the midlife health check — diagnosed properly and treated with fertility in mind.",
          ar: "نقص التستوستيرون وسن اليأس عند الرجال والفحص الصحي لمنتصف العمر — تشخيص دقيق وعلاج يراعي الخصوبة.",
        },
      },
      {
        icon: "procedure",
        image: { src: IMG.operatingRoom, alt: { en: "Reconstructive andrology surgery", ar: "جراحة الذكورة الترميمية" } },
        title: { en: "Reconstructive Surgery", ar: "الجراحة الترميمية" },
        description: {
          en: "Penile prosthesis implantation, curvature correction and scrotal day surgery, with an infection-prevention protocol.",
          ar: "زراعة دعامة القضيب وتصحيح الاعوجاج وجراحة كيس الصفن ليوم واحد، مع بروتوكول للوقاية من العدوى.",
        },
      },
    ],
  },

  word: {
    eyebrow: { en: "A Word from the Doctor", ar: "كلمة من الطبيب" },
    heading: { en: "In his own words", ar: "بكلماته الخاصة" },
    image: {
      src: IMG.patientCare,
      alt: { en: "Dr. Walid Moussa with a patient", ar: "د. وليد موسى مع أحد المرضى" },
      position: "center 30%",
    },
    quote: {
      en: [
        "Most of the men I see have waited far too long before coming in — months, sometimes years — because the subject felt impossible to raise. By the time they sit down, they have usually convinced themselves the news will be bad.",
        "It rarely is. Almost every problem in this field has a route to a solution, and the first step is simply naming it out loud to someone who deals with it every day. My job is to make that conversation ordinary, to find the real cause, and to lay out the options plainly so the decision stays yours.",
        "I treat every patient the way I would want a member of my own family treated: with time, with honesty, and with complete discretion.",
      ],
      ar: [
        "معظم الرجال الذين أراهم انتظروا طويلًا جدًا قبل الحضور — أشهرًا، وأحيانًا سنوات — لأن الموضوع بدا مستحيل الطرح. وبحلول وقت جلوسهم، يكونون عادةً قد أقنعوا أنفسهم بأن الخبر سيكون سيئًا.",
        "نادرًا ما يكون كذلك. فلكل مشكلة تقريبًا في هذا المجال طريق إلى حل، والخطوة الأولى هي ببساطة تسميتها بصوت عالٍ لشخص يتعامل معها كل يوم. مهمتي أن أجعل هذا الحوار عاديًا، وأن أجد السبب الحقيقي، وأن أعرض الخيارات بوضوح ليبقى القرار قرارك.",
        "أعامل كل مريض كما أتمنى أن يُعامَل به أحد أفراد عائلتي: بالوقت، وبالصدق، وبسرية تامة.",
      ],
    },
    name: { en: "Dr. Walid Moussa", ar: "د. وليد موسى" },
    role: { en: "Consultant Andrologist & Reproductive Microsurgeon", ar: "استشاري أمراض الذكورة وجرّاح الخصوبة الميكروسكوبي" },
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
