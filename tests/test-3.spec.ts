import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.google.com/?zx=1776913576630');
  await expect(page.getByRole('combobox', { name: 'Search' })).toBeVisible();
  await expect(page.getByRole('search')).toContainText('Google Search');
  await expect(page.getByRole('button', { name: 'Google Search' })).toBeVisible();

  await page.getByRole('link', { name: 'About' }).click();
  await page.getByRole('link', { name: 'About' }).click();
  await expect(page.getByRole('navigation')).toMatchAriaSnapshot(`
    - link "About":
      - /url: https://about.google/?fg=1&utm_source=google-US&utm_medium=referral&utm_campaign=hp-header
    `);
  await page.getByRole('combobox', { name: 'Search' }).click();

  await page.getByRole('combobox', { name: 'Search' }).click();
  await expect(page.getByRole('combobox', { name: 'Search' })).toBeEmpty();
  await page.locator('div').filter({ hasText: /^I'm Feeling Trendy$/ }).click();
  await expect(page.locator('#gbqfbb')).toMatchAriaSnapshot(``);
  await expect(page.getByRole('search')).toContainText('Google Search');
  await expect(page.getByLabel('Gmail')).toContainText('Gmail');
});

