import { Briefcase, Calendar, CheckSquare, Sparkles } from "lucide-react";
import { Experience } from "../types";
import { uiTranslations } from "../translations";

interface ExperienceTimelineProps {
  experiences: Experience[];
  selectedSkill: string | null;
  onSelectSkill: (skill: string | null) => void;
  lang: "en" | "ar";
}

export default function ExperienceTimeline({
  experiences,
  selectedSkill,
  onSelectSkill,
  lang,
}: ExperienceTimelineProps) {
  const t = uiTranslations[lang];

  return (
    <section id="experience" className="space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <h2 className="font-sans text-3xl font-black flex items-center gap-4 text-[#dce5d9]">
          <span className="text-[#4be277] font-mono text-lg font-medium">02.</span> {t.coreJourneyTitle}
        </h2>
        <div className="h-[2px] w-16 bg-[#4be277]" />
        <p className="text-[#bccbb9] text-sm max-w-xl">
          {lang === "en"
            ? "An overview of my recent professional roles, internships, and deep-dive technical development programs."
            : "نظرة عامة على أدواري الوظيفية وتدريباتي العملية وبرامج التطوير التقني المتقدمة التي شاركت فيها."}
        </p>
      </div>

      {/* Timeline Wrapper */}
      <div className="relative pl-6 md:pl-0">
        {/* Middle Glowing vertical line for desktop, left line for mobile */}
        <div className="absolute left-0 top-2 bottom-2 w-[1px] bg-gradient-to-b from-[#4be277] via-[#3d4a3d] to-[#161d16] md:left-1/2" />

        <div className="space-y-12">
          {experiences.map((exp, idx) => {
            const isLeft = idx % 2 === 0;

            // Determine if this experience item matches the selected skill filter
            const matchesFilter = selectedSkill
              ? exp.skillsUsed?.includes(selectedSkill)
              : true;

            const hasSkillsUsed = exp.skillsUsed && exp.skillsUsed.length > 0;

            return (
              <div
                key={exp.id}
                className={`relative flex flex-col md:flex-row items-start md:items-center w-full md:justify-between transition-all duration-500 ${
                  isLeft ? "" : "md:flex-row-reverse"
                } ${
                  matchesFilter ? "opacity-100 scale-100" : "opacity-25 scale-95 select-none"
                }`}
                id={`experience-item-${exp.id}`}
              >
                {/* Timeline center node dot */}
                <div
                  className={`absolute left-0 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full z-10 border-4 transition-all duration-300 ${
                    matchesFilter
                      ? "bg-[#4be277] border-[#0e150e] shadow-lg shadow-[#4be277]/50 scale-125"
                      : "bg-[#1a221a] border-[#3d4a3d]"
                  }`}
                />

                {/* Card Container */}
                <div className="w-full md:w-[45%] pl-8 md:pl-0">
                  <div
                    className={`p-6 border rounded-sm transition-all duration-300 ${
                      matchesFilter
                        ? "bg-[#091009]/95 border-[#3d4a3d] hover:border-[#4be277] shadow-lg shadow-[#091009]/40"
                        : "border-[#3d4a3d]/20 bg-[#091009]/30"
                    }`}
                  >
                    {/* Period */}
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="w-3.5 h-3.5 text-[#4be277]" />
                      <span className="font-mono text-xs text-[#4be277] tracking-wider uppercase">
                        {exp.period}
                      </span>
                    </div>

                    {/* Title & Company */}
                    <h3 className="font-sans text-xl font-bold text-[#dce5d9] leading-tight">
                      {exp.role}
                    </h3>
                    <p className="text-sm font-semibold text-[#bccbb9]/80 mt-1 mb-4 flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-[#bccbb9]/50" />
                      {exp.company}
                    </p>

                    {/* Accomplishments Bullets */}
                    <ul className="space-y-2 mb-6">
                      {exp.bullets.map((bullet, bidx) => (
                        <li key={bidx} className="flex gap-2.5 items-start text-sm text-[#bccbb9] leading-relaxed">
                          <span className="text-[#4be277] mt-1 select-none text-[11px]">▹</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Interactive skills tagging */}
                    {hasSkillsUsed && (
                      <div className="border-t border-[#3d4a3d]/20 pt-4">
                        <div className="flex flex-wrap gap-1.5 items-center">
                          <span className="text-[10px] text-[#bccbb9]/40 uppercase tracking-widest font-mono mr-1">
                            {lang === "en" ? "Utilized:" : "التقنيات المستخدمة:"}
                          </span>
                          {exp.skillsUsed?.map((skill) => {
                            const isActive = selectedSkill === skill;
                            return (
                              <button
                                key={skill}
                                onClick={() => onSelectSkill(isActive ? null : skill)}
                                className={`px-2 py-0.5 border font-mono text-[10px] rounded-sm transition-colors cursor-pointer ${
                                  isActive
                                    ? "bg-[#4be277]/20 border-[#4be277] text-[#4be277] font-semibold"
                                    : "border-[#3d4a3d]/40 text-[#bccbb9]/60 hover:border-[#4be277]/40 hover:text-[#4be277]"
                                }`}
                                id={`experience-${exp.id}-skill-${skill}`}
                              >
                                {skill}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Empty buffer box for spacing alignment */}
                <div className="hidden md:block md:w-[45%]" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
