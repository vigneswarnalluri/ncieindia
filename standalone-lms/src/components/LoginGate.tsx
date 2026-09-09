import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle,
  Building,
  UserCheck,
  KeyRound,
  CheckCircle2,
  X,
  ArrowLeft,
  GraduationCap,
  Search,
  BookOpen,
  Sparkles,
  Users,
  Check
} from 'lucide-react';
import { 
  DEMO_STUDENTS, 
  DEMO_FACULTY, 
  DEMO_ADMIN,
  type StudentProfile, 
  type FacultyProfile,
  type AdminProfile
} from '../data/curriculumData';
import { 
  ALL_REGISTERED_STUDENTS, 
  COURSE_CATALOG, 
  findStudentByQuery,
  findStudentByEmail,
  type StudentRegistrationRecord 
} from '../data/studentsRegistry';

interface Props {
  onLogin: (student: StudentProfile) => void;
  onFacultyLogin: (faculty: FacultyProfile) => void;
  onAdminLogin: (admin: AdminProfile) => void;
}

export const LoginGate: React.FC<Props> = ({ onLogin, onFacultyLogin, onAdminLogin }) => {
  const [role, setRole] = useState<"student" | "faculty">("student");
  const [emailOrRoll, setEmailOrRoll] = useState("krothapalli.21@gmail.com");
  const [password, setPassword] = useState("krothapalli.21@gmail.com");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Student Directory Lookup Modal State
  const [showLookupModal, setShowLookupModal] = useState<boolean>(false);
  const [lookupQuery, setLookupQuery] = useState<string>("");
  const [lookupCourseFilter, setLookupCourseFilter] = useState<string>("all");

  // Forgot Password modal state
  const [showForgotModal, setShowForgotModal] = useState<boolean>(false);
  const [forgotStep, setForgotStep] = useState<1 | 2 | 3>(1); // 1: Request, 2: OTP & New Password, 3: Success
  const [forgotEmail, setForgotEmail] = useState<string>("");
  const [forgotOtp, setForgotOtp] = useState<string>("204701");
  const [forgotNewPassword, setForgotNewPassword] = useState<string>("");
  const [forgotConfirmPassword, setForgotConfirmPassword] = useState<string>("");
  const [forgotShowPassword, setForgotShowPassword] = useState<boolean>(false);
  const [forgotLoading, setForgotLoading] = useState<boolean>(false);
  const [forgotError, setForgotError] = useState<string | null>(null);

  const handleOpenForgot = () => {
    setForgotEmail(emailOrRoll || "");
    setForgotStep(1);
    setForgotError(null);
    setForgotNewPassword("");
    setForgotConfirmPassword("");
    setForgotOtp("204701");
    setShowForgotModal(true);
  };

  const handleForgotSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) {
      setForgotError("Please enter your registered ID or official email.");
      return;
    }
    setForgotLoading(true);
    setForgotError(null);
    setTimeout(() => {
      setForgotLoading(false);
      setForgotStep(2);
    }, 500);
  };

  const handleForgotResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotOtp.trim()) {
      setForgotError("Please enter the 6-digit verification code.");
      return;
    }
    if (forgotNewPassword.length < 6) {
      setForgotError("Password must be at least 6 characters long.");
      return;
    }
    if (forgotNewPassword !== forgotConfirmPassword) {
      setForgotError("Passwords do not match. Please re-enter.");
      return;
    }

    setForgotLoading(true);
    setForgotError(null);
    setTimeout(() => {
      setForgotLoading(false);
      setPassword(forgotNewPassword);
      setEmailOrRoll(forgotEmail);
      setForgotStep(3);
    }, 600);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = emailOrRoll.trim().toLowerCase();
    if (!query) {
      setErrorMsg("Please enter your registered ID or email.");
      return;
    }

    if (
      query === DEMO_ADMIN.adminId.toLowerCase() ||
      query === DEMO_ADMIN.email.toLowerCase() ||
      query.startsWith("ncie-adm") ||
      query === "admin@ncieindia.org" ||
      query.includes("admin") ||
      query.includes("jere")
    ) {
      onAdminLogin(DEMO_ADMIN);
      return;
    } else if (query.endsWith("@ncieindia.org") || query.startsWith("adm-")) {
      const guestAdmin: AdminProfile = {
        id: `admin-${Date.now()}`,
        adminId: query.toUpperCase(),
        name: query.includes("@") ? query.split("@")[0].replace(/[._]/g, ' ').toUpperCase() : query.toUpperCase(),
        email: query.includes("@") ? query : `${query.toLowerCase().replace(/\s+/g, '')}@ncieindia.org`,
        role: "NCIE Super Admin",
        institution: "National Council for Innovation & Entrepreneurship",
        department: "Council Administration",
      };
      onAdminLogin(guestAdmin);
      return;
    }

    if (role === "faculty") {
      const foundFaculty = DEMO_FACULTY.find(
        (f) =>
          f.facultyId.toLowerCase() === query ||
          f.email.toLowerCase() === query ||
          f.name.toLowerCase().includes(query)
      );

      if (foundFaculty) {
        onFacultyLogin(foundFaculty);
      } else {
        const guestFaculty: FacultyProfile = {
          id: `fac-${Date.now()}`,
          facultyId: query.toUpperCase(),
          name: query.includes("@") ? query.split("@")[0].replace(/[._]/g, ' ').toUpperCase() : query.toUpperCase(),
          email: query.includes("@") ? query : `${query.toLowerCase().replace(/\s+/g, '')}@institute.ac.in`,
          institution: "National Institute of Technology, Surat",
          designation: "Assistant Professor & Innovation Mentor",
          role: "Faculty Coordinator",
          assignedCohort: "Cohort 2026-A",
          pendingLogbooksCount: 3,
          reviewedStudentsCount: 24
        };
        onFacultyLogin(guestFaculty);
      }
      return;
    }

    // Student Login: ONLY allow registered email address, and password MUST be their email address!
    if (!query.includes("@")) {
      setErrorMsg("Student login is permitted ONLY via your registered email address. (Password is also your email address).");
      return;
    }

    const verifiedStudent = findStudentByEmail(query);
    const demoStudent = !verifiedStudent ? DEMO_STUDENTS.find((s) => s.email.toLowerCase() === query) : null;
    const targetStudent = verifiedStudent || demoStudent;

    if (!targetStudent) {
      setErrorMsg("No registered student found with this email address. Please click 'Find My Email & Enrolled Course' below.");
      return;
    }

    // Enforce that password must equal the student's email address
    if (password.trim().toLowerCase() !== query) {
      setErrorMsg("Incorrect password. Your password is your registered email address.");
      return;
    }

    onLogin(targetStudent);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', display: 'flex', flexDirection: 'column' }}>
      {/* Official Government Top Header */}
      <header
        style={{
          background: '#FFFFFF',
          borderBottom: '1px solid #E2E8F0',
          padding: '12px 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img 
            src="/logo-new.png" 
            alt="NCIE India" 
            style={{ height: '36px', width: 'auto', objectFit: 'contain' }} 
          />
          <div>
            <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0F172A', letterSpacing: '0.2px' }}>
              NATIONAL COUNCIL FOR INNOVATION & ENTREPRENEURSHIP
            </div>
            <div style={{ fontSize: '0.7rem', color: '#64748B' }}>
              Innovation Leadership & Entrepreneurship - Student & Mentor Portal
            </div>
          </div>
        </div>
      </header>

      {/* Main Container with Centered Login Card */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 16px'
        }}
      >
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '10px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
            maxWidth: '430px',
            width: '100%',
            padding: '28px 28px'
          }}
        >
          {/* Role Switcher Segmented Control */}
          <div
            style={{
              display: 'flex',
              background: '#F1F5F9',
              padding: '3px',
              borderRadius: '8px',
              marginBottom: '20px'
            }}
          >
            <button
              type="button"
              onClick={() => {
                setRole("student");
                setEmailOrRoll("rohan.patel@college.edu");
                setErrorMsg(null);
              }}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                padding: '7px 8px',
                fontSize: '0.76rem',
                fontWeight: role === "student" ? 600 : 500,
                color: role === "student" ? '#1D4ED8' : '#64748B',
                background: role === "student" ? '#FFFFFF' : 'transparent',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                boxShadow: role === "student" ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              <UserCheck style={{ width: '13px', height: '13px' }} />
              <span>Student</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setRole("faculty");
                setEmailOrRoll("r.ramanan@niti.gov.in");
                setErrorMsg(null);
              }}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                padding: '7px 8px',
                fontSize: '0.76rem',
                fontWeight: role === "faculty" ? 600 : 500,
                color: role === "faculty" ? '#1D4ED8' : '#64748B',
                background: role === "faculty" ? '#FFFFFF' : 'transparent',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                boxShadow: role === "faculty" ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              <Building style={{ width: '13px', height: '13px' }} />
              <span>Faculty</span>
            </button>
          </div>

          {/* Card Title & Subtitle */}
          <div style={{ textAlign: 'center', marginBottom: '22px' }}>
            <h1 style={{ fontSize: '1.28rem', fontWeight: 700, color: '#0F172A', margin: '0 0 6px 0' }}>
              {role === "student" ? "Student LMS Login" : "Faculty & Mentor Desk"}
            </h1>
            <p style={{ fontSize: '0.79rem', color: '#64748B', margin: 0, lineHeight: 1.45 }}>
              {role === "student"
                ? "Enter your registered credentials to access your classroom"
                : "Sign in to review student logbooks, grade capstones, and verify cohorts"}
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {/* ID or Email Input */}
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                {role === "student" ? "Registered Email Address (Login ID)" : "Faculty ID or Official Email"}
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                {role === "student" ? (
                  <Mail className="w-4 h-4 text-slate-400" style={{ position: 'absolute', left: '12px' }} />
                ) : (
                  <Building className="w-4 h-4 text-slate-400" style={{ position: 'absolute', left: '12px' }} />
                )}
                <input
                  type={role === "student" ? "email" : "text"}
                  value={emailOrRoll}
                  onChange={(e) => {
                    setEmailOrRoll(e.target.value);
                    setErrorMsg(null);
                  }}
                  placeholder={
                    role === "student"
                      ? "e.g. krothapalli.21@gmail.com or 24kq1a5433@pace.ac.in"
                      : "e.g. AIM-NITI-2026 or mentor@niti.gov.in"
                  }
                  style={{
                    width: '100%',
                    padding: '9px 12px 9px 36px',
                    fontSize: '0.82rem',
                    border: '1px solid #CBD5E1',
                    borderRadius: '6px',
                    outline: 'none',
                    color: '#0F172A',
                    background: '#FFFFFF'
                  }}
                  required
                />
              </div>

              {/* Verified Student Live Feedback */}
              {role === "student" && (() => {
                const matched = findStudentByQuery(emailOrRoll);
                if (!matched) return null;
                return (
                  <div
                    style={{
                      marginTop: '8px',
                      padding: '8px 12px',
                      background: '#F0FDF4',
                      border: '1px solid #BBF7D0',
                      borderRadius: '6px',
                      fontSize: '0.74rem',
                      lineHeight: 1.4
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
                      <span style={{ fontWeight: 700, color: '#166534', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <CheckCircle2 style={{ width: '13px', height: '13px', color: '#16A34A' }} />
                        Verified Student: {matched.name}
                      </span>
                      <span style={{ fontSize: '0.68rem', color: '#15803D', fontWeight: 600, background: '#DCFCE7', padding: '1px 5px', borderRadius: '4px' }}>
                        Batch 01 Oct 2026
                      </span>
                    </div>
                    <div style={{ color: '#4B5563', fontSize: '0.71rem' }}>
                      {matched.institution}
                    </div>
                    <div style={{ marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                      <span style={{ background: '#DBEAFE', color: '#1E40AF', padding: '2px 6px', borderRadius: '4px', fontWeight: 600, fontSize: '0.69rem' }}>
                        Course: {matched.enrolledCourseTitle}
                      </span>
                      <span style={{ color: '#64748B', fontSize: '0.69rem' }}>
                        Roll: {matched.rollNo}
                      </span>
                    </div>
                  </div>
                );
              })()}

              {role === "student" && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                  <button
                    type="button"
                    onClick={() => setShowLookupModal(true)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#1D4ED8',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      padding: 0,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Search style={{ width: '12px', height: '12px' }} />
                    <span>Find My Email & Enrolled Course</span>
                  </button>
                  <span style={{ fontSize: '0.69rem', color: '#1E40AF', fontWeight: 600 }}>Password is your email</span>
                </div>
              )}
            </div>

            {/* Password Input */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#334155', margin: 0 }}>
                  Password
                </label>
                <button
                  type="button"
                  onClick={handleOpenForgot}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    color: '#1D4ED8',
                    cursor: 'pointer',
                    padding: 0
                  }}
                >
                  Forgot password?
                </button>
              </div>

              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Lock className="w-4 h-4 text-slate-400" style={{ position: 'absolute', left: '12px' }} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    padding: '9px 36px 9px 36px',
                    fontSize: '0.82rem',
                    border: '1px solid #CBD5E1',
                    borderRadius: '6px',
                    outline: 'none',
                    color: '#0F172A',
                    background: '#FFFFFF'
                  }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    background: 'none',
                    border: 'none',
                    color: '#94A3B8',
                    cursor: 'pointer',
                    padding: '2px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ width: '14px', height: '14px', cursor: 'pointer', accentColor: '#1D4ED8' }}
              />
              <label htmlFor="rememberMe" style={{ fontSize: '0.75rem', color: '#475569', cursor: 'pointer' }}>
                Remember my login on this browser
              </label>
            </div>

            {errorMsg && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 12px',
                  background: '#FEF2F2',
                  border: '1px solid #FECACA',
                  borderRadius: '6px',
                  color: '#DC2626',
                  fontSize: '0.76rem'
                }}
              >
                <AlertCircle className="w-4 h-4 text-red-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '10px 16px',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: '#FFFFFF',
                background: role === "student" ? '#1D4ED8' : '#059669',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                transition: 'background 0.15s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(0.9)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.filter = 'none'; }}
            >
              <span>{role === "student" ? "Sign In to Classroom" : "Access Mentor Portal"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Quick Course Demo Switcher for Evaluation */}
        {role === "student" && (
          <div
            style={{
              maxWidth: '680px',
              width: '100%',
              marginTop: '20px',
              background: '#FFFFFF',
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
              padding: '14px 18px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles style={{ width: '14px', height: '14px', color: '#2563EB' }} />
                <span style={{ fontSize: '0.76rem', fontWeight: 700, color: '#1E293B' }}>
                  Quick Login by Enrolled Course ({ALL_REGISTERED_STUDENTS.length} Registered Students)
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowLookupModal(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#2563EB',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Users style={{ width: '13px', height: '13px' }} />
                <span>Browse Full Roster</span>
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '8px' }}>
              {COURSE_CATALOG.map((course) => {
                const sampleStudent = ALL_REGISTERED_STUDENTS.find(
                  (s) => s.enrolledCourseCode === course.courseCode || s.enrolledCourseTitle.toLowerCase() === course.title.toLowerCase()
                );
                const count = ALL_REGISTERED_STUDENTS.filter(
                  (s) => s.enrolledCourseCode === course.courseCode || s.enrolledCourseTitle.toLowerCase() === course.title.toLowerCase()
                ).length;

                return (
                  <button
                    key={course.courseCode}
                    type="button"
                    onClick={() => {
                      if (sampleStudent) {
                        setEmailOrRoll(sampleStudent.email);
                        setPassword(sampleStudent.email);
                        setErrorMsg(null);
                      }
                    }}
                    style={{
                      textAlign: 'left',
                      padding: '8px 10px',
                      borderRadius: '6px',
                      border: '1px solid #E2E8F0',
                      background: '#F8FAFC',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#EFF6FF';
                      e.currentTarget.style.borderColor = '#BFDBFE';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#F8FAFC';
                      e.currentTarget.style.borderColor = '#E2E8F0';
                    }}
                    title={sampleStudent ? `Login as ${sampleStudent.name} (${sampleStudent.rollNo})` : course.title}
                  >
                    <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {course.shortTitle}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
                      <span style={{ fontSize: '0.65rem', color: '#64748B' }}>
                        {course.courseCode}
                      </span>
                      <span style={{ fontSize: '0.64rem', fontWeight: 700, color: '#2563EB', background: '#DBEAFE', padding: '0 4px', borderRadius: '3px' }}>
                        {count}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* Interactive Student Directory Lookup Modal */}
      {showLookupModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1300,
            padding: '16px',
            boxSizing: 'border-box'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowLookupModal(false);
          }}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
              width: '100%',
              maxWidth: '680px',
              maxHeight: '85vh',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
              overflow: 'hidden'
            }}
          >
            {/* Modal Header */}
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F8FAFC' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#EFF6FF', color: '#1D4ED8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <GraduationCap style={{ width: '20px', height: '20px' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.96rem', fontWeight: 700, color: '#0F172A' }}>
                    Student Directory & Enrolled Course Finder
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
                    Registered Cohort Starting 1st October 2026 ({ALL_REGISTERED_STUDENTS.length} Students)
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowLookupModal(false)}
                style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '4px' }}
              >
                <X style={{ width: '20px', height: '20px' }} />
              </button>
            </div>

            {/* Search & Filter Bar */}
            <div style={{ padding: '14px 20px', borderBottom: '1px solid #E2E8F0', display: 'flex', gap: '10px', flexWrap: 'wrap', background: '#FFFFFF' }}>
              <div style={{ flex: 1, minWidth: '220px', position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Search style={{ position: 'absolute', left: '10px', width: '15px', height: '15px', color: '#94A3B8' }} />
                <input
                  type="text"
                  value={lookupQuery}
                  onChange={(e) => setLookupQuery(e.target.value)}
                  placeholder="Search by student name, roll number, college, or email..."
                  style={{
                    width: '100%',
                    padding: '8px 12px 8px 32px',
                    fontSize: '0.78rem',
                    border: '1px solid #CBD5E1',
                    borderRadius: '6px',
                    outline: 'none'
                  }}
                  autoFocus
                />
              </div>

              <select
                value={lookupCourseFilter}
                onChange={(e) => setLookupCourseFilter(e.target.value)}
                style={{
                  padding: '8px 12px',
                  fontSize: '0.76rem',
                  border: '1px solid #CBD5E1',
                  borderRadius: '6px',
                  outline: 'none',
                  background: '#FFFFFF',
                  color: '#334155',
                  maxWidth: '240px'
                }}
              >
                <option value="all">All Courses ({ALL_REGISTERED_STUDENTS.length})</option>
                {COURSE_CATALOG.map((c) => {
                  const cnt = ALL_REGISTERED_STUDENTS.filter(
                    (s) => s.enrolledCourseCode === c.courseCode || s.enrolledCourseTitle.toLowerCase() === c.title.toLowerCase()
                  ).length;
                  return (
                    <option key={c.courseCode} value={c.title}>
                      {c.shortTitle} ({cnt})
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Student List */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '12px 20px' }}>
              {(() => {
                const results = ALL_REGISTERED_STUDENTS.filter((s) => {
                  const matchCourse = lookupCourseFilter === 'all' || s.enrolledCourseTitle.toLowerCase() === lookupCourseFilter.toLowerCase();
                  if (!matchCourse) return false;
                  if (!lookupQuery.trim()) return true;
                  const q = lookupQuery.toLowerCase().trim();
                  return (
                    s.name.toLowerCase().includes(q) ||
                    s.rollNo.toLowerCase().includes(q) ||
                    s.appId.toLowerCase().includes(q) ||
                    s.email.toLowerCase().includes(q) ||
                    s.institution.toLowerCase().includes(q) ||
                    s.department.toLowerCase().includes(q)
                  );
                });

                if (results.length === 0) {
                  return (
                    <div style={{ textAlign: 'center', padding: '36px 0', color: '#64748B', fontSize: '0.8rem' }}>
                      No student records match your query. Try searching by roll number or college name.
                    </div>
                  );
                }

                return (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ fontSize: '0.71rem', color: '#64748B', marginBottom: '4px' }}>
                      Showing {Math.min(results.length, 30)} of {results.length} students
                    </div>
                    {results.slice(0, 30).map((stu) => (
                      <div
                        key={stu.id}
                        style={{
                          border: '1px solid #E2E8F0',
                          borderRadius: '8px',
                          padding: '10px 14px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '12px',
                          background: '#FFFFFF',
                          transition: 'border-color 0.15s'
                        }}
                      >
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0F172A' }}>
                              {stu.name}
                            </span>
                            <span style={{ fontSize: '0.7rem', color: '#1E40AF', background: '#DBEAFE', padding: '1px 6px', borderRadius: '4px', fontWeight: 600 }}>
                              {stu.enrolledCourseTitle}
                            </span>
                          </div>
                          <div style={{ fontSize: '0.71rem', color: '#475569', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {stu.institution}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.69rem', color: '#64748B', marginTop: '4px' }}>
                            <span>Roll: <strong style={{ color: '#0F172A' }}>{stu.rollNo}</strong></span>
                            <span>Reg ID: {stu.appId}</span>
                            <span>Email: {stu.email}</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setEmailOrRoll(stu.email);
                            setPassword(stu.email);
                            setShowLookupModal(false);
                            onLogin(stu);
                          }}
                          style={{
                            padding: '6px 12px',
                            fontSize: '0.73rem',
                            fontWeight: 600,
                            color: '#FFFFFF',
                            background: '#1D4ED8',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            flexShrink: 0,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <span>Sign In</span>
                          <ArrowRight style={{ width: '12px', height: '12px' }} />
                        </button>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>

            {/* Modal Footer */}
            <div style={{ padding: '10px 20px', borderTop: '1px solid #E2E8F0', background: '#F8FAFC', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.71rem', color: '#64748B' }}>
              <span>Student login ID and password are both your <strong>registered email address</strong></span>
              <button
                type="button"
                onClick={() => setShowLookupModal(false)}
                style={{
                  padding: '5px 12px',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  color: '#475569',
                  background: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Forgot Password Recovery Modal */}
      {showForgotModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(3px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1200,
            padding: '16px',
            boxSizing: 'border-box'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowForgotModal(false);
          }}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
              width: '100%',
              maxWidth: '440px',
              padding: '24px',
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.15)',
              boxSizing: 'border-box',
              position: 'relative'
            }}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '8px',
                    background: '#EFF6FF',
                    color: '#1D4ED8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <KeyRound style={{ width: '18px', height: '18px' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.98rem', fontWeight: 700, color: '#0F172A' }}>
                    Reset Account Password
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
                    National Council for Innovation & Entrepreneurship
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#94A3B8',
                  cursor: 'pointer',
                  padding: '4px',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title="Close"
              >
                <X style={{ width: '18px', height: '18px' }} />
              </button>
            </div>

            {/* Step 1: Input registered email / ID */}
            {forgotStep === 1 && (
              <form onSubmit={handleForgotSendOtp}>
                <p style={{ fontSize: '0.78rem', color: '#475569', lineHeight: 1.5, margin: '0 0 16px 0' }}>
                  Enter your registered Student Roll Number, Faculty Coordinator Email, or Application ID to verify your profile and request a secure OTP reset code.
                </p>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    Registered Email or Official ID
                  </label>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <Mail style={{ position: 'absolute', left: '12px', width: '16px', height: '16px', color: '#94A3B8' }} />
                    <input
                      type="text"
                      required
                      value={forgotEmail}
                      onChange={(e) => {
                        setForgotEmail(e.target.value);
                        setForgotError(null);
                      }}
                      placeholder="e.g. rohan.patel@college.edu or 22BCE1042"
                      style={{
                        width: '100%',
                        padding: '9px 12px 9px 36px',
                        fontSize: '0.82rem',
                        border: '1px solid #CBD5E1',
                        borderRadius: '6px',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                {forgotError && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 12px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '6px', color: '#DC2626', fontSize: '0.75rem', marginBottom: '14px' }}>
                    <AlertCircle style={{ width: '14px', height: '14px', flexShrink: 0 }} />
                    <span>{forgotError}</span>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    style={{
                      padding: '8px 14px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: '#64748B',
                      background: '#F1F5F9',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={forgotLoading}
                    style={{
                      padding: '8px 18px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      background: '#1D4ED8',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: forgotLoading ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      opacity: forgotLoading ? 0.7 : 1
                    }}
                  >
                    <span>{forgotLoading ? "Sending Code..." : "Send Verification Code"}</span>
                    <ArrowRight style={{ width: '14px', height: '14px' }} />
                  </button>
                </div>
              </form>
            )}

            {/* Step 2: OTP Verification and New Password */}
            {forgotStep === 2 && (
              <form onSubmit={handleForgotResetPassword}>
                <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '6px', padding: '10px 12px', marginBottom: '14px' }}>
                  <div style={{ fontSize: '0.75rem', color: '#166534', fontWeight: 600 }}>
                    Verification Code Sent
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#15803D', marginTop: '2px' }}>
                    A one-time reset code was generated for <strong>{forgotEmail}</strong>.
                  </div>
                  <div style={{ marginTop: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '0.7rem', color: '#475569' }}>Simulation OTP:</span>
                    <code style={{ background: '#DCFCE7', color: '#166534', padding: '1px 6px', borderRadius: '4px', fontWeight: 700, fontSize: '0.75rem' }}>
                      204701
                    </code>
                  </div>
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                    Enter 6-Digit OTP Code
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={forgotOtp}
                    onChange={(e) => {
                      setForgotOtp(e.target.value);
                      setForgotError(null);
                    }}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      letterSpacing: '2px',
                      textAlign: 'center',
                      border: '1px solid #CBD5E1',
                      borderRadius: '6px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                    New Password
                  </label>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <Lock style={{ position: 'absolute', left: '10px', width: '15px', height: '15px', color: '#94A3B8' }} />
                    <input
                      type={forgotShowPassword ? "text" : "password"}
                      required
                      placeholder="Minimum 6 characters"
                      value={forgotNewPassword}
                      onChange={(e) => {
                        setForgotNewPassword(e.target.value);
                        setForgotError(null);
                      }}
                      style={{
                        width: '100%',
                        padding: '8px 34px 8px 32px',
                        fontSize: '0.8rem',
                        border: '1px solid #CBD5E1',
                        borderRadius: '6px',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setForgotShowPassword(!forgotShowPassword)}
                      style={{
                        position: 'absolute',
                        right: '8px',
                        background: 'none',
                        border: 'none',
                        color: '#94A3B8',
                        cursor: 'pointer',
                        padding: '2px',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      {forgotShowPassword ? <EyeOff style={{ width: '15px', height: '15px' }} /> : <Eye style={{ width: '15px', height: '15px' }} />}
                    </button>
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                    Confirm New Password
                  </label>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <Lock style={{ position: 'absolute', left: '10px', width: '15px', height: '15px', color: '#94A3B8' }} />
                    <input
                      type={forgotShowPassword ? "text" : "password"}
                      required
                      placeholder="Re-enter your new password"
                      value={forgotConfirmPassword}
                      onChange={(e) => {
                        setForgotConfirmPassword(e.target.value);
                        setForgotError(null);
                      }}
                      style={{
                        width: '100%',
                        padding: '8px 34px 8px 32px',
                        fontSize: '0.8rem',
                        border: '1px solid #CBD5E1',
                        borderRadius: '6px',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                {forgotError && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 12px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '6px', color: '#DC2626', fontSize: '0.75rem', marginBottom: '14px' }}>
                    <AlertCircle style={{ width: '14px', height: '14px', flexShrink: 0 }} />
                    <span>{forgotError}</span>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button
                    type="button"
                    onClick={() => setForgotStep(1)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '7px 12px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: '#475569',
                      background: '#F1F5F9',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    <ArrowLeft style={{ width: '13px', height: '13px' }} />
                    <span>Back</span>
                  </button>

                  <button
                    type="submit"
                    disabled={forgotLoading}
                    style={{
                      padding: '8px 18px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      background: '#059669',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: forgotLoading ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      opacity: forgotLoading ? 0.7 : 1
                    }}
                  >
                    <span>{forgotLoading ? "Updating..." : "Update Password"}</span>
                    <CheckCircle2 style={{ width: '14px', height: '14px' }} />
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: Success Confirmation */}
            {forgotStep === 3 && (
              <div style={{ textAlign: 'center', padding: '12px 0 6px 0' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#ECFDF5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
                  <CheckCircle2 style={{ width: '28px', height: '28px' }} />
                </div>
                <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0F172A', marginBottom: '6px' }}>
                  Password Reset Complete
                </div>
                <p style={{ fontSize: '0.78rem', color: '#475569', lineHeight: 1.5, margin: '0 0 18px 0' }}>
                  Your password has been successfully updated. The sign-in form is now loaded with your new credentials.
                </p>

                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  style={{
                    width: '100%',
                    padding: '9px 16px',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: '#FFFFFF',
                    background: '#1D4ED8',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  Proceed to Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
