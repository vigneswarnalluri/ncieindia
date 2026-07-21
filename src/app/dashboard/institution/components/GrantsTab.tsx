"use client";
import { useState } from "react";
import { Upload, FileText, CheckCircle } from "lucide-react";

export interface Grant {
  scheme: string;
  san: string;
  amt: string;
  tr: string;
  uc: "submitted" | "pending";
}

interface Props {
  grants: Grant[];
  onToast: (msg: string) => void;
}

export default function GrantsTab({ grants, onToast }: Props) {
  const [ucUploaded, setUcUploaded] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleUcUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setUcUploaded(true);
      onToast("Utilization Certificate uploaded. Ref: NCIE-UC-2026-IIT-MDR-02");
    }, 1600);
  };

  const totalApprovedVal = grants.reduce((sum, r) => sum + parseInt(r.amt.replace(/,/g, ""), 10), 0);
  const formattedTotal = totalApprovedVal.toLocaleString("en-IN");

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-base font-bold text-zinc-900">Grants &amp; Utilisation Certificate Bureau</h1>
        <p className="text-[11px] text-zinc-500 mt-0.5">Track central fund disbursements and submit CA-audited Utilisation Certificates (UC).</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-white border border-zinc-200">
          <div className="px-4 py-2.5 border-b border-zinc-200 bg-zinc-50">
            <span className="text-xs font-bold text-zinc-800 uppercase tracking-wider">Disbursement Ledger — FY 2025–26</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-[#0D6B4F] text-white text-[10px] uppercase tracking-wider">
                  <th className="px-4 py-2.5 font-semibold text-left">Scheme Name</th>
                  <th className="px-4 py-2.5 font-semibold text-left">Sanction No.</th>
                  <th className="px-4 py-2.5 font-semibold text-right">Amount (₹)</th>
                  <th className="px-4 py-2.5 font-semibold text-center">Tranche</th>
                  <th className="px-4 py-2.5 font-semibold text-center">UC Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {grants.length > 0 ? (
                  grants.map((r, i) => (
                    <tr key={i} className={`${i % 2 === 0 ? "bg-white" : "bg-zinc-50/50"} hover:bg-[#e8f5f0]/40`}>
                      <td className="px-4 py-2.5 font-semibold text-zinc-900">{r.scheme}</td>
                      <td className="px-4 py-2.5 font-mono text-[10px] text-zinc-500">{r.san}</td>
                      <td className="px-4 py-2.5 text-right font-bold text-zinc-800">₹{r.amt}</td>
                      <td className="px-4 py-2.5 text-center font-mono text-zinc-600">{r.tr}</td>
                      <td className="px-4 py-2.5 text-center">
                        {r.uc === "submitted" && <span className="text-[9px] font-bold px-2 py-0.5 bg-green-50 text-green-800 border border-green-300 uppercase">Submitted</span>}
                        {r.uc === "pending"   && <span className="text-[9px] font-bold px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-300 uppercase">Pending</span>}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-zinc-400 italic">
                      No central fund disbursements found
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr className="bg-zinc-100 border-t-2 border-zinc-300">
                  <td colSpan={2} className="px-4 py-2 text-xs font-bold text-zinc-700 uppercase">Total Approved</td>
                  <td className="px-4 py-2 text-right text-xs font-bold text-zinc-900">₹{formattedTotal}</td>
                  <td colSpan={2} />
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <div className="bg-white border border-zinc-200">
          <div className="px-4 py-2.5 border-b border-zinc-200 bg-zinc-50">
            <span className="text-xs font-bold text-zinc-800 uppercase tracking-wider">Upload Utilisation Certificate</span>
          </div>
          <form onSubmit={handleUcUpload} className="p-4 space-y-4">
            <div className="text-[10px] text-zinc-500 bg-amber-50 border border-amber-200 p-3 leading-relaxed">
              <strong className="text-amber-800">Important:</strong> UC must be signed by a Chartered Accountant (CA) and countersigned by the Head of Institution. Only PDF format accepted (max 5 MB).
            </div>
            {[
              { label: "Sanction Order Number",  ph: "e.g. NCIE/MEF/2026/IIT-MDR/007" },
              { label: "CA Registration Number", ph: "e.g. CA-FCA-123456"             },
              { label: "Expenditure Period",      ph: "e.g. Apr 2025 – Mar 2026"       },
            ].map(f => (
              <div key={f.label} className="space-y-1">
                <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider block">{f.label}</label>
                <input type="text" placeholder={f.ph} className="w-full border border-zinc-300 px-3 py-1.5 text-xs focus:outline-none focus:border-[#0D6B4F] bg-white" />
              </div>
            ))}
            <div className="border-2 border-dashed border-zinc-300 hover:border-[#0D6B4F] p-5 text-center cursor-pointer transition-all">
              <Upload className="w-6 h-6 text-zinc-400 mx-auto mb-1.5" />
              <p className="text-xs font-semibold text-zinc-600">Select UC Document (PDF)</p>
              <p className="text-[10px] text-zinc-400 mt-0.5">Maximum file size: 5 MB</p>
            </div>
            {ucUploaded && (
              <div className="flex items-center gap-2 p-2.5 bg-green-50 border border-green-300">
                <FileText className="w-4 h-4 text-green-700 shrink-0" />
                <div>
                  <p className="text-[10px] font-bold text-green-800">UC_IIT_MDR_NCIE_2026_SIGNED.pdf</p>
                  <p className="text-[9px] text-green-600">Uploaded — Pending nodal desk verification</p>
                </div>
              </div>
            )}
            <button type="submit" disabled={uploading} className="w-full bg-[#0D6B4F] hover:bg-[#0a5840] disabled:bg-zinc-400 text-white text-xs font-bold py-2 border border-[#0D6B4F] cursor-pointer transition-all">
              {uploading ? "Uploading, please wait..." : "Submit Utilisation Certificate"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
