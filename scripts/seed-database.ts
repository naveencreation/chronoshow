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

  // Fetch IDs for foreign keys
  const { data: cats } = await supabase.from('categories').select('id, slug');
  const { data: brs } = await supabase.from('brands').select('id, slug');

  const catMap = Object.fromEntries((cats || []).map((c) => [c.slug, c.id]));
  const brandMap = Object.fromEntries((brs || []).map((b) => [b.slug, b.id]));

  const products = [
    {
      name: 'Titan Neo Splash',
      slug: 'titan-neo-splash',
      brand_id: brandMap.titan,
      category_id: catMap.men,
      model_number: 'TN-9001',
      sku: 'TIT-NEO-001',
      mrp: 4995,
      selling_price: 3995,
      description:
        'Bold and colorful analog watch with a stainless steel back. Water resistant up to 50 meters with a comfortable silicone strap.',
      features: ['Water Resistant 50m', 'Stainless Steel Back', 'Silicone Strap', 'Date Display'],
      specifications: {
        case_diameter: '42mm',
        strap_material: 'Silicone',
        movement: 'Quartz',
        glass: 'Mineral',
      },
      stock_quantity: 25,
      is_featured: true,
      is_new_arrival: true,
      tags: ['sports', 'colorful', 'casual'],
    },
    {
      name: 'Titan Raga Viva',
      slug: 'titan-raga-viva',
      brand_id: brandMap.titan,
      category_id: catMap.women,
      model_number: 'TR-2003',
      sku: 'TIT-RAG-002',
      mrp: 7995,
      selling_price: 6995,
      description:
        'Elegant and feminine watch designed for the modern woman. Features a mother-of-pearl dial with gold-plated accents.',
      features: ['Mother of Pearl Dial', 'Gold Plated', 'Swarovski Crystals', 'Date Display'],
      specifications: {
        case_diameter: '32mm',
        strap_material: 'Stainless Steel',
        movement: 'Quartz',
        glass: 'Sapphire',
      },
      stock_quantity: 15,
      is_featured: true,
      tags: ['elegant', 'jewelry', 'formal'],
    },
    {
      name: 'Casio G-Shock GA-2100',
      slug: 'casio-gshock-ga2100',
      brand_id: brandMap.casio,
      category_id: catMap.sports,
      model_number: 'GA-2100-1A',
      sku: 'CAS-GSH-003',
      mrp: 10995,
      selling_price: 9495,
      description:
        'The iconic "CasiOak" — ultra-durable analog-digital watch with Carbon Core Guard structure. Shock resistant and 200m water resistant.',
      features: [
        'Shock Resistant',
        'Water Resistant 200m',
        'Carbon Core Guard',
        'World Time',
        'LED Light',
      ],
      specifications: {
        case_diameter: '45mm',
        strap_material: 'Resin',
        movement: 'Quartz',
        glass: 'Mineral',
      },
      stock_quantity: 30,
      is_featured: true,
      is_new_arrival: true,
      tags: ['rugged', 'digital-analog', 'outdoor'],
    },
    {
      name: 'Fossil Neutra Chronograph',
      slug: 'fossil-neutra-chronograph',
      brand_id: brandMap.fossil,
      category_id: catMap.men,
      model_number: 'FS-5903',
      sku: 'FOS-NEU-004',
      mrp: 14995,
      selling_price: 11995,
      description:
        'Sophisticated chronograph watch with a striking blue dial and stainless steel bracelet. Perfect for both casual and formal occasions.',
      features: ['Chronograph', 'Date Window', 'Stainless Steel Bracelet', '100m Water Resistant'],
      specifications: {
        case_diameter: '44mm',
        strap_material: 'Stainless Steel',
        movement: 'Quartz Chronograph',
        glass: 'Mineral',
      },
      stock_quantity: 12,
      is_featured: true,
      tags: ['chronograph', 'formal', 'premium'],
    },
    {
      name: 'Fastrack Casual Black',
      slug: 'fastrack-casual-black',
      brand_id: brandMap.fastrack,
      category_id: catMap.men,
      model_number: 'FT-38012',
      sku: 'FAS-CAS-005',
      mrp: 2495,
      selling_price: 1995,
      description:
        'Trendy everyday watch with a sleek all-black design. Lightweight and comfortable for daily wear.',
      features: ['Lightweight', 'All Black Design', 'Date Display', '30m Water Resistant'],
      specifications: {
        case_diameter: '40mm',
        strap_material: 'Silicone',
        movement: 'Quartz',
        glass: 'Mineral',
      },
      stock_quantity: 50,
      tags: ['casual', 'affordable', 'trendy'],
    },
    {
      name: 'Sonata Super Fibre',
      slug: 'sonata-super-fibre',
      brand_id: brandMap.sonata,
      category_id: catMap.men,
      model_number: 'SN-7701',
      sku: 'SON-SUP-006',
      mrp: 1495,
      selling_price: 1195,
      description:
        'Budget-friendly yet stylish analog watch with a durable fibre strap. Ideal for students and young professionals.',
      features: ['Durable Fibre Strap', 'Scratch Resistant Glass', 'Analog Display', '3 ATM'],
      specifications: {
        case_diameter: '38mm',
        strap_material: 'Fibre',
        movement: 'Quartz',
        glass: 'Mineral',
      },
      stock_quantity: 80,
      is_new_arrival: true,
      tags: ['budget', 'student', 'everyday'],
    },
    {
      name: 'Timex Weekender',
      slug: 'timex-weekender',
      brand_id: brandMap.timex,
      category_id: catMap.men,
      model_number: 'TW-2P623',
      sku: 'TIM-WEE-007',
      mrp: 4495,
      selling_price: 3495,
      description:
        'Classic casual watch with the signature Timex Indiglo night-light. Comes with interchangeable slip-thru straps.',
      features: [
        'Indiglo Night Light',
        'Interchangeable Strap',
        'Brass Case',
        '30m Water Resistant',
      ],
      specifications: {
        case_diameter: '38mm',
        strap_material: 'Nylon',
        movement: 'Quartz',
        glass: 'Mineral',
      },
      stock_quantity: 20,
      is_featured: true,
      tags: ['classic', 'casual', 'versatile'],
    },
    {
      name: 'Seiko 5 Automatic',
      slug: 'seiko-5-automatic',
      brand_id: brandMap.seiko,
      category_id: catMap.luxury,
      model_number: 'SNK809K1',
      sku: 'SEI-5AU-008',
      mrp: 25995,
      selling_price: 21995,
      description:
        'Legendary automatic watch from the Seiko 5 series. Features a see-through case back, day-date display, and 21-jewel movement.',
      features: [
        'Automatic Movement',
        'See-through Case Back',
        'Day-Date Display',
        'Hardlex Crystal',
        '30m Water Resistant',
      ],
      specifications: {
        case_diameter: '37mm',
        strap_material: 'Nylon',
        movement: 'Automatic 7S26',
        glass: 'Hardlex',
      },
      stock_quantity: 8,
      is_featured: true,
      tags: ['automatic', 'japanese', 'collector'],
    },
    {
      name: 'Casio Vintage A168',
      slug: 'casio-vintage-a168',
      brand_id: brandMap.casio,
      category_id: catMap.digital,
      model_number: 'A168WA-1',
      sku: 'CAS-VIN-009',
      mrp: 1995,
      selling_price: 1795,
      description:
        'Retro digital watch with an LED backlight and stainless steel band. The iconic vintage Casio design loved across generations.',
      features: [
        'LED Backlight',
        'Daily Alarm',
        'Stopwatch',
        'Auto Calendar',
        'Stainless Steel Band',
      ],
      specifications: {
        case_diameter: '32mm',
        strap_material: 'Stainless Steel',
        movement: 'Digital Quartz',
        glass: 'Acrylic',
      },
      stock_quantity: 65,
      tags: ['retro', 'digital', 'iconic'],
    },
    {
      name: 'Citizen Eco-Drive Chronograph',
      slug: 'citizen-eco-drive-chronograph',
      brand_id: brandMap.citizen,
      category_id: catMap.luxury,
      model_number: 'AT2141-52L',
      sku: 'CIT-ECO-010',
      mrp: 32995,
      selling_price: 28995,
      description:
        'Powered by any light — never needs a battery change. Premium chronograph with sapphire crystal and a stunning blue sunray dial.',
      features: [
        'Eco-Drive (Solar)',
        'Sapphire Crystal',
        'Chronograph',
        'Date Window',
        '100m Water Resistant',
      ],
      specifications: {
        case_diameter: '42mm',
        strap_material: 'Stainless Steel',
        movement: 'Eco-Drive Quartz',
        glass: 'Sapphire',
      },
      stock_quantity: 6,
      is_featured: true,
      is_new_arrival: true,
      tags: ['solar', 'premium', 'sapphire'],
    },
    {
      name: 'Fastrack Reflex Vox',
      slug: 'fastrack-reflex-vox',
      brand_id: brandMap.fastrack,
      category_id: catMap['smart-watches'],
      model_number: 'FT-5001',
      sku: 'FAS-REF-011',
      mrp: 5995,
      selling_price: 4995,
      description:
        'Feature-packed smartwatch with 1.4" AMOLED display, heart rate tracking, SpO2 monitoring, and 7-day battery life.',
      features: [
        '1.4" AMOLED',
        'Heart Rate & SpO2',
        'IP68 Water Resistant',
        '7 Day Battery',
        'Multiple Watch Faces',
      ],
      specifications: {
        display: '1.4" AMOLED',
        battery: '7 days typical',
        waterproof: 'IP68',
        compatibility: 'iOS & Android',
      },
      stock_quantity: 35,
      tags: ['smartwatch', 'fitness', 'AMOLED'],
    },
    {
      name: 'Titan Couple Set — His & Hers',
      slug: 'titan-couple-set',
      brand_id: brandMap.titan,
      category_id: catMap.couple,
      model_number: 'TC-1000',
      sku: 'TIT-COU-012',
      mrp: 12995,
      selling_price: 9995,
      description:
        'Matching pair of elegant watches — one for him and one for her. Gold-plated with genuine leather straps. Perfect as a gift.',
      features: [
        'Matching Pair',
        'Gold Plated',
        'Genuine Leather',
        'Date Display',
        'Gift Box Included',
      ],
      specifications: {
        case_diameter: '40mm / 32mm',
        strap_material: 'Genuine Leather',
        movement: 'Quartz',
        glass: 'Mineral',
      },
      stock_quantity: 10,
      is_new_arrival: true,
      tags: ['couple', 'gift', 'gold'],
    },
  ];

  console.log('Seeding products...');
  const { error: prodError } = await supabase
    .from('products')
    .upsert(products, { onConflict: 'slug' });
  if (prodError) {
    console.error('Products error:', prodError.message);
  } else {
    console.log(`✓ ${products.length} products seeded`);
  }

  console.log('Seed complete!');
}

seed().catch(console.error);
