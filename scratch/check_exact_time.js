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

async function checkExactTime() {
  const { data, error } = await supabase.from('registrations').select('*').order('created_at', { ascending: true });
  if (error) {
    console.error(error);
    return;
  }

  // Filter 2026-09-09 14:40 to 15:05
  const records = data.filter(r => {
    if (!r.created_at) return false;
    return r.created_at >= '2026-09-09T14:40:00' && r.created_at <= '2026-09-09T15:05:00';
  });

  console.log(`Found ${records.length} records between 14:40 and 15:05 UTC on 2026-09-09:`);
  records.forEach(r => {
    let pid = 'N/A';
    if (r.proposal && r.proposal.includes('Payment ID:')) {
      const match = r.proposal.match(/Payment ID:\s*([^|\n]+)/i);
      if (match) pid = match[1].trim();
    }
    console.log(`Time: ${r.created_at} | Reg: ${r.reg_id} | PID: ${pid} | Name: ${r.full_name} | Email: ${r.email} | Mobile: ${r.mobile}`);
  });
}

checkExactTime();
