import Link from 'next/link';
import { getProducts } from '@/lib/data/products';
import { getCategories } from '@/lib/data/categories';
import { getBrands } from '@/lib/data/brands';
import { ProductCard } from '@/components/shop/product-card';
import { HomeHero } from '@/components/shop/home-hero';
import { AnimatedSection } from '@/components/shared/animated-section';
import { ArrowRight } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';

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

  const isEmpty = categories.length === 0 && featuredProducts.data.length === 0;

  return (
    <div>
      <HomeHero isEmpty={isEmpty} />

      {categories.length > 0 && (
        <AnimatedSection>
          <section className="section-padding bg-background">
            <div className="mx-auto max-w-7xl px-4">
              <SectionHeader label="Collection" title="Shop by Category" href="/categories" />
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/categories/${cat.slug}`}
                    className="group flex flex-col items-center rounded-xl border bg-card p-8 text-center shadow-sm transition-shadow hover:shadow-md"
                  >
                    <h3 className="font-semibold group-hover:text-gold transition-colors">
                      {cat.name}
                    </h3>
                    {cat.description && (
                      <p className="mt-1 text-xs text-muted-foreground">{cat.description}</p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>
      )}

      {featuredProducts.data.length > 0 && (
        <AnimatedSection>
          <section className="section-padding bg-muted">
            <div className="mx-auto max-w-7xl px-4">
              <SectionHeader label="Curated" title="Featured Products" href="/shop" />
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
                {featuredProducts.data.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>
      )}

      {newArrivals.data.length > 0 && (
        <AnimatedSection>
          <section className="section-padding bg-background">
            <div className="mx-auto max-w-7xl px-4">
              <SectionHeader label="Just Landed" title="New Arrivals" href="/new-arrivals" />
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
                {newArrivals.data.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>
      )}

      {brands.length > 0 && (
        <AnimatedSection>
          <section className="section-padding bg-muted">
            <div className="mx-auto max-w-7xl px-4 text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                Trusted Brands
              </p>
              <h2 className="mt-1 font-serif text-3xl font-bold md:text-4xl">Our Brands</h2>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
                {brands.map((brand) => (
                  <Link
                    key={brand.id}
                    href={`/brands/${brand.slug}`}
                    className="rounded-xl border bg-card px-8 py-6 text-center font-semibold shadow-sm transition-shadow hover:shadow-md"
                  >
                    {brand.logo_url ? (
                      <img src={brand.logo_url} alt={brand.name} className="mx-auto h-12 w-auto" />
                    ) : (
                      brand.name
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>
      )}

      <AnimatedSection>
        <section className="section-padding bg-slate-900 text-white">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gold">Visit Us</p>
                <h2 className="mt-1 font-serif text-3xl font-bold md:text-4xl">Our Store</h2>
                <p className="mt-4 leading-relaxed text-slate-300">
                  Visit our store to experience our collection in person. Our knowledgeable staff is
                  ready to help you find the perfect timepiece.
                </p>
                <ul className="mt-6 space-y-3 text-slate-300">
                  {siteConfig.contact.address && (
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-gold">📍</span>
                      {siteConfig.contact.address}
                    </li>
                  )}
                  {siteConfig.contact.phone && (
                    <li className="flex items-center gap-2">
                      <span className="text-gold">📞</span>
                      {siteConfig.contact.phone}
                    </li>
                  )}
                  {siteConfig.contact.businessHours && (
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-gold">🕐</span>
                      {siteConfig.contact.businessHours}
                    </li>
                  )}
                </ul>
              </div>
              <div className="flex items-center justify-center rounded-2xl bg-slate-800 p-8">
                <p className="text-center text-sm text-slate-400">
                  Google Maps will be embedded here once you configure your store address.
                </p>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {isEmpty && (
        <section className="section-padding bg-background text-center">
          <div className="mx-auto max-w-md px-4">
            <h2 className="font-serif text-2xl font-bold text-muted-foreground">Coming Soon</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Our catalog is being prepared. Check back soon for our latest collection.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}

function SectionHeader({ label, title, href }: { label: string; title: string; href: string }) {
  return (
    <div className="mb-8 flex items-end justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-gold">{label}</p>
        <h2 className="mt-1 font-serif text-3xl font-bold md:text-4xl">{title}</h2>
      </div>
      <Link href={href} className={cn(buttonVariants({ variant: 'ghost' }), 'gap-1')}>
        View All <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
