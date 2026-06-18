"use client";
import { Users, Lightbulb, Star, Landmark, Bell, AlertCircle } from "lucide-react";

interface Props {
  pendingCount: number;
  verifiedCount: number;
  ideasCount: number;
  grantsReceived: string;
}

export default function OverviewTab({ pendingCount, verifiedCount, ideasCount, grantsReceived }: Props) {
  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-0">
        <div>
          <h1 className="text-base font-bold text-zinc-900">Dashboard Overview</h1>
          <p className="text-[11px] text-zinc-500 mt-0.5">Chapter performance summary for IIT Madras — Academic Year 2025–26</p>
        </div>
        <span className="text-[10px] bg-[#e8f5f0] border border-[#c2dfd4] text-[#0D6B4F] font-bold px-3 py-1 uppercase tracking-wider whitespace-nowrap self-start sm:self-auto">Chapter ID: NCIE-CH-IIT-MDR-001</span>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Verified Students", value: String(verifiedCount),    sub: "Active Members",    color: "border-t-[#0D6B4F]", icon: <Users className="w-5 h-5 text-[#0D6B4F]" /> },
          { label: "Ideas Submitted",   value: String(ideasCount),      sub: "TRL 3-6 range",     color: "border-t-blue-600",  icon: <Lightbulb className="w-5 h-5 text-blue-600" /> },
          { label: "MIC Star Rating",   value: "4.5 ★", sub: "NCIE Evaluation",   color: "border-t-amber-500", icon: <Star className="w-5 h-5 text-amber-500" /> },
          { label: "Grants Received",   value: grantsReceived,          sub: "FY 2025–26",       color: "border-t-purple-600",icon: <Landmark className="w-5 h-5 text-purple-600" /> },
        ].map(card => (
          <div key={card.label} className={`bg-white border border-zinc-200 border-t-4 ${card.color} p-4`}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">{card.label}</p>
                <p className="text-xl font-bold text-zinc-900 mt-1">{card.value}</p>
                <p className="text-[10px] text-zinc-400 mt-0.5">{card.sub}</p>
              </div>
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      {pendingCount > 0 && (
        <div className="bg-[#fffbeb] border border-[#fde68a] px-4 py-3 flex gap-3">
          <AlertCircle className="w-4 h-4 text-[#b45309] shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-[#92400e]">Action Required — {pendingCount} Pending Membership Verification(s)</p>
            <p className="text-[11px] text-[#92400e] mt-0.5">Student membership requests are awaiting SPOC approval. Pending verifications affect chapter star-rating compliance audits.</p>
          </div>
        </div>
      )}

      <div className="bg-white border border-zinc-200">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-200 bg-zinc-50">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#0D6B4F]" />
            <span className="text-xs font-bold text-zinc-800 uppercase tracking-wider">Central Nodal Desk Directives</span>
          </div>
          <span className="text-[10px] text-zinc-400">Last updated: 16 Jun 2026</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 uppercase text-[10px] tracking-wider">
                <th className="px-4 py-2 font-semibold text-left w-36">Ref No.</th>
                <th className="px-4 py-2 font-semibold text-left w-24">Date</th>
                <th className="px-4 py-2 font-semibold text-left">Directive</th>
                <th className="px-4 py-2 font-semibold text-center w-20">Priority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {[
                { ref: "NCIE/DIR/2026/42", date: "16-Jun-26", msg: "NIDHI-CIS Prototyping Grant applications close 31 July. Ensure project submissions are verified and endorsed by SPOC before forwarding.", pri: "High" },
                { ref: "NCIE/FIN/2026/11", date: "10-Jun-26", msg: "Utilisation Certificates (Phase-1) must be submitted to the Regional Nodal Desk by 30 June to release Tranche-2 disbursement.", pri: "High" },
                { ref: "NCIE/ADM/2026/09", date: "02-Jun-26", msg: "Annual performance self-assessment for MIC Star Rating is open on the portal until 15 July 2026.", pri: "Normal" },
              ].map(d => (
                <tr key={d.ref} className="hover:bg-zinc-50">
                  <td className="px-4 py-2.5 font-mono text-[10px] text-zinc-500">{d.ref}</td>
                  <td className="px-4 py-2.5 text-zinc-600 whitespace-nowrap">{d.date}</td>
                  <td className="px-4 py-2.5 text-zinc-700 leading-relaxed">{d.msg}</td>
                  <td className="px-4 py-2.5 text-center">
                    <span className={`text-[9px] font-bold px-2 py-0.5 uppercase border ${d.pri === "High" ? "bg-red-50 text-red-700 border-red-200" : "bg-zinc-100 text-zinc-600 border-zinc-300"}`}>{d.pri}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
