import { test, expect } from '@playwright/test';

test.describe('Newsletter Signup', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('shows validation errors for empty form', async ({ page }) => {
    // Click subscribe without filling form
    await page.getByRole('button', { name: /subscribe/i }).click();

    // Check for validation errors
    await expect(page.getByText('First name is required')).toBeVisible();
    await expect(page.getByText('Last name is required')).toBeVisible();
    await expect(page.getByText('Email is required')).toBeVisible();
  });

  test('shows email validation error for invalid email', async ({ page }) => {
    await page.getByPlaceholder('First name').fill('John');
    await page.getByPlaceholder('Last name').fill('Doe');
    await page.getByPlaceholder('Email address').fill('not-an-email');

    await page.getByRole('button', { name: /subscribe/i }).click();

    await expect(page.getByText('Please enter a valid email')).toBeVisible();
  });

  test('clears errors when user starts typing', async ({ page }) => {
    // Trigger errors
    await page.getByRole('button', { name: /subscribe/i }).click();
    await expect(page.getByText('First name is required')).toBeVisible();

    // Start typing
    await page.getByPlaceholder('First name').fill('J');

    // Error should disappear
    await expect(page.getByText('First name is required')).not.toBeVisible();
  });

  test('successfully submits with valid data', async ({ page }) => {
    await page.getByPlaceholder('First name').fill('John');
    await page.getByPlaceholder('Last name').fill('Doe');
    await page.getByPlaceholder('Email address').fill('john.doe@example.com');
    await page.getByPlaceholder('Zip code').fill('12345');

    await page.getByRole('button', { name: /subscribe/i }).click();

    // Should show loading state
    await expect(page.getByRole('button', { name: /subscribing/i })).toBeVisible();

    // Should show success
    await expect(page.getByRole('button', { name: /subscribed/i })).toBeVisible({ timeout: 5000 });
  });

  test('substack checkbox toggles', async ({ page }) => {
    const checkbox = page.getByRole('checkbox');

    // Initially unchecked
    await expect(checkbox).not.toBeChecked();

    // Click to check
    await checkbox.click();
    await expect(checkbox).toBeChecked();

    // Click to uncheck
    await checkbox.click();
    await expect(checkbox).not.toBeChecked();
  });
});
