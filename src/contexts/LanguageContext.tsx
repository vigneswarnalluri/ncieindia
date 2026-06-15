"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "hi";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header & Navigation
    nav_home: "Home",
    nav_about: "About",
    nav_programs: "Programs",
    nav_ecosystem: "Ecosystem",
    nav_media: "Media",
    nav_join: "Join",
    nav_contact: "Contact",
    nav_login: "Login",
    toll_free: "Our Toll Free Number",
    timings: "(10:00 AM to 05:30 PM)",
    apply_now: "Apply Now",
    register_member: "Register as Member",

    // Homepage
    home_latest_news: "Latest News",
    home_news_1: "[APPLICATIONS] Applications for National Student Incubation Cohort 2026 are now open. Closing July 31.",
    home_news_2: "[POLICY] Regional College Chapters policy guidelines document v1.2 has been released.",
    home_news_3: "[FELLOWSHIPS] Viksit Bharat Postgraduate Research Fellowships funding allocation finalized.",
    home_hero_title_1: "National Council for",
    home_hero_title_2: "Innovation",
    home_hero_title_3: "Entrepreneurship",
    home_hero_desc: "Aligning academic research with industry networks to build India's largest innovation engine. NCIE acts as a central registry and resource desk connecting student founders, college chapters, and capital partners in a single unified ecosystem.",
    home_chapter_dir: "Chapter Directory",
    home_chapter_desc: "Explore active university innovation cells and state coordinators.",
    home_search_chapters: "Search Chapters",
    home_schemes_reg: "Schemes Registry",
    home_schemes_desc: "Review active grants, seed funding programs, and corporate fellowship circulars.",
    home_view_schemes: "View Schemes",
    home_btn_apply: "Apply for Registration",
    home_btn_profile: "Read Organization Profile",
    home_footer_info: "NCIE India is the statutory apex body coordinating technical campus innovation networks.",

    // Login Page General
    login_title: "Portal Authorization",
    login_subtitle: "Authorized sign-in gateway for registered users.",
    security_warning: "Security Warning: Access is restricted. Unauthorized usage violates Section 66 of the IT Act, 2000. Session parameters are monitored.",
    role_institution: "Institution",
    role_official: "Govt Official",
    id_label_institution: "Institution ID / AISHE Code",
    id_label_official: "NIC Email / NIC Employee ID",
    id_placeholder_institution: "e.g. C-41200 or INST-9923",
    id_placeholder_official: "e.g. nic-officer@ncie.gov.in",
    password_label: "Password / Passkey",
    captcha_label: "Security Captcha",
    captcha_refresh: "Refresh",
    captcha_verify_placeholder: "Enter code",
    captcha_error: "Invalid Captcha code. Please check and retry.",
    remember_device: "Remember device",
    forgot_password: "Forgot Password?",
    signin_button: "Sign In to Portal",
    signing_in: "Signing in...",
    national_sso: "MeriPehchaan (National SSO)",
    nic_secure: "TLS 1.3 SECURE",
    back_to_portal: "Back to Portal",
    helpline_email: "support-ncie@nic.in",
    helpline_phone: "Helpdesk: 1800 123 4567",
    copyright: "© 2026 National Council for Innovation and Entrepreneurship. All Rights Reserved.",

    // Success Screen
    mfa_sent: "MFA Code Sent",
    mfa_desc: "A verification OTP code has been dispatched to your department registered credentials.",
    tx_id: "Transaction ID",
    go_back_login: "Go back to login screen",

    // About Page Redesign (MSDE Style)
    about_badge: "About NCIE India",
    about_title: "National Council for Innovation & Entrepreneurship",
    about_subtitle: "Central registry and programmatic framework under the Ministry guidelines, fostering student deep-tech research translation and institutional maker networks.",
    
    // MSDE Tabs
    tab_about: "About Us",
    tab_team: "Our Team",
    tab_orgs: "Our Organisations",
    tab_performance: "Our Performance",
    tab_directory: "Directory",

    about_intro_p1: "The National Council for Innovation and Entrepreneurship (NCIE) India is the apex coordinating body established under state framework guidelines to align all student innovation, collegiate makerspaces, and incubation cells across technical and non-technical institutions.",
    about_intro_p2: "NCIE aims to remove the disconnect between academic research outputs and commercial venture scaling, building robust prototyping sandboxes, and establishing uniform benchmarks for collegiate innovation cells.",
    
    about_vision_title: "Our Vision",
    about_vision_text: "To create a self-reliant nation powered by a high-density, centralized network of student-led deep-tech enterprises and institutional maker cells, cultivating a culture of scientific inquiry and builders.",
    about_mission_title: "Our Mission",
    about_mission_text: "To democratize access to prototype validation micro-grants, establish standardized chapter cells in STEM colleges, and link verified collegiate startups directly with industrial sponsors and accelerators.",
    
    about_objectives_title: "Key Functional Objectives",
    about_obj_1: "Standardize Chapter Certifications and validation indices across STEM colleges.",
    about_obj_2: "Disburse merit-based prototype micro-grants (up to ₹5 Lakhs) directly to student innovators.",
    about_obj_3: "Fund the deployment of CNC, 3D printing, and digital fabrication labs in tier-2/3 institutions.",
    about_obj_4: "Facilitate direct empanelment pathways with certified industry mentors and seed funds.",
    
    about_structure_title: "Organizational Framework & Attached Desks",
    about_structure_subtitle: "Key operational councils responsible for programmatic delivery and policy audits.",
    about_wing_1_name: "National Chapter Registry Cell (NCRC)",
    about_wing_1_desc: "Manages affiliation audits, annual performance evaluations, and rank indicators for collegiate cells across the country.",
    about_wing_2_name: "Prototyping Sandbox Council (PSC)",
    about_wing_2_desc: "Governs micro-grants processing, design validation checks, and maker cell deployment clearances for collegiate makerspaces.",
    about_wing_3_name: "National Incubation Liaison Board (NILB)",
    about_wing_3_desc: "Coordinates accelerator linkages, corporate CSR seed sponsors, and legal/patent filing desk channels.",

    about_downloads_title: "Official Manuals & Circulars",
    about_downloads_sub: "Verified PDF guidelines for chapters and sponsors.",
    about_manual_1: "NCIE Chapter Affiliation Manual v2.4",
    about_manual_2: "Capital Sandbox Allocation Framework",
    about_manual_3: "Intellectual Property & Patent Support Policy",

    about_query_title: "Seeking Chapter Registration?",
    about_query_sub: "Academic institutions can register under the regional network registry and access prototyping sandboxes.",
    about_query_btn: "Apply for Chapter",

    about_from_desk: "From the Coordinator's Desk",
    about_msg_para1: "NCIE India was established to bridge the gap between theoretical research inside academic institutions and technology market validation. We align resources directly with performance to convert student creativity into high-value assets.",
    about_msg_para2: "Through localized college chapters, dedicated regional Liaison Desks, and early-stage capital sandboxes, we remain committed to building a self-reliant scientific ecosystem.",
    about_sig_label: "Authorized Signatory, NCIE",

    about_roadmap_title: "Ecosystem Development Roadmap",
    about_roadmap_sub: "Chronological milestones aligning with the national innovation goals.",
    about_phase_1_title: "Phase I: Node Inception (2024-2026)",
    about_phase_1_desc: "Setting up regional coordination centers, mapping 1,000+ collegiate chapters, and launching the pre-incubation database registry.",
    about_phase_2_title: "Phase II: Deep-Tech Translation (2026-2030)",
    about_phase_2_desc: "Distributing merit-based prototype grants (up to ₹5 Lakhs) and establishing state-level CNC/3D fabrication makerspaces.",
    about_phase_3_title: "Phase III: Capital Scaling & Patents (2030-2035)",
    about_phase_3_desc: "Connecting validated student ventures with seed capital sponsors, patent filing reimbursements, and national accelerators.",

    about_liaison_title: "Regional Liaison Desks",
    about_liaison_sub: "State liaison desks responsible for chapter verification and grants audit.",
    about_zone_north: "North Zone Desk",
    about_zone_north_details: "IIT Delhi Campus, New Delhi | Liaison: liaison.north@ncie.gov.in",
    about_zone_west: "West Zone Desk",
    about_zone_west_details: "IIT Bombay Campus, Mumbai | Liaison: liaison.west@ncie.gov.in",
    about_zone_south: "South Zone Desk",
    about_zone_south_details: "IIT Madras Campus, Chennai | Liaison: liaison.south@ncie.gov.in",
    about_zone_east: "East Zone Desk",
    about_zone_east_details: "IIT Kharagpur Campus, Kharagpur | Liaison: liaison.east@ncie.gov.in",

    about_council_title: "Ecosystem Advisory Council",
    about_council_sub: "Strategic advisory board panels.",
    about_member_1_role: "National Coordinator, Institutional Cells",
    about_member_2_role: "Director of Partnerships & Corporate Desk",
    about_member_3_role: "Chief of Incubation Advisory Board",
  },
  hi: {
    // Header & Navigation
    nav_home: "मुख्य पृष्ठ",
    nav_about: "हमारे बारे में",
    nav_programs: "कार्यक्रम",
    nav_ecosystem: "पारिस्थितिकी तंत्र",
    nav_media: "मीडिया",
    nav_join: "जुड़ें",
    nav_contact: "संपर्क",
    nav_login: "लॉगिन",
    toll_free: "हमारा टोल फ्री नंबर",
    timings: "(पूर्वाहन 10:00 से अपराहन 05:30 तक)",
    apply_now: "आवेदन करें",
    register_member: "सदस्य के रूप में पंजीकरण करें",

    // Homepage
    home_latest_news: "नवीनतम समाचार",
    home_news_1: "[आवेदन] राष्ट्रीय छात्र इनक्यूबेशन कोहोर्ट 2026 के लिए आवेदन अब खुले हैं। अंतिम तिथि 31 जुलाई।",
    home_news_2: "[नीति] क्षेत्रीय कॉलेज शाखाओं के नीति दिशानिर्देश दस्तावेज़ v1.2 जारी किए गए हैं।",
    home_news_3: "[फेलोशिप] विकसित भारत स्नातकोत्तर अनुसंधान फेलोशिप वित्तपोषण आवंटन को अंतिम रूप दिया गया।",
    home_hero_title_1: "राष्ट्रीय",
    home_hero_title_2: "नवाचार",
    home_hero_title_3: "एवं उद्यमिता परिषद",
    home_hero_desc: "भारत के सबसे बड़े नवाचार इंजन के निर्माण के लिए उद्योग नेटवर्क के साथ शैक्षणिक अनुसंधान को संरेखित करना। NCIE एक केंद्रीय रजिस्ट्री और संसाधन डेस्क के रूप में कार्य करता है जो छात्र संस्थापकों, कॉलेज शाखाओं और पूंजी भागीदारों को एक एकीकृत पारिस्थितिकी तंत्र में जोड़ता है।",
    home_chapter_dir: "शाखा निर्देशिका",
    home_chapter_desc: "सक्रिय विश्वविद्यालय नवाचार सेल और राज्य समन्वयकों का पता लगाएं।",
    home_search_chapters: "शाखाएं खोजें",
    home_schemes_reg: "योजनाएं रजिस्ट्री",
    home_schemes_desc: "सक्रिय अनुदान, बीज निधि कार्यक्रम और कॉर्पोरेट फेलोशिप परिपत्रों की समीक्षा करें।",
    home_view_schemes: "योजनाएं देखें",
    home_btn_apply: "पंजीकरण के लिए आवेदन करें",
    home_btn_profile: "संगठन प्रोफ़ाइल पढ़ें",
    home_footer_info: "NCIE भारत तकनीकी परिसर नवाचार नेटवर्क का समन्वय करने वाला वैधानिक शीर्ष निकाय है।",

    // Login Page General
    login_title: "पोर्टल प्राधिकरण",
    login_subtitle: "पंजीकृत उपयोगकर्ताओं के लिए अधिकृत साइन-इन गेटवे।",
    security_warning: "सुरक्षा चेतावनी: पहुंच प्रतिबंधित है। अनधिकृत उपयोग आईटी अधिनियम, 2000 की धारा 66 का उल्लंघन है। सत्र मापदंडों की निगरानी की जाती है।",
    role_institution: "संस्थान",
    role_official: "सरकारी अधिकारी",
    id_label_institution: "संस्थान आईडी / AISHE कोड",
    id_label_official: "एनआईसी ईमेल / एनआईसी कर्मचारी आईडी",
    id_placeholder_institution: "उदा. C-41200 या INST-9923",
    id_placeholder_official: "उदा. nic-officer@ncie.gov.in",
    password_label: "पासवर्ड / पासकी",
    captcha_label: "सुरक्षा कैप्चा",
    captcha_refresh: "ताज़ा करें",
    captcha_verify_placeholder: "कोड दर्ज करें",
    captcha_error: "अमान्य कैप्चा कोड। कृपया जांचें और पुनः प्रयास करें।",
    remember_device: "डिवाइस याद रखें",
    forgot_password: "पासवर्ड भूल गए?",
    signin_button: "पोर्टल में साइन इन करें",
    signing_in: "साइन इन किया जा रहा है...",
    national_sso: "मेरी पहचान (राष्ट्रीय एसएसओ)",
    nic_secure: "TLS 1.3 सुरक्षित",
    back_to_portal: "पोर्टल पर वापस जाएं",
    helpline_email: "support-ncie@nic.in",
    helpline_phone: "हेल्पडेस्क: 1800 123 4567",
    copyright: "© 2026 राष्ट्रीय नवाचार और उद्यमिता परिषद। सर्वाधिकार सुरक्षित।",

    // Success Screen
    mfa_sent: "एमएफए कोड भेजा गया",
    mfa_desc: "एक सत्यापन ओटीपी कोड आपके विभाग पंजीकृत क्रेडेंशियल पर भेज दिया गया है।",
    tx_id: "लेन-देन आईडी",
    go_back_login: "लॉगिन स्क्रीन पर वापस जाएं",

    // About Page Redesign (MSDE Style)
    about_badge: "NCIE इंडिया के बारे में",
    about_title: "राष्ट्रीय नवाचार और उद्यमिता परिषद",
    about_subtitle: "मंत्रालय के दिशानिर्देशों के तहत केंद्रीय रजिस्ट्री और कार्यक्रम ढांचा, छात्र गहन-तकनीक अनुसंधान अनुवाद और संस्थागत निर्माता नेटवर्क को बढ़ावा देना।",
    
    // MSDE Tabs
    tab_about: "हमारे बारे में",
    tab_team: "हमारी टीम",
    tab_orgs: "हमारे संगठन",
    tab_performance: "हमारा प्रदर्शन",
    tab_directory: "निर्देशिका",

    about_intro_p1: "राष्ट्रीय नवाचार और उद्यमिता परिषद (NCIE) भारत तकनीकी और गैर-तकनीकी संस्थानों में सभी छात्र नवाचार, कॉलेज मेकर्सपेस और इनक्यूबेशन सेल को संरेखित करने के लिए स्थापित सर्वोच्च समन्वय निकाय है।",
    about_intro_p2: "NCIE का उद्देश्य शैक्षणिक अनुसंधान आउटपुट और वाणिज्यिक उद्यम स्केलिंग के बीच के अंतर को दूर करना, मजबूत प्रोटोटाइपिंग सैंडबॉक्स का निर्माण करना और कॉलेज नवाचार सेल के लिए समान मानदंड स्थापित करना है।",
    
    about_vision_title: "हमारा दृष्टिकोण",
    about_vision_text: "छात्र-नेतृत्व वाले गहन-तकनीकी उद्यमों और संस्थागत निर्माता सेल के एक उच्च-घनत्व, केंद्रीकृत नेटवर्क द्वारा संचालित एक आत्मनिर्भर राष्ट्र का निर्माण करना, और वैज्ञानिक जांच की संस्कृति विकसित करना।",
    about_mission_title: "हमारा मिशन",
    about_mission_text: "प्रोटोटाइप सत्यापन माइक्रो-अनुदान तक पहुंच का लोकतंत्रीकरण करना, एसटीईएम कॉलेजों में मानकीकृत शाखा सेल स्थापित करना, और सत्यापित कॉलेज स्टार्टअप्स को सीधे औद्योगिक प्रायोजकों और त्वरकों से जोड़ना।",
    
    about_objectives_title: "मुख्य कार्यात्मक उद्देश्य",
    about_obj_1: "एसटीईएम कॉलेजों में शाखा प्रमाणन और सत्यापन सूचकांकों को मानकीकृत करना।",
    about_obj_2: "छात्र नवाचारों को सीधे योग्यता-आधारित प्रोटोटाइप माइक्रो-अनुदान (₹5 लाख तक) वितरित करना।",
    about_obj_3: "टियर-2/3 संस्थानों में सीएनसी, 3डी प्रिंटिंग और डिजिटल फैब्रिकेशन लैब की तैनाती को वित्तपोषित करना।",
    about_obj_4: "सत्यापित उद्योग सलाहकारों और बीज कोषों के साथ सीधे सूचीबद्ध करने के रास्तों को सुगम बनाना।",
    
    about_structure_title: "संगठनात्मक ढांचा और संबद्ध डेस्क",
    about_structure_subtitle: "कार्यक्रम वितरण और नीति ऑडिट के लिए जिम्मेदार मुख्य परिचालन परिषदें।",
    about_wing_1_name: "राष्ट्रीय शाखा रजिस्ट्री सेल (NCRC)",
    about_wing_1_desc: "देश भर में कॉलेज सेल के लिए संबद्धता ऑडिट, वार्षिक प्रदर्शन मूल्यांकन और रैंक संकेतकों का प्रबंधन करता है।",
    about_wing_2_name: "प्रोटोटाइपिंग सैंडबॉक्स काउंसिल (PSC)",
    about_wing_2_desc: "कॉलेज मेकर्सपेस के लिए माइक्रो-अनुदान प्रसंस्करण, डिजाइन सत्यापन जांच और निर्माता सेल तैनाती मंजूरी को नियंत्रित करता है।",
    about_wing_3_name: "राष्ट्रीय ऊष्मायन संपर्क बोर्ड (NILB)",
    about_wing_3_desc: "त्वरक संबंधों, कॉर्पोरेट सीएसआर बीज प्रायोजकों और कानूनी/पेटेंट फाइलिंग डेस्क चैनलों का समन्वय करता है।",

    about_downloads_title: "आधिकारिक नियमावली और परिपत्र",
    about_downloads_sub: "शाखाओं और प्रायोजकों के लिए सत्यापित पीडीएफ दिशानिर्देश।",
    about_manual_1: "एनसीआईई शाखा संबद्धता नियमावली v2.4",
    about_manual_2: "कैपिटल सैंडबॉक्स आवंटन ढांचा",
    about_manual_3: "बौद्धिक संपदा और पेटेंट सहायता नीति",

    about_query_title: "शाखा पंजीकरण की तलाश है?",
    about_query_sub: "अकादमिक संस्थान क्षेत्रीय नेटवर्क रजिस्ट्री के तहत पंजीकरण कर सकते हैं और प्रोटोटाइपिंग सैंडबॉक्स का उपयोग कर सकते हैं।",
    about_query_btn: "शाखा के लिए आवेदन करें",

    about_from_desk: "समन्वयक के डेस्क से",
    about_msg_para1: "NCIE इंडिया की स्थापना शैक्षणिक संस्थानों के भीतर सैद्धांतिक अनुसंधान और तकनीक बाजार सत्यापन के बीच की खाई को पाटने के लिए की गई थी। हम छात्र की रचनात्मकता को उच्च-मूल्य वाले बौद्धिक संपदा में बदलने के लिए संसाधनों को सीधे प्रदर्शन के साथ संरेखित करते हैं।",
    about_msg_para2: "स्थानीयकृत कॉलेज शाखाओं, समर्पित क्षेत्रीय संपर्क डेस्क और प्रारंभिक चरण के पूंजी सैंडबॉक्स के माध्यम से, हम एक आत्मनिर्भर वैज्ञानिक पारिस्थितिकी तंत्र के निर्माण के लिए प्रतिबद्ध हैं।",
    about_sig_label: "अधिकृत हस्ताक्षरकर्ता, एनसीआईई",

    about_roadmap_title: "पारिस्थितिकी तंत्र विकास रोडमैप",
    about_roadmap_sub: "राष्ट्रीय नवाचार लक्ष्यों के साथ तालमेल बिठाते हुए कालानुक्रमिक मील के पत्थर।",
    about_phase_1_title: "चरण I: नोड स्थापना (2024-2026)",
    about_phase_1_desc: "क्षेत्रीय समन्वय केंद्र स्थापित करना, 1,000+ कॉलेज शाखाओं का मानचित्रण करना, और पूर्व-इनक्यूबेशन डेटाबेस रजिस्ट्री शुरू करना।",
    about_phase_2_title: "चरण II: डीप-टेक अनुवाद (2026-2030)",
    about_phase_2_desc: "योग्यता-आधारित प्रोटोटाइप अनुदान (₹5 लाख तक) वितरित करना और राज्य स्तर पर सीएनसी/3डी निर्माण मेकर्सपेस स्थापित करना।",
    about_phase_3_title: "चरण III: पूंजी स्केलिंग और पेटेंट (2030-2035)",
    about_phase_3_desc: "सत्यापित छात्र उद्यमों को बीज पूंजी प्रायोजकों, पेटेंट फाइलिंग प्रतिपूर्ति और राष्ट्रीय त्वरकों के साथ जोड़ना।",

    about_liaison_title: "क्षेत्रीय संपर्क डेस्क",
    about_liaison_sub: "शाखा सत्यापन और अनुदान लेखा परीक्षा के लिए जिम्मेदार राज्य संपर्क डेस्क।",
    about_zone_north: "उत्तर क्षेत्र डेस्क",
    about_zone_north_details: "आईआईटी दिल्ली परिसर, नई दिल्ली | संपर्क: liaison.north@ncie.gov.in",
    about_zone_west: "पश्चिम क्षेत्र डेस्क",
    about_zone_west_details: "आईआईटी बॉम्बे परिसर, मुंबई | संपर्क: liaison.west@ncie.gov.in",
    about_zone_south: "दक्षिण क्षेत्र डेस्क",
    about_zone_south_details: "आईआईटी मद्रास परिसर, चेन्नई | संपर्क: liaison.south@ncie.gov.in",
    about_zone_east: "पूर्व क्षेत्र डेस्क",
    about_zone_east_details: "आईआईटी खड़गपुर परिसर, खड़गपुर | संपर्क: liaison.east@ncie.gov.in",

    about_council_title: "पारिस्थितिकी तंत्र सलाहकार परिषद",
    about_council_sub: "रणनीतिक सलाहकार बोर्ड पैनल।",
    about_member_1_role: "राष्ट्रीय समन्वयक, संस्थागत सेल",
    about_member_2_role: "साझेदारी और कॉर्पोरेट डेस्क निदेशक",
    about_member_3_role: "इनक्यूबेशन सलाहकार बोर्ड प्रमुख",
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("ncie_lang") as Language;
    if (savedLang === "en" || savedLang === "hi") {
      setLanguageState(savedLang);
      document.documentElement.lang = savedLang;
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("ncie_lang", lang);
    document.documentElement.lang = lang;
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations["en"]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
