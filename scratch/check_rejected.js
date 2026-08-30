const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ssbrskimmwetnuydduaa.supabase.co';
const supabaseKey = 'sb_publishable_F4gLMLXTjZVGli4N6gf5gw_oMAu-lIp';

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  console.log('Querying all rejected registrations...');
  const { data, error } = await supabase
    .from('registrations')
    .select('reg_id, full_name, email, role, status, org_name')
    .eq('status', 'rejected');

  if (error) {
    console.error('Error fetching rejected records:', error);
    return;
  }

  console.log(`Found ${data.length} rejected record(s):`);
  data.forEach((r, i) => {
    console.log(`[${i+1}] ${r.reg_id} | ${r.full_name} | ${r.email} | ${r.role} | ${r.status} | ${r.org_name}`);
  });
}

main();
