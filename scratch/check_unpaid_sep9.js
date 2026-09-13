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

async function checkUnpaidOrLate() {
  const { data, error } = await supabase.from('registrations').select('*').order('created_at', { ascending: true });
  if (error) {
    console.error(error);
    return;
  }

  // Check on 2026-09-09 all unpaid
  const sep9Unpaid = data.filter(r => {
    if (!r.created_at || !r.created_at.startsWith('2026-09-09')) return false;
    const hasPay = r.proposal && r.proposal.includes('Payment ID: pay_');
    return !hasPay;
  });

  console.log(`Unpaid records on 2026-09-09: ${sep9Unpaid.length}`);
  sep9Unpaid.forEach(r => {
    console.log(`[${r.created_at}] Reg: ${r.reg_id} | Role: ${r.role} | Name: ${r.full_name} | Email: ${r.email} | Mobile: ${r.mobile} | Prop: ${r.proposal?.slice(0, 60)}`);
  });
}

checkUnpaidOrLate();
