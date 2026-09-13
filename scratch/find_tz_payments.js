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

async function findTZ() {
  const { data, error } = await supabase.from('registrations').select('*');
  if (error) {
    console.error(error);
    return;
  }

  // Extract all payment IDs
  const allPay = [];
  data.forEach(r => {
    let pid = null;
    if (r.proposal && r.proposal.includes('Payment ID:')) {
      const match = r.proposal.match(/Payment ID:\s*([^|\n]+)/i);
      if (match) pid = match[1].trim();
    }
    if (pid) {
      allPay.push({ pid, r });
    }
  });

  console.log(`Total records with Payment ID: ${allPay.length}`);

  // Find all starting with pay_TZ
  const tzMatches = allPay.filter(p => p.pid.startsWith('pay_TZ') || p.pid.toLowerCase().includes('tzyk'));
  console.log('Matches starting with pay_TZ or containing tzyk:', tzMatches.length);
  tzMatches.forEach(m => {
    console.log({
      pid: m.pid,
      reg_id: m.r.reg_id,
      name: m.r.full_name,
      email: m.r.email,
      created_at: m.r.created_at,
      proposal: m.r.proposal
    });
  });

  // Let's also check if there's any similar payment ID by fuzzy comparison / Levenshtein
  console.log('\nLooking for closest IDs to pay_TZykCJM9cONt1X:');
  function levenshtein(a, b) {
    const matrix = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
    for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
    for (let j = 0; j <= b.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost
        );
      }
    }
    return matrix[a.length][b.length];
  }

  const target = 'pay_TZykCJM9cONt1X';
  const scored = allPay.map(p => ({
    pid: p.pid,
    dist: levenshtein(target, p.pid),
    r: p.r
  })).sort((a, b) => a.dist - b.dist);

  console.log('Top 5 closest payment IDs:');
  scored.slice(0, 5).forEach(s => {
    console.log(`Dist: ${s.dist} | PID: ${s.pid} | Reg: ${s.r.reg_id} | Name: ${s.r.full_name} | Email: ${s.r.email} | Created: ${s.r.created_at}`);
  });
}

findTZ();
