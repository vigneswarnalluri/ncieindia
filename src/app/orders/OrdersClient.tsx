"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  FileCheck2,
  Download,
  ExternalLink,
  Eye,
  Calendar,
  Building,
  ShieldCheck,
  Filter,
  X,
  ChevronRight,
  Sparkles,
  FileText,
  AlertTriangle,
  ArrowUpRight,
  CheckCircle,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ORDERS_DATA, OrderItem } from "@/data/ordersData";

const ORDER_CATEGORIES = [
  "All",
  "Office Memorandums",
  "Executive Orders",
  "Policy Directives",
  "Institutional Guidelines",
];

export default function OrdersClient() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [activeModalOrder, setActiveModalOrder] = useState<OrderItem | null>(null);

  // Filter orders based on search, category & year
  const filteredOrders = useMemo(() => {
    return ORDERS_DATA.filter((order) => {
      const matchesCategory =
        selectedCategory === "All" || order.category === selectedCategory;
      const matchesYear =
        selectedYear === "All" || order.date.includes(selectedYear);
      const matchesQuery =
        searchQuery.trim() === "" ||
        order.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.orderNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.signedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (order.tags && order.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())));

      return matchesCategory && matchesYear && matchesQuery;
    });
  }, [searchQuery, selectedCategory, selectedYear]);

  return (
    <div className="min-h-screen bg-[#070E1A] text-white font-sans">
      {/* Hero / Banner Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0C1A30] via-[#0E2240] to-[#070E1A] pt-12 pb-16 border-b border-white/10">
        {/* Subtle Watermark/Pattern Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-xs text-zinc-400 mb-6 font-mono">
            <Link href="/" className="hover:text-amber-400 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-zinc-200">Official Orders</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              {/* Gazette Badge */}
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-medium font-mono mb-4">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>EXECUTIVE & POLICY GAZETTE REPOSITORY</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {t("orders_page_title") || "Official Orders & Directives"}
              </h1>
              <p className="mt-3 text-sm sm:text-base text-zinc-300 max-w-2xl leading-relaxed">
                {t("orders_page_subtitle") ||
                  "Government notifications, office memorandums (OMs), policy directives, academic guidelines, and administrative orders issued by NCIE Central Headquarters."}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 text-center min-w-[110px]">
                <div className="text-2xl font-bold text-amber-400 font-mono">
                  {ORDERS_DATA.length}
                </div>
                <div className="text-[11px] text-zinc-400 font-medium">Active Orders</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 text-center min-w-[110px]">
                <div className="text-2xl font-bold text-emerald-400 font-mono">
                  {ORDERS_DATA.filter((o) => o.category === "Office Memorandums").length}
                </div>
                <div className="text-[11px] text-zinc-400 font-medium">Office Memos</div>
              </div>
            </div>
          </div>

          {/* Search & Filter Controls Bar */}
          <div className="mt-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-6 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center gap-4">
              {/* Search Box */}
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    t("orders_search_placeholder") ||
                    "Search Order No (e.g. Lt.No. 124, OM No), Subject, or Signatory..."
                  }
                  className="w-full bg-[#091526] border border-white/10 rounded-xl pl-11 pr-10 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-sans"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Year Select Filter */}
              <div className="w-full md:w-auto shrink-0 flex items-center space-x-2">
                <span className="text-xs text-zinc-400 font-mono hidden lg:inline">Year:</span>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full md:w-auto bg-[#091526] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500 transition-all font-mono"
                >
                  <option value="All">All Years</option>
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                </select>
              </div>

              {/* Switch to Notices Link */}
              <Link
                href="/notices"
                className="w-full md:w-auto inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-xs font-semibold px-5 py-3 rounded-xl transition-all shadow-lg shrink-0"
              >
                <FileText className="w-4 h-4" />
                <span>Switch to Public Notices Page</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Category Pill Filters */}
            <div className="flex items-center space-x-2 overflow-x-auto pt-4 border-t border-white/5 mt-4 scrollbar-none">
              <Filter className="w-4 h-4 text-zinc-400 shrink-0 mr-1" />
              {ORDER_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                      isActive
                        ? "bg-amber-600 text-white shadow-md font-semibold"
                        : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-zinc-200"
                    }`}
                  >
                    {cat === "All" ? t("orders_tab_all") || "All Directives" : cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Main Table / Directory Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <div className="text-xs text-zinc-400 font-mono">
            Found <span className="text-amber-400 font-bold">{filteredOrders.length}</span> official orders & memorandums
          </div>
          {(selectedCategory !== "All" || selectedYear !== "All") && (
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSelectedYear("All");
              }}
              className="text-xs text-amber-400 hover:underline flex items-center gap-1"
            >
              Reset active filters
            </button>
          )}
        </div>

        {filteredOrders.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
            <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">No official orders found matching criteria</h3>
            <p className="text-xs text-zinc-400 mt-1">Try modifying your search query or selecting &quot;All Directives&quot;.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setSelectedYear("All");
              }}
              className="mt-4 inline-flex items-center px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-medium transition-colors"
            >
              Clear Search Parameters
            </button>
          </div>
        ) : (
          <div className="bg-[#0B182C] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            {/* Desktop Table View */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-zinc-300">
                <thead className="bg-[#0D1E38] text-xs uppercase font-mono text-zinc-400 border-b border-white/10">
                  <tr>
                    <th scope="col" className="py-4 px-4 w-12 text-center">Sl.</th>
                    <th scope="col" className="py-4 px-6 min-w-[200px]">Order No. & Date</th>
                    <th scope="col" className="py-4 px-6">Subject / Directive Title</th>
                    <th scope="col" className="py-4 px-6 hidden lg:table-cell">Category</th>
                    <th scope="col" className="py-4 px-6 hidden md:table-cell">Issuing Authority</th>
                    <th scope="col" className="py-4 px-6 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredOrders.map((order, idx) => (
                    <tr
                      key={order.id}
                      className="hover:bg-white/[0.03] transition-colors group"
                    >
                      {/* Sl No */}
                      <td className="py-4 px-4 text-center font-mono text-xs text-zinc-500">
                        {String(idx + 1).padStart(2, "0")}
                      </td>

                      {/* Order No & Date */}
                      <td className="py-4 px-6 align-top">
                        <div className="font-mono text-xs font-semibold text-amber-400">
                          {order.orderNo}
                        </div>
                        <div className="text-[11px] text-zinc-400 font-mono mt-1 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-zinc-500" />
                          <span>{order.date}</span>
                        </div>
                        {order.isUrgent && (
                          <span className="inline-block mt-1.5 px-2 py-0.5 text-[9px] font-bold rounded bg-red-500/20 text-red-400 border border-red-500/30 font-mono">
                            URGENT DIRECTIVE
                          </span>
                        )}
                      </td>

                      {/* Title & Description */}
                      <td className="py-4 px-6 align-top">
                        <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                          {order.title}
                        </h4>
                        <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                          {order.description}
                        </p>
                        {order.tags && order.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {order.tags.map((t) => (
                              <span key={t} className="text-[9px] bg-white/5 text-zinc-400 border border-white/5 px-1.5 py-0.5 rounded font-mono">
                                #{t}
                              </span>
                            ))}
                          </div>
                        )}
                      </td>

                      {/* Category */}
                      <td className="py-4 px-6 align-top hidden lg:table-cell whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20">
                          {order.category}
                        </span>
                      </td>

                      {/* Issuing Authority */}
                      <td className="py-4 px-6 align-top hidden md:table-cell">
                        <div className="text-xs text-zinc-200 font-medium">{order.department}</div>
                        <div className="text-[11px] text-zinc-400 mt-0.5 truncate max-w-[200px]">
                          {order.signedBy}
                        </div>
                      </td>

                      {/* Action */}
                      <td className="py-4 px-6 align-top text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => setActiveModalOrder(order)}
                            className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold transition-colors shadow"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View</span>
                          </button>

                          {order.fileUrl && (
                            <a
                              href={order.fileUrl}
                              target={order.fileUrl.endsWith(".pdf") ? "_blank" : "_self"}
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-colors"
                              title="Download PDF Order"
                            >
                              <Download className="w-3.5 h-3.5 text-emerald-400" />
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
        )}
      </section>

      {/* Order Detail Modal */}
      <AnimatePresence>
        {activeModalOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl bg-[#0B1A2E] border border-white/15 rounded-2xl overflow-hidden shadow-2xl text-white max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-6 bg-gradient-to-r from-[#0F2647] to-[#0A1B30] border-b border-white/10 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-400 font-mono text-xs font-semibold">
                      {activeModalOrder.orderNo}
                    </span>
                    <span className="text-xs text-zinc-400 font-mono">
                      Issued: {activeModalOrder.date}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold leading-snug text-white">
                    {activeModalOrder.title}
                  </h2>
                </div>
                <button
                  onClick={() => setActiveModalOrder(null)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto space-y-5 text-sm text-zinc-300">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/5 border border-white/10 rounded-xl p-4">
                  <div>
                    <div className="text-xs text-zinc-400 font-medium">Department / Bureau</div>
                    <div className="text-sm font-semibold text-white mt-0.5">
                      {activeModalOrder.department}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-400 font-medium">Signing Authority</div>
                    <div className="text-sm font-semibold text-amber-400 mt-0.5">
                      {activeModalOrder.signedBy}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-400 font-medium">Effective Date</div>
                    <div className="text-sm font-semibold text-emerald-400 mt-0.5">
                      {activeModalOrder.effectiveDate}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-400 font-medium">Order Status</div>
                    <div className="text-sm font-semibold text-white mt-0.5 flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{activeModalOrder.status}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                    Executive Summary & Mandate
                  </h4>
                  <p className="leading-relaxed bg-[#061120] border border-white/5 rounded-xl p-4 text-zinc-200">
                    {activeModalOrder.description}
                  </p>
                </div>

                {activeModalOrder.fileUrl && activeModalOrder.fileUrl.endsWith(".pdf") && (
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                      PDF Document Preview
                    </h4>
                    <div className="bg-black/50 border border-white/10 rounded-xl overflow-hidden h-[300px]">
                      <iframe
                        src={`${activeModalOrder.fileUrl}#toolbar=0`}
                        className="w-full h-full"
                        title={activeModalOrder.title}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-[#071324] border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-zinc-400 font-mono">
                  Official Gazette Authentication: Verified Digital Record
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveModalOrder(null)}
                    className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    Close
                  </button>

                  {activeModalOrder.fileUrl && (
                    <a
                      href={activeModalOrder.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors shadow-lg"
                    >
                      <span>Open Document PDF</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
