import { createClient } from '@/lib/supabase/server';
import { StatCard } from '@/components/admin/stat-card';
import { Package, ShoppingBag, Users, AlertTriangle, Tags } from 'lucide-react';

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [
    { count: productCount },
    { count: categoryCount },
    { count: brandCount },
    { count: orderCount },
    { count: lowStock },
  ] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('categories').select('*', { count: 'exact', head: true }).eq('is_active', true),
    supabase.from('brands').select('*', { count: 'exact', head: true }).eq('is_active', true),
    supabase.from('orders').select('*', { count: 'exact', head: true }),
    supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('stock_status', 'low_stock'),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-1 text-sm text-muted-foreground">Overview of your store</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          label="Total Products"
          value={productCount || 0}
          icon={<Package className="h-5 w-5" />}
        />
        <StatCard
          label="Categories"
          value={categoryCount || 0}
          icon={<Tags className="h-5 w-5" />}
        />
        <StatCard
          label="Total Orders"
          value={orderCount || 0}
          icon={<ShoppingBag className="h-5 w-5" />}
        />
        <StatCard
          label="Low Stock Items"
          value={lowStock || 0}
          icon={<AlertTriangle className="h-5 w-5" />}
          className={(lowStock || 0) > 0 ? 'border-destructive/50' : ''}
        />
        <StatCard label="Brands" value={brandCount || 0} icon={<Users className="h-5 w-5" />} />
      </div>
    </div>
  );
}
