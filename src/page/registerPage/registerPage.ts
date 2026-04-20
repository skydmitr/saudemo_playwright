import { GlobalPage } from '../globalPage/globalPage';
import { DatePickerComponent } from '../../components/datepicker/datePicker.сomponent';
import { ButtonComponent } from '../../components/button/button.сomponent';
import { RadioButtonComponent } from '../../components/radioButton/radioButton.сomponent';
import { InputComponent } from '../../components/input/input.сomponent';
import { Page } from 'playwright';
import { CheckBoxComponent } from '../../components/checkBox/checkBox.сomponent';
import { EmailHelper } from '../../helpers/mail/mail';
import { ok } from 'node:assert/strict';
import { BaseComponent } from '../../components/baseComponentForButton/base.сomponent';
import { expect } from '@playwright/test';

export class RegisterPage extends GlobalPage {
  readonly datePicker: DatePickerComponent;
  readonly firstNameInput: InputComponent;
  readonly lastNameInput: InputComponent;
  readonly emailInput: InputComponent;
  readonly userNameInput: InputComponent;
  readonly passwordInput: InputComponent;
  readonly reEnterEmailInput: InputComponent;
  readonly genderRadioButton: RadioButtonComponent;
  readonly checkBoxRulesButton: CheckBoxComponent;
  readonly createAccountButton: ButtonComponent;
  readonly successRegister: BaseComponent;

  constructor(page: Page) {
    super(page);

    //const genderList = ['Male', 'Female', 'Other']; //TODO пока не импользуем массив гендеров
    const random = Math.floor(Math.random() * 3);
    this.datePicker = new DatePickerComponent(
      this.page.getByRole('textbox', { name: 'Birthdate' }),
      this.page.locator("//div[@id='ui-datepicker-div']"),
    );

    this.firstNameInput = new InputComponent(
      this.page.getByRole('textbox', { name: 'First Name' }),
    );
    this.lastNameInput = new InputComponent(this.page.getByRole('textbox', { name: 'Last Name' }));
    this.userNameInput = new InputComponent(this.page.getByRole('textbox', { name: 'Username' }));
    this.emailInput = new InputComponent(
      this.page.getByRole('textbox', { name: 'Email', exact: true }),
    );
    this.passwordInput = new InputComponent(this.page.getByRole('textbox', { name: 'Password' }));
    this.reEnterEmailInput = new InputComponent(
      this.page.getByRole('textbox', { name: 'Re-enter Email' }),
    );
    this.genderRadioButton = new RadioButtonComponent(this.page.getByRole('radio').nth(random));
    this.checkBoxRulesButton = new CheckBoxComponent(this.page.getByRole('checkbox'));

    this.createAccountButton = new ButtonComponent(
      this.page.getByRole('button', { name: 'Create an account' }),
    );
    this.successRegister = new BaseComponent(this.page.getByText('Your account has been'));
  }

  async createAccount(
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string,
  ): Promise<void> {
    await this.firstNameInput.setValue(firstName);
    await this.lastNameInput.setValue(lastName);
    await this.emailInput.setValue(email);
    await this.reEnterEmailInput.setValue(email);
    await this.userNameInput.setValue(username);
    await this.passwordInput.setValue(password);
    await this.datePicker.setDate();
    await this.genderRadioButton.click();
    await this.genderRadioButton.expectChecked();
    await this.checkBoxRulesButton.click();
    await this.checkBoxRulesButton.expectChecked(); //TODO дописать метод для чекбокса
    await this.createAccountButton.click();
    await this.successRegister.expectText('Your account has been registered!');
  }

  async approveRegister(
    firstName: string,
    lastName: string,
    username: string,
    password: string,
  ): Promise<{ email: string }> {
    const emailHelper = new EmailHelper();
    const inboxObject = await emailHelper.createInbox();
    const { emailAddress, id } = inboxObject;
    await this.createAccount(firstName, lastName, emailAddress, username, password);
    const body = await emailHelper.waitForEmail(id, 90000, true);
    ok(body);
    const link = await emailHelper.getActiviteLink(body);
    ok(link);
    await this.page.goto(link[0]);
    await expect(this.page.getByText('The account has been validated!')).toBeVisible();
    return {
      email: emailAddress,
    };
  }
}
