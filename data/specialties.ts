import type { Localized, MediaImage } from "@/lib/types";
import type { IconName } from "@/components/icons/Icon";
import { IMG } from "./images";

/**
 * Services page model: a small set of specialties (medical problems), each
 * with EXACTLY FOUR treatments. The "Choose Your Specialty" grid links 1:1
 * to the treatment sections below — every card has a section and vice-versa.
 * Each treatment opens a detail modal (adapted to CareDetailItem).
 */
export interface SpecialtyTreatment {
  id: string;
  slug: string;
  icon: IconName;
  image: MediaImage;
  title: Localized;
  shortDescription: Localized;
  details: Localized<string[]>;
  bullets: { label: Localized; items: Localized<string[]>; tone: "teal" | "pink" }[];
  footnote?: { label: Localized; value: Localized };
}

const recovery = { en: "Recovery", ar: "التعافي" } satisfies Localized;
const course = { en: "Course", ar: "الجلسات" } satisfies Localized;

export interface Specialty {
  id: string;
  slug: string;
  icon: IconName;
  /** Services page "Choose Your Specialty" card + detail view. */
  image: MediaImage;
  /** Home page "Find Your Treatment" card. Falls back to `image` when unset. */
  homeImage?: MediaImage;
  title: Localized;
  tagline: Localized;
  description: Localized;
  /** Exactly four — the "Choose Your Specialty" card count must match. */
  treatments: SpecialtyTreatment[];
}

export const specialtiesIntro = {
  eyebrow: { en: "Choose Your Specialty", ar: "اختر تخصصك" } satisfies Localized,
  title: { en: "Start with the problem — the treatments follow", ar: "ابدأ من المشكلة — وتأتي طرق العلاج تِباعًا" } satisfies Localized,
  description: {
    en: "Pick what you're dealing with. Each area opens onto four treatment routes, from the least invasive option to definitive surgery.",
    ar: "اختر ما تتعامل معه. كل مجال يفتح على أربع طرق علاج، من الخيار الأقل تدخّلًا إلى الجراحة النهائية.",
  } satisfies Localized,
};

const forFullMenu = { en: "How it's chosen", ar: "كيف يُختار" };

export const specialties: Specialty[] = [
  {
    id: "erectile-dysfunction",
    slug: "erectile-dysfunction",
    icon: "vitality",
    image: { src: IMG.handsRings, alt: { en: "Erectile dysfunction treatment", ar: "علاج ضعف الانتصاب" } },
    title: { en: "Erectile Dysfunction", ar: "ضعف الانتصاب" },
    tagline: { en: "Softer erections, or losing firmness during sex", ar: "انتصاب أضعف أو فقدان الصلابة أثناء الجماع" },
    description: {
      en: "In most men ED is a treatable warning sign, not a diagnosis on its own. Once a Doppler scan and hormone panel show whether it's arterial, venous, neurological or hormonal, treatment follows the cause — starting with the least invasive route that works.",
      ar: "لدى معظم الرجال، ضعف الانتصاب علامة تحذير قابلة للعلاج، لا تشخيصًا مستقلًا. وبمجرد أن يُظهر الدوبلر وتحليل الهرمونات ما إذا كان شريانيًا أو وريديًا أو عصبيًا أو هرمونيًا، يتبع العلاج السبب — بدءًا من أقل الطرق تدخّلًا وأكثرها فعالية.",
    },
    treatments: [
      {
        id: "ed-oral",
        slug: "oral-and-lifestyle-therapy",
        icon: "heart-pulse",
        image: { src: IMG.bpCheck, alt: { en: "Cardiometabolic and oral ED therapy", ar: "علاج ضعف الانتصاب الفموي والقلبي الأيضي" } },
        title: { en: "Oral & Cardiometabolic Therapy", ar: "العلاج الفموي والقلبي الأيضي" },
        shortDescription: {
          en: "Correctly dosed PDE5 medication alongside blood-pressure, sugar and hormone optimisation — the first line for most men.",
          ar: "أدوية فموية بجرعة صحيحة إلى جانب ضبط الضغط والسكر والهرمونات — الخط الأول لمعظم الرجال.",
        },
        details: {
          en: [
            "Most oral-medication 'failures' are really dosing or technique problems: too low a dose, taken on a full stomach, or without enough sexual stimulation. Getting this right resolves the problem for a large share of men.",
            "At the same time, the drivers behind vascular ED are treated directly — blood pressure, lipids, blood sugar, weight and sleep. Improving these often improves erections on their own and protects the heart.",
          ],
          ar: [
            "معظم «فشل» الأدوية الفموية هو في الحقيقة مشكلة جرعة أو طريقة: جرعة منخفضة جدًا، أو تُؤخذ على معدة ممتلئة، أو دون تحفيز جنسي كافٍ. وضبط ذلك يحل المشكلة لنسبة كبيرة من الرجال.",
            "وفي الوقت نفسه، تُعالَج العوامل وراء ضعف الانتصاب الوعائي مباشرة — ضغط الدم والدهون وسكر الدم والوزن والنوم. وتحسين هذه غالبًا ما يحسّن الانتصاب من تلقاء نفسه ويحمي القلب.",
          ],
        },
        bullets: [
          {
            label: { en: "Best suited to", ar: "الأنسب لـ" },
            items: {
              en: ["Mild-to-moderate vascular ED", "First presentation of the problem", "Men with treatable BP, lipid or sugar issues"],
              ar: ["ضعف انتصاب وعائي خفيف إلى متوسط", "أول ظهور للمشكلة", "رجال لديهم مشكلات ضغط أو دهون أو سكر قابلة للعلاج"],
            },
            tone: "teal",
          },
          {
            label: forFullMenu,
            items: {
              en: ["Tried when night/morning erections are preserved", "Reviewed at 4–6 weeks before escalating"],
              ar: ["يُجرَّب عند بقاء انتصاب الليل أو الصباح", "يُراجَع خلال 4–6 أسابيع قبل التصعيد"],
            },
            tone: "pink",
          },
        ],
      },
      {
        id: "ed-shockwave",
        slug: "low-intensity-shockwave-therapy",
        icon: "wave",
        image: { src: IMG.monitors, alt: { en: "Low-intensity shockwave therapy", ar: "العلاج بالموجات التصادمية منخفضة الشدة" } },
        title: { en: "Low-Intensity Shockwave Therapy", ar: "الموجات التصادمية منخفضة الشدة" },
        shortDescription: {
          en: "A drug-free course of acoustic waves that stimulates new blood-vessel growth for mild-to-moderate vascular ED.",
          ar: "جلسات خالية من الأدوية من الموجات الصوتية تحفّز نمو أوعية دموية جديدة لضعف الانتصاب الوعائي الخفيف إلى المتوسط.",
        },
        details: {
          en: [
            "Li-ESWT delivers thousands of low-energy pulses over several short sessions. The micro-stress triggers angiogenesis — the body's own repair response — improving arterial inflow over the following weeks to months.",
            "It suits men who want to reduce or stop tablets, and it is usually combined with cardiometabolic treatment. Sessions are about 20 minutes, painless, with no anaesthesia and no downtime.",
          ],
          ar: [
            "يقدّم العلاج آلاف النبضات منخفضة الطاقة عبر عدة جلسات قصيرة. ويحفّز الإجهاد الدقيق تكوّن أوعية دموية جديدة — استجابة الإصلاح الطبيعية للجسم — مما يحسّن التدفق الشرياني خلال الأسابيع إلى الأشهر التالية.",
            "يناسب الرجال الراغبين في تقليل الأقراص أو إيقافها، ويُدمج عادةً مع علاج القلب والأيض. الجلسات نحو 20 دقيقة، بلا ألم، دون تخدير ودون فترة نقاهة.",
          ],
        },
        bullets: [
          {
            label: { en: "Best suited to", ar: "الأنسب لـ" },
            items: {
              en: ["Vascular ED with some response to tablets", "Men who prefer a drug-free option", "Early ED they want to get ahead of"],
              ar: ["ضعف انتصاب وعائي مع بعض الاستجابة للأقراص", "رجال يفضّلون خيارًا خاليًا من الأدوية", "ضعف انتصاب مبكر يريدون تدارُكه"],
            },
            tone: "teal",
          },
          {
            label: forFullMenu,
            items: {
              en: ["Confirmed as arterial on penile Doppler", "Not for severe or purely neurological ED"],
              ar: ["مؤكَّد أنه شرياني عبر دوبلر القضيب", "غير مناسب للحالات الشديدة أو العصبية البحتة"],
            },
            tone: "pink",
          },
        ],
        footnote: {
          label: course,
          value: { en: "Typically 6–12 sessions over 6–9 weeks; the effect builds for months afterward.", ar: "عادةً 6–12 جلسة على مدى 6–9 أسابيع؛ ويستمر بناء التأثير لأشهر بعدها." },
        },
      },
      {
        id: "ed-injection",
        slug: "intracavernosal-and-topical-therapy",
        icon: "procedure",
        image: { src: IMG.labSamples, alt: { en: "Intracavernosal injection therapy", ar: "العلاج بالحقن داخل الأجسام الكهفية" } },
        title: { en: "Injection & Topical Therapy", ar: "العلاج بالحقن والدهان" },
        shortDescription: {
          en: "Self-administered treatment that produces a reliable erection when tablets aren't enough — a well-tolerated step before surgery.",
          ar: "علاج ذاتي يُحدث انتصابًا موثوقًا عندما لا تكفي الأقراص — خطوة جيدة التحمّل قبل الجراحة.",
        },
        details: {
          en: [
            "A very fine needle delivers medication directly into the erectile tissue, or a pellet/gel is used through the urethra. The dose is titrated with you in clinic until it is both effective and comfortable, and you are taught to use it independently.",
            "It works even when oral medication does not — after prostate surgery, in diabetes, and in more advanced vascular disease — and it is fully reversible, so it does not close the door on any later option.",
          ],
          ar: [
            "تُوصِل إبرة دقيقة جدًا الدواء مباشرة إلى النسيج الانتصابي، أو تُستخدم حبيبة/جل عبر مجرى البول. وتُضبط الجرعة معك في العيادة حتى تكون فعّالة ومريحة، وتُعلَّم استخدامها بمفردك.",
            "يعمل حتى عندما لا تعمل الأدوية الفموية — بعد جراحة البروستاتا، وفي السكري، وفي مرض الأوعية الأكثر تقدّمًا — وهو قابل للعكس تمامًا، فلا يغلق الباب أمام أي خيار لاحق.",
          ],
        },
        bullets: [
          {
            label: { en: "Best suited to", ar: "الأنسب لـ" },
            items: {
              en: ["ED not responding to oral medication", "Post-prostatectomy penile rehabilitation", "Men who want to avoid or delay an implant"],
              ar: ["ضعف انتصاب لا يستجيب للأدوية الفموية", "إعادة تأهيل القضيب بعد استئصال البروستاتا", "رجال يريدون تجنّب الدعامة أو تأجيلها"],
            },
            tone: "teal",
          },
          {
            label: forFullMenu,
            items: {
              en: ["First dose always supervised in clinic", "Reviewed regularly for dose and technique"],
              ar: ["الجرعة الأولى دائمًا تحت إشراف في العيادة", "تُراجَع بانتظام للجرعة والطريقة"],
            },
            tone: "pink",
          },
        ],
      },
      {
        id: "ed-implant",
        slug: "penile-implant",
        icon: "procedure",
        image: { src: IMG.operatingRoom2, alt: { en: "Penile implant surgery", ar: "جراحة دعامة القضيب" } },
        title: { en: "Penile Implant", ar: "دعامة القضيب" },
        shortDescription: {
          en: "A concealed inflatable device that restores an erection on demand — the highest-satisfaction option for ED that no longer responds to anything else.",
          ar: "جهاز مخفي قابل للنفخ يعيد الانتصاب عند الطلب — الخيار الأعلى رضا لضعف الانتصاب الذي لم يعد يستجيب لأي شيء آخر.",
        },
        details: {
          en: [
            "The three-piece inflatable implant sits entirely inside the body. A discreet pump in the scrotum inflates cylinders in the penis for a firm, controllable erection, then returns everything to a soft, natural-looking state.",
            "Surgery takes around 60–90 minutes. Dr. Moussa uses an antibiotic-coated 'no-touch' technique that keeps infection rates below 2%. Satisfaction is consistently above 90% for both men and partners, and the device does not affect orgasm, sensation or the ability to father a child.",
          ],
          ar: [
            "الدعامة القابلة للنفخ المكوّنة من ثلاث قطع مخفية بالكامل داخل الجسم. مضخة صغيرة في كيس الصفن تنفخ الأسطوانتين داخل القضيب لانتصاب صلب يمكن التحكم فيه، ثم تعيد كل شيء إلى حالة رخوة طبيعية المظهر.",
            "تستغرق الجراحة نحو 60–90 دقيقة. ويستخدم د. موسى تقنية «عدم اللمس» بدعامة مغطاة بمضاد حيوي تُبقي معدلات العدوى أقل من 2%. والرضا أعلى من 90% باستمرار للرجال والشريكات، ولا يؤثر الجهاز على النشوة أو الإحساس أو القدرة على الإنجاب.",
          ],
        },
        bullets: [
          {
            label: { en: "Best suited to", ar: "الأنسب لـ" },
            items: {
              en: ["Severe ED after failed medical treatment", "ED after prostate cancer surgery", "Advanced Peyronie's disease with ED"],
              ar: ["ضعف انتصاب شديد بعد فشل العلاج الدوائي", "ضعف انتصاب بعد جراحة سرطان البروستاتا", "مرض بيروني المتقدم مع ضعف انتصاب"],
            },
            tone: "teal",
          },
          {
            label: forFullMenu,
            items: {
              en: ["Chosen once other options are exhausted", "The natural erectile tissue is not preserved"],
              ar: ["يُختار بعد استنفاد الخيارات الأخرى", "لا يُحفَظ النسيج الانتصابي الطبيعي"],
            },
            tone: "pink",
          },
        ],
        footnote: {
          label: recovery,
          value: { en: "One night in hospital; light activity within a week, device taught at 4–6 weeks.", ar: "ليلة واحدة بالمستشفى؛ نشاط خفيف خلال أسبوع، وتعليم الجهاز بعد 4–6 أسابيع." },
        },
      },
    ],
  },

  {
    id: "male-infertility",
    slug: "male-infertility",
    icon: "fertility",
    image: { src: IMG.familyBaby, alt: { en: "Male infertility treatment", ar: "علاج العقم عند الرجال" } },
    title: { en: "Male Infertility", ar: "العقم عند الرجال" },
    tagline: { en: "Trying to conceive without success, or an abnormal semen analysis", ar: "محاولة الإنجاب دون نجاح، أو تحليل سائل منوي غير طبيعي" },
    description: {
      en: "A male factor is involved in about half of couples who struggle to conceive, and much of it is correctable. A proper evaluation is quick and usually finds something specific — a varicocele, a hormone imbalance, an infection or a blockage.",
      ar: "يُسهم عامل الذكورة في نحو نصف الأزواج الذين يواجهون صعوبة في الإنجاب، وكثير منه قابل للتصحيح. والتقييم السليم سريع وغالبًا ما يجد سببًا محددًا — دوالي، أو خلل هرموني، أو التهاب، أو انسداد.",
    },
    treatments: [
      {
        id: "inf-workup",
        slug: "fertility-work-up-and-semen-analysis",
        icon: "lab",
        image: { src: IMG.labResearch, alt: { en: "Fertility work-up and semen analysis", ar: "فحص الخصوبة وتحليل السائل المنوي" } },
        title: { en: "Fertility Work-Up & Semen Analysis", ar: "فحص الخصوبة وتحليل السائل المنوي" },
        shortDescription: {
          en: "Two WHO-standard semen analyses, hormones, a scrotal exam and ultrasound — the foundation every plan is built on.",
          ar: "تحليلان للسائل المنوي بمعايير منظمة الصحة العالمية، وهرمونات، وفحص لكيس الصفن وأشعة — الأساس الذي تُبنى عليه كل خطة.",
        },
        details: {
          en: [
            "A reliable semen analysis needs a strict abstinence window, rapid processing and calibrated equipment. Two samples a few weeks apart are read together — a single abnormal result is common and not conclusive.",
            "Alongside this, a focused history, scrotal examination (how most varicoceles are found), a hormone panel and, where indicated, DNA-fragmentation testing and genetics complete the picture and place a man in a clear diagnostic group.",
          ],
          ar: [
            "يحتاج التحليل الموثوق للسائل المنوي فترة امتناع محددة، ومعالجة سريعة، وأجهزة معايَرة. وتُقرأ عيّنتان بفارق أسابيع قليلة معًا — فالنتيجة غير الطبيعية الواحدة شائعة وغير حاسمة.",
            "إلى جانب ذلك، يكمل الصورة تاريخ مرضي مركّز، وفحص لكيس الصفن (وهو ما تُكتشف به معظم الدوالي)، وتحليل هرموني، وعند الحاجة فحص تفتّت الحمض النووي والفحص الجيني — لوضع الرجل في مجموعة تشخيصية واضحة.",
          ],
        },
        bullets: [
          {
            label: { en: "What it checks", ar: "ما الذي يفحصه" },
            items: {
              en: ["Count, motility, morphology, volume", "DNA fragmentation & oxidative stress", "Testosterone, LH, FSH, prolactin", "Varicocele, obstruction, testicular size"],
              ar: ["العدد والحركة والشكل والحجم", "تفتّت الحمض النووي والإجهاد التأكسدي", "التستوستيرون وLH وFSH والبرولاكتين", "الدوالي والانسداد وحجم الخصية"],
            },
            tone: "teal",
          },
        ],
      },
      {
        id: "inf-varicocele",
        slug: "microsurgical-varicocelectomy",
        icon: "microscope",
        image: { src: IMG.microscope, alt: { en: "Microsurgical varicocelectomy", ar: "جراحة دوالي الخصية الميكروسكوبية" } },
        title: { en: "Microsurgical Varicocelectomy", ar: "جراحة الدوالي الميكروسكوبية" },
        shortDescription: {
          en: "Sub-inguinal repair of the abnormal scrotal veins under an operating microscope — the most common correctable cause of male infertility.",
          ar: "إصلاح الأوردة غير الطبيعية في كيس الصفن أسفل الأربية تحت المجهر الجراحي — أكثر أسباب عقم الرجال قابلية للتصحيح.",
        },
        details: {
          en: [
            "Working through a small incision low in the groin, Dr. Moussa ties off only the abnormal veins while sparing the testicular artery and the lymphatics — the detail that keeps recurrence and hydrocele rates far below open or laparoscopic techniques.",
            "Semen parameters improve in roughly 60–70% of men over the following three to six months, spontaneous pregnancy rates rise, and for couples still needing IVF the fertilisation and embryo quality often improve too.",
          ],
          ar: [
            "بالعمل عبر شق صغير أسفل الأربية، يربط د. موسى الأوردة غير الطبيعية فقط مع الحفاظ على شريان الخصية والأوعية اللمفاوية — التفصيل الذي يُبقي معدلات الانتكاس والاستسقاء أقل بكثير من التقنيات المفتوحة أو بالمنظار.",
            "تتحسّن نتائج السائل المنوي لدى نحو 60–70% من الرجال خلال ثلاثة إلى ستة أشهر، وترتفع معدلات الحمل التلقائي، وبالنسبة للأزواج الذين ما زالوا يحتاجون أطفال الأنابيب غالبًا ما يتحسّن الإخصاب وجودة الأجنّة أيضًا.",
          ],
        },
        bullets: [
          {
            label: { en: "Recommended when", ar: "يُنصح به عند" },
            items: {
              en: ["A palpable varicocele with abnormal semen results", "Varicocele-related testicular shrinkage or low testosterone", "Persistent dragging scrotal ache"],
              ar: ["دوالي محسوسة مع نتائج سائل منوي غير طبيعية", "ضمور خصية أو نقص تستوستيرون مرتبط بالدوالي", "ألم سحبي مستمر في كيس الصفن"],
            },
            tone: "pink",
          },
        ],
        footnote: {
          label: recovery,
          value: { en: "Same-day discharge; desk work in 2–3 days, full activity in about two weeks.", ar: "الخروج في نفس اليوم؛ العمل المكتبي خلال 2–3 أيام، والنشاط الكامل خلال أسبوعين تقريبًا." },
        },
      },
      {
        id: "inf-hormonal",
        slug: "hormonal-stimulation-of-sperm-production",
        icon: "diagnosis",
        image: { src: IMG.manActive, alt: { en: "Hormonal stimulation of sperm production", ar: "التحفيز الهرموني لإنتاج الحيوانات المنوية" } },
        title: { en: "Hormonal Stimulation of Sperm Production", ar: "التحفيز الهرموني لإنتاج الحيوانات المنوية" },
        shortDescription: {
          en: "Medication that raises the testes' own output for men with a hormonal cause of low count — while protecting future fertility.",
          ar: "أدوية ترفع إنتاج الخصيتين الطبيعي للرجال الذين لديهم سبب هرموني لضعف العدد — مع حماية الخصوبة المستقبلية.",
        },
        details: {
          en: [
            "When low sperm production is driven by a weak pituitary signal or an unfavourable hormone balance, agents such as clomiphene, hCG or an aromatase inhibitor can restore the drive to the testes and improve the sperm count over three to six months.",
            "Crucially, this route raises testosterone without the fertility shutdown that standard testosterone replacement causes — so it is the preferred option for any man who may want children.",
          ],
          ar: [
            "عندما يكون ضعف إنتاج الحيوانات المنوية ناتجًا عن إشارة نخامية ضعيفة أو توازن هرموني غير مناسب، يمكن لأدوية مثل كلوميفين أو hCG أو مثبّط أروماتاز أن تعيد التحفيز إلى الخصيتين وتحسّن العدد خلال ثلاثة إلى ستة أشهر.",
            "والأهم أن هذا المسار يرفع التستوستيرون دون توقّف الخصوبة الذي يسببه التعويض التقليدي بالتستوستيرون — لذا فهو الخيار المفضّل لأي رجل قد يرغب في الإنجاب.",
          ],
        },
        bullets: [
          {
            label: { en: "Best suited to", ar: "الأنسب لـ" },
            items: {
              en: ["Low count with borderline or low testosterone", "Secondary (pituitary-driven) hypogonadism", "Men wanting to preserve fertility"],
              ar: ["ضعف عدد مع تستوستيرون حدّي أو منخفض", "قصور غدد تناسلية ثانوي (نخامي المنشأ)", "رجال يريدون الحفاظ على الخصوبة"],
            },
            tone: "teal",
          },
          {
            label: forFullMenu,
            items: {
              en: ["Started only after two confirmatory hormone panels", "Response reassessed with a repeat semen analysis"],
              ar: ["يُبدأ فقط بعد تحليلين هرمونيين مؤكّدين", "تُعاد مراجعة الاستجابة بتحليل سائل منوي جديد"],
            },
            tone: "pink",
          },
        ],
      },
      {
        id: "inf-retrieval",
        slug: "surgical-sperm-retrieval",
        icon: "dna",
        image: { src: IMG.ivDark, alt: { en: "Surgical sperm retrieval", ar: "استخلاص الحيوانات المنوية جراحيًا" } },
        title: { en: "Surgical Sperm Retrieval (Micro-TESE)", ar: "استخلاص الحيوانات المنوية جراحيًا (ميكرو-تيسي)" },
        shortDescription: {
          en: "Microscope-guided retrieval of sperm directly from the testis for men with no sperm in the ejaculate.",
          ar: "استخلاص موجَّه بالمجهر للحيوانات المنوية مباشرة من الخصية للرجال الذين لا توجد لديهم حيوانات منوية في السائل.",
        },
        details: {
          en: [
            "For obstructive azoospermia, sperm are retrieved simply (PESA/TESA) or the blockage is reconstructed. For non-obstructive azoospermia — a testicular cause — micro-TESE gives the best chance of finding usable sperm, roughly 50% even in this difficult group.",
            "Under the operating microscope, the wider, more opaque tubules most likely to contain sperm are identified and sampled, removing far less tissue and protecting testosterone production. Retrieved sperm are used immediately for ICSI or frozen, coordinated with the partner's egg collection.",
          ],
          ar: [
            "في انعدام الحيوانات المنوية الانسدادي، تُستخلَص الحيوانات المنوية ببساطة (PESA/TESA) أو يُعاد إصلاح الانسداد. وفي غير الانسدادي — السبب الخصوي — يعطي ميكرو-تيسي أفضل فرصة للعثور على حيوانات منوية صالحة، نحو 50% حتى في هذه المجموعة الصعبة.",
            "تحت المجهر الجراحي، تُحدَّد الأنابيب الأوسع والأكثر عتامة الأرجح لاحتوائها على حيوانات منوية وتُؤخذ عيّنات منها، مع إزالة نسيج أقل بكثير وحماية إنتاج التستوستيرون. وتُستخدم الحيوانات المنوية فورًا في الحقن المجهري أو تُجمَّد، بالتنسيق مع سحب بويضات الزوجة.",
          ],
        },
        bullets: [
          {
            label: { en: "Used for", ar: "يُستخدَم لـ" },
            items: {
              en: ["No sperm in two semen analyses", "Failed previous conventional biopsy", "Before or during an ICSI cycle"],
              ar: ["عدم وجود حيوانات منوية في تحليلين", "فشل خزعة تقليدية سابقة", "قبل دورة الحقن المجهري أو أثناءها"],
            },
            tone: "teal",
          },
        ],
        footnote: {
          label: recovery,
          value: { en: "Home the same day; mild soreness for a few days, coordinated with the IVF cycle timing.", ar: "العودة للمنزل في نفس اليوم؛ ألم خفيف لبضعة أيام، بالتنسيق مع توقيت دورة أطفال الأنابيب." },
        },
      },
    ],
  },

  {
    id: "sexual-performance",
    slug: "sexual-performance",
    icon: "clock",
    image: { src: IMG.coupleSunset, alt: { en: "Premature ejaculation and sexual performance", ar: "سرعة القذف والأداء الجنسي" } },
    title: { en: "Ejaculation & Performance", ar: "القذف والأداء" },
    tagline: { en: "Ejaculating sooner than you'd like, with little sense of control", ar: "القذف أسرع مما ترغب، مع قلّة الإحساس بالتحكم" },
    description: {
      en: "Premature ejaculation is the most common male sexual complaint and one of the most responsive to treatment — especially when several methods are combined rather than relied on one at a time. Any co-existing erectile anxiety is assessed and treated alongside it.",
      ar: "سرعة القذف أكثر الشكاوى الجنسية شيوعًا عند الرجال ومن أكثرها استجابة للعلاج — خاصةً عند الجمع بين عدة طرق بدلًا من الاعتماد على واحدة في كل مرة. ويُقيَّم أي قلق انتصاب مصاحب ويُعالَج معها.",
    },
    treatments: [
      {
        id: "pe-behavioural",
        slug: "behavioural-and-pelvic-floor-program",
        icon: "vitality",
        image: { src: IMG.manActive, alt: { en: "Behavioural and pelvic-floor training", ar: "التدريب السلوكي وتمارين قاع الحوض" } },
        title: { en: "Behavioural & Pelvic-Floor Program", ar: "برنامج سلوكي وتمارين قاع الحوض" },
        shortDescription: {
          en: "Structured stop–start and squeeze technique plus pelvic-floor training that builds durable ejaculatory control over weeks.",
          ar: "تقنية منظّمة للتوقف والبدء والضغط مع تدريب قاع الحوض تبني تحكمًا دائمًا في القذف خلال أسابيع.",
        },
        details: {
          en: [
            "Behavioural methods are the backbone of lasting improvement. The stop–start and squeeze techniques retrain the ejaculatory reflex, and targeted pelvic-floor strengthening gives many men a noticeable extra margin of control.",
            "It takes practice and a few weeks, but the gains are yours to keep — most men who do the work can eventually reduce or stop medication while holding on to the improvement.",
          ],
          ar: [
            "الطرق السلوكية هي العمود الفقري للتحسّن الدائم. فتقنيتا التوقف والبدء والضغط تعيدان تدريب منعكس القذف، ويمنح تقوية قاع الحوض المستهدفة كثيرًا من الرجال هامش تحكم إضافيًا ملحوظًا.",
            "تحتاج ممارسة وبضعة أسابيع، لكن المكاسب تبقى لك — ومعظم من يلتزمون بها يستطيعون في النهاية تقليل الدواء أو إيقافه مع الحفاظ على التحسّن.",
          ],
        },
        bullets: [
          {
            label: { en: "Best suited to", ar: "الأنسب لـ" },
            items: {
              en: ["Lifelong or acquired PE", "Men who prefer to start drug-free", "As a base layer under any other treatment"],
              ar: ["سرعة قذف مدى الحياة أو مكتسبة", "رجال يفضّلون البدء دون أدوية", "كطبقة أساس تحت أي علاج آخر"],
            },
            tone: "teal",
          },
        ],
      },
      {
        id: "pe-topical",
        slug: "topical-desensitizing-therapy",
        icon: "procedure",
        image: { src: IMG.labSamples, alt: { en: "Topical desensitizing therapy", ar: "العلاج الموضعي المخدّر" } },
        title: { en: "Topical Desensitising Therapy", ar: "العلاج الموضعي المخدّر" },
        shortDescription: {
          en: "A metered spray or cream applied and wiped before intercourse that reduces over-sensitivity without significantly numbing the partner.",
          ar: "بخاخ أو كريم بجرعة محددة يُوضع ويُمسح قبل الجماع، يقلّل فرط الحساسية دون تخدير الشريك بدرجة كبيرة.",
        },
        details: {
          en: [
            "A lidocaine–prilocaine spray or cream is applied to the glans 10–15 minutes before sex and then wiped off. It lowers the sensory input that triggers rapid ejaculation while leaving erection and orgasm intact.",
            "Used correctly — right amount, right timing, wiped before contact — it meaningfully lengthens latency for most men and combines well with behavioural technique or oral medication.",
          ],
          ar: [
            "يُوضع بخاخ أو كريم يحتوي على ليدوكايين–بريلوكايين على حشفة القضيب قبل الجماع بـ 10–15 دقيقة ثم يُمسح. وهو يقلّل المدخلات الحسية التي تُحفّز القذف السريع مع بقاء الانتصاب والنشوة سليمين.",
            "باستخدام صحيح — الكمية المناسبة، التوقيت المناسب، المسح قبل الملامسة — يطيل الزمن بشكل ملموس لمعظم الرجال ويتكامل جيدًا مع التقنية السلوكية أو الدواء الفموي.",
          ],
        },
        bullets: [
          {
            label: { en: "Best suited to", ar: "الأنسب لـ" },
            items: {
              en: ["Primarily sensory (high-sensitivity) PE", "Men who want an on-demand, non-systemic option", "Added to behavioural work for a faster effect"],
              ar: ["سرعة قذف حسّية بالأساس (فرط حساسية)", "رجال يريدون خيارًا عند الطلب وغير جهازي", "يُضاف للعمل السلوكي لتأثير أسرع"],
            },
            tone: "pink",
          },
        ],
      },
      {
        id: "pe-oral",
        slug: "on-demand-and-daily-medication",
        icon: "heart-pulse",
        image: { src: IMG.bpCheck, alt: { en: "On-demand and daily oral medication", ar: "دواء فموي عند الطلب ويوميًا" } },
        title: { en: "On-Demand & Daily Medication", ar: "دواء عند الطلب ويوميًا" },
        shortDescription: {
          en: "A low-dose oral medication — taken a few hours before sex or every day — that substantially lengthens time to ejaculation.",
          ar: "دواء فموي بجرعة منخفضة — يُؤخذ قبل الجماع بساعات أو يوميًا — يطيل بشكل كبير الزمن حتى القذف.",
        },
        details: {
          en: [
            "Short-acting agents taken 1–3 hours before sex suit men who want situational control; a low daily dose suits frequent, spontaneous activity. Both work by gently modulating the serotonin signal that governs ejaculatory timing.",
            "The dose is chosen with you, side effects are reviewed, and the plan is usually to combine medication with behavioural technique so that control eventually holds with less — or no — medication.",
          ],
          ar: [
            "الأدوية قصيرة المفعول التي تُؤخذ قبل الجماع بـ 1–3 ساعات تناسب من يريدون تحكمًا حسب الموقف؛ والجرعة اليومية المنخفضة تناسب النشاط المتكرر التلقائي. وكلاهما يعمل بتعديل لطيف لإشارة السيروتونين التي تحكم توقيت القذف.",
            "تُختار الجرعة معك، وتُراجَع الآثار الجانبية، وتكون الخطة عادةً دمج الدواء مع التقنية السلوكية بحيث يستقر التحكم في النهاية بدواء أقل — أو دون دواء.",
          ],
        },
        bullets: [
          {
            label: { en: "Best suited to", ar: "الأنسب لـ" },
            items: {
              en: ["Moderate-to-severe PE by latency", "Insufficient response to topical or behavioural steps", "Bridging while behavioural control builds"],
              ar: ["سرعة قذف متوسطة إلى شديدة حسب الزمن", "استجابة غير كافية للخطوات الموضعية أو السلوكية", "كجسر بينما يُبنى التحكم السلوكي"],
            },
            tone: "teal",
          },
          {
            label: forFullMenu,
            items: {
              en: ["Screened for interactions and mood history first", "Reviewed at 4–6 weeks for dose and effect"],
              ar: ["فحص التفاعلات وتاريخ المزاج أولًا", "يُراجَع خلال 4–6 أسابيع للجرعة والتأثير"],
            },
            tone: "pink",
          },
        ],
      },
      {
        id: "pe-combined",
        slug: "combined-ejaculation-and-erection-plan",
        icon: "consultation",
        image: { src: IMG.handsRings, alt: { en: "Combined ejaculation and erection plan", ar: "خطة مشتركة للقذف والانتصاب" } },
        title: { en: "Combined PE + ED Plan", ar: "خطة مشتركة لسرعة القذف وضعف الانتصاب" },
        shortDescription: {
          en: "When rushing to finish is really about losing the erection, treating the erection first often resolves the timing on its own.",
          ar: "عندما يكون الاستعجال في الإنهاء متعلّقًا في الحقيقة بفقدان الانتصاب، فإن علاج الانتصاب أولًا غالبًا ما يحل التوقيت من تلقاء نفسه.",
        },
        details: {
          en: [
            "A large share of men with PE also have some erectile difficulty or anxiety, and the two feed each other: fear of losing the erection drives a rush to finish. Assessing both together changes the plan.",
            "Where ED is present, treating it — with the right dose of oral medication or another route — frequently restores enough confidence and control that little additional PE treatment is needed. Where both need attention, the treatments are sequenced deliberately rather than piled on at once.",
          ],
          ar: [
            "نسبة كبيرة من الرجال المصابين بسرعة القذف لديهم أيضًا بعض صعوبة الانتصاب أو القلق، والاثنان يغذّي أحدهما الآخر: الخوف من فقدان الانتصاب يدفع للاستعجال في الإنهاء. وتقييم الاثنين معًا يغيّر الخطة.",
            "حيث يوجد ضعف انتصاب، فإن علاجه — بالجرعة الصحيحة من الدواء الفموي أو بطريق آخر — يعيد غالبًا ما يكفي من الثقة والتحكم بحيث لا يُحتاج إلا لقليل من علاج سرعة القذف. وحيث يحتاج الاثنان اهتمامًا، تُرتَّب العلاجات بترتيب مقصود بدلًا من تكديسها دفعة واحدة.",
          ],
        },
        bullets: [
          {
            label: { en: "Best suited to", ar: "الأنسب لـ" },
            items: {
              en: ["PE that started with erectile anxiety", "Acquired PE in midlife", "Men where earlier single treatments only half-worked"],
              ar: ["سرعة قذف بدأت مع قلق الانتصاب", "سرعة قذف مكتسبة في منتصف العمر", "رجال نجحت لديهم العلاجات المفردة السابقة جزئيًا فقط"],
            },
            tone: "teal",
          },
        ],
      },
    ],
  },

  {
    id: "hormonal-health",
    slug: "hormonal-health",
    icon: "diagnosis",
    image: { src: IMG.manPortrait, alt: { en: "Hormonal and men's health", ar: "الهرمونات وصحة الرجل" } },
    title: { en: "Hormonal & Men's Health", ar: "الهرمونات وصحة الرجل" },
    tagline: { en: "Low drive, fatigue, mood and body-composition change", ar: "انخفاض الرغبة والطاقة والمزاج وتغيّر تكوين الجسم" },
    description: {
      en: "Low testosterone is common from the forties on, but a single low reading is not a diagnosis. Proper testing separates a testicular cause from a pituitary one and catches the reversible drivers — and treatment is chosen with your fertility firmly in mind.",
      ar: "نقص التستوستيرون شائع من الأربعينيات فصاعدًا، لكن قراءة منخفضة واحدة ليست تشخيصًا. الفحص السليم يميّز بين سبب خصوي وآخر نخامي ويكتشف المسببات القابلة للعكس — ويُختار العلاج مع مراعاة خصوبتك تمامًا.",
    },
    treatments: [
      {
        id: "hrm-workup",
        slug: "diagnostic-hormone-work-up",
        icon: "lab",
        image: { src: IMG.labResearch, alt: { en: "Diagnostic hormone work-up", ar: "فحص هرموني تشخيصي" } },
        title: { en: "Diagnostic Hormone Work-Up", ar: "الفحص الهرموني التشخيصي" },
        shortDescription: {
          en: "Two morning testosterone measurements with LH, FSH, prolactin and a metabolic panel — before any treatment is considered.",
          ar: "قياسان صباحيان للتستوستيرون مع LH وFSH والبرولاكتين وفحص أيضي — قبل التفكير في أي علاج.",
        },
        details: {
          en: [
            "Testosterone varies through the day and week, so it is measured in the morning at least twice. LH and FSH separate a testicular problem from a pituitary one; prolactin and a metabolic panel look for specific, treatable causes.",
            "This is also where the reversible drivers are identified — weight, sleep apnoea, alcohol, opioids and uncontrolled diabetes all lower testosterone and can often be corrected directly.",
          ],
          ar: [
            "يتغيّر التستوستيرون خلال اليوم والأسبوع، لذا يُقاس صباحًا مرتين على الأقل. وتفصل LH وFSH بين مشكلة خصوية وأخرى نخامية؛ ويبحث البرولاكتين والفحص الأيضي عن أسباب محددة قابلة للعلاج.",
            "وهنا أيضًا تُحدَّد المسببات القابلة للعكس — الوزن وانقطاع النفس النومي والكحول والمواد الأفيونية والسكري غير المنضبط، كلها تخفض التستوستيرون ويمكن تصحيحها مباشرة غالبًا.",
          ],
        },
        bullets: [
          {
            label: { en: "Why it matters", ar: "لماذا يهم" },
            items: {
              en: ["Prevents lifelong treatment for a transient dip", "Finds pituitary tumours and other specific causes", "Establishes a fertility baseline before therapy"],
              ar: ["يمنع علاجًا مدى الحياة بسبب انخفاض مؤقت", "يكشف أورام الغدة النخامية وأسبابًا محددة أخرى", "يضع خط أساس للخصوبة قبل العلاج"],
            },
            tone: "teal",
          },
        ],
      },
      {
        id: "hrm-reversible",
        slug: "reversible-cause-correction",
        icon: "heart-pulse",
        image: { src: IMG.manActive, alt: { en: "Correcting reversible causes of low testosterone", ar: "تصحيح الأسباب القابلة للعكس لنقص التستوستيرون" } },
        title: { en: "Reversible-Cause Correction", ar: "تصحيح الأسباب القابلة للعكس" },
        shortDescription: {
          en: "Targeted treatment of the weight, sleep, metabolic and medication issues that suppress testosterone — often enough on its own.",
          ar: "علاج مستهدف لمشكلات الوزن والنوم والأيض والأدوية التي تثبّط التستوستيرون — وغالبًا ما يكون كافيًا وحده.",
        },
        details: {
          en: [
            "A meaningful proportion of low-testosterone cases resolve, or improve substantially, once the underlying driver is addressed: weight loss, treatment of obstructive sleep apnoea, reducing alcohol, reviewing opioid or steroid use, and tightening diabetes control.",
            "This step comes first because it treats the cause, protects fertility, and carries none of the monitoring burden of hormone replacement. Progress is tracked with repeat symptom scores and bloods.",
          ],
          ar: [
            "نسبة معتبرة من حالات نقص التستوستيرون تتحسّن، أو تتحسّن بشكل كبير، بمجرد معالجة العامل الكامن: إنقاص الوزن، وعلاج انقطاع النفس النومي، وتقليل الكحول، ومراجعة استخدام المواد الأفيونية أو المنشطات، وإحكام ضبط السكري.",
            "تأتي هذه الخطوة أولًا لأنها تعالج السبب وتحمي الخصوبة ولا تحمل أيًا من عبء متابعة التعويض الهرموني. ويُتابَع التقدّم بإعادة درجات الأعراض والتحاليل.",
          ],
        },
        bullets: [
          {
            label: { en: "Targets", ar: "يستهدف" },
            items: {
              en: ["Central weight gain & insulin resistance", "Untreated obstructive sleep apnoea", "Alcohol, opioids, older steroid use", "Poorly controlled diabetes or thyroid"],
              ar: ["زيادة الوزن المركزية ومقاومة الإنسولين", "انقطاع نفس نومي غير معالَج", "الكحول والمواد الأفيونية واستخدام المنشطات سابقًا", "سكري أو غدة درقية غير منضبطة"],
            },
            tone: "pink",
          },
        ],
      },
      {
        id: "hrm-fertility-sparing",
        slug: "fertility-sparing-hormone-therapy",
        icon: "fertility",
        image: { src: IMG.familyBaby, alt: { en: "Fertility-sparing hormone therapy", ar: "علاج هرموني يحافظ على الخصوبة" } },
        title: { en: "Fertility-Sparing Hormone Therapy", ar: "علاج هرموني يحافظ على الخصوبة" },
        shortDescription: {
          en: "Clomiphene, hCG or an aromatase inhibitor to raise testosterone while keeping — or improving — sperm production.",
          ar: "كلوميفين أو hCG أو مثبّط أروماتاز لرفع التستوستيرون مع الحفاظ على إنتاج الحيوانات المنوية — أو تحسينه.",
        },
        details: {
          en: [
            "Standard testosterone replacement switches off the brain's signal to the testicles and suppresses sperm production, sometimes without full recovery. For younger men, and any man who may want children, that trade-off is usually unacceptable.",
            "These agents work upstream instead — stimulating the body's own testosterone while preserving fertility. Many men get the symptom relief they were seeking without ever needing external testosterone.",
          ],
          ar: [
            "التعويض التقليدي بالتستوستيرون يوقف إشارة الدماغ إلى الخصيتين ويثبّط إنتاج الحيوانات المنوية، أحيانًا دون تعافٍ كامل. وبالنسبة للرجال الأصغر سنًا، وأي رجل قد يرغب في الإنجاب، تكون هذه الموازنة غير مقبولة عادةً.",
            "تعمل هذه الأدوية في المنبع بدلًا من ذلك — بتحفيز التستوستيرون الطبيعي للجسم مع الحفاظ على الخصوبة. ويحصل كثير من الرجال على تخفيف الأعراض الذي كانوا يبحثون عنه دون الحاجة أبدًا لتستوستيرون خارجي.",
          ],
        },
        bullets: [
          {
            label: { en: "Best suited to", ar: "الأنسب لـ" },
            items: {
              en: ["Men under ~50 or planning children", "Secondary hypogonadism with preserved testes", "Low testosterone alongside a low sperm count"],
              ar: ["رجال دون نحو 50 عامًا أو يخططون للإنجاب", "قصور غدد تناسلية ثانوي مع خصيتين سليمتين", "نقص تستوستيرون مع ضعف عدد الحيوانات المنوية"],
            },
            tone: "teal",
          },
        ],
      },
      {
        id: "hrm-trt",
        slug: "monitored-testosterone-replacement",
        icon: "diagnosis",
        image: { src: IMG.bpCheck, alt: { en: "Monitored testosterone replacement therapy", ar: "علاج تعويضي بالتستوستيرون تحت المتابعة" } },
        title: { en: "Monitored Testosterone Replacement", ar: "تعويض تستوستيرون تحت المتابعة" },
        shortDescription: {
          en: "For genuine, confirmed hypogonadism where fertility is not a concern — replacement at the lowest effective dose, with structured follow-up.",
          ar: "لقصور الغدد التناسلية الحقيقي المؤكَّد حيث لا تُشكّل الخصوبة قلقًا — تعويض بأقل جرعة فعّالة، مع متابعة منظّمة.",
        },
        details: {
          en: [
            "When replacement is truly indicated, the dose is titrated to the lowest level that resolves symptoms — not pushed to the top of the range. Gel, short-acting or long-acting injections are chosen to fit your routine.",
            "Follow-up is not optional: testosterone level, red-cell count (haematocrit) and a prostate assessment are checked at baseline and on a schedule, and the plan is revisited if symptoms or bloods change.",
          ],
          ar: [
            "عندما يكون التعويض ضروريًا فعلًا، تُضبط الجرعة عند أقل مستوى يزيل الأعراض — لا تُدفع لأعلى النطاق. ويُختار الجل أو الحقن قصيرة أو طويلة المفعول بما يناسب روتينك.",
            "المتابعة ليست اختيارية: يُفحَص مستوى التستوستيرون وعدد كريات الدم الحمراء (الهيماتوكريت) وتقييم البروستاتا في البداية ووفق جدول، ويُعاد النظر في الخطة إذا تغيّرت الأعراض أو التحاليل.",
          ],
        },
        bullets: [
          {
            label: { en: "Appropriate when", ar: "مناسب عند" },
            items: {
              en: ["Confirmed low testosterone with clear symptoms", "Family complete / fertility not wanted", "Reversible causes already addressed"],
              ar: ["نقص تستوستيرون مؤكَّد مع أعراض واضحة", "اكتمال الأسرة / عدم الرغبة في الخصوبة", "معالجة الأسباب القابلة للعكس مسبقًا"],
            },
            tone: "teal",
          },
          {
            label: forFullMenu,
            items: {
              en: ["Never started on a single blood test", "Stopped or switched if haematocrit or PSA rises"],
              ar: ["لا يُبدأ بناءً على تحليل دم واحد", "يُوقَف أو يُبدَّل إذا ارتفع الهيماتوكريت أو PSA"],
            },
            tone: "pink",
          },
        ],
      },
    ],
  },
];

export const servicesFaqIntro = {
  eyebrow: { en: "Before You Book", ar: "قبل الحجز" } satisfies Localized,
  title: { en: "Questions about the services themselves", ar: "أسئلة عن الخدمات نفسها" } satisfies Localized,
  description: {
    en: "Practical answers on what treatment involves, how long it takes and what to expect.",
    ar: "إجابات عملية حول ما يتضمّنه العلاج، وكم يستغرق، وما الذي تتوقعه.",
  } satisfies Localized,
};
