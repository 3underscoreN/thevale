import { test, expect } from '@playwright/test';

test('Can navigate to "silent mountain" page', async ({ page }) => {
  await page.goto(`${process.env.BASE_URL ?? ''}/`);

  await page.getByTestId('silent').click();

  await expect(page).toHaveURL(/viewsilent/);
});