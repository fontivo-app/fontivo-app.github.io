import { Feature } from "./features";

export const coreFeaturesAr: Feature[] = [
  {
    id: "in-memory-activation",
    title: "تفعيل الخطوط بالذاكرة RAM",
    shortTitle: "محرك الذاكرة",
    tagline: "تفعيل فوري في ذاكرة الجلسة دون كتابة بايت واحد في سجل ويندوز.",
    description:
      "يحمّل فونتيفو الخطوط مباشرة عبر واجهة Win32 AddFontResourceExW بعزل FR_PRIVATE بدلاً من تكديس آلاف الملفات داخل C:\\Windows\\Fonts، وتُلغى نظيفًا بمجرد إغلاق التطبيق.",
    iconName: "Cpu",
    category: "performance",
    badge: "FR_PRIVATE < 2ms",
    highlights: [
      "صفر تعديل على سجل النظام لحماية إقلاع ويندوز وكاش الخطوط.",
      "بث إشعار WM_FONTCHANGE لتظهر الخطوط فورًا في فوتوشوب وفيجما.",
      "يعمل بصلاحيات المستخدم العادي دون الحاجة لصلاحيات مسؤول.",
    ],
    specs: [
      { label: "زمن التفعيل", value: "< 2 مللي ثانية" },
      { label: "الكتابة بالريجستري", value: "0 بايت" },
      { label: "التنظيف عند الإغلاق", value: "تلقائي 100%" },
    ],
    deepDive: {
      problemStatement:
        "تثبيت آلاف الخطوط مباشرة داخل النظام يبطئ إقلاع ويندوز ويطيل زمن تشغيل برامج Adobe CC.",
      architecturalSolution:
        "يحمل فونتيفو الخطوط مؤقتًا في الذاكرة عبر AddFontResourceExW مع علم العزل FR_PRIVATE.",
      workflow: [
        {
          step: 1,
          phase: "الاختيار",
          action: "فعّل أي عائلة خط أو مساحة مشروع داخل التطبيق.",
          outcome: "تحميل البيانات الوصفية خلال أقل من 1 مللي ثانية.",
        },
        {
          step: 2,
          phase: "التحميل",
          action: "استدعاء Win32 AddFontResourceExW بعزل FR_PRIVATE.",
          outcome: "تسجيل الخطوط في الذاكرة دون نسخ أي ملفات للقرص.",
        },
        {
          step: 3,
          phase: "المزامنة",
          action: "إرسال إشعار WM_FONTCHANGE للنوافذ المفتوحة.",
          outcome: "ظهور الخطوط فورًا داخل قوائم برامج التصميم.",
        },
      ],
      technicalSpecs: [
        { label: "المحرك", value: "Rust 2021 الأصلي + Win32 GDI32" },
        { label: "استهلاك الذاكرة", value: "~38 ميجابايت" },
        { label: "إعادة التشغيل", value: "0ms (غير مطلوبة)" },
      ],
      architectureDiagram: {
        type: "memory",
        title: "مسار التفعيل في الذاكرة",
        description:
          "ملف الخط -> مقبض ذاكرة FR_PRIVATE -> إشعار WM_FONTCHANGE -> برامج التصميم",
      },
      codeSnippet: {
        language: "rust",
        filename: "windows.rs",
        code: `let count = AddFontResourceExW(path_w.as_ptr(), FR_PRIVATE, std::ptr::null_mut());
PostMessageW(HWND_BROADCAST, WM_FONTCHANGE, 0, 0);`,
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
    title: "جسر الربط التلقائي مع Adobe CC",
    shortTitle: "جسر أدوبي",
    tagline:
      "حل مشكلة الخطوط المفقودة في فوتوشوب وإليستريتور وإن ديزاين تلقائيًا.",
    description:
      "يفحص البرنامج ملفات المشاريع (.PSD, .AI, .INDD, .PDF) محليًا ويفعّل خطوط PostScript المطلوبة عبر مقبس محلي في أجزاء من الثانية.",
    iconName: "Layers",
    category: "integration",
    badge: "منفذ 27715",
    highlights: [
      "فحص ملفات التصميم محليًا دون رفع أي ملفات للإنترنت.",
      "تفعيل خطوط مساحة العمل كاملة في الذاكرة بنقرة واحدة.",
      "مجاني بالكامل للأبد دون أي اشتراكات إضافية.",
    ],
    specs: [
      { label: "المنفذ المحلي", value: "127.0.0.1:27715" },
      { label: "الصيغ", value: ".PSD, .AI, .INDD, .PDF" },
      { label: "التكلفة", value: "مجاني ومفتوح المصدر" },
    ],
    deepDive: {
      problemStatement:
        "ظهور تنبيه Missing Fonts عند فتح مشاريع العملاء يعطل سير العمل وغالبًا ما يتطلب باقات مدفوعة في البرامج المنافسة.",
      architecturalSolution:
        "يدمج فونتيفو محلل ملفات بلغة Rust مع خادم ربط محلي محصور على localhost فقط.",
      workflow: [
        {
          step: 1,
          phase: "الفحص",
          action: "قراءة أسماء PostScript من مجلد المشروع أو الملف.",
          outcome: "تحديد الخطوط المطلوبة محليًا في لحظات.",
        },
        {
          step: 2,
          phase: "التفعيل",
          action: "مطابقة الملفات وتفعيلها بالذاكرة عبر Win32.",
          outcome: "تعمل الخطوط فورًا داخل تطبيقات Adobe.",
        },
      ],
      technicalSpecs: [
        { label: "النطاق", value: "محلي فقط (127.0.0.1)" },
        { label: "التتبع", value: "صفر بايت" },
      ],
      architectureDiagram: {
        type: "socket",
        title: "تدفق الربط المحلي",
        description:
          "PSD / AI / INDD -> مطابقة PostScript -> تفعيل بالذاكرة -> Adobe CC",
      },
      codeSnippet: {
        language: "json",
        filename: "bridge-request.json",
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
    tagline: "تنظيف آمن لمدخلات الريجستري الميتة مع عمل محلي خالٍ من التتبع.",
    description:
      "يحفظ نسخًا احتياطية قبل أي صيانة، ويحمي خطوط ويندوز الأساسية من الحذف بالخطأ، ويعمل محليًا بنسبة 100% ومختبر بـ 135 اختبار Rust.",
    iconName: "ShieldCheck",
    category: "security",
    badge: "بلا تتبع",
    highlights: [
      "قائمة حماية صارمة لخطوط النظام الأساسية مثل Segoe UI و Arial و Tahoma.",
      "صفر تتبع، صفر إعلانات، ودون الحاجة لتسجيل حساب.",
      "مختبر بـ 135 اختبار Rust و170 اختبار واجهة بنجاح.",
    ],
    specs: [
      { label: "التتبع الخارجي", value: "0 بايت" },
      { label: "الترخيص", value: "MIT مفتوح المصدر" },
    ],
    deepDive: {
      problemStatement:
        "برامج الخطوط القديمة قد تترك قيودًا معطوبة في الريجستري أو تعرض خطوط النظام للخطر.",
      architecturalSolution:
        "ينشئ فونتيفو لقطة استعادة تلقائية قبل أي إجراء صيانة مع حماية صارمة لخطوط ويندوز الأساسية.",
      workflow: [
        {
          step: 1,
          phase: "الفحص",
          action: "مراجعة قيود خطوط HKCU/HKLM ومطابقتها بالقرص.",
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
        { label: "اختبارات Rust", value: "135 ناجحة (0 تحذيرات)" },
        { label: "اختبارات الواجهة", value: "170 ناجحة" },
      ],
      architectureDiagram: {
        type: "security",
        title: "طبقة حماية النظام",
        description:
          "حماية الخطوط الأساسية -> حفظ نسخة احتياطية -> صيانة آمنة للريجستري",
      },
      codeSnippet: {
        language: "text",
        filename: "audit.log",
        code: `[OK] Core Windows fonts protected • 0 orphaned keys • Snapshot saved`,
      },
    },
  },
];
