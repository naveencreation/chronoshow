import { BreadcrumbNav } from '@/components/shared/breadcrumb-nav';
import { siteConfig } from '@/config/site';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <BreadcrumbNav items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />
      <h1 className="mt-6 text-3xl font-bold">About {siteConfig.name}</h1>
      <div className="mt-8 max-w-2xl space-y-4 text-muted-foreground">
        <p>
          We are a premium watch retailer dedicated to bringing you the finest timepieces from
          renowned brands. From classic analog designs to cutting-edge smart watches, our curated
          collection caters to every style and occasion.
        </p>
        <p>
          Our commitment to quality and customer satisfaction drives everything we do. Every watch
          in our catalog is carefully selected to ensure authenticity, durability, and style.
        </p>
        <p>
          Shop with confidence and reach out to us on WhatsApp for personalized assistance with your
          purchase.
        </p>
      </div>
    </div>
  );
}
