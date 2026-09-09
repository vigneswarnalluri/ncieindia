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

async function inspect() {
  const { data: allData, error: allErr } = await supabase.from('registrations').select('*');
  if (allErr) {
    console.error('All err:', allErr);
    return;
  }
  console.log('Total records in registrations:', allData.length);

  const byRole = {};
  for (const r of allData) {
    byRole[r.role] = (byRole[r.role] || 0) + 1;
  }
  console.log('Count by role:', byRole);

  const students = allData.filter(r => r.role === 'internship' || r.designation === 'student');
  console.log('Total students / internship:', students.length);

  const courses = {};
  for (const s of students) {
    // Extract course from proposal or other fields
    let courseName = 'Unknown';
    if (s.proposal) {
      const match = s.proposal.match(/Course:\s*([^|\n]+)/i);
      if (match) {
        courseName = match[1].trim();
      }
    }
    courses[courseName] = (courses[courseName] || 0) + 1;
  }
  console.log('Courses breakdown:', courses);

  console.log('\nSample 5 students:');
  students.slice(0, 5).forEach(s => {
    let courseName = 'Unknown';
    if (s.proposal) {
      const match = s.proposal.match(/Course:\s*([^|\n]+)/i);
      if (match) courseName = match[1].trim();
    }
    console.log(`- ${s.full_name} | Reg: ${s.reg_id} | Roll: ${s.reg_number} | Email: ${s.email} | Mobile: ${s.mobile} | College: ${s.org_name} | Course: ${courseName} | Status: ${s.status}`);
  });
}

inspect();
