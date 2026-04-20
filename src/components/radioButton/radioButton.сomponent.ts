import { Locator } from 'playwright';
import { expect } from '@playwright/test';
import { BaseComponent } from '../baseComponentForButton/base.сomponent';

export class RadioButtonComponent extends BaseComponent {
  constructor(radioButton: Locator) {
    super(radioButton);
  }

  async expectChecked() {
    await expect(this.locator).toBeChecked();
  }

  async expectNotChecked() {
    await expect(this.locator).not.toBeChecked();
  }
}

//TODO переименование названий методой, придерживаться мнимого согласия
