export const features = {
  wishlist: true,
  reviews: true,
  newsletter: true,
  recentlyViewed: true,
  compareProducts: false,

  analytics: false,
  emailNotifications: false,
  barcodeScanning: false,
  loyaltyProgram: false,
  multiLanguage: false,

  paymentGateway: false,
  whatsappApi: false,
  coupons: true,

  pwa: false,
  serviceWorker: false,
  offlineSupport: false,
} as const;

export type FeatureFlag = keyof typeof features;

export function isEnabled(flag: FeatureFlag): boolean {
  return features[flag];
}
