"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Filter } from "lucide-react";

export interface Tranche {
  name: string;
  stage: string;
  amount: string;
  note?: string;
  trigger: string;
}

export interface Program {
  id: string;
  title: string;
  subtitle: string;
  category: "student" | "startup" | "institution" | "corporate";
  budget: string;
  duration: string;
  description: string;
  benefits: string[];
  tranches?: Tranche[];
  stages?: { title: string; desc: string }[];
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
    tranches: [
      {
        name: "Tranche 1",
        stage: "Stage 1: Explore → Idea",
        amount: "₹10,000",
        note: "= ₹10,00,000 total allocation",
        trigger: "Released after idea screening and selection"
      },
      {
        name: "Tranche 2",
        stage: "Stage 2: Idea → Ideation",
        amount: "₹25,000 × shortlisted startups",
        note: "based on performance",
        trigger: "Released after concept validation and feasibility approval"
      },
      {
        name: "Tranche 3",
        stage: "Stage 3: Ideation → Prototype",
        amount: "₹75,000 × selected startups",
        trigger: "Released after ideation review and prototype approval"
      },
      {
        name: "Tranche 4",
        stage: "Stage 4: Prototype → Commercialization",
        amount: "₹1,50,000 × top-performing startups",
        trigger: "Released after prototype validation and market readiness"
      },
      {
        name: "Tranche 5",
        stage: "Stage 5: Commercialization → Establishment",
        amount: "₹2,40,000 × final selected startups",
        trigger: "Released after final establishment milestone approval"
      }
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
  {
    id: "internship-ecosystem",
    title: "10-Core Paid Internship Ecosystem",
    subtitle: "Structured national internship framework across all UG sectors",
    category: "student",
    budget: "Paid stipend (Industry & Gov-sponsored)",
    duration: "2 to 6 Months per cohort",
    description: "A structured national framework established across 10 core undergraduate sectors, ensuring that every student in India gains real-time industry exposure and practical, skill-based learning opportunities in verified work environments.",
    benefits: [
      "Covers 10 core sectors including Engineering, AI, Healthcare, Finance, and Social Innovation",
      "Paid, structured, and practical learning experiences with verified corporate and research partners",
      "Direct pathway to make undergraduate students industry-ready before graduation",
    ],
    stages: [
      { title: "Stage 1: Profile Registration & Skill Assessment", desc: "Submit your academic credentials, technical skills, and portfolio on the national portal." },
      { title: "Stage 2: Sector Matching", desc: "Our system matches your skills with projects in one of the 10 core sectors based on company requirements." },
      { title: "Stage 3: Corporate Selection & Onboarding", desc: "Participate in corporate screening rounds/interviews before commencing your paid placement." },
    ]
  },
  {
    id: "mass-startup-funding",
    title: "Mass Student Startup Funding Program",
    subtitle: "Flagship scale-up launchpad for student-led ventures",
    category: "startup",
    budget: "₹5,00,000 seed grant per startup",
    duration: "Milestone-based release",
    description: "A national initiative backed by a ₹1,000 Crore allocation aiming to fund 20,000 student-led startups. Releases equity-free seed grants to remove financial barriers for young innovators.",
    benefits: [
      "Equity-free seed funding of up to ₹5,00,000 per selected startup",
      "Structured 5-Stage release plan tracking idea to commercial establishment",
      "Continuous incubation alignment and business development mentorship",
    ],
    tranches: [
      {
        name: "Tranche 1",
        stage: "Stage 1: Explore → Idea",
        amount: "₹10,000",
        note: "= ₹10,00,000 initial batch allocation",
        trigger: "Released after idea screening and selection"
      },
      {
        name: "Tranche 2",
        stage: "Stage 2: Idea → Ideation",
        amount: "₹25,000 × shortlisted startups",
        note: "based on performance",
        trigger: "Released after concept validation and feasibility approval"
      },
      {
        name: "Tranche 3",
        stage: "Stage 3: Ideation → Prototype",
        amount: "₹75,000 × selected startups",
        trigger: "Released after ideation review and prototype approval"
      },
      {
        name: "Tranche 4",
        stage: "Stage 4: Prototype → Commercialization",
        amount: "₹1,50,000 × top-performing startups",
        trigger: "Released after prototype validation and market readiness"
      },
      {
        name: "Tranche 5",
        stage: "Stage 5: Commercialization → Establishment",
        amount: "₹2,40,000 × final selected startups",
        trigger: "Released after final establishment milestone approval"
      }
    ],
    stages: [
      { title: "Stage 1: Ideation Screening & Selection", desc: "Submit your initial startup proposal. Shortlisted projects receive Tranche 1 funding." },
      { title: "Stage 2: Feasibility & Concept Validation", desc: "Audit and validate the concept feasibility with a domain expert panel." },
      { title: "Stage 3: Prototype & Market Validation", desc: "Design a functional product prototype and validate it through pilot customer testing." },
      { title: "Stage 4: Commercial Registration & Launch", desc: "Incorporate your student business entity and register intellectual property." },
    ]
  },
  {
    id: "institutional-development-fund",
    title: "Institutional Development & Incubation Fund",
    subtitle: "Infrastructure grants to build centers of innovation excellence",
    category: "institution",
    budget: "₹20,00,000 to ₹50,00,000 per institution",
    duration: "24 Months rollout support",
    description: "A parallel ₹1,000 Crore national infrastructure fund allocated to technical and non-technical educational institutions to build incubation centers, innovation labs, and entrepreneurship cells.",
    benefits: [
      "Dedicated capital grants ranging from ₹20 Lakhs to ₹50 Lakhs per institution",
      "Funding strictly allocated for incubation centers, innovation labs, and startup spaces",
      "Full integration with the nationwide Innovation India Council database and mentors",
    ],
    stages: [
      { title: "Stage 1: Proposal Submission & Audit", desc: "Submit detailed campus infrastructure maps, faculty resources, and ED Cell proposals." },
      { title: "Stage 2: Technical Committee Evaluation", desc: "Joint audit by the Innovation India Council and state coordinator liaison desks." },
      { title: "Stage 3: First Installment & Lab Set Up", desc: "Disbursement of initial capital grants for purchasing machinery, 3D printers, and CNC mills." },
      { title: "Stage 4: Annual Audit & Incubation Launch", desc: "Verification of operational labs before releasing subsequent milestone support." },
    ]
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
