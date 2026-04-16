import { Locator } from 'playwright';
import { RadioButtonComponent } from '../radioButton/radioButton.сomponent';
import { expect } from '@playwright/test';

export class CheckBoxComponent extends RadioButtonComponent {
  readonly checkBox: Locator;

  constructor(checkBox: Locator) {
    super(checkBox);
    this.checkBox = checkBox;
  }
}
