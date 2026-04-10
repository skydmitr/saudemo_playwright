import { Locator, Page } from 'playwright';
import { expect } from '@playwright/test';
import { GlobalPage } from '../globalPage/globalPage';

export class LoginPage extends GlobalPage {
  readonly loginInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.loginInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async login(home: string): Promise<void> {
    //TODO это вынес в env
    // const idealLogin = 'administrator';
    // const idealPassword = 'administrator';

    const login = await this.loginInput.inputValue();
    const password = await this.passwordInput.inputValue();

    expect(login).toEqual(process.env.IDEALOGIN);
    expect(password).toEqual(process.env.IDELPASSWORD);

    await this.loginButton.click();
    await expect(this.page).toHaveURL(process.env.SITE + `${home}`);
  }
}
