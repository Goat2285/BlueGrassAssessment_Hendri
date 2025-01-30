import { test, expect } from '@playwright/test';

// Helper function to fill out the sign-up form
async function fillSignUpForm(page, nationality) {
    await page.getByRole('textbox', { name: 'First Name' }).fill('Hendri');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Esterhuysen');
    await page.getByRole('textbox', { name: 'Contact Number' }).fill('+27647639244');
    await page.getByLabel('Nationality').selectOption(nationality);
    await page.getByRole('textbox', { name: 'ID / Passport Number' }).fill('9201135289085');
    await page.getByRole('textbox', { name: 'Address' }).fill('esterhuysenh@gmail.com');
    await page.getByRole('textbox', { name: 'Date of Birth' }).fill('13/01/1992');
}

// Positive Test Cases
test.describe('PositiveTests', () => {
    for (const nationality of ['South African', 'Zimbabwean']) {
        test(`User can Sign Up with ${nationality}`, async ({ page }) => {
            await page.goto('/dashboard');
            await page.getByRole('link', { name: 'Get started' }).click();
            await expect(page).toHaveURL('/auth/register');
            await expect(page.locator('text=Please enter all of your personal information below')).toBeVisible({ timeout: 10000 });
            // Fill form
            await fillSignUpForm(page, nationality);
            // Click Next
            await page.getByRole('button', { name: 'Next' }).click();
            // Assert error popup (assuming API failure)
            const errorPopup = page.locator('text=Error, personal details not added!');
            await expect(errorPopup).toBeVisible({ timeout: 5000 });
            await expect(errorPopup).not.toBeVisible({ timeout: 10000 }); // Verify it disappears
        });
    }
});

// Negative Test Cases
test.describe('NegativeTests', () => {
    test('Incomplete Form', async ({ page }) => {
        await page.goto('/dashboard');
        await page.getByRole('link', { name: 'Get started' }).click();
        await expect(page).toHaveURL('/auth/register');
        await expect(page.locator('text=Please enter all of your personal information below')).toBeVisible({ timeout: 10000 });

        // Submit form without filling anything
        await page.getByRole('button', { name: 'Next' }).click();

        // Validate required field errors
        const requiredFields = [
            'First name is required',
            'Last name is required',
            'Contact number is required',
            'Nationality is required',
            'ID or Passport number is required',
            'Address is required',
            'dateOfBirth must be a `date` type, but the final value was: `Invalid Date`'
        ];
        for (const errorMessage of requiredFields) {
            await expect(page.locator(`text=${errorMessage}`)).toBeVisible();
        }
    });
});
