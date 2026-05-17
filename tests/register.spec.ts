import { RegisterPage } from '../src/page/registerPage/registerPage';
import { test } from '../src/fixtures/playwright.fixture';
import { LoginPage } from '../src/page/loginPage/loginPage';

test('Регистрация пользователя', async ({ registerPage, userData }) => {
  await registerPage.visit();
  await registerPage.createAccount(
    userData.firstName,
    userData.lastName,
    userData.email,
    userData.username,
    userData.password,
  );
});

test('Регистрация -> активация -> авторизация', async ({
  registerPage,
  loginPage,
  homePage,
  userData,
}) => {
  await registerPage.visit();

  const email = await registerPage.approveRegister(
    userData.firstName,
    userData.lastName,
    userData.username,
    userData.password,
  );

  await loginPage.visit();

  await loginPage.login(email, userData.password);
  await homePage.expectedUrlPage();
});
