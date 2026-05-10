import { test } from '../src/fixtures/playwright.fixture';

test('Авторизация дефолтного юзера', async ({ loginPage }) => {
  await loginPage.visit();
  await loginPage.login();
  await loginPage.expectedUrlPage();
});
