"use client";
import { useState } from "react";
import { Eye, FileText, Download, CheckCircle } from "lucide-react";

export interface ChapterReq { id: string; aishe: string; name: string; state: string; type: string; spoc: string; spocEmail: string; docUrl: string; status: "pending"|"approved"|"rejected"; }
interface Props { requests: ChapterReq[]; onVerify: (id: string, action: "approved"|"rejected") => void; }

export default function ChapterTab({ requests, onVerify }: Props) {
  const [selected, setSelected] = useState<ChapterReq | null>(null);
  const pending = requests.filter(r => r.status === "pending").length;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-0">
        <div>
          <h1 className="text-base font-bold text-zinc-900">Chapter Affiliation Bureau</h1>
          <p className="text-[11px] text-zinc-500 mt-0.5">Audit and process affiliation applications from STEM institutions.</p>
        </div>
        <div className="text-left sm:text-right text-[10px] text-zinc-500 self-start sm:self-auto">
          <p>Total: <strong className="text-zinc-800">{requests.length}</strong> &nbsp;|&nbsp; Pending: <strong className="text-red-700">{pending}</strong></p>
          <p>Approved: <strong className="text-emerald-700">{requests.filter(r=>r.status==="approved").length}</strong></p>
        </div>
      </div>

      <div className="bg-white border border-zinc-200">
        <div className="px-4 py-2.5 border-b border-zinc-200 bg-zinc-50 flex items-center justify-between">
          <span className="text-xs font-bold text-zinc-800 uppercase tracking-wider">Affiliation Applications Queue — Form NCIE-AFF-2026</span>
          <span className="text-[10px] text-zinc-400">Click &ldquo;Audit&rdquo; to review documents</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-[#0D6B4F] text-white text-[10px] uppercase tracking-wider">
                {["AISHE Code","Institution Name","Type","State","SPOC","Status","Action"].map(h => (
                  <th key={h} className={`px-4 py-2.5 font-semibold ${["Status","Action"].includes(h)?"text-center":"text-left"}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {requests.length > 0 ? (
                requests.map((r, i) => (
                  <tr key={r.id} className={`${i%2===0?"bg-white":"bg-zinc-50/50"} hover:bg-[#e8f5f0]/40`}>
                    <td className="px-4 py-2.5 font-mono text-zinc-600 font-bold">{r.aishe}</td>
                    <td className="px-4 py-2.5 font-semibold text-zinc-900">{r.name}</td>
                    <td className="px-4 py-2.5 text-zinc-600">{r.type}</td>
                    <td className="px-4 py-2.5 text-zinc-700">{r.state}</td>
                    <td className="px-4 py-2.5"><p className="font-semibold text-zinc-800">{r.spoc}</p><p className="text-[10px] text-zinc-400">{r.spocEmail}</p></td>
                    <td className="px-4 py-2.5 text-center">
                      {r.status==="pending"  && <span className="text-[9px] font-bold px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-300 uppercase">Pending</span>}
                      {r.status==="approved" && <span className="text-[9px] font-bold px-2 py-0.5 bg-green-50 text-green-800 border border-green-300 uppercase">Approved</span>}
                      {r.status==="rejected" && <span className="text-[9px] font-bold px-2 py-0.5 bg-red-50 text-red-800 border border-red-300 uppercase">Rejected</span>}
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      {r.status==="pending"
                        ? <button onClick={() => setSelected(r)} className="bg-[#0D6B4F] hover:bg-[#0a5840] text-white text-[10px] font-bold px-3 py-1 cursor-pointer inline-flex items-center gap-1"><Eye className="w-3 h-3"/>Audit</button>
                        : <span className="text-[10px] text-zinc-400">Processed</span>}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-zinc-400 italic">
                    No pending chapter affiliation requests
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Audit Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white border border-zinc-300 w-full max-w-xl shadow-2xl">
            <div className="bg-[#0D6B4F] text-white px-5 py-3 flex justify-between items-center">
              <div>
                <p className="text-[9px] font-bold text-emerald-200 uppercase tracking-widest">Document Audit — {selected.aishe}</p>
                <p className="text-sm font-bold">{selected.name}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-white/70 hover:text-white text-xs border border-white/30 px-2 py-1 cursor-pointer">✕ Close</button>
            </div>
            <div className="p-5 space-y-4">
              <table className="w-full text-xs border border-zinc-200">
                <tbody className="divide-y divide-zinc-100">
                  {[["AISHE Code",selected.aishe],["Institution",selected.name],["Type",selected.type],["State",selected.state],["Nodal SPOC",selected.spoc],["SPOC Email",selected.spocEmail]].map(([k,v])=>(
                    <tr key={k} className="even:bg-zinc-50">
                      <td className="px-4 py-2 font-bold text-zinc-600 w-40">{k}</td>
                      <td className="px-4 py-2 text-zinc-800 font-mono">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Parse document URLs JSON */}
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
                      <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Submitted Verification Documents</p>
                      
                      {docObj.consentForm && (
                        <div className="border border-zinc-200 p-2.5 flex items-center justify-between bg-zinc-50 rounded">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-[#0D6B4F]" />
                            <span className="text-xs font-bold text-zinc-700">Institutional Consent Form</span>
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
                            <span className="text-xs font-bold text-zinc-700">Accreditation / Incorporation Cert</span>
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
                            <span className="text-xs font-bold text-zinc-700">Coordinators / Program Overview</span>
                          </div>
                          <a href={docObj.proposalRoster} target="_blank" rel="noreferrer" className="text-[#0D6B4F] hover:underline text-[10px] font-bold flex items-center gap-1 cursor-pointer">
                            <Download className="w-3.5 h-3.5"/>Download
                          </a>
                        </div>
                      )}
                    </div>
                  );
                }

                // Fallback for single document / plain url
                return (
                  <div className="border border-zinc-200 p-3 flex items-center justify-between bg-zinc-50 rounded">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#0D6B4F]" />
                      <span className="text-xs font-bold text-zinc-800">{selected.docUrl}</span>
                    </div>
                    {selected.docUrl && selected.docUrl.startsWith("http") ? (
                      <a href={selected.docUrl} target="_blank" rel="noreferrer" className="text-[#0D6B4F] hover:underline text-[10px] font-bold flex items-center gap-1 cursor-pointer">
                        <Download className="w-3.5 h-3.5"/>Download
                      </a>
                    ) : (
                      <button className="text-[#0D6B4F] hover:underline text-[10px] font-bold flex items-center gap-1 cursor-pointer">
                        <Download className="w-3.5 h-3.5"/>Download
                      </button>
                    )}
                  </div>
                );
              })()}
              <div className="text-[10px] bg-amber-50 border border-amber-200 px-3 py-2 text-zinc-500">Verify AICTE/UGC affiliation document authenticity before approving. Approval generates the Chapter Registration Certificate automatically.</div>
              <div className="flex justify-end gap-3 pt-1">
                <button onClick={() => { onVerify(selected.id,"rejected"); setSelected(null); }} className="bg-white hover:bg-red-50 text-red-700 text-xs font-bold px-4 py-2 border border-red-400 cursor-pointer transition-all">✕ Reject Application</button>
                <button onClick={() => { onVerify(selected.id,"approved"); setSelected(null); }} className="bg-[#0D6B4F] hover:bg-[#0a5840] text-white text-xs font-bold px-4 py-2 border border-[#0D6B4F] cursor-pointer transition-all">✓ Approve Chapter</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
