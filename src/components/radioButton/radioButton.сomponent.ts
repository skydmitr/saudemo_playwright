import { Locator } from 'playwright';
import { expect } from '@playwright/test';
import { BaseOmponent } from '../baseComponentForButton/base.сomponent';

export class RadioButtonComponent extends BaseOmponent {
  readonly radioButton: Locator;

  constructor(radioButton: Locator) {
    super(radioButton);
    this.radioButton = radioButton;
  }

  async isChecked() {
    await expect(this.radioButton).toBeChecked();
  }

  async isNotChecked() {
    await expect(this.radioButton).not.toBeChecked();
  }
}
