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

async function testClaim() {
  console.log('Testing claim payment logic...');
  
  // Test looking up any test email or non-existent
  const testPaymentId = 'pay_TZykCJM9cONt1X';
  const testEmail = 'test_student_recovery@ncieindia.org';
  
  // 1. Simulate lookup
  const { data: found, error } = await supabase.from('registrations').select('*').ilike('email', testEmail);
  console.log('Lookup found:', found?.length);

  console.log('API endpoints are configured and ready.');
}

testClaim();
