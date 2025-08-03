import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class AuthPage extends BasePage {
  readonly signUpLink: Locator;
  readonly loginLink: Locator;
  readonly loginModal: Locator;
  readonly signUpModal: Locator;
  readonly signUpUsername: Locator;
  readonly signUpPassword: Locator;
  readonly loginUsername: Locator;
  readonly loginPassword: Locator;
  readonly signUpButton: Locator;
  readonly loginButton: Locator;
  readonly loginResult: Locator;

  constructor(page: Page) {
    super(page);
    this.signUpLink = page.getByRole('link', { name: 'Sign up' });
    this.loginLink = page.getByRole('link', { name: 'Log in' });
    this.loginModal = page.locator('#logInModal');
    this.signUpModal = page.locator('#signInModal');
    this.signUpUsername = page.locator('#sign-username');
    this.signUpPassword = page.locator('#sign-password');
    this.loginUsername = page.locator('#loginusername');
    this.loginPassword = page.locator('#loginpassword');
    this.signUpButton = this.signUpModal.getByRole('button', { name: 'Sign up' });
    this.loginButton = this.loginModal.getByRole('button', { name: 'Log in' });
    this.loginResult = page.locator('#nameofuser');
  }

  async signUpAndGetDialogMessage(username: string, password: string): Promise<string> {
    await this.signUpLink.click();
    await this.signUpModal.waitFor({ state: 'visible' });
    await this.signUpUsername.fill(username);
    await this.signUpPassword.fill(password);

    await this.signUpButton.waitFor({ state: 'visible' });
    await this.page.waitForTimeout(300); 

    const [dialog] = await Promise.all([
      this.page.waitForEvent('dialog'),
      this.signUpButton.click()
    ]);
    const msg = dialog.message();
    await dialog.accept();
    return msg;
  }

  async login(username: string, password: string): Promise<void> {
    await this.loginLink.click();
    await this.loginModal.waitFor({ state: 'visible' });
    await this.loginUsername.fill(username);
    await this.loginPassword.fill(password);
    await this.loginButton.click();
  }

  async loginAndGetDialogMessage(username: string, password: string): Promise<string> {
    await this.loginLink.click();
    await this.loginModal.waitFor({ state: 'visible' });
    await this.loginUsername.fill(username);
    await this.loginPassword.fill(password);

    await this.loginButton.waitFor({ state: 'visible' });
    await this.page.waitForTimeout(300);

    const [dialog] = await Promise.all([
      this.page.waitForEvent('dialog'),
      this.loginButton.click()
    ]);
    const msg = dialog.message();
    await dialog.accept();
    return msg;
  }
}
