'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { formatPrice, getStockLabel } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DataTableToolbar } from '@/components/admin/data-table-toolbar';
import { createClient } from '@/lib/supabase/client';
import type { Product } from '@/types';
import { Plus, Pencil, Eye } from 'lucide-react';
import { debounce } from '@/lib/utils';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      let query = supabase
        .from('products')
        .select('*, brands(name, slug), categories(name, slug)')
        .order('created_at', { ascending: false })
        .limit(50);

      if (search.trim()) {
        query = query.or(
          `name.ilike.%${search}%,sku.ilike.%${search}%,model_number.ilike.%${search}%`
        );
      }

      const { data, error } = await query;
      if (!error) setProducts((data || []) as Product[]);
      setLoading(false);
    };

    const debouncedFetch = debounce(fetchProducts, 300);
    debouncedFetch();
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="mt-1 text-sm text-muted-foreground">{products.length} products</p>
        </div>
        <Link href="/admin/products/new" className={buttonVariants({ size: 'default' })}>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Link>
      </div>

      <div className="mt-6">
        <DataTableToolbar
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search by name, SKU, or model..."
        />
      </div>

      <div className="mt-4 overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="py-8 text-center text-muted-foreground">
                  Loading...
                </TableCell>
              </TableRow>
            ) : products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="py-8 text-center text-muted-foreground">
                  No products found.
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => {
                const stock = getStockLabel(product.stock_status);
                const brandName = product.brands?.name;
                const catName = product.categories?.name;
                return (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell className="text-sm">{product.sku || '—'}</TableCell>
                    <TableCell className="text-sm">{brandName || '—'}</TableCell>
                    <TableCell className="text-sm">{catName || '—'}</TableCell>
                    <TableCell>{formatPrice(product.selling_price)}</TableCell>
                    <TableCell>{product.stock_quantity}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          product.is_active
                            ? stock.color === 'red'
                              ? 'destructive'
                              : 'default'
                            : 'outline'
                        }
                      >
                        {product.is_active ? stock.label : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Link href={`/shop/${product.slug}`} target="_blank">
                          <Button size="icon" variant="ghost" className="h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href={`/admin/products/${product.id}/edit`}>
                          <Button size="icon" variant="ghost" className="h-8 w-8">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
