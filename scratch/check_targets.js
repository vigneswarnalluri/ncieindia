const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ssbrskimmwetnuydduaa.supabase.co';
const supabaseKey = 'sb_publishable_F4gLMLXTjZVGli4N6gf5gw_oMAu-lIp';

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data, error } = await supabase.from('registrations').select('id, reg_id, status').in('reg_id', ['REG-2026-6720', 'REG-2026-1839']);
  console.log('Target records:', data, error);
}

main();
