import React, { useState } from 'react';
import { 
  BookOpen, 
  Plus, 
  Trash2, 
  Save, 
  Bell, 
  Settings, 
  CheckCircle2, 
  LogOut, 
  Shield, 
  ExternalLink,
  Layers,
  FileText,
  Video,
  Check,
  Building,
  GraduationCap,
  Search,
  Copy,
  Paperclip,
  ListPlus,
  HelpCircle,
  Eye,
  FileDown,
  BookMarked,
  Play,
  FolderPlus,
  Sparkles,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Users,
  Filter
} from 'lucide-react';
import { 
  type AdminProfile, 
  type CurriculumModule, 
  type LMSLesson, 
  type Announcement,
  type COURSE_INFO,
  type ResourceAttachment,
  type QuizQuestion,
  type UnitContentType,
  type StudentProfile
} from '../data/curriculumData';
import { 
  ALL_REGISTERED_STUDENTS, 
  COURSE_CATALOG, 
  generateStudentCredentialsCSV, 
  type StudentRegistrationRecord 
} from '../data/studentsRegistry';

interface Props {
  admin: AdminProfile;
  modules: CurriculumModule[];
  announcements: Announcement[];
  courseInfo: typeof COURSE_INFO;
  onLogout: () => void;
  onSwitchToStudent: () => void;
  onSwitchToFaculty: () => void;
  onUpdateLesson: (moduleIndex: number, lessonId: string, updatedLesson: Partial<LMSLesson>) => void;
  onAddLesson: (moduleIndex: number, newLesson: LMSLesson) => void;
  onDeleteLesson: (moduleIndex: number, lessonId: string) => void;
  onAddModule?: (newModule: CurriculumModule) => void;
  onDeleteModule?: (moduleIndex: number) => void;
  onAddAnnouncement: (announcement: Announcement) => void;
  onDeleteAnnouncement: (id: string) => void;
  onUpdateCourseInfo: (updatedInfo: Partial<typeof COURSE_INFO>) => void;
  onSwitchToLiveEditor?: () => void;
  onLoginAsStudent?: (student: StudentProfile) => void;
}

export const AdminPortalView: React.FC<Props> = ({
  admin,
  modules,
  announcements,
  courseInfo,
  onLogout,
  onSwitchToStudent,
  onSwitchToFaculty,
  onSwitchToLiveEditor,
  onLoginAsStudent,
  onUpdateLesson,
  onAddLesson,
  onDeleteLesson,
  onAddModule,
  onDeleteModule,
  onAddAnnouncement,
  onDeleteAnnouncement,
  onUpdateCourseInfo,
}) => {
  const [activeTab, setActiveTab] = useState<"curriculum" | "announcements" | "students" | "settings">("curriculum");

  // Student roster state
  const [studentSearch, setStudentSearch] = useState<string>("");
  const [selectedCourseFilter, setSelectedCourseFilter] = useState<string>("all");
  const [copiedStudentId, setCopiedStudentId] = useState<string | null>(null);

  const handleDownloadCSV = () => {
    const csvContent = generateStudentCredentialsCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'NCIE_Student_Logins_and_Course_Allocation.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Downloaded Credentials CSV (${ALL_REGISTERED_STUDENTS.length} students)`);
  };

  // Selected module & lesson for Curriculum Editor
  const [selectedModuleIndex, setSelectedModuleIndex] = useState<number>(modules[0]?.moduleIndex ?? 0);
  const selectedModule = modules.find((m: CurriculumModule) => m.moduleIndex === selectedModuleIndex) || modules[0];
  const selectedLessonId_safe = selectedModule?.lessons[0]?.id || "";
  const [selectedLessonId, setSelectedLessonId] = useState<string>(selectedLessonId_safe);
  const selectedLesson = selectedModule?.lessons.find((l: LMSLesson) => l.id === selectedLessonId) || selectedModule?.lessons[0];
  const selectedModuleWeek = typeof selectedModule?.week === 'number' || typeof selectedModule?.week === 'string'
    ? selectedModule.week
    : selectedModuleIndex;

  // Search & filter state for curriculum modules
  const [curriculumSearchQuery, setCurriculumSearchQuery] = useState<string>("");
  const [curriculumTypeFilter, setCurriculumTypeFilter] = useState<string>("all");

  // Collapsible module state in sidebar
  const [collapsedModuleIds, setCollapsedModuleIds] = useState<Record<number, boolean>>({});
  const toggleModuleCollapse = (modIdx: number) => {
    setCollapsedModuleIds((prev) => ({ ...prev, [modIdx]: !prev[modIdx] }));
  };
  const handleExpandAllModules = () => {
    setCollapsedModuleIds({});
  };
  const handleCollapseAllModules = () => {
    const allCollapsed: Record<number, boolean> = {};
    modules.forEach((m) => {
      allCollapsed[m.moduleIndex] = true;
    });
    setCollapsedModuleIds(allCollapsed);
  };

  // Lesson editor sub-tabs
  const [lessonEditorSubTab, setLessonEditorSubTab] = useState<"content" | "reading" | "pedagogy" | "resources" | "quiz">("content");

  // Editable lesson form state
  const [lessonFormTitle, setLessonFormTitle] = useState<string>(selectedLesson?.title || "");
  const [lessonFormDuration, setLessonFormDuration] = useState<string>(selectedLesson?.duration || "");
  const [lessonFormContentType, setLessonFormContentType] = useState<string>(selectedLesson?.contentType || "video");
  const [lessonFormYoutubeId, setLessonFormYoutubeId] = useState<string>(selectedLesson?.youtubeId || "");
  const [lessonFormSummary, setLessonFormSummary] = useState<string>(selectedLesson?.summary || "");
  const [lessonFormObjectives, setLessonFormObjectives] = useState<string[]>(selectedLesson?.objectives ? [...selectedLesson.objectives] : []);
  const [lessonFormTakeaways, setLessonFormTakeaways] = useState<string[]>(selectedLesson?.takeaways ? [...selectedLesson.takeaways] : []);
  const [lessonFormResources, setLessonFormResources] = useState<ResourceAttachment[]>(selectedLesson?.resources ? [...selectedLesson.resources] : []);
  const [lessonFormReadingOverview, setLessonFormReadingOverview] = useState<string>(selectedLesson?.readingContent?.overview || "");
  const [lessonFormActionLinkText, setLessonFormActionLinkText] = useState<string>(selectedLesson?.readingContent?.actionLinkText || "");
  const [lessonFormActionLinkUrl, setLessonFormActionLinkUrl] = useState<string>(selectedLesson?.readingContent?.actionLinkUrl || "");
  const [lessonFormReadingSections, setLessonFormReadingSections] = useState<{ heading: string; body: string }[]>(
    selectedLesson?.readingContent?.sections ? [...selectedLesson.readingContent.sections] : []
  );
  const [lessonFormQuizQuestions, setLessonFormQuizQuestions] = useState<QuizQuestion[]>(
    selectedLesson?.quiz ? [...selectedLesson.quiz] : []
  );

  // Update form fields when selected lesson changes
  const handleSelectLesson = (lesson: LMSLesson, moduleIdx: number) => {
    setSelectedModuleIndex(moduleIdx);
    setSelectedLessonId(lesson.id);
    setLessonFormTitle(lesson.title);
    setLessonFormDuration(lesson.duration);
    setLessonFormContentType(lesson.contentType || "video");
    setLessonFormYoutubeId(lesson.youtubeId || "");
    setLessonFormSummary(lesson.summary || "");
    setLessonFormObjectives(lesson.objectives ? [...lesson.objectives] : []);
    setLessonFormTakeaways(lesson.takeaways ? [...lesson.takeaways] : []);
    setLessonFormResources(lesson.resources ? [...lesson.resources] : []);
    setLessonFormReadingOverview(lesson.readingContent?.overview || "");
    setLessonFormActionLinkText(lesson.readingContent?.actionLinkText || "");
    setLessonFormActionLinkUrl(lesson.readingContent?.actionLinkUrl || "");
    setLessonFormReadingSections(lesson.readingContent?.sections ? [...lesson.readingContent.sections] : []);
    setLessonFormQuizQuestions(lesson.quiz ? [...lesson.quiz] : []);
  };

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Save lesson edit
  const handleSaveLesson = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!selectedLesson) return;

    onUpdateLesson(selectedModuleIndex, selectedLesson.id, {
      title: lessonFormTitle,
      duration: lessonFormDuration,
      contentType: lessonFormContentType as any,
      youtubeId: lessonFormContentType === "video" ? lessonFormYoutubeId : undefined,
      summary: lessonFormSummary,
      objectives: lessonFormObjectives.filter((o) => o.trim().length > 0),
      takeaways: lessonFormTakeaways.filter((t) => t.trim().length > 0),
      resources: lessonFormResources,
      readingContent: (lessonFormContentType === "reading" || lessonFormContentType === "transcript" || lessonFormContentType === "book" || lessonFormReadingOverview || lessonFormReadingSections.length > 0) ? {
        overview: lessonFormReadingOverview || lessonFormSummary,
        actionLinkText: lessonFormActionLinkText || "Access Official Reference",
        actionLinkUrl: lessonFormActionLinkUrl || "#",
        sections: lessonFormReadingSections,
      } : undefined,
      quiz: lessonFormContentType === "quiz" ? lessonFormQuizQuestions : undefined,
    });

    showToast(`Saved changes for: "${lessonFormTitle}"`);
  };

  // Duplicate lesson
  const handleDuplicateLesson = () => {
    if (!selectedLesson) return;
    const duplicated: LMSLesson = {
      ...selectedLesson,
      id: `les-${selectedModuleIndex}-${Date.now().toString().slice(-4)}`,
      title: `${lessonFormTitle} (Copy)`,
      duration: lessonFormDuration,
      contentType: lessonFormContentType as any,
      youtubeId: lessonFormYoutubeId,
      summary: lessonFormSummary,
      objectives: [...lessonFormObjectives],
      takeaways: [...lessonFormTakeaways],
      resources: [...lessonFormResources],
      readingContent: selectedLesson.readingContent ? { ...selectedLesson.readingContent } : undefined,
      quiz: selectedLesson.quiz ? [...selectedLesson.quiz] : undefined,
    };
    onAddLesson(selectedModuleIndex, duplicated);
    handleSelectLesson(duplicated, selectedModuleIndex);
    showToast(`Duplicated lesson: "${duplicated.title}"`);
  };

  // Objectives helpers
  const handleAddObjective = () => {
    setLessonFormObjectives([...lessonFormObjectives, ""]);
  };
  const handleRemoveObjective = (idx: number) => {
    setLessonFormObjectives(lessonFormObjectives.filter((_, i) => i !== idx));
  };
  const handleUpdateObjective = (idx: number, val: string) => {
    const updated = [...lessonFormObjectives];
    updated[idx] = val;
    setLessonFormObjectives(updated);
  };

  // Takeaways helpers
  const handleAddTakeaway = () => {
    setLessonFormTakeaways([...lessonFormTakeaways, ""]);
  };
  const handleRemoveTakeaway = (idx: number) => {
    setLessonFormTakeaways(lessonFormTakeaways.filter((_, i) => i !== idx));
  };
  const handleUpdateTakeaway = (idx: number, val: string) => {
    const updated = [...lessonFormTakeaways];
    updated[idx] = val;
    setLessonFormTakeaways(updated);
  };

  // Reading sections helpers
  const handleAddReadingSection = () => {
    setLessonFormReadingSections([
      ...lessonFormReadingSections,
      { heading: `Section ${lessonFormReadingSections.length + 1}: `, body: "" }
    ]);
  };
  const handleRemoveReadingSection = (idx: number) => {
    setLessonFormReadingSections(lessonFormReadingSections.filter((_, i) => i !== idx));
  };
  const handleUpdateReadingSection = (idx: number, field: "heading" | "body", val: string) => {
    const updated = [...lessonFormReadingSections];
    updated[idx] = { ...updated[idx], [field]: val };
    setLessonFormReadingSections(updated);
  };

  // Resource attachments helpers
  const handleAddResource = () => {
    setLessonFormResources([
      ...lessonFormResources,
      { title: "New Resource Document (PDF)", type: "pdf", url: "#", size: "1.5 MB" }
    ]);
  };
  const handleRemoveResource = (idx: number) => {
    setLessonFormResources(lessonFormResources.filter((_, i) => i !== idx));
  };
  const handleUpdateResource = (idx: number, field: keyof ResourceAttachment, val: string) => {
    const updated = [...lessonFormResources];
    updated[idx] = { ...updated[idx], [field]: val };
    setLessonFormResources(updated);
  };

  // Quiz questions helpers
  const handleAddQuizQuestion = () => {
    const newQ: QuizQuestion = {
      id: `q-${Date.now().toString().slice(-5)}`,
      question: `Question ${lessonFormQuizQuestions.length + 1}: `,
      options: [
        "Option A - Primary framework or thesis",
        "Option B - Alternative operational metric",
        "Option C - Counter-indicator or negative test",
        "Option D - Non-applicable external benchmark"
      ],
      correctIndex: 0,
      explanation: "Official explanation aligned with the NCIE entrepreneurship pedagogy."
    };
    setLessonFormQuizQuestions([...lessonFormQuizQuestions, newQ]);
  };

  const handleRemoveQuizQuestion = (qIdx: number) => {
    setLessonFormQuizQuestions(lessonFormQuizQuestions.filter((_, idx) => idx !== qIdx));
  };

  const handleUpdateQuizQuestionText = (qIdx: number, text: string) => {
    const updated = [...lessonFormQuizQuestions];
    updated[qIdx] = { ...updated[qIdx], question: text };
    setLessonFormQuizQuestions(updated);
  };

  const handleUpdateQuizQuestionOption = (qIdx: number, optIdx: number, text: string) => {
    const updated = [...lessonFormQuizQuestions];
    const newOptions = [...updated[qIdx].options];
    newOptions[optIdx] = text;
    updated[qIdx] = { ...updated[qIdx], options: newOptions };
    setLessonFormQuizQuestions(updated);
  };

  const handleSelectQuizCorrectOption = (qIdx: number, optIdx: number) => {
    const updated = [...lessonFormQuizQuestions];
    updated[qIdx] = { ...updated[qIdx], correctIndex: optIdx };
    setLessonFormQuizQuestions(updated);
  };

  const handleUpdateQuizQuestionExplanation = (qIdx: number, text: string) => {
    const updated = [...lessonFormQuizQuestions];
    updated[qIdx] = { ...updated[qIdx], explanation: text };
    setLessonFormQuizQuestions(updated);
  };

  const handleLoadSampleQuiz = () => {
    const sampleQuestions: QuizQuestion[] = [
      {
        id: `q-${Date.now()}-1`,
        question: "Which indicator best validates product-market fit before institutional funding?",
        options: [
          "Consistent cohort retention and organic referral velocity",
          "Total top-line gross merchandise value without margin consideration",
          "Number of vanity social media impressions",
          "Initial patent filing without customer discovery"
        ],
        correctIndex: 0,
        explanation: "Cohort retention demonstrates that users derive repeated, authentic value from the solution."
      },
      {
        id: `q-${Date.now()}-2`,
        question: "What is the recommended benchmark for Burn Multiple in early-stage capital stewardship?",
        options: [
          "Burn multiple less than 1.5x of net new ARR",
          "Burn multiple exceeding 4.0x of net new ARR",
          "Zero cash burn regardless of initial development stage",
          "Burn multiple equal to equity dilution percentage"
        ],
        correctIndex: 0,
        explanation: "A burn multiple below 1.5x signifies efficient capital utilization during market expansion."
      }
    ];
    setLessonFormQuizQuestions([...lessonFormQuizQuestions, ...sampleQuestions]);
    showToast("Added sample NCIE assessment questions");
  };

  // Video lecture preview & quick presets state
  const [showVideoPlayerPreview, setShowVideoPlayerPreview] = useState<boolean>(false);

  // Reading view mode state
  const [readingViewMode, setReadingViewMode] = useState<"edit" | "preview">("edit");

  // Quick preset helpers for Reading sections
  const handleAddReadingSectionPreset = (title: string, bodyText: string) => {
    setLessonFormReadingSections([
      ...lessonFormReadingSections,
      { heading: title, body: bodyText }
    ]);
    showToast(`Added section: ${title}`);
  };

  // Quick preset helpers for Pedagogy
  const handleLoadPedagogyObjectives = () => {
    const standardObjectives = [
      "Analyze market validation data using evidence-based startup methodologies",
      "Structure sustainable unit economics and bottoms-up financial projections",
      "Synthesize regulatory compliance frameworks under AICTE & Startup India policies"
    ];
    setLessonFormObjectives([...new Set([...lessonFormObjectives, ...standardObjectives])]);
    showToast("Loaded AICTE standard learning objectives");
  };

  const handleLoadPedagogyTakeaways = () => {
    const standardTakeaways = [
      "Validate product-market fit through customer problem interviews before capital deployment",
      "Maintain strict financial governance with burn multiple under 1.5x",
      "Leverage institutional incubation facilities and national mentoring networks"
    ];
    setLessonFormTakeaways([...new Set([...lessonFormTakeaways, ...standardTakeaways])]);
    showToast("Loaded core rules of thumb");
  };

  // Quick preset helpers for Resources
  const handleAddPresetResource = (title: string, type: "pdf" | "template" | "doc" | "link", size: string) => {
    setLessonFormResources([
      ...lessonFormResources,
      { title, type, url: "#", size }
    ]);
    showToast(`Attached: ${title}`);
  };

  // Module creation modal / state
  const [showAddModuleModal, setShowAddModuleModal] = useState<boolean>(false);
  const [newModuleWeek, setNewModuleWeek] = useState<string>(`Week ${modules.length}`);
  const [newModuleTitle, setNewModuleTitle] = useState<string>("");
  const [newModuleTheme, setNewModuleTheme] = useState<string>("National Innovation & Entrepreneurship");
  const [newModuleSubtitle, setNewModuleSubtitle] = useState<string>("Academic Masterclass & Applied Governance");

  const handleCreateModule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newModuleTitle.trim()) return;

    const nextIndex = Math.max(...modules.map((m) => m.moduleIndex), 0) + 1;
    const newMod: CurriculumModule = {
      id: `mod-${nextIndex}-${Date.now().toString().slice(-4)}`,
      moduleIndex: nextIndex,
      week: newModuleWeek.trim() || `Week ${nextIndex}`,
      title: newModuleTitle.trim(),
      theme: newModuleTheme.trim() || "National Innovation & Entrepreneurship",
      subtitle: newModuleSubtitle.trim() || "Academic Masterclass & Applied Governance",
      lessons: []
    };

    if (onAddModule) {
      onAddModule(newMod);
    }
    setShowAddModuleModal(false);
    setNewModuleTitle("");
    setSelectedModuleIndex(nextIndex);
    showToast(`Created Module: "${newMod.title}"`);
  };

  // Add new lesson modal / state
  const [showAddLessonModal, setShowAddLessonModal] = useState<boolean>(false);
  const [newLessonTitle, setNewLessonTitle] = useState<string>("");
  const [newLessonContentType, setNewLessonContentType] = useState<string>("video");
  const [newLessonDuration, setNewLessonDuration] = useState<string>("15:00");
  const [newLessonYoutubeId, setNewLessonYoutubeId] = useState<string>("dQw4w9WgXcQ");
  const [newLessonSummary, setNewLessonSummary] = useState<string>("");

  const handleCreateLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLessonTitle.trim()) return;

    const newId = `les-${selectedModuleIndex}-${Date.now().toString().slice(-4)}`;
    const lesson: LMSLesson = {
      id: newId,
      moduleIndex: selectedModuleIndex,
      lessonIndex: (selectedModule?.lessons.length || 0) + 1,
      weekNumber: typeof selectedModule?.week === 'number' ? selectedModule.week : selectedModuleIndex,
      title: newLessonTitle.trim(),
      duration: newLessonDuration || "15:00",
      durationMinutes: 15,
      contentType: newLessonContentType as any,
      youtubeId: newLessonContentType === "video" ? newLessonYoutubeId : undefined,
      summary: newLessonSummary || `Comprehensive lesson module covering ${newLessonTitle}.`,
      objectives: ["Analyze core methodology", "Apply practical frameworks in startup design"],
      takeaways: ["Practical understanding of curriculum concepts"],
      resources: [],
    };

    onAddLesson(selectedModuleIndex, lesson);
    setShowAddLessonModal(false);
    setNewLessonTitle("");
    setNewLessonSummary("");
    handleSelectLesson(lesson, selectedModuleIndex);
    showToast(`Added new lesson to ${selectedModule?.title || 'Module'}`);
  };

  // Delete lesson
  const handleDeleteCurrentLesson = () => {
    if (!selectedLesson) return;
    if (window.confirm(`Are you sure you want to delete "${selectedLesson.title}"?`)) {
      onDeleteLesson(selectedModuleIndex, selectedLesson.id);
      showToast(`Deleted lesson from ${selectedModule?.title || 'Module'}`);
    }
  };

  // New announcement form state
  const [newAnnTitle, setNewAnnTitle] = useState<string>("");
  const [newAnnCategory, setNewAnnCategory] = useState<"Important" | "Assignment" | "Exam" | "General">("Important");
  const [newAnnContent, setNewAnnContent] = useState<string>("");
  const [newAnnActionLabel, setNewAnnActionLabel] = useState<string>("View Guidelines");
  const [newAnnActionUrl, setNewAnnActionUrl] = useState<string>("#");

  const handlePublishAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnTitle.trim() || !newAnnContent.trim()) return;

    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

    const newAnn: Announcement = {
      id: `ann-${Date.now()}`,
      title: newAnnTitle.trim(),
      date: formattedDate,
      relativeTime: "Just now",
      author: admin.name || "NCIE CMS Desk",
      category: newAnnCategory,
      refNumber: `NCIE/NOT-${Date.now().toString().slice(-6)}`,
      isPinned: newAnnCategory === "Important",
      content: newAnnContent.trim(),
      actionBtn: newAnnActionLabel ? { 
        label: newAnnActionLabel, 
        actionType: "tab",
        target: newAnnActionUrl || "#" 
      } : undefined,
    };

    onAddAnnouncement(newAnn);
    setNewAnnTitle("");
    setNewAnnContent("");
    showToast(`Published announcement: "${newAnn.title}"`);
  };

  // Course info form state
  const [courseTitleInput, setCourseTitleInput] = useState(courseInfo.title);
  const [courseDurationInput, setCourseDurationInput] = useState(courseInfo.duration);
  const [courseCreditsInput, setCourseCreditsInput] = useState(courseInfo.creditEquivalency);
  const [courseCoordinatingInput, setCourseCoordinatingInput] = useState(courseInfo.coordinatingInstitute);

  const handleSaveCourseSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateCourseInfo({
      title: courseTitleInput,
      duration: courseDurationInput,
      creditEquivalency: courseCreditsInput,
      coordinatingInstitute: courseCoordinatingInput,
    });
    showToast("Updated course settings");
  };

  const totalLessonsCount = modules.reduce((acc, m) => acc + m.lessons.length, 0);

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', display: 'flex', flexDirection: 'column' }}>
      {/* Official Top Bar */}
      <div style={{ background: '#0F172A', color: '#CBD5E1', fontSize: '0.72rem', padding: '6px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Shield style={{ width: '13px', height: '13px', color: '#38BDF8' }} />
          <span style={{ fontWeight: 600, color: '#F1F5F9' }}>NCIE Central Administration & CMS</span>
          <span style={{ color: '#475569' }}>|</span>
          <span>Viksit Bharat @2047 Academic Governance</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span>Administrator: <strong style={{ color: '#F8FAFC' }}>{admin.name}</strong></span>
          <span style={{ color: '#475569' }}>|</span>
          <span style={{ color: '#38BDF8', fontWeight: 600 }}>{admin.adminId}</span>
        </div>
      </div>

      {/* Main Admin Header */}
      <header style={{ background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <img 
            src="/logo-new.png" 
            alt="NCIE India" 
            style={{ height: '38px', width: 'auto', objectFit: 'contain' }} 
          />
          <div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A' }}>
              National Council for Innovation & Entrepreneurship
            </div>
            <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
              Content Management System (CMS) & Course Coordinator Desk
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {onSwitchToLiveEditor && (
            <button
              type="button"
              onClick={onSwitchToLiveEditor}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#FFFFFF',
                background: '#1D4ED8',
                border: '1px solid #1E40AF',
                borderRadius: '6px',
                cursor: 'pointer',
                boxShadow: '0 1px 3px rgba(29, 78, 216, 0.25)'
              }}
              title="Open classroom in live visual in-place editing mode"
            >
              <Sparkles style={{ width: '13px', height: '13px' }} />
              <span>Live Visual Editor</span>
            </button>
          )}

          <button
            type="button"
            onClick={onSwitchToStudent}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: '#1D4ED8',
              background: '#EFF6FF',
              border: '1px solid #BFDBFE',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            <GraduationCap style={{ width: '14px', height: '14px' }} />
            <span>Student View</span>
          </button>

          <button
            type="button"
            onClick={onSwitchToFaculty}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: '#047857',
              background: '#ECFDF5',
              border: '1px solid #A7F3D0',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            <Building style={{ width: '14px', height: '14px' }} />
            <span>Faculty Desk</span>
          </button>

          <button
            type="button"
            onClick={onLogout}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: '#DC2626',
              background: '#FEF2F2',
              border: '1px solid #FECACA',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            <LogOut style={{ width: '14px', height: '14px' }} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Navigation Sub-header Tabs */}
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '0 24px', display: 'flex', gap: '4px' }}>
        <button
          type="button"
          onClick={() => setActiveTab("curriculum")}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 16px',
            fontSize: '0.82rem',
            fontWeight: 600,
            color: activeTab === "curriculum" ? '#1D4ED8' : '#64748B',
            borderBottom: activeTab === "curriculum" ? '2px solid #1D4ED8' : '2px solid transparent',
            background: 'none',
            borderTop: 'none',
            borderLeft: 'none',
            borderRight: 'none',
            cursor: 'pointer'
          }}
        >
          <BookOpen style={{ width: '15px', height: '15px' }} />
          <span>Curriculum & Lessons ({totalLessonsCount})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("announcements")}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 16px',
            fontSize: '0.82rem',
            fontWeight: 600,
            color: activeTab === "announcements" ? '#1D4ED8' : '#64748B',
            borderBottom: activeTab === "announcements" ? '2px solid #1D4ED8' : '2px solid transparent',
            background: 'none',
            borderTop: 'none',
            borderLeft: 'none',
            borderRight: 'none',
            cursor: 'pointer'
          }}
        >
          <Bell style={{ width: '15px', height: '15px' }} />
          <span>Announcements ({announcements.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("students")}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 16px',
            fontSize: '0.82rem',
            fontWeight: 600,
            color: activeTab === "students" ? '#1D4ED8' : '#64748B',
            borderBottom: activeTab === "students" ? '2px solid #1D4ED8' : '2px solid transparent',
            background: 'none',
            borderTop: 'none',
            borderLeft: 'none',
            borderRight: 'none',
            cursor: 'pointer'
          }}
        >
          <GraduationCap style={{ width: '15px', height: '15px' }} />
          <span>Student Logins & Rosters</span>
          <span style={{ background: activeTab === "students" ? '#DBEAFE' : '#F1F5F9', color: activeTab === "students" ? '#1E40AF' : '#64748B', fontSize: '0.68rem', fontWeight: 700, padding: '1px 6px', borderRadius: '10px' }}>
            {ALL_REGISTERED_STUDENTS.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("settings")}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 16px',
            fontSize: '0.82rem',
            fontWeight: 600,
            color: activeTab === "settings" ? '#1D4ED8' : '#64748B',
            borderBottom: activeTab === "settings" ? '2px solid #1D4ED8' : '2px solid transparent',
            background: 'none',
            borderTop: 'none',
            borderLeft: 'none',
            borderRight: 'none',
            cursor: 'pointer'
          }}
        >
          <Settings style={{ width: '15px', height: '15px' }} />
          <span>Course Settings</span>
        </button>
      </div>

      {/* Main Workspace Body */}
      <main style={{ flex: 1, padding: '24px', maxWidth: '1440px', width: '100%', margin: '0 auto' }}>
        {/* Sleek Administrative Metrics Bar */}
        <div style={{ 
          background: '#FFFFFF', 
          border: '1px solid #E2E8F0', 
          borderRadius: '8px', 
          padding: '10px 18px', 
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2563EB' }} />
              <span style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: 600 }}>Modules:</span>
              <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0F172A' }}>{modules.length} Modules</span>
              <span style={{ fontSize: '0.7rem', color: '#1D4ED8', background: '#EFF6FF', padding: '1px 6px', borderRadius: '10px', border: '1px solid #BFDBFE' }}>Orientation - Week 8</span>
            </div>

            <div style={{ height: '16px', width: '1px', background: '#E2E8F0' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#059669' }} />
              <span style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: 600 }}>Curriculum Units:</span>
              <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0F172A' }}>{totalLessonsCount} Lessons</span>
              <span style={{ fontSize: '0.7rem', color: '#059669', background: '#ECFDF5', padding: '1px 6px', borderRadius: '10px', border: '1px solid #A7F3D0' }}>Active & Live</span>
            </div>

            <div style={{ height: '16px', width: '1px', background: '#E2E8F0' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#D97706' }} />
              <span style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: 600 }}>Notices:</span>
              <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0F172A' }}>{announcements.length} Published</span>
              <span style={{ fontSize: '0.7rem', color: '#D97706', background: '#FFFBEB', padding: '1px 6px', borderRadius: '10px', border: '1px solid #FDE68A' }}>Circulars</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}>CMS Engine v2.4</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', fontWeight: 600, color: '#047857', background: '#ECFDF5', padding: '2px 8px', borderRadius: '12px', border: '1px solid #A7F3D0' }}>
              <CheckCircle2 style={{ width: '11px', height: '11px' }} />
              Live Online
            </span>
          </div>
        </div>

        {/* TAB 1: Curriculum & Content Manager */}
        {activeTab === "curriculum" && (
          <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '20px', alignItems: 'start' }}>
            {/* Left Column: Modules & Lessons Tree with Search */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ padding: '10px 14px', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A' }}>Modules & Units</span>
                <div style={{ display: 'flex', gap: '5px' }}>
                  <button
                    type="button"
                    onClick={() => setShowAddModuleModal(true)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 8px',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      color: '#334155',
                      background: '#FFFFFF',
                      border: '1px solid #CBD5E1',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                    title="Create a new module / week"
                  >
                    <FolderPlus style={{ width: '11px', height: '11px' }} />
                    <span>+ Module</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowAddLessonModal(true)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 8px',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      background: '#1D4ED8',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                    title="Add a lesson unit to the selected module"
                  >
                    <Plus style={{ width: '11px', height: '11px' }} />
                    <span>+ Lesson</span>
                  </button>
                </div>
              </div>

              {/* Search & Filter Toolbar */}
              <div style={{ padding: '8px 12px', borderBottom: '1px solid #F1F5F9', background: '#FFFFFF' }}>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <Search style={{ position: 'absolute', left: '8px', width: '13px', height: '13px', color: '#94A3B8' }} />
                  <input
                    type="text"
                    placeholder="Search lessons or topics..."
                    value={curriculumSearchQuery}
                    onChange={(e) => setCurriculumSearchQuery(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '5px 8px 5px 26px',
                      fontSize: '0.74rem',
                      border: '1px solid #E2E8F0',
                      borderRadius: '4px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
                  {[
                    { id: "all", label: "All" },
                    { id: "video", label: "Videos" },
                    { id: "reading", label: "Readings" },
                    { id: "quiz", label: "Quizzes" }
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      type="button"
                      onClick={() => setCurriculumTypeFilter(filter.id)}
                      style={{
                        flex: 1,
                        padding: '3px 0',
                        fontSize: '0.68rem',
                        fontWeight: curriculumTypeFilter === filter.id ? 600 : 500,
                        color: curriculumTypeFilter === filter.id ? '#1D4ED8' : '#64748B',
                        background: curriculumTypeFilter === filter.id ? '#EFF6FF' : '#F8FAFC',
                        border: curriculumTypeFilter === filter.id ? '1px solid #BFDBFE' : '1px solid #E2E8F0',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.68rem', color: '#64748B', paddingTop: '4px', borderTop: '1px solid #F1F5F9' }}>
                  <span>Modules Navigation</span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={handleExpandAllModules}
                      style={{ background: 'none', border: 'none', color: '#1D4ED8', fontSize: '0.68rem', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}
                    >
                      Expand All
                    </button>
                    <span>|</span>
                    <button
                      type="button"
                      onClick={handleCollapseAllModules}
                      style={{ background: 'none', border: 'none', color: '#64748B', fontSize: '0.68rem', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}
                    >
                      Collapse All
                    </button>
                  </div>
                </div>
              </div>

              <div style={{ maxHeight: 'calc(100vh - 340px)', overflowY: 'auto' }}>
                {modules.map((m: CurriculumModule) => {
                  const isCollapsed = !!collapsedModuleIds[m.moduleIndex];
                  const filteredLessons = m.lessons.filter((les: LMSLesson) => {
                    const matchesSearch = !curriculumSearchQuery.trim() || 
                      les.title.toLowerCase().includes(curriculumSearchQuery.toLowerCase()) ||
                      m.title.toLowerCase().includes(curriculumSearchQuery.toLowerCase());
                    const matchesType = curriculumTypeFilter === "all" || 
                      (curriculumTypeFilter === "reading" && (les.contentType === "reading" || les.contentType === "transcript" || les.contentType === "book")) ||
                      les.contentType === curriculumTypeFilter;
                    return matchesSearch && matchesType;
                  });

                  if (filteredLessons.length === 0 && curriculumSearchQuery.trim()) return null;

                  return (
                    <div key={m.id || m.moduleIndex} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <div 
                        onClick={() => toggleModuleCollapse(m.moduleIndex)}
                        style={{ 
                          padding: '8px 12px', 
                          background: isCollapsed ? '#F8FAFC' : '#F1F5F9', 
                          fontSize: '0.74rem', 
                          fontWeight: 600, 
                          color: '#334155', 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center',
                          cursor: 'pointer',
                          userSelect: 'none',
                          borderBottom: isCollapsed ? 'none' : '1px solid #E2E8F0'
                        }}
                        title="Click to expand / collapse module"
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflow: 'hidden', flex: 1, marginRight: '6px' }}>
                          {isCollapsed ? (
                            <ChevronRight style={{ width: '13px', height: '13px', color: '#64748B', flexShrink: 0 }} />
                          ) : (
                            <ChevronDown style={{ width: '13px', height: '13px', color: '#1D4ED8', flexShrink: 0 }} />
                          )}
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={m.title}>
                            {m.title}
                          </span>
                        </div>
                        <span style={{ 
                          color: isCollapsed ? '#64748B' : '#1D4ED8', 
                          fontSize: '0.66rem', 
                          background: isCollapsed ? '#E2E8F0' : '#EFF6FF',
                          border: isCollapsed ? '1px solid #CBD5E1' : '1px solid #BFDBFE',
                          padding: '1px 6px',
                          borderRadius: '10px',
                          fontWeight: 600,
                          flexShrink: 0
                        }}>
                          {filteredLessons.length}
                        </span>
                      </div>

                      {!isCollapsed && (
                        <div>
                        {filteredLessons.map((les: LMSLesson) => {
                          const isSelected = les.id === selectedLessonId;
                          return (
                            <button
                              key={les.id}
                              type="button"
                              onClick={() => handleSelectLesson(les, m.moduleIndex)}
                              style={{
                                width: '100%',
                                padding: '8px 14px 8px 20px',
                                textAlign: 'left',
                                background: isSelected ? '#EFF6FF' : 'transparent',
                                borderLeft: isSelected ? '3px solid #1D4ED8' : '3px solid transparent',
                                borderTop: 'none',
                                borderRight: 'none',
                                borderBottom: '1px solid #F8FAFC',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                                {les.contentType === "video" ? (
                                  <Video style={{ width: '13px', height: '13px', color: isSelected ? '#1D4ED8' : '#64748B', flexShrink: 0 }} />
                                ) : les.contentType === "quiz" ? (
                                  <Layers style={{ width: '13px', height: '13px', color: isSelected ? '#1D4ED8' : '#64748B', flexShrink: 0 }} />
                                ) : (
                                  <FileText style={{ width: '13px', height: '13px', color: isSelected ? '#1D4ED8' : '#64748B', flexShrink: 0 }} />
                                )}
                                <span style={{ fontSize: '0.76rem', color: isSelected ? '#1D4ED8' : '#334155', fontWeight: isSelected ? 600 : 400, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                  {les.title}
                                </span>
                              </div>
                              <span style={{ fontSize: '0.68rem', color: '#94A3B8', flexShrink: 0, marginLeft: '6px' }}>
                                {les.duration}
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

            {/* Right Column: Live Enhanced Lesson Content Editor */}
            {selectedLesson ? (
              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '20px' }}>
                {/* Editor Header Bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '14px', borderBottom: '1px solid #E2E8F0', marginBottom: '14px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600 }}>
                        Curriculum
                      </span>
                      <span style={{ color: '#CBD5E1', fontSize: '0.72rem' }}>/</span>
                      <span style={{ fontSize: '0.72rem', color: '#1D4ED8', fontWeight: 600 }}>
                        {typeof selectedModuleWeek === 'string' && selectedModuleWeek.toLowerCase() === 'about'
                          ? 'Course Overview & Orientation'
                          : `Week ${selectedModuleWeek} Curriculum`}
                      </span>
                      <span style={{ color: '#CBD5E1', fontSize: '0.72rem' }}>/</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.68rem', fontWeight: 600, color: '#047857', background: '#ECFDF5', padding: '1px 7px', borderRadius: '10px', border: '1px solid #A7F3D0' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }} />
                        Live Unit
                      </span>
                    </div>
                    <div style={{ fontSize: '1.08rem', fontWeight: 700, color: '#0F172A' }}>
                      {selectedLesson.title}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button
                      type="button"
                      onClick={() => handleSaveLesson()}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        padding: '6px 14px',
                        fontSize: '0.74rem',
                        fontWeight: 600,
                        color: '#FFFFFF',
                        background: '#1D4ED8',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                      }}
                      title="Save all changes to this curriculum unit"
                    >
                      <Save style={{ width: '13px', height: '13px' }} />
                      <span>Save Changes</span>
                    </button>

                    <button
                      type="button"
                      onClick={onSwitchToStudent}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        padding: '6px 12px',
                        fontSize: '0.74rem',
                        fontWeight: 600,
                        color: '#1D4ED8',
                        background: '#EFF6FF',
                        border: '1px solid #BFDBFE',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                      title="View how students experience this lesson"
                    >
                      <ExternalLink style={{ width: '13px', height: '13px' }} />
                      <span>Preview in Classroom</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleDuplicateLesson}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        padding: '6px 12px',
                        fontSize: '0.74rem',
                        fontWeight: 600,
                        color: '#334155',
                        background: '#F8FAFC',
                        border: '1px solid #CBD5E1',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                      title="Duplicate this lesson structure"
                    >
                      <Copy style={{ width: '13px', height: '13px' }} />
                      <span>Duplicate</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleDeleteCurrentLesson}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        padding: '6px 12px',
                        fontSize: '0.74rem',
                        fontWeight: 600,
                        color: '#DC2626',
                        background: '#FEF2F2',
                        border: '1px solid #FECACA',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      <Trash2 style={{ width: '13px', height: '13px' }} />
                      <span>Delete Lesson</span>
                    </button>
                  </div>
                </div>

                {/* Sub-Tabs Navigation for Comprehensive Content Options */}
                <div style={{ 
                  display: 'flex', 
                  gap: '6px', 
                  background: '#F1F5F9', 
                  padding: '4px', 
                  borderRadius: '8px', 
                  marginBottom: '18px',
                  overflowX: 'auto'
                }}>
                  {[
                    { id: "content", label: "General & Media", icon: FileText, count: null },
                    { id: "reading", label: "Reading Material", icon: BookMarked, count: lessonFormReadingSections.length },
                    { id: "pedagogy", label: "Outcomes & Pedagogy", icon: ListPlus, count: lessonFormObjectives.length + lessonFormTakeaways.length },
                    { id: "resources", label: "Resource Attachments", icon: Paperclip, count: lessonFormResources.length },
                    { id: "quiz", label: "Assessment & Quiz", icon: HelpCircle, count: lessonFormQuizQuestions.length },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = lessonEditorSubTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setLessonEditorSubTab(tab.id as any)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '7px 12px',
                          fontSize: '0.75rem',
                          fontWeight: isActive ? 600 : 500,
                          color: isActive ? '#1D4ED8' : '#64748B',
                          background: isActive ? '#FFFFFF' : 'transparent',
                          border: isActive ? '1px solid #BFDBFE' : '1px solid transparent',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                          boxShadow: isActive ? '0 1px 2px rgba(0,0,0,0.04)' : 'none',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <Icon style={{ width: '13px', height: '13px', color: isActive ? '#1D4ED8' : '#64748B' }} />
                        <span>{tab.label}</span>
                        {tab.count !== null && (
                          <span style={{
                            fontSize: '0.66rem',
                            padding: '1px 6px',
                            borderRadius: '10px',
                            fontWeight: 600,
                            background: isActive ? '#EFF6FF' : '#E2E8F0',
                            color: isActive ? '#1D4ED8' : '#475569'
                          }}>
                            {tab.count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <form onSubmit={handleSaveLesson}>
                  {/* SUB-TAB 1: General & Media */}
                  {lessonEditorSubTab === "content" && (
                    <div>
                      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                            Lesson Title
                          </label>
                          <input
                            type="text"
                            value={lessonFormTitle}
                            onChange={(e) => setLessonFormTitle(e.target.value)}
                            required
                            style={{
                              width: '100%',
                              padding: '8px 10px',
                              fontSize: '0.8rem',
                              border: '1px solid #CBD5E1',
                              borderRadius: '6px',
                              outline: 'none',
                              boxSizing: 'border-box'
                            }}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                            Content Classification
                          </label>
                          <select
                            value={lessonFormContentType}
                            onChange={(e) => setLessonFormContentType(e.target.value)}
                            style={{
                              width: '100%',
                              padding: '8px 10px',
                              fontSize: '0.8rem',
                              border: '1px solid #CBD5E1',
                              borderRadius: '6px',
                              outline: 'none',
                              background: '#FFFFFF',
                              boxSizing: 'border-box'
                            }}
                          >
                            <option value="video">Video Lecture</option>
                            <option value="reading">Reading Document</option>
                            <option value="quiz">Assignment / Quiz</option>
                            <option value="transcript">Official Transcript & Notes</option>
                            <option value="book">Reference Book / Handout</option>
                            <option value="download">Downloadable Template</option>
                          </select>
                        </div>

                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#334155' }}>
                              Duration & Time
                            </label>
                          </div>
                          <input
                            type="text"
                            value={lessonFormDuration}
                            onChange={(e) => setLessonFormDuration(e.target.value)}
                            placeholder="e.g. 15 mins"
                            style={{
                              width: '100%',
                              padding: '8px 10px',
                              fontSize: '0.8rem',
                              border: '1px solid #CBD5E1',
                              borderRadius: '6px',
                              outline: 'none',
                              boxSizing: 'border-box'
                            }}
                          />
                          <div style={{ display: 'flex', gap: '4px', marginTop: '6px', flexWrap: 'wrap' }}>
                            {["10 mins", "15 mins", "20 mins", "30 mins", "45 mins", "60 mins"].map((d) => (
                              <button
                                key={d}
                                type="button"
                                onClick={() => setLessonFormDuration(d)}
                                style={{
                                  padding: '2px 5px',
                                  fontSize: '0.66rem',
                                  fontWeight: lessonFormDuration === d ? 600 : 400,
                                  background: lessonFormDuration === d ? '#EFF6FF' : '#F1F5F9',
                                  color: lessonFormDuration === d ? '#1D4ED8' : '#475569',
                                  border: lessonFormDuration === d ? '1px solid #BFDBFE' : '1px solid #E2E8F0',
                                  borderRadius: '3px',
                                  cursor: 'pointer'
                                }}
                              >
                                {d}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Smart Content Classification Callout */}
                      {(lessonFormContentType === "reading" || lessonFormContentType === "transcript" || lessonFormContentType === "book") && (
                        <div style={{
                          marginBottom: '14px',
                          background: '#EFF6FF',
                          border: '1px solid #BFDBFE',
                          borderRadius: '6px',
                          padding: '10px 14px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '12px'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <BookMarked style={{ width: '16px', height: '16px', color: '#1D4ED8', flexShrink: 0 }} />
                            <div style={{ fontSize: '0.74rem', color: '#1E40AF' }}>
                              <strong>Reading Document Active:</strong> Edit sections, headings, handouts, and live reading view in the Reading Material tab.
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setLessonEditorSubTab("reading")}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '4px 10px',
                              fontSize: '0.72rem',
                              fontWeight: 600,
                              color: '#FFFFFF',
                              background: '#1D4ED8',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              flexShrink: 0
                            }}
                          >
                            <span>Open Reading Tab</span>
                            <ArrowRight style={{ width: '12px', height: '12px' }} />
                          </button>
                        </div>
                      )}

                      {lessonFormContentType === "quiz" && (
                        <div style={{
                          marginBottom: '14px',
                          background: '#FAF5FF',
                          border: '1px solid #E9D5FF',
                          borderRadius: '6px',
                          padding: '10px 14px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '12px'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <HelpCircle style={{ width: '16px', height: '16px', color: '#7E22CE', flexShrink: 0 }} />
                            <div style={{ fontSize: '0.74rem', color: '#6B21A8' }}>
                              <strong>Quiz Unit Active:</strong> Configure questions, 4 options, correct answer keys, and explanations in the Assessment & Quiz tab.
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setLessonEditorSubTab("quiz")}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '4px 10px',
                              fontSize: '0.72rem',
                              fontWeight: 600,
                              color: '#FFFFFF',
                              background: '#7E22CE',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              flexShrink: 0
                            }}
                          >
                            <span>Open Quiz Builder</span>
                            <ArrowRight style={{ width: '12px', height: '12px' }} />
                          </button>
                        </div>
                      )}

                      {lessonFormContentType === "video" && (
                        <div style={{ marginBottom: '14px', background: '#F8FAFC', padding: '14px', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#334155' }}>
                              YouTube Video URL or 11-Character Video ID
                            </label>
                            <button
                              type="button"
                              onClick={() => setShowVideoPlayerPreview(!showVideoPlayerPreview)}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                padding: '3px 8px',
                                fontSize: '0.7rem',
                                fontWeight: 600,
                                color: showVideoPlayerPreview ? '#FFFFFF' : '#1D4ED8',
                                background: showVideoPlayerPreview ? '#1D4ED8' : '#EFF6FF',
                                border: '1px solid #BFDBFE',
                                borderRadius: '4px',
                                cursor: 'pointer'
                              }}
                            >
                              <Play style={{ width: '11px', height: '11px' }} />
                              <span>{showVideoPlayerPreview ? "Hide Video Player" : "Preview Video Player"}</span>
                            </button>
                          </div>

                          <input
                            type="text"
                            value={lessonFormYoutubeId}
                            onChange={(e) => setLessonFormYoutubeId(e.target.value)}
                            placeholder="https://www.youtube.com/watch?v=... or 11-character ID"
                            style={{
                              width: '100%',
                              padding: '8px 10px',
                              fontSize: '0.8rem',
                              fontFamily: 'monospace',
                              border: '1px solid #CBD5E1',
                              borderRadius: '6px',
                              outline: 'none',
                              boxSizing: 'border-box',
                              background: '#FFFFFF'
                            }}
                          />

                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px', flexWrap: 'wrap', gap: '6px' }}>
                            <div style={{ fontSize: '0.7rem', color: '#64748B' }}>
                              Quick sample video presets:
                            </div>
                            <div style={{ display: 'flex', gap: '4px' }}>
                              {[
                                { label: "Startup Masterclass", id: "dQw4w9WgXcQ" },
                                { label: "AICTE Keynote", id: "jNQXAC9IVRw" },
                                { label: "Valuation Lab", id: "L_LUpnjgPso" }
                              ].map((p) => (
                                <button
                                  key={p.label}
                                  type="button"
                                  onClick={() => setLessonFormYoutubeId(p.id)}
                                  style={{
                                    padding: '2px 6px',
                                    fontSize: '0.67rem',
                                    background: '#FFFFFF',
                                    color: '#1D4ED8',
                                    border: '1px solid #BFDBFE',
                                    borderRadius: '3px',
                                    cursor: 'pointer'
                                  }}
                                >
                                  {p.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          {showVideoPlayerPreview && lessonFormYoutubeId && (
                            <div style={{ marginTop: '12px', borderRadius: '6px', overflow: 'hidden', border: '1px solid #CBD5E1', background: '#000000', aspectRatio: '16/9', maxHeight: '300px' }}>
                              <iframe
                                src={`https://www.youtube-nocookie.com/embed/${
                                  lessonFormYoutubeId.includes('v=') 
                                    ? lessonFormYoutubeId.split('v=')[1]?.split('&')[0] 
                                    : (lessonFormYoutubeId.includes('youtu.be/') 
                                      ? lessonFormYoutubeId.split('youtu.be/')[1]?.split('?')[0] 
                                      : lessonFormYoutubeId)
                                }`}
                                title="NCIE Video Player Preview"
                                style={{ width: '100%', height: '100%', border: 'none' }}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            </div>
                          )}
                        </div>
                      )}

                      <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                          Masterclass Overview & Description
                        </label>
                        <textarea
                          rows={4}
                          value={lessonFormSummary}
                          onChange={(e) => setLessonFormSummary(e.target.value)}
                          placeholder="Comprehensive description of the concepts covered in this curriculum unit..."
                          style={{
                            width: '100%',
                            padding: '8px 10px',
                            fontSize: '0.8rem',
                            lineHeight: 1.5,
                            border: '1px solid #CBD5E1',
                            borderRadius: '6px',
                            outline: 'none',
                            boxSizing: 'border-box',
                            fontFamily: 'inherit'
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* SUB-TAB 2: Reading Material & Sections */}
                  {lessonEditorSubTab === "reading" && (
                    <div>
                      {/* View Mode Switcher and Quick Presets */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
                        <div style={{ display: 'flex', gap: '4px', background: '#F1F5F9', padding: '3px', borderRadius: '6px' }}>
                          <button
                            type="button"
                            onClick={() => setReadingViewMode("edit")}
                            style={{
                              padding: '4px 12px',
                              fontSize: '0.74rem',
                              fontWeight: readingViewMode === "edit" ? 600 : 500,
                              color: readingViewMode === "edit" ? '#1D4ED8' : '#64748B',
                              background: readingViewMode === "edit" ? '#FFFFFF' : 'transparent',
                              border: readingViewMode === "edit" ? '1px solid #CBD5E1' : 'none',
                              borderRadius: '4px',
                              cursor: 'pointer'
                            }}
                          >
                            Edit Document
                          </button>
                          <button
                            type="button"
                            onClick={() => setReadingViewMode("preview")}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '4px 12px',
                              fontSize: '0.74rem',
                              fontWeight: readingViewMode === "preview" ? 600 : 500,
                              color: readingViewMode === "preview" ? '#1D4ED8' : '#64748B',
                              background: readingViewMode === "preview" ? '#FFFFFF' : 'transparent',
                              border: readingViewMode === "preview" ? '1px solid #CBD5E1' : 'none',
                              borderRadius: '4px',
                              cursor: 'pointer'
                            }}
                          >
                            <Eye style={{ width: '12px', height: '12px' }} />
                            <span>Live Student Preview</span>
                          </button>
                        </div>

                        {readingViewMode === "edit" && (
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <button
                              type="button"
                              onClick={() => handleAddReadingSectionPreset("Regulatory & Compliance Framework", "This section establishes the formal regulatory standards required under the AICTE Startup Policy and National Innovation & Startup Policy (NISP). Startups must ensure adherence to institutional incubation norms, IP assignments, and statutory audit filings.")}
                              style={{ padding: '4px 8px', fontSize: '0.68rem', fontWeight: 600, color: '#047857', background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '4px', cursor: 'pointer' }}
                            >
                              + Policy Section
                            </button>
                            <button
                              type="button"
                              onClick={() => handleAddReadingSectionPreset("Unit Economics & Burn Metric", "A rigorous bottoms-up evaluation of Customer Acquisition Cost (CAC), Customer Lifetime Value (LTV), and Gross Margin Contribution. Capital stewardship dictates maintaining a minimum 18-month cash runway.")}
                              style={{ padding: '4px 8px', fontSize: '0.68rem', fontWeight: 600, color: '#047857', background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '4px', cursor: 'pointer' }}
                            >
                              + Finance Section
                            </button>
                          </div>
                        )}
                      </div>

                      {readingViewMode === "preview" ? (
                        /* Live Student Preview Render */
                        <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '18px' }}>
                          <div style={{ fontSize: '0.72rem', color: '#1D4ED8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                            Student Reading Document Preview
                          </div>
                          <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0F172A', marginBottom: '10px' }}>
                            {lessonFormTitle}
                          </div>

                          {lessonFormReadingOverview && (
                            <div style={{ background: '#EFF6FF', borderLeft: '3px solid #1D4ED8', padding: '10px 14px', borderRadius: '4px', fontSize: '0.8rem', color: '#1E40AF', lineHeight: 1.5, marginBottom: '14px' }}>
                              {lessonFormReadingOverview}
                            </div>
                          )}

                          {lessonFormActionLinkText && (
                            <div style={{ marginBottom: '16px' }}>
                              <a
                                href={lessonFormActionLinkUrl || "#"}
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                  padding: '7px 14px',
                                  fontSize: '0.75rem',
                                  fontWeight: 600,
                                  color: '#FFFFFF',
                                  background: '#1D4ED8',
                                  borderRadius: '6px',
                                  textDecoration: 'none'
                                }}
                              >
                                <span>{lessonFormActionLinkText}</span>
                                <ExternalLink style={{ width: '12px', height: '12px' }} />
                              </a>
                            </div>
                          )}

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {lessonFormReadingSections.map((sec, idx) => (
                              <div key={idx} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '14px' }}>
                                <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0F172A', marginBottom: '6px' }}>
                                  {sec.heading || `Section ${idx + 1}`}
                                </div>
                                <div style={{ fontSize: '0.78rem', color: '#334155', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                                  {sec.body || "No section content entered."}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        /* Edit Mode Inputs */
                        <div>
                          <div style={{ marginBottom: '14px' }}>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                              Document Overview & Executive Briefing
                            </label>
                            <textarea
                              rows={3}
                              value={lessonFormReadingOverview}
                              onChange={(e) => setLessonFormReadingOverview(e.target.value)}
                              placeholder="Introductory text displayed at the top of the reading document..."
                              style={{
                                width: '100%',
                                padding: '8px 10px',
                                fontSize: '0.8rem',
                                lineHeight: 1.5,
                                border: '1px solid #CBD5E1',
                                borderRadius: '6px',
                                outline: 'none',
                                boxSizing: 'border-box',
                                fontFamily: 'inherit'
                              }}
                            />
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px', background: '#F8FAFC', padding: '12px', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                            <div>
                              <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                                External Action Button Label
                              </label>
                              <input
                                type="text"
                                value={lessonFormActionLinkText}
                                onChange={(e) => setLessonFormActionLinkText(e.target.value)}
                                placeholder="e.g. Click here to view the NCIE Initiative"
                                style={{ width: '100%', padding: '7px 9px', fontSize: '0.78rem', border: '1px solid #CBD5E1', borderRadius: '4px', outline: 'none', boxSizing: 'border-box', background: '#FFFFFF' }}
                              />
                            </div>
                            <div>
                              <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                                External Action Link URL
                              </label>
                              <input
                                type="text"
                                value={lessonFormActionLinkUrl}
                                onChange={(e) => setLessonFormActionLinkUrl(e.target.value)}
                                placeholder="e.g. https://ncie.org.in/initiative"
                                style={{ width: '100%', padding: '7px 9px', fontSize: '0.78rem', border: '1px solid #CBD5E1', borderRadius: '4px', outline: 'none', boxSizing: 'border-box', background: '#FFFFFF' }}
                              />
                            </div>
                          </div>

                          <div style={{ marginBottom: '16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0F172A' }}>
                                Structured Reading Sections ({lessonFormReadingSections.length})
                              </span>
                              <button
                                type="button"
                                onClick={handleAddReadingSection}
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  padding: '4px 8px',
                                  fontSize: '0.72rem',
                                  fontWeight: 600,
                                  color: '#1D4ED8',
                                  background: '#EFF6FF',
                                  border: '1px solid #BFDBFE',
                                  borderRadius: '4px',
                                  cursor: 'pointer'
                                }}
                              >
                                <Plus style={{ width: '12px', height: '12px' }} />
                                <span>Add Section</span>
                              </button>
                            </div>

                            {lessonFormReadingSections.length === 0 ? (
                              <div style={{ padding: '16px', background: '#F8FAFC', borderRadius: '6px', textAlign: 'center', fontSize: '0.75rem', color: '#64748B' }}>
                                No structured sections created yet. Click "Add Section" to create headings and content.
                              </div>
                            ) : (
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {lessonFormReadingSections.map((sec, idx) => (
                                  <div key={idx} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '12px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                      <input
                                        type="text"
                                        value={sec.heading}
                                        onChange={(e) => handleUpdateReadingSection(idx, "heading", e.target.value)}
                                        placeholder="Section Heading..."
                                        style={{ flex: 1, marginRight: '10px', padding: '6px 8px', fontSize: '0.78rem', fontWeight: 600, border: '1px solid #CBD5E1', borderRadius: '4px', background: '#FFFFFF' }}
                                      />
                                      <button
                                        type="button"
                                        onClick={() => handleRemoveReadingSection(idx)}
                                        style={{ padding: '4px 6px', color: '#DC2626', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '4px', cursor: 'pointer', fontSize: '0.7rem' }}
                                        title="Remove section"
                                      >
                                        <Trash2 style={{ width: '12px', height: '12px' }} />
                                      </button>
                                    </div>
                                    <textarea
                                      rows={3}
                                      value={sec.body}
                                      onChange={(e) => handleUpdateReadingSection(idx, "body", e.target.value)}
                                      placeholder="Section content and detailed explanatory paragraphs..."
                                      style={{ width: '100%', padding: '6px 8px', fontSize: '0.76rem', lineHeight: 1.4, border: '1px solid #CBD5E1', borderRadius: '4px', background: '#FFFFFF', boxSizing: 'border-box', fontFamily: 'inherit' }}
                                    />
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* SUB-TAB 3: Pedagogy & Outcomes */}
                  {lessonEditorSubTab === "pedagogy" && (
                    <div>
                      {/* Learning Objectives */}
                      <div style={{ marginBottom: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                          <div>
                            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0F172A' }}>
                              Key Learning Objectives
                            </div>
                            <div style={{ fontSize: '0.7rem', color: '#64748B' }}>
                              Specific competencies and frameworks acquired by interns upon completing this unit.
                            </div>
                          </div>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <button
                              type="button"
                              onClick={handleLoadPedagogyObjectives}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                padding: '4px 8px',
                                fontSize: '0.7rem',
                                fontWeight: 600,
                                color: '#047857',
                                background: '#ECFDF5',
                                border: '1px solid #A7F3D0',
                                borderRadius: '4px',
                                cursor: 'pointer'
                              }}
                            >
                              <Sparkles style={{ width: '11px', height: '11px' }} />
                              <span>Load Standard AICTE Objectives</span>
                            </button>
                            <button
                              type="button"
                              onClick={handleAddObjective}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                padding: '4px 8px',
                                fontSize: '0.72rem',
                                fontWeight: 600,
                                color: '#1D4ED8',
                                background: '#EFF6FF',
                                border: '1px solid #BFDBFE',
                                borderRadius: '4px',
                                cursor: 'pointer'
                              }}
                            >
                              <Plus style={{ width: '12px', height: '12px' }} />
                              <span>Add Objective</span>
                            </button>
                          </div>
                        </div>

                        {lessonFormObjectives.length === 0 ? (
                          <div style={{ padding: '14px', background: '#F8FAFC', borderRadius: '6px', textAlign: 'center', fontSize: '0.75rem', color: '#64748B' }}>
                            No objectives specified. Click "Add Objective" or "Load Standard AICTE Objectives".
                          </div>
                        ) : (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {lessonFormObjectives.map((obj, idx) => (
                              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ width: '18px', fontSize: '0.72rem', fontWeight: 700, color: '#64748B', textAlign: 'center' }}>
                                  {idx + 1}.
                                </span>
                                <input
                                  type="text"
                                  value={obj}
                                  onChange={(e) => handleUpdateObjective(idx, e.target.value)}
                                  placeholder="e.g. Master financial projections and cash burn estimation."
                                  style={{ flex: 1, padding: '6px 8px', fontSize: '0.78rem', border: '1px solid #CBD5E1', borderRadius: '4px', outline: 'none' }}
                                />
                                <button
                                  type="button"
                                  onClick={() => handleRemoveObjective(idx)}
                                  style={{ padding: '5px', color: '#DC2626', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '4px', cursor: 'pointer' }}
                                  title="Remove objective"
                                >
                                  <Trash2 style={{ width: '12px', height: '12px' }} />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Core Takeaways */}
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                          <div>
                            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0F172A' }}>
                              Core Takeaways & Rules of Thumb
                            </div>
                            <div style={{ fontSize: '0.7rem', color: '#64748B' }}>
                              Key conclusions displayed in the student's lesson summary box.
                            </div>
                          </div>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <button
                              type="button"
                              onClick={handleLoadPedagogyTakeaways}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                padding: '4px 8px',
                                fontSize: '0.7rem',
                                fontWeight: 600,
                                color: '#047857',
                                background: '#ECFDF5',
                                border: '1px solid #A7F3D0',
                                borderRadius: '4px',
                                cursor: 'pointer'
                              }}
                            >
                              <Sparkles style={{ width: '11px', height: '11px' }} />
                              <span>Load Core Rules of Thumb</span>
                            </button>
                            <button
                              type="button"
                              onClick={handleAddTakeaway}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                padding: '4px 8px',
                                fontSize: '0.72rem',
                                fontWeight: 600,
                                color: '#1D4ED8',
                                background: '#EFF6FF',
                                border: '1px solid #BFDBFE',
                                borderRadius: '4px',
                                cursor: 'pointer'
                              }}
                            >
                              <Plus style={{ width: '12px', height: '12px' }} />
                              <span>Add Takeaway</span>
                            </button>
                          </div>
                        </div>

                        {lessonFormTakeaways.length === 0 ? (
                          <div style={{ padding: '14px', background: '#F8FAFC', borderRadius: '6px', textAlign: 'center', fontSize: '0.75rem', color: '#64748B' }}>
                            No takeaways specified. Click "Add Takeaway" or "Load Core Rules of Thumb".
                          </div>
                        ) : (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {lessonFormTakeaways.map((tak, idx) => (
                              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ width: '18px', fontSize: '0.72rem', fontWeight: 700, color: '#64748B', textAlign: 'center' }}>
                                  {idx + 1}.
                                </span>
                                <input
                                  type="text"
                                  value={tak}
                                  onChange={(e) => handleUpdateTakeaway(idx, e.target.value)}
                                  placeholder="e.g. Always stress-test market size with bottoms-up validation."
                                  style={{ flex: 1, padding: '6px 8px', fontSize: '0.78rem', border: '1px solid #CBD5E1', borderRadius: '4px', outline: 'none' }}
                                />
                                <button
                                  type="button"
                                  onClick={() => handleRemoveTakeaway(idx)}
                                  style={{ padding: '5px', color: '#DC2626', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '4px', cursor: 'pointer' }}
                                  title="Remove takeaway"
                                >
                                  <Trash2 style={{ width: '12px', height: '12px' }} />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* SUB-TAB 4: Resource Attachments */}
                  {lessonEditorSubTab === "resources" && (
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                        <div>
                          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0F172A' }}>
                            Downloadable Attachments & Templates ({lessonFormResources.length})
                          </div>
                          <div style={{ fontSize: '0.7rem', color: '#64748B' }}>
                            PDF whitepapers, evaluation rubrics, financial templates, and official slides.
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={handleAddResource}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '4px 8px',
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            color: '#1D4ED8',
                            background: '#EFF6FF',
                            border: '1px solid #BFDBFE',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          <Plus style={{ width: '12px', height: '12px' }} />
                          <span>Attach Document</span>
                        </button>
                      </div>

                      {/* Quick Presets for Attachments */}
                      <div style={{ display: 'flex', gap: '6px', marginBottom: '12px', flexWrap: 'wrap', background: '#F8FAFC', padding: '8px 12px', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                        <span style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 600, alignSelf: 'center', marginRight: '4px' }}>
                          Quick Attach Presets:
                        </span>
                        {[
                          { title: "AICTE National Startup Policy 2026", type: "pdf" as const, size: "2.4 MB" },
                          { title: "Capstone Pitch Deck Template", type: "template" as const, size: "4.1 MB" },
                          { title: "Unit Economics & Cash Burn Model", type: "doc" as const, size: "1.2 MB" },
                          { title: "Weekly Mentor Evaluation Rubric", type: "pdf" as const, size: "780 KB" }
                        ].map((preset) => (
                          <button
                            key={preset.title}
                            type="button"
                            onClick={() => handleAddPresetResource(preset.title, preset.type, preset.size)}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '3px 8px',
                              fontSize: '0.68rem',
                              background: '#FFFFFF',
                              color: '#1D4ED8',
                              border: '1px solid #CBD5E1',
                              borderRadius: '4px',
                              cursor: 'pointer'
                            }}
                          >
                            <Plus style={{ width: '10px', height: '10px' }} />
                            <span>{preset.title}</span>
                          </button>
                        ))}
                      </div>

                      {lessonFormResources.length === 0 ? (
                        <div style={{ padding: '20px', background: '#F8FAFC', borderRadius: '6px', textAlign: 'center', fontSize: '0.75rem', color: '#64748B' }}>
                          No attachments linked to this unit. Use Quick Attach Presets or click "Attach Document".
                        </div>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {lessonFormResources.map((res, idx) => (
                            <div key={idx} style={{ display: 'grid', gridTemplateColumns: '2fr 100px 1fr 80px 32px', gap: '8px', alignItems: 'center', background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '8px 10px', borderRadius: '6px' }}>
                              <input
                                type="text"
                                value={res.title}
                                onChange={(e) => handleUpdateResource(idx, "title", e.target.value)}
                                placeholder="Attachment Title..."
                                style={{ padding: '6px 8px', fontSize: '0.75rem', border: '1px solid #CBD5E1', borderRadius: '4px', background: '#FFFFFF' }}
                              />
                              <select
                                value={res.type}
                                onChange={(e) => handleUpdateResource(idx, "type", e.target.value as any)}
                                style={{ padding: '6px 4px', fontSize: '0.72rem', border: '1px solid #CBD5E1', borderRadius: '4px', background: '#FFFFFF' }}
                              >
                                <option value="pdf">PDF Document</option>
                                <option value="template">Template</option>
                                <option value="doc">Document</option>
                                <option value="link">Web Link</option>
                              </select>
                              <input
                                type="text"
                                value={res.url}
                                onChange={(e) => handleUpdateResource(idx, "url", e.target.value)}
                                placeholder="URL or asset path..."
                                style={{ padding: '6px 8px', fontSize: '0.75rem', border: '1px solid #CBD5E1', borderRadius: '4px', background: '#FFFFFF' }}
                              />
                              <input
                                type="text"
                                value={res.size || "1.2 MB"}
                                onChange={(e) => handleUpdateResource(idx, "size", e.target.value)}
                                placeholder="Size"
                                style={{ padding: '6px 6px', fontSize: '0.72rem', border: '1px solid #CBD5E1', borderRadius: '4px', background: '#FFFFFF' }}
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveResource(idx)}
                                style={{ padding: '5px', color: '#DC2626', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                title="Delete attachment"
                              >
                                <Trash2 style={{ width: '12px', height: '12px' }} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* SUB-TAB 5: Quiz Assessment (Interactive Question Builder) */}
                  {lessonEditorSubTab === "quiz" && (
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
                        <div>
                          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0F172A' }}>
                            Assessment Questions ({lessonFormQuizQuestions.length})
                          </div>
                          <div style={{ fontSize: '0.7rem', color: '#64748B' }}>
                            Configure multiple choice questions, correct keys, and explanations for this unit.
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button
                            type="button"
                            onClick={handleLoadSampleQuiz}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '5px 10px',
                              fontSize: '0.7rem',
                              fontWeight: 600,
                              color: '#047857',
                              background: '#ECFDF5',
                              border: '1px solid #A7F3D0',
                              borderRadius: '4px',
                              cursor: 'pointer'
                            }}
                          >
                            <Sparkles style={{ width: '11px', height: '11px' }} />
                            <span>Load NCIE Sample Questions</span>
                          </button>
                          <button
                            type="button"
                            onClick={handleAddQuizQuestion}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '5px 12px',
                              fontSize: '0.72rem',
                              fontWeight: 600,
                              color: '#FFFFFF',
                              background: '#1D4ED8',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer'
                            }}
                          >
                            <Plus style={{ width: '12px', height: '12px' }} />
                            <span>Add Question</span>
                          </button>
                        </div>
                      </div>

                      {lessonFormQuizQuestions.length === 0 ? (
                        <div style={{ padding: '30px', background: '#F8FAFC', borderRadius: '8px', border: '1px dashed #CBD5E1', textAlign: 'center' }}>
                          <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                            No Quiz Questions Configured
                          </div>
                          <div style={{ fontSize: '0.74rem', color: '#64748B', maxWidth: '380px', margin: '0 auto 12px' }}>
                            This unit currently operates as self-paced instruction. Click below to add your first question or load sample NCIE assessment questions.
                          </div>
                          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                            <button
                              type="button"
                              onClick={handleAddQuizQuestion}
                              style={{ padding: '6px 14px', fontSize: '0.75rem', fontWeight: 600, color: '#FFFFFF', background: '#1D4ED8', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                            >
                              Add First Question
                            </button>
                            <button
                              type="button"
                              onClick={handleLoadSampleQuiz}
                              style={{ padding: '6px 14px', fontSize: '0.75rem', fontWeight: 600, color: '#047857', background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '4px', cursor: 'pointer' }}
                            >
                              Load Sample Questions
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                          {lessonFormQuizQuestions.map((q, qIdx) => (
                            <div key={q.id || qIdx} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '16px', borderRadius: '8px' }}>
                              {/* Question Top Bar */}
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#1D4ED8', background: '#EFF6FF', padding: '2px 8px', borderRadius: '4px', border: '1px solid #BFDBFE' }}>
                                    Question {qIdx + 1}
                                  </span>
                                  <span style={{ fontSize: '0.7rem', color: '#64748B' }}>
                                    (Click radio button to set correct option)
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveQuizQuestion(qIdx)}
                                  style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    padding: '4px 8px',
                                    fontSize: '0.7rem',
                                    color: '#DC2626',
                                    background: '#FEF2F2',
                                    border: '1px solid #FECACA',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                  }}
                                  title="Delete question"
                                >
                                  <Trash2 style={{ width: '12px', height: '12px' }} />
                                  <span>Remove</span>
                                </button>
                              </div>

                              {/* Question Prompt */}
                              <div style={{ marginBottom: '12px' }}>
                                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                                  Question Prompt
                                </label>
                                <input
                                  type="text"
                                  value={q.question}
                                  onChange={(e) => handleUpdateQuizQuestionText(qIdx, e.target.value)}
                                  placeholder="Enter the evaluation question..."
                                  style={{ width: '100%', padding: '7px 9px', fontSize: '0.8rem', fontWeight: 600, border: '1px solid #CBD5E1', borderRadius: '4px', outline: 'none', background: '#FFFFFF', boxSizing: 'border-box' }}
                                />
                              </div>

                              {/* 4 Options with Radio Key Selectors */}
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                                {q.options.map((opt, oIdx) => {
                                  const isCorrect = oIdx === q.correctIndex;
                                  return (
                                    <div 
                                      key={oIdx} 
                                      style={{ 
                                        background: isCorrect ? '#ECFDF5' : '#FFFFFF', 
                                        border: isCorrect ? '1px solid #10B981' : '1px solid #CBD5E1', 
                                        borderRadius: '6px', 
                                        padding: '6px 10px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                      }}
                                    >
                                      <input
                                        type="radio"
                                        name={`correct-${q.id || qIdx}`}
                                        checked={isCorrect}
                                        onChange={() => handleSelectQuizCorrectOption(qIdx, oIdx)}
                                        style={{ cursor: 'pointer' }}
                                        title="Select as correct answer"
                                      />
                                      <span style={{ fontSize: '0.74rem', fontWeight: 700, color: isCorrect ? '#047857' : '#475569' }}>
                                        {String.fromCharCode(65 + oIdx)}.
                                      </span>
                                      <input
                                        type="text"
                                        value={opt}
                                        onChange={(e) => handleUpdateQuizQuestionOption(qIdx, oIdx, e.target.value)}
                                        placeholder={`Option ${String.fromCharCode(65 + oIdx)}...`}
                                        style={{ 
                                          flex: 1, 
                                          padding: '4px 6px', 
                                          fontSize: '0.76rem', 
                                          border: 'none', 
                                          outline: 'none', 
                                          background: 'transparent',
                                          color: isCorrect ? '#065F46' : '#1E293B',
                                          fontWeight: isCorrect ? 600 : 400
                                        }}
                                      />
                                      {isCorrect && (
                                        <span style={{ fontSize: '0.64rem', fontWeight: 700, color: '#047857', background: '#D1FAE5', padding: '1px 5px', borderRadius: '4px' }}>
                                          CORRECT
                                        </span>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>

                              {/* Academic Explanation */}
                              <div>
                                <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, color: '#475569', marginBottom: '3px' }}>
                                  Academic Rationale & Explanation
                                </label>
                                <textarea
                                  rows={2}
                                  value={q.explanation}
                                  onChange={(e) => handleUpdateQuizQuestionExplanation(qIdx, e.target.value)}
                                  placeholder="Explanation displayed to interns after submitting their quiz..."
                                  style={{ width: '100%', padding: '6px 8px', fontSize: '0.74rem', border: '1px solid #CBD5E1', borderRadius: '4px', outline: 'none', background: '#FFFFFF', boxSizing: 'border-box', fontFamily: 'inherit' }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Form Footer Save Bar */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px', paddingTop: '14px', borderTop: '1px solid #E2E8F0' }}>
                    <button
                      type="submit"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 22px',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        color: '#FFFFFF',
                        background: '#1D4ED8',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                      }}
                    >
                      <Save style={{ width: '14px', height: '14px' }} />
                      <span>Save & Publish Changes</span>
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '40px', textAlign: 'center', color: '#64748B' }}>
                Select a lesson from the left column to view or modify its contents.
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Announcements Publisher */}
        {activeTab === "announcements" && (
          <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: '20px', alignItems: 'start' }}>
            {/* Create Announcement Form */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '18px' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A', marginBottom: '14px', borderBottom: '1px solid #E2E8F0', paddingBottom: '8px' }}>
                Publish Official Announcement
              </div>

              <form onSubmit={handlePublishAnnouncement}>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                    Notice Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Schedule for Mid-Term Capstone Pitch"
                    value={newAnnTitle}
                    onChange={(e) => setNewAnnTitle(e.target.value)}
                    style={{ width: '100%', padding: '8px 10px', fontSize: '0.8rem', border: '1px solid #CBD5E1', borderRadius: '6px', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                    Category
                  </label>
                  <select
                    value={newAnnCategory}
                    onChange={(e) => setNewAnnCategory(e.target.value as "Important" | "Assignment" | "Exam" | "General")}
                    style={{ width: '100%', padding: '8px 10px', fontSize: '0.8rem', border: '1px solid #CBD5E1', borderRadius: '6px', outline: 'none', background: '#FFFFFF', boxSizing: 'border-box' }}
                  >
                    <option value="Important">Important / Circular</option>
                    <option value="Assignment">Assignment / Milestone</option>
                    <option value="Exam">Exam / Capstone</option>
                    <option value="General">General Notice</option>
                  </select>
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                    Detailed Circular Content
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write the circular details, guidelines, or instructions..."
                    value={newAnnContent}
                    onChange={(e) => setNewAnnContent(e.target.value)}
                    style={{ width: '100%', padding: '8px 10px', fontSize: '0.8rem', border: '1px solid #CBD5E1', borderRadius: '6px', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                      Action Button Label
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Open Portal"
                      value={newAnnActionLabel}
                      onChange={(e) => setNewAnnActionLabel(e.target.value)}
                      style={{ width: '100%', padding: '7px 9px', fontSize: '0.78rem', border: '1px solid #CBD5E1', borderRadius: '6px', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                      Target URL
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. /exam or URL"
                      value={newAnnActionUrl}
                      onChange={(e) => setNewAnnActionUrl(e.target.value)}
                      style={{ width: '100%', padding: '7px 9px', fontSize: '0.78rem', border: '1px solid #CBD5E1', borderRadius: '6px', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '8px 14px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: '#FFFFFF',
                    background: '#047857',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  Publish Announcement Live
                </button>
              </form>
            </div>

            {/* Published Announcements List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A', marginBottom: '4px' }}>
                Currently Active Announcements ({announcements.length})
              </div>

              {announcements.map((a) => (
                <div key={a.id} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span
                          style={{
                            fontSize: '0.68rem',
                            fontWeight: 600,
                            padding: '2px 8px',
                            borderRadius: '4px',
                            background: a.isPinned ? '#FEF2F2' : '#EFF6FF',
                            color: a.isPinned ? '#DC2626' : '#1D4ED8',
                            border: a.isPinned ? '1px solid #FECACA' : '1px solid #BFDBFE'
                          }}
                        >
                          {a.category}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#64748B' }}>{a.date}</span>
                      </div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0F172A', marginTop: '6px' }}>
                        {a.title}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onDeleteAnnouncement(a.id)}
                      style={{
                        padding: '4px 8px',
                        background: '#FEF2F2',
                        border: '1px solid #FECACA',
                        borderRadius: '4px',
                        color: '#DC2626',
                        fontSize: '0.7rem',
                        cursor: 'pointer'
                      }}
                      title="Delete notice"
                    >
                      Delete
                    </button>
                  </div>

                  <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.5, margin: '8px 0 0 0' }}>
                    {a.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Course Settings */}
        {activeTab === "settings" && (
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '22px', maxWidth: '780px' }}>
            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0F172A', marginBottom: '4px' }}>
              Academic Governance & Course Metadata
            </div>
            <p style={{ fontSize: '0.75rem', color: '#64748B', margin: '0 0 16px 0' }}>
              Modify national program credentials, credit allocation, and AICTE endorsement criteria.
            </p>

            <form onSubmit={handleSaveCourseSettings}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                  Course Title
                </label>
                <input
                  type="text"
                  value={courseTitleInput}
                  onChange={(e) => setCourseTitleInput(e.target.value)}
                  style={{ width: '100%', padding: '8px 10px', fontSize: '0.8rem', border: '1px solid #CBD5E1', borderRadius: '6px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                    Course Duration & Learning Hours
                  </label>
                  <input
                    type="text"
                    value={courseDurationInput}
                    onChange={(e) => setCourseDurationInput(e.target.value)}
                    style={{ width: '100%', padding: '8px 10px', fontSize: '0.8rem', border: '1px solid #CBD5E1', borderRadius: '6px', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                    AICTE Credit Equivalency
                  </label>
                  <input
                    type="text"
                    value={courseCreditsInput}
                    onChange={(e) => setCourseCreditsInput(e.target.value)}
                    style={{ width: '100%', padding: '8px 10px', fontSize: '0.8rem', border: '1px solid #CBD5E1', borderRadius: '6px', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                  Coordinating Council / Body
                </label>
                <input
                  type="text"
                  value={courseCoordinatingInput}
                  onChange={(e) => setCourseCoordinatingInput(e.target.value)}
                  style={{ width: '100%', padding: '8px 10px', fontSize: '0.8rem', border: '1px solid #CBD5E1', borderRadius: '6px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <button
                type="submit"
                style={{
                  padding: '8px 18px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  background: '#1D4ED8',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Save Course Configuration
              </button>
            </form>
          </div>
        )}

        {/* TAB 4: Student Logins & Rosters Management */}
        {activeTab === "students" && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Top Metric Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '14px 18px' }}>
                <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>
                  Total Registered Students
                </div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0F172A', marginTop: '2px' }}>
                  {ALL_REGISTERED_STUDENTS.length}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#16A34A', fontWeight: 600, marginTop: '2px' }}>
                  Synced from Supabase
                </div>
              </div>

              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '14px 18px' }}>
                <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>
                  Active Program Courses
                </div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1D4ED8', marginTop: '2px' }}>
                  {COURSE_CATALOG.length} Courses
                </div>
                <div style={{ fontSize: '0.7rem', color: '#64748B', marginTop: '2px' }}>
                  Commencing: 1st October 2026
                </div>
              </div>

              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '14px 18px' }}>
                <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>
                  Institutions & Colleges
                </div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#7C3AED', marginTop: '2px' }}>
                  {new Set(ALL_REGISTERED_STUDENTS.map(s => s.institution)).size}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#64748B', marginTop: '2px' }}>
                  Across Engineering & Tech
                </div>
              </div>

              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '14px 18px' }}>
                <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>
                  Credentials Status
                </div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#059669', marginTop: '2px' }}>
                  Ready & Active
                </div>
                <div style={{ fontSize: '0.7rem', color: '#059669', fontWeight: 600, marginTop: '2px' }}>
                  Password = Student Email
                </div>
              </div>
            </div>

            {/* Filter and Download Action Bar */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '14px 18px', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: '10px', flex: 1, minWidth: '280px', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', flex: 1, minWidth: '220px', display: 'flex', alignItems: 'center' }}>
                  <Search style={{ position: 'absolute', left: '10px', width: '14px', height: '14px', color: '#94A3B8' }} />
                  <input
                    type="text"
                    value={studentSearch}
                    onChange={(e) => setStudentSearch(e.target.value)}
                    placeholder="Search by student name, roll no, reg id, email, college..."
                    style={{ width: '100%', padding: '7px 10px 7px 30px', fontSize: '0.78rem', border: '1px solid #CBD5E1', borderRadius: '6px', outline: 'none' }}
                  />
                </div>

                <select
                  value={selectedCourseFilter}
                  onChange={(e) => setSelectedCourseFilter(e.target.value)}
                  style={{ padding: '7px 10px', fontSize: '0.76rem', border: '1px solid #CBD5E1', borderRadius: '6px', outline: 'none', background: '#FFFFFF', color: '#334155' }}
                >
                  <option value="all">All Courses ({ALL_REGISTERED_STUDENTS.length})</option>
                  {COURSE_CATALOG.map((c) => {
                    const cnt = ALL_REGISTERED_STUDENTS.filter(s => s.enrolledCourseCode === c.courseCode || s.enrolledCourseTitle.toLowerCase() === c.title.toLowerCase()).length;
                    return (
                      <option key={c.courseCode} value={c.title}>
                        {c.shortTitle} ({cnt})
                      </option>
                    );
                  })}
                </select>
              </div>

              <button
                type="button"
                onClick={handleDownloadCSV}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 14px',
                  fontSize: '0.76rem',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  background: '#059669',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  boxShadow: '0 1px 2px rgba(5, 150, 105, 0.2)'
                }}
                title="Export complete student logins list with credentials to CSV"
              >
                <FileDown style={{ width: '14px', height: '14px' }} />
                <span>Export Logins CSV (202 Students)</span>
              </button>
            </div>

            {/* Students Table */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', overflow: 'hidden' }}>
              {(() => {
                const filtered = ALL_REGISTERED_STUDENTS.filter((s) => {
                  const matchCourse = selectedCourseFilter === 'all' || s.enrolledCourseTitle.toLowerCase() === selectedCourseFilter.toLowerCase();
                  if (!matchCourse) return false;
                  if (!studentSearch.trim()) return true;
                  const q = studentSearch.toLowerCase().trim();
                  return (
                    s.name.toLowerCase().includes(q) ||
                    s.rollNo.toLowerCase().includes(q) ||
                    s.appId.toLowerCase().includes(q) ||
                    s.email.toLowerCase().includes(q) ||
                    s.institution.toLowerCase().includes(q) ||
                    s.mobile.includes(q)
                  );
                });

                if (filtered.length === 0) {
                  return (
                    <div style={{ padding: '36px', textAlign: 'center', color: '#64748B', fontSize: '0.8rem' }}>
                      No students match your query. Try searching by roll number or institution name.
                    </div>
                  );
                }

                return (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.76rem', textAlign: 'left' }}>
                      <thead>
                        <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#475569' }}>
                          <th style={{ padding: '10px 14px', fontWeight: 600 }}>Student Name & ID</th>
                          <th style={{ padding: '10px 14px', fontWeight: 600 }}>Roll Number</th>
                          <th style={{ padding: '10px 14px', fontWeight: 600 }}>College / Institution</th>
                          <th style={{ padding: '10px 14px', fontWeight: 600 }}>Assigned Course</th>
                          <th style={{ padding: '10px 14px', fontWeight: 600 }}>Login ID & Password</th>
                          <th style={{ padding: '10px 14px', fontWeight: 600, textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filtered.map((stu) => (
                          <tr key={stu.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                            <td style={{ padding: '10px 14px' }}>
                              <div style={{ fontWeight: 700, color: '#0F172A' }}>{stu.name}</div>
                              <div style={{ fontSize: '0.68rem', color: '#64748B' }}>{stu.appId}</div>
                            </td>
                            <td style={{ padding: '10px 14px' }}>
                              <span style={{ fontFamily: 'monospace', fontWeight: 600, color: '#1E293B', background: '#F1F5F9', padding: '2px 5px', borderRadius: '4px' }}>
                                {stu.rollNo}
                              </span>
                            </td>
                            <td style={{ padding: '10px 14px', maxWidth: '200px' }}>
                              <div style={{ color: '#334155', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={stu.institution}>
                                {stu.institution}
                              </div>
                              <div style={{ fontSize: '0.67rem', color: '#64748B' }}>{stu.department}</div>
                            </td>
                            <td style={{ padding: '10px 14px' }}>
                              <span style={{ display: 'inline-block', background: '#EFF6FF', color: '#1D4ED8', border: '1px solid #BFDBFE', padding: '2px 6px', borderRadius: '4px', fontWeight: 600, fontSize: '0.69rem' }}>
                                {stu.enrolledCourseTitle}
                              </span>
                            </td>
                            <td style={{ padding: '10px 14px' }}>
                              <div style={{ color: '#0F172A', fontWeight: 500 }}>{stu.email}</div>
                              <div style={{ fontSize: '0.67rem', color: '#64748B' }}>
                                Pass: <strong style={{ color: '#059669' }}>{stu.defaultPassword}</strong>
                              </div>
                            </td>
                            <td style={{ padding: '10px 14px', textAlign: 'right' }}>
                              <div style={{ display: 'flex', gap: '5px', justifyContent: 'flex-end' }}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const msg = `NCIE Student Login Details:\nStudent: ${stu.name}\nRoll No: ${stu.rollNo}\nCourse: ${stu.enrolledCourseTitle}\nPortal: ${window.location.origin}\nLogin ID (Email): ${stu.email}\nPassword: ${stu.email}\nStart Date: 1st October 2026`;
                                    navigator.clipboard.writeText(msg);
                                    setCopiedStudentId(stu.id);
                                    setTimeout(() => setCopiedStudentId(null), 2000);
                                    showToast(`Copied login details for ${stu.name}`);
                                  }}
                                  style={{
                                    padding: '4px 7px',
                                    fontSize: '0.7rem',
                                    fontWeight: 600,
                                    color: copiedStudentId === stu.id ? '#059669' : '#475569',
                                    background: copiedStudentId === stu.id ? '#ECFDF5' : '#F1F5F9',
                                    border: '1px solid #E2E8F0',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '3px'
                                  }}
                                  title="Copy login notification template"
                                >
                                  {copiedStudentId === stu.id ? <Check style={{ width: '11px', height: '11px' }} /> : <Copy style={{ width: '11px', height: '11px' }} />}
                                  <span>{copiedStudentId === stu.id ? "Copied" : "Copy"}</span>
                                </button>

                                {onLoginAsStudent && (
                                  <button
                                    type="button"
                                    onClick={() => onLoginAsStudent(stu)}
                                    style={{
                                      padding: '4px 8px',
                                      fontSize: '0.7rem',
                                      fontWeight: 600,
                                      color: '#FFFFFF',
                                      background: '#1D4ED8',
                                      border: 'none',
                                      borderRadius: '4px',
                                      cursor: 'pointer',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: '3px'
                                    }}
                                    title="Open this student's classroom directly"
                                  >
                                    <span>Classroom</span>
                                    <ArrowRight style={{ width: '10px', height: '10px' }} />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </main>

      {/* Add New Lesson Modal */}
      {showAddLessonModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(15, 23, 42, 0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100 }}>
          <div style={{ background: '#FFFFFF', borderRadius: '10px', border: '1px solid #E2E8F0', width: '100%', maxWidth: '520px', padding: '24px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', marginBottom: '4px' }}>
              Add New Lesson to Week {selectedModuleWeek}
            </div>
            <p style={{ fontSize: '0.75rem', color: '#64748B', margin: '0 0 16px 0' }}>
              This lesson will immediately appear in the student syllabus and course outline.
            </p>

            <form onSubmit={handleCreateLesson}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                  Lesson Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Masterclass: Unit Economics & Cashflows"
                  value={newLessonTitle}
                  onChange={(e) => setNewLessonTitle(e.target.value)}
                  style={{ width: '100%', padding: '8px 10px', fontSize: '0.8rem', border: '1px solid #CBD5E1', borderRadius: '6px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                    Type
                  </label>
                  <select
                    value={newLessonContentType}
                    onChange={(e) => setNewLessonContentType(e.target.value)}
                    style={{ width: '100%', padding: '8px 10px', fontSize: '0.8rem', border: '1px solid #CBD5E1', borderRadius: '6px', outline: 'none', background: '#FFFFFF', boxSizing: 'border-box' }}
                  >
                    <option value="video">Video Lecture</option>
                    <option value="reading">Reading Document</option>
                    <option value="quiz">Assignment / Quiz</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                    Duration
                  </label>
                  <input
                    type="text"
                    value={newLessonDuration}
                    onChange={(e) => setNewLessonDuration(e.target.value)}
                    placeholder="e.g. 18:30"
                    style={{ width: '100%', padding: '8px 10px', fontSize: '0.8rem', border: '1px solid #CBD5E1', borderRadius: '6px', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              {newLessonContentType === "video" && (
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                    YouTube URL or Video ID
                  </label>
                  <input
                    type="text"
                    value={newLessonYoutubeId}
                    onChange={(e) => setNewLessonYoutubeId(e.target.value)}
                    style={{ width: '100%', padding: '8px 10px', fontSize: '0.8rem', fontFamily: 'monospace', border: '1px solid #CBD5E1', borderRadius: '6px', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              )}

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                  Lesson Summary
                </label>
                <textarea
                  rows={3}
                  value={newLessonSummary}
                  onChange={(e) => setNewLessonSummary(e.target.value)}
                  placeholder="Overview of the core takeaways..."
                  style={{ width: '100%', padding: '8px 10px', fontSize: '0.8rem', border: '1px solid #CBD5E1', borderRadius: '6px', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowAddLessonModal(false)}
                  style={{ padding: '7px 14px', fontSize: '0.78rem', fontWeight: 600, color: '#64748B', background: '#F1F5F9', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '7px 16px', fontSize: '0.78rem', fontWeight: 600, color: '#FFFFFF', background: '#1D4ED8', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                >
                  Create & Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Module Modal */}
      {showAddModuleModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '16px' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '10px', width: '100%', maxWidth: '480px', padding: '22px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid #E2E8F0', paddingBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FolderPlus style={{ width: '16px', height: '16px', color: '#1D4ED8' }} />
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0F172A' }}>
                  Create New Curriculum Module
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModuleModal(false)}
                style={{ background: 'none', border: 'none', fontSize: '1.1rem', color: '#64748B', cursor: 'pointer' }}
              >
                x
              </button>
            </div>

            <form onSubmit={handleCreateModule}>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '10px', marginBottom: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                    Week / Label
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Week 9"
                    value={newModuleWeek}
                    onChange={(e) => setNewModuleWeek(e.target.value)}
                    style={{ width: '100%', padding: '8px 10px', fontSize: '0.8rem', border: '1px solid #CBD5E1', borderRadius: '6px', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                    Module Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Venture Capital & Scale-Up Diligence"
                    value={newModuleTitle}
                    onChange={(e) => setNewModuleTitle(e.target.value)}
                    style={{ width: '100%', padding: '8px 10px', fontSize: '0.8rem', border: '1px solid #CBD5E1', borderRadius: '6px', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                  Pedagogical Theme
                </label>
                <input
                  type="text"
                  placeholder="e.g. National Innovation & Applied Venture Building"
                  value={newModuleTheme}
                  onChange={(e) => setNewModuleTheme(e.target.value)}
                  style={{ width: '100%', padding: '8px 10px', fontSize: '0.8rem', border: '1px solid #CBD5E1', borderRadius: '6px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                  Subtitle & Focus Area
                </label>
                <input
                  type="text"
                  placeholder="e.g. Term Sheets, Valuation Frameworks, and Cap Table Management"
                  value={newModuleSubtitle}
                  onChange={(e) => setNewModuleSubtitle(e.target.value)}
                  style={{ width: '100%', padding: '8px 10px', fontSize: '0.8rem', border: '1px solid #CBD5E1', borderRadius: '6px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowAddModuleModal(false)}
                  style={{ padding: '7px 14px', fontSize: '0.78rem', fontWeight: 600, color: '#64748B', background: '#F1F5F9', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '7px 16px', fontSize: '0.78rem', fontWeight: 600, color: '#FFFFFF', background: '#1D4ED8', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                >
                  Create Module
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            background: '#0F172A',
            color: '#FFFFFF',
            padding: '10px 18px',
            borderRadius: '8px',
            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.8rem',
            fontWeight: 500,
            zIndex: 9999
          }}
        >
          <Check style={{ width: '15px', height: '15px', color: '#10B981' }} />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
