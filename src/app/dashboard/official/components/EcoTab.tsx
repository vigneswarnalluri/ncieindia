"use client";
import { Building2, TrendingUp, Landmark, FileText, MapPin } from "lucide-react";

export default function EcoTab() {
  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-0">
        <div>
          <h1 className="text-base font-bold text-zinc-900">National Innovation Ecosystem Dashboard</h1>
          <p className="text-[11px] text-zinc-500 mt-0.5">Aggregate indicators — All India Chapter Registry | Updated: 16 June 2026</p>
        </div>
        <span className="text-[10px] bg-[#e8f5f0] border border-[#c2dfd4] text-[#0D6B4F] font-bold px-3 py-1 uppercase tracking-wider whitespace-nowrap self-start sm:self-auto">Admin Dashboard — L2 Access</span>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Registered Chapters", value: "1,245",    sub: "+8% this quarter", color: "border-t-[#0D6B4F]", icon: <Building2 className="w-5 h-5 text-[#0D6B4F]" /> },
          { label: "Student Innovators",  value: "14,205",   sub: "Active registry",  color: "border-t-blue-600",  icon: <TrendingUp className="w-5 h-5 text-blue-600" /> },
          { label: "Grants Disbursed",    value: "₹5.42 Cr", sub: "FY 2025–26",      color: "border-t-purple-600",icon: <Landmark className="w-5 h-5 text-purple-600" /> },
          { label: "Patents Filed",       value: "189",       sub: "via NCIE IP Cell", color: "border-t-amber-500", icon: <FileText className="w-5 h-5 text-amber-500" /> },
        ].map(c => (
          <div key={c.label} className={`bg-white border border-zinc-200 border-t-4 ${c.color} p-4`}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">{c.label}</p>
                <p className="text-xl font-bold text-zinc-900 mt-1">{c.value}</p>
                <p className="text-[10px] text-zinc-400 mt-0.5">{c.sub}</p>
              </div>
              {c.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-zinc-200">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-200 bg-zinc-50">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#0D6B4F]" />
            <span className="text-xs font-bold text-zinc-800 uppercase tracking-wider">State-wise Chapter Density Report</span>
          </div>
          <span className="text-[10px] text-zinc-400">All India Registry — AISHE 2026</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-[#0D6B4F] text-white text-[10px] uppercase tracking-wider">
                {["S.No.","State / UT","Chapters","Students","Projects","Density"].map((h,i) => (
                  <th key={h} className={`px-4 py-2.5 font-semibold ${i>=2?"text-center":"text-left"}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {[["Tamil Nadu","182","2,810","44","High"],["Maharashtra","142","2,190","36","High"],["Karnataka","115","1,830","29","High"],
                ["Uttar Pradesh","98","1,540","21","Medium"],["Gujarat","95","1,410","18","Medium"],["Telangana","88","1,390","22","Medium"],
                ["Rajasthan","72","1,090","15","Developing"]].map(([state,ch,st,pr,den],i) => (
                <tr key={state} className={`${i%2===0?"bg-white":"bg-zinc-50/50"} hover:bg-[#e8f5f0]/40`}>
                  <td className="px-4 py-2 text-zinc-500">{i+1}</td>
                  <td className="px-4 py-2 font-semibold text-zinc-900">{state}</td>
                  <td className="px-4 py-2 text-center text-zinc-700">{ch}</td>
                  <td className="px-4 py-2 text-center text-zinc-700">{st}</td>
                  <td className="px-4 py-2 text-center text-zinc-700">{pr}</td>
                  <td className="px-4 py-2 text-center">
                    <span className={`text-[9px] font-bold px-2 py-0.5 border uppercase ${den==="High"?"bg-green-50 text-green-800 border-green-300":den==="Medium"?"bg-blue-50 text-blue-800 border-blue-300":"bg-zinc-100 text-zinc-700 border-zinc-300"}`}>{den}</span>
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
