import {
  productSchema,
  orderSchema,
  categorySchema,
  brandSchema,
  settingsSchema,
  reviewSchema,
} from '@/lib/schemas';

describe('productSchema', () => {
  const validProduct = {
    name: 'Titan Watch',
    slug: 'titan-watch',
    brand_id: 1,
    category_id: 1,
    mrp: 5000,
    selling_price: 4500,
  };

  it('should validate a valid product', () => {
    const result = productSchema.safeParse(validProduct);
    expect(result.success).toBe(true);
  });

  it('should reject missing name', () => {
    const result = productSchema.safeParse({ ...validProduct, name: undefined });
    expect(result.success).toBe(false);
  });

  it('should reject short name', () => {
    const result = productSchema.safeParse({ ...validProduct, name: 'A' });
    expect(result.success).toBe(false);
  });

  it('should reject invalid slug with spaces', () => {
    const result = productSchema.safeParse({ ...validProduct, slug: 'Titan Watch' });
    expect(result.success).toBe(false);
  });

  it('should reject negative mrp', () => {
    const result = productSchema.safeParse({ ...validProduct, mrp: -100 });
    expect(result.success).toBe(false);
  });

  it('should reject zero selling_price', () => {
    const result = productSchema.safeParse({ ...validProduct, selling_price: 0 });
    expect(result.success).toBe(false);
  });

  it('should apply defaults correctly', () => {
    const result = productSchema.parse(validProduct);
    expect(result.features).toEqual([]);
    expect(result.specifications).toEqual({});
    expect(result.stock_quantity).toBe(0);
    expect(result.low_stock_threshold).toBe(5);
    expect(result.is_featured).toBe(false);
    expect(result.is_active).toBe(true);
    expect(result.tags).toEqual([]);
  });

  it('should reject meta_title exceeding 60 chars', () => {
    const result = productSchema.safeParse({
      ...validProduct,
      meta_title: 'A'.repeat(61),
    });
    expect(result.success).toBe(false);
  });
});

describe('orderSchema', () => {
  const validOrder = {
    customer_name: 'John Doe',
    customer_phone: '+919876543210',
    delivery_type: 'store_pickup',
    items: [{ product_id: 1, quantity: 2 }],
  };

  it('should validate a valid order', () => {
    const result = orderSchema.safeParse(validOrder);
    expect(result.success).toBe(true);
  });

  it('should reject empty items array', () => {
    const result = orderSchema.safeParse({ ...validOrder, items: [] });
    expect(result.success).toBe(false);
  });

  it('should reject invalid phone number', () => {
    const result = orderSchema.safeParse({
      ...validOrder,
      customer_phone: 'notaphone',
    });
    expect(result.success).toBe(false);
  });

  it('should reject short customer name', () => {
    const result = orderSchema.safeParse({ ...validOrder, customer_name: 'A' });
    expect(result.success).toBe(false);
  });

  it('should reject invalid delivery_type', () => {
    const result = orderSchema.safeParse({
      ...validOrder,
      delivery_type: 'flying_carpet',
    });
    expect(result.success).toBe(false);
  });

  it('should reject zero quantity', () => {
    const result = orderSchema.safeParse({
      ...validOrder,
      items: [{ product_id: 1, quantity: 0 }],
    });
    expect(result.success).toBe(false);
  });

  it('should accept optional email as empty string', () => {
    const result = orderSchema.safeParse({
      ...validOrder,
      customer_email: '',
    });
    expect(result.success).toBe(true);
  });

  it('should accept optional email as valid email', () => {
    const result = orderSchema.safeParse({
      ...validOrder,
      customer_email: 'john@example.com',
    });
    expect(result.success).toBe(true);
  });
});

describe('categorySchema', () => {
  it('should validate a valid category', () => {
    const result = categorySchema.safeParse({
      name: 'Men',
      slug: 'men',
    });
    expect(result.success).toBe(true);
  });

  it('should reject empty name', () => {
    const result = categorySchema.safeParse({ name: '', slug: 'men' });
    expect(result.success).toBe(false);
  });

  it('should reject invalid slug', () => {
    const result = categorySchema.safeParse({
      name: 'Men',
      slug: 'MEN Watches',
    });
    expect(result.success).toBe(false);
  });
});

describe('brandSchema', () => {
  it('should validate a valid brand', () => {
    const result = brandSchema.safeParse({
      name: 'Titan',
      slug: 'titan',
    });
    expect(result.success).toBe(true);
  });

  it('should accept optional website', () => {
    const result = brandSchema.safeParse({
      name: 'Titan',
      slug: 'titan',
      website: 'https://titan.co.in',
    });
    expect(result.success).toBe(true);
  });

  it('should reject invalid website URL', () => {
    const result = brandSchema.safeParse({
      name: 'Titan',
      slug: 'titan',
      website: 'not-a-url',
    });
    expect(result.success).toBe(false);
  });
});

describe('settingsSchema', () => {
  it('should validate valid settings', () => {
    const result = settingsSchema.safeParse({
      store_name: 'ChronoShow',
      whatsapp_number: '+919876543210',
    });
    expect(result.success).toBe(true);
  });

  it('should reject missing store_name', () => {
    const result = settingsSchema.safeParse({
      whatsapp_number: '+919876543210',
    });
    expect(result.success).toBe(false);
  });

  it('should reject invalid whatsapp number', () => {
    const result = settingsSchema.safeParse({
      store_name: 'ChronoShow',
      whatsapp_number: 'invalid',
    });
    expect(result.success).toBe(false);
  });

  it('should default delivery_charges to 0', () => {
    const result = settingsSchema.parse({
      store_name: 'ChronoShow',
      whatsapp_number: '+919876543210',
    });
    expect(result.delivery_charges).toBe(0);
  });
});

describe('reviewSchema', () => {
  it('should validate a valid review', () => {
    const result = reviewSchema.safeParse({
      product_id: 1,
      rating: 4,
      comment: 'Great watch, highly recommended!',
    });
    expect(result.success).toBe(true);
  });

  it('should reject rating above 5', () => {
    const result = reviewSchema.safeParse({
      product_id: 1,
      rating: 6,
      comment: 'Amazing product!',
    });
    expect(result.success).toBe(false);
  });

  it('should reject rating below 1', () => {
    const result = reviewSchema.safeParse({
      product_id: 1,
      rating: 0,
      comment: 'Not good.',
    });
    expect(result.success).toBe(false);
  });

  it('should reject short comment', () => {
    const result = reviewSchema.safeParse({
      product_id: 1,
      rating: 3,
      comment: 'Ok',
    });
    expect(result.success).toBe(false);
  });

  it('should reject non-integer rating', () => {
    const result = reviewSchema.safeParse({
      product_id: 1,
      rating: 3.5,
      comment: 'Pretty good watch overall.',
    });
    expect(result.success).toBe(false);
  });
});
