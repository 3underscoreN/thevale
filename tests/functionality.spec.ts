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
  await page.waitForResponse((response) => {
    return response.url().includes('/create') && response.status() === 200;
  });

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
  await page.waitForResponse((response) => {
    return response.url().includes('/create') && response.status() === 200;
  });

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

testwithdb('Can view new approved silent echoes with pagination', async ({ page, db }) => {
  /* 11 Test data */
  const echoData = new Array(11).fill(null).map(() => ({
    name: `E2E Test ${Math.floor(Math.random() * 1000)}`,
    content: `This is a test echo for silent echoes: ${Math.floor(Math.random() * 1000)}`,
  }));

  /* Insert and approve the echoes in the database */
  for (const data of echoData) {
    await db.insertAndApprove(data.name, data.content, 'silent');
  }

  /* Navigate to silent echoes page */
  await page.goto(`${process.env.BASE_URL ?? ''}/viewsilent`);

  /* Go to the second page */
  await page.getByTestId('pagination-next-page').click();
  /* Wait for the page to load */
  await page.waitForResponse((response) => {
    return response.url().includes('/api/fetchpost') && response.status() === 200;
  });

  /* Check if the first echo on the second page is displayed */
  const echoName = await page.getByText(echoData[0].name);
  expect(echoName).toBeTruthy();
  const echoElement = await page.getByText(echoData[0].content);
  expect(echoElement).toBeTruthy();

  /* Clean up the database */
  for (const data of echoData) {
    await db.cleanupByName(data.name, 'silent');
  }
});

testwithdb('Can view new approved starlight echoes with pagination', async ({ page, db }) => {
  /* 11 Test data */
  const echoData = new Array(11).fill(null).map(() => ({
    name: `E2E Test ${Math.floor(Math.random() * 1000)}`,
    content: `This is a test echo for starlight echoes: ${Math.floor(Math.random() * 1000)}`,
  }));

  /* Insert and approve the echoes in the database */
  for (const data of echoData) {
    await db.insertAndApprove(data.name, data.content, 'starlight');
  }

  /* Navigate to starlight echoes page */
  await page.goto(`${process.env.BASE_URL ?? ''}/viewstarlight`);

  /* Go to the second page */
  await page.getByTestId('pagination-next-page').click();
  /* Wait for the page to load */
  await page.waitForResponse((response) => {
    return response.url().includes('/api/fetchpost') && response.status() === 200;
  });

  /* Check if the first echo on the second page is displayed */
  const echoName = await page.getByText(echoData[0].name);
  expect(echoName).toBeTruthy();
  const echoElement = await page.getByText(echoData[0].content);
  expect(echoElement).toBeTruthy();

  /* Clean up the database */
  for (const data of echoData) {
    await db.cleanupByName(data.name, 'starlight');
  }
});

testwithdb('Newly created silent echoes have 0 replies', async ({ page, db }) => {
  /* Test data */
  const echoData = {
    name: `E2E Test ${Math.floor(Math.random() * 1000)}`,
    content: `This is a test echo for silent echoes: ${Math.floor(Math.random() * 1000)}`,
  };

  /* Insert and approve the echo in the database, whilst getting the ID */
  const result = await db.insertAndApprove(echoData.name, echoData.content, 'silent');
  const id = result[0].id;

  /* Navigate to silent echoes page */
  await page.goto(`${process.env.BASE_URL ?? ''}/viewsilent`);

  /* Wait for the page to load */
  await page.waitForLoadState('networkidle');

  /* Check if the reply count is displayed as "0" */
  const replyCountElement = await page.getByTestId(`reply-count-${id}`);
  expect(replyCountElement).toHaveText('0', { useInnerText: true });

  /* Clean up the database */
  await db.cleanupById(id, 'silent');
});

testwithdb('Reply count increases when a reply is added to silent echoes', async ({ page, db }) => {
  /* Test data */
  const echoData = {
    name: `E2E Test reply (comment) ${Math.floor(Math.random() * 1000)}`,
    content: `This is a test echo for silent echoes reply (comment): ${Math.floor(Math.random() * 1000)}`,
  };

  const replyData = {
    name: `E2E Test reply (comment) ${Math.floor(Math.random() * 1000)}`,
    content: `This is a test reply (comment) for silent echoes: ${Math.floor(Math.random() * 1000)}`,
  };

  /* Insert and approve the echo in the database, whilst getting the ID */
  const parentresult = await db.insertAndApprove(echoData.name, echoData.content, 'silent');
  const parentid = parentresult[0].id;

  /* Insert and approve the reply in the database */
  await db.insertReplyAndChangeToApprove(replyData.name, replyData.content, parentid, 'silent');

  /* Navigate to silent echoes page */
  await page.goto(`${process.env.BASE_URL ?? ''}/viewsilent`);

  /* Wait for the page to load */
  await page.waitForLoadState('networkidle');

  /* Check if the reply count is displayed as "1" */
  const replyCountElement = await page.getByTestId(`reply-count-${parentid}`);
  expect(replyCountElement).toHaveText('1', { useInnerText: true });

  /* Clean up the database */
  await db.cleanupById(parentid, 'silent');
});