import { BreadcrumbNav } from '@/components/shared/breadcrumb-nav';

export default function OffersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <BreadcrumbNav items={[{ label: 'Home', href: '/' }, { label: 'Offers' }]} />
      <h1 className="mt-6 text-3xl font-bold">Special Offers</h1>
      <p className="mt-2 text-muted-foreground">Check back for exciting deals and discounts.</p>
    </div>
  );
}
