import { Locator } from 'playwright';
import { expect } from '@playwright/test';
import { BaseComponent } from '../baseComponentForButton/baseComponent';

export class RadioButtonComponent extends BaseComponent {
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
