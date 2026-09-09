import React, { useState } from 'react';
import { 
  Sparkles, 
  Bookmark, 
  HelpCircle, 
  Bell, 
  BookOpen, 
  ChevronDown, 
  LogOut,
  Accessibility,
  User,
  ExternalLink,
  Calendar,
  FileCheck,
  MapPin,
  Award,
  ShieldCheck,
  Shield
} from 'lucide-react';
import { COURSE_INFO, type StudentProfile } from '../data/curriculumData';

export type NptelNavTab = 
  | "course" 
  | "about" 
  | "announcements" 
  | "bookmarks" 
  | "qa" 
  | "progress" 
  | "logbook" 
  | "certificate"
  | "profile";

interface Props {
  activeTab: NptelNavTab;
  onSelectTab: (tab: NptelNavTab) => void;
  student: StudentProfile;
  onLogout: () => void;
  unreadAnnouncements?: number;
  bookmarksCount?: number;
  onOpenWidgets: () => void;
  onOpenManageExam: (section?: "admitCard" | "centers" | "guidelines") => void;
  onToggleAccessibility: () => void;
  onSwitchToFaculty?: () => void;
  onSwitchToAdmin?: () => void;
}

export const NptelHeader: React.FC<Props> = ({
  activeTab,
  onSelectTab,
  student,
  onLogout,
  unreadAnnouncements = 0,
  bookmarksCount = 0,
  onOpenWidgets,
  onOpenManageExam,
  onToggleAccessibility,
  onSwitchToFaculty,
  onSwitchToAdmin,
}) => {
  const [showExamDropdown, setShowExamDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  // Student Initials
  const initials = student.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <header className="nptel-top-nav-bar">
      {/* Left Branding: Official Government of India Emblem + NCIE Logo */}
      <div className="nptel-nav-left">
        <button 
          onClick={() => onSelectTab("course")}
          className="ncie-brand-cluster-btn"
          title="NCIE LMS — Innovation Leadership & Entrepreneurship"
        >
          {/* Official NCIE Logo aligned to the far left */}
          <img 
            src="/logo-new.png" 
            alt="NCIE India" 
            className="h-10 w-auto object-contain shrink-0" 
          />
        </button>
      </div>

      {/* Right Navigation & Action Controls */}
      <div className="nptel-nav-right">
        {/* Text Navigation Links */}
        <nav className="nptel-top-nav-links">
          <button
            type="button"
            onClick={() => onSelectTab("course")}
            className={`nptel-nav-link-btn ${activeTab === "course" ? "active" : ""}`}
          >
            Course
          </button>

          <button
            type="button"
            onClick={() => onSelectTab("about")}
            className={`nptel-nav-link-btn ${activeTab === "about" ? "active" : ""}`}
          >
            About the course
          </button>

          <button
            type="button"
            onClick={() => onSelectTab("announcements")}
            className={`nptel-nav-link-btn ${activeTab === "announcements" ? "active" : ""}`}
          >
            <span>Announcements</span>
            {unreadAnnouncements > 0 && (
              <span className="nptel-nav-badge-bubble">{unreadAnnouncements}</span>
            )}
          </button>

          <button
            type="button"
            onClick={() => onSelectTab("bookmarks")}
            className={`nptel-nav-link-btn ${activeTab === "bookmarks" ? "active" : ""}`}
          >
            <span>My Bookmarks</span>
            {bookmarksCount > 0 && (
              <span className="nptel-nav-badge-subtle">{bookmarksCount}</span>
            )}
          </button>

          <button
            type="button"
            onClick={() => onSelectTab("qa")}
            className={`nptel-nav-link-btn ${activeTab === "qa" ? "active" : ""}`}
          >
            Q&A
          </button>

          <button
            type="button"
            onClick={() => onSelectTab("progress")}
            className={`nptel-nav-link-btn ${activeTab === "progress" ? "active" : ""}`}
            title="View Assignment Scores & Best 6 of 8 Calculation"
          >
            Scores & Progress
          </button>
        </nav>

        {/* Accessibility Icon Button */}
        <button
          type="button"
          onClick={onToggleAccessibility}
          className="nptel-icon-action-btn"
          title="Accessibility & Display Settings"
        >
          <Accessibility className="w-4 h-4 text-slate-600" />
        </button>

        {/* Manage Exam Dropdown (Iconic Yellow/Amber Button) */}
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            onClick={() => setShowExamDropdown(!showExamDropdown)}
            className="nptel-manage-exam-btn"
            title="Exam & Capstone Defense Portal"
          >
            <span>Manage Exam</span>
            <ChevronDown className="w-3.5 h-3.5 ml-1" />
          </button>

          {showExamDropdown && (
            <>
              <div 
                style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 998 }} 
                onClick={() => setShowExamDropdown(false)} 
              />
              <div 
                className="nptel-dropdown-menu"
                style={{ position: 'absolute', top: 'calc(100% + 6px)', right: 0, left: 'auto', zIndex: 1000 }}
              >
                <div className="nptel-dropdown-header">
                  Proctored Exam & Defense Portal
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setShowExamDropdown(false);
                    onOpenManageExam("admitCard");
                  }}
                  className="nptel-dropdown-item"
                >
                  <FileCheck className="w-4 h-4 text-amber-600" />
                  <div className="text-left">
                    <div className="font-semibold text-slate-800">Hall Ticket / Admit Card</div>
                    <div className="text-xxs text-slate-500">Download verified examination pass</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowExamDropdown(false);
                    onOpenManageExam("centers");
                  }}
                  className="nptel-dropdown-item"
                >
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <div className="text-left">
                    <div className="font-semibold text-slate-800">Exam Center Locator</div>
                    <div className="text-xxs text-slate-500">Search 50+ IIT/NIT nodal centers</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowExamDropdown(false);
                    onOpenManageExam("guidelines");
                  }}
                  className="nptel-dropdown-item"
                >
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  <div className="text-left">
                    <div className="font-semibold text-slate-800">Schedule & Guidelines</div>
                    <div className="text-xxs text-slate-500">Calculator & biometric protocols</div>
                  </div>
                </button>

                <div className="nptel-dropdown-divider"></div>

                <button
                  type="button"
                  onClick={() => {
                    setShowExamDropdown(false);
                    onSelectTab("certificate");
                  }}
                  className="nptel-dropdown-item"
                >
                  <Award className="w-4 h-4 text-purple-600" />
                  <div className="text-left">
                    <div className="font-semibold text-slate-800">AICTE 2-Credit Certificate</div>
                    <div className="text-xxs text-slate-500">QR-verifiable digital credential</div>
                  </div>
                </button>
              </div>
            </>
          )}
        </div>

        {/* User Profile Avatar Pill (Blue Circle with Initials 'NV' / 'RP') */}
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="nptel-user-avatar-circle"
            style={activeTab === "profile" ? { boxShadow: '0 0 0 2px #FFFFFF, 0 0 0 4px #1D4ED8', transform: 'scale(1.05)' } : undefined}
            title={`${student.name} (${student.rollNo})`}
          >
            {initials}
          </button>

          {showProfileDropdown && (
            <>
              <div 
                style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 998 }} 
                onClick={() => setShowProfileDropdown(false)} 
              />
              <div 
                className="nptel-dropdown-menu"
                style={{ position: 'absolute', top: 'calc(100% + 6px)', right: 0, left: 'auto', width: '260px', zIndex: 1000 }}
              >
                <div style={{ padding: '12px 14px', borderBottom: '1px solid #E2E8F0', background: '#F8FAFC' }}>
                  <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.88rem' }}>{student.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', fontFamily: 'monospace' }}>{student.rollNo}</div>
                  <div style={{ fontSize: '0.7rem', color: '#1D4ED8', fontWeight: 600, marginTop: '4px' }}>
                    {student.institution}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#64748B', marginTop: '2px' }}>{student.sectorTrack}</div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setShowProfileDropdown(false);
                    onSelectTab("profile");
                  }}
                  className="nptel-dropdown-item"
                >
                  <User className="w-4 h-4 text-slate-600" />
                  <span>My Academic Profile</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowProfileDropdown(false);
                    onSelectTab("logbook");
                  }}
                  className="nptel-dropdown-item"
                >
                  <BookOpen className="w-4 h-4 text-slate-600" />
                  <span>Mentor Logbook ({student.hoursLogged}/60h)</span>
                </button>

                {onSwitchToFaculty && (
                  <button
                    type="button"
                    onClick={() => {
                      setShowProfileDropdown(false);
                      onSwitchToFaculty();
                    }}
                    className="nptel-dropdown-item"
                    style={{ color: '#0369A1' }}
                  >
                    <ShieldCheck className="w-4 h-4 text-sky-600" />
                    <span>Faculty / Mentor Desk</span>
                  </button>
                )}

                {onSwitchToAdmin && (
                  <button
                    type="button"
                    onClick={() => {
                      setShowProfileDropdown(false);
                      onSwitchToAdmin();
                    }}
                    className="nptel-dropdown-item"
                    style={{ color: '#4338CA' }}
                  >
                    <Shield className="w-4 h-4 text-indigo-600" />
                    <span>NCIE Admin & CMS Desk</span>
                  </button>
                )}

                <div className="nptel-dropdown-divider"></div>

                <button
                  type="button"
                  onClick={() => {
                    setShowProfileDropdown(false);
                    onLogout();
                  }}
                  className="nptel-dropdown-item"
                  style={{ color: '#DC2626' }}
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

