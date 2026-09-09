import type { Localized, MediaImage } from "@/lib/types";
import type { IconName } from "@/components/icons/Icon";
import { IMG } from "./images";

export interface TreatmentItem {
  id: string;
  slug: string;
  icon: IconName;
  image: MediaImage;
  title: Localized;
  shortDescription: Localized;
  /** Full explanation shown in the detail modal (paragraphs). */
  details: Localized<string[]>;
  /** Common signs / symptoms that bring men in. */
  signs: Localized<string[]>;
  /** Treatment options Dr. Moussa offers for this problem. */
  options: Localized<string[]>;
  /** Surface on the Home page's "Find Your Treatment" section. */
  featured: boolean;
}

export const treatmentsIntro = {
  eyebrow: { en: "Find Your Treatment", ar: "ابحث عن علاجك" } satisfies Localized,
  title: { en: "Start with the problem, not the procedure", ar: "ابدأ من المشكلة، لا من الإجراء" } satisfies Localized,
  description: {
    en: "Tell us what you're experiencing. Most concerns have several routes to a fix — we begin with the least invasive one that works.",
    ar: "أخبرنا بما تعانيه. لمعظم المشكلات عدة طرق للحل — نبدأ بأقلها تدخّلًا وأكثرها فعالية.",
  } satisfies Localized,
};

export const treatments: TreatmentItem[] = [
  {
    id: "ed",
    slug: "erectile-dysfunction",
    icon: "vitality",
    image: { src: IMG.handsRings, alt: { en: "Couple walking together", ar: "زوجان يسيران معًا" } },
    title: { en: "Erectile Dysfunction", ar: "ضعف الانتصاب" },
    shortDescription: {
      en: "Difficulty getting or keeping an erection firm enough for sex — usually a treatable sign of vascular, hormonal or psychological factors.",
      ar: "صعوبة الحصول على انتصاب أو الحفاظ عليه بدرجة كافية للجماع — وغالبًا ما يكون علامة قابلة للعلاج لعوامل وعائية أو هرمونية أو نفسية.",
    },
    details: {
      en: [
        "ED is common and, in most men, a warning light rather than a diagnosis on its own. Because the penile arteries are small, they often show trouble years before the heart does — which is why a proper work-up matters.",
        "Assessment includes a focused history, hormone panel, metabolic screen and, when useful, a penile Doppler ultrasound to see whether the problem is blood inflow, venous leak or nerves. Treatment then follows the cause.",
        "Options run from lifestyle and medication through shockwave therapy and intracavernosal treatment to, for the most resistant cases, a penile implant. Almost every man who wants to regain function can.",
      ],
      ar: [
        "ضعف الانتصاب شائع، وهو لدى معظم الرجال إشارة تحذير أكثر من كونه تشخيصًا مستقلًا. ولأن شرايين القضيب صغيرة، فإنها غالبًا ما تُظهر المشكلة قبل القلب بسنوات — ولهذا فإن الفحص الدقيق مهم.",
        "يشمل التقييم تاريخًا مرضيًا مركّزًا، وتحليلًا للهرمونات، وفحصًا أيضيًا، وعند الحاجة دوبلر للقضيب لمعرفة ما إذا كانت المشكلة في تدفق الدم الداخل أو تسرّب وريدي أو الأعصاب. ثم يتبع العلاج السبب.",
        "تتراوح الخيارات من نمط الحياة والدواء، مرورًا بالموجات التصادمية والحقن الموضعي، وصولًا إلى دعامة القضيب في الحالات الأكثر مقاومة. ويمكن لأي رجل تقريبًا يرغب في استعادة وظيفته أن يفعل ذلك.",
      ],
    },
    signs: {
      en: ["Softer erections or losing firmness during sex", "Needing more stimulation than before", "Fewer morning erections", "Anxiety or avoidance around intimacy"],
      ar: ["انتصاب أضعف أو فقدان الصلابة أثناء الجماع", "الحاجة لتحفيز أكثر من السابق", "قلّة انتصاب الصباح", "قلق أو تجنّب تجاه العلاقة الحميمة"],
    },
    options: {
      en: ["Cardiometabolic & hormone optimization", "Oral PDE5 medication, dosed correctly", "Low-intensity shockwave therapy (Li-ESWT)", "Intracavernosal / topical therapy", "Penile prosthesis for resistant ED"],
      ar: ["تحسين القلب والأيض والهرمونات", "أدوية فموية بجرعات صحيحة", "علاج بالموجات التصادمية منخفضة الشدة", "علاج بالحقن الموضعي أو الدهان", "دعامة القضيب للحالات المقاومة"],
    },
    featured: true,
  },
  {
    id: "male-infertility",
    slug: "male-infertility",
    icon: "fertility",
    image: { src: IMG.familyBaby, alt: { en: "Parent holding a baby at home", ar: "أحد الوالدين يحمل طفلًا في المنزل" } },
    title: { en: "Male Infertility & Low Sperm Count", ar: "العقم عند الرجال وضعف الحيوانات المنوية" },
    shortDescription: {
      en: "A male factor is involved in about half of couples who struggle to conceive — and much of it is correctable.",
      ar: "يُسهم عامل الذكورة في نحو نصف الأزواج الذين يواجهون صعوبة في الإنجاب — وكثير منه قابل للتصحيح.",
    },
    details: {
      en: [
        "A basic couple work-up too often skips the man. A proper male evaluation — two semen analyses, hormones, a scrotal exam and ultrasound, and genetic testing where indicated — frequently finds something specific: a varicocele, a hormone imbalance, an infection, a blockage, or a lifestyle contributor.",
        "Correcting the cause can lift a couple from IVF to IUI, or from IUI to natural conception. When assisted reproduction is still needed, optimizing the man first improves fertilization and embryo quality.",
        "For azoospermia (no sperm in the ejaculate), the pathway splits into obstructive — reconstructable by microsurgery — and non-obstructive, where micro-TESE can still retrieve sperm in about half of men.",
      ],
      ar: [
        "كثيرًا ما يتجاهل الفحص الأساسي للزوجين الرجلَ. والتقييم الذكوري السليم — تحليلان للسائل المنوي، والهرمونات، وفحص كيس الصفن والأشعة، والفحص الجيني عند الحاجة — يجد غالبًا سببًا محددًا: دوالي، أو خلل هرموني، أو التهاب، أو انسداد، أو عامل متعلق بنمط الحياة.",
        "تصحيح السبب قد ينقل الزوجين من أطفال الأنابيب إلى التلقيح الصناعي، أو من التلقيح إلى الحمل الطبيعي. وعند الحاجة للإنجاب المساعد، فإن تحسين حالة الرجل أولًا يحسّن الإخصاب وجودة الأجنّة.",
        "في حالة انعدام الحيوانات المنوية، ينقسم المسار إلى انسدادي — يمكن إصلاحه بالجراحة الميكروسكوبية — وغير انسدادي، حيث لا يزال ميكرو-تيسي قادرًا على استخلاص حيوانات منوية لدى نحو نصف الرجال.",
      ],
    },
    signs: {
      en: ["Trying to conceive for 12 months (or 6 months over age 35) without success", "An abnormal semen analysis", "A visible or achy varicocele", "History of undescended testis, mumps or chemotherapy"],
      ar: ["محاولة الإنجاب لمدة 12 شهرًا (أو 6 أشهر فوق سن 35) دون نجاح", "تحليل سائل منوي غير طبيعي", "دوالي ظاهرة أو مؤلمة", "تاريخ من الخصية المعلّقة أو النكاف أو العلاج الكيميائي",],
    },
    options: {
      en: ["Structured couple + male fertility work-up", "Microsurgical varicocelectomy", "Hormonal stimulation of sperm production", "Treatment of infection or ejaculatory dysfunction", "Vasectomy reversal or micro-TESE for azoospermia"],
      ar: ["فحص خصوبة منظّم للزوجين وللرجل", "جراحة دوالي ميكروسكوبية", "تحفيز هرموني لإنتاج الحيوانات المنوية", "علاج الالتهاب أو اضطراب القذف", "عكس قطع الحبل المنوي أو ميكرو-تيسي لانعدام الحيوانات",],
    },
    featured: true,
  },
  {
    id: "premature-ejaculation",
    slug: "premature-ejaculation",
    icon: "clock",
    image: { src: IMG.coupleSunset, alt: { en: "Couple relaxing at home", ar: "زوجان يستريحان في المنزل" } },
    title: { en: "Premature Ejaculation", ar: "سرعة القذف" },
    shortDescription: {
      en: "Ejaculation that consistently happens sooner than you and your partner would like, with little sense of control.",
      ar: "قذف يحدث باستمرار أسرع مما ترغب أنت وشريكتك، مع قلّة الإحساس بالتحكم.",
    },
    details: {
      en: [
        "PE is the most common male sexual complaint and one of the most treatable. It can be lifelong or acquired, and it often travels with erectile anxiety, so both are assessed together.",
        "A short evaluation rules out a thyroid or prostate contributor and clarifies whether the pattern is truly rapid latency or a perception issue. From there, a combination approach works best: behavioural technique, a topical desensitizing agent, and — where appropriate — a low-dose oral medication taken on demand or daily.",
        "Most men see a meaningful, lasting improvement within a few weeks.",
      ],
      ar: [
        "سرعة القذف أكثر الشكاوى الجنسية شيوعًا عند الرجال ومن أكثرها قابلية للعلاج. وقد تكون مدى الحياة أو مكتسبة، وغالبًا ما ترافقها قلق الانتصاب، لذا يُقيَّم الاثنان معًا.",
        "يستبعد تقييم قصير وجود عامل من الغدة الدرقية أو البروستاتا، ويوضّح ما إذا كان النمط سرعة حقيقية في الزمن أم مسألة إدراك. ومن هناك يكون النهج المركّب هو الأفضل: تقنية سلوكية، ودهان موضعي مخدّر، وعند الحاجة دواء فموي بجرعة منخفضة يُؤخذ عند الطلب أو يوميًا.",
        "يلاحظ معظم الرجال تحسنًا ملموسًا ودائمًا خلال أسابيع قليلة.",
      ],
    },
    signs: {
      en: ["Ejaculating within about a minute of penetration", "Inability to delay ejaculation most of the time", "Frustration, distress or avoiding sex as a result"],
      ar: ["القذف خلال دقيقة تقريبًا من الإيلاج", "عدم القدرة على تأخير القذف في معظم الأحيان", "إحباط أو ضيق أو تجنّب الجماع نتيجة لذلك"],
    },
    options: {
      en: ["Behavioural training (stop–start, pelvic-floor work)", "Topical desensitizing spray or cream", "On-demand or daily oral medication", "Treating any co-existing erectile dysfunction", "Couple-focused counselling referral when helpful"],
      ar: ["تدريب سلوكي (التوقف والبدء، تمارين قاع الحوض)", "بخاخ أو كريم موضعي مخدّر", "دواء فموي عند الطلب أو يوميًا", "علاج أي ضعف انتصاب مصاحب", "تحويل لاستشارة زوجية عند الفائدة"],
    },
    featured: true,
  },
  {
    id: "low-testosterone",
    slug: "low-testosterone",
    icon: "vitality",
    image: { src: IMG.manActive, alt: { en: "Active man outdoors", ar: "رجل نشيط في الهواء الطلق" } },
    title: { en: "Low Testosterone (Hypogonadism)", ar: "نقص هرمون الذكورة" },
    shortDescription: {
      en: "Persistently low testosterone with real symptoms — low drive, fatigue, mood and body-composition change.",
      ar: "انخفاض مستمر في التستوستيرون مع أعراض حقيقية — انخفاض الرغبة والطاقة والمزاج وتغيّر تكوين الجسم.",
    },
    details: {
      en: [
        "A single low reading is not a diagnosis. Testosterone should be measured in the morning, twice, alongside LH, FSH, prolactin and a metabolic panel to separate a testicular cause from a pituitary one — and to catch the reversible drivers: weight, sleep apnoea, opioids, alcohol and uncontrolled diabetes.",
        "If replacement is genuinely indicated, Dr. Moussa reviews the trade-offs carefully. Standard testosterone therapy shuts down the body's own production and can impair fertility, so for younger men who may want children he favours agents that raise testosterone while preserving sperm production.",
        "Treatment is monitored: symptoms, blood count, PSA and testosterone level, with the dose adjusted to the lowest that restores wellbeing.",
      ],
      ar: [
        "قراءة منخفضة واحدة ليست تشخيصًا. يجب قياس التستوستيرون صباحًا، مرتين، إلى جانب LH وFSH والبرولاكتين وفحص أيضي، للتمييز بين سبب خصوي وآخر نخامي — ولاكتشاف المسببات القابلة للعكس: الوزن، وانقطاع النفس النومي، والمواد الأفيونية، والكحول، والسكري غير المنضبط.",
        "إذا كان التعويض ضروريًا فعلًا، يراجع د. موسى الموازنات بعناية. فالعلاج التقليدي بالتستوستيرون يوقف إنتاج الجسم الطبيعي وقد يضعف الخصوبة، لذا يفضّل للرجال الأصغر سنًا الذين قد يرغبون في الإنجاب أدوية ترفع التستوستيرون مع الحفاظ على إنتاج الحيوانات المنوية.",
        "تتم متابعة العلاج: الأعراض، وصورة الدم، وPSA، ومستوى التستوستيرون، مع ضبط الجرعة عند أقل مستوى يعيد الشعور بالعافية.",
      ],
    },
    signs: {
      en: ["Low libido and fewer spontaneous erections", "Constant fatigue and low mood", "Loss of muscle, gain in abdominal fat", "Poor concentration, disturbed sleep"],
      ar: ["انخفاض الرغبة وقلّة الانتصاب التلقائي", "إرهاق دائم ومزاج منخفض", "فقدان العضلات وزيادة دهون البطن", "ضعف التركيز واضطراب النوم"],
    },
    options: {
      en: ["Confirming the diagnosis with correct testing", "Fixing reversible causes first", "Fertility-sparing options (clomiphene, hCG)", "Monitored testosterone replacement when appropriate", "Ongoing safety follow-up (PSA, haematocrit)"],
      ar: ["تأكيد التشخيص بالفحوصات الصحيحة", "معالجة الأسباب القابلة للعكس أولًا", "خيارات تحافظ على الخصوبة (كلوميفين، hCG)", "تعويض تستوستيرون تحت المتابعة عند الحاجة", "متابعة أمان مستمرة (PSA، الهيماتوكريت)"],
    },
    featured: true,
  },
  {
    id: "peyronie-disease",
    slug: "peyronies-disease",
    icon: "procedure",
    image: { src: IMG.manReading, alt: { en: "Man in a quiet moment", ar: "رجل في لحظة تفكير" } },
    title: { en: "Peyronie's Disease", ar: "مرض بيروني" },
    shortDescription: {
      en: "Curvature, pain or a palpable lump caused by scar tissue in the erectile bodies.",
      ar: "اعوجاج أو ألم أو كتلة محسوسة بسبب نسيج ندبي في الأجسام الانتصابية.",
    },
    details: {
      en: [
        "Peyronie's has two phases. In the active phase there is pain and a changing curve; in the stable phase the curve settles but can leave intercourse difficult. Treatment depends on which phase you are in.",
        "Early on, the aim is to limit progression and pain — oral agents, traction therapy and, for suitable plaques, a course of collagenase injections that can measurably reduce the curve without surgery.",
        "Once stable, and if the bend still interferes with sex, surgery is definitive: plication for moderate curves, grafting for severe ones, or a prosthesis when ED is also present.",
      ],
      ar: [
        "لمرض بيروني مرحلتان. في المرحلة النشطة يوجد ألم واعوجاج متغيّر؛ وفي المرحلة المستقرة يستقر الاعوجاج لكنه قد يترك الجماع صعبًا. ويعتمد العلاج على المرحلة التي أنت فيها.",
        "في البداية يكون الهدف الحدّ من التطوّر والألم — أدوية فموية، وعلاج بالشد، وللويحات المناسبة سلسلة من حقن الكولاجيناز التي يمكن أن تقلّل الاعوجاج بشكل ملموس دون جراحة.",
        "بعد الاستقرار، وإذا ظل الاعوجاج يعيق الجماع، تكون الجراحة هي الحل النهائي: الطيّ للانحناءات المتوسطة، والترقيع للشديدة، أو الدعامة عند وجود ضعف انتصاب أيضًا.",
      ],
    },
    signs: {
      en: ["A new bend or narrowing of the erect penis", "A firm lump you can feel under the skin", "Pain with erection (usually early on)", "Shortening or difficulty with penetration"],
      ar: ["اعوجاج جديد أو تضيّق في القضيب المنتصب", "كتلة صلبة تشعر بها تحت الجلد", "ألم مع الانتصاب (عادة في البداية)", "قِصَر أو صعوبة في الإيلاج"],
    },
    options: {
      en: ["Ultrasound assessment of the plaque and curve", "Oral therapy + penile traction in the active phase", "Intralesional collagenase injections for suitable plaques", "Plication or grafting surgery once stable", "Implant + straightening when ED coexists"],
      ar: ["تقييم اللويحة والاعوجاج بالموجات فوق الصوتية", "علاج فموي + شد للقضيب في المرحلة النشطة", "حقن كولاجيناز داخل اللويحة للحالات المناسبة", "جراحة طيّ أو ترقيع بعد الاستقرار", "دعامة + تقويم عند وجود ضعف انتصاب"],
    },
    featured: false,
  },
  {
    id: "andropause",
    slug: "andropause-and-aging-male",
    icon: "consultation",
    image: { src: IMG.manPortrait, alt: { en: "Portrait of a man in his fifties", ar: "صورة لرجل في الخمسينيات" } },
    title: { en: "Andropause & the Aging Male", ar: "سن اليأس عند الرجال وتقدّم العمر" },
    shortDescription: {
      en: "The gradual hormonal and sexual changes of midlife — assessed properly, not dismissed as 'just age'.",
      ar: "التغيّرات الهرمونية والجنسية التدريجية في منتصف العمر — تُقيَّم بشكل صحيح، لا تُهمَل بحجة «العمر فقط».",
    },
    details: {
      en: [
        "From the forties onward, testosterone drifts down slowly and other things change with it: sleep, energy, mood, erections, urinary flow and body shape. Some of this is hormonal, some vascular, some lifestyle — and the mix is different for every man.",
        "A single visit can map it out: hormones, metabolic and cardiovascular risk, prostate check, and a frank conversation about sexual function. The plan that follows is usually a combination of targeted lifestyle change, treating the specific problems that matter to you, and hormone therapy only where it is truly justified.",
        "The goal is not to chase a number — it is to keep you well, active and confident through midlife and beyond.",
      ],
      ar: [
        "من الأربعينيات فصاعدًا، ينخفض التستوستيرون ببطء وتتغيّر معه أمور أخرى: النوم، والطاقة، والمزاج، والانتصاب، وتدفق البول، وشكل الجسم. بعض ذلك هرموني، وبعضه وعائي، وبعضه متعلق بنمط الحياة — والمزيج يختلف من رجل لآخر.",
        "يمكن لزيارة واحدة أن ترسم الصورة: الهرمونات، ومخاطر الأيض والقلب، وفحص البروستاتا، وحوار صريح عن الوظيفة الجنسية. والخطة التالية عادةً مزيج من تغييرات مستهدفة في نمط الحياة، وعلاج المشكلات المحددة التي تهمّك، وعلاج هرموني فقط حيث يكون مبرَّرًا فعلًا.",
        "الهدف ليس ملاحقة رقم — بل إبقاؤك بصحة جيدة ونشاط وثقة خلال منتصف العمر وما بعده.",
      ],
    },
    signs: {
      en: ["Lower energy and drive than a few years ago", "Weight gain around the middle despite no change in diet", "Softer erections and reduced morning erections", "Irritability, low motivation or poor sleep"],
      ar: ["طاقة ورغبة أقل مما كانت قبل سنوات قليلة", "زيادة وزن حول الوسط رغم عدم تغيّر النظام الغذائي", "انتصاب أضعف وقلّة انتصاب الصباح", "تهيّج أو ضعف دافعية أو نوم سيئ"],
    },
    options: {
      en: ["Comprehensive midlife men's health assessment", "Cardiometabolic risk reduction", "Targeted treatment of sexual & urinary symptoms", "Fertility-aware hormone therapy where justified", "Structured annual review"],
      ar: ["تقييم شامل لصحة الرجل في منتصف العمر", "خفض مخاطر القلب والأيض", "علاج مستهدف للأعراض الجنسية والبولية", "علاج هرموني يراعي الخصوبة حيث يكون مبرَّرًا", "مراجعة سنوية منظّمة"],
    },
    featured: false,
  },
];

export const featuredTreatments = treatments.filter((t) => t.featured).slice(0, 4);
