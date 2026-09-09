import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  CheckCircle2, 
  ThumbsUp, 
  MessageSquare,
  Clock,
  Send,
  HelpCircle,
  X
} from 'lucide-react';

interface ForumPost {
  id: string;
  week: number;
  question: string;
  author: string;
  date: string;
  upvotes: number;
  hasUpvoted?: boolean;
  mentorAnswer?: {
    author: string;
    role: string;
    text: string;
    date: string;
  };
}

const INITIAL_POSTS: ForumPost[] = [
  {
    id: "post-1",
    week: 1,
    question: "When conducting a prior art patent search in the Indian InPASS database for precision sensors, what key classification codes (IPC) should we prioritize?",
    author: "Priya Nair (SEC-02)",
    date: "01 Mar 2026",
    upvotes: 18,
    mentorAnswer: {
      author: "Dr. K. S. Rao",
      role: "NCIE Teaching Assistant",
      text: "In InPASS, utilize the Abstract and Claims boolean operators (AND/OR). Cross-verify International Patent Classification (IPC) sub-class G01N for sensors and B82Y for nanotechnology applications.",
      date: "02 Mar 2026"
    }
  },
  {
    id: "post-2",
    week: 3,
    question: "For Edge IoT devices under unstable rural 4G networks, if telemetry packets drop during network blackouts, is SQLite or flash buffer caching recommended for the ESP32 node?",
    author: "Rohan Patel (SEC-07)",
    date: "26 Feb 2026",
    upvotes: 14,
    mentorAnswer: {
      author: "Vamsi Reddy",
      role: "Industry & Tech Lead",
      text: "Use local ring-buffer flash logging with MQTT QoS Level 1. Once connectivity re-establishes, publish the timestamped buffer queue sequentially to prevent data loss.",
      date: "27 Feb 2026"
    }
  },
  {
    id: "post-3",
    week: 5,
    question: "Should student team labor costs be factored into COGS when calculating Unit Economics for the Kalam Seed Fund prototype validation round?",
    author: "Sneha Kulkarni (SEC-01)",
    date: "20 Feb 2026",
    upvotes: 9
  }
];

export const NptelForum: React.FC = () => {
  const [posts, setPosts] = useState<ForumPost[]>(INITIAL_POSTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWeek, setSelectedWeek] = useState<string>("all");
  const [filterTab, setFilterTab] = useState<"all" | "answered" | "unanswered">("all");

  // Ask Question Modal
  const [showAskModal, setShowAskModal] = useState(false);
  const [newQuestionText, setNewQuestionText] = useState("");
  const [newWeek, setNewWeek] = useState<number>(1);

  // Upvote handler
  const handleToggleUpvote = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const hasUpvoted = !p.hasUpvoted;
          return {
            ...p,
            hasUpvoted,
            upvotes: hasUpvoted ? p.upvotes + 1 : p.upvotes - 1,
          };
        }
        return p;
      })
    );
  };

  // Submit Question
  const handlePostQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;

    const newPost: ForumPost = {
      id: `post-${Date.now()}`,
      week: newWeek,
      question: newQuestionText.trim(),
      author: "You (Student)",
      date: "Just now",
      upvotes: 1,
      hasUpvoted: true,
    };

    setPosts([newPost, ...posts]);
    setShowAskModal(false);
    setNewQuestionText("");
  };

  const filteredPosts = posts.filter((p) => {
    const matchesSearch =
      searchQuery.trim() === "" ||
      p.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.mentorAnswer && p.mentorAnswer.text.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesWeek = selectedWeek === "all" || p.week.toString() === selectedWeek;
    const matchesStatus =
      filterTab === "all" ||
      (filterTab === "answered" && !!p.mentorAnswer) ||
      (filterTab === "unanswered" && !p.mentorAnswer);

    return matchesSearch && matchesWeek && matchesStatus;
  });

  return (
    <div className="nptel-tab-page-container" style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '40px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0F172A', margin: 0 }}>
            Discussion Forum
          </h2>
          <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '3px 0 0 0' }}>
            Course doubts answered by certified NCIE Mentors and Teaching Assistants.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAskModal(true)}
          className="btn btn-primary"
          style={{ padding: '7px 14px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '5px', borderRadius: '6px' }}
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Ask Question</span>
        </button>
      </div>

      {/* Filter Row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '16px',
          flexWrap: 'wrap',
          background: '#FFFFFF',
          padding: '8px 12px',
          borderRadius: '6px',
          border: '1px solid #E2E8F0',
        }}
      >
        {/* Search */}
        <div style={{ flex: 1, minWidth: '220px', position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Search className="w-3.5 h-3.5 text-slate-400" style={{ position: 'absolute', left: '10px' }} />
          <input
            type="text"
            placeholder="Search questions or answers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '6px 10px 6px 30px',
              fontSize: '0.8rem',
              border: 'none',
              background: 'transparent',
              outline: 'none',
            }}
          />
        </div>

        {/* Status Filter */}
        <div style={{ display: 'flex', gap: '4px', background: '#F1F5F9', padding: '2px', borderRadius: '4px' }}>
          {[
            { id: "all", label: "All" },
            { id: "answered", label: "Answered" },
            { id: "unanswered", label: "Unanswered" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilterTab(tab.id as any)}
              style={{
                padding: '3px 10px',
                fontSize: '0.75rem',
                fontWeight: 500,
                border: 'none',
                borderRadius: '3px',
                background: filterTab === tab.id ? '#FFFFFF' : 'transparent',
                color: filterTab === tab.id ? '#0F172A' : '#64748B',
                boxShadow: filterTab === tab.id ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                cursor: 'pointer',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Week Selector */}
        <select
          value={selectedWeek}
          onChange={(e) => setSelectedWeek(e.target.value)}
          style={{
            padding: '5px 8px',
            fontSize: '0.75rem',
            border: '1px solid #E2E8F0',
            borderRadius: '4px',
            background: '#FFFFFF',
            color: '#334155',
            cursor: 'pointer',
            outline: 'none',
          }}
        >
          <option value="all">All Weeks</option>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((w) => (
            <option key={w} value={w.toString()}>Week {w}</option>
          ))}
        </select>
      </div>

      {/* Clean Q&A Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filteredPosts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '36px 16px', background: '#FFFFFF', borderRadius: '6px', border: '1px solid #E2E8F0', color: '#64748B', fontSize: '0.8rem' }}>
            No questions found for this filter.
          </div>
        ) : (
          filteredPosts.map((post) => (
            <div
              key={post.id}
              style={{
                background: '#FFFFFF',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                padding: '18px 20px',
              }}
            >
              {/* Question Header: Week tag & Meta */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      padding: '2px 7px',
                      borderRadius: '4px',
                      background: '#F1F5F9',
                      color: '#475569',
                    }}
                  >
                    Week {post.week}
                  </span>

                  {post.mentorAnswer ? (
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        color: '#059669',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '3px',
                      }}
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Mentor Answered</span>
                    </span>
                  ) : (
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 500,
                        color: '#D97706',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '3px',
                      }}
                    >
                      <Clock className="w-3 h-3" />
                      <span>Awaiting Mentor Response</span>
                    </span>
                  )}
                </div>

                <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
                  {post.date}
                </span>
              </div>

              {/* The Actual Question */}
              <h3
                style={{
                  fontSize: '0.925rem',
                  fontWeight: 600,
                  color: '#0F172A',
                  margin: '0 0 12px 0',
                  lineHeight: 1.5,
                }}
              >
                {post.question}
              </h3>

              {/* Verified Mentor Answer (Clean & Simple) */}
              {post.mentorAnswer ? (
                <div
                  style={{
                    background: '#F8FAFC',
                    borderLeft: '3px solid #10B981',
                    borderRadius: '0 6px 6px 0',
                    padding: '12px 14px',
                    marginBottom: '12px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.75rem' }}>
                    <span style={{ fontWeight: 600, color: '#065F46' }}>
                      {post.mentorAnswer.author} ({post.mentorAnswer.role})
                    </span>
                    <span style={{ color: '#94A3B8', fontSize: '0.7rem' }}>
                      {post.mentorAnswer.date}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.8125rem', color: '#334155', lineHeight: 1.5, margin: 0 }}>
                    {post.mentorAnswer.text}
                  </p>
                </div>
              ) : null}

              {/* Footer Actions */}
              <div style={{ display: 'flex', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid #F8FAFC' }}>
                <button
                  type="button"
                  onClick={() => handleToggleUpvote(post.id)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '3px 8px',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    borderRadius: '4px',
                    border: '1px solid',
                    borderColor: post.hasUpvoted ? '#0284C7' : '#E2E8F0',
                    background: post.hasUpvoted ? '#F0F9FF' : '#FFFFFF',
                    color: post.hasUpvoted ? '#0284C7' : '#64748B',
                    cursor: 'pointer',
                  }}
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span>{post.upvotes}</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Clean Ask Question Modal */}
      {showAskModal && (
        <div className="modal-backdrop-overlay">
          <div className="modal-container-card animate-scale-up" style={{ maxWidth: '480px', borderRadius: '8px' }}>
            <div className="modal-header-row">
              <span style={{ fontSize: '0.925rem', fontWeight: 600, color: '#0F172A' }}>
                Ask a Question
              </span>
              <button onClick={() => setShowAskModal(false)} className="modal-close-btn" aria-label="Close">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handlePostQuestion} style={{ padding: '16px 20px' }}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                  Curriculum Week
                </label>
                <select
                  value={newWeek}
                  onChange={(e) => setNewWeek(Number(e.target.value))}
                  style={{ width: '100%', padding: '6px 8px', fontSize: '0.8rem', border: '1px solid #CBD5E1', borderRadius: '4px' }}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((w) => (
                    <option key={w} value={w}>Week {w}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                  Your Question
                </label>
                <textarea
                  rows={4}
                  placeholder="Type your question or doubt here..."
                  value={newQuestionText}
                  onChange={(e) => setNewQuestionText(e.target.value)}
                  style={{ width: '100%', padding: '8px 10px', fontSize: '0.8125rem', border: '1px solid #CBD5E1', borderRadius: '4px', outline: 'none' }}
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', paddingTop: '8px', borderTop: '1px solid #F1F5F9' }}>
                <button
                  type="button"
                  onClick={() => setShowAskModal(false)}
                  className="btn btn-outline"
                  style={{ padding: '5px 12px', fontSize: '0.75rem', borderRadius: '4px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ padding: '5px 14px', fontSize: '0.75rem', borderRadius: '4px' }}
                >
                  Submit Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
