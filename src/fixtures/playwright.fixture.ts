import { test as base } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { GlobalPage } from '../page/globalPage/globalPage';
import { LoginPage } from '../page/loginPage/loginPage';
import { RegisterPage } from '../page/registerPage/registerPage';
import { HomePage } from '../page/homePage/homePage';
import { Admin } from '../role/admin';
import { User } from '../role/user';

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

type MyFixtures = {
  userData: UserData;
  loginPage: LoginPage;
  registerPage: RegisterPage;
  homePage: HomePage;
  adminRole: Admin;
  userRole: User;
};

export const test = base.extend<MyFixtures>({
  userData: async ({}, use) => {
    //todo выполнится до use

    await use({
      //выполняется
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      username: faker.internet.username(),
      password: faker.internet.password(),
    });

    //todo выполнится после того как тест закончится
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    await use(loginPage);
  },

  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);

    await use(registerPage);
  },

  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);

    await use(homePage);
  },

  adminRole: async ({ page }, use) => {
    const adminRole = new Admin(page);

    await use(adminRole);
  },

  userRole: async ({ page, userData }, use) => {
    const user = userData;
    const userRole = new User(page, user.email, user.password);

    await use(userRole);
  },
});

export { expect } from '@playwright/test';
//export * from '@playwright/test';
