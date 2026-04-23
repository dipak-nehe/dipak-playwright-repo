import { test, expect } from '@playwright/test';

test('test for title', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
  await expect(page.getByRole('textbox', { name: 'What needs to be done?' })).toBeVisible();
});