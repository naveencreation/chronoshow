import type { Order } from './order';

export interface DashboardStats {
  totalProducts: number;
  totalCategories: number;
  totalBrands: number;
  totalOrders: number;
  totalCustomers: number;
  revenue: number;
  lowStockCount: number;
  outOfStockCount: number;
  recentOrders: Order[];
}

export interface ActivityLog {
  id: number;
  user_id: string;
  action: string;
  entity_type: string;
  entity_id: number;
  details?: Record<string, unknown>;
  created_at: string;
}

export interface StoreSettings {
  id: number;
  store_name: string;
  tagline?: string;
  address?: string;
  phone?: string;
  whatsapp_number: string;
  email?: string;
  business_hours?: string;
  delivery_charges: number;
  gst_number?: string;
  logo_url?: string;
  favicon_url?: string;
  facebook_url?: string;
  instagram_url?: string;
  google_maps_embed?: string;
  meta_title?: string;
  meta_description?: string;
}
