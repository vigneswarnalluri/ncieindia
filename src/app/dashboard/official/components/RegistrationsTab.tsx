"use client";

import React, { useState, useEffect, useMemo } from "react";
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
  Check,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  SlidersHorizontal,
  RotateCcw,
  Paperclip,
  Database,
  Printer,
  Copy,
  FileSpreadsheet,
  ClipboardList
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { normalizeCollegeName } from "@/lib/collegeNormalization";
import SendInstitutionMailModal, { MailRecipientInfo } from "./SendInstitutionMailModal";

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
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [isBatchUpdating, setIsBatchUpdating] = useState(false);

  // Selection & Modal State
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<RegistrationRecord | null>(null);
  const [mailRecipient, setMailRecipient] = useState<MailRecipientInfo | null>(null);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Primary Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [filterCollege, setFilterCollege] = useState<string>("all");
  const [filterCourse, setFilterCourse] = useState<string>("all");
  const [filterStream, setFilterStream] = useState<string>("all");
  const [filterYear, setFilterYear] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");

  // Advanced Filters
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [filterDept, setFilterDept] = useState<string>("all");
  const [filterDoc, setFilterDoc] = useState<string>("all");
  const [filterPayment, setFilterPayment] = useState<string>("all");
  const [filterDateRange, setFilterDateRange] = useState<string>("all");

  // Pagination State
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  // Helper to extract course or position
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

  // Helper to extract payment transaction ID if present
  const extractPaymentId = (proposal?: string) => {
    if (!proposal) return null;
    const match = proposal.match(/Payment ID:\s*([^|]+)/i);
    return match ? match[1].trim() : null;
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

  // Batch status update directly in Supabase
  const handleBatchStatusUpdate = async (action: "approved" | "rejected") => {
    if (selectedIds.length === 0) return;
    try {
      setIsBatchUpdating(true);
      const { error } = await supabase
        .from("registrations")
        .update({ status: action })
        .in("reg_id", selectedIds);

      if (error) {
        onNotify?.(`Batch update failed: ${error.message}`);
        return;
      }

      setRecords((prev) =>
        prev.map((r) => (selectedIds.includes(r.reg_id) ? { ...r, status: action } : r))
      );

      onNotify?.(`Successfully marked ${selectedIds.length} application(s) as ${action.toUpperCase()}`);
      setSelectedIds([]);
    } catch (err: any) {
      console.error("Batch update error:", err);
      onNotify?.(`Error: ${err.message || "Failed batch update"}`);
    } finally {
      setIsBatchUpdating(false);
    }
  };

  // Dispatch Official Confirmation Letter via SMTP API
  const handleSendConfirmationEmail = async (rec: RegistrationRecord) => {
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

  const handleOpenMailModal = (rec: RegistrationRecord) => {
    setMailRecipient({
      recipientEmail: rec.email || "",
      recipientName: rec.full_name || "Applicant / Coordinator",
      institutionName: rec.org_name || rec.full_name || "Institution / Entity",
      aisheCode: rec.accreditation_code || rec.reg_number || rec.reg_id,
      role: rec.role,
    });
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    onNotify?.(`Copied ${id} to clipboard.`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Dynamic filter dropdown options derived from dataset
  const uniqueColleges = useMemo(() => {
    const orgs = records.map((r) => normalizeCollegeName(r.org_name)).filter(Boolean) as string[];
    return Array.from(new Set(orgs)).sort();
  }, [records]);

  const uniqueCourses = useMemo(() => {
    const courses = records.map((r) => extractDetails(r)).filter(Boolean) as string[];
    return Array.from(new Set(courses)).sort();
  }, [records]);

  const uniqueStreams = useMemo(() => {
    const streams = records.map((r) => r.stream).filter(Boolean) as string[];
    return Array.from(new Set(streams)).sort();
  }, [records]);

  const uniqueYears = useMemo(() => {
    const years = records.map((r) => r.year_of_study).filter(Boolean) as string[];
    return Array.from(new Set(years)).sort();
  }, [records]);

  const uniqueDepts = useMemo(() => {
    const depts = records.map((r) => r.department).filter(Boolean) as string[];
    return Array.from(new Set(depts)).sort();
  }, [records]);

  // Reset all filters
  const handleClearFilters = () => {
    setSelectedRole("all");
    setSelectedStatus("all");
    setFilterCollege("all");
    setFilterCourse("all");
    setFilterStream("all");
    setFilterYear("all");
    setFilterDept("all");
    setFilterDoc("all");
    setFilterPayment("all");
    setFilterDateRange("all");
    setSearchQuery("");
    setSortBy("newest");
    setCurrentPage(1);
  };

  const activeAdvancedCount = [
    filterDept !== "all",
    filterDoc !== "all",
    filterPayment !== "all",
    filterDateRange !== "all",
  ].filter(Boolean).length;

  const hasActiveFilters =
    selectedRole !== "all" ||
    selectedStatus !== "all" ||
    filterCollege !== "all" ||
    filterCourse !== "all" ||
    filterStream !== "all" ||
    filterYear !== "all" ||
    activeAdvancedCount > 0 ||
    searchQuery.trim() !== "" ||
    sortBy !== "newest";

  // Filter and Sort Logic
  const filteredRecords = useMemo(() => {
    const now = new Date().getTime();
    const oneDay = 24 * 60 * 60 * 1000;
    const sevenDays = 7 * oneDay;
    const thirtyDays = 30 * oneDay;

    return records
      .filter((r) => {
        // Role filter
        if (selectedRole !== "all" && r.role !== selectedRole) return false;

        // Status filter
        if (selectedStatus !== "all" && r.status !== selectedStatus) return false;

        // College filter
        if (filterCollege !== "all" && normalizeCollegeName(r.org_name) !== filterCollege) return false;

        // Course filter
        if (filterCourse !== "all" && extractDetails(r) !== filterCourse) return false;

        // Stream filter
        if (filterStream !== "all" && r.stream !== filterStream) return false;

        // Year filter
        if (filterYear !== "all" && r.year_of_study !== filterYear) return false;

        // Department filter
        if (filterDept !== "all" && r.department !== filterDept) return false;

        // Document attachment filter
        const docs = parseDocumentUrls(r.website_url);
        const hasDocs = Boolean(docs || r.website_url);
        if (filterDoc === "has_docs" && !hasDocs) return false;
        if (filterDoc === "no_docs" && hasDocs) return false;

        // Payment status filter
        const paymentId = extractPaymentId(r.proposal);
        if (filterPayment === "paid" && !paymentId) return false;
        if (filterPayment === "unpaid" && paymentId) return false;

        // Date Range filter
        if (filterDateRange !== "all") {
          if (!r.submitted_at) return false;
          const subTime = new Date(r.submitted_at).getTime();
          if (isNaN(subTime)) return false;
          const diff = now - subTime;
          if (filterDateRange === "today" && diff > oneDay) return false;
          if (filterDateRange === "week" && diff > sevenDays) return false;
          if (filterDateRange === "month" && diff > thirtyDays) return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const searchable = [
            r.reg_id,
            r.full_name,
            r.email,
            r.mobile,
            r.org_name,
            r.reg_number,
            r.state,
            r.city,
            r.department,
            r.specialization,
            r.stream,
            r.year_of_study,
            r.proposal,
            extractPaymentId(r.proposal),
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

          if (!searchable.includes(q)) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "newest") {
          const tA = a.submitted_at ? new Date(a.submitted_at).getTime() : 0;
          const tB = b.submitted_at ? new Date(b.submitted_at).getTime() : 0;
          return tB - tA;
        }
        if (sortBy === "oldest") {
          const tA = a.submitted_at ? new Date(a.submitted_at).getTime() : 0;
          const tB = b.submitted_at ? new Date(b.submitted_at).getTime() : 0;
          return tA - tB;
        }
        if (sortBy === "name_asc") {
          return a.full_name.localeCompare(b.full_name);
        }
        if (sortBy === "name_desc") {
          return b.full_name.localeCompare(a.full_name);
        }
        if (sortBy === "college") {
          return (a.org_name || "").localeCompare(b.org_name || "");
        }
        if (sortBy === "course") {
          return extractDetails(a).localeCompare(extractDetails(b));
        }
        if (sortBy === "roll_asc") {
          return (a.reg_number || a.reg_id).localeCompare(b.reg_number || b.reg_id);
        }
        if (sortBy === "status") {
          return a.status.localeCompare(b.status);
        }
        return 0;
      });
  }, [
    records,
    selectedRole,
    selectedStatus,
    filterCollege,
    filterCourse,
    filterStream,
    filterYear,
    filterDept,
    filterDoc,
    filterPayment,
    filterDateRange,
    searchQuery,
    sortBy,
  ]);

  // Overall & Scoped counts
  const totalCount = records.length;
  const internshipCount = records.filter((r) => r.role === "internship").length;
  const studentCount = records.filter((r) => r.role === "student").length;
  const chapterCount = records.filter((r) => r.role === "chapter").length;
  const partnerCount = records.filter((r) => r.role === "partner").length;
  const recruitmentCount = records.filter((r) => r.role === "recruitment").length;
  const pendingCount = records.filter((r) => r.status === "pending").length;
  const approvedCount = records.filter((r) => r.status === "approved").length;
  const rejectedCount = records.filter((r) => r.status === "rejected").length;

  // Pagination calculations
  const totalPages = pageSize === -1 ? 1 : Math.max(1, Math.ceil(filteredRecords.length / pageSize));
  const effectiveCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = pageSize === -1 ? 0 : (effectiveCurrentPage - 1) * pageSize;
  const paginatedRecords = pageSize === -1 ? filteredRecords : filteredRecords.slice(startIndex, startIndex + pageSize);

  // Multi-Selection Handlers
  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAllPage = () => {
    const pageIds = paginatedRecords.map((r) => r.reg_id);
    const allPageSelected = pageIds.length > 0 && pageIds.every((id) => selectedIds.includes(id));
    if (allPageSelected) {
      setSelectedIds((prev) => prev.filter((id) => !pageIds.includes(id)));
    } else {
      setSelectedIds((prev) => Array.from(new Set([...prev, ...pageIds])));
    }
  };

  const handleSelectAllFiltered = () => {
    setSelectedIds(filteredRecords.map((r) => r.reg_id));
  };

  const handleClearSelection = () => {
    setSelectedIds([]);
  };

  // Export handlers
  const handleExportCsv = () => {
    if (filteredRecords.length === 0) {
      alert("No records to export.");
      return;
    }

    const headers = [
      "S.No",
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

    const rows = filteredRecords.map((r, idx) => [
      idx + 1,
      r.reg_id,
      r.role,
      r.full_name,
      r.email,
      r.mobile || "N/A",
      normalizeCollegeName(r.org_name) || "N/A",
      r.reg_number || "N/A",
      extractDetails(r),
      r.department || "N/A",
      r.specialization || "N/A",
      r.stream || "N/A",
      r.year_of_study || "N/A",
      r.state || "N/A",
      r.city || "N/A",
      extractPaymentId(r.proposal) || "N/A",
      r.status.toUpperCase(),
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
    a.download = `NCIE_Application_Registry_${selectedRole}_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportSelectedCsv = () => {
    const selectedRecords = records.filter((r) => selectedIds.includes(r.reg_id));
    if (selectedRecords.length === 0) return;

    const headers = [
      "S.No",
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

    const rows = selectedRecords.map((r, idx) => [
      idx + 1,
      r.reg_id,
      r.role,
      r.full_name,
      r.email,
      r.mobile || "N/A",
      normalizeCollegeName(r.org_name) || "N/A",
      r.reg_number || "N/A",
      extractDetails(r),
      r.department || "N/A",
      r.specialization || "N/A",
      r.stream || "N/A",
      r.year_of_study || "N/A",
      r.state || "N/A",
      r.city || "N/A",
      extractPaymentId(r.proposal) || "N/A",
      r.status.toUpperCase(),
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
    a.download = `NCIE_Selected_Applications_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Pagination page numbers generator with ellipsis
  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: (number | string)[] = [];
    if (effectiveCurrentPage <= 4) {
      pages.push(1, 2, 3, 4, 5, "...", totalPages);
    } else if (effectiveCurrentPage >= totalPages - 3) {
      pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, "...", effectiveCurrentPage - 1, effectiveCurrentPage, effectiveCurrentPage + 1, "...", totalPages);
    }
    return pages;
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
    <div className="space-y-4 font-sans select-none">
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3 bg-white p-4 border border-zinc-200 shadow-2xs rounded-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold text-zinc-900">Live Application Registry &amp; Verification Desk</h1>
            <span className="px-2 py-0.5 bg-emerald-50 text-[#0D6B4F] border border-emerald-200 text-[10px] font-bold uppercase tracking-wider rounded-xs font-mono">
              Live Queue
            </span>
          </div>
          <p className="text-[11px] text-zinc-500 mt-0.5">
            Audit, verify, batch-process, and dispatch official communications for all candidates and institutional chapter enrollments.
          </p>
        </div>

        {/* Quick KPI Badges & Actions */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <button
            onClick={() => {
              setSelectedRole("all");
              setSelectedStatus("all");
              setCurrentPage(1);
            }}
            className="px-3 py-1.5 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded text-zinc-700 font-medium flex items-center gap-1.5 cursor-pointer transition-colors"
            title="View All Applications"
          >
            <span className="text-[10px] uppercase text-zinc-400 font-bold">Total:</span>
            <strong className="text-zinc-900 font-bold">{totalCount}</strong>
          </button>
          <button
            onClick={() => {
              setSelectedRole("all");
              setSelectedStatus("pending");
              setCurrentPage(1);
            }}
            className="px-3 py-1.5 bg-amber-50/80 hover:bg-amber-100 border border-amber-200 rounded text-amber-900 font-medium flex items-center gap-1.5 cursor-pointer transition-colors"
            title="View Pending Applications"
          >
            <span className="text-[10px] uppercase text-amber-600 font-bold">Pending:</span>
            <strong className="text-amber-800 font-bold">{pendingCount}</strong>
          </button>
          <button
            onClick={() => {
              setSelectedRole("all");
              setSelectedStatus("approved");
              setCurrentPage(1);
            }}
            className="px-3 py-1.5 bg-emerald-50/80 hover:bg-emerald-100 border border-emerald-200 rounded text-emerald-900 font-medium flex items-center gap-1.5 cursor-pointer transition-colors"
            title="View Approved Applications"
          >
            <span className="text-[10px] uppercase text-emerald-600 font-bold">Approved:</span>
            <strong className="text-emerald-800 font-bold">{approvedCount}</strong>
          </button>
          {rejectedCount > 0 && (
            <button
              onClick={() => {
                setSelectedRole("all");
                setSelectedStatus("rejected");
                setCurrentPage(1);
              }}
              className="px-3 py-1.5 bg-red-50/80 hover:bg-red-100 border border-red-200 rounded text-red-900 font-medium flex items-center gap-1.5 cursor-pointer transition-colors"
              title="View Rejected Applications"
            >
              <span className="text-[10px] uppercase text-red-600 font-bold">Rejected:</span>
              <strong className="text-red-800 font-bold">{rejectedCount}</strong>
            </button>
          )}
          <button
            onClick={fetchRecords}
            disabled={isRefreshing}
            className="px-3 py-1.5 bg-white hover:bg-zinc-50 text-zinc-700 border border-zinc-300 rounded font-bold text-xs cursor-pointer transition-colors flex items-center gap-1.5 shadow-2xs disabled:opacity-50"
            title="Refresh records from Supabase"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-[#0D6B4F]" : ""}`} />
            <span>{isRefreshing ? "Syncing..." : "Refresh"}</span>
          </button>
          <button
            onClick={handleExportCsv}
            className="px-3 py-1.5 bg-[#0D6B4F] hover:bg-[#09543e] text-white rounded font-bold text-xs cursor-pointer transition-colors flex items-center gap-1.5 shadow-2xs"
            title="Export filtered records as CSV"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Role Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          {[
            { id: "all", label: "All Responses", count: totalCount, badgeClass: "bg-zinc-100 text-zinc-700" },
            { id: "internship", label: "Course Internships", count: internshipCount, badgeClass: "bg-amber-100 text-amber-900" },
            { id: "student", label: "Student Innovators", count: studentCount, badgeClass: "bg-emerald-100 text-emerald-900" },
            { id: "chapter", label: "Institutional Chapters", count: chapterCount, badgeClass: "bg-blue-100 text-blue-900" },
            { id: "partner", label: "Ecosystem Partners", count: partnerCount, badgeClass: "bg-purple-100 text-purple-900" },
            { id: "recruitment", label: "Recruitment / Careers", count: recruitmentCount, badgeClass: "bg-rose-100 text-rose-900" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setSelectedRole(tab.id);
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-xs text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs ${
                selectedRole === tab.id
                  ? "bg-[#0D6B4F] text-white border border-[#0D6B4F]"
                  : "bg-white hover:bg-zinc-100 text-zinc-700 border border-zinc-200"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  selectedRole === tab.id ? "bg-white/20 text-white" : tab.badgeClass
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Reset Filters button if any active */}
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="px-2.5 py-1 text-xs text-red-700 hover:text-red-900 bg-red-50 hover:bg-red-100 border border-red-200 rounded cursor-pointer transition-colors flex items-center gap-1 font-semibold"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>

      {/* Main Filter Toolbar */}
      <div className="bg-white border border-zinc-200 p-3.5 space-y-3 rounded-xs shadow-2xs">
        {/* Row 1: Primary Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-2.5">
          {/* Live Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Name, Reg ID, College..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-8 py-1.5 text-xs bg-zinc-50 border border-zinc-200 rounded focus:bg-white focus:outline-none focus:border-[#0D6B4F] transition-all font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setCurrentPage(1);
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 p-0.5 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* College / Institution Filter Dropdown */}
          <div>
            <select
              value={filterCollege}
              onChange={(e) => {
                setFilterCollege(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full py-1.5 px-2.5 text-xs bg-zinc-50 border border-zinc-200 rounded focus:bg-white focus:outline-none focus:border-[#0D6B4F] text-zinc-700 font-medium cursor-pointer truncate"
              title={filterCollege !== "all" ? filterCollege : "All Colleges / Institutions"}
            >
              <option value="all">College: All Colleges</option>
              {uniqueColleges.map((col) => (
                <option key={col} value={col}>
                  {col}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter Dropdown */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full py-1.5 px-2.5 text-xs bg-zinc-50 border border-zinc-200 rounded focus:bg-white focus:outline-none focus:border-[#0D6B4F] text-zinc-700 font-medium cursor-pointer"
            >
              <option value="all">Status: All ({filteredRecords.length})</option>
              <option value="pending">Status: Pending ({records.filter((r) => r.status === "pending").length})</option>
              <option value="approved">Status: Approved ({records.filter((r) => r.status === "approved").length})</option>
              <option value="rejected">Status: Rejected ({records.filter((r) => r.status === "rejected").length})</option>
            </select>
          </div>

          {/* Course Filter Dropdown */}
          <div>
            <select
              value={filterCourse}
              onChange={(e) => {
                setFilterCourse(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full py-1.5 px-2.5 text-xs bg-zinc-50 border border-zinc-200 rounded focus:bg-white focus:outline-none focus:border-[#0D6B4F] text-zinc-700 font-medium cursor-pointer truncate"
            >
              <option value="all">Course: All Courses</option>
              {uniqueCourses.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Stream / Branch Filter Dropdown */}
          <div>
            <select
              value={filterStream}
              onChange={(e) => {
                setFilterStream(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full py-1.5 px-2.5 text-xs bg-zinc-50 border border-zinc-200 rounded focus:bg-white focus:outline-none focus:border-[#0D6B4F] text-zinc-700 font-medium cursor-pointer truncate"
            >
              <option value="all">Stream: All Streams</option>
              {uniqueStreams.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Year of Study Filter Dropdown */}
          <div>
            <select
              value={filterYear}
              onChange={(e) => {
                setFilterYear(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full py-1.5 px-2.5 text-xs bg-zinc-50 border border-zinc-200 rounded focus:bg-white focus:outline-none focus:border-[#0D6B4F] text-zinc-700 font-medium cursor-pointer truncate"
            >
              <option value="all">Year: All Years</option>
              {uniqueYears.map((yr) => (
                <option key={yr} value={yr}>
                  Year {yr}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full py-1.5 px-2.5 text-xs bg-zinc-50 border border-zinc-200 rounded focus:bg-white focus:outline-none focus:border-[#0D6B4F] text-zinc-700 font-medium cursor-pointer"
            >
              <option value="newest">Sort: Newest First</option>
              <option value="oldest">Sort: Oldest First</option>
              <option value="name_asc">Sort: Name (A-Z)</option>
              <option value="name_desc">Sort: Name (Z-A)</option>
              <option value="college">Sort: College Name</option>
              <option value="course">Sort: Course Name</option>
              <option value="roll_asc">Sort: Roll / Reg ID</option>
              <option value="status">Sort: Verification Status</option>
            </select>
          </div>
        </div>

        {/* Row 2: Advanced Filter Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-zinc-100 text-xs">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded border transition-colors cursor-pointer font-medium ${
              showAdvanced || activeAdvancedCount > 0
                ? "bg-emerald-50 text-[#0D6B4F] border-emerald-300 font-bold"
                : "bg-zinc-50 hover:bg-zinc-100 text-zinc-700 border-zinc-200"
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>More Filters</span>
            {activeAdvancedCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#0D6B4F] text-white text-[9px] flex items-center justify-center font-mono font-bold ml-0.5">
                {activeAdvancedCount}
              </span>
            )}
          </button>
        </div>

        {/* Expandable Advanced Filters Row */}
        {showAdvanced && (
          <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-xs grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 animate-fadeIn">
            {/* Department Filter */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1 flex items-center gap-1">
                <Building className="w-3 h-3 text-zinc-400" /> Department
              </label>
              <select
                value={filterDept}
                onChange={(e) => {
                  setFilterDept(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full py-1.5 px-2 text-xs bg-white border border-zinc-300 rounded focus:outline-none focus:border-[#0D6B4F] text-zinc-700 font-medium cursor-pointer truncate"
              >
                <option value="all">All Departments</option>
                {uniqueDepts.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Document Attachment Filter */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1 flex items-center gap-1">
                <Paperclip className="w-3 h-3 text-zinc-400" /> Attachment Files
              </label>
              <select
                value={filterDoc}
                onChange={(e) => {
                  setFilterDoc(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full py-1.5 px-2 text-xs bg-white border border-zinc-300 rounded focus:outline-none focus:border-[#0D6B4F] text-zinc-700 font-medium cursor-pointer"
              >
                <option value="all">All Submissions</option>
                <option value="has_docs">With Uploaded Documents</option>
                <option value="no_docs">No Documents Attached</option>
              </select>
            </div>

            {/* Payment Verification Filter */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1 flex items-center gap-1">
                <CreditCard className="w-3 h-3 text-zinc-400" /> Payment Status
              </label>
              <select
                value={filterPayment}
                onChange={(e) => {
                  setFilterPayment(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full py-1.5 px-2 text-xs bg-white border border-zinc-300 rounded focus:outline-none focus:border-[#0D6B4F] text-zinc-700 font-medium cursor-pointer"
              >
                <option value="all">All Payment Types</option>
                <option value="paid">Paid (With Transaction ID)</option>
                <option value="unpaid">Unpaid / Free Application</option>
              </select>
            </div>

            {/* Date Range Filter */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-zinc-400" /> Date Submitted
              </label>
              <select
                value={filterDateRange}
                onChange={(e) => {
                  setFilterDateRange(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full py-1.5 px-2 text-xs bg-white border border-zinc-300 rounded focus:outline-none focus:border-[#0D6B4F] text-zinc-700 font-medium cursor-pointer"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Past 7 Days</option>
                <option value="month">Past 30 Days</option>
              </select>
            </div>
          </div>
        )}

        {/* Active Filters Tag Pills */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-zinc-100 text-xs">
            <span className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">Active Filters:</span>

            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-zinc-100 text-zinc-800 border border-zinc-300 rounded-md font-medium text-xs shadow-2xs">
                <span>Search: &quot;<strong>{searchQuery}</strong>&quot;</span>
                <button
                  onClick={() => setSearchQuery("")}
                  className="p-0.5 rounded hover:bg-zinc-200 text-zinc-500 hover:text-red-600 transition-colors cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filterCollege !== "all" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-indigo-50 text-indigo-900 border border-indigo-300 rounded-md font-medium text-xs shadow-2xs">
                <span>College: <strong>{filterCollege}</strong></span>
                <button
                  onClick={() => setFilterCollege("all")}
                  className="p-0.5 rounded hover:bg-indigo-200 text-indigo-700 hover:text-red-600 transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {selectedStatus !== "all" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-900 border border-amber-300 rounded-md font-medium text-xs shadow-2xs capitalize">
                <span>Status: <strong>{selectedStatus}</strong></span>
                <button
                  onClick={() => setSelectedStatus("all")}
                  className="p-0.5 rounded hover:bg-amber-200 text-amber-700 hover:text-red-600 transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {filterCourse !== "all" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-900 border border-blue-300 rounded-md font-medium text-xs shadow-2xs">
                <span>Course: <strong>{filterCourse}</strong></span>
                <button
                  onClick={() => setFilterCourse("all")}
                  className="p-0.5 rounded hover:bg-blue-200 text-blue-700 hover:text-red-600 transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {filterStream !== "all" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-purple-50 text-purple-900 border border-purple-300 rounded-md font-medium text-xs shadow-2xs">
                <span>Stream: <strong>{filterStream}</strong></span>
                <button
                  onClick={() => setFilterStream("all")}
                  className="p-0.5 rounded hover:bg-purple-200 text-purple-700 hover:text-red-600 transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {filterYear !== "all" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-900 border border-emerald-300 rounded-md font-medium text-xs shadow-2xs">
                <span>Year: <strong>Year {filterYear}</strong></span>
                <button
                  onClick={() => setFilterYear("all")}
                  className="p-0.5 rounded hover:bg-emerald-200 text-emerald-700 hover:text-red-600 transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {filterDept !== "all" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-teal-50 text-teal-900 border border-teal-300 rounded-md font-medium text-xs shadow-2xs">
                <span>Dept: <strong>{filterDept}</strong></span>
                <button
                  onClick={() => setFilterDept("all")}
                  className="p-0.5 rounded hover:bg-teal-200 text-teal-700 hover:text-red-600 transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {filterDoc !== "all" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-cyan-50 text-cyan-900 border border-cyan-300 rounded-md font-medium text-xs shadow-2xs">
                <span>Docs: <strong>{filterDoc === "has_docs" ? "Attached" : "Missing"}</strong></span>
                <button
                  onClick={() => setFilterDoc("all")}
                  className="p-0.5 rounded hover:bg-cyan-200 text-cyan-700 hover:text-red-600 transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {filterPayment !== "all" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-900 border border-green-300 rounded-md font-medium text-xs shadow-2xs">
                <span>Payment: <strong>{filterPayment === "paid" ? "Paid" : "Unpaid"}</strong></span>
                <button
                  onClick={() => setFilterPayment("all")}
                  className="p-0.5 rounded hover:bg-green-200 text-green-700 hover:text-red-600 transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {filterDateRange !== "all" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-orange-50 text-orange-900 border border-orange-300 rounded-md font-medium text-xs shadow-2xs">
                <span>Date: <strong>{filterDateRange}</strong></span>
                <button
                  onClick={() => setFilterDateRange("all")}
                  className="p-0.5 rounded hover:bg-orange-200 text-orange-700 hover:text-red-600 transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            <button
              onClick={handleClearFilters}
              className="text-xs text-red-600 hover:text-red-800 hover:underline font-bold ml-1 cursor-pointer"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Bulk Action Toolbar */}
      {selectedIds.length > 0 && (
        <div className="bg-[#1a3a2a] text-white p-3 rounded-xs shadow-lg flex flex-wrap items-center justify-between gap-3 border-l-4 border-emerald-500 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500 text-white font-mono font-bold text-xs px-2.5 py-0.5 rounded-full shadow-xs">
                {selectedIds.length}
              </span>
              <span className="text-xs font-bold tracking-wide">
                Application{selectedIds.length > 1 ? "s" : ""} Selected
              </span>
            </div>
            {selectedIds.length < filteredRecords.length && (
              <button
                onClick={handleSelectAllFiltered}
                className="text-[11px] text-emerald-300 hover:text-white underline font-semibold cursor-pointer"
              >
                Select all {filteredRecords.length} matching applications
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleBatchStatusUpdate("approved")}
              disabled={isBatchUpdating}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-xs cursor-pointer transition-colors flex items-center gap-1.5 shadow-xs disabled:opacity-50"
              title={`Approve ${selectedIds.length} selected application(s)`}
            >
              {isBatchUpdating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
              <span>Approve ({selectedIds.length})</span>
            </button>
            <button
              onClick={() => handleBatchStatusUpdate("rejected")}
              disabled={isBatchUpdating}
              className="bg-red-600 hover:bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-xs cursor-pointer transition-colors flex items-center gap-1.5 shadow-xs disabled:opacity-50"
              title={`Reject ${selectedIds.length} selected application(s)`}
            >
              {isBatchUpdating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <X className="w-3.5 h-3.5" />}
              <span>Reject ({selectedIds.length})</span>
            </button>
            <button
              onClick={handleExportSelectedCsv}
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-xs border border-white/20 cursor-pointer transition-colors flex items-center gap-1.5"
              title="Export selected applications to CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Selected</span>
            </button>
            <button
              onClick={handleClearSelection}
              className="text-zinc-300 hover:text-white text-xs px-2 py-1.5 cursor-pointer ml-1 font-medium"
            >
              Clear Selection
            </button>
          </div>
        </div>
      )}

      {/* Main Database Table Card */}
      <div className="bg-white border border-zinc-200 rounded-xs shadow-2xs overflow-hidden">
        {/* Table Subheader */}
        <div className="px-4 py-2.5 border-b border-zinc-200 bg-zinc-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <span className="text-xs font-bold text-zinc-800 uppercase tracking-wider flex items-center gap-2">
            <ClipboardList className="w-4 h-4 text-[#0D6B4F]" /> Application Queue
          </span>
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 text-[11px] text-zinc-500">
              <span>Rows per page:</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="py-0.5 px-2 text-xs bg-white border border-zinc-300 rounded focus:outline-none focus:border-[#0D6B4F] text-zinc-800 font-bold cursor-pointer"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={-1}>All ({filteredRecords.length})</option>
              </select>
            </div>
            <span className="text-[10px] text-zinc-500 font-mono border-l border-zinc-200 pl-3">
              Page {effectiveCurrentPage} of {totalPages}
            </span>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-[#0D6B4F] text-white text-[10px] uppercase tracking-wider font-bold select-none">
                <th className="px-3 py-2.5 font-semibold text-center w-10">
                  <input
                    type="checkbox"
                    checked={paginatedRecords.length > 0 && paginatedRecords.every((r) => selectedIds.includes(r.reg_id))}
                    onChange={handleToggleSelectAllPage}
                    className="w-3.5 h-3.5 rounded border-zinc-300 text-[#0D6B4F] focus:ring-[#0D6B4F] cursor-pointer"
                    title="Select All on Current Page"
                  />
                </th>
                <th className="px-3 py-2.5 text-left w-12">S.No.</th>
                <th className="px-4 py-2.5 text-left">Reg ID &amp; Date</th>
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
                  <td colSpan={9} className="px-4 py-12 text-center text-zinc-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <span className="w-6 h-6 border-2 border-[#0D6B4F] border-t-transparent rounded-full animate-spin" />
                      <span className="text-xs">Loading database records from Supabase...</span>
                    </div>
                  </td>
                </tr>
              ) : paginatedRecords.length > 0 ? (
                paginatedRecords.map((r, i) => {
                  const itemIndex = startIndex + i + 1;
                  const isSelected = selectedIds.includes(r.reg_id);
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
                      key={r.reg_id || i}
                      className={`${isSelected ? "bg-[#e8f5f0]/80" : (i % 2 === 0 ? "bg-white" : "bg-zinc-50/50")} hover:bg-[#e8f5f0]/40 transition-colors`}
                    >
                      {/* Selection Checkbox */}
                      <td className="px-3 py-2.5 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelect(r.reg_id)}
                          className="w-3.5 h-3.5 rounded border-zinc-300 text-[#0D6B4F] focus:ring-[#0D6B4F] cursor-pointer"
                        />
                      </td>

                      {/* S.No */}
                      <td className="px-3 py-2.5 text-zinc-500 font-mono font-medium">{itemIndex}</td>

                      {/* Reg ID & Date */}
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-bold text-emerald-950 block">{r.reg_id}</span>
                          <span
                            className="px-1 py-0.2 bg-emerald-100 text-emerald-800 text-[8.5px] font-bold rounded font-mono uppercase"
                            title="Live Database Record"
                          >
                            Live
                          </span>
                        </div>
                        <span className="text-[10px] text-zinc-400 flex items-center gap-1 mt-0.5">
                          <Calendar className="w-2.5 h-2.5" /> {formattedDate}
                        </span>
                      </td>

                      {/* Candidate Name & Contact */}
                      <td className="px-4 py-2.5">
                        <span className="font-bold text-zinc-900 block">{r.full_name}</span>
                        <div className="space-y-0.5 mt-0.5">
                          <a
                            href={`mailto:${r.email}`}
                            className="text-[10px] text-zinc-500 hover:text-[#0D6B4F] hover:underline block truncate max-w-[180px]"
                            title={r.email}
                          >
                            {r.email}
                          </a>
                          {r.mobile && (
                            <a
                              href={`tel:${r.mobile}`}
                              className="text-[10px] text-zinc-400 hover:text-[#0D6B4F] block font-mono"
                            >
                              Tel: {r.mobile}
                            </a>
                          )}
                        </div>
                      </td>

                      {/* Pathway Role */}
                      <td className="px-4 py-2.5">{getRoleBadge(r.role)}</td>

                      {/* Course / Details */}
                      <td className="px-4 py-2.5 max-w-[200px]">
                        <span className="font-semibold text-zinc-800 block text-xs truncate" title={extractDetails(r)}>
                          {extractDetails(r)}
                        </span>
                        {paymentId && (
                          <span
                            className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[9px] font-bold font-mono bg-emerald-50 text-emerald-800 border border-emerald-300 mt-0.5 cursor-pointer"
                            onClick={() => handleCopy(paymentId, "txn")}
                            title={`Click to copy: ${paymentId}`}
                          >
                            <CreditCard className="w-2.5 h-2.5 text-emerald-600" />
                            <span>Txn: {paymentId.slice(0, 12)}...</span>
                          </span>
                        )}
                        {r.reg_number && (
                          <span className="text-[10px] text-zinc-400 block font-mono">
                            ID: {r.reg_number}
                          </span>
                        )}
                      </td>

                      {/* College / Entity */}
                      <td className="px-4 py-2.5 max-w-[180px]">
                        <span
                          className="font-semibold text-zinc-800 block text-xs truncate"
                          title={normalizeCollegeName(r.org_name) || "Independent"}
                        >
                          {normalizeCollegeName(r.org_name) || "Independent"}
                        </span>
                        {r.state && (
                          <span className="text-[10px] text-zinc-400 block truncate">
                            {r.city ? `${r.city}, ` : ""}{r.state}
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-2.5 text-center">
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

                      {/* Actions */}
                      <td className="px-4 py-2.5 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => setSelectedRecord(r)}
                            className="bg-[#0D6B4F] hover:bg-[#09543e] text-white text-[10px] font-bold px-2.5 py-1 rounded cursor-pointer inline-flex items-center gap-1 shadow-2xs"
                            title="Inspect Full Application"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Audit</span>
                          </button>

                          {r.status === "pending" ? (
                            <>
                              <button
                                onClick={() => handleStatusUpdate(r.reg_id, "approved")}
                                disabled={updatingId === r.reg_id}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold p-1 rounded cursor-pointer disabled:opacity-50"
                                title="Approve Application"
                              >
                                <CheckCircle className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleStatusUpdate(r.reg_id, "rejected")}
                                disabled={updatingId === r.reg_id}
                                className="bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold p-1 rounded cursor-pointer disabled:opacity-50"
                                title="Reject Application"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => handleOpenMailModal(r)}
                              className="bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-[10px] font-bold p-1 rounded cursor-pointer border border-zinc-300"
                              title="Compose Official Dispatch to Candidate"
                            >
                              <Mail className="w-3.5 h-3.5 text-[#0D6B4F]" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center text-zinc-400 italic">
                    No database registration records found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer & Pagination */}
        <div className="px-4 py-3 border-t border-zinc-200 bg-zinc-50 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
          <span className="text-zinc-600">
            Showing <strong className="text-zinc-900 font-bold">{filteredRecords.length === 0 ? 0 : startIndex + 1}</strong> to{" "}
            <strong className="text-zinc-900 font-bold">
              {pageSize === -1 ? filteredRecords.length : Math.min(startIndex + pageSize, filteredRecords.length)}
            </strong>{" "}
            of <strong className="text-zinc-900 font-bold">{filteredRecords.length}</strong> matching records
            {records.length !== filteredRecords.length && (
              <span className="text-zinc-400 ml-1">({totalCount} total in database)</span>
            )}
          </span>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={effectiveCurrentPage === 1}
                className="p-1 rounded border border-zinc-300 bg-white text-zinc-600 hover:bg-zinc-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                title="First Page"
              >
                <ChevronsLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={effectiveCurrentPage === 1}
                className="p-1 rounded border border-zinc-300 bg-white text-zinc-600 hover:bg-zinc-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                title="Previous Page"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center gap-1 px-1">
                {getPageNumbers().map((p, idx) =>
                  typeof p === "number" ? (
                    <button
                      key={idx}
                      onClick={() => setCurrentPage(p)}
                      className={`min-w-[26px] h-[26px] text-xs font-bold rounded flex items-center justify-center cursor-pointer transition-colors ${
                        effectiveCurrentPage === p
                          ? "bg-[#0D6B4F] text-white border border-[#0D6B4F]"
                          : "bg-white border border-zinc-300 text-zinc-700 hover:bg-zinc-100"
                      }`}
                    >
                      {p}
                    </button>
                  ) : (
                    <span key={idx} className="text-zinc-400 px-1 font-bold">
                      ...
                    </span>
                  )
                )}
              </div>

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={effectiveCurrentPage === totalPages}
                className="p-1 rounded border border-zinc-300 bg-white text-zinc-600 hover:bg-zinc-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                title="Next Page"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={effectiveCurrentPage === totalPages}
                className="p-1 rounded border border-zinc-300 bg-white text-zinc-600 hover:bg-zinc-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                title="Last Page"
              >
                <ChevronsRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Detailed Application Audit Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-zinc-300 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded shadow-2xl animate-scale-up">
            {/* Modal Header */}
            <div className="bg-[#0D6B4F] text-white px-6 py-4 flex justify-between items-center sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-800 text-white font-bold text-base flex items-center justify-center shadow-xs">
                  {selectedRecord.full_name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-emerald-200 uppercase tracking-widest font-mono">
                      {selectedRecord.reg_id}
                    </span>
                    {getRoleBadge(selectedRecord.role)}
                  </div>
                  <h3 className="text-base font-extrabold mt-0.5">{selectedRecord.full_name}</h3>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="text-white/80 hover:text-white p-1.5 rounded hover:bg-white/10 cursor-pointer"
                  title="Print Application"
                >
                  <Printer className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="text-white/80 hover:text-white text-xs border border-white/30 hover:border-white px-2.5 py-1 rounded cursor-pointer flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" /> Close
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              {/* Status Action Banner */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-zinc-50 border border-zinc-200 rounded gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-zinc-700 uppercase">Verification Status:</span>
                  {selectedRecord.status === "pending" && (
                    <span className="text-xs font-bold px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-300 rounded uppercase">
                      Pending Audit
                    </span>
                  )}
                  {selectedRecord.status === "approved" && (
                    <span className="text-xs font-bold px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded uppercase">
                      Approved &amp; Verified
                    </span>
                  )}
                  {selectedRecord.status === "rejected" && (
                    <span className="text-xs font-bold px-2 py-0.5 bg-red-50 text-red-800 border border-red-300 rounded uppercase">
                      Rejected
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
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

              {/* Candidate Credentials Table */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                  Applicant &amp; Institution Credentials
                </h4>
                <table className="w-full text-xs border border-zinc-200 rounded overflow-hidden">
                  <tbody className="divide-y divide-zinc-100">
                    {[
                      ["Full Name", selectedRecord.full_name],
                      ["Registration ID", selectedRecord.reg_id],
                      ["Email Address", selectedRecord.email],
                      ["Mobile Number", selectedRecord.mobile || "N/A"],
                      ["Institution / College", selectedRecord.org_name ? normalizeCollegeName(selectedRecord.org_name) : "Independent Candidate"],
                      ["Roll Number / Institutional ID", selectedRecord.reg_number || "N/A"],
                      ["Stream & Branch", selectedRecord.stream || "N/A"],
                      ["Year of Study", selectedRecord.year_of_study ? `Year ${selectedRecord.year_of_study}` : "N/A"],
                      ["Department", selectedRecord.department || "N/A"],
                      ["Specialization", selectedRecord.specialization || "N/A"],
                      ["State & City", `${selectedRecord.city ? `${selectedRecord.city}, ` : ""}${selectedRecord.state || "N/A"}`],
                      ["Submission Date", selectedRecord.submitted_at ? new Date(selectedRecord.submitted_at).toLocaleString("en-IN") : "N/A"],
                    ].map(([label, val]) => (
                      <tr key={label} className="even:bg-zinc-50/50">
                        <td className="px-4 py-2 font-bold text-zinc-600 w-52">{label}</td>
                        <td className="px-4 py-2 text-zinc-900 font-medium">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Proposal / SOP / Payment Details */}
              {selectedRecord.proposal && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                    Submitted Proposal &amp; Transaction Details
                  </h4>
                  <div className="bg-zinc-50 border border-zinc-200 p-4 rounded text-xs text-zinc-800 whitespace-pre-wrap leading-relaxed">
                    {selectedRecord.proposal}
                  </div>
                </div>
              )}

              {/* Uploaded Verification Documents */}
              {(() => {
                const docObj = parseDocumentUrls(selectedRecord.website_url);
                if (!docObj && !selectedRecord.website_url) return null;

                return (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                      Uploaded Verification Documents
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {docObj?.consentForm && (
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

                      {docObj?.idCard && (
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

                      {docObj?.proposalRoster && (
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

              {/* Official Email Communication Dispatch */}
              <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-emerald-100 rounded-full text-[#0D6B4F] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-xs text-zinc-900 block font-bold">Official Communication Desk</strong>
                    <span className="text-[10px] text-zinc-500">
                      Dispatch official notices, directives, audit queries, or approvals to {selectedRecord.email}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleOpenMailModal(selectedRecord)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0D6B4F] hover:bg-[#0a5840] text-white rounded text-xs font-bold cursor-pointer shadow-xs transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Compose &amp; Dispatch Mail</span>
                  </button>
                </div>
              </div>

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
                      onClick={() => handleSendConfirmationEmail(selectedRecord)}
                      disabled={isSendingEmail}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-700 hover:bg-amber-800 text-white rounded text-xs font-bold cursor-pointer shadow-xs transition-colors disabled:opacity-50"
                    >
                      {isSendingEmail ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Sending Confirmation...</span>
                        </>
                      ) : (
                        <>
                          <Mail className="w-3.5 h-3.5" />
                          <span>Send Confirmation Letter</span>
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

      {/* Send Institution / Candidate Mail Modal */}
      <SendInstitutionMailModal
        isOpen={!!mailRecipient}
        onClose={() => setMailRecipient(null)}
        recipient={mailRecipient}
        onSuccess={(msg) => onNotify?.(msg)}
        onError={(err) => onNotify?.(`Error: ${err}`)}
      />
    </div>
  );
}
