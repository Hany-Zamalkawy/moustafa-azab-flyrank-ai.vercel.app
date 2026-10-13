import { useState } from "react";
import { GraduationCap, Calendar, Award, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { Education, Certification } from "../types";
import { uiTranslations } from "../translations";

interface EducationSectionProps {
  education: Education[];
  certifications: Certification[];
  lang: "en" | "ar";
}

export default function EducationSection({ education, certifications, lang }: EducationSectionProps) {
  const [showAllCerts, setShowAllCerts] = useState(false);
  const t = uiTranslations[lang];

  // Show first 6 by default, expandable to 12
  const visibleCerts = showAllCerts ? certifications : certifications.slice(0, 6);

  return (
    <section id="education" className="space-y-12">
      {/* Education Block */}
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-3">
          <h2 className="font-sans text-3xl font-black flex items-center gap-4 text-[#dce5d9]">
            <span className="text-[#4be277] font-mono text-lg font-medium">04.</span> {t.education}
          </h2>
          <div className="h-[2px] w-16 bg-[#4be277]" />
          <p className="text-[#bccbb9] text-sm max-w-xl">
            {lang === "en"
              ? "Academic milestones and diplomas establishing the foundation for structural business information systems and technical computing."
              : "المحطات الأكاديمية والشهادات العلمية التي أسست قاعدة قوية في نظم معلومات الأعمال والحوسبة التطبيقية."}
          </p>
        </div>

        {/* Grid of Education Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="p-6 border border-[#3d4a3d] bg-[#091009]/80 rounded-sm hover:border-[#4be277] transition-all duration-300 terminal-glow-hover flex items-start gap-4"
              id={`education-card-${edu.id}`}
            >
              {/* Left side Icon Frame */}
              <div className="p-3 bg-[#4be277]/10 border border-[#4be277]/20 rounded-sm text-[#4be277]">
                {edu.degree.includes("Bachelor") || edu.degree.includes("بكالوريوس") ? (
                  <GraduationCap className="w-6 h-6" />
                ) : (
                  <Award className="w-6 h-6" />
                )}
              </div>

              {/* Content info */}
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 text-[#4be277]">
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="font-mono text-xs uppercase tracking-wider font-medium">
                    {edu.period}
                  </span>
                </div>
                <h3 className="font-sans text-lg font-bold text-[#dce5d9] leading-tight">
                  {edu.degree}
                </h3>
                <p className="text-sm text-[#bccbb9]">{edu.school}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications Block */}
      <div className="space-y-8 pt-4">
        {/* Header */}
        <div className="space-y-3">
          <h2 className="font-sans text-2xl font-black flex items-center gap-4 text-[#dce5d9]">
            <span className="text-[#4be277] font-mono text-base font-medium">04.</span> {t.certsTitle}
          </h2>
          <div className="h-[2px] w-12 bg-[#4be277]" />
          <p className="text-[#bccbb9] text-sm max-w-xl">
            {lang === "en"
              ? "Specialized technical credentials, AI-assisted development, cloud, and professional training programs."
              : "الشهادات والاعتمادات التقنية المتخصصة، البرمجة المعززة بالذكاء الاصطناعي، الحوسبة السحابية والتطوير."}
          </p>
        </div>

        {/* Grid of Certification Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleCerts.map((cert) => (
            <div
              key={cert.id}
              className="p-4 border border-[#3d4a3d]/60 bg-[#091009]/65 hover:bg-[#091009]/95 rounded-sm hover:border-[#4be277]/60 transition-all duration-200 flex flex-col justify-between group"
              id={`cert-card-${cert.id}`}
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[#4be277]/80 text-[10px] font-mono">
                  <span>{cert.issuer}</span>
                  <span>{cert.date}</span>
                </div>
                <h4 className="font-sans text-sm font-bold text-[#dce5d9] group-hover:text-white transition-colors leading-snug">
                  {cert.name}
                </h4>
              </div>
            </div>
          ))}
        </div>

        {/* Expand / Collapse Button */}
        {certifications.length > 6 && (
          <div className="flex justify-center pt-2">
            <button
              onClick={() => setShowAllCerts(!showAllCerts)}
              className="flex items-center gap-2 px-6 py-2.5 border border-[#3d4a3d] hover:border-[#4be277] text-[#bccbb9] hover:text-[#4be277] font-mono text-xs uppercase tracking-wider rounded-sm bg-[#091009]/40 transition-all duration-300 active:scale-95 cursor-pointer"
              id="certs-toggle-expand-btn"
            >
              {showAllCerts ? (
                <>
                  {lang === "en" ? "Show Less" : "عرض أقل"} <ChevronUp className="w-3.5 h-3.5" />
                </>
              ) : (
                <>
                  {lang === "en" ? `View All (${certifications.length})` : `عرض الكل (${certifications.length})`} <ChevronDown className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
