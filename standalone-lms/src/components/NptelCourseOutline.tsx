import React, { useState } from 'react';
import { 
  ChevronRight, 
  ChevronDown, 
  CheckCircle2, 
  Circle, 
  FileText,
  Video,
  HelpCircle,
  BookOpen,
  Download,
  Plus,
  Trash2
} from 'lucide-react';
import type { LMSModule, LMSLesson } from '../data/curriculumData';

interface Props {
  modules: LMSModule[];
  currentLesson: LMSLesson;
  completedLessons: string[];
  onSelectLesson: (lesson: LMSLesson) => void;
  onOpenAssignment?: (lesson: LMSLesson) => void;
  courseTitle?: string;
  isLiveEditMode?: boolean;
  onAddLesson?: (moduleIndex: number, newLesson: LMSLesson) => void;
  onDeleteLesson?: (moduleIndex: number, lessonId: string) => void;
}

export const NptelCourseOutline: React.FC<Props> = ({
  modules,
  currentLesson,
  completedLessons,
  onSelectLesson,
  onOpenAssignment,
  courseTitle = "Cloud Computing & Viksit Bharat Innovation",
  isLiveEditMode = false,
  onAddLesson,
  onDeleteLesson,
}) => {
  // Keep the active module open by default
  const [openWeeks, setOpenWeeks] = useState<Record<string, boolean>>({
    "mod-about": true,
    "mod-how-it-works": true,
    [`mod-${currentLesson.moduleIndex}`]: true,
  });

  const toggleWeek = (modId: string) => {
    setOpenWeeks(prev => ({
      ...prev,
      [modId]: !prev[modId],
    }));
  };

  // Calculate total units & completed units
  const allLessons = modules.flatMap(m => m.lessons);
  const totalLessons = allLessons.length;
  const completedCount = completedLessons.filter(id => allLessons.some(l => l.id === id)).length;
  const progressPercent = Math.round((completedCount / Math.max(1, totalLessons)) * 100);

  return (
    <aside className="nptel-sidebar-card">
      {/* Card Header: Course Title & Progress (Matching Screenshot 1 & 3) */}
      <div className="nptel-sidebar-header">
        <h2 className="nptel-sidebar-course-title">
          {courseTitle}
        </h2>

        <div className="nptel-sidebar-progress-row">
          <span className="nptel-progress-label">Course Progress</span>
          <span className="nptel-progress-stat">
            {progressPercent}% ({completedCount} of {totalLessons})
          </span>
        </div>

        {/* Slender Progress Track */}
        <div className="nptel-sidebar-progress-track">
          <div 
            className="nptel-sidebar-progress-bar"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Accordion Tree View (Matching Screenshot 1, 2, 3) */}
      <div className="nptel-sidebar-tree-container">
        {modules.map((mod) => {
          const isOpen = !!openWeeks[mod.id];
          const hasActiveLesson = mod.lessons.some(l => l.id === currentLesson.id);

          // Header title formatting (e.g. "Week 1", "About NPTEL", "Text Transcripts")
          let displayLabel = mod.title;
          if (typeof mod.week === 'number') {
            displayLabel = `Week ${mod.week}`;
          } else if (mod.theme) {
            displayLabel = mod.theme;
          }

          return (
            <div key={mod.id} className="nptel-tree-module-block">
              {/* Accordion Row Header */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => toggleWeek(mod.id)}
                  className={`nptel-tree-module-btn ${isOpen ? 'is-open' : ''} ${hasActiveLesson ? 'has-active' : ''}`}
                  style={{ flex: 1 }}
                >
                  <div className="nptel-tree-arrow-box">
                    {isOpen ? (
                      <ChevronDown className="w-3.5 h-3.5 text-slate-600" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                    )}
                  </div>
                  <span className="nptel-tree-module-title text-truncate">
                    {displayLabel}
                  </span>
                </button>

                {isLiveEditMode && onAddLesson && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      const newLes: LMSLesson = {
                        id: `les-${mod.moduleIndex}-${Date.now().toString().slice(-4)}`,
                        moduleIndex: mod.moduleIndex,
                        lessonIndex: mod.lessons.length + 1,
                        weekNumber: typeof mod.week === 'number' ? mod.week : mod.moduleIndex,
                        title: `New Unit ${mod.lessons.length + 1}`,
                        duration: "15 mins",
                        durationMinutes: 15,
                        contentType: "video",
                        youtubeId: "dQw4w9WgXcQ",
                        summary: "Comprehensive lecture notes and curriculum guidance.",
                        objectives: ["Analyze core principles", "Apply practical frameworks"],
                        takeaways: ["Practical understanding of curriculum concepts"],
                        resources: []
                      };
                      onAddLesson(mod.moduleIndex, newLes);
                      onSelectLesson(newLes);
                    }}
                    style={{
                      marginRight: '6px',
                      padding: '2px 6px',
                      fontSize: '0.66rem',
                      fontWeight: 600,
                      color: '#1D4ED8',
                      background: '#EFF6FF',
                      border: '1px solid #BFDBFE',
                      borderRadius: '3px',
                      cursor: 'pointer'
                    }}
                    title="Add a new lesson to this module"
                  >
                    + Unit
                  </button>
                )}
              </div>

              {/* Sub-items when expanded */}
              {isOpen && (
                <div className="nptel-tree-sublist">
                  {mod.lessons.map((les) => {
                    const isSelected = currentLesson.id === les.id;
                    const isCompleted = completedLessons.includes(les.id);

                    return (
                      <div
                        key={les.id}
                        style={{ display: 'flex', alignItems: 'center' }}
                      >
                        <button
                          type="button"
                          onClick={() => onSelectLesson(les)}
                          className={`nptel-tree-unit-row ${isSelected ? 'selected' : ''}`}
                          title={les.title}
                          style={{ flex: 1 }}
                        >
                          {/* Checkmark indicator (Green circle with checkmark as in Screenshot 3) */}
                          <div className="nptel-tree-check-col">
                            {isCompleted ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-50 shrink-0" />
                            ) : (
                              <div className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0" />
                            )}
                          </div>

                          {/* Lesson Title */}
                          <span className="nptel-tree-unit-text">
                            {les.title}
                          </span>
                        </button>

                        {isLiveEditMode && onDeleteLesson && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (window.confirm(`Delete unit "${les.title}"?`)) {
                                onDeleteLesson(mod.moduleIndex, les.id);
                              }
                            }}
                            style={{
                              padding: '4px 6px',
                              background: 'none',
                              border: 'none',
                              color: '#EF4444',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center'
                            }}
                            title="Delete this unit"
                          >
                            <Trash2 style={{ width: '12px', height: '12px' }} />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
};

