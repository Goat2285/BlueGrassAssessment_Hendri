import { test, expect } from '@playwright/test';

// Helper function to navigate and assert URL
async function navigateAndVerifyUrl(page, role, name, expectedUrl, timeout = 10000) {
    await page.getByRole(role, { name }).click();
    await expect(page).toHaveURL(expectedUrl, { timeout });
}

// Reusable function to check visibility and content of text
async function verifyTextVisibility(page, textContent, timeout = 10000) {
    const textLocator = page.locator(`text=${textContent}`);
    await expect(textLocator).toBeVisible({ timeout });
}

test.describe('PositiveTests', () => {
  test('User can navigate to Sign In', async ({ page }) => {
    await page.goto('/dashboard');
    await navigateAndVerifyUrl(page, 'button', 'Navigate to Welcome Screen', '/welcome');
    await verifyTextVisibility(page, 'Welcome to');
    await navigateAndVerifyUrl(page, 'link', 'Sign In', '/login');
    await verifyTextVisibility(page, 'Please enter your details to continue.');
  });

  test('User can navigate with Get Started', async ({ page }) => {
    await page.goto('/dashboard');
    await navigateAndVerifyUrl(page, 'button', 'Navigate to Welcome Screen', '/welcome');
    await verifyTextVisibility(page, 'Welcome to');
    await navigateAndVerifyUrl(page, 'button', 'Get Started', '/auth/register');
    await verifyTextVisibility(page, 'Please enter all of your personal information below. These will be the details of the primary patient');
  });

  test('Welcome Image is present', async ({ page }) => {
    await page.goto('/dashboard');
    await navigateAndVerifyUrl(page, 'button', 'Navigate to Welcome Screen', '/welcome');
    await verifyTextVisibility(page, 'Welcome to');
    // Locator for the image based on the class and alt text
    const imageLocator = page.locator('img[alt="Man\'s head silhouette"]');
    await expect(imageLocator).toBeVisible({ timeout: 10000 }); // Timeout to allow image to load
    await expect(imageLocator).toHaveAttribute('src', '/assets/images/illustrations/illustration_empty_content.svg');
  });
});