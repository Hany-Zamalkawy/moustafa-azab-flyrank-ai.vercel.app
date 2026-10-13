import { Download, Github, Mail, Linkedin, Terminal, Sparkles, Instagram, Facebook, MessageCircle, Send } from "lucide-react";
import { Profile } from "../types";
import { uiTranslations } from "../translations";

interface HeroProps {
  profile: Profile;
  onResumeClick: () => void;
  lang: "en" | "ar";
}

export default function Hero({ profile, onResumeClick, lang }: HeroProps) {
  const t = uiTranslations[lang];

  return (
    <section
      id="about"
      className="relative flex flex-col md:flex-row items-stretch min-h-[75vh] md:min-h-[70vh] rounded-2xl overflow-hidden border border-[#3d4a3d] bg-[#091009]/50 shadow-2xl"
    >
      {/* Overlay dot grid */}
      <div className="absolute inset-0 dot-grid opacity-10 pointer-events-none" />

      {/* Content Side */}
      <div className="flex-1 space-y-8 p-8 md:p-16 relative z-10 flex flex-col justify-center max-w-3xl bg-[#091009]/40 md:bg-transparent backdrop-blur-[2px] md:backdrop-blur-none">
        {/* Background gradient fade for text readibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#091009] via-[#091009]/95 to-transparent hidden md:block -z-10" />

        <div className="space-y-5">
          {/* Availability badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#4be277]/10 border border-[#4be277]/20 rounded-full w-fit">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4be277] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#4be277]"></span>
            </span>
            <span className="font-mono text-[10px] tracking-wider text-[#4be277] uppercase font-semibold">
              {lang === "en" ? "Available for new opportunities" : "متاح لفرص عمل جديدة"}
            </span>
          </div>

          {/* Heading */}
          <h1 id="hero-title" className="font-sans text-4xl sm:text-5xl lg:text-7xl font-black text-[#dce5d9] tracking-tight leading-tight">
            {lang === "en" ? (
              <>
                <span className="font-serif italic font-normal text-[#dce5d9] mr-2">Software</span>
                <span className="text-[#4be277] font-extrabold relative">{profile.role.split(" ")[1] || "Engineer"}</span>
              </>
            ) : (
              <>
                <span className="text-[#4be277] font-extrabold relative">{profile.role}</span>
              </>
            )}
          </h1>

          {/* Tagline / Subtitle */}
          <p id="hero-bio" className="text-[#bccbb9] max-w-xl text-base md:text-lg leading-relaxed font-sans whitespace-pre-line">
            {profile.heroBio || profile.bio}
          </p>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:items-center">
          <button
            onClick={onResumeClick}
            className="group bg-[#4be277] text-[#003915] px-8 py-3.5 font-mono text-xs uppercase tracking-widest font-bold hover:bg-white hover:text-[#0e150e] transition-all duration-300 flex items-center gap-2 rounded-sm shadow-lg shadow-[#4be277]/10 active:scale-95 justify-center sm:justify-start"
            id="hero-download-resume-btn"
          >
            <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            {t.downloadCV}
          </button>

          {/* Social Links */}
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            <a
              href="mailto:moustfahhany5@gmail.com"
              className="w-11 h-11 flex items-center justify-center border border-[#3d4a3d] hover:border-[#4be277] text-[#bccbb9] hover:text-[#4be277] transition-all duration-300 bg-[#1a221a]/80 hover:bg-[#1a221a] rounded-sm group"
              title="Send Email"
              id="hero-email-link"
            >
              <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </a>
            <a
              href="https://www.linkedin.com/in/moustafa-hany-azab-4550692b9/"
              target="_blank"
              rel="noreferrer"
              className="w-11 h-11 flex items-center justify-center border border-[#3d4a3d] hover:border-[#4be277] text-[#bccbb9] hover:text-[#4be277] transition-all duration-300 bg-[#1a221a]/80 hover:bg-[#1a221a] rounded-sm group"
              title="LinkedIn Profile"
              id="hero-linkedin-link"
            >
              <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </a>
            <a
              href="https://github.com/Hany-Zamalkawy"
              target="_blank"
              rel="noreferrer"
              className="w-11 h-11 flex items-center justify-center border border-[#3d4a3d] hover:border-[#4be277] text-[#bccbb9] hover:text-[#4be277] transition-all duration-300 bg-[#1a221a]/80 hover:bg-[#1a221a] rounded-sm group"
              title="GitHub Profile"
              id="hero-github-link"
            >
              <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </a>
            <a
              href="https://www.instagram.com/hany_zamlkawy/"
              target="_blank"
              rel="noreferrer"
              className="w-11 h-11 flex items-center justify-center border border-[#3d4a3d] hover:border-[#4be277] text-[#bccbb9] hover:text-[#4be277] transition-all duration-300 bg-[#1a221a]/80 hover:bg-[#1a221a] rounded-sm group"
              title="Instagram Profile"
              id="hero-instagram-link"
            >
              <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </a>
            <a
              href="https://www.facebook.com/Hany.Zamlkawy"
              target="_blank"
              rel="noreferrer"
              className="w-11 h-11 flex items-center justify-center border border-[#3d4a3d] hover:border-[#4be277] text-[#bccbb9] hover:text-[#4be277] transition-all duration-300 bg-[#1a221a]/80 hover:bg-[#1a221a] rounded-sm group"
              title="Facebook Profile"
              id="hero-facebook-link"
            >
              <Facebook className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </a>
            <a
              href="https://wa.me/201228494191"
              target="_blank"
              rel="noreferrer"
              className="w-11 h-11 flex items-center justify-center border border-[#3d4a3d] hover:border-[#4be277] text-[#bccbb9] hover:text-[#4be277] transition-all duration-300 bg-[#1a221a]/80 hover:bg-[#1a221a] rounded-sm group"
              title="WhatsApp: @Hany_Zamlkawy"
              id="hero-whatsapp-link"
            >
              <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </a>
            <a
              href="https://t.me/Hany_Zamlkawy"
              target="_blank"
              rel="noreferrer"
              className="w-11 h-11 flex items-center justify-center border border-[#3d4a3d] hover:border-[#4be277] text-[#bccbb9] hover:text-[#4be277] transition-all duration-300 bg-[#1a221a]/80 hover:bg-[#1a221a] rounded-sm group"
              title="Telegram: @Hany_Zamlkawy"
              id="hero-telegram-link"
            >
              <Send className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Image Side */}
      <div className="absolute right-0 top-0 bottom-0 w-full md:w-2/3 z-0 h-full">
        {/* Complex overlay shadows and gradients to seamlessly blend photo with code aesthetic */}
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#091009] via-[#091009]/60 md:from-[#091009] md:via-transparent to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0e150e] to-transparent z-10 pointer-events-none" />
        
        <img
          alt="Moustafa Hany Azab - Full-stack Software Engineer Portfolio Photo"
          className="w-full h-full object-cover grayscale-0 md:grayscale brightness-100 md:brightness-90 hover:grayscale-0 transition-all duration-1000 opacity-65 md:opacity-40 md:hover:opacity-100 object-top md:object-center select-none"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSq9ro6Gj4HDRlYvoivu1hzFsEcS-j6hoU5e2ehcjA3fAzyR8w88QBIr3j86n9JNfXF20gqY0Dz_CRRbIMbHkSrzLHd8HmawEzL2m9o9GI6DlTHNscXTQCQ0-YNVz-KPlnKxau5wE7D_i1mzm1VbWm3hOBLtz9Aj64nHEVfG6O1n7kpeg0cEsEurDP_vDmmJo_tc9ktu1Btx0eSAYL8l4kGg1tvuHBkqYjW_YRHdlXrBxrsh8xD2h9ueTJqu_Q5M0ETg"
          referrerPolicy="no-referrer"
        />
      </div>
    </section>
  );
}
