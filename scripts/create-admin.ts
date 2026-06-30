import { config } from 'dotenv';
import path from 'path';

config({ path: path.resolve(process.cwd(), '.env.local') });

import { createClient } from '@supabase/supabase-js';

const ADMIN_EMAIL = 'admin@chronoshow.com';
const ADMIN_PASSWORD = 'ChronoShow@2026';

async function main() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  // Check if admin already exists
  const { data: existingProfile } = await supabase
    .from('profiles')
    .select('id, role')
    .eq('role', 'owner')
    .maybeSingle();

  if (existingProfile) {
    console.log(`❌ Owner profile already exists (${existingProfile.id}). Skipping creation.`);
    console.log(`   Sign in at http://localhost:3000/admin-login with ${ADMIN_EMAIL}`);
    return;
  }

  // Create user via Admin API
  const { data: userData, error: userError } = await supabase.auth.admin.createUser({
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    email_confirm: true,
  });

  if (userError) {
    console.error('Failed to create user:', userError.message);
    return;
  }

  const userId = userData.user.id;
  console.log(`✅ User created: ${ADMIN_EMAIL} (${userId})`);

  // Insert owner profile
  const { error: profileError } = await supabase.from('profiles').insert({
    id: userId,
    full_name: 'Store Owner',
    role: 'owner',
  });

  if (profileError) {
    console.error('Failed to insert profile:', profileError.message);
    return;
  }

  console.log('✅ Profile created with role: owner');
  console.log('');
  console.log('──────────────────────────────────────────');
  console.log('  Admin credentials:');
  console.log(`  URL:    http://localhost:3000/admin-login`);
  console.log(`  Email:  ${ADMIN_EMAIL}`);
  console.log(`  Pass:   ${ADMIN_PASSWORD}`);
  console.log('──────────────────────────────────────────');
}

main();
