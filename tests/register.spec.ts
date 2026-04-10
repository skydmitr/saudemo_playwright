import { RegisterPage } from '../src/page/registerPage/registerPage';
import { test } from '@playwright/test';
import { BuildersGenerete } from '../utils/buildersGenerate';

test('Регистрация пользователя', async ({ page }) => {
  const registerPage = new RegisterPage(page);
  const user = new BuildersGenerete()
    .withFirstName()
    .withLastName()
    .withEmail()
    .withUsername()
    .withPassword()
    .build();

  await registerPage.visit('/');
  await registerPage.createdAccount(
    user.firstName,
    user.lastName,
    user.email,
    user.username,
    user.password,
  );
});
