import { test, expect } from '@playwright/test';

test.describe('Contact Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('displays contact form', async ({ page }) => {
    await expect(page.getByText('Contact Us')).toBeVisible();
    await expect(page.getByText('Send a Message')).toBeVisible();
    await expect(page.locator('#contact-firstName')).toBeVisible();
    await expect(page.locator('#contact-email')).toBeVisible();
  });

  test('displays contact info panel', async ({ page }) => {
    await expect(page.getByText('info@blackveteransproject.org')).toBeVisible();
    await expect(page.getByText('Instagram')).toBeVisible();
    await expect(page.getByText('Twitter / X')).toBeVisible();
    await expect(page.getByText('LinkedIn')).toBeVisible();
  });

  test('validates email before submission', async ({ page }) => {
    // Try to submit without email
    await page.getByRole('button', { name: /submit/i }).click();

    await expect(page.getByText('Email is required')).toBeVisible();
  });

  test('validates email format', async ({ page }) => {
    await page.locator('#contact-email').fill('not-an-email');
    await page.getByRole('button', { name: /submit/i }).click();

    await expect(page.getByText('Please enter a valid email')).toBeVisible();
  });

  test('topic dropdown works', async ({ page }) => {
    // Click to open dropdown
    await page.locator('#contact-topic').click();

    // Check options are visible
    await expect(page.getByText('Press Inquiry')).toBeVisible();
    await expect(page.getByText('Partnership Opportunity')).toBeVisible();
    await expect(page.getByText('Speaking Request')).toBeVisible();

    // Select an option
    await page.getByText('Press Inquiry').click();

    // Dropdown should close and show selected value
    await expect(page.locator('#contact-topic')).toHaveText('Press Inquiry');
  });

  test('successfully submits form', async ({ page }) => {
    await page.locator('#contact-firstName').fill('Jane');
    await page.locator('#contact-lastName').fill('Smith');
    await page.locator('#contact-email').fill('jane.smith@example.com');
    await page.locator('#contact-message').fill('Test message');

    await page.getByRole('button', { name: /submit/i }).click();

    // Should show success page
    await expect(page.getByText('Thank You')).toBeVisible({ timeout: 5000 });
    await expect(page.getByText("We've received your message")).toBeVisible();
  });
});
