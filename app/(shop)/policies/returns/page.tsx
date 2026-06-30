import type { Metadata } from 'next';
import { BreadcrumbNav } from '@/components/shared/breadcrumb-nav';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Returns & Exchange Policy',
  description: `${siteConfig.name}'s return and exchange policies for watch purchases.`,
};

export default function ReturnsPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <BreadcrumbNav items={[{ label: 'Home', href: '/' }, { label: 'Returns & Exchange' }]} />
      <h1 className="mt-6 font-serif text-3xl font-bold">Returns & Exchange</h1>

      <div className="mt-8 space-y-6 leading-relaxed text-muted-foreground">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">Return Window</h2>
          <p>
            You may return or exchange your watch within 7 days of delivery, provided the product is
            unused, undamaged, and in its original packaging with all tags and accessories intact.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">Conditions</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>The watch must be unworn and in brand-new condition.</li>
            <li>All original packaging, manuals, warranty cards, and tags must be included.</li>
            <li>Protective films and stickers must not be removed.</li>
            <li>Returns and exchanges require the original purchase receipt.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">Non-Returnable Items</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Custom-ordered or specially requested watches.</li>
            <li>Watches with personalized engraving.</li>
            <li>Used, scratched, or damaged watches.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">Exchange Process</h2>
          <p>
            Exchanges are processed once we receive and inspect the returned item. You may exchange
            for a different model or store credit of equal value. Price differences will be settled
            at the time of exchange.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">Refunds</h2>
          <p>
            Refunds are processed within 7-10 business days after inspection. The refund will be
            issued via the original payment method or store credit — whichever you prefer.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">How to Initiate</h2>
          <p>
            Contact us via WhatsApp or visit our store to initiate a return or exchange. Our team
            will guide you through the process.
          </p>
        </section>
      </div>
    </div>
  );
}
