export const mainNav = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Categories', href: '/categories', children: [] },
  { label: 'Brands', href: '/brands' },
  { label: 'Offers', href: '/offers' },
  { label: 'New Arrivals', href: '/new-arrivals' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

export const mobileNav = [
  { label: 'Home', href: '/', icon: 'Home' },
  { label: 'Categories', href: '/categories', icon: 'Grid3x3' },
  { label: 'Cart', href: '/cart', icon: 'ShoppingCart' },
  { label: 'WhatsApp', href: '#', icon: 'MessageCircle', isExternal: true },
  { label: 'Profile', href: '/profile', icon: 'User' },
] as const;

export const adminNav = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: 'LayoutDashboard' },
  { label: 'Products', href: '/admin/products', icon: 'Package' },
  { label: 'Categories', href: '/admin/categories', icon: 'Tags' },
  { label: 'Brands', href: '/admin/brands', icon: 'Award' },
  { label: 'Orders', href: '/admin/orders', icon: 'ShoppingBag' },
  { label: 'Customers', href: '/admin/customers', icon: 'Users' },
  { label: 'Reviews', href: '/admin/reviews', icon: 'Star' },
  { label: 'Banners', href: '/admin/banners', icon: 'Image' },
  { label: 'Offers', href: '/admin/offers', icon: 'Percent' },
  { label: 'Inventory', href: '/admin/inventory', icon: 'Warehouse' },
  { label: 'Reports', href: '/admin/reports', icon: 'BarChart3' },
  { label: 'Settings', href: '/admin/settings', icon: 'Settings' },
] as const;
