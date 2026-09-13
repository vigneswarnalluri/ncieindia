const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

let url = '', key = '';
try {
  const env = fs.readFileSync('.env.local', 'utf8');
  env.split('\n').forEach(line => {
    const parts = line.split('=');
    if (parts[0] && parts[0].trim() === 'NEXT_PUBLIC_SUPABASE_URL') url = parts.slice(1).join('=').trim().replace(/['"]/g, '');
    if (parts[0] && parts[0].trim() === 'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY') key = parts.slice(1).join('=').trim().replace(/['"]/g, '');
    if (!key && parts[0] && parts[0].trim() === 'NEXT_PUBLIC_SUPABASE_ANON_KEY') key = parts.slice(1).join('=').trim().replace(/['"]/g, '');
    if (!key && parts[0] && parts[0].trim() === 'SUPABASE_SERVICE_ROLE_KEY') key = parts.slice(1).join('=').trim().replace(/['"]/g, '');
  });
} catch (e) {
  console.error('Error reading .env.local:', e);
}

if (!url || !key) {
  console.log('Missing url/key:', { url: !!url, key: !!key });
  process.exit(1);
}

const supabase = createClient(url, key);

async function search() {
  const target = 'pay_TZykCJM9cONt1X';
  console.log('Searching for:', target);

  // Search in registrations
  const { data: regData, error: regErr } = await supabase.from('registrations').select('*');
  if (regErr) {
    console.error('Reg error:', regErr);
  } else {
    console.log('Total registrations:', regData.length);
    const matches = regData.filter(r => JSON.stringify(r).toLowerCase().includes(target.toLowerCase()));
    console.log('Matches in registrations:', matches.length);
    if (matches.length > 0) {
      console.log('Registration details:\n', JSON.stringify(matches, null, 2));
    }
  }

  // Search in other known tables if any
  const tables = ['student_registry', 'payments', 'transactions', 'orders'];
  for (const tbl of tables) {
    try {
      const { data, error } = await supabase.from(tbl).select('*');
      if (!error && data) {
        const matches = data.filter(r => JSON.stringify(r).toLowerCase().includes(target.toLowerCase()));
        console.log(`Matches in ${tbl}:`, matches.length);
        if (matches.length > 0) {
          console.log(`Details in ${tbl}:\n`, JSON.stringify(matches, null, 2));
        }
      }
    } catch (e) {
      // ignore table not found
    }
  }
}

search();
