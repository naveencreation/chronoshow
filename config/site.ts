export const siteConfig = {
  name: 'ChronoShow',
  tagline: 'Premium Watches for Every Style',
  description:
    'Discover luxury, casual, smart, and classic watches. Order via WhatsApp for quick delivery.',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  ogImage: '/images/og-image.jpg',
  links: {
    facebook: '',
    instagram: '',
    whatsapp: process.env.NEXT_PUBLIC_STORE_WHATSAPP || '',
  },
  contact: {
    phone: '',
    email: '',
    address: '',
    businessHours: '',
  },
  currency: {
    code: 'INR',
    symbol: '₹',
    locale: 'en-IN',
  },
} as const;
