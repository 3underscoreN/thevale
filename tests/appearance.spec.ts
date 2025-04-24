import { test, expect } from '@playwright/test';

test('Has valid title', async ({ page }) => {
  await page.goto(`${process.env.BASE_URL ?? ''}/`);

  // Title should at least contain "The Vale" and "山谷"
  await expect(page).toHaveTitle(/山谷/);
  await expect(page).toHaveTitle(/The Vale/);
});

test('Has headings', async ({ page }) => {
  await page.goto(`${process.env.BASE_URL ?? ''}/`);

  // Check for the presence of headings
  const heading1 = page.locator('h1');
  const heading2 = page.locator('h2');

  await expect(heading1).toHaveText(/山谷/);
  await expect(heading2).toHaveText(/有甚麼想說的嗎？/);

  
  await expect(heading1).toBeVisible();
  await expect(heading2).toBeVisible();
});

