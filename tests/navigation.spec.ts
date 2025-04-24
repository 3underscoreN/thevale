import { test, expect } from '@playwright/test';

test('Has valid title', async ({ page }) => {
  await page.goto(`${process.env.BASE_URL}/`);

  // Title should at least contain "The Vale" and "山谷"
  await expect(page).toHaveTitle(/山谷/);
  await expect(page).toHaveTitle(/The Vale/);
});

