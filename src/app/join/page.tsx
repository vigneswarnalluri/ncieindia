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
    <div className="flex-1 bg-zinc-50/50 py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Progress Stepper (MUI Style) */}
        <div className="mui-paper p-4 bg-white mb-10">
          <div className="flex justify-between items-center text-xs font-semibold">
            
            <div className="flex items-center gap-2">
              <span className={`mui-step-dot ${step === "select" ? "active" : "completed"}`}>1</span>
              <span className={step === "select" ? "text-primary font-bold" : "text-zinc-500"}>Select Pathway</span>
            </div>

            <div className="w-16 h-0.5 bg-zinc-200" />

            <div className="flex items-center gap-2">
              <span className={`mui-step-dot ${step === "form" ? "active" : step === "success" ? "completed" : ""}`}>2</span>
              <span className={step === "form" ? "text-primary font-bold" : "text-zinc-500"}>Dossier Entry</span>
            </div>

            <div className="w-16 h-0.5 bg-zinc-200" />

            <div className="flex items-center gap-2">
              <span className={`mui-step-dot ${step === "success" ? "active" : ""}`}>3</span>
              <span className={step === "success" ? "text-primary font-bold" : "text-zinc-500"}>Verification</span>
            </div>

          </div>
        </div>

        {/* Step 1: Select Role */}
        {step === "select" && (
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <span className="inline-flex items-center gap-1 bg-mint text-primary font-bold text-[10px] px-2.5 py-1 rounded border border-primary/10 uppercase tracking-wider mb-3">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Onboarding Registry</span>
              </span>
              <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight">
                Ecosystem Node Registration
              </h1>
              <p className="text-xs sm:text-sm text-zinc-500 mt-2">
                Select the appropriate portal to enter your coordinates. Registered nodes gain access to micro-grants, guidelines, and advisory mentoring.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Student */}
              <div
                onClick={() => handleRoleSelect("student")}
                className="mui-paper p-6 hover:border-primary cursor-pointer hover:shadow-md transition-all flex flex-col justify-between h-full bg-white group text-center"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded bg-primary/10 text-primary flex items-center justify-center mx-auto">
                    <User className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-zinc-900 uppercase tracking-wide">Student Innovator</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    Register to log raw research prototypes, match with project mentors, and access early seed funding streams.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-zinc-100 flex items-center justify-center gap-1 text-xs font-bold text-primary">
                  <span>Open Registration Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* College Chapter */}
              <div
                onClick={() => handleRoleSelect("chapter")}
                className="mui-paper p-6 hover:border-primary cursor-pointer hover:shadow-md transition-all flex flex-col justify-between h-full bg-white group text-center"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded bg-accent/20 text-accent-dark flex items-center justify-center mx-auto">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-zinc-900 uppercase tracking-wide">Academic Chapter</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    For university deans, professors, or administrators seeking to affiliate their local innovation cell with the national framework.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-zinc-100 flex items-center justify-center gap-1 text-xs font-bold text-primary">
                  <span>Open Affiliation Form</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Ecosystem Partner */}
              <div
                onClick={() => handleRoleSelect("partner")}
                className="mui-paper p-6 hover:border-primary cursor-pointer hover:shadow-md transition-all flex flex-col justify-between h-full bg-white group text-center"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded bg-purple-100 text-purple-700 flex items-center justify-center mx-auto">
                    <Building className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-zinc-900 uppercase tracking-wide">Ecosystem Partner</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    For corporate accelerators, venture networks, and technical makerspaces certified to host student incubators.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-zinc-100 flex items-center justify-center gap-1 text-xs font-bold text-primary">
                  <span>Open Liaison Directory</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Step 2: Form */}
        {step === "form" && (
          <div className="space-y-6">
            <button
              onClick={() => setStep("select")}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-primary transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Selection</span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Form dossier (MUI style inputs) */}
              <div className="lg:col-span-8">
                <div className="mui-paper bg-white overflow-hidden">
                  
                  {/* Form Header */}
                  <div className="bg-zinc-50 px-6 py-4 border-b border-zinc-200">
                    <span className="text-[10px] font-bold text-accent-dark tracking-wider uppercase bg-white border border-zinc-200 px-2 py-0.5 rounded">
                      {role === "student" ? "Innovator Dossier" : role === "chapter" ? "Chapter Affiliation" : "Partner Liaison"}
                    </span>
                    <h2 className="text-base font-extrabold text-zinc-800 mt-2">Nomination Roster Details</h2>
                  </div>

                  <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">Full Legal Name</label>
                        <input
                          name="fullName"
                          type="text"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 text-xs border border-zinc-300 rounded focus:outline-none focus:border-primary bg-zinc-50/50"
                          placeholder="e.g. Sneha Sen"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">Designation / Role</label>
                        <input
                          name="designation"
                          type="text"
                          value={formData.designation}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 text-xs border border-zinc-300 rounded focus:outline-none focus:border-primary bg-zinc-50/50"
                          placeholder="e.g. Student Coordinator or Dean"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">Official Email Address</label>
                        <input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 text-xs border border-zinc-300 rounded focus:outline-none focus:border-primary bg-zinc-50/50"
                          placeholder="e.g. sneha@institute.edu.in"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">10-Digit Mobile Number</label>
                        <input
                          name="mobile"
                          type="tel"
                          pattern="[0-9]{10}"
                          value={formData.mobile}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 text-xs border border-zinc-300 rounded focus:outline-none focus:border-primary bg-zinc-50/50"
                          placeholder="e.g. 9876543210"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">
                        {role === "student" ? "College or University Name" : "Institution / Corporation Legal Entity"}
                      </label>
                      <input
                        name="orgName"
                        type="text"
                        value={formData.orgName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-xs border border-zinc-300 rounded focus:outline-none focus:border-primary bg-zinc-50/50"
                        placeholder="e.g. Indian Institute of Technology"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">City &amp; State</label>
                      <input
                        name="city"
                        type="text"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-xs border border-zinc-300 rounded focus:outline-none focus:border-primary bg-zinc-50/50"
                        placeholder="e.g. New Delhi, Delhi"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">Proposal Abstract / Support Required</label>
                      <textarea
                        name="proposal"
                        rows={4}
                        value={formData.proposal}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-xs border border-zinc-300 rounded focus:outline-none focus:border-primary bg-zinc-50/50 resize-y"
                        placeholder="State your student group focus, chapter objectives, or specific resources required from the NCIE national registry..."
                        required
                      />
                    </div>

                    {/* Official Declaration Tick box */}
                    <div className="p-3 bg-zinc-50 border border-zinc-200 rounded flex gap-2.5 items-start text-[11px] text-zinc-600">
                      <input type="checkbox" required className="mt-0.5 focus:ring-primary h-3.5 w-3.5 border-zinc-300 rounded shrink-0 cursor-pointer" />
                      <span>
                        <strong>Under Section 4 Guidelines:</strong> I hereby declare that all details entered in this dossier are true, legal, and represent coordinates authorized by my affiliated academic or corporate entity.
                      </span>
                    </div>

                    <button type="submit" className="w-full mui-button-primary cursor-pointer text-xs font-bold uppercase py-2.5">
                      Submit Nomination Dossier
                    </button>

                  </form>
                </div>
              </div>

              {/* Right Column: Required Documents Checklist (Gov portal hallmark) */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Official Note */}
                <div className="mui-paper p-4 bg-white space-y-2">
                  <div className="flex items-center gap-1.5 text-primary">
                    <Info className="w-4 h-4" />
                    <h3 className="text-xs font-bold uppercase tracking-wide">Onboarding Process</h3>
                  </div>
                  <p className="text-[11px] text-zinc-500 leading-relaxed">
                    Submissions are cataloged under the state registry desk. The review process takes approximately 3-5 business days. Once verified, chapter deans will receive credential keys via official mail.
                  </p>
                </div>

                {/* Required Documents */}
                <div className="mui-paper p-4 bg-white space-y-3">
                  <div className="flex items-center gap-1.5 text-zinc-800">
                    <FileText className="w-4 h-4 text-accent-dark" />
                    <h3 className="text-xs font-bold uppercase tracking-wide">Required Verification Documents</h3>
                  </div>
                  <div className="border border-zinc-200 rounded divide-y divide-zinc-200 text-[10px] text-zinc-600 bg-zinc-50">
                    <div className="p-2 flex justify-between items-center bg-zinc-100">
                      <span className="font-bold uppercase tracking-wide">Document Type</span>
                      <span className="font-bold uppercase tracking-wide">Format</span>
                    </div>
                    <div className="p-2 flex justify-between items-center">
                      <span>Affiliation Consent Form</span>
                      <span className="font-mono text-zinc-400">PDF / Signed</span>
                    </div>
                    <div className="p-2 flex justify-between items-center">
                      <span>Institutional Photo ID Card</span>
                      <span className="font-mono text-zinc-400">JPEG / PDF</span>
                    </div>
                    <div className="p-2 flex justify-between items-center">
                      <span>Chapter Proposal Roster</span>
                      <span className="font-mono text-zinc-400">PDF / DOCX</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* Step 3: Success Confirmation */}
        {step === "success" && (
          <div className="max-w-xl mx-auto text-center space-y-6 py-12 mui-paper bg-white p-8">
            <div className="w-12 h-12 rounded-full bg-mint text-primary flex items-center justify-center mx-auto border border-primary/25">
              <CheckCircle className="w-6 h-6" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl font-extrabold text-zinc-900 uppercase tracking-wide">Dossier Saved Successfully</h2>
              <p className="text-xs text-zinc-500 leading-relaxed max-w-md mx-auto">
                Thank you, <span className="font-bold text-primary">{formData.fullName}</span>. Your registration dossier for <span className="font-semibold text-zinc-800">{formData.orgName}</span> has been logged under ID <span className="font-mono font-bold text-accent-dark">REG-2026-{(Math.floor(Math.random() * 9000) + 1000)}</span>.
              </p>
            </div>

            <div className="bg-zinc-50 border border-zinc-200 rounded p-4 text-left flex gap-3 text-[11px] text-zinc-600 leading-relaxed">
              <ShieldCheck className="w-5 h-5 text-accent-dark shrink-0 mt-0.5" />
              <span>
                <strong>Next Step:</strong> Our regional chapter liaison desk will review your details. Verification templates will be dispatched to <strong>{formData.email}</strong> within 3-5 business days. Please keep your verification documents ready for upload.
              </span>
            </div>

            <div className="pt-4">
              <button
                className="mui-button-outlined text-xs font-bold uppercase cursor-pointer"
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
