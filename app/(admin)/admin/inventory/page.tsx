import { createClient } from '@/lib/supabase/server';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatPrice } from '@/lib/utils';

export default async function AdminInventoryPage() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from('products')
    .select('id, name, slug, sku, stock_quantity, stock_status, low_stock_threshold, selling_price')
    .order('stock_quantity', { ascending: true });

  return (
    <div>
      <h1 className="text-2xl font-bold">Inventory</h1>
      <p className="mt-1 text-sm text-muted-foreground">{(products || []).length} products</p>

      <div className="mt-6 rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Threshold</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(products || []).map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell className="text-sm">{product.sku || '—'}</TableCell>
                <TableCell>{formatPrice(product.selling_price)}</TableCell>
                <TableCell>{product.stock_quantity}</TableCell>
                <TableCell>{product.low_stock_threshold}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      product.stock_status === 'out_of_stock'
                        ? 'destructive'
                        : product.stock_status === 'low_stock'
                          ? 'outline'
                          : 'default'
                    }
                  >
                    {product.stock_status.replace(/_/g, ' ')}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
