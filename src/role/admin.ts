import { LoginPage } from '../page/loginPage/loginPage';
import { HomePage } from '../page/homePage/homePage';
import { Page } from 'playwright';

export class Admin {
  readonly loginPage: LoginPage;
  readonly homePage: HomePage;

  constructor(page: Page) {
    this.loginPage = new LoginPage(page);
    this.homePage = new HomePage(page);
  }
}

