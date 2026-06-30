'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Product } from '@/types';
import { formatPrice, getDiscountPercent, getStockLabel } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { cloudinaryConfig } from '@/config/cloudinary';
import { cardHover, buttonTap } from '@/lib/animations';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const primaryImage =
    product.product_images?.find((img) => img.is_primary) || product.product_images?.[0];
  const discount = getDiscountPercent(product.mrp, product.selling_price);
  const stock = getStockLabel(product.stock_status);

  const stockVariantMap: Record<string, 'default' | 'destructive' | 'outline'> = {
    green: 'default',
    yellow: 'outline',
    red: 'destructive',
    blue: 'outline',
  };

  return (
    <motion.div initial="rest" whileHover="hover" variants={cardHover}>
      <Card className="group overflow-hidden rounded-xl shadow-sm">
        <Link href={`/shop/${product.slug}`}>
          <div className="relative aspect-[4/5] overflow-hidden bg-muted">
            {primaryImage ? (
              <motion.div
                className="h-full w-full"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Image
                  src={cloudinaryConfig.getUrl(primaryImage.public_id, 'card')}
                  alt={primaryImage.alt_text || product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
              </motion.div>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                No Image
              </div>
            )}

            {discount > 0 && (
              <Badge className="absolute left-2 top-2 rounded-full bg-destructive text-destructive-foreground">
                -{discount}%
              </Badge>
            )}

            {product.is_new_arrival && (
              <Badge className="absolute right-2 top-2 rounded-full">New</Badge>
            )}

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100"
            >
              <Badge className="rounded-full" variant={stockVariantMap[stock.color] || 'outline'}>
                {stock.label}
              </Badge>
            </motion.div>
          </div>
        </Link>

        <CardContent className="p-4">
          <p className="text-xs text-muted-foreground">{product.brands?.name}</p>
          <h3 className="mt-1 text-sm font-medium leading-tight">
            <Link href={`/shop/${product.slug}`} className="hover:underline">
              {product.name}
            </Link>
          </h3>

          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-mono text-lg font-bold">
              {formatPrice(product.selling_price)}
            </span>
            {discount > 0 && (
              <span className="font-mono text-sm text-muted-foreground line-through">
                {formatPrice(product.mrp)}
              </span>
            )}
          </div>

          <motion.div whileTap={buttonTap}>
            <Link
              href={`/shop/${product.slug}`}
              className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }), 'mt-3 w-full')}
            >
              View Details
            </Link>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden rounded-xl">
      <Skeleton className="aspect-[4/5]" />
      <CardContent className="space-y-2 p-4">
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-9 w-full" />
      </CardContent>
    </Card>
  );
}
