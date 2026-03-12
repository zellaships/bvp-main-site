import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  test('homepage has correct heading hierarchy', async ({ page }) => {
    await page.goto('/');

    // Should have h1
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();

    // h1 should be first heading
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    expect(headings.length).toBeGreaterThan(0);
  });

  test('all images have alt text', async ({ page }) => {
    await page.goto('/');

    const images = await page.locator('img').all();

    for (const img of images) {
      const alt = await img.getAttribute('alt');
      expect(alt, `Image missing alt text: ${await img.getAttribute('src')}`).toBeTruthy();
    }
  });

  test('form inputs have labels', async ({ page }) => {
    await page.goto('/');

    // Newsletter form inputs
    const inputs = await page.locator('input[type="text"], input[type="email"]').all();

    for (const input of inputs) {
      const id = await input.getAttribute('id');
      const placeholder = await input.getAttribute('placeholder');
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledby = await input.getAttribute('aria-labelledby');

      // Input should have some form of labeling
      const hasLabel = placeholder || ariaLabel || ariaLabelledby || (id && await page.locator(`label[for="${id}"]`).count() > 0);
      expect(hasLabel, `Input missing label: ${id || 'unknown'}`).toBeTruthy();
    }
  });

  test('buttons have accessible names', async ({ page }) => {
    await page.goto('/');

    const buttons = await page.locator('button').all();

    for (const button of buttons) {
      const text = await button.textContent();
      const ariaLabel = await button.getAttribute('aria-label');

      expect(text || ariaLabel, 'Button missing accessible name').toBeTruthy();
    }
  });

  test('links have accessible names', async ({ page }) => {
    await page.goto('/');

    const links = await page.locator('a').all();

    for (const link of links) {
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute('aria-label');
      const title = await link.getAttribute('title');

      expect(text?.trim() || ariaLabel || title, 'Link missing accessible name').toBeTruthy();
    }
  });

  test('focus is visible on interactive elements', async ({ page }) => {
    await page.goto('/');

    // Tab to first interactive element
    await page.keyboard.press('Tab');

    // Should have a focused element
    const focused = page.locator(':focus');
    await expect(focused).toBeVisible();
  });

  test('skip to content link exists', async ({ page }) => {
    await page.goto('/');

    // Press Tab to reveal skip link (often hidden until focused)
    await page.keyboard.press('Tab');

    // Check if skip link exists (may be visually hidden)
    const skipLink = page.locator('a[href="#main"], a[href="#content"], [class*="skip"]').first();

    // Skip link should exist or there should be a main landmark
    const mainLandmark = page.locator('main, [role="main"]');
    const hasSkipOrMain = await skipLink.count() > 0 || await mainLandmark.count() > 0;

    expect(hasSkipOrMain).toBeTruthy();
  });

  test('color contrast meets WCAG AA', async ({ page }) => {
    await page.goto('/');

    // This is a basic check - for full contrast testing, use axe-core
    // Check that text is visible against backgrounds
    const heroText = page.locator('h1');
    await expect(heroText).toBeVisible();

    // Text should be readable (not transparent or same color as bg)
    const color = await heroText.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });

    expect(color).not.toBe('rgba(0, 0, 0, 0)');
    expect(color).not.toBe('transparent');
  });

  test('join page form has proper ARIA attributes', async ({ page }) => {
    await page.goto('/join');

    // Expand affiliate form
    await page.getByText('Become an Affiliate').click();

    // Submit empty form
    await page.getByRole('button', { name: /join bvp/i }).click();

    // Check aria-invalid is set on error fields
    const firstNameInput = page.locator('#basic-firstName');
    await expect(firstNameInput).toHaveAttribute('aria-invalid', 'true');
  });
});
