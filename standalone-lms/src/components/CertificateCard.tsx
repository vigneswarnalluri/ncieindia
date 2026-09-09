import React, { useState } from 'react';
import { 
  Award, 
  Printer, 
  Lock, 
  QrCode, 
  Eye
} from 'lucide-react';
import type { StudentProfile, CapstoneProject } from '../data/curriculumData';

interface Props {
  student: StudentProfile;
  capstone: CapstoneProject;
  completedCount: number;
  totalCount: number;
}

export const CertificateCard: React.FC<Props> = ({
  student,
  capstone,
  completedCount,
  totalCount,
}) => {
  const [showPreview, setShowPreview] = useState(false);
  const isEligible = completedCount >= totalCount && (capstone.status === "Approved" || capstone.status === "Under Review" || student.status === "Completed");
  const isUnlocked = isEligible || showPreview;

  const certId = `NCIE/2026/VBLP-${student.appId.replace(/[^0-9]/g, '').slice(-4) || '2047'}`;
  const issueDate = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="lms-view-content-wrapper">
      {/* Header */}
      <div className="view-header-banner">
        <div className="flex-between flex-wrap gap-4">
          <div>
            <h1 className="text-xl font-bold text-heading">
              Internship Certificate of Completion
            </h1>
            <p className="text-xs text-muted mt-1">
              Official certificate issued under the NCIE National Innovation Leadership mandate.
            </p>
          </div>

          <div className="flex-align-center gap-2">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="btn btn-outline btn-sm"
            >
              <Eye className="w-3.5 h-3.5 mr-1" />
              <span>{showPreview ? "Standard View" : "Preview Sample"}</span>
            </button>

            <button
              onClick={() => window.print()}
              disabled={!isUnlocked}
              className={`btn btn-primary btn-sm ${!isUnlocked ? 'disabled' : ''}`}
            >
              <Printer className="w-3.5 h-3.5 mr-1" />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Lock Notice if not yet eligible and preview not on */}
      {!isEligible && !showPreview && (
        <div className="card p-4 mt-4">
          <div className="flex-align-center gap-3">
            <Lock className="w-4 h-4 text-warning shrink-0" />
            <div className="text-xs text-body">
              Completed <strong>{completedCount} of {totalCount}</strong> modules. Complete all modules and submit your Capstone to unlock your final signed certificate.
            </div>
          </div>
        </div>
      )}

      {/* Certificate Preview Card */}
      <div className={`certificate-frame-container mt-5 ${!isUnlocked ? 'certificate-watermarked' : ''}`}>
        <div className="certificate-document-card">
          {/* Top Tricolor Border Line */}
          <div className="cert-tricolor-stripe" />

          {/* Header Crests */}
          <div className="cert-header-row">
            <img src="/gov-emblem.png" alt="Emblem of India" className="cert-emblem-img" />
            
            <div className="cert-authority-meta">
              <div className="cert-council-name">
                NATIONAL COUNCIL FOR INNOVATION & ENTREPRENEURSHIP
              </div>
              <div className="cert-program-banner">
                INNOVATION LEADERSHIP & ENTREPRENEURSHIP PROGRAMME
              </div>
            </div>

            <img src="/logo-new.png" alt="NCIE Crest" className="cert-ncie-logo-img" />
          </div>

          {/* Certificate Title */}
          <div className="cert-body-content text-center">
            <div className="cert-award-tag">CERTIFICATE OF INTERNSHIP COMPLETION</div>
            <div className="cert-doc-number">ID: {certId}</div>

            <p className="cert-present-text mt-3">
              This is to officially certify that
            </p>

            <h2 className="cert-student-name">
              {student.name}
            </h2>

            <p className="cert-statement-text">
              bearing Application No. <strong>{student.appId}</strong> from <strong>{student.institution}</strong>, has successfully completed the <strong>60-Day (60 Learning Hours)</strong> internship program in:
            </p>

            <div className="cert-sector-highlight">
              {student.sectorTrack}
            </div>

            <p className="cert-evaluation-subtext">
              having fulfilled all requirements of module masterclasses, weekly work logbooks, and successfully defended the Capstone Project: <em>"{capstone.title || 'Technical Innovation Prototype'}"</em>.
            </p>
          </div>

          {/* Footer Validation & Signatures */}
          <div className="cert-footer-row">
            <div className="cert-verification-qr-col">
              <div className="qr-code-mock">
                <QrCode className="w-12 h-12 text-dark" />
              </div>
              <div className="text-xxs text-muted">
                Scan QR to verify against National Registry
              </div>
            </div>

            <div className="cert-grade-col text-center">
              <div className="cert-grade-badge">
                <Award className="w-3.5 h-3.5 text-emerald" />
                <span>Grade A+ (Distinction)</span>
              </div>
              <div className="text-xxs text-muted mt-1">{issueDate}</div>
            </div>

            <div className="cert-signature-col text-right">
              <div className="cert-signature-line" />
              <div className="cert-signature-name">Director General & Secretary</div>
              <div className="cert-signature-title">NCIE Central Secretariat, New Delhi</div>
            </div>
          </div>

          {/* Bottom Tricolor Accent */}
          <div className="cert-tricolor-stripe" />
        </div>
      </div>
    </div>
  );
};
