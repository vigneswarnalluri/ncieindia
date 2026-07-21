"use client";
import React, { useState } from "react";
import { ClipboardList, Eye, FileText, Download } from "lucide-react";

export interface Student {
  id: string; name: string; rollNo: string;
  stream: string; year: string; status: "pending" | "approved" | "rejected";
  docUrl?: string;
  isDbRecord?: boolean;
}
interface Props { students: Student[]; onAction: (id: string, action: "approved" | "rejected") => void; }

export default function VerifyTab({ students, onAction }: Props) {
  const [selected, setSelected] = useState<Student | null>(null);
  const pendingCount = students.filter(s => s.status === "pending").length;
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-0">
        <div>
          <h1 className="text-base font-bold text-zinc-900">Student Membership Verification</h1>
          <p className="text-[11px] text-zinc-500 mt-0.5">Review and process student membership applications for IIT Madras NCIE Chapter.</p>
        </div>
        <div className="text-left sm:text-right text-[10px] text-zinc-500 self-start sm:self-auto">
          <p>Total Applications: <strong className="text-zinc-800">{students.length}</strong></p>
          <p>Pending: <strong className="text-red-700">{pendingCount}</strong> &nbsp;|&nbsp; Approved: <strong className="text-emerald-700">{students.filter(s => s.status === "approved").length}</strong></p>
        </div>
      </div>

      <div className="bg-white border border-zinc-200">
        <div className="px-4 py-2.5 border-b border-zinc-200 bg-zinc-50 flex items-center justify-between">
          <span className="text-xs font-bold text-zinc-800 uppercase tracking-wider flex items-center gap-2"><ClipboardList className="w-4 h-4 text-[#0D6B4F]" /> Application Queue</span>
          <span className="text-[10px] text-zinc-400 font-mono">Form: NCIE-MEMB-2026</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-[#0D6B4F] text-white text-[10px] uppercase tracking-wider">
                {["S.No.","Student Name","Roll Number","Stream / Branch","Year","Status","Action"].map(h => (
                  <th key={h} className={`px-4 py-2.5 font-semibold ${h === "Status" || h === "Action" ? "text-center" : "text-left"}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {students.length > 0 ? (
                students.map((s, i) => (
                  <tr key={s.id} className={`${i % 2 === 0 ? "bg-white" : "bg-zinc-50/50"} hover:bg-[#e8f5f0]/40`}>
                    <td className="px-4 py-2.5 text-zinc-500">{i + 1}</td>
                    <td className="px-4 py-2.5 font-semibold text-zinc-900">{s.name}</td>
                    <td className="px-4 py-2.5 font-mono text-zinc-600">{s.rollNo}</td>
                    <td className="px-4 py-2.5 text-zinc-700">{s.stream}</td>
                    <td className="px-4 py-2.5 text-zinc-600">Year {s.year}</td>
                    <td className="px-4 py-2.5 text-center">
                      {s.status === "pending"  && <span className="text-[9px] font-bold px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-300 uppercase">Pending</span>}
                      {s.status === "approved" && <span className="text-[9px] font-bold px-2 py-0.5 bg-green-50 text-green-800 border border-green-300 uppercase">Approved</span>}
                      {s.status === "rejected" && <span className="text-[9px] font-bold px-2 py-0.5 bg-red-50 text-red-800 border border-red-300 uppercase">Rejected</span>}
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      {s.status === "pending" ? (
                        <div className="flex justify-center gap-2">
                          <button onClick={() => setSelected(s)} className="bg-[#0D6B4F] hover:bg-[#0a5840] text-white text-[10px] font-bold px-3 py-1 border border-[#0D6B4F] cursor-pointer transition-all flex items-center gap-1">
                            <Eye className="w-3 h-3" /> Audit
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-center gap-2">
                          <button onClick={() => setSelected(s)} className="text-zinc-550 hover:text-zinc-700 text-[10px] font-bold px-2 py-1 border border-zinc-200 cursor-pointer transition-all flex items-center gap-1">
                            <Eye className="w-3.5 h-3.5" /> View Docs
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-zinc-400 italic">
                    No student membership applications in queue
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2 border-t border-zinc-200 bg-zinc-50 text-[10px] text-zinc-500">
          Showing {students.length} records &nbsp;|&nbsp; Page 1 of 1
        </div>
      </div>

      {/* Student Audit Modal */}
      {selected && (
        <div className="fixed inset-0 z-55 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white border border-zinc-350 w-full max-w-xl shadow-2xl rounded overflow-hidden">
            <div className="bg-[#0D6B4F] text-white px-5 py-3 flex justify-between items-center">
              <div>
                <p className="text-[9px] font-bold text-emerald-200 uppercase tracking-widest">Student Document Audit</p>
                <p className="text-sm font-bold">{selected.name} ({selected.rollNo})</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-white/70 hover:text-white text-xs border border-white/30 px-2 py-1 cursor-pointer rounded">✕ Close</button>
            </div>
            
            <div className="p-5 space-y-4">
              <table className="w-full text-xs border border-zinc-200">
                <tbody className="divide-y divide-zinc-100">
                  {[
                    ["Student Name", selected.name],
                    ["Roll Number", selected.rollNo],
                    ["Stream / Branch", selected.stream],
                    ["Year of Study", `Year ${selected.year}`],
                    ["Verification Status", selected.status.toUpperCase()]
                  ].map(([k, v]) => (
                    <tr key={k} className="even:bg-zinc-50">
                      <td className="px-4 py-2.5 font-bold text-zinc-600 w-44">{k}</td>
                      <td className="px-4 py-2.5 text-zinc-850 font-mono">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Document Download Section */}
              {(() => {
                let docObj: { consentForm?: string; idCard?: string; proposalRoster?: string } | null = null;
                try {
                  if (selected.docUrl && selected.docUrl.startsWith("{")) {
                    docObj = JSON.parse(selected.docUrl);
                  }
                } catch (e) {}

                if (docObj) {
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

                return (
                  <div className="text-xs text-zinc-450 italic bg-zinc-50 p-4 border border-dashed border-zinc-200 rounded text-center">
                    No active digital verification documents submitted (Legacy Record).
                  </div>
                );
              })()}

              {selected.status === "pending" && (
                <div className="flex justify-end gap-3 pt-3 border-t border-zinc-200">
                  <button
                    onClick={() => { onAction(selected.id, "rejected"); setSelected(null); }}
                    className="bg-white hover:bg-red-50 text-red-700 text-xs font-bold px-4 py-2 border border-red-400 cursor-pointer transition-all"
                  >
                    ✕ Reject Membership
                  </button>
                  <button
                    onClick={() => { onAction(selected.id, "approved"); setSelected(null); }}
                    className="bg-[#0D6B4F] hover:bg-[#0a5840] text-white text-xs font-bold px-4 py-2 border border-[#0D6B4F] cursor-pointer transition-all"
                  >
                    ✓ Approve Student
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
