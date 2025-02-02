import { test, expect } from '@playwright/test';

const navigateToUpdatePassword = async (page) => {
  await page.goto('/dashboard');
  await page.getByRole('button', { name: 'Navigate to Update Password' }).click();
  await expect(page).toHaveURL('/auth/updatepassword');
};

const fillPasswordFields = async (page, password, confirmPassword) => {
  // Click before filling if the UI requires it
  const passwordField = page.getByRole('textbox', { name: 'Password', exact: true });
  const confirmPasswordField = page.getByRole('textbox', { name: 'Confirm New Password' });

  await passwordField.click();
  await passwordField.fill(password);
  
  await confirmPasswordField.click();
  await confirmPasswordField.fill(confirmPassword);
};

// Helper to mock the update password API response
const mockUpdatePasswordResponse = async (page, responseBody, status = 200) => {
  await page.route('/api/auth/updatepassword', async (route) => {
    await route.fulfill({
      status,
      contentType: 'application/json',
      body: JSON.stringify(responseBody),
    });
  });
};

test.describe('Password Update Tests', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToUpdatePassword(page);
  });

  test('User can Update Password', async ({ page }) => {
    // Simulate a successful password update API response.
    await mockUpdatePasswordResponse(page, {
      success: true,
      message: 'Password updated successfully'
    });

    const newPassword = 'Random@validPassw0rd';
    await fillPasswordFields(page, newPassword, newPassword);
    await page.locator('div').filter({ hasText: /^Password$/ }).getByRole('button').click();
    await page.locator('div').filter({ hasText: /^Confirm New Password$/ }).getByRole('button').click();
    await page.getByRole('button', { name: 'Update Password' }).click();
    
  });

  test.describe('Negative Tests', () => {
    test('No password entered', async ({ page }) => {
      // Expect client-side validations to trigger.
      await page.getByRole('button', { name: 'Update Password' }).click();
      await expect(page.locator('text=Password is required')).toBeVisible();
      await expect(page.locator('text=Password confirm is required')).toBeVisible();
    });

    test('Invalid password combination', async ({ page }) => {
      // Enter a weak password; UI validations should catch this.
      await fillPasswordFields(page, 'short', 'short');
      await page.getByRole('button', { name: 'Update Password' }).click();
      await expect(page.locator('text=Password must contain atleast one lowercase, one uppercase, one number and a special character')).toBeVisible();
      await expect(page.locator('text=Please use a password that is longer than 8 characters')).toBeVisible();
    });

    test('Password combination unmatched', async ({ page }) => {
      // Enter two different passwords to trigger the "must match" error.
      await fillPasswordFields(page, 'Random@valiPassw0rd', 'Random@validPassw0rd');
      await page.getByRole('button', { name: 'Update Password' }).click();
      await expect(page.locator('text=Passwords must match')).toBeVisible();
    });
  });

  test.describe('Edge Cases', () => {
    test('Password Format limit', async ({ page }) => {
      // For this edge case, simulate a failure response from the API.
      await mockUpdatePasswordResponse(page, {
        success: false,
        message: 'Password format is not acceptable'
      }, 400);

      const longPassword = 'a'.repeat(100) + '1A@';
      await fillPasswordFields(page, longPassword, longPassword);
      await page.getByRole('button', { name: 'Update Password' }).click();
      await expect(page.locator('text=Password format is not acceptable')).toBeVisible();
    });
  });

  test('Displays error when password update fails', async ({ page }) => {
    // Navigate to the update password page.
    await page.goto('/dashboard');
    await page.getByRole('button', { name: 'Navigate to Update Password' }).click();
    await expect(page).toHaveURL('/auth/updatepassword');
  
    // Intercept the API call to UpdatePasswordWithToken and return an error response.
    await page.route('**/api/Account/UpdatePasswordWithToken', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({
          success: false,
          message: 'Error, password not created!'
        }),
      });
    });
  
    // Fill in the password fields.
    const newPassword = 'Random@validPassw0rd';
    await page.getByRole('textbox', { name: 'Password', exact: true }).fill(newPassword);
    await page.getByRole('textbox', { name: 'Confirm New Password' }).fill(newPassword);
  
    // Click the "Update Password" button.
    await page.getByRole('button', { name: 'Update Password' }).click();
    await page.getByRole('button', { name: 'Update Password' }).click();

    await expect(page.getByText('An error has occured while').nth(1)).toBeVisible();
    
  });
});
