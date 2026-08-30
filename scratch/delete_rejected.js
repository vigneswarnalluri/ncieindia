const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ssbrskimmwetnuydduaa.supabase.co';
const supabaseKey = 'sb_publishable_F4gLMLXTjZVGli4N6gf5gw_oMAu-lIp';

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  console.log('Deleting rejected registrations...');
  const { data, error } = await supabase
    .from('registrations')
    .delete()
    .eq('status', 'rejected')
    .select();

  if (error) {
    console.error('Error deleting rejected records:', error);
    return;
  }

  console.log(`Successfully deleted ${data.length} rejected record(s):`, data);
}

main();
