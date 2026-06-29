import Link from 'next/link';
import { getProducts } from '@/lib/data/products';
import { getCategories } from '@/lib/data/categories';
import { getBrands } from '@/lib/data/brands';
import { ProductCard } from '@/components/shop/product-card';
import { ArrowRight } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default async function HomePage() {
  let featuredProducts: Awaited<ReturnType<typeof getProducts>> = {
    data: [],
    total: 0,
    page: 1,
    limit: 4,
    totalPages: 0,
  };
  let newArrivals: Awaited<ReturnType<typeof getProducts>> = {
    data: [],
    total: 0,
    page: 1,
    limit: 4,
    totalPages: 0,
  };
  let categories: Awaited<ReturnType<typeof getCategories>> = [];
  let brands: Awaited<ReturnType<typeof getBrands>> = [];

  try {
    [featuredProducts, newArrivals, categories, brands] = await Promise.all([
      getProducts({ isFeatured: true, limit: 4 }),
      getProducts({ isNew: true, limit: 4 }),
      getCategories(),
      getBrands(),
    ]);
  } catch {
    // Database not seeded — show empty gracefully
  }

  return (
    <div>
      <section className="bg-gradient-to-br from-primary/10 via-background to-primary/5 py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{siteConfig.name}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {siteConfig.tagline}
          </p>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            {siteConfig.description}
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/shop" className={buttonVariants({ size: 'lg' })}>
              Shop Now
            </Link>
            <Link href="/categories" className={buttonVariants({ variant: 'outline', size: 'lg' })}>
              Browse Categories
            </Link>
          </div>
        </div>
      </section>

      {categories.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Shop by Category</h2>
            <Link href="/categories" className={cn(buttonVariants({ variant: 'ghost' }), 'gap-1')}>
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="flex flex-col items-center rounded-lg border bg-card p-6 text-center transition-shadow hover:shadow-md"
              >
                <h3 className="font-semibold">{cat.name}</h3>
                {cat.description && (
                  <p className="mt-1 text-xs text-muted-foreground">{cat.description}</p>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      {featuredProducts.data.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <Link href="/shop" className={cn(buttonVariants({ variant: 'ghost' }), 'gap-1')}>
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {featuredProducts.data.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {newArrivals.data.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold">New Arrivals</h2>
            <Link
              href="/new-arrivals"
              className={cn(buttonVariants({ variant: 'ghost' }), 'gap-1')}
            >
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {newArrivals.data.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {brands.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <h2 className="mb-8 text-2xl font-bold">Our Brands</h2>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {brands.map((brand) => (
              <Link
                key={brand.id}
                href={`/brands/${brand.slug}`}
                className="rounded-lg border bg-card px-6 py-4 text-center font-semibold transition-shadow hover:shadow-md"
              >
                {brand.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      {categories.length === 0 && featuredProducts.data.length === 0 && (
        <section className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-xl font-semibold text-muted-foreground">Coming Soon</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Our catalog is being prepared. Check back soon for our latest collection.
          </p>
        </section>
      )}
    </div>
  );
}
