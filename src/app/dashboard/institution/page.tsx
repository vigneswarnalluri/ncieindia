"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard, Users, Lightbulb, Landmark, Award,
  LogOut, CheckCircle, ChevronRight, HelpCircle, Printer, Download,
  Menu, X
} from "lucide-react";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { supabase } from "@/lib/supabase";

import OverviewTab from "./components/OverviewTab";
import VerifyTab, { Student } from "./components/VerifyTab";
import InnovationsTab, { Project } from "./components/InnovationsTab";
import GrantsTab, { Grant } from "./components/GrantsTab";
import ActivitiesTab from "./components/ActivitiesTab";

type Tab = "overview" | "verify" | "innovations" | "grants" | "activities";

const MENU: { tab: Tab; label: string; icon: React.ReactNode }[] = [
  { tab: "overview",    label: "Dashboard Overview",     icon: <LayoutDashboard className="w-4 h-4" /> },
  { tab: "verify",      label: "Student Verification",   icon: <Users className="w-4 h-4" /> },
  { tab: "innovations", label: "Innovation Repository",  icon: <Lightbulb className="w-4 h-4" /> },
  { tab: "grants",      label: "Grants & Utilisation",   icon: <Landmark className="w-4 h-4" /> },
  { tab: "activities",  label: "Activity Reporting",     icon: <Award className="w-4 h-4" /> },
];

const INIT_STUDENTS: Student[] = [];

const INIT_PROJECTS: Project[] = [];

const INIT_EVENTS: any[] = [];

const INIT_GRANTS: Grant[] = [];

export default function InstitutionDashboard() {
  const router = useRouter();
  const { session, demoSession, loading } = useAuthGuard();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [students, setStudents] = useState<Student[]>(INIT_STUDENTS);
  const [projects, setProjects] = useState<Project[]>(INIT_PROJECTS);
  const [events, setEvents]     = useState(INIT_EVENTS);
  const [grants, setGrants]     = useState<Grant[]>(INIT_GRANTS);

  const [userOrg, setUserOrg] = useState("Indian Institute of Technology, Madras");
  const [userName, setUserName] = useState("Prof. V. K. Prasad");
  const userEmail = session?.user?.email || demoSession?.email || "spoc@iitmadras.ac.in";
  const userRole = "SPOC";

  // Load real SPOC profile and registrations from Supabase
  useEffect(() => {
    const loadData = async () => {
      let resolvedOrg = "Indian Institute of Technology, Madras";
      const email = session?.user?.email || demoSession?.email;
      
      if (email) {
        try {
          const { data: profile } = await supabase
            .from("registrations")
            .select("org_name, full_name")
            .eq("email", email)
            .maybeSingle();
          if (profile) {
            if (profile.org_name) {
              resolvedOrg = profile.org_name;
              setUserOrg(profile.org_name);
            }
            if (profile.full_name) {
              setUserName(profile.full_name);
            }
          }
        } catch (err) {
          console.error("Failed to fetch SPOC profile:", err);
        }
      }

      try {
        const { data, error } = await supabase
          .from("registrations")
          .select("*")
          .in("role", ["student", "internship"]);
        if (error) {
          console.error("Error fetching registrations:", error);
          return;
        }

        if (data) {
          // Normalization check helper for same organization
          const isSameOrg = (org1: string, org2: string) => {
            const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
            return norm(org1).includes(norm(org2)) || norm(org2).includes(norm(org1));
          };

          const yearMap: Record<string, string> = {
            "1st Year": "I",
            "2nd Year": "II",
            "3rd Year": "III",
            "4th Year": "IV",
            "5th Year": "V",
            "Postgraduate": "PG",
          };

          // Filter matching org_name
          const matched = data.filter((rec: any) => isSameOrg(rec.org_name, resolvedOrg));

          const dbStudents: Student[] = matched.map((rec: any) => ({
            id: rec.reg_id,
            name: rec.full_name,
            rollNo: rec.reg_number || rec.email.split("@")[0].toUpperCase() || rec.reg_id,
            stream: rec.stream || "Engineering & Tech",
            year: yearMap[rec.year_of_study] || rec.year_of_study || "I",
            status: (rec.status || "pending") as Student["status"],
            isDbRecord: true,
          }));

          const dbProjects: Project[] = matched
            .filter((rec: any) => rec.proposal)
            .map((rec: any) => {
              const cleanTitle = rec.proposal.startsWith("Course:")
                ? rec.proposal.split(" | ")[0]
                : (rec.proposal ? rec.proposal.slice(0, 50) + (rec.proposal.length > 50 ? "..." : "") : "Untitled Innovation");
              return {
                id: rec.reg_id,
                title: cleanTitle,
                teamLeader: rec.full_name,
                stream: rec.stream || "Innovation",
                trl: 3,
                status: (rec.status === "approved" ? "endorsed" : "draft") as Project["status"],
                isDbRecord: true,
              };
            });

          setStudents([...dbStudents, ...INIT_STUDENTS]);
          setProjects([...dbProjects, ...INIT_PROJECTS]);
        }
      } catch (err) {
        console.error("Failed to fetch registrations from Supabase:", err);
      }
    };

    if (!loading) {
      loadData();
    }
  }, [session, demoSession, loading]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleStudentAction = async (id: string, action: "approved" | "rejected") => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status: action } : s));
    
    // Check if it is a DB record
    const student = students.find(s => s.id === id);
    if (student?.isDbRecord || id.startsWith("REG-")) {
      try {
        const { error } = await supabase
          .from("registrations")
          .update({ status: action })
          .eq("reg_id", id);
        if (error) {
          console.error("Failed to update registration status in DB:", error);
          showToast(`Error updating status: ${error.message}`);
          return;
        }
      } catch (err) {
        console.error("Error updating registration status:", err);
      }
    }
    showToast(`Membership ${action}. Ref: NCIE-VRF-${Date.now().toString().slice(-6)}`);
  };

  const handleEndorse = async (id: string) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, status: "endorsed" } : p));
    if (id.startsWith("REG-") || !id.startsWith("P")) {
      try {
        const { error } = await supabase
          .from("registrations")
          .update({ status: "approved" })
          .eq("reg_id", id);
        if (error) {
          console.error("Failed to update endorsement in Supabase:", error);
        }
      } catch (err) {
        console.error("Error endorsing project:", err);
      }
    }
    showToast("Project endorsed and forwarded to NCIE National Selection Pool.");
  };

  const handleAddProject = (p: Omit<Project, "id" | "status">) => {
    setProjects(prev => [{ id: `P${Date.now()}`, ...p, status: "draft" }, ...prev]);
    showToast("Project draft saved to Innovation Repository.");
  };

  const handleAddEvent = (e: { title: string; type: string; date: string; attendees: number }) => {
    setEvents(prev => [{ id: `E${Date.now()}`, ...e, status: "pending" }, ...prev]);
    showToast("Activity report submitted for nodal desk verification.");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    let dataToExport: any[] = [];
    let filename = `ncie_export_${activeTab}_${Date.now()}.csv`;

    switch (activeTab) {
      case "verify":
        dataToExport = students.map(s => ({
          ID: s.id,
          Name: s.name,
          "Roll Number": s.rollNo,
          Stream: s.stream,
          Year: s.year,
          Status: s.status,
        }));
        break;
      case "innovations":
        dataToExport = projects.map(p => ({
          ID: p.id,
          Title: p.title,
          "Team Leader": p.teamLeader,
          Stream: p.stream,
          TRL: `TRL-${p.trl}`,
          Status: p.status,
        }));
        break;
      case "grants":
        dataToExport = grants.map(g => ({
          Scheme: g.scheme,
          "Sanction No": g.san,
          Amount: g.amt,
          Tranche: g.tr,
          "UC Status": g.uc,
        }));
        break;
      case "activities":
        dataToExport = events.map(e => ({
          ID: e.id,
          Title: e.title,
          Category: e.type,
          Date: e.date,
          Attendees: e.attendees,
          Status: e.status,
        }));
        break;
      default:
        dataToExport = [
          {
            Metric: "Verified Students",
            Value: students.filter(s => s.status === "approved").length,
          },
          {
            Metric: "Ideas Submitted",
            Value: projects.length,
          },
          {
            Metric: "Grants Received",
            Value: grants.reduce((sum, g) => sum + parseInt(g.amt.replace(/,/g, ""), 10), 0).toLocaleString("en-IN"),
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

  const pendingCount = students.filter(s => s.status === "pending").length;

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
      <div className="bg-[#1a1a1a] text-white text-[10px] px-4 py-1.5 flex flex-col sm:flex-row justify-between items-center gap-1 sm:gap-0">
        <span className="tracking-wider uppercase font-medium text-center sm:text-left">Government of India &nbsp;|&nbsp; Ministry of Education &nbsp;|&nbsp; National Council for Innovation &amp; Entrepreneurship</span>
        <div className="flex items-center gap-4">
          <span className="text-zinc-400">Session: {userName}</span>
          <span className="hidden xs:inline">|</span>
          <span className="text-zinc-400 font-mono">Email: {userEmail}</span>
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
            <p className="text-[11px] font-bold text-[#0D6B4F] uppercase tracking-widest">Institutional Chapter Portal</p>
            <p className="text-[13px] font-bold text-zinc-900">{userOrg}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Logged in as</p>
            <p className="text-xs font-bold text-zinc-800">{userName} &nbsp;|&nbsp; {userRole}</p>
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
            <p className="text-[9px] font-bold text-emerald-200 uppercase tracking-widest">Navigation Menu</p>
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
                {item.tab === "verify" && pendingCount > 0 && (
                  <span className="bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 min-w-[18px] text-center">{pendingCount}</span>
                )}
              </button>
            ))}
            <div className="border-t border-zinc-200 mt-3 pt-3">
              <p className="px-4 text-[9px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Support</p>
              <button className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-zinc-600 hover:bg-zinc-50 cursor-pointer">
                <HelpCircle className="w-4 h-4 text-zinc-400" /> NIC Helpdesk
              </button>
            </div>
          </nav>
          <div className="border-t border-zinc-200 px-4 py-3 bg-zinc-50">
            <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Chapter Status</p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              <span className="text-[11px] font-bold text-emerald-700">Active &amp; Compliant</span>
            </div>
            <p className="text-[9px] text-zinc-400 mt-0.5">MIC Star Rating: ★★★★☆ (4.5)</p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 overflow-y-auto">
          {/* Breadcrumb */}
          <div className="bg-white border-b border-zinc-200 px-6 py-2 flex flex-col xs:flex-row items-start xs:items-center justify-between gap-1.5 xs:gap-0">
            <div className="flex items-center gap-1.5 text-[11px] text-zinc-500">
              <span>Home</span><ChevronRight className="w-3 h-3" />
              <span>Institution Portal</span><ChevronRight className="w-3 h-3" />
              <span className="font-bold text-zinc-800">{MENU.find(m => m.tab === activeTab)?.label}</span>
            </div>
            <div className="flex items-center gap-3 text-[10px] text-zinc-500">
              <button onClick={handlePrint} className="flex items-center gap-1 hover:text-zinc-800 cursor-pointer"><Printer className="w-3 h-3" /> Print</button>
              <button onClick={handleExport} className="flex items-center gap-1 hover:text-zinc-800 cursor-pointer"><Download className="w-3 h-3" /> Export</button>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {activeTab === "overview"    && (() => {
              const totalGrantsVal = grants.reduce((sum, g) => sum + parseInt(g.amt.replace(/,/g, ""), 10), 0);
              const grantsReceivedStr = totalGrantsVal > 0 ? `₹${(totalGrantsVal / 100000).toLocaleString("en-IN")}`.replace(/\.0$/, "") + " L" : "₹0";
              return (
                <OverviewTab
                  pendingCount={pendingCount}
                  verifiedCount={students.filter(s => s.status === "approved").length}
                  ideasCount={projects.length}
                  grantsReceived={grantsReceivedStr}
                />
              );
            })()}
            {activeTab === "verify"      && <VerifyTab      students={students} onAction={handleStudentAction} />}
            {activeTab === "innovations" && <InnovationsTab projects={projects} onEndorse={handleEndorse} onAdd={handleAddProject} />}
            {activeTab === "grants"      && <GrantsTab      grants={grants} onToast={showToast} />}
            {activeTab === "activities"  && <ActivitiesTab  events={events} onAdd={handleAddEvent} />}
          </div>

          <div className="border-t border-zinc-200 bg-white px-6 py-3 flex flex-col md:flex-row justify-between items-center gap-1.5 md:gap-0 text-[10px] text-zinc-400 text-center md:text-left">
            <span>© 2026 National Council for Innovation &amp; Entrepreneurship (NCIE) | Ministry of Education, Govt. of India</span>
            <span className="font-mono">NIC Portal v2.4.1 | TLS 1.3 Secured</span>
          </div>
        </main>
      </div>
    </div>
  );
}
