"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  Mail,
  Inbox,
  Send,
  Star,
  Trash2,
  FileText,
  Paperclip,
  Download,
  Search,
  CheckCircle,
  Clock,
  ChevronRight,
  ShieldCheck,
  Plus,
  X,
  Printer,
  Archive,
  Building,
  User,
  Filter,
  RotateCcw,
  Tag,
  AlertCircle,
  MoreVertical,
  ArrowLeft,
  CornerUpLeft,
  CornerUpRight,
  Sparkles,
  Bookmark,
  CheckSquare,
  Square,
  SlidersHorizontal,
  ChevronDown,
  Minimize2,
  Maximize2,
  Loader2,
  Building2,
  HelpCircle,
  Check,
  SendHorizontal
} from "lucide-react";

export interface AdminMailMessage {
  id: string;
  sender: string;
  senderEmail: string;
  senderRole: string;
  senderAvatarBg: string;
  recipient: string;
  recipientEmail?: string;
  subject: string;
  snippet: string;
  body: string;
  category: "all" | "inquiries" | "affiliation" | "grants" | "directives";
  date: string;
  fullDate: string;
  read: boolean;
  starred: boolean;
  important: boolean;
  folder: "inbox" | "starred" | "sent" | "drafts" | "trash";
  refNumber?: string;
  institutionName?: string;
  aisheCode?: string;
  attachments?: { name: string; size: string; type: "pdf" | "doc" | "zip" }[];
}

export const INITIAL_ADMIN_MAILS: AdminMailMessage[] = [];

type TemplateKey = "approval" | "query" | "audit" | "grant" | "directive" | "grievance" | "custom";

interface TemplateDef {
  name: string;
  defaultSubject: string;
  body: (recipientName: string, institutionName: string) => string;
}

const ADMIN_TEMPLATES: Record<TemplateKey, TemplateDef> = {
  approval: {
    name: "Chapter Affiliation Approval",
    defaultSubject: "Approval of NCIE Institutional Chapter Affiliation",
    body: (name, inst) =>
      `Dear ${name || "Institutional SPOC / Coordinator"},\n\nWe are pleased to inform you that your application for establishing an official NCIE Institutional Chapter at ${inst || "your institution"} has been formally APPROVED after review of your submitted institutional documentation and accreditation credentials.\n\nYour institution is now designated as an Official Chapter under the Viksit Bharat @2047 Innovation Leadership Initiative.\n\nNext Steps:\n1. Log in to your Institutional Dashboard using your registered SPOC credentials.\n2. Nominate faculty coordinators and set up your student innovation chapters.\n3. Access pre-incubation grants, project repository modules, and gazette directives.\n\nYour official Chapter Registration Certificate has been generated and is now accessible via your dashboard.\n\nWarm regards,\nNational Council for Innovation & Entrepreneurship (NCIE)`,
  },
  query: {
    name: "Document Audit & Clarification Query",
    defaultSubject: "Clarification Required: Document Verification for Institutional Application",
    body: (name, inst) =>
      `Dear ${name || "Institutional Coordinator"},\n\nThis is regarding your institutional chapter / partnership application lodged with the National Council for Innovation & Entrepreneurship (NCIE) on behalf of ${inst || "your institution"}.\n\nDuring our nodal audit, we noted that additional documentation is required to complete your formal verification:\n1. Institutional Consent & Head of Institution Endorsement Letter.\n2. Valid AISHE / UGC / AICTE accreditation certificate copy.\n3. Updated contact details and designation of the nominated Chapter Coordinator / SPOC.\n\nPlease submit the above documents via your institutional portal within 7 business days to facilitate processing.\n\nFor any queries, please respond to this communication desk.\n\nSincerely,\nNodal Verification Officer\nNational Council for Innovation & Entrepreneurship (NCIE)`,
  },
  grant: {
    name: "Grant Sanction & Fund Release Notice",
    defaultSubject: "Intimation: Pre-Incubation Innovation Grant Sanction",
    body: (name, inst) =>
      `Respected ${name || "Institutional Head & SPOC"},\n\nWe are pleased to communicate that the pre-incubation innovation funding grant for ${inst || "your institution"} has been reviewed and cleared by the NCIE Treasury and Grants Bureau.\n\nThe approved fund allocation is queued for electronic transfer into your registered nodal institutional bank account.\n\nPlease ensure the submission of the interim Fund Utilization Certificate (UC) and student prototype progress reports within 60 days of disbursement.\n\nCongratulations to your faculty and student innovators.\n\nWarm regards,\nGrants & Funding Cell\nNational Council for Innovation & Entrepreneurship (NCIE)`,
  },
  audit: {
    name: "Quarterly Compliance & Roster Audit Directive",
    defaultSubject: "Directive: Mandatory Quarterly Institutional Innovation Audit (Q1 2026)",
    body: (name, inst) =>
      `Dear ${name || "Institutional Coordinator & SPOC"},\n\nIn accordance with the National Innovation Framework for Higher Educational Institutions, all registered Institutional Chapters are hereby requested to complete the quarterly compliance audit for Q1 2026.\n\nKey Actions Required:\n1. Audit and verify pending student innovator profiles and course internship participants in your institutional portal.\n2. Submit verified innovation and prototyping project entries to the National Selection Pool.\n3. Update utilization details for active pre-incubation grants disbursed during the preceding financial quarter.\n\nSubmission Deadline: 31st March 2026.\n\nWe appreciate your continued commitment towards nurturing student innovators.\n\nWarm regards,\nOffice of the Member Secretary\nNational Council for Innovation & Entrepreneurship (NCIE)`,
  },
  directive: {
    name: "General Council Notice / Circular",
    defaultSubject: "Gazette Notification: National Innovation Directive",
    body: (name, inst) =>
      `To:\n${name || "All Institutional SPOCs & Coordinators"}\n${inst || "Institutional Chapters & Partner Organizations"}\n\nNotice is hereby given that the National Council for Innovation & Entrepreneurship (NCIE) has promulgated updated guidelines concerning student intellectual property filings, prototype grant disbursements, and grand challenge nominations under Viksit Bharat @2047.\n\nAll institutions are advised to adhere to the statutory compliance norms outlined in Gazette Circular Ref: NCIE-CIR-2026-09.\n\nBy Order of the Council,\nCentral Secretariat\nNational Council for Innovation & Entrepreneurship (NCIE)`,
  },
  grievance: {
    name: "Grievance Disposition & Resolution",
    defaultSubject: "Resolution: Official Grievance Redressal Communication",
    body: (name) =>
      `Dear ${name || "Applicant / Coordinator"},\n\nThis is with reference to your grievance submission regarding application verification / credential issuance.\n\nOur nodal scrutiny desk has examined the matter and resolved the issue. Your registration credentials and updated verification status have been refreshed in the central repository.\n\nIf you require any further clarification, please feel free to reply directly to this desk.\n\nRegards,\nGrievance Redressal Cell\nNational Council for Innovation & Entrepreneurship (NCIE)`,
  },
  custom: {
    name: "Custom Official Communication",
    defaultSubject: "Official Communication from NCIE Central Directorate",
    body: () => ``,
  },
};

export function loadAdminMails(): AdminMailMessage[] {
  if (typeof window === "undefined") {
    return [...INITIAL_ADMIN_MAILS];
  }

  const stored = localStorage.getItem("ncie_admin_mails");
  let mails: AdminMailMessage[] = [];

  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      mails = (Array.isArray(parsed) ? parsed : []).filter(
        (m: AdminMailMessage) => !m.id.startsWith("ADM-MAIL-2026-")
      );
    } catch {
      mails = [];
    }
  }

  // Merge any incoming mails from institutions (ncie_incoming_admin_mails)
  try {
    const incomingRaw = localStorage.getItem("ncie_incoming_admin_mails");
    if (incomingRaw) {
      const incoming = JSON.parse(incomingRaw);
      let updated = false;
      incoming.forEach((inc: any) => {
        if (!mails.some((m) => m.id === inc.id)) {
          mails.unshift(inc);
          updated = true;
        }
      });
      if (updated) {
        localStorage.setItem("ncie_admin_mails", JSON.stringify(mails));
      }
    }
  } catch (err) {
    console.error("Error syncing incoming mails to admin mailbox:", err);
  }

  return mails;
}

export function saveAdminMails(mails: AdminMailMessage[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("ncie_admin_mails", JSON.stringify(mails));
  } catch (err) {
    console.error("Error saving admin mails:", err);
  }
}

interface Props {
  userEmail?: string;
  onUnreadCountChange?: (count: number) => void;
  onLogAudit?: (code: string, details: string) => void;
  onToast?: (msg: string) => void;
  registeredInstitutions?: { name: string; email: string; aishe?: string; spoc?: string }[];
}

export default function AdminMailboxTab({
  userEmail = "admin@ncie.gov.in",
  onUnreadCountChange,
  onLogAudit,
  onToast,
  registeredInstitutions = [],
}: Props) {
  const [mails, setMails] = useState<AdminMailMessage[]>(() => loadAdminMails());

  // Listen to external incoming mail changes, server-side store, and storage events
  useEffect(() => {
    const syncMails = async () => {
      let loaded = loadAdminMails();
      try {
        const res = await fetch("/api/mailbox");
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.mails)) {
            const serverMails = data.mails;
            let updated = false;
            serverMails.forEach((sm: any) => {
              if (!loaded.some((m) => m.id === sm.id)) {
                loaded.unshift(sm);
                updated = true;
              }
            });
            if (updated) {
              saveAdminMails(loaded);
            }
          }
        }
      } catch (err) {}
      setMails(loaded);
    };

    syncMails();
    window.addEventListener("storage", syncMails);
    window.addEventListener("ncie_mail_update", syncMails);
    document.addEventListener("visibilitychange", syncMails);

    const interval = setInterval(syncMails, 3000);

    return () => {
      window.removeEventListener("storage", syncMails);
      window.removeEventListener("ncie_mail_update", syncMails);
      document.removeEventListener("visibilitychange", syncMails);
      clearInterval(interval);
    };
  }, []);

  // Persist mails whenever state changes
  useEffect(() => {
    saveAdminMails(mails);
  }, [mails]);

  const [activeFolder, setActiveFolder] = useState<"inbox" | "starred" | "sent" | "drafts" | "trash">("inbox");
  const [activeCategory, setActiveCategory] = useState<"all" | "inquiries" | "affiliation" | "grants" | "directives">("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Reading pane
  const [readingMailId, setReadingMailId] = useState<string | null>(null);
  
  // Multi-selection
  const [selectedMailIds, setSelectedMailIds] = useState<string[]>([]);

  // Compose floating window
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [isComposeMinimized, setIsComposeMinimized] = useState(false);
  const [isComposeMaximized, setIsComposeMaximized] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateKey>("custom");
  const [isSending, setIsSending] = useState(false);

  const [composeData, setComposeData] = useState({
    to: "",
    recipientName: "",
    institutionName: "",
    aisheCode: "",
    subject: "",
    body: "",
  });

  const [toast, setToast] = useState<string | null>(null);

  // Attachments state
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [attachedFiles, setAttachedFiles] = useState<{ name: string; size: string; type: "pdf" | "doc" | "zip"; dataUrl?: string }[]>([]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const newFiles = Array.from(e.target.files);
    newFiles.forEach((file) => {
      const sizeStr = file.size > 1024 * 1024 
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` 
        : `${Math.round(file.size / 1024)} KB`;
      
      let fileType: "pdf" | "doc" | "zip" = "doc";
      if (file.name.toLowerCase().endsWith(".pdf")) fileType = "pdf";
      else if (file.name.toLowerCase().endsWith(".zip") || file.name.toLowerCase().endsWith(".rar")) fileType = "zip";

      const reader = new FileReader();
      reader.onload = () => {
        setAttachedFiles((prev) => [
          ...prev,
          {
            name: file.name,
            size: sizeStr,
            type: fileType,
            dataUrl: reader.result as string,
          },
        ]);
        showToast(`Attached: ${file.name}`);
      };
      reader.readAsDataURL(file);
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemoveAttachment = (idx: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleDownloadAttachment = (att: { name: string; size: string; type?: string; dataUrl?: string }) => {
    if (att.dataUrl) {
      const a = document.createElement("a");
      a.href = att.dataUrl;
      a.download = att.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showToast(`Downloaded: ${att.name}`);
    } else {
      showToast(`Downloading: ${att.name}`);
    }
  };

  const showToast = (msg: string) => {
    setToast(msg);
    onToast?.(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Folder mail counts (Inbox unread count)
  const unreadInboxCount = mails.filter((m) => m.folder === "inbox" && !m.read).length;

  useEffect(() => {
    onUnreadCountChange?.(unreadInboxCount);
  }, [unreadInboxCount, onUnreadCountChange]);

  // Filtered mails for current view
  const currentFolderMails = useMemo(() => {
    return mails
      .filter((m) => {
        if (activeFolder === "starred") return m.starred && m.folder !== "trash";
        if (activeFolder === "sent") return m.folder === "sent";
        if (activeFolder === "drafts") return m.folder === "drafts";
        if (activeFolder === "trash") return m.folder === "trash";

        // Default: inbox
        if (m.folder !== "inbox") return false;
        if (activeCategory === "all") return true;
        return m.category === activeCategory;
      })
      .filter((m) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          m.subject.toLowerCase().includes(q) ||
          m.sender.toLowerCase().includes(q) ||
          m.senderEmail.toLowerCase().includes(q) ||
          m.snippet.toLowerCase().includes(q) ||
          m.body.toLowerCase().includes(q) ||
          (m.refNumber && m.refNumber.toLowerCase().includes(q)) ||
          (m.institutionName && m.institutionName.toLowerCase().includes(q)) ||
          (m.aisheCode && m.aisheCode.toLowerCase().includes(q))
        );
      });
  }, [mails, activeFolder, activeCategory, searchQuery]);

  const readingMail = useMemo(() => {
    return mails.find((m) => m.id === readingMailId) || null;
  }, [mails, readingMailId]);

  // Actions
  const handleOpenMail = (mail: AdminMailMessage) => {
    setReadingMailId(mail.id);
    if (!mail.read) {
      setMails((prev) => prev.map((m) => (m.id === mail.id ? { ...m, read: true } : m)));
    }
  };

  const handleToggleStar = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMails((prev) =>
      prev.map((m) => (m.id === id ? { ...m, starred: !m.starred } : m))
    );
  };

  const handleToggleImportant = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMails((prev) =>
      prev.map((m) => (m.id === id ? { ...m, important: !m.important } : m))
    );
  };

  const handleToggleSelectOne = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedMailIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAllCurrent = () => {
    const allIds = currentFolderMails.map((m) => m.id);
    if (selectedMailIds.length === allIds.length) {
      setSelectedMailIds([]);
    } else {
      setSelectedMailIds(allIds);
    }
  };

  const handleDeleteSelected = () => {
    if (selectedMailIds.length === 0) return;
    setMails((prev) =>
      prev.map((m) => (selectedMailIds.includes(m.id) ? { ...m, folder: "trash" } : m))
    );
    showToast(`${selectedMailIds.length} communication(s) moved to Trash.`);
    onLogAudit?.("MAIL_TRASH", `Moved ${selectedMailIds.length} messages to trash.`);
    setSelectedMailIds([]);
  };

  const handleMarkAsReadSelected = () => {
    setMails((prev) =>
      prev.map((m) => (selectedMailIds.includes(m.id) ? { ...m, read: true } : m))
    );
    setSelectedMailIds([]);
    showToast("Marked as read.");
  };

  const handleTemplateSelect = (key: TemplateKey) => {
    setSelectedTemplate(key);
    const tmpl = ADMIN_TEMPLATES[key];
    setComposeData((prev) => ({
      ...prev,
      subject: prev.institutionName ? `${tmpl.defaultSubject} — ${prev.institutionName}` : tmpl.defaultSubject,
      body: tmpl.body(prev.recipientName, prev.institutionName),
    }));
  };

  const handleSelectQuickRecipient = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (!val) return;
    const inst = registeredInstitutions.find((r) => r.email === val || r.name === val);
    if (inst) {
      setComposeData((prev) => ({
        ...prev,
        to: inst.email,
        recipientName: inst.spoc || "Institutional Coordinator",
        institutionName: inst.name,
        aisheCode: inst.aishe || "",
        body: ADMIN_TEMPLATES[selectedTemplate].body(inst.spoc || "", inst.name),
        subject: ADMIN_TEMPLATES[selectedTemplate].defaultSubject + (inst.name ? ` — ${inst.name}` : ""),
      }));
    } else {
      setComposeData((prev) => ({
        ...prev,
        to: val,
      }));
    }
  };

  const handleSendCompose = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!composeData.to.trim() || !composeData.subject.trim() || !composeData.body.trim()) {
      showToast("Please fill in recipient email, subject, and message body.");
      return;
    }

    setIsSending(true);

    try {
      // Dispatch via real SMTP endpoint
      const res = await fetch("/api/send-institution-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientEmail: composeData.to.trim(),
          recipientName: composeData.recipientName || "Institutional Coordinator",
          institutionName: composeData.institutionName || undefined,
          aisheCode: composeData.aisheCode || undefined,
          subject: composeData.subject.trim(),
          message: composeData.body.trim(),
          templateType: selectedTemplate,
          senderRole: "NCIE Central Administrative Command",
        }),
      });

      const result = await res.json();

      const newMail: AdminMailMessage = {
        id: `ADM-DISP-${Date.now().toString().slice(-6)}`,
        sender: "NCIE Central Administrative Command",
        senderEmail: userEmail || "directorate@ncie.gov.in",
        senderRole: "Central Directorate Dispatch",
        senderAvatarBg: "bg-emerald-900",
        recipient: composeData.to,
        recipientEmail: composeData.to,
        subject: composeData.subject,
        snippet: composeData.body.slice(0, 100) + (composeData.body.length > 100 ? "..." : ""),
        body: composeData.body,
        category: "affiliation",
        date: "Just now",
        fullDate: `Just now (${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })})`,
        read: true,
        starred: false,
        important: false,
        folder: "sent",
        refNumber: `NCIE/HQ/DISP/2026/${Date.now().toString().slice(-4)}`,
        institutionName: composeData.institutionName || undefined,
        aisheCode: composeData.aisheCode || undefined,
        attachments: attachedFiles.length > 0 ? attachedFiles : undefined,
      };

      // Save to server-side mailbox API and global admin dispatches queue
      try {
        fetch("/api/mailbox", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mail: newMail }),
        }).catch((err) => console.warn("Mailbox server sync error:", err));

        const dispatchesRaw = localStorage.getItem("ncie_admin_dispatches");
        const dispatches = dispatchesRaw ? JSON.parse(dispatchesRaw) : [];
        dispatches.unshift({
          id: newMail.id,
          sender: newMail.sender,
          senderEmail: newMail.senderEmail,
          recipientEmail: composeData.to.trim(),
          institutionName: composeData.institutionName || undefined,
          subject: newMail.subject,
          snippet: newMail.snippet,
          body: newMail.body,
          category: newMail.category,
          date: "Just now",
          fullDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" }),
          refNumber: newMail.refNumber,
          attachments: attachedFiles.length > 0 ? attachedFiles : undefined,
        });
        localStorage.setItem("ncie_admin_dispatches", JSON.stringify(dispatches));

        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("storage"));
          window.dispatchEvent(new CustomEvent("ncie_mail_update"));
        }
      } catch (e) {}

      setMails((prev) => [newMail, ...prev]);
      setIsComposeOpen(false);
      setAttachedFiles([]);
      setComposeData({
        to: "",
        recipientName: "",
        institutionName: "",
        aisheCode: "",
        subject: "",
        body: "",
      });

      if (result.emailSent || result.success) {
        showToast(`Official communication dispatched via SMTP to ${composeData.to}`);
        onLogAudit?.("MAIL_SMTP_SENT", `Dispatched email to ${composeData.to}: "${composeData.subject}"`);
      } else {
        showToast(`Dispatched & recorded to Sent folder (SMTP Note: ${result.error || "Logged in records"})`);
        onLogAudit?.("MAIL_LOCAL_DISP", `Dispatched communication to ${composeData.to}`);
      }
    } catch (err: any) {
      console.warn("SMTP fetch warning, recording locally:", err);
      const newMail: AdminMailMessage = {
        id: `ADM-DISP-${Date.now().toString().slice(-6)}`,
        sender: "NCIE Central Administrative Command",
        senderEmail: userEmail || "directorate@ncie.gov.in",
        senderRole: "Central Directorate Dispatch",
        senderAvatarBg: "bg-emerald-900",
        recipient: composeData.to,
        recipientEmail: composeData.to,
        subject: composeData.subject,
        snippet: composeData.body.slice(0, 100) + (composeData.body.length > 100 ? "..." : ""),
        body: composeData.body,
        category: "affiliation",
        date: "Just now",
        fullDate: `Just now (${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })})`,
        read: true,
        starred: false,
        important: false,
        folder: "sent",
        refNumber: `NCIE/HQ/DISP/2026/${Date.now().toString().slice(-4)}`,
        institutionName: composeData.institutionName || undefined,
        aisheCode: composeData.aisheCode || undefined,
      };
      setMails((prev) => [newMail, ...prev]);
      setIsComposeOpen(false);
      showToast(`Communication archived & dispatched to ${composeData.to}`);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-[#f6f8fc] -m-4 sm:-m-6 min-h-[calc(100vh-140px)] flex flex-col font-sans select-none border border-zinc-200 shadow-sm rounded-sm">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-6 z-50 bg-[#202124] text-white text-xs px-4 py-3 rounded-md shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <span>{toast}</span>
          <button onClick={() => setToast(null)} className="text-zinc-400 hover:text-white ml-2">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* GMAIL TOP SEARCH BAR HEADER */}
      {/* ========================================================================= */}
      <div className="bg-[#f6f8fc] px-4 py-2.5 flex items-center justify-between gap-4 border-b border-[#e1e3e1]">
        <div className="flex items-center gap-3 flex-1 max-w-2xl">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-zinc-500" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in official communications, institutions, AISHE, ref codes..."
              className="w-full pl-10 pr-10 py-2.5 bg-[#eaf1fb] hover:bg-[#e4ebf5] focus:bg-white text-xs text-zinc-800 rounded-full focus:outline-none focus:shadow-md transition-all border border-transparent focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100/90 text-[#0D6B4F] text-[11px] font-bold rounded-full font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0D6B4F]" /> NCIE Central Command TLS
          </span>
          <div className="w-8 h-8 rounded-full bg-[#0D6B4F] text-white font-bold text-xs flex items-center justify-center shadow-xs">
            A
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MAIN GMAIL LAYOUT */}
      {/* ========================================================================= */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* ======================================================================= */}
        {/* LEFT SIDEBAR */}
        {/* ======================================================================= */}
        <aside className="w-60 shrink-0 p-3 flex flex-col justify-between hidden md:flex bg-[#f6f8fc]">
          <div className="space-y-4">
            {/* Compose Button */}
            <button
              onClick={() => {
                setIsComposeOpen(true);
                setIsComposeMinimized(false);
              }}
              className="bg-[#c2e7ff] hover:bg-[#b3dcf7] hover:shadow-md text-[#001d35] font-semibold text-xs px-6 py-3.5 rounded-2xl flex items-center gap-3 transition-all cursor-pointer shadow-xs"
            >
              <Plus className="w-5 h-5 text-[#001d35]" />
              <span className="text-xs font-bold tracking-wide">Compose Dispatch</span>
            </button>

            {/* Nav Items */}
            <nav className="space-y-0.5 text-xs">
              <button
                onClick={() => {
                  setActiveFolder("inbox");
                  setReadingMailId(null);
                }}
                className={`w-full flex items-center justify-between px-4 py-2 rounded-r-full font-semibold transition-colors cursor-pointer ${
                  activeFolder === "inbox"
                    ? "bg-[#d3e3fd] text-[#001d35] font-bold"
                    : "text-zinc-700 hover:bg-[#eaebef]"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <Inbox className="w-4 h-4" />
                  <span>Inbox</span>
                </div>
                {unreadInboxCount > 0 && (
                  <span className="text-[11px] font-bold font-mono text-[#001d35]">
                    {unreadInboxCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => {
                  setActiveFolder("starred");
                  setReadingMailId(null);
                }}
                className={`w-full flex items-center justify-between px-4 py-2 rounded-r-full font-semibold transition-colors cursor-pointer ${
                  activeFolder === "starred"
                    ? "bg-[#d3e3fd] text-[#001d35] font-bold"
                    : "text-zinc-700 hover:bg-[#eaebef]"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <Star className="w-4 h-4" />
                  <span>Starred</span>
                </div>
              </button>

              <button
                onClick={() => {
                  setActiveFolder("sent");
                  setReadingMailId(null);
                }}
                className={`w-full flex items-center justify-between px-4 py-2 rounded-r-full font-semibold transition-colors cursor-pointer ${
                  activeFolder === "sent"
                    ? "bg-[#d3e3fd] text-[#001d35] font-bold"
                    : "text-zinc-700 hover:bg-[#eaebef]"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <Send className="w-4 h-4" />
                  <span>Dispatched</span>
                </div>
              </button>

              <button
                onClick={() => {
                  setActiveFolder("trash");
                  setReadingMailId(null);
                }}
                className={`w-full flex items-center justify-between px-4 py-2 rounded-r-full font-semibold transition-colors cursor-pointer ${
                  activeFolder === "trash"
                    ? "bg-[#d3e3fd] text-[#001d35] font-bold"
                    : "text-zinc-700 hover:bg-[#eaebef]"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <Trash2 className="w-4 h-4" />
                  <span>Trash</span>
                </div>
              </button>
            </nav>

            {/* Official Stream Categories */}
            <div className="pt-3 border-t border-[#e1e3e1] space-y-1">
              <span className="px-4 text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">
                Administrative Streams
              </span>
              <button
                onClick={() => {
                  setActiveFolder("inbox");
                  setActiveCategory("inquiries");
                  setReadingMailId(null);
                }}
                className={`w-full flex items-center gap-3 px-4 py-1.5 text-xs rounded-r-full cursor-pointer transition-colors ${
                  activeFolder === "inbox" && activeCategory === "inquiries"
                    ? "bg-[#d3e3fd] text-[#001d35] font-bold"
                    : "text-zinc-700 hover:bg-[#eaebef]"
                }`}
              >
                <Tag className="w-3.5 h-3.5 text-indigo-500 fill-indigo-500" />
                <span>Chapter Inquiries</span>
              </button>
              <button
                onClick={() => {
                  setActiveFolder("inbox");
                  setActiveCategory("affiliation");
                  setReadingMailId(null);
                }}
                className={`w-full flex items-center gap-3 px-4 py-1.5 text-xs rounded-r-full cursor-pointer transition-colors ${
                  activeFolder === "inbox" && activeCategory === "affiliation"
                    ? "bg-[#d3e3fd] text-[#001d35] font-bold"
                    : "text-zinc-700 hover:bg-[#eaebef]"
                }`}
              >
                <Tag className="w-3.5 h-3.5 text-blue-500 fill-blue-500" />
                <span>Affiliation &amp; Verification</span>
              </button>
              <button
                onClick={() => {
                  setActiveFolder("inbox");
                  setActiveCategory("grants");
                  setReadingMailId(null);
                }}
                className={`w-full flex items-center gap-3 px-4 py-1.5 text-xs rounded-r-full cursor-pointer transition-colors ${
                  activeFolder === "inbox" && activeCategory === "grants"
                    ? "bg-[#d3e3fd] text-[#001d35] font-bold"
                    : "text-zinc-700 hover:bg-[#eaebef]"
                }`}
              >
                <Tag className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" />
                <span>Grant Claims &amp; UCs</span>
              </button>
              <button
                onClick={() => {
                  setActiveFolder("inbox");
                  setActiveCategory("directives");
                  setReadingMailId(null);
                }}
                className={`w-full flex items-center gap-3 px-4 py-1.5 text-xs rounded-r-full cursor-pointer transition-colors ${
                  activeFolder === "inbox" && activeCategory === "directives"
                    ? "bg-[#d3e3fd] text-[#001d35] font-bold"
                    : "text-zinc-700 hover:bg-[#eaebef]"
                }`}
              >
                <Tag className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                <span>Directives &amp; Grievances</span>
              </button>
            </div>
          </div>

        </aside>

        {/* ======================================================================= */}
        {/* RIGHT MAIN WORKSPACE (LIST VIEW OR READING PANE) */}
        {/* ======================================================================= */}
        <main className="flex-1 bg-white rounded-tl-2xl shadow-xs border border-[#e1e3e1] flex flex-col overflow-hidden m-2 ml-0">
          
          {/* ===================================================================== */}
          {/* TOP TOOLBAR */}
          {/* ===================================================================== */}
          <div className="px-4 py-2 border-b border-[#e1e3e1] flex items-center justify-between gap-2 text-zinc-600 bg-white">
            {readingMail ? (
              /* Back Button & Actions when viewing a mail */
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setReadingMailId(null)}
                  className="p-1.5 hover:bg-zinc-100 rounded-full cursor-pointer"
                  title="Back to Inbox"
                >
                  <ArrowLeft className="w-4 h-4 text-zinc-700" />
                </button>
                <div className="h-4 w-px bg-zinc-300" />
                <button
                  onClick={() => {
                    if (readingMail) {
                      setMails((prev) => prev.map((m) => (m.id === readingMail.id ? { ...m, folder: "trash" } : m)));
                      setReadingMailId(null);
                      showToast("Communication moved to Trash.");
                      onLogAudit?.("MAIL_TRASH", `Moved communication ${readingMail.id} to trash.`);
                    }
                  }}
                  className="p-1.5 hover:bg-zinc-100 rounded-full cursor-pointer"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4 text-zinc-600" />
                </button>
                <button
                  onClick={() => {
                    if (readingMail) {
                      setMails((prev) => prev.map((m) => (m.id === readingMail.id ? { ...m, read: false } : m)));
                      setReadingMailId(null);
                      showToast("Marked as unread.");
                    }
                  }}
                  className="p-1.5 hover:bg-zinc-100 rounded-full cursor-pointer"
                  title="Mark as unread"
                >
                  <Mail className="w-4 h-4 text-zinc-600" />
                </button>
                <button
                  onClick={(e) => {
                    if (readingMail) {
                      handleToggleStar(readingMail.id, e);
                      showToast(readingMail.starred ? "Removed from Starred." : "Added to Starred.");
                    }
                  }}
                  className={`p-1.5 hover:bg-zinc-100 rounded-full cursor-pointer ${
                    readingMail.starred ? "text-amber-500 fill-amber-500" : "text-zinc-600"
                  }`}
                  title={readingMail.starred ? "Remove star" : "Add star"}
                >
                  <Star className={`w-4 h-4 ${readingMail.starred ? "fill-amber-500" : ""}`} />
                </button>
              </div>
            ) : (
              /* Normal List Toolbar */
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSelectAllCurrent}
                  className="p-1.5 hover:bg-zinc-100 rounded-md flex items-center cursor-pointer text-zinc-600"
                  title="Select All"
                >
                  {selectedMailIds.length > 0 && selectedMailIds.length === currentFolderMails.length ? (
                    <CheckSquare className="w-4 h-4 text-[#0D6B4F]" />
                  ) : (
                    <Square className="w-4 h-4 text-zinc-400" />
                  )}
                </button>

                {selectedMailIds.length > 0 ? (
                  <div className="flex items-center gap-2 animate-in fade-in duration-100">
                    <button
                      onClick={handleDeleteSelected}
                      className="p-1.5 hover:bg-zinc-100 rounded-full cursor-pointer text-zinc-600"
                      title="Delete Selected"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleMarkAsReadSelected}
                      className="p-1.5 hover:bg-zinc-100 rounded-full cursor-pointer text-zinc-600"
                      title="Mark Selected as Read"
                    >
                      <Mail className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-semibold text-zinc-700 ml-2">
                      {selectedMailIds.length} selected
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => showToast("Mailbox refreshed.")}
                      className="p-1.5 hover:bg-zinc-100 rounded-full cursor-pointer text-zinc-600"
                      title="Refresh"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <span className="font-mono text-[11px]">
                {currentFolderMails.length > 0
                  ? `1–${currentFolderMails.length} of ${currentFolderMails.length}`
                  : "0 of 0"}
              </span>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* GMAIL CATEGORY TABS */}
          {/* ===================================================================== */}
          {!readingMail && activeFolder === "inbox" && (
            <div className="flex border-b border-[#e1e3e1] text-xs font-bold text-zinc-600 overflow-x-auto">
              {[
                { id: "all", label: "All Communications", icon: <Inbox className="w-4 h-4" /> },
                { id: "inquiries", label: "Chapter Inquiries", icon: <Tag className="w-4 h-4 text-indigo-500" /> },
                { id: "affiliation", label: "Affiliation & Verification", icon: <CheckCircle className="w-4 h-4 text-blue-500" /> },
                { id: "grants", label: "Grant Claims & UCs", icon: <Building className="w-4 h-4 text-emerald-600" /> },
                { id: "directives", label: "Directives & Grievances", icon: <Tag className="w-4 h-4 text-red-500" /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id as any)}
                  className={`flex items-center gap-2.5 px-5 py-3 cursor-pointer transition-colors border-b-2 whitespace-nowrap ${
                    activeCategory === tab.id
                      ? "border-[#0D6B4F] text-[#0D6B4F] bg-emerald-50/20"
                      : "border-transparent text-zinc-600 hover:bg-zinc-50"
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* ===================================================================== */}
          {/* CONTENT AREA: LIST VIEW OR EMAIL READING VIEW */}
          {/* ===================================================================== */}
          {readingMail ? (
            /* FULL EMAIL READING VIEW (NCIE OFFICIAL LETTERHEAD) */
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
              {/* Subject Title & Actions */}
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <h1 className="text-xl font-semibold text-zinc-900 leading-snug">
                    {readingMail.subject}
                  </h1>
                  <div className="flex flex-wrap items-center gap-2">
                    {readingMail.refNumber && (
                      <span className="inline-block text-[10px] font-mono font-bold px-2.5 py-0.5 bg-zinc-100 text-zinc-700 rounded border border-zinc-200">
                        Official Ref: {readingMail.refNumber}
                      </span>
                    )}
                    {readingMail.institutionName && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded border border-emerald-200">
                        <Building2 className="w-3 h-3 text-[#0D6B4F]" />
                        {readingMail.institutionName}
                      </span>
                    )}
                    {readingMail.aisheCode && (
                      <span className="text-[10px] font-mono px-2 py-0.5 bg-blue-50 text-blue-800 rounded border border-blue-200">
                        {readingMail.aisheCode}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="p-1.5 hover:bg-zinc-100 rounded-full cursor-pointer text-zinc-500"
                    title="Print official letter"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Sender & Recipient Bar */}
              <div className="flex items-start justify-between gap-4 border-b border-zinc-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${readingMail.senderAvatarBg} text-white font-bold text-sm flex items-center justify-center shadow-xs`}>
                    {readingMail.sender.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-xs text-zinc-900">{readingMail.sender}</span>
                      <span className="text-[10px] text-zinc-400 font-mono">&lt;{readingMail.senderEmail}&gt;</span>
                    </div>
                    <p className="text-[11px] text-zinc-500 mt-0.5">
                      to <strong>{readingMail.recipient}</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono">
                  <span>{readingMail.fullDate}</span>
                  <button
                    onClick={(e) => handleToggleStar(readingMail.id, e)}
                    className={`cursor-pointer ${
                      readingMail.starred ? "text-amber-500 fill-amber-500" : "text-zinc-300 hover:text-zinc-500"
                    }`}
                  >
                    <Star className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Message Body */}
              <div className="text-xs text-zinc-800 leading-relaxed font-sans whitespace-pre-wrap max-w-4xl bg-zinc-50/50 p-4 rounded-md border border-zinc-200">
                {readingMail.body}
              </div>

              {/* Attachments */}
              {readingMail.attachments && readingMail.attachments.length > 0 && (
                <div className="pt-6 border-t border-zinc-100 space-y-3">
                  <span className="text-xs font-bold text-zinc-700 block">
                    {readingMail.attachments.length} Official Attachment{readingMail.attachments.length > 1 ? "s" : ""}
                  </span>
                  <div className="flex flex-wrap gap-3">
                    {readingMail.attachments.map((att, idx) => (
                      <div
                        key={idx}
                        className="group w-52 bg-[#f8f9fa] border border-zinc-200 rounded-lg p-3 hover:shadow-md transition-all flex flex-col justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="w-6 h-6 text-red-500 shrink-0" />
                          <div className="overflow-hidden">
                            <span className="text-xs font-bold text-zinc-800 block truncate" title={att.name}>
                              {att.name}
                            </span>
                            <span className="text-[10px] text-zinc-400 font-mono">{att.size}</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 border-t border-zinc-200 flex justify-end">
                          <button
                            onClick={() => handleDownloadAttachment(att)}
                            className="p-1 hover:bg-zinc-200 rounded cursor-pointer text-zinc-600 hover:text-[#0D6B4F] flex items-center gap-1 text-[10px] font-bold"
                          >
                            <Download className="w-3.5 h-3.5" /> Download
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom Quick Reply & Forward */}
              <div className="pt-6 border-t border-zinc-100 flex items-center gap-3">
                <button
                  onClick={() => {
                    setComposeData({
                      to: readingMail.senderEmail,
                      recipientName: readingMail.sender,
                      institutionName: readingMail.institutionName || "",
                      aisheCode: readingMail.aisheCode || "",
                      subject: `Re: ${readingMail.subject}`,
                      body: `Dear ${readingMail.sender},\n\nRegarding your communication (${readingMail.refNumber || "Ref: NCIE"}), \n\n\n--- On ${readingMail.fullDate}, ${readingMail.sender} wrote: ---\n${readingMail.body}`,
                    });
                    setSelectedTemplate("custom");
                    setIsComposeOpen(true);
                  }}
                  className="bg-white hover:bg-zinc-50 text-zinc-700 border border-zinc-300 font-semibold text-xs px-5 py-2 rounded-full flex items-center gap-2 cursor-pointer shadow-2xs"
                >
                  <CornerUpLeft className="w-3.5 h-3.5" /> Reply to Sender
                </button>
                <button
                  onClick={() => {
                    setComposeData({
                      to: "",
                      recipientName: "",
                      institutionName: readingMail.institutionName || "",
                      aisheCode: readingMail.aisheCode || "",
                      subject: `Fwd: ${readingMail.subject}`,
                      body: `\n\n---------- Forwarded official communication ---------\nFrom: ${readingMail.sender} <${readingMail.senderEmail}>\nSubject: ${readingMail.subject}\nRef: ${readingMail.refNumber || "N/A"}\n\n${readingMail.body}`,
                    });
                    setSelectedTemplate("custom");
                    setIsComposeOpen(true);
                  }}
                  className="bg-white hover:bg-zinc-50 text-zinc-700 border border-zinc-300 font-semibold text-xs px-5 py-2 rounded-full flex items-center gap-2 cursor-pointer shadow-2xs"
                >
                  <CornerUpRight className="w-3.5 h-3.5" /> Forward
                </button>
              </div>
            </div>
          ) : (
            /* GMAIL ROWS LIST */
            <div className="flex-1 overflow-y-auto divide-y divide-[#f2f2f2]">
              {currentFolderMails.length > 0 ? (
                currentFolderMails.map((mail) => {
                  const isSelected = selectedMailIds.includes(mail.id);
                  return (
                    <div
                      key={mail.id}
                      onClick={() => handleOpenMail(mail)}
                      className={`group flex items-center gap-3 px-4 py-2.5 cursor-pointer text-xs transition-colors select-none ${
                        isSelected
                          ? "bg-[#c2dbff]/40"
                          : !mail.read
                          ? "bg-white font-bold text-zinc-900 hover:shadow-xs hover:border-zinc-300"
                          : "bg-[#f2f6fc]/50 text-zinc-600 font-normal hover:bg-zinc-100/70"
                      }`}
                    >
                      {/* Selection Checkbox */}
                      <button
                        onClick={(e) => handleToggleSelectOne(mail.id, e)}
                        className="text-zinc-400 hover:text-zinc-700 cursor-pointer shrink-0"
                      >
                        {isSelected ? (
                          <CheckSquare className="w-4 h-4 text-[#0D6B4F]" />
                        ) : (
                          <Square className="w-4 h-4" />
                        )}
                      </button>

                      {/* Star Button */}
                      <button
                        onClick={(e) => handleToggleStar(mail.id, e)}
                        className={`shrink-0 cursor-pointer ${
                          mail.starred ? "text-amber-500 fill-amber-500" : "text-zinc-300 hover:text-zinc-500"
                        }`}
                      >
                        <Star className="w-4 h-4" />
                      </button>

                      {/* Important Tag */}
                      <button
                        onClick={(e) => handleToggleImportant(mail.id, e)}
                        className={`shrink-0 cursor-pointer ${
                          mail.important ? "text-amber-500 fill-amber-500" : "text-zinc-300 hover:text-zinc-500"
                        }`}
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>

                      {/* Sender Name / Recipient */}
                      <div className="w-52 shrink-0 truncate flex items-center gap-1.5">
                        <span className={!mail.read ? "font-bold text-zinc-900" : "text-zinc-700"}>
                          {mail.folder === "sent" ? `To: ${mail.recipient.split("<")[0]}` : mail.sender}
                        </span>
                      </div>

                      {/* Category tag */}
                      {mail.category && mail.category !== "all" && (
                        <span className="shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600 border border-zinc-200 uppercase">
                          {mail.category}
                        </span>
                      )}

                      {/* Subject + Snippet */}
                      <div className="flex-1 min-w-0 flex items-center gap-2 truncate">
                        <span className={`truncate ${!mail.read ? "font-bold text-zinc-900" : "text-zinc-800"}`}>
                          {mail.subject}
                        </span>
                        <span className="text-zinc-400 font-normal truncate">
                          — {mail.snippet}
                        </span>
                      </div>

                      {/* Attachment icon */}
                      {mail.attachments && mail.attachments.length > 0 && (
                        <div className="shrink-0">
                          <Paperclip className="w-3.5 h-3.5 text-zinc-400" />
                        </div>
                      )}

                      {/* Date / Hover Actions */}
                      <div className="w-24 text-right shrink-0">
                        <span className="text-[11px] text-zinc-500 font-medium group-hover:hidden">
                          {mail.date}
                        </span>
                        {/* Hover Icons */}
                        <div className="hidden group-hover:flex items-center justify-end gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedMailIds([mail.id]);
                              handleDeleteSelected();
                            }}
                            className="p-1 hover:bg-zinc-200 rounded-full cursor-pointer text-zinc-500"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const willBeRead = !mail.read;
                              setMails((prev) =>
                                prev.map((m) => (m.id === mail.id ? { ...m, read: willBeRead } : m))
                              );
                              showToast(willBeRead ? "Marked as read." : "Marked as unread.");
                            }}
                            className="p-1 hover:bg-zinc-200 rounded-full cursor-pointer text-zinc-500"
                            title={mail.read ? "Mark as unread" : "Mark as read"}
                          >
                            <Mail className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-20 text-center text-zinc-400">
                  <Inbox className="w-12 h-12 mx-auto text-zinc-300 mb-3" />
                  <p className="text-sm font-semibold text-zinc-600">Admin mailbox is clear</p>
                  <p className="text-xs text-zinc-400 mt-1">No communications found in this stream.</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* ========================================================================= */}
      {/* FLOATING COMPOSE POPUP WINDOW (WITH SMTP DISPATCH & TEMPLATES) */}
      {/* ========================================================================= */}
      {isComposeOpen && (
        <div
          className={`fixed z-50 bg-white rounded-t-xl shadow-2xl border border-zinc-300 flex flex-col transition-all duration-150 ${
            isComposeMaximized
              ? "inset-6 sm:inset-12"
              : isComposeMinimized
              ? "bottom-0 right-10 w-72 h-10"
              : "bottom-0 right-4 sm:right-10 w-[95vw] sm:w-[620px] h-[540px]"
          }`}
        >
          {/* Header */}
          <div className="bg-[#0D6B4F] text-white px-4 py-2.5 rounded-t-xl flex items-center justify-between select-none">
            <div className="flex items-center gap-2">
              <SendHorizontal className="w-4 h-4 text-emerald-200" />
              <span className="text-xs font-bold">New Official Administrative Dispatch</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/80">
              <button
                onClick={() => setIsComposeMinimized(!isComposeMinimized)}
                className="hover:bg-white/10 p-1 rounded cursor-pointer"
                title="Minimize"
              >
                <Minimize2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsComposeMaximized(!isComposeMaximized)}
                className="hover:bg-white/10 p-1 rounded cursor-pointer"
                title="Maximize"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsComposeOpen(false)}
                className="hover:bg-white/10 p-1 rounded cursor-pointer"
                title="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Body when not minimized */}
          {!isComposeMinimized && (
            <form onSubmit={handleSendCompose} className="flex-1 flex flex-col p-4 space-y-3 text-xs overflow-y-auto">
              {/* Quick Template Picker */}
              <div className="flex flex-wrap items-center gap-2 bg-emerald-50/60 p-2 rounded-md border border-emerald-200/70">
                <span className="text-[11px] font-bold text-[#0D6B4F] flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Quick Template:
                </span>
                {(Object.keys(ADMIN_TEMPLATES) as TemplateKey[]).map((key) => (
                  <button
                    type="button"
                    key={key}
                    onClick={() => handleTemplateSelect(key)}
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold cursor-pointer transition-all ${
                      selectedTemplate === key
                        ? "bg-[#0D6B4F] text-white shadow-2xs"
                        : "bg-white text-zinc-700 border border-zinc-200 hover:bg-emerald-100/50"
                    }`}
                  >
                    {ADMIN_TEMPLATES[key].name}
                  </button>
                ))}
              </div>

              {/* Quick Recipient Select */}
              {registeredInstitutions.length > 0 && (
                <div className="flex items-center gap-2 border-b border-zinc-100 pb-1.5">
                  <span className="text-zinc-500 w-20 text-[11px] font-medium shrink-0">Quick Select</span>
                  <select
                    onChange={handleSelectQuickRecipient}
                    className="flex-1 bg-zinc-50 border border-zinc-200 text-xs text-zinc-800 rounded px-2 py-1 focus:outline-none focus:border-[#0D6B4F]"
                    defaultValue=""
                  >
                    <option value="" disabled>Choose registered institution or coordinator...</option>
                    {registeredInstitutions.map((inst, idx) => (
                      <option key={idx} value={inst.email}>
                        {inst.name} {inst.spoc ? `(${inst.spoc})` : ""} — {inst.email}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Direct Recipient Email */}
              <div className="flex items-center gap-2 border-b border-zinc-100 pb-1.5">
                <span className="text-zinc-500 w-20 text-[11px] font-medium shrink-0">To Email *</span>
                <input
                  type="email"
                  placeholder="recipient@institution.edu.in"
                  value={composeData.to}
                  onChange={(e) => setComposeData((p) => ({ ...p, to: e.target.value }))}
                  required
                  className="flex-1 focus:outline-none text-xs text-zinc-800"
                />
              </div>

              {/* Institution / Recipient Name & AISHE (Optional metadata) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 border-b border-zinc-100 pb-1.5">
                <input
                  type="text"
                  placeholder="Recipient Name / SPOC"
                  value={composeData.recipientName}
                  onChange={(e) => setComposeData((p) => ({ ...p, recipientName: e.target.value }))}
                  className="focus:outline-none text-xs text-zinc-800"
                />
                <input
                  type="text"
                  placeholder="Institution / College Name"
                  value={composeData.institutionName}
                  onChange={(e) => setComposeData((p) => ({ ...p, institutionName: e.target.value }))}
                  className="focus:outline-none text-xs text-zinc-800"
                />
              </div>

              {/* Subject */}
              <div className="border-b border-zinc-100 pb-1.5">
                <input
                  type="text"
                  placeholder="Subject *"
                  value={composeData.subject}
                  onChange={(e) => setComposeData((p) => ({ ...p, subject: e.target.value }))}
                  required
                  className="w-full focus:outline-none text-xs text-zinc-800 font-semibold placeholder:font-normal"
                />
              </div>

              {/* Message Body */}
              <textarea
                rows={10}
                value={composeData.body}
                onChange={(e) => setComposeData((p) => ({ ...p, body: e.target.value }))}
                placeholder="Compose official administrative communication..."
                required
                className="flex-1 w-full focus:outline-none resize-none text-xs text-zinc-800 leading-relaxed font-sans border border-zinc-100 p-2 rounded"
              />

              {/* Attached files preview chips */}
              {attachedFiles.length > 0 && (
                <div className="flex flex-wrap gap-2 py-2 border-t border-zinc-100 max-h-24 overflow-y-auto">
                  {attachedFiles.map((att, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md text-[11px] text-emerald-900"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#0D6B4F] shrink-0" />
                      <span className="font-medium truncate max-w-[140px]" title={att.name}>{att.name}</span>
                      <span className="text-[10px] text-emerald-600 font-mono">({att.size})</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveAttachment(idx)}
                        className="text-zinc-400 hover:text-red-600 ml-1 p-0.5 rounded cursor-pointer"
                        title="Remove attachment"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                multiple
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.zip,.csv,.xlsx"
                className="hidden"
              />

              {/* Bottom Toolbar & Dispatch Button */}
              <div className="pt-2 border-t border-zinc-200 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <button
                    type="submit"
                    disabled={isSending}
                    className="bg-[#0D6B4F] hover:bg-[#094835] text-white font-semibold text-xs px-6 py-2 rounded-full cursor-pointer flex items-center gap-2 shadow-xs disabled:opacity-50"
                  >
                    {isSending ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Sending via SMTP...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Dispatch Official Mail</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-1.5 hover:bg-zinc-100 rounded-full cursor-pointer text-zinc-600 hover:text-[#0D6B4F] transition-colors"
                    title="Attach files (PDF, DOCX, ZIP, Images)"
                  >
                    <Paperclip className="w-4 h-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setAttachedFiles([]);
                    setIsComposeOpen(false);
                  }}
                  className="p-1.5 hover:bg-zinc-100 rounded-full cursor-pointer text-zinc-400 hover:text-red-500"
                  title="Discard draft"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
