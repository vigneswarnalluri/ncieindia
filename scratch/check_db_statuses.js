const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const env = fs.readFileSync('.env.local', 'utf8');
let url = '', key = '';
env.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts[0] && parts[0].trim() === 'NEXT_PUBLIC_SUPABASE_URL') url = parts.slice(1).join('=').trim().replace(/['"]/g, '');
  if (parts[0] && parts[0].trim() === 'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY') key = parts.slice(1).join('=').trim().replace(/['"]/g, '');
});

const supabase = createClient(url, key);

async function checkStatuses() {
  const { data, error } = await supabase.from('registrations').select('status');
  if (error) console.error(error);
  else {
    const counts = {};
    data.forEach(r => {
      counts[r.status] = (counts[r.status] || 0) + 1;
    });
    console.log('Status counts in DB:', counts);
  }
}

checkStatuses();
