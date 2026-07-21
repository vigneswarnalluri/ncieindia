const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

function loadEnv() {
  const envFiles = ['.env.local', '.env'];
  for (const file of envFiles) {
    const filePath = path.join(process.cwd(), file);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      content.split('\n').forEach(line => {
        const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
        if (match) {
          const key = match[1];
          let value = match[2] || '';
          if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
          if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
          process.env[key] = value.trim();
        }
      });
    }
  }
}

loadEnv();

async function runAudit() {
  console.log('\n==========================================');
  console.log('NCIE INDIA - DATABASE & ENV AUDIT REPORT');
  console.log('==========================================\n');

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  const webhookUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL;
  const ssoClientId = process.env.NEXT_PUBLIC_MERIPEHCHAAN_CLIENT_ID;

  console.log('1. ENVIRONMENT VARIABLES AUDIT:');
  console.log('   - NEXT_PUBLIC_SUPABASE_URL:             ', url ? (url.includes('your-supabase') ? '⚠️ Placeholder set' : '✅ ' + url) : '❌ Missing');
  console.log('   - NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: ', key ? (key.includes('your-supabase') ? '⚠️ Placeholder set' : '✅ Present (' + key.slice(0, 12) + '...)') : '❌ Missing');
  console.log('   - GOOGLE_SHEETS_WEBHOOK_URL:             ', webhookUrl ? '✅ Set' : '⚪ Optional (Not set)');
  console.log('   - MERIPEHCHAAN_SSO_CLIENT_ID:            ', ssoClientId ? '✅ Set' : '⚪ Optional (Not set)');

  if (!url || !key || url.includes('your-supabase') || key.includes('your-supabase')) {
    console.log('\n❌ DATABASE TEST SKIPPED:');
    console.log('   Please open .env.local and replace the placeholder values with your actual Supabase URL and Publishable Key.\n');
    return;
  }

  console.log('\n2. TESTING DATABASE CONNECTION & QUERYING TABLES...');
  try {
    const supabase = createClient(url, key);

    // Test registrations table
    const { count: regCount, error: regError } = await supabase.from('registrations').select('*', { count: 'exact', head: true });
    if (regError) {
      console.log('   ⚠️ Table [registrations]:', regError.message, `(Code: ${regError.code})`);
    } else {
      console.log('   ✅ Table [registrations]: Connected! Record Count =', regCount ?? 0);
    }

    // Test visitor_count table
    const { count: visitorCount, error: visitorError } = await supabase.from('visitor_count').select('*', { count: 'exact', head: true });
    if (visitorError) {
      console.log('   ⚠️ Table [visitor_count]:', visitorError.message);
    } else {
      console.log('   ✅ Table [visitor_count]: Connected! Record Count =', visitorCount ?? 0);
    }

    console.log('\n✅ Supabase Connection Test Completed Successfully!\n');
  } catch (err) {
    console.log('\n❌ Connection Exception:', err.message, '\n');
  }
}

runAudit();
