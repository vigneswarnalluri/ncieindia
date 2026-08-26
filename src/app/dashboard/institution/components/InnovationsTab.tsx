"use client";
import React, { useState } from "react";
import {
  Lightbulb,
  Eye,
  CheckCircle,
  X,
  FileText,
  Download,
  Trash2,
  Share2,
  Sparkles,
  ExternalLink,
  Award,
  Layers,
  GraduationCap,
  Mail,
  Phone,
  Calendar,
  Building
} from "lucide-react";

export interface Project {
  id: string;
  title: string;
  teamLeader: string;
  email?: string;
  mobile?: string;
  college?: string;
  rollNo?: string;
  stream: string;
  trl: number;
  status: "draft" | "submitted" | "endorsed";
  description?: string;
  proposal?: string;
  docUrl?: string;
  submittedAt?: string;
  isDbRecord?: boolean;
}

interface Props {
  projects: Project[];
  onEndorse: (id: string) => void;
  onAdd: (p: Omit<Project, "id" | "status">) => void;
  onDelete?: (id: string) => void;
}

const STREAMS = [
  "Computer Science & Engineering",
  "Artificial Intelligence & Data Science",
  "Electronics & Communication",
  "Mechanical Engineering",
  "Civil Engineering",
  "Information Technology",
  "Electrical Engineering",
  "Biotechnology & Bioinformatics",
];

const TRL_LABELS = [
  "Basic Research & Scientific Principles Observed",
  "Technology Concept & Application Formulated",
  "Analytical & Experimental Critical Proof of Concept",
  "Component Validation in Laboratory Environment",
  "Integrated System Validation in Relevant Environment",
  "System / Subsystem Model Prototype in Relevant Environment",
  "Operational Prototype Demonstration in Space/Field Environment",
  "Actual System Completed and Qualified through Test & Demonstration",
  "Actual System Proven in Operational Environment / Market Deployment",
];

export default function InnovationsTab({ projects, onEndorse, onAdd, onDelete }: Props) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newP, setNewP] = useState({
    title: "",
    teamLeader: "",
    email: "",
    rollNo: "",
    stream: STREAMS[0],
    trl: 1,
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newP.title.trim() || !newP.teamLeader.trim()) return;
    setIsSubmitting(true);
    try {
      await onAdd(newP);
      setNewP({
        title: "",
        teamLeader: "",
        email: "",
        rollNo: "",
        stream: STREAMS[0],
        trl: 1,
        description: "",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper to parse uploaded document URLs
  const parseDocumentUrls = (docUrlStr?: string) => {
    if (!docUrlStr) return null;
    try {
      if (docUrlStr.trim().startsWith("{")) {
        return JSON.parse(docUrlStr) as {
          consentForm?: string;
          idCard?: string;
          proposalRoster?: string;
        };
      }
      if (docUrlStr.startsWith("http") || docUrlStr.startsWith("data:") || docUrlStr.startsWith("/")) {
        return { proposalRoster: docUrlStr };
      }
    } catch (e) {}
    return null;
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold text-zinc-900">Innovation &amp; Prototyping Repository</h1>
            <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded font-mono uppercase">
              {projects.length} {projects.length === 1 ? "Project" : "Projects"}
            </span>
          </div>
          <p className="text-[11px] text-zinc-500 mt-0.5">
            Audit project abstracts, inspect TRL readiness, review pitch documents, and endorse candidates to the NCIE National Selection Pool.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Main Projects Table */}
        <div className="lg:col-span-2 bg-white border border-zinc-200 shadow-2xs">
          <div className="px-4 py-2.5 border-b border-zinc-200 bg-zinc-50 flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-800 uppercase tracking-wider">Registered Projects</span>
            <span className="text-[10px] text-zinc-400 font-mono">Form: NCIE-PROJ-2026</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-[#0D6B4F] text-white text-[10px] uppercase tracking-wider select-none whitespace-nowrap">
                  <th className="px-4 py-2.5 font-semibold text-left w-12">S.No.</th>
                  <th className="px-4 py-2.5 font-semibold text-left">Project Title</th>
                  <th className="px-4 py-2.5 font-semibold text-left">Team Leader</th>
                  <th className="px-4 py-2.5 font-semibold text-center min-w-[75px]">TRL</th>
                  <th className="px-4 py-2.5 font-semibold text-center min-w-[85px]">Status</th>
                  <th className="px-4 py-2.5 font-semibold text-center min-w-[180px]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {projects.length > 0 ? (
                  projects.map((p, i) => (
                    <tr
                      key={p.id}
                      className={`${i % 2 === 0 ? "bg-white" : "bg-zinc-50/50"} hover:bg-[#e8f5f0]/40 transition-colors`}
                    >
                      <td className="px-4 py-2.5 text-zinc-500 font-mono font-medium">{i + 1}</td>
                      <td className="px-4 py-2.5 font-semibold text-zinc-900">
                        <div className="flex items-center gap-1.5">
                          <span className="truncate max-w-[200px]" title={p.title}>{p.title}</span>
                          {p.isDbRecord && (
                            <span className="px-1 py-0.2 bg-emerald-100 text-emerald-800 text-[8.5px] font-bold rounded font-mono uppercase">
                              Live
                            </span>
                          )}
                        </div>
                        {p.stream && (
                          <span className="block text-[10px] text-zinc-400 font-normal truncate max-w-[200px]">
                            {p.stream}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2.5 text-zinc-700 font-medium">
                        <div>{p.teamLeader}</div>
                        {p.college && (
                          <span className="text-[10px] text-zinc-400 block truncate max-w-[150px]" title={p.college}>
                            {p.college}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2.5 text-center whitespace-nowrap">
                        <span className="inline-flex items-center justify-center whitespace-nowrap px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-blue-50 text-blue-900 border border-blue-200">
                          TRL-{p.trl}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-center whitespace-nowrap">
                        {p.status === "draft" && (
                          <span className="text-[9px] font-bold px-2 py-0.5 bg-zinc-100 text-zinc-700 border border-zinc-300 uppercase rounded-xs">
                            Draft
                          </span>
                        )}
                        {p.status === "submitted" && (
                          <span className="text-[9px] font-bold px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-300 uppercase rounded-xs">
                            Submitted
                          </span>
                        )}
                        {p.status === "endorsed" && (
                          <span className="text-[9px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-300 uppercase rounded-xs">
                            Endorsed
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          {/* View Project Details Button */}
                          <button
                            onClick={() => setSelectedProject(p)}
                            className="bg-zinc-50 hover:bg-[#e8f5f0] text-zinc-800 hover:text-[#0D6B4F] text-[10px] font-bold px-2.5 py-1 border border-zinc-300 hover:border-[#0D6B4F] rounded-xs cursor-pointer transition-colors flex items-center gap-1 shadow-2xs"
                            title="Inspect project abstract, documents, team details and TRL status"
                          >
                            <Eye className="w-3 h-3 text-[#0D6B4F]" /> Details
                          </button>

                          {/* Endorse Button */}
                          {p.status !== "endorsed" ? (
                            <button
                              onClick={() => onEndorse(p.id)}
                              className="bg-[#0D6B4F] hover:bg-[#0a5840] text-white text-[10px] font-bold px-2.5 py-1 border border-[#0D6B4F] cursor-pointer transition-colors shadow-2xs rounded-xs flex items-center gap-1"
                              title="Endorse to NCIE National Pool"
                            >
                              <CheckCircle className="w-3 h-3" /> Endorse
                            </button>
                          ) : (
                            <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-0.5">
                              <CheckCircle className="w-3 h-3" /> Endorsed
                            </span>
                          )}

                          {/* Delete Action */}
                          {onDelete && (
                            <button
                              onClick={() => onDelete(p.id)}
                              className="p-1 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded cursor-pointer transition-colors"
                              title="Delete Project Draft"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-zinc-400 italic">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Lightbulb className="w-8 h-8 text-zinc-300" />
                        <p className="font-medium text-xs text-zinc-500 not-italic">
                          No projects registered in the Innovation Repository.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Project Form */}
        <div className="bg-white border border-zinc-200 shadow-2xs">
          <div className="px-4 py-2.5 border-b border-zinc-200 bg-zinc-50 flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-800 uppercase tracking-wider">Add New Project Draft</span>
            <span className="text-[10px] text-zinc-400 font-mono">Institutional SPOC Desk</span>
          </div>
          <form onSubmit={handleSubmit} className="p-4 space-y-3">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider block">
                Project Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. VoiceMitra AI Platform or Smart Solar Grid"
                value={newP.title}
                onChange={(e) => setNewP((p) => ({ ...p, title: e.target.value }))}
                required
                className="w-full border border-zinc-300 px-3 py-1.5 text-xs focus:outline-none focus:border-[#0D6B4F] bg-white rounded-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider block">
                  Team Leader Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. S. Subramaniam"
                  value={newP.teamLeader}
                  onChange={(e) => setNewP((p) => ({ ...p, teamLeader: e.target.value }))}
                  required
                  className="w-full border border-zinc-300 px-3 py-1.5 text-xs focus:outline-none focus:border-[#0D6B4F] bg-white rounded-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider block">
                  Roll / Reg No
                </label>
                <input
                  type="text"
                  placeholder="e.g. 21CS045"
                  value={newP.rollNo}
                  onChange={(e) => setNewP((p) => ({ ...p, rollNo: e.target.value }))}
                  className="w-full border border-zinc-300 px-3 py-1.5 text-xs focus:outline-none focus:border-[#0D6B4F] bg-white rounded-xs"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider block">
                Contact Email
              </label>
              <input
                type="email"
                placeholder="e.g. leader@college.edu"
                value={newP.email}
                onChange={(e) => setNewP((p) => ({ ...p, email: e.target.value }))}
                className="w-full border border-zinc-300 px-3 py-1.5 text-xs focus:outline-none focus:border-[#0D6B4F] bg-white rounded-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider block">
                Branch / Stream
              </label>
              <select
                value={newP.stream}
                onChange={(e) => setNewP((p) => ({ ...p, stream: e.target.value }))}
                className="w-full border border-zinc-300 px-3 py-1.5 text-xs focus:outline-none focus:border-[#0D6B4F] bg-white rounded-xs"
              >
                {STREAMS.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider block">
                Technology Readiness Level (TRL)
              </label>
              <select
                value={newP.trl}
                onChange={(e) => setNewP((p) => ({ ...p, trl: +e.target.value }))}
                className="w-full border border-zinc-300 px-3 py-1.5 text-xs focus:outline-none focus:border-[#0D6B4F] bg-white rounded-xs"
              >
                {TRL_LABELS.map((label, i) => (
                  <option key={i + 1} value={i + 1}>
                    TRL-{i + 1} — {label.slice(0, 35)}...
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider block">
                Problem Statement &amp; Solution Abstract
              </label>
              <textarea
                rows={3}
                placeholder="Describe the innovation objective, methodology, and prototype milestones..."
                value={newP.description}
                onChange={(e) => setNewP((p) => ({ ...p, description: e.target.value }))}
                className="w-full border border-zinc-300 px-3 py-1.5 text-xs focus:outline-none focus:border-[#0D6B4F] bg-white rounded-xs resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#0D6B4F] hover:bg-[#0a5840] text-white text-xs font-bold py-2.5 px-4 transition-colors cursor-pointer rounded-xs shadow-2xs mt-2 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Saving to Repository...</span>
              ) : (
                <>
                  <CheckCircle className="w-3.5 h-3.5" /> Save Draft to Repository
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* RICH PROJECT AUDIT & DETAILS MODAL */}
      {/* ========================================================================= */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-zinc-300 shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col rounded-xs overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="bg-[#0D6B4F] text-white px-6 py-4 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-white/10 rounded-full">
                  <Lightbulb className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-tight">{selectedProject.title}</h3>
                  <p className="text-[10px] text-emerald-100 font-mono mt-0.5">
                    Project ID: {selectedProject.id} &bull; Stream: {selectedProject.stream}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-emerald-100 hover:text-white cursor-pointer p-1 rounded hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs">
              {/* Status & TRL Progress Bar */}
              <div className="bg-zinc-50 border border-zinc-200 p-4 rounded-xs space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                      Technology Readiness Level (TRL)
                    </span>
                    <strong className="text-zinc-900 text-sm">
                      TRL-{selectedProject.trl}: {TRL_LABELS[selectedProject.trl - 1] || "Experimental Stage"}
                    </strong>
                  </div>
                  <div>
                    {selectedProject.status === "endorsed" ? (
                      <span className="px-2.5 py-1 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded font-bold text-[10px] uppercase flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" /> Endorsed to National Pool
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded font-bold text-[10px] uppercase">
                        Under Institutional Evaluation
                      </span>
                    )}
                  </div>
                </div>

                {/* Progress Visualizer */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[9px] text-zinc-400 font-mono">
                    <span>Concept (TRL 1)</span>
                    <span>Validation (TRL 4)</span>
                    <span>Prototype (TRL 7)</span>
                    <span>Market Ready (TRL 9)</span>
                  </div>
                  <div className="w-full bg-zinc-200 h-2 rounded-full overflow-hidden flex">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-[#0D6B4F] h-full rounded-full transition-all duration-500"
                      style={{ width: `${(selectedProject.trl / 9) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Team & Institutional Profile */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                  Team Leader & Institutional Details
                </h4>
                <div className="border border-zinc-200 rounded-xs overflow-hidden">
                  <table className="w-full text-xs">
                    <tbody className="divide-y divide-zinc-100">
                      <tr>
                        <td className="px-4 py-2 font-bold text-zinc-600 w-44 bg-zinc-50">Team Leader</td>
                        <td className="px-4 py-2 text-zinc-900 font-medium">{selectedProject.teamLeader}</td>
                      </tr>
                      {selectedProject.college && (
                        <tr>
                          <td className="px-4 py-2 font-bold text-zinc-600 bg-zinc-50">Institution / Chapter</td>
                          <td className="px-4 py-2 text-zinc-900 font-medium">{selectedProject.college}</td>
                        </tr>
                      )}
                      <tr>
                        <td className="px-4 py-2 font-bold text-zinc-600 bg-zinc-50">Department / Stream</td>
                        <td className="px-4 py-2 text-zinc-900 font-medium">{selectedProject.stream}</td>
                      </tr>
                      {selectedProject.email && (
                        <tr>
                          <td className="px-4 py-2 font-bold text-zinc-600 bg-zinc-50">Contact Email</td>
                          <td className="px-4 py-2 text-zinc-900 font-mono">{selectedProject.email}</td>
                        </tr>
                      )}
                      {selectedProject.mobile && (
                        <tr>
                          <td className="px-4 py-2 font-bold text-zinc-600 bg-zinc-50">Contact Mobile</td>
                          <td className="px-4 py-2 text-zinc-900 font-mono">{selectedProject.mobile}</td>
                        </tr>
                      )}
                      {selectedProject.submittedAt && (
                        <tr>
                          <td className="px-4 py-2 font-bold text-zinc-600 bg-zinc-50">Date Registered</td>
                          <td className="px-4 py-2 text-zinc-700">{new Date(selectedProject.submittedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Project Proposal & Problem Statement */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                  Innovation Abstract & Problem Statement
                </h4>
                <div className="bg-zinc-50 border border-zinc-200 p-4 rounded-xs text-xs text-zinc-800 whitespace-pre-wrap leading-relaxed">
                  {selectedProject.proposal || selectedProject.description || "No extended abstract was provided during initial registration."}
                </div>
              </div>

              {/* Uploaded Documents / Pitch Deck */}
              {(() => {
                const docs = parseDocumentUrls(selectedProject.docUrl);
                if (!docs && !selectedProject.docUrl) return null;

                return (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                      Attached Project Documents &amp; Pitch Materials
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {docs?.proposalRoster && (
                        <div className="border border-zinc-200 p-3 rounded-xs bg-zinc-50 flex items-center justify-between shadow-2xs">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-[#0D6B4F]" />
                            <span className="text-xs font-bold text-zinc-700">Project Pitch &amp; Proposal</span>
                          </div>
                          <a
                            href={docs.proposalRoster}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#0D6B4F] hover:underline text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" /> Download
                          </a>
                        </div>
                      )}

                      {docs?.consentForm && (
                        <div className="border border-zinc-200 p-3 rounded-xs bg-zinc-50 flex items-center justify-between shadow-2xs">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-[#0D6B4F]" />
                            <span className="text-xs font-bold text-zinc-700">Mentor / Guide Consent Form</span>
                          </div>
                          <a
                            href={docs.consentForm}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#0D6B4F] hover:underline text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" /> Download
                          </a>
                        </div>
                      )}

                      {docs?.idCard && (
                        <div className="border border-zinc-200 p-3 rounded-xs bg-zinc-50 flex items-center justify-between shadow-2xs">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-[#0D6B4F]" />
                            <span className="text-xs font-bold text-zinc-700">Team Leader Identity Card</span>
                          </div>
                          <a
                            href={docs.idCard}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#0D6B4F] hover:underline text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" /> Download
                          </a>
                        </div>
                      )}

                      {!docs?.proposalRoster && !docs?.consentForm && !docs?.idCard && selectedProject.docUrl && (
                        <div className="border border-zinc-200 p-3 rounded-xs bg-zinc-50 flex items-center justify-between shadow-2xs col-span-1 sm:col-span-2">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-[#0D6B4F]" />
                            <span className="text-xs font-bold text-zinc-700">Uploaded Project File</span>
                          </div>
                          <a
                            href={selectedProject.docUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#0D6B4F] hover:underline text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" /> Download
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Modal Sticky Footer */}
            <div className="p-4 bg-zinc-50 border-t border-zinc-200 flex flex-col sm:flex-row justify-between items-center gap-3 shrink-0">
              <div>
                {onDelete && (
                  <button
                    onClick={() => {
                      onDelete(selectedProject.id);
                      setSelectedProject(null);
                    }}
                    className="text-red-600 hover:text-red-800 text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete Project Draft
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="bg-white hover:bg-zinc-100 text-zinc-700 text-xs font-bold px-4 py-2 border border-zinc-300 rounded-xs cursor-pointer transition-colors"
                >
                  Close
                </button>
                {selectedProject.status !== "endorsed" && (
                  <button
                    onClick={() => {
                      onEndorse(selectedProject.id);
                      setSelectedProject(prev => prev ? { ...prev, status: "endorsed" } : null);
                    }}
                    className="bg-[#0D6B4F] hover:bg-[#0a5840] text-white text-xs font-bold px-4 py-2 rounded-xs cursor-pointer transition-colors shadow-2xs flex items-center gap-1.5"
                  >
                    <CheckCircle className="w-3.5 h-3.5" /> Endorse to National Pool
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
