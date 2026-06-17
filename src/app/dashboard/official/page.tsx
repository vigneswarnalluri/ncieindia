"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard, Building2, Landmark, FileText, Activity,
  LogOut, CheckCircle, ChevronRight, Printer, Download,
  Menu, X
} from "lucide-react";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { supabase } from "@/lib/supabase";

import EcoTab from "./components/EcoTab";
import ChapterTab, { ChapterReq } from "./components/ChapterTab";
import GrantsTab, { GrantRow } from "./components/GrantsTab";
import CircularsTab, { Circular } from "./components/CircularsTab";
import SecurityTab, { AuditLog } from "./components/SecurityTab";

type Tab = "overview" | "verify" | "grants" | "circulars" | "security";

const MENU: { tab: Tab; label: string; icon: React.ReactNode }[] = [
  { tab: "overview",  label: "Ecosystem Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
  { tab: "verify",    label: "Chapter Affiliation",  icon: <Building2 className="w-4 h-4" /> },
  { tab: "grants",    label: "Grants Disbursement",  icon: <Landmark className="w-4 h-4" /> },
  { tab: "circulars", label: "Gazette & Circulars",  icon: <FileText className="w-4 h-4" /> },
  { tab: "security",  label: "Audit & System Logs",  icon: <Activity className="w-4 h-4" /> },
];

const INIT_REQUESTS: ChapterReq[] = [
  { id:"CR1", aishe:"C-11054", name:"Delhi Technological University",   state:"Delhi",       type:"Deemed University",   spoc:"Dr. Alok Kumar",    spocEmail:"alok@dtu.ac.in",     docUrl:"AICTE_DTU_2026.pdf",  status:"pending"  },
  { id:"CR2", aishe:"C-41220", name:"College of Engineering, Pune",     state:"Maharashtra", type:"Autonomous College",  spoc:"Prof. S. R. Joshi", spocEmail:"sr.joshi@coep.ac.in",docUrl:"UGC_COEP_2026.pdf",   status:"pending"  },
  { id:"CR3", aishe:"C-39502", name:"Jadavpur University",             state:"West Bengal", type:"State University",    spoc:"Prof. T. Dey",      spocEmail:"t.dey@ju.edu",       docUrl:"JU_Accred_2026.pdf",  status:"approved" },
  { id:"CR4", aishe:"C-12055", name:"RV College of Engineering",       state:"Karnataka",   type:"Autonomous College",  spoc:"Dr. H. N. Harish",  spocEmail:"harish@rvce.edu.in", docUrl:"RVCE_Affil_2026.pdf", status:"pending"  },
];

const INIT_GRANTS: GrantRow[] = [
  { id:"G1", college:"IIT Madras",                 scheme:"Makerspace Setup Fund",       san:"NCIE/MSF/2026/IIT-MDR/001", amount:1000000, uc:"approved",      tranche:2, status:"pending"   },
  { id:"G2", college:"Delhi Technological Univ.",  scheme:"Prototype Sandbox Seed Pool", san:"NCIE/PSP/2026/DTU/004",     amount:250000,  uc:"pending_audit", tranche:1, status:"pending"   },
  { id:"G3", college:"College of Engg., Pune",     scheme:"Makerspace Setup Fund",       san:"NCIE/MSF/2026/COEP/002",    amount:1500000, uc:"approved",      tranche:1, status:"disbursed"  },
];

const INIT_CIRCULARS: Circular[] = [
  { id:"C1", ref:"NCIE/NCRC/2026/18", title:"NIDHI-CIS Grant Deadline Extension",             date:"16-Jun-2026", type:"Circular",  priority:"High"   },
  { id:"C2", ref:"NCIE/FIN/2026/11",  title:"UC Submission Mandate — Phase 1 Beneficiaries", date:"10-Jun-2026", type:"Directive", priority:"High"   },
  { id:"C3", ref:"NCIE/ADM/2026/09",  title:"MIC Star Rating Self-Assessment Portal Open",    date:"02-Jun-2026", type:"Notice",    priority:"Normal" },
];

const INIT_LOGS: AuditLog[] = [
  { id:"L1", ts:"2026-06-16 12:15:30", code:"AUTH_LOGIN",       actor:"nic-admin@ncie.gov.in", ip:"10.150.4.88", details:"Successful MFA login. Role: NODAL_ADMIN."                                  },
  { id:"L2", ts:"2026-06-16 11:45:12", code:"CHAPTER_APPROVED", actor:"nic-admin@ncie.gov.in", ip:"10.150.4.88", details:"Approved chapter affiliation — Jadavpur University (C-39502)."            },
  { id:"L3", ts:"2026-06-16 10:20:05", code:"GRANT_DISBURSED",  actor:"fin-ctrl@ncie.gov.in",  ip:"10.150.6.12", details:"Tranche-1 disbursed (₹15L) to College of Engineering, Pune."             },
];

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

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3500); };

  const addLog = (code: string, details: string) => {
    const log: AuditLog = { id:`L${Date.now()}`, ts:new Date().toISOString().replace("T"," ").slice(0,19), code, actor:userEmail, ip:"10.150.4.88", details };
    setAuditLogs(prev => [log, ...prev]);
  };

  const handleVerify = (id: string, action: "approved" | "rejected") => {
    const r = requests.find(r => r.id === id);
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: action } : r));
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
          <Image src="/logo-new.png" alt="NCIE India" width={200} height={54} className="h-8 xs:h-10 sm:h-12 w-auto object-contain" unoptimized />
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
              <button className="flex items-center gap-1 hover:text-zinc-800 cursor-pointer"><Printer className="w-3 h-3"/> Print</button>
              <button className="flex items-center gap-1 hover:text-zinc-800 cursor-pointer"><Download className="w-3 h-3"/> Export</button>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {activeTab === "overview"  && <EcoTab />}
            {activeTab === "verify"    && <ChapterTab requests={requests} onVerify={handleVerify} />}
            {activeTab === "grants"    && <GrantsTab grants={grants} onDisburse={handleDisburse} />}
            {activeTab === "circulars" && <CircularsTab circulars={circulars} onAdd={handleAddCircular} />}
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
