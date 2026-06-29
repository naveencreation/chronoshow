import { getBrands } from '@/lib/data/brands';
import { getProducts } from '@/lib/data/products';
import { ProductCard } from '@/components/shop/product-card';
import { BreadcrumbNav } from '@/components/shared/breadcrumb-nav';
import { notFound } from 'next/navigation';

interface BrandPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { slug } = await params;
  const brands = await getBrands();
  const brand = brands.find((b) => b.slug === slug);

  if (!brand) notFound();

  const { data: products, total } = await getProducts({ brand: slug, limit: 24 });

  return (
    <div className="container mx-auto px-4 py-8">
      <BreadcrumbNav
        items={[
          { label: 'Home', href: '/' },
          { label: 'Brands', href: '/brands' },
          { label: brand.name },
        ]}
      />
      <h1 className="mt-6 text-3xl font-bold">{brand.name}</h1>
      {brand.description && <p className="mt-2 text-muted-foreground">{brand.description}</p>}

      <div className="mt-8">
        {products.length > 0 ? (
          <>
            <p className="mb-4 text-sm text-muted-foreground">{total} products</p>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <p className="text-muted-foreground">No products from this brand yet.</p>
        )}
      </div>
    </div>
  );
}
