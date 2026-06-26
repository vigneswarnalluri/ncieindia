"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  useEffect(() => {
    if (pathname?.startsWith("/dashboard")) return;
    const fetchCount = async () => {
      try {
        const hasVisited = sessionStorage.getItem("ncie_session_visited");
        let method = "GET";
        if (!hasVisited) {
          method = "POST";
        }

        const res = await fetch("/api/visitor-count", { method });
        if (res.ok) {
          const data = await res.json();
          setVisitorCount(data.count);
          if (!hasVisited) {
            sessionStorage.setItem("ncie_session_visited", "true");
          }
        }
      } catch (err) {
        console.error("Failed to load visitor count:", err);
      }
    };
    fetchCount();
  }, [pathname]);

  if (pathname?.startsWith("/dashboard")) return null;

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-[#063b2c] via-[#0D6B4F] to-[#042118] text-zinc-100 border-t-4 border-accent relative overflow-hidden">
      {/* Background Subtle Patterns & Glowing Orbs */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />
      
      {/* Premium Blur Orbs */}
      <div className="absolute -top-[30%] -left-[10%] w-[550px] h-[550px] rounded-full bg-emerald-400/15 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-[20%] right-[5%] w-[450px] h-[450px] rounded-full bg-accent/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-[20%] right-[30%] w-[350px] h-[350px] rounded-full bg-primary-light/5 blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            <Link href="/" className="block focus:outline-none w-fit">
              <Image
                src="/logo-new.svg"
                alt={t("footer_logo_alt")}
                width={240}
                height={68}
                className="h-14 w-auto object-contain brightness-0 invert opacity-85 hover:opacity-100 transition-opacity duration-200"
                unoptimized
              />
            </Link>
            
            <p className="text-sm text-zinc-300 max-w-sm leading-relaxed">
              {t("footer_desc")}
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-2.5 pt-2">
              <a href="https://www.linkedin.com/company/ncieindia" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-black hover:text-white text-white flex items-center justify-center hover:scale-110 hover:-translate-y-0.5 transition-all duration-300 shrink-0">
                <FaLinkedinIn className="w-4 h-4" />
              </a>
              <a href="https://www.facebook.com/ncieindiaofficial" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-black hover:text-white text-white flex items-center justify-center hover:scale-110 hover:-translate-y-0.5 transition-all duration-300 shrink-0">
                <FaFacebook className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/ncieindia" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-black hover:text-white text-white flex items-center justify-center hover:scale-110 hover:-translate-y-0.5 transition-all duration-300 shrink-0">
                <FaInstagram className="w-4 h-4" />
              </a>
              <a href="https://x.com/ncieindia" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-black hover:text-white text-white flex items-center justify-center hover:scale-110 hover:-translate-y-0.5 transition-all duration-300 shrink-0">
                <FaXTwitter className="w-4 h-4" />
              </a>
              <a href="https://youtube.com/@ncie.9" target="_blank" rel="noopener noreferrer" aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-black hover:text-white text-white flex items-center justify-center hover:scale-110 hover:-translate-y-0.5 transition-all duration-300 shrink-0">
                <FaYoutube className="w-4 h-4" />
              </a>
              <a href="https://whatsapp.com/channel/0029Vb7s9A430LKNIB0OxD1w" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-black hover:text-white text-white flex items-center justify-center hover:scale-110 hover:-translate-y-0.5 transition-all duration-300 shrink-0">
                <FaWhatsapp className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-accent">{t("footer_ecosystem")}</h4>
            <ul className="space-y-2 text-sm text-zinc-300">
              <li><Link href="/about" className="hover:text-accent transition-colors">{t("footer_about")}</Link></li>
              <li><Link href="/programs" className="hover:text-accent transition-colors">{t("footer_initiatives")}</Link></li>
              <li><Link href="/opportunities" className="hover:text-accent transition-colors">{t("footer_opportunities")}</Link></li>
              <li><Link href="/chapters" className="hover:text-accent transition-colors">{t("footer_chapters")}</Link></li>
            </ul>
          </div>

          {/* Resources Links */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-accent">{t("footer_engage")}</h4>
            <ul className="space-y-2 text-sm text-zinc-300">
              <li><Link href="/join" className="hover:text-accent transition-colors">{t("footer_join")}</Link></li>
              <li><Link href="/media" className="hover:text-accent transition-colors">{t("footer_media")}</Link></li>
              <li><Link href="/vision-2047" className="hover:text-accent transition-colors">{t("footer_vision")}</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors">{t("footer_contact_inquiries")}</Link></li>
            </ul>
          </div>

          {/* Legal / Contact Summary */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-accent">{t("footer_contact_desk")}</h4>
            <p className="text-sm text-zinc-300 leading-relaxed">
              {t("footer_address")}<br />
              {t("footer_email")}<br />
              {t("footer_phone")}
            </p>
          </div>

        </div>

        {/* Separator */}
        <div className="h-px bg-white/10 my-12" />

        {/* Footer Bottom Block */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-300">
          <div className="max-w-2xl text-center md:text-left leading-relaxed">
            <p className="mb-2 text-zinc-100">
              {t("footer_copyright").replace("{year}", String(currentYear))}
            </p>
            <p className="text-[11px] text-zinc-300/85 font-medium leading-relaxed">
              {t("footer_disclaimer")}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {visitorCount !== null && (
              <div className="flex items-center gap-2.5 bg-[#04281E] border border-emerald-800/80 rounded px-3 py-1.5 shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)] select-none">
                <span className="text-[10px] uppercase font-bold text-zinc-300 tracking-wider font-sans">
                  {t("visitor_count_title")}
                </span>
                <div className="flex gap-0.5">
                  {String(visitorCount)
                    .padStart(7, "0")
                    .split("")
                    .map((digit, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center justify-center w-4.5 h-6 bg-zinc-950 text-accent border border-zinc-800 text-[13px] font-mono font-black rounded-sm shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]"
                      >
                        {digit}
                      </span>
                    ))}
                </div>
              </div>
            )}
            <div className="flex items-center gap-4">
              <Link href="/terms" className="hover:underline hover:text-white text-zinc-300 transition-colors">{t("footer_terms")}</Link>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <Link href="/privacy" className="hover:underline hover:text-white text-zinc-300 transition-colors">{t("footer_privacy")}</Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
