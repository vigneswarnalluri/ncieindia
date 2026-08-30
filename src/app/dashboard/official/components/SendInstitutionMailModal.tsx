"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Mail,
  Send,
  Loader2,
  CheckCircle,
  AlertCircle,
  Building,
  FileText,
  Sparkles,
  HelpCircle,
} from "lucide-react";

export interface MailRecipientInfo {
  recipientEmail: string;
  recipientName: string;
  institutionName: string;
  aisheCode?: string;
  role?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  recipient: MailRecipientInfo | null;
  onSuccess?: (msg: string) => void;
  onError?: (msg: string) => void;
}

type TemplateKey = "approval" | "query" | "audit" | "grant" | "custom";

interface TemplateDef {
  name: string;
  subject: (info: MailRecipientInfo) => string;
  body: (info: MailRecipientInfo) => string;
}

const TEMPLATES: Record<TemplateKey, TemplateDef> = {
  approval: {
    name: "Chapter Affiliation Approval",
    subject: (info) =>
      `Approval of NCIE Institutional Chapter Affiliation — ${info.institutionName || "Institution"}`,
    body: (info) =>
      `We are pleased to inform you that your application for establishing an official NCIE Institutional Chapter at ${info.institutionName || "your institution"} has been formally APPROVED after review of your submitted institutional documentation and accreditation credentials.

Your institution is now designated as an Official Chapter under the Viksit Bharat @2047 Innovation Leadership Initiative.

Next Steps:
1. Log in to your Institutional Dashboard using your registered SPOC credentials.
2. Nominate faculty coordinators and set up your student innovation chapters.
3. Access pre-incubation grants, project repository modules, and gazette directives.

Your official Chapter Registration Certificate has been generated and is now accessible via your dashboard.

Warm regards,
National Council for Innovation & Entrepreneurship (NCIE)`,
  },
  query: {
    name: "Document Audit & Clarification Query",
    subject: (info) =>
      `Clarification Required: Document Verification for ${info.institutionName || "Institutional Application"}`,
    body: (info) =>
      `This is regarding your institutional chapter / partnership application lodged with the National Council for Innovation & Entrepreneurship (NCIE).

During our nodal audit, we noted that additional documentation is required to complete your formal verification:

1. Institutional Consent & Head of Institution Endorsement Letter.
2. Valid AISHE / UGC / AICTE accreditation certificate copy.
3. Updated contact details and designation of the nominated Chapter Coordinator / SPOC.

Please submit the above documents via your institutional portal within 7 business days to facilitate processing.

For any queries, please respond to this communication desk.`,
  },
  audit: {
    name: "Quarterly Compliance & Roster Audit Directive",
    subject: (info) =>
      `Directive: Mandatory Quarterly Institutional Innovation Audit (Q1 2026) — ${info.institutionName || "Chapter"}`,
    body: (info) =>
      `In accordance with the National Innovation Framework for Higher Educational Institutions, all registered Institutional Chapters are hereby requested to complete the quarterly compliance audit for Q1 2026.

Key Actions Required:
1. Audit and verify pending student innovator profiles and course internship participants in your institutional portal.
2. Submit verified innovation and prototyping project entries to the National Selection Pool.
3. Update utilization details for active pre-incubation grants disbursed during the preceding financial quarter.

Submission Deadline: 31st March 2026.

We appreciate your continued commitment towards nurturing student innovators and builders.`,
  },
  grant: {
    name: "Grant Sanction & Disbursement Notice",
    subject: (info) =>
      `Intimation: Pre-Incubation Innovation Grant Sanction — ${info.institutionName || "Institution"}`,
    body: (info) =>
      `We are pleased to communicate that the pre-incubation innovation funding grant for ${info.institutionName || "your institution"} has been reviewed and cleared by the NCIE Treasury and Grants Bureau.

The approved fund allocation is queued for electronic transfer into the registered nodal institutional bank account.

Please ensure the submission of the interim Fund Utilization Certificate (UC) and student prototype progress reports within 60 days of disbursement.

Congratulations to your faculty and student innovators.`,
  },
  custom: {
    name: "Custom Official Communication",
    subject: (info) =>
      `Official Communication from NCIE — ${info.institutionName || ""}`,
    body: () => ``,
  },
};

export default function SendInstitutionMailModal({
  isOpen,
  onClose,
  recipient,
  onSuccess,
  onError,
}: Props) {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateKey>("approval");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [emailTo, setEmailTo] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Synchronize modal state when recipient or template changes
  useEffect(() => {
    if (recipient && isOpen) {
      setEmailTo(recipient.recipientEmail || "");
      const template = TEMPLATES[selectedTemplate];
      setSubject(template.subject(recipient));
      setMessage(template.body(recipient));
      setErrorMsg(null);
    }
  }, [recipient, isOpen, selectedTemplate]);

  if (!isOpen || !recipient) return null;

  const handleTemplateChange = (tmplKey: TemplateKey) => {
    setSelectedTemplate(tmplKey);
    const tmpl = TEMPLATES[tmplKey];
    setSubject(tmpl.subject(recipient));
    setMessage(tmpl.body(recipient));
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailTo.trim()) {
      setErrorMsg("Please enter a valid recipient email address.");
      return;
    }
    if (!subject.trim() || !message.trim()) {
      setErrorMsg("Subject and Message body cannot be empty.");
      return;
    }

    try {
      setIsSending(true);
      setErrorMsg(null);

      const res = await fetch("/api/send-institution-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientEmail: emailTo.trim(),
          recipientName: recipient.recipientName,
          institutionName: recipient.institutionName,
          aisheCode: recipient.aisheCode,
          subject: subject.trim(),
          message: message.trim(),
          templateType: selectedTemplate,
          senderRole: "NCIE Institutional Bureau",
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to dispatch email.");
      }

      // Record dispatch to central server-side mailbox API and local queue
      const adminDispatchItem = {
        id: `ADM-DISP-${Date.now().toString().slice(-6)}`,
        sender: "NCIE Central Administrative Command",
        senderEmail: "directorate@ncie.gov.in",
        senderRole: "Central Directorate Dispatch",
        senderAvatarBg: "bg-emerald-900",
        recipient: emailTo.trim(),
        recipientEmail: emailTo.trim(),
        institutionName: recipient.institutionName,
        aisheCode: recipient.aisheCode,
        subject: subject.trim(),
        snippet: message.trim().slice(0, 100) + (message.trim().length > 100 ? "..." : ""),
        body: message.trim(),
        category: selectedTemplate === "grant" ? "grants" : selectedTemplate === "audit" ? "directives" : "primary",
        date: "Just now",
        fullDate: `Today, ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
        read: false,
        starred: false,
        important: true,
        folder: "inbox",
        refNumber: `NCIE/HQ/DISP/2026/${Date.now().toString().slice(-4)}`,
      };

      try {
        fetch("/api/mailbox", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mail: adminDispatchItem }),
        }).catch((err) => console.warn("Mailbox server sync error:", err));

        const dispatchesRaw = localStorage.getItem("ncie_admin_dispatches");
        const dispatches = dispatchesRaw ? JSON.parse(dispatchesRaw) : [];
        dispatches.unshift(adminDispatchItem);
        localStorage.setItem("ncie_admin_dispatches", JSON.stringify(dispatches));

        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("storage"));
          window.dispatchEvent(new CustomEvent("ncie_mail_update"));
        }
      } catch (e) { }

      onSuccess?.(`Official email successfully dispatched to ${emailTo}`);
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred while sending the email.");
      onError?.(err.message || "Email dispatch failed.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-zinc-300 w-full max-w-2xl shadow-2xl rounded-sm overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-[#0D6B4F] text-white px-5 py-3.5 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-emerald-800/80 rounded">
              <Mail className="w-4 h-4 text-emerald-200" />
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-wide">Dispatch Official Email to Institution</h2>
              <p className="text-[10px] text-emerald-200">
                NCIE Nodal Communication Bureau • SMTP Delivery
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isSending}
            className="text-white/70 hover:text-white p-1 rounded hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSend} className="p-5 overflow-y-auto space-y-4 text-xs flex-1">
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Institutional Recipient Summary */}
          <div className="bg-zinc-50 border border-zinc-200 rounded p-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-zinc-700">
            <div>
              <span className="text-[10px] uppercase font-bold text-zinc-400 block">Institution / College</span>
              <span className="font-semibold text-zinc-900 flex items-center gap-1.5 mt-0.5">
                <Building className="w-3.5 h-3.5 text-[#0D6B4F] shrink-0" />
                {recipient.institutionName || "N/A"}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-zinc-400 block">SPOC / Coordinator</span>
              <span className="font-semibold text-zinc-800 mt-0.5 block">
                {recipient.recipientName || "Institutional Coordinator"}
                {recipient.aisheCode ? (
                  <span className="ml-1.5 text-[10px] font-mono px-1.5 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded">
                    {recipient.aisheCode}
                  </span>
                ) : null}
              </span>
            </div>
          </div>

          {/* Template Selector */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-600 flex items-center gap-1.5 mb-1.5">
              <Sparkles className="w-3 h-3 text-[#0D6B4F]" />
              Select Communication Template
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {(Object.keys(TEMPLATES) as TemplateKey[]).map((key) => {
                const isSelected = selectedTemplate === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleTemplateChange(key)}
                    className={`px-2.5 py-1.5 text-[11px] font-medium text-left rounded border transition-all cursor-pointer truncate ${isSelected
                        ? "bg-[#0D6B4F] text-white border-[#0D6B4F] shadow-xs"
                        : "bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100"
                      }`}
                  >
                    {TEMPLATES[key].name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Email To Input */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-600 block mb-1">
              Recipient Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              value={emailTo}
              onChange={(e) => setEmailTo(e.target.value)}
              className="w-full border border-zinc-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-[#0D6B4F] font-mono bg-white"
              placeholder="spoc@institution.edu.in"
            />
          </div>

          {/* Subject Input */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-600 block mb-1">
              Subject Line <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border border-zinc-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-[#0D6B4F] font-medium bg-white"
              placeholder="e.g. Official Directive regarding Chapter Affiliation"
            />
          </div>

          {/* Message Body */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-600 block">
                Official Message Content <span className="text-red-500">*</span>
              </label>
              <span className="text-[10px] text-zinc-400">Standard NCIE branding & footer included</span>
            </div>
            <textarea
              required
              rows={7}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border border-zinc-300 rounded p-3 text-xs leading-relaxed focus:outline-none focus:border-[#0D6B4F] bg-white font-sans resize-y"
              placeholder="Type your official communication message here..."
            />
          </div>

          {/* Info Notice */}
          <div className="p-2.5 bg-emerald-50/60 border border-emerald-200 rounded text-[11px] text-emerald-900 flex items-start gap-2">
            <CheckCircle className="w-3.5 h-3.5 text-[#0D6B4F] shrink-0 mt-0.5" />
            <span>
              Emails are dispatched with the formal NCIE Government Header, verification metadata, and an archival copy sent to the official audit registry (`info@ncieindia.org`).
            </span>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end items-center gap-2.5 pt-2 border-t border-zinc-200">
            <button
              type="button"
              onClick={onClose}
              disabled={isSending}
              className="px-4 py-2 border border-zinc-300 text-zinc-700 hover:bg-zinc-100 rounded text-xs font-bold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSending}
              className="px-5 py-2 bg-[#0D6B4F] hover:bg-[#0a5840] text-white rounded text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs disabled:opacity-50"
            >
              {isSending ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Dispatching Email...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Official Email</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
