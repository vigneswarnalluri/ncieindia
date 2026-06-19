"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldAlert, CheckCircle2, ChevronRight, Eye } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Section {
  id: string;
  title: string;
  content: React.ReactNode;
}

export default function PrivacyPage() {
  const { language } = useLanguage();
  const [activeSection, setActiveSection] = useState<string>("collection");

  const sectionsEn: Section[] = [
    {
      id: "collection",
      title: "1. Information We Collect",
      content: (
        <div className="space-y-4">
          <p>
            NCIE India collects specific institutional and personal information necessary to operationalize collegiate innovation chapters, authenticate SPOC officials, and disburse technical grants.
          </p>
          <p className="font-semibold text-zinc-850">We collect the following details:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-bold">Administrative Details:</span> Full name, official email address, mobile number, and designation of designated Institution SPOCs and Government Nodal Officers.</li>
            <li><span className="font-bold">Institutional Data:</span> AISHE codes, college affiliation status, innovation capacity surveys, and physical/mailing addresses.</li>
            <li><span className="font-bold">Portal Logs:</span> Internet Protocol (IP) addresses, authentication timestamps, browser user-agent tokens, database transaction logs, and OTP verification records.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "usage",
      title: "2. How We Use Information",
      content: (
        <div className="space-y-4">
          <p>
            The collected data is strictly utilized for statutory administration, scheme implementations, and security auditing. We do not sell or lease user information to commercial third parties.
          </p>
          <p className="font-semibold text-zinc-850">Primary usage scopes include:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Verification of institutional credentials and validation of local chapters.</li>
            <li>Processing of student scholarships, fellowships, and startup seed funding applications.</li>
            <li>Sending critical administrative announcements, gazette circulars, and system notification alerts.</li>
            <li>Conducting session audits and database logs validation to prevent security breaches.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "sharing",
      title: "3. Information Sharing & Disclosure",
      content: (
        <div className="space-y-4">
          <p>
            User and institutional records are shared only with the Ministry of Education (MoE), statutory technical education bodies (such as AICTE/UGC), and implementing government councils to verify academic eligibility.
          </p>
          <p>
            Information may be disclosed under legal request to law enforcement authorities under standard judicial subpoenas or provisions of the Indian IT Act, 2000, for cyber safety and audit compliance.
          </p>
        </div>
      ),
    },
    {
      id: "security",
      title: "4. Data Protection & Security",
      content: (
        <div className="space-y-4">
          <p>
            We implement state-of-the-art security measures to protect your portal data. All dashboard communications are encrypted under Secure Sockets Layer (SSL/TLS) protocols.
          </p>
          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 my-2 text-emerald-900 text-xs sm:text-sm">
            <div className="flex items-start gap-2">
              <Eye className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Data Failsafe:</span> Login sessions use JSON Web Tokens (JWT) stored securely. Dynamic OTP verifications are expired within 3600 seconds. Audit logs are kept in read-only tables to prevent tampering.
              </div>
            </div>
          </div>
          <p>
            While we apply strict security firewalls, no electronic transmission over the internet is completely infallible. Users are advised to logout of shared terminals immediately after completing administrative dashboard tasks.
          </p>
        </div>
      ),
    },
    {
      id: "cookies",
      title: "5. Cookies & Local Storage",
      content: (
        <div className="space-y-4">
          <p>
            The NCIE India portal uses minor functional cookies and browser local storage mechanisms to sustain user session states, optimize language translations (English/Hindi toggle preferences), and preserve dashboard theme layout states.
          </p>
          <p>
            No tracking or cross-site advertisement cookies are deployed by this platform. You can configure your browser to reject cookies, though doing so might cause login failures or session disruptions.
          </p>
        </div>
      ),
    },
    {
      id: "retention",
      title: "6. Data Retention & Policy Updates",
      content: (
        <div className="space-y-4">
          <p>
            Academic data, chapter registries, and historical grant records are retained in compliance with standard national archiving policies for academic audit compliance.
          </p>
          <p>
            NCIE India reserves the right to modify this Privacy Policy at any time. Changes will take effect immediately upon their publication on this page. Authorized SPOCs will be notified of major updates through dashboard notifications.
          </p>
        </div>
      ),
    },
  ];

  const sectionsHi: Section[] = [
    {
      id: "collection",
      title: "1. सूचना जो हम एकत्र करते हैं",
      content: (
        <div className="space-y-4">
          <p>
            NCIE भारत कॉलेज नवाचार अध्यायों को संचालित करने, एसपीओसी अधिकारियों को प्रमाणित करने और तकनीकी अनुदान वितरित करने के लिए आवश्यक विशिष्ट संस्थागत और व्यक्तिगत जानकारी एकत्र करता है।
          </p>
          <p className="font-semibold text-zinc-850">हम निम्नलिखित विवरण एकत्र करते हैं:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-bold">प्रशासनिक विवरण:</span> नामित संस्था एसपीओसी और सरकारी नोडल अधिकारियों का पूरा नाम, आधिकारिक ईमेल पता, मोबाइल नंबर और पदनाम।</li>
            <li><span className="font-bold">संस्थागत डेटा:</span> AISHE कोड, कॉलेज संबद्धता की स्थिति, नवाचार क्षमता सर्वेक्षण और भौतिक/पत्राचार पते।</li>
            <li><span className="font-bold">पोर्टल लॉग:</span> इंटरनेट प्रोटोकॉल (आईपी) पते, प्रमाणीकरण टाइमस्टैम्प, ब्राउज़र एजेंट टोकन, डेटाबेस लेनदेन लॉग और ओटीपी सत्यापन रिकॉर्ड।</li>
          </ul>
        </div>
      ),
    },
    {
      id: "usage",
      title: "2. हम सूचना का उपयोग कैसे करते हैं",
      content: (
        <div className="space-y-4">
          <p>
            एकत्रित किए गए डेटा का उपयोग विशेष रूप से वैधानिक प्रशासन, योजनाओं के कार्यान्वयन और सुरक्षा ऑडिटिंग के लिए किया जाता है। हम व्यावसायिक तीसरे पक्षों को उपयोगकर्ता की जानकारी नहीं बेचते या किराए पर नहीं देते हैं।
          </p>
          <p className="font-semibold text-zinc-850">प्राथमिक उपयोग के दायरे में शामिल हैं:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>संस्थागत साख का सत्यापन और स्थानीय अध्यायों की मान्यता।</li>
            <li>छात्र छात्रवृत्ति, फेलोशिप और स्टार्टअप बीज वित्तपोषण आवेदनों का प्रसंस्करण।</li>
            <li>महत्वपूर्ण प्रशासनिक घोषणाएं, राजपत्र परिपत्र और सिस्टम अधिसूचना अलर्ट भेजना।</li>
            <li>सुरक्षा उल्लंघनों को रोकने के लिए सत्र ऑडिट और डेटाबेस लॉग सत्यापन का संचालन करना।</li>
          </ul>
        </div>
      ),
    },
    {
      id: "sharing",
      title: "3. सूचना साझा करना और प्रकटीकरण",
      content: (
        <div className="space-y-4">
          <p>
            उपयोगकर्ता और संस्थागत रिकॉर्ड केवल शिक्षा मंत्रालय (MoE), वैधानिक तकनीकी शिक्षा निकायों (जैसे एआईसीटीई/यूजीसी) और शैक्षणिक पात्रता की पुष्टि के लिए कार्यान्वयन सरकारी परिषदों के साथ साझा किए जाते हैं।
          </p>
          <p>
            साइबर सुरक्षा और ऑडिट अनुपालन के लिए भारतीय आईटी अधिनियम, 2000 के प्रावधानों के तहत कानून प्रवर्तन अधिकारियों को कानूनी अनुरोध या न्यायिक आदेश के तहत जानकारी का खुलासा किया जा सकता है।
          </p>
        </div>
      ),
    },
    {
      id: "security",
      title: "4. डेटा संरक्षण और सुरक्षा",
      content: (
        <div className="space-y-4">
          <p>
            हम आपके पोर्टल डेटा की सुरक्षा के लिए अत्याधुनिक सुरक्षा उपायों को लागू करते हैं। सभी डैशबोर्ड संचार सिक्योर सॉकेट्स लेयर (SSL/TLS) प्रोटोकॉल के तहत एन्क्रिप्टेड हैं।
          </p>
          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 my-2 text-emerald-900 text-xs sm:text-sm">
            <div className="flex items-start gap-2">
              <Eye className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">डेटा सुरक्षा:</span> लॉगिन सत्र सुरक्षित रूप से संग्रहीत JSON वेब टोकन (JWT) का उपयोग करते हैं। गतिशील ओटीपी सत्यापन 3600 सेकंड के भीतर समाप्त हो जाता है। छेड़छाड़ को रोकने के लिए ऑडिट लॉग रीड-ओनली टेबल में रखे जाते हैं।
              </div>
            </div>
          </div>
          <p>
            यद्यपि हम कड़े सुरक्षा फ़ायरवॉल लागू करते हैं, लेकिन इंटरनेट पर कोई भी इलेक्ट्रॉनिक ट्रांसमिशन पूरी तरह से त्रुटिहीन नहीं होता है। उपयोगकर्ताओं को प्रशासनिक डैशबोर्ड कार्यों को पूरा करने के तुरंत बाद साझा किए गए टर्मिनलों से लॉगआउट करने की सलाह दी जाती है।
          </p>
        </div>
      ),
    },
    {
      id: "cookies",
      title: "5. कुकीज़ और स्थानीय संग्रहण",
      content: (
        <div className="space-y-4">
          <p>
            NCIE भारत पोर्टल उपयोगकर्ता सत्र राज्यों को बनाए रखने, भाषा अनुवाद (अंग्रेजी / हिंदी टॉगल वरीयताओं) को अनुकूलित करने और डैशबोर्ड थीम लेआउट राज्यों को सुरक्षित रखने के लिए कुकीज़ और ब्राउज़र स्थानीय स्टोरेज तंत्र का उपयोग करता है।
          </p>
          <p>
            इस प्लेटफॉर्म द्वारा कोई ट्रैकिंग या विज्ञापन कुकीज़ तैनात नहीं की जाती हैं। आप कुकीज़ को अस्वीकार करने के लिए अपने ब्राउज़र को कॉन्फ़िगर कर सकते हैं, हालांकि ऐसा करने से लॉगिन विफलता या सत्र व्यवधान हो सकता है।
          </p>
        </div>
      ),
    },
    {
      id: "retention",
      title: "6. डेटा प्रतिधारण और नीति अपडेट",
      content: (
        <div className="space-y-4">
          <p>
            शैक्षणिक डेटा, अध्याय रजिस्ट्रियों और ऐतिहासिक अनुदान रिकॉर्ड को शैक्षणिक ऑडिट अनुपालन के लिए मानक राष्ट्रीय संग्रह नीतियों के अनुपालन में बनाए रखा जाता है।
          </p>
          <p>
            NCIE भारत किसी भी समय इस गोपनीयता नीति को संशोधित करने का अधिकार सुरक्षित रखता है। बदलाव इस पेज पर प्रकाशित होते ही तुरंत प्रभावी हो जाएंगे। अधिकृत एसपीओसी को डैशबोर्ड सूचनाओं के माध्यम से प्रमुख अपडेट के बारे में सूचित किया जाएगा।
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
              {language === "hi" ? "गोपनीयता नीति" : "Privacy Policy"}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight flex items-center gap-3">
            <ShieldAlert className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-300" />
            {language === "hi" ? "गोपनीयता नीति" : "Privacy Policy"}
          </h1>
          <p className="text-emerald-100/80 text-xs sm:text-sm max-w-3xl mt-3 leading-relaxed">
            {language === "hi"
              ? "राष्ट्रीय नवाचार और उद्यमिता परिषद (NCIE) भारत पोर्टल के लिए आधिकारिक गोपनीयता संरक्षण और डेटा सुरक्षा दिशानिर्देश।"
              : "Official privacy protection guidelines, information collection standards, and data safety directives governing the NCIE India portal."}
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
                  गोपनीयता नीति के बारे में किसी भी प्रश्न के लिए, कृपया हमसे{" "}
                  <Link href="/contact" className="text-primary font-bold hover:underline">
                    संपर्क पृष्ठ
                  </Link>{" "}
                  के माध्यम से संपर्क करें या office@ncieindia.org पर ईमेल करें।
                </p>
              ) : (
                <p>
                  For any queries regarding the Privacy Policy, please reach out to us via our{" "}
                  <Link href="/contact" className="text-primary font-bold hover:underline">
                    Contact Desk
                  </Link>{" "}
                  or email office@ncieindia.org.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
