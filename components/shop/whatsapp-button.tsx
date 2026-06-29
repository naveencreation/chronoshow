'use client';

import Link from 'next/link';
import { whatsappConfig } from '@/config/whatsapp';
import { MessageCircle } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface WhatsAppButtonProps {
  product: { name: string; model_number?: string; sku?: string; selling_price: number };
  variant?: 'default' | 'outline' | 'lg';
}

export function WhatsAppButton({ product, variant = 'default' }: WhatsAppButtonProps) {
  const message = whatsappConfig.messageTemplates.product(product);
  const link = whatsappConfig.generateLink(message);

  if (variant === 'lg') {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          buttonVariants({ size: 'lg' }),
          'h-14 w-full bg-green-600 text-lg hover:bg-green-700'
        )}
      >
        <MessageCircle className="mr-2 h-5 w-5" />
        Order via WhatsApp
      </a>
    );
  }

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(buttonVariants({ variant }), 'gap-2 bg-green-600 hover:bg-green-700')}
    >
      <MessageCircle className="h-4 w-4" />
      Order via WhatsApp
    </a>
  );
}
