import { expect } from 'playwright/test';
import { Locator } from 'playwright';

export class BaseOmponent {
  protected locator: Locator;

  constructor(locator: Locator) {
    this.locator = locator;
  }

  async isVisible(): Promise<void> {
    await expect(this.locator).toBeVisible();
  }

  async isEnabled(): Promise<void> {
    await expect(this.locator).toBeEnabled();
  }

  async isDisabled(): Promise<void> {
    await expect(this.locator).toBeDisabled();
  }

  async isNotVisible(): Promise<void> {
    await expect(this.locator).not.toBeVisible();
  }

  async click(): Promise<void> {
    await this.locator.click();
  }
}
