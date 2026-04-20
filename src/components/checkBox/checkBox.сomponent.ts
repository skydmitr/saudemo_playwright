import { Locator } from 'playwright';
import { BaseComponent } from '../baseComponentForButton/base.сomponent';
import { expect } from '@playwright/test';

export class CheckBoxComponent extends BaseComponent {
  constructor(checkBox: Locator) {
    super(checkBox);
  }

  async expectChecked(): Promise<void> {
    await expect(this.locator).toBeChecked();
  }

  async expectNotChecked(): Promise<void> {
    await expect(this.locator).not.toBeChecked();
  }
}

//TODO все компоненты должны наследоваться от базового компонента
//TODO если логика одна и таже, то лучше разделить методы
