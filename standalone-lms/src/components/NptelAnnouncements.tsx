import React from 'react';
import { Calendar, User, ArrowRight, ExternalLink } from 'lucide-react';
import { COURSE_ANNOUNCEMENTS, type AnnouncementItem } from '../data/curriculumData';
import type { NptelNavTab } from './NptelHeader';

interface Props {
  announcements?: AnnouncementItem[];
  readIds?: string[];
  onMarkAsRead?: (id: string) => void;
  onMarkAllAsRead?: () => void;
  onNavigateTab?: (tab: NptelNavTab) => void;
  onOpenManageExam?: () => void;
}

export const NptelAnnouncements: React.FC<Props> = ({
  announcements,
  readIds = [],
  onMarkAsRead,
  onNavigateTab,
  onOpenManageExam
}) => {
  const displayAnnouncements = announcements || COURSE_ANNOUNCEMENTS;
  const handleAction = (ann: AnnouncementItem) => {
    if (onMarkAsRead && !readIds.includes(ann.id)) {
      onMarkAsRead(ann.id);
    }

    if (!ann.actionBtn) return;

    if (ann.actionBtn.actionType === "exam") {
      onOpenManageExam?.();
    } else if (ann.actionBtn.actionType === "tab" && ann.actionBtn.target) {
      onNavigateTab?.(ann.actionBtn.target as any);
    } else if (ann.actionBtn.actionType === "external" && ann.actionBtn.target) {
      window.open(ann.actionBtn.target, "_blank", "noopener,noreferrer");
    }
  };

  const getBadgeStyle = (category: string) => {
    switch (category) {
      case "Important":
        return {
          background: '#FFFBEB',
          color: '#B45309',
          border: '1px solid #FDE68A'
        };
      case "Assignment":
        return {
          background: '#EFF6FF',
          color: '#1D4ED8',
          border: '1px solid #BFDBFE'
        };
      case "Exam":
        return {
          background: '#FAF5FF',
          color: '#7E22CE',
          border: '1px solid #E9D5FF'
        };
      case "General":
      default:
        return {
          background: '#F1F5F9',
          color: '#475569',
          border: '1px solid #E2E8F0'
        };
    }
  };

  return (
    <div style={{ maxWidth: '780px', margin: '0 auto', paddingBottom: '40px' }}>
      {/* Minimal Header */}
      <div style={{ marginBottom: '22px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0F172A', margin: 0 }}>
          Course Announcements & Circulars
        </h2>
        <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '4px 0 0 0' }}>
          Official notifications and deadline updates posted by the Course Coordinator and NCIE Secretariat.
        </p>
      </div>

      {/* Announcements List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {displayAnnouncements.map((ann) => {
          const isRead = readIds.includes(ann.id);
          const badgeStyle = getBadgeStyle(ann.category);

          return (
            <div
              key={ann.id}
              onClick={() => onMarkAsRead?.(ann.id)}
              style={{
                background: '#FFFFFF',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
                padding: '18px 20px',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#CBD5E1';
                e.currentTarget.style.boxShadow = '0 3px 8px rgba(0, 0, 0, 0.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E2E8F0';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.04)';
              }}
            >
              {/* Top Row: Badge & Date */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      padding: '2px 8px',
                      borderRadius: '4px',
                      ...badgeStyle
                    }}
                  >
                    {ann.category}
                  </span>

                  {!isRead && (
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: '#2563EB',
                        display: 'inline-block'
                      }}
                      title="Unread"
                    />
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.73rem', color: '#64748B' }}>
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{ann.date}</span>
                </div>
              </div>

              {/* Title */}
              <h3 style={{ fontSize: '0.98rem', fontWeight: 600, color: '#0F172A', margin: '0 0 8px 0', lineHeight: 1.4 }}>
                {ann.title}
              </h3>

              {/* Content */}
              <p style={{ fontSize: '0.82rem', color: '#334155', lineHeight: 1.6, margin: 0 }}>
                {ann.content}
              </p>

              {/* Bottom Row: Author on Left, Clean Action on Right */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '14px',
                  paddingTop: '12px',
                  borderTop: '1px solid #F1F5F9',
                  fontSize: '0.75rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748B' }}>
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Posted by: <strong style={{ color: '#1E293B', fontWeight: 500 }}>{ann.author}</strong></span>
                </div>

                {ann.actionBtn && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAction(ann);
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      background: 'none',
                      border: 'none',
                      padding: '2px 4px',
                      color: '#1D4ED8',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.textDecoration = 'underline';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.textDecoration = 'none';
                    }}
                  >
                    <span>{ann.actionBtn.label}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
