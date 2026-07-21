"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Calendar, 
  Clock, 
  Search, 
  Download, 
  Award,
  ChevronRight
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { VACANCIES_DATA } from "@/data/vacanciesData";

export default function CareersPage() {
  const { language, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const isHi = language === "hi";

  // Filtered vacancies list
  const filteredVacancies = VACANCIES_DATA.filter((v) => {
    const title = isHi ? v.titleHi : v.titleEn;
    const qual = isHi ? v.qualHi : v.qualEn;
    return (
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      qual.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const recruitmentSteps = isHi 
    ? [
        { label: "1. स्क्रीनिंग", desc: "आवेदन पत्रों की जांच और स्क्रीनिंग" },
        { label: "2. लिखित परीक्षा", desc: "लिखित परीक्षा (जहां लागू हो)" },
        { label: "3. कौशल परीक्षण", desc: "कौशल परीक्षण / व्यावहारिक मूल्यांकन (लागू पदों के लिए)" },
        { label: "4. साक्षात्कार", desc: "व्यक्तिगत साक्षात्कार" },
        { label: "5. दस्तावेज़ सत्यापन", desc: "मूल दस्तावेजों का सत्यापन" },
        { label: "6. चिकित्सा परीक्षण", desc: "चिकित्सा उपयुक्तता परीक्षण" },
        { label: "7. अंतिम चयन", desc: "योग्यता के आधार पर अंतिम चयन" }
      ]
    : [
        { label: "1. Screening", desc: "Scrutiny and screening of applications" },
        { label: "2. Written Exam", desc: "Written examination (wherever applicable)" },
        { label: "3. Skill Test", desc: "Skill test / practical assessment (for applicable posts)" },
        { label: "4. Interview", desc: "Personal Interview" },
        { label: "5. Verification", desc: "Verification of original documents" },
        { label: "6. Medical Exam", desc: "Medical fitness assessment" },
        { label: "7. Final Selection", desc: "Final selection based on overall merit" }
      ];

  const datesInfo = [
    { label: isHi ? "अधिसूचना की तिथि" : "Date of Notification", value: "01.07.2026", color: "bg-blue-50 text-blue-800 border-blue-200" },
    { label: isHi ? "आवेदन शुरू होने की तिथि" : "Opening Date for Applications", value: "01.06.2026", color: "bg-emerald-50 text-emerald-800 border-emerald-200" },
    { label: isHi ? "आवेदन की अंतिम तिथि" : "Last Date for Submission", value: "25.08.2026", color: "bg-red-50 text-red-800 border-red-200" },
    { label: isHi ? "परीक्षा / साक्षात्कार तिथि" : "Exam / Interview Date", value: isHi ? "जल्द ही घोषित की जाएगी" : "To be announced", color: "bg-amber-50 text-amber-800 border-amber-200" }
  ];

  return (
    <div className="flex-1 bg-[#F9FAFB] pb-20">
      {/* Dynamic Glassmorphic Hero Banner */}
      <div className="relative bg-gradient-to-br from-[#063b2c] via-[#0D6B4F] to-[#042118] py-20 text-white border-b-4 border-[#C9A24B] overflow-hidden">
        {/* Subtle Glowing Lights */}
        <div className="absolute top-[-20%] left-[-10%] w-[450px] h-[450px] rounded-full bg-emerald-400/10 blur-[110px] pointer-events-none" />
        <div className="absolute bottom-[-30%] right-[10%] w-[350px] h-[350px] rounded-full bg-accent/10 blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-xs md:text-sm text-accent font-extrabold mb-3 flex items-center gap-1.5 uppercase tracking-widest">
            <Link href="/" className="hover:underline hover:text-white transition-colors">{t("nav_home")}</Link>
            <span>/</span>
            <span className="text-white/60">{isHi ? "करियर और भर्ती" : "Careers & Recruitment"}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight uppercase">
            {isHi ? "भर्ती अधिसूचना — जुलाई 2026" : "Recruitment Notification — July 2026"}
          </h1>
          <p className="text-zinc-200/90 text-sm sm:text-base max-w-4xl mt-4 leading-relaxed font-medium">
            {isHi 
              ? "राष्ट्रीय परिषद (NCIE) राष्ट्रीय, राज्य और जिला स्तर की परियोजनाओं के कार्यान्वयन के लिए विशुद्ध रूप से अनुबंध के आधार पर विभिन्न 21 पदों के लिए 773 रिक्तियों पर योग्य और समर्पित भारतीय नागरिकों से आवेदन आमंत्रित करता है।"
              : "Applications are invited from eligible, dynamic, and dedicated Indian citizens for contract engagement to 21 distinct positions (773 total vacancies) under the National Council for Innovation & Entrepreneurship (NCIE)."}
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <Link href="/join?role=recruitment" className="inline-flex items-center gap-2 bg-[#C9A24B] hover:bg-[#b08b3e] text-[#042118] font-black uppercase text-xs tracking-wider px-6 py-3 shadow-lg hover:scale-105 transition-all duration-200">
              <span>{isHi ? "अभी ऑनलाइन आवेदन करें" : "Apply Online Now"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a 
              href="/NCIA-EMPOWERING.pdf" 
              download 
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/18 text-white border border-white/20 hover:border-white/40 font-bold uppercase text-xs tracking-wider px-6 py-3 transition-all duration-200"
            >
              <Download className="w-4 h-4" />
              <span>{isHi ? "अधिसूचना पीडीएफ डाउनलोड करें" : "Download Notification PDF"}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Main vacancies directory */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white border border-zinc-200 shadow-sm p-6 sm:p-8">
            {/* Table Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 mb-6 border-b border-zinc-200 border-l-4 border-[#0D6B4F] pl-3">
              <div>
                <h2 className="text-lg font-black uppercase tracking-wider text-zinc-900">
                  {isHi ? "रिक्तियों का विवरण" : "Details of Vacancies"}
                </h2>
                <p className="text-xs text-zinc-500 mt-0.5 font-medium">Ref No: NCIE/RECTT/2026/001/06</p>
              </div>
              
              {/* Search Bar */}
              <div className="relative w-full sm:w-72">
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={isHi ? "पद या योग्यता खोजें..." : "Search post or qualification..."}
                  className="w-full pl-9 pr-4 py-2 border border-zinc-300 rounded text-xs focus:outline-none focus:border-[#0D6B4F] bg-zinc-50/50"
                />
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Vacancies Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse border border-zinc-200">
                <thead>
                  <tr className="bg-zinc-50 border-b border-zinc-200 text-[10px] uppercase font-bold tracking-wider text-zinc-700">
                    <th className="px-4 py-3 border-r border-zinc-200 w-16 text-center">{isHi ? "क्र.सं." : "S.No."}</th>
                    <th className="px-4 py-3 border-r border-zinc-200">{isHi ? "पद का नाम" : "Name of Post"}</th>
                    <th className="px-4 py-3 border-r border-zinc-200 w-24 text-center">{isHi ? "संख्या" : "Vacancy Count"}</th>
                    <th className="px-4 py-3">{isHi ? "न्यूनतम शैक्षणिक योग्यता" : "Minimum Educational Qualification"}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVacancies.length > 0 ? (
                    filteredVacancies.map((v, idx) => (
                      <tr key={v.id} className="border-b border-zinc-200 hover:bg-zinc-50/40 text-xs transition-colors duration-150">
                        <td className="px-4 py-4 text-center font-mono font-bold text-zinc-500 border-r border-zinc-200">
                          {String(idx + 1).padStart(2, "0")}
                        </td>
                        <td className="px-4 py-4 border-r border-zinc-200 font-bold text-zinc-900">
                          {isHi ? v.titleHi : v.titleEn}
                        </td>
                        <td className="px-4 py-4 border-r border-zinc-200 text-center">
                          <span className="inline-flex justify-center items-center w-8 h-6 bg-emerald-50 text-[#0D6B4F] font-bold border border-emerald-100 rounded-sm">
                            {v.count}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-zinc-700 leading-relaxed text-justify pr-2">
                          {isHi ? v.qualHi : v.qualEn}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-4 py-8 text-center text-zinc-400 italic">
                        {isHi ? "कोई पद नहीं मिला।" : "No vacancies matched your search parameters."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex items-center gap-2 text-[10px] text-zinc-500 bg-zinc-50 border border-zinc-200 p-3">
              <span className="font-bold text-primary">Note:</span>
              <span>{isHi 
                ? "रिक्तियों की संख्या संभावित है और यह बढ़ या घट सकती है। आंध्र प्रदेश में कहीं भी पदस्थापना हो सकती है।"
                : "The number of vacancies is tentative and subject to change based on project requirements. Posting will be within Andhra Pradesh."}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Process, Timelines, General Instructions */}
        <div className="space-y-8">
          
          {/* Important Timelines */}
          <div className="bg-white border border-zinc-200 shadow-sm p-6">
            <h3 className="text-sm font-black uppercase tracking-wider text-zinc-950 pb-3 mb-4 border-b border-zinc-200 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#0D6B4F]" />
              <span>{isHi ? "महत्वपूर्ण तिथियां" : "Important Dates"}</span>
            </h3>
            
            <div className="space-y-3.5">
              {datesInfo.map((d, i) => (
                <div key={i} className="flex justify-between items-center border border-zinc-100 p-2.5 bg-zinc-50/50">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-zinc-400 leading-none">{d.label}</p>
                    <p className="text-xs font-black text-zinc-800 mt-1">{d.value}</p>
                  </div>
                  <span className={`text-[9px] uppercase font-extrabold px-2 py-0.5 border ${d.color} rounded-sm`}>
                    {i === 2 ? (isHi ? "अंतिम" : "Deadline") : (isHi ? "सक्रिय" : "Active")}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Selection Process steps */}
          <div className="bg-white border border-zinc-200 shadow-sm p-6">
            <h3 className="text-sm font-black uppercase tracking-wider text-zinc-950 pb-3 mb-4 border-b border-zinc-200 flex items-center gap-2">
              <Award className="w-4 h-4 text-[#0D6B4F]" />
              <span>{isHi ? "चयन प्रक्रिया" : "Selection Process"}</span>
            </h3>
            
            <div className="relative pl-4 border-l border-zinc-200 space-y-4">
              {recruitmentSteps.map((step, idx) => (
                <div key={idx} className="relative">
                  {/* Dot bullet */}
                  <span className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-white bg-[#0D6B4F] shadow-sm" />
                  <p className="text-xs font-black text-zinc-900 leading-tight">{step.label}</p>
                  <p className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* General conditions card */}
          <div className="bg-[#04281E] border border-emerald-800 text-white p-6 shadow-sm">
            <h3 className="text-xs uppercase font-extrabold tracking-widest text-accent mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{isHi ? "सामान्य शर्ते" : "General Terms"}</span>
            </h3>
            <ul className="space-y-2.5 text-[11px] text-zinc-200 leading-relaxed list-disc pl-4.5">
              <li>
                <strong>{isHi ? "आयु सीमा:" : "Age Limit:"}</strong> {isHi ? "न्यूनतम 18 वर्ष और अधिकतम 45 वर्ष होनी चाहिए।" : "Minimum 18 years and maximum 45 years."}
              </li>
              <li>
                <strong>{isHi ? "प्रशिक्षण अवधि:" : "Probation Period:"}</strong> {isHi ? "चयनित उम्मीदवारों को 100 दिनों के प्रशिक्षण और प्रोबेशन से गुजरना होगा।" : "All selected candidates undergo a mandatory 100-day Training-cum-Probation period."}
              </li>
              <li>
                <strong>{isHi ? "कंप्यूटर ज्ञान:" : "Computer Literacy:"}</strong> {isHi ? "सभी पदों के लिए बुनियादी कंप्यूटर ज्ञान (MS Office, ईमेल) आवश्यक है।" : "Desirable basic computer knowledge (MS Office, Internet, Email) for all vacancies."}
              </li>
              <li>
                {isHi 
                  ? "विस्तृत रिपोर्टिंग संरचना और पारिश्रमिक विवरण साक्षात्कार के समय प्रदान किए जाएंगे।" 
                  : "Detailed work structures, posting location, and exact salary scales will be explained during interviews."}
              </li>
            </ul>
            
            <div className="mt-6 pt-5 border-t border-emerald-800 flex justify-between items-center text-xs">
              <div className="text-zinc-300">
                <p className="text-[10px] text-zinc-400 uppercase font-medium">{isHi ? "अधिक सहायता के लिए" : "Recruitment Support"}</p>
                <p className="font-bold text-white mt-0.5">info@ncieindia.org</p>
              </div>
              <Link href="/join?role=recruitment" className="font-bold text-accent hover:text-white uppercase flex items-center gap-0.5 group">
                <span>{isHi ? "आवेदन करें" : "Apply"}</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
