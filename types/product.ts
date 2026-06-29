export interface Product {
  id: number;
  name: string;
  slug: string;
  brand_id: number;
  category_id: number;
  model_number?: string;
  sku?: string;
  barcode?: string;
  mrp: number;
  selling_price: number;
  discount_percent: number;
  description?: string;
  features: string[];
  specifications: Record<string, string>;
  stock_quantity: number;
  stock_status: 'in_stock' | 'low_stock' | 'out_of_stock' | 'coming_soon';
  low_stock_threshold: number;
  is_featured: boolean;
  is_new_arrival: boolean;
  is_trending: boolean;
  is_active: boolean;
  tags: string[];
  meta_title?: string;
  meta_description?: string;
  created_at: string;
  updated_at: string;
  brands?: { name: string; slug: string };
  categories?: { name: string; slug: string };
  product_images?: ProductImage[];
}

export interface ProductImage {
  id: number;
  product_id: number;
  image_url: string;
  public_id: string;
  alt_text?: string;
  sort_order: number;
  is_primary: boolean;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  sort_order: number;
  is_active: boolean;
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
  description?: string;
  logo_url?: string;
  website?: string;
  is_active: boolean;
}
