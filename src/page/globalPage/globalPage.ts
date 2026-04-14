import { Page } from 'playwright';
import { expect } from '@playwright/test';

export class GlobalPage {
  readonly page: Page;
  protected url?: string;

  constructor(page: Page, url?: string) {
    this.page = page;
    this.url = url;
  }

  async visit(): Promise<void> {
    await this.page.goto(process.env.SITE + `${this.url}`);
  }

  async expectedUrlPage(): Promise<void> {
    await expect(this.page).toHaveURL(process.env.SITE + `${this.url}`);
  }
}
