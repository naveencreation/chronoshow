'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
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
    window.dispatchEvent(new Event('cart-updated'));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) {
      removeItem(productId);
      return;
    }
    const updated = items.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    setItems(updated);
    localStorage.setItem('chronoshow_cart', JSON.stringify(updated));
    window.dispatchEvent(new Event('cart-updated'));
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
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
    <div className="mx-auto max-w-7xl px-4 py-8">
      <BreadcrumbNav items={[{ label: 'Home', href: '/' }, { label: 'Cart' }]} />
      <h1 className="mt-6 font-serif text-3xl font-bold">Shopping Cart</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="flex gap-4 rounded-xl border bg-card p-4 shadow-sm"
            >
              <div className="h-24 w-24 flex-shrink-0 rounded-lg bg-muted" />
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <h3 className="font-semibold">{item.product.name}</h3>
                  <p className="font-mono text-sm font-bold text-muted-foreground">
                    {formatPrice(item.product.selling_price)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8 rounded-md"
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8 rounded-md"
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-auto text-destructive"
                    onClick={() => removeItem(item.product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-mono font-semibold">
                  {formatPrice(item.product.selling_price * item.quantity)}
                </p>
              </div>
            </div>
          ))}
          <div className="pt-4">
            <Link href="/shop" className={cn(buttonVariants({ variant: 'ghost' }), 'gap-1')}>
              ← Continue Shopping
            </Link>
          </div>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border bg-muted p-6 shadow-md">
            <h3 className="text-lg font-semibold">Order Summary</h3>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-mono">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between border-t pt-3 font-semibold">
                <span>Total</span>
                <span className="font-mono text-lg">{formatPrice(total)}</span>
              </div>
              <p className="text-xs text-muted-foreground">Inclusive of all taxes</p>
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
              className={cn(
                buttonVariants({ size: 'lg' }),
                'mt-6 w-full bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90'
              )}
            >
              Order via WhatsApp
            </a>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              Questions? Chat with us on WhatsApp
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
