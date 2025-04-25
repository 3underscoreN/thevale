import { test } from '@playwright/test';

import database from './cls/database';

type dbFixture = {
  db: database;
}

const extendedTest = test.extend<dbFixture>({
  db: async ({}, testUse) => {
    const db = new database();
    await testUse(db);
  }
});

export default extendedTest;