import { Page } from 'playwright';
import { expect } from '@playwright/test';

export class GlobalPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  //TODO Вынес отдельно метод в глобальную пейджу

  async visit(path: string): Promise<void> {
    await this.page.goto(process.env.SITE + `${path}`);
  }

  async expectedLoginPage(path: string): Promise<void> {
    await expect(this.page).toHaveURL(process.env.SITE + `${path}`);
  }
}
