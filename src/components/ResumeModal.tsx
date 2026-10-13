Warning: truncated output (original token count: 11767)
Total output lines: 1081

import { useState } from "react";
import { X, Copy, Check, Printer, FileDown, Clipboard, Terminal, User, Mail, Globe, MapPin, Instagram, Facebook, MessageCircle, Send } from "lucide-react";
import { Profile, Experience, Education, Certification, Project } from "../types";
import { jsPDF } from "jspdf";
import { copyText } from "../services/clipboard";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile;
  experiences: Experience[];
  education: Education[];
  certifications: Certification[];
  projects: Project[];
  lang: "en" | "ar";
}

export default function ResumeModal({
  isOpen,
  onClose,
  profile,
  experiences,
  education,
  certifications,
  projects,
  lang,
}: ResumeModalProps) {
  const [copyFormat, setCopyFormat] = useState<"markdown" | "json">("markdown");
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleDownloadPDF = () => {
    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });

      // Page dimensions
      const pageHeight = doc.internal.pageSize.getHeight();
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20;
      const contentWidth = pageWidth - (margin * 2);
      let y = 15;

      const checkPageBreak = (neededHeight: number) => {
        if (y + neededHeight > pageHeight - margin) {
          doc.addPage();
          y = margin;
          return true;
        }
        return false;
      };

      const writeCenteredText = (text: string, size: number, isBold: boolean) => {
        doc.setFont("times", isBold ? "bold" : "normal");
        doc.setFontSize(size);
        doc.setTextColor(0, 0, 0);
        doc.text(text, pageWidth / 2, y, { align: "center" });
      };

      const writeWrappedText = (text: string, size: number, isBold: boolean, align: "left" | "center" | "right" = "left", indent = 0) => {
        doc.setFont("times", isBold ? "bold" : "normal");
        doc.setFontSize(size);
        doc.setTextColor(0, 0, 0);
        const splitText = doc.splitTextToSize(text, contentWidth - indent);
        splitText.forEach((line: string) => {
          if (align === "center") {
            doc.text(line, pageWidth / 2, y, { align: "center" });
          } else if (align === "right") {
            doc.text(line, pageWidth - margin, y, { align: "right" });
          } else {
            doc.text(line, margin + indent, y);
          }
          y += (size * 0.35) + 1.2;
        });
      };

      const renderSectionHeader = (title: string) => {
        y += 4;
        checkPageBreak(12);
        writeCenteredText(title, 12, true);
        y += 6;
      };

      // --- PAGE 1 ---
      // Header
      writeCenteredText("MOUSTAFA HANY AZAB", 18, true);
      y += 6;
      writeCenteredText("(HANY_ZAMLKAWY)", 11, true);
      y += 6;
      writeCenteredText("Softwara & Data Engineer | full-Stack Developer | (BIS) Student", 10, true);
      y += 5;
      writeCenteredText("Eygpt| +201228494191 | moustfahhany5@gmail.com |www.linkedin.com/in/moustafa-hany-azab-4550692b9", 8.5, false);
      y += 4.5;
      writeCenteredText("https://github.com/Hany-Zamalkawy", 8.5, false);
      y += 8;

      // 1. PROFESSIONAL SUMMARY
      renderSectionHeader("PROFESSIONAL SUMMARY");
      const summaryText = "Business Information Systems student with a strong interest in Software Engineering, Full-Stack Development, and Data Engineering. Passionate about building scalable, high-quality software solutions and applying programming skills to solve real-world business challenges. Eager to contribute to innovative development teams while continuously expanding expertise in modern technologies and software architecture.";
      writeWrappedText(summaryText, 9.5, false);
      y += 2;

      // 2. EXPERIANCE
      renderSectionHeader("EXPERIANCE");

      // National Telecommunication Institute (NTI)
      checkPageBreak(25);
      doc.setFont("times", "bold");
      doc.setFontSize(10);
      doc.text("• Python Developer Intern | National Telecommunication Institute (NTI) | Aug 2026 – Present", margin, y);
      y += 5;
      
      doc.setFont("times", "normal");
      doc.setFontSize(9.5);
      doc.text("•", margin + 6, y);
      writeWrappedText("Participating in the prestigious NTI & ITIDA Summer Training Program as a Python Developer, building Python-based solutions and optimizing application performance.", 9.5, false, "left", 10);
      y += 1;

      doc.setFont("times", "normal");
      doc.setFontSize(9.5);
      doc.text("•", margin + 6, y);
      writeWrappedText("Actively applying modern software architecture principles to real-world projects, complementing skill sets as a Full-Stack Developer and Data Engineer.", 9.5, false, "left", 10);
      y += 4;

      // Digital Egypt Pioneers Initiative (DEPI)
      checkPageBreak(25);
      doc.setFont("times", "bold");
      doc.setFontSize(10);
      doc.text("• Data Engineer Intern | Digital Egypt Pioneers Initiative (DEPI) | Jul 2026 – Present | Alexandria, Egypt", margin, y);
      y += 5;
      
      doc.setFont("times", "normal");
      doc.setFontSize(9.5);
      doc.text("•", margin + 6, y);
      writeWrappedText("Undergoing intensive specialization in Data Engineering in the DEPI (Batch R5) program to bridge the gap between business operations and technical architecture.", 9.5, false, "left", 10);
      y += 1;

      doc.setFont("times", "normal");
      doc.setFontSize(9.5);
      doc.text("•", margin + 6, y);
      writeWrappedText("Focusing on building high-performance data systems, scalable infrastructure, and robust data pipelines.", 9.5, false, "left", 10);
      y += 4;

      // FlyRank AI
      checkPageBreak(22);
      doc.setFont("times", "bold");
      doc.setFontSize(10);
      doc.text("• Backend AI Engineering Intern | FlyRank AI | Jun 2026 – Present | Remote", margin, y);
      y += 5;
      
      doc.setFont("times", "normal");
      doc.setFontSize(9.5);
      doc.text("•", margin + 6, y);
      writeWrappedText("Developing and optimizing backend services to integrate generative AI capabilities and enhance intelligent search functionality.", 9.5, false, "left", 10);
      y += 1;

      doc.setFont("times", "normal");
      doc.setFontSize(9.5);
      doc.text("•", margin + 6, y);
      writeWrappedText("Designing, building, and maintaining scalable backend systems, APIs, and data processing logic in collaboration with senior engineers.", 9.5, false, "left", 10);
      y += 4;

      // PathLine Training Academy
      checkPageBreak(25);
      doc.setFont("times", "bold");
      doc.setFontSize(10);
      doc.text("Web Development Intern | PathLine Training Academy | Feb 2026 – Present | Remote", margin, y);
      y += 5;

      doc.setFont("times", "normal");
      doc.setFontSize(9.5);
      doc.text("•", margin + 3, y);
      writeWrappedText("Developed responsive and interactive web interfaces using HTML, CSS, and JavaScript.", 9.5, false, "left", 7);
      y += 1;

      doc.setFont("times", "normal");
      doc.setFontSize(9.5);
      doc.text("•", margin + 3, y);
      writeWrappedText("Built front-end projects while applying clean coding practices and core web development principles.", 9.5, false, "left", 7);
      y += 1;

      doc.setFont("times", "normal");
      doc.setFontSize(9.5);
      doc.text("•", margin + 3, y);
      writeWrappedText("Debugged applications and optimized website performance to improve usability and responsiveness.", 9.5, false, "left", 7);
      y += 4;

      // ITIDA Gigs Freelance
      checkPageBreak(25);
      doc.setFont("times", "bold");
      doc.setFontSize(10);
      doc.text("ITIDA Gigs Freelance | Freelance Qualification Intern Mar 2026 – Jun 2026 | Remote", margin, y);
      y += 5;

      doc.setFont("times", "normal");
      doc.setFontSize(9.5);
      doc.text("•", margin + 3, y);
      writeWrappedText("Completed a professional training program in software engineering and freelance business practices.", 9.5, false, "left", 7);
      y += 1;

      doc.setFont("times", "normal");
      doc.setFontSize(9.5);
      doc.text("•", margin + 3, y);
      writeWrappedText("Applied Business Information Systems (BIS) concepts to deliver technical solutions aligned with client requirements.", 9.5, false, "left", 7);
      y += 1;

      doc.setFont("times", "normal");
      doc.setFontSize(9.5);
      doc.text("•", margin + 3, y);
      writeWrappedText("Built a portfolio of software projects while strengthening client communication and project delivery skills.", 9.5, false, "left", 7);
      y += 4;

      // Tech for Non-Techies Intern
      checkPageBreak(25);
      doc.setFont("times", "bold");
      doc.setFontSize(10);
      doc.text("Tech for Non-Techies Intern | iCareer | Nov 2025 – Dec 2025 | Alexandria, Egypt (Hybrid)", margin, y);
      y += 5;

      doc.setFont("…7267 tokens truncated…             href="https://t.me/Hany_Zamlkawy"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-[#4be277] transition-colors"
              >
                <Send className="w-3.5 h-3.5 text-[#4be277] print:text-black" />
                Telegram: @Hany_Zamlkawy
              </a>
              <span className="flex items-center gap-2 sm:col-span-2 text-[#bccbb9]/90">
                <MapPin className="w-3.5 h-3.5 text-[#4be277] print:text-black" />
                {lang === "en" ? "Alexandria, Egypt / Remote / Hybrid / Employed" : "الإسكندرية، مصر / عمل عن بعد / هجين / موظف حالياً"}
              </span>
            </div>
          </div>

          {/* Profile Statement */}
          <div className="space-y-2">
            <h2 className="font-mono text-xs text-[#4be277] uppercase tracking-wider font-bold border-b border-[#3d4a3d]/20 pb-1 print:text-black print:border-black/20 print:font-bold">
              {lang === "en" ? "Summary Statement" : "الملخص المهني"}
            </h2>
            <p className="text-[#bccbb9] leading-relaxed font-sans print:text-black/80 whitespace-pre-line">
              {profile.bio}
            </p>
          </div>

          {/* Two-column splits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 print:grid print:grid-cols-3 print:gap-6">
            
            {/* Left smaller specs column */}
            <div className="space-y-6 md:col-span-1 print:col-span-1">
              
              {/* Focus Keywords */}
              <div className="space-y-3">
                <h2 className="font-mono text-xs text-[#4be277] uppercase tracking-wider font-bold border-b border-[#3d4a3d]/20 pb-1 print:text-black print:border-black/20">
                  {lang === "en" ? "Focus Stacks" : "مجالات التركيز"}
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {profile.focus.map((f, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-[#161d16] border border-[#3d4a3d] text-[10px] text-[#bccbb9] font-mono rounded-sm print:text-black print:border-black/20 print:bg-transparent"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* Languages & Core competencies */}
              <div className="space-y-2">
                <h2 className="font-mono text-xs text-[#4be277] uppercase tracking-wider font-bold border-b border-[#3d4a3d]/20 pb-1 print:text-black print:border-black/20">
                  {lang === "en" ? "Core Skills Covered" : "المهارات التقنية المغطاة"}
                </h2>
                <div className="text-[11px] font-mono text-[#bccbb9]/80 leading-relaxed print:text-black">
                  Python • Flask • React • Node.js • Express.js • HTML5 • CSS3 • JavaScript • Git • GitHub • Cloud Computing • AI Development • GitHub Copilot • Full-Stack Development
                </div>
              </div>

              {/* Academic Milestones */}
              <div className="space-y-4">
                <h2 className="font-mono text-xs text-[#4be277] uppercase tracking-wider font-bold border-b border-[#3d4a3d]/20 pb-1 print:text-black print:border-black/20">
                  {lang === "en" ? "Academic Timeline" : "المسار الأكاديمي"}
                </h2>
                <div className="space-y-4">
                  {education.map((edu) => (
                    <div key={edu.id} className="space-y-1">
                      <div className="text-[10px] font-mono text-[#4be277] print:text-neutral-600">{edu.period}</div>
                      <div className="font-bold text-white text-xs leading-snug print:text-black">{edu.degree}</div>
                      <div className="text-xs text-[#bccbb9]/80 print:text-black/70">{edu.school}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications & Training */}
              <div className="space-y-4">
                <h2 className="font-mono text-xs text-[#4be277] uppercase tracking-wider font-bold border-b border-[#3d4a3d]/20 pb-1 print:text-black print:border-black/20">
                  {lang === "en" ? "Certifications" : "الشهادات والاعتمادات"}
                </h2>
                <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1 print:max-h-none print:overflow-visible">
                  {certifications.map((cert) => (
                    <div key={cert.id} className="space-y-0.5">
                      <div className="flex justify-between text-[9px] font-mono text-[#4be277]/80 print:text-neutral-600">
                        <span>{cert.issuer}</span>
                        <span>{cert.date}</span>
                      </div>
                      <div className="font-medium text-white text-xs leading-tight print:text-black">{cert.name}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right heavy experience column */}
            <div className="space-y-6 md:col-span-2 print:col-span-2">
              <div className="space-y-6">
                <h2 className="font-mono text-xs text-[#4be277] uppercase tracking-wider font-bold border-b border-[#3d4a3d]/20 pb-1 print:text-black print:border-black/20">
                  {lang === "en" ? "Professional Employment" : "التاريخ المهني والخبرة"}
                </h2>
                <div className="space-y-6">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="space-y-2">
                      <div className="flex justify-between items-start flex-wrap gap-1">
                        <div>
                          <h3 className="font-sans text-sm font-bold text-white print:text-black">
                            {exp.role}
                          </h3>
                          <div className="text-xs text-[#bccbb9] font-medium print:text-black/80">
                            {exp.company}
                          </div>
                        </div>
                        <span className="font-mono text-[10px] text-[#4be277] print:text-neutral-600">
                          {exp.period}
                        </span>
                      </div>

                      <ul className="space-y-1.5 pl-4 list-disc text-xs text-[#bccbb9]/80 print:text-black/80">
                        {exp.bullets.map((bullet, idx) => (
                          <li key={idx} className="leading-relaxed">
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured Technical Projects */}
              <div className="space-y-4 pt-4 border-t border-[#3d4a3d]/20 print:border-black/20">
                <h2 className="font-mono text-xs text-[#4be277] uppercase tracking-wider font-bold border-b border-[#3d4a3d]/20 pb-1 print:text-black print:border-black/20">
                  {lang === "en" ? "Featured Technical Projects" : "أبرز المشاريع التقنية"}
                </h2>
                <div className="space-y-4">
                  {projects.map((proj) => (
                    <div key={proj.id} className="space-y-1">
                      <div className="flex justify-between items-start flex-wrap gap-1">
                        <h3 className="font-sans text-xs font-bold text-white print:text-black">
                          {proj.title}
                        </h3>
                        <span className="font-mono text-[9px] text-[#4be277] print:text-neutral-600">
                          {proj.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#bccbb9]/90 print:text-black/80 leading-relaxed">
                        {proj.description}
                      </p>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {proj.skills.map((s, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-[9px] font-mono text-[#bccbb9]/70 print:text-neutral-700 bg-[#161d16] print:bg-transparent px-1.5 py-0.5 rounded-sm border border-[#3d4a3d]/40 print:border-none"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

