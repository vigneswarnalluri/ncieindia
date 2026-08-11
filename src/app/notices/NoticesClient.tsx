"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  FileText,
  Download,
  ExternalLink,
  Eye,
  Calendar,
  Building2,
  Sparkles,
  Filter,
  X,
  ChevronRight,
  ChevronDown,
  ShieldAlert,
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { NOTICES_DATA, NoticeItem } from "@/data/noticesData";
import { ORDERS_DATA, OrderItem } from "@/data/ordersData";

const NOTICES_CATEGORIES = [
  "All",
  "Applications",
  "Recruitment",
  "Fellowships",
  "Policy Docs",
  "Events",
  "Public Announcements",
];

const ORDERS_CATEGORIES = [
  "All",
  "Office Memorandums",
  "Executive Orders",
  "Policy Directives",
  "Institutional Guidelines",
];

export default function NoticesClient() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();

  // Main tabs: notices or orders
  const [activeMainTab, setActiveMainTab] = useState<"notices" | "orders">("notices");

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNoticeCategory, setSelectedNoticeCategory] = useState("All");
  const [selectedOrderCategory, setSelectedOrderCategory] = useState("All");
  const [selectedOrderYear, setSelectedOrderYear] = useState("All");

  // Modals
  const [activeModalNotice, setActiveModalNotice] = useState<NoticeItem | null>(null);
  const [activeModalOrder, setActiveModalOrder] = useState<OrderItem | null>(null);

  // Sync tab and modal from search query parameters
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "orders") {
      setActiveMainTab("orders");
    } else if (tabParam === "notices") {
      setActiveMainTab("notices");
    }

    const idParam = searchParams.get("id");
    if (idParam) {
      // Find in notices
      const foundNotice = NOTICES_DATA.find(
        (n) => n.id.toLowerCase() === idParam.toLowerCase() || n.noticeNo.toLowerCase() === idParam.toLowerCase()
      );
      if (foundNotice) {
        setActiveModalNotice(foundNotice);
        setActiveMainTab("notices");
        return;
      }

      // Find in orders
      const foundOrder = ORDERS_DATA.find(
        (o) => o.id.toLowerCase() === idParam.toLowerCase() || o.orderNo.toLowerCase() === idParam.toLowerCase()
      );
      if (foundOrder) {
        setActiveModalOrder(foundOrder);
        setActiveMainTab("orders");
        return;
      }
    }
  }, [searchParams]);

  // Lock body scroll when modals are active
  useEffect(() => {
    if (activeModalNotice || activeModalOrder) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeModalNotice, activeModalOrder]);

  // Filter notices based on search & category
  const filteredNotices = useMemo(() => {
    return NOTICES_DATA.filter((notice) => {
      const matchesCategory =
        selectedNoticeCategory === "All" || notice.category === selectedNoticeCategory;
      const matchesQuery =
        searchQuery.trim() === "" ||
        notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notice.noticeNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notice.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (notice.tags && notice.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, selectedNoticeCategory]);

  // Filter orders based on search, category & year
  const filteredOrders = useMemo(() => {
    return ORDERS_DATA.filter((order) => {
      const matchesCategory =
        selectedOrderCategory === "All" || order.category === selectedOrderCategory;
      const matchesYear =
        selectedOrderYear === "All" || order.date.includes(selectedOrderYear);
      const matchesQuery =
        searchQuery.trim() === "" ||
        order.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.orderNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.signedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (order.tags && order.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())));

      return matchesCategory && matchesYear && matchesQuery;
    });
  }, [searchQuery, selectedOrderCategory, selectedOrderYear]);

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-zinc-900 font-sans pb-16">
      
      {/* Official Top Banner */}
      <section className="relative overflow-hidden bg-white pt-10 pb-8 border-b border-zinc-200">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-[11px] text-zinc-500 font-bold uppercase tracking-wider mb-5">
            <Link href="/" className="hover:text-[#0D6B4F] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-zinc-400" />
            <span className="text-zinc-800">
              {activeMainTab === "notices" ? "Notice Board" : "Executive Gazette"}
            </span>
          </nav>

          <div className="max-w-4xl">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900">
              Official Document & Bulletin Repository
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-zinc-500 leading-relaxed">
              Centralized registry for public notices, circular notifications, office memorandums (OMs), policy directives, and institutional guidelines of the National Council for Innovation & Entrepreneurship (NCIE) India.
            </p>
          </div>
        </div>
      </section>

      {/* Main Registry Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Navigation Tabs */}
        <div className="flex border-b border-zinc-200 bg-white px-1 sm:px-2 pt-2 border-t border-x rounded-t-xl overflow-x-auto scrollbar-none">
          <button
            onClick={() => {
              setActiveMainTab("notices");
              setSearchQuery("");
            }}
            className={`py-3 px-3 sm:px-6 text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0 whitespace-nowrap ${
              activeMainTab === "notices"
                ? "border-[#0D6B4F] text-[#0D6B4F]"
                : "border-transparent text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50/50 rounded-t-none"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>Public Notices & Circulars</span>
          </button>
          <button
            onClick={() => {
              setActiveMainTab("orders");
              setSearchQuery("");
            }}
            className={`py-3 px-3 sm:px-6 text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0 whitespace-nowrap ${
              activeMainTab === "orders"
                ? "border-[#A68034] text-[#A68034]"
                : "border-transparent text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50/50 rounded-t-none"
            }`}
          >
            <FileText className="w-3.5 h-3.5 shrink-0" />
            <span>Official Orders & Directives</span>
          </button>
        </div>

        {/* Filters Section (Attached directly under the tabs) */}
        <div className="bg-white border-x border-b border-zinc-200 p-5 rounded-b-xl shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-4">
            
            {/* Search Input Box */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  activeMainTab === "notices"
                    ? t("notices_search_placeholder")
                    : t("orders_search_placeholder")
                }
                className={`w-full bg-zinc-50 border border-zinc-200 rounded-lg pl-10 pr-10 py-2.5 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:bg-white focus:ring-1 transition-all font-sans ${
                  activeMainTab === "notices" ? "focus:border-[#0D6B4F] focus:ring-[#0D6B4F]" : "focus:border-[#A68034] focus:ring-[#A68034]"
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-950 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Enhanced Year Selector Filter (Orders only) */}
            {activeMainTab === "orders" && (
              <div className="w-full md:w-auto shrink-0 flex items-center space-x-2">
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider hidden sm:inline whitespace-nowrap">
                  Filter Year:
                </span>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 pointer-events-none" />
                  <select
                    value={selectedOrderYear}
                    onChange={(e) => setSelectedOrderYear(e.target.value)}
                    className="w-full md:w-auto bg-zinc-50 border border-zinc-200 rounded-lg pl-9 pr-8 py-2.5 text-xs text-zinc-800 focus:outline-none focus:bg-white focus:border-[#A68034] focus:ring-1 focus:ring-[#A68034] transition-all font-mono font-semibold cursor-pointer appearance-none"
                  >
                    <option value="All">All Years</option>
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500 pointer-events-none" />
                </div>
              </div>
            )}
          </div>

          {/* Categories Tab Bar */}
          <div className="flex items-center space-x-2 overflow-x-auto pt-4 pb-1.5 border-t border-zinc-150 mt-4 scrollbar-none overflow-y-visible">
            <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-bold uppercase tracking-wider shrink-0 mr-2 select-none">
              <Filter className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span>Filter:</span>
            </div>
            {activeMainTab === "notices"
              ? NOTICES_CATEGORIES.map((category) => {
                  const isActive = selectedNoticeCategory === category;
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedNoticeCategory(category)}
                      className={`px-3 py-1 rounded-none text-[10px] font-bold uppercase tracking-wide whitespace-nowrap shrink-0 transition-all cursor-pointer border ${
                        isActive
                          ? "bg-[#0D6B4F] text-white border-transparent shadow-sm"
                          : "bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-100 hover:text-zinc-900"
                      }`}
                    >
                      {category === "All" ? t("notices_tab_all") : category}
                    </button>
                  );
                })
              : ORDERS_CATEGORIES.map((cat) => {
                  const isActive = selectedOrderCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedOrderCategory(cat)}
                      className={`px-3 py-1 rounded-none text-[10px] font-bold uppercase tracking-wide whitespace-nowrap shrink-0 transition-all cursor-pointer border ${
                        isActive
                          ? "bg-[#A68034] text-white border-transparent shadow-sm"
                          : "bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-100 hover:text-zinc-900"
                      }`}
                    >
                      {cat === "All" ? t("orders_tab_all") : cat}
                    </button>
                  );
                })}
          </div>
        </div>

        {/* Directory Listings Table Container */}
        <div className="mt-8">
          
          <div className="flex items-center justify-between mb-4">
            <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider font-mono">
              Directory Records Found: <span className={activeMainTab === "notices" ? "text-[#0D6B4F]" : "text-[#A68034]"}>
                {activeMainTab === "notices" ? filteredNotices.length : filteredOrders.length}
              </span>
            </div>
            {((activeMainTab === "notices" && selectedNoticeCategory !== "All") || 
              (activeMainTab === "orders" && (selectedOrderCategory !== "All" || selectedOrderYear !== "All"))) && (
              <button
                onClick={() => {
                  setSelectedNoticeCategory("All");
                  setSelectedOrderCategory("All");
                  setSelectedOrderYear("All");
                }}
                className={`text-[10px] font-bold uppercase tracking-wider hover:underline flex items-center gap-1 cursor-pointer ${
                  activeMainTab === "notices" ? "text-[#0D6B4F]" : "text-[#A68034]"
                }`}
              >
                Reset active filters
              </button>
            )}
          </div>

          {/* Combined Data Table View */}
          {activeMainTab === "notices" ? (
            /* Notices Directory Table */
            filteredNotices.length === 0 ? (
              <div className="bg-white border border-zinc-200 rounded-xl p-12 text-center shadow-sm">
                <ShieldAlert className="w-10 h-10 text-zinc-400 mx-auto mb-3 animate-pulse" />
                <h3 className="text-sm font-bold text-zinc-800 uppercase tracking-wide">No circulars match current filters</h3>
                <p className="text-[11px] text-zinc-500 mt-1 font-sans">Try modifying your query or resetting the category tabs.</p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedNoticeCategory("All");
                  }}
                  className="mt-4 inline-flex items-center px-4 py-2 rounded-none bg-[#0D6B4F] hover:bg-[#074733] text-white text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                {/* Desktop Table View */}
                <div className="hidden md:block bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                      <thead>
                        <tr className="bg-zinc-50 border-b border-zinc-200 text-[10px] font-bold uppercase tracking-wider text-zinc-700">
                          <th className="px-4 py-3 border-r border-zinc-200 w-16 text-center">S.No.</th>
                          <th className="px-5 py-3 border-r border-zinc-200 w-44">Notice ID & Date</th>
                          <th className="px-6 py-3 border-r border-zinc-200">Notice Description / Subject</th>
                          <th className="px-5 py-3 border-r border-zinc-200 w-56">Issuing Office</th>
                          <th className="px-4 py-3 w-36 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200 text-xs">
                        {filteredNotices.map((notice, idx) => (
                          <tr key={notice.id} className="hover:bg-zinc-50/50 odd:bg-white even:bg-zinc-50/10 transition-colors">
                            {/* S.No */}
                            <td className="px-4 py-4 text-center font-mono font-bold text-zinc-400 border-r border-zinc-200">
                              {String(idx + 1).padStart(2, "0")}
                            </td>
                            {/* Notice ID & Date */}
                            <td className="px-5 py-4 border-r border-zinc-200 font-mono">
                              <div className="font-bold text-zinc-900 text-[11px]">{notice.noticeNo}</div>
                              <div className="text-[10px] text-zinc-500 mt-1 flex items-center gap-1.5">
                                <Calendar className="w-3 h-3 text-zinc-400 shrink-0" />
                                <span>{notice.date}</span>
                              </div>
                              {/* Tags/Badges */}
                              <div className="flex items-center gap-1 mt-2">
                                {notice.isNew && (
                                  <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 border border-amber-200 text-[8px] font-extrabold tracking-wider uppercase animate-pulse">
                                    NEW
                                  </span>
                                )}
                                {notice.isImportant && (
                                  <span className="px-1.5 py-0.2 rounded bg-red-50 text-red-700 border border-red-200 text-[8px] font-extrabold tracking-wider uppercase">
                                    IMPORTANT
                                  </span>
                                )}
                              </div>
                            </td>
                            {/* Title & Subject */}
                            <td className="px-6 py-4 border-r border-zinc-200">
                              <button
                                onClick={() => setActiveModalNotice(notice)}
                                className="font-bold text-zinc-900 text-left hover:text-[#0D6B4F] hover:underline leading-snug transition-colors cursor-pointer"
                              >
                                {notice.title}
                              </button>
                              <p className="text-[11px] text-zinc-550 mt-1 leading-relaxed line-clamp-2">
                                {notice.description}
                              </p>
                              {/* Hashtag List */}
                              {notice.tags && notice.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {notice.tags.map((tag) => (
                                    <span key={tag} className="text-[9px] font-mono text-zinc-400 font-semibold bg-zinc-50 border border-zinc-200/50 px-1 py-0.2 rounded">
                                      #{tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </td>
                            {/* Issuing Authority / Category */}
                            <td className="px-5 py-4 border-r border-zinc-200">
                              <div className="font-bold text-zinc-800 flex items-center gap-1.5">
                                <Building2 className="w-3.5 h-3.5 text-[#0D6B4F] shrink-0" />
                                <span>{notice.issuingAuthority}</span>
                              </div>
                              <span className="inline-block mt-2 px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-150">
                                {notice.category}
                              </span>
                            </td>
                            {/* Actions */}
                            <td className="px-4 py-4 text-center">
                              <div className="flex items-center justify-center gap-1.5">
                                <button
                                  onClick={() => setActiveModalNotice(notice)}
                                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-none bg-[#0D6B4F] hover:bg-[#074733] text-white text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
                                  title="Open detail modal view"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                  <span>View</span>
                                </button>
                                {notice.fileUrl && (
                                  <a
                                    href={notice.fileUrl}
                                    target={notice.fileUrl.endsWith(".pdf") ? "_blank" : "_self"}
                                    rel="noopener noreferrer"
                                    className="p-1.5 rounded-none bg-zinc-100 hover:bg-zinc-200 text-zinc-600 hover:text-zinc-950 border border-zinc-200 transition-colors cursor-pointer"
                                    title={notice.fileUrl.endsWith(".pdf") ? "View/Download PDF Attachment" : "Navigate to associated page"}
                                  >
                                    {notice.fileUrl.endsWith(".pdf") ? (
                                      <Download className="w-3.5 h-3.5 text-[#A68034]" />
                                    ) : (
                                      <ExternalLink className="w-3.5 h-3.5 text-[#0D6B4F]" />
                                    )}
                                  </a>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Mobile Card-Based View */}
                <div className="space-y-4 md:hidden">
                  {filteredNotices.map((notice, idx) => (
                    <div 
                      key={`mobile-notice-${notice.id}`} 
                      className="bg-white border border-zinc-200 rounded-xl p-4 shadow-sm flex flex-col gap-3 relative hover:border-[#0D6B4F]/40 transition-colors"
                    >
                      {/* Header: S.No, ID and Category */}
                      <div className="flex items-center justify-between border-b border-zinc-100 pb-2.5">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-mono font-bold text-zinc-400 bg-zinc-100 px-1.5 py-0.5 rounded">
                            #{String(idx + 1).padStart(2, "0")}
                          </span>
                          <span className="text-[10px] font-mono font-bold text-zinc-500">
                            {notice.noticeNo}
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-150">
                          {notice.category}
                        </span>
                      </div>

                      {/* Date and Badges */}
                      <div className="flex flex-wrap items-center gap-2 text-[10px] text-zinc-500 font-mono">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                          <span>{notice.date}</span>
                        </div>
                        
                        {/* Tags/Badges */}
                        <div className="flex items-center gap-1">
                          {notice.isNew && (
                            <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 border border-amber-200 text-[8px] font-extrabold tracking-wider uppercase animate-pulse">
                              NEW
                            </span>
                          )}
                          {notice.isImportant && (
                            <span className="px-1.5 py-0.2 rounded bg-red-50 text-red-700 border border-red-200 text-[8px] font-extrabold tracking-wider uppercase">
                              IMPORTANT
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Title */}
                      <div>
                        <button
                          onClick={() => setActiveModalNotice(notice)}
                          className="font-bold text-zinc-900 text-left hover:text-[#0D6B4F] hover:underline leading-snug transition-colors text-sm cursor-pointer"
                        >
                          {notice.title}
                        </button>
                        <p className="text-[11px] text-zinc-550 leading-relaxed mt-1.5">
                          {notice.description}
                        </p>
                      </div>

                      {/* Tags List */}
                      {notice.tags && notice.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {notice.tags.map((tag) => (
                            <span key={tag} className="text-[9px] font-mono text-zinc-450 font-semibold bg-zinc-50 border border-zinc-200/50 px-1.5 py-0.2 rounded">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Issuing Office & Actions Row */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-zinc-100 mt-1">
                        <div className="font-bold text-zinc-800 flex items-center gap-1.5 text-[11px]">
                          <Building2 className="w-3.5 h-3.5 text-[#0D6B4F] shrink-0" />
                          <span>{notice.issuingAuthority}</span>
                        </div>
                        
                        {/* Action buttons */}
                        <div className="flex items-center gap-2 mt-1 sm:mt-0">
                          <button
                            onClick={() => setActiveModalNotice(notice)}
                            className="flex-1 sm:flex-initial inline-flex items-center justify-center space-x-1.5 px-3 py-2 rounded-none bg-[#0D6B4F] hover:bg-[#074733] text-white text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View Details</span>
                          </button>
                          {notice.fileUrl && (
                            <a
                              href={notice.fileUrl}
                              target={notice.fileUrl.endsWith(".pdf") ? "_blank" : "_self"}
                              rel="noopener noreferrer"
                              className="p-2 rounded-none bg-zinc-100 hover:bg-zinc-200 text-zinc-605 hover:text-zinc-950 border border-zinc-200 transition-colors cursor-pointer flex items-center justify-center"
                              title={notice.fileUrl.endsWith(".pdf") ? "View/Download PDF Attachment" : "Navigate to associated page"}
                            >
                              {notice.fileUrl.endsWith(".pdf") ? (
                                <Download className="w-3.5 h-3.5 text-[#A68034]" />
                              ) : (
                                <ExternalLink className="w-3.5 h-3.5 text-[#0D6B4F]" />
                              )}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )
          ) : (
            /* Orders Directory Table */
            filteredOrders.length === 0 ? (
              <div className="bg-white border border-zinc-200 rounded-xl p-12 text-center shadow-sm">
                <AlertTriangle className="w-10 h-10 text-zinc-400 mx-auto mb-3 animate-pulse" />
                <h3 className="text-sm font-bold text-zinc-800 uppercase tracking-wide">No directives match current parameters</h3>
                <p className="text-[11px] text-zinc-500 mt-1 font-sans">Try modifying your query or selection years.</p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedOrderCategory("All");
                    setSelectedOrderYear("All");
                  }}
                  className="mt-4 inline-flex items-center px-4 py-2 rounded-none bg-[#A68034] hover:bg-[#8A6726] text-white text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                {/* Desktop Table View */}
                <div className="hidden md:block bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                      <thead>
                        <tr className="bg-zinc-50 border-b border-zinc-200 text-[10px] font-bold uppercase tracking-wider text-zinc-700">
                          <th className="px-4 py-3 border-r border-zinc-200 w-16 text-center">S.No.</th>
                          <th className="px-5 py-3 border-r border-zinc-200 w-48">Order Reference & Date</th>
                          <th className="px-6 py-3 border-r border-zinc-200">Subject / Directive Details</th>
                          <th className="px-5 py-3 border-r border-zinc-200 w-56">Signing Department</th>
                          <th className="px-4 py-3 w-36 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200 text-xs">
                        {filteredOrders.map((order, idx) => (
                          <tr key={order.id} className="hover:bg-zinc-50/50 odd:bg-white even:bg-zinc-50/10 transition-colors">
                            {/* S.No */}
                            <td className="px-4 py-4 text-center font-mono font-bold text-zinc-400 border-r border-zinc-200">
                              {String(idx + 1).padStart(2, "0")}
                            </td>
                            {/* Order Reference & Date */}
                            <td className="px-5 py-4 border-r border-zinc-200 font-mono">
                              <div className="font-bold text-zinc-900 text-[11px]">{order.orderNo}</div>
                              <div className="text-[10px] text-zinc-500 mt-1 flex items-center gap-1.5">
                                <Calendar className="w-3 h-3 text-zinc-400 shrink-0" />
                                <span>{order.date}</span>
                              </div>
                              {/* Urgent Label */}
                              {order.isUrgent && (
                                <div className="mt-2">
                                  <span className="px-1.5 py-0.2 rounded bg-red-50 text-red-700 border border-red-200 text-[8px] font-extrabold tracking-wider uppercase animate-pulse">
                                    URGENT
                                  </span>
                                </div>
                              )}
                            </td>
                            {/* Title & Subject */}
                            <td className="px-6 py-4 border-r border-zinc-200">
                              <button
                                onClick={() => setActiveModalOrder(order)}
                                className="font-bold text-zinc-900 text-left hover:text-[#A68034] hover:underline leading-snug transition-colors cursor-pointer"
                              >
                                {order.title}
                              </button>
                              <p className="text-[11px] text-zinc-550 mt-1 leading-relaxed line-clamp-2">
                                {order.description}
                              </p>
                              {/* Tag Badges */}
                              {order.tags && order.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {order.tags.map((tag) => (
                                    <span key={tag} className="text-[9px] font-mono text-zinc-400 font-semibold bg-zinc-50 border border-zinc-200/50 px-1 py-0.2 rounded">
                                      #{tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </td>
                            {/* Signing Authority / Category */}
                            <td className="px-5 py-4 border-r border-zinc-200">
                              <div className="font-bold text-zinc-800 flex items-center gap-1.5">
                                <Building2 className="w-3.5 h-3.5 text-[#A68034] shrink-0" />
                                <span>{order.department}</span>
                              </div>
                              <div className="text-[10px] text-zinc-500 mt-0.5 font-medium italic">
                                Signed: {order.signedBy}
                              </div>
                              <span className="inline-block mt-2.5 px-2 py-0.5 rounded text-[9px] font-bold bg-amber-50 text-amber-800 border border-amber-150">
                                {order.category}
                              </span>
                            </td>
                            {/* Actions */}
                            <td className="px-4 py-4 text-center">
                              <div className="flex items-center justify-center gap-1.5">
                                <button
                                  onClick={() => setActiveModalOrder(order)}
                                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-none bg-[#A68034] hover:bg-[#8A6726] text-white text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
                                  title="Open detail modal view"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                  <span>View</span>
                                </button>
                                {order.fileUrl && (
                                  <a
                                    href={order.fileUrl}
                                    target={order.fileUrl.endsWith(".pdf") ? "_blank" : "_self"}
                                    rel="noopener noreferrer"
                                    className="p-1.5 rounded-none bg-zinc-100 hover:bg-zinc-200 text-zinc-600 hover:text-zinc-950 border border-zinc-200 transition-colors cursor-pointer"
                                    title="Download associated PDF Gazette document"
                                  >
                                    <Download className="w-3.5 h-3.5 text-[#0D6B4F]" />
                                  </a>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Mobile Card-Based View */}
                <div className="space-y-4 md:hidden">
                  {filteredOrders.map((order, idx) => (
                    <div 
                      key={`mobile-order-${order.id}`} 
                      className="bg-white border border-zinc-200 rounded-xl p-4 shadow-sm flex flex-col gap-3 relative hover:border-[#A68034]/40 transition-colors"
                    >
                      {/* Header: S.No, ID and Category */}
                      <div className="flex items-center justify-between border-b border-zinc-100 pb-2.5">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-mono font-bold text-zinc-400 bg-zinc-100 px-1.5 py-0.5 rounded">
                            #{String(idx + 1).padStart(2, "0")}
                          </span>
                          <span className="text-[10px] font-mono font-bold text-zinc-500">
                            {order.orderNo}
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-amber-50 text-amber-800 border border-amber-150">
                          {order.category}
                        </span>
                      </div>

                      {/* Date and Badges */}
                      <div className="flex flex-wrap items-center gap-2 text-[10px] text-zinc-500 font-mono">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                          <span>{order.date}</span>
                        </div>
                        
                        {/* Urgent Badge */}
                        {order.isUrgent && (
                          <span className="px-1.5 py-0.2 rounded bg-red-50 text-red-700 border border-red-200 text-[8px] font-extrabold tracking-wider uppercase animate-pulse">
                            URGENT
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <div>
                        <button
                          onClick={() => setActiveModalOrder(order)}
                          className="font-bold text-zinc-900 text-left hover:text-[#A68034] hover:underline leading-snug transition-colors text-sm cursor-pointer"
                        >
                          {order.title}
                        </button>
                        <p className="text-[11px] text-zinc-550 leading-relaxed mt-1.5">
                          {order.description}
                        </p>
                      </div>

                      {/* Tags List */}
                      {order.tags && order.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {order.tags.map((tag) => (
                            <span key={tag} className="text-[9px] font-mono text-zinc-455 font-semibold bg-zinc-50 border border-zinc-200/50 px-1.5 py-0.2 rounded">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Issuing Office & Actions Row */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-zinc-100 mt-1">
                        <div className="text-[11px]">
                          <div className="font-bold text-zinc-800 flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5 text-[#A68034] shrink-0" />
                            <span>{order.department}</span>
                          </div>
                          <div className="text-[10px] text-zinc-500 mt-0.5 font-medium italic pl-5">
                            Signed: {order.signedBy}
                          </div>
                        </div>
                        
                        {/* Action buttons */}
                        <div className="flex items-center gap-2 mt-1 sm:mt-0">
                          <button
                            onClick={() => setActiveModalOrder(order)}
                            className="flex-1 sm:flex-initial inline-flex items-center justify-center space-x-1.5 px-3 py-2 rounded-none bg-[#A68034] hover:bg-[#8A6726] text-white text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View Details</span>
                          </button>
                          {order.fileUrl && (
                            <a
                              href={order.fileUrl}
                              target={order.fileUrl.endsWith(".pdf") ? "_blank" : "_self"}
                              rel="noopener noreferrer"
                              className="p-2 rounded-none bg-zinc-100 hover:bg-zinc-200 text-zinc-605 hover:text-zinc-950 border border-zinc-200 transition-colors cursor-pointer flex items-center justify-center"
                              title="Download associated PDF Gazette document"
                            >
                              <Download className="w-3.5 h-3.5 text-[#0D6B4F]" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )
          )}
        </div>
      </section>

      {/* Document View Modal (Notice) */}
      <AnimatePresence>
        {activeModalNotice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-5xl bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-2xl text-zinc-800 max-h-[90vh] sm:max-h-[92vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="px-4 sm:px-6 py-3 sm:py-4 bg-white flex items-center gap-3 border-b border-zinc-200">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  <img src="/logo-new.png" className="h-8 sm:h-11 object-contain shrink-0" alt="NCIE Emblem" />
                  <div className="hidden sm:block w-px h-7 bg-zinc-200 shrink-0" />
                  <img src="/gov-emblem.png" className="hidden sm:block h-8 sm:h-11 object-contain shrink-0 opacity-80" alt="India Emblem" />
                  <div className="ml-1 sm:ml-2 flex-1 min-w-0">
                    <div className="text-[9px] sm:text-[11px] font-black uppercase tracking-wider text-[#0D6B4F] leading-none whitespace-normal">
                      National Council for Innovation & Entrepreneurship
                    </div>
                    <div className="text-[8px] text-zinc-400 font-bold uppercase tracking-widest mt-1 whitespace-normal">
                      Official Gazette Repository
                    </div>
                  </div>
                </div>
              </div>

              {/* Theme Anchor Stripe */}
              <div className="h-1 bg-gradient-to-r from-[#0D6B4F] via-[#0D6B4F]/70 to-[#A68034]/20" />

              {/* Title Section */}
              <div className="px-6 py-4 border-b border-zinc-100 bg-zinc-50/15 shrink-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded bg-emerald-50 border border-emerald-150 text-[#0D6B4F] font-mono text-[10px] font-bold uppercase tracking-wider">
                    {activeModalNotice.noticeNo}
                  </span>
                  <span className="text-zinc-300">•</span>
                  <span className="text-[10px] text-zinc-500 font-mono font-semibold">
                    Published: {activeModalNotice.date}
                  </span>
                </div>
                <h2 className="text-base sm:text-[17px] font-black text-zinc-900 leading-snug tracking-tight">
                  {activeModalNotice.title}
                </h2>
              </div>

              {/* Modal Body (Two-Column Layout) */}
              <div className="p-4 sm:p-6 overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 text-sm text-zinc-650 max-h-[70vh]">
                
                {/* Left Column: Metadata & Brief (col-span-5) */}
                <div className="lg:col-span-5 space-y-5">
                  {/* Official Record Index Table */}
                  <div className="border border-zinc-200 rounded-xl overflow-hidden bg-white shadow-sm">
                    <div className="bg-zinc-50 border-b border-zinc-200 px-3.5 py-2 text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-mono">
                      Official Document Index
                    </div>
                    <table className="w-full text-left text-xs border-collapse">
                      <tbody>
                        <tr className="border-b border-zinc-150 hover:bg-zinc-50/20">
                          <td className="px-3.5 py-2.5 bg-zinc-50/30 text-zinc-500 font-bold w-28 border-r border-zinc-150 select-none">Date</td>
                          <td className="px-3.5 py-2.5 text-zinc-800 font-semibold">{activeModalNotice.date}</td>
                        </tr>
                        <tr className="border-b border-zinc-150 hover:bg-zinc-50/20">
                          <td className="px-3.5 py-2.5 bg-zinc-50/30 text-zinc-500 font-bold w-28 border-r border-zinc-150 select-none">Notice No.</td>
                          <td className="px-3.5 py-2.5 text-zinc-900 font-mono font-bold">{activeModalNotice.noticeNo}</td>
                        </tr>
                        <tr className="border-b border-zinc-150 hover:bg-zinc-50/20">
                          <td className="px-3.5 py-2.5 bg-zinc-50/30 text-zinc-500 font-bold w-28 border-r border-zinc-150 select-none">Issuing Authority</td>
                          <td className="px-3.5 py-2.5 text-zinc-800 font-bold">{activeModalNotice.issuingAuthority}</td>
                        </tr>
                        <tr className="border-b border-zinc-150 hover:bg-zinc-50/20">
                          <td className="px-3.5 py-2.5 bg-zinc-50/30 text-zinc-500 font-bold w-28 border-r border-zinc-150 select-none">Category</td>
                          <td className="px-3.5 py-2.5 text-[#0D6B4F] font-bold">{activeModalNotice.category}</td>
                        </tr>
                        <tr className="hover:bg-zinc-50/20">
                          <td className="px-3.5 py-2.5 bg-zinc-50/30 text-zinc-500 font-bold w-28 border-r border-zinc-150 select-none">Record Entry</td>
                          <td className="px-3.5 py-2.5 text-emerald-700 font-bold flex items-center gap-1.5">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>Digital Entry Valid</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Executive Brief */}
                  <div className="bg-[#0D6B4F]/5 border border-[#0D6B4F]/10 rounded-xl p-4">
                    <div className="text-[10px] text-[#0D6B4F] font-black uppercase tracking-widest mb-1.5 font-mono">
                      I. Executive Summary & Brief
                    </div>
                    <p className="text-zinc-700 text-xs leading-relaxed font-medium">
                      {activeModalNotice.description}
                    </p>
                  </div>


                </div>

                {/* Right Column: PDF Preview Viewport (col-span-7) */}
                <div className="hidden lg:block lg:col-span-7">
                  {activeModalNotice.fileUrl && activeModalNotice.fileUrl.endsWith(".pdf") ? (
                    <div className="border border-zinc-250 rounded-xl overflow-hidden shadow-sm bg-zinc-200 h-[460px] relative">
                      <iframe
                        src={`${activeModalNotice.fileUrl}#toolbar=0`}
                        className="w-full h-full border-0"
                        title={activeModalNotice.title}
                      />
                    </div>
                  ) : (
                    <div className="border border-zinc-200 border-dashed rounded-xl h-full min-h-[300px] flex flex-col items-center justify-center text-center p-8 bg-zinc-50/50">
                      <ExternalLink className="w-8 h-8 text-zinc-400 mb-2 animate-bounce" />
                      <h5 className="text-xs font-bold text-zinc-800 uppercase tracking-wider">External Link Record</h5>
                      <p className="text-[11px] text-zinc-500 mt-1 max-w-xs leading-relaxed">
                        This notice is linked directly to a web portal instead of a static document. Use the action button below to view the destination page.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-zinc-50 border-t border-zinc-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 shrink-0">
                <div className="flex items-center justify-center sm:justify-start gap-2 text-zinc-550 text-[10px] font-mono select-none">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>SHA-256 Validated: NCIE Central Registry Entry</span>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
                  {activeModalNotice.fileUrl && (
                    <a
                      href={activeModalNotice.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center space-x-1.5 bg-[#0D6B4F] hover:bg-[#074733] text-white border border-transparent font-extrabold uppercase tracking-wider text-[10px] px-4 py-2.5 rounded-none shadow-sm hover:shadow-md transition-all cursor-pointer text-center"
                    >
                      <span>
                        {activeModalNotice.fileUrl.endsWith(".pdf")
                          ? "Open Document PDF"
                          : "Open Web Portal"}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <button
                    onClick={() => setActiveModalNotice(null)}
                    className="px-4 py-2.5 bg-white border border-zinc-250 hover:bg-zinc-50 text-zinc-700 font-extrabold uppercase tracking-wider text-[10px] rounded-none shadow-sm hover:shadow-md transition-all cursor-pointer text-center"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Document View Modal (Order) */}
      <AnimatePresence>
        {activeModalOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-5xl bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-2xl text-zinc-800 max-h-[90vh] sm:max-h-[92vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="px-4 sm:px-6 py-3 sm:py-4 bg-white flex items-center gap-3 border-b border-zinc-200">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  <img src="/logo-new.png" className="h-8 sm:h-11 object-contain shrink-0" alt="NCIE Emblem" />
                  <div className="hidden sm:block w-px h-7 bg-zinc-200 shrink-0" />
                  <img src="/gov-emblem.png" className="hidden sm:block h-8 sm:h-11 object-contain shrink-0 opacity-80" alt="India Emblem" />
                  <div className="ml-1 sm:ml-2 flex-1 min-w-0">
                    <div className="text-[9px] sm:text-[11px] font-black uppercase tracking-wider text-[#A68034] leading-none whitespace-normal">
                      National Council for Innovation & Entrepreneurship
                    </div>
                    <div className="text-[8px] text-zinc-400 font-bold uppercase tracking-widest mt-1 whitespace-normal">
                      Official Gazette Repository
                    </div>
                  </div>
                </div>
              </div>

              {/* Theme Anchor Stripe */}
              <div className="h-1 bg-gradient-to-r from-[#A68034] via-[#A68034]/70 to-[#0D6B4F]/20" />

              {/* Title Section */}
              <div className="px-6 py-4 border-b border-zinc-100 bg-zinc-50/15 shrink-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded bg-amber-50 border border-amber-155 text-[#A68034] font-mono text-[10px] font-bold uppercase tracking-wider">
                    {activeModalOrder.orderNo}
                  </span>
                  <span className="text-zinc-300">•</span>
                  <span className="text-[10px] text-zinc-500 font-mono font-semibold">
                    Published: {activeModalOrder.date}
                  </span>
                </div>
                <h2 className="text-base sm:text-[17px] font-black text-zinc-900 leading-snug tracking-tight">
                  {activeModalOrder.title}
                </h2>
              </div>

              {/* Modal Body (Two-Column Layout) */}
              <div className="p-4 sm:p-6 overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 text-sm text-zinc-650 max-h-[70vh]">
                
                {/* Left Column: Metadata & Brief (col-span-5) */}
                <div className="lg:col-span-5 space-y-5">
                  {/* Official Record Index Table */}
                  <div className="border border-zinc-200 rounded-xl overflow-hidden bg-white shadow-sm">
                    <div className="bg-zinc-50 border-b border-zinc-200 px-3.5 py-2 text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-mono">
                      Official Gazette Index
                    </div>
                    <table className="w-full text-left text-xs border-collapse">
                      <tbody>
                        <tr className="border-b border-zinc-150 hover:bg-zinc-50/20">
                          <td className="px-3.5 py-2.5 bg-zinc-50/30 text-zinc-500 font-bold w-28 border-r border-zinc-150 select-none">Date Issued</td>
                          <td className="px-3.5 py-2.5 text-zinc-800 font-semibold">{activeModalOrder.date}</td>
                        </tr>
                        <tr className="border-b border-zinc-150 hover:bg-zinc-50/20">
                          <td className="px-3.5 py-2.5 bg-zinc-50/30 text-zinc-500 font-bold w-28 border-r border-zinc-150 select-none">Directive Ref.</td>
                          <td className="px-3.5 py-2.5 text-zinc-900 font-mono font-bold">{activeModalOrder.orderNo}</td>
                        </tr>
                        <tr className="border-b border-zinc-150 hover:bg-zinc-50/20">
                          <td className="px-3.5 py-2.5 bg-zinc-50/30 text-zinc-500 font-bold w-28 border-r border-zinc-150 select-none">Signing Bureau</td>
                          <td className="px-3.5 py-2.5 text-zinc-800 font-bold">
                            <div>{activeModalOrder.department}</div>
                            <div className="text-[9px] text-zinc-400 font-bold italic mt-0.5">Signed: {activeModalOrder.signedBy}</div>
                          </td>
                        </tr>
                        <tr className="border-b border-zinc-150 hover:bg-zinc-50/20">
                          <td className="px-3.5 py-2.5 bg-zinc-50/30 text-zinc-500 font-bold w-28 border-r border-zinc-150 select-none">Effective Date</td>
                          <td className="px-3.5 py-2.5 text-[#0D6B4F] font-bold">{activeModalOrder.effectiveDate}</td>
                        </tr>
                        <tr className="border-b border-zinc-150 hover:bg-zinc-50/20">
                          <td className="px-3.5 py-2.5 bg-zinc-50/30 text-zinc-500 font-bold w-28 border-r border-zinc-150 select-none">Classification</td>
                          <td className="px-3.5 py-2.5 text-[#A68034] font-bold">{activeModalOrder.category}</td>
                        </tr>
                        <tr className="hover:bg-zinc-50/20">
                          <td className="px-3.5 py-2.5 bg-zinc-50/30 text-zinc-500 font-bold w-28 border-r border-zinc-150 select-none">Directive Status</td>
                          <td className="px-3.5 py-2.5 text-emerald-700 font-bold flex items-center gap-1.5">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>Active / Valid</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Mandate Description */}
                  <div className="bg-[#A68034]/5 border border-[#A68034]/10 rounded-xl p-4">
                    <div className="text-[10px] text-[#A68034] font-black uppercase tracking-widest mb-1.5 font-mono">
                      I. Gazette Directives & Mandate
                    </div>
                    <p className="text-zinc-700 text-xs leading-relaxed font-medium">
                      {activeModalOrder.description}
                    </p>
                  </div>
                </div>

                {/* Right Column: PDF Preview Viewport (col-span-7) */}
                <div className="hidden lg:block lg:col-span-7">
                  {activeModalOrder.fileUrl && activeModalOrder.fileUrl.endsWith(".pdf") ? (
                    <div className="border border-zinc-250 rounded-xl overflow-hidden shadow-sm bg-zinc-200 h-[460px] relative">
                      <iframe
                        src={`${activeModalOrder.fileUrl}#toolbar=0`}
                        className="w-full h-full border-0"
                        title={activeModalOrder.title}
                      />
                    </div>
                  ) : (
                    <div className="border border-zinc-200 border-dashed rounded-xl h-full min-h-[300px] flex flex-col items-center justify-center text-center p-8 bg-zinc-50/50">
                      <ExternalLink className="w-8 h-8 text-zinc-400 mb-2 animate-bounce" />
                      <h5 className="text-xs font-bold text-zinc-800 uppercase tracking-wider">Internal Web Record</h5>
                      <p className="text-[11px] text-zinc-500 mt-1 max-w-xs leading-relaxed">
                        This order redirects to an internal web page. Use the action button below to view the destination portal.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-zinc-50 border-t border-zinc-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 shrink-0">
                <div className="flex items-center justify-center sm:justify-start gap-2 text-zinc-555 text-[10px] font-mono select-none">
                  <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>SHA-256 Validated: NCIE Central Registry Entry</span>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
                  {activeModalOrder.fileUrl && (
                    <a
                      href={activeModalOrder.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center space-x-1.5 bg-[#A68034] hover:bg-[#8A6726] text-white border border-transparent font-extrabold uppercase tracking-wider text-[10px] px-4 py-2.5 rounded-none shadow-sm hover:shadow-md transition-all cursor-pointer text-center"
                    >
                      <span>
                        {activeModalOrder.fileUrl.endsWith(".pdf")
                          ? "Open Document PDF"
                          : "Open Web Portal"}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <button
                    onClick={() => setActiveModalOrder(null)}
                    className="px-4 py-2.5 bg-white border border-zinc-250 hover:bg-zinc-50 text-zinc-700 font-extrabold uppercase tracking-wider text-[10px] rounded-none shadow-sm hover:shadow-md transition-all cursor-pointer text-center"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
