import { Locator } from 'playwright';
import { expect } from '@playwright/test';
import { BaseComponent } from '../baseComponentForButton/base.сomponent';

export class InputComponent extends BaseComponent {
  constructor(inputLocator: Locator) {
    super(inputLocator);
  }

  async setValue(text: string): Promise<void> {
    await this.locator.fill(text);
  }

  async getValue(): Promise<string> {
    return this.locator.inputValue();
  } //TODO поправить?

  async checkValue(text: string): Promise<void> {
    await expect(this.locator).toHaveValue(text);
  } //TODO поправить?
}
