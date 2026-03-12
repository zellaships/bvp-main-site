import { test, expect } from '@playwright/test';

test.describe('FAQ Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/faq');
  });

  test('displays FAQ page with sections', async ({ page }) => {
    await expect(page.getByText('Frequently Asked Questions')).toBeVisible();
    await expect(page.getByText('About BVP')).toBeVisible();
    await expect(page.getByText('Get Involved')).toBeVisible();
  });

  test('accordion expands when clicked', async ({ page }) => {
    // Find first question
    const firstQuestion = page.getByRole('button', { name: /What is Black Veterans Project/i });
    await expect(firstQuestion).toBeVisible();

    // Should be collapsed initially
    await expect(firstQuestion).toHaveAttribute('aria-expanded', 'false');

    // Click to expand
    await firstQuestion.click();

    // Should now be expanded
    await expect(firstQuestion).toHaveAttribute('aria-expanded', 'true');

    // Answer should be visible
    await expect(page.getByText(/first comprehensive reparative justice effort/i)).toBeVisible();
  });

  test('accordion collapses when clicked again', async ({ page }) => {
    const firstQuestion = page.getByRole('button', { name: /What is Black Veterans Project/i });

    // Expand
    await firstQuestion.click();
    await expect(firstQuestion).toHaveAttribute('aria-expanded', 'true');

    // Collapse
    await firstQuestion.click();
    await expect(firstQuestion).toHaveAttribute('aria-expanded', 'false');
  });

  test('only one item open per section', async ({ page }) => {
    // Open first question
    const firstQuestion = page.getByRole('button', { name: /What is Black Veterans Project/i });
    await firstQuestion.click();
    await expect(firstQuestion).toHaveAttribute('aria-expanded', 'true');

    // Open second question in same section
    const secondQuestion = page.getByRole('button', { name: /Is BVP a nonprofit/i });
    await secondQuestion.click();

    // First should close, second should open
    await expect(firstQuestion).toHaveAttribute('aria-expanded', 'false');
    await expect(secondQuestion).toHaveAttribute('aria-expanded', 'true');
  });

  test('FAQ has proper accessibility attributes', async ({ page }) => {
    const button = page.getByRole('button', { name: /What is Black Veterans Project/i });

    // Check ARIA attributes
    await expect(button).toHaveAttribute('aria-expanded');
    await expect(button).toHaveAttribute('aria-controls');
  });

  test('contact CTA link works', async ({ page }) => {
    await page.getByRole('link', { name: /Have More Questions/i }).click();
    await expect(page).toHaveURL('/contact');
  });

  test('internal links in FAQ answers work', async ({ page }) => {
    // Open question about governance
    await page.getByRole('button', { name: /How is BVP governed/i }).click();

    // Click the About page link in the answer
    await page.getByRole('link', { name: 'About page' }).click();
    await expect(page).toHaveURL('/about');
  });
});
