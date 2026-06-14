"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Filter } from "lucide-react";

export interface Program {
  id: string;
  title: string;
  subtitle: string;
  category: "student" | "startup" | "institution" | "corporate";
  budget: string;
  duration: string;
  description: string;
  benefits: string[];
}

export const PROGRAMS_DATA: Program[] = [
  {
    id: "nidhi-cis",
    title: "NIDHI College Innovation Scheme",
    subtitle: "Prototyping grants for collegiate projects",
    category: "student",
    budget: "Up to ₹5,00,000 per team",
    duration: "12 Months support",
    description: "Supports engineering, science, and design students to convert their final-year projects or research papers into functional hardware/software prototypes.",
    benefits: [
      "Milestone-based prototyping grant of up to ₹5 Lakhs",
      "Assigned industry mentor & patent validation services",
      "Direct entry to regional bootcamps and startup clinics",
    ],
  },
  {
    id: "seed-pipeline",
    title: "NCIE Seed Pipeline Program",
    subtitle: "Early equity-free capital for launch-ready student ventures",
    category: "startup",
    budget: "Up to ₹25,00,000 seed grant",
    duration: "6 Months cohort",
    description: "Designed for incorporated student ventures with a validated MVP who need growth runway to test market fit and scale operations.",
    benefits: [
      "Equity-free seed funding of up to ₹25 Lakhs",
      "Incubation alignment with A-grade regional tech parks",
      "Direct showcase to venture capitalists and angel networks",
    ],
  },
  {
    id: "makerspace-empowerment",
    title: "Makerspace Empowerment Grant",
    subtitle: "Funding for academic labs to establish open fabrication shops",
    category: "institution",
    budget: "Up to ₹50,00,000 institutional support",
    duration: "2 Years rollout support",
    description: "Funds academic institutions (colleges/universities) to establish modern fabrication shops and makerspaces accessible to all students.",
    benefits: [
      "Capital grants for buying 3D printers, CNC mills, and testing kits",
      "Operational grant for lab technicians and student workshops",
      "Integration with NCIE nationwide innovation database",
    ],
  },
  {
    id: "corporate-csr",
    title: "Corporate-CSR Innovation Bridges",
    subtitle: "Industry-sponsored thematic tracks with corporate POC alignment",
    category: "corporate",
    budget: "Sponsored by corporate partners",
    duration: "Thematic cohorts",
    description: "Connects large corporate sponsors with student groups working on specific industrial challenges in energy, agritech, and AI.",
    benefits: [
      "Access to corporate data sets, hardware nodes, and APIs",
      "Paid proof-of-concept (POC) trials with potential vendor onboarding",
      "CSR-sponsored funding allocations and lab grants",
    ],
  },
];

const CATEGORIES = [
  { id: "all", name: "All Schemes", icon: Filter },
  { id: "student", name: "Student Programs" },
  { id: "startup", name: "Startup Support" },
  { id: "institution", name: "Institutions" },
  { id: "corporate", name: "Corporate CSR" },
];

export default function ProgramsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredPrograms =
    activeCategory === "all"
      ? PROGRAMS_DATA
      : PROGRAMS_DATA.filter((p) => p.category === activeCategory);

  return (
    <div className="flex-1 bg-[#F9FAFB] pb-16">
      
      {/* Page Header (Gov/Institutional style) */}
      <div className="relative bg-[#0A5D45] py-16 text-white border-b border-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs md:text-sm text-emerald-100 font-semibold mb-2 flex items-center gap-1.5 uppercase tracking-wider">
            <Link href="/" className="hover:underline hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/60">Schemes Directory</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Central Schemes &amp; Programs
          </h1>
          <p className="text-emerald-100/80 text-xs sm:text-sm max-w-3xl mt-3 leading-relaxed">
            Apex registry of active central schemes, capital prototyping pipelines, and maker laboratory empowerment grants verified under NCIE India policy rules.
          </p>
        </div>
      </div>

      {/* Filters Segment (Flat tabs) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-[#074733] border border-[#0d6b4f]/25 rounded-none shadow-md overflow-hidden">
          <div className="flex items-center gap-2 md:gap-4 overflow-x-auto whitespace-nowrap scrollbar-none px-4 py-3">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-4.5 py-2 text-xs md:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive 
                      ? "bg-[#0A5D45] text-white font-bold border-b-2 border-accent" 
                      : "text-emerald-100/70 hover:text-white"
                  }`}
                >
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Programs Index Table */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-white border border-zinc-200 p-6 sm:p-8">
          
          <div className="flex items-center gap-2 pb-4 mb-6 border-b border-zinc-200 border-l-4 border-primary pl-3">
            <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900">
              NCIE Registry Programs Directory
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-zinc-200">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-200 text-xs">
                  <th className="px-4 py-3 font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200 w-16 text-center">S.No.</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200 w-64">Scheme Title / Details</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200 w-36">Category</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200 w-48">Financial Allocation</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200 w-36">Duration</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200">Program Deliverables</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wider text-zinc-700 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredPrograms.map((program, idx) => (
                  <tr key={program.id} className="border-b border-zinc-200 last:border-b-0 hover:bg-zinc-50/50 odd:bg-white even:bg-zinc-50/20 text-xs">
                    <td className="px-4 py-4 text-center font-mono font-bold text-zinc-500 border-r border-zinc-200">0{idx + 1}</td>
                    <td className="px-4 py-4 border-r border-zinc-200">
                      <div className="font-bold text-zinc-900 leading-snug">{program.title}</div>
                      <div className="text-[10px] text-zinc-400 mt-1 uppercase font-semibold tracking-wider font-mono">{program.subtitle}</div>
                      <p className="text-[11px] text-zinc-500 mt-2 leading-relaxed text-justify pr-2">{program.description}</p>
                    </td>
                    <td className="px-4 py-4 border-r border-zinc-200 font-mono font-bold uppercase text-zinc-500">
                      <span className="bg-zinc-50 border border-zinc-200 px-2 py-0.5 rounded">
                        {program.category}
                      </span>
                    </td>
                    <td className="px-4 py-4 border-r border-zinc-200 font-bold text-primary font-sans leading-snug">{program.budget}</td>
                    <td className="px-4 py-4 border-r border-zinc-200 font-mono font-medium text-zinc-500">{program.duration}</td>
                    <td className="px-4 py-4 border-r border-zinc-200 text-zinc-650 leading-relaxed">
                      <ul className="list-disc list-inside space-y-1">
                        {program.benefits.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-4 py-4 text-center space-y-2">
                      <Link href={`/programs/${program.id}`} className="block">
                        <button className="w-full border border-zinc-200 hover:bg-zinc-50 text-zinc-700 font-bold text-[10px] uppercase px-3 py-1.5 cursor-pointer text-center">
                          Details
                        </button>
                      </Link>
                      <Link href="/join" className="block">
                        <button className="w-full bg-[#0D6B4F] hover:bg-[#074733] text-white font-bold text-[10px] uppercase px-3 py-1.5 cursor-pointer text-center inline-flex items-center justify-center gap-1">
                          <span>Apply</span>
                          <ArrowRight className="w-2.5 h-2.5" />
                        </button>
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
