import testwithdb from './fixtures/test_db';
import { expect } from '@playwright/test';

testwithdb('Can create echo to silent echoes', async ({ page, db }) => {
  /* Test data */
  const echoData = {
    name: `E2E Test ${Math.floor(Math.random() * 1000)}`,
    content: `This is a test echo for silent echoes: ${Math.floor(Math.random() * 1000)}`,
  };

  /* Navigate to create page */
  await page.goto(`${process.env.BASE_URL ?? ''}/create`);

  /* Fill in name */
  await page.getByTestId('name').fill(echoData.name);

  /* Choose "silent" category */
  await page.getByTestId('cat-silent').check();

  /* Fill in content */
  await page.getByTestId('content').fill(echoData.content);

  /* Submit the form */
  await page.getByTestId('submit-button').click();
  
  /* Wait until the request is sent */
  await page.waitForTimeout(1000);

  /* Check if the latest pending echo in the database matches the input */
  const result = await db.checkByName(echoData.name, 'silent');
  expect(result[0].name).toBe(echoData.name);
  expect(result[0].content).toBe(echoData.content);
  expect(result[0].status).toBe('pending');

  /* Clean up the database */
  await db.cleanupByName(echoData.name, 'silent');
});

testwithdb('Can create echo to starlight echoes', async ({ page, db }) => {
  /* Test data */
  const echoData = {
    name: `E2E Test ${Math.floor(Math.random() * 1000)}`,
    content: `This is a test echo for starlight echoes: ${Math.floor(Math.random() * 1000)}`,
  };

  /* Navigate to create page */
  await page.goto(`${process.env.BASE_URL ?? ''}/create`);

  /* Fill in name */
  await page.getByTestId('name').fill(echoData.name);

  /* Choose "starlight" category */
  await page.getByTestId('cat-starlight').check();

  /* Fill in content */
  await page.getByTestId('content').fill(echoData.content);

  /* Submit the form */
  await page.getByTestId('submit-button').click();
  
  /* Wait until the request is sent */
  await page.waitForTimeout(1000);

  /* Check if the latest pending echo in the database matches the input */
  const result = await db.checkByName(echoData.name, 'starlight');
  expect(result[0].name).toBe(echoData.name);
  expect(result[0].content).toBe(echoData.content);
  expect(result[0].status).toBe('pending');
  
  /* Clean up the database */
  await db.cleanupByName(echoData.name, 'starlight');
});

testwithdb('Can view new approved silent echoes', async ({ page, db }) => {
  /* Test data */
  const echoData = {
    name: `E2E Test ${Math.floor(Math.random() * 1000)}`,
    content: `This is a test echo for silent echoes: ${Math.floor(Math.random() * 1000)}`,
  };

  /* Insert and approve the echo in the database */
  await db.insertAndApprove(echoData.name, echoData.content, 'silent');

  /* Navigate to silent echoes page */
  await page.goto(`${process.env.BASE_URL ?? ''}/viewsilent`);

  /* Check if the echo is displayed */
  const echoElement = await page.getByText(echoData.content);
  expect(echoElement).toBeTruthy();

  /* Clean up the database */
  await db.cleanupByName(echoData.name, 'silent');
});

testwithdb('Can view new approved starlight echoes', async ({ page, db }) => {
  /* Test data */
  const echoData = {
    name: `E2E Test ${Math.floor(Math.random() * 1000)}`,
    content: `This is a test echo for starlight echoes: ${Math.floor(Math.random() * 1000)}`,
  };

  /* Insert and approve the echo in the database */
  await db.insertAndApprove(echoData.name, echoData.content, 'starlight');

  /* Navigate to starlight echoes page */
  await page.goto(`${process.env.BASE_URL ?? ''}/viewstarlight`);

  /* Check if the echo is displayed */
  const echoElement = await page.getByText(echoData.content);
  expect(echoElement).toBeTruthy();

  /* Clean up the database */
  await db.cleanupByName(echoData.name, 'starlight');
});

