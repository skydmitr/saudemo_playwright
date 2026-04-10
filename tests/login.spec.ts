import { test } from '@playwright/test';
import { LoginPage } from '../src/page/loginPage/loginPage';
import { GlobalPage } from '../src/page/globalPage/globalPage';

test('test', async ({ page }) => {
  let loginPage = new LoginPage(page);
  let globalPage = new GlobalPage(page);
  const path = '/login'; //TODO добавил опциональную страницу
  const home = '/home';

  await globalPage.visit(path); //TODO Вопрос, можем ли использовать унаследованные методы от родительского класс? это ведь может запутать
  await globalPage.expectedLoginPage(path);
  await loginPage.login(home);
});
