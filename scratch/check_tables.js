const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ssbrskimmwetnuydduaa.supabase.co';
const supabaseKey = 'sb_publishable_F4gLMLXTjZVGli4N6gf5gw_oMAu-lIp';

const supabase = createClient(supabaseUrl, supabaseKey);

const tableNames = [
  'registrations', 'students', 'users', 'applications', 'chapters',
  'internships', 'courses', 'projects', 'profiles', 'members'
];

async function checkTables() {
  for (const table of tableNames) {
    const { data, error } = await supabase.from(table).select('*').limit(5);
    if (error) {
      console.log(`Table '${table}': error/not found (${error.message})`);
    } else {
      console.log(`Table '${table}': FOUND with ${data.length} records!`);
      if (data.length > 0) {
        console.log(JSON.stringify(data[0], null, 2));
      }
    }
  }
}

checkTables();
