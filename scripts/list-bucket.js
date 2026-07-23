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

async function run() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    console.error('Missing Supabase credentials');
    process.exit(1);
  }

  const supabase = createClient(url, key);

  try {
    const { data: buckets, error: bError } = await supabase.storage.listBuckets();
    if (bError) throw bError;
    console.log('Available buckets:', buckets.map(b => b.name));

    for (const b of buckets) {
      const { data: files, error: fError } = await supabase.storage.from(b.name).list('', { limit: 100 });
      if (fError) {
        console.log(`Error listing bucket ${b.name}:`, fError.message);
      } else {
        console.log(`Files in "${b.name}":`, files.map(f => f.name));
      }
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
}

run();
