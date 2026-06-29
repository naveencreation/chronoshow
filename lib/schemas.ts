import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(200),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  brand_id: z.number().int().positive('Brand is required'),
  category_id: z.number().int().positive('Category is required'),
  model_number: z.string().optional(),
  sku: z.string().optional(),
  barcode: z.string().optional(),
  mrp: z.number().positive('MRP must be greater than 0'),
  selling_price: z.number().positive('Selling price must be greater than 0'),
  description: z.string().optional(),
  features: z.array(z.string()).default([]),
  specifications: z.record(z.string(), z.string()).default({}),
  stock_quantity: z.number().int().min(0).default(0),
  low_stock_threshold: z.number().int().min(1).default(5),
  is_featured: z.boolean().default(false),
  is_new_arrival: z.boolean().default(false),
  is_trending: z.boolean().default(false),
  is_active: z.boolean().default(true),
  tags: z.array(z.string()).default([]),
  meta_title: z.string().max(60).optional(),
  meta_description: z.string().max(160).optional(),
});

export const orderSchema = z.object({
  customer_name: z.string().min(2, 'Name is required'),
  customer_phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
  customer_email: z.string().email().optional().or(z.literal('')),
  customer_address: z.string().optional(),
  delivery_type: z.enum(['store_pickup', 'local_delivery', 'courier']),
  notes: z.string().optional(),
  items: z
    .array(
      z.object({
        product_id: z.number().int().positive(),
        quantity: z.number().int().min(1),
      })
    )
    .min(1, 'At least one item is required'),
});

export const categorySchema = z.object({
  name: z.string().min(1).max(100),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  description: z.string().optional(),
  image_url: z.string().url().optional().or(z.literal('')),
  sort_order: z.number().int().default(0),
  is_active: z.boolean().default(true),
});

export const brandSchema = z.object({
  name: z.string().min(1).max(100),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  description: z.string().optional(),
  logo_url: z.string().url().optional().or(z.literal('')),
  website: z.string().url().optional().or(z.literal('')),
  is_active: z.boolean().default(true),
});

export const settingsSchema = z.object({
  store_name: z.string().min(1),
  tagline: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  whatsapp_number: z.string().regex(/^\+?[1-9]\d{1,14}$/),
  email: z.string().email().optional().or(z.literal('')),
  business_hours: z.string().optional(),
  delivery_charges: z.number().min(0).default(0),
  gst_number: z.string().optional(),
});

export const reviewSchema = z.object({
  product_id: z.number().int().positive(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(5).max(1000),
});

export type ProductInput = z.infer<typeof productSchema>;
export type OrderInput = z.infer<typeof orderSchema>;
export type CategoryInput = z.infer<typeof categorySchema>;
export type BrandInput = z.infer<typeof brandSchema>;
export type SettingsInput = z.infer<typeof settingsSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
