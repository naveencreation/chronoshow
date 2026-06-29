import {
  cn,
  formatPrice,
  formatDate,
  formatDateTime,
  generateSlug,
  generateOrderNumber,
  truncateText,
  getDiscountPercent,
  getStockLabel,
} from '@/lib/utils';

describe('cn utility', () => {
  it('should merge class names', () => {
    expect(cn('px-4', 'py-2')).toBe('px-4 py-2');
  });

  it('should handle tailwind conflicts', () => {
    expect(cn('px-4', 'px-8')).toBe('px-8');
  });

  it('should handle conditional classes', () => {
    expect(cn('base', false && 'hidden', undefined, 'extra')).toBe('base extra');
  });
});

describe('formatPrice', () => {
  it('should format INR currency', () => {
    expect(formatPrice(5000)).toBe('₹5,000');
  });

  it('should format zero', () => {
    expect(formatPrice(0)).toBe('₹0');
  });

  it('should format large numbers with commas', () => {
    expect(formatPrice(100000)).toBe('₹1,00,000');
  });
});

describe('formatDate', () => {
  it('should format a date string', () => {
    const result = formatDate('2026-06-29');
    expect(result).toContain('2026');
    expect(result).toContain('Jun');
    expect(result).toContain('29');
  });
});

describe('formatDateTime', () => {
  it('should include time component', () => {
    const result = formatDateTime('2026-06-29T14:30:00');
    expect(result).toContain('2026');
    expect(result).toContain('Jun');
    expect(result).not.toBe(formatDate('2026-06-29'));
  });
});

describe('generateSlug', () => {
  it('should lowercase and hyphenate', () => {
    expect(generateSlug('Titan Watch Pro')).toBe('titan-watch-pro');
  });

  it('should remove special characters', () => {
    expect(generateSlug('Casio G-Shock #1!')).toBe('casio-g-shock-1');
  });

  it('should trim leading/trailing hyphens', () => {
    expect(generateSlug('  Fastrack  ')).toBe('fastrack');
  });
});

describe('generateOrderNumber', () => {
  it('should start with ORD- prefix', () => {
    expect(generateOrderNumber()).toMatch(/^ORD-/);
  });

  it('should produce unique values', () => {
    const a = generateOrderNumber();
    const b = generateOrderNumber();
    expect(a).not.toBe(b);
  });
});

describe('truncateText', () => {
  it('should truncate long text', () => {
    expect(truncateText('HelloWorldTest', 5)).toBe('Hello...');
  });

  it('should not truncate short text', () => {
    expect(truncateText('Short', 10)).toBe('Short');
  });
});

describe('getDiscountPercent', () => {
  it('should calculate discount correctly', () => {
    expect(getDiscountPercent(10000, 7500)).toBe(25);
  });

  it('should return 0 when mrp is 0', () => {
    expect(getDiscountPercent(0, 500)).toBe(0);
  });

  it('should return 0 when selling price exceeds mrp', () => {
    expect(getDiscountPercent(5000, 6000)).toBe(0);
  });
});

describe('getStockLabel', () => {
  it('should return green for in_stock', () => {
    expect(getStockLabel('in_stock')).toEqual({ label: 'In Stock', color: 'green' });
  });

  it('should return red for out_of_stock', () => {
    expect(getStockLabel('out_of_stock')).toEqual({ label: 'Out of Stock', color: 'red' });
  });

  it('should return fallback for unknown status', () => {
    expect(getStockLabel('unknown')).toEqual({ label: 'unknown', color: 'gray' });
  });
});
