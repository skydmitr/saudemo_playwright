import { RegisterPage } from '../src/page/registerPage/registerPage';
import { test } from '../src/fixtures/playwright.fixture';
import { LoginPage } from '../src/page/loginPage/loginPage';

test('Регистрация пользователя', async ({ page, userData }) => {
  const registerPage = new RegisterPage(page);

  await registerPage.visit();
  await registerPage.createAccount(
    userData.firstName,
    userData.lastName,
    userData.email,
    userData.username,
    userData.password,
  );
});

test('Регистрация -> активация -> авторизация', async ({ page, userData }) => {
  const registerPage = new RegisterPage(page);
  const loginPage = new LoginPage(page);

  await test.step('Открытие страницы регистрации', async () => {
    await registerPage.visit();
  });

  const user = await test.step('Регистрация и активация аккаунта', async () => {
    return await registerPage.approveRegister(
      userData.firstName,
      userData.lastName,
      userData.username,
      userData.password,
    );
  });

  await test.step('Переход на страницу авторизации', async () => {
    await loginPage.visit();
  });

  await test.step('Авторизация', async () => {
    await loginPage.login(user.email, userData.password);
    await loginPage.expectedUrlPage();
  });
});
