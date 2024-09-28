import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './playwright/e2e',
  fullyParallel: true,
  forbidOnly: true,
  retries: 2,
  workers: 1,
  /* See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['json', { outputFile: 'results.json', outputDir: 'results' }],
  ],
  use: {
    ignoreHTTPSErrors: true,
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    trace: 'on-first-retry',
  },
  projects: [
    /* Test setup */
    // { name: 'setup', testMatch: /.*\.setup\.ts/ },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      // dependencies: ['setup'],
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      // dependencies: ['setup'],
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      // dependencies: ['setup'],
    },
  ],

  /* Only used in local dev environment */
  ...(process.env.NODE_ENV === 'development' && { 
    webServer: {
      command: 'pnpm dev',
      reuseExistingServer: false,
      stdout: 'ignore',
      stderr: 'pipe',
      port: 3000,
    }
  }),

});
