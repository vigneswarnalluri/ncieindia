const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ssbrskimmwetnuydduaa.supabase.co';
const supabaseKey = 'sb_publishable_F4gLMLXTjZVGli4N6gf5gw_oMAu-lIp';

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data, error, count } = await supabase
    .from('registrations')
    .delete({ count: 'exact' })
    .eq('reg_id', 'REG-2026-1839');

  console.log('Delete result:', { data, error, count });
}

main();
