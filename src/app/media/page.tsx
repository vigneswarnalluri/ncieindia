"use client";

import React, { useState } from "react";
import { 
  Calendar, 
  FileText, 
  Image as ImageIcon, 
  Search, 
  Download, 
  Mail, 
  Phone, 
  MapPin, 
  SlidersHorizontal,
  ChevronRight,
  Info,
  ExternalLink,
  ShieldCheck,
  Building
} from "lucide-react";
import Link from "next/link";

const MEDIA_ANNOUNCEMENTS = [
  {
    refNo: "NCIE/DIR/2026/084",
    date: "June 12, 2026",
    title: "Applications Open: NCIE National Incubation Cohort 2026 Selection",
    category: "Cohort Guidelines",
    division: "Incubation & Mentorship Division",
    desc: "Applications are officially open for collegiate tech start-ups and university-nominated research groups. Selected cohorts will receive seed-stage prototype validation grants, dedicated lab facilities, and industrial mentor matching.",
    fileSize: "PDF (1.2 MB)"
  },
  {
    refNo: "NCIE/POL/2026/042",
    date: "June 08, 2026",
    title: "Release of NCIE Regional College Chapters Accreditation Policy Framework",
    category: "Policy Bulletin",
    division: "Academic Affiliation Wing",
    desc: "Official framework outlining standard operating protocols, IP licensing agreements, patent split models, and laboratory access schemas for accredited technical institutions across India.",
    fileSize: "PDF (2.4 MB)"
  },
  {
    refNo: "NCIE/FEL/2026/019",
    date: "May 29, 2026",
    title: "Declaration of India-Centenary Fellowship Scheme (Phase 1) Final Selection List",
    category: "Fellowship Results",
    division: "Research & Development Wing",
    desc: "Official listing of the initial 50 postgraduate research scholars selected to receive stipends, procurement allowances, and advanced equipment grants for deep-tech research translation.",
    fileSize: "PDF (940 KB)"
  },
  {
    refNo: "NCIE/CIR/2026/011",
    date: "May 10, 2026",
    title: "State-Wise Nodal Officers Directory for Local Campus Makerspace Support Desk",
    category: "Official Circular",
    division: "Administration Wing",
    desc: "Directory of designated regional state nodal officers responsible for coordinating local campus makerspace grants, audit approvals, and campus registration help desks.",
    fileSize: "PDF (810 KB)"
  }
];

const PRESS_RELEASES = [
  {
    refNo: "NCIE-PR-2026-104",
    date: "May 15, 2026",
    title: "NCIE Announces Nationwide Rollout of 'Viksit Bharat' Chapter Initiative",
    source: "PIB Delhi Desk",
    desc: "A collective initiative aimed at establishing 1,000+ technical college chapters by the end of 2027 to align raw student projects with angel mentorship and venture funding avenues. The program was inaugurated by the Union Ministry representatives.",
    dateline: "New Delhi"
  },
  {
    refNo: "NCIE-PR-2026-092",
    date: "April 20, 2026",
    title: "NCIE Signs Incubation Liaison Treaty with Leading National Technology Parks",
    source: "Bangalore Press Bureau",
    desc: "Strategic integration allowing accredited NCIE student founders direct, hassle-free physical entry and lab access inside tech parks across five key cities, reducing incubation overheads.",
    dateline: "Bengaluru"
  }
];

const GALLERY_PHOTOS = [
  {
    title: "Regional Ideation Summit 2026",
    location: "IISc, Bengaluru",
    date: "April 2026",
    ratio: "aspect-video",
    gradient: "from-[#0D6B4F]/15 to-[#C9A24B]/15"
  },
  {
    title: "NCIE Founders Roundtable Meeting",
    location: "Vigyan Bhawan, New Delhi",
    date: "May 2026",
    ratio: "aspect-video",
    gradient: "from-[#074733]/25 to-[#C9A24B]/10"
  },
  {
    title: "Makerspace Prototype Showcase",
    location: "IIT Bombay Chapter",
    date: "March 2026",
    ratio: "aspect-video",
    gradient: "from-[#0D6B4F]/10 to-[#A68034]/20"
  },
  {
    title: "IP Strategy and Patent Filing Workshop",
    location: "JNTU, Hyderabad",
    date: "June 2026",
    ratio: "aspect-video",
    gradient: "from-[#042B1F]/30 to-[#E6C57A]/15"
  }
];

export default function MediaPage() {
  const [activeTab, setActiveTab] = useState<"announcements" | "press" | "gallery">("announcements");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter Logic
  const filteredAnnouncements = MEDIA_ANNOUNCEMENTS.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.refNo.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const filteredPress = PRESS_RELEASES.filter((item) => {
    return item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
           item.refNo.toLowerCase().includes(searchQuery.toLowerCase()) || 
           item.desc.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const filteredGallery = GALLERY_PHOTOS.filter((photo) => {
    return photo.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
           photo.location.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const categories = ["All", ...Array.from(new Set(MEDIA_ANNOUNCEMENTS.map(item => item.category)))];

  return (
    <div className="flex-1 bg-[#F8FAFC] pb-20 border-t border-zinc-200">
      
      {/* Official Government Bilingual Banner Header */}
      <div className="relative bg-gradient-to-r from-[#074733] via-[#0D6B4F] to-[#053d2e] text-white border-b-4 border-[#C9A24B] py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Grid Pattern & Orbs */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:30px_30px]" />
        <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-accent-light/5 blur-[100px] rounded-full" />
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 relative z-10">
          <div className="space-y-3.5">
            <div className="flex items-center gap-2 text-xs md:text-sm font-semibold uppercase tracking-wider text-accent-light">
              <span className="bg-[#C9A24B]/15 border border-[#C9A24B]/30 px-2 py-0.5 rounded shadow-sm text-accent-light">
                Official Press Desk
              </span>
              <span>/</span>
              <span className="text-zinc-200">Government statutory Information Portal</span>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm font-bold tracking-wide text-zinc-350 font-serif">राष्ट्रीय नवाचार और उद्यमिता परिषद</p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight uppercase">
                Media Center & Communiques
              </h1>
            </div>
            
            <p className="text-xs sm:text-sm text-zinc-300 max-w-3xl leading-relaxed">
              Central clearinghouse for gazette notifications, operational directives, institutional circulars, and official photographic archives for technical campus innovation cells.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Nodal Stats Counter Block */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-zinc-200 p-4 rounded shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-50 text-primary flex items-center justify-center rounded border border-emerald-100">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-zinc-400">Total Gazettes</p>
              <p className="text-base font-extrabold text-zinc-800">124 Circulars</p>
            </div>
          </div>
          <div className="bg-white border border-zinc-200 p-4 rounded shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 text-blue-700 flex items-center justify-center rounded border border-blue-100">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-zinc-400">Press Releases</p>
              <p className="text-base font-extrabold text-zinc-800">38 Communiques</p>
            </div>
          </div>
          <div className="bg-white border border-zinc-200 p-4 rounded shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-50 text-[#A68034] flex items-center justify-center rounded border border-amber-100">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-zinc-400">Liaison Desk</p>
              <p className="text-base font-extrabold text-zinc-800">24/7 PRO Access</p>
            </div>
          </div>
          <div className="bg-white border border-zinc-200 p-4 rounded shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 text-purple-700 flex items-center justify-center rounded border border-purple-100">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-zinc-400">Accreditation</p>
              <p className="text-base font-extrabold text-zinc-800">PIB Desk Registry</p>
            </div>
          </div>
        </div>

        {/* Layout Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left / Center: Interactive Data Panel */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Search & Filter Controls */}
            <div className="bg-white border border-zinc-200 rounded shadow-sm p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:max-w-md">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search bulletins by subject, Ref No, or details..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-zinc-300 rounded text-xs bg-zinc-50/50 focus:outline-none focus:border-primary focus:bg-white"
                />
              </div>

              {activeTab === "announcements" && (
                <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="text-xs text-zinc-500 font-medium">Category:</span>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border border-zinc-300 rounded px-2.5 py-1.5 text-xs bg-zinc-50/50 cursor-pointer focus:outline-none focus:border-primary"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Structured Tab Header */}
            <div className="border-b border-zinc-200 flex items-center justify-between">
              <div className="flex gap-1">
                <button
                  onClick={() => { setActiveTab("announcements"); setSearchQuery(""); }}
                  className={`px-4 py-3 text-xs font-extrabold uppercase tracking-wide border-b-2 transition-all cursor-pointer ${
                    activeTab === "announcements"
                      ? "border-primary text-primary"
                      : "border-transparent text-zinc-500 hover:text-zinc-800"
                  }`}
                >
                  Announcements & Circulars
                </button>
                <button
                  onClick={() => { setActiveTab("press"); setSearchQuery(""); }}
                  className={`px-4 py-3 text-xs font-extrabold uppercase tracking-wide border-b-2 transition-all cursor-pointer ${
                    activeTab === "press"
                      ? "border-primary text-primary"
                      : "border-transparent text-zinc-500 hover:text-zinc-800"
                  }`}
                >
                  Press Releases
                </button>
                <button
                  onClick={() => { setActiveTab("gallery"); setSearchQuery(""); }}
                  className={`px-4 py-3 text-xs font-extrabold uppercase tracking-wide border-b-2 transition-all cursor-pointer ${
                    activeTab === "gallery"
                      ? "border-primary text-primary"
                      : "border-transparent text-zinc-500 hover:text-zinc-800"
                  }`}
                >
                  Photo Archives
                </button>
              </div>
              <span className="text-[10px] text-zinc-400 font-bold uppercase select-none pr-2 hidden sm:inline">
                {activeTab === "announcements" ? `${filteredAnnouncements.length} Gazettes` : activeTab === "press" ? `${filteredPress.length} Releases` : `${filteredGallery.length} Files`}
              </span>
            </div>

            {/* TAB CONTENTS */}
            
            {/* 1. Announcements & Circulars */}
            {activeTab === "announcements" && (
              <div className="space-y-4">
                {filteredAnnouncements.length > 0 ? (
                  filteredAnnouncements.map((item) => (
                    <div
                      key={item.refNo}
                      className="bg-white border border-zinc-200 rounded shadow-sm hover:border-[#0D6B4F]/35 transition-all duration-200 overflow-hidden flex flex-col md:flex-row"
                    >
                      {/* Left side metadata identifier */}
                      <div className="md:w-56 bg-zinc-50/70 border-b md:border-b-0 md:border-r border-zinc-150 p-5 shrink-0 flex flex-row md:flex-col justify-between md:justify-start gap-4">
                        <div>
                          <span className="text-[9px] font-bold text-accent-dark tracking-wider uppercase font-mono block mb-1">Gazette Ref No.</span>
                          <code className="text-xs font-mono font-bold text-[#0D6B4F] bg-emerald-50/50 border border-emerald-100 px-2 py-0.5 rounded">
                            {item.refNo}
                          </code>
                        </div>
                        <div>
                          <span className="text-[9px] font-bold text-zinc-400 tracking-wider uppercase block mb-1">Issue Date</span>
                          <span className="text-xs text-zinc-600 font-semibold flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                            {item.date}
                          </span>
                        </div>
                      </div>

                      {/* Content block */}
                      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-bold text-primary border border-primary/20 bg-emerald-50/30 px-2 py-0.5 rounded uppercase tracking-wider">
                              {item.category}
                            </span>
                            <span className="text-zinc-200">|</span>
                            <span className="text-[10px] text-zinc-450 font-bold uppercase">{item.division}</span>
                          </div>
                          
                          <h3 className="text-sm sm:text-base font-bold text-zinc-800 leading-snug">
                            {item.title}
                          </h3>
                          
                          <p className="text-xs text-zinc-500 leading-relaxed text-justify">
                            {item.desc}
                          </p>
                        </div>

                        {/* Actions line */}
                        <div className="border-t border-zinc-100 pt-3 flex items-center justify-between">
                          <span className="text-[10px] text-zinc-400 font-semibold flex items-center gap-1">
                            <Info className="w-3.5 h-3.5 text-zinc-400" />
                            Status: <span className="text-emerald-700 font-bold">Active Gazette</span>
                          </span>
                          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0D6B4F] hover:bg-[#074733] text-white text-[10px] font-bold uppercase tracking-wider rounded transition-colors shadow-sm cursor-pointer">
                            <Download className="w-3 h-3" />
                            <span>{item.fileSize}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-white border border-zinc-200 rounded text-center py-12 px-4">
                    <p className="text-sm text-zinc-500">No official gazettes or circulars matched your search query.</p>
                  </div>
                )}
              </div>
            )}

            {/* 2. Press Releases */}
            {activeTab === "press" && (
              <div className="space-y-4">
                {filteredPress.length > 0 ? (
                  filteredPress.map((item) => (
                    <div
                      key={item.refNo}
                      className="bg-white border border-zinc-200 rounded shadow-sm hover:border-[#0D6B4F]/35 transition-all duration-200 p-6 space-y-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-100 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-bold text-[#0D6B4F] bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded font-mono uppercase">
                            Press Communique
                          </span>
                          <span className="text-zinc-200">|</span>
                          <span className="text-[10px] text-zinc-400 font-bold uppercase font-mono">{item.refNo}</span>
                        </div>
                        <span className="text-xs text-zinc-500 font-semibold flex items-center gap-1">
                          <FileText className="w-3.5 h-3.5 text-zinc-400" />
                          {item.source}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-base font-extrabold text-zinc-800 leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-xs text-zinc-500 leading-relaxed text-justify">
                          <span className="font-bold text-zinc-700 uppercase pr-1">{item.dateline}, {item.date.split(",")[0]}:</span>
                          {item.desc}
                        </p>
                      </div>

                      <div className="pt-2 flex items-center justify-between text-[10px] text-zinc-400 font-bold border-t border-zinc-50">
                        <span>Released via PIB Nodal Network</span>
                        <a href="#" className="text-primary hover:underline flex items-center gap-1.5">
                          <span>View Official Archive</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-white border border-zinc-200 rounded text-center py-12 px-4">
                    <p className="text-sm text-zinc-500">No press releases matched your search query.</p>
                  </div>
                )}
              </div>
            )}

            {/* 3. Photo Archives (Gallery) */}
            {activeTab === "gallery" && (
              <div>
                {filteredGallery.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredGallery.map((photo) => (
                      <div
                        key={photo.title}
                        className="bg-white rounded border border-zinc-200 overflow-hidden shadow-sm group hover:border-[#0D6B4F]/35 transition-all duration-300 flex flex-col justify-between"
                      >
                        {/* Premium Digital Grid Pattern Representing Gallery Visual Placeholder */}
                        <div className={`relative w-full ${photo.ratio} bg-gradient-to-br ${photo.gradient} flex items-center justify-center shrink-0`}>
                          {/* Saffron & Green diagonal accent light sweeps */}
                          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:20px_20px]" />
                          <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 text-white text-[9px] uppercase font-bold tracking-wider backdrop-blur-sm">
                            {photo.date}
                          </div>
                          
                          <div className="w-12 h-12 bg-white/90 shadow rounded-full flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-[#0D6B4F] group-hover:text-white transition-all duration-300">
                            <ImageIcon className="w-5 h-5 transition-transform duration-300" />
                          </div>
                        </div>
                        
                        <div className="p-4 bg-white border-t border-zinc-100 space-y-1">
                          <h4 className="text-xs sm:text-sm font-extrabold text-zinc-800 leading-snug">{photo.title}</h4>
                          <span className="text-[10px] text-zinc-400 font-semibold flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                            {photo.location}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white border border-zinc-200 rounded text-center py-12 px-4">
                    <p className="text-sm text-zinc-500">No archive folders matched your search query.</p>
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Right Column: Government PR Liaison Desk Details */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Press Liaison Office Details */}
            <div className="bg-white border border-zinc-200 rounded shadow-sm overflow-hidden">
              <div className="bg-gradient-to-br from-[#063b2c] to-[#0D6B4F] text-white p-5 border-b-2 border-[#C9A24B]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-accent-light">Media Relations</h4>
                <h2 className="text-sm sm:text-base font-extrabold uppercase mt-1">Press Liaison Office</h2>
              </div>
              
              <div className="p-5 space-y-5">
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Designated Public Relations and Information Desk coordinating announcements and regional accreditation queries for accredited journalists.
                </p>

                <div className="space-y-3.5">
                  <div className="flex gap-3">
                    <Building className="w-4.5 h-4.5 text-[#0D6B4F] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[9px] font-bold text-zinc-400 uppercase">Office Address</p>
                      <p className="text-xs text-zinc-700 font-medium leading-relaxed mt-0.5">
                        NCIE Secretariat (Press Wing),<br />
                        Nodal Office Complex, New Delhi, India
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Mail className="w-4.5 h-4.5 text-[#0D6B4F] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[9px] font-bold text-zinc-400 uppercase">PRO Email Desk</p>
                      <a href="mailto:press@ncie.org.in" className="text-xs text-primary font-bold hover:underline block mt-0.5">
                        press@ncie.org.in
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Phone className="w-4.5 h-4.5 text-[#0D6B4F] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[9px] font-bold text-zinc-400 uppercase">Media Helpline</p>
                      <p className="text-xs text-zinc-700 font-bold mt-0.5">
                        +91 (11) 2345-6780
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-150">
                  <button className="w-full bg-[#111827] hover:bg-black text-white text-[10px] font-bold uppercase tracking-wider py-2 rounded shadow-sm text-center transition-colors cursor-pointer">
                    Apply for Press Accreditation
                  </button>
                </div>
              </div>
            </div>

            {/* Official Downloads Guidelines Reference */}
            <div className="bg-white border border-zinc-200 rounded shadow-sm p-5 space-y-4">
              <div className="flex items-center gap-2 text-primary font-extrabold uppercase text-[10px] tracking-wider">
                <Info className="w-4.5 h-4.5 text-accent-dark" />
                <span>Notice to Journalists</span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">
                All circulars, fellowship results tables, and policy publications hosted on this desk are verified statutory communiques. Reprint and reproduction under official citation are permitted.
              </p>
              <div className="pt-2">
                <Link href="/about" className="inline-flex items-center gap-1 text-[10px] font-bold text-[#0D6B4F] hover:underline uppercase">
                  <span>View Council Charter</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
