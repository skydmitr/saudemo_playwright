import { GlobalPage } from '../globalPage/globalPage';
import { Locator, Page } from 'playwright';
import { expect } from '@playwright/test';
import { e } from '@faker-js/faker/dist/airline-eVQV6kbz';
import { calendar } from '../../../utils/calenar';

export class RegisterPage extends GlobalPage {
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly email: Locator;
  readonly reEnterEmail: Locator;
  readonly userName: Locator;
  readonly password: Locator;
  readonly birthDate: Locator;
  readonly gender: Locator;
  readonly checkRules: Locator;
  readonly createAccountButton: Locator;

  constructor(page: Page) {
    super(page);

    this.firstName = page.getByRole('textbox', { name: 'First Name' });
    this.lastName = page.getByRole('textbox', { name: 'Last Name' });
    this.email = page.getByRole('textbox', { name: 'Email', exact: true });
    this.reEnterEmail = page.getByRole('textbox', { name: 'Re-enter Email' });
    this.userName = page.getByRole('textbox', { name: 'Username' });
    this.password = page.getByRole('textbox', { name: 'Password' });
    this.birthDate = page.getByRole('textbox', { name: 'Birthdate' });
    this.gender = page.getByRole('radio'); //.nth() в зависимости от кнопки на рандоме
    this.checkRules = page.getByRole('checkbox');
    this.createAccountButton = page.getByRole('button', { name: 'Create an account' });
  }

  async createdAccount(
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string,
  ): Promise<void> {
    const genderList = ['Male', 'Female', 'Other'];
    const random = Math.floor(Math.random() * genderList.length);

    await this.firstName.fill(firstName);
    expect(this.firstName.fill(firstName));

    await this.lastName.fill(lastName);
    expect(this.lastName.fill(lastName));

    await this.email.fill(email);
    expect(this.email.fill(email));

    await this.reEnterEmail.fill(email);
    expect(this.reEnterEmail.fill(email));

    await this.userName.fill(username);
    expect(this.userName.fill(username));

    await this.password.fill(password);
    expect(this.password.fill(password));

    await calendar(this);

    await this.gender.nth(random).click();
    await expect(this.gender.nth(random)).toBeChecked();

    await this.checkRules.click();
    await expect(this.checkRules).toBeChecked();

    await this.page.pause();
  }
}
