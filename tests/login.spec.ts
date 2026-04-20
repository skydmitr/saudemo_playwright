import { test } from '../src/fixtures/playwright.fixture';
import { LoginPage } from '../src/page/loginPage/loginPage';

test('Авторизация дефолтного юзера', async ({ page }) => {
  let loginPage = new LoginPage(page);

  await loginPage.visit();
  await loginPage.login();
  await loginPage.expectedUrlPage();
});
