import { createClient } from '@/lib/supabase/server';
import type { Order } from '@/types';

export async function getAdminOrders(params: {
  page?: number;
  limit?: number;
  status?: string;
}): Promise<{ data: Order[]; total: number }> {
  const supabase = await createClient();

  const page = params.page || 1;
  const limit = params.limit || 20;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from('orders')
    .select('*, order_items(*)', { count: 'exact' })
    .order('created_at', { ascending: false });

  if (params.status && params.status !== 'all') {
    query = query.eq('status', params.status);
  }

  const { data, error, count } = await query.range(from, to);

  if (error) throw new Error(error.message);

  return {
    data: (data || []) as Order[],
    total: count || 0,
  };
}

export async function updateOrderStatus(orderId: number, status: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('orders')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', orderId);

  if (error) throw new Error(error.message);
}
