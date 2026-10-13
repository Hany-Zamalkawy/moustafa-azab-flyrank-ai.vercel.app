import { useState } from "react";
import { Award, Check, Copy, Github, Mail, Linkedin, Terminal, ArrowUp, Instagram, Facebook, MessageCircle, Send } from "lucide-react";
import { uiTranslations } from "../translations";

interface FooterProps {
  lang?: "en" | "ar";
}

export default function Footer({ lang = "en" }: FooterProps) {
  const [copied, setCopied] = useState(false);
  const emailAddress = "moustfahhany5@gmail.com";
  const verificationUrl = (import.meta.env.VITE_FLYRANK_VERIFICATION_URL?.trim() || "https://internship.flyrank.ai/verify");
  const isFlyRankVerificationUrl = (() => {
    if (!verificationUrl) return false;
    try {
      const url = new URL(verificationUrl);
      return url.protocol === "https:" && url.hostname === "internship.flyrank.ai" && (url.pathname === "/verify" || url.pathname.startsWith("/verify/"));
    } catch {
      return false;
    }
  })();
  const t = uiTranslations[lang];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="footer-root"
      className="bg-[#091009] border-t border-[#3d4a3d] w-full py-16 relative overflow-hidden"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      {/* Background visual detail */}
      <div className="absolute inset-0 dot-grid opacity-[0.03] pointer-events-none" />

      <div className="flex flex-col md:flex-row justify-between items-stretch max-w-7xl mx-auto px-6 gap-12 relative z-10 w-full">
        {/* Logo and bio */}
        <div className="space-y-4 flex-1">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-[#4be277]/10 border border-[#4be277]/30 flex items-center justify-center">
              <Terminal className="w-3.5 h-3.5 text-[#4be277]" />
            </div>
            <span className="font-sans text-xl font-black text-[#4be277] tracking-tighter">
              {lang === "en" ? "HANY'S WORLD" : "عالم هاني"}
            </span>
          </div>
          <p className="font-mono text-xs text-[#bccbb9]/60 max-w-xs leading-relaxed">
            {t.footerDesc}
          </p>

          {/* Interactive clipboard Copy */}
          <div className="pt-2">
            <button
              onClick={handleCopyEmail}
              className="group flex items-center gap-2 bg-[#161d16] border border-[#3d4a3d]/80 hover:border-[#4be277] hover:text-[#4be277] text-[#bccbb9] px-4 py-2 font-mono text-xs rounded-sm transition-all duration-300 active:scale-95 cursor-pointer"
              id="footer-email-copy-btn"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#4be277]" />
                  <span>{t.copied}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#bccbb9]/40 group-hover:text-[#4be277] transition-colors" />
                  <span>{emailAddress}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Directory links and legal */}
        <div className="flex flex-col md:flex-row gap-12 items-start md:items-end md:justify-end flex-1">
          <div className="flex flex-col gap-6 w-full">
            
            {/* Social channels */}
            <div className={`flex flex-wrap gap-x-6 gap-y-3 ${lang === "ar" ? "justify-start" : "justify-start md:justify-end"}`}>
              <button
                onClick={handleCopyEmail}
                className="font-mono text-xs text-[#bccbb9]/70 hover:text-[#4be277] transition-colors flex items-center gap-1.5 bg-transparent border-0 cursor-pointer p-0 select-none outline-none"
                id="footer-email-link"
                title="Click to copy email address: moustfahhany5@gmail.com"
              >
                <Mail className="w-3.5 h-3.5 text-[#4be277]" />
                {copied ? <span className="text-[#4be277] font-bold">{t.copied}</span> : <span>{lang === "en" ? "Email" : "البريد الإلكتروني"}</span>}
              </button>
              <a
                href="https://github.com/Hany-Zamalkawy"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs text-[#bccbb9]/70 hover:text-[#4be277] transition-colors flex items-center gap-1.5"
                id="footer-github-link"
              >
                <Github className="w-3.5 h-3.5" />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/moustafa-hany-azab-4550692b9/"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs text-[#bccbb9]/70 hover:text-[#4be277] transition-colors flex items-center gap-1.5"
                id="footer-linkedin-link"
              >
                <Linkedin className="w-3.5 h-3.5" />
                LinkedIn
              </a>
              <a
                href="https://www.instagram.com/hany_zamlkawy/"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs text-[#bccbb9]/70 hover:text-[#4be277] transition-colors flex items-center gap-1.5"
                id="footer-instagram-link"
              >
                <Instagram className="w-3.5 h-3.5" />
                Instagram
              </a>
              <a
                href="https://www.facebook.com/Hany.Zamlkawy"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs text-[#bccbb9]/70 hover:text-[#4be277] transition-colors flex items-center gap-1.5"
                id="footer-facebook-link"
              >
                <Facebook className="w-3.5 h-3.5" />
                Facebook
              </a>
              <a
                href="https://wa.me/201228494191"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs text-[#bccbb9]/70 hover:text-[#4be277] transition-colors flex items-center gap-1.5"
                id="footer-whatsapp-link"
                title="WhatsApp Username: @Hany_Zamlkawy"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                WhatsApp
              </a>
              <a
                href="https://t.me/Hany_Zamlkawy"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs text-[#bccbb9]/70 hover:text-[#4be277] transition-colors flex items-center gap-1.5"
                id="footer-telegram-link"
                title="Telegram Username: @Hany_Zamlkawy"
              >
                <Send className="w-3.5 h-3.5" />
                Telegram
              </a>
            </div>

            <div className="flex justify-between items-center w-full border-t border-[#3d4a3d]/20 pt-6">
              {/* Copyright message */}
              <p className="font-mono text-[10px] text-[#bccbb9]/40">
                {lang === "en" ? "© 2026 Moustafa Hany Azab. All rights reserved." : "© 2026 مصطفى هاني عزب. جميع الحقوق محفوظة."}
              </p>

              {/* Scroll back to top */}
              <button
                onClick={scrollToTop}
                className="p-2 bg-[#161d16] hover:bg-[#242c24] border border-[#3d4a3d]/60 hover:border-[#4be277] text-[#bccbb9] hover:text-[#4be277] rounded-sm transition-all cursor-pointer"
                title="Scroll to top"
                id="footer-scroll-top-btn"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>

            {isFlyRankVerificationUrl && (
              <a
                href={verificationUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-sm border border-[#4be277]/40 bg-[#4be277]/10 px-3 py-2 font-mono text-[10px] tracking-wide text-[#4be277] transition-colors hover:border-[#4be277] hover:bg-[#4be277]/15"
                aria-label="Verify my FlyRank graduate credential"
                id="footer-flyrank-graduate-badge"
              >
                <Award className="h-3.5 w-3.5" />
                {lang === "en" ? "FLYRANK GRADUATE · VERIFY" : "خريج فلاي رانك · تحقق"}
              </a>
            )}

          </div>
        </div>
      </div>
    </footer>
  );
}
