import { test } from '@playwright/test';
import { LoginPage } from '../src/page/loginPage/loginPage';

test('test', async ({ page }) => {
  let loginPage = new LoginPage(page);

  await loginPage.visit();
  await loginPage.expectedUrlPage();
  await loginPage.login();
});
