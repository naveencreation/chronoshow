import { Suspense } from 'react';
import { getProducts } from '@/lib/data/products';
import { getCategories } from '@/lib/data/categories';
import { ProductCard, ProductCardSkeleton } from '@/components/shop/product-card';
import { BreadcrumbNav } from '@/components/shared/breadcrumb-nav';
import { EmptyState } from '@/components/shared/empty-state';
import { paginationConfig } from '@/config/pagination';
import { PaginationControls } from '@/components/shared/pagination-controls';

interface ShopPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const sortBy = typeof params.sort === 'string' ? params.sort : undefined;
  const category = typeof params.category === 'string' ? params.category : undefined;
  const brand = typeof params.brand === 'string' ? params.brand : undefined;
  const minPrice = typeof params.min_price === 'string' ? Number(params.min_price) : undefined;
  const maxPrice = typeof params.max_price === 'string' ? Number(params.max_price) : undefined;

  const [{ data: products, total, totalPages }, categories] = await Promise.all([
    getProducts({
      page,
      limit: paginationConfig.productsPerPage,
      sortBy,
      category,
      brand,
      minPrice,
      maxPrice,
    }),
    getCategories(),
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <BreadcrumbNav items={[{ label: 'Home', href: '/' }, { label: 'Shop' }]} />

      <div className="mt-6 mb-8">
        <h1 className="text-3xl font-bold">Shop</h1>
        <p className="mt-2 text-muted-foreground">
          {total > 0 ? `Showing ${products.length} of ${total} products` : 'Browse our collection'}
        </p>
      </div>

      {/* Category quick filters */}
      {categories.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`/shop?category=${cat.slug}`}
              className="rounded-full border px-4 py-1.5 text-sm transition-colors hover:bg-accent"
            >
              {cat.name}
            </a>
          ))}
        </div>
      )}

      <Suspense
        fallback={
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        }
      >
        {products.length > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-12">
                <PaginationControls currentPage={page} totalPages={totalPages} />
              </div>
            )}
          </>
        ) : (
          <EmptyState
            title="No products found"
            description="Try adjusting your filters or check back later."
          />
        )}
      </Suspense>
    </div>
  );
}
