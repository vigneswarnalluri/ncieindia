const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ssbrskimmwetnuydduaa.supabase.co';
const supabaseKey = 'sb_publishable_F4gLMLXTjZVGli4N6gf5gw_oMAu-lIp';

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data, error } = await supabase.from('registrations').select('*');
  if (error) {
    console.error('Error fetching registrations:', error);
    return;
  }
  console.log(`Found ${data.length} total registrations in Supabase:`);
  
  // Count by role
  const roles = {};
  const orgs = {};
  data.forEach((r, idx) => {
    roles[r.role] = (roles[r.role] || 0) + 1;
    orgs[r.org_name] = (orgs[r.org_name] || 0) + 1;
    console.log(`[${idx + 1}] ID: ${r.reg_id} | Name: ${r.full_name} | Role: ${r.role} | Org: "${r.org_name}" | Email: ${r.email} | Status: ${r.status}`);
  });

  console.log('\nRoles breakdown:', roles);
  console.log('\nOrganizations breakdown:', orgs);
}

main();
