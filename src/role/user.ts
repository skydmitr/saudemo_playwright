import { LoginPage } from '../page/loginPage/loginPage';
import { HomePage } from '../page/homePage/homePage';
import { RegisterPage } from '../page/registerPage/registerPage';
import { Page } from 'playwright';

export class User {
  readonly loginPage: LoginPage;
  readonly homePage: HomePage;
  readonly registerPage: RegisterPage;
  readonly email: string;
  readonly password: string;

  constructor(page: Page, email: string, password: string) {
    this.loginPage = new LoginPage(page);
    this.homePage = new HomePage(page);
    this.registerPage = new RegisterPage(page);

    this.email = email;
    this.password = password;
  }
}
