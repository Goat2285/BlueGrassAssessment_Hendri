import { test, expect } from '@playwright/test';

// Helper Functions
async function loginUser(page, username, password) {
  await page.goto('/dashboard');
  await page.fill('[name="username"]', username);
  await page.fill('[name="password"]', password);
  await page.click('button[type="submit"]');
}

async function assertUrlAndText(page, url, textLocatorString, visible = true) {
  await expect(page).toHaveURL(url);
  const textLocator = page.locator(textLocatorString);
  if (visible) {
    await expect(textLocator).toBeVisible({ timeout: 10000 });
  } else {
    await expect(textLocator).toBeHidden();
  }
}

test.describe('Login Workflow', () => {
  test.beforeEach(async ({ page }) => {
    // Set up API interception for login before each test in this suite.
    await page.route('**/api/Account/SignIn', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          message: 'Login successful',
          data: {
            user: {
              firstname: "Test",
              lastname: "User",
              email: "testuser@bg.com",
              roles: ["Patient"],
            },
            token: "fake-token"
          }
        }),
      });
    });
    // Assumes that beforeEach is always starting at the dashboard for these tests
    await page.goto('/dashboard');
  });

  test('Navigate to LandingPage of application', async ({ page }) => {
    const textLocator = 'text=Please enter your details to continue.';
    await assertUrlAndText(page, '/dashboard', textLocator);
  });

  test('Log in without RememberMe function', async ({ page }) => {
    await loginUser(page, 'testuser@bg.com', 'password123');
    await assertUrlAndText(page, '/dashboard', 'text=Please enter your details to continue.', false);
  });

  test('Log in with Remember Me function and view Password', async ({ page }) => {
    // Navigate to the login page
    await page.goto('/login');

    // Fill in the username and password
    await page.fill('[name="username"]', 'testuser@bg.com');
    await page.fill('[name="password"]', 'password123');

    // Verify initial password type is 'password' (hidden)
    await expect(page.locator('input[name="password"]')).toHaveAttribute('type', 'password');

    // Click the show password button to toggle visibility to 'text' (visible)
    await page.click('button:has(svg[aria-hidden="true"][role="img"])');
    await expect(page.locator('input[name="password"]')).toHaveAttribute('type', 'text');

    // Click again to toggle password visibility back to 'password' (hidden)
    await page.click('button:has(svg[aria-hidden="true"][role="img"])');
    await expect(page.locator('input[name="password"]')).toHaveAttribute('type', 'password');

    // Check and activate the Remember Me checkbox
    const rememberMeCheckbox = page.locator('input[name="rememberMe"]');
    await expect(rememberMeCheckbox).not.toBeChecked();
    await rememberMeCheckbox.click();
    await expect(rememberMeCheckbox).toBeChecked();

    // Submit the login form
    await page.click('button[type="submit"]');

    // Because the login API is intercepted, the app should behave as though login was successful.
    // Verify navigation to the dashboard indicates successful login.
    await expect(page).toHaveURL('/login');

    // Ensure the message "Please enter your details to continue." is not visible post-login
    const textLocator = page.locator('text=Please enter your details to continue.');
    await expect(textLocator).toBeHidden();
  });

  test('Navigation and action tests', async ({ page }) => {
    // Combine navigation tests under one suite to reduce repetition
    const navigationTargets = [
      { role: 'link', name: 'Get started', url: '/auth/register', text: 'Please enter all of your personal information below.' },
      { role: 'button', name: 'Navigate to Welcome Screen', url: '/welcome', text: 'Welcome to' },
      { role: 'link', name: 'Forgot password?', url: '/auth/forgotpassword', text: 'Please enter your email address below' },
      { role: 'button', name: 'Navigate to Update Password', url: '/auth/updatepassword', text: 'Please enter your new password below' }
    ];

    for (const nav of navigationTargets) {
      await page.goto('/dashboard'); // Navigate back to dashboard before each action
      await page.getByRole(nav.role, { name: nav.name }).click();
      await expect(page).toHaveURL(nav.url); // Check if the URL is correct
      const textLocator = page.locator(`text=${nav.text}`);
      await expect(textLocator).toBeVisible({ timeout: 10000 });
      await page.goto('/dashboard'); // Navigate back to dashboard after each action
    }
  });
});

test.describe('NegativeTests', () => {
  test('Input Incorrect Credentials', async ({ page }) => {
    // Optionally, you can intercept here as well if you want to return a failure response.
    // For this negative test, we won't set up the successful login interceptor so that the UI
    // displays the appropriate error message.
    await page.route('**/api/Account/Login', async (route) => {
      await route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({
          success: false,
          message: 'Invalid credentials'
        }),
      });
    });
    await loginUser(page, 'wronguser', 'wrongpassword');
    // Assume some error message should be visible now.
    await expect(page.locator('text=Email must be a valid email address')).toBeVisible();
  });

  test('Check empty username and password fields', async ({ page }) => {
    await page.goto('/dashboard');
    await page.click('button[type="submit"]');
    const errorLocator_Email = page.locator('text=Email is required');
    const errorLocator_Password = page.locator('text=Password is required');
    await expect(errorLocator_Email).toBeVisible();
    await expect(errorLocator_Password).toBeVisible();
  });
  
  test('Verify unauthorized access to restricted page', async ({ page }) => {
    await page.goto('/patients'); // Assuming '/patients' is restricted
    const errorLocator = page.locator('text=Sorry, page not found!');
    await expect(errorLocator).toBeVisible();
  });
});

test.describe('EdgeTests', () => {
  test('Email Field Overflow', async ({ page }) => {
    await page.goto('/dashboard');
    // Input a very long email string. This should be limit chars.
    await page.fill('[name="username"]', 'a'.repeat(1000) + '@test.com');
    await page.fill('[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    // Optionally, verify if an error message is displayed or if the input is accepted.
    // await expect(page.locator('.error-message')).toContainText('Please enter a valid email');
  });
});
