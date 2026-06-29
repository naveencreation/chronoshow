import { getBrands } from '@/lib/data/brands';
import { mockBrands } from '@/tests/utils/mock-data';

jest.mock('@/lib/supabase/server', () => ({
  createClient: jest.fn(),
}));

const getClient = () =>
  (require('@/lib/supabase/server') as { createClient: jest.Mock }).createClient;

describe('Brands Data Layer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getBrands', () => {
    it('should return active brands sorted by name', async () => {
      const order = jest.fn().mockResolvedValue({
        data: mockBrands,
        error: null,
      });

      getClient().mockResolvedValue({
        from: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnThis(),
          eq: jest.fn().mockReturnThis(),
          order,
        }),
      });

      const result = await getBrands();
      expect(result).toHaveLength(3);
      expect(result[0].name).toBe('Titan');
      expect(order).toHaveBeenCalledWith('name', { ascending: true });
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

      await expect(getBrands()).rejects.toThrow('DB error');
    });
  });
});
