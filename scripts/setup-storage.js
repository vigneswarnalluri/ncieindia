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

const BUCKET_NAME = 'ncie-documents';

async function run() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    console.error('❌ Missing Supabase credentials in environment variables.');
    process.exit(1);
  }

  const supabase = createClient(url, key);

  console.log(`Connecting to Supabase at: ${url}`);
  console.log(`Checking if bucket "${BUCKET_NAME}" exists or attempting to create it...`);

  try {
    // Attempt to create the bucket
    const { data: bucketData, error: createError } = await supabase.storage.createBucket(BUCKET_NAME, {
      public: true,
      allowedMimeTypes: ['application/pdf'],
      fileSizeLimit: 52428800 // 50MB
    });

    if (createError) {
      if (createError.message.includes('already exists') || createError.message.includes('Duplicate')) {
        console.log(`✅ Bucket "${BUCKET_NAME}" already exists.`);
      } else {
        console.warn(`⚠️ Could not create/verify bucket automatically: ${createError.message}`);
        console.log(`👉 Please make sure you have created a PUBLIC bucket named "${BUCKET_NAME}" in your Supabase Dashboard.`);
      }
    } else {
      console.log(`✅ Successfully created public bucket "${BUCKET_NAME}".`);
    }

    // Now upload all PDFs from the public directory
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      console.error('❌ Could not find "public" directory in current path.');
      return;
    }

    const files = fs.readdirSync(publicDir);
    const pdfFiles = files.filter(f => f.toLowerCase().endsWith('.pdf'));

    if (pdfFiles.length === 0) {
      console.log('ℹ️ No PDF files found in the public folder to upload.');
      return;
    }

    console.log(`\nFound ${pdfFiles.length} PDF files in "public/" to upload to Supabase:`);
    
    const urlMapping = {};

    for (const pdfName of pdfFiles) {
      const filePath = path.join(publicDir, pdfName);
      const fileBuffer = fs.readFileSync(filePath);
      
      // Clean target name for safety in URL
      const cleanName = pdfName.replace(/\s+/g, '_');
      
      console.log(`Uploading ${pdfName} as ${cleanName}...`);

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(cleanName, fileBuffer, {
          contentType: 'application/pdf',
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) {
        console.error(`❌ Failed to upload ${pdfName}: ${uploadError.message}`);
      } else {
        const { data: { publicUrl } } = supabase.storage
          .from(BUCKET_NAME)
          .getPublicUrl(cleanName);
        
        console.log(`   ✅ Success! Public URL: ${publicUrl}`);
        urlMapping[pdfName] = publicUrl;
      }
    }

    // Save mappings to a JSON file in src/data
    const dataDir = path.join(process.cwd(), 'src', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const mappingFilePath = path.join(dataDir, 'storageUrls.json');
    
    // Merge with existing mapping if exists
    let existingMapping = {};
    if (fs.existsSync(mappingFilePath)) {
      try {
        existingMapping = JSON.parse(fs.readFileSync(mappingFilePath, 'utf8'));
      } catch (e) {}
    }

    const finalMapping = { ...existingMapping, ...urlMapping };
    fs.writeFileSync(mappingFilePath, JSON.stringify(finalMapping, null, 2), 'utf8');
    console.log(`\n🎉 Saved URL mapping file to ${mappingFilePath}`);

  } catch (err) {
    console.error('❌ Error during setup:', err.message);
  }
}

run();
