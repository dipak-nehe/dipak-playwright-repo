import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.google.com/?zx=1776913576630');
  await expect(page.getByRole('combobox', { name: 'Search' })).toBeVisible();
  await expect(page.getByRole('search')).toContainText('Google Search');
  await expect(page.getByRole('button', { name: 'Google Search' })).toBeVisible();
  await page.getByRole('link', { name: 'About' }).click();
});

