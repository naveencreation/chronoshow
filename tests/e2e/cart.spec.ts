import { test, expect } from '@playwright/test';

test.describe('Cart Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.removeItem('chronoshow_cart'));
  });

  test('cart page shows empty state', async ({ page }) => {
    await page.goto('/cart');
    await expect(page.locator('text=Your cart is empty')).toBeVisible();
    await expect(page.locator('text=Browse Products')).toBeVisible();
  });

  test('browse products navigates to shop from empty cart', async ({ page }) => {
    await page.goto('/cart');
    await page.click('text=Browse Products');
    await expect(page).toHaveURL(/\/shop/);
  });

  test('cart persists items via localStorage', async ({ page }) => {
    await page.goto('/cart');
    await page.evaluate(() => {
      localStorage.setItem(
        'chronoshow_cart',
        JSON.stringify([
          {
            product: {
              id: 1,
              name: 'Titan Edge',
              slug: 'titan-edge',
              selling_price: 5000,
              brand_id: 1,
              category_id: 1,
              mrp: 6000,
              features: [],
              specifications: {},
              stock_quantity: 10,
              stock_status: 'in_stock',
              is_featured: false,
              is_new_arrival: false,
              is_trending: false,
              is_active: true,
              tags: [],
              created_at: '',
              updated_at: '',
              discount_percent: 0,
              low_stock_threshold: 5,
            },
            quantity: 2,
          },
        ])
      );
    });
    await page.reload();
    await expect(page.locator('text=Titan Edge')).toBeVisible();
    await expect(page.locator('text=Order via WhatsApp')).toBeVisible();
  });
});
