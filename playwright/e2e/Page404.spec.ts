import { test, expect } from '@playwright/test';

test.describe('PositiveTests', () => {
    test('Access 404 Page and return home', async ({ page }) => {
        await page.goto('/404');
        const textLocator = page.locator('text=Sorry, page not found!');
        await expect(textLocator).toBeVisible();
        await page.getByRole('link', { name: 'Go to Home' }).click();
        const returnToHomePage_textLocator = page.locator('text=Please enter your details to continue.');
        await expect(returnToHomePage_textLocator).toBeVisible();
    });

    test('CorrectRedirect', async ({ page }) => {
        await page.goto('/patient');
        const textLocator = page.locator('text=Sorry, page not found!');
        await expect(textLocator).toBeVisible();
        await page.getByRole('link', { name: 'Go to Home' }).click();
        const returnToHomePage_textLocator = page.locator('text=Please enter your details to continue.');
        await expect(returnToHomePage_textLocator).toBeVisible();
    });
});