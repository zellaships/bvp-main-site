import { test, expect, devices } from '@playwright/test';

test.describe('Mobile Navigation', () => {
  // Use mobile viewport for all tests
  test.use({ viewport: { width: 375, height: 667 } });

  test('hamburger menu button is visible on mobile', async ({ page }) => {
    await page.goto('/');

    const menuButton = page.locator('button[aria-label*="navigation menu"]');
    await expect(menuButton).toBeVisible();
  });

  test('desktop nav is hidden on mobile', async ({ page }) => {
    await page.goto('/');

    // Desktop nav should not be visible
    const desktopNav = page.locator('nav.hidden.lg\\:flex');
    await expect(desktopNav).not.toBeVisible();
  });

  test('mobile menu opens when hamburger clicked', async ({ page }) => {
    await page.goto('/');

    // Click hamburger menu
    const menuButton = page.locator('button[aria-label="Open navigation menu"]');
    await menuButton.click();

    // Mobile menu should be visible
    const mobileMenu = page.locator('#mobile-menu');
    await expect(mobileMenu).toBeVisible();

    // Navigation links should be visible
    await expect(page.getByRole('link', { name: 'About Us' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Our Work' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Join Us' })).toBeVisible();
  });

  test('mobile menu closes when X clicked', async ({ page }) => {
    await page.goto('/');

    // Open menu
    await page.locator('button[aria-label="Open navigation menu"]').click();
    await expect(page.locator('#mobile-menu')).toBeVisible();

    // Close menu
    await page.locator('button[aria-label="Close navigation menu"]').click();

    // Menu should be hidden
    await expect(page.locator('#mobile-menu')).not.toBeVisible();
  });

  test('mobile menu closes when link clicked', async ({ page }) => {
    await page.goto('/');

    // Open menu
    await page.locator('button[aria-label="Open navigation menu"]').click();
    await expect(page.locator('#mobile-menu')).toBeVisible();

    // Click a navigation link
    await page.getByRole('link', { name: 'About Us' }).click();

    // Should navigate and menu should close
    await expect(page).toHaveURL('/about');
    await expect(page.locator('#mobile-menu')).not.toBeVisible();
  });

  test('mobile menu shows dropdown children', async ({ page }) => {
    await page.goto('/');

    // Open menu
    await page.locator('button[aria-label="Open navigation menu"]').click();

    // Sub-navigation items should be visible
    await expect(page.getByRole('link', { name: 'Mission & Vision' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Our Team' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'The Case for Repair' })).toBeVisible();
  });

  test('mobile menu has accessible ARIA attributes', async ({ page }) => {
    await page.goto('/');

    const menuButton = page.locator('button[aria-label="Open navigation menu"]');

    // Before opening
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    await expect(menuButton).toHaveAttribute('aria-controls', 'mobile-menu');

    // After opening
    await menuButton.click();
    await expect(page.locator('button[aria-label="Close navigation menu"]')).toBeVisible();

    const mobileMenu = page.locator('#mobile-menu');
    await expect(mobileMenu).toHaveAttribute('role', 'dialog');
    await expect(mobileMenu).toHaveAttribute('aria-modal', 'true');
  });

  test('mobile menu closes on escape key', async ({ page }) => {
    await page.goto('/');

    // Open menu
    await page.locator('button[aria-label="Open navigation menu"]').click();
    await expect(page.locator('#mobile-menu')).toBeVisible();

    // Press Escape
    await page.keyboard.press('Escape');

    // Menu should close
    await expect(page.locator('#mobile-menu')).not.toBeVisible();
  });

  test('mobile donate button works', async ({ page }) => {
    await page.goto('/');

    // Open menu
    await page.locator('button[aria-label="Open navigation menu"]').click();

    // Click donate button in mobile menu
    await page.locator('#mobile-menu').getByRole('link', { name: 'Donate' }).click();

    // Should navigate to donate page
    await expect(page).toHaveURL('/donate');
  });

  test('backdrop closes menu when clicked', async ({ page }) => {
    await page.goto('/');

    // Open menu
    await page.locator('button[aria-label="Open navigation menu"]').click();
    await expect(page.locator('#mobile-menu')).toBeVisible();

    // Click on backdrop (outside menu)
    await page.locator('.fixed.inset-0.bg-black\\/40').click();

    // Menu should close
    await expect(page.locator('#mobile-menu')).not.toBeVisible();
  });
});
