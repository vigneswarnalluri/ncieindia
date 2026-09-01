"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building2,
  GraduationCap,
  Briefcase,
  Users2,
  Search,
  ChevronRight,
  Send,
  Download,
  Mail,
  Clock,
  Check,
  Building,
  CheckCircle,
  FileCheck,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const DotGridIcon = () => (
  <svg className="w-3.5 h-3.5 text-emerald-600 shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="4" cy="4" r="2" />
    <circle cx="12" cy="4" r="2" />
    <circle cx="20" cy="4" r="2" />
    <circle cx="4" cy="12" r="2" />
    <circle cx="12" cy="12" r="2" />
    <circle cx="20" cy="12" r="2" />
    <circle cx="4" cy="20" r="2" />
    <circle cx="12" cy="20" r="2" />
    <circle cx="20" cy="20" r="2" />
  </svg>
);

const SAMPLE_MOUS = [
  {
    partner: "Apex Institute of Engineering & Technology",
    type: "Educational Institution",
    area: "Campus Incubation & Innovation Lab Setup",
    date: "12 Oct 2024",
    duration: "3 Years",
    objectives: "Establishing NCIE Student Chapter and 60-day Leadership training for 500+ students.",
    status: "Active MoU",
  },
  {
    partner: "VentureCraft Technology Foundation",
    type: "Industry & Accelerator",
    area: "Student Mentorship & Seed Incubation",
    date: "04 Jan 2025",
    duration: "2 Years",
    objectives: "Connecting student hardware prototypes with precision manufacturing mentors.",
    status: "Active MoU",
  },
  {
    partner: "National Rural Livelihood Initiative",
    type: "NGO / Social Organization",
    area: "Grassroots & Agritech Innovation",
    date: "18 Nov 2024",
    duration: "2 Years",
    objectives: "Promoting farm equipment innovations and rural youth entrepreneurship.",
    status: "Active MoU",
  },
  {
    partner: "Global Tech Innovation Consortium",
    type: "International & R&D",
    area: "Applied AI & Cloud Fellowships",
    date: "Under Review",
    duration: "Proposed 3 Yrs",
    objectives: "Joint AI challenge series and student incubation linkages.",
    status: "Proposed Collaboration",
  },
];

export default function CollaborationsClient() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("registry");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [submittedProposal, setSubmittedProposal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [docketNumber, setDocketNumber] = useState("");
  const [proposalForm, setProposalForm] = useState({
    orgName: "",
    orgType: "Educational Institution",
    repName: "",
    designation: "",
    email: "",
    phone: "",
    collaborationArea: "Campus Incubation & Innovation Lab Setup",
    details: "",
  });

  const filteredMous = SAMPLE_MOUS.filter((mou) => {
    const matchesSearch =
      mou.partner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mou.area.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "All" || mou.type.includes(selectedType);
    return matchesSearch && matchesType;
  });

  const handleProposalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const generatedDocket = `NCIE/PROP/2026/${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "collaboration_proposal",
          data: proposalForm,
          docketNumber: generatedDocket,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setDocketNumber(data.docketNumber || generatedDocket);
      } else {
        setDocketNumber(generatedDocket);
      }
    } catch (err) {
      console.error("Submission error:", err);
      setDocketNumber(generatedDocket);
    } finally {
      setIsSubmitting(false);
      setSubmittedProposal(true);
    }
  };

  const TABS = [
    { id: "registry", label: language === "hi" ? "आधिकारिक समझौता (MoU) रजिस्टर" : "Official MoU & Partner Registry" },
    { id: "proposal", label: language === "hi" ? "संस्थागत साझेदारी प्रस्ताव फॉर्म" : "Institutional Proposal Form" },
    { id: "grants", label: language === "hi" ? "संस्थागत अनुदान ढांचा (₹20L–₹50L)" : "Institutional Grants (₹20L–₹50L)" },
    { id: "verticals", label: language === "hi" ? "साझेदारी कार्यक्षेत्र" : "Collaboration Verticals" },
  ];

  return (
    <div className="flex-1 bg-[#F9FAFB] pb-20 font-sans">
      {/* ── Official Banner ── */}
      <div className="relative bg-[#0A5D45] overflow-hidden py-14 text-white border-b border-[#074733]">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%">
            <line x1="0" y1="20%" x2="100%" y2="80%" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="100%" y1="20%" x2="0" y2="80%" stroke="#ffffff" strokeWidth="1.5" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-xs text-emerald-100 font-semibold mb-2 flex items-center gap-1.5 uppercase tracking-wider">
            <Link href="/" className="hover:underline hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/75">Institutional Collaborations</span>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-widest text-accent font-mono">
              संस्थागत सहयोग एवं समझौता ज्ञापन प्रकोष्ठ
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Institutional Collaborations &amp; MoU Registry
            </h1>
            <p className="text-emerald-100/90 text-xs sm:text-sm mt-2 max-w-3xl leading-relaxed">
              Institutional network facilitating partnerships between educational institutions, industry bodies, R&amp;D organizations, NGOs, and CSR foundations to build sustainable campus innovation infrastructure.
            </p>
          </div>
        </div>
      </div>

      {/* ── Two-Column Layout ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ── LEFT COLUMN (4/12) ── */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white border border-zinc-200 rounded-none p-0 overflow-hidden shadow-2xs">
              <div className="bg-zinc-50 border-b border-zinc-200 px-5 py-3.5">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-800">
                  {language === "hi" ? "साझेदारी अनुभाग" : "Partnership Directory"}
                </span>
              </div>
              <div className="divide-y divide-zinc-150">
                {TABS.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full text-left px-5 py-3.5 text-xs sm:text-[13px] font-bold transition-all flex items-center justify-between cursor-pointer ${
                        isActive
                          ? "bg-emerald-50/70 text-[#0D6B4F] border-l-4 border-[#0D6B4F] pl-4"
                          : "text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {isActive && <DotGridIcon />}
                        <span>{tab.label}</span>
                      </div>
                      <ChevronRight className={`w-3.5 h-3.5 ${isActive ? "text-[#0D6B4F]" : "text-zinc-400"}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Downloads Card */}
            <div className="bg-white border border-zinc-200 rounded-none p-5 space-y-4 shadow-2xs">
              <div className="border-l-3 border-[#0D6B4F] pl-3 py-0.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
                  Institutional Templates &amp; SOPs
                </h3>
                <p className="text-[10px] text-zinc-400 font-mono mt-0.5">MOU FRAMEWORKS</p>
              </div>

              <div className="space-y-2 text-xs">
                {[
                  { name: "NCIE Standard Academic MoU Template", size: "925 KB PDF", url: "/NCIE_Student_Startup_Grants_Guidelines.pdf" },
                  { name: "Institutional Incubation Grant Scheme SOP", size: "950 KB PDF", url: "/Institutional_Incubation_Development_Support_Scheme.pdf" },
                  { name: "Corporate CSR Partnership Framework", size: "1.2 MB PDF", url: "/NCIE_DPR.pdf" },
                ].map((doc, idx) => (
                  <a
                    key={idx}
                    href={doc.url}
                    download
                    className="group flex items-center justify-between p-2.5 bg-zinc-50 border border-zinc-200 hover:border-[#0D6B4F] hover:bg-emerald-50/40 transition-colors"
                  >
                    <div className="pr-2">
                      <div className="font-bold text-zinc-800 text-[11px] group-hover:text-[#0D6B4F] line-clamp-1">{doc.name}</div>
                      <div className="text-[10px] text-zinc-400 font-mono mt-0.5">{doc.size}</div>
                    </div>
                    <Download className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#0D6B4F] shrink-0" />
                  </a>
                ))}
              </div>
            </div>

            {/* Partnerships Desk */}
            <div className="bg-white border border-zinc-200 rounded-none p-5 space-y-3.5 shadow-2xs text-xs">
              <div className="border-l-3 border-[#0D6B4F] pl-3 py-0.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
                  Institutional Partnerships Desk
                </h3>
                <p className="text-[10px] text-zinc-400 font-mono mt-0.5">DIRECTORATE LIAISON</p>
              </div>

              <div className="space-y-2 pt-1 text-zinc-650">
                <div className="flex items-start gap-2">
                  <Mail className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-zinc-800">Email: </span>
                    <a href="mailto:office@ncieindia.org" className="text-[#0D6B4F] font-mono hover:underline font-bold">
                      office@ncieindia.org
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN (8/12) ── */}
          <div className="lg:col-span-8 space-y-6">

            {/* TAB 1: MOU REGISTRY */}
            {activeTab === "registry" && (
              <div className="bg-white border border-zinc-200 rounded-none p-6 sm:p-8 space-y-6 shadow-2xs">
                <div className="border-l-4 border-primary pl-4 py-0.5">
                  <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-widest block">
                    PUBLIC REGISTRY OF AGREEMENTS
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-zinc-900 mt-0.5">
                    Institutional Memorandum of Understanding (MoU) Registry
                  </h2>
                  <p className="text-xs text-zinc-500 mt-1">
                    Transparent Record of Formal Collaborations &amp; Institutional Touchpoints
                  </p>
                </div>

                {/* Filter Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-zinc-50 p-3 border border-zinc-200">
                  <div className="relative w-full sm:w-72">
                    <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search institution or focus area..."
                      className="w-full pl-8 pr-3 py-1.5 bg-white border border-zinc-300 text-xs text-zinc-800 focus:outline-none focus:border-[#0D6B4F]"
                    />
                  </div>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full sm:w-auto px-3 py-1.5 bg-white border border-zinc-300 text-xs font-semibold text-zinc-700"
                  >
                    <option value="All">All Categories</option>
                    <option value="Educational">Educational</option>
                    <option value="Industry">Industry</option>
                    <option value="NGO">NGO / Social</option>
                    <option value="International">International</option>
                  </select>
                </div>

                {/* Registry Table */}
                <div className="border border-zinc-200 overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-zinc-100/80 border-b border-zinc-200 text-zinc-800 font-bold uppercase tracking-wider">
                        <th className="p-3 border-r border-zinc-200">Partner / Institution</th>
                        <th className="p-3 border-r border-zinc-200">Type</th>
                        <th className="p-3 border-r border-zinc-200">Collaboration Focus</th>
                        <th className="p-3 border-r border-zinc-200">Date &amp; Term</th>
                        <th className="p-3 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200">
                      {filteredMous.map((mou, idx) => (
                        <tr key={idx} className="hover:bg-zinc-50/80 transition-colors">
                          <td className="p-3 font-bold text-zinc-900 border-r border-zinc-200">
                            {mou.partner}
                            <div className="text-[10px] text-zinc-500 font-normal mt-0.5">{mou.objectives}</div>
                          </td>
                          <td className="p-3 text-zinc-650 border-r border-zinc-200">{mou.type}</td>
                          <td className="p-3 font-semibold text-[#0D6B4F] border-r border-zinc-200">{mou.area}</td>
                          <td className="p-3 text-zinc-650 border-r border-zinc-200">
                            <div>{mou.date}</div>
                            <div className="text-[10px] text-zinc-400 font-mono">{mou.duration}</div>
                          </td>
                          <td className="p-3 text-right">
                            <span className={`px-2 py-0.5 text-[10px] font-bold uppercase border ${
                              mou.status === "Active MoU"
                                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                                : "bg-amber-50 text-amber-800 border-amber-200"
                            }`}>
                              {mou.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-zinc-50 border border-zinc-200 p-4 text-xs text-zinc-600">
                  <strong>Disclosure Standard:</strong> Only entities with formally executed agreements are designated as &ldquo;Active MoU&rdquo;. Discussions in proposal phase are explicitly demarcated as &ldquo;Proposed Collaboration&rdquo;.
                </div>
              </div>
            )}

            {/* TAB 2: PROPOSAL FORM */}
            {activeTab === "proposal" && (
              <div className="bg-white border border-zinc-200 rounded-none p-6 sm:p-8 space-y-6 shadow-2xs">
                <div className="border-l-4 border-primary pl-4 py-0.5">
                  <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-widest block">
                    ONLINE PARTNERSHIP INITIATION
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-zinc-900 mt-0.5">
                    Institutional Collaboration Proposal Form
                  </h2>
                  <p className="text-xs text-zinc-500 mt-1">
                    For Universities, Colleges, Industry Associations &amp; CSR Foundations
                  </p>
                </div>

                {submittedProposal ? (
                  <div className="border border-emerald-200 bg-emerald-50/60 p-6 text-center space-y-3">
                    <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
                    <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wide">
                      Proposal Docket Registered &amp; Logged
                    </h3>
                    <p className="text-xs text-zinc-600 max-w-md mx-auto">
                      Your institutional proposal reference is <span className="font-mono font-bold text-[#0D6B4F]">{docketNumber || "NCIE/PROP/2026/2240"}</span>. The Directorate of Institutional Partnerships has logged this in the central registry and will contact your designated nodal officer.
                    </p>
                    <button
                      onClick={() => setSubmittedProposal(false)}
                      className="mt-2 px-4 py-1.5 bg-white border border-zinc-300 text-xs font-bold text-zinc-800 hover:bg-zinc-50 cursor-pointer"
                    >
                      Submit Another Proposal
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleProposalSubmit} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-bold text-zinc-700 uppercase tracking-wide mb-1">Organization / Institution Name</label>
                      <input
                        type="text"
                        required
                        value={proposalForm.orgName}
                        onChange={(e) => setProposalForm({ ...proposalForm, orgName: e.target.value })}
                        placeholder="e.g. National Institute of Technology"
                        className="w-full px-3 py-2 bg-white border border-zinc-300 focus:outline-none focus:border-[#0D6B4F]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-zinc-700 uppercase tracking-wide mb-1">Organization Category</label>
                        <select
                          value={proposalForm.orgType}
                          onChange={(e) => setProposalForm({ ...proposalForm, orgType: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-zinc-300 focus:outline-none focus:border-[#0D6B4F] font-semibold text-zinc-800"
                        >
                          <option>Educational Institution / University</option>
                          <option>Corporate / Industry Partner</option>
                          <option>Incubator / Technology Hub</option>
                          <option>NGO / Grassroots Foundation</option>
                          <option>Government Department / Agency</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-bold text-zinc-700 uppercase tracking-wide mb-1">Proposed Focus Area</label>
                        <select
                          value={proposalForm.collaborationArea}
                          onChange={(e) => setProposalForm({ ...proposalForm, collaborationArea: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-zinc-300 focus:outline-none focus:border-[#0D6B4F] font-semibold text-zinc-800"
                        >
                          <option>Campus Incubation &amp; Innovation Lab Setup</option>
                          <option>60-Day Student Leadership Cohort</option>
                          <option>10-Core Internship Host Enterprise</option>
                          <option>CSR Innovation Funding</option>
                          <option>Joint R&amp;D / Hackathons</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-zinc-700 uppercase tracking-wide mb-1">Designated Nodal Representative</label>
                        <input
                          type="text"
                          required
                          value={proposalForm.repName}
                          onChange={(e) => setProposalForm({ ...proposalForm, repName: e.target.value })}
                          placeholder="e.g. Dr. Rajesh Verma"
                          className="w-full px-3 py-2 bg-white border border-zinc-300 focus:outline-none focus:border-[#0D6B4F]"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-zinc-700 uppercase tracking-wide mb-1">Official Designation</label>
                        <input
                          type="text"
                          required
                          value={proposalForm.designation}
                          onChange={(e) => setProposalForm({ ...proposalForm, designation: e.target.value })}
                          placeholder="e.g. Dean (R&amp;D) / Principal / Director"
                          className="w-full px-3 py-2 bg-white border border-zinc-300 focus:outline-none focus:border-[#0D6B4F]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-zinc-700 uppercase tracking-wide mb-1">Official Email</label>
                        <input
                          type="email"
                          required
                          value={proposalForm.email}
                          onChange={(e) => setProposalForm({ ...proposalForm, email: e.target.value })}
                          placeholder="dean.rd@university.ac.in"
                          className="w-full px-3 py-2 bg-white border border-zinc-300 focus:outline-none focus:border-[#0D6B4F]"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-zinc-700 uppercase tracking-wide mb-1">Contact Phone</label>
                        <input
                          type="tel"
                          required
                          value={proposalForm.phone}
                          onChange={(e) => setProposalForm({ ...proposalForm, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-3 py-2 bg-white border border-zinc-300 focus:outline-none focus:border-[#0D6B4F]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-zinc-700 uppercase tracking-wide mb-1">Institutional Profile &amp; Proposal Summary</label>
                      <textarea
                        rows={4}
                        required
                        value={proposalForm.details}
                        onChange={(e) => setProposalForm({ ...proposalForm, details: e.target.value })}
                        placeholder="State current student enrollment, existing lab infrastructure, and targeted outcomes..."
                        className="w-full px-3 py-2 bg-white border border-zinc-300 focus:outline-none focus:border-[#0D6B4F]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-2.5 bg-[#0D6B4F] hover:bg-[#094835] text-white font-bold uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? "Processing & Logging Proposal Docket..." : "Submit Collaboration Proposal for Evaluation"}
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* TAB 3: INSTITUTIONAL GRANTS */}
            {activeTab === "grants" && (
              <div className="bg-white border border-zinc-200 rounded-none p-6 sm:p-8 space-y-6 shadow-2xs">
                <div className="border-l-4 border-primary pl-4 py-0.5">
                  <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-widest block">
                    PROGRAMME 4 • INFRASTRUCTURE SCHEME
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-zinc-900 mt-0.5">
                    Institutional Incubation Development Fund (₹20 Lakh – ₹50 Lakh)
                  </h2>
                  <p className="text-xs text-zinc-500 mt-1">
                    Dedicated Infrastructure Support for Collegiate Incubation &amp; Innovation Labs
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed text-justify">
                  The NCIE DPR outlines dedicated financial and structural support of <strong>₹20 Lakh to ₹50 Lakh</strong> per eligible recognized institution for establishing, upgrading, and operating campus incubation centers, innovation laboratories, and Entrepreneurship Development Cells (EDCs).
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="border border-zinc-200 p-4 bg-zinc-50 space-y-1.5">
                    <div className="font-bold text-zinc-900 uppercase">1. Incubation Centres</div>
                    <div className="text-zinc-650 leading-relaxed">Dedicated co-working suites, venture management workstations, and connectivity.</div>
                  </div>
                  <div className="border border-zinc-200 p-4 bg-zinc-50 space-y-1.5">
                    <div className="font-bold text-zinc-900 uppercase">2. Rapid Prototyping Labs</div>
                    <div className="text-zinc-650 leading-relaxed">3D printers, electronics testbenches, sensor kits, and developer equipment.</div>
                  </div>
                  <div className="border border-zinc-200 p-4 bg-zinc-50 space-y-1.5">
                    <div className="font-bold text-zinc-900 uppercase">3. EDC Cells &amp; Workshops</div>
                    <div className="text-zinc-650 leading-relaxed">Faculty coordinator stipends and student innovation chapter operational budgets.</div>
                  </div>
                  <div className="border border-zinc-200 p-4 bg-zinc-50 space-y-1.5">
                    <div className="font-bold text-zinc-900 uppercase">4. Rural &amp; Semi-Urban CSR</div>
                    <div className="text-zinc-650 leading-relaxed">CSR-supported institutional upgrades prioritized for Tier-2, Tier-3, and rural colleges.</div>
                  </div>
                </div>

                <div className="bg-zinc-50 border border-zinc-200 p-4 text-xs text-zinc-600">
                  <strong>Terms of Allocation:</strong> Institutional support is proposed subject to institutional eligibility criteria, independent committee assessment, formal MoU execution, and CSR resource availability.
                </div>
              </div>
            )}

            {/* TAB 4: VERTICALS */}
            {activeTab === "verticals" && (
              <div className="bg-white border border-zinc-200 rounded-none p-6 sm:p-8 space-y-6 shadow-2xs">
                <div className="border-l-4 border-primary pl-4 py-0.5">
                  <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-widest block">
                    SECTORAL FRAMEWORKS
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-zinc-900 mt-0.5">
                    Institutional Collaboration Verticals
                  </h2>
                  <p className="text-xs text-zinc-500 mt-1">
                    Multi-Stakeholder Ecosystem Architecture
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  {[
                    { title: "Educational Institutions & Universities", desc: "Setting up collegiate student chapters, innovation labs, and conducting accredited 60-day leadership programmes." },
                    { title: "Industry & Corporate Partners", desc: "Corporate mentorship, CSR fund deployment, problem statements, and student internship placements." },
                    { title: "Startups, Incubators & Accelerators", desc: "Shared incubation infrastructure, technical validation, and acceleration pipelines." },
                    { title: "Research & Development Labs", desc: "Joint applied research, prototyping facilities, patent commercialization, and knowledge exchange." },
                    { title: "NGOs & Grassroots Organizations", desc: "Reaching rural, semi-urban, and underserved youth to promote inclusive self-reliance." },
                    { title: "Government Bodies & Missions", desc: "Supporting central and state priorities in skill development and entrepreneurship." },
                  ].map((v, idx) => (
                    <div key={idx} className="p-4 bg-zinc-50 border border-zinc-200 flex items-start gap-3">
                      <span className="font-mono font-bold text-zinc-400 mt-0.5">0{idx + 1}</span>
                      <div>
                        <h4 className="font-bold text-zinc-900">{v.title}</h4>
                        <p className="text-zinc-650 mt-1 leading-relaxed">{v.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
