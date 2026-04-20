import { Locator } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { BaseComponent } from '../baseComponentForButton/base.сomponent';

export class DatePickerComponent extends BaseComponent {
  readonly datePickerLocator: Locator;
  readonly getYear: number;
  readonly getMonth: number;
  readonly getDaysMonth: number;
  readonly getDay: number;

  constructor(inputDatePickerLocator: Locator, datePickerLocator: Locator) {
    super(inputDatePickerLocator);
    this.datePickerLocator = datePickerLocator;

    this.getYear = faker.number.int({ min: 1900, max: new Date().getFullYear() });
    this.getMonth = faker.number.int({ min: 0, max: 11 });
    this.getDaysMonth = new Date(this.getYear, this.getMonth + 1, 0).getDate();
    this.getDay = faker.number.int({ min: 1, max: this.getDaysMonth });
  }

  async setMonth(month: number) {
    await this.datePickerLocator.getByLabel('Select month').selectOption(`${month}`);
  }

  async setYear(year: number) {
    await this.datePickerLocator.getByLabel('Select year').selectOption(`${year}`);
  }

  async setDay(day: number) {
    await this.datePickerLocator.getByRole('link', { name: `${day}`, exact: true }).click();
  }

  async setDate(
    day: number = this.getDay,
    month: number = this.getMonth,
    year: number = this.getYear,
  ): Promise<void> {
    await this.locator.click();
    await this.setYear(year);
    await this.setMonth(month);
    await this.setDay(day);
  }
}
