'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { productFilters } from '@/config/filters';
import { formatPrice } from '@/lib/utils';

interface FilterSidebarProps {
  activeFilters: Record<string, string[]>;
  priceRange: [number, number];
  onFilterChange: (key: string, values: string[]) => void;
  onPriceChange: (range: [number, number]) => void;
}

export function FilterSidebar({
  activeFilters,
  priceRange,
  onFilterChange,
  onPriceChange,
}: FilterSidebarProps) {
  return (
    <aside className="space-y-8">
      <div>
        <h4 className="mb-4 text-sm font-semibold">Price Range</h4>
        <Slider
          min={0}
          max={100000}
          step={500}
          value={priceRange}
          onValueChange={(v) => onPriceChange(v as [number, number])}
          className="mb-2"
        />
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{formatPrice(priceRange[0])}</span>
          <span>{formatPrice(priceRange[1])}</span>
        </div>
      </div>

      {Object.entries(productFilters)
        .filter(([, f]) => f.type === 'multi-select')
        .map(([key, filter]) => {
          const options =
            'options' in filter
              ? (filter.options as readonly { value: string; label: string }[])
              : [];
          if (!Array.isArray(options) || options.length === 0) return null;

          return (
            <div key={key}>
              <h4 className="mb-2 text-sm font-semibold">{filter.label}</h4>
              <div className="space-y-2">
                {options.map((option) => (
                  <div key={option.value} className="flex items-center gap-2">
                    <Checkbox
                      id={`filter-${key}-${option.value}`}
                      checked={(activeFilters[key] || []).includes(option.value)}
                      onCheckedChange={(checked) => {
                        const current = activeFilters[key] || [];
                        const updated = checked
                          ? [...current, option.value]
                          : current.filter((v) => v !== option.value);
                        onFilterChange(key, updated);
                      }}
                    />
                    <Label
                      htmlFor={`filter-${key}-${option.value}`}
                      className="text-sm text-muted-foreground"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
    </aside>
  );
}
