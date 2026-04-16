import { Locator, Page } from 'playwright';
import { expect } from '@playwright/test';
import { GlobalPage } from '../globalPage/globalPage';
import { InputComponent } from '../../components/input/input.сomponent';
import { ButtonComponent } from '../../components/button/button.сomponent';

export class LoginPage extends GlobalPage {
  readonly loginInput: InputComponent;
  readonly passwordInput: InputComponent;
  readonly loginButton: ButtonComponent;

  constructor(page: Page) {
    super(page, '/login');

    this.loginInput = new InputComponent(page.locator('input[name="username"]'));
    this.passwordInput = new InputComponent(page.locator('input[name="password"]'));
    this.loginButton = new ButtonComponent(page.getByRole('button', { name: 'Login' }));
  }

  async login(): Promise<void> {
    const login = await this.loginInput.getValue();
    const password = await this.passwordInput.getValue();

    expect(login).toEqual(process.env.LOGIN);
    expect(password).toEqual(process.env.PASSWORD);

    await this.loginButton.click();
    await expect(this.page).toHaveURL(process.env.SITE + `${this.url}`);
  }
}
