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
    super(page, '/home');

    this.loginInput = new InputComponent(page.locator('input[name="username"]'));
    this.passwordInput = new InputComponent(page.locator('input[name="password"]'));
    this.loginButton = new ButtonComponent(page.getByRole('button', { name: 'Login' }));
  }

  async login(email?: string, password?: string): Promise<void> {
    const loginOptional = email ?? (await this.loginInput.getValue());
    const passwordOptional = password ?? (await this.passwordInput.getValue());

    if (!email && !password) {
      expect(loginOptional).toEqual(process.env.LOGIN);
      expect(passwordOptional).toEqual(process.env.PASSWORD);
    } else {
      await this.loginInput.setValue(loginOptional);
      await this.passwordInput.setValue(passwordOptional);
    }
    await this.loginButton.click();
    await expect(this.page).toHaveURL(process.env.SITE + `${this.url}`);
  }
}

//TODO поправить метод getValue и адаптировать
