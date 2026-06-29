import { getStockLabel } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const colorMap: Record<string, 'default' | 'secondary' | 'outline' | 'destructive'> = {
  green: 'default',
  yellow: 'outline',
  red: 'destructive',
  blue: 'secondary',
};

export function StockBadge({ status }: { status: string }) {
  const { label, color } = getStockLabel(status);
  return <Badge variant={colorMap[color] || 'outline'}>{label}</Badge>;
}
