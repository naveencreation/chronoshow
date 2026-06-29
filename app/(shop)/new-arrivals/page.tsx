import { getProducts } from '@/lib/data/products';
import { ProductCard } from '@/components/shop/product-card';
import { BreadcrumbNav } from '@/components/shared/breadcrumb-nav';
import { EmptyState } from '@/components/shared/empty-state';

export default async function NewArrivalsPage() {
  const { data: products, total } = await getProducts({ isNew: true, limit: 24 });

  return (
    <div className="container mx-auto px-4 py-8">
      <BreadcrumbNav items={[{ label: 'Home', href: '/' }, { label: 'New Arrivals' }]} />
      <h1 className="mt-6 text-3xl font-bold">New Arrivals</h1>
      <p className="mt-2 text-muted-foreground">{total} new products</p>

      <div className="mt-8">
        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No new arrivals yet"
            description="Check back soon for fresh collections."
          />
        )}
      </div>
    </div>
  );
}
