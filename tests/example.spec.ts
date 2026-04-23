import {expect,test} from '@playwright/test';
test('has title',async({page}) => {
  await page.goto("https://www.google.com/");
  await expect(page).toHaveTitle("Google");
});

test('Playwirght ai', async({page}) =>
{
  await page.goto("https://playwright.dev/");
  await page.getByRole('link',{name:'Get started'}).click();
  await expect(page.getByRole('heading',{name:'Installation'})).toBeVisible();
});

test.describe('navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    await page.goto('https://playwright.dev/');
  });

  test('main navigation', async ({ page }) => {
    // Assertions use the expect API.
    await expect(page).toHaveURL('https://playwright.dev/');
  });
});

test.describe("Google", ()=>{
  test.beforeEach(async ({page})=>{
    await page.goto("https://www.google.com");
  });
  test("hello", async({page}) => {
    expect(page).toHaveTitle("Google");

  });

});
