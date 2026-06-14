"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Filter, FileText } from "lucide-react";
import ApplyNowButton from "@/components/ApplyNowButton";

interface Opportunity {
  id: string;
  title: string;
  type: "internship" | "fellowship" | "grant";
  company: string;
  location: string;
  duration: string;
  compensation: string;
  deadline: string;
  description: string;
}

const OPPORTUNITIES_DATA: Opportunity[] = [
  {
    id: "ncie-fellowship-2026",
    title: "Centenary Research Fellowship",
    type: "fellowship",
    company: "NCIE National Research Council",
    location: "Hybrid / Delhi Desk",
    duration: "12 Months",
    compensation: "₹45,000 / month stipend",
    deadline: "July 15, 2026",
    description: "Supports PG research fellows working on scalable deep-tech applications in quantum computing, agritech sensors, and renewable systems.",
  },
  {
    id: "deeptech-internship-01",
    title: "Ecosystem Management Intern",
    type: "internship",
    company: "NCIE Startup Hubs",
    location: "Remote",
    duration: "3 Months",
    compensation: "₹15,000 / month stipend",
    deadline: "June 30, 2026",
    description: "Gain experience in startup operations, regional chapter coordination, and database indexing for student projects.",
  },
  {
    id: "micro-prototyping-grant",
    title: "Hardware Prototyping Soft Grant",
    type: "grant",
    company: "NCIE Innovation Desk",
    location: "Institutional Lab",
    duration: "One-time grant",
    compensation: "Up to ₹1,50,000",
    deadline: "Rolling applications",
    description: "Micro-funding for raw material purchases, PCB fabrication, and CNC machining trials for early-stage physical proof of concepts.",
  },
  {
    id: "climate-fellowship",
    title: "Sustainable Infrastructure Fellowship",
    type: "fellowship",
    company: "NCIE Climate Coalition",
    location: "On-site / Bangalore Hub",
    duration: "6 Months",
    compensation: "₹30,000 / month stipend",
    deadline: "August 10, 2026",
    description: "For student innovators building solutions for rural water filtration, bio-gas microgrids, and local waste processing systems.",
  },
];

export default function OpportunitiesPage() {
  const [activeType, setActiveType] = useState<string>("all");

  const filteredOpps =
    activeType === "all"
      ? OPPORTUNITIES_DATA
      : OPPORTUNITIES_DATA.filter((o) => o.type === activeType);

  return (
    <div className="flex-1 bg-[#F9FAFB] pb-16">
      
      {/* Page Header (Gov/Institutional style) */}
      <div className="relative bg-[#0A5D45] py-16 text-white border-b border-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs md:text-sm text-emerald-100 font-semibold mb-2 flex items-center gap-1.5 uppercase tracking-wider">
            <Link href="/" className="hover:underline hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/60">Registry Opportunities</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Innovation Opportunities
          </h1>
          <p className="text-emerald-100/80 text-xs sm:text-sm max-w-3xl mt-3 leading-relaxed">
            Central registry of competitive fellowships, paid startup internships, and hardware prototyping soft grants active within collegiate networks.
          </p>
        </div>
      </div>

      {/* Filters Segment (Flat tabs) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-[#074733] border border-[#0d6b4f]/25 rounded-none shadow-md overflow-hidden">
          <div className="flex items-center gap-2 md:gap-4 overflow-x-auto whitespace-nowrap scrollbar-none px-4 py-3">
            {[
              { id: "all", name: "All Schemes", icon: Filter },
              { id: "internship", name: "Internships" },
              { id: "fellowship", name: "Fellowships" },
              { id: "grant", name: "Soft Grants" },
            ].map((type) => {
              const isActive = activeType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => setActiveType(type.id)}
                  className={`flex items-center gap-1.5 px-4.5 py-2 text-xs md:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive 
                      ? "bg-[#0A5D45] text-white font-bold border-b-2 border-accent" 
                      : "text-emerald-100/70 hover:text-white"
                  }`}
                >
                  <span>{type.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Opportunities Table Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-white border border-zinc-200 p-6 sm:p-8">
          
          <div className="flex items-center gap-2 pb-4 mb-6 border-b border-zinc-200 border-l-4 border-primary pl-3">
            <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900">
              Active Placements & Grants Index
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-zinc-200">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-200 text-xs">
                  <th className="px-4 py-3 font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200 w-16 text-center">S.No.</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200 w-64">Opportunity / Scope</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200 w-52">Liaison Sponsor</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200 w-48">Scheme Parameters</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200 w-44">Compensation / Support</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200 w-40">Deadline</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wider text-zinc-700 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredOpps.map((opp, idx) => (
                  <tr key={opp.id} className="border-b border-zinc-200 last:border-b-0 hover:bg-zinc-50/50 odd:bg-white even:bg-zinc-50/20 text-xs">
                    <td className="px-4 py-4 text-center font-mono font-bold text-zinc-550 border-r border-zinc-200">0{idx + 1}</td>
                    <td className="px-4 py-4 border-r border-zinc-200">
                      <div className="font-bold text-zinc-900 flex items-center gap-1.5">
                        <span className="text-[9px] bg-zinc-100 border border-zinc-200 text-zinc-600 px-1.5 py-0.5 uppercase tracking-wide">
                          {opp.type}
                        </span>
                        <span>{opp.title}</span>
                      </div>
                      <p className="text-[11px] text-zinc-500 mt-2 leading-relaxed text-justify pr-2">{opp.description}</p>
                    </td>
                    <td className="px-4 py-4 border-r border-zinc-200 font-bold text-zinc-800">{opp.company}</td>
                    <td className="px-4 py-4 border-r border-zinc-200 font-medium">
                      <div className="text-zinc-700">{opp.location}</div>
                      <div className="text-[10px] text-zinc-400 font-mono mt-0.5">{opp.duration}</div>
                    </td>
                    <td className="px-4 py-4 border-r border-zinc-200 font-mono font-bold text-[#0D6B4F]">{opp.compensation}</td>
                    <td className="px-4 py-4 border-r border-zinc-200 text-zinc-500 font-bold font-mono">{opp.deadline}</td>
                    <td className="px-4 py-4 text-center">
                      <Link href="/join">
                        <ApplyNowButton icon={ArrowRight} className="bg-primary hover:bg-primary-dark text-white font-bold text-[10px] uppercase px-4 py-2 cursor-pointer w-full text-center inline-block" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}
