export interface Order {
  id: number;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  customer_address?: string;
  status: OrderStatus;
  total_amount: number;
  delivery_type?: 'store_pickup' | 'local_delivery' | 'courier';
  notes?: string;
  whatsapp_message?: string;
  created_at: string;
  updated_at: string;
  order_items?: OrderItem[];
}

export type OrderStatus =
  'new' | 'contacted' | 'confirmed' | 'packed' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface CartItem {
  id: number;
  product_id: number;
  quantity: number;
  product?: import('./product').Product;
}
