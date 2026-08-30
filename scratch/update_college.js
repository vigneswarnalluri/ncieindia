const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ssbrskimmwetnuydduaa.supabase.co';
const supabaseKey = 'sb_publishable_F4gLMLXTjZVGli4N6gf5gw_oMAu-lIp';

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  console.log('Querying registration REG-2026-1556...');
  const { data, error } = await supabase
    .from('registrations')
    .select('*')
    .eq('reg_id', 'REG-2026-1556');

  if (error) {
    console.error('Error querying registration:', error);
    return;
  }

  console.log('Current record:', data);

  if (!data || data.length === 0) {
    console.log('Record REG-2026-1556 not found. Let us search by fuzzy ID or similar...');
    const { data: allData, error: allErr } = await supabase
      .from('registrations')
      .select('reg_id, full_name, email, org_name, role')
      .ilike('reg_id', '%1556%');
    console.log('Search by 1556:', allData, allErr);
    return;
  }

  console.log('Updating record org_name to "KITS AKSHAR INSTITUTE OF TECHNOLOGY"...');
  const { data: updated, error: updateErr } = await supabase
    .from('registrations')
    .update({ org_name: 'KITS AKSHAR INSTITUTE OF TECHNOLOGY' })
    .eq('reg_id', 'REG-2026-1556')
    .select();

  if (updateErr) {
    console.error('Update error:', updateErr);
    return;
  }

  console.log('Successfully updated:', updated);
}

main();
