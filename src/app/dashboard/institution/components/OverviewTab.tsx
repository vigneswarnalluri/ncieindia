"use client";
import React, { useState } from "react";
import { Users, Lightbulb, Star, Landmark, Bell, AlertCircle, Building2, Mail, Phone, MapPin, Search, ArrowRight, ShieldCheck } from "lucide-react";

export interface SpocInfo {
  id: string;
  name: string;
  designation?: string;
  institution: string;
  shortName?: string;
  aishe: string;
  email: string;
  phone?: string;
  state?: string;
  city?: string;
  grantAmount?: string;
  studentCount?: number;
}

interface Props {
  pendingCount: number;
  verifiedCount: number;
  ideasCount: number;
  grantsReceived: string;
  userOrg?: string;
  aisheCode?: string;
  isSuper?: boolean;
  spocs?: SpocInfo[];
  onSelectSpoc?: (spoc: SpocInfo | null) => void;
  selectedSpocId?: string;
}

export default function OverviewTab({
  pendingCount,
  verifiedCount,
  ideasCount,
  grantsReceived,
  userOrg,
  aisheCode,
  isSuper,
  spocs = [],
  onSelectSpoc,
  selectedSpocId,
}: Props) {
  const currentOrg = userOrg || "Affiliated Institutional Chapter";
  const currentChapterId = aisheCode || "NCIE-CH-AFFILIATED";
  const [spocSearch, setSpocSearch] = useState("");

  const filteredSpocs = spocs.filter(
    (s) =>
      s.name.toLowerCase().includes(spocSearch.toLowerCase()) ||
      s.institution.toLowerCase().includes(spocSearch.toLowerCase()) ||
      s.aishe.toLowerCase().includes(spocSearch.toLowerCase()) ||
      s.email.toLowerCase().includes(spocSearch.toLowerCase()) ||
      (s.state && s.state.toLowerCase().includes(spocSearch.toLowerCase()))
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-0">
        <div>
          <h1 className="text-base font-bold text-zinc-900">Dashboard Overview</h1>
          <p className="text-[11px] text-zinc-500 mt-0.5">
            {isSuper && (!selectedSpocId || selectedSpocId === "all")
              ? "National Consolidated Central Roster — All Affiliated Institutional Chapters & SPOCs Active"
              : `Chapter performance summary for ${currentOrg} — Academic Year 2025–26`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isSuper && (
            <span className="text-[10px] bg-emerald-100 border border-emerald-300 text-emerald-800 font-bold px-2.5 py-1 uppercase tracking-wider">
              Root Authority Access
            </span>
          )}
          <span className="text-[10px] bg-[#e8f5f0] border border-[#c2dfd4] text-[#0D6B4F] font-bold px-3 py-1 uppercase tracking-wider whitespace-nowrap self-start sm:self-auto">
            Chapter ID: {currentChapterId}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Verified Students", value: String(verifiedCount), sub: "Active Members", color: "border-t-[#0D6B4F]", icon: <Users className="w-5 h-5 text-[#0D6B4F]" /> },
          { label: "Ideas Submitted", value: String(ideasCount), sub: "TRL 3-6 range", color: "border-t-blue-600", icon: <Lightbulb className="w-5 h-5 text-blue-600" /> },
          { label: "MIC Star Rating", value: "4.5 / 5.0", sub: "NCIE Evaluation", color: "border-t-amber-500", icon: <Star className="w-5 h-5 text-amber-500" /> },
          { label: "Grants Received", value: grantsReceived, sub: "FY 2025–26", color: "border-t-purple-600", icon: <Landmark className="w-5 h-5 text-purple-600" /> },
        ].map((card) => (
          <div key={card.label} className={`bg-white border border-zinc-200 border-t-4 ${card.color} p-4`}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">{card.label}</p>
                <p className="text-xl font-bold text-zinc-900 mt-1">{card.value}</p>
                <p className="text-[10px] text-zinc-400 mt-0.5">{card.sub}</p>
              </div>
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Super Admin / Root Access: All SPOCs Directory Card */}
      {isSuper && spocs.length > 0 && (
        <div className="bg-white border border-zinc-200 shadow-xs">
          <div className="p-4 border-b border-zinc-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-zinc-50">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-emerald-100 flex items-center justify-center text-[#0D6B4F]">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold text-zinc-900">National Institutional Chapter SPOC Directory</h2>
                  <span className="text-[10px] bg-emerald-50 text-[#0D6B4F] font-bold border border-emerald-200 px-2 py-0.5 rounded-full">
                    {spocs.length} Registered SPOCs
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500">
                  Select any SPOC to filter and manage their institutional innovation roster, student verifications, and grant claims.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search SPOC, college, AISHE..."
                  value={spocSearch}
                  onChange={(e) => setSpocSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs border border-zinc-300 rounded focus:border-[#0D6B4F] focus:outline-hidden bg-white"
                />
              </div>
              {selectedSpocId && selectedSpocId !== "all" && onSelectSpoc && (
                <button
                  onClick={() => onSelectSpoc(null)}
                  className="px-2.5 py-1.5 text-xs font-bold text-zinc-700 bg-white border border-zinc-300 hover:bg-zinc-100 rounded transition-colors whitespace-nowrap cursor-pointer"
                >
                  Reset to All
                </button>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-zinc-100/70 border-b border-zinc-200 text-zinc-600 uppercase text-[10px] tracking-wider font-semibold">
                <tr>
                  <th className="px-4 py-2.5">SPOC Name &amp; Designation</th>
                  <th className="px-4 py-2.5">Affiliated Institution</th>
                  <th className="px-4 py-2.5">AISHE / Code</th>
                  <th className="px-4 py-2.5">Contact Email</th>
                  <th className="px-4 py-2.5">State / Location</th>
                  <th className="px-4 py-2.5 text-center">Candidates</th>
                  <th className="px-4 py-2.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {filteredSpocs.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-6 text-center text-zinc-400 italic">
                      No SPOCs match your search criteria.
                    </td>
                  </tr>
                ) : (
                  filteredSpocs.map((spoc) => {
                    const isSelected = selectedSpocId === spoc.id;
                    return (
                      <tr
                        key={spoc.id}
                        className={`hover:bg-zinc-50/80 transition-colors ${
                          isSelected ? "bg-emerald-50/60 font-semibold" : ""
                        }`}
                      >
                        <td className="px-4 py-2.5">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-emerald-100 text-[#0D6B4F] flex items-center justify-center font-bold text-[11px] shrink-0">
                              {spoc.name ? spoc.name.charAt(0).toUpperCase() : "S"}
                            </div>
                            <div>
                              <div className="font-bold text-zinc-900">{spoc.name || "Appointed SPOC"}</div>
                              {spoc.designation && (
                                <div className="text-[10px] text-zinc-500">{spoc.designation}</div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-2.5 max-w-xs">
                          <div className="font-medium text-zinc-800 truncate" title={spoc.institution}>
                            {spoc.institution}
                          </div>
                        </td>
                        <td className="px-4 py-2.5 font-mono text-[11px] text-zinc-600">
                          {spoc.aishe || "N/A"}
                        </td>
                        <td className="px-4 py-2.5">
                          <div className="flex items-center gap-1.5 text-zinc-700">
                            <Mail className="w-3 h-3 text-zinc-400 shrink-0" />
                            <span className="truncate max-w-[180px]">{spoc.email}</span>
                          </div>
                        </td>
                        <td className="px-4 py-2.5 text-zinc-600">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-zinc-400 shrink-0" />
                            <span>{[spoc.city, spoc.state].filter(Boolean).join(", ") || "India"}</span>
                          </div>
                        </td>
                        <td className="px-4 py-2.5 text-center">
                          <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                            {spoc.studentCount || 0}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-right">
                          <button
                            onClick={() => onSelectSpoc && onSelectSpoc(isSelected ? null : spoc)}
                            className={`px-3 py-1 text-[11px] font-bold rounded transition-all cursor-pointer inline-flex items-center gap-1 ${
                              isSelected
                                ? "bg-[#0D6B4F] text-white shadow-xs"
                                : "bg-emerald-50 text-[#0D6B4F] border border-emerald-300 hover:bg-[#0D6B4F] hover:text-white"
                            }`}
                          >
                            <span>{isSelected ? "Active Chapter" : "Switch Chapter View"}</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {pendingCount > 0 && (
        <div className="bg-[#fffbeb] border border-[#fde68a] px-4 py-3 flex gap-3">
          <AlertCircle className="w-4 h-4 text-[#b45309] shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-[#92400e]">Action Required — {pendingCount} Pending Membership Verification(s)</p>
            <p className="text-[11px] text-[#92400e] mt-0.5">
              Student membership requests are awaiting SPOC approval. Pending verifications affect chapter star-rating compliance audits.
            </p>
          </div>
        </div>
      )}

      <div className="bg-white border border-zinc-200">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-200 bg-zinc-50">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#0D6B4F]" />
            <span className="text-xs font-bold text-zinc-800 uppercase tracking-wider">Central Nodal Desk Directives</span>
          </div>
          <span className="text-[10px] text-zinc-400">Last updated: 16 Jun 2026</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 uppercase text-[10px] tracking-wider">
                <th className="px-4 py-2 font-semibold text-left w-36">Ref No.</th>
                <th className="px-4 py-2 font-semibold text-left w-24">Date</th>
                <th className="px-4 py-2 font-semibold text-left">Directive</th>
                <th className="px-4 py-2 font-semibold text-center w-20">Priority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-zinc-400 italic">
                  No active directives from Central Nodal Desk
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

