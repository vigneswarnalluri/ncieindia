"use client";

import React from "react";
import Link from "next/link";
import { Landmark, Users, ArrowRight, CheckSquare } from "lucide-react";

export default function ChaptersPage() {
  return (
    <div className="flex-1 bg-[#F9FAFB] pb-16">
      
      {/* Page Header (Gov/Institutional style) */}
      <div className="relative bg-[#0A5D45] py-16 text-white border-b border-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs md:text-sm text-emerald-100 font-semibold mb-2 flex items-center gap-1.5 uppercase tracking-wider">
            <Link href="/" className="hover:underline hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/60">Chapters Affiliation</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            State &amp; College Chapters
          </h1>
          <p className="text-emerald-100/80 text-xs sm:text-sm max-w-3xl mt-3 leading-relaxed">
            Central coordination guidelines and structural requirements for academic chapters and state-level verification desks.
          </p>
        </div>
      </div>

      {/* Structured Comparison Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-12">
        <div className="bg-white border border-zinc-200 p-6 sm:p-8 space-y-8">
          
          <div className="flex items-center gap-2 pb-4 border-b border-zinc-200 border-l-4 border-primary pl-3">
            <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900">
              Accreditation Framework &amp; Registry
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 divide-y md:divide-y-0 md:divide-x divide-zinc-200">
            
            {/* State Chapters */}
            <div className="space-y-6 pr-0 md:pr-6">
              <div className="flex items-center gap-3 border-b border-zinc-150 pb-3">
                <Landmark className="w-6 h-6 text-accent-dark" />
                <h3 className="text-lg font-bold text-zinc-900 uppercase tracking-wide">State Chapters</h3>
              </div>
              <p className="text-xs sm:text-sm text-zinc-650 leading-relaxed text-justify">
                Regional policy nodes aligned with state technical universities and local startup boards. State Chapters coordinate regional pitch panels, monitor innovation indices, and interface with state authorities.
              </p>
              
              <div className="space-y-3 pt-2">
                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Operational Mandates:</span>
                {[
                  "Liaison with state-level technical education boards",
                  "Coordination of regional pitch panels & soft loan access",
                  "State-level innovation index tracking & awards",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-700">
                    <CheckSquare className="w-4 h-4 text-accent-dark mt-0.5 shrink-0" />
                    <span className="leading-normal">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link href="/join">
                  <button className="border border-zinc-350 hover:bg-zinc-50 text-zinc-700 font-bold text-xs uppercase tracking-wider px-5 py-2.5 cursor-pointer w-full text-center">
                    Contact State Coordinator
                  </button>
                </Link>
              </div>
            </div>

            {/* College Chapters */}
            <div className="space-y-6 pt-8 md:pt-0 pl-0 md:pl-8">
              <div className="flex items-center gap-3 border-b border-zinc-150 pb-3">
                <Users className="w-6 h-6 text-[#0D6B4F]" />
                <h3 className="text-lg font-bold text-zinc-900 uppercase tracking-wide">College Chapters</h3>
              </div>
              <p className="text-xs sm:text-sm text-zinc-650 leading-relaxed text-justify">
                Collegiate clubs and maker-networks run directly by students and faculty leads on campuses. College Chapters act as the local incubation funnel, cataloging student proofs of concept.
              </p>
              
              <div className="space-y-3 pt-2">
                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Collegiate Deliverables:</span>
                {[
                  "Official NCIE accreditation and student club guidelines",
                  "Direct access to prototyping grants (NIDHI CIS)",
                  "Ecosystem mentorship alignments & ambassador programs",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-700">
                    <CheckSquare className="w-4 h-4 text-[#0D6B4F] mt-0.5 shrink-0" />
                    <span className="leading-normal">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link href="/join">
                  <button className="bg-[#0D6B4F] hover:bg-[#074733] text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 cursor-pointer w-full text-center inline-flex items-center justify-center gap-1">
                    <span>Apply to Start College Chapter</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </Link>
              </div>
            </div>

          </div>

        </div>

        {/* Chapters FAQs Section */}
        <div className="bg-white border border-zinc-200 p-6 sm:p-8 mt-8 space-y-6">
          <h2 className="text-base font-bold text-zinc-900 uppercase tracking-wider text-center border-b border-zinc-100 pb-3">
            Accreditation &amp; Establishment Guidelines
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm text-zinc-600">
            <div className="space-y-2">
              <h4 className="font-bold text-zinc-900 uppercase tracking-wide border-l-2 border-accent-dark pl-2">
                Who can apply to start a College Chapter?
              </h4>
              <p className="leading-relaxed text-justify pl-2">
                Any accredited technical institute, university, or college in India. The application must be led by a faculty sponsor (e.g. Dean of R&D or Innovation Lead) in collaboration with a student leadership board.
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-bold text-zinc-900 uppercase tracking-wide border-l-2 border-accent-dark pl-2">
                Are there any fees involved?
              </h4>
              <p className="leading-relaxed text-justify pl-2">
                No. Affiliating with NCIE India as an accredited College Chapter is completely free. Support resources, toolkits, and event guidelines are distributed at no cost.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
