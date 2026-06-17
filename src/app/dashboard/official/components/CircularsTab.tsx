"use client";
import { useState } from "react";
import { Send } from "lucide-react";

export interface Circular { id: string; ref: string; title: string; type: string; date: string; priority: string; }
interface Props { circulars: Circular[]; onAdd: (c: Omit<Circular,"id"|"date">) => void; }

export default function CircularsTab({ circulars, onAdd }: Props) {
  const [nc, setNc] = useState({ ref: "", title: "", type: "Circular", priority: "Normal" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nc.ref || !nc.title) return;
    onAdd(nc);
    setNc({ ref: "", title: "", type: "Circular", priority: "Normal" });
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-base font-bold text-zinc-900">Gazette &amp; Circular Dispatch System</h1>
        <p className="text-[11px] text-zinc-500 mt-0.5">Draft and publish official circulars, directives, and notices to all chapter nodes.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-white border border-zinc-200">
          <div className="px-4 py-2.5 border-b border-zinc-200 bg-zinc-50 flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-800 uppercase tracking-wider">Dispatched Circulars &amp; Gazette Register</span>
            <span className="text-[10px] text-zinc-400">eGazette — NCIE Portal</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#0D6B4F] text-white text-[10px] uppercase tracking-wider">
                  {["Reference No.","Subject / Title","Type","Date","Priority"].map((h,i) => (
                    <th key={h} className={`px-4 py-2.5 font-semibold ${i===4?"text-center":"text-left"}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {circulars.map((c, i) => (
                  <tr key={c.id} className={`${i%2===0?"bg-white":"bg-zinc-50/50"} hover:bg-[#e8f5f0]/40`}>
                    <td className="px-4 py-2.5 font-mono text-[10px] text-zinc-500 font-bold">{c.ref}</td>
                    <td className="px-4 py-2.5 font-semibold text-zinc-900">{c.title}</td>
                    <td className="px-4 py-2.5 text-zinc-600">{c.type}</td>
                    <td className="px-4 py-2.5 text-zinc-600">{c.date}</td>
                    <td className="px-4 py-2.5 text-center">
                      <span className={`text-[9px] font-bold px-2 py-0.5 border uppercase ${c.priority==="High"?"bg-red-50 text-red-800 border-red-300":"bg-zinc-100 text-zinc-600 border-zinc-300"}`}>{c.priority}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white border border-zinc-200">
          <div className="px-4 py-2.5 border-b border-zinc-200 bg-zinc-50">
            <span className="text-xs font-bold text-zinc-800 uppercase tracking-wider">Draft New Circular</span>
          </div>
          <form onSubmit={handleSubmit} className="p-4 space-y-3">
            {[{label:"Reference Number",key:"ref",ph:"e.g. NCIE/NCRC/2026/22"},{label:"Subject / Title",key:"title",ph:"e.g. Grant Round-2 Open"}].map(f => (
              <div key={f.key} className="space-y-1">
                <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider block">{f.label} <span className="text-red-500">*</span></label>
                <input type="text" placeholder={f.ph} value={(nc as any)[f.key]} onChange={e => setNc(p=>({...p,[f.key]:e.target.value}))} required className="w-full border border-zinc-300 px-3 py-1.5 text-xs focus:outline-none focus:border-[#0D6B4F] font-mono" />
              </div>
            ))}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider block">Document Type</label>
              <select value={nc.type} onChange={e => setNc(p=>({...p,type:e.target.value}))} className="w-full border border-zinc-300 px-3 py-1.5 text-xs focus:outline-none focus:border-[#0D6B4F]">
                {["Circular","Directive","Notice","Gazette","Office Memorandum"].map(o=><option key={o}>{o}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider block">Priority Level</label>
              <select value={nc.priority} onChange={e => setNc(p=>({...p,priority:e.target.value}))} className="w-full border border-zinc-300 px-3 py-1.5 text-xs focus:outline-none focus:border-[#0D6B4F]">
                <option value="Normal">Normal</option>
                <option value="High">High Priority</option>
              </select>
            </div>
            <div className="text-[10px] bg-zinc-50 border border-zinc-200 px-3 py-2 text-zinc-500">Dispatch publishes to all chapter SPOCs and the public Media page simultaneously.</div>
            <button type="submit" className="w-full bg-[#0D6B4F] hover:bg-[#0a5840] text-white text-xs font-bold py-2 border border-[#0D6B4F] cursor-pointer flex items-center justify-center gap-1.5 transition-all">
              <Send className="w-3.5 h-3.5" /> Dispatch Circular
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
