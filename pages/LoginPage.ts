import { Locator, Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="email"], #username'); 
    this.passwordInput = page.locator('input[name="password"], #password');
    this.loginButton = page.locator('button[type="submit"], #loginBtn');
  }

  async goto() {
    await this.page.goto('https://stargate-tst.qly.sibs.pt/login');
  }

  async login(user: string, pass: string) {
    await this.usernameInput.fill(user);
    await this.passwordInput.fill(pass);
    await this.loginButton.click();
  }

  async validateLoginError() {
    const errorPopup = this.page.getByText(/Login/i).filter({ hasText: /close/i });
    await expect(errorPopup).toBeVisible({ timeout: 10000 });
  }
}  