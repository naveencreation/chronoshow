import { EmptyState } from '@/components/shared/empty-state';
import { Star } from 'lucide-react';

export default function AdminReviewsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Reviews</h1>
      <p className="mt-1 text-sm text-muted-foreground">Moderate and manage customer reviews.</p>
      <EmptyState
        icon={<Star className="h-12 w-12" />}
        title="Review Management"
        description="Approve, respond to, and manage customer reviews coming soon."
      />
    </div>
  );
}
