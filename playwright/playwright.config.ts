import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30000,
  retries: 2,
  expect: {
    timeout: 5000,
  },
  reporter: [['list'], ['html', { open: 'never' }]],
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:3000',
  },
  workers: 1,
  projects: [
    {
      name: 'Desktop Chromium',
      use: {
        browserName: 'chromium',
        headless: true, // Running the tests in non-headless mode
        // Launch options specifically for Chromium
        launchOptions: {
          slowMo: 1000, // Slows down Playwright operations by 100ms
        },
        baseURL: 'http://localhost:3000',
        viewport: { width: 1280, height: 720 },
        actionTimeout: 5000,
        video: 'retain-on-failure',
        screenshot: 'only-on-failure',
      },
    },
  ],
});
