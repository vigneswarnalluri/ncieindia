"use client";

import React from "react";
import Link from "next/link";
import { Target, ShieldCheck } from "lucide-react";

interface Milestone {
  year: string;
  title: string;
  phase: string;
  description: string;
  targets: string[];
  strategy: string;
}

const MILESTONES_DATA: Milestone[] = [
  {
    year: "2027",
    title: "Foundations & Networks",
    phase: "Phase 1: Institutional Funneling",
    description: "Setting up deep infrastructure and regional frameworks. Deploying localized College Chapters in every state to establish the structural baseline.",
    strategy: "Establish regional accreditation desks, release standardized maker chapter manuals, and initiate college innovation surveys.",
    targets: [
      "1,000+ Accredited Collegiate Chapters",
      "50,000+ Student innovators cataloged in central database",
      "Establishment of 5 Regional Evaluation Desks (Zones)",
    ],
  },
  {
    year: "2032",
    title: "Deep-Tech Integration",
    phase: "Phase 2: Laboratory Translation",
    description: "Bridging the gap between laboratory patents and incorporated products. Aligning engineering/science final-year research with venture capital.",
    strategy: "Integrate college labs with state technology parks, establish CSR funding linkages, and introduce IP strategy bootcamps.",
    targets: [
      "10,000+ Prototyping grants disbursed",
      "5,000+ Patent applications filed via student research",
      "Liaison with 100+ Corporate CSR Innovation funds",
    ],
  },
  {
    year: "2040",
    title: "Global Leadership",
    phase: "Phase 3: Cross-Border Commercialization",
    description: "Positioning Indian student-led ventures as key players on the global stage. Establishing international acceleration tracks.",
    strategy: "Co-host bilateral innovation challenges, set up global incubators, and create matching funds with international venture syndicates.",
    targets: [
      "2,500+ Ventures scaled to seed/series funding rounds",
      "Global showcase pavilions in key technical hubs",
      "Accreditation and validation networks with international colleges",
    ],
  },
  {
    year: "2047",
    title: "Viksit Bharat (Centenary)",
    phase: "Phase 4: Sovereign Technology Leadership",
    description: "Achieving a fully self-reliant, innovation-led economy powered by a nationwide network of student founders by the Centenary of Independence.",
    strategy: "Sustain self-funding regional ecosystems, deploy open-source hardware nodes, and embed R&D incentives in academic curriculums.",
    targets: [
      "Sustained ecosystem driving 10%+ of national technology GDP",
      "Accredited chapters in every STEM college nationwide",
      "Complete technology self-reliance in energy, AI, and agritech nodes",
    ],
  },
];

export default function Vision2047Page() {
  return (
    <div className="flex-1 bg-[#F9FAFB] pb-16">
      
      {/* Page Header (Gov/Institutional style) */}
      <div className="relative bg-[#0A5D45] py-16 text-white border-b border-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs md:text-sm text-emerald-100 font-semibold mb-2 flex items-center gap-1.5 uppercase tracking-wider">
            <Link href="/" className="hover:underline hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/60">Vision 2047 Centenary Roadmap</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            NCIE India Vision 2047
          </h1>
          <p className="text-emerald-100/80 text-xs sm:text-sm max-w-3xl mt-3 leading-relaxed">
            National roadmap aligning technical chapters and startup incubations with the centenary objectives of Viksit Bharat.
          </p>
        </div>
      </div>

      {/* Milestones Registry Table */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-12">
        <div className="bg-white border border-zinc-200 p-6 sm:p-8 space-y-6">
          
          <div className="flex items-center gap-2 pb-4 border-b border-zinc-200 border-l-4 border-primary pl-3">
            <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900">
              Centenary Milestones &amp; strategic Targets
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-zinc-200">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-200 text-xs">
                  <th className="px-4 py-3 font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200 w-24 text-center">Centenary Year</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200 w-52">Milestone / Scope</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wider text-zinc-700 border-r border-zinc-200 w-72">Strategic Focus &amp; Action Plan</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wider text-zinc-700">Key Deliverables &amp; Targets</th>
                </tr>
              </thead>
              <tbody>
                {MILESTONES_DATA.map((milestone, idx) => (
                  <tr key={idx} className="border-b border-zinc-200 last:border-b-0 hover:bg-zinc-50/50 odd:bg-white even:bg-zinc-50/20 text-xs">
                    <td className="px-4 py-5 font-mono font-bold text-center border-r border-zinc-200 text-accent-dark bg-zinc-50/20 text-sm">
                      {milestone.year}
                    </td>
                    <td className="px-4 py-5 border-r border-zinc-200">
                      <div className="font-bold text-zinc-900 leading-snug">{milestone.title}</div>
                      <div className="text-[10px] text-zinc-450 mt-1 uppercase font-semibold font-mono">{milestone.phase}</div>
                      <p className="text-[11px] text-zinc-500 mt-2 leading-relaxed text-justify pr-2">{milestone.description}</p>
                    </td>
                    <td className="px-4 py-5 border-r border-zinc-200 text-zinc-650 leading-relaxed text-justify pr-2">
                      <div className="font-semibold text-zinc-750 mb-1">Methodology:</div>
                      {milestone.strategy}
                    </td>
                    <td className="px-4 py-5 text-zinc-700 font-medium">
                      <ul className="space-y-2">
                        {milestone.targets.map((tgt, i) => (
                          <li key={i} className="flex items-start gap-1.5 leading-relaxed">
                            <ShieldCheck className="w-4 h-4 text-[#0D6B4F] shrink-0 mt-0.5" />
                            <span>{tgt}</span>
                          </li>
                        ))}
                      </ul>
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
