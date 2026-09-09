import React, { useState } from 'react';
import { 
  Bookmark, 
  Trash2, 
  ArrowRight, 
  Video, 
  FileText, 
  Search,
  CheckCircle2,
  Clock,
  RotateCcw,
  AlertTriangle,
  X
} from 'lucide-react';
import type { LMSLesson, LMSModule } from '../data/curriculumData';

interface Props {
  modules: LMSModule[];
  bookmarkedIds: string[];
  onSelectLesson: (lesson: LMSLesson) => void;
  onRemoveBookmark: (lessonId: string) => void;
}

export const MyBookmarksView: React.FC<Props> = ({
  modules,
  bookmarkedIds,
  onSelectLesson,
  onRemoveBookmark
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<"all" | "video" | "reading">("all");

  // Acknowledgment Modal State
  const [pendingRemoveLesson, setPendingRemoveLesson] = useState<LMSLesson | null>(null);

  // Acknowledgment Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [lastRemovedId, setLastRemovedId] = useState<string | null>(null);

  const allLessons = modules.flatMap(m => m.lessons);
  const bookmarkedLessons = allLessons.filter(l => bookmarkedIds.includes(l.id));

  // Filtered by search and content type
  const filteredLessons = bookmarkedLessons.filter((les) => {
    const isVideo = les.youtubeId || les.contentType === 'video';
    const isReading = les.contentType === 'reading';

    const matchesSearch =
      searchQuery.trim() === "" ||
      les.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      les.summary.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType =
      selectedType === "all" ||
      (selectedType === "video" && isVideo) ||
      (selectedType === "reading" && isReading);

    return matchesSearch && matchesType;
  });

  // Confirm removal with acknowledgment toast
  const handleConfirmRemoval = () => {
    if (!pendingRemoveLesson) return;
    const removedLesson = pendingRemoveLesson;

    onRemoveBookmark(removedLesson.id);
    setLastRemovedId(removedLesson.id);
    setToastMessage(`Removed "${removedLesson.title}" from bookmarks`);
    setPendingRemoveLesson(null);

    // Auto dismiss toast after 4.5s
    setTimeout(() => {
      setToastMessage((current) => (current ? null : current));
    }, 4500);
  };

  // Undo removal
  const handleUndoRemoval = () => {
    if (lastRemovedId) {
      onRemoveBookmark(lastRemovedId); // Re-adds it
      setToastMessage(null);
      setLastRemovedId(null);
    }
  };

  return (
    <div className="nptel-tab-page-container" style={{ maxWidth: '1080px', margin: '0 auto', paddingBottom: '40px' }}>
      {/* 1. Header Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0F172A', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bookmark className="w-5 h-5 text-blue-600 fill-blue-600" />
            <span>My Bookmarked Units & Lectures</span>
          </h2>
          <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '4px 0 0 0' }}>
            Quickly jump back to important lectures, reading materials, and weekly assessments you saved for revision.
          </p>
        </div>

        <div
          style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            padding: '4px 12px',
            borderRadius: '20px',
            background: '#EFF6FF',
            color: '#0284C7',
            border: '1px solid #BAE6FD',
          }}
        >
          {bookmarkedLessons.length} Saved {bookmarkedLessons.length === 1 ? 'Unit' : 'Units'}
        </div>
      </div>

      {/* 2. Search & Filter Bar */}
      {bookmarkedLessons.length > 0 && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '20px',
            flexWrap: 'wrap',
            background: '#FFFFFF',
            padding: '8px 14px',
            borderRadius: '8px',
            border: '1px solid #E2E8F0',
          }}
        >
          {/* Search Input */}
          <div style={{ flex: 1, minWidth: '220px', position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search className="w-3.5 h-3.5 text-slate-400" style={{ position: 'absolute', left: '10px' }} />
            <input
              type="text"
              placeholder="Search in your bookmarks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '6px 10px 6px 32px',
                fontSize: '0.8rem',
                border: 'none',
                background: 'transparent',
                outline: 'none',
              }}
            />
          </div>

          {/* Type Filter Pills */}
          <div style={{ display: 'flex', gap: '4px', background: '#F1F5F9', padding: '2px', borderRadius: '4px' }}>
            {[
              { id: "all", label: `All (${bookmarkedLessons.length})` },
              { id: "video", label: `Videos (${bookmarkedLessons.filter(l => l.youtubeId || l.contentType === 'video').length})` },
              { id: "reading", label: `Readings (${bookmarkedLessons.filter(l => l.contentType === 'reading').length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedType(tab.id as any)}
                style={{
                  padding: '4px 10px',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  border: 'none',
                  borderRadius: '3px',
                  background: selectedType === tab.id ? '#FFFFFF' : 'transparent',
                  color: selectedType === tab.id ? '#0F172A' : '#64748B',
                  boxShadow: selectedType === tab.id ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 3. Empty State */}
      {bookmarkedLessons.length === 0 ? (
        <div
          style={{
            padding: '48px 24px',
            textAlign: 'center',
            background: '#FFFFFF',
            border: '2px dashed #CBD5E1',
            borderRadius: '12px',
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: '#F1F5F9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto',
              color: '#94A3B8',
            }}
          >
            <Bookmark className="w-6 h-6" />
          </div>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#0F172A', margin: '0 0 6px 0' }}>
            No Bookmarks Saved Yet
          </h3>
          <p style={{ fontSize: '0.8125rem', color: '#64748B', maxWidth: '420px', margin: '0 auto 16px auto', lineHeight: 1.5 }}>
            While watching video lectures or studying reading materials in the <strong>Course Outline</strong>, click the <strong>Bookmark</strong> button in the top right to save units here for quick exam revision.
          </p>
        </div>
      ) : filteredLessons.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 20px', background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0', color: '#64748B' }}>
          <p style={{ fontSize: '0.85rem', margin: '0 0 8px 0' }}>No bookmarks match your search query</p>
          <button
            onClick={() => { setSearchQuery(""); setSelectedType("all"); }}
            style={{ fontSize: '0.75rem', color: '#0284C7', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Reset filter
          </button>
        </div>
      ) : (
        /* 4. Responsive 2-Column Card Grid */
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: '16px',
          }}
        >
          {filteredLessons.map((les) => {
            const isVideo = les.youtubeId || les.contentType === 'video';
            const isReading = les.contentType === 'reading';

            return (
              <div
                key={les.id}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '8px',
                  border: '1px solid #E2E8F0',
                  padding: '18px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                  transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
                }}
              >
                <div>
                  {/* Top Metadata Row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span
                        style={{
                          fontSize: '0.68rem',
                          fontWeight: 600,
                          padding: '3px 8px',
                          borderRadius: '4px',
                          background: isVideo ? '#EFF6FF' : '#F0FDF4',
                          color: isVideo ? '#0284C7' : '#16A34A',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        {isVideo ? <Video className="w-3 h-3" /> : <FileText className="w-3 h-3" />}
                        <span>{isVideo ? 'Video Lecture' : isReading ? 'Reading Material' : 'Assessment'}</span>
                      </span>

                      <span style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 500 }}>
                        Week {les.weekNumber}
                      </span>
                    </div>

                    {/* Trash / Remove button with confirmation modal trigger */}
                    <button
                      type="button"
                      onClick={() => setPendingRemoveLesson(les)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#94A3B8',
                        cursor: 'pointer',
                        padding: '5px',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.15s ease',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#DC2626'; e.currentTarget.style.background = '#FEF2F2'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = '#94A3B8'; e.currentTarget.style.background = 'none'; }}
                      title="Remove bookmark"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Title */}
                  <h4
                    style={{
                      fontSize: '0.925rem',
                      fontWeight: 600,
                      color: '#0F172A',
                      margin: '0 0 6px 0',
                      lineHeight: 1.4,
                    }}
                  >
                    {les.title}
                  </h4>

                  {/* Summary */}
                  <p
                    style={{
                      fontSize: '0.78rem',
                      color: '#64748B',
                      lineHeight: 1.5,
                      margin: '0 0 16px 0',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {les.summary}
                  </p>
                </div>

                {/* Bottom Footer Action */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '12px',
                    borderTop: '1px solid #F8FAFC',
                  }}
                >
                  <span style={{ fontSize: '0.72rem', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock className="w-3 h-3" />
                    <span>Duration: {les.duration}</span>
                  </span>

                  <button
                    type="button"
                    onClick={() => onSelectLesson(les)}
                    className="nptel-open-unit-btn"
                  >
                    <span>Open Unit</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 5. Acknowledgment Confirmation Modal */}
      {pendingRemoveLesson && (
        <div className="modal-backdrop-overlay">
          <div
            className="modal-container-card animate-scale-up"
            style={{ maxWidth: '420px', borderRadius: '10px', padding: '24px' }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '14px' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: '#FEF2F2',
                  color: '#DC2626',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#0F172A', margin: 0 }}>
                  Remove from Bookmarks?
                </h3>
                <p style={{ fontSize: '0.78rem', color: '#64748B', margin: '4px 0 0 0', lineHeight: 1.4 }}>
                  Are you sure you want to remove this unit from your saved revision list?
                </p>
              </div>
            </div>

            {/* Target Unit Preview */}
            <div
              style={{
                padding: '12px 14px',
                background: '#F8FAFC',
                borderRadius: '6px',
                border: '1px solid #E2E8F0',
                marginBottom: '20px',
              }}
            >
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0F172A', marginBottom: '4px' }}>
                {pendingRemoveLesson.title}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
                Week {pendingRemoveLesson.weekNumber} • {pendingRemoveLesson.duration}
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setPendingRemoveLesson(null)}
                className="btn btn-outline"
                style={{ padding: '7px 16px', fontSize: '0.78rem', borderRadius: '6px' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmRemoval}
                style={{
                  padding: '7px 18px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  borderRadius: '6px',
                  border: 'none',
                  background: '#DC2626',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(220, 38, 38, 0.25)',
                }}
              >
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Acknowledgment Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 1000,
            background: '#0F172A',
            color: '#FFFFFF',
            padding: '12px 18px',
            borderRadius: '8px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            animation: 'modalScale 0.2s ease-out',
            maxWidth: '440px',
          }}
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span style={{ fontSize: '0.78rem', flex: 1, lineHeight: 1.4 }}>
            {toastMessage}
          </span>
          <button
            type="button"
            onClick={handleUndoRemoval}
            style={{
              background: '#334155',
              border: 'none',
              color: '#38BDF8',
              fontSize: '0.72rem',
              fontWeight: 600,
              padding: '4px 8px',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <RotateCcw className="w-3 h-3" />
            <span>Undo</span>
          </button>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            style={{
              background: 'none',
              border: 'none',
              color: '#94A3B8',
              cursor: 'pointer',
              padding: '2px',
            }}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
