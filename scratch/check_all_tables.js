const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ssbrskimmwetnuydduaa.supabase.co';
const supabaseKey = 'sb_publishable_F4gLMLXTjZVGli4N6gf5gw_oMAu-lIp';
const supabase = createClient(supabaseUrl, supabaseKey);

const allPossibleTables = [
  'programs', 'media_announcements', 'notices', 'orders', 'vacancies', 'schemes',
  'registrations', 'candidate_registrations', 'student_registrations', 'internship_applications',
  'users', 'profiles', 'chapters', 'college_registrations', 'forms', 'responses'
];

async function checkAll() {
  for (const t of allPossibleTables) {
    const { data, error } = await supabase.from(t).select('*');
    if (error) {
      console.log(`[${t}]: ${error.message}`);
    } else {
      console.log(`✅ [${t}]: Found ${data.length} records`);
      if (data.length > 0) {
        console.log(`   Sample keys:`, Object.keys(data[0]));
        console.log(`   First row:`, data[0]);
      }
    }
  }
}

checkAll();
