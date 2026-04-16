import { Locator } from 'playwright';
import { expect } from '@playwright/test';
import { BaseOmponent } from '../baseComponentForButton/base.сomponent';

export class InputComponent extends BaseOmponent {
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
