import { getProducts, getProductBySlug, getRelatedProducts } from '@/lib/data/products';
import { mockProducts, mockProduct } from '@/tests/utils/mock-data';

jest.mock('@/lib/supabase/server', () => ({
  createClient: jest.fn(),
}));

const getClient = () =>
  (require('@/lib/supabase/server') as { createClient: jest.Mock }).createClient;

function mockRange(data: unknown, count: number, error: unknown = null) {
  return jest.fn().mockResolvedValue({ data, count, error });
}

function mockSingle(data: unknown, error: unknown = null) {
  return jest.fn().mockResolvedValue({ data, error });
}

function mockQuery(overrides: Record<string, jest.Mock> = {}) {
  const base = {
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    neq: jest.fn().mockReturnThis(),
    gte: jest.fn().mockReturnThis(),
    lte: jest.fn().mockReturnThis(),
    or: jest.fn().mockReturnThis(),
    order: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    textSearch: jest.fn().mockReturnThis(),
    single: jest.fn(),
    range: jest.fn(),
    insert: jest.fn().mockReturnThis(),
  };
  return { ...base, ...overrides };
}

describe('Product Data Layer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getProducts', () => {
    it('should return paginated products', async () => {
      getClient().mockResolvedValue({
        from: jest.fn().mockReturnValue(mockQuery({ range: mockRange(mockProducts, 2) })),
      });

      const result = await getProducts({ page: 1, limit: 24 });

      expect(result.data).toHaveLength(2);
      expect(result.total).toBe(2);
      expect(result.page).toBe(1);
      expect(result.totalPages).toBe(1);
    });

    it('should apply search filter', async () => {
      const query = mockQuery({ range: mockRange(mockProducts, 2) });

      getClient().mockResolvedValue({
        from: jest.fn().mockReturnValue(query),
      });

      await getProducts({ search: 'titan', page: 1 });
      expect(query.textSearch).toHaveBeenCalledWith('search_vector', 'titan', {
        type: 'websearch',
      });
    });

    it('should apply price filters', async () => {
      const query = mockQuery({ range: mockRange(mockProducts, 1) });

      getClient().mockResolvedValue({
        from: jest.fn().mockReturnValue(query),
      });

      await getProducts({ minPrice: 5000, maxPrice: 10000, page: 1 });
      expect(query.gte).toHaveBeenCalledWith('selling_price', 5000);
      expect(query.lte).toHaveBeenCalledWith('selling_price', 10000);
    });

    it('should throw on database error', async () => {
      getClient().mockResolvedValue({
        from: jest
          .fn()
          .mockReturnValue(
            mockQuery({ range: mockRange(null, 0, { message: 'Database connection failed' }) })
          ),
      });

      await expect(getProducts({})).rejects.toThrow('Database connection failed');
    });

    it('should handle empty results', async () => {
      getClient().mockResolvedValue({
        from: jest.fn().mockReturnValue(mockQuery({ range: mockRange([], 0) })),
      });

      const result = await getProducts({ page: 1 });
      expect(result.data).toEqual([]);
      expect(result.total).toBe(0);
      expect(result.totalPages).toBe(0);
    });
  });

  describe('getProductBySlug', () => {
    it('should return product by slug', async () => {
      getClient().mockResolvedValue({
        from: jest.fn().mockReturnValue(mockQuery({ single: mockSingle(mockProduct) })),
      });

      const result = await getProductBySlug('titan-edge-classic');
      expect(result).toEqual(mockProduct);
    });

    it('should return null when not found', async () => {
      getClient().mockResolvedValue({
        from: jest
          .fn()
          .mockReturnValue(mockQuery({ single: mockSingle(null, { message: 'Not found' }) })),
      });

      const result = await getProductBySlug('nonexistent');
      expect(result).toBeNull();
    });
  });

  describe('getRelatedProducts', () => {
    it('should return related products as an array', async () => {
      getClient().mockResolvedValue({
        from: jest.fn().mockReturnValue(
          mockQuery({
            single: mockSingle({ brand_id: 1, category_id: 1 }),
            limit: jest.fn().mockResolvedValue({ data: [mockProducts[1]], error: null }),
          })
        ),
      });

      const result = await getRelatedProducts(1, 2);
      expect(Array.isArray(result)).toBe(true);
    });

    it('should return empty array when product not found', async () => {
      getClient().mockResolvedValue({
        from: jest.fn().mockReturnValue(mockQuery({ single: mockSingle(null) })),
      });

      const result = await getRelatedProducts(999);
      expect(result).toEqual([]);
    });
  });
});
