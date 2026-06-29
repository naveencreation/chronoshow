import { notFound } from 'next/navigation';
import { getAdminProductById } from '@/lib/data/admin-products';
import ProductForm from '@/components/admin/product-form';

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const product = await getAdminProductById(Number(id));

  if (!product) notFound();

  return (
    <ProductForm
      initialData={{
        id: product.id,
        name: product.name,
        slug: product.slug,
        brand_id: product.brand_id,
        category_id: product.category_id,
        model_number: product.model_number || '',
        sku: product.sku || '',
        mrp: product.mrp,
        selling_price: product.selling_price,
        description: product.description || '',
        features: product.features || [],
        specifications: product.specifications || {},
        stock_quantity: product.stock_quantity,
        low_stock_threshold: product.low_stock_threshold,
        is_featured: product.is_featured,
        is_new_arrival: product.is_new_arrival,
        is_trending: product.is_trending,
        is_active: product.is_active,
        tags: product.tags || [],
      }}
    />
  );
}
