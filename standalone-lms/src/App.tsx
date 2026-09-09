import React, { useState, useEffect } from 'react';
import { 
  CURRICULUM_MODULES, 
  DEMO_STUDENTS, 
  DEMO_FACULTY,
  DEMO_ADMIN,
  DEFAULT_LOGBOOK_ENTRIES, 
  DEFAULT_CAPSTONE_PROJECT, 
  COURSE_ANNOUNCEMENTS,
  COURSE_INFO,
  type LMSLesson, 
  type LMSModule,
  type StudentProfile, 
  type FacultyProfile,
  type AdminProfile,
  type CurriculumModule,
  type Announcement,
  type LogbookEntry, 
  type CapstoneProject 
} from './data/curriculumData';
import { COURSE_CATALOG } from './data/studentsRegistry';

import { NptelHeader, type NptelNavTab } from './components/NptelHeader';
import { NptelCourseOutline } from './components/NptelCourseOutline';
import { NptelClassroom } from './components/NptelClassroom';
import { NptelAnnouncements } from './components/NptelAnnouncements';
import { NptelAboutCourse } from './components/NptelAboutCourse';
import { NptelForum } from './components/NptelForum';
import { NptelProgress } from './components/NptelProgress';
import { WeeklyLogbook } from './components/WeeklyLogbook';
import { CapstonePortal } from './components/CapstonePortal';
import { CertificateCard } from './components/CertificateCard';
import { QuizModal } from './components/QuizModal';
import { LoginGate } from './components/LoginGate';
import { AiWidgetsModal } from './components/AiWidgetsModal';
import { AiChatbotModal } from './components/AiChatbotModal';
import { ManageExamModal } from './components/ManageExamModal';
import { MyBookmarksView } from './components/MyBookmarksView';
import { AccessibilityModal } from './components/AccessibilityModal';
import { StudentProfilePage } from './components/StudentProfilePage';
import { FacultyPortalView } from './components/FacultyPortalView';
import { AdminPortalView } from './components/AdminPortalView';
import {
  CourseOutlineSkeleton,
  ClassroomSkeleton,
  AboutCourseSkeleton,
  AnnouncementsSkeleton,
  BookmarksSkeleton,
  ForumSkeleton,
  ProgressSkeleton,
  LogbookSkeleton,
  CertificateSkeleton
} from './components/SkeletonLoaders';
import { Sparkles, Edit3, Plus, ArrowLeft } from 'lucide-react';

export function App() {
  const [modules, setModules] = useState<CurriculumModule[]>(CURRICULUM_MODULES);
  const [announcements, setAnnouncements] = useState<Announcement[]>(COURSE_ANNOUNCEMENTS);
  const [courseInfo, setCourseInfo] = useState(COURSE_INFO);
  const [student, setStudent] = useState<StudentProfile | null>(DEMO_STUDENTS[0]);
  const [faculty, setFaculty] = useState<FacultyProfile | null>(null);
  const [admin, setAdmin] = useState<AdminProfile | null>(null);
  const [activeTab, setActiveTab] = useState<NptelNavTab>("course");
  const [currentLesson, setCurrentLesson] = useState<LMSLesson>(CURRICULUM_MODULES[0].lessons[0]);
  const [completedLessons, setCompletedLessons] = useState<string[]>(DEMO_STUDENTS[0].completedLessons);
  const [bookmarkedLessonIds, setBookmarkedLessonIds] = useState<string[]>(["les-about-1", "les-1-1", "les-2-1"]);
  const [logbookEntries, setLogbookEntries] = useState<LogbookEntry[]>(DEFAULT_LOGBOOK_ENTRIES);
  const [capstoneProject, setCapstoneProject] = useState<CapstoneProject>(DEFAULT_CAPSTONE_PROJECT);

  // Admin Live Edit States
  const [isAdminLiveEditMode, setIsAdminLiveEditMode] = useState<boolean>(false);
  const [isLiveEditToggledOn, setIsLiveEditToggledOn] = useState<boolean>(true);

  // Modals state
  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);
  const [quizLesson, setQuizLesson] = useState<LMSLesson>(CURRICULUM_MODULES[0].lessons[0]);
  const [isWidgetsOpen, setIsWidgetsOpen] = useState<boolean>(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState<boolean>(false);
  const [isManageExamOpen, setIsManageExamOpen] = useState<boolean>(false);
  const [manageExamInitialTab, setManageExamInitialTab] = useState<"admitCard" | "centers" | "guidelines">("admitCard");
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState<boolean>(false);

  // Accessibility state
  const [fontSize, setFontSize] = useState<"normal" | "large" | "xlarge">("normal");
  const [highContrast, setHighContrast] = useState<boolean>(false);

  // Announcements read tracking
  const [readAnnouncementIds, setReadAnnouncementIds] = useState<string[]>(["ann-3"]);
  const unreadAnnouncementsCount = Math.max(0, announcements.length - readAnnouncementIds.length);

  const handleMarkAnnouncementAsRead = (id: string) => {
    setReadAnnouncementIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleMarkAllAnnouncementsAsRead = () => {
    setReadAnnouncementIds(announcements.map((a) => a.id));
  };

  // Interactive sidebar resizing as a continuous line
  const [sidebarWidth, setSidebarWidth] = useState<number>(320);
  const [isDraggingSidebar, setIsDraggingSidebar] = useState<boolean>(false);

  const handleStartDrag = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    e.preventDefault();
    const startX = e.clientX;
    const initialWidth = sidebarWidth;

    setIsDraggingSidebar(true);

    const onMouseMove = (moveEvent: MouseEvent) => {
      const delta = moveEvent.clientX - startX;
      const newWidth = Math.max(220, Math.min(560, initialWidth + delta));
      setSidebarWidth(newWidth);
    };

    const onMouseUp = () => {
      setIsDraggingSidebar(false);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const totalLessonCount = modules.reduce((acc, m) => acc + m.lessons.length, 0);

  const handleLogin = (loggedStudent: StudentProfile) => {
    setStudent(loggedStudent);
    setFaculty(null);
    setAdmin(null);
    setIsAdminLiveEditMode(false);
    setCompletedLessons(loggedStudent.completedLessons || []);
    setActiveTab("course");

    if (loggedStudent.enrolledCourseTitle) {
      const catalogItem = COURSE_CATALOG.find(
        (c) =>
          c.courseCode === loggedStudent.enrolledCourseCode ||
          c.title.toLowerCase() === loggedStudent.enrolledCourseTitle?.toLowerCase() ||
          loggedStudent.enrolledCourseTitle?.toLowerCase().includes(c.shortTitle.toLowerCase())
      );

      if (catalogItem) {
        setCourseInfo((prev) => ({
          ...prev,
          courseCode: catalogItem.courseCode,
          title: catalogItem.title,
          startDate: catalogItem.startDate || "1st October 2026",
          duration: catalogItem.duration,
          creditEquivalency: catalogItem.credits,
          instructors: catalogItem.instructors || prev.instructors
        }));

        if (catalogItem.weeklyThemes && catalogItem.weeklyThemes.length > 0) {
          setModules((prevMods) =>
            prevMods.map((mod, idx) => {
              if (idx === 0) return mod;
              const themeIndex = idx - 1;
              if (themeIndex < catalogItem.weeklyThemes.length) {
                const themeTitle = catalogItem.weeklyThemes[themeIndex];
                return {
                  ...mod,
                  title: `Week ${mod.week}: ${themeTitle}`,
                  subtitle: `${catalogItem.shortTitle} - Core Module`,
                  theme: themeTitle
                };
              }
              return mod;
            })
          );
        }
      } else {
        setCourseInfo((prev) => ({
          ...prev,
          title: loggedStudent.enrolledCourseTitle || prev.title,
          courseCode: loggedStudent.enrolledCourseCode || prev.courseCode,
          startDate: "1st October 2026"
        }));
      }
    }
  };

  const handleFacultyLogin = (loggedFaculty: FacultyProfile) => {
    setFaculty(loggedFaculty);
    setStudent(null);
    setAdmin(null);
  };

  const handleFacultyLogout = () => {
    setFaculty(null);
  };

  const handleAdminLogin = (loggedAdmin: AdminProfile) => {
    setAdmin(loggedAdmin);
    setStudent(null);
    setFaculty(null);
  };

  const handleAdminLogout = () => {
    setAdmin(null);
    setIsAdminLiveEditMode(false);
  };

  const handleLogout = () => {
    setStudent(null);
    setFaculty(null);
    setAdmin(null);
    setIsAdminLiveEditMode(false);
  };

  const handleUpdateLesson = (moduleIndex: number, lessonId: string, updatedFields: Partial<LMSLesson>) => {
    setModules((prevModules) =>
      prevModules.map((mod: LMSModule) => {
        if (mod.moduleIndex !== moduleIndex) return mod;
        return {
          ...mod,
          lessons: mod.lessons.map((les: LMSLesson) => {
            if (les.id !== lessonId) return les;
            const updated: LMSLesson = { ...les, ...updatedFields };
            if (currentLesson.id === lessonId) {
              setCurrentLesson(updated);
            }
            return updated;
          }),
        };
      })
    );
  };

  const handleAddLesson = (moduleIndex: number, newLesson: LMSLesson) => {
    setModules((prevModules) =>
      prevModules.map((mod: LMSModule) => {
        if (mod.moduleIndex !== moduleIndex) return mod;
        return {
          ...mod,
          lessons: [...mod.lessons, newLesson],
        };
      })
    );
  };

  const handleDeleteLesson = (moduleIndex: number, lessonId: string) => {
    setModules((prevModules) =>
      prevModules.map((mod: LMSModule) => {
        if (mod.moduleIndex !== moduleIndex) return mod;
        return {
          ...mod,
          lessons: mod.lessons.filter((les: LMSLesson) => les.id !== lessonId),
        };
      })
    );
  };

  const handleQuickAddLessonToCurrentModule = () => {
    const currentModule = modules.find((m) => m.moduleIndex === currentLesson.moduleIndex) || modules[0];
    const newUnitNum = currentModule.lessons.length + 1;
    const newId = `les-${currentModule.moduleIndex}-${Date.now()}`;
    const newLesson: LMSLesson = {
      id: newId,
      moduleIndex: currentModule.moduleIndex,
      lessonIndex: newUnitNum,
      weekNumber: typeof currentModule.week === 'number' ? currentModule.week : currentModule.moduleIndex,
      title: `Unit ${newUnitNum}: New Interactive Study Topic`,
      summary: "Newly added curriculum topic. Click any text or section to customize this lecture.",
      youtubeId: "dQw4w9WgXcQ",
      contentType: "video",
      duration: "18m",
      durationMinutes: 18,
      objectives: ["Understand fundamental core principles", "Practical implementation insights"],
      takeaways: ["Key takeaway insight for this unit"],
      resources: [],
      readingContent: {
        overview: "Overview of newly created learning module. Customize this content live.",
        actionLinkText: "Click here to view official notes",
        actionLinkUrl: "#",
        sections: [
          {
            heading: "1. Introduction & Background",
            body: "Detailed explanatory notes for the student cohort. Click Edit to customize."
          }
        ]
      }
    };
    handleAddLesson(currentModule.moduleIndex, newLesson);
    setCurrentLesson(newLesson);
  };

  const handleAddModule = (newModule: LMSModule) => {
    setModules((prevModules) => [...prevModules, newModule]);
  };

  const handleDeleteModule = (moduleIndex: number) => {
    setModules((prevModules) => prevModules.filter((m) => m.moduleIndex !== moduleIndex));
  };

  const handleAddAnnouncement = (newAnn: Announcement) => {
    setAnnouncements((prev) => [newAnn, ...prev]);
  };

  const handleDeleteAnnouncement = (id: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  };

  const handleUpdateCourseInfo = (updatedInfo: Partial<typeof COURSE_INFO>) => {
    setCourseInfo((prev) => ({ ...prev, ...updatedInfo }));
  };

  const handleToggleBookmark = (lessonId: string) => {
    setBookmarkedLessonIds(prev => 
      prev.includes(lessonId) ? prev.filter(id => id !== lessonId) : [...prev, lessonId]
    );
  };

  const handleOpenQuiz = (lessonToQuiz: LMSLesson) => {
    setQuizLesson(lessonToQuiz);
    setIsQuizOpen(true);
  };

  const handlePassQuiz = (lessonId: string, score: number) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons((prev) => [...prev, lessonId]);
    }
    if (student) {
      setStudent((prev) => {
        if (!prev) return prev;
        const newCompleted = prev.completedLessons.includes(lessonId)
          ? prev.completedLessons
          : [...prev.completedLessons, lessonId];
        const newHours = Math.min(prev.totalRequiredHours, prev.hoursLogged + 4);
        const newPct = Math.round((newCompleted.length / totalLessonCount) * 100);

        return {
          ...prev,
          completedLessons: newCompleted,
          hoursLogged: newHours,
          progressPercentage: newPct,
          status: newPct >= 100 ? "Completed" : "Active",
          quizScores: {
            ...prev.quizScores,
            [lessonId]: score,
          },
        };
      });
    }
    setIsQuizOpen(false);
  };

  const handleAddLogbookEntry = (newEntry: LogbookEntry) => {
    setLogbookEntries((prev) => [newEntry, ...prev]);
    if (student) {
      setStudent((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          hoursLogged: Math.min(prev.totalRequiredHours, prev.hoursLogged + newEntry.hoursLogged),
        };
      });
    }
  };

  const handleOpenManageExamModal = (section?: "admitCard" | "centers" | "guidelines") => {
    setManageExamInitialTab(section || "admitCard");
    setIsManageExamOpen(true);
  };

  // Skeleton loading states
  const [isPageLoading, setIsPageLoading] = useState<boolean>(true);
  const [isLessonLoading, setIsLessonLoading] = useState<boolean>(false);

  // Initial page load skeleton animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 550);
    return () => clearTimeout(timer);
  }, []);

  // Handle Tab Switch with page skeleton animation
  const handleSelectTab = (tab: NptelNavTab) => {
    if (tab === activeTab) return;
    setIsPageLoading(true);
    setActiveTab(tab);
    setTimeout(() => {
      setIsPageLoading(false);
    }, 400);
  };

  // Handle Lesson Selection with unit skeleton animation
  const handleSelectLesson = (lesson: LMSLesson) => {
    if (lesson.id === currentLesson.id) return;
    setIsLessonLoading(true);
    setCurrentLesson(lesson);
    setTimeout(() => {
      setIsLessonLoading(false);
    }, 350);
  };

  // Apply font scale and high contrast class
  const fontClass = fontSize === "large" ? "text-scale-large" : fontSize === "xlarge" ? "text-scale-xlarge" : "";
  const contrastClass = highContrast ? "theme-high-contrast" : "";

  // Render Admin / CMS Desk when an administrator logs in (and not in live visual edit mode)
  if (admin && !isAdminLiveEditMode) {
    return (
      <div className={`nptel-app-shell ${fontClass} ${contrastClass}`}>
        <AdminPortalView
          admin={admin}
          modules={modules}
          announcements={announcements}
          courseInfo={courseInfo}
          onLogout={handleAdminLogout}
          onSwitchToStudent={() => {
            setAdmin(null);
            setFaculty(null);
            setStudent(DEMO_STUDENTS[0]);
            setActiveTab("course");
          }}
          onSwitchToFaculty={() => {
            setAdmin(null);
            setStudent(null);
            setFaculty(DEMO_FACULTY[0]);
          }}
          onSwitchToLiveEditor={() => {
            setIsAdminLiveEditMode(true);
            setIsLiveEditToggledOn(true);
            if (!student) {
              setStudent(DEMO_STUDENTS[0]);
            }
            setActiveTab("course");
          }}
          onUpdateLesson={handleUpdateLesson}
          onAddLesson={handleAddLesson}
          onDeleteLesson={handleDeleteLesson}
          onAddModule={handleAddModule}
          onDeleteModule={handleDeleteModule}
          onAddAnnouncement={handleAddAnnouncement}
          onDeleteAnnouncement={handleDeleteAnnouncement}
          onUpdateCourseInfo={handleUpdateCourseInfo}
          onLoginAsStudent={handleLogin}
        />
      </div>
    );
  }

  // Render Faculty / Mentor Desk when a mentor or faculty logs in
  if (faculty) {
    return (
      <div className={`nptel-app-shell ${fontClass} ${contrastClass}`}>
        <FacultyPortalView
          faculty={faculty}
          onLogout={handleFacultyLogout}
          onSwitchToStudent={() => {
            setFaculty(null);
            setStudent(DEMO_STUDENTS[0]);
            setActiveTab("course");
          }}
        />
      </div>
    );
  }

  // Render Login Gate if neither student nor faculty nor admin is logged in
  if (!student && !admin) {
    return (
      <LoginGate
        onLogin={handleLogin}
        onFacultyLogin={handleFacultyLogin}
        onAdminLogin={handleAdminLogin}
      />
    );
  }

  const effectiveStudent = student || DEMO_STUDENTS[0];

  const isCurrentLessonCompleted = completedLessons.includes(currentLesson.id);
  const isCurrentLessonBookmarked = bookmarkedLessonIds.includes(currentLesson.id);

  return (
    <div className={`nptel-app-shell ${fontClass} ${contrastClass}`}>
      {/* Admin Live In-Place Editor Floating Ribbon */}
      {isAdminLiveEditMode && (
        <div
          style={{
            background: 'linear-gradient(90deg, #0F172A 0%, #1E293B 100%)',
            borderBottom: '2px solid #2563EB',
            color: '#FFFFFF',
            padding: '8px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            zIndex: 900,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            fontSize: '0.8rem',
            position: 'sticky',
            top: 0
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(37, 99, 235, 0.2)',
                border: '1px solid #3B82F6',
                padding: '3px 9px',
                borderRadius: '4px',
                color: '#93C5FD',
                fontWeight: 700,
                fontSize: '0.74rem'
              }}
            >
              <Sparkles style={{ width: '13px', height: '13px', color: '#60A5FA' }} />
              <span>LIVE VISUAL EDITOR</span>
            </div>

            {/* Toggle Button */}
            <button
              type="button"
              onClick={() => setIsLiveEditToggledOn(!isLiveEditToggledOn)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '3px 10px',
                borderRadius: '4px',
                fontSize: '0.74rem',
                fontWeight: 600,
                cursor: 'pointer',
                border: 'none',
                background: isLiveEditToggledOn ? '#10B981' : '#475569',
                color: '#FFFFFF',
                transition: 'all 0.15s ease'
              }}
              title="Toggle Live In-Place Edit Highlighting & Actions"
            >
              <Edit3 style={{ width: '12px', height: '12px' }} />
              <span>Edit Mode: {isLiveEditToggledOn ? 'ACTIVE' : 'PAUSED'}</span>
            </button>

            <span style={{ color: '#94A3B8', fontSize: '0.74rem' }}>
              {isLiveEditToggledOn 
                ? 'Click any title, reading text, or video on screen to edit immediately.'
                : 'Editing controls hidden. Viewing as student.'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              onClick={handleQuickAddLessonToCurrentModule}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 12px',
                borderRadius: '4px',
                fontSize: '0.74rem',
                fontWeight: 600,
                cursor: 'pointer',
                background: '#2563EB',
                color: '#FFFFFF',
                border: 'none'
              }}
              title="Add a new unit to currently active module"
            >
              <Plus style={{ width: '13px', height: '13px' }} />
              <span>+ Quick Add Unit</span>
            </button>

            <button
              type="button"
              onClick={() => setIsAdminLiveEditMode(false)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 12px',
                borderRadius: '4px',
                fontSize: '0.74rem',
                fontWeight: 600,
                cursor: 'pointer',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#E2E8F0',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
              title="Return to CMS Management Portal"
            >
              <ArrowLeft style={{ width: '13px', height: '13px' }} />
              <span>Return to CMS Desk</span>
            </button>
          </div>
        </div>
      )}

      {/* NPTEL / SWAYAM Master Top Navigation Header (Exact match to screenshot) */}
      <NptelHeader
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        student={effectiveStudent}
        onLogout={handleLogout}
        unreadAnnouncements={unreadAnnouncementsCount}
        bookmarksCount={bookmarkedLessonIds.length}
        onOpenWidgets={() => setIsWidgetsOpen(true)}
        onOpenManageExam={handleOpenManageExamModal}
        onToggleAccessibility={() => setIsAccessibilityOpen(true)}
        onSwitchToFaculty={() => {
          setStudent(null);
          setFaculty(DEMO_FACULTY[0]);
        }}
        onSwitchToAdmin={() => {
          setStudent(null);
          setFaculty(null);
          setAdmin(DEMO_ADMIN);
        }}
      />

      {/* Main LMS Viewport */}
      <div className="nptel-main-layout-viewport">
        {/* Tab 1: Course Outline & Classroom (Exact match to Screenshot 1, 2, 3) */}
        {activeTab === "course" && (
          <div className={`nptel-two-column-stage ${isDraggingSidebar ? "is-resizing" : ""}`}>
            {isPageLoading ? (
              <>
                <div 
                  className="nptel-left-column" 
                  style={{ width: `${sidebarWidth}px`, flexBasis: `${sidebarWidth}px` }}
                >
                  <CourseOutlineSkeleton />
                </div>
                <div className="nptel-vertical-line-resizer">
                  <div className="nptel-splitter-line" />
                </div>
                <div className="nptel-right-column">
                  <ClassroomSkeleton />
                </div>
              </>
            ) : (
              <>
                {/* Left Column: Course Outline Accordion Card (Always visible) */}
                <div 
                  className="nptel-left-column" 
                  style={{ width: `${sidebarWidth}px`, flexBasis: `${sidebarWidth}px` }}
                >
                  <NptelCourseOutline
                    modules={modules}
                    currentLesson={currentLesson}
                    completedLessons={completedLessons}
                    onSelectLesson={handleSelectLesson}
                    onOpenAssignment={(les) => handleOpenQuiz(les)}
                    courseTitle={courseInfo.title}
                    isLiveEditMode={isAdminLiveEditMode && isLiveEditToggledOn}
                    onAddLesson={handleAddLesson}
                    onDeleteLesson={handleDeleteLesson}
                  />
                </div>

                {/* Draggable Vertical Splitter Line */}
                <div 
                  className="nptel-vertical-line-resizer" 
                  onMouseDown={handleStartDrag}
                  title="Drag to resize sidebar width"
                >
                  <div className="nptel-splitter-line" />
                </div>

                {/* Right Column: Classroom Content Card */}
                <div className="nptel-right-column">
                  {isLessonLoading ? (
                    <ClassroomSkeleton />
                  ) : (
                    <div className="skeleton-fade-in">
                      <NptelClassroom
                        modules={modules}
                        lesson={currentLesson}
                        isCompleted={isCurrentLessonCompleted}
                        isBookmarked={isCurrentLessonBookmarked}
                        onSelectLesson={handleSelectLesson}
                        onOpenQuiz={() => handleOpenQuiz(currentLesson)}
                        onToggleBookmark={handleToggleBookmark}
                        onOpenChatbot={() => setIsChatbotOpen(true)}
                        isLiveEditMode={isAdminLiveEditMode && isLiveEditToggledOn}
                        onUpdateLesson={handleUpdateLesson}
                      />
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* Tab 2: About The Course */}
        {activeTab === "about" && (
          <main className="nptel-page-container">
            {isPageLoading ? (
              <AboutCourseSkeleton />
            ) : (
              <div className="skeleton-fade-in">
                <NptelAboutCourse />
              </div>
            )}
          </main>
        )}

        {/* Tab 3: Announcements */}
        {activeTab === "announcements" && (
          <main className="nptel-page-container">
            {isPageLoading ? (
              <AnnouncementsSkeleton />
            ) : (
              <div className="skeleton-fade-in">
                <NptelAnnouncements
                  announcements={announcements}
                  readIds={readAnnouncementIds}
                  onMarkAsRead={handleMarkAnnouncementAsRead}
                  onMarkAllAsRead={handleMarkAllAnnouncementsAsRead}
                  onNavigateTab={handleSelectTab}
                  onOpenManageExam={handleOpenManageExamModal}
                />
              </div>
            )}
          </main>
        )}

        {/* Tab 4: My Bookmarks */}
        {activeTab === "bookmarks" && (
          <main className="nptel-page-container">
            {isPageLoading ? (
              <BookmarksSkeleton />
            ) : (
              <div className="skeleton-fade-in">
                <MyBookmarksView
                  modules={modules}
                  bookmarkedIds={bookmarkedLessonIds}
                  onSelectLesson={(les) => {
                    handleSelectLesson(les);
                    handleSelectTab("course");
                  }}
                  onRemoveBookmark={handleToggleBookmark}
                />
              </div>
            )}
          </main>
        )}

        {/* Tab 5: Q&A / Discussion Forum */}
        {activeTab === "qa" && (
          <main className="nptel-page-container">
            {isPageLoading ? (
              <ForumSkeleton />
            ) : (
              <div className="skeleton-fade-in">
                <NptelForum />
              </div>
            )}
          </main>
        )}

        {/* Tab 6: Scores & Progress */}
        {activeTab === "progress" && (
          <main className="nptel-page-container">
            {isPageLoading ? (
              <ProgressSkeleton />
            ) : (
              <div className="skeleton-fade-in">
                <NptelProgress
                  student={effectiveStudent}
                  capstone={capstoneProject}
                  completedLessons={completedLessons}
                />
              </div>
            )}
          </main>
        )}

        {/* Tab 7: Mentor Logbook */}
        {activeTab === "logbook" && (
          <main className="nptel-page-container">
            {isPageLoading ? (
              <LogbookSkeleton />
            ) : (
              <div className="skeleton-fade-in">
                <WeeklyLogbook
                  student={effectiveStudent}
                  logbookEntries={logbookEntries}
                  onAddEntry={handleAddLogbookEntry}
                />
              </div>
            )}
          </main>
        )}

        {/* Tab 8: AICTE Certificate */}
        {activeTab === "certificate" && (
          <main className="nptel-page-container">
            {isPageLoading ? (
              <CertificateSkeleton />
            ) : (
              <div className="skeleton-fade-in">
                <CertificateCard
                  student={effectiveStudent}
                  capstone={capstoneProject}
                  completedCount={completedLessons.length}
                  totalCount={totalLessonCount}
                />
              </div>
            )}
          </main>
        )}

        {/* Tab 9: Dedicated Student Profile Page */}
        {activeTab === "profile" && (
          <main className="nptel-page-container">
            {isPageLoading ? (
              <AboutCourseSkeleton />
            ) : (
              <div className="skeleton-fade-in">
                <StudentProfilePage
                  student={effectiveStudent}
                  onNavigateTab={handleSelectTab}
                  onLogout={handleLogout}
                />
              </div>
            )}
          </main>
        )}
      </div>

      {/* MODALS */}
      {/* 1. AI Powered Widgets Modal */}
      <AiWidgetsModal
        isOpen={isWidgetsOpen}
        onClose={() => setIsWidgetsOpen(false)}
        currentLesson={currentLesson}
      />

      {/* 2. ChatBot Modal */}
      <AiChatbotModal
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
        currentLesson={currentLesson}
      />

      {/* 3. Manage Exam & Hall Ticket Modal */}
      <ManageExamModal
        isOpen={isManageExamOpen}
        onClose={() => setIsManageExamOpen(false)}
        student={effectiveStudent}
        initialTab={manageExamInitialTab}
      />

      {/* 4. Accessibility Popover Modal */}
      <AccessibilityModal
        isOpen={isAccessibilityOpen}
        onClose={() => setIsAccessibilityOpen(false)}
        fontSize={fontSize}
        onChangeFontSize={setFontSize}
        highContrast={highContrast}
        onToggleHighContrast={() => setHighContrast(!highContrast)}
      />

      {/* 5. Weekly Quiz Modal */}
      <QuizModal
        isOpen={isQuizOpen}
        lesson={quizLesson}
        onClose={() => setIsQuizOpen(false)}
        onPass={(lessonId, score) => handlePassQuiz(lessonId, score)}
      />
    </div>
  );
}
export default App;
