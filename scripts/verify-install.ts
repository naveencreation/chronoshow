/**
 * Verify Installation Script
 * Checks all environment variables, Supabase connection, database state,
 * and Cloudinary configuration.
 */

import { config } from 'dotenv';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { createClient } from '@supabase/supabase-js';

config({ path: resolve('.env.local'), quiet: true });

let failures = 0;

function pass(msg: string) {
  console.log(`  ✓ ${msg}`);
}

function fail(msg: string) {
  console.log(`  ✗ ${msg}`);
  failures++;
}

function header(msg: string) {
  console.log(`\n${msg}`);
  console.log('─'.repeat(msg.length));
}

async function main() {
  // ── 1. Environment Variables ─────────────────────────────────
  header('1. Environment Variables');

  const exampleEnv = readFileSync('.env.example', 'utf-8');
  const requiredVars = exampleEnv
    .split('\n')
    .filter((line) => line && !line.startsWith('#') && line.includes('='))
    .map((line) => line.split('=')[0].trim());

  for (const varName of requiredVars) {
    const value = process.env[varName];
    if (!value) {
      fail(`${varName}: missing`);
      continue;
    }
    const isPlaceholder = value.includes('your-') || value.includes('placeholder') || value === '';
    if (isPlaceholder) {
      fail(`${varName}: placeholder value (${value})`);
    } else {
      const masked = value.length > 20 ? value.substring(0, 16) + '...' : value;
      pass(`${varName}=${masked}`);
    }
  }

  // ── 2. Supabase Connection ───────────────────────────────────
  header('2. Supabase Connection');

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    fail('Supabase URL or service key missing — cannot connect');
  } else {
    try {
      const supabase = createClient(supabaseUrl, serviceKey);
      const { error } = await supabase.from('categories').select('count', {
        count: 'exact',
        head: true,
      });

      if (error) {
        fail(`Supabase query failed: ${error.message}`);
      } else {
        pass(`Supabase connected (${supabaseUrl})`);
      }
    } catch (e: any) {
      fail(`Supabase connection error: ${e.message}`);
    }
  }

  const supabase = createClient(supabaseUrl!, serviceKey!);

  // ── 3. Database Tables ───────────────────────────────────────
  header('3. Database Tables');

  const tables = [
    'profiles',
    'categories',
    'brands',
    'products',
    'product_images',
    'inventory_logs',
    'offers',
    'orders',
    'order_items',
    'wishlists',
    'cart_items',
    'reviews',
    'banners',
    'store_settings',
    'activity_logs',
    'notifications',
    'customers',
  ];

  for (const table of tables) {
    const { error, count } = await supabase
      .from(table)
      .select('count', { count: 'exact', head: true });
    if (error) {
      fail(`${table}: ${error.message}`);
    } else {
      pass(`${table} (${count} rows)`);
    }
  }

  // ── 4. Seed Data ─────────────────────────────────────────────
  header('4. Seed Data');

  const { count: catCount } = await supabase
    .from('categories')
    .select('count', { count: 'exact', head: true });
  const catsOk = (catCount || 0) >= 9;
  catsOk
    ? pass(`Categories: ${catCount}/9 minimum`)
    : fail(`Categories: ${catCount} (need at least 9)`);

  const { count: brandCount } = await supabase
    .from('brands')
    .select('count', { count: 'exact', head: true });
  const brandsOk = (brandCount || 0) >= 8;
  brandsOk
    ? pass(`Brands: ${brandCount}/8 minimum`)
    : fail(`Brands: ${brandCount} (need at least 8)`);

  const { error: settingsErr } = await supabase.from('store_settings').select('id').single();
  settingsErr ? fail(`Store settings: ${settingsErr.message}`) : pass('Store settings: present');

  // ── 5. Cloudinary Configuration ──────────────────────────────
  header('5. Cloudinary Configuration');

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  cloudName && cloudName !== 'your-cloud-name'
    ? pass(`Cloudinary cloud: ${cloudName}`)
    : fail('Cloudinary cloud name not configured');

  uploadPreset && uploadPreset !== 'your-unsigned-preset'
    ? pass(`Upload preset: ${uploadPreset}`)
    : fail('Cloudinary upload preset not configured');

  // ── 6. Project Files ─────────────────────────────────────────
  header('6. Key Project Files');

  const requiredFiles = [
    'package.json',
    'next.config.ts',
    'jest.config.js',
    'playwright.config.ts',
    '.env.local',
    '.env.example',
    'config/site.ts',
    'config/navigation.ts',
    'config/filters.ts',
    'config/sorting.ts',
    'config/whatsapp.ts',
    'config/cloudinary.ts',
    'config/pagination.ts',
    'config/roles.ts',
    'config/features.ts',
    'lib/supabase/client.ts',
    'lib/supabase/server.ts',
    'lib/supabase/admin.ts',
    'lib/utils.ts',
    'lib/schemas.ts',
    'types/index.ts',
    'types/product.ts',
    'types/order.ts',
    'types/admin.ts',
    'lib/data/products.ts',
    'lib/data/categories.ts',
    'lib/data/brands.ts',
    'lib/data/orders.ts',
    'components/providers/auth-provider.tsx',
    'scripts/schema.sql',
    'scripts/rls.sql',
    'scripts/indexes.sql',
    'scripts/seed-database.ts',
  ];

  for (const file of requiredFiles) {
    existsSync(file) ? pass(file) : fail(`${file}: missing`);
  }

  // ── Summary ──────────────────────────────────────────────────
  header('Summary');

  if (failures === 0) {
    console.log('  ✓ All checks passed! Project is ready.\n');
  } else {
    console.log(`  ✗ ${failures} check(s) failed. Fix them before continuing.\n`);
  }

  process.exit(failures > 0 ? 1 : 0);
}

main();
