'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Grid3X3, ShoppingCart, MessageCircle, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';

const links = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/categories', label: 'Categories', icon: Grid3X3 },
  { href: '/cart', label: 'Cart', icon: ShoppingCart },
  {
    href: `https://wa.me/${siteConfig.links.whatsapp?.replace(/\D/g, '')}`,
    label: 'WhatsApp',
    icon: MessageCircle,
    external: true,
  },
  { href: '/profile', label: 'Profile', icon: User },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background md:hidden">
      <div className="flex h-16 items-center justify-around">
        {links.map((link) => {
          const isActive = !link.external && pathname === link.href;
          const Component = link.external ? 'a' : Link;

          return (
            <Component
              key={link.href}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className={cn(
                'flex flex-col items-center gap-1 px-3 py-2 text-xs font-medium transition-colors',
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <link.icon className="h-5 w-5" />
              {link.label}
            </Component>
          );
        })}
      </div>
    </nav>
  );
}
