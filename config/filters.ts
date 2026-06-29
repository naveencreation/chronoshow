export const productFilters = {
  price: {
    label: 'Price',
    type: 'range' as const,
    min: 0,
    max: 100000,
    step: 100,
  },
  brand: {
    label: 'Brand',
    type: 'multi-select' as const,
    options: [],
  },
  category: {
    label: 'Category',
    type: 'multi-select' as const,
    options: [],
  },
  gender: {
    label: 'Gender',
    type: 'multi-select' as const,
    options: [
      { value: 'men', label: 'Men' },
      { value: 'women', label: 'Women' },
      { value: 'unisex', label: 'Unisex' },
      { value: 'kids', label: 'Kids' },
    ],
  },
  movement: {
    label: 'Movement',
    type: 'multi-select' as const,
    options: [
      { value: 'quartz', label: 'Quartz' },
      { value: 'automatic', label: 'Automatic' },
      { value: 'mechanical', label: 'Mechanical' },
      { value: 'digital', label: 'Digital' },
      { value: 'smart', label: 'Smart' },
    ],
  },
  color: {
    label: 'Color',
    type: 'multi-select' as const,
    options: [
      { value: 'black', label: 'Black' },
      { value: 'silver', label: 'Silver' },
      { value: 'gold', label: 'Gold' },
      { value: 'blue', label: 'Blue' },
      { value: 'brown', label: 'Brown' },
      { value: 'white', label: 'White' },
    ],
  },
  material: {
    label: 'Material',
    type: 'multi-select' as const,
    options: [
      { value: 'leather', label: 'Leather' },
      { value: 'metal', label: 'Metal' },
      { value: 'rubber', label: 'Rubber' },
      { value: 'fabric', label: 'Fabric' },
      { value: 'ceramic', label: 'Ceramic' },
    ],
  },
  availability: {
    label: 'Availability',
    type: 'multi-select' as const,
    options: [
      { value: 'in_stock', label: 'In Stock' },
      { value: 'low_stock', label: 'Low Stock' },
      { value: 'coming_soon', label: 'Coming Soon' },
    ],
  },
  discount: {
    label: 'Discount',
    type: 'range' as const,
    min: 0,
    max: 100,
    step: 5,
    unit: '%',
  },
  isNew: {
    label: 'New Arrival',
    type: 'boolean' as const,
  },
} as const;
