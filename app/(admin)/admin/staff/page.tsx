import { EmptyState } from '@/components/shared/empty-state';
import { Users } from 'lucide-react';

export default function AdminStaffPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Staff</h1>
      <p className="mt-1 text-sm text-muted-foreground">Manage staff accounts and permissions.</p>
      <EmptyState
        icon={<Users className="h-12 w-12" />}
        title="Staff Management"
        description="Add, remove, and manage staff accounts with role-based access coming soon."
      />
    </div>
  );
}
