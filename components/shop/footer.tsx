import Link from 'next/link';
import { Logo } from '@/components/shared/logo';
import { siteConfig } from '@/config/site';

export function ShopFooter() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Logo size="md" />
            <p className="mt-2 text-sm text-muted-foreground">{siteConfig.tagline}</p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/shop" className="hover:text-foreground">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-foreground">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/brands" className="hover:text-foreground">
                  Brands
                </Link>
              </li>
              <li>
                <Link href="/offers" className="hover:text-foreground">
                  Offers
                </Link>
              </li>
              <li>
                <Link href="/new-arrivals" className="hover:text-foreground">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold">Help</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/policies/shipping" className="hover:text-foreground">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/returns" className="hover:text-foreground">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/policies/privacy" className="hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {siteConfig.contact.phone && <li>Phone: {siteConfig.contact.phone}</li>}
              {siteConfig.contact.email && <li>Email: {siteConfig.contact.email}</li>}
              {siteConfig.contact.address && <li>{siteConfig.contact.address}</li>}
              {siteConfig.contact.businessHours && <li>{siteConfig.contact.businessHours}</li>}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
