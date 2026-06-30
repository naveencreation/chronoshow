import { ShopHeader } from '@/components/shop/header';
import { ShopFooter } from '@/components/shop/footer';
import { MobileNav } from '@/components/shop/mobile-nav';

export default async function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:top-2 focus:left-2 focus:rounded-md"
      >
        Skip to content
      </a>
      <ShopHeader />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <ShopFooter />
      <MobileNav />
    </div>
  );
}
