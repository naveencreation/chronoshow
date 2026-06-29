'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { settingsSchema, type SettingsInput } from '@/lib/schemas';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save } from 'lucide-react';

export default function AdminSettingsPage() {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const supabase = createClient();

  const form = useForm<SettingsInput>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(settingsSchema) as any,
    defaultValues: {
      store_name: 'ChronoShow',
      whatsapp_number: '',
      delivery_charges: 0,
    },
  });

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase.from('store_settings').select('*').eq('id', 1).single();

      if (data) {
        form.reset({
          store_name: data.store_name || 'ChronoShow',
          tagline: data.tagline || '',
          address: data.address || '',
          phone: data.phone || '',
          whatsapp_number: data.whatsapp_number || '',
          email: data.email || '',
          business_hours: data.business_hours || '',
          delivery_charges: data.delivery_charges || 0,
          gst_number: data.gst_number || '',
        });
      }
    };
    fetchSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = form.handleSubmit(async (data) => {
    setSaving(true);
    setSaved(false);
    const { error } = await supabase
      .from('store_settings')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', 1);

    if (!error) setSaved(true);
    setSaving(false);
  });

  return (
    <div>
      <h1 className="text-2xl font-bold">Store Settings</h1>
      <p className="mt-1 text-sm text-muted-foreground">Manage your store configuration</p>

      <form onSubmit={onSubmit} className="mt-6 max-w-2xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>General</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="store_name">Store Name</Label>
              <Input id="store_name" {...form.register('store_name')} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="tagline">Tagline</Label>
              <Input id="tagline" {...form.register('tagline')} className="mt-1" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" {...form.register('phone')} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="whatsapp_number">WhatsApp Number</Label>
              <Input
                id="whatsapp_number"
                {...form.register('whatsapp_number')}
                className="mt-1"
                placeholder="919876543210"
              />
              {form.formState.errors.whatsapp_number && (
                <p className="mt-1 text-xs text-destructive">
                  {form.formState.errors.whatsapp_number.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...form.register('email')} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" {...form.register('address')} className="mt-1" rows={3} />
            </div>
            <div>
              <Label htmlFor="business_hours">Business Hours</Label>
              <Input id="business_hours" {...form.register('business_hours')} className="mt-1" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Commerce</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="delivery_charges">Delivery Charges (₹)</Label>
              <Input
                id="delivery_charges"
                type="number"
                {...form.register('delivery_charges', { valueAsNumber: true })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="gst_number">GST Number</Label>
              <Input id="gst_number" {...form.register('gst_number')} className="mt-1" />
            </div>
          </CardContent>
        </Card>

        <Button type="submit" disabled={saving}>
          <Save className="mr-2 h-4 w-4" />
          {saving ? 'Saving...' : 'Save Settings'}
        </Button>
        {saved && <p className="text-sm text-green-600">Settings saved successfully!</p>}
      </form>
    </div>
  );
}
