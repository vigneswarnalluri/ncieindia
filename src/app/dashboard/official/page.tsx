"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard, Building2, Landmark, FileText, Activity,
  LogOut, CheckCircle, ChevronRight, Printer, Download,
  Menu, X, Award
} from "lucide-react";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { supabase } from "@/lib/supabase";

import EcoTab from "./components/EcoTab";
import ChapterTab, { ChapterReq } from "./components/ChapterTab";
import GrantsTab, { GrantRow } from "./components/GrantsTab";
import CircularsTab, { Circular } from "./components/CircularsTab";
import SecurityTab, { AuditLog } from "./components/SecurityTab";
import ProgramsTab from "./components/ProgramsTab";
import { PROGRAMS_DATA } from "@/app/programs/ProgramsClient";

type Tab = "overview" | "verify" | "grants" | "circulars" | "security" | "programs";

const MENU: { tab: Tab; label: string; icon: React.ReactNode }[] = [
  { tab: "overview",  label: "Ecosystem Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
  { tab: "verify",    label: "Chapter Affiliation",  icon: <Building2 className="w-4 h-4" /> },
  { tab: "grants",    label: "Grants Disbursement",  icon: <Landmark className="w-4 h-4" /> },
  { tab: "circulars", label: "Gazette & Circulars",  icon: <FileText className="w-4 h-4" /> },
  { tab: "programs",  label: "Program Registry",     icon: <Award className="w-4 h-4" /> },
  { tab: "security",  label: "Audit & System Logs",  icon: <Activity className="w-4 h-4" /> },
];

const INIT_REQUESTS: ChapterReq[] = [];
const INIT_GRANTS: GrantRow[] = [];
const INIT_CIRCULARS: Circular[] = [];
const INIT_LOGS: AuditLog[] = [];

export default function OfficialDashboard() {
  const router = useRouter();
  const { session, demoSession, loading } = useAuthGuard();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [requests, setRequests] = useState<ChapterReq[]>(INIT_REQUESTS);
  const [grants, setGrants]     = useState<GrantRow[]>(INIT_GRANTS);
  const [circulars, setCirculars] = useState<Circular[]>(INIT_CIRCULARS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INIT_LOGS);

  const userEmail = session?.user?.email || demoSession?.email || "admin@ncie.gov.in";
  const userName = demoSession?.name || (session?.user?.email ? session.user.email.split("@")[0] : "Nodal Administrator");
  const userRole = "NODAL ADMINISTRATOR";

  // Load real registration records from Supabase
  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const { data, error } = await supabase
          .from("registrations")
          .select("*")
          .in("role", ["chapter", "partner"]);
        if (error) {
          console.error("Error fetching registrations:", error);
          return;
        }

        if (data) {
          const dbRequests = data.map((rec: any) => ({
            id: rec.reg_id,
            aishe: rec.accreditation_code || rec.reg_number || ("AISHE-TEMP-" + rec.reg_id.slice(-4)),
            name: rec.org_name,
            state: rec.state || "India",
            type: rec.role === "chapter" ? (rec.inst_type || "STEM College") : (rec.partner_category || "Corporate Partner"),
            spoc: rec.full_name,
            spocEmail: rec.email,
            docUrl: rec.website_url || "Letter_of_Intent.pdf",
            status: rec.status || "pending",
          }));

          setRequests([...dbRequests, ...INIT_REQUESTS]);
        }
      } catch (err) {
        console.error("Failed to fetch registrations from Supabase:", err);
      }
    };

    fetchRegistrations();
  }, []);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3500); };

  const addLog = (code: string, details: string) => {
    const log: AuditLog = { id:`L${Date.now()}`, ts:new Date().toISOString().replace("T"," ").slice(0,19), code, actor:userEmail, ip:"10.150.4.88", details };
    setAuditLogs(prev => [log, ...prev]);
  };

  const handleVerify = async (id: string, action: "approved" | "rejected") => {
    const r = requests.find(r => r.id === id);
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: action } : r));

    if (id.startsWith("REG-")) {
      try {
        const { error } = await supabase
          .from("registrations")
          .update({ status: action })
          .eq("reg_id", id);
        if (error) {
          console.error("Failed to update verification status in Supabase:", error);
          showToast(`Error updating status: ${error.message}`);
          return;
        }
      } catch (err) {
        console.error("Error verifying registration status:", err);
      }
    }

    showToast(`Chapter ${action}. Automated notification dispatched to institution SPOC.`);
    addLog(`CHAPTER_${action.toUpperCase()}`, `${action === "approved" ? "Approved" : "Rejected"} chapter for ${r?.name} (${r?.aishe}).`);
  };

  const handleDisburse = (id: string) => {
    const g = grants.find(g => g.id === id);
    setGrants(prev => prev.map(g => g.id === id ? { ...g, status: "disbursed" } : g));
    showToast(`Fund release authorised. Tranche-${g?.tranche} for ${g?.college} queued for treasury.`);
    addLog("GRANT_RELEASED", `Tranche-${g?.tranche} (₹${((g?.amount||0)/100000).toFixed(2)}L) authorised for ${g?.college}.`);
  };

  const handleAddCircular = (c: Omit<Circular,"id"|"date">) => {
    const newC: Circular = { ...c, id:`C${Date.now()}`, date:new Date().toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}) };
    setCirculars(prev => [newC, ...prev]);
    showToast(`Circular ${newC.ref} dispatched to all chapter nodes.`);
    addLog("CIRCULAR_DISPATCH", `Dispatched: ${newC.title} (${newC.ref}).`);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    let dataToExport: any[] = [];
    let filename = `ncie_official_export_${activeTab}_${Date.now()}.csv`;

    switch (activeTab) {
      case "verify":
        dataToExport = requests.map(r => ({
          AISHE: r.aishe,
          Institution: r.name,
          Type: r.type,
          State: r.state,
          SPOC: r.spoc,
          Email: r.spocEmail,
          Status: r.status,
        }));
        break;
      case "grants":
        dataToExport = grants.map(g => ({
          SanctionNo: g.san,
          College: g.college,
          Scheme: g.scheme,
          Amount: `₹${(g.amount / 100000).toFixed(2)} L`,
          Tranche: `Tranche-${g.tranche}`,
          UCStatus: g.uc,
          Status: g.status,
        }));
        break;
      case "circulars":
        dataToExport = circulars.map(c => ({
          RefNo: c.ref,
          Title: c.title,
          Type: c.type,
          Date: c.date,
          Priority: c.priority,
        }));
        break;
      case "programs":
        dataToExport = PROGRAMS_DATA.map(p => ({
          ID: p.id,
          Title: p.title,
          Subtitle: p.subtitle,
          Category: p.category,
          Budget: p.budget,
          Duration: p.duration,
        }));
        break;
      case "security":
        dataToExport = auditLogs.map(l => ({
          Timestamp: l.ts,
          Code: l.code,
          Actor: l.actor,
          IP: l.ip,
          Details: l.details,
        }));
        break;
      default:
        dataToExport = [
          {
            Metric: "Ecosystem Chapters",
            Value: requests.length,
          },
          {
            Metric: "Pending Audits",
            Value: requests.filter(r => r.status === "pending").length,
          },
          {
            Metric: "Total Grants Disbursed",
            Value: `₹${(grants.reduce((a, g) => a + g.amount, 0) / 100000).toFixed(2)} L`,
          },
        ];
        break;
    }

    if (dataToExport.length === 0) {
      showToast("No records available to export for this tab.");
      return;
    }

    const headers = Object.keys(dataToExport[0]);
    const csvContent = [
      headers.join(","),
      ...dataToExport.map(row =>
        headers
          .map(header => {
            const val = String(row[header] || "");
            const escaped = val.replace(/"/g, '""');
            return escaped.includes(",") || escaped.includes("\n") || escaped.includes('"') ? `"${escaped}"` : escaped;
          })
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`CSV export downloaded: ${filename}`);
  };

  const pendingChapters = requests.filter(r => r.status === "pending").length;

  // Loading / auth guard spinner
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0f2f5]" style={{ fontFamily: "'Arial','Helvetica',sans-serif" }}>
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-4 border-[#0D6B4F]/30 border-t-[#0D6B4F] rounded-full animate-spin mx-auto" />
          <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Verifying session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f2f5] text-[#1a1a1a]" style={{ fontFamily: "'Arial','Helvetica',sans-serif" }}>

      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-[100] bg-[#1a3a2a] text-white text-xs px-5 py-3 shadow-xl border-l-4 border-[#f5a623] flex items-center gap-2 max-w-sm">
          <CheckCircle className="w-4 h-4 text-[#f5a623] shrink-0" /><span>{toast}</span>
        </div>
      )}

      {/* Ministry Top Bar */}
      <div className="bg-[#0D6B4F] text-white text-[10px] px-4 py-1.5 flex flex-col sm:flex-row justify-between items-center gap-1 sm:gap-0">
        <span className="tracking-wider font-medium uppercase text-center sm:text-left">Government of India &nbsp;|&nbsp; Ministry of Education &nbsp;|&nbsp; National Council for Innovation &amp; Entrepreneurship — Central Command</span>
        <div className="flex items-center gap-4 text-emerald-200">
          <span className="font-mono">Email: {userEmail}</span>
          <span className="hidden xs:inline">|</span>
          <span>Session: {userName}</span>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b-2 border-[#0D6B4F] px-4 sm:px-6 py-2.5 sm:py-3 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-4">
          {/* Hamburger Menu for Mobile */}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden text-zinc-700 hover:text-zinc-900 focus:outline-none p-1 border border-zinc-200"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Image src="/logo-new.svg" alt="NCIE India" width={200} height={54} className="h-8 xs:h-10 sm:h-12 w-auto object-contain" unoptimized />
          <div className="w-px h-10 bg-zinc-200 hidden sm:block" />
          <div className="hidden sm:block">
            <p className="text-[11px] font-bold text-[#0D6B4F] uppercase tracking-widest">Central Administrative Command</p>
            <p className="text-[13px] font-bold text-zinc-900">Ministry of Education — Nodal Desk</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Authorization Level</p>
            <p className="text-xs font-bold text-zinc-800">{userRole} — Level 2</p>
          </div>
          <div className="w-px h-8 bg-zinc-200 hidden sm:block" />
          <button
            onClick={async () => {
              localStorage.removeItem("ncie_demo_session");
              document.cookie = "ncie_demo_session=; path=/; max-age=0";
              await supabase.auth.signOut();
              router.replace("/login");
            }}
            className="flex items-center gap-1.5 text-[11px] font-bold text-red-700 hover:text-red-900 border border-red-300 hover:border-red-500 bg-red-50 hover:bg-red-100 px-3 py-1.5 transition-all cursor-pointer">
            <LogOut className="w-3.5 h-3.5" /> <span className="hidden xs:inline">Sign Out</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 relative overflow-hidden">
        {/* Sidebar backdrop for mobile */}
        {isSidebarOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black/50 z-40 transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`
          fixed md:relative inset-y-0 left-0 z-50 w-60 bg-white border-r border-zinc-200 flex flex-col shrink-0 transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:flex
        `}>
          <div className="bg-[#0D6B4F] px-4 py-3 flex justify-between items-center">
            <p className="text-[9px] font-bold text-emerald-200 uppercase tracking-widest">Admin Navigation</p>
            <button className="md:hidden text-white/80 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
              <X className="w-4 h-4" />
            </button>
          </div>
          <nav className="flex-1 py-2">
            {MENU.map(item => (
              <button key={item.tab} onClick={() => { setActiveTab(item.tab); setIsSidebarOpen(false); }}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-xs font-semibold transition-all cursor-pointer border-l-4 text-left ${
                  activeTab === item.tab
                    ? "border-[#0D6B4F] bg-[#e8f5f0] text-[#0D6B4F]"
                    : "border-transparent text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300"
                }`}>
                <span className="flex items-center gap-2.5">
                  <span className={activeTab === item.tab ? "text-[#0D6B4F]" : "text-zinc-400"}>{item.icon}</span>
                  {item.label}
                </span>
                {item.tab === "verify" && pendingChapters > 0 && (
                  <span className="bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 min-w-[18px] text-center">{pendingChapters}</span>
                )}
              </button>
            ))}
          </nav>
          <div className="border-t border-zinc-200 px-4 py-3 bg-zinc-50">
            <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Server Status</p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              <span className="text-[11px] font-bold text-emerald-700">All Systems Operational</span>
            </div>
            <p className="text-[9px] text-zinc-400 mt-0.5 font-mono">Node-77B | TLS 1.3</p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 overflow-y-auto">
          {/* Breadcrumb */}
          <div className="bg-white border-b border-zinc-200 px-6 py-2 flex flex-col xs:flex-row items-start xs:items-center justify-between gap-1.5 xs:gap-0">
            <div className="flex items-center gap-1.5 text-[11px] text-zinc-500">
              <span>Admin</span><ChevronRight className="w-3 h-3" />
              <span>Central Command</span><ChevronRight className="w-3 h-3" />
              <span className="font-bold text-zinc-800">{MENU.find(m => m.tab === activeTab)?.label}</span>
            </div>
            <div className="flex items-center gap-3 text-[10px] text-zinc-500">
              <button onClick={handlePrint} className="flex items-center gap-1 hover:text-zinc-800 cursor-pointer"><Printer className="w-3 h-3"/> Print</button>
              <button onClick={handleExport} className="flex items-center gap-1 hover:text-zinc-800 cursor-pointer"><Download className="w-3 h-3"/> Export</button>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {activeTab === "overview"  && <EcoTab />}
            {activeTab === "verify"    && <ChapterTab requests={requests} onVerify={handleVerify} />}
            {activeTab === "grants"    && <GrantsTab grants={grants} onDisburse={handleDisburse} />}
            {activeTab === "circulars" && <CircularsTab circulars={circulars} onAdd={handleAddCircular} />}
            {activeTab === "programs"  && <ProgramsTab onToast={showToast} />}
            {activeTab === "security"  && <SecurityTab logs={auditLogs} />}
          </div>

          <div className="border-t border-zinc-200 bg-white px-6 py-3 flex flex-col md:flex-row justify-between items-center gap-1.5 md:gap-0 text-[10px] text-zinc-400 text-center md:text-left">
            <span>© 2026 National Council for Innovation &amp; Entrepreneurship | Ministry of Education, Government of India</span>
            <span className="font-mono">NIC Admin Portal v2.4.1 | TLS 1.3 | CERT-IN Compliant</span>
          </div>
        </main>
      </div>
    </div>
  );
}
