import { Product } from '@/types';
import { PriceDisplay } from '@/components/shop/price-display';
import { StockBadge } from '@/components/shop/stock-badge';
import { WhatsAppButton } from '@/components/shop/whatsapp-button';
import { Badge } from '@/components/ui/badge';

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div>
      {product.brands && (
        <p className="text-sm font-medium text-muted-foreground">{product.brands.name}</p>
      )}
      <h1 className="mt-1 text-3xl font-bold">{product.name}</h1>
      {product.model_number && (
        <p className="mt-1 text-sm text-muted-foreground">Model: {product.model_number}</p>
      )}

      <div className="mt-6">
        <PriceDisplay sellingPrice={product.selling_price} mrp={product.mrp} size="lg" />
      </div>

      <div className="mt-4 flex items-center gap-3">
        <StockBadge status={product.stock_status} />
        {product.is_new_arrival && <Badge variant="secondary">New Arrival</Badge>}
        {product.is_featured && <Badge variant="secondary">Featured</Badge>}
      </div>

      {product.description && (
        <p className="mt-6 leading-relaxed text-muted-foreground">{product.description}</p>
      )}

      <div className="mt-8 space-y-4">
        <WhatsAppButton
          product={{
            name: product.name,
            model_number: product.model_number,
            sku: product.sku,
            selling_price: product.selling_price,
          }}
          variant="lg"
        />
        <p className="text-center text-xs text-muted-foreground">
          You will be redirected to WhatsApp to complete your order
        </p>
      </div>
    </div>
  );
}
