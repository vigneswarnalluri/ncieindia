"use client";
import { CheckCircle, AlertTriangle } from "lucide-react";

export interface GrantRow { id: string; college: string; scheme: string; san: string; amount: number; uc: "approved"|"pending_audit"|"not_submitted"; tranche: number; status: "pending"|"disbursed"; }
interface Props { grants: GrantRow[]; onDisburse: (id: string) => void; }

export default function GrantsTab({ grants, onDisburse }: Props) {
  const total = grants.reduce((a, g) => a + g.amount, 0);
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-base font-bold text-zinc-900">Grants Disbursement Desk</h1>
        <p className="text-[11px] text-zinc-500 mt-0.5">Review UC audit status and authorise fund release to beneficiary institutions.</p>
      </div>
      <div className="bg-white border border-zinc-200">
        <div className="px-4 py-2.5 border-b border-zinc-200 bg-zinc-50 flex items-center justify-between">
          <span className="text-xs font-bold text-zinc-800 uppercase tracking-wider">Fund Release Authorisation Register — FY 2025–26</span>
          <span className="text-[10px] font-mono text-zinc-400">PFMS Interface — Linked</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-[#0D6B4F] text-white text-[10px] uppercase tracking-wider">
                {["Sanction No.","Beneficiary College","Scheme","Amount","Tranche","UC Audit","Action"].map((h,i) => (
                  <th key={h} className={`px-4 py-2.5 font-semibold ${i===3?"text-right":i>=4?"text-center":"text-left"}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {grants.length > 0 ? (
                grants.map((g, i) => (
                  <tr key={g.id} className={`${i%2===0?"bg-white":"bg-zinc-50/50"} hover:bg-[#e8f5f0]/40`}>
                    <td className="px-4 py-2.5 font-mono text-[10px] text-zinc-500">{g.san}</td>
                    <td className="px-4 py-2.5 font-semibold text-zinc-900">{g.college}</td>
                    <td className="px-4 py-2.5 text-zinc-700">{g.scheme}</td>
                    <td className="px-4 py-2.5 text-right font-bold text-zinc-800">₹{(g.amount/100000).toFixed(2)} L</td>
                    <td className="px-4 py-2.5 text-center font-mono text-zinc-600">Tranche-{g.tranche}</td>
                    <td className="px-4 py-2.5 text-center">
                      {g.uc==="approved"      && <span className="text-[9px] font-bold px-2 py-0.5 bg-green-50 text-green-800 border border-green-300 uppercase inline-flex items-center gap-0.5"><CheckCircle className="w-3 h-3"/>Verified</span>}
                      {g.uc==="pending_audit" && <span className="text-[9px] font-bold px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-300 uppercase inline-flex items-center gap-0.5"><AlertTriangle className="w-3 h-3"/>Audit Pending</span>}
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      {g.status==="pending"
                        ? <button onClick={() => onDisburse(g.id)} disabled={g.uc!=="approved"} className={`text-[10px] font-bold px-3 py-1 border cursor-pointer transition-all ${g.uc==="approved"?"bg-[#0D6B4F] hover:bg-[#0a5840] text-white border-[#0D6B4F]":"bg-zinc-100 text-zinc-400 border-zinc-300 cursor-not-allowed"}`}>Release Fund</button>
                        : <span className="text-[10px] text-zinc-400">— Disbursed —</span>}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-zinc-400 italic">
                    No fund release authorization requests
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr className="bg-zinc-100 border-t-2 border-zinc-300">
                <td colSpan={3} className="px-4 py-2 text-xs font-bold text-zinc-700 uppercase">Total Sanctioned (FY 2025–26)</td>
                <td className="px-4 py-2 text-right text-xs font-bold text-zinc-900">₹{(total/100000).toFixed(2)} L</td>
                <td colSpan={3} />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
