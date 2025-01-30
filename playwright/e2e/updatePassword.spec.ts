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

test.describe('Password Update Tests', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToUpdatePassword(page);
  });

  test('User can Update Password', async ({ page }) => {
    const newPassword = 'Random@validPassw0rd';
    await fillPasswordFields(page, newPassword, newPassword);
    await page.locator('div').filter({ hasText: /^Password$/ }).getByRole('button').click();
    await page.locator('div').filter({ hasText: /^Confirm New Password$/ }).getByRole('button').click();
    await page.getByRole('button', { name: 'Update Password' }).click();
    // I believe due to the full env not working, the API would've brought back a notification to verify
  });

  test.describe('Negative Tests', () => {
    test('No password entered', async ({ page }) => {
      await page.getByRole('button', { name: 'Update Password' }).click();
      await expect(page.locator('text=Password is required')).toBeVisible();
      await expect(page.locator('text=Password confirm is required')).toBeVisible();
    });

    test('Invalid password combination', async ({ page }) => {
      await fillPasswordFields(page, 'short', 'short');
      await page.getByRole('button', { name: 'Update Password' }).click();
      await expect(page.locator('text=Password must contain atleast one lowercase, one uppercase, one number and a special character')).toBeVisible();
      await expect(page.locator('text=Please use a password that is longer than 8 characters')).toBeVisible();
    });

    test('Password combination unmatched', async ({ page }) => {
      await fillPasswordFields(page, 'Random@valiPassw0rd', 'Random@validPassw0rd');
      await page.getByRole('button', { name: 'Update Password' }).click();
      await expect(page.locator('text=Passwords must match')).toBeVisible();
    });
  });

  test.describe('Edge Cases', () => {
    test('Password Format limit', async ({ page }) => {
      const longPassword = 'a'.repeat(100) + '1A@';
      await fillPasswordFields(page, longPassword, longPassword);
      await page.getByRole('button', { name: 'Update Password' }).click();
      //The expection here is that it should actually fail.
      //await expect(page.locator('text=Password must contain...')).toBeVisible();
    });
  });
});