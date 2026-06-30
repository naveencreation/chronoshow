import type { Metadata } from 'next';
import { BreadcrumbNav } from '@/components/shared/breadcrumb-nav';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `${siteConfig.name}'s privacy policy and data handling practices.`,
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <BreadcrumbNav items={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]} />
      <h1 className="mt-6 font-serif text-3xl font-bold">Privacy Policy</h1>

      <div className="mt-8 space-y-6 leading-relaxed text-muted-foreground">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">Information We Collect</h2>
          <p>
            When you interact with {siteConfig.name}, we may collect your name, phone number, email
            address, shipping address, and order details to process your purchase and provide
            customer support.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">How We Use Your Data</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>To process and fulfill your orders.</li>
            <li>To communicate order updates, offers, and support via WhatsApp.</li>
            <li>To improve our products and services.</li>
            <li>To comply with legal obligations.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">Data Sharing</h2>
          <p>
            We do not sell, rent, or trade your personal information. Your data is only shared with
            trusted partners (courier services, payment processors) necessary to complete your
            order.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">WhatsApp Communication</h2>
          <p>
            By placing an order through WhatsApp, you consent to receive order-related messages. You
            can opt out of promotional messages at any time by replying &ldquo;STOP&rdquo; on
            WhatsApp.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">Data Retention</h2>
          <p>
            We retain your order and account information for as long as necessary to provide our
            services and comply with legal obligations. You may request deletion of your data by
            contacting us.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information against
            unauthorized access, alteration, disclosure, or destruction.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">Contact Us</h2>
          <p>
            For any privacy-related questions or requests, contact us via WhatsApp or visit our
            store.
          </p>
        </section>
      </div>
    </div>
  );
}
