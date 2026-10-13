import React, { useState, useEffect } from "react";
import { Terminal, Menu, X, Download, FileText, Check, Copy, Sun, Moon } from "lucide-react";
import { uiTranslations } from "../translations";

interface NavbarProps {
  onResumeClick: () => void;
  theme: "cyber" | "terminal-light";
  onThemeToggle: () => void;
  lang: "en" | "ar";
  onLangToggle: () => void;
}

export default function Navbar({
  onResumeClick,
  theme,
  onThemeToggle,
  lang,
  onLangToggle,
}: NavbarProps) {
  const [activeSection, setActiveSection] = useState("about");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = uiTranslations[lang];

  const sections = [
    { id: "about", label: t.about },
    { id: "skills", label: t.skills },
    { id: "experience", label: t.experience },
    { id: "services", label: t.services },
    { id: "education", label: t.education },
    { id: "projects", label: t.projects },
  ];

  // Update scrolled state and current visible section on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple intersection observer calculation
      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const offset = 80; // height of sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveSection(id);
    }
  };

  return (
    <nav
      id="navbar-root"
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-[#0e150e]/95 backdrop-blur-md border-[#3d4a3d] py-3 shadow-lg shadow-[#091009]/50"
          : "bg-transparent border-[#3d4a3d]/40 py-5"
      }`}
    >
      <div className="flex justify-between items-center px-6 max-w-7xl mx-auto w-full">
        {/* Brand Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2 group"
          id="brand-logo"
        >
          <div className="w-8 h-8 rounded-md bg-[#4be277]/10 border border-[#4be277]/30 flex items-center justify-center group-hover:border-[#4be277] transition-all duration-300">
            <Terminal className="w-4 h-4 text-[#4be277] group-hover:scale-110 transition-transform" />
          </div>
          <span className="font-serif text-xl md:text-2xl font-bold tracking-normal text-[#4be277] group-hover:text-white transition-colors uppercase">
            HANY'S WORLD
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8" id="desktop-links">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={(e) => handleNavClick(e, section.id)}
              className={`font-mono text-xs uppercase tracking-widest transition-all duration-300 hover:text-[#4be277] relative py-1 ${
                activeSection === section.id ? "text-[#4be277]" : "text-[#bccbb9]"
              }`}
            >
              {section.label}
              {activeSection === section.id && (
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#4be277]" />
              )}
            </a>
          ))}
        </div>

        {/* Action Button & Menu Toggles */}
        <div className="flex items-center gap-3">
          {/* Language Toggle Button */}
          <button
            onClick={onLangToggle}
            className="flex items-center gap-1.5 border border-[#3d4a3d] hover:border-[#4be277] text-[#bccbb9] hover:text-[#4be277] font-mono text-[10px] uppercase px-3 py-2 rounded-sm transition-all duration-300 bg-[#1a221a]/50 hover:bg-[#1a221a] cursor-pointer select-none active:scale-95"
            id="lang-toggle-btn"
            title={lang === "en" ? "Switch to Arabic / التبديل للعربية" : "Switch to English / التبديل للإنجليزية"}
          >
            <span className="font-sans font-bold text-[11px]">{lang === "en" ? "العربية" : "EN"}</span>
          </button>

          {/* Terminal Theme Toggle Button */}
          <button
            onClick={onThemeToggle}
            className="flex items-center gap-2 border border-[#3d4a3d] hover:border-[#4be277] text-[#bccbb9] hover:text-[#4be277] font-mono text-[10px] uppercase px-3 py-2 rounded-sm transition-all duration-300 bg-[#1a221a]/50 hover:bg-[#1a221a] cursor-pointer select-none active:scale-95"
            id="theme-toggle-btn"
            title={theme === "cyber" ? "Switch to Ivory Light Mode" : "Switch to Cyber Dark Mode"}
          >
            {theme === "cyber" ? (
              <>
                <Moon className="w-3.5 h-3.5 text-[#4be277]" />
                <span>{t.sysCyber}</span>
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5 text-[#0d7a42]" />
                <span>{t.sysLight}</span>
              </>
            )}
          </button>

          <button
            onClick={onResumeClick}
            className="hidden md:flex bg-[#4be277] text-[#003915] font-mono text-xs uppercase tracking-widest px-5 py-2.5 rounded-sm font-semibold hover:bg-white hover:text-[#0e150e] transition-all duration-300 active:scale-95 border border-[#4be277]"
            id="nav-resume-btn"
          >
            {t.resumeBtn}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#dce5d9] hover:text-[#4be277] focus:outline-none md:hidden transition-colors border border-transparent hover:border-[#3d4a3d] rounded"
            aria-label="Toggle mobile menu"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          className="md:hidden absolute top-full left-0 w-full bg-[#0e150e] border-b border-[#3d4a3d] px-6 py-6 space-y-4 animate-fadeIn"
          id="mobile-drawer"
        >
          <div className="flex flex-col gap-4">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={(e) => handleNavClick(e, section.id)}
                className={`font-mono text-sm uppercase tracking-wider py-2 border-b border-[#3d4a3d]/20 ${
                  activeSection === section.id ? "text-[#4be277] px-2 border-l-2 border-[#4be277]" : "text-[#bccbb9]"
                }`}
              >
                {section.label}
              </a>
            ))}
            <div className="flex gap-2 w-full mt-2">
              <button
                onClick={() => {
                  onLangToggle();
                  setMobileMenuOpen(false);
                }}
                className="flex-1 border border-[#3d4a3d] text-[#bccbb9] hover:text-[#4be277] hover:border-[#4be277] font-mono text-xs uppercase py-3 rounded-sm text-center active:scale-95 transition-all bg-[#1a221a]/50"
                id="mobile-lang-btn"
              >
                {lang === "en" ? "العربية" : "ENGLISH"}
              </button>
              <button
                onClick={() => {
                  onThemeToggle();
                  setMobileMenuOpen(false);
                }}
                className="flex-1 border border-[#3d4a3d] text-[#bccbb9] hover:text-[#4be277] hover:border-[#4be277] font-mono text-xs uppercase py-3 rounded-sm text-center active:scale-95 transition-all bg-[#1a221a]/50"
                id="mobile-theme-btn"
              >
                {theme === "cyber" ? t.sysCyber : t.sysLight}
              </button>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onResumeClick();
              }}
              className="w-full bg-[#4be277] text-[#003915] font-mono text-xs uppercase tracking-widest py-3 rounded-sm font-bold text-center border border-[#4be277] active:bg-white transition-all mt-2"
              id="mobile-resume-btn"
            >
              {t.resumeBtn}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
