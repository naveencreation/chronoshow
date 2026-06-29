import { ShopHeader } from '@/components/shop/header';
import { ShopFooter } from '@/components/shop/footer';
import { MobileNav } from '@/components/shop/mobile-nav';

export default async function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <ShopHeader />
      <main className="flex-1">{children}</main>
      <ShopFooter />
      <MobileNav />
    </div>
  );
}
