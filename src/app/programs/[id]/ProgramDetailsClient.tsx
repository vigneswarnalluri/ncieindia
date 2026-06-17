"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, CheckCircle, Calendar, ShieldCheck, Mail, Users, ArrowRight, Coins } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { PROGRAMS_DATA, Program } from "../ProgramsClient";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ProgramDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProgram() {
      try {
        const { data, error } = await supabase
          .from("programs")
          .select("*")
          .eq("id", id)
          .single();
        
        if (error) throw error;
        if (data) {
          setProgram(data);
        } else {
          const fallback = PROGRAMS_DATA.find((p) => p.id === id);
          setProgram(fallback || null);
        }
      } catch (err) {
        console.warn("Supabase single program fetch failed, using fallback:", err);
        const fallback = PROGRAMS_DATA.find((p) => p.id === id);
        setProgram(fallback || null);
      } finally {
        setLoading(false);
      }
    }
    loadProgram();
  }, [id]);

  if (loading) {
    return (
      <div className="flex-1 bg-white flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="w-8 h-8 border-4 border-[#0D6B4F]/30 border-t-[#0D6B4F] rounded-full animate-spin mx-auto mb-2" />
        <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Loading Program Details...</p>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="flex-1 bg-white flex flex-col items-center justify-center py-20 px-4 text-center">
        <h1 className="text-2xl font-bold text-zinc-900 mb-2">Program Not Found</h1>
        <p className="text-zinc-500 mb-6">The program scheme you are looking for does not exist or has closed.</p>
        <Link href="/programs">
          <Button variant="primary">
            Back to Programs
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white relative py-16 md:py-24">
      <div className="absolute inset-0 bg-dot-pattern opacity-60 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Back navigation */}
        <Link
          href="/programs"
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-primary transition-colors mb-8 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Programs</span>
        </Link>

        {/* Heading Block */}
        <div className="space-y-4 mb-10 pb-8 border-b border-zinc-100">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="mint" className="capitalize">
              {program.category} Category
            </Badge>
            <Badge variant="outline">{program.duration}</Badge>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 font-sans leading-tight">
            {program.title}
          </h1>
          
          <p className="text-lg text-primary font-bold font-mono">
            {program.budget}
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-zinc-900">Program Overview</h2>
              <p className="text-sm sm:text-base text-zinc-500 leading-relaxed">
                {program.description} The National Council for Innovation and Entrepreneurship provides key operational platforms to expedite collegiate applications. This program coordinates with state coordinators to establish high-throughput mentorship models.
              </p>
              <p className="text-sm sm:text-base text-zinc-500 leading-relaxed">
                Applicants must be citizens of India, affiliated with registered educational institutions or accredited incubation centers, and present verified Proof of Concept (POC) documentation.
              </p>
            </div>

            {/* Benefits Block */}
            <div className="space-y-4 bg-zinc-50/50 border border-zinc-100 rounded-2xl p-6">
              <h3 className="text-base font-bold text-zinc-900 uppercase tracking-wider text-zinc-400">Core Benefits</h3>
              <div className="space-y-3">
                {program.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-zinc-700">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Funding Tranches Block */}
            {program.tranches && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
                  <Coins className="w-5 h-5 text-primary" />
                  <span>Milestone Disbursement Plan</span>
                  <span className="text-xs bg-[#0D6B4F]/10 text-primary px-2.5 py-1 rounded-full font-semibold uppercase tracking-wider">
                    {program.tranches.length} Tranches
                  </span>
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {program.tranches.map((tranche, idx) => (
                    <div 
                      key={idx} 
                      className="group relative border border-zinc-150 rounded-xl p-5 hover:border-primary/30 hover:bg-zinc-50/40 transition-all duration-300 shadow-sm hover:shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                    >
                      {/* Left: Stage Title & Release Trigger */}
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase font-mono">
                            {tranche.name}
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 group-hover:bg-primary transition-colors" />
                          <span className="text-xs font-bold text-zinc-850 uppercase tracking-wide">
                            {tranche.stage}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-500 font-medium leading-relaxed">
                          {tranche.trigger}
                        </p>
                      </div>

                      {/* Right: Amount Badge */}
                      <div className="flex flex-col items-start sm:items-end justify-center bg-zinc-50 group-hover:bg-[#0D6B4F]/5 border border-zinc-200/50 group-hover:border-primary/20 rounded-xl px-4.5 py-3 transition-colors shrink-0 min-w-[150px]">
                        <span className="text-sm font-extrabold text-primary font-sans leading-none">
                          {tranche.amount.split(" × ")[0]}
                        </span>
                        {tranche.amount.includes(" × ") && (
                          <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wide mt-1">
                            × {tranche.amount.split(" × ")[1]}
                          </span>
                        )}
                        {tranche.note && (
                          <span className="text-[9px] font-medium text-zinc-450 italic mt-0.5">
                            {tranche.note}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Process Steps */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-zinc-900">Evaluation Process</h2>
              <div className="space-y-4 relative pl-4 border-l-2 border-primary/20">
                {(program.stages || [
                  { title: "Stage 1: Institutional Nomination", desc: "Your college chapter coordinator reviews your blueprint and submits a direct nomination." },
                  { title: "Stage 2: Technical Screening", desc: "The NCIE Expert Committee audits the proof-of-concept for commercial viability and depth." },
                  { title: "Stage 3: Pitch and Selection", desc: "Selected finalists present their prototypes online before seed disbursements are approved." },
                ]).map((step, idx) => (
                  <div key={idx} className="relative group">
                    <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full bg-primary border-2 border-white shadow-sm" />
                    <h4 className="text-sm font-bold text-zinc-900">{step.title}</h4>
                    <p className="text-xs text-zinc-500 mt-1">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-zinc-900">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {[
                  { q: "Is equity taken in seed grant schemes?", a: "No, all student grants provided under the NIDHI CIS and Seed Pipeline programs are entirely equity-free." },
                  { q: "Can we apply without an established college chapter?", a: "Yes, you can register as an independent student member and receive general ecosystem support, but direct institutional nominations require an active campus chapter." },
                ].map((faq, idx) => (
                  <div key={idx} className="border-b border-zinc-100 pb-4">
                    <h4 className="text-sm font-bold text-zinc-900 mb-1">Q: {faq.q}</h4>
                    <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">A: {faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Actions Card */}
          <div className="space-y-6">
            <Card className="border-t-4 border-t-accent border-zinc-150 shadow-sm sticky top-28 bg-glass">
              <CardContent className="p-6 space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">Application Desk</span>
                  <span className="text-sm font-bold text-primary">Applications are ACTIVE</span>
                </div>
                
                <div className="space-y-3.5 text-xs text-zinc-600">
                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-4 h-4 text-zinc-400" />
                    <span>Closes: December 31, 2026</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Users className="w-4 h-4 text-zinc-400" />
                    <span>Mentors Available: Yes</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-zinc-400" />
                    <span>IP Ownership: 100% Student</span>
                  </div>
                </div>

                <div className="h-px bg-zinc-150" />

                <Link href="/join" className="block">
                  <Button variant="primary" className="w-full justify-center text-xs">
                    Start Application
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </Link>

                <div className="flex items-center gap-2 text-xs text-zinc-500 justify-center">
                  <Mail className="w-3.5 h-3.5" />
                  <span>support@ncie.org.in</span>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>

      </div>
    </div>
  );
}
