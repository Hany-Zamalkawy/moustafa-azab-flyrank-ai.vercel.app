import { useState } from "react";
import {
  Layers,
  Database,
  Terminal,
  Sparkles,
  Server,
  Cloud,
  CheckCircle2,
  ArrowUpRight,
  Filter,
  Check,
  Mail,
  Code2,
  Cpu
} from "lucide-react";
import { Service } from "../types";
import { uiTranslations } from "../translations";

interface ServicesSectionProps {
  services: Service[];
  lang: "en" | "ar";
}

export default function ServicesSection({ services, lang }: ServicesSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const t = uiTranslations[lang];

  const categories = [
    { id: "All", label: lang === "en" ? "All Services" : "كافة الخدمات" },
    { id: "Full-Stack", label: lang === "en" ? "Full-Stack" : "تطوير الويب الشامل" },
    { id: "Data Engineering", label: lang === "en" ? "Data Engineering" : "هندسة البيانات" },
    { id: "Python & Architecture", label: lang === "en" ? "Python & Architecture" : "بايثون والمعمارية" },
    { id: "AI & Cloud", label: lang === "en" ? "AI & Cloud" : "الذكاء الاصطناعي والسحابة" },
  ];

  const filteredServices = activeCategory === "All"
    ? services
    : services.filter((s) => s.category === activeCategory);

  const renderIcon = (iconName: string) => {
    const iconClass = "w-5 h-5 text-[#4be277]";
    switch (iconName) {
      case "Layers":
        return <Layers className={iconClass} />;
      case "Database":
        return <Database className={iconClass} />;
      case "Terminal":
        return <Terminal className={iconClass} />;
      case "Sparkles":
        return <Sparkles className={iconClass} />;
      case "Server":
        return <Server className={iconClass} />;
      case "Cloud":
        return <Cloud className={iconClass} />;
      default:
        return <Cpu className={iconClass} />;
    }
  };

  const handleInquire = (serviceTitle: string) => {
    const email = "moustfahhany5@gmail.com";
    const subject = encodeURIComponent(`Inquiry regarding ${serviceTitle}`);
    const body = encodeURIComponent(
      `Hello Moustafa,\n\nI am reaching out through your portfolio regarding the "${serviceTitle}" service.\n\nProject Overview:\n- Timeline:\n- Scope / Objectives:\n\nLooking forward to hearing from you!`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("moustfahhany5@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="services" className="space-y-10 scroll-mt-24">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm text-[#4be277] font-semibold tracking-wider">03.</span>
          <span className="font-mono text-xs uppercase tracking-widest text-[#4be277] bg-[#4be277]/10 px-2.5 py-1 rounded-sm border border-[#4be277]/20">
            {lang === "en" ? "Production Capabilities" : "القدرات والخدمات البرمجية"}
          </span>
        </div>
        
        <h2 className="font-sans text-3xl md:text-4xl font-black text-[#dce5d9] tracking-tight">
          {t.servicesTitle}
        </h2>
        <div className="h-[2px] w-20 bg-[#4be277]" />
        
        <p className="text-[#bccbb9] text-sm md:text-base max-w-2xl leading-relaxed">
          {t.servicesDesc}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#3d4a3d]/40 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-[#bccbb9] mr-2">
          <Filter className="w-3.5 h-3.5 text-[#4be277]" />
          <span>{lang === "en" ? "Filter:" : "تصفية:"}</span>
        </div>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`font-mono text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-sm border transition-all duration-200 active:scale-95 cursor-pointer ${
              activeCategory === cat.id
                ? "bg-[#4be277]/15 border-[#4be277] text-[#4be277] font-bold shadow-sm shadow-[#4be277]/10"
                : "border-[#3d4a3d] text-[#bccbb9] hover:border-[#4be277]/50 hover:text-white bg-[#131b13]/40"
            }`}
            id={`service-cat-btn-${cat.id.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service, index) => {
          const isExpanded = expandedServiceId === service.id;

          return (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              className="group bg-[#131b13]/80 border border-[#3d4a3d] hover:border-[#4be277] transition-all duration-300 rounded-sm p-6 flex flex-col justify-between relative overflow-hidden shadow-lg shadow-black/30 hover:shadow-[#4be277]/5"
            >
              {/* Top ambient accent glow */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#4be277]/0 to-transparent group-hover:via-[#4be277] transition-all duration-500" />

              <div className="space-y-4">
                {/* Header: Icon + Category Badge */}
                <div className="flex items-center justify-between gap-3">
                  <div className="w-10 h-10 rounded-sm bg-[#1a251a] border border-[#3d4a3d] group-hover:border-[#4be277]/70 flex items-center justify-center transition-colors">
                    {renderIcon(service.icon)}
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded bg-[#4be277]/10 text-[#4be277] border border-[#4be277]/25 font-semibold">
                    {service.category}
                  </span>
                </div>

                {/* Title & Tagline */}
                <div className="space-y-1.5">
                  <h3 className="font-sans text-xl font-bold text-[#dce5d9] group-hover:text-[#4be277] transition-colors leading-snug">
                    {service.title}
                  </h3>
                  <p className="font-mono text-xs text-[#a2b59f] leading-relaxed italic">
                    "{service.tagline}"
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-[#bccbb9] leading-relaxed pt-1">
                  {service.description}
                </p>

                {/* Deliverables Checklist */}
                <div className="space-y-2 pt-2 border-t border-[#3d4a3d]/50">
                  <h4 className="font-mono text-xs text-[#dce5d9] font-semibold uppercase tracking-wider flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-[#4be277]" />
                    {lang === "en" ? "Deliverables & Scope" : "أبرز المخرجات والحلول"}
                  </h4>
                  <ul className="space-y-1.5 font-sans text-xs text-[#bccbb9]">
                    {service.deliverables.map((item, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#4be277] shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Chips */}
                <div className="space-y-2 pt-2">
                  <span className="font-mono text-[10px] text-[#8ea38b] uppercase tracking-widest block">
                    {lang === "en" ? "Architectural Stack:" : "التقنيات المستخدمة:"}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {service.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="font-mono text-[11px] px-2 py-0.5 rounded-sm bg-[#1b261b] border border-[#3d4a3d]/70 text-[#bccbb9] group-hover:border-[#4be277]/30 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-6 mt-4 border-t border-[#3d4a3d]/40 flex items-center justify-between gap-3">
                <button
                  onClick={() => handleInquire(service.title)}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#4be277]/10 hover:bg-[#4be277] text-[#4be277] hover:text-[#0e150e] border border-[#4be277]/40 hover:border-[#4be277] font-mono text-xs uppercase tracking-wider font-semibold py-2 px-3 rounded-sm transition-all duration-200 active:scale-95 group/btn cursor-pointer"
                  id={`inquire-btn-${service.id}`}
                >
                  <span>{t.requestService}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Engineering Consultation Callout Banner */}
      <div className="bg-gradient-to-r from-[#141f14] via-[#162316] to-[#141f14] border border-[#4be277]/30 rounded-sm p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#4be277]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#4be277] rounded-full animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#4be277] font-bold">
                {lang === "en" ? "Direct Technical Consultation" : "استشارة هندسية برمجية مباشرة"}
              </span>
            </div>
            <h3 className="font-sans text-xl md:text-2xl font-bold text-[#dce5d9]">
              {lang === "en" 
                ? "Have a custom data pipeline or full-stack software challenge?" 
                : "هل لديك مشروع يتطلب هندسة بيانات متقدمة أو تطبيق ويب شامل؟"}
            </h3>
            <p className="text-sm text-[#bccbb9] leading-relaxed">
              {lang === "en"
                ? "Available for freelance consulting, full-stack application development, data pipeline construction, and high-performance Python microservices."
                : "مستعد للعمل الحر والاستشارات البرمجية المتخصصة، بناء خطوط أنابيب معالجة البيانات، وتطوير تطبيقات الويب وخوادم بايثون فائقة الكفاءة."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={handleCopyEmail}
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 bg-[#1a251a] hover:bg-[#223122] text-[#dce5d9] hover:text-[#4be277] border border-[#3d4a3d] hover:border-[#4be277] font-mono text-xs uppercase tracking-wider px-4 py-3 rounded-sm transition-all active:scale-95 cursor-pointer"
              id="services-copy-email-btn"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-4 h-4 text-[#4be277]" />
                  <span>{t.copied}</span>
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 text-[#4be277]" />
                  <span>{lang === "en" ? "Copy Direct Email" : "نسخ البريد الإلكتروني"}</span>
                </>
              )}
            </button>

            <a
              href="mailto:moustfahhany5@gmail.com?subject=Project%20Inquiry%20-%20Software%20%26%20Data%20Engineering"
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 bg-[#4be277] hover:bg-white text-[#003915] hover:text-[#0e150e] font-mono text-xs uppercase tracking-widest font-bold px-5 py-3 rounded-sm transition-all duration-300 border border-[#4be277] active:scale-95"
              id="services-email-cta-btn"
            >
              <span>{t.discussScope}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
