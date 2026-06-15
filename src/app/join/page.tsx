"use client";

import React, { useState } from "react";
import { User, Landmark, Building, CheckCircle, ArrowLeft, ArrowRight, ShieldCheck, Info, FileText } from "lucide-react";
import Link from "next/link";

export default function JoinPage() {
  const [step, setStep] = useState<"select" | "form" | "success">("select");
  const [role, setRole] = useState<"student" | "chapter" | "partner">("student");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    orgName: "",
    city: "",
    proposal: "",
    designation: "",
    mobile: "",
  });

  const handleRoleSelect = (selectedRole: "student" | "chapter" | "partner") => {
    setRole(selectedRole);
    setStep("form");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("success");
  };

  return (
    <div className="flex-1 bg-zinc-50/30 py-16 md:py-24 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Progress Stepper (Enhanced) */}
        <div className="bg-white/80 backdrop-blur-md border border-zinc-200/80 rounded-2xl p-4 sm:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] mb-10 sm:mb-12 relative overflow-hidden">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            
            {/* Step 1 */}
            <div className="flex items-center gap-2.5">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                step === "select" 
                  ? "bg-primary text-white ring-4 ring-primary/10 shadow-lg shadow-primary/20 scale-105" 
                  : "bg-accent text-white shadow-md shadow-accent/10"
              }`}>
                {step !== "select" ? <CheckCircle className="w-4.5 h-4.5" /> : "1"}
              </span>
              <span className={`hidden sm:inline text-xs font-bold uppercase tracking-wider transition-colors ${
                step === "select" ? "text-primary font-extrabold" : "text-zinc-400"
              }`}>
                Select Pathway
              </span>
            </div>

            <div className={`flex-1 h-0.5 mx-3 sm:mx-6 transition-all duration-500 ${
              step !== "select" ? "bg-accent" : "bg-zinc-150"
            }`} />

            {/* Step 2 */}
            <div className="flex items-center gap-2.5">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                step === "form" 
                  ? "bg-primary text-white ring-4 ring-primary/10 shadow-lg shadow-primary/20 scale-105" 
                  : step === "success" 
                    ? "bg-accent text-white shadow-md shadow-accent/10" 
                    : "bg-zinc-100 text-zinc-400 border border-zinc-200"
              }`}>
                {step === "success" ? <CheckCircle className="w-4.5 h-4.5" /> : "2"}
              </span>
              <span className={`hidden sm:inline text-xs font-bold uppercase tracking-wider transition-colors ${
                step === "form" ? "text-primary font-extrabold" : "text-zinc-400"
              }`}>
                Dossier Entry
              </span>
            </div>

            <div className={`flex-1 h-0.5 mx-3 sm:mx-6 transition-all duration-500 ${
              step === "success" ? "bg-accent" : "bg-zinc-150"
            }`} />

            {/* Step 3 */}
            <div className="flex items-center gap-2.5">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                step === "success" 
                  ? "bg-primary text-white ring-4 ring-primary/10 shadow-lg shadow-primary/20 scale-105" 
                  : "bg-zinc-100 text-zinc-400 border border-zinc-200"
              }`}>
                3
              </span>
              <span className={`hidden sm:inline text-xs font-bold uppercase tracking-wider transition-colors ${
                step === "success" ? "text-primary font-extrabold" : "text-zinc-400"
              }`}>
                Verification
              </span>
            </div>

          </div>

          {/* Mobile Step Status Label */}
          <div className="sm:hidden text-center mt-3 text-[10px] font-extrabold uppercase tracking-widest text-zinc-400">
            {step === "select" && <span>Step 1: Select Pathway</span>}
            {step === "form" && <span>Step 2: Dossier Entry</span>}
            {step === "success" && <span>Step 3: Verification</span>}
          </div>
        </div>

        {/* Step 1: Select Role */}
        {step === "select" && (
          <div className="space-y-10 animate-slide-down">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <span className="inline-flex items-center gap-1.5 bg-mint/80 border border-primary/20 text-primary-dark font-extrabold text-[10px] px-3.5 py-1.5 rounded-full uppercase tracking-widest shadow-[0_2px_10px_rgba(13,107,79,0.04)]">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                <span>Onboarding Registry</span>
              </span>
              <h1 className="text-3xl sm:text-4.5xl font-extrabold text-zinc-900 tracking-tight leading-tight">
                Ecosystem Node Registration
              </h1>
              <p className="text-xs sm:text-sm text-zinc-500 max-w-xl mx-auto leading-relaxed">
                Select the appropriate portal to enter your coordinates. Registered nodes gain access to micro-grants, guidelines, and advisory mentoring.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Student */}
              <div
                onClick={() => handleRoleSelect("student")}
                className="relative bg-white border border-zinc-200/90 rounded-2xl p-8 hover:border-primary/30 hover:shadow-[0_20px_45px_rgba(13,107,79,0.06)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full group cursor-pointer overflow-hidden"
              >
                {/* Decorative background hover glow */}
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/15 transition-all duration-500" />
                
                <div className="space-y-5 relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm shadow-primary/5">
                    <User className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-base font-extrabold text-zinc-800 uppercase tracking-wider group-hover:text-primary transition-colors">
                      Student Innovator
                    </h3>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      Register to log raw research prototypes, match with project mentors, and access early seed funding streams.
                    </p>
                  </div>
                </div>
                
                <div className="mt-8 pt-5 border-t border-zinc-100 flex items-center justify-center gap-1.5 text-xs font-bold text-primary group-hover:text-primary-dark transition-all">
                  <span>Open Registration Dossier</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>

              {/* College Chapter */}
              <div
                onClick={() => handleRoleSelect("chapter")}
                className="relative bg-white border border-zinc-200/90 rounded-2xl p-8 hover:border-accent/30 hover:shadow-[0_20px_45px_rgba(201,162,75,0.06)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full group cursor-pointer overflow-hidden"
              >
                {/* Decorative background hover glow */}
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/15 transition-all duration-500" />
                
                <div className="space-y-5 relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-accent/15 text-accent-dark flex items-center justify-center mx-auto group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-300 shadow-sm shadow-accent/5">
                    <Landmark className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-base font-extrabold text-zinc-800 uppercase tracking-wider group-hover:text-accent-dark transition-colors">
                      Academic Chapter
                    </h3>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      For university deans, professors, or administrators seeking to affiliate their local innovation cell with the national framework.
                    </p>
                  </div>
                </div>
                
                <div className="mt-8 pt-5 border-t border-zinc-100 flex items-center justify-center gap-1.5 text-xs font-bold text-primary group-hover:text-primary-dark transition-all">
                  <span>Open Affiliation Form</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>

              {/* Ecosystem Partner */}
              <div
                onClick={() => handleRoleSelect("partner")}
                className="relative bg-white border border-zinc-200/90 rounded-2xl p-8 hover:border-purple-600/30 hover:shadow-[0_20px_45px_rgba(147,51,234,0.06)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full group cursor-pointer overflow-hidden"
              >
                {/* Decorative background hover glow */}
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-purple-600/5 rounded-full blur-2xl group-hover:bg-purple-600/15 transition-all duration-500" />
                
                <div className="space-y-5 relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 shadow-sm shadow-purple/5">
                    <Building className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-base font-extrabold text-zinc-800 uppercase tracking-wider group-hover:text-purple-600 transition-colors">
                      Ecosystem Partner
                    </h3>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      For corporate accelerators, venture networks, and technical makerspaces certified to host student incubators.
                    </p>
                  </div>
                </div>
                
                <div className="mt-8 pt-5 border-t border-zinc-100 flex items-center justify-center gap-1.5 text-xs font-bold text-primary group-hover:text-primary-dark transition-all">
                  <span>Open Liaison Directory</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Step 2: Form */}
        {step === "form" && (
          <div className="space-y-6 animate-slide-down">
            <button
              onClick={() => setStep("select")}
              className="inline-flex items-center gap-2 px-4.5 py-2 text-xs font-bold text-zinc-650 hover:text-primary transition-all duration-200 cursor-pointer bg-white border border-zinc-200/80 rounded-full shadow-sm hover:shadow hover:border-zinc-300"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Selection</span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Form dossier (MUI style inputs) */}
              <div className="lg:col-span-8">
                <div className="bg-white border border-zinc-200/90 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.04)] overflow-hidden">
                  
                  {/* Form Header */}
                  <div className="bg-gradient-to-r from-zinc-50 to-white px-8 py-6 border-b border-zinc-200/80">
                    <span className="text-[10px] font-extrabold text-accent-dark tracking-widest uppercase bg-accent/10 border border-accent/25 px-3 py-1 rounded-full shadow-sm">
                      {role === "student" ? "Innovator Dossier" : role === "chapter" ? "Chapter Affiliation" : "Partner Liaison"}
                    </span>
                    <h2 className="text-lg font-extrabold text-zinc-800 mt-3.5">Nomination Roster Details</h2>
                  </div>

                  <form onSubmit={handleSubmit} className="p-8 space-y-5">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 block mb-1">Full Legal Name</label>
                        <input
                          name="fullName"
                          type="text"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 text-xs border border-zinc-200 rounded-lg focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 bg-zinc-50/50 hover:bg-zinc-50 placeholder-zinc-400"
                          placeholder="e.g. Sneha Sen"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 block mb-1">Designation / Role</label>
                        <input
                          name="designation"
                          type="text"
                          value={formData.designation}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 text-xs border border-zinc-200 rounded-lg focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 bg-zinc-50/50 hover:bg-zinc-50 placeholder-zinc-400"
                          placeholder="e.g. Student Coordinator or Dean"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 block mb-1">Official Email Address</label>
                        <input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 text-xs border border-zinc-200 rounded-lg focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 bg-zinc-50/50 hover:bg-zinc-50 placeholder-zinc-400"
                          placeholder="e.g. sneha@institute.edu.in"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 block mb-1">10-Digit Mobile Number</label>
                        <input
                          name="mobile"
                          type="tel"
                          pattern="[0-9]{10}"
                          value={formData.mobile}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 text-xs border border-zinc-200 rounded-lg focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 bg-zinc-50/50 hover:bg-zinc-50 placeholder-zinc-400"
                          placeholder="e.g. 9876543210"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 block mb-1">
                        {role === "student" ? "College or University Name" : "Institution / Corporation Legal Entity"}
                      </label>
                      <input
                        name="orgName"
                        type="text"
                        value={formData.orgName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 text-xs border border-zinc-200 rounded-lg focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 bg-zinc-50/50 hover:bg-zinc-50 placeholder-zinc-400"
                        placeholder="e.g. Indian Institute of Technology"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 block mb-1">City &amp; State</label>
                      <input
                        name="city"
                        type="text"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 text-xs border border-zinc-200 rounded-lg focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 bg-zinc-50/50 hover:bg-zinc-50 placeholder-zinc-400"
                        placeholder="e.g. New Delhi, Delhi"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 block mb-1">Proposal Abstract / Support Required</label>
                      <textarea
                        name="proposal"
                        rows={4}
                        value={formData.proposal}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 text-xs border border-zinc-200 rounded-lg focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 bg-zinc-50/50 hover:bg-zinc-50 placeholder-zinc-400 resize-y"
                        placeholder="State your student group focus, chapter objectives, or specific resources required from the NCIE national registry..."
                        required
                      />
                    </div>

                    {/* Official Declaration Tick box */}
                    <div className="p-4 bg-zinc-50 border border-zinc-200/80 rounded-xl flex gap-3.5 items-start text-[11px] text-zinc-600 leading-relaxed">
                      <input type="checkbox" required className="mt-0.5 focus:ring-primary h-4 w-4 border-zinc-300 rounded shrink-0 cursor-pointer accent-primary" />
                      <span>
                        <strong>Under Section 4 Guidelines:</strong> I hereby declare that all details entered in this dossier are true, legal, and represent coordinates authorized by my affiliated academic or corporate entity.
                      </span>
                    </div>

                    <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-bold text-xs uppercase py-3.5 tracking-wider rounded-xl transition-all shadow-[0_4px_12px_rgba(13,107,79,0.2)] hover:shadow-[0_6px_20px_rgba(13,107,79,0.3)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
                      Submit Nomination Dossier
                    </button>

                  </form>
                </div>
              </div>

              {/* Right Column: Required Documents Checklist (Gov portal hallmark) */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Official Note */}
                <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-[0_10px_25px_rgba(0,0,0,0.02)] space-y-3 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary" />
                  <div className="flex items-center gap-2 text-primary">
                    <Info className="w-4 h-4 shrink-0" />
                    <h3 className="text-xs font-extrabold uppercase tracking-wider">Onboarding Process</h3>
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    Submissions are cataloged under the state registry desk. The review process takes approximately 3-5 business days. Once verified, chapter deans will receive credential keys via official mail.
                  </p>
                </div>

                {/* Required Documents */}
                <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-[0_10px_25px_rgba(0,0,0,0.02)] space-y-4">
                  <div className="flex items-center gap-2 text-zinc-800 pb-2 border-b border-zinc-150">
                    <FileText className="w-4 h-4 text-accent-dark" />
                    <h3 className="text-xs font-bold uppercase tracking-wider">Required Documentation</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-zinc-50/50 hover:bg-zinc-50 border border-zinc-200/60 rounded-xl transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-zinc-800">Affiliation Consent Form</p>
                        <span className="text-[10px] text-zinc-400 font-medium">Signed PDF</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-zinc-50/50 hover:bg-zinc-50 border border-zinc-200/60 rounded-xl transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-accent/20 text-accent-dark flex items-center justify-center shrink-0 mt-0.5">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-zinc-800">Institutional ID Card</p>
                        <span className="text-[10px] text-zinc-400 font-medium">JPEG / PDF</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-zinc-50/50 hover:bg-zinc-50 border border-zinc-200/60 rounded-xl transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-zinc-800">Chapter Proposal Roster</p>
                        <span className="text-[10px] text-zinc-400 font-medium">PDF / DOCX</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* Step 3: Success Confirmation */}
        {step === "success" && (
          <div className="max-w-xl mx-auto text-center space-y-8 py-16 bg-white border border-zinc-200/90 rounded-3xl p-10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)] relative overflow-hidden animate-slide-down">
            {/* Decorative Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-accent to-purple-600" />
            
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-500/20 shadow-[0_4px_20px_rgba(16,185,129,0.15)] mb-2">
              <CheckCircle className="w-7 h-7" />
            </div>
            
            <div className="space-y-3">
              <h2 className="text-2xl font-extrabold text-zinc-800 uppercase tracking-wider">Dossier Saved Successfully</h2>
              <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed max-w-md mx-auto">
                Thank you, <span className="font-bold text-primary">{formData.fullName}</span>. Your registration dossier for <span className="font-semibold text-zinc-800">{formData.orgName}</span> has been logged.
              </p>
              <div className="pt-2">
                <span className="font-mono font-bold text-accent-dark bg-accent/10 px-4 py-1.5 rounded-full text-xs sm:text-sm border border-accent/20 select-all shadow-sm">
                  REG-2026-{(Math.floor(Math.random() * 9000) + 1000)}
                </span>
              </div>
            </div>

            <div className="bg-mint/40 border border-primary/20 rounded-2xl p-5 text-left flex gap-4 text-xs text-zinc-700 leading-relaxed shadow-[0_4px_15px_rgba(13,107,79,0.02)]">
              <ShieldCheck className="w-5.5 h-5.5 text-primary shrink-0 mt-0.5" />
              <span>
                <strong>Next Step:</strong> Our regional chapter liaison desk will review your details. Verification templates will be dispatched to <strong className="text-primary">{formData.email}</strong> within 3-5 business days. Please keep your verification documents ready for upload.
              </span>
            </div>

            <div className="pt-4">
              <button
                className="inline-flex items-center gap-2 px-6 py-3 border border-primary/30 text-primary hover:border-primary hover:bg-primary/5 rounded-xl font-bold uppercase tracking-wider text-xs transition-all duration-200 cursor-pointer shadow-sm"
                onClick={() => {
                  setFormData({ fullName: "", email: "", orgName: "", city: "", proposal: "", designation: "", mobile: "" });
                  setStep("select");
                }}
              >
                Start New Registration
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
