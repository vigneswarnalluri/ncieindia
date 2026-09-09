import React, { useState } from 'react';
import { 
  Plus, 
  Clock, 
  CheckCircle2, 
  Printer, 
  Send,
  X
} from 'lucide-react';
import type { LogbookEntry, StudentProfile } from '../data/curriculumData';

interface Props {
  student: StudentProfile;
  logbookEntries: LogbookEntry[];
  onAddEntry: (entry: LogbookEntry) => void;
}

export const WeeklyLogbook: React.FC<Props> = ({
  student,
  logbookEntries,
  onAddEntry,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newWeek, setNewWeek] = useState<number>(logbookEntries.length + 1);
  const [hours, setHours] = useState<number>(8);
  const [activities, setActivities] = useState("");
  const [learnings, setLearnings] = useState("");
  const [challenges, setChallenges] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activities.trim()) return;

    const entry: LogbookEntry = {
      id: `log-w${newWeek}-${Date.now()}`,
      week: newWeek,
      dateRange: `Week ${newWeek}`,
      hoursLogged: Number(hours),
      activitiesCompleted: activities,
      learningsAndSkills: learnings,
      challengesFaced: challenges,
      status: "Verified by Mentor",
      submittedAt: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    };

    onAddEntry(entry);
    setShowAddModal(false);
    setActivities("");
    setLearnings("");
    setChallenges("");
  };

  const totalHoursLogged = logbookEntries.reduce((acc, curr) => acc + curr.hoursLogged, 0);

  return (
    <div className="lms-view-content-wrapper">
      {/* Header */}
      <div className="view-header-banner">
        <div className="flex-between flex-wrap gap-4">
          <div>
            <h1 className="text-xl font-bold text-heading">
              Weekly Work Logbook
            </h1>
            <p className="text-xs text-muted mt-1">
              Log your weekly activities and hours for internship credit evaluation.
            </p>
          </div>

          <div className="flex-align-center gap-2">
            <button
              onClick={() => window.print()}
              className="btn btn-outline btn-sm"
            >
              <Printer className="w-3.5 h-3.5 mr-1" />
              <span>Print</span>
            </button>

            <button
              onClick={() => setShowAddModal(true)}
              className="btn btn-primary btn-sm"
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              <span>Log Weekly Work</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid-2-col gap-3 mt-4">
          <div className="stat-card">
            <div className="text-muted text-xs">Total Hours Logged</div>
            <div className="text-xl font-bold text-heading mt-1">
              {totalHoursLogged} / {student.totalRequiredHours} Hours
            </div>
          </div>

          <div className="stat-card">
            <div className="text-muted text-xs">Completed Weeks</div>
            <div className="text-xl font-bold text-heading mt-1">
              {logbookEntries.length} / 8 Weeks
            </div>
          </div>
        </div>
      </div>

      {/* Logbook Entries */}
      <div className="logbook-timeline-list mt-5">
        {logbookEntries.map((entry) => (
          <div key={entry.id} className="logbook-entry-card">
            <div className="entry-header-row">
              <div className="flex-align-center gap-2.5">
                <span className="badge badge-primary">Week {entry.week}</span>
                <span className="text-xs text-muted flex-align-center gap-1">
                  <Clock className="w-3 h-3" /> {entry.hoursLogged} Hours
                </span>
                <span className="text-xs text-muted">• {entry.submittedAt}</span>
              </div>

              <span className="badge badge-success flex-align-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Verified</span>
              </span>
            </div>

            <div className="entry-body-grid">
              <div className="entry-detail-block">
                <div className="text-xs font-semibold text-heading mb-1">Tasks Completed:</div>
                <p className="text-xs text-body leading-relaxed">{entry.activitiesCompleted}</p>
              </div>

              {entry.learningsAndSkills && (
                <div className="entry-detail-block">
                  <div className="text-xs font-semibold text-heading mb-1">Key Learnings:</div>
                  <p className="text-xs text-body leading-relaxed">{entry.learningsAndSkills}</p>
                </div>
              )}

              {entry.mentorFeedback && (
                <div className="mentor-feedback-box">
                  <div className="text-xs font-semibold text-emerald mb-0.5">Mentor Remarks:</div>
                  <p className="text-xs text-body">{entry.mentorFeedback}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add New Week Modal */}
      {showAddModal && (
        <div className="modal-backdrop-overlay">
          <div className="modal-container-card animate-scale-up">
            <div className="modal-header-row">
              <span className="text-sm font-bold text-heading">New Weekly Log Entry</span>
              <button onClick={() => setShowAddModal(false)} className="modal-close-btn" aria-label="Close">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-body-scrollable">
              <div className="grid-2-col gap-3 mb-3">
                <div>
                  <label className="form-label">Week Number</label>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={newWeek}
                    onChange={(e) => setNewWeek(Number(e.target.value))}
                    className="form-input"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Hours Logged</label>
                  <input
                    type="number"
                    min="1"
                    max="40"
                    value={hours}
                    onChange={(e) => setHours(Number(e.target.value))}
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Tasks Executed</label>
                <textarea
                  rows={3}
                  value={activities}
                  onChange={(e) => setActivities(e.target.value)}
                  placeholder="Detail your work completed this week..."
                  className="form-input"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Learnings & Skills (Optional)</label>
                <textarea
                  rows={2}
                  value={learnings}
                  onChange={(e) => setLearnings(e.target.value)}
                  placeholder="What new concepts or tools did you use?"
                  className="form-input"
                />
              </div>

              <div className="modal-footer-row mt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn btn-outline btn-sm"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  <Send className="w-3.5 h-3.5 mr-1" />
                  <span>Submit Log</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
