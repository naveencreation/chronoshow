import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve('.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const categories = [
  { name: 'Men', slug: 'men', description: 'Watches for men', sort_order: 1 },
  { name: 'Women', slug: 'women', description: 'Watches for women', sort_order: 2 },
  { name: 'Couple', slug: 'couple', description: 'Couple watches', sort_order: 3 },
  { name: 'Kids', slug: 'kids', description: 'Kids watches', sort_order: 4 },
  { name: 'Smart Watches', slug: 'smart-watches', description: 'Smart watches', sort_order: 5 },
  { name: 'Luxury', slug: 'luxury', description: 'Luxury watches', sort_order: 6 },
  { name: 'Sports', slug: 'sports', description: 'Sports watches', sort_order: 7 },
  { name: 'Analog', slug: 'analog', description: 'Analog watches', sort_order: 8 },
  { name: 'Digital', slug: 'digital', description: 'Digital watches', sort_order: 9 },
];

const brands = [
  { name: 'Titan', slug: 'titan', description: 'Titan watches — Indian heritage brand' },
  { name: 'Fastrack', slug: 'fastrack', description: 'Fastrack — Youth fashion watches' },
  { name: 'Casio', slug: 'casio', description: 'Casio — Japanese quality timepieces' },
  { name: 'Sonata', slug: 'sonata', description: 'Sonata — Affordable everyday watches' },
  { name: 'Timex', slug: 'timex', description: 'Timex — American classics' },
  { name: 'Fossil', slug: 'fossil', description: 'Fossil — Premium fashion watches' },
  { name: 'Seiko', slug: 'seiko', description: 'Seiko — Precision Japanese craftsmanship' },
  { name: 'Citizen', slug: 'citizen', description: 'Citizen — Eco-Drive technology' },
];

async function seed() {
  console.log('Seeding categories...');
  const { error: catError } = await supabase
    .from('categories')
    .upsert(categories, { onConflict: 'slug' });
  if (catError) {
    console.error('Categories error:', catError.message);
  } else {
    console.log(`✓ ${categories.length} categories seeded`);
  }

  console.log('Seeding brands...');
  const { error: brandError } = await supabase
    .from('brands')
    .upsert(brands, { onConflict: 'slug' });
  if (brandError) {
    console.error('Brands error:', brandError.message);
  } else {
    console.log(`✓ ${brands.length} brands seeded`);
  }

  console.log('Seed complete!');
}

seed().catch(console.error);
