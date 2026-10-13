import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SkillsSection from "./components/SkillsSection";
import ExperienceTimeline from "./components/ExperienceTimeline";
import EducationSection from "./components/EducationSection";
import ProjectsShowcase from "./components/ProjectsShowcase";
import ServicesSection from "./components/ServicesSection";
import Footer from "./components/Footer";
import ResumeModal from "./components/ResumeModal";

import { Profile } from "./types";
import {
  initialProfile,
  skillsData,
  experiencesData,
  educationData,
  certificationsData,
  projectsData,
  servicesData,
} from "./data";
import { enExperiences, arExperiences, enServices, arServices, enProjects, arProjects } from "./translations";

export default function App() {
  // Reactive profile state that can be edited in real-time inside the AboutCodeEditor!
  const [profile, setProfile] = useState<Profile>(initialProfile);

  // Global skill filtering state (clicking any skill tag highlights/filters matching cards)
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  // Resume modal open state
  const [resumeOpen, setResumeOpen] = useState(false);

  // Persistent Language State ("en" vs "ar")
  const [lang, setLang] = useState<"en" | "ar">(() => {
    const saved = localStorage.getItem("hany-portfolio-lang");
    return (saved as "en" | "ar") || "en";
  });

  // Persistent Theme State (Cyber-minimalist vs Classic Terminal Light/High-Contrast)
  const [theme, setTheme] = useState<"cyber" | "terminal-light">(() => {
    const saved = localStorage.getItem("hany-portfolio-theme");
    return (saved as "cyber" | "terminal-light") || "cyber";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "terminal-light") {
      root.classList.add("light-terminal");
    } else {
      root.classList.remove("light-terminal");
    }
  }, [theme]);

  // Synchronize document dir and lang attributes for natural directionality flow (LTR vs RTL)
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("lang", lang);
    if (lang === "ar") {
      root.setAttribute("dir", "rtl");
    } else {
      root.setAttribute("dir", "ltr");
    }
  }, [lang]);

  useEffect(() => {
    document.title = lang === "ar"
      ? "مصطفى هاني عزب | عالم هاني"
      : "Moustafa Hany Azab | HANY'S WORLD";
  }, [lang]);

  const handleSelectSkill = (skill: string | null) => {
    setSelectedSkill(skill);
  };

  const handleThemeToggle = () => {
    setTheme((prev) => {
      const next = prev === "cyber" ? "terminal-light" : "cyber";
      localStorage.setItem("hany-portfolio-theme", next);
      return next;
    });
  };

  const handleLangToggle = () => {
    setLang((prev) => {
      const next = prev === "en" ? "ar" : "en";
      localStorage.setItem("hany-portfolio-lang", next);
      return next;
    });
  };

  const currentExperiences = lang === "en" ? enExperiences : arExperiences;
  const currentServices = lang === "en" ? enServices : arServices;
  const currentProjects = lang === "en" ? enProjects : arProjects;

  return (
    <div className={`min-h-screen bg-[#0e150e] text-[#dce5d9] font-sans antialiased relative selection:bg-[#4be277]/30 selection:text-[#6bff8f] ${theme === "terminal-light" ? "light-terminal" : ""}`}>
      
      {/* Decorative scanline overlays for authentic CRT/terminal aesthetic */}
      <div className="scanline pointer-events-none" />

      {/* Global absolute overlay detail elements */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none opacity-40">
        <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />
      </div>

      {/* Sticky navigation bar */}
      <Navbar
        onResumeClick={() => setResumeOpen(true)}
        theme={theme}
        onThemeToggle={handleThemeToggle}
        lang={lang}
        onLangToggle={handleLangToggle}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 pt-32 space-y-32 pb-32 w-full">
        
        {/* Landing Hero frame */}
        <Hero profile={profile} onResumeClick={() => setResumeOpen(true)} lang={lang} />

        {/* Skill visualizer */}
        <SkillsSection
          skills={skillsData}
          selectedSkill={selectedSkill}
          onSelectSkill={handleSelectSkill}
          lang={lang}
        />

        {/* Journey Timeline */}
        <ExperienceTimeline
          experiences={currentExperiences}
          selectedSkill={selectedSkill}
          onSelectSkill={handleSelectSkill}
          lang={lang}
        />

        {/* Specialized Engineering & Data Services */}
        <ServicesSection
          services={currentServices}
          lang={lang}
        />

        {/* Educational Milestones */}
        <EducationSection education={educationData} certifications={certificationsData} lang={lang} />

        {/* Interactive project sandbox showcase */}
        <ProjectsShowcase
          projects={currentProjects}
          selectedSkill={selectedSkill}
          onSelectSkill={handleSelectSkill}
          lang={lang}
        />

      </main>

      {/* Footer copyright and contact panel */}
      <Footer lang={lang} />

      {/* Interactive Printable PDF-like Resume Compiler Dialog */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
        profile={profile}
        experiences={currentExperiences}
        education={educationData}
        certifications={certificationsData}
        projects={currentProjects}
        lang={lang}
      />
    </div>
  );
}
