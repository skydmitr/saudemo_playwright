import { test } from '../src/fixtures/playwright.fixture';
import { Role } from '../src/data/role';

test.describe('', () => {
  test('Авторизация  Admin', async ({ adminRole }) => {
    await adminRole.loginPage.loginAsRole(Role.Admin);
  });

  test('Авторизация  User', async ({ userRole }) => {
    await userRole.loginPage.loginAsRole(Role.User, userRole);
  });
});
