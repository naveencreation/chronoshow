import { getProducts } from '@/lib/data/products';
import { ProductCard } from '@/components/shop/product-card';
import { BreadcrumbNav } from '@/components/shared/breadcrumb-nav';
import { EmptyState } from '@/components/shared/empty-state';

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;

  if (!q || q.trim().length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <BreadcrumbNav items={[{ label: 'Home', href: '/' }, { label: 'Search' }]} />
        <EmptyState
          title="Enter a search term"
          description="Search for watches by name, model, or brand."
        />
      </div>
    );
  }

  const { data: products, total } = await getProducts({ search: q, limit: 24 });

  return (
    <div className="container mx-auto px-4 py-8">
      <BreadcrumbNav items={[{ label: 'Home', href: '/' }, { label: 'Search' }]} />
      <h1 className="mt-6 text-3xl font-bold">Results for &ldquo;{q}&rdquo;</h1>
      <p className="mt-2 text-sm text-muted-foreground">{total} products found</p>

      <div className="mt-8">
        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No results found"
            description="Try a different search term or browse our categories."
          />
        )}
      </div>
    </div>
  );
}
