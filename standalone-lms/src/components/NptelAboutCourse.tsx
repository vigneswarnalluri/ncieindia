import React from 'react';
import { 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  GraduationCap, 
  ShieldCheck, 
  UserCheck 
} from 'lucide-react';
import { COURSE_INFO, CURRICULUM_MODULES } from '../data/curriculumData';

export const NptelAboutCourse: React.FC = () => {
  return (
    <div className="nptel-tab-page-container">
      <div className="nptel-page-header">
        <h2 className="nptel-page-heading">
          About The Course
        </h2>
        <p className="text-xs text-muted mt-1">
          Comprehensive curriculum structure, faculty credentials, and national certification criteria.
        </p>
      </div>

      {/* Metadata Grid */}
      <div className="grid-4-col gap-4 mt-5">
        <div className="stat-card">
          <div className="text-xs text-muted">Course Code & Type</div>
          <div className="text-sm font-bold text-heading mt-1">{COURSE_INFO.courseCode.toUpperCase()}</div>
          <div className="text-xxs text-primary font-semibold mt-0.5">{COURSE_INFO.type}</div>
        </div>

        <div className="stat-card">
          <div className="text-xs text-muted">Program Start Date</div>
          <div className="text-sm font-bold text-heading mt-1">{COURSE_INFO.startDate}</div>
          <div className="text-xxs text-blue-600 font-semibold mt-0.5">Cohort Enrollment Active</div>
        </div>

        <div className="stat-card">
          <div className="text-xs text-muted">Course Duration & Credits</div>
          <div className="text-sm font-bold text-heading mt-1">{COURSE_INFO.duration}</div>
          <div className="text-xxs text-emerald font-semibold mt-0.5">{COURSE_INFO.creditEquivalency}</div>
        </div>

        <div className="stat-card">
          <div className="text-xs text-muted">Apex Nodal Body</div>
          <div className="text-sm font-bold text-heading mt-1">NCIE Secretariat</div>
          <div className="text-xxs text-muted mt-0.5">Government of India Alignment</div>
        </div>
      </div>

      {/* Course Overview */}
      <div className="card p-5 mt-6">
        <h3 className="text-sm font-bold text-heading mb-2">
          Course Summary & Objectives
        </h3>
        <p className="text-xs text-body leading-relaxed">
          The <strong>Innovation Leadership & Entrepreneurship Program</strong> is an intensive 8-week course engineered to transform collegiate engineering, science, and business students into venture builders. Aligned with national innovation policies and the principle of 'One Family – One Entrepreneur', the curriculum spans design thinking, deep-tech AI architectures, minimum viable product (MVP) engineering, intellectual property (IPR) patenting, and commercial business modeling.
        </p>
      </div>

      {/* Instructors */}
      <div className="card p-5 mt-6">
        <h3 className="text-sm font-bold text-heading mb-4 flex-align-center gap-2">
          <UserCheck className="w-4 h-4 text-primary" />
          <span>Course Instructors & Academic Coordinators</span>
        </h3>

        <div className="grid-2-col gap-4">
          {COURSE_INFO.instructors.map((inst, i) => (
            <div key={i} className="flex-align-start gap-3 p-3 bg-subtle rounded-md">
              <div className="nptel-instructor-avatar">
                {inst.name.charAt(3) || inst.name.charAt(0)}
              </div>
              <div>
                <div className="text-xs font-bold text-heading">{inst.name}</div>
                <div className="text-xxs text-primary font-semibold">{inst.role}</div>
                <div className="text-xxs text-muted mt-0.5">{inst.institute}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 8-Week Syllabus Breakdown */}
      <div className="card p-5 mt-6">
        <h3 className="text-sm font-bold text-heading mb-3 flex-align-center gap-2">
          <BookOpen className="w-4 h-4 text-emerald" />
          <span>8-Week Syllabus Outline</span>
        </h3>

        <div className="nptel-syllabus-timeline">
          {CURRICULUM_MODULES.map((mod) => (
            <div key={mod.id} className="nptel-syllabus-item">
              <div className="nptel-syllabus-week-pill">Week {mod.week}</div>
              <div className="nptel-syllabus-content">
                <div className="text-xs font-bold text-heading">{mod.title}</div>
                <div className="text-xxs text-muted mt-0.5">{mod.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate Eligibility Policy */}
      <div className="card p-5 mt-6 border-primary bg-primary-subtle">
        <h3 className="text-sm font-bold text-heading mb-2 flex-align-center gap-2">
          <Award className="w-4 h-4 text-primary" />
          <span>Certificate Eligibility Criteria (NPTEL Norms)</span>
        </h3>
        <ul className="text-xs text-body leading-relaxed space-y-1.5 mt-2">
          <li>&bull; <strong>Average Assignment Score</strong>: 25% weightage (calculated from the best 6 out of 8 weekly assignments).</li>
          <li>&bull; <strong>Final Capstone Project Defense Score</strong>: 75% weightage.</li>
          <li>&bull; <strong>Minimum Passing Threshold</strong>: Minimum 40% in assignments AND minimum 40% in the Capstone defense.</li>
          <li>&bull; Eligible candidates receive the official certificate carrying QR authentication valid for 2 AICTE academic credits.</li>
        </ul>
      </div>
    </div>
  );
};
