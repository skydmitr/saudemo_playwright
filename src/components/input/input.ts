import { Locator } from 'playwright';
import { expect } from '@playwright/test';
import { BaseComponent } from '../baseComponentForButton/baseComponent';

export class InputComponent extends BaseComponent {
  readonly inputLocator: Locator;

  constructor(inputLocator: Locator) {
    super(inputLocator);
    this.inputLocator = inputLocator;
  }

  async setValue(text: string): Promise<void> {
    await this.inputLocator.fill(text);
  }

  async getValue(): Promise<void> {
    await this.inputLocator.inputValue();
  }

  async checkValue(text: string): Promise<void> {
    await expect(this.inputLocator).toHaveValue(text);
  }
}
