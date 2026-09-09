const fs = require('fs');
const path = require('path');

const target = path.join(__dirname, '..', 'standalone-lms', 'src', 'data', 'studentsRegistry.ts');
const content = fs.readFileSync(target, 'utf8');

const match = content.match(/export const ALL_REGISTERED_STUDENTS: StudentRegistrationRecord\[\] = (\[[\s\S]*?\]);\n\n\/\*\*/);
if (match) {
  const students = JSON.parse(match[1]);
  const headers = [
    'Registration ID',
    'Roll Number',
    'Full Name',
    'Email Address',
    'Mobile Number',
    'Institution / College',
    'Department',
    'Course Code',
    'Enrolled Course Title',
    'Portal Login Username',
    'Default Password',
    'Batch Start Date',
    'Account Status'
  ];

  const escapeCSV = (val) => {
    if (!val) return '""';
    return '"' + String(val).replace(/"/g, '""') + '"';
  };

  const rows = students.map(s => [
    escapeCSV(s.appId),
    escapeCSV(s.rollNo),
    escapeCSV(s.name),
    escapeCSV(s.email),
    escapeCSV(s.mobile),
    escapeCSV(s.institution),
    escapeCSV(s.department),
    escapeCSV(s.enrolledCourseCode),
    escapeCSV(s.enrolledCourseTitle),
    escapeCSV(s.email),
    escapeCSV(s.defaultPassword),
    escapeCSV(s.enrolledDate),
    escapeCSV(s.status)
  ].join(','));

  const csv = [headers.join(','), ...rows].join('\n');
  fs.writeFileSync(path.join(__dirname, '..', 'NCIE_Student_Logins_and_Course_Allocation.csv'), csv, 'utf8');
  try {
    fs.writeFileSync('c:/Users/vigne/Desktop/NCIE_Student_Logins_and_Course_Allocation.csv', csv, 'utf8');
  } catch (e) {
    console.log('Desktop write error:', e.message);
  }
  console.log('Successfully written CSV! Total student credentials exported:', students.length);
} else {
  console.error('Could not match student json');
}
