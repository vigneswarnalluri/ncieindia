import React, { useState } from 'react';
import { 
  FileCheck, 
  MapPin, 
  Calendar, 
  X, 
  Download, 
  Printer, 
  CheckCircle2, 
  ShieldCheck, 
  AlertCircle,
  Building,
  QrCode
} from 'lucide-react';
import { EXAM_CENTERS, COURSE_INFO, type StudentProfile } from '../data/curriculumData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  student: StudentProfile;
  initialTab?: "admitCard" | "centers" | "guidelines";
}

export const ManageExamModal: React.FC<Props> = ({
  isOpen,
  onClose,
  student,
  initialTab = "admitCard"
}) => {
  const [activeTab, setActiveTab] = useState<"admitCard" | "centers" | "guidelines">(initialTab);
  const [searchCity, setSearchCity] = useState("");

  if (!isOpen) return null;

  const filteredCenters = EXAM_CENTERS.filter(c => 
    c.city.toLowerCase().includes(searchCity.toLowerCase()) ||
    c.state.toLowerCase().includes(searchCity.toLowerCase()) ||
    c.venue.toLowerCase().includes(searchCity.toLowerCase())
  );

  return (
    <div className="nptel-modal-backdrop" onClick={onClose}>
      <div 
        className="nptel-exam-modal-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="nptel-modal-header bg-[#F39C12] text-white flex-between p-4">
          <div className="flex-align-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex-center text-white">
              <FileCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm">NCIE Examination & Capstone Defense Portal</h3>
              <p className="text-xxs text-amber-100">National Proctored Certification & AICTE Credit Transfer</p>
            </div>
          </div>
          <button 
            type="button" 
            onClick={onClose}
            className="p-1 rounded text-amber-100 hover:text-white hover:bg-black/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Strip */}
        <div className="nptel-modal-tab-strip">
          <button
            type="button"
            onClick={() => setActiveTab("admitCard")}
            className={`nptel-modal-tab-btn ${activeTab === "admitCard" ? "active-amber" : ""}`}
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>Hall Ticket / Admit Card</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("centers")}
            className={`nptel-modal-tab-btn ${activeTab === "centers" ? "active-amber" : ""}`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Exam Center Locator</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("guidelines")}
            className={`nptel-modal-tab-btn ${activeTab === "guidelines" ? "active-amber" : ""}`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Rules & Proctored Guidelines</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 max-h-[70vh] overflow-y-auto">
          {/* TAB 1: Hall Ticket / Admit Card */}
          {activeTab === "admitCard" && (
            <div>
              {/* Admit Card Canvas */}
              <div className="p-6 border-2 border-slate-300 rounded-xl bg-white shadow-xs print:border-black">
                {/* Government & NPTEL Emblem Header */}
                <div className="flex-between border-b-2 border-slate-900 pb-3 mb-4">
                  <div className="flex-align-center gap-3">
                    <img src="/gov-emblem.png" alt="Govt Emblem" className="h-12 object-contain" />
                    <div>
                      <div className="text-xxs font-bold text-slate-600 uppercase tracking-widest">
                        Ministry of Education &bull; Government of India
                      </div>
                      <div className="text-base font-black text-slate-900">
                        NATIONAL COUNCIL FOR INNOVATION & ENTREPRENEURSHIP
                      </div>
                      <div className="text-xxs font-bold text-blue-700">
                        PROCTORED CERTIFICATION & CAPSTONE DEFENSE ADMIT CARD
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xxs text-slate-500 font-mono">ADMIT CARD NO.</div>
                    <div className="text-xs font-bold font-mono text-slate-900">
                      NOC26-MG101-{student.rollNo}
                    </div>
                    <div className="badge badge-success mt-1">Verified Candidate</div>
                  </div>
                </div>

                {/* Candidate Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-slate-50 border border-slate-200 rounded-lg mb-4 text-xs">
                  <div>
                    <span className="text-xxs text-slate-500 uppercase font-semibold block">Candidate Name</span>
                    <span className="font-bold text-slate-900">{student.name}</span>
                  </div>

                  <div>
                    <span className="text-xxs text-slate-500 uppercase font-semibold block">Roll Number</span>
                    <span className="font-bold font-mono text-slate-900">{student.rollNo}</span>
                  </div>

                  <div>
                    <span className="text-xxs text-slate-500 uppercase font-semibold block">Application ID</span>
                    <span className="font-bold font-mono text-slate-900">{student.appId}</span>
                  </div>

                  <div>
                    <span className="text-xxs text-slate-500 uppercase font-semibold block">Sector Track</span>
                    <span className="font-bold text-blue-700">{student.sectorTrack}</span>
                  </div>

                  <div className="md:col-span-2">
                    <span className="text-xxs text-slate-500 uppercase font-semibold block">Enrolled Institution</span>
                    <span className="font-semibold text-slate-900">{student.institution} (AISHE: {student.aisheCode})</span>
                  </div>

                  <div className="md:col-span-2">
                    <span className="text-xxs text-slate-500 uppercase font-semibold block">Course Title</span>
                    <span className="font-bold text-slate-900">{COURSE_INFO.title}</span>
                  </div>
                </div>

                {/* Examination Schedule Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 border border-blue-200 bg-blue-50/60 rounded-lg mb-4 text-xs">
                  <div>
                    <span className="text-xxs text-blue-800 uppercase font-bold block mb-1">Defense Date</span>
                    <span className="font-bold text-slate-900 text-sm">Sunday, 26 April 2026</span>
                    <span className="text-xxs text-slate-500 block">Session 1 (Morning)</span>
                  </div>

                  <div>
                    <span className="text-xxs text-blue-800 uppercase font-bold block mb-1">Reporting Time</span>
                    <span className="font-bold text-slate-900 text-sm">08:30 AM IST</span>
                    <span className="text-xxs text-slate-500 block">Gate Closes at 08:45 AM</span>
                  </div>

                  <div>
                    <span className="text-xxs text-blue-800 uppercase font-bold block mb-1">Assigned Nodal Center</span>
                    <span className="font-bold text-slate-900 text-sm">IIT Delhi / SVNIT Center</span>
                    <span className="text-xxs text-slate-500 block">Lab 4, Computer Center</span>
                  </div>
                </div>

                {/* QR Code & Instructions */}
                <div className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-200 pt-3 gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 bg-slate-100 border border-slate-300 rounded flex-center p-1 shrink-0">
                      <QrCode className="w-14 h-14 text-slate-800" />
                    </div>
                    <div className="text-xxs text-slate-600">
                      <div className="font-bold text-slate-800">Tamper-Proof Verification QR</div>
                      <div>Scan on exam day at registration desk to authenticate biometrics.</div>
                      <div className="text-emerald-700 font-semibold">Digitally Signed by NCIE Controller of Exams</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="btn btn-outline btn-sm"
                    >
                      <Printer className="w-3.5 h-3.5 mr-1" />
                      Print Admit Card
                    </button>
                    <button
                      type="button"
                      onClick={() => alert("Downloading official PDF Admit Card...")}
                      className="btn btn-primary btn-sm"
                    >
                      <Download className="w-3.5 h-3.5 mr-1" />
                      Download PDF
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Exam Center Locator */}
          {activeTab === "centers" && (
            <div>
              <div className="flex gap-3 mb-4">
                <input
                  type="text"
                  placeholder="Search exam center by city or state (e.g. Mumbai, Bengaluru, Delhi)..."
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  className="input text-xs flex-1"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredCenters.map((c, i) => (
                  <div key={i} className="p-4 border border-slate-200 rounded-lg bg-white shadow-xs">
                    <div className="flex-between mb-1.5">
                      <span className="font-bold text-slate-900 text-sm">{c.city}</span>
                      <span className="badge badge-primary">{c.centerCode}</span>
                    </div>
                    <div className="text-xs text-slate-600 mb-2 flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                      <span>{c.venue}, {c.state}</span>
                    </div>
                    <div className="text-xxs text-slate-500 bg-slate-50 p-2 rounded">
                      <span className="font-semibold block mb-0.5">Available Test Slots:</span>
                      {c.slots.join(" &bull; ")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Rules & Guidelines */}
          {activeTab === "guidelines" && (
            <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <h4 className="font-bold text-amber-900 mb-2 flex-align-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-700" />
                  Mandatory Examination Instructions
                </h4>
                <ul className="list-disc pl-5 space-y-1.5 text-amber-900">
                  <li>Candidates MUST bring a printed copy of this Admit Card along with a valid Original Photo ID (College ID Card, Aadhaar, Passport, or Voter ID).</li>
                  <li>Bio-metric authentication (fingerprint/facial verification) is mandatory before entering the examination lab.</li>
                  <li>Only on-screen scientific calculators are permitted during the online assessment. Physical calculators are strictly banned.</li>
                  <li>The Capstone defense requires candidates to present their working prototype code and live deployment link to the external jury panel.</li>
                </ul>
              </div>

              <div className="p-4 border border-slate-200 rounded-lg bg-white">
                <h4 className="font-bold text-slate-900 mb-2">AICTE Credit Recognition</h4>
                <p className="text-slate-600 mb-2">
                  Upon achieving &ge; 40% in weekly assignments and &ge; 40% in the proctored capstone defense, the candidate is eligible for 2 AICTE Collegiate Elective Credits.
                </p>
                <p className="text-slate-600">
                  Official certificates will be dispatched to your university registrar portal via the National Academic Depository (NAD / DigiLocker).
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex-between">
          <span className="text-xxs text-slate-500">
            Official NCIE &bull; Ministry of Education &bull; Central Secretariat
          </span>
          <button type="button" onClick={onClose} className="btn btn-outline btn-sm">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
