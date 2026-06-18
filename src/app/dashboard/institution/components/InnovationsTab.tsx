"use client";
import { useState } from "react";

export interface Project {
  id: string; title: string; teamLeader: string;
  stream: string; trl: number; status: "draft" | "submitted" | "endorsed";
  isDbRecord?: boolean;
}
interface Props { projects: Project[]; onEndorse: (id: string) => void; onAdd: (p: Omit<Project, "id" | "status">) => void; }

const STREAMS = ["Computer Science & Engineering","Electronics & Communication","Mechanical Engineering","Civil Engineering","Information Technology","Electrical Engineering"];
const TRL_LABELS = ["Basic Research","Technology Concept","Experimental PoC","Lab Validation","Relevant Env. Validation","Relevant Env. Demo","Operational Prototype","System Complete","Actual System"];

export default function InnovationsTab({ projects, onEndorse, onAdd }: Props) {
  const [newP, setNewP] = useState({ title: "", teamLeader: "", stream: STREAMS[0], trl: 1 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newP.title || !newP.teamLeader) return;
    onAdd(newP);
    setNewP({ title: "", teamLeader: "", stream: STREAMS[0], trl: 1 });
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-base font-bold text-zinc-900">Innovation &amp; Prototyping Repository</h1>
        <p className="text-[11px] text-zinc-500 mt-0.5">Manage and endorse student project submissions to NCIE National Selection Pool.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-white border border-zinc-200">
          <div className="px-4 py-2.5 border-b border-zinc-200 bg-zinc-50 flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-800 uppercase tracking-wider">Registered Projects</span>
            <span className="text-[10px] text-zinc-400 font-mono">Form: NCIE-PROJ-2026</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-[#0D6B4F] text-white text-[10px] uppercase tracking-wider">
                  {["S.No.","Project Title","Team Leader","TRL","Status","Action"].map(h => (
                    <th key={h} className={`px-4 py-2.5 font-semibold ${["TRL","Status","Action"].includes(h) ? "text-center" : "text-left"}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {projects.length > 0 ? (
                  projects.map((p, i) => (
                    <tr key={p.id} className={`${i % 2 === 0 ? "bg-white" : "bg-zinc-50/50"} hover:bg-[#e8f5f0]/40`}>
                      <td className="px-4 py-2.5 text-zinc-500">{i + 1}</td>
                      <td className="px-4 py-2.5 font-semibold text-zinc-900">{p.title}</td>
                      <td className="px-4 py-2.5 text-zinc-700">{p.teamLeader}</td>
                      <td className="px-4 py-2.5 text-center font-mono font-bold text-zinc-700">TRL-{p.trl}</td>
                      <td className="px-4 py-2.5 text-center">
                        {p.status === "draft"     && <span className="text-[9px] font-bold px-2 py-0.5 bg-zinc-100 text-zinc-700 border border-zinc-300 uppercase">Draft</span>}
                        {p.status === "submitted" && <span className="text-[9px] font-bold px-2 py-0.5 bg-blue-50 text-blue-800 border border-blue-300 uppercase">Submitted</span>}
                        {p.status === "endorsed"  && <span className="text-[9px] font-bold px-2 py-0.5 bg-green-50 text-green-800 border border-green-300 uppercase">Endorsed</span>}
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        {p.status !== "endorsed"
                          ? <button onClick={() => onEndorse(p.id)} className="bg-[#0D6B4F] hover:bg-[#0a5840] text-white text-[10px] font-bold px-3 py-1 border border-[#0D6B4F] cursor-pointer">Endorse</button>
                          : <span className="text-[10px] text-zinc-400">—</span>}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-zinc-400 italic">
                      No projects registered in the Innovation Repository
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white border border-zinc-200">
          <div className="px-4 py-2.5 border-b border-zinc-200 bg-zinc-50">
            <span className="text-xs font-bold text-zinc-800 uppercase tracking-wider">Add New Project Draft</span>
          </div>
          <form onSubmit={handleSubmit} className="p-4 space-y-3">
            {[{ label: "Project Title", key: "title", ph: "e.g. Electric ATV Chassis Design" }, { label: "Team Leader Name", key: "teamLeader", ph: "e.g. S. Subramaniam" }].map(f => (
              <div key={f.key} className="space-y-1">
                <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider block">{f.label} <span className="text-red-500">*</span></label>
                <input type="text" placeholder={f.ph} value={(newP as any)[f.key]} onChange={e => setNewP(p => ({ ...p, [f.key]: e.target.value }))} required className="w-full border border-zinc-300 px-3 py-1.5 text-xs focus:outline-none focus:border-[#0D6B4F] bg-white" />
              </div>
            ))}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider block">Branch / Stream</label>
              <select value={newP.stream} onChange={e => setNewP(p => ({ ...p, stream: e.target.value }))} className="w-full border border-zinc-300 px-3 py-1.5 text-xs focus:outline-none focus:border-[#0D6B4F] bg-white">
                {STREAMS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider block">Technology Readiness Level (TRL)</label>
              <select value={newP.trl} onChange={e => setNewP(p => ({ ...p, trl: +e.target.value }))} className="w-full border border-zinc-300 px-3 py-1.5 text-xs focus:outline-none focus:border-[#0D6B4F] bg-white">
                {TRL_LABELS.map((label, i) => <option key={i + 1} value={i + 1}>TRL-{i + 1} — {label}</option>)}
              </select>
            </div>
            <button type="submit" className="w-full bg-[#0D6B4F] hover:bg-[#0a5840] text-white text-xs font-bold py-2 border border-[#0D6B4F] cursor-pointer transition-all mt-1">Save Draft to Repository</button>
          </form>
        </div>
      </div>
    </div>
  );
}
