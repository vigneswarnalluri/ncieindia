"use client";

import React from "react";
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

export default function Footer() {
  const pathname = usePathname();
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
                src="/logo-new.png"
                alt="NCIE India Logo"
                width={240}
                height={68}
                className="h-14 w-auto object-contain brightness-0 invert opacity-85 hover:opacity-100 transition-opacity duration-200"
                unoptimized
              />
            </Link>
            
            <p className="text-sm text-zinc-300 max-w-sm leading-relaxed">
              Fostering India&apos;s national student innovation and start-up ecosystem through institutional chapters, incubation alignment, and mentorship frameworks.
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
            <h4 className="text-sm font-semibold tracking-wider uppercase text-accent">Ecosystem</h4>
            <ul className="space-y-2 text-sm text-zinc-300">
              <li><Link href="/about" className="hover:text-accent transition-colors">About NCIE</Link></li>
              <li><Link href="/programs" className="hover:text-accent transition-colors">Initiatives & Schemes</Link></li>
              <li><Link href="/opportunities" className="hover:text-accent transition-colors">Open Opportunities</Link></li>
              <li><Link href="/chapters" className="hover:text-accent transition-colors">Regional Chapters</Link></li>
            </ul>
          </div>

          {/* Resources Links */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-accent">Engage</h4>
            <ul className="space-y-2 text-sm text-zinc-300">
              <li><Link href="/join" className="hover:text-accent transition-colors">Join the Network</Link></li>
              <li><Link href="/media" className="hover:text-accent transition-colors">Press & Media</Link></li>
              <li><Link href="/vision-2047" className="hover:text-accent transition-colors">Vision 2047</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors">Inquiries & Help</Link></li>
            </ul>
          </div>

          {/* Legal / Contact Summary */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-accent">Contact Desk</h4>
            <p className="text-sm text-zinc-300 leading-relaxed">
              NCIE Desk, New Delhi, India<br />
              Email: office@ncieindia.org<br />
              Phone: 0863 232 1417
            </p>
          </div>

        </div>

        {/* Separator */}
        <div className="h-px bg-white/10 my-12" />

        {/* Footer Bottom Block */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-300">
          <div className="max-w-2xl text-center md:text-left leading-relaxed">
            <p className="mb-2 text-zinc-100">
              © {currentYear} National Council for Innovation and Entrepreneurship (NCIE) India. All Rights Reserved.
            </p>
            <p className="text-[11px] text-zinc-300/85 font-medium leading-relaxed">
              NCIE India is an independent innovation ecosystem platform focused on innovation, entrepreneurship, collaboration, and institutional development.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:underline hover:text-white text-zinc-300 transition-colors">Terms of Use</Link>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <Link href="/privacy" className="hover:underline hover:text-white text-zinc-300 transition-colors">Privacy Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
