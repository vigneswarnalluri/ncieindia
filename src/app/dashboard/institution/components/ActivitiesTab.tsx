"use client";
import { useState } from "react";

interface Event { id: string; title: string; type: string; date: string; attendees: number; status: string; }
interface Props { events: Event[]; onAdd: (e: Omit<Event, "id" | "status">) => void; }

const EVENT_TYPES = ["Workshop / Bootcamp","Expert Lecture / Seminar","Internal Hackathon","Prototype Exhibition","Mentorship Session"];

export default function ActivitiesTab({ events, onAdd }: Props) {
  const [form, setForm] = useState({ title: "", type: EVENT_TYPES[0], date: "", attendees: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.date || !form.attendees) return;
    onAdd({ title: form.title, type: form.type, date: form.date, attendees: parseInt(form.attendees) });
    setForm({ title: "", type: EVENT_TYPES[0], date: "", attendees: "" });
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-base font-bold text-zinc-900">Activity &amp; Event Reporting</h1>
        <p className="text-[11px] text-zinc-500 mt-0.5">Report incubation events, workshops, and hackathons to earn MIC Star performance points.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-white border border-zinc-200">
          <div className="px-4 py-2.5 border-b border-zinc-200 bg-zinc-50">
            <span className="text-xs font-bold text-zinc-800 uppercase tracking-wider">Activity Log — AY 2025–26</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-[#0D6B4F] text-white text-[10px] uppercase tracking-wider">
                  {["S.No.","Event Title","Category","Date","Participants","Status"].map((h, i) => (
                    <th key={h} className={`px-4 py-2.5 font-semibold ${i >= 4 ? "text-center" : "text-left"}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {events.length > 0 ? (
                  events.map((ev, i) => (
                    <tr key={ev.id} className={`${i % 2 === 0 ? "bg-white" : "bg-zinc-50/50"} hover:bg-[#e8f5f0]/40`}>
                      <td className="px-4 py-2.5 text-zinc-500">{i + 1}</td>
                      <td className="px-4 py-2.5 font-semibold text-zinc-900">{ev.title}</td>
                      <td className="px-4 py-2.5 text-zinc-700">{ev.type}</td>
                      <td className="px-4 py-2.5 font-mono text-zinc-600">{ev.date}</td>
                      <td className="px-4 py-2.5 text-center text-zinc-700">{ev.attendees}</td>
                      <td className="px-4 py-2.5 text-center">
                        {ev.status === "approved" && <span className="text-[9px] font-bold px-2 py-0.5 bg-green-50 text-green-800 border border-green-300 uppercase">Verified</span>}
                        {ev.status === "pending"  && <span className="text-[9px] font-bold px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-300 uppercase">Under Review</span>}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-zinc-400 italic">
                      No activities reported for this academic year
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white border border-zinc-200">
          <div className="px-4 py-2.5 border-b border-zinc-200 bg-zinc-50">
            <span className="text-xs font-bold text-zinc-800 uppercase tracking-wider">Report New Activity</span>
          </div>
          <form onSubmit={handleSubmit} className="p-4 space-y-3">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider block">Event / Activity Title <span className="text-red-500">*</span></label>
              <input type="text" placeholder="e.g. Design Thinking Bootcamp" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} required className="w-full border border-zinc-300 px-3 py-1.5 text-xs focus:outline-none focus:border-[#0D6B4F]" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider block">Activity Category</label>
              <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))} className="w-full border border-zinc-300 px-3 py-1.5 text-xs focus:outline-none focus:border-[#0D6B4F]">
                {EVENT_TYPES.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider block">Date Held <span className="text-red-500">*</span></label>
                <input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} required className="w-full border border-zinc-300 px-2 py-1.5 text-xs focus:outline-none focus:border-[#0D6B4F]" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider block">No. of Participants <span className="text-red-500">*</span></label>
                <input type="number" placeholder="e.g. 75" value={form.attendees} onChange={e => setForm(p => ({ ...p, attendees: e.target.value }))} required className="w-full border border-zinc-300 px-2 py-1.5 text-xs focus:outline-none focus:border-[#0D6B4F]" />
              </div>
            </div>
            <button type="submit" className="w-full bg-[#0D6B4F] hover:bg-[#0a5840] text-white text-xs font-bold py-2 border border-[#0D6B4F] cursor-pointer transition-all mt-1">Submit Activity Report</button>
          </form>
        </div>
      </div>
    </div>
  );
}
