import { RegisterPage } from '../src/page/registerPage/registerPage';
import { test } from '../src/fixtures/playwright.fixture';

test('Регистрация пользователя', async ({ page, userData }) => {
  const registerPage = new RegisterPage(page);

  await registerPage.visit();
  await registerPage.createdAccount(
    userData.firstName,
    userData.lastName,
    userData.email,
    userData.username,
    userData.password,
  );
});
