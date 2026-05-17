import { Locator, Page } from 'playwright';
import { expect, test } from '@playwright/test';
import { GlobalPage } from '../globalPage/globalPage';
import { InputComponent } from '../../components/input/input.сomponent';
import { ButtonComponent } from '../../components/button/button.сomponent';
import { Role } from '../../data/role';
import { creds } from '../../data/creds';
import { User } from '../../role/user';
import { ok } from 'node:assert/strict';

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

  async login(email?: string, password?: string): Promise<void> {
    await test.step('Авторизация пользователя', async (async) => {
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
      //await expect(this.page).toHaveURL(process.env.SITE + `${this.url}`); Это нам тут не нужно
    });
  }

  async loginAsRole(role: Role, user?: User): Promise<void> {
    await this.visit();
    if (role === Role.Admin) {
      await this.login(creds.adminLogin, creds.adminPassword);
    } else if (role === Role.User) {
      ok(user); //проверка
      await this.login(user.email, user.password);
    } else {
      throw new Error(`Роль не поддерживается ${role}`);
    } //добавить проверку авторизации, степы переделать под аллюр
  }
}

//TODO поправить метод getValue и адаптировать
