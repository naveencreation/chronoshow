'use client';

import { useAuth } from '@/components/providers/auth-provider';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export function AdminHeader() {
  const { profile, signOut } = useAuth();

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <div>
        <h2 className="text-sm font-medium text-muted-foreground">
          Welcome back, {profile?.full_name || 'Admin'}
        </h2>
      </div>
      <Button variant="ghost" size="sm" onClick={signOut} className="gap-2">
        <LogOut className="h-4 w-4" />
        Sign Out
      </Button>
    </header>
  );
}
