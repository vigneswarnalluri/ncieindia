import React, { useState } from 'react';
import { 
  Rocket, 
  GitBranch, 
  ExternalLink, 
  Presentation, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Award, 
  AlertCircle,
  FileCode,
  Layers,
  Save,
  Send,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { CapstoneProject, StudentProfile } from '../data/curriculumData';

interface Props {
  student: StudentProfile;
  project: CapstoneProject;
  onSaveProject: (updated: CapstoneProject) => void;
}

export const CapstonePortal: React.FC<Props> = ({
  student,
  project,
  onSaveProject,
}) => {
  const [formData, setFormData] = useState<CapstoneProject>(project);
  const [isEditing, setIsEditing] = useState<boolean>(project.status === "Not Started" || project.status === "Draft");
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  const handleChange = (field: keyof CapstoneProject, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveDraft = () => {
    const updated: CapstoneProject = {
      ...formData,
      status: "Draft",
    };
    onSaveProject(updated);
    setIsEditing(false);
    setSavedNotice("Draft saved successfully.");
    setTimeout(() => setSavedNotice(null), 3000);
  };

  const handleSubmitDefense = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: CapstoneProject = {
      ...formData,
      status: "Under Review",
      submittedAt: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      reviewerRemarks: "Submission received. Assigned to NCIE Technical Evaluation Committee for grading.",
    };
    onSaveProject(updated);
    setIsEditing(false);

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
    });

    setSavedNotice("Capstone Project successfully submitted for official defense & grading!");
    setTimeout(() => setSavedNotice(null), 4000);
  };

  return (
    <div className="lms-view-content-wrapper">
      {/* Header Banner */}
      <div className="view-header-banner">
        <div className="flex-between flex-wrap gap-4">
          <div>
            <div className="flex-align-center gap-2 mb-1.5">
              <span className="badge badge-primary">Apex Milestone</span>
              <span className="badge badge-saffron">Kalam Seed Grant Eligible</span>
            </div>
            <h1 className="text-2xl font-black text-heading">
              Viksit Bharat Internship Capstone Project Portal
            </h1>
            <p className="text-xs text-muted max-w-2xl mt-1">
              Submit your final engineering prototype, GitHub repository, and defense documentation. Approved capstone projects are nominated for collegiate incubation and the ₹5 Lakhs Kalam Seed Funding round.
            </p>
          </div>

          <div className="flex-align-center gap-2">
            <span className={`badge ${
              formData.status === "Approved" || formData.status === "Distinction"
                ? "badge-success"
                : formData.status === "Under Review"
                ? "badge-warning"
                : "badge-outline"
            }`}>
              {formData.status === "Under Review" && <Clock className="w-3.5 h-3.5 mr-1" />}
              {formData.status === "Approved" && <CheckCircle2 className="w-3.5 h-3.5 mr-1" />}
              <span>Status: {formData.status}</span>
            </span>

            {!isEditing && (
              <button onClick={() => setIsEditing(true)} className="btn btn-outline btn-sm">
                Edit Dossier
              </button>
            )}
          </div>
        </div>

        {savedNotice && (
          <div className="alert-banner alert-success animate-fade-in mt-4">
            <CheckCircle2 className="w-4 h-4 text-emerald shrink-0" />
            <span className="text-xs font-semibold">{savedNotice}</span>
          </div>
        )}
      </div>

      {/* Main Capstone Form & Review Dossier */}
      <div className="capstone-layout-grid mt-6">
        <div className="capstone-main-col">
          <form onSubmit={handleSubmitDefense} className="card card-glass p-6">
            <div className="flex-between mb-4">
              <h3 className="text-base font-bold text-heading flex-align-center gap-2">
                <Rocket className="w-5 h-5 text-primary" />
                <span>Capstone Project Specifications</span>
              </h3>
              <span className="text-xs text-muted">Sector: {student.sectorTrack}</span>
            </div>

            {/* Project Title */}
            <div className="mb-4">
              <label className="form-label">Project Title</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="E.g. AI-Assisted Precision Irrigation for Agro-Ecosystems"
                className="form-input"
                required
              />
            </div>

            {/* Abstract */}
            <div className="mb-4">
              <label className="form-label">Executive Abstract (Max 150 words)</label>
              <textarea
                rows={3}
                disabled={!isEditing}
                value={formData.abstract}
                onChange={(e) => handleChange("abstract", e.target.value)}
                placeholder="Summarize the project problem, technological implementation, and measurable societal impact..."
                className="form-input"
                required
              />
            </div>

            {/* Problem Statement */}
            <div className="mb-4">
              <label className="form-label">Problem Statement & Target Stakeholders</label>
              <textarea
                rows={3}
                disabled={!isEditing}
                value={formData.problemStatement}
                onChange={(e) => handleChange("problemStatement", e.target.value)}
                placeholder="Who suffers from this problem? What is the economic or social loss without this innovation?"
                className="form-input"
                required
              />
            </div>

            {/* Solution Architecture */}
            <div className="mb-4">
              <label className="form-label">Technical Architecture & Stack</label>
              <textarea
                rows={3}
                disabled={!isEditing}
                value={formData.solutionArchitecture}
                onChange={(e) => handleChange("solutionArchitecture", e.target.value)}
                placeholder="Hardware components, APIs, cloud backends, algorithms, or manufacturing processes utilized..."
                className="form-input"
                required
              />
            </div>

            {/* Deliverable URLs */}
            <div className="grid-3-col gap-3 mb-6">
              <div>
                <label className="form-label flex-align-center gap-1">
                  <GitBranch className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </label>
                <input
                  type="url"
                  disabled={!isEditing}
                  value={formData.githubUrl}
                  onChange={(e) => handleChange("githubUrl", e.target.value)}
                  placeholder="https://github.com/..."
                  className="form-input text-xs"
                  required
                />
              </div>

              <div>
                <label className="form-label flex-align-center gap-1">
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Live Demo / App URL</span>
                </label>
                <input
                  type="url"
                  disabled={!isEditing}
                  value={formData.demoUrl}
                  onChange={(e) => handleChange("demoUrl", e.target.value)}
                  placeholder="https://..."
                  className="form-input text-xs"
                />
              </div>

              <div>
                <label className="form-label flex-align-center gap-1">
                  <Presentation className="w-3.5 h-3.5" />
                  <span>Slide Deck URL (PDF/Drive)</span>
                </label>
                <input
                  type="url"
                  disabled={!isEditing}
                  value={formData.slideDeckUrl}
                  onChange={(e) => handleChange("slideDeckUrl", e.target.value)}
                  placeholder="https://drive.google.com/..."
                  className="form-input text-xs"
                  required
                />
              </div>
            </div>

            {/* Form Actions */}
            {isEditing && (
              <div className="flex-align-center justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="btn btn-outline"
                >
                  <Save className="w-4 h-4 mr-1" />
                  <span>Save Draft</span>
                </button>

                <button type="submit" className="btn btn-primary btn-pulse">
                  <Send className="w-4 h-4 mr-1" />
                  <span>Submit for National Evaluation</span>
                </button>
              </div>
            )}
          </form>

          {/* Reviewer Feedback Box */}
          {formData.reviewerRemarks && (
            <div className="card card-glass p-5 mt-4 bg-emerald-subtle border-emerald">
              <div className="flex-align-center gap-2 mb-2">
                <Award className="w-4 h-4 text-emerald" />
                <h4 className="text-xs font-bold text-heading">
                  National Technical Evaluation Feedback:
                </h4>
              </div>
              <p className="text-xs text-body leading-relaxed">
                {formData.reviewerRemarks}
              </p>
            </div>
          )}
        </div>

        {/* Evaluation Rubric Sidebar */}
        <div className="capstone-side-col">
          <div className="card card-glass p-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-heading mb-3 flex-align-center gap-2">
              <Layers className="w-4 h-4 text-primary" /> Evaluation Criteria (100 Pts)
            </h4>
            
            <div className="rubric-item mb-3">
              <div className="flex-between text-xs font-semibold mb-1">
                <span>1. Technical Rigor & Code Quality</span>
                <span className="text-primary">30 Pts</span>
              </div>
              <p className="text-xxs text-muted">Clean architecture, modularity, error-handling, and documentation.</p>
            </div>

            <div className="rubric-item mb-3">
              <div className="flex-between text-xs font-semibold mb-1">
                <span>2. Societal Impact for Viksit Bharat</span>
                <span className="text-emerald">25 Pts</span>
              </div>
              <p className="text-xxs text-muted">Direct alignment with national missions, rural development, or industry productivity.</p>
            </div>

            <div className="rubric-item mb-3">
              <div className="flex-between text-xs font-semibold mb-1">
                <span>3. Innovation & Patent Novelty</span>
                <span className="text-accent">25 Pts</span>
              </div>
              <p className="text-xxs text-muted">Novel approach compared to existing market solutions & prior art search.</p>
            </div>

            <div className="rubric-item mb-4">
              <div className="flex-between text-xs font-semibold mb-1">
                <span>4. Commercial Feasibility & BMC</span>
                <span className="text-saffron">20 Pts</span>
              </div>
              <p className="text-xxs text-muted">Unit economics, cost structures, and target customer go-to-market plan.</p>
            </div>

            <div className="alert-box-seed-grant">
              <div className="flex-align-center gap-1.5 text-xs font-bold text-saffron mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Dr. Kalam Seed Grant:</span>
              </div>
              <p className="text-xxs text-subtle leading-normal">
                Projects scoring 85+ points are automatically nominated for ₹5 Lakhs non-dilutive startup incubation grants.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
