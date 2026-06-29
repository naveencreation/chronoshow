'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema, type ProductInput } from '@/lib/schemas';
import { createClient } from '@/lib/supabase/client';
import { generateSlug } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import type { Category, Brand } from '@/types';

interface ProductFormProps {
  initialData?: Partial<ProductInput> & { id?: number };
}

export default function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter();
  const supabase = createClient();
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [saving, setSaving] = useState(false);

  const form = useForm<ProductInput>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(productSchema) as any,
    defaultValues: {
      name: initialData?.name || '',
      slug: initialData?.slug || '',
      brand_id: initialData?.brand_id || 0,
      category_id: initialData?.category_id || 0,
      mrp: initialData?.mrp || 0,
      selling_price: initialData?.selling_price || 0,
      stock_quantity: initialData?.stock_quantity || 0,
      features: initialData?.features || [],
      specifications: initialData?.specifications || {},
      is_active: initialData?.is_active ?? true,
      is_featured: initialData?.is_featured ?? false,
      is_new_arrival: initialData?.is_new_arrival ?? false,
      is_trending: initialData?.is_trending ?? false,
      tags: initialData?.tags || [],
    },
  });

  const name = form.watch('name');

  useEffect(() => {
    if (name && !initialData?.id) {
      form.setValue('slug', generateSlug(name));
    }
  }, [name, form, initialData]);

  useEffect(() => {
    const fetchOptions = async () => {
      const [{ data: cats }, { data: brs }] = await Promise.all([
        supabase.from('categories').select('id, name, slug').eq('is_active', true),
        supabase.from('brands').select('id, name, slug').eq('is_active', true),
      ]);
      if (cats) setCategories(cats as Category[]);
      if (brs) setBrands(brs as Brand[]);
    };
    fetchOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = form.handleSubmit(async (data) => {
    setSaving(true);
    try {
      if (initialData?.id) {
        await supabase.from('products').update(data).eq('id', initialData.id);
      } else {
        await supabase.from('products').insert(data);
      }
      router.push('/admin/products');
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  });

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin/products" className={buttonVariants({ variant: 'ghost', size: 'icon' })}>
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-2xl font-bold">{initialData?.id ? 'Edit Product' : 'New Product'}</h1>
      </div>

      <form onSubmit={onSubmit} className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" {...form.register('name')} className="mt-1" />
                {form.formState.errors.name && (
                  <p className="mt-1 text-xs text-destructive">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" {...form.register('slug')} className="mt-1" />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Brand</Label>
                  <Select
                    value={String(form.watch('brand_id') || '')}
                    onValueChange={(v) => form.setValue('brand_id', Number(v))}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map((b) => (
                        <SelectItem key={b.id} value={String(b.id)}>
                          {b.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Category</Label>
                  <Select
                    value={String(form.watch('category_id') || '')}
                    onValueChange={(v) => form.setValue('category_id', Number(v))}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => (
                        <SelectItem key={c.id} value={String(c.id)}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  {...form.register('description')}
                  className="mt-1"
                  rows={4}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <Label htmlFor="mrp">MRP (₹)</Label>
                  <Input
                    id="mrp"
                    type="number"
                    {...form.register('mrp', { valueAsNumber: true })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="selling_price">Selling Price (₹)</Label>
                  <Input
                    id="selling_price"
                    type="number"
                    {...form.register('selling_price', { valueAsNumber: true })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="stock_quantity">Stock Qty</Label>
                  <Input
                    id="stock_quantity"
                    type="number"
                    {...form.register('stock_quantity', { valueAsNumber: true })}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="sku">SKU</Label>
                  <Input id="sku" {...form.register('sku')} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="model_number">Model Number</Label>
                  <Input id="model_number" {...form.register('model_number')} className="mt-1" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="is_active">Active</Label>
                <Switch
                  id="is_active"
                  checked={form.watch('is_active')}
                  onCheckedChange={(v) => form.setValue('is_active', v)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="is_featured">Featured</Label>
                <Switch
                  id="is_featured"
                  checked={form.watch('is_featured')}
                  onCheckedChange={(v) => form.setValue('is_featured', v)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="is_new_arrival">New Arrival</Label>
                <Switch
                  id="is_new_arrival"
                  checked={form.watch('is_new_arrival')}
                  onCheckedChange={(v) => form.setValue('is_new_arrival', v)}
                />
              </div>
            </CardContent>
          </Card>

          <Button type="submit" className="w-full" disabled={saving}>
            <Save className="mr-2 h-4 w-4" />
            {saving ? 'Saving...' : initialData?.id ? 'Update Product' : 'Create Product'}
          </Button>
        </div>
      </form>
    </div>
  );
}
