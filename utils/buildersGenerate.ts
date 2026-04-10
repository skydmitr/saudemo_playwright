import { faker } from '@faker-js/faker';
import { Locator } from 'playwright';

export interface BuildersFactory {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  birthday: string;
}

export class BuildersGenerete {
  private firstName!: string;
  private lastName!: string;
  private email!: string;
  private username!: string;
  private password!: string;
  private birthday!: string;

  withFirstName() {
    this.firstName = faker.person.firstName();
    return this;
  }

  withLastName() {
    this.lastName = faker.person.lastName();
    return this;
  }

  withEmail() {
    this.email = faker.internet.email();
    return this;
  }

  withUsername() {
    this.username = faker.internet.username();
    return this;
  }

  withPassword() {
    this.password = faker.internet.password();
    return this;
  }

  withBirthday() {
    this.birthday = faker.date.birthdate().toISOString();
    return this;
  }

  build(): BuildersFactory {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      username: this.username,
      password: this.password,
      birthday: this.birthday,
    };
  }
}
