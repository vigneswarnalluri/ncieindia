"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard, Users, Lightbulb, Landmark, Award,
  LogOut, CheckCircle, ChevronRight, HelpCircle, Printer, Download,
  Menu, X, Mail, ShieldCheck, Building2
} from "lucide-react";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { supabase } from "@/lib/supabase";
import { isSuperAdminEmail } from "@/lib/allowedEmails";
import { normalizeCollegeName } from "@/lib/collegeNormalization";
import { KNOWN_INSTITUTIONS, loadInstitutionMails } from "@/lib/institutionMailbox";

import OverviewTab, { SpocInfo } from "./components/OverviewTab";
import VerifyTab, { Student } from "./components/VerifyTab";
import InnovationsTab, { Project } from "./components/InnovationsTab";
import GrantsTab, { Grant } from "./components/GrantsTab";
import ActivitiesTab from "./components/ActivitiesTab";
import MailboxTab from "./components/MailboxTab";

type Tab = "overview" | "verify" | "innovations" | "grants" | "activities" | "mailbox";

const MENU: { tab: Tab; label: string; icon: React.ReactNode }[] = [
  { tab: "overview",    label: "Dashboard Overview",     icon: <LayoutDashboard className="w-4 h-4" /> },
  { tab: "verify",      label: "Student Verification",   icon: <Users className="w-4 h-4" /> },
  { tab: "innovations", label: "Innovation Repository",  icon: <Lightbulb className="w-4 h-4" /> },
  { tab: "grants",      label: "Grants & Utilisation",   icon: <Landmark className="w-4 h-4" /> },
  { tab: "activities",  label: "Activity Reporting",     icon: <Award className="w-4 h-4" /> },
  { tab: "mailbox",     label: "Institutional Mailbox",  icon: <Mail className="w-4 h-4" /> },
];

const INIT_STUDENTS: Student[] = [];
const INIT_PROJECTS: Project[] = [];
const INIT_EVENTS: any[] = [];
const INIT_GRANTS: Grant[] = [];

// Robust multi-variant check helper for same organization
const isSameOrg = (studentOrg?: string | null, targetOrg?: string | null) => {
  if (!studentOrg || !targetOrg) return false;
  if (targetOrg.includes("All Institutions") || studentOrg.includes("All Institutions")) return true;
  
  const s1 = studentOrg.toLowerCase();
  const s2 = targetOrg.toLowerCase();

  // 1. Direct contains check
  if (s1.includes(s2) || s2.includes(s1)) return true;

  // 2. KKR & KSR / KITS keyword matching
  const isKits1 = s1.includes("kkr") || s1.includes("kits") || (s1.includes("ksr") && (s1.includes("tech") || s1.includes("guntur")));
  const isKits2 = s2.includes("kkr") || s2.includes("kits") || (s2.includes("ksr") && (s2.includes("tech") || s2.includes("guntur")));
  if (isKits1 && isKits2) return true;

  // 3. Normalized names matching
  const n1 = normalizeCollegeName(studentOrg).toLowerCase().replace(/[^a-z0-9]/g, "");
  const n2 = normalizeCollegeName(targetOrg).toLowerCase().replace(/[^a-z0-9]/g, "");
  if (n1.includes(n2) || n2.includes(n1)) return true;

  // 4. Significant token overlap
  const stopWords = new Set(["college", "institute", "of", "technology", "sciences", "and", "&", "the", "university", "autonomous", "engineering", "deemed"]);
  const tokens1 = s1.split(/[^a-z0-9]+/).filter(t => t.length > 2 && !stopWords.has(t));
  const tokens2 = s2.split(/[^a-z0-9]+/).filter(t => t.length > 2 && !stopWords.has(t));
  return tokens1.some(t => tokens2.includes(t));
};

export default function InstitutionDashboard() {
  const router = useRouter();
  const { session, demoSession, loading, isSuperAdmin } = useAuthGuard();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [students, setStudents] = useState<Student[]>(INIT_STUDENTS);
  const [projects, setProjects] = useState<Project[]>(INIT_PROJECTS);
  const [events, setEvents]     = useState(INIT_EVENTS);
  const [grants, setGrants]     = useState<Grant[]>(INIT_GRANTS);

  const [rawAllStudents, setRawAllStudents] = useState<Student[]>([]);
  const [rawAllProjects, setRawAllProjects] = useState<Project[]>([]);
  const [allSpocs, setAllSpocs] = useState<SpocInfo[]>([]);
  const [selectedSpocId, setSelectedSpocId] = useState<string>("all");

  const [userOrg, setUserOrg] = useState("");
  const [userName, setUserName] = useState("");
  const [aisheCode, setAisheCode] = useState("");
  const [spocEmail, setSpocEmail] = useState("");
  const [unreadMailCount, setUnreadMailCount] = useState(0);
  const userEmail = session?.user?.email || demoSession?.email || "";
  const isSuper = isSuperAdmin || (userEmail ? isSuperAdminEmail(userEmail) : false);
  const userRole = isSuper ? "SUPER ADMIN / DEV ROOT" : "SPOC";

  useEffect(() => {
    if (typeof window !== "undefined" && userEmail) {
      const mails = loadInstitutionMails(userEmail, userOrg, userName, aisheCode);
      setUnreadMailCount(mails.filter((m) => m.folder === "inbox" && !m.read).length);
    }
  }, [userEmail, userOrg, userName, aisheCode]);

  // Handle selecting a specific SPOC / Institution for Super Admin
  const handleSelectSpoc = (spoc: SpocInfo | null) => {
    if (!spoc || spoc.id === "all") {
      setSelectedSpocId("all");
      setUserOrg("National Central Registry (All Institutions)");
      setUserName("NCIE Master Developer");
      setAisheCode("NCIE-ROOT-ALL");
      setSpocEmail(userEmail);
      setStudents(rawAllStudents);
      setProjects(rawAllProjects);
      showToast("Switched to Consolidated National Registry (All SPOCs Active)");
    } else {
      setSelectedSpocId(spoc.id);
      setUserOrg(spoc.institution);
      setUserName(spoc.name);
      setAisheCode(spoc.aishe);
      setSpocEmail(spoc.email);
      setStudents(rawAllStudents.filter((s) => isSameOrg(s.orgName, spoc.institution)));
      setProjects(rawAllProjects.filter((p) => isSameOrg(p.college, spoc.institution)));
      showToast(`Active Chapter: ${spoc.shortName || spoc.institution} (SPOC: ${spoc.name})`);
    }
  };

  // Load real SPOC profile, all chapters, and registrations from Supabase or known institutions
  useEffect(() => {
    const loadData = async () => {
      let resolvedOrg = "";
      const email = session?.user?.email || demoSession?.email;
      const isSuperUser = isSuperAdmin || (email && isSuperAdminEmail(email));
      let matchedKnown = email ? KNOWN_INSTITUTIONS.find(
        (k) => k.email.toLowerCase() === email.toLowerCase()
      ) : undefined;
      
      if (email) {
        // First check demo session
        if (demoSession?.org) {
          resolvedOrg = demoSession.org;
          setUserOrg(demoSession.org);
        }
        if (demoSession?.name && demoSession?.role === "chapter") {
          setUserName(demoSession.name);
        }
        if (demoSession?.aishe) {
          setAisheCode(demoSession.aishe);
        }

        // Check known institutions
        if (matchedKnown) {
          resolvedOrg = matchedKnown.name;
          setUserOrg(matchedKnown.name);
          setUserName(matchedKnown.spoc);
          setAisheCode(matchedKnown.aishe);
          setSpocEmail(matchedKnown.email);
        }

        try {
          const { data: profile } = await supabase
            .from("registrations")
            .select("org_name, full_name, accreditation_code, reg_number, email, role")
            .eq("email", email)
            .maybeSingle();
          if (profile) {
            if (profile.org_name) {
              resolvedOrg = profile.org_name;
              setUserOrg(profile.org_name);
            }
            if (profile.role === "chapter") {
              if (profile.full_name) {
                setUserName(profile.full_name);
              }
              if (profile.email) {
                setSpocEmail(profile.email);
              }
              if (profile.accreditation_code || profile.reg_number) {
                setAisheCode(profile.accreditation_code || profile.reg_number);
              }
            }
          } else if (isSuperUser && !demoSession?.org) {
            setUserOrg("National Central Registry (All Institutions)");
            setUserName("NCIE Master Developer");
            setAisheCode("NCIE-ROOT-ALL");
          }
        } catch (err) {
          console.error("Failed to fetch SPOC profile:", err);
        }
      }

      try {
        const { data, error } = await supabase
          .from("registrations")
          .select("*")
          .order("submitted_at", { ascending: false });
        if (error) {
          console.error("Error fetching registrations:", error);
          return;
        }

        if (data) {
          const yearMap: Record<string, string> = {
            "1st Year": "I",
            "2nd Year": "II",
            "3rd Year": "III",
            "4th Year": "IV",
            "5th Year": "V",
            "Postgraduate": "PG",
          };

          // Filter out chapters and corporate partners to get student & internship records
          const studentRecords = data.filter(
            (rec: any) => rec.role !== "chapter" && rec.role !== "partner" && rec.role !== "recruitment"
          );

          // Build unified SPOC list from known institutions + database chapter registrations
          const knownList: SpocInfo[] = KNOWN_INSTITUTIONS.map((k, idx) => ({
            id: `known-${idx}`,
            name: k.spoc,
            institution: k.name,
            shortName: k.shortName,
            aishe: k.aishe,
            email: k.email,
            city: k.city,
            state: k.state,
            grantAmount: k.grantAmount || "₹8.00 Lakhs",
            studentCount: 0,
          }));

          const dbChapters = data.filter((r: any) => r.role === "chapter");
          const dbList: SpocInfo[] = dbChapters.map((r: any) => ({
            id: r.reg_id,
            name: r.full_name || "Institutional SPOC",
            designation: r.designation || "SPOC & Coordinator",
            institution: r.org_name || "Registered Chapter",
            shortName: r.org_name ? (r.org_name.split(",")[0] || r.org_name) : "Chapter",
            aishe: r.accreditation_code || r.reg_number || `AISHE-${r.reg_id.slice(-4)}`,
            email: r.email,
            phone: r.mobile,
            city: r.city,
            state: r.state,
            grantAmount: "₹8.00 Lakhs",
            studentCount: 0,
          }));

          // Deduplicate DB chapters if multiple registrations exist for the same institution
          const uniqueDbList: SpocInfo[] = [];
          for (const dbItem of dbList) {
            const alreadyExists = uniqueDbList.some(
              (existing) =>
                isSameOrg(existing.institution, dbItem.institution) ||
                (existing.email && dbItem.email && existing.email.toLowerCase() === dbItem.email.toLowerCase())
            );
            if (!alreadyExists) {
              uniqueDbList.push(dbItem);
            }
          }

          // Include known institutions only if they are not already covered by live DB registrations
          const remainingKnown: SpocInfo[] = knownList.filter((k) => {
            return !uniqueDbList.some(
              (dbItem) =>
                isSameOrg(k.institution, dbItem.institution) ||
                isSameOrg(k.shortName, dbItem.institution) ||
                (k.email && dbItem.email && k.email.toLowerCase() === dbItem.email.toLowerCase())
            );
          });

          const mergedSpocs = [...uniqueDbList, ...remainingKnown];

          mergedSpocs.forEach((spoc) => {
            spoc.studentCount = studentRecords.filter((rec: any) => isSameOrg(rec.org_name, spoc.institution)).length;
          });
          setAllSpocs(mergedSpocs);

          // Map all student records
          const allDbStudents: Student[] = studentRecords.map((rec: any) => {
            let courseName = "";
            let paymentId = "";
            if (rec.proposal?.includes("Course:")) {
              const match = rec.proposal.match(/Course:\s*([^|]+)/i);
              if (match) courseName = match[1].trim();
            }
            if (rec.proposal?.includes("Payment ID:") || rec.proposal?.includes("Txn:")) {
              const match = rec.proposal.match(/(?:Payment ID|Txn):\s*([^|\s]+)/i);
              if (match) paymentId = match[1].trim();
            }

            return {
              id: rec.reg_id,
              name: rec.full_name,
              rollNo: rec.reg_number || rec.email.split("@")[0].toUpperCase() || rec.reg_id,
              stream: rec.stream || "Engineering & Tech",
              year: yearMap[rec.year_of_study] || rec.year_of_study || "I",
              status: (rec.status || "pending") as Student["status"],
              docUrl: rec.website_url,
              role: rec.role || "internship",
              course: courseName || (rec.role === "internship" ? "Viksit Bharat Innovation Leadership Programme" : undefined),
              paymentId: paymentId || undefined,
              email: rec.email,
              mobile: rec.mobile,
              orgName: normalizeCollegeName(rec.org_name),
              department: rec.department,
              specialization: rec.specialization,
              state: rec.state,
              city: rec.city,
              submittedAt: rec.submitted_at,
              proposal: rec.proposal,
              isDbRecord: true,
            };
          });

          // Map all project records
          const allDbProjects: Project[] = studentRecords
            .filter((rec: any) => rec.role === "student" || (rec.role !== "internship" && rec.role !== "chapter" && rec.role !== "recruitment"))
            .map((rec: any) => {
              let cleanTitle = rec.proposal ? rec.proposal.trim() : "";
              if (cleanTitle.includes("Project Title:")) {
                const match = cleanTitle.match(/Project Title:\s*([^|\n]+)/i);
                if (match) cleanTitle = match[1].trim();
              } else if (cleanTitle.includes("Title:")) {
                const match = cleanTitle.match(/Title:\s*([^|\n]+)/i);
                if (match) cleanTitle = match[1].trim();
              } else if (cleanTitle.length < 4) {
                cleanTitle = `${rec.stream || rec.department || "Student"} Innovation Project`;
              } else if (cleanTitle.length > 65) {
                cleanTitle = cleanTitle.slice(0, 65) + "...";
              }

              return {
                id: rec.reg_id,
                title: cleanTitle || `${rec.full_name}'s Innovation Project`,
                teamLeader: rec.full_name,
                email: rec.email,
                mobile: rec.mobile,
                college: normalizeCollegeName(rec.org_name),
                rollNo: rec.reg_number || rec.accreditation_code,
                stream: rec.stream || rec.department || "Innovation & Technology",
                trl: 3,
                status: (rec.status === "approved" ? "endorsed" : "draft") as Project["status"],
                description: rec.proposal || "Student Innovation & Prototype Submission",
                proposal: rec.proposal || "",
                docUrl: rec.website_url,
                submittedAt: rec.created_at || rec.submitted_at,
                isDbRecord: true,
              };
            });

          setRawAllStudents(allDbStudents);
          setRawAllProjects(allDbProjects);

          if (isSuperUser && (!resolvedOrg || resolvedOrg.includes("All Institutions"))) {
            setUserOrg("National Central Registry (All Institutions)");
            setUserName("NCIE Master Developer");
            setAisheCode("NCIE-ROOT-ALL");
            setStudents(allDbStudents);
            setProjects(allDbProjects);
          } else {
            // Filter matching org_name strictly for the active institution
            const matchedStudents = resolvedOrg && !resolvedOrg.includes("All Institutions")
              ? allDbStudents.filter((s) => isSameOrg(s.orgName, resolvedOrg))
              : allDbStudents;
            const matchedProjects = resolvedOrg && !resolvedOrg.includes("All Institutions")
              ? allDbProjects.filter((p) => isSameOrg(p.college, resolvedOrg))
              : allDbProjects;

            // Resolve the official Chapter SPOC / Head for this institution
            const chapterHead = data.find((r: any) => r.role === "chapter" && isSameOrg(r.org_name, resolvedOrg));
            if (chapterHead) {
              const formattedSpoc = chapterHead.designation
                ? `${chapterHead.full_name} (${chapterHead.designation} & SPOC)`
                : `${chapterHead.full_name} (SPOC)`;
              setUserName(formattedSpoc);
              if (chapterHead.email) setSpocEmail(chapterHead.email);
              if (chapterHead.accreditation_code || chapterHead.reg_number) {
                setAisheCode(chapterHead.accreditation_code || chapterHead.reg_number);
              }
            } else if (matchedKnown) {
              setUserName(matchedKnown.spoc);
              setAisheCode(matchedKnown.aishe);
              setSpocEmail(matchedKnown.email);
            }

            setStudents(matchedStudents);
            setProjects(matchedProjects);
          }

          setGrants([]);

          // Stored Activities for the institution
          const storedEvents = typeof window !== "undefined" && email ? localStorage.getItem(`ncie_activities_${email}`) : null;
          if (storedEvents) {
            try {
              setEvents(JSON.parse(storedEvents));
            } catch (e) {
              setEvents([]);
            }
          } else {
            setEvents([]);
          }
        }
      } catch (err) {
        console.error("Failed to fetch registrations from Supabase:", err);
      }
    };

    if (!loading) {
      loadData();
    }
  }, [session, demoSession, loading, isSuperAdmin]);

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

  const handleBatchStudentAction = async (ids: string[], action: "approved" | "rejected") => {
    if (ids.length === 0) return;
    setStudents(prev => prev.map(s => ids.includes(s.id) ? { ...s, status: action } : s));

    const dbIds = ids.filter(id => id.startsWith("REG-") || id.startsWith("PROJ-") || students.find(s => s.id === id)?.isDbRecord);
    if (dbIds.length > 0) {
      try {
        const { error } = await supabase
          .from("registrations")
          .update({ status: action })
          .in("reg_id", dbIds);
        if (error) {
          console.error("Failed to batch update registrations:", error);
          showToast(`Error batch updating: ${error.message}`);
          return;
        }
      } catch (err) {
        console.error("Error updating batch registration status:", err);
      }
    }
    showToast(`Successfully ${action} ${ids.length} candidate application(s).`);
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

  const handleAddProject = async (p: Omit<Project, "id" | "status">) => {
    const regId = `PROJ-2026-${Date.now().toString().slice(-4)}`;
    const fullProposal = `Project Title: ${p.title} | Team Leader: ${p.teamLeader} | Stream: ${p.stream} | TRL-${p.trl} | Abstract: ${p.description || "Project draft initiated by institutional chapter."}`;
    
    const newProject: Project = {
      id: regId,
      title: p.title,
      teamLeader: p.teamLeader,
      email: p.email || userEmail,
      mobile: p.mobile || "",
      college: userOrg,
      rollNo: p.rollNo || "",
      stream: p.stream,
      trl: p.trl,
      status: "draft",
      description: p.description || p.proposal || "Project draft registered in institutional innovation repository.",
      proposal: fullProposal,
      submittedAt: new Date().toISOString(),
      isDbRecord: true,
    };

    setProjects(prev => [newProject, ...prev]);
    showToast("Project draft saved and registered to Innovation Repository.");

    try {
      const { error } = await supabase.from("registrations").insert([
        {
          reg_id: regId,
          full_name: p.teamLeader,
          email: p.email || `team_${Date.now()}@ncie.org`,
          mobile: p.mobile || "",
          org_name: userOrg,
          stream: p.stream,
          reg_number: p.rollNo || "",
          role: "student",
          proposal: fullProposal,
          status: "pending",
        }
      ]);
      if (error) {
        console.error("Failed to insert project draft into Supabase:", error);
      }
    } catch (err) {
      console.error("Error saving project draft to DB:", err);
    }
  };

  const handleDeleteProject = async (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    setStudents(prev => prev.filter(s => s.id !== id));
    showToast("Project removed and candidate record deleted.");

    if (id.startsWith("REG-") || id.startsWith("PROJ-")) {
      try {
        const { error } = await supabase
          .from("registrations")
          .delete()
          .eq("reg_id", id);
        if (error) {
          console.error("Failed to delete project from Supabase:", error);
        }
      } catch (err) {
        console.error("Error deleting project from DB:", err);
      }
    }
  };

  const handleAddEvent = (e: { title: string; type: string; date: string; attendees: number }) => {
    const newEvent = { id: `E${Date.now()}`, ...e, status: "pending" };
    setEvents(prev => {
      const updated = [newEvent, ...prev];
      if (typeof window !== "undefined") {
        localStorage.setItem(`ncie_activities_${userEmail}`, JSON.stringify(updated));
      }
      return updated;
    });
    showToast("Activity report submitted for nodal desk verification.");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    let dataToExport: any[] = [];
    const filename = `ncie_export_${activeTab}_${Date.now()}.csv`;

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
        <span className="tracking-wider uppercase font-medium text-center sm:text-left">National Council for Innovation &amp; Entrepreneurship</span>
        <div className="flex items-center gap-4">
          {userName ? (
            <>
              <span className="text-zinc-400">Session: {userName}</span>
              <span className="hidden xs:inline">|</span>
            </>
          ) : null}
          {(spocEmail || userEmail) ? (
            <span className="text-zinc-400 font-mono">Email: {spocEmail || userEmail}</span>
          ) : null}
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
            <p className="text-[13px] font-bold text-zinc-900">{userOrg || "Affiliated Institution"}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {isSuper && allSpocs.length > 0 && (
            <div className="hidden lg:flex items-center gap-1.5 bg-emerald-50 border border-emerald-300 rounded px-2.5 py-1 text-xs shadow-2xs">
              <Building2 className="w-3.5 h-3.5 text-[#0D6B4F] shrink-0" />
              <span className="text-[10px] uppercase font-bold text-[#0D6B4F]">Chapter View:</span>
              <select
                value={selectedSpocId}
                onChange={(e) => {
                  const val = e.target.value;
                  const found = allSpocs.find((s) => s.id === val);
                  handleSelectSpoc(found || null);
                }}
                className="bg-transparent font-bold text-zinc-900 text-xs focus:outline-hidden cursor-pointer max-w-[240px] truncate"
              >
                <option value="all">🌐 All SPOCs (National Central Registry)</option>
                {allSpocs.map((s) => (
                  <option key={s.id} value={s.id}>
                    👤 {s.name} — {s.shortName || s.institution}
                  </option>
                ))}
              </select>
            </div>
          )}
          {isSuper && (
            <button
              onClick={() => router.push("/dashboard/official")}
              className="flex items-center gap-1.5 text-[11px] font-bold text-[#0D6B4F] hover:text-[#094835] border border-[#0D6B4F] bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 transition-all cursor-pointer shadow-2xs"
              title="Switch to Central Administrative Command"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Official Command</span>
            </button>
          )}
          {userName ? (
            <>
              <div className="text-right hidden sm:block">
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Logged in as</p>
                <p className="text-xs font-bold text-zinc-800">{userName} {isSuper ? "(Root Access)" : ""}</p>
              </div>
              <div className="w-px h-8 bg-zinc-200 hidden sm:block" />
            </>
          ) : null}
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
                {item.tab === "mailbox" && unreadMailCount > 0 && (
                  <span className="bg-[#0D6B4F] text-white text-[9px] font-bold px-1.5 py-0.5 min-w-[18px] text-center rounded-xs">{unreadMailCount}</span>
                )}
              </button>
            ))}
            <div className="border-t border-zinc-200 mt-3 pt-3">
              <p className="px-4 text-[9px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Support</p>
              <button className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-zinc-600 hover:bg-zinc-50 cursor-pointer">
                <HelpCircle className="w-4 h-4 text-zinc-400" /> NCIE Helpdesk
              </button>
            </div>
          </nav>
          <div className="border-t border-zinc-200 px-4 py-3 bg-zinc-50">
            <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Chapter Status</p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              <span className="text-[11px] font-bold text-emerald-700">Active &amp; Compliant</span>
            </div>
            <p className="text-[9px] text-zinc-400 mt-0.5">MIC Star Rating: 4.5 / 5.0 (High Rating)</p>
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
                  verifiedCount={students.filter((s) => s.status === "approved").length}
                  ideasCount={projects.length}
                  grantsReceived={grantsReceivedStr}
                  userOrg={userOrg}
                  aisheCode={aisheCode}
                  isSuper={isSuper}
                  spocs={allSpocs}
                  onSelectSpoc={handleSelectSpoc}
                  selectedSpocId={selectedSpocId}
                />
              );
            })()}
            {activeTab === "verify"      && <VerifyTab      students={students} onAction={handleStudentAction} onBatchAction={handleBatchStudentAction} />}
            {activeTab === "innovations" && <InnovationsTab projects={projects} onEndorse={handleEndorse} onAdd={handleAddProject} onDelete={handleDeleteProject} />}
            {activeTab === "grants"      && <GrantsTab      grants={grants} onToast={showToast} userOrg={userOrg} aisheCode={aisheCode} />}
            {activeTab === "activities"  && <ActivitiesTab  events={events} onAdd={handleAddEvent} />}
            {activeTab === "mailbox"     && (
              <MailboxTab
                userOrg={userOrg}
                userEmail={userEmail}
                userName={userName}
                aisheCode={aisheCode}
                onUnreadCountChange={setUnreadMailCount}
              />
            )}
          </div>

          <div className="border-t border-zinc-200 bg-white px-6 py-3 flex flex-col md:flex-row justify-between items-center gap-1.5 md:gap-0 text-[10px] text-zinc-400 text-center md:text-left">
            <span>© 2026 National Council for Innovation &amp; Entrepreneurship (NCIE)</span>
            <span className="font-mono">NCIE Portal v2.4.1 | TLS 1.3 Secured</span>
          </div>
        </main>
      </div>
    </div>
  );
}
