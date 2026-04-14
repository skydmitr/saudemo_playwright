import { test as base } from '@playwright/test';
import { faker } from '@faker-js/faker';

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

type MyFixtures = {
  userData: UserData;
};

export const test = base.extend<MyFixtures>({
  userData: async ({}, use) => {
    //todo выполнится до use

    await use({
      //выполняется
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      username: faker.internet.username(),
      password: faker.internet.password(),
    });

    //todo выполнится после того как тест закончится
  },
});

export { expect } from '@playwright/test';
//export * from '@playwright/test';
