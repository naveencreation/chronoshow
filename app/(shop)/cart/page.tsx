'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ShoppingBag, Trash2 } from 'lucide-react';
import { EmptyState } from '@/components/shared/empty-state';
import { BreadcrumbNav } from '@/components/shared/breadcrumb-nav';
import { Button, buttonVariants } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import { cn } from '@/lib/utils';
import type { Product } from '@/types';

interface CartEntry {
  product: Product;
  quantity: number;
}

export default function CartPage() {
  const [items, setItems] = useState<CartEntry[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('chronoshow_cart');
      if (stored) setItems(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  const total = items.reduce((sum, item) => sum + item.product.selling_price * item.quantity, 0);

  const removeItem = (productId: number) => {
    const updated = items.filter((item) => item.product.id !== productId);
    setItems(updated);
    localStorage.setItem('chronoshow_cart', JSON.stringify(updated));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) return;
    const updated = items.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    setItems(updated);
    localStorage.setItem('chronoshow_cart', JSON.stringify(updated));
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <BreadcrumbNav items={[{ label: 'Home', href: '/' }, { label: 'Cart' }]} />
        <div className="mt-8">
          <EmptyState
            icon={<ShoppingBag className="h-16 w-16" />}
            title="Your cart is empty"
            description="Browse our collection and add some watches."
          >
            <Link href="/shop" className={buttonVariants()}>
              Browse Products
            </Link>
          </EmptyState>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <BreadcrumbNav items={[{ label: 'Home', href: '/' }, { label: 'Cart' }]} />
      <h1 className="mt-6 text-3xl font-bold">Your Cart</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {items.map((item) => (
            <div key={item.product.id} className="flex gap-4 rounded-lg border p-4">
              <div className="h-24 w-24 flex-shrink-0 rounded-md bg-muted" />
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <h3 className="font-semibold">{item.product.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {formatPrice(item.product.selling_price)}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-7 w-7"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-7 w-7"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive"
                    onClick={() => removeItem(item.product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">
                  {formatPrice(item.product.selling_price * item.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-lg border p-6">
          <h3 className="text-lg font-semibold">Order Summary</h3>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between border-t pt-2 font-semibold">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
          <a
            href={`https://wa.me/${(process.env.NEXT_PUBLIC_STORE_WHATSAPP || '').replace(/\D/g, '')}?text=${encodeURIComponent(
              `Hello, I would like to order:\n${items
                .map(
                  (item, i) =>
                    `${i + 1}. ${item.product.name} - Qty: ${item.quantity} - ${formatPrice(item.product.selling_price * item.quantity)}`
                )
                .join('\n')}\n\nTotal: ${formatPrice(total)}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants(), 'mt-6 w-full bg-green-600 hover:bg-green-700')}
          >
            Order via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
