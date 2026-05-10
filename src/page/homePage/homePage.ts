import { GlobalPage } from '../globalPage/globalPage';
import { Page } from 'playwright';
import { expect, test } from '@playwright/test';

export class HomePage extends GlobalPage {
  constructor(page: Page) {
    super(page, '/home');
  }

  async expectedUrlPage(): Promise<void> {
    await test.step('Проверка нахождения на странице', async (async) => {
      await expect(this.page).toHaveURL(process.env.SITE + `${this.url}`);
    });
  }
}
