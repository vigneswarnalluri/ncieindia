const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const env = fs.readFileSync('.env.local', 'utf8');
let url = '', key = '';
env.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts[0].trim() === 'NEXT_PUBLIC_SUPABASE_URL') url = parts.slice(1).join('=').trim().replace(/['"]/g, '');
  if (parts[0].trim() === 'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY') key = parts.slice(1).join('=').trim().replace(/['"]/g, '');
});

const supabase = createClient(url, key);

async function generate() {
  const { data: allData, error } = await supabase.from('registrations').select('*').order('created_at', { ascending: true });
  if (error) {
    console.error('Fetch error:', error);
    return;
  }

  const students = allData.filter(r => r.role === 'internship' || r.designation === 'student' || r.role === 'student');
  console.log(`Fetched ${students.length} total students.`);

  // Mapping course names and codes
  const courseCodeMap = {
    'AI Business & Startup Innovation': 'NCIE-AIB-201',
    'Entrepreneurship, Innovation and Startup Development for Viksit Bharat 2047': 'NCIE-EIS-101',
    'Design Thinking, Technology Innovation and Product Development': 'NCIE-DTT-102',
    'Innovation, Design Thinking & Start-up Development': 'NCIE-IDS-103',
    'Emerging Technologies, Product Innovation & Entrepreneurship': 'NCIE-ETP-104',
    'Innovational & Technology Management': 'NCIE-ITM-105',
    'Technology Commercialization, IPR & Business Model Innovation': 'NCIE-TCP-106',
    'Startup Development, Business Models and Technology Commercialization': 'NCIE-SDB-107'
  };

  const studentRecords = students.map((s, index) => {
    let courseName = 'Innovation, Design Thinking & Start-up Development';
    if (s.proposal) {
      const match = s.proposal.match(/Course:\s*([^|\n]+)/i);
      if (match) {
        courseName = match[1].trim();
      }
    }

    const cleanCourseName = courseName
      .replace(/\s+for\s+Viksit\s+Bharat\s+2047/i, '')
      .replace(/\s+/g, ' ')
      .trim();

    const courseCode = courseCodeMap[cleanCourseName] || 'NCIE-GEN-100';

    const rawRoll = (s.reg_number || '').trim();
    const rollNo = rawRoll ? rawRoll : (s.reg_id || `NCIE-STU-${1000 + index}`);
    const email = (s.email || '').trim().toLowerCase();
    const cleanName = (s.full_name || 'Student').trim();
    const regId = (s.reg_id || `REG-2026-${1000 + index}`).trim();
    const mobile = (s.mobile || '').trim();

    return {
      id: s.id || `stu-${index + 1}`,
      appId: regId,
      rollNo: rollNo,
      name: cleanName,
      email: email,
      mobile: mobile,
      institution: (s.org_name || 'National Institute of Technology').trim(),
      aisheCode: (s.accreditation_code || 'C-12849').trim(),
      department: (s.department || 'Engineering & Technology').trim(),
      specialization: (s.specialization || '').trim(),
      stream: (s.stream || 'B.Tech / B.E.').trim(),
      yearOfStudy: (s.year_of_study || '3rd Year').trim(),
      sectorTrack: cleanCourseName.includes('AI') ? 'Information Technology & AI' : 'Engineering & Technology',
      cohort: 'Cohort 2026 (Fall Batch)',
      enrolledDate: '01 Oct 2026',
      status: s.status === 'approved' ? 'Active' : 'Active',
      progressPercentage: 0,
      hoursLogged: 0,
      totalRequiredHours: 60,
      completedLessons: [],
      quizScores: {},
      enrolledCourseCode: courseCode,
      enrolledCourseTitle: cleanCourseName,
      defaultPassword: 'ncie2026'
    };
  });

  console.log(`Generated ${studentRecords.length} student records.`);
  
  // Group by courses
  const courseGroups = {};
  studentRecords.forEach(s => {
    courseGroups[s.enrolledCourseTitle] = (courseGroups[s.enrolledCourseTitle] || 0) + 1;
  });
  console.log('Courses distribution:', courseGroups);

  return studentRecords;
}

generate();
