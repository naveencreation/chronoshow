const mockChain = {
  select: jest.fn().mockReturnThis(),
  eq: jest.fn().mockReturnThis(),
  neq: jest.fn().mockReturnThis(),
  gte: jest.fn().mockReturnThis(),
  lte: jest.fn().mockReturnThis(),
  in: jest.fn().mockReturnThis(),
  or: jest.fn().mockReturnThis(),
  order: jest.fn().mockReturnThis(),
  range: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  single: jest.fn().mockReturnThis(),
  textSearch: jest.fn().mockReturnThis(),
  insert: jest.fn().mockReturnThis(),
};

export function createMockSupabase(overrides: Record<string, jest.Mock> = {}) {
  const chain = { ...mockChain };
  for (const [key, mock] of Object.entries(overrides)) {
    (chain as Record<string, unknown>)[key] = mock;
  }

  const from = jest.fn().mockReturnValue(chain);

  const supabase = {
    from,
    auth: {
      getUser: jest.fn(),
      signOut: jest.fn(),
      onAuthStateChange: jest.fn().mockReturnValue({
        data: { subscription: { unsubscribe: jest.fn() } },
      }),
    },
  };

  return { supabase, chain };
}
