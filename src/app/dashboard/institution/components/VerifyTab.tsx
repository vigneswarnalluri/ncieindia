"use client";
import React, { useState, useMemo } from "react";
import {
  ClipboardList,
  Eye,
  FileText,
  Download,
  GraduationCap,
  X,
  Check,
  Mail,
  CheckCircle,
  Loader2,
  Search,
  Filter,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  FileSpreadsheet,
  SlidersHorizontal,
  Calendar,
  CreditCard,
  Paperclip,
  Database,
  Building,
  School
} from "lucide-react";
import { normalizeCollegeName } from "@/lib/collegeNormalization";

export interface Student {
  id: string;
  name: string;
  rollNo: string;
  stream: string;
  year: string;
  status: "pending" | "approved" | "rejected";
  docUrl?: string;
  role?: string;
  course?: string;
  paymentId?: string;
  email?: string;
  mobile?: string;
  orgName?: string;
  department?: string;
  specialization?: string;
  state?: string;
  city?: string;
  submittedAt?: string;
  proposal?: string;
  isDbRecord?: boolean;
}

interface Props {
  students: Student[];
  onAction: (id: string, action: "approved" | "rejected") => void;
  onBatchAction?: (ids: string[], action: "approved" | "rejected") => void;
}

export default function VerifyTab({ students, onAction, onBatchAction }: Props) {
  const [selected, setSelected] = useState<Student | null>(null);
  
  // Multi-Selection State
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  // Primary Filters
  const [filterRole, setFilterRole] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterCollege, setFilterCollege] = useState<string>("all");
  const [filterCourse, setFilterCourse] = useState<string>("all");
  const [filterStream, setFilterStream] = useState<string>("all");
  const [filterYear, setFilterYear] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("newest");

  // Advanced Filters
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [filterDept, setFilterDept] = useState<string>("all");
  const [filterDoc, setFilterDoc] = useState<string>("all");
  const [filterPayment, setFilterPayment] = useState<string>("all");
  const [filterSource, setFilterSource] = useState<string>("all");
  const [filterDateRange, setFilterDateRange] = useState<string>("all");
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  // Email Notification State
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailNotice, setEmailNotice] = useState<string | null>(null);

  const handleSendEmail = async (student: Student) => {
    if (!student.email) {
      setEmailNotice("Error: Student email address is not recorded.");
      return;
    }
    try {
      setIsSendingEmail(true);
      setEmailNotice(null);
      const res = await fetch("/api/send-confirmation-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: student.email,
          fullName: student.name,
          regId: student.id,
          course: student.course || "Viksit Bharat Innovation Leadership Programme",
          orgName: student.orgName,
          paymentId: student.paymentId || "N/A",
          date: student.submittedAt || new Date().toISOString(),
        }),
      });
      const data = await res.json();
      if (data?.emailSent) {
        setEmailNotice(`Confirmation Letter sent successfully to ${student.email}`);
      } else {
        setEmailNotice(`Notice: ${data?.warning || "PDF processed successfully."}`);
      }
    } catch (err: any) {
      setEmailNotice(`Failed to dispatch email: ${err.message}`);
    } finally {
      setIsSendingEmail(false);
    }
  };

  // Dynamic filter options derived from dataset
  const uniqueColleges = useMemo(() => {
    const orgs = students.map((s) => normalizeCollegeName(s.orgName)).filter(Boolean) as string[];
    return Array.from(new Set(orgs)).sort();
  }, [students]);

  const uniqueCourses = useMemo(() => {
    const courses = students.map((s) => s.course).filter(Boolean) as string[];
    return Array.from(new Set(courses)).sort();
  }, [students]);

  const uniqueStreams = useMemo(() => {
    const streams = students.map((s) => s.stream).filter(Boolean) as string[];
    return Array.from(new Set(streams)).sort();
  }, [students]);

  const uniqueYears = useMemo(() => {
    const years = students.map((s) => s.year).filter(Boolean) as string[];
    return Array.from(new Set(years)).sort();
  }, [students]);

  const uniqueDepts = useMemo(() => {
    const depts = students.map((s) => s.department).filter(Boolean) as string[];
    return Array.from(new Set(depts)).sort();
  }, [students]);

  // Handlers
  const handleRoleChange = (role: string) => {
    setFilterRole(role);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilterRole("all");
    setFilterStatus("all");
    setFilterCollege("all");
    setFilterCourse("all");
    setFilterStream("all");
    setFilterYear("all");
    setFilterDept("all");
    setFilterDoc("all");
    setFilterPayment("all");
    setFilterSource("all");
    setFilterDateRange("all");
    setSearchQuery("");
    setSortBy("newest");
    setCurrentPage(1);
  };

  // Count active filters
  const activeAdvancedCount = [
    filterDept !== "all",
    filterDoc !== "all",
    filterPayment !== "all",
    filterSource !== "all",
    filterDateRange !== "all",
  ].filter(Boolean).length;

  const hasActiveFilters =
    filterRole !== "all" ||
    filterStatus !== "all" ||
    filterCollege !== "all" ||
    filterCourse !== "all" ||
    filterStream !== "all" ||
    filterYear !== "all" ||
    activeAdvancedCount > 0 ||
    searchQuery.trim() !== "" ||
    sortBy !== "newest";

  // Filter and Sort Logic
  const filteredStudents = useMemo(() => {
    const now = new Date().getTime();
    const oneDay = 24 * 60 * 60 * 1000;
    const sevenDays = 7 * oneDay;
    const thirtyDays = 30 * oneDay;

    return students
      .filter((s) => {
        // Role / Category filter
        if (filterRole === "internship" && s.role !== "internship") return false;
        if (filterRole === "student" && s.role === "internship") return false;

        // Status filter
        if (filterStatus !== "all" && s.status !== filterStatus) return false;

        // College filter
        if (filterCollege !== "all" && normalizeCollegeName(s.orgName) !== filterCollege) return false;

        // Course filter
        if (filterCourse !== "all" && s.course !== filterCourse) return false;

        // Stream filter
        if (filterStream !== "all" && s.stream !== filterStream) return false;

        // Year filter
        if (filterYear !== "all" && s.year !== filterYear) return false;

        // Department filter
        if (filterDept !== "all" && s.department !== filterDept) return false;

        // Document attachment filter
        if (filterDoc === "has_docs" && !s.docUrl) return false;
        if (filterDoc === "no_docs" && s.docUrl) return false;

        // Payment status filter
        if (filterPayment === "paid" && !s.paymentId) return false;
        if (filterPayment === "unpaid" && s.paymentId) return false;

        // Data source filter
        if (filterSource === "live_db" && !s.isDbRecord) return false;
        if (filterSource === "chapter_roster" && s.isDbRecord) return false;

        // Date Range filter
        if (filterDateRange !== "all") {
          if (!s.submittedAt) return false;
          const subTime = new Date(s.submittedAt).getTime();
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
            s.id,
            s.name,
            s.rollNo,
            s.email,
            s.mobile,
            s.stream,
            s.course,
            s.department,
            s.specialization,
            s.orgName,
            s.city,
            s.state,
            s.paymentId,
            s.proposal,
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
          const tA = a.submittedAt ? new Date(a.submittedAt).getTime() : 0;
          const tB = b.submittedAt ? new Date(b.submittedAt).getTime() : 0;
          return tB - tA;
        }
        if (sortBy === "oldest") {
          const tA = a.submittedAt ? new Date(a.submittedAt).getTime() : 0;
          const tB = b.submittedAt ? new Date(b.submittedAt).getTime() : 0;
          return tA - tB;
        }
        if (sortBy === "name_asc") {
          return a.name.localeCompare(b.name);
        }
        if (sortBy === "name_desc") {
          return b.name.localeCompare(a.name);
        }
        if (sortBy === "roll_asc") {
          return (a.rollNo || "").localeCompare(b.rollNo || "");
        }
        if (sortBy === "status") {
          return a.status.localeCompare(b.status);
        }
        if (sortBy === "course") {
          return (a.course || "").localeCompare(b.course || "");
        }
        if (sortBy === "college") {
          return (a.orgName || "").localeCompare(b.orgName || "");
        }
        return 0;
      });
  }, [
    students,
    filterRole,
    filterStatus,
    filterCollege,
    filterCourse,
    filterStream,
    filterYear,
    filterDept,
    filterDoc,
    filterPayment,
    filterSource,
    filterDateRange,
    searchQuery,
    sortBy,
  ]);

  // Role-scoped students (for dynamic dropdown counts)
  const roleScopedStudents = useMemo(() => {
    return students.filter((s) => {
      if (filterRole === "internship" && s.role !== "internship") return false;
      if (filterRole === "student" && s.role === "internship") return false;
      return true;
    });
  }, [students, filterRole]);

  // Overall & Scoped KPI counts
  const totalCount = students.length;
  const pendingCount = students.filter((s) => s.status === "pending").length;
  const approvedCount = students.filter((s) => s.status === "approved").length;
  const rejectedCount = students.filter((s) => s.status === "rejected").length;
  const internshipCount = students.filter((s) => s.role === "internship").length;
  const studentMembCount = students.filter((s) => s.role === "student" || !s.role).length;

  const scopedTotalCount = roleScopedStudents.length;
  const scopedPendingCount = roleScopedStudents.filter((s) => s.status === "pending").length;
  const scopedApprovedCount = roleScopedStudents.filter((s) => s.status === "approved").length;
  const scopedRejectedCount = roleScopedStudents.filter((s) => s.status === "rejected").length;

  // Pagination calculations
  const totalPages = pageSize === -1 ? 1 : Math.max(1, Math.ceil(filteredStudents.length / pageSize));
  const effectiveCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = pageSize === -1 ? 0 : (effectiveCurrentPage - 1) * pageSize;
  const paginatedStudents = pageSize === -1 ? filteredStudents : filteredStudents.slice(startIndex, startIndex + pageSize);

  // Export filtered list to CSV
  const handleExportCsv = () => {
    if (filteredStudents.length === 0) {
      alert("No matching records to export.");
      return;
    }
    const headers = [
      "S.No",
      "Registration ID",
      "Student Name",
      "Role/Category",
      "College / Institution",
      "Course",
      "Roll Number",
      "Stream/Branch",
      "Department",
      "Specialization",
      "Year",
      "Email",
      "Mobile",
      "Payment ID",
      "Status",
      "Submission Date"
    ];

    const rows = filteredStudents.map((s, idx) => [
      idx + 1,
      s.id,
      s.name,
      s.role === "internship" ? "Course Internship" : "Student Innovator",
      normalizeCollegeName(s.orgName) || "N/A",
      s.course || "N/A",
      s.rollNo || "N/A",
      s.stream || "N/A",
      s.department || "N/A",
      s.specialization || "N/A",
      s.year || "N/A",
      s.email || "N/A",
      s.mobile || "N/A",
      s.paymentId || "N/A",
      s.status.toUpperCase(),
      s.submittedAt ? new Date(s.submittedAt).toLocaleString("en-IN") : "N/A"
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
    const link = document.createElement("a");
    link.href = url;
    link.download = `NCIE_Student_Verification_Export_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Multi-Selection Actions
  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAllPage = () => {
    const pageIds = paginatedStudents.map((s) => s.id);
    const allPageSelected = pageIds.length > 0 && pageIds.every((id) => selectedIds.includes(id));
    if (allPageSelected) {
      setSelectedIds((prev) => prev.filter((id) => !pageIds.includes(id)));
    } else {
      setSelectedIds((prev) => Array.from(new Set([...prev, ...pageIds])));
    }
  };

  const handleSelectAllFiltered = () => {
    const allFilteredIds = filteredStudents.map((s) => s.id);
    setSelectedIds(allFilteredIds);
  };

  const handleClearSelection = () => {
    setSelectedIds([]);
  };

  const handleBatchApprove = () => {
    if (selectedIds.length === 0) return;
    if (onBatchAction) {
      onBatchAction(selectedIds, "approved");
    } else {
      selectedIds.forEach((id) => onAction(id, "approved"));
    }
    setSelectedIds([]);
  };

  const handleBatchReject = () => {
    if (selectedIds.length === 0) return;
    if (onBatchAction) {
      onBatchAction(selectedIds, "rejected");
    } else {
      selectedIds.forEach((id) => onAction(id, "rejected"));
    }
    setSelectedIds([]);
  };

  const handleExportSelectedCsv = () => {
    const selectedStudents = students.filter((s) => selectedIds.includes(s.id));
    if (selectedStudents.length === 0) return;

    const headers = [
      "S.No",
      "Registration ID",
      "Student Name",
      "Role/Category",
      "College / Institution",
      "Course",
      "Roll Number",
      "Stream/Branch",
      "Department",
      "Specialization",
      "Year",
      "Email",
      "Mobile",
      "Payment ID",
      "Status",
      "Submission Date"
    ];

    const rows = selectedStudents.map((s, idx) => [
      idx + 1,
      s.id,
      s.name,
      s.role === "internship" ? "Course Internship" : "Student Innovator",
      normalizeCollegeName(s.orgName) || "N/A",
      s.course || "N/A",
      s.rollNo || "N/A",
      s.stream || "N/A",
      s.department || "N/A",
      s.specialization || "N/A",
      s.year || "N/A",
      s.email || "N/A",
      s.mobile || "N/A",
      s.paymentId || "N/A",
      s.status.toUpperCase(),
      s.submittedAt ? new Date(s.submittedAt).toLocaleString("en-IN") : "N/A"
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
    const link = document.createElement("a");
    link.href = url;
    link.download = `NCIE_Selected_Students_Export_${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Generate visible page numbers for pagination with ellipsis
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

  return (
    <div className="space-y-4">
      {/* Header & Metric Summary */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3 bg-white p-4 border border-zinc-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold text-zinc-900">Student &amp; Internship Verification</h1>
            <span className="px-2 py-0.5 bg-emerald-50 text-[#0D6B4F] border border-emerald-200 text-[10px] font-bold uppercase tracking-wider rounded-xs font-mono">
              Live Queue
            </span>
          </div>
          <p className="text-[11px] text-zinc-500 mt-0.5">
            Review, audit, filter, and process student enrollments and internship applications for your institutional chapter.
          </p>
        </div>

        {/* Quick KPI Badges & Export */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <button
            onClick={() => {
              setFilterRole("all");
              setFilterStatus("all");
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
              setFilterRole("all");
              setFilterStatus("pending");
              setCurrentPage(1);
            }}
            className="px-3 py-1.5 bg-amber-50/80 hover:bg-amber-100 border border-amber-200 rounded text-amber-900 font-medium flex items-center gap-1.5 cursor-pointer transition-colors"
            title="View All Pending Applications"
          >
            <span className="text-[10px] uppercase text-amber-600 font-bold">Pending:</span>
            <strong className="text-amber-800 font-bold">{pendingCount}</strong>
          </button>
          <button
            onClick={() => {
              setFilterRole("all");
              setFilterStatus("approved");
              setCurrentPage(1);
            }}
            className="px-3 py-1.5 bg-emerald-50/80 hover:bg-emerald-100 border border-emerald-200 rounded text-emerald-900 font-medium flex items-center gap-1.5 cursor-pointer transition-colors"
            title="View All Approved Applications"
          >
            <span className="text-[10px] uppercase text-emerald-600 font-bold">Approved:</span>
            <strong className="text-emerald-800 font-bold">{approvedCount}</strong>
          </button>
          {rejectedCount > 0 && (
            <button
              onClick={() => {
                setFilterRole("all");
                setFilterStatus("rejected");
                setCurrentPage(1);
              }}
              className="px-3 py-1.5 bg-red-50/80 hover:bg-red-100 border border-red-200 rounded text-red-900 font-medium flex items-center gap-1.5 cursor-pointer transition-colors"
              title="View All Rejected Applications"
            >
              <span className="text-[10px] uppercase text-red-600 font-bold">Rejected:</span>
              <strong className="text-red-800 font-bold">{rejectedCount}</strong>
            </button>
          )}
          <button
            onClick={handleExportCsv}
            className="px-3 py-1.5 bg-white hover:bg-zinc-50 text-zinc-700 border border-zinc-300 rounded font-bold text-xs cursor-pointer transition-colors flex items-center gap-1.5 shadow-2xs"
            title="Export filtered records as CSV"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-700" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Role Pill Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleRoleChange("all")}
            className={`px-3 py-1.5 rounded-xs text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs ${
              filterRole === "all"
                ? "bg-[#0D6B4F] text-white border border-[#0D6B4F]"
                : "bg-white hover:bg-zinc-100 text-zinc-700 border border-zinc-200"
            }`}
          >
            <span>All Applications</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                filterRole === "all" ? "bg-white/20 text-white" : "bg-zinc-100 text-zinc-700"
              }`}
            >
              {totalCount}
            </span>
          </button>
          <button
            onClick={() => handleRoleChange("internship")}
            className={`px-3 py-1.5 rounded-xs text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs ${
              filterRole === "internship"
                ? "bg-[#0D6B4F] text-white border border-[#0D6B4F]"
                : "bg-amber-50/60 hover:bg-amber-100 text-amber-900 border border-amber-300"
            }`}
          >
            <span>Course Internships</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                filterRole === "internship" ? "bg-white/20 text-white" : "bg-amber-200/70 text-amber-900"
              }`}
            >
              {internshipCount}
            </span>
          </button>
          <button
            onClick={() => handleRoleChange("student")}
            className={`px-3 py-1.5 rounded-xs text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs ${
              filterRole === "student"
                ? "bg-[#0D6B4F] text-white border border-[#0D6B4F]"
                : "bg-emerald-50/60 hover:bg-emerald-100 text-emerald-900 border border-emerald-300"
            }`}
          >
            <span>Student Innovators</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                filterRole === "student" ? "bg-white/20 text-white" : "bg-emerald-200/70 text-emerald-900"
              }`}
            >
              {studentMembCount}
            </span>
          </button>
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
              placeholder="Search Name, Roll, Email..."
              value={searchQuery}
              onChange={handleSearchChange}
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
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full py-1.5 px-2.5 text-xs bg-zinc-50 border border-zinc-200 rounded focus:bg-white focus:outline-none focus:border-[#0D6B4F] text-zinc-700 font-medium cursor-pointer"
            >
              <option value="all">Status: All ({scopedTotalCount})</option>
              <option value="pending">Status: Pending ({scopedPendingCount})</option>
              <option value="approved">Status: Approved ({scopedApprovedCount})</option>
              <option value="rejected">Status: Rejected ({scopedRejectedCount})</option>
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
              <option value="roll_asc">Sort: Roll Number</option>
              <option value="course">Sort: Course Name</option>
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
          <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-xs grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 animate-fadeIn">
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

            {/* Data Source Filter */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1 flex items-center gap-1">
                <Database className="w-3 h-3 text-zinc-400" /> Data Source
              </label>
              <select
                value={filterSource}
                onChange={(e) => {
                  setFilterSource(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full py-1.5 px-2 text-xs bg-white border border-zinc-300 rounded focus:outline-none focus:border-[#0D6B4F] text-zinc-700 font-medium cursor-pointer"
              >
                <option value="all">All Records</option>
                <option value="live_db">Live Portal Submissions</option>
                <option value="chapter_roster">Institutional Chapter Roster</option>
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
                  title="Remove search filter"
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
                  title="Remove college filter"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {filterStatus !== "all" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-900 border border-amber-300 rounded-md font-medium text-xs shadow-2xs capitalize">
                <span>Status: <strong>{filterStatus}</strong></span>
                <button
                  onClick={() => setFilterStatus("all")}
                  className="p-0.5 rounded hover:bg-amber-200 text-amber-700 hover:text-red-600 transition-colors cursor-pointer"
                  title="Remove status filter"
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
                  title="Remove course filter"
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
                  title="Remove stream filter"
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
                  title="Remove year filter"
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
                  title="Remove department filter"
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
                  title="Remove document filter"
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
                  title="Remove payment filter"
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
                  title="Remove date filter"
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
                Candidate{selectedIds.length > 1 ? "s" : ""} Selected
              </span>
            </div>
            {selectedIds.length < filteredStudents.length && (
              <button
                onClick={handleSelectAllFiltered}
                className="text-[11px] text-emerald-300 hover:text-white underline font-semibold cursor-pointer"
              >
                Select all {filteredStudents.length} matching candidates
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleBatchApprove}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-xs cursor-pointer transition-colors flex items-center gap-1.5 shadow-xs"
              title={`Approve ${selectedIds.length} selected candidate(s)`}
            >
              <Check className="w-3.5 h-3.5" /> Approve ({selectedIds.length})
            </button>
            <button
              onClick={handleBatchReject}
              className="bg-red-600 hover:bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-xs cursor-pointer transition-colors flex items-center gap-1.5 shadow-xs"
              title={`Reject ${selectedIds.length} selected candidate(s)`}
            >
              <X className="w-3.5 h-3.5" /> Reject ({selectedIds.length})
            </button>
            <button
              onClick={handleExportSelectedCsv}
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-xs border border-white/20 cursor-pointer transition-colors flex items-center gap-1.5"
              title="Export selected candidates to CSV"
            >
              <Download className="w-3.5 h-3.5" /> Export Selected
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

      {/* Main Table Card */}
      <div className="bg-white border border-zinc-200 rounded-xs shadow-2xs overflow-hidden">
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
                <option value={-1}>All ({filteredStudents.length})</option>
              </select>
            </div>
            <span className="text-[10px] text-zinc-500 font-mono border-l border-zinc-200 pl-3">
              Page {effectiveCurrentPage} of {totalPages}
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-[#0D6B4F] text-white text-[10px] uppercase tracking-wider select-none">
                <th className="px-3 py-2.5 font-semibold text-center w-10">
                  <input
                    type="checkbox"
                    checked={paginatedStudents.length > 0 && paginatedStudents.every((s) => selectedIds.includes(s.id))}
                    onChange={handleToggleSelectAllPage}
                    className="w-3.5 h-3.5 rounded border-zinc-300 text-[#0D6B4F] focus:ring-[#0D6B4F] cursor-pointer"
                    title="Select All on Current Page"
                  />
                </th>
                <th className="px-3 py-2.5 font-semibold text-left w-12">S.No.</th>
                <th className="px-4 py-2.5 font-semibold text-left">Student Name</th>
                <th className="px-4 py-2.5 font-semibold text-left">Category / Course</th>
                <th className="px-4 py-2.5 font-semibold text-left">Roll Number</th>
                <th className="px-4 py-2.5 font-semibold text-left">Stream / Branch</th>
                <th className="px-4 py-2.5 font-semibold text-left">Year</th>
                <th className="px-4 py-2.5 font-semibold text-center w-24">Status</th>
                <th className="px-4 py-2.5 font-semibold text-center w-32">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {paginatedStudents.length > 0 ? (
                paginatedStudents.map((s, i) => {
                  const itemIndex = startIndex + i + 1;
                  const isSelected = selectedIds.includes(s.id);
                  return (
                    <tr
                      key={s.id}
                      className={`${isSelected ? "bg-[#e8f5f0]/80" : (i % 2 === 0 ? "bg-white" : "bg-zinc-50/50")} hover:bg-[#e8f5f0]/40 transition-colors`}
                    >
                      <td className="px-3 py-2.5 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelect(s.id)}
                          className="w-3.5 h-3.5 rounded border-zinc-300 text-[#0D6B4F] focus:ring-[#0D6B4F] cursor-pointer"
                        />
                      </td>
                      <td className="px-3 py-2.5 text-zinc-500 font-mono font-medium">{itemIndex}</td>
                      <td className="px-4 py-2.5 font-semibold text-zinc-900">
                        <div className="flex items-center gap-1.5">
                          <span>{s.name}</span>
                          {s.isDbRecord && (
                            <span
                              className="px-1 py-0.2 bg-emerald-100 text-emerald-800 text-[8.5px] font-bold rounded font-mono uppercase"
                              title="Live Database Record"
                            >
                              Live
                            </span>
                          )}
                          {s.paymentId && (
                            <span
                              className="px-1 py-0.2 bg-amber-100 text-amber-800 text-[8.5px] font-bold rounded font-mono uppercase"
                              title={`Payment ID: ${s.paymentId}`}
                            >
                              Paid
                            </span>
                          )}
                        </div>
                        {s.email && (
                          <span className="block text-[10px] text-zinc-400 font-normal truncate max-w-[200px]">
                            {s.email}
                          </span>
                        )}
                        {s.orgName && (
                          <span className="block text-[10px] text-zinc-500 font-normal truncate max-w-[220px]" title={normalizeCollegeName(s.orgName)}>
                            {normalizeCollegeName(s.orgName)}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2.5">
                        {s.role === "internship" ? (
                          <div>
                            <span className="inline-block px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-50 text-amber-900 border border-amber-300">
                              Course Internship
                            </span>
                            {s.course && (
                              <span
                                className="block text-[10px] text-zinc-600 font-medium truncate max-w-[180px]"
                                title={s.course}
                              >
                                {s.course}
                              </span>
                            )}
                          </div>
                        ) : (
                          <div>
                            <span className="inline-block px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-50 text-emerald-900 border border-emerald-300">
                              Student Innovator
                            </span>
                            {s.course && (
                              <span
                                className="block text-[10px] text-zinc-600 font-medium truncate max-w-[180px]"
                                title={s.course}
                              >
                                {s.course}
                              </span>
                            )}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-2.5 font-mono text-zinc-700 font-bold">{s.rollNo || "—"}</td>
                      <td className="px-4 py-2.5 text-zinc-700 font-medium">{s.stream || "—"}</td>
                      <td className="px-4 py-2.5 text-zinc-600 font-medium">Year {s.year || "—"}</td>
                      <td className="px-4 py-2.5 text-center">
                        {s.status === "pending" && (
                          <span className="text-[9px] font-bold px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-300 uppercase rounded-xs">
                            Pending
                          </span>
                        )}
                        {s.status === "approved" && (
                          <span className="text-[9px] font-bold px-2 py-0.5 bg-green-50 text-green-800 border border-green-300 uppercase rounded-xs">
                            Approved
                          </span>
                        )}
                        {s.status === "rejected" && (
                          <span className="text-[9px] font-bold px-2 py-0.5 bg-red-50 text-red-800 border border-red-300 uppercase rounded-xs">
                            Rejected
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        {s.status === "pending" ? (
                          <div className="flex justify-center gap-1.5">
                            <button
                              onClick={() => setSelected(s)}
                              className="bg-[#0D6B4F] hover:bg-[#0a5840] text-white text-[10px] font-bold px-3 py-1 border border-[#0D6B4F] cursor-pointer transition-all flex items-center gap-1.5 shadow-2xs rounded-xs"
                              title="Audit Candidate & Review Uploaded Documents"
                            >
                              <Eye className="w-3.5 h-3.5" /> Audit &amp; Documents
                            </button>
                          </div>
                        ) : (
                          <div className="flex justify-center gap-1.5">
                            <button
                              onClick={() => setSelected(s)}
                              className="bg-zinc-50 hover:bg-[#e8f5f0] text-zinc-800 hover:text-[#0D6B4F] text-[10px] font-bold px-2.5 py-1 border border-zinc-300 hover:border-[#0D6B4F] rounded-xs cursor-pointer transition-all flex items-center gap-1.5 shadow-2xs"
                              title="View Candidate Documents, Confirmation Letter & Verification Details"
                            >
                              <FileText className="w-3.5 h-3.5 text-[#0D6B4F]" /> Audit &amp; Documents
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center text-zinc-400 italic">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Filter className="w-8 h-8 text-zinc-300" />
                      <p className="font-medium text-xs text-zinc-600 not-italic">
                        No applications match your current filter criteria in this category.
                      </p>

                      {/* Helpful Banner if matches exist in other categories */}
                      {(() => {
                        const matchingInOtherRoles = students.filter((s) => {
                          if (filterStatus !== "all" && s.status !== filterStatus) return false;
                          if (filterCollege !== "all" && normalizeCollegeName(s.orgName) !== filterCollege) return false;
                          return true;
                        });
                        if (matchingInOtherRoles.length > 0 && filterRole !== "all") {
                          const internshipMatches = matchingInOtherRoles.filter((s) => s.role === "internship").length;
                          const studentMatches = matchingInOtherRoles.filter((s) => s.role !== "internship").length;
                          return (
                            <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded text-amber-900 text-xs flex flex-col sm:flex-row items-center justify-between gap-3 max-w-lg mx-auto not-italic text-left shadow-2xs">
                              <span className="leading-snug">
                                <strong>{matchingInOtherRoles.length}</strong> {filterStatus === "all" ? "" : filterStatus} record{matchingInOtherRoles.length > 1 ? "s" : ""} found under{" "}
                                <strong>{internshipMatches > 0 ? "Course Internships" : "Student Innovators"}</strong>.
                              </span>
                              <button
                                onClick={() => {
                                  setFilterRole(internshipMatches > 0 ? "internship" : "all");
                                  setCurrentPage(1);
                                }}
                                className="px-3 py-1.5 bg-[#0D6B4F] hover:bg-[#0a5840] text-white font-bold rounded cursor-pointer shrink-0 text-xs transition-colors shadow-2xs"
                              >
                                View in {internshipMatches > 0 ? "Course Internships" : "All Applications"}
                              </button>
                            </div>
                          );
                        }
                        return null;
                      })()}

                      {hasActiveFilters && (
                        <button
                          onClick={handleClearFilters}
                          className="mt-2 text-xs text-[#0D6B4F] hover:underline font-bold not-italic cursor-pointer"
                        >
                          Clear all filters
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Dynamic Pagination Bar */}
        <div className="px-4 py-3 border-t border-zinc-200 bg-zinc-50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-[11px] text-zinc-600">
            Showing <strong className="text-zinc-900">{filteredStudents.length === 0 ? 0 : startIndex + 1}</strong> to{" "}
            <strong className="text-zinc-900">
              {pageSize === -1 ? filteredStudents.length : Math.min(startIndex + pageSize, filteredStudents.length)}
            </strong>{" "}
            of <strong className="text-zinc-900">{filteredStudents.length}</strong> records
            {filteredStudents.length !== totalCount && (
              <span className="text-zinc-400"> (filtered from {totalCount} total)</span>
            )}
          </div>

          {/* Pagination Page Controls */}
          {totalPages > 1 && pageSize !== -1 && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={effectiveCurrentPage === 1}
                className="p-1 rounded border border-zinc-200 hover:bg-zinc-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer text-zinc-600"
                title="First Page"
              >
                <ChevronsLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={effectiveCurrentPage === 1}
                className="p-1 rounded border border-zinc-200 hover:bg-zinc-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer text-zinc-600"
                title="Previous Page"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center gap-1 mx-1">
                {getPageNumbers().map((p, idx) => {
                  if (p === "...") {
                    return (
                      <span key={`ellipsis-${idx}`} className="px-1 text-zinc-400 select-none">
                        …
                      </span>
                    );
                  }
                  const pageNum = Number(p);
                  const isActive = pageNum === effectiveCurrentPage;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`min-w-[28px] h-7 text-xs font-bold rounded cursor-pointer transition-colors ${
                        isActive
                          ? "bg-[#0D6B4F] text-white border border-[#0D6B4F] shadow-2xs"
                          : "bg-white text-zinc-700 border border-zinc-200 hover:bg-zinc-100"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={effectiveCurrentPage === totalPages}
                className="p-1 rounded border border-zinc-200 hover:bg-zinc-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer text-zinc-600"
                title="Next Page"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={effectiveCurrentPage === totalPages}
                className="p-1 rounded border border-zinc-200 hover:bg-zinc-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer text-zinc-600"
                title="Last Page"
              >
                <ChevronsRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Student Audit Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-zinc-300 w-full max-w-2xl max-h-[90vh] flex flex-col rounded-lg shadow-2xl overflow-hidden animate-scale-up">
            {/* Modal Sticky Header */}
            <div className="bg-[#0D6B4F] text-white px-6 py-3.5 flex justify-between items-center shrink-0 border-b border-[#0a5840]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-emerald-200 uppercase tracking-widest font-mono">
                    {selected.id}
                  </span>
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
                      selected.role === "internship" ? "bg-amber-100 text-amber-900" : "bg-emerald-100 text-emerald-900"
                    }`}
                  >
                    {selected.role === "internship" ? "Course Internship" : "Student Innovator"}
                  </span>
                </div>
                <h3 className="text-base font-extrabold mt-0.5">{selected.name}</h3>
                <p className="text-[11px] text-emerald-100">
                  {selected.rollNo} • {selected.orgName || "Institutional Candidate"}
                </p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-white/80 hover:text-white text-xs border border-white/30 hover:border-white px-2.5 py-1 rounded cursor-pointer transition-colors flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" /> Close
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 space-y-5 overflow-y-auto flex-1">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                  Applicant &amp; Registration Profile
                </p>
                <table className="w-full text-xs border border-zinc-200 rounded overflow-hidden">
                  <tbody className="divide-y divide-zinc-100">
                    {[
                      ["Student Name", selected.name],
                      ["Registration ID", selected.id],
                      ["Application Pathway", selected.role === "internship" ? "Course Internship (Paid ₹700)" : "Student Innovator"],
                      ...(selected.course ? [["Enrolled Course", selected.course]] : []),
                      ...(selected.paymentId ? [["Payment Transaction ID", selected.paymentId]] : []),
                      ["Roll Number / ID", selected.rollNo],
                      ["Institution / College", normalizeCollegeName(selected.orgName) || "Independent / Chapter Candidate"],
                      ...(selected.email ? [["Email Address", selected.email]] : []),
                      ...(selected.mobile ? [["Mobile Number", selected.mobile]] : []),
                      ["Stream / Degree", selected.stream],
                      ...(selected.department ? [["Department", selected.department]] : []),
                      ...(selected.specialization ? [["Specialization", selected.specialization]] : []),
                      ["Year of Study", `Year ${selected.year}`],
                      ...(selected.state || selected.city
                        ? [["State & City", `${selected.city ? `${selected.city}, ` : ""}${selected.state || ""}`]]
                        : []),
                      ["Submission Date", selected.submittedAt ? new Date(selected.submittedAt).toLocaleString("en-IN") : "N/A"],
                      ["Verification Status", selected.status.toUpperCase()]
                    ].map(([k, v]) => (
                      <tr key={k} className="even:bg-zinc-50/50">
                        <td className="px-4 py-2.5 font-bold text-zinc-600 w-44">{k}</td>
                        <td className="px-4 py-2.5 text-zinc-850 font-mono">{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Proposal / Statement of Purpose / Notes Breakdown */}
              {selected.proposal && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                    Submitted Proposal &amp; Statement of Purpose
                  </p>
                  <div className="bg-zinc-50 border border-zinc-200 p-3.5 rounded text-xs text-zinc-800 whitespace-pre-wrap leading-relaxed">
                    {selected.proposal}
                  </div>
                </div>
              )}

              {/* Document Download Section */}
              {(() => {
                let docObj: { consentForm?: string; idCard?: string; proposalRoster?: string } | null = null;
                let singleUrl: string | null = null;

                try {
                  if (selected.docUrl && selected.docUrl.trim().startsWith("{")) {
                    docObj = JSON.parse(selected.docUrl);
                  } else if (
                    selected.docUrl &&
                    (selected.docUrl.startsWith("http") || selected.docUrl.startsWith("data:") || selected.docUrl.startsWith("/"))
                  ) {
                    singleUrl = selected.docUrl;
                  }
                } catch (e) {}

                if (docObj && (docObj.consentForm || docObj.idCard || docObj.proposalRoster)) {
                  return (
                    <div className="space-y-2">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Uploaded Verification Files</p>

                      {docObj.consentForm && (
                        <div className="border border-zinc-200 p-2.5 flex items-center justify-between bg-zinc-50 rounded">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-[#0D6B4F]" />
                            <span className="text-xs font-bold text-zinc-700">HOD Consent Letter</span>
                          </div>
                          <a
                            href={docObj.consentForm}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#0D6B4F] hover:underline text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" />
                            Download
                          </a>
                        </div>
                      )}

                      {docObj.idCard && (
                        <div className="border border-zinc-200 p-2.5 flex items-center justify-between bg-zinc-50 rounded">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-[#0D6B4F]" />
                            <span className="text-xs font-bold text-zinc-700">Student ID Card</span>
                          </div>
                          <a
                            href={docObj.idCard}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#0D6B4F] hover:underline text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" />
                            Download
                          </a>
                        </div>
                      )}

                      {docObj.proposalRoster && (
                        <div className="border border-zinc-200 p-2.5 flex items-center justify-between bg-zinc-50 rounded">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-[#0D6B4F]" />
                            <span className="text-xs font-bold text-zinc-700">Team Roster / SOP Resume</span>
                          </div>
                          <a
                            href={docObj.proposalRoster}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#0D6B4F] hover:underline text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" />
                            Download
                          </a>
                        </div>
                      )}
                    </div>
                  );
                }

                if (singleUrl) {
                  return (
                    <div className="space-y-2">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Uploaded Verification Files</p>
                      <div className="border border-zinc-200 p-2.5 flex items-center justify-between bg-zinc-50 rounded">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-[#0D6B4F]" />
                          <span className="text-xs font-bold text-zinc-700">Candidate Submission File</span>
                        </div>
                        <a
                          href={singleUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#0D6B4F] hover:underline text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          Download Document
                        </a>
                      </div>
                    </div>
                  );
                }

                return (
                  <div className="text-xs text-zinc-450 italic bg-zinc-50 p-4 border border-dashed border-zinc-200 rounded text-center">
                    No additional file attachments submitted.
                  </div>
                );
              })()}

              {selected.role === "internship" && (
                <div className="space-y-2">
                  <div className="p-3.5 bg-amber-50 border border-amber-200 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-amber-100 rounded-full text-amber-800 shrink-0">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <div>
                        <strong className="text-xs text-amber-900 block font-bold">Registration Confirmation Letter</strong>
                        <span className="text-[10px] text-amber-700">Official dynamic PDF issued for {selected.name}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleSendEmail(selected)}
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
                        href={`/api/send-confirmation-letter?regId=${encodeURIComponent(selected.id)}&name=${encodeURIComponent(
                          selected.name
                        )}&course=${encodeURIComponent(selected.course || "Viksit Bharat Innovation Leadership Programme")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded text-xs font-bold cursor-pointer shadow-xs transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download PDF</span>
                      </a>
                    </div>
                  </div>

                  {emailNotice && (
                    <div
                      className={`p-2.5 rounded text-xs font-semibold flex items-center gap-2 ${
                        emailNotice.includes("successfully")
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-300"
                          : "bg-blue-50 text-blue-800 border border-blue-300"
                      }`}
                    >
                      <CheckCircle className="w-4 h-4 shrink-0" />
                      <span>{emailNotice}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Sticky Footer Action Bar */}
            <div className="p-4 bg-zinc-50 border-t border-zinc-200 flex flex-col sm:flex-row justify-between items-center gap-3 shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-zinc-500 uppercase">Status:</span>
                {selected.status === "pending" && (
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-300 rounded uppercase">
                    Pending Verification
                  </span>
                )}
                {selected.status === "approved" && (
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded uppercase">
                    Approved
                  </span>
                )}
                {selected.status === "rejected" && (
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-red-50 text-red-800 border border-red-300 rounded uppercase">
                    Rejected
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                {selected.status !== "rejected" && (
                  <button
                    onClick={() => {
                      onAction(selected.id, "rejected");
                      setSelected(null);
                    }}
                    className="bg-white hover:bg-red-50 text-red-700 text-xs font-bold px-4 py-2 border border-red-300 hover:border-red-500 rounded cursor-pointer transition-all shadow-2xs flex items-center gap-1.5"
                  >
                    <X className="w-3.5 h-3.5" /> Reject Membership
                  </button>
                )}
                {selected.status !== "approved" && (
                  <button
                    onClick={() => {
                      onAction(selected.id, "approved");
                      setSelected(null);
                    }}
                    className="bg-[#0D6B4F] hover:bg-[#0a5840] text-white text-xs font-bold px-4 py-2 rounded cursor-pointer transition-all shadow-2xs flex items-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5" /> Approve Student
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
