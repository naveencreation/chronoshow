import { EmptyState } from '@/components/shared/empty-state';
import { BarChart3 } from 'lucide-react';

export default function AdminReportsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Reports</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        View sales reports, analytics, and business insights.
      </p>
      <EmptyState
        icon={<BarChart3 className="h-12 w-12" />}
        title="Reports & Analytics"
        description="Revenue charts, order trends, and inventory reports coming soon."
      />
    </div>
  );
}
