import { formatPrice, getDiscountPercent } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface PriceDisplayProps {
  sellingPrice: number;
  mrp: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function PriceDisplay({ sellingPrice, mrp, size = 'md', className }: PriceDisplayProps) {
  const discount = getDiscountPercent(mrp, sellingPrice);
  const sizes = { sm: 'text-sm', md: 'text-lg', lg: 'text-2xl' };

  return (
    <div className={cn('flex items-baseline gap-2', className)}>
      <span className={cn('font-mono font-bold', sizes[size])}>{formatPrice(sellingPrice)}</span>
      {discount > 0 && (
        <>
          <span
            className={cn(
              'font-mono text-muted-foreground line-through',
              size === 'lg' ? 'text-base' : 'text-sm'
            )}
          >
            {formatPrice(mrp)}
          </span>
          <span className="text-sm font-medium text-destructive">-{discount}%</span>
        </>
      )}
    </div>
  );
}
