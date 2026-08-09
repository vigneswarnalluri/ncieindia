"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Award, BookOpen, Building2, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function DirectorClient() {
  const { t, language } = useLanguage();

  return (
    <div className="flex-1 bg-[#F9FAFB] pb-16">
      
      {/* ── Page Hero Banner (Gov/Institutional Style) ── */}
      <div className="relative bg-[#0A5D45] py-14 text-white border-b border-primary-dark">
        {/* Decorative subtle background overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%">
            <line x1="0" y1="20%" x2="100%" y2="80%" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="100%" y1="10%" x2="0%" y2="90%" stroke="#ffffff" strokeWidth="1.5" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-xs md:text-sm text-emerald-100 font-semibold mb-2 flex items-center gap-1.5 uppercase tracking-wider">
            <Link href="/" className="hover:underline hover:text-white transition-colors">
              {language === "hi" ? "मुख्य पृष्ठ" : "Home"}
            </Link>
            <ChevronRight className="w-3 h-3 text-emerald-300" />
            <Link href="/about" className="hover:underline hover:text-white transition-colors">
              {language === "hi" ? "परिषद के बारे में" : "About Council"}
            </Link>
            <ChevronRight className="w-3 h-3 text-emerald-300" />
            <span className="text-white/60">{language === "hi" ? "कार्यकारी निदेशक" : "Executive Director"}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {language === "hi" ? "कार्यकारी निदेशक डेस्क" : "Executive Director Desk"}
          </h1>
          <p className="text-emerald-100/80 text-xs sm:text-sm max-w-3xl mt-3 leading-relaxed">
            {language === "hi" 
              ? "कॉलेजिएट नवाचार, बीज अनुदान पाइपलाइनों और राष्ट्रीय उद्यमिता ड्राइव का नेतृत्व।" 
              : "Guiding collegiate innovation networks, startup seed grants pipelines, and national entrepreneurship drives."}
          </p>
        </div>
      </div>

      {/* ── Main Content Grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ── Left Column: Premium Profile Card (4 Columns) ── */}
          <div className="lg:col-span-4 bg-white border border-zinc-200 shadow-xs rounded-sm overflow-hidden sticky top-24">
            <div className="relative aspect-[3/4] w-full bg-zinc-50 border-b border-zinc-150">
              <Image
                src="/images/executive-council/dr_elia_thagaram.jpg"
                alt="Dr. Elia Thagaram"
                fill
                priority
                className="object-contain"
                sizes="(max-w-768px) 100vw, 33vw"
              />
            </div>
            
            <div className="p-6 space-y-5">
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-zinc-900 leading-tight">
                  Dr. Elia Thagaram
                </h2>
                <p className="text-xs text-zinc-500 font-medium font-mono mt-1">
                  MBA, M.Phil, Ph.D.
                </p>
                <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-primary border border-emerald-200/50 rounded-xs text-[10px] font-bold uppercase tracking-wide">
                  <span>{language === "hi" ? "कार्यकारी निदेशक" : "Executive Director"}</span>
                </div>
              </div>

              <div className="h-px bg-zinc-200" />

              {/* Quick Contact & Details List */}
              <div className="space-y-3.5 text-xs text-zinc-700">
                <div className="flex gap-3">
                  <Building2 className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-zinc-900 block">{language === "hi" ? "शैक्षणिक पद" : "Academic Role"}</span>
                    <span className="leading-relaxed">
                      {language === "hi" 
                        ? "डीन, नवाचार और उद्यमिता, के.एस.आर.एम. कॉलेज ऑफ इंजीनियरिंग (स्वायत्त)" 
                        : "Dean, Innovation & Entrepreneurship, K.S.R.M. College of Engineering (Autonomous)"}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Award className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-zinc-900 block">{language === "hi" ? "संस्थान एवं स्थान" : "Institution & Location"}</span>
                    <span className="leading-relaxed">
                      {language === "hi" 
                        ? "कड़पा, आंध्र प्रदेश, भारत" 
                        : "Kadapa, Andhra Pradesh, India"}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Mail className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-zinc-900 block">{language === "hi" ? "आधिकारिक ईमेल" : "Official Email"}</span>
                    <a href="mailto:dr.eliathagaram66@gmail.com" className="text-primary hover:underline font-medium">
                      dr.eliathagaram66@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/about?tab=team"
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-zinc-50 border border-zinc-200 hover:bg-zinc-100/80 text-zinc-700 font-bold text-xs uppercase px-4 py-2.5 rounded transition-all cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{language === "hi" ? "कार्यकारी परिषद देखें" : "View Executive Council"}</span>
                </Link>
              </div>
            </div>
          </div>

          {/* ── Right Column: Visionary Message (8 Columns) ── */}
          <div className="lg:col-span-8 bg-white border border-zinc-200 p-6 sm:p-8 space-y-6">
            
            <div className="border-l-4 border-primary pl-4 py-1">
              <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-zinc-900">
                {language === "hi" ? "कार्यकारी निदेशक का संदेश" : "Message from the Executive Director"}
              </h2>
              <p className="text-xs text-zinc-500 font-medium mt-0.5">
                {language === "hi" 
                  ? "राष्ट्रीय परिषद नवाचार और उद्यमिता पहल" 
                  : "National Council Innovation & Entrepreneurship Initiatives"}
              </p>
            </div>

            {/* Visionary Message Body */}
            <div className="text-zinc-700 leading-relaxed font-sans text-xs sm:text-sm space-y-4 text-justify">
              {language === "hi" ? (
                <>
                  <p className="font-semibold text-zinc-900">
                    प्रिय नवप्रवर्तकों, छात्रों और शैक्षणिक नेताओं,
                  </p>
                  <p className="indent-8">
                    राष्ट्रीय नवाचार और उद्यमिता परिषद (एनसीआईई) भारत के आधिकारिक मंच पर आपका स्वागत है।
                  </p>
                  <p className="indent-8">
                    एनसीआईई में, हमारा अंतिम मिशन एक मजबूत, स्केलेबल और अत्यधिक गतिशील राष्ट्रीय पारिस्थितिकी तंत्र का निर्माण करना है जो भारत की युवा पीढ़ी को उनके नवीन विचारों को बड़े पैमाने पर व्यावहारिक और आत्मनिर्भर उद्यमों में बदलने के लिए सशक्त बनाता है। 
                  </p>
                  <p className="indent-8">
                    अकादमिक शिक्षण और व्यावहारिक उद्यमिता के बीच एक अंतर हमेशा से मौजूद रहा है। छात्र स्टार्टअप्स के लिए हमारे विशेष बीज निधि (Seed Funding) योजनाओं, प्रोटोटाइप सूक्ष्म-अनुदान (Micro-grants), और कॉलेज शाखाओं (Chapters) के राष्ट्रव्यापी नेटवर्क के माध्यम से, हमारा लक्ष्य इस अंतर को समाप्त करना और परिसर स्तर पर ही सफल इनक्यूबेशन और उद्योग संरेखण सुनिश्चित करना है।
                  </p>
                  <p className="indent-8">
                    हम अपनी प्रमुख पहलों को भारत सरकार के **विकसित भारत 2047** के राष्ट्रीय दृष्टिकोण के साथ पूर्णतः संरेखित करने के लिए प्रतिबद्ध हैं। हमारे देश के तकनीकी, इंजीनियरिंग, विज्ञान और प्रबंधन संस्थानों में नवाचार, अनुसंधान और आत्म-निर्भर नेतृत्व की संस्कृति को बढ़ावा देना हमारा मुख्य कर्तव्य है।
                  </p>
                  <p className="indent-8">
                    मैं सभी प्रमुख विश्वविद्यालयों, कॉलेजों, महत्वाकांक्षी छात्र संस्थापकों और उद्योग भागीदारों को इस राष्ट्रीय नवाचार आंदोलन में हमारे साथ जुड़ने के लिए आमंत्रित करता हूं। आइए साथ मिलकर भारत को तकनीकी नवाचार और उद्यमिता के वैश्विक मानचित्र पर स्थापित करें।
                  </p>
                  
                  <div className="pt-6 space-y-1">
                    <p className="font-bold text-zinc-900">सादर,</p>
                    <p className="font-bold text-primary text-sm">डॉ. एलिया थगारम</p>
                    <p className="text-[11px] text-zinc-500 font-medium uppercase tracking-wider leading-relaxed">
                      कार्यकारी निदेशक, एनसीआईई भारत<br />
                      डीन, नवाचार और उद्यमिता, के.एस.आर.एम. कॉलेज ऑफ इंजीनियरिंग (स्वायत्त)
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <p className="font-semibold text-zinc-900">
                    Dear Innovators, Students, and Academic Leaders,
                  </p>
                  <p className="indent-8">
                    Welcome to the National Council for Innovation & Entrepreneurship (NCIE) India portal.
                  </p>
                  <p className="indent-8">
                    At NCIE, our primary mission is to build a robust, scalable, and dynamic national ecosystem that empowers youth to transform their creative, innovative ideas into viable, self-sustaining, and high-impact commercial ventures. 
                  </p>
                  <p className="indent-8">
                    There has historically been a significant divide between academic training and real-world market entry. Through our specialized student startup seed funding initiatives, prototype validation micro-grants, and our rapidly expanding network of STEM college chapters, we aim to bridge this gap by enabling structured incubation, mentorship, and funding access right at the campus level.
                  </p>
                  <p className="indent-8">
                    We are fully committed to aligning our initiatives with the national vision of **Viksit Bharat 2047**, fostering a cultural shift toward technology-driven leadership, self-reliance, and research excellence across higher educational institutions in India.
                  </p>
                  <p className="indent-8">
                    I invite all universities, technical colleges, student founders, and ecosystem partners to join hands with us in this national movement to accelerate collegiate innovation and build a prosperous, technology-led future.
                  </p>

                  <div className="pt-6 space-y-1">
                    <p className="font-bold text-zinc-900">Warm regards,</p>
                    <p className="font-bold text-primary text-sm">Dr. Elia Thagaram</p>
                    <p className="text-[11px] text-zinc-500 font-medium uppercase tracking-wider leading-relaxed">
                      Executive Director, NCIE India<br />
                      Dean, Innovation & Entrepreneurship, K.S.R.M. College of Engineering (Autonomous)
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Quick stats / Highlights section for visual engagement */}
            <div className="pt-8 border-t border-zinc-200 mt-8">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700 mb-4">
                {language === "hi" ? "प्रमुख ध्यान केंद्रित क्षेत्र" : "Core Focus Areas"}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-zinc-50 border border-zinc-200 p-4 rounded-xs">
                  <span className="text-primary font-black text-lg block">01</span>
                  <span className="text-xs font-bold text-zinc-800 block mt-1">Collegiate Innovation</span>
                  <span className="text-[11px] text-zinc-500 block mt-0.5">Establishing incubation cells and labs across India.</span>
                </div>
                <div className="bg-zinc-50 border border-zinc-200 p-4 rounded-xs">
                  <span className="text-[#C9A24B] font-black text-lg block">02</span>
                  <span className="text-xs font-bold text-zinc-800 block mt-1">Seed Funding Pipelines</span>
                  <span className="text-[11px] text-zinc-500 block mt-0.5">Equity-free capital support for verified student startups.</span>
                </div>
                <div className="bg-zinc-50 border border-zinc-200 p-4 rounded-xs">
                  <span className="text-primary font-black text-lg block">03</span>
                  <span className="text-xs font-bold text-zinc-800 block mt-1">Viksit Bharat 2047</span>
                  <span className="text-[11px] text-zinc-500 block mt-0.5">Aligning campus incubation with national strategic goals.</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
