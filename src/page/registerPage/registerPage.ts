import { GlobalPage } from '../globalPage/globalPage';
import { DatePickerOmponent } from '../../components/datepicker/datePicker.сomponent';
import { ButtonComponent } from '../../components/button/button.сomponent';
import { RadioButtonComponent } from '../../components/radioButton/radioButton.сomponent';
import { InputComponent } from '../../components/input/input.сomponent';
import { Page } from 'playwright';
import { CheckBoxComponent } from '../../components/checkBox/checkBox.сomponent';

export class RegisterPage extends GlobalPage {
  readonly datePicker: DatePickerOmponent;
  readonly firstNameInput: InputComponent;
  readonly lastNameInput: InputComponent;
  readonly emailInput: InputComponent;
  readonly userNameInput: InputComponent;
  readonly passwordInput: InputComponent;
  readonly reEnterEmailInput: InputComponent;
  readonly genderRadioButton: RadioButtonComponent;
  readonly checkBoxRulesButton: CheckBoxComponent;
  readonly createAccountButton: ButtonComponent;

  constructor(page: Page) {
    super(page, '/');

    const genderList = ['Male', 'Female', 'Other'];
    const random = Math.floor(Math.random() * genderList.length);

    this.datePicker = new DatePickerOmponent(
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
    this.genderRadioButton = new RadioButtonComponent(this.page.getByRole('radio').nth(random)); //nth рандом
    this.checkBoxRulesButton = new CheckBoxComponent(this.page.getByRole('checkbox'));

    this.createAccountButton = new ButtonComponent(
      this.page.getByRole('button', { name: 'Create an account' }),
    );
  }

  async createdAccount(
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
    await this.genderRadioButton.isChecked();
    await this.checkBoxRulesButton.click();
    await this.checkBoxRulesButton.isChecked();
    await this.createAccountButton.click();
  }
}
