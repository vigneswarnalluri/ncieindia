const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ssbrskimmwetnuydduaa.supabase.co';
const supabaseKey = 'sb_publishable_F4gLMLXTjZVGli4N6gf5gw_oMAu-lIp';

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  // Let's test if we can delete from any other table or if registrations has specific policies
  console.log('Testing delete on registrations table...');
  const res = await supabase.from('registrations').delete().eq('reg_id', 'NON_EXISTENT_123');
  console.log('Delete response:', res);
}

main();
