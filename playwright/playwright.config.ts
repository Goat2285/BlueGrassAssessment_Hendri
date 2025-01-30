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
    url: 'http://127.0.0.1:3000',
  },
  projects: [
    {
      name: 'Desktop Chromium',
      use: {
        browserName: 'chromium',
        headless: false, // Running the tests in non-headless mode
        // Launch options specifically for Chromium
        launchOptions: {
          slowMo: 1000, // Slows down Playwright operations by 100ms
        },
        baseURL: 'http://127.0.0.1:3000',
        viewport: { width: 1280, height: 720 },
        actionTimeout: 5000,
        video: 'retain-on-failure',
        screenshot: 'only-on-failure',
      },
    },
  ],
});
