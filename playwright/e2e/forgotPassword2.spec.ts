import { test, expect } from '@playwright/test';

// Helper functions
async function gotoForgotPassword(page) {
  await page.goto('/dashboard');
  await page.getByRole('link', { name: 'Forgot password?' }).click();
  await expect(page).toHaveURL('/auth/forgotpassword');
}

async function fillAndSubmitEmail(page, email) {
  await page.getByRole('textbox', { name: 'Email address' }).fill(email);
  await page.getByRole('button', { name: 'Send' }).click();
}

test.describe('Forgot Password Flow', () => {
  test.beforeEach(async ({ page }) => {
    await gotoForgotPassword(page);
  });

  test('allows user to use forgot password link', async ({ page }) => {
    // Intercept the API call that sends the forgot password email.
    // Adjust the route pattern if your endpoint is different.
    await page.route('**/api/Account/ForgotPassword', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          message: "Email sent successfully"
        }),
      });
    });

    await fillAndSubmitEmail(page, 'testuser@bg.com');

    // After submitting the email, the UI should transition to the success view.
    // We then assert that the success message is visible.
    await expect(page.locator('text=Request sent successfully!')).toBeVisible({ timeout: 5000 });
    
  });

  test.describe('Negative Tests', () => {
    test('rejects empty email input', async ({ page }) => {
      await fillAndSubmitEmail(page, '');
      await expect(page.locator('text=Email is required')).toBeVisible();
    });

    test('rejects incorrect email format', async ({ page }) => {
      await fillAndSubmitEmail(page, 'invalid_email');
      await expect(page.locator('text=Email must be a valid email address')).toBeVisible();
    });
  });
});
