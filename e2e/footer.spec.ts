import { test, expect } from '@playwright/test';

test.describe('Footer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('displays all footer sections', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // Check section headings
    await expect(footer.getByText('About Us', { exact: true })).toBeVisible();
    await expect(footer.getByText('Our Work', { exact: true })).toBeVisible();
    await expect(footer.getByText('Resources', { exact: true })).toBeVisible();
    await expect(footer.getByText('Take Action', { exact: true })).toBeVisible();
  });

  test('About Us links work', async ({ page }) => {
    const footer = page.locator('footer');

    // Check links exist
    await expect(footer.getByRole('link', { name: 'Mission & Vision' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'Our Team' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'Partners' })).toBeVisible();

    // Click a link
    await footer.getByRole('link', { name: 'Mission & Vision' }).click();
    await expect(page).toHaveURL(/\/about/);
  });

  test('Our Work links work', async ({ page }) => {
    const footer = page.locator('footer');

    // Check links exist
    await expect(footer.getByRole('link', { name: 'The Case for Repair' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'Impact Litigation' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'Narrative Hub' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'Mobilization' })).toBeVisible();

    // Click a link
    await footer.getByRole('link', { name: 'Impact Litigation' }).click();
    await expect(page).toHaveURL(/\/our-work/);
  });

  test('Resources links work', async ({ page }) => {
    const footer = page.locator('footer');

    // Check links exist
    await expect(footer.getByRole('link', { name: 'FAQ' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'Archived Press' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'Financials & 990' })).toBeVisible();

    // Click FAQ link
    await footer.getByRole('link', { name: 'FAQ' }).click();
    await expect(page).toHaveURL('/faq');
  });

  test('Take Action links work', async ({ page }) => {
    const footer = page.locator('footer');

    // Check links exist
    await expect(footer.getByRole('link', { name: 'Donate' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'Become a Member' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'Contact' })).toBeVisible();

    // Click Contact link
    await footer.getByRole('link', { name: 'Contact' }).click();
    await expect(page).toHaveURL('/contact');
  });

  test('legal links are present', async ({ page }) => {
    const footer = page.locator('footer');

    await expect(footer.getByRole('link', { name: 'Privacy' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'Terms' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'Accessibility' })).toBeVisible();
  });

  test('Privacy link navigates correctly', async ({ page }) => {
    await page.locator('footer').getByRole('link', { name: 'Privacy' }).click();
    await expect(page).toHaveURL('/privacy');
  });

  test('Terms link navigates correctly', async ({ page }) => {
    await page.locator('footer').getByRole('link', { name: 'Terms' }).click();
    await expect(page).toHaveURL('/terms');
  });

  test('Accessibility link navigates correctly', async ({ page }) => {
    await page.locator('footer').getByRole('link', { name: 'Accessibility' }).click();
    await expect(page).toHaveURL('/accessibility');
  });

  test('social media links exist with proper labels', async ({ page }) => {
    const footer = page.locator('footer');

    // Check social links have accessible labels
    await expect(footer.getByRole('link', { name: /Twitter|X/ })).toBeVisible();
    await expect(footer.getByRole('link', { name: /Instagram/ })).toBeVisible();
    await expect(footer.getByRole('link', { name: /Facebook/ })).toBeVisible();
    await expect(footer.getByRole('link', { name: /LinkedIn/ })).toBeVisible();
    await expect(footer.getByRole('link', { name: /YouTube/ })).toBeVisible();
    await expect(footer.getByRole('link', { name: /Substack/ })).toBeVisible();
  });

  test('social links open in new tab', async ({ page }) => {
    const footer = page.locator('footer');

    const twitterLink = footer.getByRole('link', { name: /Twitter|X/ });
    await expect(twitterLink).toHaveAttribute('target', '_blank');
    await expect(twitterLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('Candid (nonprofit transparency) link exists', async ({ page }) => {
    const footer = page.locator('footer');

    const candidLink = footer.getByRole('link', { name: /Candid/ });
    await expect(candidLink).toBeVisible();
    await expect(candidLink).toHaveAttribute('target', '_blank');
    await expect(candidLink).toHaveAttribute('href', /candid\.org/);
  });

  test('copyright displays current year', async ({ page }) => {
    const currentYear = new Date().getFullYear().toString();
    const footer = page.locator('footer');

    await expect(footer.getByText(new RegExp(`© ${currentYear}`))).toBeVisible();
  });

  test('site search exists in footer', async ({ page }) => {
    const footer = page.locator('footer');

    const searchInput = footer.locator('input[type="search"]');
    await expect(searchInput).toBeVisible();
    await expect(searchInput).toHaveAttribute('placeholder', /Search/i);
  });

  test('BVP logo is present in footer', async ({ page }) => {
    const footer = page.locator('footer');

    const logo = footer.locator('img[alt="Black Veterans Project"]');
    await expect(logo).toBeVisible();
  });
});
