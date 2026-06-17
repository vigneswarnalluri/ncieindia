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
    id: "smart-india-hackathon",
    title: "Smart India Hackathon (SIH)",
    subtitle: "World's largest open innovation platform for students",
    category: "student",
    budget: "Prize pool ₹1,00,000+ per team",
    duration: "36-hour hackathon format",
    description: "SIH is a nationwide initiative to provide students a platform to solve pressing problems faced by government ministries, departments, PSUs, and industries. It fosters a culture of product innovation and problem-solving mindset.",
    benefits: [
      "Cash prizes of ₹1 Lakh+ for winning teams at each nodal centre",
      "Direct interface with problem statement owners from Central Ministries & PSUs",
      "Winning solutions considered for pilot deployment by respective ministries",
    ],
    stages: [
      { title: "Stage 1: Problem Statement Registration", desc: "Ministries, PSUs, and industries submit problem statements on the SIH portal. Teams from IIC-registered institutions apply." },
      { title: "Stage 2: Idea Submission & Screening", desc: "Teams submit initial solutions. Shortlisted teams invited to participate in the 36-hour grand finale hackathon." },
      { title: "Stage 3: Grand Finale", desc: "Teams build and present working solutions to a jury at nodal centres. Winners receive cash prizes and recognition." },
    ]
  },
  {
    id: "iic-network",
    title: "Institution's Innovation Council (IIC)",
    subtitle: "Pan-India institutional innovation network — 16,000+ HEIs",
    category: "institution",
    budget: "Activity-based grants & incentives",
    duration: "Annual cycle (IIC 6.0: 2024-25)",
    description: "IICs are established within Higher Education Institutions in coordination with AICTE to systematically foster innovation and startup activities. 16,000+ IICs are active and rated annually on a 1–5 star system.",
    benefits: [
      "Annual star-rating (1–5 stars) with rewards for top-performing IICs",
      "Access to MoE Innovation Cell resources, toolkits, and mentor networks",
      "Preferential eligibility for SIH, KAPILA, YUKTI, and IDE Bootcamp programs",
    ],
    stages: [
      { title: "Step 1: IIC Registration", desc: "Institution nominates a SPOC and registers on iic.mic.gov.in with complete institutional details." },
      { title: "Step 2: Annual Activity Calendar", desc: "IIC conducts mandatory activities — idea competitions, workshops, bootcamps, hackathons — and earns activity points." },
      { title: "Step 3: Annual Star Rating", desc: "MoE evaluates IIC performance and assigns 1–5 star rating. Top-rated IICs receive recognition and preferential grant access." },
    ]
  },
  {
    id: "kapila",
    title: "KAPILA — Kalam Program for IP Literacy",
    subtitle: "IP awareness & patent filing support for HEIs",
    category: "student",
    budget: "Patent filing fee reimbursement",
    duration: "Year-round (quarterly drives)",
    description: "KAPILA (Kalam Program for IP Literacy and Awareness) is a national initiative to spread awareness about Intellectual Property rights and support patent filing within Higher Education Institutions. Faculty and students are trained on IP basics and provided filing support.",
    benefits: [
      "IP literacy workshops and training sessions in IIC institutions",
      "Patent filing fee reimbursement for faculty and student innovators",
      "Access to national patent data and prior art search tools",
    ],
    stages: [
      { title: "Step 1: IP Awareness Workshop", desc: "KAPILA-certified trainer conducts IP basics, patent search, and filing process workshop at the institution." },
      { title: "Step 2: Innovation Disclosure", desc: "Faculty or student files a formal invention disclosure form; screened for patentability by IP expert panel." },
      { title: "Step 3: Patent Filing Support", desc: "Selected innovations receive fee reimbursement and expert assistance through the patent filing process." },
    ]
  },
  {
    id: "yukti",
    title: "YUKTI National Innovation Repository",
    subtitle: "National database of academic innovations & startups",
    category: "startup",
    budget: "Platform access + mentoring support",
    duration: "Continuous (YUKTI 3.0 live)",
    description: "YUKTI (Young India Combating COVID with Knowledge, Technology and Innovation) is a national digital repository to scout, register, and commercially scale innovations and startups from HEIs. 1,00,000+ innovations registered; 10,000+ startups mentored.",
    benefits: [
      "National visibility for registered innovations and student startups",
      "Connect with investors, incubators, and industry partners via YUKTI portal",
      "State-wise innovation leaderboard and IIC performance benchmarking",
    ],
  },
  {
    id: "ide-bootcamp",
    title: "IDE Bootcamp — Innovation, Design & Entrepreneurship",
    subtitle: "Residential bootcamps to nurture student innovators",
    category: "student",
    budget: "Fully funded (travel & accommodation covered)",
    duration: "5–7 Day residential bootcamps",
    description: "IDE Bootcamps are residential immersive programs designed to nurture early-stage student innovators. Bootcamps are held at IITs, IIMs, and partner institutions. Participants receive design thinking, lean startup, and business modelling mentoring.",
    benefits: [
      "Fully funded residential experience at IITs / IIMs (travel + stay)",
      "Intensive mentoring by industry experts, VCs, and serial entrepreneurs",
      "Top bootcamp teams gain direct seed funding access and incubation support",
    ],
    stages: [
      { title: "Stage 1: Application & Screening", desc: "Students apply via IIC portal with a brief innovation pitch. Shortlisted candidates receive bootcamp invitation." },
      { title: "Stage 2: Residential Bootcamp", desc: "5–7 day immersive program: design thinking, prototyping, business modelling, and investor pitch workshops." },
      { title: "Stage 3: Demo Day", desc: "Teams present to a jury of investors and industry leaders. Top teams selected for incubation and seed support." },
    ]
  },
  {
    id: "udyamotsav",
    title: "Udyamotsav & NISP Implementation",
    subtitle: "National startup festival & HEI startup policy mandate",
    category: "institution",
    budget: "Institution grants under NISP framework",
    duration: "Annual event + ongoing NISP mandate",
    description: "Udyamotsav is an annual national event to celebrate, support, and promote startups from academic institutions. The National Innovation and Start-up Policy (NISP) mandates all HEIs to create structural startup support including pre-incubation cells, IP units, and seed fund access.",
    benefits: [
      "NISP compliance unlocks grant eligibility for IIC institutions",
      "Annual Udyamotsav provides national showcase platform for student startups",
      "Structural support mandate: pre-incubation cells, IP units, and seed fund access",
    ],
    stages: [
      { title: "Step 1: NISP Adoption", desc: "Institution formally adopts and notifies the National Innovation & Start-up Policy (NISP) for its students and faculty." },
      { title: "Step 2: Infrastructure Setup", desc: "HEI establishes pre-incubation facility, IP Cell, and Entrepreneurship Development Cell per NISP guidelines." },
      { title: "Step 3: Udyamotsav Participation", desc: "Registered student startups participate in annual Udyamotsav showcase, gaining visibility and investor connections." },
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
