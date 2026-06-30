import Link from 'next/link';
import { Logo } from '@/components/shared/logo';
import { siteConfig } from '@/config/site';

export function ShopFooter() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <Logo size="md" variant="light" />
            <p className="mt-3 text-sm leading-relaxed text-slate-400">{siteConfig.tagline}</p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop" className="text-slate-400 hover:text-white transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/brands" className="text-slate-400 hover:text-white transition-colors">
                  Brands
                </Link>
              </li>
              <li>
                <Link href="/offers" className="text-slate-400 hover:text-white transition-colors">
                  Offers
                </Link>
              </li>
              <li>
                <Link
                  href="/new-arrivals"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Help</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-slate-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/policies/shipping"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/policies/returns"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Returns
                </Link>
              </li>
              <li>
                <Link
                  href="/policies/privacy"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Contact</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {siteConfig.contact.phone && <li>{siteConfig.contact.phone}</li>}
              {siteConfig.contact.email && (
                <li>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="hover:text-white transition-colors"
                  >
                    {siteConfig.contact.email}
                  </a>
                </li>
              )}
              {siteConfig.contact.address && <li>{siteConfig.contact.address}</li>}
              {siteConfig.contact.businessHours && <li>{siteConfig.contact.businessHours}</li>}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
