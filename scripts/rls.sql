-- Row Level Security Policies
-- Run after schema.sql

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_logs ENABLE ROW LEVEL SECURITY;

-- PROFILES
CREATE POLICY "Profiles read all" ON profiles FOR SELECT USING (true);
CREATE POLICY "Profiles update own" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Profiles admin update" ON profiles FOR UPDATE 
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('owner', 'manager')));

-- PRODUCTS
CREATE POLICY "Products public read" ON products FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Products admin all" ON products FOR ALL 
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('owner', 'manager', 'staff')));

-- CATEGORIES
CREATE POLICY "Categories public read" ON categories FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Categories admin all" ON categories FOR ALL 
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('owner', 'manager', 'staff')));

-- BRANDS
CREATE POLICY "Brands public read" ON brands FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Brands admin all" ON brands FOR ALL 
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('owner', 'manager', 'staff')));

-- ORDERS
CREATE POLICY "Orders admin all" ON orders FOR ALL 
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('owner', 'manager', 'staff')));
CREATE POLICY "Orders customer read" ON orders FOR SELECT 
  USING (customer_phone = (SELECT phone FROM profiles WHERE id = auth.uid()));

-- ORDER ITEMS
CREATE POLICY "Order items admin all" ON order_items FOR ALL 
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('owner', 'manager', 'staff')));
CREATE POLICY "Order items customer read" ON order_items FOR SELECT 
  USING (EXISTS (SELECT 1 FROM orders WHERE id = order_items.order_id AND customer_phone = (SELECT phone FROM profiles WHERE id = auth.uid())));

-- WISHLISTS
CREATE POLICY "Wishlists own" ON wishlists FOR ALL USING (user_id = auth.uid());

-- CART
CREATE POLICY "Cart own" ON cart_items FOR ALL USING (user_id = auth.uid());

-- REVIEWS
CREATE POLICY "Reviews public read" ON reviews FOR SELECT USING (is_approved = TRUE);
CREATE POLICY "Reviews admin all" ON reviews FOR ALL 
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('owner', 'manager', 'staff')));
CREATE POLICY "Reviews own write" ON reviews FOR INSERT WITH CHECK (user_id = auth.uid());

-- BANNERS
CREATE POLICY "Banners public read" ON banners FOR SELECT USING (
  is_active = TRUE 
  AND (start_date IS NULL OR start_date <= NOW()) 
  AND (end_date IS NULL OR end_date >= NOW())
);
CREATE POLICY "Banners admin all" ON banners FOR ALL 
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('owner', 'manager', 'staff')));

-- STORE SETTINGS
CREATE POLICY "Store settings public read" ON store_settings FOR SELECT USING (true);
CREATE POLICY "Store settings admin update" ON store_settings FOR UPDATE 
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('owner', 'manager')));

-- OFFERS
CREATE POLICY "Offers public read" ON offers FOR SELECT USING (
  is_active = TRUE 
  AND (start_date IS NULL OR start_date <= NOW()) 
  AND (end_date IS NULL OR end_date >= NOW())
);
CREATE POLICY "Offers admin all" ON offers FOR ALL 
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('owner', 'manager', 'staff')));

-- CUSTOMERS
CREATE POLICY "Customers admin all" ON customers FOR ALL 
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('owner', 'manager', 'staff')));

-- NOTIFICATIONS
CREATE POLICY "Notifications own" ON notifications FOR ALL USING (user_id = auth.uid());

-- ACTIVITY LOGS
CREATE POLICY "Activity logs admin read" ON activity_logs FOR SELECT 
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('owner', 'manager')));

-- INVENTORY LOGS
CREATE POLICY "Inventory logs admin read" ON inventory_logs FOR SELECT 
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('owner', 'manager', 'staff')));
