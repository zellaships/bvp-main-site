import { test, expect } from '@playwright/test';

test.describe('Join Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/join');
  });

  test('displays membership options', async ({ page }) => {
    await expect(page.getByText('Join Our Movement')).toBeVisible();
    await expect(page.getByText('Affiliate')).toBeVisible();
    await expect(page.getByText('Advocate')).toBeVisible();
  });

  test('affiliate card expands on click', async ({ page }) => {
    // Click affiliate card
    await page.getByText('Become an Affiliate').click();

    // Form should be visible
    await expect(page.locator('#basic-firstName')).toBeVisible();
    await expect(page.locator('#basic-email')).toBeVisible();
  });

  test('affiliate form validates required fields', async ({ page }) => {
    // Expand affiliate card
    await page.getByText('Become an Affiliate').click();

    // Wait for form to be visible
    await expect(page.locator('#basic-firstName')).toBeVisible();

    // Submit without filling
    await page.getByRole('button', { name: /join bvp/i }).click();

    // Check for validation errors
    await expect(page.getByText('First name is required')).toBeVisible();
    await expect(page.getByText('Last name is required')).toBeVisible();
    await expect(page.getByText('Email is required')).toBeVisible();
  });

  test('navigate to advocate form', async ({ page }) => {
    await page.getByText('Become an Advocate').click();

    // Should show advocate form
    await expect(page.getByText('Become an Advocate')).toBeVisible();
    await expect(page.getByText('Contact Information')).toBeVisible();
    await expect(page.getByText('Back to membership options')).toBeVisible();
  });

  test('advocate form has all sections', async ({ page }) => {
    await page.getByText('Become an Advocate').click();

    // Check for form sections
    await expect(page.getByText('Contact Information')).toBeVisible();
    await expect(page.locator('#adv-firstName')).toBeVisible();
    await expect(page.locator('#adv-email')).toBeVisible();
  });

  test('back button returns to membership options', async ({ page }) => {
    // Go to advocate form
    await page.getByText('Become an Advocate').click();
    await expect(page.getByText('Contact Information')).toBeVisible();

    // Click back
    await page.getByText('Back to membership options').click();

    // Should show membership cards again
    await expect(page.getByText('Membership Categories')).toBeVisible();
  });
});
