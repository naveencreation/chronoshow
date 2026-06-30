import { EmptyState } from '@/components/shared/empty-state';
import { Image } from 'lucide-react';

export default function AdminBannersPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Banners</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Manage your homepage banners and promotions.
      </p>
      <EmptyState
        icon={<Image className="h-12 w-12" />}
        title="Banner Management"
        description="Create and manage promotional banners for your storefront."
      />
    </div>
  );
}
