import { FullConfig } from 'playwright/test';
import { chromium } from '@playwright/test';
import * as fs from 'node:fs';
import { LoginPage } from '../page/loginPage/loginPage';

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch({ headless: !process.env.CI });
  const context = await browser.newContext();
  const page = await context.newPage();
  const loginPage = new LoginPage(page);

  fs.mkdirSync('storage', { recursive: true });

  if (fs.existsSync('storage')) {
    console.log('Сессия уже существует, авторизацию пропускаем');
    return;
  }

  try {
    await loginPage.login();
    if (await page.context().storageState({ path: 'storage/state.json' })) {
      console.log('Сессия сохранена');
    }
  } catch (error) {
    console.error('Ошибка:' + error);
  } finally {
    await browser.close();
  }
}

export default globalSetup;
