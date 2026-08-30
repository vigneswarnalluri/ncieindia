const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ssbrskimmwetnuydduaa.supabase.co';
const supabaseKey = 'sb_publishable_F4gLMLXTjZVGli4N6gf5gw_oMAu-lIp';

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data, error, count } = await supabase
    .from('registrations')
    .delete({ count: 'exact' })
    .eq('id', 'db60e71f-d665-4380-a462-ed7bdffb866f');

  console.log('Delete by UUID id:', { data, error, count });
}

main();
