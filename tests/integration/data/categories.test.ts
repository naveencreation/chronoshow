import { getCategories, getCategoryBySlug } from '@/lib/data/categories';
import { mockCategories } from '@/tests/utils/mock-data';

jest.mock('@/lib/supabase/server', () => ({
  createClient: jest.fn(),
}));

const getClient = () =>
  (require('@/lib/supabase/server') as { createClient: jest.Mock }).createClient;

describe('Categories Data Layer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getCategories', () => {
    it('should return active categories sorted by sort_order', async () => {
      const order = jest.fn().mockResolvedValue({
        data: mockCategories,
        error: null,
      });

      getClient().mockResolvedValue({
        from: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnThis(),
          eq: jest.fn().mockReturnThis(),
          order,
        }),
      });

      const result = await getCategories();
      expect(result).toHaveLength(3);
      expect(result[0].name).toBe('Men');
      expect(order).toHaveBeenCalledWith('sort_order', { ascending: true });
    });

    it('should throw on error', async () => {
      getClient().mockResolvedValue({
        from: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnThis(),
          eq: jest.fn().mockReturnThis(),
          order: jest.fn().mockResolvedValue({
            data: null,
            error: { message: 'DB error' },
          }),
        }),
      });

      await expect(getCategories()).rejects.toThrow('DB error');
    });
  });

  describe('getCategoryBySlug', () => {
    it('should return category by slug', async () => {
      getClient().mockResolvedValue({
        from: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnThis(),
          eq: jest.fn().mockReturnThis(),
          single: jest.fn().mockResolvedValue({
            data: mockCategories[0],
            error: null,
          }),
        }),
      });

      const result = await getCategoryBySlug('men');
      expect(result).toEqual(mockCategories[0]);
    });

    it('should return null when not found', async () => {
      getClient().mockResolvedValue({
        from: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnThis(),
          eq: jest.fn().mockReturnThis(),
          single: jest.fn().mockResolvedValue({
            data: null,
            error: { message: 'Not found' },
          }),
        }),
      });

      const result = await getCategoryBySlug('nonexistent');
      expect(result).toBeNull();
    });
  });
});
