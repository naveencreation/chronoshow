import { createClient } from '@/lib/supabase/server';
import type { Product, PaginatedResult } from '@/types';

export async function getProducts(params: {
  page?: number;
  limit?: number;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: string;
  isFeatured?: boolean;
  isNew?: boolean;
}): Promise<PaginatedResult<Product>> {
  const supabase = await createClient();

  const page = params.page || 1;
  const limit = params.limit || 24;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from('products')
    .select('*, brands(name, slug), categories(name, slug), product_images(*)', {
      count: 'exact',
    })
    .eq('is_active', true);

  if (params.search) {
    query = query.textSearch('search_vector', params.search, {
      type: 'websearch',
    });
  }

  if (params.category) {
    query = query.eq('categories.slug', params.category);
  }

  if (params.brand) {
    query = query.eq('brands.slug', params.brand);
  }

  if (params.minPrice !== undefined) {
    query = query.gte('selling_price', params.minPrice);
  }

  if (params.maxPrice !== undefined) {
    query = query.lte('selling_price', params.maxPrice);
  }

  if (params.isFeatured) {
    query = query.eq('is_featured', true);
  }

  if (params.isNew) {
    query = query.eq('is_new_arrival', true);
  }

  const sortMap: Record<string, { column: string; ascending: boolean }> = {
    newest: { column: 'created_at', ascending: false },
    price_asc: { column: 'selling_price', ascending: true },
    price_desc: { column: 'selling_price', ascending: false },
    name_asc: { column: 'name', ascending: true },
    name_desc: { column: 'name', ascending: false },
  };

  const sort = sortMap[params.sortBy || 'newest'];
  query = query.order(sort.column, { ascending: sort.ascending });

  const { data, error, count } = await query.range(from, to);

  if (error) throw new Error(error.message);

  return {
    data: (data || []) as Product[],
    total: count || 0,
    page,
    limit,
    totalPages: Math.ceil((count || 0) / limit),
  };
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('products')
    .select('*, brands(*), categories(*), product_images(*)')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error) return null;
  return data as Product;
}

export async function getRelatedProducts(productId: number, limit: number = 4): Promise<Product[]> {
  const supabase = await createClient();

  const { data: product } = await supabase
    .from('products')
    .select('brand_id, category_id')
    .eq('id', productId)
    .single();

  if (!product) return [];

  const { data, error } = await supabase
    .from('products')
    .select('*, brands(name), categories(name), product_images(*)')
    .eq('is_active', true)
    .neq('id', productId)
    .or(`brand_id.eq.${product.brand_id},category_id.eq.${product.category_id}`)
    .limit(limit);

  if (error) return [];
  return (data || []) as Product[];
}
