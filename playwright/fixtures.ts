import { test as base } from '@playwright/test';

import { HomePage } from './e2e/pages/HomePage';

type CustomFixtures = {
  homePage: HomePage;
};

export const test = base.extend<CustomFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await page.waitForURL(`**/${process.env.NEXT_PUBLIC_BASE_URL}/**`);
    await use(homePage);
  },
  contextOptions: async ({ baseURL }, use) => {
    await use({ baseURL });
  }
});

export * from '@playwright/test';
