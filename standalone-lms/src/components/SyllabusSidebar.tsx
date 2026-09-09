import React, { useState } from 'react';
import { 
  CheckCircle2, 
  PlayCircle, 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  Rocket, 
  Award, 
  LogOut,
  GraduationCap
} from 'lucide-react';
import type { LMSModule, LMSLesson, StudentProfile } from '../data/curriculumData';

interface Props {
  modules: LMSModule[];
  currentLesson: LMSLesson;
  completedLessons: string[];
  student: StudentProfile;
  activeTab: "classroom" | "logbook" | "capstone" | "certificate";
  onSelectLesson: (lesson: LMSLesson) => void;
  onSelectTab: (tab: "classroom" | "logbook" | "capstone" | "certificate") => void;
  onLogout: () => void;
}

export const SyllabusSidebar: React.FC<Props> = ({
  modules,
  currentLesson,
  completedLessons,
  student,
  activeTab,
  onSelectLesson,
  onSelectTab,
  onLogout,
}) => {
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({
    [`mod-${currentLesson.moduleIndex}`]: true,
  });

  const toggleModule = (modId: string) => {
    setOpenModules((prev) => ({
      ...prev,
      [modId]: !prev[modId],
    }));
  };

  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedCount = completedLessons.length;
  const progressPct = Math.round((completedCount / totalLessons) * 100);

  return (
    <aside className="lms-sidebar-wrapper">
      {/* Brand Header */}
      <div className="sidebar-brand-header">
        <div className="flex-align-center gap-2.5">
          <img src="/logo-new.png" alt="NCIE Logo" className="sidebar-logo" />
          <div>
            <div className="brand-portal-title">NCIE LMS</div>
            <div className="brand-portal-sub">Innovation Leadership</div>
          </div>
        </div>
      </div>

      {/* Clean Student Profile Card */}
      <div className="sidebar-student-card">
        <div className="flex-align-center gap-2.5 mb-2">
          <div className="student-avatar-badge">
            {student.name.charAt(0)}
          </div>
          <div className="overflow-hidden">
            <div className="student-name-text text-truncate">{student.name}</div>
            <div className="student-roll-text text-truncate">{student.sectorTrack}</div>
          </div>
        </div>

        {/* Minimal Progress Bar */}
        <div className="sidebar-progress-meter mt-2">
          <div className="flex-between text-xs mb-1">
            <span className="text-muted">Progress</span>
            <span className="text-primary font-bold">{progressPct}%</span>
          </div>
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: `${progressPct}%` }} />
          </div>
        </div>
      </div>

      {/* Main Tab Navigation Buttons */}
      <nav className="sidebar-tab-nav">
        <button
          onClick={() => onSelectTab("classroom")}
          className={`sidebar-nav-item ${activeTab === "classroom" ? "active" : ""}`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Classroom</span>
        </button>

        <button
          onClick={() => onSelectTab("logbook")}
          className={`sidebar-nav-item ${activeTab === "logbook" ? "active" : ""}`}
        >
          <FileText className="w-4 h-4" />
          <span>Work Logbook</span>
        </button>

        <button
          onClick={() => onSelectTab("capstone")}
          className={`sidebar-nav-item ${activeTab === "capstone" ? "active" : ""}`}
        >
          <Rocket className="w-4 h-4" />
          <span>Capstone Project</span>
        </button>

        <button
          onClick={() => onSelectTab("certificate")}
          className={`sidebar-nav-item ${activeTab === "certificate" ? "active" : ""}`}
        >
          <Award className="w-4 h-4" />
          <span>Certificate</span>
          {progressPct >= 100 && <span className="nav-badge-dot" />}
        </button>
      </nav>

      {/* Curriculum Syllabus Accordion (Classroom View) */}
      <div className="sidebar-syllabus-section">
        <div className="sidebar-section-title">
          <span>CURRICULUM</span>
        </div>

        <div className="syllabus-modules-container">
          {modules.map((mod) => {
            const isOpen = !!openModules[mod.id];

            return (
              <div key={mod.id} className="module-accordion-card">
                <button
                  type="button"
                  onClick={() => toggleModule(mod.id)}
                  className="module-accordion-header"
                >
                  <div className="flex-align-center gap-2 text-left">
                    <span className="text-xs font-semibold text-heading text-truncate">
                      Week {mod.week}: {mod.theme}
                    </span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-3.5 h-3.5 text-muted shrink-0" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-muted shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="module-lessons-list">
                    {mod.lessons.map((les) => {
                      const isCompleted = completedLessons.includes(les.id);
                      const isCurrent = currentLesson.id === les.id && activeTab === "classroom";

                      return (
                        <button
                          key={les.id}
                          type="button"
                          onClick={() => {
                            onSelectLesson(les);
                            onSelectTab("classroom");
                          }}
                          className={`lesson-list-item ${isCurrent ? "current" : ""} ${isCompleted ? "completed" : ""}`}
                        >
                          <div className="lesson-status-icon">
                            {isCompleted ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald" />
                            ) : isCurrent ? (
                              <PlayCircle className="w-3.5 h-3.5 text-primary" />
                            ) : (
                              <div className="empty-status-dot" />
                            )}
                          </div>
                          <span className="text-xs font-medium text-truncate">
                            {les.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Sidebar Footer */}
      <div className="sidebar-footer-row">
        <button onClick={onLogout} className="sidebar-logout-btn">
          <LogOut className="w-3.5 h-3.5" />
          <span>Exit LMS</span>
        </button>
      </div>
    </aside>
  );
};
