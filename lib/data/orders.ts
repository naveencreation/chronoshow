import { createClient } from '@/lib/supabase/server';
import type { Order } from '@/types';
import type { OrderInput } from '@/lib/schemas';
import { generateOrderNumber } from '@/lib/utils';

export async function createOrder(input: OrderInput): Promise<Order> {
  const supabase = await createClient();

  const orderNumber = generateOrderNumber();

  const productIds = input.items.map((item) => item.product_id);

  const { data: products, error: productsError } = await supabase
    .from('products')
    .select('id, name, selling_price')
    .in('id', productIds);

  if (productsError) throw new Error(productsError.message);

  const productMap = new Map(
    (products || []).map((p) => [p.id, { name: p.name, price: p.selling_price }])
  );

  const totalAmount = input.items.reduce((sum, item) => {
    const product = productMap.get(item.product_id);
    if (!product) throw new Error(`Product ${item.product_id} not found`);
    return sum + product.price * item.quantity;
  }, 0);

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      order_number: orderNumber,
      customer_name: input.customer_name,
      customer_phone: input.customer_phone,
      customer_email: input.customer_email || null,
      customer_address: input.customer_address || null,
      status: 'new',
      total_amount: totalAmount,
      delivery_type: input.delivery_type,
      notes: input.notes || null,
    })
    .select()
    .single();

  if (orderError) throw new Error(orderError.message);

  const orderItems = input.items.map((item) => {
    const product = productMap.get(item.product_id);
    if (!product) throw new Error(`Product ${item.product_id} not found`);
    return {
      order_id: order.id,
      product_id: item.product_id,
      product_name: product.name,
      quantity: item.quantity,
      unit_price: product.price,
      total_price: product.price * item.quantity,
    };
  });

  const { error: itemsError } = await supabase.from('order_items').insert(orderItems);

  if (itemsError) throw new Error(itemsError.message);

  return order as Order;
}
