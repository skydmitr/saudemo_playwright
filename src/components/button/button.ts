import { Locator } from 'playwright';
import { expect } from '@playwright/test';
import { BaseComponent } from '../baseComponentForButton/baseComponent';

export class ButtonComponent extends BaseComponent {
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
