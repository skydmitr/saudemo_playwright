import { faker } from '@faker-js/faker';
import { Page } from 'playwright';

interface calendarProps {
  page: Page;
}

export async function calendar({ page }: calendarProps) {
  const year = faker.number.int({ min: 1900, max: 2026 });
  const month = faker.number.int({ min: 0, max: 11 });
  const daysMonth = new Date(year, month + 1, 0).getDate();
  const day = faker.number.int({ min: 1, max: daysMonth });

  await page.getByRole('textbox', { name: 'Birthdate' }).click();
  await page.getByLabel('Select month').selectOption(`${month}`);
  await page.getByLabel('Select year').selectOption(`${year}`);
  await page.getByRole('link', { name: `${day}`, exact: true }).click();
}
