import { createClient } from '@/lib/supabase/server';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default async function AdminBrandsPage() {
  const supabase = await createClient();
  const { data: brands } = await supabase
    .from('brands')
    .select('*')
    .order('name', { ascending: true });

  return (
    <div>
      <h1 className="text-2xl font-bold">Brands</h1>
      <p className="mt-1 text-sm text-muted-foreground">{(brands || []).length} brands</p>

      <div className="mt-6 rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(brands || []).map((brand) => (
              <TableRow key={brand.id}>
                <TableCell className="font-medium">{brand.name}</TableCell>
                <TableCell className="text-sm">{brand.slug}</TableCell>
                <TableCell>{brand.is_active ? 'Active' : 'Inactive'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
