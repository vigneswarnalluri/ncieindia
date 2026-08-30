const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ssbrskimmwetnuydduaa.supabase.co';
const supabaseKey = 'sb_publishable_F4gLMLXTjZVGli4N6gf5gw_oMAu-lIp';

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  // Let's test if we can update the rejected records or see what constraints exist
  const { data, error } = await supabase
    .from('registrations')
    .select('status')
    .limit(50);
  
  const statuses = new Set(data.map(d => d.status));
  console.log('Existing statuses in DB:', Array.from(statuses));
}

main();
