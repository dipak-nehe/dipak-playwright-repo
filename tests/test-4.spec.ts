import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://web-ui.mystrength.livongo.com/login');
  await page.getByRole('link', { name: 'Create an account' }).click();
  await page.getByRole('textbox', { name: 'What\'s your access code?' }).click();
  await page.getByRole('textbox', { name: 'What\'s your access code?' }).fill('mystrength_staff');
  await page.locator('div').nth(1).click();
  await page.getByRole('button', { name: 'Start your Journey' }).click();
  await page.getByRole('textbox', { name: 'What\'s your first name?' }).fill('jonny');
  await page.getByRole('textbox', { name: 'What\'s your last name?' }).click();
  await page.getByRole('textbox', { name: 'What\'s your last name?' }).fill('decosta');
  await page.getByRole('textbox', { name: 'Choose a screen name' }).click();
  await page.getByRole('textbox', { name: 'Choose a screen name' }).fill('decota_jny');
  await page.getByRole('textbox', { name: 'What\'s your email address?' }).click();
  await page.getByRole('textbox', { name: 'What\'s your email address?' }).fill('dfgerr@test.com');
  await page.getByRole('textbox', { name: 'Create a password' }).click();
  await page.getByRole('textbox', { name: 'Create a password' }).fill('Test@100');
  await page.getByRole('textbox', { name: 'What\'s your email address?' }).press('Tab');
  await page.getByRole('textbox', { name: 'Create a password' }).press('Tab');
  await page.locator('select[name="month"]').press('Tab');
  await page.locator('select[name="month"]').selectOption('6');
  await page.locator('select[name="day"]').selectOption('10');
  await page.getByPlaceholder('Year').click();
  await page.getByPlaceholder('Year').fill('1980');
});