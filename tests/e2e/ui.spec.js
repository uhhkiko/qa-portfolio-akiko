import { test, expect } from '@playwright/test';

test.describe('Theme toggle', () => {
  test('switches to light mode and persists after reload', async ({ page }) => {
    await page.goto('/');
    await page.click('#theme-toggle');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });
});

test.describe('Typewriter', () => {
  test('element is visible and contains text after load', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);
    const text = await page.locator('#typewriter').textContent();
    expect(text.length).toBeGreaterThan(0);
  });
});

test.describe('Hero section', () => {
  test('ticket ID is visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.ticket-id').first()).toBeVisible();
  });

  test('status badge is visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.badge').first()).toBeVisible();
  });
});

test.describe('Easter egg game', () => {
  test('trigger badge is present in the DOM', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#easterEggTrigger')).toBeAttached();
  });

  test('game overlay opens on trigger click', async ({ page }) => {
    await page.goto('/');
    await page.click('#easterEggTrigger');
    await expect(page.locator('#gameOverlay')).toBeVisible();
  });

  test('game overlay closes on close button click', async ({ page }) => {
    await page.goto('/');
    await page.click('#easterEggTrigger');
    await page.click('#gameClose');
    await expect(page.locator('#gameOverlay')).toBeHidden();
  });

  test('score starts at zero', async ({ page }) => {
    await page.goto('/');
    await page.click('#easterEggTrigger');
    await expect(page.locator('#gameScore')).toHaveText('0');
  });
});