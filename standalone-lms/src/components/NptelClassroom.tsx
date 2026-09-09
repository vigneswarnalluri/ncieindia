import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  BookOpen, 
  HelpCircle, 
  Clock, 
  CheckCircle2, 
  Bookmark,
  Maximize2,
  Minimize2,
  MessageSquare,
  ExternalLink,
  Sparkles,
  FileText,
  ThumbsUp,
  Edit3,
  Plus,
  Trash2,
  Save,
  Check,
  Play,
  X
} from 'lucide-react';
import type { LMSLesson, LMSModule } from '../data/curriculumData';

interface Props {
  modules: LMSModule[];
  lesson: LMSLesson;
  isCompleted: boolean;
  isBookmarked: boolean;
  onSelectLesson: (lesson: LMSLesson) => void;
  onOpenQuiz: () => void;
  onToggleBookmark: (lessonId: string) => void;
  onOpenChatbot: () => void;
  isLiveEditMode?: boolean;
  onUpdateLesson?: (moduleIndex: number, lessonId: string, updatedFields: Partial<LMSLesson>) => void;
}

export const NptelClassroom: React.FC<Props> = ({
  modules,
  lesson,
  isCompleted,
  isBookmarked,
  onSelectLesson,
  onOpenQuiz,
  onToggleBookmark,
  onOpenChatbot,
  isLiveEditMode = false,
  onUpdateLesson,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<"summary" | "downloads" | "quiz" | "youtube">("summary");
  const [secondsWatched, setSecondsWatched] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // In-Place Live Edit States
  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);
  const [tempTitle, setTempTitle] = useState<string>(lesson.title);

  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);
  const [tempVideoId, setTempVideoId] = useState<string>(lesson.youtubeId || "");

  const [isEditingOverview, setIsEditingOverview] = useState<boolean>(false);
  const [tempOverview, setTempOverview] = useState<string>(lesson.readingContent?.overview || lesson.summary || "");

  const [editingSectionIdx, setEditingSectionIdx] = useState<number | null>(null);
  const [tempSectionHeading, setTempSectionHeading] = useState<string>("");
  const [tempSectionBody, setTempSectionBody] = useState<string>("");

  const [isEditingSummary, setIsEditingSummary] = useState<boolean>(false);
  const [tempSummary, setTempSummary] = useState<string>(lesson.summary || "");

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  useEffect(() => {
    setTempTitle(lesson.title);
    setTempVideoId(lesson.youtubeId || "");
    setTempOverview(lesson.readingContent?.overview || lesson.summary || "");
    setTempSummary(lesson.summary || "");
    setIsEditingTitle(false);
    setIsEditingOverview(false);
    setEditingSectionIdx(null);
    setIsEditingSummary(false);
  }, [lesson.id]);

  const handleSaveTitle = () => {
    if (!tempTitle.trim() || !onUpdateLesson) return;
    onUpdateLesson(lesson.moduleIndex, lesson.id, { title: tempTitle.trim() });
    setIsEditingTitle(false);
    showToast("Updated lesson title");
  };

  const getVideoEmbedUrl = (rawIdOrUrl?: string) => {
    if (!rawIdOrUrl) return "";
    if (rawIdOrUrl.includes("drive.google.com")) {
      let driveUrl = rawIdOrUrl;
      if (driveUrl.includes("/view")) {
        driveUrl = driveUrl.replace(/\/view.*$/, "/preview");
      } else if (!driveUrl.includes("/preview")) {
        driveUrl = driveUrl.replace(/\/?$/, "/preview");
      }
      return driveUrl;
    }
    return `https://www.youtube.com/embed/${rawIdOrUrl}?rel=0&modestbranding=1&enablejsapi=1`;
  };

  const handleSaveVideoId = () => {
    if (!tempVideoId.trim() || !onUpdateLesson) return;
    let cleanId = tempVideoId.trim();
    if (cleanId.includes("drive.google.com")) {
      // Keep Google Drive link intact
    } else if (cleanId.includes("v=")) {
      cleanId = cleanId.split("v=")[1]?.split("&")[0] || cleanId;
    } else if (cleanId.includes("youtu.be/")) {
      cleanId = cleanId.split("youtu.be/")[1]?.split("?")[0] || cleanId;
    }
    onUpdateLesson(lesson.moduleIndex, lesson.id, { youtubeId: cleanId });
    setShowVideoModal(false);
    showToast("Updated lecture video");
  };

  const handleSaveReadingOverview = () => {
    if (!onUpdateLesson) return;
    onUpdateLesson(lesson.moduleIndex, lesson.id, {
      readingContent: {
        overview: tempOverview,
        actionLinkText: lesson.readingContent?.actionLinkText || "Click here to view official curriculum",
        actionLinkUrl: lesson.readingContent?.actionLinkUrl || "#",
        sections: lesson.readingContent?.sections || []
      }
    });
    setIsEditingOverview(false);
    showToast("Updated reading overview");
  };

  const handleStartEditSection = (idx: number, heading: string, body: string) => {
    setEditingSectionIdx(idx);
    setTempSectionHeading(heading);
    setTempSectionBody(body);
  };

  const handleSaveSection = (idx: number) => {
    if (!onUpdateLesson) return;
    const existingSections = lesson.readingContent?.sections ? [...lesson.readingContent.sections] : [];
    existingSections[idx] = { heading: tempSectionHeading, body: tempSectionBody };
    onUpdateLesson(lesson.moduleIndex, lesson.id, {
      readingContent: {
        overview: lesson.readingContent?.overview || lesson.summary,
        actionLinkText: lesson.readingContent?.actionLinkText || "Click here to view official curriculum",
        actionLinkUrl: lesson.readingContent?.actionLinkUrl || "#",
        sections: existingSections
      }
    });
    setEditingSectionIdx(null);
    showToast("Saved section changes");
  };

  const handleAddSection = () => {
    if (!onUpdateLesson) return;
    const existingSections = lesson.readingContent?.sections ? [...lesson.readingContent.sections] : [];
    const newSec = {
      heading: `Section ${existingSections.length + 1}: Key Framework`,
      body: "Write applied curriculum text, analytical guidelines, or case insights here..."
    };
    const updated = [...existingSections, newSec];
    onUpdateLesson(lesson.moduleIndex, lesson.id, {
      readingContent: {
        overview: lesson.readingContent?.overview || lesson.summary,
        actionLinkText: lesson.readingContent?.actionLinkText || "Click here to view official curriculum",
        actionLinkUrl: lesson.readingContent?.actionLinkUrl || "#",
        sections: updated
      }
    });
    handleStartEditSection(updated.length - 1, newSec.heading, newSec.body);
    showToast("Added new reading section");
  };

  const handleDeleteSection = (idx: number) => {
    if (!onUpdateLesson) return;
    const existingSections = lesson.readingContent?.sections ? [...lesson.readingContent.sections] : [];
    const updated = existingSections.filter((_, i) => i !== idx);
    onUpdateLesson(lesson.moduleIndex, lesson.id, {
      readingContent: {
        overview: lesson.readingContent?.overview || lesson.summary,
        actionLinkText: lesson.readingContent?.actionLinkText || "Click here to view official curriculum",
        actionLinkUrl: lesson.readingContent?.actionLinkUrl || "#",
        sections: updated
      }
    });
    if (editingSectionIdx === idx) setEditingSectionIdx(null);
    showToast("Removed section");
  };

  const handleSaveSummary = () => {
    if (!onUpdateLesson) return;
    onUpdateLesson(lesson.moduleIndex, lesson.id, { summary: tempSummary });
    setIsEditingSummary(false);
    showToast("Saved lecture overview");
  };

  const handleAddObjective = (objText: string) => {
    if (!objText.trim() || !onUpdateLesson) return;
    const updated = [...lesson.objectives, objText.trim()];
    onUpdateLesson(lesson.moduleIndex, lesson.id, { objectives: updated });
    showToast("Added objective");
  };

  const handleDeleteObjective = (idx: number) => {
    if (!onUpdateLesson) return;
    const updated = lesson.objectives.filter((_, i) => i !== idx);
    onUpdateLesson(lesson.moduleIndex, lesson.id, { objectives: updated });
    showToast("Removed objective");
  };

  const handleAddTakeaway = (takText: string) => {
    if (!takText.trim() || !onUpdateLesson) return;
    const updated = [...lesson.takeaways, takText.trim()];
    onUpdateLesson(lesson.moduleIndex, lesson.id, { takeaways: updated });
    showToast("Added takeaway");
  };

  const handleDeleteTakeaway = (idx: number) => {
    if (!onUpdateLesson) return;
    const updated = lesson.takeaways.filter((_, i) => i !== idx);
    onUpdateLesson(lesson.moduleIndex, lesson.id, { takeaways: updated });
    showToast("Removed takeaway");
  };

  const targetWatchSeconds = 45;
  const progressPercent = Math.min(100, Math.round((secondsWatched / targetWatchSeconds) * 100));

  useEffect(() => {
    setSecondsWatched(isCompleted ? targetWatchSeconds : 0);
    setIsPlaying(false);
  }, [lesson.id, isCompleted]);

  useEffect(() => {
    let interval: any = null;
    if (isPlaying && secondsWatched < targetWatchSeconds) {
      interval = setInterval(() => {
        setSecondsWatched((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, secondsWatched]);

  // Linear lesson sequence for Prev/Next
  const allLessons = modules.flatMap(m => m.lessons);
  const currentIndex = allLessons.findIndex(l => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const contentType = lesson.contentType || (lesson.youtubeId ? "video" : "reading");
  let pillPrefix = "Lecture";
  if (contentType === "reading") pillPrefix = "Reading Material";
  else if (contentType === "quiz") pillPrefix = "Quiz";
  else if (contentType === "transcript") pillPrefix = "Transcript";
  else if (contentType === "book") pillPrefix = "Books & References";
  else if (contentType === "download") pillPrefix = "Download";

  const pillTitle = `${pillPrefix}: ${lesson.title}`;

  return (
    <div className={`nptel-classroom-card ${isFullscreen ? 'nptel-fullscreen-mode' : ''}`}>
      {/* Top Action Strip (Matching Screenshot 1 & 3) */}
      <div className="nptel-content-header-strip">
        <div className="flex-align-center gap-2 overflow-hidden">
          {/* Active Unit Blue Pill with Live In-Place Edit */}
          {isEditingTitle ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <input
                type="text"
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveTitle();
                  if (e.key === 'Escape') setIsEditingTitle(false);
                }}
                autoFocus
                style={{
                  padding: '4px 8px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  border: '1px solid #2563EB',
                  borderRadius: '4px',
                  outline: 'none',
                  background: '#FFFFFF',
                  color: '#1E293B',
                  minWidth: '240px'
                }}
              />
              <button
                type="button"
                onClick={handleSaveTitle}
                style={{ padding: '4px 8px', background: '#2563EB', color: '#FFFFFF', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                title="Save title"
              >
                <Check style={{ width: '12px', height: '12px' }} />
              </button>
              <button
                type="button"
                onClick={() => setIsEditingTitle(false)}
                style={{ padding: '4px 8px', background: '#E2E8F0', color: '#475569', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                title="Cancel"
              >
                <X style={{ width: '12px', height: '12px' }} />
              </button>
            </div>
          ) : (
            <div 
              onClick={() => isLiveEditMode && setIsEditingTitle(true)}
              className="nptel-active-unit-pill text-truncate" 
              title={isLiveEditMode ? "Click to edit lesson title directly" : pillTitle}
              style={isLiveEditMode ? { 
                cursor: 'pointer', 
                border: '1px dashed #2563EB', 
                background: '#EFF6FF',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              } : undefined}
            >
              <span>{pillTitle}</span>
              {isLiveEditMode && (
                <Edit3 style={{ width: '11px', height: '11px', color: '#2563EB', flexShrink: 0 }} />
              )}
            </div>
          )}
        </div>

        {/* Right Buttons: Bookmark & Full Screen (Amber Border) */}
        <div className="flex-align-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onToggleBookmark(lesson.id)}
            className={`nptel-bookmark-btn ${isBookmarked ? 'is-active' : ''}`}
            title={isBookmarked ? "Remove from bookmarks" : "Bookmark this unit"}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-blue-600 text-blue-600' : 'text-slate-600'}`} />
            <span>{isBookmarked ? "Bookmarked" : "Bookmark"}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="nptel-fullscreen-btn"
            title={isFullscreen ? "Exit Full Screen" : "Full Screen"}
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-3.5 h-3.5 mr-1" />
                <span>Exit Screen</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5 mr-1" />
                <span>Full Screen</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="nptel-content-body-area">
        {/* CASE 1: Reading Material View (Exact Match to Screenshot 1 & 3) */}
        {contentType === "reading" && (
          <div className="nptel-reading-container">
            {/* Iconic Clickable Link from NPTEL Screenshot */}
            <div className="nptel-reading-link-row">
              <a
                href={lesson.readingContent?.actionLinkUrl || "#"}
                target="_blank"
                rel="noreferrer"
                className="nptel-reading-action-link"
              >
                {lesson.readingContent?.actionLinkText || `Click here to view the NCIE and its initiative`}
              </a>
            </div>

            {/* Structured Document Content */}
            <div className="nptel-reading-document">
              <h3 className="text-xl font-bold text-slate-900 mb-2">{lesson.title}</h3>

              {/* In-Place Reading Overview Editor */}
              {isEditingOverview ? (
                <div style={{ marginBottom: '16px', background: '#F8FAFC', padding: '12px', border: '1px solid #BFDBFE', borderRadius: '6px' }}>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#1D4ED8', marginBottom: '4px' }}>
                    Document Overview
                  </label>
                  <textarea
                    rows={3}
                    value={tempOverview}
                    onChange={(e) => setTempOverview(e.target.value)}
                    style={{ width: '100%', padding: '8px', fontSize: '0.82rem', border: '1px solid #CBD5E1', borderRadius: '4px', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
                  />
                  <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end', marginTop: '8px' }}>
                    <button
                      type="button"
                      onClick={() => setIsEditingOverview(false)}
                      style={{ padding: '4px 10px', fontSize: '0.74rem', background: '#E2E8F0', color: '#475569', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveReadingOverview}
                      style={{ padding: '4px 12px', fontSize: '0.74rem', fontWeight: 600, background: '#1D4ED8', color: '#FFFFFF', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      Save Overview
                    </button>
                  </div>
                </div>
              ) : (
                <div 
                  onClick={() => isLiveEditMode && setIsEditingOverview(true)}
                  style={isLiveEditMode ? { cursor: 'pointer', padding: '8px', border: '1px dashed #93C5FD', borderRadius: '6px', background: '#F8FAFC', marginBottom: '16px' } : { marginBottom: '24px' }}
                  title={isLiveEditMode ? "Click to edit overview text" : undefined}
                >
                  <p className="text-slate-700 leading-relaxed text-sm">
                    {lesson.readingContent?.overview || lesson.summary}
                  </p>
                  {isLiveEditMode && (
                    <span style={{ fontSize: '0.68rem', color: '#1D4ED8', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '6px' }}>
                      <Edit3 style={{ width: '10px', height: '10px' }} />
                      Click to edit overview
                    </span>
                  )}
                </div>
              )}

              {/* In-Place Reading Sections */}
              {lesson.readingContent?.sections?.map((sec, idx) => {
                const isEditingThis = editingSectionIdx === idx;
                if (isEditingThis) {
                  return (
                    <div key={idx} style={{ marginBottom: '16px', background: '#F8FAFC', padding: '14px', border: '1px solid #BFDBFE', borderRadius: '6px' }}>
                      <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#1D4ED8', marginBottom: '3px' }}>
                        Section Heading
                      </label>
                      <input
                        type="text"
                        value={tempSectionHeading}
                        onChange={(e) => setTempSectionHeading(e.target.value)}
                        style={{ width: '100%', padding: '6px 8px', fontSize: '0.85rem', fontWeight: 700, border: '1px solid #CBD5E1', borderRadius: '4px', outline: 'none', boxSizing: 'border-box', marginBottom: '10px' }}
                      />
                      <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#1D4ED8', marginBottom: '3px' }}>
                        Section Content
                      </label>
                      <textarea
                        rows={4}
                        value={tempSectionBody}
                        onChange={(e) => setTempSectionBody(e.target.value)}
                        style={{ width: '100%', padding: '8px', fontSize: '0.8rem', border: '1px solid #CBD5E1', borderRadius: '4px', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
                      />
                      <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end', marginTop: '8px' }}>
                        <button
                          type="button"
                          onClick={() => setEditingSectionIdx(null)}
                          style={{ padding: '4px 10px', fontSize: '0.74rem', background: '#E2E8F0', color: '#475569', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSaveSection(idx)}
                          style={{ padding: '4px 12px', fontSize: '0.74rem', fontWeight: 600, background: '#1D4ED8', color: '#FFFFFF', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                        >
                          Save Section
                        </button>
                      </div>
                    </div>
                  );
                }

                return (
                  <div 
                    key={idx} 
                    className="nptel-reading-section"
                    style={isLiveEditMode ? { position: 'relative', border: '1px dashed #E2E8F0', padding: '10px 12px', borderRadius: '6px', background: '#FAFAFA', marginBottom: '14px' } : {}}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <h4 className="text-base font-bold text-slate-800">{sec.heading}</h4>
                      {isLiveEditMode && (
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button
                            type="button"
                            onClick={() => handleStartEditSection(idx, sec.heading, sec.body)}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', padding: '3px 8px', fontSize: '0.68rem', fontWeight: 600, color: '#1D4ED8', background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '4px', cursor: 'pointer' }}
                            title="Edit this section"
                          >
                            <Edit3 style={{ width: '11px', height: '11px' }} />
                            <span>Edit</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteSection(idx)}
                            style={{ padding: '3px 6px', color: '#DC2626', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '4px', cursor: 'pointer' }}
                            title="Delete this section"
                          >
                            <Trash2 style={{ width: '11px', height: '11px' }} />
                          </button>
                        </div>
                      )}
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">{sec.body}</p>
                  </div>
                );
              })}

              {isLiveEditMode && (
                <div style={{ marginTop: '14px', marginBottom: '20px', textAlign: 'center' }}>
                  <button
                    type="button"
                    onClick={handleAddSection}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 20px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: '#1D4ED8',
                      background: '#EFF6FF',
                      border: '1px dashed #3B82F6',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    <Plus style={{ width: '14px', height: '14px' }} />
                    <span>+ Add Section to Reading Document</span>
                  </button>
                </div>
              )}

              {/* Resource Attachments */}
              {lesson.resources && lesson.resources.length > 0 && (
                <div className="nptel-reading-resources-box">
                  <div className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
                    Official Reference Circulars & Guidelines:
                  </div>
                  <div className="flex flex-col gap-2">
                    {lesson.resources.map((res, i) => (
                      <a
                        key={i}
                        href={res.url}
                        target="_blank"
                        rel="noreferrer"
                        className="nptel-reading-res-item"
                      >
                        <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                        <span className="font-semibold text-slate-800 text-xs">{res.title}</span>
                        {res.size && <span className="text-xxs text-slate-400 ml-auto">({res.size})</span>}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Navigation Buttons */}
            <div className="nptel-bottom-nav-row">
              <button
                type="button"
                onClick={() => prevLesson && onSelectLesson(prevLesson)}
                disabled={!prevLesson}
                className={`nptel-unit-step-btn ${!prevLesson ? 'disabled' : ''}`}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                <span>Previous Unit</span>
              </button>

              <button
                type="button"
                onClick={() => nextLesson && onSelectLesson(nextLesson)}
                disabled={!nextLesson}
                className={`nptel-unit-step-btn primary ${!nextLesson ? 'disabled' : ''}`}
              >
                <span>Next Unit</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        )}

        {/* CASE 2: Video Lecture View */}
        {contentType === "video" && lesson.youtubeId && (
          <div className="nptel-video-view-container">
            {/* 16:9 YouTube / Google Drive Player */}
            <div className="nptel-video-embed-box">
              <iframe
                src={getVideoEmbedUrl(lesson.youtubeId)}
                title={lesson.youtubeTitle || lesson.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                onLoad={() => setIsPlaying(true)}
                className="nptel-video-iframe"
              />
            </div>

            {/* Anti-cheat Verification Bar */}
            <div className="nptel-player-footer-bar">
              <div className="flex-align-center gap-2 text-xs">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-slate-500 font-medium">Watch Verification:</span>
                <span className="font-bold text-blue-600">{progressPercent}%</span>
              </div>

              <div className="nptel-player-progress-track">
                <div 
                  className="nptel-player-progress-fill" 
                  style={{ width: `${progressPercent}%` }} 
                />
              </div>

              <div>
                {isLiveEditMode && (
                  <button
                    type="button"
                    onClick={() => setShowVideoModal(true)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 10px',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      color: '#1D4ED8',
                      background: '#EFF6FF',
                      border: '1px solid #BFDBFE',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      marginRight: '8px'
                    }}
                    title="Change video source or YouTube URL"
                  >
                    <Play style={{ width: '12px', height: '12px' }} />
                    <span>Edit Video URL</span>
                  </button>
                )}
                {!isCompleted ? (
                  <button 
                    type="button" 
                    onClick={onOpenQuiz} 
                    className="nptel-take-assignment-btn"
                  >
                    <Sparkles className="w-3.5 h-3.5 mr-1" />
                    <span>Take Assignment</span>
                  </button>
                ) : (
                  <div className="nptel-completed-badge">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                    <span>Completed</span>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Previous & Next Unit Navigation */}
            <div className="nptel-bottom-nav-row">
              <button
                type="button"
                onClick={() => prevLesson && onSelectLesson(prevLesson)}
                disabled={!prevLesson}
                className={`nptel-unit-step-btn ${!prevLesson ? 'disabled' : ''}`}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                <span>Previous Unit</span>
              </button>

              <button
                type="button"
                onClick={() => nextLesson && onSelectLesson(nextLesson)}
                disabled={!nextLesson}
                className={`nptel-unit-step-btn primary ${!nextLesson ? 'disabled' : ''}`}
              >
                <span>Next Unit</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>

            {/* Subtabs Below Video */}
            <div className="nptel-video-subtabs-box">
              <div className="nptel-subtabs-header">
                <button
                  type="button"
                  onClick={() => setActiveSubTab("summary")}
                  className={`nptel-subtab-btn ${activeSubTab === "summary" ? "active" : ""}`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Lecture Summary</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveSubTab("downloads")}
                  className={`nptel-subtab-btn ${activeSubTab === "downloads" ? "active" : ""}`}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Transcripts & Slides</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveSubTab("quiz")}
                  className={`nptel-subtab-btn ${activeSubTab === "quiz" ? "active" : ""}`}
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Weekly Quiz ({lesson.quiz?.length || 0})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveSubTab("youtube")}
                  className={`nptel-subtab-btn ${activeSubTab === "youtube" ? "active" : ""}`}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>YouTube Channel</span>
                </button>
              </div>

              <div className="nptel-subtab-content">
                {activeSubTab === "summary" && (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <h4 className="font-bold text-slate-800 text-sm">Lecture Overview</h4>
                      {isLiveEditMode && !isEditingSummary && (
                        <button
                          type="button"
                          onClick={() => setIsEditingSummary(true)}
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', padding: '2px 8px', fontSize: '0.68rem', fontWeight: 600, color: '#1D4ED8', background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '4px', cursor: 'pointer' }}
                        >
                          <Edit3 style={{ width: '10px', height: '10px' }} />
                          <span>Edit Overview</span>
                        </button>
                      )}
                    </div>

                    {isEditingSummary ? (
                      <div style={{ marginBottom: '14px', background: '#F8FAFC', padding: '10px', border: '1px solid #BFDBFE', borderRadius: '6px' }}>
                        <textarea
                          rows={3}
                          value={tempSummary}
                          onChange={(e) => setTempSummary(e.target.value)}
                          style={{ width: '100%', padding: '6px 8px', fontSize: '0.8rem', border: '1px solid #CBD5E1', borderRadius: '4px', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
                        />
                        <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end', marginTop: '6px' }}>
                          <button
                            type="button"
                            onClick={() => setIsEditingSummary(false)}
                            style={{ padding: '3px 8px', fontSize: '0.72rem', background: '#E2E8F0', color: '#475569', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={handleSaveSummary}
                            style={{ padding: '3px 10px', fontSize: '0.72rem', fontWeight: 600, background: '#1D4ED8', color: '#FFFFFF', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p 
                        onClick={() => isLiveEditMode && setIsEditingSummary(true)}
                        className="text-slate-600 text-sm leading-relaxed mb-4"
                        style={isLiveEditMode ? { cursor: 'pointer', padding: '4px 6px', border: '1px dashed #CBD5E1', borderRadius: '4px' } : {}}
                        title={isLiveEditMode ? "Click to edit overview" : undefined}
                      >
                        {lesson.summary}
                      </p>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <h5 className="font-semibold text-slate-800 text-xs">Key Objectives</h5>
                      {isLiveEditMode && (
                        <button
                          type="button"
                          onClick={() => {
                            const val = prompt("Enter new learning objective:");
                            if (val) handleAddObjective(val);
                          }}
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', padding: '2px 6px', fontSize: '0.66rem', color: '#1D4ED8', background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '3px', cursor: 'pointer' }}
                        >
                          <Plus style={{ width: '10px', height: '10px' }} />
                          <span>Add</span>
                        </button>
                      )}
                    </div>
                    <ul className="list-disc pl-5 text-slate-600 text-xs space-y-1 mb-4">
                      {lesson.objectives.map((obj, i) => (
                        <li key={i} style={{ display: isLiveEditMode ? 'flex' : undefined, alignItems: isLiveEditMode ? 'center' : undefined, justifyContent: isLiveEditMode ? 'space-between' : undefined, gap: '6px' }}>
                          <span>{obj}</span>
                          {isLiveEditMode && (
                            <button
                              type="button"
                              onClick={() => handleDeleteObjective(i)}
                              style={{ padding: '1px 4px', color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer' }}
                              title="Delete objective"
                            >
                              <Trash2 style={{ width: '10px', height: '10px' }} />
                            </button>
                          )}
                        </li>
                      ))}
                    </ul>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <h5 className="font-semibold text-slate-800 text-xs">Core Takeaways</h5>
                      {isLiveEditMode && (
                        <button
                          type="button"
                          onClick={() => {
                            const val = prompt("Enter core rule of thumb / takeaway:");
                            if (val) handleAddTakeaway(val);
                          }}
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', padding: '2px 6px', fontSize: '0.66rem', color: '#1D4ED8', background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '3px', cursor: 'pointer' }}
                        >
                          <Plus style={{ width: '10px', height: '10px' }} />
                          <span>Add</span>
                        </button>
                      )}
                    </div>
                    <ul className="list-disc pl-5 text-slate-600 text-xs space-y-1">
                      {lesson.takeaways.map((tak, i) => (
                        <li key={i} style={{ display: isLiveEditMode ? 'flex' : undefined, alignItems: isLiveEditMode ? 'center' : undefined, justifyContent: isLiveEditMode ? 'space-between' : undefined, gap: '6px' }}>
                          <span>{tak}</span>
                          {isLiveEditMode && (
                            <button
                              type="button"
                              onClick={() => handleDeleteTakeaway(i)}
                              style={{ padding: '1px 4px', color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer' }}
                              title="Delete takeaway"
                            >
                              <Trash2 style={{ width: '10px', height: '10px' }} />
                            </button>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeSubTab === "downloads" && (
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm mb-3">Download Lecture Notes & Transcripts</h4>
                    <div className="flex flex-col gap-2">
                      <a
                        href="#"
                        className="nptel-reading-res-item"
                        onClick={(e) => { e.preventDefault(); alert("Downloading official English lecture transcript PDF..."); }}
                      >
                        <FileText className="w-4 h-4 text-blue-600" />
                        <span className="font-semibold text-slate-800 text-xs">
                          {lesson.title} - Verbatim English Transcript (PDF)
                        </span>
                        <span className="text-xxs text-slate-400 ml-auto">1.2 MB</span>
                      </a>

                      <a
                        href="#"
                        className="nptel-reading-res-item"
                        onClick={(e) => { e.preventDefault(); alert("Downloading official presentation slides..."); }}
                      >
                        <FileText className="w-4 h-4 text-emerald-600" />
                        <span className="font-semibold text-slate-800 text-xs">
                          Lecture Slides & Diagram Compendium (PPTX/PDF)
                        </span>
                        <span className="text-xxs text-slate-400 ml-auto">3.8 MB</span>
                      </a>
                    </div>
                  </div>
                )}

                {activeSubTab === "quiz" && (
                  <div>
                    <div className="flex-between mb-3">
                      <h4 className="font-bold text-slate-800 text-sm">
                        Week {lesson.weekNumber} Assessment
                      </h4>
                      <button
                        type="button"
                        onClick={onOpenQuiz}
                        className="btn btn-primary btn-sm"
                      >
                        Launch Interactive Quiz
                      </button>
                    </div>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      This unit contains {lesson.quiz?.length || 3} multiple choice questions. Scored quizzes contribute toward your Best 6 of 8 consolidated grade.
                    </p>
                  </div>
                )}

                {activeSubTab === "youtube" && (
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm mb-2">Official NCIE Broadcast Channel</h4>
                    <p className="text-slate-600 text-xs leading-relaxed mb-4">
                      Lectures are streamed directly from the official NCIE YouTube channel. Subscribe and interact with live chats during Friday Q&A sessions.
                    </p>
                    <div className="flex gap-3">
                      <a
                        href={`https://www.youtube.com/watch?v=${lesson.youtubeId}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-outline btn-sm"
                      >
                        <ExternalLink className="w-3.5 h-3.5 mr-1" />
                        Watch on YouTube
                      </a>

                      <a
                        href="https://www.youtube.com/@NCIEIndia?sub_confirmation=1"
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-primary btn-sm"
                      >
                        <ThumbsUp className="w-3.5 h-3.5 mr-1" />
                        Subscribe to NCIE India
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* CASE 3: Quiz or Other Resource View */}
        {contentType === "quiz" && (
          <div className="p-6 text-center">
            <h3 className="text-lg font-bold text-slate-900 mb-2">{lesson.title}</h3>
            <p className="text-slate-600 text-sm mb-6">{lesson.summary}</p>
            <button
              type="button"
              onClick={onOpenQuiz}
              className="btn btn-primary"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Start Assessment Now
            </button>
          </div>
        )}

        {/* CASE 4: Transcripts / Books / Downloads View */}
        {(contentType === "transcript" || contentType === "book" || contentType === "download") && (
          <div className="nptel-reading-container">
            <div className="nptel-reading-link-row">
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); alert("Opening resource download portal..."); }}
                className="nptel-reading-action-link"
              >
                {lesson.readingContent?.actionLinkText || "Click here to access this resource"}
              </a>
            </div>

            <div className="nptel-reading-document">
              <h3 className="text-xl font-bold text-slate-900 mb-3">{lesson.title}</h3>
              <p className="text-slate-700 leading-relaxed text-sm mb-6">
                {lesson.readingContent?.overview || lesson.summary}
              </p>

              {lesson.readingContent?.sections?.map((sec, idx) => (
                <div key={idx} className="nptel-reading-section">
                  <h4 className="text-base font-bold text-slate-800 mb-2">{sec.heading}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">{sec.body}</p>
                </div>
              ))}

              {lesson.resources && (
                <div className="nptel-reading-resources-box mt-4">
                  <div className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
                    Available Downloads:
                  </div>
                  <div className="flex flex-col gap-2">
                    {lesson.resources.map((res, i) => (
                      <a
                        key={i}
                        href="#"
                        onClick={(e) => { e.preventDefault(); alert(`Downloading ${res.title}...`); }}
                        className="nptel-reading-res-item"
                      >
                        <Download className="w-4 h-4 text-blue-600 shrink-0" />
                        <span className="font-semibold text-slate-800 text-xs">{res.title}</span>
                        {res.size && <span className="text-xxs text-slate-400 ml-auto">({res.size})</span>}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Live Edit Video Modal */}
      {showVideoModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(3px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '16px'
          }}
          onClick={() => setShowVideoModal(false)}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '10px',
              width: '100%',
              maxWidth: '480px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
              border: '1px solid #E2E8F0',
              overflow: 'hidden'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                padding: '14px 18px',
                background: '#F8FAFC',
                borderBottom: '1px solid #E2E8F0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Play style={{ width: '16px', height: '16px', color: '#2563EB' }} />
                <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                  Change Lecture Video Source
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowVideoModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#64748B',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                <X style={{ width: '16px', height: '16px' }} />
              </button>
            </div>

            <div style={{ padding: '18px' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                YouTube Link / Video ID or Google Drive Video Link
              </label>
              <input
                type="text"
                value={tempVideoId}
                onChange={(e) => setTempVideoId(e.target.value)}
                placeholder="e.g. https://drive.google.com/file/d/... or YouTube ID / URL"
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  fontSize: '0.84rem',
                  border: '1px solid #CBD5E1',
                  borderRadius: '6px',
                  outline: 'none',
                  fontFamily: 'monospace',
                  marginBottom: '12px'
                }}
                autoFocus
              />

              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '0.72rem', color: '#64748B', marginBottom: '6px', fontWeight: 600 }}>
                  Quick Presets:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  <button
                    type="button"
                    onClick={() => setTempVideoId("dQw4w9WgXcQ")}
                    style={{
                      padding: '4px 8px',
                      fontSize: '0.7rem',
                      background: '#F1F5F9',
                      border: '1px solid #CBD5E1',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      color: '#334155'
                    }}
                  >
                    Startup Masterclass
                  </button>
                  <button
                    type="button"
                    onClick={() => setTempVideoId("jNQXAC9IVRw")}
                    style={{
                      padding: '4px 8px',
                      fontSize: '0.7rem',
                      background: '#F1F5F9',
                      border: '1px solid #CBD5E1',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      color: '#334155'
                    }}
                  >
                    AICTE Keynote
                  </button>
                  <button
                    type="button"
                    onClick={() => setTempVideoId("fJ9rUzIMcZQ")}
                    style={{
                      padding: '4px 8px',
                      fontSize: '0.7rem',
                      background: '#F1F5F9',
                      border: '1px solid #CBD5E1',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      color: '#334155'
                    }}
                  >
                    Venture Valuation
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setShowVideoModal(false)}
                  style={{
                    padding: '6px 14px',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    color: '#475569',
                    background: '#F8FAFC',
                    border: '1px solid #CBD5E1',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveVideoId}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '6px 16px',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    color: '#FFFFFF',
                    background: '#2563EB',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  <Save style={{ width: '13px', height: '13px' }} />
                  Save Video
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Live Edit Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#0F172A',
            color: '#FFFFFF',
            padding: '8px 18px',
            borderRadius: '24px',
            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.78rem',
            fontWeight: 600,
            zIndex: 10000,
            border: '1px solid #334155'
          }}
        >
          <Check style={{ width: '14px', height: '14px', color: '#10B981' }} />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
