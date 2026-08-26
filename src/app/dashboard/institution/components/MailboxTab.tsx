"use client";

import React, { useState, useMemo, useEffect } from "react";
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
  Eye,
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
  Image as ImageIcon,
  Link2,
  Smile,
  ShieldAlert
} from "lucide-react";

export interface MailMessage {
  id: string;
  sender: string;
  senderEmail: string;
  senderRole: string;
  senderAvatarBg: string;
  recipient: string;
  subject: string;
  snippet: string;
  body: string;
  category: "primary" | "directives" | "updates" | "grants";
  date: string;
  fullDate: string;
  read: boolean;
  starred: boolean;
  important: boolean;
  folder: "inbox" | "starred" | "snoozed" | "sent" | "drafts" | "trash";
  refNumber?: string;
  attachments?: { name: string; size: string; type: "pdf" | "doc" | "zip" }[];
}

const INITIAL_MAILS: MailMessage[] = [
  {
    id: "MAIL-2026-8801",
    sender: "NCIE National Directorate",
    senderEmail: "directorate@ncie.gov.in",
    senderRole: "Ministry of Education / Nodal Authority",
    senderAvatarBg: "bg-emerald-700",
    recipient: "spoc@institution.edu.in",
    subject: "Mandatory Quarterly Institutional Innovation & Chapter Audit (Q1 2026)",
    snippet: "Formal directive regarding mandatory reporting of student innovators, patent filings, and pre-incubation grants under Viksit Bharat @2047.",
    body: `Dear Institutional Chapter Coordinator & SPOC,

In accordance with the National Innovation Framework for Higher Educational Institutions, all registered Institutional Chapters are hereby requested to complete the quarterly compliance audit for Q1 2026.

Key Actions Required:
1. Audit and verify pending student innovators and internship candidate profiles in your Institutional Portal.
2. Review project proposals in the Innovation & Prototyping Repository and submit eligible entries to the National Selection Pool.
3. Update fund utilisation certificates for active pre-incubation grants disbursed during the preceding financial quarter.

Submission Deadline: 31st March 2026.

For technical assistance or chapter queries, reply directly to this communication desk or contact the NCIE Central Helpdesk.

Warm regards,
Office of the Member Secretary
National Council for Innovation & Entrepreneurship (NCIE)
Ministry of Education, Government of India`,
    category: "directives",
    date: "11:30 AM",
    fullDate: "Feb 27, 2026, 11:30 AM (Just now)",
    read: false,
    starred: true,
    important: true,
    folder: "inbox",
    refNumber: "NCIE/DIR/2026/Q1-049",
    attachments: [
      { name: "NCIE_Quarterly_Audit_Guidelines_2026.pdf", size: "1.4 MB", type: "pdf" },
      { name: "Institutional_Compliance_Checklist.pdf", size: "820 KB", type: "pdf" },
    ],
  },
  {
    id: "MAIL-2026-8794",
    sender: "NCIE Verification Cell",
    senderEmail: "verification@ncie.org.in",
    senderRole: "Central Student Verification Desk",
    senderAvatarBg: "bg-blue-700",
    recipient: "spoc@institution.edu.in",
    subject: "Verification Batch Update: 124 Applications Awaiting Chapter Clearance",
    snippet: "Candidate applications submitted under Course Internships and Student Innovators are pending verification for your chapter roster.",
    body: `Greetings from the NCIE Central Verification Desk,

This is an automated operational notification informing your chapter that candidate applications have been lodged under your institution.

Please audit the uploaded HOD consent letters, student ID credentials, and payment reference numbers in the 'Student Verification' tab. Once approved, official automated registration letters are dispatched to students with their verification IDs.

Ref: NCIE-VERIF-ROSTER-2026`,
    category: "updates",
    date: "Yesterday",
    fullDate: "Feb 26, 2026, 4:15 PM",
    read: false,
    starred: false,
    important: true,
    folder: "inbox",
    refNumber: "NCIE/VRF/NOTIF-2026-088",
    attachments: [
      { name: "Candidate_Roster_Summary_2026.pdf", size: "640 KB", type: "pdf" },
    ],
  },
  {
    id: "MAIL-2026-8742",
    sender: "NCIE Grant & Seed Fund Cell",
    senderEmail: "grants@ncie.gov.in",
    senderRole: "National Innovation Fund Cell",
    senderAvatarBg: "bg-teal-700",
    recipient: "spoc@institution.edu.in",
    subject: "Sanction Notification: Stage-1 Prototyping Grant Allocation (₹10.00 Lakhs)",
    snippet: "Formal grant sanction letter and fund transfer acknowledgement for Institutional Pre-Incubation Infrastructure.",
    body: `Respected Institutional Head & SPOC,

We are pleased to inform you that following evaluation by the National Innovation Screening Committee, your institution has been sanctioned a sum of ₹10,00,000/- (Rupees Ten Lakhs Only) under the Prototype Development Support Scheme.

Disbursement Particulars:
- Grant Reference: NCIE-GRT-2026-004
- Category: Pre-Incubation & Hardware Prototyping
- Tranche: 1st Installment (60% released)
- Expected Milestone: TRL-4 Prototype Demonstration

Kindly acknowledge receipt and upload your Chapter Utilisation Certificate upon expenditure reconciliation.`,
    category: "grants",
    date: "Feb 24",
    fullDate: "Feb 24, 2026, 2:40 PM",
    read: true,
    starred: true,
    important: true,
    folder: "inbox",
    refNumber: "NCIE/GRT/2026/SANCTION-012",
    attachments: [
      { name: "Grant_Sanction_Order_Signed.pdf", size: "2.1 MB", type: "pdf" },
      { name: "Utilization_Certificate_Format.pdf", size: "380 KB", type: "pdf" },
    ],
  },
  {
    id: "MAIL-2026-8690",
    sender: "National Innovation Hackathon Cell",
    senderEmail: "hackathon@ncie.org.in",
    senderRole: "Programme Coordination Division",
    senderAvatarBg: "bg-indigo-700",
    recipient: "spoc@institution.edu.in",
    subject: "Invitation: Viksit Bharat @2047 Innovation Grand Challenge - Team Nominations",
    snippet: "Call for nominations of student startup teams and hardware innovation prototypes for the National Grand Finale.",
    body: `Dear Professor / Chapter Leader,

Nominations are now open for the Viksit Bharat @2047 Innovation Grand Challenge. Institutional Chapters are entitled to endorse up to 5 top-ranked student innovation teams directly to the semifinal evaluation round without preliminary screening.

Eligibility:
- Working Prototype / Proof of Concept (TRL-3 or above)
- Multidisciplinary team of 3-5 students
- Endorsement by Institutional Chapter SPOC

Please endorse your selected projects through the 'Innovation Repository' tab in your portal.`,
    category: "primary",
    date: "Feb 20",
    fullDate: "Feb 20, 2026, 10:15 AM",
    read: true,
    starred: false,
    important: false,
    folder: "inbox",
    refNumber: "NCIE/CIRC/2026/HACK-03",
    attachments: [
      { name: "Grand_Challenge_Problem_Statements.pdf", size: "3.4 MB", type: "pdf" },
    ],
  },
  {
    id: "MAIL-2026-8510",
    sender: "Institutional SPOC Desk",
    senderEmail: "spoc@iitmadras.ac.in",
    senderRole: "Outgoing Institutional Dispatch",
    senderAvatarBg: "bg-zinc-700",
    recipient: "directorate@ncie.gov.in",
    subject: "Submission of Annual Chapter Innovation & Incubation Roster 2025-26",
    snippet: "Forwarding consolidated annual metrics, verified student counts, and endorsed student innovation projects.",
    body: `To,
The Director, NCIE National Headquarters, New Delhi.

Subject: Annual Chapter Innovation Roster Submission for 2025-26.

Respected Sir/Madam,
We hereby submit the consolidated annual activity and verification report for our institutional chapter. All 124 student internship enrollments and student prototype projects have been reviewed by our chapter committee.

Attached please find the signed endorsement dossier.

Sincerely,
Institutional Chapter Coordinator`,
    category: "primary",
    date: "Feb 18",
    fullDate: "Feb 18, 2026, 3:20 PM",
    read: true,
    starred: false,
    important: false,
    folder: "sent",
    refNumber: "INST/OUT/2026/019",
    attachments: [
      { name: "Annual_Chapter_Report_2026.pdf", size: "4.2 MB", type: "pdf" },
    ],
  },
];

interface Props {
  userOrg?: string;
  userEmail?: string;
  onUnreadCountChange?: (count: number) => void;
}

export default function MailboxTab({ userOrg, userEmail, onUnreadCountChange }: Props) {
  const [mails, setMails] = useState<MailMessage[]>(INITIAL_MAILS);
  const [activeFolder, setActiveFolder] = useState<"inbox" | "starred" | "snoozed" | "sent" | "drafts" | "trash">("inbox");
  const [activeTab, setActiveTab] = useState<"primary" | "directives" | "updates" | "grants">("primary");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Reading pane
  const [readingMailId, setReadingMailId] = useState<string | null>(null);
  
  // Multi-selection
  const [selectedMailIds, setSelectedMailIds] = useState<string[]>([]);

  // Compose floating window
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [isComposeMinimized, setIsComposeMinimized] = useState(false);
  const [isComposeMaximized, setIsComposeMaximized] = useState(false);
  const [composeData, setComposeData] = useState({
    to: "NCIE National Directorate <directorate@ncie.gov.in>",
    subject: "",
    body: "",
  });

  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Folder mail counts (Only Inbox displays unread counts in real Gmail)
  const unreadInboxCount = mails.filter((m) => m.folder === "inbox" && !m.read).length;

  useEffect(() => {
    onUnreadCountChange?.(unreadInboxCount);
  }, [unreadInboxCount, onUnreadCountChange]);

  // Filtered mails for current list view
  const currentFolderMails = useMemo(() => {
    return mails.filter((m) => {
      if (activeFolder === "starred") return m.starred && m.folder !== "trash";
      if (activeFolder === "snoozed") return m.folder === "snoozed";
      if (activeFolder === "sent") return m.folder === "sent";
      if (activeFolder === "drafts") return m.folder === "drafts";
      if (activeFolder === "trash") return m.folder === "trash";

      // Default: inbox
      if (m.folder !== "inbox") return false;
      if (activeTab === "primary") return true; // Show all or primary
      return m.category === activeTab;
    }).filter((m) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return `${m.subject} ${m.sender} ${m.senderEmail} ${m.snippet} ${m.body} ${m.refNumber || ""}`
        .toLowerCase()
        .includes(q);
    });
  }, [mails, activeFolder, activeTab, searchQuery]);

  const readingMail = useMemo(() => {
    return mails.find((m) => m.id === readingMailId) || null;
  }, [mails, readingMailId]);

  // Actions
  const handleOpenMail = (mail: MailMessage) => {
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
    showToast(`${selectedMailIds.length} message(s) moved to Trash.`);
    setSelectedMailIds([]);
  };

  const handleMarkAsReadSelected = () => {
    setMails((prev) =>
      prev.map((m) => (selectedMailIds.includes(m.id) ? { ...m, read: true } : m))
    );
    setSelectedMailIds([]);
    showToast("Marked as read.");
  };

  const handleSendCompose = (e: React.FormEvent) => {
    e.preventDefault();
    if (!composeData.subject.trim() || !composeData.body.trim()) return;

    const newMail: MailMessage = {
      id: `MAIL-${Date.now().toString().slice(-6)}`,
      sender: userOrg || "Institutional Chapter SPOC",
      senderEmail: userEmail || "spoc@institution.edu.in",
      senderRole: "Institutional Chapter SPOC",
      senderAvatarBg: "bg-emerald-800",
      recipient: composeData.to,
      subject: composeData.subject,
      snippet: composeData.body.slice(0, 100) + (composeData.body.length > 100 ? "..." : ""),
      body: composeData.body,
      category: "primary",
      date: "Just now",
      fullDate: `Just now (${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`,
      read: true,
      starred: false,
      important: false,
      folder: "sent",
      refNumber: `INST/DISP/2026/${Date.now().toString().slice(-4)}`,
    };

    setMails((prev) => [newMail, ...prev]);
    setIsComposeOpen(false);
    setComposeData({
      to: "NCIE National Directorate <directorate@ncie.gov.in>",
      subject: "",
      body: "",
    });
    showToast("Message sent.");
  };

  return (
    <div className="bg-[#f6f8fc] -m-4 sm:-m-6 min-h-[calc(100vh-140px)] flex flex-col font-sans select-none">
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
              placeholder="Search in mail"
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
          <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100/80 text-[#0D6B4F] text-[11px] font-bold rounded-full font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0D6B4F]" /> Chapter TLS Workspace
          </span>
          <div className="w-8 h-8 rounded-full bg-[#0D6B4F] text-white font-bold text-xs flex items-center justify-center shadow-xs">
            {userOrg ? userOrg.charAt(0).toUpperCase() : "I"}
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
            {/* Gmail Floating Compose Button */}
            <button
              onClick={() => {
                setIsComposeOpen(true);
                setIsComposeMinimized(false);
              }}
              className="bg-[#c2e7ff] hover:bg-[#b3dcf7] hover:shadow-md text-[#001d35] font-semibold text-xs px-6 py-3.5 rounded-2xl flex items-center gap-3 transition-all cursor-pointer shadow-xs"
            >
              <Plus className="w-5 h-5 text-[#001d35]" />
              <span className="text-xs font-bold tracking-wide">Compose</span>
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
                  <span>Sent</span>
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

            {/* Labels */}
            <div className="pt-3 border-t border-[#e1e3e1] space-y-1">
              <span className="px-4 text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">
                Directives &amp; Categories
              </span>
              <button
                onClick={() => {
                  setActiveFolder("inbox");
                  setActiveTab("directives");
                  setReadingMailId(null);
                }}
                className="w-full flex items-center gap-3 px-4 py-1.5 text-xs text-zinc-700 hover:bg-[#eaebef] rounded-r-full cursor-pointer"
              >
                <Tag className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                <span>Directives</span>
              </button>
              <button
                onClick={() => {
                  setActiveFolder("inbox");
                  setActiveTab("updates");
                  setReadingMailId(null);
                }}
                className="w-full flex items-center gap-3 px-4 py-1.5 text-xs text-zinc-700 hover:bg-[#eaebef] rounded-r-full cursor-pointer"
              >
                <Tag className="w-3.5 h-3.5 text-blue-500 fill-blue-500" />
                <span>Verification</span>
              </button>
              <button
                onClick={() => {
                  setActiveFolder("inbox");
                  setActiveTab("grants");
                  setReadingMailId(null);
                }}
                className="w-full flex items-center gap-3 px-4 py-1.5 text-xs text-zinc-700 hover:bg-[#eaebef] rounded-r-full cursor-pointer"
              >
                <Tag className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" />
                <span>Grant Sanctions</span>
              </button>
            </div>
          </div>

          {/* Storage Meter */}
          <div className="px-4 py-3 space-y-1.5 text-[11px] text-zinc-500 border-t border-[#e1e3e1]">
            <div className="w-full bg-zinc-200 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#0D6B4F] h-full w-[15%]" />
            </div>
            <p>2.1 GB of 15 GB used</p>
          </div>
        </aside>

        {/* ======================================================================= */}
        {/* RIGHT MAIN WORKSPACE (GMAIL LIST OR READING PANE) */}
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
                    handleDeleteSelected();
                    setReadingMailId(null);
                  }}
                  className="p-1.5 hover:bg-zinc-100 rounded-full cursor-pointer"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4 text-zinc-600" />
                </button>
                <button
                  onClick={() => showToast("Marked as unread.")}
                  className="p-1.5 hover:bg-zinc-100 rounded-full cursor-pointer"
                  title="Mark as unread"
                >
                  <Mail className="w-4 h-4 text-zinc-600" />
                </button>
                <button
                  onClick={() => showToast("Added to Starred.")}
                  className="p-1.5 hover:bg-zinc-100 rounded-full cursor-pointer"
                  title="Add star"
                >
                  <Star className="w-4 h-4 text-zinc-600" />
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
                      onClick={() => showToast("Inbox refreshed.")}
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
          {/* GMAIL CATEGORY TABS (PRIMARY / DIRECTIVES / VERIFICATION / GRANTS) */}
          {/* ===================================================================== */}
          {!readingMail && activeFolder === "inbox" && (
            <div className="flex border-b border-[#e1e3e1] text-xs font-bold text-zinc-600">
              {[
                { id: "primary", label: "Primary", icon: <Inbox className="w-4 h-4" /> },
                { id: "directives", label: "Directives & Circulars", icon: <Tag className="w-4 h-4 text-red-500" /> },
                { id: "updates", label: "Verification Updates", icon: <CheckCircle className="w-4 h-4 text-blue-500" /> },
                { id: "grants", label: "Grant Sanctions", icon: <Building className="w-4 h-4 text-emerald-600" /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-3 px-6 py-3 cursor-pointer transition-colors border-b-2 ${
                    activeTab === tab.id
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
            /* FULL EMAIL READING VIEW (DITTO GMAIL) */
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
              {/* Subject Title */}
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <h1 className="text-xl font-semibold text-zinc-900 leading-snug">
                    {readingMail.subject}
                  </h1>
                  {readingMail.refNumber && (
                    <span className="inline-block text-[10px] font-mono font-bold px-2 py-0.5 bg-zinc-100 text-zinc-700 rounded border border-zinc-200">
                      Official Reference: {readingMail.refNumber}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => window.print()}
                  className="p-1.5 hover:bg-zinc-100 rounded-full cursor-pointer text-zinc-500"
                  title="Print email"
                >
                  <Printer className="w-4 h-4" />
                </button>
              </div>

              {/* Sender & Recipient Bar */}
              <div className="flex items-start justify-between gap-4 border-b border-zinc-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${readingMail.senderAvatarBg} text-white font-bold text-sm flex items-center justify-center shadow-xs`}>
                    {readingMail.sender.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-zinc-900">{readingMail.sender}</span>
                      <span className="text-[10px] text-zinc-400 font-mono">&lt;{readingMail.senderEmail}&gt;</span>
                    </div>
                    <p className="text-[11px] text-zinc-500 mt-0.5">
                      to <strong>me</strong> ({userEmail || "spoc@institution.edu.in"})
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
              <div className="text-xs text-zinc-800 leading-relaxed font-sans whitespace-pre-wrap max-w-3xl">
                {readingMail.body}
              </div>

              {/* Attachments (Gmail-style document chips) */}
              {readingMail.attachments && readingMail.attachments.length > 0 && (
                <div className="pt-6 border-t border-zinc-100 space-y-3">
                  <span className="text-xs font-bold text-zinc-700 block">
                    {readingMail.attachments.length} Attachment{readingMail.attachments.length > 1 ? "s" : ""}
                  </span>
                  <div className="flex flex-wrap gap-3">
                    {readingMail.attachments.map((att, idx) => (
                      <div
                        key={idx}
                        className="group w-48 bg-[#f8f9fa] border border-zinc-200 rounded-lg p-3 hover:shadow-md transition-all flex flex-col justify-between"
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
                            onClick={() => showToast(`Downloading: ${att.name}`)}
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

              {/* Bottom Quick Reply Buttons */}
              <div className="pt-6 border-t border-zinc-100 flex items-center gap-3">
                <button
                  onClick={() => {
                    setComposeData({
                      to: `${readingMail.sender} <${readingMail.senderEmail}>`,
                      subject: `Re: ${readingMail.subject}`,
                      body: `\n\n--- On ${readingMail.fullDate}, ${readingMail.sender} wrote: ---\n${readingMail.body}`,
                    });
                    setIsComposeOpen(true);
                  }}
                  className="bg-white hover:bg-zinc-50 text-zinc-700 border border-zinc-300 font-semibold text-xs px-5 py-2 rounded-full flex items-center gap-2 cursor-pointer shadow-2xs"
                >
                  <CornerUpLeft className="w-3.5 h-3.5" /> Reply
                </button>
                <button
                  onClick={() => {
                    setComposeData({
                      to: "",
                      subject: `Fwd: ${readingMail.subject}`,
                      body: `\n\n---------- Forwarded message ---------\nFrom: ${readingMail.sender} <${readingMail.senderEmail}>\nSubject: ${readingMail.subject}\n\n${readingMail.body}`,
                    });
                    setIsComposeOpen(true);
                  }}
                  className="bg-white hover:bg-zinc-50 text-zinc-700 border border-zinc-300 font-semibold text-xs px-5 py-2 rounded-full flex items-center gap-2 cursor-pointer shadow-2xs"
                >
                  <CornerUpRight className="w-3.5 h-3.5" /> Forward
                </button>
              </div>
            </div>
          ) : (
            /* GMAIL EMAIL ROWS LIST */
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

                      {/* Sender Name */}
                      <div className="w-44 shrink-0 truncate">
                        <span className={!mail.read ? "font-bold text-zinc-900" : "text-zinc-700"}>
                          {mail.sender}
                        </span>
                      </div>

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
                      <div className="w-20 text-right shrink-0">
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
                              setMails((prev) =>
                                prev.map((m) => (m.id === mail.id ? { ...m, read: !m.read } : m))
                              );
                            }}
                            className="p-1 hover:bg-zinc-200 rounded-full cursor-pointer text-zinc-500"
                            title="Mark as unread"
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
                  <p className="text-sm font-semibold text-zinc-600">Your mailbox is clear</p>
                  <p className="text-xs text-zinc-400 mt-1">No messages found in this view.</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* ========================================================================= */}
      {/* GMAIL FLOATING COMPOSE POPUP WINDOW */}
      {/* ========================================================================= */}
      {isComposeOpen && (
        <div
          className={`fixed z-50 bg-white rounded-t-xl shadow-2xl border border-zinc-300 flex flex-col transition-all duration-150 ${
            isComposeMaximized
              ? "inset-10"
              : isComposeMinimized
              ? "bottom-0 right-10 w-72 h-10"
              : "bottom-0 right-10 w-[540px] h-[480px]"
          }`}
        >
          {/* Header */}
          <div className="bg-[#f2f6fc] px-4 py-2.5 rounded-t-xl flex items-center justify-between border-b border-zinc-200 select-none">
            <span className="text-xs font-bold text-zinc-800">New Institutional Message</span>
            <div className="flex items-center gap-1.5 text-zinc-500">
              <button
                onClick={() => setIsComposeMinimized(!isComposeMinimized)}
                className="hover:bg-zinc-200 p-1 rounded cursor-pointer"
                title="Minimize"
              >
                <Minimize2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsComposeMaximized(!isComposeMaximized)}
                className="hover:bg-zinc-200 p-1 rounded cursor-pointer"
                title="Maximize"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsComposeOpen(false)}
                className="hover:bg-zinc-200 p-1 rounded cursor-pointer"
                title="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Body when not minimized */}
          {!isComposeMinimized && (
            <form onSubmit={handleSendCompose} className="flex-1 flex flex-col p-3 space-y-2 text-xs">
              {/* Recipients */}
              <div className="flex items-center gap-2 border-b border-zinc-100 pb-1.5">
                <span className="text-zinc-500 w-12 text-[11px] font-medium">To</span>
                <input
                  type="text"
                  value={composeData.to}
                  onChange={(e) => setComposeData((p) => ({ ...p, to: e.target.value }))}
                  required
                  className="flex-1 focus:outline-none text-xs text-zinc-800"
                />
              </div>

              {/* Subject */}
              <div className="border-b border-zinc-100 pb-1.5">
                <input
                  type="text"
                  placeholder="Subject"
                  value={composeData.subject}
                  onChange={(e) => setComposeData((p) => ({ ...p, subject: e.target.value }))}
                  required
                  className="w-full focus:outline-none text-xs text-zinc-800 font-semibold placeholder:font-normal"
                />
              </div>

              {/* Message Textarea */}
              <textarea
                rows={10}
                value={composeData.body}
                onChange={(e) => setComposeData((p) => ({ ...p, body: e.target.value }))}
                placeholder="Write your official message..."
                required
                className="flex-1 w-full focus:outline-none resize-none text-xs text-zinc-800 leading-relaxed font-sans"
              />

              {/* Bottom Toolbar */}
              <div className="pt-2 border-t border-zinc-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    type="submit"
                    className="bg-[#0b57d0] hover:bg-[#0842a0] text-white font-semibold text-xs px-5 py-2 rounded-full cursor-pointer flex items-center gap-1.5 shadow-xs"
                  >
                    Send
                  </button>
                  <button
                    type="button"
                    onClick={() => showToast("Attachment upload opened")}
                    className="p-1.5 hover:bg-zinc-100 rounded-full cursor-pointer text-zinc-500"
                    title="Attach files"
                  >
                    <Paperclip className="w-4 h-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setIsComposeOpen(false)}
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
