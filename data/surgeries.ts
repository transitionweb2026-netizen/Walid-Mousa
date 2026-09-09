import type { Localized, MediaImage } from "@/lib/types";
import type { IconName } from "@/components/icons/Icon";
import { IMG } from "./images";

export interface SurgeryItem {
  id: string;
  slug: string;
  icon: IconName;
  image: MediaImage;
  title: Localized;
  shortDescription: Localized;
  /** Full explanation shown in the detail modal (paragraphs). */
  details: Localized<string[]>;
  /** Bullet list of benefits / what it achieves. */
  benefits: Localized<string[]>;
  /** Typical recovery note. */
  recovery: Localized;
  /** Surface on the Home page's "Important Surgeries" section. */
  featured: boolean;
}

export const surgeriesIntro = {
  eyebrow: { en: "Surgical Expertise", ar: "الخبرة الجراحية" } satisfies Localized,
  title: { en: "The procedures Dr. Moussa performs most", ar: "أكثر العمليات التي يجريها د. موسى" } satisfies Localized,
  description: {
    en: "Delicate, high-precision operations — most done under an operating microscope, many as day surgery.",
    ar: "عمليات دقيقة وعالية الدقة — معظمها يُجرى تحت المجهر الجراحي، وكثير منها جراحة يوم واحد.",
  } satisfies Localized,
};

export const surgeries: SurgeryItem[] = [
  {
    id: "varicocelectomy",
    slug: "microsurgical-varicocelectomy",
    icon: "microscope",
    image: { src: IMG.microscope, alt: { en: "Microsurgical varicocele repair", ar: "إصلاح دوالي الخصية ميكروسكوبيًا" } },
    title: { en: "Microsurgical Varicocelectomy", ar: "جراحة دوالي الخصية الميكروسكوبية" },
    shortDescription: {
      en: "Sub-inguinal repair of enlarged scrotal veins under high magnification — the gold standard for varicocele.",
      ar: "إصلاح الأوردة المتضخمة في كيس الصفن أسفل الأربية تحت تكبير عالٍ — المعيار الذهبي لعلاج الدوالي.",
    },
    details: {
      en: [
        "A varicocele is a cluster of dilated veins above the testicle that raises local temperature and oxidative stress — a leading correctable cause of male infertility and, for some men, a source of dull scrotal ache.",
        "Using an operating microscope, Dr. Moussa isolates and ties off only the abnormal veins through a small incision low in the groin, carefully preserving the testicular artery, lymphatics and vas deferens. This is what separates microsurgical repair from older open or laparoscopic techniques: far lower recurrence and hydrocele rates.",
        "The operation takes about 45–60 minutes per side under light general or spinal anaesthesia and is almost always same-day discharge.",
      ],
      ar: [
        "دوالي الخصية هي مجموعة من الأوردة المتوسعة أعلى الخصية ترفع درجة الحرارة الموضعية والإجهاد التأكسدي — وهي من أهم الأسباب القابلة للعلاج للعقم عند الرجال، وقد تكون مصدرًا لألم خفيف في كيس الصفن لدى بعض الرجال.",
        "باستخدام المجهر الجراحي، يعزل د. موسى الأوردة غير الطبيعية فقط ويربطها عبر شق صغير أسفل الأربية، مع الحفاظ بعناية على شريان الخصية والأوعية اللمفاوية والحبل المنوي. هذا ما يميّز الإصلاح الميكروسكوبي عن التقنيات المفتوحة أو بالمنظار الأقدم: معدلات انتكاس واستسقاء أقل بكثير.",
        "تستغرق العملية نحو 45–60 دقيقة لكل جهة تحت تخدير عام خفيف أو نصفي، والخروج في نفس اليوم في الغالب.",
      ],
    },
    benefits: {
      en: [
        "Improves sperm count, motility and DNA integrity in most men",
        "Lowest recurrence rate of any varicocele technique",
        "Relieves chronic scrotal ache where a varicocele is the cause",
        "Tiny incision, minimal disruption to daily life",
      ],
      ar: [
        "يحسّن عدد الحيوانات المنوية وحركتها وسلامة الحمض النووي لدى معظم الرجال",
        "أقل معدل انتكاس بين تقنيات علاج الدوالي",
        "يخفف الألم المزمن في كيس الصفن عندما تكون الدوالي هي السبب",
        "شق صغير جدًا وتأثير بسيط على الحياة اليومية",
      ],
    },
    recovery: { en: "Desk work in 2–3 days · full activity in ~2 weeks", ar: "العمل المكتبي خلال 2–3 أيام · النشاط الكامل خلال أسبوعين تقريبًا" },
    featured: true,
  },
  {
    id: "penile-implant",
    slug: "penile-prosthesis-implant",
    icon: "procedure",
    image: { src: IMG.operatingRoom2, alt: { en: "Penile implant surgery", ar: "جراحة دعامة القضيب" } },
    title: { en: "Penile Prosthesis Implantation", ar: "زراعة دعامة القضيب" },
    shortDescription: {
      en: "A concealed inflatable or malleable implant that reliably restores erections when medication no longer works.",
      ar: "دعامة مخفية قابلة للنفخ أو مرنة تعيد الانتصاب بشكل موثوق عندما تتوقف الأدوية عن العمل.",
    },
    details: {
      en: [
        "For men with severe erectile dysfunction — often after prostate surgery, advanced diabetes or Peyronie's disease — a penile prosthesis is the most predictable long-term solution, with the highest satisfaction rates of any ED treatment.",
        "The three-piece inflatable device is completely hidden inside the body. A discreet pump in the scrotum inflates cylinders in the penis for a natural, controllable erection, then returns everything to a soft, normal-looking state.",
        "Surgery takes around 60–90 minutes. Dr. Moussa uses a 'no-touch' antibiotic-coated technique to keep infection rates below 2%.",
      ],
      ar: [
        "بالنسبة للرجال المصابين بضعف انتصاب شديد — غالبًا بعد جراحة البروستاتا أو السكري المتقدم أو مرض بيروني — تُعد دعامة القضيب الحل الأكثر قابلية للتوقع على المدى الطويل، وبأعلى معدلات رضا بين علاجات ضعف الانتصاب.",
        "الجهاز القابل للنفخ المكوّن من ثلاث قطع مخفي تمامًا داخل الجسم. مضخة صغيرة في كيس الصفن تنفخ الأسطوانات داخل القضيب للحصول على انتصاب طبيعي يمكن التحكم فيه، ثم تعيد كل شيء إلى حالة رخوة وطبيعية المظهر.",
        "تستغرق الجراحة نحو 60–90 دقيقة. يستخدم د. موسى تقنية «عدم اللمس» بدعامة مغطاة بمضاد حيوي لإبقاء معدلات العدوى أقل من 2%.",
      ],
    },
    benefits: {
      en: [
        "Works on demand, every time — independent of blood flow or nerves",
        "Completely concealed; partners cannot detect the device",
        "Highest long-term satisfaction of any ED option (>90%)",
        "Does not affect orgasm, sensation or fertility",
      ],
      ar: [
        "يعمل عند الطلب في كل مرة — بغض النظر عن تدفق الدم أو الأعصاب",
        "مخفي تمامًا؛ لا يستطيع الشريك اكتشاف الجهاز",
        "أعلى رضا على المدى الطويل بين خيارات ضعف الانتصاب (أكثر من 90%)",
        "لا يؤثر على النشوة أو الإحساس أو الخصوبة",
      ],
    },
    recovery: { en: "Light activity in 1 week · device use taught at ~4–6 weeks", ar: "نشاط خفيف خلال أسبوع · تعليم استخدام الجهاز بعد 4–6 أسابيع" },
    featured: true,
  },
  {
    id: "vasectomy-reversal",
    slug: "microsurgical-vasectomy-reversal",
    icon: "fertility",
    image: { src: IMG.labResearch, alt: { en: "Microsurgical vasectomy reversal", ar: "عكس القطع الميكروسكوبي للحبل المنوي" } },
    title: { en: "Microsurgical Vasectomy Reversal", ar: "عكس عملية قطع الحبل المنوي ميكروسكوبيًا" },
    shortDescription: {
      en: "Two-layer microsurgical reconnection of the vas deferens to restore natural fertility after a vasectomy.",
      ar: "إعادة توصيل الحبل المنوي بطبقتين ميكروسكوبيًا لاستعادة الخصوبة الطبيعية بعد قطع الحبل المنوي.",
    },
    details: {
      en: [
        "A vasectomy reversal reconnects the tube that carries sperm, allowing a couple to conceive naturally rather than through IVF.",
        "Under the microscope, Dr. Moussa places 8–12 sutures finer than a human hair to align the inner channel precisely. If fluid testing shows a blockage nearer the epididymis, he performs the more complex vasoepididymostomy in the same sitting.",
        "Success depends mostly on the years since vasectomy and the surgeon's microsurgical experience — patency rates exceed 90% when reversal is done within ten years.",
      ],
      ar: [
        "تعيد عملية عكس قطع الحبل المنوي توصيل الأنبوب الذي يحمل الحيوانات المنوية، مما يتيح للزوجين الإنجاب طبيعيًا بدلًا من أطفال الأنابيب.",
        "تحت المجهر، يضع د. موسى 8–12 غرزة أدق من شعرة الإنسان لمحاذاة القناة الداخلية بدقة. وإذا أظهر فحص السائل انسدادًا أقرب إلى البربخ، يجري الوصلة الأكثر تعقيدًا بين الحبل والبربخ في نفس الجلسة.",
        "يعتمد النجاح غالبًا على عدد السنوات منذ العملية وعلى خبرة الجرّاح الميكروسكوبية — وتتجاوز معدلات فتح القناة 90% عند إجراء العكس خلال عشر سنوات.",
      ],
    },
    benefits: {
      en: [
        "Natural conception — no IVF cycles required",
        "One-time procedure with lasting results",
        "Outpatient surgery under light anaesthesia",
        "Sperm often returns to the ejaculate within 3 months",
      ],
      ar: [
        "حمل طبيعي — دون الحاجة لدورات أطفال أنابيب",
        "إجراء لمرة واحدة بنتائج دائمة",
        "جراحة يوم واحد تحت تخدير خفيف",
        "غالبًا ما تعود الحيوانات المنوية للسائل خلال 3 أشهر",
      ],
    },
    recovery: { en: "Rest 3–4 days · no heavy lifting or intercourse for 3 weeks", ar: "راحة 3–4 أيام · تجنّب الحمل الثقيل والجماع لمدة 3 أسابيع" },
    featured: true,
  },
  {
    id: "micro-tese",
    slug: "micro-tese-sperm-retrieval",
    icon: "dna",
    image: { src: IMG.ivDark, alt: { en: "Micro-TESE sperm retrieval", ar: "استخلاص الحيوانات المنوية ميكرو-تيسي" } },
    title: { en: "Micro-TESE Sperm Retrieval", ar: "استخلاص الحيوانات المنوية (ميكرو-تيسي)" },
    shortDescription: {
      en: "Microscope-guided search for viable sperm in men with non-obstructive azoospermia (no sperm in the semen).",
      ar: "بحث موجَّه بالمجهر عن حيوانات منوية حيّة لدى الرجال المصابين بانعدام الحيوانات المنوية غير الانسدادي.",
    },
    details: {
      en: [
        "When a semen analysis shows no sperm at all and the cause is testicular rather than a blockage, micro-TESE offers the best chance of finding sperm — roughly 50% even in this difficult group, far higher than conventional biopsy.",
        "The operating microscope lets Dr. Moussa examine the seminiferous tubules directly and pick out the small number that are wider and more opaque — the ones most likely to contain sperm — while removing far less tissue and protecting testosterone-producing cells.",
        "Retrieved sperm are used immediately for ICSI or frozen for a future cycle. The procedure is coordinated closely with the fertility team so timing lines up with the partner's egg collection.",
      ],
      ar: [
        "عندما لا يُظهر تحليل السائل المنوي أي حيوانات منوية ويكون السبب في الخصية وليس انسدادًا، يوفّر ميكرو-تيسي أفضل فرصة للعثور على حيوانات منوية — نحو 50% حتى في هذه المجموعة الصعبة، وهي نسبة أعلى بكثير من الخزعة التقليدية.",
        "يتيح المجهر الجراحي لد. موسى فحص الأنابيب المنوية مباشرة واختيار العدد القليل الأوسع والأكثر عتامة — الأكثر احتمالًا لاحتوائها على حيوانات منوية — مع إزالة نسيج أقل بكثير وحماية الخلايا المنتجة للتستوستيرون.",
        "تُستخدم الحيوانات المنوية المستخلصة فورًا في الحقن المجهري أو تُجمَّد لدورة لاحقة. ويُنسَّق الإجراء بشكل وثيق مع فريق الخصوبة بحيث يتوافق التوقيت مع سحب بويضات الزوجة.",
      ],
    },
    benefits: {
      en: [
        "Highest sperm-retrieval rate for non-obstructive azoospermia",
        "Removes minimal tissue — protects hormone function",
        "Enables biological fatherhood via ICSI",
        "Can be combined with sperm freezing",
      ],
      ar: [
        "أعلى معدل لاستخلاص الحيوانات المنوية في انعدامها غير الانسدادي",
        "يزيل أقل قدر من النسيج — يحمي وظيفة الهرمونات",
        "يتيح الأبوة البيولوجية عبر الحقن المجهري",
        "يمكن دمجه مع تجميد الحيوانات المنوية",
      ],
    },
    recovery: { en: "Home the same day · light activity for 1 week", ar: "العودة للمنزل في نفس اليوم · نشاط خفيف لمدة أسبوع" },
    featured: true,
  },
  {
    id: "peyronie",
    slug: "penile-curvature-correction",
    icon: "procedure",
    image: { src: IMG.operatingRoom, alt: { en: "Penile curvature correction surgery", ar: "جراحة تصحيح اعوجاج القضيب" } },
    title: { en: "Peyronie's & Penile Curvature Correction", ar: "تصحيح مرض بيروني واعوجاج القضيب" },
    shortDescription: {
      en: "Plication or grafting to straighten a curve that makes intercourse difficult or painful.",
      ar: "تقنية الطيّ أو الترقيع لتقويم الاعوجاج الذي يجعل الجماع صعبًا أو مؤلمًا.",
    },
    details: {
      en: [
        "Peyronie's disease is a scar (plaque) in the wall of the erectile tissue that pulls the penis into a bend, often with shortening or an hourglass narrowing. Congenital curvature causes a similar problem without a plaque.",
        "Once the curve has been stable for 6–12 months, surgery is the definitive fix. For moderate curves Dr. Moussa uses tunica plication (stitching the longer side); for severe curves or significant shortening he uses plaque incision with a graft. When ED coexists, a prosthesis can straighten and restore function in one operation.",
        "The choice of technique is made together, weighing straightness, length preservation and recovery time.",
      ],
      ar: [
        "مرض بيروني هو ندبة (لويحة) في جدار النسيج الانتصابي تسحب القضيب إلى انحناء، وغالبًا مع قِصَر أو تضيّق على شكل ساعة رملية. ويسبب الاعوجاج الخِلقي مشكلة مشابهة دون وجود لويحة.",
        "بعد استقرار الاعوجاج لمدة 6–12 شهرًا، تكون الجراحة هي الحل النهائي. للانحناءات المتوسطة يستخدم د. موسى تقنية طيّ الغلالة (خياطة الجانب الأطول)؛ وللانحناءات الشديدة أو القِصَر الملحوظ يستخدم شقّ اللويحة مع ترقيع. وعند وجود ضعف انتصاب مصاحب، يمكن للدعامة أن تقوّم وتعيد الوظيفة في عملية واحدة.",
        "يُتخذ اختيار التقنية معًا، بموازنة التقويم والحفاظ على الطول ومدة التعافي.",
      ],
    },
    benefits: {
      en: [
        "Restores a straight, functional erection",
        "Relieves pain and mechanical difficulty with intercourse",
        "Day-case or single-night stay",
        "Options tailored to curve severity and length",
      ],
      ar: [
        "يعيد انتصابًا مستقيمًا وفعّالًا",
        "يخفف الألم والصعوبة الميكانيكية أثناء الجماع",
        "جراحة يوم واحد أو مبيت ليلة واحدة",
        "خيارات مصمّمة حسب شدة الاعوجاج والطول",
      ],
    },
    recovery: { en: "Off work ~1 week · intercourse after 4–6 weeks", ar: "إجازة من العمل نحو أسبوع · الجماع بعد 4–6 أسابيع" },
    featured: false,
  },
  {
    id: "hydrocele",
    slug: "hydrocele-and-scrotal-surgery",
    icon: "procedure",
    image: { src: IMG.corridor, alt: { en: "Scrotal day surgery", ar: "جراحة كيس الصفن ليوم واحد" } },
    title: { en: "Hydrocele & Scrotal Day Surgery", ar: "جراحة الاستسقاء وكيس الصفن ليوم واحد" },
    shortDescription: {
      en: "Definitive repair of hydrocele, epididymal cysts and other benign scrotal swellings.",
      ar: "إصلاح نهائي للاستسقاء وأكياس البربخ وغيرها من تورّمات كيس الصفن الحميدة.",
    },
    details: {
      en: [
        "A hydrocele is a painless fluid collection around the testicle that can grow large enough to be uncomfortable or embarrassing. Aspiration alone almost always refills, so surgery is the reliable answer.",
        "Through a small scrotal incision the sac is opened, drained and either everted or excised so it cannot recur. Epididymal cysts and spermatoceles are removed the same way. A dissolving-stitch closure and a supportive dressing keep swelling down.",
        "The whole procedure is 30–45 minutes under local-plus-sedation or spinal anaesthesia, and you go home a couple of hours later.",
      ],
      ar: [
        "الاستسقاء هو تجمّع سائل غير مؤلم حول الخصية يمكن أن يكبر بما يكفي ليصبح مزعجًا أو محرجًا. والشفط وحده يعيد الامتلاء دائمًا تقريبًا، لذا فالجراحة هي الحل الموثوق.",
        "عبر شق صغير في كيس الصفن يُفتح الكيس ويُفرَّغ ثم يُقلب أو يُستأصل حتى لا يعود. وتُزال أكياس البربخ والقيلة المنوية بالطريقة نفسها. ويحافظ الإغلاق بخيوط قابلة للذوبان والضماد الداعم على تقليل التورّم.",
        "يستغرق الإجراء بأكمله 30–45 دقيقة تحت تخدير موضعي مع تهدئة أو تخدير نصفي، وتعود إلى المنزل بعد ساعتين.",
      ],
    },
    benefits: {
      en: [
        "Permanent fix — unlike repeated drainage",
        "Small incision, dissolving stitches",
        "Same-day discharge",
        "Rapid return to comfort and confidence",
      ],
      ar: [
        "حل دائم — بخلاف التفريغ المتكرر",
        "شق صغير وخيوط قابلة للذوبان",
        "الخروج في نفس اليوم",
        "عودة سريعة للراحة والثقة",
      ],
    },
    recovery: { en: "Rest 2–3 days · full activity in 2 weeks", ar: "راحة 2–3 أيام · النشاط الكامل خلال أسبوعين" },
    featured: false,
  },
];

export const featuredSurgeries = surgeries.filter((s) => s.featured);
