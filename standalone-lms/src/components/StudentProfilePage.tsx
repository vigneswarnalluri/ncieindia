import React from 'react';
import { User, Mail, Phone, School, Calendar, BookOpen, ShieldCheck, LogOut } from 'lucide-react';
import type { StudentProfile } from '../data/curriculumData';

interface Props {
  student: StudentProfile;
  onNavigateTab?: (tab: any) => void;
  onLogout: () => void;
}

export const StudentProfilePage: React.FC<Props> = ({
  student,
  onLogout
}) => {
  const initials = student.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', paddingBottom: '40px' }}>
      {/* Page Heading */}
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0F172A', margin: 0 }}>
          Student Profile
        </h2>
        <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '4px 0 0 0' }}>
          Official registration and institutional records for the NCIE Viksit Bharat @2047 Internship Program.
        </p>
      </div>

      {/* Main Profile Card */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '8px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
          overflow: 'hidden'
        }}
      >
        {/* Profile Header Strip */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #F1F5F9',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: '#1D4ED8',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem',
              fontWeight: 700,
              flexShrink: 0
            }}
          >
            {initials}
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                {student.name}
              </h3>
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  padding: '2px 8px',
                  borderRadius: '12px',
                  background: '#ECFDF5',
                  color: '#047857',
                  border: '1px solid #A7F3D0'
                }}
              >
                Active
              </span>
            </div>
            <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '2px', fontFamily: 'monospace' }}>
              Roll No: {student.rollNo} • Application ID: {student.appId}
            </div>
          </div>
        </div>

        {/* Profile Details List */}
        <div style={{ padding: '20px 24px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '16px 24px',
              fontSize: '0.8125rem'
            }}
          >
            <div>
              <div style={{ color: '#64748B', fontSize: '0.72rem', marginBottom: '2px' }}>Full Name</div>
              <div style={{ fontWeight: 600, color: '#0F172A' }}>{student.name}</div>
            </div>

            <div>
              <div style={{ color: '#64748B', fontSize: '0.72rem', marginBottom: '2px' }}>Roll / Registration Number</div>
              <div style={{ fontWeight: 600, color: '#0F172A', fontFamily: 'monospace' }}>{student.rollNo}</div>
            </div>

            <div>
              <div style={{ color: '#64748B', fontSize: '0.72rem', marginBottom: '2px' }}>Email Address</div>
              <div style={{ fontWeight: 500, color: '#0F172A' }}>{student.email}</div>
            </div>

            <div>
              <div style={{ color: '#64748B', fontSize: '0.72rem', marginBottom: '2px' }}>Mobile Number</div>
              <div style={{ fontWeight: 500, color: '#0F172A' }}>{student.mobile}</div>
            </div>

            <div>
              <div style={{ color: '#64748B', fontSize: '0.72rem', marginBottom: '2px' }}>Institution / College</div>
              <div style={{ fontWeight: 600, color: '#0F172A' }}>{student.institution}</div>
              <div style={{ fontSize: '0.7rem', color: '#94A3B8' }}>AISHE Code: {student.aisheCode}</div>
            </div>

            <div>
              <div style={{ color: '#64748B', fontSize: '0.72rem', marginBottom: '2px' }}>Sector Specialization Track</div>
              <div style={{ fontWeight: 600, color: '#0F172A' }}>{student.sectorTrack}</div>
            </div>

            <div>
              <div style={{ color: '#64748B', fontSize: '0.72rem', marginBottom: '2px' }}>Cohort & Batch</div>
              <div style={{ fontWeight: 500, color: '#0F172A' }}>{student.cohort}</div>
            </div>

            <div>
              <div style={{ color: '#64748B', fontSize: '0.72rem', marginBottom: '2px' }}>Date of Enrollment</div>
              <div style={{ fontWeight: 500, color: '#0F172A' }}>{student.enrolledDate}</div>
            </div>

            <div>
              <div style={{ color: '#64748B', fontSize: '0.72rem', marginBottom: '2px' }}>Assigned Industry Mentor</div>
              <div style={{ fontWeight: 600, color: '#0F172A' }}>Dr. Ramanathan Ramanan</div>
              <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Mission Director, Atal Innovation Mission</div>
            </div>

            <div>
              <div style={{ color: '#64748B', fontSize: '0.72rem', marginBottom: '2px' }}>Faculty Coordinator</div>
              <div style={{ fontWeight: 600, color: '#0F172A' }}>Prof. K. Sundararajan</div>
              <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Dean of Academic Affairs, SVNIT</div>
            </div>
          </div>
        </div>

        {/* Footer / Sign Out Strip */}
        <div
          style={{
            padding: '12px 24px',
            background: '#F8FAFC',
            borderTop: '1px solid #F1F5F9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end'
          }}
        >
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
      </div>
    </div>
  );
};
