import { Profile, Skill, Experience, Education, Certification, Project, Service } from "./types";

export const uiTranslations = {
  en: {
    about: "About",
    skills: "Skills",
    experience: "Experience",
    services: "Services",
    education: "Education",
    projects: "Projects",
    contact: "Contact",
    resumeBtn: "Download Resume",
    sysCyber: "CYBER",
    sysLight: "LIGHT",
    downloadCV: "Download Resume",
    pdfGuideTitle: "PDF SAVE INSTRUCTIONS",
    pdfGuideText: "To save as a pristine PDF, click the print button above and choose \"Save as PDF\" as your target printer. Ensure you adjust scaling and background graphics in your print settings if necessary.",
    close: "Close",
    clearFilter: "Clear selection filter",
    filteringBy: "Filtering by",
    techStackTitle: "Technical Stack",
    techStackDesc: "A collection of technologies I have integrated across projects, enterprise solutions, and sandbox environments.",
    servicesTitle: "Engineering Services",
    servicesDesc: "Scalable full-stack development, high-throughput data engineering pipelines, and intelligent AI backend architecture.",
    servicesSubtitle: "Specialized offerings bridging software engineering, data systems, and business architecture.",
    servicesDeliverables: "Key Deliverables & Specifications",
    servicesTech: "Core Technologies & Architectural Stack",
    requestService: "Inquire About Service",
    discussScope: "Discuss Project Scope",
    all: "All",
    languages: "Languages",
    frameworks: "Frameworks",
    cloudDevOps: "Cloud & DevOps",
    databases: "Databases",
    langDesc: "Syntax and foundations for robust and native scripts.",
    frameDesc: "Structured frameworks for client views and app servers.",
    cloudDesc: "Orchestration, containment, and continuous delivery pipelines.",
    dbDesc: "Persistent warehouses for secure transactional models.",
    coreJourneyTitle: "Core Journey",
    coreJourneyDesc: "Chronological ledger of professional, educational, and commercial milestones.",
    academicTitle: "Academic Foundations",
    academicDesc: "Formal academic history and qualifications.",
    certsTitle: "Industry Certifications",
    certsDesc: "Verified validation of technological fluency and operational paradigms.",
    projectsTitle: "Sandboxed Projects",
    projectsDesc: "Live prototypes, experimental engines, and published production-ready solutions.",
    liveDemo: "Live Demo",
    sourceCode: "Source Code",
    interactiveShell: "Interactive Shell",
    bashTerminal: "Terminal Shell Bash Emulator",
    readmeTab: "README.md",
    profileTab: "Profile.json",
    terminalLogsTab: "terminal_logs.sh",
    contactMeTab: "contact_me.py",
    contactTitle: "Initiate Communication",
    copyEmail: "Copy Email Address",
    copied: "Copied!",
    footerDesc: "A developer sandbox of Moustafa Hany Azab. Code. Ship. Impact.",
    backToTop: "Back to top",
    designedBy: "Designed & Engineered by Hany",
    systemReady: "SYSTEM READY",
    bashWelcome: "Welcome to Hany's Shell. Type 'help' to see available commands.",
    commandPrompt: "guest@hany-world:~$",
    interactiveEditor: "Live Interactive Editor",
    editorHeader: "Interactive Profile Editor — Modify fields below to update live portfolio view!",
    editModeLabel: "Bilingual JSON schema editing mode",
    resetBtn: "Reset Profile",
    saveBtn: "Apply Profile Changes",
    nameLabel: "Developer Name",
    roleLabel: "Target Role",
    missionLabel: "Operational Mission",
    focusLabel: "Target Focus Sectors (comma-separated)",
    bioLabel: "Professional Biography",
    emailCopiedToClipboard: "Email copied to clipboard!",
    skillsCategory: "Skills Category",
    showCertificates: "View IBM/Coursera Credentials"
  },
  ar: {
    about: "من أنا",
    skills: "المهارات",
    experience: "الخبرات",
    services: "الخدمات",
    education: "التعليم",
    projects: "المشاريع",
    contact: "اتصل بي",
    resumeBtn: "تحميل السيرة الذاتية",
    sysCyber: "سيبراني",
    sysLight: "مضيء",
    downloadCV: "تحميل السيرة الذاتية",
    pdfGuideTitle: "تعليمات حفظ PDF",
    pdfGuideText: "لحفظ الملف بصيغة PDF نقية ومثالية، انقر فوق زر الطباعة أعلاه واختر \"حفظ بتنسيق PDF\" كطابعة مستهدفة. يرجى تفعيل طباعة الخلفيات والرسومات وتعيين الهوامش إلى 'بلا' للحصول على مظهر ممتاز.",
    close: "إغلاق",
    clearFilter: "إزالة التصفية",
    filteringBy: "تصفية حسب",
    techStackTitle: "مجموعة التقنيات",
    techStackDesc: "مجموعة من التقنيات التي قمت بدمجها وتطبيقها عبر المشاريع والمحاكاة التفاعلية المختلفة.",
    servicesTitle: "الخدمات الهندسية والبرمجية",
    servicesDesc: "تطوير برمجيات الويب المتكاملة، بناء خطوط أنابيب هندسة البيانات، وهندسة خوادم الذكاء الاصطناعي عالية الأداء.",
    servicesSubtitle: "خدمات تخصصية تجمع بين هندسة البرمجيات، أنظمة البيانات، ونظم معلومات الأعمال.",
    servicesDeliverables: "أبرز المخرجات والمواصفات الفنية",
    servicesTech: "الركائز والتقنيات المعمارية المعتمدة",
    requestService: "طلب استشارة أو تنفيذ الخدمة",
    discussScope: "مناقشة تفاصيل المشروع",
    all: "الكل",
    languages: "لغات البرمجة",
    frameworks: "إطارات العمل",
    cloudDevOps: "السحابية والعمليات",
    databases: "قواعد البيانات",
    langDesc: "أسس برمجية متينة لبناء نصوص برمجية قوية وفعالة.",
    frameDesc: "أطر عمل هيكلية لواجهات المستخدم وخوادم التطبيقات.",
    cloudDesc: "أتمتة، حاويات سحابية، ومسارات تسليم ونشر مستمر.",
    dbDesc: "مستودعات بيانات آمنة وسريعة للتعامل مع النماذج الهيكلية والعلائقية.",
    coreJourneyTitle: "المسيرة المهنية",
    coreJourneyDesc: "سجل زمني للخبرات المهنية، الأكاديمية والعمل الحر الاستشاري.",
    academicTitle: "الأسس الأكاديمية",
    academicDesc: "سجل التعليم الأكاديمي والشهادات الجامعية والثانوية الرسمية.",
    certsTitle: "الشهادات التقنية والمهنية",
    certsDesc: "الاعتمادات المعتمدة من منصات عالمية مثل IBM و Coursera للتحقق من الكفاءة.",
    projectsTitle: "المشاريع والحلول الرقمية",
    projectsDesc: "نماذج حية ومشاريع متكاملة قمت بتطويرها ونشرها لتلبية الاحتياجات التقنية والبرمجية.",
    liveDemo: "العرض الحي",
    sourceCode: "كود المشروع",
    interactiveShell: "موجه الأوامر التفاعلي",
    bashTerminal: "محاكي موجه الأوامر الطرفية (Terminal Bash)",
    readmeTab: "README.md",
    profileTab: "Profile.json",
    terminalLogsTab: "terminal_logs.sh",
    contactMeTab: "contact_me.py",
    contactTitle: "بدء التواصل السريع",
    copyEmail: "نسخ البريد الإلكتروني",
    copied: "تم النسخ!",
    footerDesc: "مساحة التطوير الخاصة بالمطور مصطفى هاني عزب. برمجة. شحن. تأثير.",
    backToTop: "العودة للأعلى",
    designedBy: "تصميم وتطوير مصطفى هاني",
    systemReady: "النظام جاهز للتشغيل",
    bashWelcome: "مرحباً بك في موجه أوامر مصطفى هاني. اكتب 'help' لرؤية الأوامر المتاحة.",
    commandPrompt: "guest@hany-world:~$",
    interactiveEditor: "المحرر التفاعلي الحي",
    editorHeader: "محرر الملف الشخصي التفاعلي — قم بتعديل الحقول لتحديث الموقع في الوقت الفعلي!",
    editModeLabel: "وضع تعديل هيكل JSON ثنائي اللغة",
    resetBtn: "إعادة تعيين",
    saveBtn: "تطبيق التغييرات",
    nameLabel: "اسم المطور",
    roleLabel: "الدور المستهدف",
    missionLabel: "المهمة التشغيلية",
    focusLabel: "مجالات التركيز (مفصولة بفاصلة)",
    bioLabel: "السيرة الذاتية المهنية",
    emailCopiedToClipboard: "تم نسخ البريد الإلكتروني للحافظة!",
    skillsCategory: "فئة المهارة",
    showCertificates: "عرض شهادات IBM / Coursera"
  }
};

export const enProfile: Profile = {
  name: "Moustafa Hany Azab",
  role: "Software Engineer",
  mission: "Code. Ship. Impact.",
  focus: ["Software Engineer", "Full-Stack Developer", "Data & AI Engineer"],
  bio: "Moustafa Hany Azab (HANY ZAMLKAWY)\n\nBusiness Information Systems student specializing in Software Engineering, Full-Stack Development, Data Engineering, and AI Automation. Passionate about designing scalable, high-performance software solutions and leveraging modern technologies to solve complex business challenges. Skilled in building clean, maintainable code, developing data-driven applications, and integrating AI-powered automation into real-world systems. Committed to continuous learning and delivering reliable, production-ready solutions that create measurable impact.",
  heroBio: "a Business Information Systems student specializing in Software Engineering, Full-Stack Development, Data Engineering, and AI Automation Passionate about building scalable, AI-powered solutions, writing clean and efficient code, and developing innovative software that solves real-world business challenges."
};

export const arProfile: Profile = {
  name: "مصطفى هاني عزب",
  role: "مهندس برمجيات ومطور شامل",
  mission: "برمجة. شحن. تأثير.",
  focus: ["مهندس برمجيات", "مطور شامل", "مهندس بيانات وذكاء اصطناعي"],
  bio: "مصطفى هاني عزب (هاني زملكاوي)\n\nطالب نظم معلومات الأعمال (BIS) متخصص في هندسة البرمجيات، التطوير الشامل، هندسة البيانات، وأتمتة الذكاء الاصطناعي. شغوف بتصميم حلول برمجية قابلة للتطوير وعالية الأداء، والاستفادة من التقنيات الحديثة لحل تحديات الأعمال المعقدة. ماهر في كتابة أكواد برمجية نظيفة وقابلة للصيانة، وتطوير تطبيقات قائمة على البيانات، ودمج الأتمتة المدعومة بالذكاء الاصطناعي في الأنظمة الحقيقية. ملتزم بالتعلم المستمر وتقديم حلول موثوقة وجاهزة للإنتاج تحقق تأثيراً ملموساً.",
  heroBio: "طالب نظم معلومات الأعمال متخصّص في هندسة البرمجيات، التطوير الشامل، هندسة البيانات، وأتمتة الذكاء الاصطناعي. شغوف ببناء حلول برمجية قابلة للتطوير ومدعومة بالذكاء الاصطناعي، وكتابة أكواد نظيفة وفعالة، وتطوير برمجيات مبتكرة تحل تحديات الأعمال الحقيقية."
};

export const enSkills: Skill[] = [
  // Languages
  { name: "JavaScript", category: "Languages" },
  { name: "TypeScript", category: "Languages" },
  { name: "Python", category: "Languages" },
  { name: "HTML5", category: "Languages" },
  { name: "CSS3", category: "Languages" },
  { name: "Go", category: "Languages" },
  { name: "Swift", category: "Languages" },
  { name: "Arabic (Native)", category: "Languages" },
  { name: "English (Fluent)", category: "Languages" },
  
  // Frameworks
  { name: "React", category: "Frameworks" },
  { name: "Flask", category: "Frameworks" },
  { name: "Node.js", category: "Frameworks" },
  { name: "Express.js", category: "Frameworks" },
  { name: "Next.js", category: "Frameworks" },
  { name: "Flutter", category: "Frameworks" },
  { name: "Full-Stack Development", category: "Frameworks" },
  { name: "Software Engineering", category: "Frameworks" },
  
  // Cloud / DevOps / AI
  { name: "Cloud Computing", category: "Cloud/DevOps" },
  { name: "AWS", category: "Cloud/DevOps" },
  { name: "Google Cloud Platform (GCP)", category: "Cloud/DevOps" },
  { name: "Docker", category: "Cloud/DevOps" },
  { name: "Git", category: "Cloud/DevOps" },
  { name: "GitHub", category: "Cloud/DevOps" },
  { name: "GitHub Copilot", category: "Cloud/DevOps" },
  { name: "AI Development", category: "Cloud/DevOps" },
  { name: "Prompt Engineering", category: "Cloud/DevOps" },
  { name: "Large Language Models (LLMs)", category: "Cloud/DevOps" },
  
  // Databases
  { name: "PostgreSQL", category: "Databases" },
  { name: "Redis", category: "Databases" },
  { name: "MongoDB", category: "Databases" },
  { name: "Firebase", category: "Databases" },
  { name: "Database Fundamentals", category: "Databases" },
  { name: "Workflow Automation", category: "Databases" }
];

export const arSkills: Skill[] = [
  // Languages
  { name: "JavaScript", category: "Languages" },
  { name: "TypeScript", category: "Languages" },
  { name: "Python", category: "Languages" },
  { name: "HTML5", category: "Languages" },
  { name: "CSS3", category: "Languages" },
  { name: "Go", category: "Languages" },
  { name: "Swift", category: "Languages" },
  { name: "العربية (اللغة الأم)", category: "Languages" },
  { name: "الإنجليزية (طلاقة)", category: "Languages" },
  
  // Frameworks
  { name: "React", category: "Frameworks" },
  { name: "Flask", category: "Frameworks" },
  { name: "Node.js", category: "Frameworks" },
  { name: "Express.js", category: "Frameworks" },
  { name: "Next.js", category: "Frameworks" },
  { name: "Flutter", category: "Frameworks" },
  { name: "التطوير الشامل", category: "Frameworks" },
  { name: "هندسة البرمجيات", category: "Frameworks" },
  { name: "هندسة البرمجيات المعمارية", category: "Frameworks" },
  { name: "تحسين الأداء البرمجي", category: "Frameworks" },
  
  // Cloud / DevOps / AI
  { name: "الحوسبة السحابية", category: "Cloud/DevOps" },
  { name: "AWS", category: "Cloud/DevOps" },
  { name: "GCP السحابة من جوجل", category: "Cloud/DevOps" },
  { name: "Docker", category: "Cloud/DevOps" },
  { name: "Git", category: "Cloud/DevOps" },
  { name: "GitHub", category: "Cloud/DevOps" },
  { name: "GitHub Copilot", category: "Cloud/DevOps" },
  { name: "تطوير الذكاء الاصطناعي", category: "Cloud/DevOps" },
  { name: "هندسة الأوامر", category: "Cloud/DevOps" },
  { name: "النماذج اللغوية الكبيرة (LLMs)", category: "Cloud/DevOps" },
  
  // Databases
  { name: "PostgreSQL", category: "Databases" },
  { name: "Redis", category: "Databases" },
  { name: "MongoDB", category: "Databases" },
  { name: "Firebase", category: "Databases" },
  { name: "أساسيات قواعد البيانات", category: "Databases" },
  { name: "هندسة البيانات", category: "Databases" },
  { name: "أتمتة سير العمل", category: "Databases" }
];

export const enExperiences: Experience[] = [
  {
    id: "exp-nti",
    period: "Aug 2026 — Present",
    role: "Python Developer",
    company: "National Telecommunication Institute (NTI) · Internship",
    bullets: [
      "Participating in the prestigious NTI & ITIDA Summer Training Program as a Python Developer.",
      "Gaining practical, hands-on experience in building Python-based solutions and optimizing application performance.",
      "Actively applying modern software architecture principles to real-world projects, complementing my ongoing journey and skill set as a Full-Stack Developer and Data Engineer."
    ],
    skillsUsed: ["Python", "Software Architecture", "Performance Optimization", "Full-Stack Development", "Data Engineering"]
  },
  {
    id: "exp-depi",
    period: "Jul 2026 — Present",
    role: "Data Engineer",
    company: "Digital Egypt Pioneers Initiative - DEPI · Internship",
    bullets: [
      "Specializing in Data Engineering within the DEPI (Batch R5) program to bridge the gap between business operations and technical architecture.",
      "Focusing on building high-performance data systems, scalable infrastructure, and robust data processing workflows.",
      "Applying advanced database fundamentals and software architecture principles to real-world analytical pipelines."
    ],
    skillsUsed: ["Data Engineering", "Python", "Database Fundamentals", "Software Engineering", "Full-Stack Development"]
  },
  {
    id: "exp-1",
    period: "Jun 2026 — Present",
    role: "Backend AI Engineering Intern",
    company: "FlyRank AI",
    bullets: [
      "Developing and optimizing backend services to integrate generative AI capabilities and enhance intelligent search functionality.",
      "Designing, building, and maintaining scalable backend systems, APIs, and data processing logic in collaboration with senior engineers."
    ],
    skillsUsed: ["Python", "AWS", "Docker", "Large Language Models (LLMs)", "GitHub Copilot", "Prompt Engineering"]
  },
  {
    id: "exp-2",
    period: "Feb 2026 — Present",
    role: "Web Development Intern",
    company: "PathLine Training Academy",
    bullets: [
      "Developed responsive and interactive web interfaces using HTML, CSS, and JavaScript.",
      "Built front-end projects while applying clean coding practices and core web development principles.",
      "Debugged applications and optimized website performance to improve usability and responsiveness."
    ],
    skillsUsed: ["JavaScript", "HTML", "CSS", "React"]
  },
  {
    id: "exp-3",
    period: "Mar 2026 — Jun 2026",
    role: "Freelance Qualification Intern",
    company: "ITIDA Gigs Freelance",
    bullets: [
      "Completed a professional training program in software engineering and freelance business practices.",
      "Applied Business Information Systems (BIS) concepts to deliver technical solutions aligned with client requirements.",
      "Built a portfolio of software projects while strengthening client communication and project delivery skills."
    ],
    skillsUsed: ["Software Engineering", "JavaScript", "React", "Firebase"]
  },
  {
    id: "exp-4",
    period: "Nov 2025 — Dec 2025",
    role: "Tech for Non-Techies Intern",
    company: "iCareer",
    bullets: [
      "Completed intensive training in digital literacy, automation, and AI applications.",
      "Used Zapier, Power BI, Google Workspace, and Notion to automate workflows, visualize data, and improve team collaboration.",
      "Applied prompt engineering techniques to enhance AI-powered content generation and business processes."
    ],
    skillsUsed: ["Workflow Automation", "Prompt Engineering", "Database Fundamentals"]
  }
];

export const arExperiences: Experience[] = [
  {
    id: "exp-nti",
    period: "أغسطس 2026 — الحالي",
    role: "مطور بايثون (Python Developer)",
    company: "المعهد القومي للاتصالات (NTI) · برنامج تدريبي",
    bullets: [
      "المشاركة في البرنامج التدريبي الصيفي المرموق لـ NTI و ITIDA كمطور بايثون (Python Developer).",
      "اكتساب خبرة عملية وتطبيقية في بناء وتطوير الحلول البرمجية القائمة على بايثون وتحسين أداء وكفاءة التطبيقات.",
      "تطبيق مبادئ هندسة البرمجيات المعمارية الحديثة على مشاريع واقعية لتعزيز مساري المهني كمطور شامل ومهندس بيانات."
    ],
    skillsUsed: ["Python", "Software Architecture", "Performance Optimization", "Full-Stack Development", "Data Engineering"]
  },
  {
    id: "exp-depi",
    period: "يوليو 2026 — الحالي",
    role: "مهندس بيانات (Data Engineer)",
    company: "مبادرة رواد مصر الرقمية (DEPI) · برنامج تدريبي",
    bullets: [
      "المشاركة في برنامج مبادرة رواد مصر الرقمية (DEPI - الدفعة R5) والتخصص المكثف في هندسة البيانات لسد الفجوة بين العمليات التشغيلية للأعمال والبنية التقنية.",
      "التركيز على بناء وتطوير أنظمة بيانات فائقة الأداء، وخطوط أنابيب معالجة البيانات، وبنية تحتية سحابية قابلة للتطوير.",
      "تطبيق المبادئ المتقدمة لقواعد البيانات وهندسة البرمجيات المعمارية لحل التحديات البيانية الواقعية المعقدة."
    ],
    skillsUsed: ["Data Engineering", "Python", "Database Fundamentals", "Software Engineering", "Full-Stack Development"]
  },
  {
    id: "exp-1",
    period: "يونيو 2026 — الحالي",
    role: "متدرب هندسة الذكاء الاصطناعي للباك إند",
    company: "FlyRank AI",
    bullets: [
      "تطوير وتحسين خدمات الباك إند لدمج قدرات الذكاء الاصطناعي التوليدي وتعزيز وظائف البحث الذكي.",
      "تصميم وبناء وصيانة أنظمة باك إند قابلة للتطوير، وواجهات برمجة التطبيقات (APIs)، ومنطق معالجة البيانات بالتعاون مع كبار المهندسين."
    ],
    skillsUsed: ["Python", "AWS", "Docker", "Large Language Models (LLMs)", "GitHub Copilot", "Prompt Engineering"]
  },
  {
    id: "exp-2",
    period: "فبراير 2026 — الحالي",
    role: "متدرب تطوير الويب والفرونت إند",
    company: "PathLine Training Academy",
    bullets: [
      "تطوير واجهات ويب سريعة الاستجابة وتفاعلية باستخدام HTML و CSS و JavaScript.",
      "بناء مشاريع فرونت إند مع تطبيق ممارسات الأكواد النظيفة ومبادئ تطوير الويب الأساسية.",
      "تصحيح أخطاء التطبيقات وتحسين أداء المواقع لتعزيز سهولة الاستخدام والاستجابة لجميع الشاشات."
    ],
    skillsUsed: ["JavaScript", "HTML", "CSS", "React"]
  },
  {
    id: "exp-3",
    period: "مارس 2026 — يونيو 2026",
    role: "متدرب تأهيل العمل الحر البرمجي",
    company: "ITIDA Gigs Freelance",
    bullets: [
      "إكمال برنامج تدريبي احترافي متكامل في هندسة البرمجيات وممارسات العمل الحر الفني.",
      "تطبيق مفاهيم نظم معلومات الأعمال (BIS) لتقديم حلول تقنية تلبي وتتماشى مع تطلعات واحتياجات العملاء الحقيقية.",
      "بناء محفظة أعمال من المشاريع البرمجية التطبيقية لتعزيز مهارات التواصل الاحترافي مع العملاء وتسليم المهام بنجاح."
    ],
    skillsUsed: ["Software Engineering", "JavaScript", "React", "Firebase"]
  },
  {
    id: "exp-4",
    period: "نوفمبر 2025 — ديسمبر 2025",
    role: "متدرب التقنية لغير التقنيين وأدوات العمل الذكية",
    company: "iCareer",
    bullets: [
      "إكمال تدريب مكثف في الثقافة الرقمية والأتمتة التشغيلية وتطبيقات الذكاء الاصطناعي الحديثة في الأعمال.",
      "استخدام Zapier، و Power BI، و Google Workspace، و Notion لأتمتة سير العمل، وتصور البيانات بشكل رسومي، وتحسين تعاون الفرق.",
      "تطبيق تقنيات هندسة الأوامر لتعزيز جودة توليد المحتوى المدعوم بالذكاء الاصطناعي للشركات."
    ],
    skillsUsed: ["Workflow Automation", "Prompt Engineering", "Database Fundamentals"]
  }
];

export const enEducation: Education[] = [
  {
    id: "edu-1",
    degree: "Bachelor of Computer & Business Information Systems (BIS)",
    school: "Higher Institute for Computer and Information Systems, Abu Qir | Alexandria, Egypt",
    period: "Sep 2025 — Present"
  },
  {
    id: "edu-2",
    degree: "High School Diploma",
    school: "Victoria College (Language School) | Alexandria, Egypt",
    period: "Graduated Aug 2025"
  }
];

export const arEducation: Education[] = [
  {
    id: "edu-1",
    degree: "بكالوريوس الحاسب ونظم معلومات الأعمال (BIS)",
    school: "المعهد العالي للحاسب ونظم المعلومات الإدارية بأبي قير | الإسكندرية، مصر",
    period: "سبتمبر 2025 — الحالي"
  },
  {
    id: "edu-2",
    degree: "شهادة الثانوية العامة الرسمية",
    school: "كلية فيكتوريا (مدرسة لغات عريقة) | الإسكندرية، مصر",
    period: "تخرج في أغسطس 2025"
  }
];

export const enCertifications: Certification[] = [
  { id: "cert-1", name: "Developing AI Applications with Python and Flask", issuer: "IBM | Coursera", date: "Jun 2026" },
  { id: "cert-2", name: "Python for Data Science, AI & Development", issuer: "IBM | Coursera", date: "Jun 2026" },
  { id: "cert-3", name: "Vibe Coding with GitHub Copilot", issuer: "Edureka | Coursera", date: "Jun 2026" },
  { id: "cert-4", name: "Interview Preparation Suite", issuer: "IBM SkillsBuild Ambassador", date: "Jun 2026" },
  { id: "cert-5", name: "Developing Back-End Apps with Node.js and Express", issuer: "IBM | Coursera", date: "May 2026" },
  { id: "cert-6", name: "Developing Front-End Apps with React", issuer: "IBM | Coursera", date: "May 2026" },
  { id: "cert-7", name: "Introduction to Cloud Computing", issuer: "IBM / Coursera", date: "May 2026" },
  { id: "cert-8", name: "Software Engineering Essentials", issuer: "Coursera", date: "May 2026" },
  { id: "cert-9", name: "Introduction to Software Engineering", issuer: "IBM", date: "May 2026" },
  { id: "cert-10", name: "Web Development (Level 0 & 1)", issuer: "PathLine Academy", date: "May 2026" },
  { id: "cert-11", name: "Introduction to HTML, CSS & JavaScript", issuer: "IBM | Coursera", date: "Apr 2026" },
  { id: "cert-12", name: "Mastering the Art of Prompting", issuer: "IBM", date: "Apr 2026" },
  { id: "cert-13", name: "Getting Started with Git and GitHub", issuer: "IBM | Coursera", date: "Mar 2026" },
  { id: "cert-14", name: "AWS AI & ML Scholars & Project Badges", issuer: "Udacity", date: "Mar 2026" },
  { id: "cert-15", name: "McKinsey Forward Program", issuer: "McKinsey & Company", date: "2026" },
  { id: "cert-16", name: "Sales Skills Professional Training", issuer: "Success Academy", date: "Jan 2026" },
  { id: "cert-17", name: "Tech for Non-Techies Training", issuer: "iCareer (Digitera)", date: "Dec 2025" },
  { id: "cert-18", name: "Professional Soft Skills", issuer: "Success Academy", date: "Dec 2025" },
  { id: "cert-19", name: "International Computer Driving License (ICDL)", issuer: "Success Academy", date: "Nov 2025" }
];

export const arCertifications: Certification[] = [
  { id: "cert-1", name: "تطوير تطبيقات الذكاء الاصطناعي باستخدام بايثون وفلاسك", issuer: "IBM | كورسيرا", date: "يونيو 2026" },
  { id: "cert-2", name: "البايثون لعلوم البيانات والذكاء الاصطناعي والتطوير", issuer: "IBM | كورسيرا", date: "يونيو 2026" },
  { id: "cert-3", name: "برمجة الفايب والتطوير التلقائي باستخدام GitHub Copilot", issuer: "إديوريكا | كورسيرا", date: "يونيو 2026" },
  { id: "cert-4", name: "حزمة التحضير للمقابلات الشخصية التقنية", issuer: "سفير مهارات IBM للبرمجة", date: "يونيو 2026" },
  { id: "cert-5", name: "تطوير تطبيقات الباك إند باستخدام Node.js و Express", issuer: "IBM | كورسيرا", date: "مايو 2026" },
  { id: "cert-6", name: "تطوير تطبيقات الفرونت إند التفاعلية باستخدام React", issuer: "IBM | كورسيرا", date: "مايو 2026" },
  { id: "cert-7", name: "مقدمة شاملة للحوسبة السحابية وأنظمتها", issuer: "IBM | كورسيرا", date: "مايو 2026" },
  { id: "cert-8", name: "أساسيات وجوهر هندسة البرمجيات", issuer: "كورسيرا المعتمدة", date: "مايو 2026" },
  { id: "cert-9", name: "مقدمة لعلوم وهندسة البرمجيات المعاصرة", issuer: "شركة IBM الدولية", date: "مايو 2026" },
  { id: "cert-10", name: "مطور ويب معتمد (المستويات 0 و 1)", issuer: "أكاديمية باث لاين للتدريب", date: "مايو 2026" },
  { id: "cert-11", name: "مقدمة إلى لغات الويب الأساسية HTML, CSS & JavaScript", issuer: "IBM | كورسيرا", date: "أبريل 2026" },
  { id: "cert-12", name: "إتقان فن وعلم هندسة الأوامر (Prompting)", issuer: "شركة IBM الدولية", date: "أبريل 2026" },
  { id: "cert-13", name: "البداية السريعة والعملية مع نظامي Git و GitHub", issuer: "IBM | كورسيرا", date: "مارس 2026" },
  { id: "cert-14", name: "علماء AWS للذكاء الاصطناعي والتعلم الآلي والبادجات التطبيقية", issuer: "يوداسيتي المعتمدة", date: "مارس 2026" },
  { id: "cert-15", name: "برنامج ماكنزي الرائد لتطوير المهارات (McKinsey Forward)", issuer: "ماكنزي آند كومباني العالمية", date: "2026" },
  { id: "cert-16", name: "التدريب الاحترافي لمهارات البيع الاحترافية", issuer: "أكاديمية النجاح لعلوم الأعمال", date: "يناير 2026" },
  { id: "cert-17", name: "التقنية لغير التقنيين وأدوات العمل الذكية المتقدمة", issuer: "مؤسسة iCareer العالمية (ديجيتيرا)", date: "ديسمبر 2025" },
  { id: "cert-18", name: "المهارات الشخصية والناعمة الاحترافية", issuer: "أكاديمية النجاح وتطوير الذات", date: "ديسمبر 2025" },
  { id: "cert-19", name: "الرخصة الدولية لقيادة الحاسب الآلي المعترف بها (ICDL)", issuer: "مؤسسة النجاح المعتمدة", date: "نوفمبر 2025" }
];

export const enProjects: Project[] = [
  {
    id: "proj-1",
    title: "HANY'S WORLD — Cyber-Minimalist Portfolio & Interactive Resume",
    description: "Designed and built an interactive terminal shell portfolio and developer hub using React, Tailwind CSS, Framer Motion, and high-fidelity mock-ups. Features interactive command-line simulations, printable custom PDF resume view, and sleek animations.",
    category: "Full-Stack",
    skills: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
    link: "https://hany-s-world-597716960036.europe-west2.run.app/",
    github: "https://github.com/Hany-Zamalkawy/My-Portfolio-HANY-S-WORLD"
  },
  {
    id: "proj-2",
    title: "FarmFlow — Python-Powered Farm-to-Consumer Commerce & Inventory System | NTI",
    description: "Farm Flow: A Python project developed as part of the National Telecommunication Institute (NTI) Summer Internship, powering direct farm-to-consumer commerce and inventory workflows.",
    category: "Full-Stack",
    skills: ["Python", "E-Commerce", "Inventory Management", "Git", "GitHub Pages"],
    link: "https://hany-zamalkawy.github.io/NTI_Summer_Intership_Project/",
    github: "https://github.com/Hany-Zamalkawy/NTI_Summer_Intership_Project"
  },
  {
    id: "proj-3",
    title: "Leon — Creative Digital Agency Template",
    description: "Developed a modern, responsive one-page website for a creative digital agency using HTML5, CSS3, and Vanilla JavaScript. Implemented interactive features including scroll animations, a filterable portfolio, and sticky navigation. Deployed the project using Git and GitHub Pages.",
    category: "Full-Stack",
    skills: ["HTML", "CSS", "JavaScript", "Git"],
    link: "https://hany-zamalkawy.github.io/Leon-Agency/",
    github: "https://github.com/Hany-Zamalkawy/Leon-Agency"
  },
  {
    id: "proj-4",
    title: "VOLT Sports — Full-Stack Sports Analysis Platform",
    description: "Developed a sports analysis web application to process, manage, and visualize athletic performance data. Applied software engineering principles to build a structured, responsive, and user-friendly application.",
    category: "Full-Stack",
    skills: ["JavaScript", "HTML", "CSS", "Git", "GitHub"],
    link: "https://hany-zamalkawy.github.io/-VOLT-Sports/",
    github: "https://github.com/Hany-Zamalkawy/-VOLT-Sports"
  },
  {
    id: "proj-5",
    title: "Artisan Table — Full-Stack Restaurant Web Application",
    description: "Developed a responsive web platform featuring interactive menus and structural ordering layouts. Engineered modular front-end components and version-controlled the repository to ensure seamless continuous integration.",
    category: "Full-Stack",
    skills: ["React", "JavaScript", "HTML", "CSS", "GitHub"],
    link: "https://hany-zamalkawy.github.io/restaurant_Artisan_Table/",
    github: "https://github.com/Hany-Zamalkawy/restaurant_Artisan_Table"
  }
];

export const arProjects: Project[] = [
  {
    id: "proj-1",
    title: "منصة HANY'S WORLD — السيرة الذاتية التفاعلية السيبرانية",
    description: "تصميم وبناء هذه المحفظة التفاعلية الفريدة التي تحاكي بيئة أنظمة الأوامر الطرفية (Terminal) باستخدام تقنيات React و Tailwind CSS والتحريك الفائق الجودة. تتضمن محاكاة حقيقية لخدمات الشل والطباعة المنسقة الفورية للـ PDF.",
    category: "Full-Stack",
    skills: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
    link: "https://hany-s-world-597716960036.europe-west2.run.app/",
    github: "https://github.com/Hany-Zamalkawy/My-Portfolio-HANY-S-WORLD"
  },
  {
    id: "proj-2",
    title: "منصة FarmFlow — نظام التجارة وإدارة المخزون من المزرعة للمستهلك بـ Python | معهد NTI",
    description: "مشروع Farm Flow: نظام برمجي مبني بلغة Python تم تطويره كجزء من التدريب الصيفي للمعهد القومي للاتصالات (NTI)، يربط المزارعين بالمستهلكين مباشرة ويدير سير عمليات التجارة وتتبع المخزون الزراعي بكفاءة عالية.",
    category: "Full-Stack",
    skills: ["Python", "E-Commerce", "Inventory Management", "Git", "GitHub Pages"],
    link: "https://hany-zamalkawy.github.io/NTI_Summer_Intership_Project/",
    github: "https://github.com/Hany-Zamalkawy/NTI_Summer_Intership_Project"
  },
  {
    id: "proj-3",
    title: "موقع Leon — قالب الوكالة الرقمية الإبداعية",
    description: "تطوير موقع ويب حديث سريع الاستجابة من صفحة واحدة لوكالة إبداعية رقمية باستخدام لغات الويب الأساسية HTML5 و CSS3 وجاوا سكريبت العادية. تم إدخال ميزات تفاعلية ممتازة مثل حركات التمرير الرشيقة، ومحفظة أعمال مصفاة، وشريط تنقل ذكي ومثبت. تم نشر المشروع بالكامل عبر خوادم صفحات GitHub.",
    category: "Full-Stack",
    skills: ["HTML", "CSS", "JavaScript", "Git"],
    link: "https://hany-zamalkawy.github.io/Leon-Agency/",
    github: "https://github.com/Hany-Zamalkawy/Leon-Agency"
  },
  {
    id: "proj-4",
    title: "منصة VOLT Sports — التحليل الرياضي المتكامل",
    description: "تطوير تطبيق ويب متكامل ومتقدم لتحليل وتتبع وعرض مستويات الأداء الرياضي للأندية واللاعبين رقمياً بشكل مرئي. تطبيق مبادئ وقواعد هندسة البرمجيات المعتمدة لتقديم واجهات فائقة الدقة والاستجابة وسهلة الاستخدام للمدربين واللاعبين.",
    category: "Full-Stack",
    skills: ["JavaScript", "HTML", "CSS", "Git", "GitHub"],
    link: "https://hany-zamalkawy.github.io/-VOLT-Sports/",
    github: "https://github.com/Hany-Zamalkawy/-VOLT-Sports"
  },
  {
    id: "proj-5",
    title: "موقع Artisan Table — تطبيق الويب الشامل للمطاعم",
    description: "تطوير وبرمجة منصة ويب ذكية مخصصة للمطاعم تتيح تصفح قوائم المأكولات التفاعلية وطلبها وتنسيق حجز الطاولات. هندسة المكونات باستخدام مكتبة React وتطبيق نظام التحكم في الإصدارات لضمان الجودة المستمرة للمنتج البرمجي.",
    category: "Full-Stack",
    skills: ["React", "JavaScript", "HTML", "CSS", "GitHub"],
    link: "https://hany-zamalkawy.github.io/restaurant_Artisan_Table/",
    github: "https://github.com/Hany-Zamalkawy/restaurant_Artisan_Table"
  }
];

export const enServices: Service[] = [
  {
    id: "srv-fullstack",
    title: "Full-Stack Web Engineering",
    tagline: "End-to-end resilient web applications engineered for speed, modularity, and high-load scalability.",
    category: "Full-Stack",
    description: "Architecting and implementing modern web applications from responsive front-end user experiences to robust, scalable backend APIs. Utilizing clean component design systems, state management, and production-ready deployments.",
    deliverables: [
      "Custom Single Page Applications (SPA) & Interactive Dashboards",
      "RESTful & GraphQL Backend API Development",
      "Component-Driven UI Engineering with TypeScript & React",
      "Cross-Platform Responsive Optimization & Core Web Vitals Tuning"
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "Vite"],
    icon: "Layers"
  },
  {
    id: "srv-data-eng",
    title: "Data Engineering & Pipeline Architecture",
    tagline: "High-performance ETL/ELT pipelines, data transformation, and reliable analytical storage systems.",
    category: "Data Engineering",
    description: "Specialized in designing resilient data pipelines and data warehousing infrastructures based on DEPI Batch R5 specialization. Transforming raw unstructured data into clean, query-optimized assets bridging business operations with technical architecture.",
    deliverables: [
      "Automated Batch & Stream ETL/ELT Data Pipelines",
      "Data Warehouse Schema Design & Performance Tuning",
      "Data Cleaning, Deduplication, and Validation Systems",
      "Analytical Data Models & Business Intelligence Feeders"
    ],
    techStack: ["Python", "SQL", "PostgreSQL", "Database Fundamentals", "Workflow Automation"],
    icon: "Database"
  },
  {
    id: "srv-python-backend",
    title: "Python Solutions & Backend Architecture",
    tagline: "High-throughput microservices, computational modules, and application performance optimization.",
    category: "Python & Architecture",
    description: "Formed through rigorous NTI & ITIDA Summer Training paradigms. Developing high-throughput Python backend systems and computational utilities while applying modern software architecture principles, algorithmic efficiency, and bottleneck elimination.",
    deliverables: [
      "High-Performance Python Web Services & APIs",
      "Application Performance Profiling & Latency Reduction",
      "SOLID Architectural Design & Modular Microservices",
      "Asynchronous Task Workers & Background Schedulers"
    ],
    techStack: ["Python", "Software Architecture", "Performance Optimization", "Full-Stack Development"],
    icon: "Terminal"
  },
  {
    id: "srv-ai-agent",
    title: "AI Integration & Intelligent Automation",
    tagline: "Augmenting software products with LLM intelligence, search discovery agents, and automated workflows.",
    category: "AI & Cloud",
    description: "Leveraging hands-on backend AI engineering experience from FlyRank AI. Integrating Large Language Models (LLMs), AI discovery agents, and semantic search capabilities into web and enterprise workflows.",
    deliverables: [
      "Custom LLM API Integrations & Conversational Agents",
      "Autonomous AI Web Discovery & Scraping Agents",
      "Semantic Search & Dynamic Content Summarizers",
      "Intelligent Business Workflow & Script Automation"
    ],
    techStack: ["Gemini API", "Prompt Engineering", "Python", "Cloud Computing", "Node.js"],
    icon: "Sparkles"
  },
  {
    id: "srv-db-optimization",
    title: "Database Architecture & Optimization",
    tagline: "Scalable relational and document data storage, index tuning, and high-availability schemas.",
    category: "Data Engineering",
    description: "Designing structured relational and NoSQL schemas (PostgreSQL, MongoDB, Firebase). Tuning database indices, crafting optimized queries, and implementing data integrity constraints to ensure sub-second response times.",
    deliverables: [
      "Relational (SQL) & Document (NoSQL) Schema Modeling",
      "Query Execution Plan Analysis & Index Optimization",
      "Secure Transactional Logic & Connection Pooling",
      "Database Migration Strategies & Schema Versioning"
    ],
    techStack: ["PostgreSQL", "MongoDB", "Firebase", "SQL", "Database Fundamentals"],
    icon: "Server"
  },
  {
    id: "srv-cloud-devops",
    title: "Cloud Deployment & DevOps Automation",
    tagline: "Containerized deployments, automated CI/CD pipelines, and cloud infrastructure reliability.",
    category: "AI & Cloud",
    description: "Streamlining the bridge from local development to production through containerization, continuous integration/delivery (CI/CD) pipelines, cloud environment management, and production health monitoring.",
    deliverables: [
      "Docker Containerization & Multi-stage Builds",
      "Automated CI/CD Pipelines via GitHub Actions",
      "Cloud Ingress & Hosting Configuration (GCP, Vercel)",
      "System Uptime Monitoring & Environment Security"
    ],
    techStack: ["Git", "GitHub Actions", "Docker", "Cloud Computing", "Vite"],
    icon: "Cloud"
  }
];

export const arServices: Service[] = [
  {
    id: "srv-fullstack",
    title: "تطوير وهندسة برمجيات الويب الشاملة (Full-Stack)",
    tagline: "بناء تطبيقات ويب مرنة وعالية الكفاءة والسرعة من الواجهات وحتى خوادم الباك إند.",
    category: "Full-Stack",
    description: "تصميم وتنفيذ تطبيقات الويب الحديثة والمتكاملة بدءاً من تجارب المستخدم التفاعلية سريعة الاستجابة وحتى واجهات برمجة التطبيقات (APIs) القوية. الاعتماد على هيكلة برمجية نظيفة وإدارة حالة متقدمة ونشر موثوق للإنتاج.",
    deliverables: [
      "تطبيقات الصفحة الواحدة المخصصة (SPA) ولوحات التحكم التفاعلية",
      "بناء وتطوير واجهات برمجة التطبيقات الخلفية (RESTful & GraphQL APIs)",
      "تصميم واجهات المستخدم بالمكونات المستقلة باستخدام React و TypeScript",
      "تحسين الأداء وسرعة الاستجابة عبر كافة الأجهزة ومحركات البحث"
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "Vite"],
    icon: "Layers"
  },
  {
    id: "srv-data-eng",
    title: "هندسة البيانات وبناء خطوط الأنابيب (Data Engineering)",
    tagline: "بناء خطوط معالجة البيانات ETL/ELT عالية الكفاءة وهياكل التخزين التحليلية الموثوقة.",
    category: "Data Engineering",
    description: "تخصص عميق في هندسة البيانات وبناء أنظمة معالجة البيانات الضخمة استناداً لمبادرة رواد مصر الرقمية (DEPI - الدفعة R5). تحويل البيانات الخام غير المنظمة إلى أصول نظيفة ومحسنة للاستعلام لسد الفجوة بين العمليات التشغيلية والبنية التحتية التقنية.",
    deliverables: [
      "خطوط أنابيب بيانات مؤتمتة بنظام الدُفعات والتدفق الحي (Batch & Stream ETL/ELT)",
      "تصميم مستودعات البيانات وتحسين أداء الاستعلامات الضخمة",
      "أنظمة تنظيف وتدقيق البيانات وإزالة التكرارات وضمان الجودة",
      "نماذج البيانات التحليلية وتغذية لوحات ذكاء الأعمال (BI)"
    ],
    techStack: ["Python", "SQL", "PostgreSQL", "أساسيات قواعد البيانات", "أتمتة سير العمل"],
    icon: "Database"
  },
  {
    id: "srv-python-backend",
    title: "حلول بايثون المتقدمة وهندسة النظم المعمارية",
    tagline: "خوادم بايثون فائقة الإنتاجية والسرعة وتطبيق مبادئ هندسة البرمجيات المعمارية الحديثة.",
    category: "Python & Architecture",
    description: "صقل المهارات عبر البرنامج التدريبي الصيفي المرموق للمعهد القومي للاتصالات (NTI و ITIDA). بناء خدمات وحلول خلفية برمجية باستخدام Python مع تطبيق معايير هندسة البرمجيات المعمارية وتحسين كفاءة المعالجة وحل الاختناقات البرمجية.",
    deliverables: [
      "خدمات ويب برمجية وواجهات REST APIs فائقة الأداء بـ Python",
      "فحص وتحليل أداء التطبيقات وتقليل زمن الاستجابة (Latency)",
      "تطبيق مبادئ التصميم المعماري النظيف (SOLID) والخدمات المصغرة",
      "معالجة المهام الخلفية غير المتزامنة والمجدولات التلقائية"
    ],
    techStack: ["Python", "هندسة البرمجيات المعمارية", "تحسين الأداء البرمجي", "التطوير الشامل"],
    icon: "Terminal"
  },
  {
    id: "srv-ai-agent",
    title: "تكامل حلول الذكاء الاصطناعي والأتمتة الذكية",
    tagline: "تعزيز البرمجيات بقدرات نماذج اللغة الضخمة (LLMs) ووكلاء الاستكشاف الذكيين.",
    category: "AI & Cloud",
    description: "توظيف الخبرة العملية المكتسبة كمهندس ذكاء اصطناعي للباك إند في FlyRank AI. دمج نماذج الذكاء الاصطناعي التوليدي، وتطوير وكلاء الاكتشاف الذاتيين، ومحركات البحث الدلالي داخل أنظمة الويب والشركات.",
    deliverables: [
      "تكامل مخصص لنماذج اللغة (Gemini API / LLMs) والمساعدين الحواريين",
      "بناء وكلاء الذكاء الاصطناعي للاستكشاف واستخلاص البيانات تلقائياً",
      "محركات البحث الدلالي وتلخيص المحتوى التفاعلي الفوري",
      "أتمتة العمليات التشغيلية المعقدة وكتابة نصوص برمجية ذكية"
    ],
    techStack: ["Gemini API", "هندسة الأوامر الذكية", "Python", "الحوسبة السحابية", "Node.js"],
    icon: "Sparkles"
  },
  {
    id: "srv-db-optimization",
    title: "هندسة قواعد البيانات وتحسين سرعة الاستعلامات",
    tagline: "تصميم قواعد بيانات علائقية ومستندية قابلة للتوسع وضبط الفهارس لضمان سرعة الاستجابة.",
    category: "Data Engineering",
    description: "تصميم وتطوير مخططات قواعد البيانات العلائقية والمستندية (PostgreSQL, MongoDB, Firebase). تحليل خطط تنفيذ الاستعلامات وضبط الفهارس وتطبيق قواعد سلامة البيانات لتحقيق استجابة فائقة السرعة تحت الضغط.",
    deliverables: [
      "تصميم وهيكلة قواعد البيانات العلائقية (SQL) والمستندية (NoSQL)",
      "تحليل خطط الاستعلامات وضبط الفهارس لتسريع استرجاع البيانات",
      "إدارة العمليات التبادلية الآمنة وإدارة تجمعات الاتصال (Connection Pooling)",
      "استراتيجيات ترحيل قواعد البيانات وإدارة إصدارات المخططات"
    ],
    techStack: ["PostgreSQL", "MongoDB", "Firebase", "SQL", "أساسيات قواعد البيانات"],
    icon: "Server"
  },
  {
    id: "srv-cloud-devops",
    title: "النشر السحابي وأتمتة العمليات (DevOps & CI/CD)",
    tagline: "حاويات التطبيقات السحابية، أنابيب النشر المؤتمتة، وضمان موثوقية الأنظمة.",
    category: "AI & Cloud",
    description: "بناء الجسر السلس بين بيئة التطوير المحلية وبيئة الإنتاج السحابية الحية من خلال الحاويات البرمجية، أنابيب التكامل والنشر المستمر (CI/CD)، إدارة المتغيرات السرية، والمراقبة الحية لحالة الخوادم.",
    deliverables: [
      "حزم وتجهيز التطبيقات بالحاويات باستخدام Docker",
      "بناء أنابيب التكامل والنشر المستمر التلقائية عبر GitHub Actions",
      "تهيئة الاستضافة السحابية وتوجيه النطاقات (GCP, Vercel)",
      "مراقبة الجاهزية التشغيلية وتأمين البيئات البرمجية"
    ],
    techStack: ["Git", "GitHub Actions", "Docker", "الحوسبة السحابية", "Vite"],
    icon: "Cloud"
  }
];
