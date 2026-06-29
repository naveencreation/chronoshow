import { getBrands } from '@/lib/data/brands';
import { BreadcrumbNav } from '@/components/shared/breadcrumb-nav';
import Link from 'next/link';

export default async function BrandsPage() {
  const brands = await getBrands();

  return (
    <div className="container mx-auto px-4 py-8">
      <BreadcrumbNav items={[{ label: 'Home', href: '/' }, { label: 'Brands' }]} />
      <h1 className="mt-6 text-3xl font-bold">All Brands</h1>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {brands.map((brand) => (
          <Link
            key={brand.id}
            href={`/brands/${brand.slug}`}
            className="rounded-lg border bg-card p-6 transition-shadow hover:shadow-md"
          >
            <h2 className="text-lg font-semibold">{brand.name}</h2>
            {brand.description && (
              <p className="mt-2 text-sm text-muted-foreground">{brand.description}</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
