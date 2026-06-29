import { Product } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ProductTabsProps {
  product: Product;
}

export function ProductTabs({ product }: ProductTabsProps) {
  return (
    <Tabs defaultValue="specs">
      <TabsList>
        {product.description && <TabsTrigger value="description">Description</TabsTrigger>}
        <TabsTrigger value="specs">Specifications</TabsTrigger>
        {product.features && product.features.length > 0 && (
          <TabsTrigger value="features">Features</TabsTrigger>
        )}
      </TabsList>

      {product.description && (
        <TabsContent value="description" className="mt-4 leading-relaxed text-muted-foreground">
          {product.description}
        </TabsContent>
      )}

      <TabsContent value="specs" className="mt-4">
        {product.specifications && Object.keys(product.specifications).length > 0 ? (
          <div className="divide-y rounded-lg border">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex px-4 py-3 text-sm">
                <span className="w-48 font-medium text-muted-foreground">
                  {key.replace(/_/g, ' ')}
                </span>
                <span>{value}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No specifications available.</p>
        )}
      </TabsContent>

      {product.features && product.features.length > 0 && (
        <TabsContent value="features" className="mt-4">
          <ul className="space-y-2">
            {product.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </TabsContent>
      )}
    </Tabs>
  );
}
