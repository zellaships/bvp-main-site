import { test, expect } from '@playwright/test';

test.describe('Page Content Verification', () => {

  test.describe('Homepage', () => {
    test('has correct meta title', async ({ page }) => {
      await page.goto('/');
      await expect(page).toHaveTitle(/Black Veterans Project/i);
    });

    test('displays hero headline', async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('h1')).toBeVisible();
    });

    test('displays pillars section', async ({ page }) => {
      await page.goto('/');
      await expect(page.getByText('Case for Repair').first()).toBeVisible();
    });
  });

  test.describe('About Page', () => {
    test('loads with correct content', async ({ page }) => {
      await page.goto('/about');
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    });

    test('has mission section', async ({ page }) => {
      await page.goto('/about');
      // Navigate to mission anchor
      await page.goto('/about#mission');
      await expect(page.getByText(/mission/i).first()).toBeVisible();
    });

    test('has team/founders section', async ({ page }) => {
      await page.goto('/about');
      await expect(page.getByText(/founder|team/i).first()).toBeVisible();
    });
  });

  test.describe('Our Work Page', () => {
    test('loads with correct content', async ({ page }) => {
      await page.goto('/our-work');
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    });

    test('displays work pillars', async ({ page }) => {
      await page.goto('/our-work');
      // Check for at least one pillar
      await expect(page.getByText(/litigation|narrative|mobilization/i).first()).toBeVisible();
    });
  });

  test.describe('Join Page', () => {
    test('loads with correct content', async ({ page }) => {
      await page.goto('/join');
      await expect(page.getByText('Join the Movement')).toBeVisible();
    });

    test('displays membership options', async ({ page }) => {
      await page.goto('/join');
      await expect(page.getByText('Affiliate')).toBeVisible();
      await expect(page.getByText('Advocate')).toBeVisible();
    });

    test('affiliate form expands', async ({ page }) => {
      await page.goto('/join');
      await page.getByText('Become an Affiliate').click();
      await expect(page.locator('#basic-firstName')).toBeVisible();
    });
  });

  test.describe('Donate Page', () => {
    test('loads with correct content', async ({ page }) => {
      await page.goto('/donate');
      await expect(page.getByText(/donate|support/i).first()).toBeVisible();
    });
  });

  test.describe('Contact Page', () => {
    test('loads with form', async ({ page }) => {
      await page.goto('/contact');
      await expect(page.getByText('Contact Us')).toBeVisible();
      await expect(page.locator('form')).toBeVisible();
    });

    test('displays contact info', async ({ page }) => {
      await page.goto('/contact');
      await expect(page.getByText(/info@blackveteransproject\.org/i)).toBeVisible();
    });
  });

  test.describe('FAQ Page', () => {
    test('loads with questions', async ({ page }) => {
      await page.goto('/faq');
      await expect(page.getByText('Frequently Asked Questions')).toBeVisible();
    });

    test('has accordion items', async ({ page }) => {
      await page.goto('/faq');
      const accordionButtons = page.locator('[aria-expanded]');
      expect(await accordionButtons.count()).toBeGreaterThan(0);
    });
  });

  test.describe('Press Page', () => {
    test('loads with content', async ({ page }) => {
      await page.goto('/press');
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    });
  });

  test.describe('Financials Page', () => {
    test('loads with content', async ({ page }) => {
      await page.goto('/financials');
      await expect(page.getByText(/financial|990/i).first()).toBeVisible();
    });
  });

  test.describe('Privacy Page', () => {
    test('loads with policy content', async ({ page }) => {
      await page.goto('/privacy');
      await expect(page.getByText(/privacy/i).first()).toBeVisible();
    });
  });

  test.describe('Terms Page', () => {
    test('loads with terms content', async ({ page }) => {
      await page.goto('/terms');
      await expect(page.getByText(/terms/i).first()).toBeVisible();
    });
  });

  test.describe('Accessibility Page', () => {
    test('loads with accessibility content', async ({ page }) => {
      await page.goto('/accessibility');
      await expect(page.getByText(/accessibility/i).first()).toBeVisible();
    });
  });

  test.describe('Error Handling', () => {
    test('404 page works for invalid routes', async ({ page }) => {
      const response = await page.goto('/this-page-does-not-exist-12345');
      // Should either return 404 or redirect to custom 404 page
      expect([404, 200].includes(response?.status() ?? 0)).toBeTruthy();
    });
  });

  test.describe('SEO Essentials', () => {
    const pages = ['/', '/about', '/our-work', '/join', '/contact', '/faq', '/donate'];

    for (const path of pages) {
      test(`${path} has meta description`, async ({ page }) => {
        await page.goto(path);
        const metaDesc = page.locator('meta[name="description"]');
        const content = await metaDesc.getAttribute('content');
        expect(content).toBeTruthy();
        expect(content?.length).toBeGreaterThan(10);
      });

      test(`${path} has Open Graph tags`, async ({ page }) => {
        await page.goto(path);
        const ogTitle = page.locator('meta[property="og:title"]');
        await expect(ogTitle).toHaveAttribute('content', /.+/);
      });
    }
  });
});
