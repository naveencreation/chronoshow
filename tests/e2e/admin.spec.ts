import { test, expect } from '@playwright/test';

test.describe('Admin Routes', () => {
  test('admin dashboard redirects unauthenticated users to home', async ({ page }) => {
    await page.goto('/admin/dashboard');
    await expect(page).toHaveURL('/');
  });

  test('admin products redirects unauthenticated users', async ({ page }) => {
    await page.goto('/admin/products');
    await expect(page).toHaveURL('/');
  });

  test('admin orders redirects unauthenticated users', async ({ page }) => {
    await page.goto('/admin/orders');
    await expect(page).toHaveURL('/');
  });

  test('admin settings redirects unauthenticated users', async ({ page }) => {
    await page.goto('/admin/settings');
    await expect(page).toHaveURL('/');
  });

  test('admin categories redirects unauthenticated users', async ({ page }) => {
    await page.goto('/admin/categories');
    await expect(page).toHaveURL('/');
  });

  test('admin brands redirects unauthenticated users', async ({ page }) => {
    await page.goto('/admin/brands');
    await expect(page).toHaveURL('/');
  });

  test('admin inventory redirects unauthenticated users', async ({ page }) => {
    await page.goto('/admin/inventory');
    await expect(page).toHaveURL('/');
  });
});
