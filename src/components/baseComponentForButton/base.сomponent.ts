import { expect } from '../../fixtures/playwright.fixture';
import { Locator } from 'playwright';
//TODO стараемся везде импортируем базовую фикстуру!

export class BaseComponent {
  protected locator: Locator;

  constructor(locator: Locator) {
    this.locator = locator;
  }

  async expectVisible(): Promise<void> {
    await expect(this.locator).toBeVisible();
  }

  async expectEnabled(): Promise<void> {
    await expect(this.locator).toBeEnabled();
  }

  async expectDisabled(): Promise<void> {
    await expect(this.locator).toBeDisabled();
  }

  async expectNotVisible(): Promise<void> {
    await expect(this.locator).not.toBeVisible();
  }

  async click(): Promise<void> {
    await this.locator.click();
  }

  async expectText(value: string): Promise<void> {
    await expect(this.locator).toContainText(value);
  }
}
