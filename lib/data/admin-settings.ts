import { createClient } from '@/lib/supabase/server';
import type { StoreSettings } from '@/types';

export async function getStoreSettings(): Promise<StoreSettings | null> {
  const supabase = await createClient();

  const { data, error } = await supabase.from('store_settings').select('*').eq('id', 1).single();

  if (error) return null;
  return data as StoreSettings;
}

export async function updateStoreSettings(settings: Partial<StoreSettings>) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('store_settings')
    .update({ ...settings, updated_at: new Date().toISOString() })
    .eq('id', 1);

  if (error) throw new Error(error.message);
}
