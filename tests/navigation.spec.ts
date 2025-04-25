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

test('Can navigate to "about" page', async ({ page }) => {
  await page.goto(`${process.env.BASE_URL ?? ''}/`);

  await page.getByTestId('about').click();

  await expect(page).toHaveURL(/about/);
});

test('Can navigate to "privacy" page', async ({ page }) => {
  await page.goto(`${process.env.BASE_URL ?? ''}/`);

  await page.getByTestId('privacy').click();

  await expect(page).toHaveURL(/privacy/);
});