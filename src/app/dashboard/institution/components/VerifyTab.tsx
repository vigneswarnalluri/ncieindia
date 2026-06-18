"use client";
import { ClipboardList } from "lucide-react";

export interface Student {
  id: string; name: string; rollNo: string;
  stream: string; year: string; status: "pending" | "approved" | "rejected";
  isDbRecord?: boolean;
}
interface Props { students: Student[]; onAction: (id: string, action: "approved" | "rejected") => void; }

export default function VerifyTab({ students, onAction }: Props) {
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
              {students.map((s, i) => (
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
                        <button onClick={() => onAction(s.id, "approved")} className="bg-[#0D6B4F] hover:bg-[#0a5840] text-white text-[10px] font-bold px-3 py-1 border border-[#0D6B4F] cursor-pointer transition-all">✓ Approve</button>
                        <button onClick={() => onAction(s.id, "rejected")} className="bg-white hover:bg-red-50 text-red-700 text-[10px] font-bold px-3 py-1 border border-red-400 cursor-pointer transition-all">✕ Reject</button>
                      </div>
                    ) : <span className="text-[10px] text-zinc-400">— Processed —</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2 border-t border-zinc-200 bg-zinc-50 text-[10px] text-zinc-500">
          Showing {students.length} records &nbsp;|&nbsp; Page 1 of 1
        </div>
      </div>
    </div>
  );
}
