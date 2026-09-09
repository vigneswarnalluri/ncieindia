import React from 'react';
import { 
  BarChart2, 
  CheckCircle2, 
  Award, 
  AlertCircle, 
  FileText, 
  Calendar,
  HelpCircle,
  Clock
} from 'lucide-react';
import { COURSE_INFO, CURRICULUM_MODULES, type StudentProfile, type CapstoneProject } from '../data/curriculumData';

interface Props {
  student: StudentProfile;
  capstone: CapstoneProject;
  completedLessons: string[];
}

export const NptelProgress: React.FC<Props> = ({
  student,
  capstone,
  completedLessons,
}) => {
  // Weekly scores (mock or calculated)
  const assignments = CURRICULUM_MODULES.map((mod, idx) => {
    const isDone = mod.lessons.some(l => completedLessons.includes(l.id));
    const score = isDone ? 100 : (idx < 3 ? 90 : 0);
    return {
      week: mod.week,
      title: `Assignment ${mod.week}: ${mod.theme}`,
      maxScore: 100,
      score: isDone ? 100 : (idx < 2 ? 100 : 0),
      submitted: isDone || idx < 2,
      dueDate: `Week ${mod.week} Sunday 23:59 IST`
    };
  });

  // Calculate Best 6 of 8
  const submittedScores = assignments.map(a => a.score).sort((a, b) => b - a);
  const best6 = submittedScores.slice(0, 6);
  const assignmentAvg = Math.round(best6.reduce((acc, curr) => acc + curr, 0) / 6);
  const capstoneScore = capstone.status === "Approved" || capstone.status === "Distinction" ? 88 : 80;
  const finalProjectedScore = Math.round((0.25 * assignmentAvg) + (0.75 * capstoneScore));
  const isEligible = assignmentAvg >= 40 && capstoneScore >= 40;

  return (
    <div className="nptel-tab-page-container">
      {/* Page Header */}
      <div className="nptel-page-header">
        <h2 className="nptel-page-heading">
          Student Progress & Assessment Scores
        </h2>
        <p className="text-xs text-muted mt-1">
          Formula for final certificate score: <strong>25% of average of Best 6 assignments + 75% of Capstone Project Defense score</strong>.
        </p>
      </div>

      {/* Summary Score Cards */}
      <div className="grid-3-col gap-4 mt-5">
        <div className="stat-card">
          <div className="text-xs font-semibold text-muted">Assignment Average (Best 6)</div>
          <div className="text-2xl font-black text-primary mt-1">{assignmentAvg} / 100</div>
          <div className="text-xxs text-subtle mt-0.5">Contributes 25% to final grade</div>
        </div>

        <div className="stat-card">
          <div className="text-xs font-semibold text-muted">Capstone Defense Score</div>
          <div className="text-2xl font-black text-saffron mt-1">{capstoneScore} / 100</div>
          <div className="text-xxs text-subtle mt-0.5">Contributes 75% to final grade</div>
        </div>

        <div className="stat-card">
          <div className="text-xs font-semibold text-muted">Projected Consolidated Score</div>
          <div className="text-2xl font-black text-emerald mt-1">{finalProjectedScore}%</div>
          <div className="text-xxs text-emerald font-semibold mt-0.5">
            {isEligible ? 'Elite Certificate Eligible' : 'In Progress'}
          </div>
        </div>
      </div>

      {/* Visual Bar Chart of Weekly Scores */}
      <div className="card p-5 mt-6">
        <div className="flex-between mb-4">
          <h3 className="text-sm font-bold text-heading flex-align-center gap-2">
            <BarChart2 className="w-4 h-4 text-primary" />
            <span>Weekly Assignment Score Distribution</span>
          </h3>
          <span className="text-xxs text-muted">Total 8 Weeks</span>
        </div>

        <div className="nptel-barchart-container">
          {assignments.map((a) => (
            <div key={a.week} className="nptel-bar-col">
              <div className="nptel-bar-track">
                <div 
                  className={`nptel-bar-fill ${a.score >= 70 ? 'bg-emerald' : a.score > 0 ? 'bg-primary' : 'bg-subtle'}`}
                  style={{ height: `${a.score}%` }}
                />
              </div>
              <span className="nptel-bar-score">{a.score}</span>
              <span className="nptel-bar-label">W{a.week}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Scorecard Table */}
      <div className="card mt-6 overflow-hidden">
        <div className="p-4 border-b">
          <h3 className="text-sm font-bold text-heading">
            Assignment Assessment Details
          </h3>
        </div>

        <div className="table-responsive">
          <table className="nptel-table">
            <thead>
              <tr>
                <th>Assessment Unit</th>
                <th>Due Date</th>
                <th>Max Score</th>
                <th>Scored</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((a) => (
                <tr key={a.week}>
                  <td className="font-semibold text-heading">{a.title}</td>
                  <td className="text-muted text-xs">{a.dueDate}</td>
                  <td className="text-xs">{a.maxScore}</td>
                  <td className="font-bold text-primary">{a.submitted ? a.score : '--'}</td>
                  <td>
                    {a.submitted ? (
                      <span className="badge badge-success">Evaluated</span>
                    ) : (
                      <span className="badge badge-outline">Pending</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
