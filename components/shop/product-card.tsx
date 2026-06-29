'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { formatPrice, getDiscountPercent, getStockLabel } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { cloudinaryConfig } from '@/config/cloudinary';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const primaryImage =
    product.product_images?.find((img) => img.is_primary) || product.product_images?.[0];
  const discount = getDiscountPercent(product.mrp, product.selling_price);
  const stock = getStockLabel(product.stock_status);

  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-md">
      <Link href={`/shop/${product.slug}`}>
        <div className="relative aspect-[4/5] overflow-hidden bg-muted">
          {primaryImage ? (
            <Image
              src={cloudinaryConfig.getUrl(primaryImage.public_id, 'card')}
              alt={primaryImage.alt_text || product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              No Image
            </div>
          )}

          {discount > 0 && (
            <Badge className="absolute left-2 top-2 bg-destructive text-destructive-foreground">
              -{discount}%
            </Badge>
          )}

          {product.is_new_arrival && (
            <Badge className="absolute right-2 top-2" variant="secondary">
              New
            </Badge>
          )}

          <Badge
            className="absolute bottom-2 left-2"
            variant={stock.color === 'green' ? 'default' : 'outline'}
          >
            {stock.label}
          </Badge>
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
          <span className="text-lg font-bold">{formatPrice(product.selling_price)}</span>
          {discount > 0 && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.mrp)}
            </span>
          )}
        </div>

        <Link
          href={`/shop/${product.slug}`}
          className={cn(buttonVariants({ size: 'sm' }), 'mt-3 w-full')}
        >
          View Details
        </Link>
      </CardContent>
    </Card>
  );
}

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden">
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
