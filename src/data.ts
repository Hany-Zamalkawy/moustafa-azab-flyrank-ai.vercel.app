import { Skill, Experience, Education, Certification, Project, Profile, Service } from "./types";

export const initialProfile: Profile = {
  name: "Moustafa Hany Azab",
  role: "Software Engineer",
  mission: "Code. Ship. Impact.",
  focus: ["Software Engineer", "Full-Stack Developer", "Data & AI Engineer"],
  bio: "Moustafa Hany Azab (HANY ZAMLKAWY)\n\nBusiness Information Systems student specializing in Software Engineering, Full-Stack Development, Data Engineering, and AI Automation. Passionate about designing scalable, high-performance software solutions and leveraging modern technologies to solve complex business challenges. Skilled in building clean, maintainable code, developing data-driven applications, and integrating AI-powered automation into real-world systems. Committed to continuous learning and delivering reliable, production-ready solutions that create measurable impact.",
  heroBio: "a Business Information Systems student specializing in Software Engineering, Full-Stack Development, Data Engineering, and AI Automation Passionate about building scalable, AI-powered solutions, writing clean and efficient code, and developing innovative software that solves real-world business challenges."
};

export const skillsData: Skill[] = [
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
  { name: "Software Architecture", category: "Frameworks" },
  { name: "Performance Optimization", category: "Frameworks" },
  
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
  { name: "Data Engineering", category: "Databases" },
  { name: "Workflow Automation", category: "Databases" }
];

export const experiencesData: Experience[] = [
  {
    id: "exp-nti",
    period: "Aug 2026 — Present",
    role: "Python Developer",
    company: "National Telecommunication Institute (NTI) · Internship",
    bullets: [
      "Participating in the prestigious NTI & ITIDA Summer Training Program as a Python Developer.",
      "Gaining practical, hands-on experience in building Python-based solutions and optimizing application performance.",
      "Actively applying modern software architecture principles to real-world projects, complementing my journey as a Full-Stack Developer and Data Engineer."
    ],
    skillsUsed: ["Python", "Software Architecture", "Performance Optimization", "Full-Stack Development", "Data Engineering"]
  },
  {
    id: "exp-depi",
    period: "Jul 2026 — Present",
    role: "Data Engineer",
    company: "Digital Egypt Pioneers Initiative - DEPI · Internship",
    bullets: [
      "Selected for the intensive DEPI (Batch R5) specialization in Data Engineering to bridge the gap between business operations and technical architecture.",
      "Focusing on building high-performance data systems, robust data pipelines, and scalable infrastructure.",
      "Applying advanced database fundamentals and software architecture principles to real-world analytical systems."
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

export const educationData: Education[] = [
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

export const certificationsData: Certification[] = [
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

export const projectsData: Project[] = [
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

export const servicesData: Service[] = [
  {
    id: "srv-fullstack",
    title: "Full-Stack Web Engineering",
    tagline: "End-to-end resilient web applications engineered for speed, modularity, and high-load scalability.",
    category: "Full-Stack",
    description: "Architecting and implementing modern web applications from responsive front-end user experiences to robust, scalable backend APIs. Utilizing clean component design systems, state management, and production-ready deployments.",
    deliverables: [
      "Custom Single Page Applications (SPA) & Micro-frontends",
      "RESTful & GraphQL Backend API Engineering",
      "Interactive Client Dashboards & Real-time UI Flows",
      "Cross-Platform Responsive Optimization & Accessibility"
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
      "Data Cleaning, Deduplication, and Validation Pipelines",
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

