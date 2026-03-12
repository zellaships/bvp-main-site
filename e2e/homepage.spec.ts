import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('loads successfully with hero section', async ({ page }) => {
    // Check hero headline is visible
    await expect(page.locator('h1')).toContainText('Defend the Legacy');

    // Check CTA button is present
    await expect(page.getByRole('link', { name: /become a member/i })).toBeVisible();
  });

  test('hero CTA links to join page', async ({ page }) => {
    await page.getByRole('link', { name: /become a member/i }).click();
    await expect(page).toHaveURL('/join');
  });

  test('displays newsletter signup section', async ({ page }) => {
    await expect(page.getByText('Stay connected to the movement.')).toBeVisible();
    await expect(page.getByPlaceholder('First name')).toBeVisible();
    await expect(page.getByPlaceholder('Email address')).toBeVisible();
  });

  test('displays pillars section', async ({ page }) => {
    // Scroll down to see pillars
    await page.evaluate(() => window.scrollBy(0, 800));

    // Check for pillar content (adjust based on actual content)
    await expect(page.getByText(/litigation/i).first()).toBeVisible();
  });

  test('header navigation works', async ({ page }) => {
    // Click About link
    await page.getByRole('link', { name: /about/i }).first().click();
    await expect(page).toHaveURL('/about');
  });

  test('donate button is visible', async ({ page }) => {
    await expect(page.getByRole('link', { name: /donate/i }).first()).toBeVisible();
  });
});
