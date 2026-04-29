import { test, expect, chromium } from '@playwright/test';
import { FastAndReliable } from './mainpage';


test.describe("mys_sample", () => {
  test.beforeEach(async ({ }) => {
    
  });


test('test mys', async ({page}) => {
  await page.goto('https://playwright.dev/');
  const fastAndReliablePage = new FastAndReliable(page);
  await fastAndReliablePage.isAccessibilityinsightsLinkVisible();
  await fastAndReliablePage.isGettingStartedLinkVisible();
  await fastAndReliablePage.isPlaywrightTrainingLinkVisible();
  await fastAndReliablePage.isLearnVideosLinkVisible();
  await fastAndReliablePage.isFeatureVideosLinkVisible();
  await fastAndReliablePage.isStackOverflowLinkVisible();
  await fastAndReliablePage.isDiscordLinkVisible();
  await fastAndReliablePage.isTwitterLinkVisible();
  await fastAndReliablePage.isLinkedinLinkVisible();
  await fastAndReliablePage.isFooterGithubLinkVisible();
  await fastAndReliablePage.isYoutubeLinkVisible();
  await fastAndReliablePage.isBlogLinkVisible();
  await fastAndReliablePage.isAmbassadorsLinkVisible();
  await fastAndReliablePage.isMicrosoftPrivacyStatementLinkVisible();
  await expect(page.locator('h1')).toContainText('Playwright enables reliable web automation for testing, scripting, and AI agents.');
  await expect(page.getByRole('banner')).toContainText('One API to drive Chromium, Firefox, and WebKit — in your tests, your scripts, and your agent workflows. Available for TypeScript, Python, .NET, and Java.');
  await expect(page.getByRole('link', { name: 'Get started' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Get started' })).toHaveAttribute('href', '/docs/intro');
  await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toHaveAttribute('href', '/');
  await page.getByRole('link', { name: 'Playwright logo Playwright' }).click();
  await expect(page.getByLabel('Main', { exact: true }).locator('b')).toContainText('Playwright');
  await expect(page.getByRole('link', { name: 'Star microsoft/playwright on' })).toHaveText("Star");
  await expect(page.getByRole('link', { name: /stargazers on GitHub/i })).toBeVisible();
  await page.locator('button:has(.DocSearch-Button-Placeholder)').click();
  await page.getByRole('searchbox', { name: 'Search' }).fill('google');
  await page.getByRole('link', { name: 'Google Chrome & Microsoft Edge Browsers', exact: true }).click();

    });

  test.afterEach(async ({page,browser }) => {
    await page.close();
    await browser.close();
  });
});