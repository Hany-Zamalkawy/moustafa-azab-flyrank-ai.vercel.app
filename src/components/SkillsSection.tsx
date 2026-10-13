import { useState } from "react";
import { Cpu, Code2, Cloud, Database, X, Sparkles, Code } from "lucide-react";
import { Skill } from "../types";
import { uiTranslations } from "../translations";

interface SkillsSectionProps {
  skills: Skill[];
  selectedSkill: string | null;
  onSelectSkill: (skill: string | null) => void;
  lang: "en" | "ar";
}

export default function SkillsSection({
  skills,
  selectedSkill,
  onSelectSkill,
  lang,
}: SkillsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string | "All">("All");
  const t = uiTranslations[lang];

  const categories = [
    { name: "All", label: lang === "en" ? "All" : "الكل", icon: <Cpu className="w-4 h-4" /> },
    { name: "Languages", label: lang === "en" ? "Languages" : "اللغات", icon: <Code className="w-4 h-4" /> },
    { name: "Frameworks", label: lang === "en" ? "Frameworks" : "إطارات العمل", icon: <Code2 className="w-4 h-4" /> },
    { name: "Cloud/DevOps", label: lang === "en" ? "Cloud/DevOps" : "السحابة والعمليات", icon: <Cloud className="w-4 h-4" /> },
    { name: "Databases", label: lang === "en" ? "Databases" : "قواعد البيانات", icon: <Database className="w-4 h-4" /> },
  ];

  // Group skills by category
  const groupedSkills = {
    Languages: skills.filter((s) => s.category === "Languages"),
    Frameworks: skills.filter((s) => s.category === "Frameworks"),
    "Cloud/DevOps": skills.filter((s) => s.category === "Cloud/DevOps"),
    Databases: skills.filter((s) => s.category === "Databases"),
  };

  const categoryDetails = [
    {
      key: "Languages",
      title: lang === "en" ? "Languages" : "اللغات المعتمدة",
      desc: lang === "en" ? "Syntax and foundations for robust and native scripts." : "القواعد والأساسيات لبناء نصوص برمجية قوية وممتازة.",
      icon: <Code className="w-5 h-5 text-[#4be277]" />,
    },
    {
      key: "Frameworks",
      title: lang === "en" ? "Frameworks" : "إطارات العمل",
      desc: lang === "en" ? "Structured frameworks for client views and app servers." : "إطارات عمل منظمة لواجهات المستخدم والخدمات الخلفية.",
      icon: <Code2 className="w-5 h-5 text-[#4be277]" />,
    },
    {
      key: "Cloud/DevOps",
      title: lang === "en" ? "Cloud & DevOps" : "السحابة والعمليات",
      desc: lang === "en" ? "Orchestration, containment, and continuous delivery pipelines." : "إدارة الحاويات والعمليات السحابية وأنابيب التسليم المستمر.",
      icon: <Cloud className="w-5 h-5 text-[#4be277]" />,
    },
    {
      key: "Databases",
      title: lang === "en" ? "Databases" : "قواعد البيانات",
      desc: lang === "en" ? "Persistent warehouses for secure transactional models." : "مستودعات تخزين حية لمعالجة آمنة للبيانات والعمليات المعقدة.",
      icon: <Database className="w-5 h-5 text-[#4be277]" />,
    },
  ];

  const handleChipClick = (skillName: string) => {
    if (selectedSkill === skillName) {
      onSelectSkill(null); // toggle off
    } else {
      onSelectSkill(skillName);
    }
  };

  return (
    <section id="skills" className="space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <h2 className="font-sans text-3xl font-black flex items-center gap-4 text-[#dce5d9]">
          <span className="text-[#4be277] font-mono text-lg font-medium">01.</span> {t.techStackTitle}
        </h2>
        <div className="h-[2px] w-16 bg-[#4be277]" />
        <p className="text-[#bccbb9] text-sm max-w-xl">
          {lang === "en" 
            ? "A collection of technologies I have integrated across projects, enterprise solutions, and sandbox environments."
            : "مجموعة من التقنيات والأدوات التي قمت بدمجها وتوظيفها عبر المشاريع المختلفة وحلول الشركات."}
        </p>
      </div>

      {/* Filter Toolbar & Helper Alerts */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#3d4a3d]/30 pb-4">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-wider border rounded-sm transition-all active:scale-95 ${
                activeCategory === cat.name
                  ? "bg-[#4be277]/10 border-[#4be277] text-[#4be277]"
                  : "border-[#3d4a3d] hover:border-[#bccbb9]/40 text-[#bccbb9]"
              }`}
              id={`skills-filter-btn-${cat.name.replace("/", "-")}`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>

        {/* Global Selected Skill State Indicator */}
        {selectedSkill && (
          <div className="flex items-center gap-2 bg-[#4be277]/10 border border-[#4be277]/30 px-3 py-1.5 rounded-sm animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-[#4be277]" />
            <span className="font-mono text-[11px] text-[#4be277] font-semibold">
              {lang === "en" ? `Filtering by: ${selectedSkill}` : `البحث مصفى بـ: ${selectedSkill}`}
            </span>
            <button
              onClick={() => onSelectSkill(null)}
              className="text-[#bccbb9] hover:text-white transition-colors ml-1 focus:outline-none cursor-pointer"
              title="Clear selection filter"
              id="skills-clear-filter-btn"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Grid of Stack Containers */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {categoryDetails
          .filter((cat) => activeCategory === "All" || activeCategory === cat.key)
          .map((cat) => {
            const list = groupedSkills[cat.key as keyof typeof groupedSkills];
            return (
              <div
                key={cat.key}
                className="p-6 border border-[#3d4a3d] bg-[#091009]/80 rounded-sm hover:border-[#4be277] transition-all duration-300 terminal-glow-hover flex flex-col justify-between space-y-6"
                id={`skills-category-card-${cat.key}`}
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    {cat.icon}
                    <h3 className="font-sans text-base font-bold text-[#dce5d9] tracking-wider uppercase">
                      {cat.title}
                    </h3>
                  </div>
                  <p className="text-[11px] text-[#bccbb9]/60 leading-relaxed font-sans">
                    {cat.desc}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {list.map((skill) => {
                    const isSelected = selectedSkill === skill.name;
                    return (
                      <button
                        key={skill.name}
                        onClick={() => handleChipClick(skill.name)}
                        className={`px-3 py-1.5 border font-mono text-xs tracking-wide transition-all active:scale-95 rounded-sm ${
                          isSelected
                            ? "bg-[#4be277] border-[#4be277] text-[#003915] font-bold shadow-lg shadow-[#4be277]/20"
                            : "border-[#3d4a3d] text-[#bccbb9] hover:border-[#4be277]/60 hover:text-white bg-[#161d16]/30"
                        }`}
                        id={`skills-chip-${skill.name}`}
                      >
                        {skill.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
}
