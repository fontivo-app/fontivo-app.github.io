import { currentRelease } from "@/config/releases";

export interface FAQItem {
  id: string;
  question: string;
  questionAr: string;
  answer: string;
  answerAr: string;
  category: "general" | "technical" | "workflow" | "security" | "licensing";
}

export const faqCategories = [
  { id: "all", label: "All", labelAr: "الكل" },
  { id: "general", label: "General", labelAr: "عام" },
  { id: "technical", label: "RAM & App", labelAr: "الذاكرة والتطبيق" },
  { id: "workflow", label: "Adobe & Workflow", labelAr: "أدوبي وسير العمل" },
  { id: "security", label: "Safety", labelAr: "الأمان" },
  {
    id: "licensing",
    label: "11K Fonts & License",
    labelAr: "المكتبة والترخيص",
  },
] as const;

export const faqItems: FAQItem[] = [
  {
    id: "what-is-fontivo",
    category: "general",
    question: "What is Fontivo and how is it different?",
    questionAr: "ما هو فونتيفو وبماذا يتميز؟",
    answer:
      "Fontivo is a lightweight, open-source Windows font manager built with Native Rust & React 19. Unlike heavy Electron managers or paid subscription tools, it uses ~38 MB RAM, starts in under 0.35s, includes Adobe CC auto-activation and Color Studio, and is 100% free forever.",
    answerAr:
      "فونتيفو مدير خطوط مكتبي خفيف ومفتوح المصدر لنظام ويندوز، مطوّر بلغة Rust وReact 19. يتميز باستهلاك ~38 ميجابايت فقط من الذاكرة وإقلاع أسرع من 0.35 ثانية مع جسر أدوبي واستوديو الألوان مجانًا بالكامل للأبد.",
  },
  {
    id: "live-ram-virtualization",
    category: "technical",
    question: "Does RAM activation modify the Windows Registry?",
    questionAr: "هل تفعيل الخطوط في الرام يغيّر سجل ويندوز (Registry)؟",
    answer:
      "No. Fontivo mounts fonts in user session memory using Win32 AddFontResourceExW (FR_PRIVATE) and never copies files to C:\\Windows\\Fonts or adds permanent registry keys. Everything unloads cleanly when you close the app.",
    answerAr:
      "لا نهائيًا. يستخدم فونتيفو واجهة Win32 AddFontResourceExW بعلم العزل FR_PRIVATE لتفعيل الخطوط مؤقتًا في الذاكرة دون نسخ ملفات أو كتابة مفاتيح دائمة، وتُلغى نظيفًا عند إغلاق البرنامج.",
  },
  {
    id: "font-library-delivery",
    category: "licensing",
    question: "What is inside the Fontivo-Fonts v1.0.3 library (10,939 fonts)?",
    questionAr: "ما الذي تتضمنه مكتبة Fontivo-Fonts v1.0.3 (10,939 خط)؟",
    answer: `To keep the desktop installer lightweight (${currentRelease.assets[0].sizeFormatted}), Fontivo pairs with the Fontivo-Fonts v1.0.3 release containing 10,939 verified, deduplicated fonts across 4,430 families (Latin 7,146 • Urdu 1,565 • Persian 1,257 • Arabic 971) split into 15 SHA-256 verified ZIP packs (864.01 MB total).`,
    answerAr: `للحفاظ على خفة التطبيق (${currentRelease.assets[0].sizeFormatted})، تتوفر مكتبة Fontivo-Fonts v1.0.3 بصورة مستقلة وتضم 10,939 خطًا فريدًا عبر 4,430 عائلة (لاتيني 7,146 • أردو 1,565 • فارسي 1,257 • عربي 971) موزعة على 15 حزمة ZIP موثقة بهاش SHA-256.`,
  },
  {
    id: "adobe-bridge",
    category: "workflow",
    question: "How does Adobe CC Auto-Activation work?",
    questionAr: "كيف يعمل الربط التلقائي مع برامج Adobe CC؟",
    answer:
      "Fontivo listens locally on 127.0.0.1:27715 and inspects .PSD, .AI, and .INDD files on your machine to identify missing PostScript names, mounting matching workspace fonts in RAM automatically.",
    answerAr:
      "يعمل خادم محلي على المنفذ 127.0.0.1:27715 لفحص ملفات .PSD و.AI و.INDD على جهازك وتفعيل الخطوط المطابقة تلقائيًا في الذاكرة دون مغادرة جهازك.",
  },
  {
    id: "admin-permissions",
    category: "security",
    question: "Do I need administrator rights to run Fontivo?",
    questionAr: "هل أحتاج لصلاحيات المدير (Administrator) لتشغيل التطبيق؟",
    answer:
      "No admin rights are needed for normal browsing and RAM font activation. Both the setup installer and portable ZIP run smoothly in standard user mode.",
    answerAr:
      "لا تحتاج لأي صلاحيات مسؤول للتصفح أو تفعيل الخطوط بالذاكرة. كل من المثبت والنسخة المحمولة يعملان بسلاسة في وضع المستخدم العادي.",
  },
  {
    id: "system-health-doctor",
    category: "security",
    question: "How does System Health protect my Windows fonts?",
    questionAr: "كيف يحمي فحص صحة النظام خطوط ويندوز الأساسية؟",
    answer:
      "Fontivo strictly protects essential Windows system fonts (like Segoe UI, Arial, and Tahoma) from removal and takes an automatic backup snapshot before cleaning dead registry references.",
    answerAr:
      "يفرض التطبيق قائمة حماية صارمة لخطوط ويندوز الأساسية مثل Segoe UI وArial وTahoma، وينشئ لقطة استعادة قبل تنظيف أي قيود ميتة في السجل.",
  },
  {
    id: "pricing-open-source",
    category: "licensing",
    question: "Is Fontivo really 100% free and open source?",
    questionAr: "هل فونتيفو مجاني ومفتوح المصدر بالكامل حقًا؟",
    answer:
      "Yes. Fontivo Desktop is released under the MIT License and the curated fonts release on Fontivo-Fonts uses open font licenses. No accounts, no subscriptions, and zero telemetry.",
    answerAr:
      "نعم، التطبيق مرخص تحت MIT ومفتوح المصدر بالكامل بدون حسابات أو اشتراكات أو أي جمع لبيانات المستخدمين.",
  },
  {
    id: "supported-platforms",
    category: "technical",
    question: "Which Windows versions are supported?",
    questionAr: "ما أنظمة التشغيل المدعومة حاليًا؟",
    answer:
      "Fontivo Desktop targets Windows 10 (64-bit, 1909+) and Windows 11 with Microsoft Edge WebView2 Runtime (pre-installed on Windows 11 and modern Windows 10).",
    answerAr:
      "يدعم التطبيق حاليًا أنظمة Windows 10 (64-bit) وWindows 11 مع مكون WebView2 المدمج افتراضيًا في إصدارات ويندوز الحديثة.",
  },
];
