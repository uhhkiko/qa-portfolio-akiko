import { test, expect } from '@playwright/test';

test.describe('Smoke tests', () => {
  test('homepage loads and has correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/QA Engineer/);
  });

  //test('navigation links are visible', async ({ page }) => {
    //await page.goto('/');
    //await expect(page.getByRole('link', { name: 'About' })).toBeVisible();
    //await expect(page.getByRole('link', { name: 'Skills' })).toBeVisible();
    //await expect(page.getByRole('link', { name: 'Projects' })).toBeVisible();
    //await expect(page.getByRole('link', { name: 'Contact' })).toBeVisible();
  //});

  //test('dark mode toggle switches theme', async ({ page }) => {
    //await page.goto('/');
    //await page.getByRole('button', { name: /toggle dark mode/i }).click();
    //await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  //});

  test('contact form fields are present', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#name')).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#message')).toBeVisible();
  });

  test('page is responsive at mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await expect(page.locator('body')).toBeVisible();
  });
});