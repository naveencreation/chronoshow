import { createClient } from '@/lib/supabase/server';
import type { Product } from '@/types';

export async function getAdminProducts(params: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<{ data: Product[]; total: number; page: number; limit: number }> {
  const supabase = await createClient();

  const page = params.page || 1;
  const limit = params.limit || 20;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from('products')
    .select('*, brands(name), categories(name)', { count: 'exact' })
    .order('created_at', { ascending: false });

  if (params.search) {
    query = query.or(
      `name.ilike.%${params.search}%,sku.ilike.%${params.search}%,model_number.ilike.%${params.search}%`
    );
  }

  const { data, error, count } = await query.range(from, to);

  if (error) throw new Error(error.message);

  return {
    data: (data || []) as Product[],
    total: count || 0,
    page,
    limit,
  };
}

export async function getAdminProductById(id: number): Promise<Product | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('products')
    .select('*, brands(*), categories(*), product_images(*)')
    .eq('id', id)
    .single();

  if (error) return null;
  return data as Product;
}
