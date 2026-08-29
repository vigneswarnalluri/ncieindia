const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ssbrskimmwetnuydduaa.supabase.co';
const supabaseKey = 'sb_publishable_F4gLMLXTjZVGli4N6gf5gw_oMAu-lIp';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testInsert() {
  const testStudent = {
    reg_id: 'REG-KITS-TEST-' + Date.now().toString().slice(-4),
    role: 'internship',
    full_name: 'Venkata Sai Teja Nalluri',
    email: '22jr1a0501@kitsguntur.ac.in',
    mobile: '+91 98480 22331',
    org_name: 'KKR & KSR Institute of Technology & Sciences (KITS), Guntur',
    reg_number: '22JR1A0501',
    stream: 'B.Tech / B.E.',
    department: 'Computer Science & Engineering',
    specialization: 'Artificial Intelligence & Machine Learning',
    year_of_study: '4th Year',
    state: 'Andhra Pradesh',
    city: 'Guntur',
    proposal: 'Course: Viksit Bharat Innovation Leadership Programme | Payment ID: PAY_KITS_2026_0891',
    status: 'pending',
    submitted_at: new Date().toISOString()
  };

  const { data, error } = await supabase.from('registrations').insert([testStudent]).select();
  if (error) {
    console.error('Insert error:', error);
  } else {
    console.log('Insert SUCCESS:', data);
  }
}

testInsert();
