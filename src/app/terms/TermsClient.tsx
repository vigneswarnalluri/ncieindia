"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Scale, CheckCircle2, ChevronRight, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Section {
  id: string;
  title: string;
  content: React.ReactNode;
}

export default function TermsPage() {
  const { language } = useLanguage();
  const [activeSection, setActiveSection] = useState<string>("acceptance");

  const sectionsEn: Section[] = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      content: (
        <div className="space-y-4">
          <p>
            Welcome to the National Council for Innovation and Entrepreneurship (NCIE) India portal. By accessing or using this website, its subdomains, or portal services, you agree to comply with and be bound by these Terms of Use. If you do not agree, please do not use the services.
          </p>
          <p>
            These Terms constitute a legally binding agreement between you (whether acting individually or representing an accredited higher education institution as a designated Single Point of Contact) and NCIE India.
          </p>
        </div>
      ),
    },
    {
      id: "accounts",
      title: "2. User Accounts & Portal Security",
      content: (
        <div className="space-y-4">
          <p>
            Access to certain areas of the portal, including institutional dashboards, grant applications, and circular management systems, is strictly restricted to authorized Single Point of Contact (SPOC) and Nodal Officers.
          </p>
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 my-2 text-amber-900 text-xs sm:text-sm">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Security Warning:</span> Unauthorized access attempts, sharing of authentication tokens, or bypass of login passkeys are punishable offenses under Section 66 of the Indian Information Technology (IT) Act, 2000. All active session logs are audited.
              </div>
            </div>
          </div>
          <p>
            You are responsible for maintaining the confidentiality of your credentials and OTP (One-Time Password) mechanisms. NCIE India is not liable for unauthorized activities resulting from shared or compromised administrative accounts.
          </p>
        </div>
      ),
    },
    {
      id: "intellectual",
      title: "3. Intellectual Property Rights",
      content: (
        <div className="space-y-4">
          <p>
            All content on this website, including but not limited to text, graphics, logos, banners, portal interface elements, databases, and software, is the property of NCIE India or its licensed partners and is protected by Indian and international copyright and trademark laws.
          </p>
          <p>
            Designated collegiate chapters are granted a limited, non-exclusive, non-transferable license to display NCIE logos and banners strictly for official local activities and sanctioned startup bootcamps. Any commercial exploitation or unauthorized derivative work is strictly prohibited.
          </p>
        </div>
      ),
    },
    {
      id: "prohibited",
      title: "4. Prohibited Activities",
      content: (
        <div className="space-y-3">
          <p>As a condition of using this portal, you agree not to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Submit fraudulent, inaccurate, or fabricated institutional data, student enrollments, or patent applications.</li>
            <li>Use automated crawlers, scrapers, or scripts to extract portal databases, user directories, or grant disbursements list.</li>
            <li>Introduce malicious code, trojan horses, worms, or conduct denial-of-service (DoS) attacks against the NCIE network.</li>
            <li>Impersonate any government official, nodal coordinator, or university SPOC.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "disclaimer",
      title: "5. Disclaimers & Limitation of Liability",
      content: (
        <div className="space-y-4">
          <p>
            The NCIE India portal, its services, and database utilities are provided on an &quot;as is&quot; and &quot;as available&quot; basis. We do not warrant that the network will be uninterrupted, error-free, or entirely free from minor database latencies.
          </p>
          <p>
            Under no circumstances shall NCIE India, the Ministry of Education, or its technical officers be held liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use this portal, data submission delays, or system-scheduled downtime.
          </p>
        </div>
      ),
    },
    {
      id: "jurisdiction",
      title: "6. Governing Law & Jurisdiction",
      content: (
        <div className="space-y-4">
          <p>
            These Terms of Use shall be governed by and construed in accordance with the laws of the Republic of India.
          </p>
          <p>
            Any legal disputes, claims, or arbitration arising out of portal activities, chapter registrations, or grant allocations shall be subject to the exclusive jurisdiction of the courts in New Delhi, India.
          </p>
        </div>
      ),
    },
  ];

  const sectionsHi: Section[] = [
    {
      id: "acceptance",
      title: "1. शर्तों की स्वीकृति",
      content: (
        <div className="space-y-4">
          <p>
            राष्ट्रीय नवाचार और उद्यमिता परिषद (NCIE) भारत पोर्टल में आपका स्वागत है। इस वेबसाइट, इसके उप-डोमेन या पोर्टल सेवाओं का उपयोग करके, आप इन उपयोग की शर्तों का पालन करने और उनसे बाध्य होने के लिए सहमत हैं। यदि आप सहमत नहीं हैं, तो कृपया सेवाओं का उपयोग न करें।
          </p>
          <p>
            ये शर्तें आपके (चाहे व्यक्तिगत रूप से या किसी मान्यता प्राप्त उच्च शिक्षण संस्थान के नामित एसपीओसी के रूप में कार्य कर रहे हों) और NCIE भारत के बीच एक कानूनी रूप से बाध्यकारी समझौता हैं।
          </p>
        </div>
      ),
    },
    {
      id: "accounts",
      title: "2. उपयोगकर्ता खाते और पोर्टल सुरक्षा",
      content: (
        <div className="space-y-4">
          <p>
            पोर्टल के विशिष्ट क्षेत्रों तक पहुंच, जिसमें संस्थागत डैशबोर्ड, अनुदान आवेदन और परिपत्र प्रबंधन प्रणाली शामिल हैं, केवल अधिकृत एसपीओसी (SPOC) और नोडल अधिकारियों तक ही सीमित है।
          </p>
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 my-2 text-amber-900 text-xs sm:text-sm">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">सुरक्षा चेतावनी:</span> अनधिकृत पहुंच के प्रयास, प्रमाणीकरण टोकन साझा करना, या लॉगिन पासकी को बायपास करना भारतीय सूचना प्रौद्योगिकी (आईटी) अधिनियम, 2000 की धारा 66 के तहत दंडनीय अपराध हैं। सभी सक्रिय सत्र लॉग का ऑडिट किया जाता है।
              </div>
            </div>
          </div>
          <p>
            आप अपने क्रेडेंशियल और ओटीपी (वन-टाइम पासवर्ड) तंत्र की गोपनीयता बनाए रखने के लिए जिम्मेदार हैं। साझा या समझौता किए गए प्रशासनिक खातों के कारण होने वाली अनधिकृत गतिविधियों के लिए NCIE भारत उत्तरदायी नहीं है।
          </p>
        </div>
      ),
    },
    {
      id: "intellectual",
      title: "3. बौद्धिक संपदा अधिकार",
      content: (
        <div className="space-y-4">
          <p>
            इस वेबसाइट की सभी सामग्री, जिसमें पाठ, ग्राफिक्स, लोगो, बैनर, पोर्टल इंटरफेस तत्व, डेटाबेस और सॉफ्टवेयर शामिल हैं, NCIE भारत या उसके लाइसेंस प्राप्त भागीदारों की संपत्ति हैं और भारतीय और अंतर्राष्ट्रीय कॉपीराइट कानूनों द्वारा सुरक्षित हैं।
          </p>
          <p>
            नामित कॉलेज अध्यायों को आधिकारिक स्थानीय गतिविधियों और स्वीकृत स्टार्टअप बूटकैंपों के लिए विशेष रूप से NCIE लोगो और बैनर प्रदर्शित करने के लिए सीमित लाइसेंस दिया जाता है। कोई भी व्यावसायिक उपयोग या अनधिकृत प्रतिलिपि सख्त वर्जित है।
          </p>
        </div>
      ),
    },
    {
      id: "prohibited",
      title: "4. निषिद्ध गतिविधियाँ",
      content: (
        <div className="space-y-3">
          <p>इस पोर्टल का उपयोग करने की शर्त के रूप में, आप निम्नलिखित न करने पर सहमत हैं:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>धोखाधड़ी, गलत या मनगढ़ंत संस्थागत डेटा, छात्र नामांकन, या पेटेंट आवेदन जमा करना।</li>
            <li>पोर्टल डेटाबेस, उपयोगकर्ता निर्देशिकाओं या अनुदान संवितरण सूची को निकालने के लिए स्वचालित क्रॉलर्स या स्क्रिप्ट का उपयोग करना।</li>
            <li>NCIE नेटवर्क के खिलाफ दुर्भावनापूर्ण कोड, वायरस डालना या डिनायल-ऑफ-सर्विस (DoS) हमलों का संचालन करना।</li>
            <li>किसी भी सरकारी अधिकारी, नोडल समन्वयक, या विश्वविद्यालय एसपीओसी का रूप धारण करना।</li>
          </ul>
        </div>
      ),
    },
    {
      id: "disclaimer",
      title: "5. अस्वीकरण और दायित्व की सीमा",
      content: (
        <div className="space-y-4">
          <p>
            NCIE भारत पोर्टल, इसकी सेवाएं और डेटाबेस उपयोगिताएँ &quot;जैसा है&quot; और &quot;जैसे उपलब्ध है&quot; के आधार पर प्रदान की जाती हैं। हम यह गारंटी नहीं देते हैं कि नेटवर्क निर्बाध या त्रुटि रहित होगा।
          </p>
          <p>
            किसी भी स्थिति में NCIE भारत, शिक्षा मंत्रालय, या उसके तकनीकी अधिकारी इस पोर्टल के उपयोग या अनुपयोग, डेटा जमा करने में देरी या सिस्टम डाउनटाइम से होने वाले किसी भी प्रत्यक्ष या अप्रत्यक्ष नुकसान के लिए उत्तरदायी नहीं होंगे।
          </p>
        </div>
      ),
    },
    {
      id: "jurisdiction",
      title: "6. लागू कानून और अधिकार क्षेत्र",
      content: (
        <div className="space-y-4">
          <p>
            उपयोग की ये शर्तें भारतीय कानून के अनुसार शासित और व्याख्या की जाएंगी।
          </p>
          <p>
            पोर्टल गतिविधियों, अध्याय पंजीकरण या अनुदान आवंटन से उत्पन्न होने वाले किसी भी कानूनी विवाद या मध्यस्थता को नई दिल्ली, भारत में अदालतों के अनन्य अधिकार क्षेत्र के अधीन किया जाएगा।
          </p>
        </div>
      ),
    },
  ];

  const currentSections = language === "hi" ? sectionsHi : sectionsEn;

  return (
    <div className="flex-1 bg-[#F9FAFB] pb-16">
      {/* Header Block */}
      <div className="relative bg-[#0A5D45] py-16 text-white border-b border-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs md:text-sm text-emerald-100 font-semibold mb-2 flex items-center gap-1.5 uppercase tracking-wider">
            <Link href="/" className="hover:underline hover:text-white transition-colors">
              {language === "hi" ? "मुख्य पृष्ठ" : "Home"}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/60">
              {language === "hi" ? "उपयोग की शर्तें" : "Terms of Use"}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight flex items-center gap-3">
            <Scale className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-300" />
            {language === "hi" ? "उपयोग की शर्तें" : "Terms of Use"}
          </h1>
          <p className="text-emerald-100/80 text-xs sm:text-sm max-w-3xl mt-3 leading-relaxed">
            {language === "hi"
              ? "राष्ट्रीय नवाचार और उद्यमिता परिषद (NCIE) भारत पोर्टल के लिए आधिकारिक कानूनी नियम और दिशानिर्देश।"
              : "Official legal terms, rules, and guidelines governing the National Council for Innovation and Entrepreneurship (NCIE) India portal."}
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Nav */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-zinc-200 p-4 rounded-sm lg:sticky lg:top-24 space-y-1">
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider px-3 mb-2">
                {language === "hi" ? "विषय सूची" : "Table of Contents"}
              </p>
              {currentSections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => {
                    setActiveSection(sec.id);
                    const el = document.getElementById(sec.id);
                    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                  }}
                  className={`w-full text-left px-3 py-2 text-xs sm:text-sm font-medium transition-colors border-l-2 flex items-center justify-between ${
                    activeSection === sec.id
                      ? "text-primary border-primary bg-primary/5 font-semibold"
                      : "text-zinc-600 border-transparent hover:bg-zinc-50 hover:text-zinc-900"
                  }`}
                >
                  <span>{sec.title.split(". ")[1]}</span>
                  {activeSection === sec.id && (
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 ml-2 animate-pulse" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column content */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white border border-zinc-200 p-6 sm:p-8 space-y-8">
              {currentSections.map((sec) => (
                <div
                  id={sec.id}
                  key={sec.id}
                  className={`scroll-mt-28 space-y-3 pb-8 border-b border-zinc-100 last:border-0 last:pb-0 transition-opacity duration-300 ${
                    activeSection === sec.id ? "opacity-100" : "opacity-85"
                  }`}
                >
                  <h2
                    className={`text-base sm:text-lg font-bold text-zinc-900 flex items-center gap-2 border-l-4 pl-3 py-0.5 ${
                      activeSection === sec.id ? "border-primary text-primary" : "border-zinc-300"
                    }`}
                  >
                    {sec.title}
                  </h2>
                  <div className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-sans space-y-3">
                    {sec.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Support info block */}
            <div className="bg-zinc-100 border border-zinc-200 p-5 text-center text-xs sm:text-sm text-zinc-600">
              {language === "hi" ? (
                <p>
                  उपयोग की शर्तों के बारे में किसी भी प्रश्न के लिए, कृपया हमसे{" "}
                  <Link href="/contact" className="text-primary font-bold hover:underline">
                    संपर्क पृष्ठ
                  </Link>{" "}
                  के माध्यम से संपर्क करें या support-iic@mic.gov.in पर ईमेल करें।
                </p>
              ) : (
                <p>
                  For any queries regarding the Terms of Use, please reach out to us via our{" "}
                  <Link href="/contact" className="text-primary font-bold hover:underline">
                    Contact Desk
                  </Link>{" "}
                  or email support-iic@mic.gov.in.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
