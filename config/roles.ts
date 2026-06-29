export const roles = {
  owner: {
    label: 'Owner',
    permissions: ['*'],
  },
  manager: {
    label: 'Manager',
    permissions: [
      'products.read',
      'products.write',
      'products.delete',
      'categories.read',
      'categories.write',
      'categories.delete',
      'brands.read',
      'brands.write',
      'brands.delete',
      'orders.read',
      'orders.write',
      'customers.read',
      'customers.write',
      'reviews.read',
      'reviews.write',
      'banners.read',
      'banners.write',
      'banners.delete',
      'offers.read',
      'offers.write',
      'offers.delete',
      'inventory.read',
      'inventory.write',
      'reports.read',
      'settings.read',
      'settings.write',
    ],
  },
  staff: {
    label: 'Staff',
    permissions: [
      'products.read',
      'products.write',
      'categories.read',
      'brands.read',
      'orders.read',
      'orders.write',
      'customers.read',
      'reviews.read',
      'reviews.write',
      'inventory.read',
      'inventory.write',
    ],
  },
  customer: {
    label: 'Customer',
    permissions: [
      'cart.read',
      'cart.write',
      'wishlist.read',
      'wishlist.write',
      'orders.read_own',
      'reviews.write_own',
    ],
  },
} as const;

export type Role = keyof typeof roles;

export function hasPermission(role: Role, permission: string): boolean {
  const rolePerms = roles[role].permissions as readonly string[];
  if (rolePerms.includes('*')) return true;
  return rolePerms.includes(permission);
}
