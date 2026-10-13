import { useState } from "react";
import { ExternalLink, Github, Code, Search, Sparkles, Filter, Database, Server, Smartphone, Globe } from "lucide-react";
import { Project } from "../types";
import { uiTranslations } from "../translations";

interface ProjectsShowcaseProps {
  projects: Project[];
  selectedSkill: string | null;
  onSelectSkill: (skill: string | null) => void;
  lang: "en" | "ar";
}

export default function ProjectsShowcase({
  projects,
  selectedSkill,
  onSelectSkill,
  lang,
}: ProjectsShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState<string | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const t = uiTranslations[lang];

  const categories = [
    { id: "All", label: lang === "en" ? "All" : "الكل" },
    { id: "Full-Stack", label: lang === "en" ? "Full-Stack" : "تطوير شامل" },
    { id: "Frontend", label: lang === "en" ? "Frontend" : "واجهات أمامية" },
    { id: "Data & AI", label: lang === "en" ? "Data & AI" : "البيانات والذكاء" },
    { id: "Web Design", label: lang === "en" ? "Web Design" : "تصميم ويب" },
  ];

  // Filter projects by both: category, search query, and selected skill
  const filteredProjects = projects.filter((project) => {
    // 1. Category Filter
    const matchesCategory = activeCategory === "All" || project.category === activeCategory;

    // 2. Search Query Filter
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === "" ||
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.skills.some((s) => s.toLowerCase().includes(query));

    // 3. Selected Skill Filter
    const matchesSkill = selectedSkill ? project.skills.includes(selectedSkill) : true;

    return matchesCategory && matchesSearch && matchesSkill;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Full-Stack":
        return <Server className="w-4 h-4 text-[#4be277]" />;
      case "Frontend":
        return <Globe className="w-4 h-4 text-[#4be277]" />;
      case "Data & AI":
        return <Database className="w-4 h-4 text-[#4be277]" />;
      case "Web Design":
        return <Smartphone className="w-4 h-4 text-[#4be277]" />;
      default:
        return <Code className="w-4 h-4 text-[#4be277]" />;
    }
  };

  const getTranslatedCategory = (category: string) => {
    switch (category) {
      case "Full-Stack":
        return lang === "en" ? "Full-Stack" : "تطوير شامل";
      case "Frontend":
        return lang === "en" ? "Frontend" : "واجهات أمامية";
      case "Data & AI":
        return lang === "en" ? "Data & AI" : "البيانات والذكاء";
      case "Web Design":
        return lang === "en" ? "Web Design" : "تصميم ويب";
      default:
        return category;
    }
  };

  return (
    <section id="projects" className="space-y-8">
      {/* Container header style matching the user's green container */}
      <div className="p-6 md:p-8 border border-[#4be277]/30 bg-[#4be277]/5 relative overflow-hidden rounded-sm">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#4be277] to-transparent opacity-50" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#4be277] to-transparent opacity-50" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <h2 className="font-mono text-xs text-[#4be277] uppercase tracking-widest flex items-center gap-2 font-bold">
              <span className="w-2 h-2 bg-[#4be277] rounded-full animate-pulse" />
              {t.projectsTitle}
            </h2>
            <p className="text-[#bccbb9] text-sm max-w-lg">
              {lang === "en"
                ? "Explore production-ready client systems, full-stack backends, and advanced automated algorithms compiled across github."
                : "استكشف أنظمة عملاء حقيقية، ومحركات خلفية متكاملة، وخوارزميات وأدوات مطورة بدقة ومنشورة على Github."}
            </p>
          </div>

          {/* Search box overlay */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#bccbb9]/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === "en" ? "Search by key, technology..." : "البحث بالاسم أو التقنية..."}
              className="w-full bg-[#091009] border border-[#3d4a3d] text-xs font-mono text-white px-9 py-2.5 rounded-sm focus:border-[#4be277] focus:outline-none transition-colors"
              id="projects-search-input"
            />
          </div>
        </div>
      </div>

      {/* Category Toggles and Stats */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Category triggers */}
        <div className="flex flex-wrap gap-1.5 bg-[#091009] p-1 border border-[#3d4a3d]/40 rounded-sm">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 font-mono text-xs transition-colors rounded-sm active:scale-95 cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-[#242c24] text-[#4be277] border border-[#3d4a3d]"
                  : "text-[#bccbb9]/60 hover:text-white"
              }`}
              id={`projects-cat-btn-${cat.id.replace(" ", "-")}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Dynamic results counter */}
        <div className="font-mono text-[11px] text-[#bccbb9]/50">
          {lang === "en" ? (
            <>
              Showing <span className="text-[#4be277] font-semibold">{filteredProjects.length}</span> of {projects.length} repository profiles
            </>
          ) : (
            <>
              عرض <span className="text-[#4be277] font-semibold">{filteredProjects.length}</span> من أصل {projects.length} مشاريع برمجية
            </>
          )}
        </div>
      </div>

      {/* Main projects grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="projects-grid">
        {filteredProjects.map((proj) => {
          return (
            <div
              key={proj.id}
              className="p-6 border border-[#3d4a3d] bg-[#091009]/80 rounded-sm hover:border-[#4be277] transition-all duration-300 terminal-glow-hover flex flex-col justify-between space-y-6"
              id={`project-card-${proj.id}`}
            >
              {/* Card Header Info */}
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  {/* Category Pill */}
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#161d16] border border-[#3d4a3d] rounded-full">
                    {getCategoryIcon(proj.category)}
                    <span className="font-mono text-[10px] text-[#bccbb9] tracking-wider uppercase font-semibold">
                      {getTranslatedCategory(proj.category)}
                    </span>
                  </div>

                  {/* Links triggers */}
                  <div className="flex gap-2">
                    {proj.github && (
                      <a
                        href={proj.github}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 border border-[#3d4a3d]/60 text-[#bccbb9] hover:text-[#4be277] hover:border-[#4be277] rounded-sm bg-[#161d16]/30 transition-all"
                        title={lang === "en" ? "View GitHub Repository" : "عرض مستودع غيت هاب"}
                        id={`project-${proj.id}-github`}
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 border border-[#3d4a3d]/60 text-[#bccbb9] hover:text-[#4be277] hover:border-[#4be277] rounded-sm bg-[#161d16]/30 transition-all"
                        title={lang === "en" ? "Visit Live Application" : "زيارة التطبيق على الهواء"}
                        id={`project-${proj.id}-link`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Title and descriptions */}
                <div className="space-y-2">
                  <h3 className="font-sans text-xl font-bold text-[#dce5d9] hover:text-[#4be277] transition-colors leading-snug">
                    {proj.title}
                  </h3>
                  <p className="text-sm text-[#bccbb9]/80 leading-relaxed font-sans">
                    {proj.description}
                  </p>
                </div>
              </div>

              {/* Technologies Tag List */}
              <div className="border-t border-[#3d4a3d]/20 pt-4 flex flex-wrap gap-1.5">
                {proj.skills.map((skill) => {
                  const isActive = selectedSkill === skill;
                  return (
                    <button
                      key={skill}
                      onClick={() => onSelectSkill(isActive ? null : skill)}
                      className={`px-2 py-1 border font-mono text-[10px] rounded-sm transition-colors cursor-pointer ${
                        isActive
                          ? "bg-[#4be277]/20 border-[#4be277] text-[#4be277] font-semibold"
                          : "border-[#3d4a3d]/40 text-[#bccbb9]/60 hover:border-[#4be277]/40 hover:text-[#4be277]"
                      }`}
                      id={`project-${proj.id}-skill-${skill}`}
                    >
                      {skill}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {filteredProjects.length === 0 && (
          <div className="col-span-1 md:col-span-2 p-12 border border-dashed border-[#3d4a3d] text-center rounded-sm space-y-4 bg-[#091009]/30">
            <Code className="w-8 h-8 text-[#bccbb9]/30 mx-auto animate-pulse" />
            <div className="space-y-1">
              <p className="font-mono text-sm text-[#dce5d9] font-medium">
                {lang === "en" ? "No projects match current queries." : "لا توجد مشاريع تطابق خيارات البحث الحالية."}
              </p>
              <p className="text-xs text-[#bccbb9]/50">
                {lang === "en" ? "Try broadening your search keywords or clearing active filters." : "حاول توسيع نطاق البحث أو مسح أدوات التصفية المحددة."}
              </p>
            </div>
            <button
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
                onSelectSkill(null);
              }}
              className="bg-[#4be277]/10 hover:bg-[#4be277]/20 border border-[#4be277]/30 hover:border-[#4be277] text-[#4be277] font-mono text-xs uppercase px-4 py-2 transition-colors rounded-sm active:scale-95 cursor-pointer"
              id="projects-reset-empty-btn"
            >
              {lang === "en" ? "Reset Filters" : "إعادة تعيين البحث"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
