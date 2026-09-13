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

async function checkWindow() {
  const { data, error } = await supabase.from('registrations').select('*').order('created_at', { ascending: true });
  if (error) {
    console.error(error);
    return;
  }

  // Filter around 2026-09-09 14:00 to 16:00
  const windowRecords = data.filter(r => r.created_at && r.created_at.startsWith('2026-09-09T14:'));
  console.log(`Found ${windowRecords.length} records in 14:00-14:59 UTC:`);
  windowRecords.forEach(r => {
    let pid = 'N/A';
    if (r.proposal && r.proposal.includes('Payment ID:')) {
      const match = r.proposal.match(/Payment ID:\s*([^|\n]+)/i);
      if (match) pid = match[1].trim();
    }
    console.log(`[${r.created_at}] Reg: ${r.reg_id} | Name: ${r.full_name} | PID: ${pid} | Email: ${r.email} | Mobile: ${r.mobile}`);
  });

  const windowRecords15 = data.filter(r => r.created_at && r.created_at.startsWith('2026-09-09T15:'));
  console.log(`\nFound ${windowRecords15.length} records in 15:00-15:59 UTC:`);
  windowRecords15.forEach(r => {
    let pid = 'N/A';
    if (r.proposal && r.proposal.includes('Payment ID:')) {
      const match = r.proposal.match(/Payment ID:\s*([^|\n]+)/i);
      if (match) pid = match[1].trim();
    }
    console.log(`[${r.created_at}] Reg: ${r.reg_id} | Name: ${r.full_name} | PID: ${pid} | Email: ${r.email} | Mobile: ${r.mobile}`);
  });
}

checkWindow();
