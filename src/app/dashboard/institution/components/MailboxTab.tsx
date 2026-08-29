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

import {
  loadInstitutionMails,
  saveInstitutionMails,
  MailMessage
} from "@/lib/institutionMailbox";

export type { MailMessage };

const INITIAL_MAILS: MailMessage[] = [];

interface Props {
  userOrg?: string;
  userEmail?: string;
  userName?: string;
  aisheCode?: string;
  onUnreadCountChange?: (count: number) => void;
}

export default function MailboxTab({
  userOrg = "Indian Institute of Technology, Madras",
  userEmail = "spoc@iitmadras.ac.in",
  userName = "Institutional Coordinator",
  aisheCode = "AISHE-U-0456",
  onUnreadCountChange,
}: Props) {
  const [mails, setMails] = useState<MailMessage[]>(() =>
    loadInstitutionMails(userEmail, userOrg, userName, aisheCode)
  );

  // Reload when the logged-in institution changes
  useEffect(() => {
    const loaded = loadInstitutionMails(userEmail, userOrg, userName, aisheCode);
    setMails(loaded);

    // Auto-sync any existing local dispatches to central server store
    try {
      const incomingRaw = localStorage.getItem("ncie_incoming_admin_mails");
      if (incomingRaw) {
        const incoming = JSON.parse(incomingRaw);
        if (Array.isArray(incoming) && incoming.length > 0) {
          incoming.forEach((mail: any) => {
            fetch("/api/mailbox", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ mail }),
            }).catch(() => {});
          });
        }
      }
    } catch (e) {}
  }, [userEmail, userOrg, userName, aisheCode]);

  // Persist whenever mails state changes
  useEffect(() => {
    if (userEmail) {
      saveInstitutionMails(userEmail, mails);
    }
  }, [mails, userEmail]);

  // Live fetch and sync incoming communications from central server-side mailbox API
  useEffect(() => {
    const syncWithServer = async () => {
      try {
        const res = await fetch("/api/mailbox");
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.mails)) {
            const serverMails = data.mails;
            const relevant = serverMails.filter((m: any) => {
              // Exclude any message sent by this institution / SPOC
              const isSentByMe =
                (m.senderEmail && userEmail && m.senderEmail.toLowerCase() === userEmail.toLowerCase()) ||
                (m.sender && userName && m.sender.toLowerCase().includes(userName.toLowerCase())) ||
                (m.sender && userOrg && m.sender.toLowerCase().includes(userOrg.toLowerCase()));

              if (isSentByMe) return false;

              if (!m.recipientEmail && !m.institutionName && !m.recipient) return false;
              const matchesEmail =
                (m.recipientEmail && userEmail && m.recipientEmail.toLowerCase() === userEmail.toLowerCase()) ||
                (m.recipient && userEmail && m.recipient.toLowerCase().includes(userEmail.toLowerCase()));
              const matchesOrg =
                m.institutionName &&
                userOrg &&
                (userOrg.toLowerCase().includes(m.institutionName.toLowerCase()) ||
                  m.institutionName.toLowerCase().includes(userOrg.toLowerCase()));
              const matchesAishe =
                m.aisheCode && aisheCode && m.aisheCode.toLowerCase() === aisheCode.toLowerCase();
              return matchesEmail || matchesOrg || matchesAishe;
            });

            if (relevant.length > 0) {
              setMails((prev) => {
                let updated = false;
                const newMails = [...prev];
                relevant.forEach((rm: any) => {
                  if (!newMails.some((existing) => existing.id === rm.id)) {
                    newMails.unshift({
                      id: rm.id,
                      sender: rm.sender || "NCIE Central Administrative Command",
                      senderEmail: rm.senderEmail || "directorate@ncie.gov.in",
                      senderRole: rm.senderRole || "Central Directorate Dispatch",
                      senderAvatarBg: rm.senderAvatarBg || "bg-emerald-900",
                      recipient: userEmail || "SPOC",
                      subject: rm.subject,
                      snippet: rm.snippet || rm.body.slice(0, 100),
                      body: rm.body,
                      category:
                        rm.category === "grants"
                          ? "grants"
                          : rm.category === "directives"
                          ? "directives"
                          : "primary",
                      date: rm.date || "Just now",
                      fullDate: rm.fullDate || "Today",
                      read: rm.read || false,
                      starred: rm.starred || false,
                      important: rm.important ?? true,
                      folder: "inbox",
                      refNumber: rm.refNumber,
                      attachments: rm.attachments,
                    });
                    updated = true;
                  }
                });
                return updated ? newMails : prev;
              });
            }
          }
        }
      } catch (err) {}
    };

    syncWithServer();
    window.addEventListener("storage", syncWithServer);
    window.addEventListener("ncie_mail_update", syncWithServer);
    document.addEventListener("visibilitychange", syncWithServer);

    const interval = setInterval(syncWithServer, 3000);

    return () => {
      window.removeEventListener("storage", syncWithServer);
      window.removeEventListener("ncie_mail_update", syncWithServer);
      document.removeEventListener("visibilitychange", syncWithServer);
      clearInterval(interval);
    };
  }, [userEmail, userOrg, aisheCode]);

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

  // Filtered mails for current list view with deduplication
  const currentFolderMails = useMemo(() => {
    const seen = new Set<string>();
    return mails
      .filter((m) => {
        if (!m || !m.id) return false;
        const uniqueKey = `${m.subject.trim().toLowerCase()}_${m.body.trim().slice(0, 40).toLowerCase()}_${m.folder}`;
        if (seen.has(uniqueKey)) return false;
        seen.add(uniqueKey);

        if (activeFolder === "starred") return m.starred && m.folder !== "trash";
        if (activeFolder === "snoozed") return m.folder === "snoozed";
        if (activeFolder === "sent") return m.folder === "sent";
        if (activeFolder === "drafts") return m.folder === "drafts";
        if (activeFolder === "trash") return m.folder === "trash";

        // Default: inbox
        if (m.folder !== "inbox") return false;
        if (activeTab === "primary") return true;
        return m.category === activeTab;
      })
      .filter((m) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return `${m.subject} ${m.sender} ${m.recipient || ""} ${m.senderEmail} ${m.snippet} ${m.body} ${m.refNumber || ""}`
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
      attachments: attachedFiles.length > 0 ? attachedFiles : undefined,
    };

    setMails((prev) => [newMail, ...prev]);
    setIsComposeOpen(false);

    // Queue copy into central admin mailbox
    try {
      const adminMailItem = {
        id: `ADM-INQ-${Date.now().toString().slice(-6)}`,
        sender: userName ? `${userName} (${userOrg})` : (userOrg || "Institutional SPOC"),
        senderEmail: userEmail || "spoc@institution.edu.in",
        senderRole: `${userOrg || "Institution"} Chapter Bureau`,
        senderAvatarBg: "bg-blue-800",
        recipient: composeData.to || "NCIE Central Directorate <directorate@ncie.gov.in>",
        recipientEmail: "directorate@ncie.gov.in",
        subject: composeData.subject,
        snippet: composeData.body.slice(0, 100) + (composeData.body.length > 100 ? "..." : ""),
        body: composeData.body,
        category: "inquiries" as const,
        date: "Just now",
        fullDate: `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
        read: false,
        starred: false,
        important: true,
        folder: "inbox" as const,
        refNumber: `INST/INQ/2026/${Date.now().toString().slice(-4)}`,
        institutionName: userOrg,
        aisheCode: aisheCode,
        attachments: attachedFiles.length > 0 ? attachedFiles : undefined,
      };

      const incomingRaw = localStorage.getItem("ncie_incoming_admin_mails");
      const incoming = incomingRaw ? JSON.parse(incomingRaw) : [];
      incoming.unshift(adminMailItem);
      localStorage.setItem("ncie_incoming_admin_mails", JSON.stringify(incoming));

      const adminMailsRaw = localStorage.getItem("ncie_admin_mails");
      const adminMails = adminMailsRaw ? JSON.parse(adminMailsRaw) : [];
      adminMails.unshift(adminMailItem);
      localStorage.setItem("ncie_admin_mails", JSON.stringify(adminMails));

      // Dispatch cross-tab & local update events
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("storage"));
        window.dispatchEvent(new CustomEvent("ncie_mail_update"));
      }

      // Persist to central server-side mailbox API for cross-session/cross-window syncing
      fetch("/api/mailbox", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mail: adminMailItem }),
      }).catch((err) => console.warn("Mailbox server sync error:", err));
    } catch (err) {
      console.error("Failed to queue incoming admin email:", err);
    }

    // Dispatch real email via SMTP backend in background
    try {
      fetch("/api/send-institution-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientEmail: "info@ncieindia.org",
          recipientName: "NCIE Central Directorate",
          institutionName: userOrg,
          aisheCode: aisheCode,
          subject: `[${userOrg}] ${composeData.subject}`,
          message: composeData.body,
          senderRole: userName ? `${userName} (Institutional SPOC)` : "Institutional Chapter SPOC",
          templateType: "query",
        }),
      }).catch((err) => console.warn("SMTP background dispatch note:", err));
    } catch (e) {}

    setAttachedFiles([]);
    setComposeData({
      to: "NCIE National Directorate <directorate@ncie.gov.in>",
      subject: "",
      body: "",
    });
    showToast("Official message dispatched to Central Command and saved to Sent.");
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
            <ShieldCheck className="w-3.5 h-3.5 text-[#0D6B4F]" /> {aisheCode || "Chapter"} TLS Workspace
          </span>
          <div className="w-8 h-8 rounded-full bg-[#0D6B4F] text-white font-bold text-xs flex items-center justify-center shadow-xs" title={userOrg}>
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
                    if (readingMail) {
                      setMails((prev) => prev.map((m) => (m.id === readingMail.id ? { ...m, folder: "trash" } : m)));
                      setReadingMailId(null);
                      showToast("Communication moved to Trash.");
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
                      {activeFolder === "sent" ? (
                        <>to <strong>{readingMail.recipient || "NCIE National Directorate"}</strong></>
                      ) : (
                        <>to <strong>me</strong> ({userEmail || "spoc@institution.edu.in"})</>
                      )}
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

                      {/* Sender / Recipient Name */}
                      <div className="w-48 shrink-0 truncate">
                        <span className={!mail.read ? "font-bold text-zinc-900" : "text-zinc-700"}>
                          {activeFolder === "sent" ? `To: ${mail.recipient || "NCIE National Directorate"}` : mail.sender}
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
                rows={isComposeMaximized ? 18 : 8}
                value={composeData.body}
                onChange={(e) => setComposeData((p) => ({ ...p, body: e.target.value }))}
                placeholder="Write your official message..."
                required
                className="flex-1 w-full focus:outline-none resize-none text-xs text-zinc-800 leading-relaxed font-sans"
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
