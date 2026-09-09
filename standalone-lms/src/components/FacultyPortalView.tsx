import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  FileCheck, 
  LogOut, 
  ShieldCheck, 
  User, 
  Users, 
  Award, 
  School, 
  Search, 
  ExternalLink,
  Check,
  Building,
  BadgeCheck
} from 'lucide-react';
import { DEMO_STUDENTS, type FacultyProfile } from '../data/curriculumData';

interface Props {
  faculty: FacultyProfile;
  onLogout: () => void;
  onSwitchToStudent: () => void;
}

interface PendingLogbookItem {
  id: string;
  studentName: string;
  rollNo: string;
  institution: string;
  week: number;
  hours: number;
  title: string;
  summary: string;
  submittedAt: string;
  status: "Pending Review" | "Approved";
}

const INITIAL_PENDING_LOGBOOKS: PendingLogbookItem[] = [
  {
    id: "plog-1",
    studentName: "Rohan Patel",
    rollNo: "22BCE1042",
    institution: "National Institute of Technology, Surat",
    week: 4,
    hours: 4.5,
    title: "Rapid Prototyping & GitHub Codebase Setup",
    summary: "Built the initial functional prototype using React and integrated REST APIs. Authored the 2-page MVP canvas and conducted stress tests.",
    submittedAt: "04 Mar 2026, 18:30 IST",
    status: "Pending Review"
  },
  {
    id: "plog-2",
    studentName: "Sneha Kulkarni",
    rollNo: "COEP-EN-2024",
    institution: "College of Engineering, Pune",
    week: 4,
    hours: 5.0,
    title: "IoT Sensor Firmware & Circuit Verification",
    summary: "Calibrated optical telemetry sensors and wrote firmware drivers for ambient data collection in rural pilot clusters.",
    submittedAt: "03 Mar 2026, 21:15 IST",
    status: "Pending Review"
  },
  {
    id: "plog-3",
    studentName: "Aakash Sharma",
    rollNo: "IITD-DES-889",
    institution: "Indian Institute of Technology, Delhi",
    week: 3,
    hours: 6.0,
    title: "Prior Art Patent Search & Indian Patent Office Draft",
    summary: "Conducted exhaustive prior art searches on Google Patents and InPASS database. Drafted provisional patent specification for Kalam Seed Grant.",
    submittedAt: "28 Feb 2026, 14:00 IST",
    status: "Pending Review"
  }
];

export const FacultyPortalView: React.FC<Props> = ({
  faculty,
  onLogout,
  onSwitchToStudent
}) => {
  const [activeTab, setActiveTab] = useState<"logbooks" | "roster">("logbooks");
  const [logbooks, setLogbooks] = useState<PendingLogbookItem[]>(INITIAL_PENDING_LOGBOOKS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  const handleApproveLogbook = (id: string, studentName: string) => {
    setLogbooks((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "Approved" } : item
      )
    );
    showToast(`Digitally approved & signed off logbook for ${studentName}`);
  };

  const pendingCount = logbooks.filter((l) => l.status === "Pending Review").length;

  const initials = faculty.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', display: 'flex', flexDirection: 'column' }}>
      {/* 1. Official Government Faculty Top Header */}
      <header
        style={{
          background: '#FFFFFF',
          borderBottom: '1px solid #E2E8F0',
          padding: '12px 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <img 
            src="/logo-new.png" 
            alt="NCIE India" 
            style={{ height: '36px', width: 'auto', objectFit: 'contain' }} 
          />
          <div>
            <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#0F172A', letterSpacing: '0.2px' }}>
              NATIONAL COUNCIL FOR INNOVATION & ENTREPRENEURSHIP
            </div>
            <div style={{ fontSize: '0.7rem', color: '#64748B' }}>
              Faculty & Mentor Review Desk • Viksit Bharat @2047 Cohort Management
            </div>
          </div>
        </div>

        {/* Right Header Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={onSwitchToStudent}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              fontSize: '0.75rem',
              fontWeight: 500,
              color: '#1D4ED8',
              background: '#EFF6FF',
              border: '1px solid #BFDBFE',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            <User className="w-3.5 h-3.5" />
            <span>Switch to Student LMS</span>
          </button>

          <button
            type="button"
            onClick={onLogout}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              fontSize: '0.75rem',
              fontWeight: 500,
              color: '#DC2626',
              background: '#FFFFFF',
              border: '1px solid #FECACA',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* 2. Main Portal Stage */}
      <main style={{ maxWidth: '1040px', width: '100%', margin: '0 auto', padding: '24px 16px 50px', flex: 1 }}>
        
        {/* Mentor Identity Banner */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '10px',
            border: '1px solid #E2E8F0',
            padding: '20px 24px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                background: '#047857',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                fontWeight: 700,
                border: '2px solid #A7F3D0',
                flexShrink: 0
              }}
            >
              {initials}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <h1 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                  {faculty.name}
                </h1>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '3px',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    padding: '2px 8px',
                    borderRadius: '12px',
                    background: '#EFF6FF',
                    color: '#1D4ED8',
                    border: '1px solid #BFDBFE'
                  }}
                >
                  <ShieldCheck className="w-3 h-3 text-blue-600" />
                  <span>{faculty.role}</span>
                </span>
              </div>

              <p style={{ fontSize: '0.78rem', color: '#64748B', margin: '4px 0 0 0' }}>
                {faculty.designation} • {faculty.institution}
              </p>
            </div>
          </div>

          <div style={{ fontSize: '0.75rem', color: '#64748B', background: '#F8FAFC', padding: '6px 12px', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
            Faculty ID: <strong style={{ fontFamily: 'monospace', color: '#0F172A' }}>{faculty.facultyId}</strong> • {faculty.assignedCohort}
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '14px',
            marginBottom: '22px'
          }}
        >
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '16px 18px' }}>
            <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Pending Logbook Approvals
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: pendingCount > 0 ? '#B45309' : '#047857', marginTop: '2px' }}>
              {pendingCount} Entries
            </div>
            <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '4px' }}>
              Requires mentor digital sign-off
            </div>
          </div>

          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '16px 18px' }}>
            <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Assigned Student Cohort
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0F172A', marginTop: '2px' }}>
              {faculty.reviewedStudentsCount} Fellows
            </div>
            <div style={{ fontSize: '0.72rem', color: '#059669', marginTop: '4px', fontWeight: 500 }}>
              100% active participation rate
            </div>
          </div>

          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '16px 18px' }}>
            <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              AICTE Credits Endorsed
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1D4ED8', marginTop: '2px' }}>
              34 Students
            </div>
            <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '4px' }}>
              Institutional credit transfer approved
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            borderBottom: '1px solid #E2E8F0',
            marginBottom: '18px'
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab("logbooks")}
            style={{
              padding: '8px 16px',
              fontSize: '0.82rem',
              fontWeight: activeTab === "logbooks" ? 600 : 500,
              color: activeTab === "logbooks" ? '#1D4ED8' : '#64748B',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === "logbooks" ? '2px solid #1D4ED8' : '2px solid transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Pending Student Logbooks ({pendingCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("roster")}
            style={{
              padding: '8px 16px',
              fontSize: '0.82rem',
              fontWeight: activeTab === "roster" ? 600 : 500,
              color: activeTab === "roster" ? '#1D4ED8' : '#64748B',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === "roster" ? '2px solid #1D4ED8' : '2px solid transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Cohort Roster ({DEMO_STUDENTS.length})</span>
          </button>
        </div>

        {/* Tab 1: Pending Logbooks Review List */}
        {activeTab === "logbooks" && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {logbooks.map((log) => (
              <div
                key={log.id}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '8px',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                  padding: '18px 22px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '0.94rem', fontWeight: 700, color: '#0F172A' }}>
                        {log.studentName}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: '#64748B', fontFamily: 'monospace' }}>
                        ({log.rollNo})
                      </span>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          padding: '3px 8px',
                          borderRadius: '4px',
                          background: log.status === "Approved" ? '#ECFDF5' : '#FFFBEB',
                          color: log.status === "Approved" ? '#047857' : '#B45309',
                          border: log.status === "Approved" ? '1px solid #A7F3D0' : '1px solid #FDE68A'
                        }}
                      >
                        {log.status === "Approved" ? "Verified & Signed" : "Pending Sign-off"}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '2px' }}>
                      {log.institution}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', fontSize: '0.74rem', color: '#64748B' }}>
                    <div>Hours Claimed: <strong style={{ color: '#0F172A', fontSize: '0.84rem' }}>{log.hours} Hours</strong></div>
                    <div style={{ color: '#94A3B8', marginTop: '2px' }}>Week {log.week} • {log.submittedAt}</div>
                  </div>
                </div>

                <div style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: '6px', border: '1px solid #E2E8F0', marginBottom: '14px' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.82rem', color: '#0F172A', marginBottom: '4px' }}>
                    {log.title}
                  </div>
                  <p style={{ fontSize: '0.78rem', color: '#334155', lineHeight: 1.55, margin: 0 }}>
                    {log.summary}
                  </p>
                </div>

                {/* Card Action */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                  {log.status === "Pending Review" ? (
                    <button
                      type="button"
                      onClick={() => handleApproveLogbook(log.id, log.studentName)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '7px 16px',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        color: '#FFFFFF',
                        background: '#059669',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        transition: 'background 0.15s ease'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = '#047857'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = '#059669'; }}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Approve & Digitally Sign Off</span>
                    </button>
                  ) : (
                    <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Digitally Endorsed by {faculty.name}</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Cohort Roster */}
        {activeTab === "roster" && (
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
              overflow: 'hidden',
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
            }}
          >
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#475569', fontSize: '0.72rem', textTransform: 'uppercase' }}>
                  <th style={{ padding: '12px 16px' }}>Student Name</th>
                  <th style={{ padding: '12px 16px' }}>Roll / ID</th>
                  <th style={{ padding: '12px 16px' }}>Institution</th>
                  <th style={{ padding: '12px 16px' }}>Track</th>
                  <th style={{ padding: '12px 16px' }}>Hours Logged</th>
                  <th style={{ padding: '12px 16px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {DEMO_STUDENTS.map((s, idx) => (
                  <tr key={s.appId} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0F172A' }}>{s.name}</td>
                    <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#64748B' }}>{s.rollNo}</td>
                    <td style={{ padding: '12px 16px', color: '#334155' }}>{s.institution}</td>
                    <td style={{ padding: '12px 16px', color: '#475569' }}>{s.sectorTrack}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0F172A' }}>{s.hoursLogged} / 60h</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span
                        style={{
                          fontSize: '0.68rem',
                          fontWeight: 600,
                          padding: '2px 8px',
                          borderRadius: '4px',
                          background: s.status === "Completed" ? '#ECFDF5' : '#EFF6FF',
                          color: s.status === "Completed" ? '#047857' : '#1D4ED8',
                          border: s.status === "Completed" ? '1px solid #A7F3D0' : '1px solid #BFDBFE'
                        }}
                      >
                        {s.status === "Completed" ? "Certified" : "Active"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Toast */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            background: '#0F172A',
            color: '#FFFFFF',
            padding: '10px 16px',
            borderRadius: '8px',
            fontSize: '0.8rem',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
            zIndex: 999999,
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
