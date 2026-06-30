import { EmptyState } from '@/components/shared/empty-state';
import { Percent } from 'lucide-react';

export default function AdminOffersPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Offers</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Create and manage discount offers and promotions.
      </p>
      <EmptyState
        icon={<Percent className="h-12 w-12" />}
        title="Offer Management"
        description="Set up seasonal sales, bundle deals, and special promotions."
      />
    </div>
  );
}
