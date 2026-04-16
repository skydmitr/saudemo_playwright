import { Locator } from 'playwright';
import { expect } from '@playwright/test';
import { BaseOmponent } from '../baseComponentForButton/base.сomponent';

export class ButtonComponent extends BaseOmponent {
  readonly buttonLocator: Locator;

  constructor(buttonLocator: Locator) {
    super(buttonLocator);
    this.buttonLocator = buttonLocator;
  }

  async click() {
    await this.buttonLocator.click();
  }

  async isVisible() {
    await expect(this.buttonLocator).toBeVisible();
  }

  async isEnabled() {
    await expect(this.buttonLocator).toBeEnabled();
  }

  async getText(text: string) {
    await expect(this.buttonLocator).toHaveText(text);
  }
}
