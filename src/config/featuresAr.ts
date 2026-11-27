import { Feature } from "./features";

export const coreFeaturesAr: Feature[] = [
  {
    id: "in-memory-activation",
    title: "تفعيل الخطوط الفوري للجلسة",
    shortTitle: "التفعيل الفوري",
    tagline: "فعّل الخطوط فورًا دون إبطاء ويندوز أو تكديس مجلد خطوط النظام.",
    description:
      "استخدم أي خط فورًا داخل برامج التصميم دون نسخ آلاف الملفات إلى مجلد خطوط ويندوز. تظهر الخطوط مباشرة وتُلغى نظيفًا بمجرد إغلاق التطبيق.",
    iconName: "Cpu",
    category: "performance",
    badge: "فوري < 2ms",
    highlights: [
      "يحافظ على نظافة مجلد خطوط ويندوز — ويحمي سرعة الإقلاع وقوائم الخطوط.",
      "يحدّث Photoshop وIllustrator وInDesign وFigma مباشرة بمجرد التفعيل.",
      "يعمل بصلاحيات المستخدم العادي دون الحاجة لصلاحيات مسؤول.",
    ],
    specs: [
      { label: "زمن التفعيل", value: "< 2 مللي ثانية" },
      { label: "تكديس النظام", value: "صفر" },
      { label: "التنظيف عند الإغلاق", value: "تلقائي 100%" },
    ],
    deepDive: {
      problemStatement:
        "تثبيت آلاف الخطوط مباشرة داخل النظام يبطئ إقلاع ويندوز ويطيل زمن تشغيل برامج Adobe CC.",
      architecturalSolution:
        "يفعّل فونتيفو الخطوط لجلستك الحالية فقط دون نسخ الملفات إلى مجلد خطوط النظام.",
      workflow: [
        {
          step: 1,
          phase: "الاختيار",
          action: "فعّل أي عائلة خط أو مساحة مشروع داخل التطبيق.",
          outcome: "تحميل البيانات الوصفية خلال أقل من 1 مللي ثانية.",
        },
        {
          step: 2,
          phase: "التفعيل",
          action: "تحميل الخطوط مباشرة لجلستك الإبداعية الحالية.",
          outcome: "جاهزية الخطوط دون نسخ أي ملفات لويندوز.",
        },
        {
          step: 3,
          phase: "المزامنة",
          action: "إشعار برامج التصميم المفتوحة تلقائيًا.",
          outcome: "ظهور الخطوط فورًا داخل قوائم برامج التصميم.",
        },
      ],
      technicalSpecs: [
        { label: "سرعة الإقلاع", value: "< 0.35 ثانية" },
        { label: "استهلاك الذاكرة", value: "~38 ميجابايت" },
        { label: "إعادة التشغيل", value: "غير مطلوبة" },
      ],
      architectureDiagram: {
        type: "memory",
        title: "مسار التفعيل للجلسة",
        description:
          "ملف الخط -> تفعيل الجلسة -> مزامنة فورية -> برامج التصميم",
      },
      codeSnippet: {
        language: "text",
        filename: "session.log",
        code: `[OK] Font family activated for session • 0 system files copied`,
      },
    },
  },
  {
    id: "font-catalog",
    title: "مكتبة 10,939 خطًا + خطوط Google",
    shortTitle: "المكتبة الموحدة",
    tagline:
      "تصفح قرابة 11,000 خط مُدقق ومنقى من التكرار مع مجلداتك وخطوط Google.",
    description:
      "نظّم مجلداتك المحلية وزامن خطوط Google إلى جانب مكتبة تضم 10,939 خطًا فريدًا عبر 4,430 عائلة موزعة بين اللاتينية (7,146) والأردو (1,565) والفارسية (1,257) والعربية (971).",
    iconName: "Library",
    category: "core",
    badge: "10,939 خط",
    highlights: [
      "تسمية موحدة بالإنجليزية من البيانات الوصفية وتجميع دقيق للعائلات.",
      "صفر تكرار عبر فحص SHA-256 لكامل العائلات البالغ عددها 4,430 عائلة.",
      "شبكة معاينة سريعة تدعم العربية واللاتينية بمختلف الأوزان.",
    ],
    specs: [
      { label: "إجمالي الخطوط", value: "10,939" },
      { label: "العائلات الطباعية", value: "4,430" },
      { label: "اللغات", value: "لاتيني، أردو، فارسي، عربي" },
    ],
    deepDive: {
      problemStatement:
        "تعاني مكتبات الخطوط العشوائية من التكرار وأسماء الملفات غير الواضحة وتبعثر العائلات.",
      architecturalSolution:
        "تُستخرج أسماء كل الخطوط في Fontivo-Fonts v1.0.3 من جداول name الثنائية مع إزالة المكررات وتجميع كل عائلة معًا.",
      workflow: [
        {
          step: 1,
          phase: "الفهرسة",
          action: "فحص المجلدات المحلية وبيانات المكتبة القياسية.",
          outcome: "بحث فوري بالاسم والعائلة واللغة.",
        },
        {
          step: 2,
          phase: "المعاينة",
          action: "تجربة النصوص العربية واللاتينية بأحجام وأوزان متعددة.",
          outcome: "مقارنة دقيقة للخطوط قبل تفعيلها.",
        },
      ],
      technicalSpecs: [
        { label: "خطوط لاتينية", value: "7,146" },
        { label: "خطوط أردو", value: "1,565" },
        { label: "خطوط فارسية", value: "1,257" },
        { label: "خطوط عربية", value: "971" },
      ],
      architectureDiagram: {
        type: "engine",
        title: "فهرسة المكتبة والمعاينة",
        description:
          "تحليل بيانات الخط -> إزالة مكررات SHA-256 -> شبكة المعاينة السريعة",
      },
      codeSnippet: {
        language: "json",
        filename: "manifest.json",
        code: `{ "libraryVersion": "1.0.3", "totalUniqueFonts": 10939, "totalFamilies": 4430, "totalPackages": 15 }`,
      },
    },
  },
  {
    id: "font-packs-cdn",
    title: "حزم الخطوط على GitHub (v1.0.3)",
    shortTitle: "الحزم السحابية",
    tagline: "تطبيق خفيف بحجم 4.00 MB مع تحميل الحزم التي تحتاجها فقط.",
    description:
      "حمّل أيًا من الحزم الـ 15 الموثقة (بإجمالي 864.01 MB) مباشرة من الإصدار الوحيد الرسمي v1.0.3 على GitHub مع تحقق SHA-256 وفك ضغط آمن.",
    iconName: "CloudDownload",
    category: "cloud",
    badge: "15 حزمة موثقة",
    highlights: [
      "إصدار موحد ونظيف (v1.0.3) على مستودع Fontivo-Fonts.",
      "تحقق تلقائي من تجزئة SHA-256 لكل حزمة قبل فك الضغط.",
      "حماية ضد هجمات Zip Slip ومسارات الملفات غير الآمنة.",
    ],
    specs: [
      { label: "الإصدار", value: "v1.0.3" },
      { label: "عدد الحزم", value: "15 أرشيف ZIP" },
      { label: "الحجم المضغوط", value: "864.01 MB" },
    ],
    deepDive: {
      problemStatement:
        "دمج قرابة 1.7 GB من الخطوط داخل ملف التثبيت يجعل تنزيل البرنامج بطيئًا ويهدر المساحة.",
      architecturalSolution:
        "يفصل فونتيفو التطبيق التنفيذي (4.00 MB) عن حزم الخطوط المستضافة على GitHub Releases.",
      workflow: [
        {
          step: 1,
          phase: "المزامنة",
          action: "جلب بيان الحزم الرسمي من Fontivo-Fonts.",
          outcome: "عرض الأحجام الدقيقة وهاش SHA-256 لكل حزمة.",
        },
        {
          step: 2,
          phase: "الاستخراج",
          action: "فحص البصمة الرقمية ثم فك الضغط في %APPDATA%\\Fontivo.",
          outcome: "تُضاف الخطوط تلقائيًا لفهرس التطبيق.",
        },
      ],
      technicalSpecs: [
        { label: "مثبت ويندوز", value: "4.00 MB" },
        { label: "النسخة المحمولة", value: "3.07 MB" },
        { label: "التحقق الأمني", value: "SHA-256 إلزامي" },
      ],
      architectureDiagram: {
        type: "cdn",
        title: "بث الحزم من GitHub",
        description:
          "أرشيف v1.0.3 -> فحص SHA-256 -> مستخرج آمن -> المكتبة المحلية",
      },
      codeSnippet: {
        language: "powershell",
        filename: "verify.ps1",
        code: `Get-FileHash .\\fontivo-essential-001.zip -Algorithm SHA256`,
      },
    },
  },
  {
    id: "adobe-live-bridge",
    title: "المزامنة التلقائية مع Adobe CC",
    shortTitle: "مزامنة أدوبي",
    tagline:
      "تتفعّل الخطوط المفقودة تلقائيًا عند فتح ملفاتك في فوتوشوب وإليستريتور وإن ديزاين.",
    description:
      "يفحص فونتيفو ملفات التصميم محليًا (.PSD, .AI, .INDD, .PDF) ويفعّل الخطوط المفقودة تلقائيًا من مساحة عملك دون أي تدخل يدوي.",
    iconName: "Layers",
    category: "integration",
    badge: "مزامنة تلقائية",
    highlights: [
      "فحص ملفات التصميم محليًا دون رفع أي ملفات للإنترنت.",
      "تفعيل خطوط مساحة العمل المطلوبة تلقائيًا بنقرة واحدة.",
      "مجاني بالكامل للأبد دون أي اشتراكات إضافية.",
    ],
    specs: [
      { label: "وضع المزامنة", value: "محلي 100% بدون إنترنت" },
      { label: "الصيغ", value: ".PSD, .AI, .INDD, .PDF" },
      { label: "التكلفة", value: "مجاني ومفتوح المصدر" },
    ],
    deepDive: {
      problemStatement:
        "ظهور تنبيه Missing Fonts عند فتح مشاريع العملاء يعطل سير العمل وغالبًا ما يتطلب باقات مدفوعة في البرامج المنافسة.",
      architecturalSolution:
        "يدمج فونتيفو ماسح ملفات سريعًا يعمل دون إنترنت لمزامنة الخطوط المفقودة مباشرة مع برامج Adobe CC.",
      workflow: [
        {
          step: 1,
          phase: "الفحص",
          action: "فحص مجلد المشروع أو ملف التصميم المفتوح.",
          outcome: "تحديد الخطوط المطلوبة محليًا في لحظات.",
        },
        {
          step: 2,
          phase: "التفعيل",
          action: "مطابقة خطوط مساحة العمل وتفعيلها للجلسة.",
          outcome: "تعمل الخطوط فورًا داخل تطبيقات Adobe.",
        },
      ],
      technicalSpecs: [
        { label: "المعالجة", value: "محلية على جهازك فقط" },
        { label: "التتبع", value: "صفر بايت" },
      ],
      architectureDiagram: {
        type: "socket",
        title: "المزامنة المحلية التلقائية",
        description:
          "PSD / AI / INDD -> مطابقة الخطوط -> تفعيل فوري -> Adobe CC",
      },
      codeSnippet: {
        language: "json",
        filename: "sync-request.json",
        code: `{ "action": "activateFonts", "fonts": ["Cairo-Bold", "Inter-Regular"] }`,
      },
    },
  },
  {
    id: "workspaces-brand-studio",
    title: "استوديو الألوان والهوية وتصدير .ASE",
    shortTitle: "استوديو الألوان",
    tagline: "التقط الألوان، وافحص التباين WCAG، وصدّر لوحات Adobe .ASE جاهزة.",
    description:
      "نظّم خطوط وألوان كل مشروع معًا، وتحقق من نسب التباين WCAG 2.1، وصدّر ملفات لوحات ألوان .ASE القياسية أو متغيرات CSS فورًا.",
    iconName: "Palette",
    category: "brand",
    badge: ".ASE & WCAG",
    highlights: [
      "قطارة شاشة مدمجة بمكبر 5x5 لالتقاط أدق درجات الألوان.",
      "حساب فوري لنسب التباين AA / AAA للخلفيات الداكنة والفاتحة.",
      "إنشاء ملفات .ASE ثنائية قياسية متوافقة مع برامج التصميم.",
    ],
    specs: [
      { label: "التصدير", value: ".ASE, CSS, JSON" },
      { label: "فحص التباين", value: "WCAG 2.1 AA / AAA" },
    ],
    deepDive: {
      problemStatement:
        "تنقل المصمم بين أدوات متفرقة لحساب التباين، التقاط الألوان، وتصدير ملفات .ASE يبطئ تسليم الهويات.",
      architecturalSolution:
        "يجمع فونتيفو مساحات المشاريع مع مولد ثنائي دقيق لصيغة .ASE وحاسبة تباين مدمجة.",
      workflow: [
        {
          step: 1,
          phase: "الاختيار",
          action: "التقط لونًا بالمكبر أو أدخل رموز الهوية.",
          outcome: "تحليل فوري للتباين وقيم Hex/RGB.",
        },
        {
          step: 2,
          phase: "التصدير",
          action: "تصدير ملف .ASE أو متغيرات CSS.",
          outcome: "جاهز للاستيراد المباشر في Illustrator أو الكود.",
        },
      ],
      technicalSpecs: [
        { label: "بنية ASE", value: "Big-Endian IEEE-754" },
        { label: "الأسماء العربية", value: "UTF-16BE مدعومة" },
      ],
      architectureDiagram: {
        type: "brand",
        title: "مسار إنتاج الهوية",
        description: "قطارة الألوان -> فحص WCAG -> تصدير .ASE / رموز CSS",
      },
      codeSnippet: {
        language: "css",
        filename: "tokens.css",
        code: `:root { --fontivo-plum: #291C2E; --fontivo-coral: #F16B50; --fontivo-lavender: #B7A1D9; }`,
      },
    },
  },
  {
    id: "system-fonts-recovery",
    title: "حماية خطوط النظام والخصوصية",
    shortTitle: "أمان النظام",
    tagline: "تنظيف آمن لقيود الخطوط المعطوبة مع عمل محلي خالٍ من التتبع.",
    description:
      "يحفظ نسخًا احتياطية قبل أي صيانة، ويحمي خطوط ويندوز الأساسية من الحذف بالخطأ، ويعمل محليًا بدون إنترنت بنسبة 100%.",
    iconName: "ShieldCheck",
    category: "security",
    badge: "بلا تتبع",
    highlights: [
      "قائمة حماية صارمة لخطوط النظام الأساسية مثل Segoe UI و Arial و Tahoma.",
      "صفر تتبع، صفر إعلانات، ودون الحاجة لتسجيل حساب.",
      "مختبر بدقة عبر اختبارات آلية شاملة لسطح المكتب والواجهة.",
    ],
    specs: [
      { label: "التتبع الخارجي", value: "0 بايت" },
      { label: "الترخيص", value: "MIT مفتوح المصدر" },
    ],
    deepDive: {
      problemStatement:
        "برامج الخطوط القديمة قد تترك قيودًا معطوبة أو تعرض خطوط النظام للخطر.",
      architecturalSolution:
        "ينشئ فونتيفو لقطة استعادة تلقائية قبل أي إجراء صيانة مع حماية صارمة لخطوط ويندوز الأساسية.",
      workflow: [
        {
          step: 1,
          phase: "الفحص",
          action: "مراجعة قيود خطوط النظام ومطابقتها بالملفات.",
          outcome: "تنظيف القيود المعلقة فقط بأمان.",
        },
        {
          step: 2,
          phase: "الحماية",
          action: "حفظ نسخة استعادة وإبقاء خطوط النظام محمية.",
          outcome: "إمكانية التراجع بنقرة واحدة عند الحاجة.",
        },
      ],
      technicalSpecs: [
        { label: "الوضع", value: "عمل محلي 100% بدون إنترنت" },
        { label: "الخصوصية", value: "بدون حسابات أو تتبع" },
      ],
      architectureDiagram: {
        type: "security",
        title: "طبقة حماية النظام",
        description:
          "حماية الخطوط الأساسية -> حفظ نسخة احتياطية -> تنظيف آمن للنظام",
      },
      codeSnippet: {
        language: "text",
        filename: "audit.log",
        code: `[OK] Core Windows fonts protected • 0 broken entries • Snapshot saved`,
      },
    },
  },
];
