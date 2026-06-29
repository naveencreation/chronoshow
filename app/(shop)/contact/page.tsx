import { BreadcrumbNav } from '@/components/shared/breadcrumb-nav';
import { siteConfig } from '@/config/site';
import { buttonVariants } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <BreadcrumbNav items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />
      <h1 className="mt-6 text-3xl font-bold">Contact Us</h1>
      <p className="mt-2 text-muted-foreground">We would love to hear from you.</p>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <h3 className="font-semibold">Reach Out</h3>
          {siteConfig.contact.phone && (
            <p className="text-sm">
              <span className="font-medium">Phone:</span> {siteConfig.contact.phone}
            </p>
          )}
          {siteConfig.contact.email && (
            <p className="text-sm">
              <span className="font-medium">Email:</span> {siteConfig.contact.email}
            </p>
          )}
          {siteConfig.contact.address && (
            <p className="text-sm">
              <span className="font-medium">Address:</span> {siteConfig.contact.address}
            </p>
          )}
          {siteConfig.contact.businessHours && (
            <p className="text-sm">
              <span className="font-medium">Hours:</span> {siteConfig.contact.businessHours}
            </p>
          )}

          <a
            href={`https://wa.me/${(siteConfig.links.whatsapp || '').replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants(), 'bg-green-600 hover:bg-green-700')}
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Chat on WhatsApp
          </a>
        </div>

        <div className="rounded-lg border p-6">
          <h3 className="font-semibold">Send a message</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            The fastest way to reach us is via WhatsApp. Click the button above to start a
            conversation directly.
          </p>
        </div>
      </div>
    </div>
  );
}
