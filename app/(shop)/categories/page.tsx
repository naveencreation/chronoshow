import { getCategories } from '@/lib/data/categories';
import { BreadcrumbNav } from '@/components/shared/breadcrumb-nav';
import Link from 'next/link';

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="container mx-auto px-4 py-8">
      <BreadcrumbNav items={[{ label: 'Home', href: '/' }, { label: 'Categories' }]} />
      <h1 className="mt-6 text-3xl font-bold">All Categories</h1>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/categories/${cat.slug}`}
            className="rounded-lg border bg-card p-6 transition-shadow hover:shadow-md"
          >
            <h2 className="text-lg font-semibold">{cat.name}</h2>
            {cat.description && (
              <p className="mt-2 text-sm text-muted-foreground">{cat.description}</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
