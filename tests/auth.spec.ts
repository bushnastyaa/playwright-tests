import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { AuthPage } from '../pages/AuthPage';

test.describe('Registration', () => {
  let homePage: HomePage;
  let authPage: AuthPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    authPage = new AuthPage(page);
    await homePage.goto();
  });

  test('Successful sign up', async () => {
    const username = `user_${Date.now()}`;
    const password = 'password';

    const message = await authPage.signUpAndGetDialogMessage(username, password);
    expect(message).toContain('Sign up successful');
  });

  test('Sign up with existing user shows error', async () => {
    const message = await authPage.signUpAndGetDialogMessage('admin', 'admin');
    expect(message).toContain('This user already exist.');
  });
});

test.describe('Authorization', () => {
  let homePage: HomePage;
  let authPage: AuthPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    authPage = new AuthPage(page);
    await homePage.goto();
  });

  test('Successful login', async ({ page }) => {
    await authPage.login('admin', 'admin');
    await expect(authPage.loginResult).toContainText('admin');
  });

  test('Login with wrong credentials shows error', async () => {
    const message = await authPage.loginAndGetDialogMessage('admin', 'wrongpass');
    expect(message).toContain('Wrong password.');
  });
});
