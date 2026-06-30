import { test, expect } from '@playwright/test';

test.describe('Browse Flow', () => {
  test('homepage loads with header and footer', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
    await expect(page.locator('text=ChronoShow')).toBeVisible();
  });

  test('homepage has hero CTA buttons', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Shop Now')).toBeVisible();
    await expect(page.locator('text=Browse Categories')).toBeVisible();
  });

  test('navigates to categories page', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Browse Categories');
    await expect(page).toHaveURL(/\/categories/);
  });

  test('navigates to shop page', async ({ page }) => {
    await page.goto('/shop');
    await expect(page.locator('h1')).toHaveText('Shop');
  });

  test('navigates to about page', async ({ page }) => {
    await page.goto('/about');
    await expect(page.locator('h1')).toContainText('About');
  });

  test('navigates to contact page', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.locator('h1')).toHaveText('Contact Us');
  });

  test('search with no query shows empty state', async ({ page }) => {
    await page.goto('/search');
    await expect(page.locator('text=Enter a search term')).toBeVisible();
  });

  test('search with query returns results page', async ({ page }) => {
    await page.goto('/search?q=titan');
    await expect(page.locator('h1')).toContainText('Results');
  });

  test('new arrivals page loads', async ({ page }) => {
    await page.goto('/new-arrivals');
    await expect(page.locator('h1')).toHaveText('New Arrivals');
  });

  test('offers page loads', async ({ page }) => {
    await page.goto('/offers');
    await expect(page.locator('h1')).toHaveText('Special Offers');
  });

  test('cart page loads with empty state', async ({ page }) => {
    await page.goto('/cart');
    await expect(page.locator('text=Your cart is empty')).toBeVisible();
  });

  test('404 page renders', async ({ page }) => {
    await page.goto('/nonexistent-page');
    await expect(page.locator('text=404')).toBeVisible();
    await expect(page.locator('text=Page Not Found')).toBeVisible();
  });
});
