import { Locator } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class DatePickerOmponent {
  readonly inputDatePickerLocator: Locator;
  readonly datePickerLocator: Locator;

  constructor(inputDatePickerLocator: Locator, datePickerLocator: Locator) {
    this.inputDatePickerLocator = inputDatePickerLocator;
    this.datePickerLocator = datePickerLocator;
  }

  private _getYear() {
    return faker.number.int({ min: 1900, max: 2026 });
  }

  private _getMonth() {
    return faker.number.int({ min: 0, max: 11 });
  }

  private _getDaysMonth() {
    return new Date(this._getYear(), this._getMonth() + 1, 0).getDate();
  }

  private _getDay() {
    return faker.number.int({ min: 1, max: this._getDaysMonth() });
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
    day: number = this._getDay(),
    month: number = this._getMonth(),
    year: number = this._getYear(),
  ) {
    await this.inputDatePickerLocator.click();
    await this.setYear(year);
    await this.setMonth(month);
    await this.setDay(day);
  }
}
