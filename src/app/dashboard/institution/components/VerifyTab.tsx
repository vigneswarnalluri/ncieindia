"use client";
import React, { useState } from "react";
import { ClipboardList, Eye, FileText, Download, GraduationCap, X, Check } from "lucide-react";

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
}

export default function VerifyTab({ students, onAction }: Props) {
  const [selected, setSelected] = useState<Student | null>(null);
  const [filterRole, setFilterRole] = useState<string>("all");

  const filteredStudents = students.filter((s) => {
    if (filterRole === "all") return true;
    if (filterRole === "internship") return s.role === "internship";
    if (filterRole === "student") return s.role === "student" || !s.role;
    return true;
  });

  const pendingCount = students.filter((s) => s.status === "pending").length;
  const internshipCount = students.filter((s) => s.role === "internship").length;
  const studentMembCount = students.filter((s) => s.role === "student" || !s.role).length;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-0">
        <div>
          <h1 className="text-base font-bold text-zinc-900">Student & Internship Verification</h1>
          <p className="text-[11px] text-zinc-500 mt-0.5">
            Review and process student enrollments and internship applications for your institution.
          </p>
        </div>
        <div className="text-left sm:text-right text-[10px] text-zinc-500 self-start sm:self-auto">
          <p>
            Total Records: <strong className="text-zinc-800">{students.length}</strong> &nbsp;|&nbsp;
            Internships: <strong className="text-amber-800 font-bold">{internshipCount}</strong>
          </p>
          <p>
            Pending: <strong className="text-red-700">{pendingCount}</strong> &nbsp;|&nbsp;
            Approved: <strong className="text-emerald-700">{students.filter((s) => s.status === "approved").length}</strong>
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilterRole("all")}
          className={`px-3 py-1.5 rounded-sm text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
            filterRole === "all" ? "bg-[#0D6B4F] text-white" : "bg-zinc-100 hover:bg-zinc-200 text-zinc-700"
          }`}
        >
          <span>All Applications ({students.length})</span>
        </button>
        <button
          onClick={() => setFilterRole("internship")}
          className={`px-3 py-1.5 rounded-sm text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
            filterRole === "internship" ? "bg-[#0D6B4F] text-white" : "bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300"
          }`}
        >
          <span>Course Internships ({internshipCount})</span>
        </button>
        <button
          onClick={() => setFilterRole("student")}
          className={`px-3 py-1.5 rounded-sm text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
            filterRole === "student" ? "bg-[#0D6B4F] text-white" : "bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300"
          }`}
        >
          <span>Student Innovators ({studentMembCount})</span>
        </button>
      </div>

      <div className="bg-white border border-zinc-200">
        <div className="px-4 py-2.5 border-b border-zinc-200 bg-zinc-50 flex items-center justify-between">
          <span className="text-xs font-bold text-zinc-800 uppercase tracking-wider flex items-center gap-2">
            <ClipboardList className="w-4 h-4 text-[#0D6B4F]" /> Application Queue
          </span>
          <span className="text-[10px] text-zinc-400 font-mono">Form: NCIE-MEMB-2026</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-[#0D6B4F] text-white text-[10px] uppercase tracking-wider">
                {["S.No.", "Student Name", "Category / Course", "Roll Number", "Stream / Branch", "Year", "Status", "Action"].map((h) => (
                  <th key={h} className={`px-4 py-2.5 font-semibold ${h === "Status" || h === "Action" ? "text-center" : "text-left"}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((s, i) => (
                  <tr key={s.id} className={`${i % 2 === 0 ? "bg-white" : "bg-zinc-50/50"} hover:bg-[#e8f5f0]/40`}>
                    <td className="px-4 py-2.5 text-zinc-500">{i + 1}</td>
                    <td className="px-4 py-2.5 font-semibold text-zinc-900">
                      {s.name}
                      {s.email && <span className="block text-[10px] text-zinc-400 font-normal">{s.email}</span>}
                    </td>
                    <td className="px-4 py-2.5">
                      {s.role === "internship" ? (
                        <div>
                          <span className="inline-block px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-50 text-amber-900 border border-amber-300">
                            Course Internship
                          </span>
                          {s.course && <span className="block text-[10px] text-zinc-600 font-medium truncate max-w-[150px]">{s.course}</span>}
                        </div>
                      ) : (
                        <span className="inline-block px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-50 text-emerald-900 border border-emerald-300">
                          Student Innovator
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2.5 font-mono text-zinc-600 font-bold">{s.rollNo}</td>
                    <td className="px-4 py-2.5 text-zinc-700">{s.stream}</td>
                    <td className="px-4 py-2.5 text-zinc-600">Year {s.year}</td>
                    <td className="px-4 py-2.5 text-center">
                      {s.status === "pending" && <span className="text-[9px] font-bold px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-300 uppercase">Pending</span>}
                      {s.status === "approved" && <span className="text-[9px] font-bold px-2 py-0.5 bg-green-50 text-green-800 border border-green-300 uppercase">Approved</span>}
                      {s.status === "rejected" && <span className="text-[9px] font-bold px-2 py-0.5 bg-red-50 text-red-800 border border-red-300 uppercase">Rejected</span>}
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      {s.status === "pending" ? (
                        <div className="flex justify-center gap-2">
                          <button onClick={() => setSelected(s)} className="bg-[#0D6B4F] hover:bg-[#0a5840] text-white text-[10px] font-bold px-3 py-1 border border-[#0D6B4F] cursor-pointer transition-all flex items-center gap-1 shadow-2xs">
                            <Eye className="w-3 h-3" /> Audit
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-center gap-2">
                          <button onClick={() => setSelected(s)} className="text-zinc-550 hover:text-zinc-700 text-[10px] font-bold px-2 py-1 border border-zinc-200 cursor-pointer transition-all flex items-center gap-1">
                            <Eye className="w-3.5 h-3.5" /> View Details
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-zinc-400 italic">
                    No applications found for the selected category.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2 border-t border-zinc-200 bg-zinc-50 text-[10px] text-zinc-500">
          Showing {filteredStudents.length} of {students.length} records &nbsp;|&nbsp; Page 1 of 1
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
                  <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
                    selected.role === "internship" ? "bg-amber-100 text-amber-900" : "bg-emerald-100 text-emerald-900"
                  }`}>
                    {selected.role === "internship" ? "Course Internship" : "Student Innovator"}
                  </span>
                </div>
                <h3 className="text-base font-extrabold mt-0.5">{selected.name}</h3>
                <p className="text-[11px] text-emerald-100">{selected.rollNo} • {selected.orgName || "Institutional Candidate"}</p>
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
                  Applicant & Registration Profile
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
                      ["Institution / College", selected.orgName || "Independent / Chapter Candidate"],
                      ...(selected.email ? [["Email Address", selected.email]] : []),
                      ...(selected.mobile ? [["Mobile Number", selected.mobile]] : []),
                      ["Stream / Degree", selected.stream],
                      ...(selected.department ? [["Department", selected.department]] : []),
                      ...(selected.specialization ? [["Specialization", selected.specialization]] : []),
                      ["Year of Study", `Year ${selected.year}`],
                      ...(selected.state || selected.city ? [["State & City", `${selected.city ? `${selected.city}, ` : ""}${selected.state || ""}`]] : []),
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
                    Submitted Proposal & Statement of Purpose
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
                  } else if (selected.docUrl && (selected.docUrl.startsWith("http") || selected.docUrl.startsWith("data:") || selected.docUrl.startsWith("/"))) {
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
                          <a href={docObj.consentForm} target="_blank" rel="noreferrer" className="text-[#0D6B4F] hover:underline text-[10px] font-bold flex items-center gap-1 cursor-pointer">
                            <Download className="w-3.5 h-3.5"/>Download
                          </a>
                        </div>
                      )}

                      {docObj.idCard && (
                        <div className="border border-zinc-200 p-2.5 flex items-center justify-between bg-zinc-50 rounded">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-[#0D6B4F]" />
                            <span className="text-xs font-bold text-zinc-700">Student ID Card</span>
                          </div>
                          <a href={docObj.idCard} target="_blank" rel="noreferrer" className="text-[#0D6B4F] hover:underline text-[10px] font-bold flex items-center gap-1 cursor-pointer">
                            <Download className="w-3.5 h-3.5"/>Download
                          </a>
                        </div>
                      )}

                      {docObj.proposalRoster && (
                        <div className="border border-zinc-200 p-2.5 flex items-center justify-between bg-zinc-50 rounded">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-[#0D6B4F]" />
                            <span className="text-xs font-bold text-zinc-700">Team Roster / SOP Resume</span>
                          </div>
                          <a href={docObj.proposalRoster} target="_blank" rel="noreferrer" className="text-[#0D6B4F] hover:underline text-[10px] font-bold flex items-center gap-1 cursor-pointer">
                            <Download className="w-3.5 h-3.5"/>Download
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
                        <a href={singleUrl} target="_blank" rel="noreferrer" className="text-[#0D6B4F] hover:underline text-[10px] font-bold flex items-center gap-1 cursor-pointer">
                          <Download className="w-3.5 h-3.5"/>Download Document
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
                <div className="p-3.5 bg-amber-50 border border-amber-200 rounded flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-amber-100 rounded-full text-amber-800">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="text-xs text-amber-900 block font-bold">Registration Confirmation Letter</strong>
                      <span className="text-[10px] text-amber-700">Official dynamic PDF issued for this student</span>
                    </div>
                  </div>
                  <a
                    href={`/api/send-confirmation-letter?regId=${encodeURIComponent(selected.id)}&name=${encodeURIComponent(selected.name)}&course=${encodeURIComponent(selected.course || "Viksit Bharat Innovation Leadership Programme")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded text-xs font-bold cursor-pointer shadow-xs transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </a>
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
                    onClick={() => { onAction(selected.id, "rejected"); setSelected(null); }}
                    className="bg-white hover:bg-red-50 text-red-700 text-xs font-bold px-4 py-2 border border-red-300 hover:border-red-500 rounded cursor-pointer transition-all shadow-2xs flex items-center gap-1.5"
                  >
                    <X className="w-3.5 h-3.5" /> Reject Membership
                  </button>
                )}
                {selected.status !== "approved" && (
                  <button
                    onClick={() => { onAction(selected.id, "approved"); setSelected(null); }}
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
