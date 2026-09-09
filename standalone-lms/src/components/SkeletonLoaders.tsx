import React from 'react';

// Reusable Primitive Skeleton Element (Matching Image 2 wireframes)
export const SkeletonElem: React.FC<{
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
  style?: React.CSSProperties;
}> = ({ width, height, borderRadius, className = '', style }) => (
  <div
    className={`skeleton-shimmer-elem ${className}`}
    style={{
      width: width !== undefined ? width : '100%',
      height: height !== undefined ? height : '16px',
      borderRadius: borderRadius !== undefined ? borderRadius : '4px',
      ...style,
    }}
    aria-hidden="true"
  />
);

// Reusable Paragraph Skeleton Lines
export const SkeletonLines: React.FC<{
  count?: number;
  lastLineWidth?: string;
  lineHeight?: number;
  gap?: number;
}> = ({ count = 3, lastLineWidth = '65%', lineHeight = 13, gap = 8 }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: `${gap}px`, width: '100%' }}>
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonElem
        key={i}
        height={`${lineHeight}px`}
        width={i === count - 1 ? lastLineWidth : `${100 - (i % 3) * 6}%`}
        borderRadius={4}
      />
    ))}
  </div>
);

// 1. Course Outline (Left Column) Skeleton Screen
export const CourseOutlineSkeleton: React.FC = () => {
  return (
    <div className="skeleton-card-container" style={{ padding: '16px' }}>
      {/* Title & Course Code */}
      <div style={{ paddingBottom: '12px', borderBottom: '1px solid #E2E8F0', marginBottom: '14px' }}>
        <SkeletonElem height={20} width="85%" style={{ marginBottom: '8px' }} />
        <SkeletonElem height={12} width="45%" />
      </div>

      {/* Search Input Box */}
      <div style={{ marginBottom: '16px' }}>
        <SkeletonElem height={36} borderRadius={6} />
      </div>

      {/* Week Modules List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {[1, 2, 3, 4, 5, 6].map((w) => (
          <div
            key={w}
            style={{
              border: '1px solid #E2E8F0',
              borderRadius: '6px',
              padding: '12px',
              background: '#F8FAFC',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                <SkeletonElem width={18} height={18} borderRadius="50%" />
                <SkeletonElem height={14} width="70%" />
              </div>
              <SkeletonElem width={12} height={12} borderRadius={2} />
            </div>
            {w === 1 && (
              <div
                style={{
                  paddingTop: '10px',
                  marginTop: '10px',
                  borderTop: '1px solid #E2E8F0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  paddingLeft: '24px',
                }}
              >
                <SkeletonElem height={12} width="80%" />
                <SkeletonElem height={12} width="60%" />
                <SkeletonElem height={12} width="75%" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// 2. Classroom (Right Column) Skeleton Screen (Image 2 Video Layout)
export const ClassroomSkeleton: React.FC = () => {
  return (
    <div className="skeleton-card-container" style={{ padding: '20px' }}>
      {/* Top Header Strip */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: '14px',
          borderBottom: '1px solid #E2E8F0',
          marginBottom: '16px',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <SkeletonElem width={280} height={28} borderRadius={20} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <SkeletonElem width={90} height={30} borderRadius={6} />
          <SkeletonElem width={90} height={30} borderRadius={6} />
        </div>
      </div>

      {/* 16:9 Video Player Screen Placeholder */}
      <div className="skeleton-video-placeholder">
        <div className="skeleton-video-play-icon">
          <div
            style={{
              width: 0,
              height: 0,
              borderTop: '10px solid transparent',
              borderBottom: '10px solid transparent',
              borderLeft: '16px solid #64748B',
              marginLeft: '4px',
            }}
          />
        </div>
        {/* Video Player Bottom Controls Shimmer Bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '12px 16px',
            background: 'rgba(15, 23, 42, 0.2)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <SkeletonElem height={4} borderRadius={2} style={{ background: 'rgba(255,255,255,0.6)' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <SkeletonElem width={40} height={14} borderRadius={3} style={{ background: 'rgba(255,255,255,0.5)' }} />
              <SkeletonElem width={50} height={14} borderRadius={3} style={{ background: 'rgba(255,255,255,0.5)' }} />
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <SkeletonElem width={24} height={14} borderRadius={3} style={{ background: 'rgba(255,255,255,0.5)' }} />
              <SkeletonElem width={24} height={14} borderRadius={3} style={{ background: 'rgba(255,255,255,0.5)' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Prev / Next Unit Action Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 0',
          borderBottom: '1px solid #E2E8F0',
          marginBottom: '16px',
        }}
      >
        <SkeletonElem width={120} height={32} borderRadius={6} />
        <SkeletonElem width={140} height={32} borderRadius={6} />
        <SkeletonElem width={120} height={32} borderRadius={6} />
      </div>

      {/* Content Tabs (Summary, Downloads, Quiz, Discussion) */}
      <div style={{ display: 'flex', gap: '16px', borderBottom: '1px solid #E2E8F0', marginBottom: '16px' }}>
        <SkeletonElem width={90} height={32} borderRadius="6px 6px 0 0" />
        <SkeletonElem width={90} height={32} borderRadius="6px 6px 0 0" />
        <SkeletonElem width={80} height={32} borderRadius="6px 6px 0 0" />
        <SkeletonElem width={100} height={32} borderRadius="6px 6px 0 0" />
      </div>

      {/* Tab Content Placeholder */}
      <div style={{ padding: '16px', background: '#F8FAFC', borderRadius: '8px' }}>
        <SkeletonElem height={18} width="35%" style={{ marginBottom: '14px' }} />
        <SkeletonLines count={4} lastLineWidth="55%" />
      </div>
    </div>
  );
};

// 3. About The Course Skeleton Screen
export const AboutCourseSkeleton: React.FC = () => {
  return (
    <div className="skeleton-screen-wrapper">
      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <SkeletonElem height={26} width={260} style={{ marginBottom: '8px' }} />
        <SkeletonElem height={14} width={450} />
      </div>

      {/* 3 Stats Cards */}
      <div className="skeleton-grid-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="skeleton-card-container" style={{ margin: 0, padding: '16px' }}>
            <SkeletonElem height={12} width="40%" style={{ marginBottom: '8px' }} />
            <SkeletonElem height={20} width="70%" style={{ marginBottom: '6px' }} />
            <SkeletonElem height={12} width="50%" />
          </div>
        ))}
      </div>

      {/* Course Overview Card */}
      <div className="skeleton-card-container">
        <SkeletonElem height={20} width={220} style={{ marginBottom: '14px' }} />
        <SkeletonLines count={4} lastLineWidth="70%" />
      </div>

      {/* Instructors Card */}
      <div className="skeleton-card-container">
        <SkeletonElem height={20} width={260} style={{ marginBottom: '18px' }} />
        <div className="skeleton-grid-2">
          {[1, 2].map((i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: '14px',
                padding: '14px',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                background: '#F8FAFC',
              }}
            >
              <SkeletonElem width={48} height={48} borderRadius="50%" style={{ flexShrink: 0 }} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <SkeletonElem height={16} width="65%" />
                <SkeletonElem height={12} width="45%" />
                <SkeletonElem height={12} width="90%" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 4. Announcements Skeleton Screen
export const AnnouncementsSkeleton: React.FC = () => {
  return (
    <div className="skeleton-screen-wrapper">
      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <SkeletonElem height={26} width={300} style={{ marginBottom: '8px' }} />
        <SkeletonElem height={14} width={420} />
      </div>

      {/* Announcements List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="skeleton-card-container" style={{ margin: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <SkeletonElem width={90} height={22} borderRadius={20} />
              <SkeletonElem width={100} height={14} />
            </div>
            <SkeletonElem height={20} width="75%" style={{ marginBottom: '10px' }} />
            <SkeletonLines count={2} lastLineWidth="50%" />
            <div
              style={{
                marginTop: '14px',
                paddingTop: '12px',
                borderTop: '1px solid #F1F5F9',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <SkeletonElem width={16} height={16} borderRadius="50%" />
              <SkeletonElem width={160} height={12} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 5. Bookmarks Skeleton Screen
export const BookmarksSkeleton: React.FC = () => {
  return (
    <div className="skeleton-screen-wrapper">
      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <SkeletonElem height={26} width={240} style={{ marginBottom: '8px' }} />
        <SkeletonElem height={14} width={360} />
      </div>

      {/* Search / Filter */}
      <div className="skeleton-card-container" style={{ display: 'flex', gap: '12px', padding: '14px' }}>
        <SkeletonElem height={36} borderRadius={6} style={{ flex: 1 }} />
        <SkeletonElem width={120} height={36} borderRadius={6} />
      </div>

      {/* Bookmarks Grid */}
      <div className="skeleton-grid-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="skeleton-card-container" style={{ margin: 0, padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <SkeletonElem width={80} height={18} borderRadius={4} />
              <SkeletonElem width={20} height={20} borderRadius={4} />
            </div>
            <SkeletonElem height={18} width="85%" style={{ marginBottom: '8px' }} />
            <SkeletonElem height={12} width="50%" style={{ marginBottom: '14px' }} />
            <div style={{ paddingTop: '10px', borderTop: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <SkeletonElem width={70} height={12} />
              <SkeletonElem width={90} height={28} borderRadius={6} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 6. Q&A / Forum Skeleton Screen
export const ForumSkeleton: React.FC = () => {
  return (
    <div className="skeleton-screen-wrapper">
      {/* Header with Ask Question Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <SkeletonElem height={26} width={280} style={{ marginBottom: '8px' }} />
          <SkeletonElem height={14} width={380} />
        </div>
        <SkeletonElem width={160} height={38} borderRadius={6} />
      </div>

      {/* Search & Filter pills */}
      <div className="skeleton-card-container" style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <SkeletonElem height={38} borderRadius={6} />
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <SkeletonElem width={70} height={26} borderRadius={20} />
          <SkeletonElem width={90} height={26} borderRadius={20} />
          <SkeletonElem width={80} height={26} borderRadius={20} />
          <SkeletonElem width={110} height={26} borderRadius={20} />
        </div>
      </div>

      {/* Discussion Threads */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="skeleton-card-container"
            style={{ margin: 0, padding: '16px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}
          >
            <SkeletonElem width={42} height={42} borderRadius="50%" style={{ flexShrink: 0 }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <SkeletonElem width={180} height={14} />
                <SkeletonElem width={70} height={12} />
              </div>
              <SkeletonElem height={18} width="80%" />
              <SkeletonElem height={13} width="95%" />
              <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                <SkeletonElem width={60} height={20} borderRadius={4} />
                <SkeletonElem width={75} height={20} borderRadius={4} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 7. Scores & Progress Skeleton Screen
export const ProgressSkeleton: React.FC = () => {
  return (
    <div className="skeleton-screen-wrapper">
      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <SkeletonElem height={26} width={260} style={{ marginBottom: '8px' }} />
        <SkeletonElem height={14} width={400} />
      </div>

      {/* 4 Summary Stats */}
      <div className="skeleton-grid-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="skeleton-card-container" style={{ margin: 0, padding: '16px' }}>
            <SkeletonElem height={12} width="60%" style={{ marginBottom: '10px' }} />
            <SkeletonElem height={28} width="45%" style={{ marginBottom: '8px' }} />
            <SkeletonElem height={12} width="70%" />
          </div>
        ))}
      </div>

      {/* Progress Chart / Bar Card */}
      <div className="skeleton-card-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
          <SkeletonElem height={20} width={200} />
          <SkeletonElem width={80} height={20} borderRadius={20} />
        </div>
        <SkeletonElem height={12} borderRadius={6} style={{ marginBottom: '18px' }} />
        <div className="skeleton-grid-4" style={{ margin: 0 }}>
          {[1, 2, 3, 4].map((i) => (
            <SkeletonElem key={i} height={44} borderRadius={6} />
          ))}
        </div>
      </div>

      {/* Weekly Quiz Scores Table */}
      <div className="skeleton-card-container">
        <SkeletonElem height={20} width={220} style={{ marginBottom: '16px' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 14px',
                background: '#F8FAFC',
                borderRadius: '6px',
              }}
            >
              <SkeletonElem height={14} width={160} />
              <SkeletonElem height={14} width={80} />
              <SkeletonElem width={60} height={22} borderRadius={20} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 8. Logbook Skeleton Screen
export const LogbookSkeleton: React.FC = () => {
  return (
    <div className="skeleton-screen-wrapper">
      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <SkeletonElem height={26} width={260} style={{ marginBottom: '8px' }} />
        <SkeletonElem height={14} width={420} />
      </div>

      {/* Stats 3 Cards */}
      <div className="skeleton-grid-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="skeleton-card-container" style={{ margin: 0, padding: '14px' }}>
            <SkeletonElem height={12} width="50%" style={{ marginBottom: '8px' }} />
            <SkeletonElem height={22} width="40%" />
          </div>
        ))}
      </div>

      {/* Log Form Box */}
      <div className="skeleton-card-container">
        <SkeletonElem height={18} width={180} style={{ marginBottom: '16px' }} />
        <div className="skeleton-grid-2">
          <SkeletonElem height={38} borderRadius={6} />
          <SkeletonElem height={38} borderRadius={6} />
        </div>
        <SkeletonElem height={70} borderRadius={6} style={{ marginTop: '12px', marginBottom: '14px' }} />
        <SkeletonElem width={140} height={34} borderRadius={6} />
      </div>

      {/* Entries List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {[1, 2, 3].map((i) => (
          <div key={i} className="skeleton-card-container" style={{ margin: 0, padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <SkeletonElem width={160} height={16} />
              <SkeletonElem width={80} height={20} borderRadius={20} />
            </div>
            <SkeletonLines count={2} lastLineWidth="60%" />
          </div>
        ))}
      </div>
    </div>
  );
};

// 9. Certificate Skeleton Screen
export const CertificateSkeleton: React.FC = () => {
  return (
    <div className="skeleton-screen-wrapper">
      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <SkeletonElem height={26} width={280} style={{ marginBottom: '8px' }} />
        <SkeletonElem height={14} width={400} />
      </div>

      {/* Certificate Frame Placeholder */}
      <div
        className="skeleton-card-container"
        style={{
          maxWidth: '850px',
          margin: '0 auto 20px auto',
          padding: '36px',
          border: '2px solid #CBD5E1',
          borderRadius: '12px',
        }}
      >
        {/* Top Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '20px', borderBottom: '1px solid #E2E8F0', marginBottom: '24px' }}>
          <SkeletonElem width={80} height={50} borderRadius={6} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <SkeletonElem width={240} height={22} />
            <SkeletonElem width={160} height={14} />
          </div>
          <SkeletonElem width={56} height={56} borderRadius="50%" />
        </div>

        {/* Recipient Details */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', padding: '20px 0' }}>
          <SkeletonElem width={140} height={14} />
          <SkeletonElem width={280} height={30} borderRadius={6} />
          <SkeletonElem width={450} height={14} />
          <SkeletonElem width={380} height={14} />
        </div>

        {/* Footer with Signatures and Seal */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '24px', borderTop: '1px solid #E2E8F0', marginTop: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <SkeletonElem width={100} height={32} />
            <SkeletonElem width={130} height={12} />
          </div>
          <SkeletonElem width={80} height={80} borderRadius="50%" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-end' }}>
            <SkeletonElem width={100} height={32} />
            <SkeletonElem width={130} height={12} />
          </div>
        </div>
      </div>

      {/* Download Buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '14px' }}>
        <SkeletonElem width={160} height={40} borderRadius={8} />
        <SkeletonElem width={160} height={40} borderRadius={8} />
      </div>
    </div>
  );
};
