"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, HelpCircle, AlertCircle, Award, Coins, ListChecks } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { PROGRAMS_DATA, Program } from "@/app/programs/page";

interface Props {
  onToast: (msg: string) => void;
}

export default function ProgramsTab({ onToast }: Props) {
  const [programs, setPrograms] = useState<Program[]>(PROGRAMS_DATA);
  const [dbStatus, setDbStatus] = useState<"connected" | "offline">("connected");
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);

  // Form Fields State
  const [formId, setFormId] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formSubtitle, setFormSubtitle] = useState("");
  const [formCategory, setFormCategory] = useState<"student" | "startup" | "institution" | "corporate">("student");
  const [formBudget, setFormBudget] = useState("");
  const [formDuration, setFormDuration] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formBenefits, setFormBenefits] = useState<string[]>([]);
  const [formStages, setFormStages] = useState<{ title: string; desc: string }[]>([]);
  const [formTranches, setFormTranches] = useState<{ name: string; stage: string; amount: string; trigger: string; note?: string }[]>([]);

  useEffect(() => {
    loadPrograms();
  }, []);

  async function loadPrograms() {
    try {
      const { data, error } = await supabase
        .from("programs")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) throw error;
      if (data && data.length > 0) {
        setPrograms(data as Program[]);
        setDbStatus("connected");
      } else {
        // Table exists but has no rows, load static ones
        setPrograms(PROGRAMS_DATA);
        setDbStatus("connected");
      }
    } catch (err) {
      console.warn("Supabase fetch failed for admin programs. Running in local fallback state:", err);
      setDbStatus("offline");
      setPrograms(PROGRAMS_DATA);
    }
  }

  const openAddEditor = () => {
    setEditingProgram(null);
    setFormId("");
    setFormTitle("");
    setFormSubtitle("");
    setFormCategory("student");
    setFormBudget("");
    setFormDuration("");
    setFormDescription("");
    setFormBenefits([""]);
    setFormStages([{ title: "", desc: "" }]);
    setFormTranches([{ name: "Tranche-1", stage: "Initial Setup", amount: "₹0", trigger: "On sanction sign-off", note: "" }]);
    setEditorOpen(true);
  };

  const openEditEditor = (p: Program) => {
    setEditingProgram(p);
    setFormId(p.id);
    setFormTitle(p.title);
    setFormSubtitle(p.subtitle);
    setFormCategory(p.category);
    setFormBudget(p.budget);
    setFormDuration(p.duration);
    setFormDescription(p.description);
    setFormBenefits(p.benefits.length > 0 ? [...p.benefits] : [""]);
    setFormStages(p.stages && p.stages.length > 0 ? p.stages.map(s => ({ ...s })) : [{ title: "", desc: "" }]);
    setFormTranches(
      p.tranches && p.tranches.length > 0 
        ? p.tranches.map(t => ({ name: t.name, stage: t.stage, amount: t.amount, trigger: t.trigger, note: t.note || "" })) 
        : [{ name: "Tranche-1", stage: "Initial Setup", amount: "₹0", trigger: "On sanction sign-off", note: "" }]
    );
    setEditorOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this program from the registry?")) return;

    try {
      const { error } = await supabase.from("programs").delete().eq("id", id);
      if (error) throw error;
      onToast("Program deleted from database registry.");
    } catch {
      onToast("Program deleted from local memory state (Offline Mode).");
    }
    setPrograms(prev => prev.filter(p => p.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formId || !formTitle || !formBudget || !formDuration) {
      alert("Please fill in all required fields.");
      return;
    }

    const cleanedBenefits = formBenefits.map(b => b.trim()).filter(b => b !== "");
    const cleanedStages = formStages.map(s => ({ title: s.title.trim(), desc: s.desc.trim() })).filter(s => s.title !== "");
    const cleanedTranches = formTranches.map(t => ({ name: t.name.trim(), stage: t.stage.trim(), amount: t.amount.trim(), trigger: t.trigger.trim(), note: t.note?.trim() })).filter(t => t.name !== "");

    const programPayload: Program = {
      id: formId.toLowerCase().trim().replace(/[^a-z0-9-]/g, "-"),
      title: formTitle.trim(),
      subtitle: formSubtitle.trim(),
      category: formCategory,
      budget: formBudget.trim(),
      duration: formDuration.trim(),
      description: formDescription.trim(),
      benefits: cleanedBenefits,
      stages: cleanedStages.length > 0 ? cleanedStages : undefined,
      tranches: cleanedTranches.length > 0 ? cleanedTranches : undefined
    };

    try {
      if (editingProgram) {
        const { error } = await supabase
          .from("programs")
          .update(programPayload)
          .eq("id", editingProgram.id);
        if (error) throw error;
        onToast("Program successfully updated in Database Registry.");
      } else {
        const { error } = await supabase
          .from("programs")
          .insert(programPayload);
        if (error) throw error;
        onToast("Program successfully added to Database Registry.");
      }
      loadPrograms();
    } catch (err) {
      // Local fallback edit
      console.warn("Failed to write to database. Updating local state.", err);
      if (editingProgram) {
        setPrograms(prev => prev.map(p => p.id === editingProgram.id ? programPayload : p));
        onToast("Changes saved locally. (Supabase table offline / setup pending).");
      } else {
        setPrograms(prev => [...prev, programPayload]);
        onToast("New program added locally. (Supabase table offline / setup pending).");
      }
    }

    setEditorOpen(false);
  };

  return (
    <div className="space-y-5">
      
      {/* Header Info Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-0">
        <div>
          <h1 className="text-base font-bold text-zinc-900">Program &amp; Central Schemes Registry</h1>
          <p className="text-[11px] text-zinc-500 mt-0.5">Scout, edit, and publish official MoE/NCIE funding and student initiatives.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={openAddEditor}
            className="bg-[#0D6B4F] hover:bg-[#0a5840] text-white text-xs font-bold px-3 py-1.5 flex items-center gap-1 cursor-pointer transition-all"
          >
            <Plus className="w-3.5 h-3.5" /> Add New Scheme
          </button>
        </div>
      </div>



      {/* Schemes Registry Register */}
      <div className="bg-white border border-zinc-200">
        <div className="px-4 py-2.5 border-b border-zinc-200 bg-zinc-50 flex items-center justify-between">
          <span className="text-xs font-bold text-zinc-800 uppercase tracking-wider flex items-center gap-2">
            <Award className="w-4 h-4 text-[#0D6B4F]" /> Active Schemes Registry
          </span>
          <span className="text-[10px] text-zinc-400">Total: {programs.length} active entries</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-[#0D6B4F] text-white text-[10px] uppercase tracking-wider">
                <th className="px-4 py-2.5 font-semibold text-left w-20 text-center">ID / Slug</th>
                <th className="px-4 py-2.5 font-semibold text-left w-48">Program Title</th>
                <th className="px-4 py-2.5 font-semibold text-left w-28">Category</th>
                <th className="px-4 py-2.5 font-semibold text-left w-36">Budget Allocation</th>
                <th className="px-4 py-2.5 font-semibold text-left w-24">Duration</th>
                <th className="px-4 py-2.5 font-semibold text-center w-20">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {programs.map((p, idx) => (
                <tr key={p.id} className={`${idx % 2 === 0 ? "bg-white" : "bg-zinc-50/50"} hover:bg-[#e8f5f0]/40`}>
                  <td className="px-4 py-3 font-mono text-zinc-500 font-bold text-center">{p.id}</td>
                  <td className="px-4 py-3 font-semibold text-zinc-900">
                    <p>{p.title}</p>
                    <p className="text-[10px] text-zinc-400 font-medium font-serif mt-0.5">{p.subtitle}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-zinc-150 text-zinc-650 border border-zinc-250 uppercase font-mono rounded">
                      {p.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-bold text-emerald-800">{p.budget}</td>
                  <td className="px-4 py-3 text-zinc-600 font-medium">{p.duration}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => openEditEditor(p)}
                        className="bg-white hover:bg-zinc-50 text-zinc-700 hover:text-zinc-900 border border-zinc-350 p-1 rounded cursor-pointer transition-colors"
                        title="Edit Details"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="bg-white hover:bg-red-50 text-red-750 hover:text-red-900 border border-red-350 p-1 rounded cursor-pointer transition-colors"
                        title="Delete Entry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Program Editor Modal */}
      {editorOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-zinc-300 w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="bg-[#0D6B4F] text-white px-5 py-3.5 flex justify-between items-center shrink-0">
              <div>
                <p className="text-[9px] font-bold text-emerald-200 uppercase tracking-widest">MoE Registry Editor</p>
                <h3 className="text-sm font-bold">{editingProgram ? `Edit Program: ${editingProgram.title}` : "Create New Program Entry"}</h3>
              </div>
              <button onClick={() => setEditorOpen(false)} className="text-white/80 hover:text-white border border-white/20 px-2 py-1 text-xs cursor-pointer">✕ Close</button>
            </div>

            {/* Modal Body (Scrollable form) */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* ID/Slug */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-650 uppercase tracking-wider block">Program ID/Slug <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    disabled={!!editingProgram}
                    placeholder="e.g. kapila-program"
                    value={formId}
                    onChange={e => setFormId(e.target.value)}
                    className="w-full border border-zinc-300 px-3 py-1.5 text-xs focus:outline-none focus:border-[#0D6B4F] bg-white disabled:bg-zinc-100 disabled:text-zinc-500 font-mono"
                  />
                  {!editingProgram && <p className="text-[9px] text-zinc-400">Lowercase letters, numbers, and hyphens only.</p>}
                </div>

                {/* Category */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-650 uppercase tracking-wider block">Scheme Category <span className="text-red-500">*</span></label>
                  <select
                    value={formCategory}
                    onChange={e => setFormCategory(e.target.value as any)}
                    className="w-full border border-zinc-300 px-3 py-1.5 text-xs focus:outline-none focus:border-[#0D6B4F] bg-white font-semibold"
                  >
                    <option value="student">Student Program</option>
                    <option value="startup">Startup Support</option>
                    <option value="institution">Institutional Chapter</option>
                    <option value="corporate">Corporate CSR</option>
                  </select>
                </div>
              </div>

              {/* Title */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-zinc-650 uppercase tracking-wider block">Scheme Title <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="e.g. National IP Literacy Program"
                  value={formTitle}
                  onChange={e => setFormTitle(e.target.value)}
                  className="w-full border border-zinc-300 px-3 py-1.5 text-xs focus:outline-none focus:border-[#0D6B4F] bg-white font-semibold"
                />
              </div>

              {/* Subtitle */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-zinc-650 uppercase tracking-wider block">Subtitle Summary</label>
                <input
                  type="text"
                  placeholder="e.g. IP awareness and filing support drive for accredited campuses"
                  value={formSubtitle}
                  onChange={e => setFormSubtitle(e.target.value)}
                  className="w-full border border-zinc-300 px-3 py-1.5 text-xs focus:outline-none focus:border-[#0D6B4F] bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Budget */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-650 uppercase tracking-wider block">Financial Budget / Incentives <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ₹1,00,000 grant per team"
                    value={formBudget}
                    onChange={e => setFormBudget(e.target.value)}
                    className="w-full border border-zinc-300 px-3 py-1.5 text-xs focus:outline-none focus:border-[#0D6B4F] bg-white font-semibold"
                  />
                </div>

                {/* Duration */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-650 uppercase tracking-wider block">Timeline / Duration <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 36-hour hackathon, Annual cycle"
                    value={formDuration}
                    onChange={e => setFormDuration(e.target.value)}
                    className="w-full border border-zinc-300 px-3 py-1.5 text-xs focus:outline-none focus:border-[#0D6B4F] bg-white font-semibold"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-zinc-650 uppercase tracking-wider block">Detailed Description</label>
                <textarea
                  rows={3}
                  placeholder="Describe the goals, parameters, and structure of this initiative..."
                  value={formDescription}
                  onChange={e => setFormDescription(e.target.value)}
                  className="w-full border border-zinc-300 px-3 py-1.5 text-xs focus:outline-none focus:border-[#0D6B4F] bg-white leading-relaxed"
                />
              </div>

              {/* Benefits Checklist Array */}
              <div className="space-y-2 border border-zinc-200 p-3 rounded">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-[#0D6B4F] uppercase tracking-wider flex items-center gap-1.5"><ListChecks className="w-3.5 h-3.5"/> Core Benefits List</span>
                  <button
                    type="button"
                    onClick={() => setFormBenefits([...formBenefits, ""])}
                    className="text-[10px] bg-zinc-100 hover:bg-zinc-200 text-zinc-700 px-2 py-0.5 border border-zinc-300 font-semibold cursor-pointer"
                  >
                    + Add Benefit Item
                  </button>
                </div>
                <div className="space-y-2">
                  {formBenefits.map((benefit, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <input
                        type="text"
                        placeholder={`e.g. Funding of up to ₹50,000 for materials`}
                        value={benefit}
                        onChange={e => {
                          const updated = [...formBenefits];
                          updated[i] = e.target.value;
                          setFormBenefits(updated);
                        }}
                        className="w-full border border-zinc-300 px-3 py-1 text-xs focus:outline-none focus:border-[#0D6B4F] bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => setFormBenefits(formBenefits.filter((_, idx) => idx !== i))}
                        className="text-red-700 hover:text-red-950 font-bold px-1 cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tranches Milestone Array */}
              <div className="space-y-2 border border-zinc-200 p-3 rounded">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-[#0D6B4F] uppercase tracking-wider flex items-center gap-1.5"><Coins className="w-3.5 h-3.5"/> Milestone Disbursement Tranches</span>
                  <button
                    type="button"
                    onClick={() => setFormTranches([...formTranches, { name: `Tranche-${formTranches.length + 1}`, stage: "Release", amount: "₹0", trigger: "" }])}
                    className="text-[10px] bg-zinc-100 hover:bg-zinc-200 text-zinc-700 px-2 py-0.5 border border-zinc-300 font-semibold cursor-pointer"
                  >
                    + Add Disbursement Milestone
                  </button>
                </div>
                <div className="space-y-3">
                  {formTranches.map((tranche, i) => (
                    <div key={i} className="border-b border-zinc-100 last:border-0 pb-2.5 last:pb-0 space-y-2 relative">
                      <div className="grid grid-cols-3 gap-2">
                        <input
                          type="text"
                          required
                          placeholder="Tranche Name"
                          value={tranche.name}
                          onChange={e => {
                            const updated = [...formTranches];
                            updated[i].name = e.target.value;
                            setFormTranches(updated);
                          }}
                          className="border border-zinc-300 px-2 py-1 text-xs focus:outline-none focus:border-[#0D6B4F] bg-white font-semibold"
                        />
                        <input
                          type="text"
                          required
                          placeholder="Project Stage"
                          value={tranche.stage}
                          onChange={e => {
                            const updated = [...formTranches];
                            updated[i].stage = e.target.value;
                            setFormTranches(updated);
                          }}
                          className="border border-zinc-300 px-2 py-1 text-xs focus:outline-none focus:border-[#0D6B4F] bg-white"
                        />
                        <input
                          type="text"
                          required
                          placeholder="Allocation Amount (₹)"
                          value={tranche.amount}
                          onChange={e => {
                            const updated = [...formTranches];
                            updated[i].amount = e.target.value;
                            setFormTranches(updated);
                          }}
                          className="border border-zinc-300 px-2 py-1 text-xs focus:outline-none focus:border-[#0D6B4F] bg-white font-semibold"
                        />
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          required
                          placeholder="Disbursement Trigger Condition (e.g. submission of audited UC)"
                          value={tranche.trigger}
                          onChange={e => {
                            const updated = [...formTranches];
                            updated[i].trigger = e.target.value;
                            setFormTranches(updated);
                          }}
                          className="w-full border border-zinc-300 px-2 py-1 text-xs focus:outline-none focus:border-[#0D6B4F] bg-white"
                        />
                        <input
                          type="text"
                          placeholder="Optional Notes"
                          value={tranche.note}
                          onChange={e => {
                            const updated = [...formTranches];
                            updated[i].note = e.target.value;
                            setFormTranches(updated);
                          }}
                          className="w-full border border-zinc-300 px-2 py-1 text-xs focus:outline-none focus:border-[#0D6B4F] bg-white"
                        />
                        <button
                          type="button"
                          onClick={() => setFormTranches(formTranches.filter((_, idx) => idx !== i))}
                          className="text-red-700 hover:text-red-950 font-bold px-1.5 cursor-pointer self-center"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Evaluation Stages Array */}
              <div className="space-y-2 border border-zinc-200 p-3 rounded">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-[#0D6B4F] uppercase tracking-wider flex items-center gap-1.5"><HelpCircle className="w-3.5 h-3.5"/> Evaluation &amp; Screening Steps</span>
                  <button
                    type="button"
                    onClick={() => setFormStages([...formStages, { title: "", desc: "" }])}
                    className="text-[10px] bg-zinc-100 hover:bg-zinc-200 text-zinc-700 px-2 py-0.5 border border-zinc-300 font-semibold cursor-pointer"
                  >
                    + Add Step
                  </button>
                </div>
                <div className="space-y-3.5">
                  {formStages.map((stage, i) => (
                    <div key={i} className="space-y-1 border-b border-zinc-100 last:border-0 pb-2.5 last:pb-0 relative">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder={`Step ${i+1}: e.g. Screening`}
                          value={stage.title}
                          onChange={e => {
                            const updated = [...formStages];
                            updated[i].title = e.target.value;
                            setFormStages(updated);
                          }}
                          className="w-full border border-zinc-300 px-3.5 py-1 text-xs focus:outline-none focus:border-[#0D6B4F] bg-white font-semibold"
                        />
                        <button
                          type="button"
                          onClick={() => setFormStages(formStages.filter((_, idx) => idx !== i))}
                          className="text-red-700 hover:text-red-950 font-bold px-1.5 cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>
                      <input
                        type="text"
                        placeholder="Evaluation parameters, timeline, or requirements..."
                        value={stage.desc}
                        onChange={e => {
                          const updated = [...formStages];
                          updated[i].desc = e.target.value;
                          setFormStages(updated);
                        }}
                        className="w-full border border-zinc-300 px-3.5 py-1 text-xs focus:outline-none focus:border-[#0D6B4F] bg-white text-zinc-550"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditorOpen(false)}
                  className="bg-white hover:bg-zinc-50 text-zinc-750 text-xs font-bold px-4 py-2 border border-zinc-450 cursor-pointer transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#0D6B4F] hover:bg-[#0a5840] text-white text-xs font-bold px-4 py-2 border border-[#0D6B4F] cursor-pointer transition-all"
                >
                  {editingProgram ? "Update Scheme Details" : "Publish to Registry"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
