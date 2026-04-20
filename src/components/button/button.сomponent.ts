import { Locator } from 'playwright';
import { expect } from '@playwright/test';
import { BaseComponent } from '../baseComponentForButton/base.сomponent';

export class ButtonComponent extends BaseComponent {
  constructor(buttonLocator: Locator) {
    super(buttonLocator);
  }

  // async getText(text: string) {
  //   await expect(this.locator).toHaveText(text);
  // } //TODO переделать метод
}

//TODO локатор
