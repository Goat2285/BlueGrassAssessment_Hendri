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
        await fillAndSubmitEmail(page, 'testuser@bg.com');
        // Assume there's a success message or redirection to confirm email was sent
        // Example: await expect(page).toHaveText('Check your email');
    });

    test('allows user to navigate back to dashboard', async ({ page }) => {
        await page.getByRole('button', { name: 'Back' }).click();
        await expect(page).toHaveURL('/login');
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
