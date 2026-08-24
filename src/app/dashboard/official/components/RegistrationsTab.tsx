"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  RefreshCw,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  User,
  GraduationCap,
  Building,
  Briefcase,
  Layers,
  Calendar,
  ExternalLink,
  ShieldAlert,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  X,
  Loader2
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export interface RegistrationRecord {
  id?: string | number;
  reg_id: string;
  role: "student" | "internship" | "chapter" | "partner" | "recruitment" | string;
  full_name: string;
  email: string;
  mobile?: string;
  org_name?: string;
  reg_number?: string;
  state?: string;
  city?: string;
  department?: string;
  specialization?: string;
  stream?: string;
  year_of_study?: string;
  inst_type?: string;
  accreditation_code?: string;
  partner_category?: string;
  designation?: string;
  proposal?: string;
  website_url?: string;
  status: "pending" | "approved" | "rejected";
  submitted_at: string;
}

interface Props {
  onNotify?: (msg: string) => void;
}

export default function RegistrationsTab({ onNotify }: Props) {
  const [records, setRecords] = useState<RegistrationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedRecord, setSelectedRecord] = useState<RegistrationRecord | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  const handleSendEmail = async (rec: RegistrationRecord) => {
    if (!rec.email) {
      onNotify?.("Error: Candidate does not have a registered email address.");
      return;
    }
    try {
      setIsSendingEmail(true);
      const res = await fetch("/api/send-confirmation-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: rec.email,
          fullName: rec.full_name,
          regId: rec.reg_id,
          course: extractDetails(rec),
          orgName: rec.org_name,
          paymentId: extractPaymentId(rec.proposal) || "N/A",
          date: rec.submitted_at || new Date().toISOString(),
        }),
      });
      const data = await res.json();
      if (data?.emailSent) {
        onNotify?.(`Official Confirmation Letter successfully dispatched to ${rec.email}`);
      } else {
        onNotify?.(`Notice: ${data?.warning || "Processed PDF successfully."}`);
      }
    } catch (err: any) {
      onNotify?.(`Failed to send email: ${err.message}`);
    } finally {
      setIsSendingEmail(false);
    }
  };

  // Fetch all registrations from Supabase
  const fetchRecords = async () => {
    try {
      setIsRefreshing(true);
      const { data, error } = await supabase
        .from("registrations")
        .select("*")
        .order("submitted_at", { ascending: false });

      if (error) {
        console.error("Error fetching registrations:", error);
        onNotify?.(`Failed to fetch database responses: ${error.message}`);
      } else if (data) {
        setRecords(data as RegistrationRecord[]);
      }
    } catch (err: any) {
      console.error("Fetch exception:", err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRecords();

    // Setup real-time Supabase subscription
    const channel = supabase
      .channel("official_registrations_realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "registrations" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            const newRow = payload.new as RegistrationRecord;
            setRecords((prev) => [newRow, ...prev.filter((r) => r.reg_id !== newRow.reg_id)]);
            onNotify?.(`New ${newRow.role} response received: ${newRow.full_name} (${newRow.reg_id})`);
          } else if (payload.eventType === "UPDATE") {
            const updatedRow = payload.new as RegistrationRecord;
            setRecords((prev) =>
              prev.map((r) => (r.reg_id === updatedRow.reg_id ? updatedRow : r))
            );
          } else if (payload.eventType === "DELETE") {
            const oldRow = payload.old as any;
            if (oldRow?.reg_id) {
              setRecords((prev) => prev.filter((r) => r.reg_id !== oldRow.reg_id));
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Update status directly in Supabase
  const handleStatusUpdate = async (regId: string, newStatus: "approved" | "rejected") => {
    try {
      setUpdatingId(regId);
      const { error } = await supabase
        .from("registrations")
        .update({ status: newStatus })
        .eq("reg_id", regId);

      if (error) {
        onNotify?.(`Failed to update status: ${error.message}`);
        return;
      }

      setRecords((prev) =>
        prev.map((r) => (r.reg_id === regId ? { ...r, status: newStatus } : r))
      );

      if (selectedRecord && selectedRecord.reg_id === regId) {
        setSelectedRecord((prev) => (prev ? { ...prev, status: newStatus } : null));
      }

      onNotify?.(`Application ${regId} marked as ${newStatus.toUpperCase()}`);
    } catch (err: any) {
      console.error("Status update error:", err);
      onNotify?.(`Error: ${err.message || "Failed to update record"}`);
    } finally {
      setUpdatingId(null);
    }
  };

  // Helper to parse uploaded document URLs
  const parseDocumentUrls = (websiteUrlStr?: string) => {
    if (!websiteUrlStr) return null;
    try {
      if (websiteUrlStr.trim().startsWith("{")) {
        return JSON.parse(websiteUrlStr) as {
          consentForm?: string;
          idCard?: string;
          proposalRoster?: string;
        };
      }
    } catch (e) {}
    return null;
  };

  // Extract course or position from proposal text
  const extractDetails = (record: RegistrationRecord) => {
    if (record.role === "internship") {
      if (record.proposal?.includes("Course:")) {
        const match = record.proposal.match(/Course:\s*([^|]+)/i);
        return match ? match[1].trim() : "Viksit Bharat Innovation Program";
      }
      return "Viksit Bharat Innovation Program";
    }
    if (record.role === "recruitment") {
      if (record.designation) return record.designation;
      if (record.proposal?.includes("Position Applied For:")) {
        const match = record.proposal.match(/Position Applied For:\s*([^|]+)/i);
        return match ? match[1].trim() : "Faculty / Officer Application";
      }
      return "Career Recruitment";
    }
    if (record.role === "chapter") {
      return record.inst_type || "STEM College / University";
    }
    if (record.role === "partner") {
      return record.partner_category || "Corporate / Industry Partner";
    }
    return record.stream || "Student Innovator";
  };

  // Extract payment transaction ID if present
  const extractPaymentId = (proposal?: string) => {
    if (!proposal) return null;
    const match = proposal.match(/Payment ID:\s*([^|]+)/i);
    return match ? match[1].trim() : null;
  };

  // Filtered records based on search and pills
  const filteredRecords = records.filter((rec) => {
    // Role filter
    if (selectedRole !== "all" && rec.role !== selectedRole) return false;

    // Status filter
    if (selectedStatus !== "all" && rec.status !== selectedStatus) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const searchable = [
        rec.reg_id,
        rec.full_name,
        rec.email,
        rec.mobile,
        rec.org_name,
        rec.reg_number,
        rec.state,
        rec.city,
        rec.department,
        rec.proposal,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchable.includes(q);
    }

    return true;
  });

  // KPI counts
  const totalCount = records.length;
  const internshipCount = records.filter((r) => r.role === "internship").length;
  const studentCount = records.filter((r) => r.role === "student").length;
  const chapterCount = records.filter((r) => r.role === "chapter").length;
  const partnerCount = records.filter((r) => r.role === "partner").length;
  const recruitmentCount = records.filter((r) => r.role === "recruitment").length;
  const pendingCount = records.filter((r) => r.status === "pending").length;
  const approvedCount = records.filter((r) => r.status === "approved").length;

  // Export to CSV
  const handleExportCsv = () => {
    if (filteredRecords.length === 0) {
      alert("No records to export.");
      return;
    }

    const headers = [
      "Registration ID",
      "Role",
      "Candidate Name",
      "Email",
      "Mobile",
      "Institution / Organization",
      "Roll No / ID",
      "Course / Category",
      "Department",
      "Specialization",
      "Stream",
      "Year",
      "State",
      "City",
      "Payment ID",
      "Status",
      "Submission Date"
    ];

    const rows = filteredRecords.map((r) => [
      r.reg_id,
      r.role,
      r.full_name,
      r.email,
      r.mobile || "N/A",
      r.org_name || "N/A",
      r.reg_number || "N/A",
      extractDetails(r),
      r.department || "N/A",
      r.specialization || "N/A",
      r.stream || "N/A",
      r.year_of_study || "N/A",
      r.state || "N/A",
      r.city || "N/A",
      extractPaymentId(r.proposal) || "N/A",
      r.status,
      r.submitted_at ? new Date(r.submitted_at).toLocaleString("en-IN") : "N/A"
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map((val) => {
            const str = String(val).replace(/"/g, '""');
            return str.includes(",") || str.includes("\n") ? `"${str}"` : str;
          })
          .join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ncie_database_registrations_${selectedRole}_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "internship":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-300">
            <GraduationCap className="w-3 h-3 text-amber-700" /> Course Internship
          </span>
        );
      case "student":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-900 border border-emerald-300">
            <User className="w-3 h-3 text-emerald-700" /> Student Innovator
          </span>
        );
      case "chapter":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-900 border border-blue-300">
            <Building className="w-3 h-3 text-blue-700" /> College Chapter
          </span>
        );
      case "partner":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-900 border border-purple-300">
            <Layers className="w-3 h-3 text-purple-700" /> Ecosystem Partner
          </span>
        );
      case "recruitment":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-900 border border-rose-300">
            <Briefcase className="w-3 h-3 text-rose-700" /> Career Recruitment
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-100 text-zinc-700 border border-zinc-300 uppercase">
            {role}
          </span>
        );
    }
  };

  return (
    <div className="space-y-5">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-base sm:text-lg font-bold text-zinc-900 flex items-center gap-2">
            <span>Live Application Registry & Database Responses</span>
            <span className="text-[11px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded border border-emerald-300">
              Supabase Connected
            </span>
          </h1>
          <p className="text-[11px] text-zinc-500 mt-0.5">
            Real-time responses submitted through the NCIE National Portal across all pathways.
          </p>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
          <button
            onClick={fetchRecords}
            disabled={isRefreshing}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white border border-zinc-300 hover:bg-zinc-50 text-zinc-700 rounded shadow-xs cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-[#0D6B4F]" : ""}`} />
            <span>{isRefreshing ? "Syncing..." : "Refresh"}</span>
          </button>

          <button
            onClick={handleExportCsv}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#0D6B4F] hover:bg-[#09543e] text-white rounded shadow-xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        <div className="bg-white border border-zinc-200 p-3 rounded shadow-xs">
          <span className="text-[10px] uppercase font-bold text-zinc-400 block tracking-wider">Total Submissions</span>
          <span className="text-lg font-extrabold text-zinc-900">{totalCount}</span>
        </div>
        <div className="bg-white border border-zinc-200 p-3 rounded shadow-xs border-l-4 border-l-amber-500">
          <span className="text-[10px] uppercase font-bold text-amber-700 block tracking-wider">Internships (₹700)</span>
          <span className="text-lg font-extrabold text-amber-900">{internshipCount}</span>
        </div>
        <div className="bg-white border border-zinc-200 p-3 rounded shadow-xs border-l-4 border-l-emerald-500">
          <span className="text-[10px] uppercase font-bold text-emerald-700 block tracking-wider">Student Innovators</span>
          <span className="text-lg font-extrabold text-emerald-900">{studentCount}</span>
        </div>
        <div className="bg-white border border-zinc-200 p-3 rounded shadow-xs border-l-4 border-l-blue-500">
          <span className="text-[10px] uppercase font-bold text-blue-700 block tracking-wider">College Chapters</span>
          <span className="text-lg font-extrabold text-blue-900">{chapterCount}</span>
        </div>
        <div className="bg-white border border-zinc-200 p-3 rounded shadow-xs border-l-4 border-l-purple-500">
          <span className="text-[10px] uppercase font-bold text-purple-700 block tracking-wider">Partners & Industry</span>
          <span className="text-lg font-extrabold text-purple-900">{partnerCount}</span>
        </div>
        <div className="bg-white border border-zinc-200 p-3 rounded shadow-xs border-l-4 border-l-rose-500">
          <span className="text-[10px] uppercase font-bold text-rose-700 block tracking-wider">Pending Review</span>
          <span className="text-lg font-extrabold text-rose-900">{pendingCount}</span>
        </div>
      </div>

      {/* Role Filter Tabs / Navigation Pills */}
      <div className="flex flex-wrap gap-1.5 border-b border-zinc-200 pb-3">
        {[
          { id: "all", label: "All Responses", count: totalCount },
          { id: "internship", label: "Course Internships", count: internshipCount },
          { id: "student", label: "Student Innovators", count: studentCount },
          { id: "chapter", label: "Institutional Chapters", count: chapterCount },
          { id: "partner", label: "Ecosystem Partners", count: partnerCount },
          { id: "recruitment", label: "Recruitment / Careers", count: recruitmentCount },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedRole(tab.id)}
            className={`px-3 py-1.5 rounded-sm text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
              selectedRole === tab.id
                ? "bg-[#0D6B4F] text-white shadow-xs"
                : "bg-zinc-100 hover:bg-zinc-200 text-zinc-700"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[9px] font-extrabold ${
                selectedRole === tab.id ? "bg-emerald-950/40 text-white" : "bg-zinc-200 text-zinc-700"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search & Filter Controls Bar */}
      <div className="bg-white border border-zinc-200 p-3 rounded flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search by Name, Reg ID, Email, College..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs border border-zinc-300 rounded focus:outline-none focus:border-[#0D6B4F] bg-zinc-50/50"
          />
          <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-2.5" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-2 text-[10px] text-zinc-400 hover:text-zinc-700 font-bold flex items-center"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <span className="text-[11px] text-zinc-400 flex items-center gap-1 font-semibold">
            <Filter className="w-3 h-3" /> Status:
          </span>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="text-xs border border-zinc-300 rounded px-2.5 py-1.5 bg-white text-zinc-700 font-semibold focus:outline-none focus:border-[#0D6B4F] cursor-pointer"
          >
            <option value="all">All Statuses ({filteredRecords.length})</option>
            <option value="pending">Pending ({records.filter((r) => r.status === "pending").length})</option>
            <option value="approved">Approved ({records.filter((r) => r.status === "approved").length})</option>
            <option value="rejected">Rejected ({records.filter((r) => r.status === "rejected").length})</option>
          </select>
        </div>
      </div>

      {/* Main Database Table */}
      <div className="bg-white border border-zinc-200 rounded shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-[#0D6B4F] text-white text-[10px] uppercase tracking-wider font-bold">
                <th className="px-4 py-2.5 text-left">Reg ID & Date</th>
                <th className="px-4 py-2.5 text-left">Candidate / Contact</th>
                <th className="px-4 py-2.5 text-left">Pathway Role</th>
                <th className="px-4 py-2.5 text-left">Course / Details</th>
                <th className="px-4 py-2.5 text-left">College / Entity</th>
                <th className="px-4 py-2.5 text-center">Status</th>
                <th className="px-4 py-2.5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-zinc-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <span className="w-6 h-6 border-2 border-[#0D6B4F] border-t-transparent rounded-full animate-spin" />
                      <span className="text-xs">Loading database records from Supabase...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredRecords.length > 0 ? (
                filteredRecords.map((r, idx) => {
                  const paymentId = extractPaymentId(r.proposal);
                  const formattedDate = r.submitted_at
                    ? new Date(r.submitted_at).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "N/A";

                  return (
                    <tr
                      key={r.reg_id || idx}
                      className={`${idx % 2 === 0 ? "bg-white" : "bg-zinc-50/40"} hover:bg-emerald-50/40 transition-colors`}
                    >
                      {/* Column 1: Reg ID & Date */}
                      <td className="px-4 py-3">
                        <span className="font-mono font-bold text-emerald-950 block">{r.reg_id}</span>
                        <span className="text-[10px] text-zinc-400 flex items-center gap-1 mt-0.5">
                          <Calendar className="w-2.5 h-2.5" /> {formattedDate}
                        </span>
                      </td>

                      {/* Column 2: Candidate Name & Contact */}
                      <td className="px-4 py-3">
                        <span className="font-bold text-zinc-900 block">{r.full_name}</span>
                        <div className="space-y-0.5 mt-0.5">
                          <span className="text-[10px] text-zinc-500 block truncate max-w-[180px]">
                            {r.email}
                          </span>
                          {r.mobile && (
                            <span className="text-[10px] text-zinc-400 block font-mono">
                              Tel: {r.mobile}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Column 3: Pathway Role */}
                      <td className="px-4 py-3">{getRoleBadge(r.role)}</td>

                      {/* Column 4: Course / Details */}
                      <td className="px-4 py-3 max-w-[200px]">
                        <span className="font-semibold text-zinc-800 block text-xs truncate">
                          {extractDetails(r)}
                        </span>
                        {paymentId && (
                          <span className="text-[10px] text-emerald-700 font-mono font-semibold block mt-0.5">
                            Txn: {paymentId.slice(0, 14)}...
                          </span>
                        )}
                        {r.reg_number && (
                          <span className="text-[10px] text-zinc-400 block font-mono">
                            ID: {r.reg_number}
                          </span>
                        )}
                      </td>

                      {/* Column 5: Organization / College */}
                      <td className="px-4 py-3 max-w-[180px]">
                        <span className="font-semibold text-zinc-800 block text-xs truncate">
                          {r.org_name || "Independent"}
                        </span>
                        {r.state && (
                          <span className="text-[10px] text-zinc-400 block">
                            {r.city ? `${r.city}, ` : ""}{r.state}
                          </span>
                        )}
                      </td>

                      {/* Column 6: Status */}
                      <td className="px-4 py-3 text-center">
                        {r.status === "pending" && (
                          <span className="text-[9px] font-bold px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-300 rounded uppercase">
                            Pending
                          </span>
                        )}
                        {r.status === "approved" && (
                          <span className="text-[9px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded uppercase">
                            Approved
                          </span>
                        )}
                        {r.status === "rejected" && (
                          <span className="text-[9px] font-bold px-2 py-0.5 bg-red-50 text-red-800 border border-red-300 rounded uppercase">
                            Rejected
                          </span>
                        )}
                      </td>

                      {/* Column 7: Actions */}
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => setSelectedRecord(r)}
                            className="bg-[#0D6B4F] hover:bg-[#09543e] text-white text-[10px] font-bold px-2.5 py-1 rounded cursor-pointer inline-flex items-center gap-1 shadow-2xs"
                            title="Inspect Full Application"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Audit</span>
                          </button>

                          {r.status === "pending" && (
                            <>
                              <button
                                onClick={() => handleStatusUpdate(r.reg_id, "approved")}
                                disabled={updatingId === r.reg_id}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold p-1 rounded cursor-pointer"
                                title="Approve"
                              >
                                <CheckCircle className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleStatusUpdate(r.reg_id, "rejected")}
                                disabled={updatingId === r.reg_id}
                                className="bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold p-1 rounded cursor-pointer"
                                title="Reject"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-zinc-400 italic">
                    No database registration records found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 border-t border-zinc-200 bg-zinc-50 flex flex-col sm:flex-row justify-between items-center text-[10px] text-zinc-500 gap-2">
          <span>
            Showing <strong className="text-zinc-800">{filteredRecords.length}</strong> of{" "}
            <strong className="text-zinc-800">{totalCount}</strong> total responses
          </span>
          <span className="text-zinc-400">
            Real-time synchronization with Supabase Postgres active
          </span>
        </div>
      </div>

      {/* Detailed Record Audit Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-zinc-300 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded shadow-2xl animate-scale-up">
            {/* Modal Header */}
            <div className="bg-[#0D6B4F] text-white px-6 py-4 flex justify-between items-center sticky top-0 z-10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-emerald-200 uppercase tracking-widest font-mono">
                    {selectedRecord.reg_id}
                  </span>
                  {getRoleBadge(selectedRecord.role)}
                </div>
                <h3 className="text-base font-extrabold mt-0.5">{selectedRecord.full_name}</h3>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="text-white/80 hover:text-white text-xs border border-white/30 hover:border-white px-2.5 py-1 rounded cursor-pointer flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" /> Close
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              {/* Status Action Banner */}
              <div className="flex items-center justify-between p-3 bg-zinc-50 border border-zinc-200 rounded">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-zinc-700 uppercase">Current Status:</span>
                  {selectedRecord.status === "pending" && (
                    <span className="text-xs font-bold px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-300 rounded uppercase">
                      Pending Audit
                    </span>
                  )}
                  {selectedRecord.status === "approved" && (
                    <span className="text-xs font-bold px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded uppercase">
                      Approved & Verified
                    </span>
                  )}
                  {selectedRecord.status === "rejected" && (
                    <span className="text-xs font-bold px-2 py-0.5 bg-red-50 text-red-800 border border-red-300 rounded uppercase">
                      Rejected
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {selectedRecord.status !== "approved" && (
                    <button
                      onClick={() => handleStatusUpdate(selectedRecord.reg_id, "approved")}
                      disabled={updatingId === selectedRecord.reg_id}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded cursor-pointer flex items-center gap-1 shadow-xs disabled:opacity-50"
                    >
                      <CheckCircle className="w-3.5 h-3.5" /> Approve
                    </button>
                  )}
                  {selectedRecord.status !== "rejected" && (
                    <button
                      onClick={() => handleStatusUpdate(selectedRecord.reg_id, "rejected")}
                      disabled={updatingId === selectedRecord.reg_id}
                      className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded cursor-pointer flex items-center gap-1 shadow-xs disabled:opacity-50"
                    >
                      <XCircle className="w-3.5 h-3.5" /> Reject
                    </button>
                  )}
                </div>
              </div>

              {/* Candidate & Contact Details Table */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                  Applicant & Institution Profile
                </h4>
                <table className="w-full text-xs border border-zinc-200 rounded overflow-hidden">
                  <tbody className="divide-y divide-zinc-100">
                    {[
                      ["Full Name", selectedRecord.full_name],
                      ["Registration ID", selectedRecord.reg_id],
                      ["Email Address", selectedRecord.email],
                      ["Mobile Number", selectedRecord.mobile || "N/A"],
                      ["Institution / College", selectedRecord.org_name || "Independent Candidate"],
                      ["Roll Number / ID", selectedRecord.reg_number || "N/A"],
                      ["Stream & Branch", selectedRecord.stream || "N/A"],
                      ["Year of Study", selectedRecord.year_of_study || "N/A"],
                      ["Department", selectedRecord.department || "N/A"],
                      ["Specialization", selectedRecord.specialization || "N/A"],
                      ["State & City", `${selectedRecord.city ? `${selectedRecord.city}, ` : ""}${selectedRecord.state || "N/A"}`],
                      ["Submission Date", selectedRecord.submitted_at ? new Date(selectedRecord.submitted_at).toLocaleString("en-IN") : "N/A"],
                    ].map(([label, val]) => (
                      <tr key={label} className="even:bg-zinc-50/50">
                        <td className="px-4 py-2 font-bold text-zinc-600 w-48">{label}</td>
                        <td className="px-4 py-2 text-zinc-900 font-medium">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Proposal / SOP / Payment Breakdown */}
              {selectedRecord.proposal && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                    Submitted Proposal & Transaction Details
                  </h4>
                  <div className="bg-zinc-50 border border-zinc-200 p-4 rounded text-xs text-zinc-800 whitespace-pre-wrap leading-relaxed">
                    {selectedRecord.proposal}
                  </div>
                </div>
              )}

              {/* Verification Uploaded Documents */}
              {(() => {
                const docObj = parseDocumentUrls(selectedRecord.website_url);
                if (!docObj) return null;

                return (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                      Uploaded Verification Documents
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {docObj.consentForm && (
                        <div className="border border-zinc-200 p-3 rounded bg-zinc-50 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-[#0D6B4F]" />
                            <span className="text-xs font-bold text-zinc-700">Institutional Consent Form</span>
                          </div>
                          <a
                            href={docObj.consentForm}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#0D6B4F] hover:underline text-[10px] font-bold flex items-center gap-1"
                          >
                            <Download className="w-3.5 h-3.5" /> Download
                          </a>
                        </div>
                      )}

                      {docObj.idCard && (
                        <div className="border border-zinc-200 p-3 rounded bg-zinc-50 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-[#0D6B4F]" />
                            <span className="text-xs font-bold text-zinc-700">Identity Card / Certificate</span>
                          </div>
                          <a
                            href={docObj.idCard}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#0D6B4F] hover:underline text-[10px] font-bold flex items-center gap-1"
                          >
                            <Download className="w-3.5 h-3.5" /> Download
                          </a>
                        </div>
                      )}

                      {docObj.proposalRoster && (
                        <div className="border border-zinc-200 p-3 rounded bg-zinc-50 flex items-center justify-between col-span-1 sm:col-span-2">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-[#0D6B4F]" />
                            <span className="text-xs font-bold text-zinc-700">Proposal Roster / Resume CV</span>
                          </div>
                          <a
                            href={docObj.proposalRoster}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#0D6B4F] hover:underline text-[10px] font-bold flex items-center gap-1"
                          >
                            <Download className="w-3.5 h-3.5" /> Download
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}

              {/* Direct PDF Download and Email Dispatch for Internship Confirmations */}
              {selectedRecord.role === "internship" && (
                <div className="p-3.5 bg-amber-50 border border-amber-200 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-amber-100 rounded-full text-amber-800 shrink-0">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="text-xs text-amber-900 block font-bold">Registration Confirmation Letter</strong>
                      <span className="text-[10px] text-amber-700">Official dynamic PDF issued for {selectedRecord.full_name}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleSendEmail(selectedRecord)}
                      disabled={isSendingEmail}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0D6B4F] hover:bg-[#0a5840] text-white rounded text-xs font-bold cursor-pointer shadow-xs transition-colors disabled:opacity-50"
                    >
                      {isSendingEmail ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Sending Email...</span>
                        </>
                      ) : (
                        <>
                          <Mail className="w-3.5 h-3.5" />
                          <span>Send Email</span>
                        </>
                      )}
                    </button>

                    <a
                      href={`/api/send-confirmation-letter?regId=${encodeURIComponent(selectedRecord.reg_id)}&name=${encodeURIComponent(selectedRecord.full_name)}&course=${encodeURIComponent(extractDetails(selectedRecord))}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded text-xs font-bold cursor-pointer shadow-xs transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
