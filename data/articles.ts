import type { Localized, MediaImage } from "@/lib/types";
import { IMG } from "./images";

export interface ArticleItem {
  id: string;
  slug: string;
  title: Localized;
  excerpt: Localized;
  image: MediaImage;
  category: Localized;
  date: string;
  readTimeMinutes: number;
  content: Localized<string[]>;
  featured: boolean;
}

export const articlesIntro = {
  eyebrow: { en: "Reading Room", ar: "غرفة القراءة" } satisfies Localized,
  title: { en: "Clear, unhurried explanations", ar: "شروحات واضحة وغير متعجّلة" } satisfies Localized,
  description: {
    en: "Longer pieces on the conditions Dr. Moussa treats — written for patients, not colleagues.",
    ar: "مقالات أطول عن الحالات التي يعالجها د. موسى — مكتوبة للمرضى، لا للزملاء.",
  } satisfies Localized,
};

export const articleCategories: { key: string; label: Localized }[] = [
  { key: "all", label: { en: "All", ar: "الكل" } },
  { key: "fertility", label: { en: "Fertility", ar: "الخصوبة" } },
  { key: "sexual-health", label: { en: "Sexual Health", ar: "الصحة الجنسية" } },
  { key: "hormones", label: { en: "Hormones", ar: "الهرمونات" } },
  { key: "surgery", label: { en: "Surgery", ar: "الجراحة" } },
];

export const articles: ArticleItem[] = [
  {
    id: "a1",
    slug: "erectile-dysfunction-causes-and-treatments",
    title: {
      en: "Erectile Dysfunction: Causes, and Why the Cause Matters",
      ar: "ضعف الانتصاب: الأسباب، ولماذا يهم السبب",
    },
    excerpt: {
      en: "ED is rarely 'just stress'. Understanding whether it's vascular, hormonal or neurological is what makes treatment work.",
      ar: "نادرًا ما يكون ضعف الانتصاب «مجرد توتر». فهم ما إذا كان وعائيًا أو هرمونيًا أو عصبيًا هو ما يجعل العلاج ناجحًا.",
    },
    image: { src: IMG.doctorConsult, alt: { en: "Doctor discussing erectile dysfunction", ar: "طبيب يناقش ضعف الانتصاب" } },
    category: { en: "Sexual Health", ar: "الصحة الجنسية" },
    date: "2026-08-12",
    readTimeMinutes: 7,
    featured: true,
    content: {
      en: [
        "Erectile dysfunction — difficulty getting or keeping an erection firm enough for satisfying sex — affects a large share of men at some point, and the likelihood rises with age and with conditions like diabetes and high blood pressure. It is common, it is medical, and in the great majority of men it is treatable.",
        "An erection is a vascular event. Arousal signals cause the arteries feeding the penis to relax and open, blood fills the erectile chambers, and the resulting pressure compresses the veins that would otherwise let blood drain away. Anything that interferes with the nerves, the arteries, the venous 'trapping' mechanism or the hormonal signal can produce ED.",
        "That is why the cause matters so much. Vascular ED — the most common type — often reflects early cardiovascular disease, because the penile arteries are narrow and show trouble first. Hormonal ED, usually low testosterone, comes with low desire and fatigue. Neurological ED follows pelvic surgery, spinal problems or diabetes-related nerve damage. Psychological ED tends to be situational, with preserved night-time and morning erections. Many men have a mix.",
        "A sensible work-up is short: a focused history including medications, a morning testosterone and metabolic panel, blood pressure, and — where it will change the plan — a penile Doppler ultrasound to measure inflow and check for venous leak.",
        "Treatment then follows the cause. Vascular ED responds to cardiometabolic treatment, correctly dosed oral medication, low-intensity shockwave therapy and, if needed, injections. Hormonal ED improves when the hormone picture is corrected. For ED that does not respond to anything else, a penile implant restores reliable function with the highest satisfaction rate of any option.",
        "The single most important message: ED is worth investigating, not just medicating. Sometimes the tablet is the answer, but sometimes the tablet is masking a warning that deserves attention.",
      ],
      ar: [
        "ضعف الانتصاب — صعوبة الحصول على انتصاب أو الحفاظ عليه بدرجة كافية لجماع مُرضٍ — يصيب نسبة كبيرة من الرجال في مرحلة ما، ويزداد احتماله مع التقدم في العمر ومع حالات مثل السكري وارتفاع ضغط الدم. وهو شائع وطبي، وقابل للعلاج لدى الغالبية العظمى من الرجال.",
        "الانتصاب حدث وعائي. إشارات الإثارة تجعل الشرايين المغذّية للقضيب ترتخي وتتّسع، فيملأ الدم الحجرات الانتصابية، ويضغط الضغط الناتج على الأوردة التي كانت ستسمح بتصريف الدم. وأي شيء يتداخل مع الأعصاب أو الشرايين أو آلية «حبس» الدم الوريدي أو الإشارة الهرمونية يمكن أن يسبب ضعف الانتصاب.",
        "لهذا يهم السبب كثيرًا. ضعف الانتصاب الوعائي — النوع الأكثر شيوعًا — غالبًا ما يعكس مرض قلب مبكرًا، لأن شرايين القضيب ضيقة وتُظهر المشكلة أولًا. أما الهرموني، وعادةً نقص التستوستيرون، فيصاحبه انخفاض الرغبة والإرهاق. والعصبي يتبع جراحة الحوض أو مشكلات العمود الفقري أو تلف الأعصاب بسبب السكري. والنفسي يميل لأن يكون موقفيًا، مع بقاء انتصاب الليل والصباح. وكثير من الرجال لديهم مزيج.",
        "الفحص المعقول قصير: تاريخ مرضي مركّز يشمل الأدوية، وتحليل تستوستيرون صباحي وفحص أيضي، وضغط الدم، وعند الحاجة دوبلر للقضيب لقياس التدفق والكشف عن التسرّب الوريدي.",
        "ثم يتبع العلاج السبب. ضعف الانتصاب الوعائي يستجيب لعلاج القلب والأيض، والدواء الفموي بجرعة صحيحة، والموجات التصادمية منخفضة الشدة، وعند الحاجة الحقن. والهرموني يتحسّن عند تصحيح الصورة الهرمونية. وبالنسبة لضعف الانتصاب الذي لا يستجيب لأي شيء آخر، تعيد دعامة القضيب وظيفة موثوقة بأعلى معدل رضا بين الخيارات.",
        "أهم رسالة: ضعف الانتصاب يستحق الفحص، لا مجرد الدواء. أحيانًا يكون القرص هو الحل، وأحيانًا يخفي القرص تحذيرًا يستحق الانتباه.",
      ],
    },
  },
  {
    id: "a2",
    slug: "varicocele-and-male-fertility",
    title: {
      en: "Varicocele and Male Fertility: What You Need to Know",
      ar: "دوالي الخصية وخصوبة الرجل: ما تحتاج معرفته",
    },
    excerpt: {
      en: "The most common correctable cause of male infertility — how it damages sperm, and who benefits from repair.",
      ar: "أكثر أسباب عقم الرجال قابلية للتصحيح — كيف تضر بالحيوانات المنوية، ومن يستفيد من الإصلاح.",
    },
    image: { src: IMG.labResearch, alt: { en: "Laboratory analysis of a semen sample", ar: "تحليل مخبري لعيّنة سائل منوي" } },
    category: { en: "Fertility", ar: "الخصوبة" },
    date: "2026-07-30",
    readTimeMinutes: 6,
    featured: true,
    content: {
      en: [
        "A varicocele is an enlargement of the network of veins that drains the testicle, similar to a varicose vein in the leg. It is found in about 15% of all men, but in 35–40% of men evaluated for infertility — which tells you how strongly the two are linked.",
        "The damage is thought to come from several directions at once: warm blood pooling around the testicle raises its temperature, back-pressure reduces oxygen delivery, and a build-up of metabolic waste and reactive oxygen species harms sperm production and damages sperm DNA. The result is typically a fall in sperm count, motility and normal forms, and a rise in DNA fragmentation.",
        "Not every varicocele needs treatment. Repair is recommended when there is a palpable varicocele together with abnormal semen parameters in a couple trying to conceive, or when a varicocele is causing testicular shrinkage, a measurable drop in testosterone, or a persistent dragging ache.",
        "Microsurgical varicocelectomy is the technique of choice. Working under an operating microscope through a small incision low in the groin, the surgeon ties off only the abnormal veins while carefully sparing the testicular artery and the lymphatic channels. This gives the lowest rates of recurrence and of post-operative hydrocele compared with older open or laparoscopic methods.",
        "After a successful repair, semen parameters improve in roughly 60–70% of men over the following three to six months, and spontaneous pregnancy rates increase. For couples who still need assisted reproduction, treating the varicocele first often improves fertilization and embryo quality and can move a couple from IVF to a simpler treatment.",
        "If you have been told you have a varicocele, the practical next step is a proper semen analysis and a scrotal examination — that combination decides whether repair will actually help you.",
      ],
      ar: [
        "دوالي الخصية هي تضخّم في شبكة الأوردة التي تصرّف الدم من الخصية، شبيهة بدوالي الساق. توجد لدى نحو 15% من جميع الرجال، لكن لدى 35–40% ممن يُقيَّمون بسبب العقم — وهذا يوضّح مدى ارتباط الاثنين.",
        "يُعتقد أن الضرر يأتي من عدة اتجاهات معًا: تجمّع الدم الدافئ حول الخصية يرفع درجة حرارتها، والضغط الراجع يقلّل توصيل الأكسجين، وتراكم الفضلات الأيضية والشقوق الأكسجينية النشطة يضر بإنتاج الحيوانات المنوية وحمضها النووي. والنتيجة عادةً انخفاض في العدد والحركة والأشكال الطبيعية، وارتفاع في تفتّت الحمض النووي.",
        "لا تحتاج كل دوالي إلى علاج. يُنصح بالإصلاح عند وجود دوالي محسوسة مع نتائج سائل منوي غير طبيعية لدى زوجين يحاولان الإنجاب، أو عندما تسبب الدوالي ضمور الخصية، أو انخفاضًا ملموسًا في التستوستيرون، أو ألمًا سحبيًا مستمرًا.",
        "الجراحة الميكروسكوبية للدوالي هي التقنية المفضّلة. بالعمل تحت المجهر الجراحي عبر شق صغير أسفل الأربية، يربط الجرّاح الأوردة غير الطبيعية فقط مع الحفاظ بعناية على شريان الخصية والقنوات اللمفاوية. وهذا يعطي أقل معدلات انتكاس واستسقاء بعد العملية مقارنةً بالطرق المفتوحة أو بالمنظار الأقدم.",
        "بعد الإصلاح الناجح، تتحسّن نتائج السائل المنوي لدى نحو 60–70% من الرجال خلال ثلاثة إلى ستة أشهر، وترتفع معدلات الحمل التلقائي. وبالنسبة للأزواج الذين ما زالوا يحتاجون الإنجاب المساعد، فإن علاج الدوالي أولًا يحسّن غالبًا الإخصاب وجودة الأجنّة وقد ينقل الزوجين من أطفال الأنابيب إلى علاج أبسط.",
        "إذا قيل لك إن لديك دوالي، فالخطوة العملية التالية هي تحليل سائل منوي سليم وفحص لكيس الصفن — هذا المزيج يقرّر ما إذا كان الإصلاح سيفيدك فعلًا.",
      ],
    },
  },
  {
    id: "a3",
    slug: "truth-about-testosterone-replacement",
    title: {
      en: "The Truth About Testosterone Replacement Therapy",
      ar: "الحقيقة حول العلاج التعويضي بالتستوستيرون",
    },
    excerpt: {
      en: "It helps the right man and harms the wrong one. Here is how to tell which you are.",
      ar: "يفيد الرجل المناسب ويضر غير المناسب. إليك كيف تعرف أيهما أنت.",
    },
    image: { src: IMG.manActive, alt: { en: "Active middle-aged man", ar: "رجل نشيط في منتصف العمر" } },
    category: { en: "Hormones", ar: "الهرمونات" },
    date: "2026-07-04",
    readTimeMinutes: 8,
    featured: true,
    content: {
      en: [
        "Testosterone replacement therapy (TRT) has gone from a niche treatment to a marketing category. Some of that attention is deserved — for a man with genuine hypogonadism, replacement can restore energy, mood, libido, muscle and bone health. But the enthusiasm has outrun the evidence in several important ways.",
        "First, the diagnosis. A man should not be started on TRT because of a single borderline result. Testosterone varies through the day and from week to week, so it needs to be measured in the morning, at least twice, alongside LH and FSH (to separate a testicular from a pituitary cause), prolactin, and a metabolic panel. Just as important is looking for reversible causes: obesity, obstructive sleep apnoea, heavy alcohol use, opioids and poorly controlled diabetes all lower testosterone and all can be treated directly.",
        "Second, fertility. Exogenous testosterone switches off the brain's signal to the testicles, which stops sperm production — often within a few months, and occasionally without full recovery. Any man who might want children in the future should not be on standard TRT. Fertility-sparing options — clomiphene, hCG, or an aromatase inhibitor in selected cases — can raise testosterone while preserving, or even improving, sperm production.",
        "Third, monitoring. TRT raises the red-cell count in some men, which needs checking; it requires a baseline and follow-up prostate assessment; and the dose should be titrated to the lowest level that resolves symptoms, not pushed to the top of the range.",
        "Fourth, expectations. TRT is not a performance enhancer for men with normal levels, and it will not fix erectile dysfunction that is primarily vascular. Where low testosterone genuinely contributes to ED, correcting it helps — but often alongside, not instead of, other treatment.",
        "Used carefully, in the right man, with the right follow-up, testosterone therapy is safe and genuinely life-improving. The problems come from skipping the work-up, ignoring fertility, and treating a lab number instead of a person.",
      ],
      ar: [
        "انتقل العلاج التعويضي بالتستوستيرون من علاج محدود إلى فئة تسويقية. بعض هذا الاهتمام مستحق — فالرجل المصاب بقصور غدد تناسلية حقيقي قد يستعيد بالتعويض الطاقة والمزاج والرغبة والعضلات وصحة العظام. لكن الحماس تجاوز الدليل في عدة جوانب مهمة.",
        "أولًا، التشخيص. لا ينبغي بدء العلاج بسبب نتيجة حدّية واحدة. يتغيّر التستوستيرون خلال اليوم ومن أسبوع لآخر، لذا يجب قياسه صباحًا مرتين على الأقل، مع LH وFSH (للتمييز بين سبب خصوي ونخامي)، والبرولاكتين، وفحص أيضي. ولا يقل أهمية البحث عن الأسباب القابلة للعكس: السمنة، وانقطاع النفس النومي، وإدمان الكحول، والمواد الأفيونية، والسكري غير المنضبط، كلها تخفض التستوستيرون ويمكن علاجها مباشرة.",
        "ثانيًا، الخصوبة. التستوستيرون الخارجي يوقف إشارة الدماغ إلى الخصيتين، مما يوقف إنتاج الحيوانات المنوية — غالبًا خلال أشهر قليلة، وأحيانًا دون تعافٍ كامل. وأي رجل قد يرغب في الإنجاب مستقبلًا لا ينبغي أن يكون على العلاج التقليدي. والبدائل التي تحافظ على الخصوبة — كلوميفين، أو hCG، أو مثبّط أروماتاز في حالات مختارة — يمكن أن ترفع التستوستيرون مع الحفاظ على إنتاج الحيوانات المنوية، بل وتحسينه.",
        "ثالثًا، المتابعة. يرفع العلاج عدد كريات الدم الحمراء لدى بعض الرجال، وهذا يحتاج فحصًا؛ ويتطلب تقييمًا مبدئيًا ومتابعًا للبروستاتا؛ وينبغي ضبط الجرعة عند أقل مستوى يزيل الأعراض، لا دفعها لأعلى النطاق.",
        "رابعًا، التوقعات. العلاج ليس معززًا للأداء عند الرجال ذوي المستويات الطبيعية، ولن يعالج ضعف الانتصاب الوعائي بالأساس. وحيث يُسهم نقص التستوستيرون فعلًا في ضعف الانتصاب، فإن تصحيحه يساعد — لكن غالبًا إلى جانب علاج آخر، لا بدلًا منه.",
        "باستخدام حذر، لدى الرجل المناسب، مع المتابعة المناسبة، يكون علاج التستوستيرون آمنًا ومحسّنًا للحياة فعلًا. وتأتي المشكلات من تخطّي الفحص، وتجاهل الخصوبة، وعلاج رقم مخبري بدلًا من إنسان.",
      ],
    },
  },
  {
    id: "a4",
    slug: "male-fertility-work-up-first-steps",
    title: {
      en: "Understanding the Male Fertility Work-Up: The First Steps",
      ar: "فهم فحص خصوبة الرجل: الخطوات الأولى",
    },
    excerpt: {
      en: "Half of couple infertility involves a male factor. A proper evaluation is quick, and often finds something fixable.",
      ar: "نصف حالات عقم الأزواج تتضمن عامل ذكورة. التقييم السليم سريع، وغالبًا ما يجد شيئًا قابلًا للإصلاح.",
    },
    image: { src: IMG.familyBaby, alt: { en: "New parent with a baby", ar: "أحد الوالدين حديثًا مع طفل" } },
    category: { en: "Fertility", ar: "الخصوبة" },
    date: "2026-06-16",
    readTimeMinutes: 6,
    featured: true,
    content: {
      en: [
        "When a couple has been trying to conceive for a year without success — or six months if the woman is over 35 — both partners should be evaluated at the same time. In practice the man is often assessed last or not at all, even though a male factor contributes in about half of cases.",
        "The male work-up starts with two semen analyses, done a few weeks apart, after two to five days of abstinence, ideally in a laboratory experienced in andrology. A single abnormal result is common and not conclusive; the pattern across two samples is what matters.",
        "Alongside this, Dr. Moussa takes a history — childhood testicular problems, infections, surgery, medications, anabolic steroid or testosterone use, heat exposure, smoking — and performs a scrotal examination, which is how most varicoceles are found. A hormone panel (testosterone, LH, FSH, prolactin) and, where indicated, a scrotal ultrasound and genetic testing complete the picture.",
        "This is usually enough to place a man in one of a few groups: a treatable structural problem such as a varicocele; a hormonal problem; a problem with sperm transport or ejaculation; azoospermia requiring further classification; or idiopathic sub-fertility, where lifestyle and antioxidant measures plus assisted reproduction are the route forward.",
        "The reason the work-up is worth doing thoroughly is that the findings frequently change the couple's whole pathway — reducing the intensity of fertility treatment needed, improving its success rate, or occasionally making it unnecessary. It also picks up the small number of men in whom infertility is the first sign of a serious underlying condition.",
      ],
      ar: [
        "عندما يحاول زوجان الإنجاب لمدة عام دون نجاح — أو ستة أشهر إذا كانت الزوجة فوق 35 — ينبغي تقييم الطرفين في الوقت نفسه. وعمليًا يُقيَّم الرجل أخيرًا أو لا يُقيَّم إطلاقًا، رغم أن عامل الذكورة يُسهم في نحو نصف الحالات.",
        "يبدأ فحص الرجل بتحليلين للسائل المنوي، بفارق أسابيع قليلة، بعد امتناع يومين إلى خمسة أيام، ويُفضَّل في مختبر متمرّس في أمراض الذكورة. النتيجة غير الطبيعية الواحدة شائعة وغير حاسمة؛ والنمط عبر عيّنتين هو ما يهم.",
        "إلى جانب ذلك، يأخذ د. موسى التاريخ المرضي — مشكلات الخصية في الطفولة، والالتهابات، والجراحة، والأدوية، واستخدام المنشطات أو التستوستيرون، والتعرّض للحرارة، والتدخين — ويجري فحصًا لكيس الصفن، وهو ما تُكتشف به معظم الدوالي. ويكمل الصورة تحليل هرموني (تستوستيرون، LH، FSH، برولاكتين)، وعند الحاجة أشعة على كيس الصفن وفحص جيني.",
        "هذا يكفي عادةً لوضع الرجل في إحدى فئات قليلة: مشكلة تركيبية قابلة للعلاج مثل الدوالي؛ أو مشكلة هرمونية؛ أو مشكلة في نقل الحيوانات المنوية أو القذف؛ أو انعدام حيوانات منوية يحتاج تصنيفًا إضافيًا؛ أو ضعف خصوبة مجهول السبب، حيث يكون نمط الحياة ومضادات الأكسدة مع الإنجاب المساعد هو الطريق.",
        "سبب أهمية إجراء الفحص بدقة أن النتائج تغيّر كثيرًا مسار الزوجين بالكامل — بتقليل شدة علاج الخصوبة المطلوب، أو تحسين معدل نجاحه، أو أحيانًا جعله غير ضروري. كما يكتشف العدد القليل من الرجال الذين يكون العقم فيهم أول علامة لحالة خطيرة كامنة.",
      ],
    },
  },
  {
    id: "a5",
    slug: "premature-ejaculation-a-practical-guide",
    title: {
      en: "Premature Ejaculation: A Practical Guide to Getting Control Back",
      ar: "سرعة القذف: دليل عملي لاستعادة التحكم",
    },
    excerpt: {
      en: "The most common male sexual complaint, and one of the most responsive to a combined approach.",
      ar: "أكثر الشكاوى الجنسية شيوعًا عند الرجال، ومن أكثرها استجابة للنهج المركّب.",
    },
    image: { src: IMG.coupleSunset, alt: { en: "Relaxed couple at home", ar: "زوجان مسترخيان في المنزل" } },
    category: { en: "Sexual Health", ar: "الصحة الجنسية" },
    date: "2026-05-22",
    readTimeMinutes: 5,
    featured: false,
    content: {
      en: [
        "Premature ejaculation (PE) means ejaculating sooner than a man and his partner would like, with a sense of little or no control, and with distress as a result. It can be lifelong — present from the first sexual experiences — or acquired later, often alongside erectile anxiety or relationship stress.",
        "A brief assessment is useful. It checks for a thyroid or prostate contributor, clarifies whether the latency is genuinely very short or the concern is more about perception and confidence, and looks for co-existing ED, which is common and changes the plan: treating the erection problem first often improves ejaculatory control on its own.",
        "The most effective approach combines methods rather than relying on one. Behavioural techniques — the stop-start and squeeze methods, and pelvic-floor training — build durable control over weeks. A topical desensitizing spray or cream, applied and then wiped before intercourse, reduces sensitivity without significantly numbing the partner. And a low-dose oral medication, taken either daily or a few hours before sex, lengthens latency substantially in most men.",
        "Realistic expectations help. The goal is not a specific number of minutes but a level of control that feels comfortable for both partners. Most men reach that within a few weeks, and many are eventually able to reduce or stop medication while keeping the behavioural gains.",
      ],
      ar: [
        "سرعة القذف تعني القذف أسرع مما يرغب الرجل وشريكته، مع شعور بقلّة التحكم أو انعدامه، وضيق نتيجة لذلك. وقد تكون مدى الحياة — موجودة منذ أول التجارب الجنسية — أو مكتسبة لاحقًا، غالبًا مع قلق الانتصاب أو توتر العلاقة.",
        "التقييم المختصر مفيد. يتحقق من وجود عامل من الغدة الدرقية أو البروستاتا، ويوضّح ما إذا كان الزمن قصيرًا جدًا فعلًا أم أن القلق يتعلق أكثر بالإدراك والثقة، ويبحث عن ضعف انتصاب مصاحب، وهو شائع ويغيّر الخطة: علاج مشكلة الانتصاب أولًا يحسّن غالبًا التحكم في القذف من تلقاء نفسه.",
        "النهج الأكثر فعالية يجمع الطرق بدل الاعتماد على واحدة. التقنيات السلوكية — طريقتا التوقف والبدء والضغط، وتدريب قاع الحوض — تبني تحكمًا دائمًا خلال أسابيع. ودهان أو بخاخ موضعي مخدّر، يُوضع ثم يُمسح قبل الجماع، يقلّل الحساسية دون تخدير الشريك بدرجة كبيرة. ودواء فموي بجرعة منخفضة، يُؤخذ يوميًا أو قبل الجماع بساعات، يطيل الزمن بشكل كبير لدى معظم الرجال.",
        "التوقعات الواقعية تساعد. الهدف ليس عددًا محددًا من الدقائق بل مستوى تحكم مريح للطرفين. ويصل معظم الرجال إلى ذلك خلال أسابيع قليلة، ويستطيع كثيرون في النهاية تقليل الدواء أو إيقافه مع الحفاظ على المكاسب السلوكية.",
      ],
    },
  },
  {
    id: "a6",
    slug: "penile-implant-what-to-expect",
    title: {
      en: "Penile Implants: What They Are and What to Expect",
      ar: "دعامات القضيب: ما هي وماذا تتوقع",
    },
    excerpt: {
      en: "For severe ED that no longer responds to medication, an implant is the most reliable and satisfying solution.",
      ar: "لضعف الانتصاب الشديد الذي لم يعد يستجيب للدواء، الدعامة هي الحل الأكثر موثوقية ورضا.",
    },
    image: { src: IMG.operatingRoom2, alt: { en: "Operating theatre prepared for surgery", ar: "غرفة عمليات مجهّزة للجراحة" } },
    category: { en: "Surgery", ar: "الجراحة" },
    date: "2026-04-18",
    readTimeMinutes: 6,
    featured: false,
    content: {
      en: [
        "A penile prosthesis is a device implanted entirely within the body that allows a man to produce an erection whenever he wants one. It is offered when other treatments — tablets, shockwave therapy, injections — have failed or are not tolerated, and it is the standard of care after some prostate cancer surgery and in advanced Peyronie's disease.",
        "The most common type is the three-piece inflatable implant. Two cylinders sit inside the erectile chambers, a small pump sits hidden in the scrotum, and a reservoir of fluid sits behind the abdominal wall. Squeezing the pump moves fluid into the cylinders for a firm, straight erection; pressing a release valve returns everything to a soft, natural-looking state.",
        "The operation takes about an hour to ninety minutes. Dr. Moussa uses an infection-prevention protocol — antibiotic-coated devices and a 'no-touch' technique — that keeps infection rates below 2%. Most men stay one night. There is swelling and discomfort for two to three weeks, managed with simple pain relief, and the device is activated and taught to the patient at around four to six weeks.",
        "The results are why satisfaction is so high — consistently above 90% for both men and partners. The erection is on demand, every time; it does not depend on blood flow, nerves or mood; and it does not affect orgasm, sensation, urination or the ability to father a child. The main trade-off is that it is irreversible: the natural erectile tissue is not preserved.",
        "For the right man, an implant is not a last resort so much as a definitive answer — many describe regret only that they waited so long.",
      ],
      ar: [
        "دعامة القضيب جهاز يُزرع بالكامل داخل الجسم ويتيح للرجل إحداث انتصاب متى أراد. تُقدَّم عندما تفشل العلاجات الأخرى — الأقراص والموجات التصادمية والحقن — أو لا تُحتمل، وهي المعيار العلاجي بعد بعض جراحات سرطان البروستاتا وفي مرض بيروني المتقدم.",
        "النوع الأكثر شيوعًا هو الدعامة القابلة للنفخ المكوّنة من ثلاث قطع. أسطوانتان داخل الحجرتين الانتصابيتين، ومضخة صغيرة مخفية في كيس الصفن، وخزان سائل خلف جدار البطن. الضغط على المضخة يحرّك السائل إلى الأسطوانتين لانتصاب صلب ومستقيم؛ والضغط على صمام التحرير يعيد كل شيء إلى حالة رخوة طبيعية المظهر.",
        "تستغرق العملية نحو ساعة إلى تسعين دقيقة. ويستخدم د. موسى بروتوكولًا للوقاية من العدوى — أجهزة مغطاة بمضاد حيوي وتقنية «عدم اللمس» — يُبقي معدلات العدوى أقل من 2%. ويبيت معظم الرجال ليلة واحدة. ويوجد تورّم وانزعاج لأسبوعين إلى ثلاثة، يُدار بمسكّن بسيط، ويُفعَّل الجهاز ويُعلَّم للمريض بعد نحو أربعة إلى ستة أسابيع.",
        "النتائج هي سبب ارتفاع الرضا كثيرًا — أعلى من 90% باستمرار للرجال والشريكات. الانتصاب عند الطلب في كل مرة؛ ولا يعتمد على تدفق الدم أو الأعصاب أو المزاج؛ ولا يؤثر على النشوة أو الإحساس أو التبوّل أو القدرة على الإنجاب. والموازنة الرئيسية أنه لا رجعة فيه: لا يُحفَظ النسيج الانتصابي الطبيعي.",
        "بالنسبة للرجل المناسب، الدعامة ليست ملاذًا أخيرًا بقدر ما هي إجابة نهائية — ويصف كثيرون ندمهم الوحيد على أنهم انتظروا طويلًا.",
      ],
    },
  },
  {
    id: "a7",
    slug: "mens-health-check-after-40",
    title: {
      en: "The Men's Health Check Every Man Should Have After 40",
      ar: "الفحص الصحي الذي ينبغي لكل رجل إجراؤه بعد الأربعين",
    },
    excerpt: {
      en: "One appointment that maps hormones, heart risk, prostate and sexual function before problems become urgent.",
      ar: "موعد واحد يرسم خريطة الهرمونات ومخاطر القلب والبروستاتا والوظيفة الجنسية قبل أن تصبح المشكلات عاجلة.",
    },
    image: { src: IMG.manPortrait, alt: { en: "Man in his forties", ar: "رجل في الأربعينيات" } },
    category: { en: "Hormones", ar: "الهرمونات" },
    date: "2026-03-26",
    readTimeMinutes: 5,
    featured: false,
    content: {
      en: [
        "Men are famously reluctant to see a doctor when nothing is obviously wrong, and midlife is exactly when a quiet check pays off. Several things drift at once from the forties onward — testosterone, blood pressure, blood sugar, weight distribution, urinary flow and erectile function — and they are easier to influence early.",
        "A focused men's health assessment covers four areas. Hormonal: a morning testosterone with the pituitary hormones, to catch true hypogonadism and its reversible drivers. Cardiometabolic: blood pressure, lipids, HbA1c and waist measurement, because erectile changes are often the first sign here. Prostate: a baseline PSA and symptom review, interpreted sensibly rather than reflexively. And sexual health: a frank, unhurried conversation, since many men have been quietly managing a problem for years.",
        "The value is not in the individual tests but in seeing them together. Low testosterone with a rising waistline and borderline sugar is a different situation from low testosterone alone, and the plan reflects that — usually a combination of targeted lifestyle change, treatment of the specific issues that matter to the man, and hormone therapy only where it is clearly justified.",
        "Done once and then repeated annually, this check turns midlife health from something that happens to a man into something he manages.",
      ],
      ar: [
        "يشتهر الرجال بترددهم في زيارة الطبيب عندما لا يوجد خطأ واضح، ومنتصف العمر هو بالضبط وقت الفحص الهادئ المفيد. عدة أمور تتغيّر معًا من الأربعينيات فصاعدًا — التستوستيرون، وضغط الدم، وسكر الدم، وتوزيع الوزن، وتدفق البول، ووظيفة الانتصاب — والتأثير فيها أسهل مبكرًا.",
        "التقييم المركّز لصحة الرجل يغطي أربعة مجالات. الهرموني: تستوستيرون صباحي مع هرمونات الغدة النخامية، لاكتشاف القصور الحقيقي ومسبباته القابلة للعكس. القلبي الأيضي: ضغط الدم، والدهون، والسكر التراكمي، وقياس الخصر، لأن تغيّرات الانتصاب غالبًا أول علامة هنا. البروستاتا: PSA مبدئي ومراجعة للأعراض، تُفسَّر بحكمة لا بشكل انعكاسي. والصحة الجنسية: حوار صريح غير متعجّل، إذ يتعامل كثير من الرجال بهدوء مع مشكلة لسنوات.",
        "القيمة ليست في الفحوصات الفردية بل في رؤيتها معًا. نقص التستوستيرون مع زيادة محيط الخصر وسكر حدّي وضع مختلف عن نقص التستوستيرون وحده، والخطة تعكس ذلك — عادةً مزيج من تغييرات مستهدفة في نمط الحياة، وعلاج المشكلات المحددة التي تهم الرجل، وعلاج هرموني فقط حيث يكون مبرَّرًا بوضوح.",
        "بإجرائه مرة ثم تكراره سنويًا، يحوّل هذا الفحص صحة منتصف العمر من شيء يحدث للرجل إلى شيء يديره.",
      ],
    },
  },
];

export const featuredArticles = articles.filter((a) => a.featured).slice(0, 4);
