import { getProducts } from '@/lib/data/products';
import { getCategoryBySlug } from '@/lib/data/categories';
import { ProductCard } from '@/components/shop/product-card';
import { BreadcrumbNav } from '@/components/shared/breadcrumb-nav';
import { EmptyState } from '@/components/shared/empty-state';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const [category, { data: products, total }] = await Promise.all([
    getCategoryBySlug(slug),
    getProducts({ category: slug, limit: 24 }),
  ]);

  if (!category) notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      <BreadcrumbNav
        items={[
          { label: 'Home', href: '/' },
          { label: 'Categories', href: '/categories' },
          { label: category.name },
        ]}
      />
      <h1 className="mt-6 text-3xl font-bold">{category.name}</h1>
      {category.description && <p className="mt-2 text-muted-foreground">{category.description}</p>}

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
          <EmptyState
            title="No products in this category"
            description="Check back soon for new arrivals."
          />
        )}
      </div>
    </div>
  );
}
