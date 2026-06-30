import type { Metadata } from 'next';
import { BreadcrumbNav } from '@/components/shared/breadcrumb-nav';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Shipping Policy',
  description: `Learn about ${siteConfig.name}'s shipping policies and delivery options.`,
};

export default function ShippingPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <BreadcrumbNav items={[{ label: 'Home', href: '/' }, { label: 'Shipping Policy' }]} />
      <h1 className="mt-6 font-serif text-3xl font-bold">Shipping Policy</h1>

      <div className="mt-8 space-y-6 leading-relaxed text-muted-foreground">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">Delivery Options</h2>
          <p>
            We offer multiple delivery options to ensure your timepiece reaches you safely and
            conveniently.
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              <strong className="text-foreground">Store Pickup</strong> — Free. Collect your order
              from our store during business hours.
            </li>
            <li>
              <strong className="text-foreground">Local Delivery</strong> — Free within the city.
              Delivered within 1-2 business days.
            </li>
            <li>
              <strong className="text-foreground">Courier</strong> — Nationwide shipping via trusted
              courier partners. Delivery within 2-5 business days. Shipping charges calculated at
              checkout.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">Processing Time</h2>
          <p>
            All orders are processed within 24 hours of order confirmation. Orders placed after 6 PM
            or on holidays are processed the next business day.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">Order Tracking</h2>
          <p>
            Once your order is shipped, we will share tracking details via WhatsApp. You can also
            contact us for real-time order status updates.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">Packaging</h2>
          <p>
            Every watch is carefully packaged in tamper-proof, branded packaging with bubble wrap
            protection to ensure it arrives in pristine condition.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">Questions?</h2>
          <p>
            If you have any questions about shipping, please contact us via WhatsApp or visit our
            store.
          </p>
        </section>
      </div>
    </div>
  );
}
