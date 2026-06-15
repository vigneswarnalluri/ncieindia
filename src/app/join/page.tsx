"use client";

import React, { useState, useEffect } from "react";
import { User, Landmark, Building, CheckCircle, ArrowLeft, ArrowRight, ShieldCheck, Info, FileText, Check } from "lucide-react";
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  
  const [existingSubmission, setExistingSubmission] = useState<{
    email: string;
    orgName: string;
    regId: string;
  } | null>(null);
  const [regId, setRegId] = useState<string>("");

  const [files, setFiles] = useState<{
    consentForm: File | null;
    idCard: File | null;
    proposalRoster: File | null;
  }>({
    consentForm: null,
    idCard: null,
    proposalRoster: null,
  });

  useEffect(() => {
    const savedSubmission = localStorage.getItem("ncie_submission_details");
    if (savedSubmission) {
      try {
        setExistingSubmission(JSON.parse(savedSubmission));
      } catch (err) {
        localStorage.removeItem("ncie_submission_details");
      }
    }
  }, []);

  const handleRoleSelect = (selectedRole: "student" | "chapter" | "partner") => {
    setRole(selectedRole);
    setStep("form");
    setValidationError(null);
    setFiles({ consentForm: null, idCard: null, proposalRoster: null });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Security: basic sanitization to strip script tags
    const sanitizedValue = value.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
    
    setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fileKey: "consentForm" | "idCard" | "proposalRoster",
    allowedTypes: string[],
    maxSizeMB: number
  ) => {
    setValidationError(null);
    const file = e.target.files?.[0];
    if (!file) {
      setFiles((prev) => ({ ...prev, [fileKey]: null }));
      return;
    }

    // 1. Enforce file size limits
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setValidationError(`Security Limit: File "${file.name}" exceeds the maximum allowance of ${maxSizeMB}MB.`);
      e.target.value = ""; // Reset file input
      setFiles((prev) => ({ ...prev, [fileKey]: null }));
      return;
    }

    // 2. Strict client-side extension check
    const extension = "." + file.name.split(".").pop()?.toLowerCase();
    const isAllowedExtension = allowedTypes.includes(extension);
    
    if (!isAllowedExtension) {
      setValidationError(`Security Alert: File type not permitted. Allowed formats: ${allowedTypes.join(", ")}`);
      e.target.value = ""; // Reset file input
      setFiles((prev) => ({ ...prev, [fileKey]: null }));
      return;
    }

    setFiles((prev) => ({ ...prev, [fileKey]: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Safety check: ensure files are selected
    if (!files.consentForm || !files.idCard || !files.proposalRoster) {
      setValidationError("Security Verification: All required files must be uploaded before submitting.");
      return;
    }

    // Security: mobile validation double-check
    const mobilePattern = /^[0-9]{10}$/;
    if (!mobilePattern.test(formData.mobile)) {
      setValidationError("Validation Error: Please enter a valid 10-digit mobile number.");
      return;
    }

    setIsSubmitting(true);
    setValidationError(null);

    // Simulating database storage latency
    setTimeout(() => {
      setIsSubmitting(false);
      const generatedId = `REG-2026-${Math.floor(Math.random() * 9000) + 1000}`;
      setRegId(generatedId);

      const submissionDetails = {
        email: formData.email,
        orgName: formData.orgName,
        regId: generatedId,
      };
      localStorage.setItem("ncie_submission_details", JSON.stringify(submissionDetails));
      setExistingSubmission(submissionDetails);

      setStep("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1200);
  };

  return (
    <div className="flex-1 bg-[#F8FAFC] py-12 md:py-16 border-t border-zinc-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Progress Stepper (Government Portal Style) */}
        <div className="bg-white border border-zinc-200 rounded shadow-sm p-4 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold">
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                step === "select" 
                  ? "bg-primary text-white" 
                  : "bg-emerald-50 text-primary border border-primary/20"
              }`}>
                {step !== "select" ? <Check className="w-3.5 h-3.5" /> : "1"}
              </span>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Step 1</p>
                <p className={`text-xs ${step === "select" ? "text-primary font-bold" : "text-zinc-650"}`}>Select Onboarding Pathway</p>
              </div>
            </div>

            <div className="hidden sm:block flex-1 h-px bg-zinc-200" />

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                step === "form" 
                  ? "bg-primary text-white" 
                  : step === "success" 
                    ? "bg-emerald-50 text-primary border border-primary/20" 
                    : "bg-zinc-100 text-zinc-400 border border-zinc-200"
              }`}>
                {step === "success" ? <Check className="w-3.5 h-3.5" /> : "2"}
              </span>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Step 2</p>
                <p className={`text-xs ${step === "form" ? "text-primary font-bold" : "text-zinc-650"}`}>Dossier Submission</p>
              </div>
            </div>

            <div className="hidden sm:block flex-1 h-px bg-zinc-200" />

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                step === "success" 
                  ? "bg-primary text-white" 
                  : "bg-zinc-100 text-zinc-400 border border-zinc-200"
              }`}>
                3
              </span>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Step 3</p>
                <p className={`text-xs ${step === "success" ? "text-primary font-bold" : "text-zinc-650"}`}>Dossier Verification</p>
              </div>
            </div>

          </div>
        </div>

        {/* Client-side Duplicate Block (Active Registration Warning) */}
        {existingSubmission && step !== "success" && (
          <div className="max-w-xl mx-auto text-center space-y-6 py-12 bg-white border border-zinc-200 rounded p-8 shadow-sm relative overflow-hidden animate-slide-down mb-8">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#C9A24B]" />
            
            <div className="w-12 h-12 rounded-full bg-amber-50 text-[#A68034] flex items-center justify-center mx-auto border border-accent/20 shadow-sm mb-2">
              <ShieldCheck className="w-6 h-6" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-zinc-800 uppercase tracking-wider">Active Registration Found</h2>
              <p className="text-xs text-zinc-500 leading-relaxed max-w-md mx-auto">
                An active onboarding registration dossier for <span className="font-semibold text-zinc-800">{existingSubmission.orgName}</span> has already been submitted from this device under credentials:
              </p>
              <div className="pt-2">
                <span className="font-mono font-bold text-accent-dark bg-amber-50 px-4 py-1.5 rounded text-xs border border-accent/20 select-all shadow-sm">
                  {existingSubmission.regId}
                </span>
              </div>
            </div>

            <div className="bg-zinc-50 border border-zinc-200 rounded p-4 text-left flex gap-3 text-xs text-zinc-650 leading-relaxed">
              <Info className="w-5 h-5 text-accent-dark shrink-0 mt-0.5" />
              <span>
                <strong>Submission Lock:</strong> To prevent multiple dossier registry conflicts, resubmission under the same session is restricted. Verification updates have been queued for <strong className="text-primary">{existingSubmission.email}</strong>.
              </span>
            </div>

            <div className="pt-4 flex justify-center gap-4">
              <button
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-zinc-300 hover:bg-zinc-50 rounded font-bold uppercase tracking-wider text-xs transition-colors cursor-pointer shadow-sm text-zinc-700"
                onClick={() => {
                  if (window.confirm("Warning: Resetting will clear your active local session details. Proceed?")) {
                    localStorage.removeItem("ncie_submission_details");
                    setExistingSubmission(null);
                    setRegId("");
                    setFormData({ fullName: "", email: "", orgName: "", city: "", proposal: "", designation: "", mobile: "" });
                    setFiles({ consentForm: null, idCard: null, proposalRoster: null });
                    setStep("select");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
              >
                Reset &amp; Start New Registration
              </button>
            </div>
          </div>
        )}

        {/* Step 1: Select Role */}
        {step === "select" && !existingSubmission && (
          <div className="space-y-8 animate-slide-down">
            {/* Government Seal & Official Header */}
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="flex justify-center items-center gap-1.5 text-xs font-bold tracking-widest text-[#0D6B4F] uppercase">
                <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                <span>National Innovation Registry</span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 uppercase tracking-tight">
                Ecosystem Node Registration Portal
              </h1>
              
              <div className="h-0.5 w-24 bg-accent mx-auto" />
              
              <p className="text-xs sm:text-sm text-zinc-500 max-w-2xl mx-auto leading-relaxed">
                Affiliate your credentials under the National Council framework. Please choose the appropriate registry pathway below to submit your organizational dossier.
              </p>
            </div>

            {/* Three Pathway Panels */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Student Innovator */}
              <div className="bg-white border border-zinc-200 border-t-4 border-t-primary rounded shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-emerald-50 text-primary flex items-center justify-center rounded border border-primary/10">
                      <User className="w-4.5 h-4.5" />
                    </div>
                    <h3 className="text-sm font-extrabold text-zinc-800 uppercase tracking-wider">
                      Student Innovator
                    </h3>
                  </div>
                  
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    Registry for students seeking prototyping support, micro-grants, and pre-seed capital.
                  </p>
                  
                  <div className="pt-2 space-y-2.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Registry Features:</p>
                    <ul className="space-y-1.5 text-xs text-zinc-650">
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        <span>Log raw research prototypes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        <span>Match with certified mentors</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        <span>Apply for pre-seed grants</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="p-6 bg-zinc-50 border-t border-zinc-100">
                  <button
                    onClick={() => handleRoleSelect("student")}
                    className="w-full bg-primary hover:bg-[#08533d] text-white font-bold text-xs uppercase py-2.5 rounded shadow-sm transition-colors text-center cursor-pointer"
                  >
                    Open Registry Form
                  </button>
                </div>
              </div>

              {/* College Chapter */}
              <div className="bg-white border border-zinc-200 border-t-4 border-t-accent rounded shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-amber-50 text-accent-dark flex items-center justify-center rounded border border-accent/20">
                      <Landmark className="w-4.5 h-4.5" />
                    </div>
                    <h3 className="text-sm font-extrabold text-zinc-800 uppercase tracking-wider">
                      Academic Chapter
                    </h3>
                  </div>
                  
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    Official registry for university deans or college cell administrators looking to affiliate.
                  </p>
                  
                  <div className="pt-2 space-y-2.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Chapters Portal Access:</p>
                    <ul className="space-y-1.5 text-xs text-zinc-650">
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-accent-dark shrink-0 mt-0.5" />
                        <span>Establish campus Innovation Cell</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-accent-dark shrink-0 mt-0.5" />
                        <span>Apply for Makerspace funding</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-accent-dark shrink-0 mt-0.5" />
                        <span>State coordinator board voting</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="p-6 bg-zinc-50 border-t border-zinc-100">
                  <button
                    onClick={() => handleRoleSelect("chapter")}
                    className="w-full bg-[#111827] hover:bg-black text-white font-bold text-xs uppercase py-2.5 rounded shadow-sm transition-colors text-center cursor-pointer"
                  >
                    Apply for Affiliation
                  </button>
                </div>
              </div>

              {/* Ecosystem Partner */}
              <div className="bg-white border border-zinc-200 border-t-4 border-t-purple-750 rounded shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-purple-50 text-purple-700 flex items-center justify-center rounded border border-purple-100">
                      <Building className="w-4.5 h-4.5" />
                    </div>
                    <h3 className="text-sm font-extrabold text-zinc-800 uppercase tracking-wider">
                      Ecosystem Partner
                    </h3>
                  </div>
                  
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    Affiliation for corporate sponsors, venture partners, accelerators, or makerspaces.
                  </p>
                  
                  <div className="pt-2 space-y-2.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Partner Desktop Access:</p>
                    <ul className="space-y-1.5 text-xs text-zinc-650">
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-purple-700 shrink-0 mt-0.5" />
                        <span>Host national student programs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-purple-700 shrink-0 mt-0.5" />
                        <span>Deploy CSR sponsored briefs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-purple-700 shrink-0 mt-0.5" />
                        <span>Access national innovation pool</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="p-6 bg-zinc-50 border-t border-zinc-100">
                  <button
                    onClick={() => handleRoleSelect("partner")}
                    className="w-full bg-[#111827] hover:bg-black text-white font-bold text-xs uppercase py-2.5 rounded shadow-sm transition-colors text-center cursor-pointer"
                  >
                    Open Partner Registry
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Step 2: Form */}
        {step === "form" && (
          <div className="space-y-6 animate-slide-down">
            <button
              onClick={() => {
                setStep("select");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-zinc-600 hover:text-primary transition-colors cursor-pointer bg-white border border-zinc-200 rounded"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Registry List</span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column: Form dossier */}
              <div className="lg:col-span-8">
                <div className="bg-white border border-zinc-200 rounded shadow-sm overflow-hidden">
                  
                  {/* Form Header */}
                  <div className="bg-zinc-50 px-6 py-4 border-b border-zinc-200">
                    <span className="text-[10px] font-bold text-accent-dark tracking-wider uppercase bg-white border border-zinc-200 px-2 py-0.5 rounded shadow-sm">
                      {role === "student" ? "Innovator Dossier" : role === "chapter" ? "Chapter Affiliation" : "Partner Liaison"}
                    </span>
                    <h2 className="text-base font-extrabold text-zinc-800 mt-2 uppercase tracking-wide">Nomination Entry Form</h2>
                  </div>

                  {validationError && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 text-xs text-red-700 font-semibold mx-6 mt-4 rounded flex items-center gap-2">
                      <span className="font-bold">Error:</span>
                      <span>{validationError}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">Full Legal Name</label>
                        <input
                          name="fullName"
                          type="text"
                          maxLength={100}
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
                          maxLength={100}
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
                          maxLength={100}
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
                          maxLength={10}
                          value={formData.mobile}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 text-xs border border-zinc-350 rounded focus:outline-none focus:border-primary bg-zinc-50/50"
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
                        maxLength={200}
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
                        maxLength={150}
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
                        maxLength={2000}
                        value={formData.proposal}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-xs border border-zinc-300 rounded focus:outline-none focus:border-primary bg-zinc-50/50 resize-y"
                        placeholder="State your student group focus, chapter objectives, or specific resources required from the NCIE national registry..."
                        required
                      />
                    </div>

                    {/* Verification Documents Upload */}
                    <div className="border-t border-zinc-200 pt-5 mt-5 space-y-4">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Required Verification Documents</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-[#0D6B4F] block">
                            Affiliation Consent Form <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="file"
                            accept=".pdf"
                            required
                            onChange={(e) => handleFileChange(e, "consentForm", [".pdf"], 2)}
                            className="w-full text-xs text-zinc-550 file:mr-2 file:py-1 file:px-2 file:rounded file:border file:border-zinc-300 file:text-[10px] file:font-semibold file:bg-zinc-50 file:text-zinc-700 hover:file:bg-zinc-150 cursor-pointer border border-zinc-300 bg-white p-1 rounded"
                          />
                          <span className="text-[9px] text-zinc-400 block font-medium">Signed PDF (Max 2MB)</span>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-[#0D6B4F] block">
                            Institutional ID Card <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="file"
                            accept=".jpg,.jpeg,.png,.pdf"
                            required
                            onChange={(e) => handleFileChange(e, "idCard", [".jpg", ".jpeg", ".png", ".pdf"], 2)}
                            className="w-full text-xs text-zinc-550 file:mr-2 file:py-1 file:px-2 file:rounded file:border file:border-zinc-300 file:text-[10px] file:font-semibold file:bg-zinc-50 file:text-zinc-700 hover:file:bg-zinc-150 cursor-pointer border border-zinc-300 bg-white p-1 rounded"
                          />
                          <span className="text-[9px] text-zinc-400 block font-medium">JPEG, PNG, or PDF (Max 2MB)</span>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-[#0D6B4F] block">
                            Chapter Proposal Roster <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="file"
                            accept=".pdf,.docx,.doc"
                            required
                            onChange={(e) => handleFileChange(e, "proposalRoster", [".pdf", ".docx", ".doc"], 2)}
                            className="w-full text-xs text-zinc-550 file:mr-2 file:py-1 file:px-2 file:rounded file:border file:border-zinc-300 file:text-[10px] file:font-semibold file:bg-zinc-50 file:text-zinc-700 hover:file:bg-zinc-150 cursor-pointer border border-zinc-300 bg-white p-1 rounded"
                          />
                          <span className="text-[9px] text-zinc-400 block font-medium">PDF or DOCX (Max 2MB)</span>
                        </div>
                      </div>
                    </div>

                    {/* Official Declaration Tick box */}
                    <div className="p-3 bg-zinc-50 border border-zinc-200 rounded flex gap-2.5 items-start text-[11px] text-zinc-650">
                      <input type="checkbox" required className="mt-0.5 focus:ring-primary h-4 w-4 border-zinc-300 rounded shrink-0 cursor-pointer accent-primary" />
                      <span>
                        <strong>Under Section 4 Guidelines:</strong> I hereby declare that all details entered in this dossier are true, legal, and represent coordinates authorized by my affiliated academic or corporate entity.
                      </span>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className={`w-full bg-[#0D6B4F] hover:bg-[#08533d] text-white font-bold text-xs uppercase py-3 rounded shadow transition-colors cursor-pointer flex items-center justify-center gap-2 ${
                        isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0" />
                          <span>Processing Dossier...</span>
                        </>
                      ) : (
                        <span>Submit Nomination Dossier</span>
                      )}
                    </button>

                  </form>
                </div>
              </div>

              {/* Right Column: Required Documents Checklist */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Official Note */}
                <div className="bg-white border border-zinc-200 rounded p-5 shadow-sm space-y-3 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
                  <div className="flex items-center gap-1.5 text-primary">
                    <Info className="w-4 h-4 shrink-0" />
                    <h3 className="text-xs font-bold uppercase tracking-wider">Onboarding Process</h3>
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    Submissions are cataloged under the state registry desk. The review process takes approximately 3-5 business days. Once verified, chapter deans will receive credential keys via official mail.
                  </p>
                </div>

                {/* Required Documents */}
                <div className="bg-white border border-zinc-200 rounded p-5 shadow-sm space-y-4">
                  <div className="flex items-center gap-1.5 text-zinc-800 pb-2 border-b border-zinc-150">
                    <FileText className="w-4 h-4 text-accent-dark" />
                    <h3 className="text-xs font-bold uppercase tracking-wider">Required Documentation</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-zinc-50/50 border border-zinc-200/60 rounded">
                      <div className="w-7 h-7 bg-emerald-50 text-primary flex items-center justify-center shrink-0 mt-0.5 rounded border border-primary/10">
                        <FileText className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-zinc-800">Affiliation Consent Form</p>
                        <span className="text-[10px] text-zinc-400 font-medium">Signed PDF</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-zinc-50/50 border border-zinc-200/60 rounded">
                      <div className="w-7 h-7 bg-amber-50 text-accent-dark flex items-center justify-center shrink-0 mt-0.5 rounded border border-accent/20">
                        <FileText className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-zinc-800">Institutional ID Card</p>
                        <span className="text-[10px] text-zinc-400 font-medium">JPEG / PDF</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-zinc-50/50 border border-zinc-200/60 rounded">
                      <div className="w-7 h-7 bg-purple-50 text-purple-700 flex items-center justify-center shrink-0 mt-0.5 rounded border border-purple-100">
                        <FileText className="w-3.5 h-3.5" />
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
          <div className="max-w-xl mx-auto text-center space-y-6 py-12 bg-white border border-zinc-200 rounded p-8 shadow-sm relative overflow-hidden animate-slide-down">
            {/* Decorative Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent" />
            
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-500/20 shadow-sm mb-2">
              <CheckCircle className="w-6 h-6" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-zinc-800 uppercase tracking-wider">Dossier Saved Successfully</h2>
              <p className="text-xs text-zinc-500 leading-relaxed max-w-md mx-auto">
                Thank you, <span className="font-bold text-primary">{formData.fullName}</span>. Your registration dossier for <span className="font-semibold text-zinc-800">{formData.orgName}</span> has been logged under registry credentials below:
              </p>
              <div className="pt-2">
                <span className="font-mono font-bold text-accent-dark bg-amber-50 px-4 py-1.5 rounded text-xs border border-accent/20 select-all shadow-sm">
                  {regId || (existingSubmission ? existingSubmission.regId : "")}
                </span>
              </div>
            </div>

            <div className="bg-zinc-50 border border-zinc-200 rounded p-4 text-left flex gap-3 text-xs text-zinc-650 leading-relaxed">
              <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span>
                <strong>Next Step:</strong> Our regional chapter liaison desk has received your dossier and uploaded verification documents. A verification confirmation reference will be sent to <strong className="text-primary">{formData.email}</strong>. The review process will take 3-5 business days, and credentials will be issued once approved.
              </span>
            </div>

            <div className="pt-4">
              <button
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-primary text-primary hover:bg-emerald-50 rounded font-bold uppercase tracking-wider text-xs transition-colors cursor-pointer shadow-sm"
                onClick={() => {
                  if (window.confirm("Warning: Resetting will clear your active local session details. Proceed?")) {
                    localStorage.removeItem("ncie_submission_details");
                    setExistingSubmission(null);
                    setRegId("");
                    setFormData({ fullName: "", email: "", orgName: "", city: "", proposal: "", designation: "", mobile: "" });
                    setFiles({ consentForm: null, idCard: null, proposalRoster: null });
                    setStep("select");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
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
