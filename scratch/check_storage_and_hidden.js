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

async function checkEverything() {
  const hiddenData = JSON.parse(fs.readFileSync('src/data/hidden_records.json', 'utf8'));
  const { data, error } = await supabase.from('registrations').select('*').in('reg_id', hiddenData.hiddenIds);
  if (!error && data) {
    console.log('Hidden records in DB:', data.length);
    data.forEach(r => {
      console.log(`Hidden: ${r.reg_id} | Name: ${r.full_name} | Proposal: ${r.proposal}`);
    });
  }

  // Let's check storage bucket 'registrations' or 'internship'
  try {
    const { data: buckets, error: bErr } = await supabase.storage.listBuckets();
    console.log('Storage buckets:', buckets ? buckets.map(b => b.name) : bErr);
  } catch (e) {
    console.log('Storage error:', e.message);
  }
}

checkEverything();
