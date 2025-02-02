// registrationPage.ts
import { Page, expect } from '@playwright/test';

export class RegistrationPage {
  constructor(private page: Page) {}

  // Mock API helper method
  async mockApiResponse(endpoint: string, responseBody: object) {
    await this.page.route(endpoint, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(responseBody),
      });
    });
  }

  async navigateToRegistration() {
    await this.page.goto('/dashboard');
    await this.page.getByRole('link', { name: 'Get started' }).click();
    await expect(this.page).toHaveURL('/auth/register');
    await expect(
      this.page.locator('text=Please enter all of your personal information below')
    ).toBeVisible({ timeout: 10000 });
  }

  async fillPersonalDetails(details: {
    firstName: string;
    lastName: string;
    contactNumber: string;
    nationality: string;
    idOrPassport: string;
    address: string;
    dob: string;
  }) {
    await this.page.getByRole('textbox', { name: 'First Name' }).fill(details.firstName);
    await this.page.getByRole('textbox', { name: 'Last Name' }).fill(details.lastName);
    await this.page.getByRole('textbox', { name: 'Contact Number' }).fill(details.contactNumber);
    await this.page.getByLabel('Nationality').selectOption(details.nationality);
    await this.page.getByRole('textbox', { name: 'ID / Passport Number' }).fill(details.idOrPassport);
    await this.page.getByRole('textbox', { name: 'Address' }).fill(details.address);
    await this.page.getByRole('textbox', { name: 'Date of Birth' }).fill(details.dob);
  }

  async fillPartnerDetails(details: {
    firstName: string;
    lastName: string;
    contactNumber: string;
    email: string;
    nationality: string;
    idOrPassport: string;
    address: string;
    dob: string;
  }) {
    await this.page.getByRole('textbox', { name: 'First Name' }).fill(details.firstName);
    await this.page.getByRole('textbox', { name: 'Last Name' }).fill(details.lastName);
    await this.page.getByRole('textbox', { name: 'Contact Number' }).fill(details.contactNumber);
    await this.page.getByRole('textbox', { name: 'Email' }).fill(details.email);
    await this.page.getByLabel('Nationality').selectOption(details.nationality);
    await this.page.getByRole('textbox', { name: 'ID / Passport Number' }).fill(details.idOrPassport);
    await this.page.getByRole('textbox', { name: 'Address' }).fill(details.address);
    await this.page.getByRole('textbox', { name: 'Date of Birth' }).fill(details.dob);
  }

  async fillPaymentDetails(details: {
    nameOnCard: string;
    cardNumber: string;
    expiry: string;
    cvv: string;
  }) {
    await this.page.getByRole('textbox', { name: 'Name on card' }).fill(details.nameOnCard);
    await this.page.getByRole('textbox', { name: 'Card number' }).fill(details.cardNumber);
    await this.page.getByRole('textbox', { name: 'Expiry (MM/YY)' }).fill(details.expiry);
    await this.page.getByRole('textbox', { name: 'CVV' }).fill(details.cvv);
  }

  async clickNext() {
    await this.page.getByRole('button', { name: 'Next' }).click();
  }

  async payNow() {
    await this.page.getByRole('button', { name: 'Pay Now' }).click();
    await expect(this.page.locator('text=Application Complete')).toBeVisible({ timeout: 10000 });
    await this.page.getByRole('button', { name: 'Set Up Password' }).click();
    await expect(
      this.page.locator('text=Please enter your desired login password')
    ).toBeVisible({ timeout: 10000 });
  }

  async setupPassword(password: string) {
    await this.page.getByRole('textbox', { name: 'Password', exact: true }).fill(password);
    await this.page.locator('div').filter({ hasText: /^Password$/ }).getByRole('button').click();

    await this.page.getByRole('textbox', { name: 'Confirm New Password' }).fill(password);
    await this.page.locator('div').filter({ hasText: /^Confirm New Password$/ }).getByRole('button').click();

    await this.page.getByRole('button', { name: 'Create Password' }).click();
    await expect(this.page.locator('text=Your password has been successfully created.')).toBeVisible({
      timeout: 10000,
    });
    await this.page.getByRole('button', { name: 'Continue' }).click();
  }
}
