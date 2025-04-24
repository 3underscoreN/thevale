import { test, expect } from '@playwright/test';

test('Can navigate to "create echoes" page', async ({ page }) => {
  await page.goto(`${process.env.BASE_URL ?? ''}/`);

  await page.getByTestId('create').click();

  await expect(page).toHaveURL(/create/);
});

test('Can navigate to "silent echoes" page', async ({ page }) => {
  await page.goto(`${process.env.BASE_URL ?? ''}/`);

  await page.getByTestId('silent').click();

  await expect(page).toHaveURL(/viewsilent/);
});

test('Can navigate to "starlight echoes" page', async ({ page }) => {
  await page.goto(`${process.env.BASE_URL ?? ''}/`);

  await page.getByTestId('starlight').click();

  await expect(page).toHaveURL(/viewstarlight/);
});