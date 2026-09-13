const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const env = fs.readFileSync('.env.local', 'utf8');
let url = '', key = '';
env.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts[0] && parts[0].trim() === 'NEXT_PUBLIC_SUPABASE_URL') url = parts.slice(1).join('=').trim().replace(/['"]/g, '');
  if (parts[0] && parts[0].trim() === 'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY') key = parts.slice(1).join('=').trim().replace(/['"]/g, '');
});

const supabase = createClient(url, key);

async function check() {
  // 1. Get courses in database from existing registrations
  const { data } = await supabase.from('registrations').select('proposal');
  const dbCourses = {};
  data.forEach(r => {
    if (r.proposal) {
      const match = r.proposal.match(/Course:\s*([^|\n]+)/i);
      if (match) {
        const c = match[1].trim();
        dbCourses[c] = (dbCourses[c] || 0) + 1;
      }
    }
  });

  console.log('Courses registered in Supabase Database:');
  Object.entries(dbCourses).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => {
    console.log(` - (${v} students) ${k}`);
  });
}

check();
