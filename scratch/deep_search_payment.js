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

async function deepSearch() {
  const target = 'pay_TZykCJM9cONt1X';
  const sub = 'TZyk';

  console.log('Fetching all registrations...');
  const { data, error } = await supabase.from('registrations').select('*').order('created_at', { ascending: false });
  if (error) {
    console.error('Error fetching registrations:', error);
    return;
  }

  console.log(`Fetched ${data.length} registrations.`);

  // Check for any match
  const matches = data.filter(r => JSON.stringify(r).includes(sub));
  console.log(`Sub matches for "${sub}":`, matches.length);
  if (matches.length > 0) {
    console.log(matches);
  }

  // Check any payment ID in proposal or anywhere
  const withPay = data.filter(r => r.proposal && r.proposal.includes('Payment ID: pay_'));
  console.log(`Registrations with Payment ID: ${withPay.length}`);
  console.log('Latest 10 registrations with Payment ID:');
  withPay.slice(0, 10).forEach(r => {
    console.log({
      id: r.id,
      reg_id: r.reg_id,
      name: r.full_name,
      email: r.email,
      mobile: r.mobile,
      org: r.org_name,
      proposal: r.proposal,
      created_at: r.created_at
    });
  });

  console.log('\nLatest 5 registrations overall:');
  data.slice(0, 5).forEach(r => {
    console.log({
      id: r.id,
      reg_id: r.reg_id,
      name: r.full_name,
      email: r.email,
      created_at: r.created_at,
      proposal: r.proposal ? r.proposal.slice(0, 80) : null
    });
  });
}

deepSearch();
