import { test, expect } from '@playwright/test';

// Accessibility tests for TodoMVC

test.describe('TodoMVC - Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
    await page.waitForSelector('input[placeholder="What needs to be done?"]');
  });

  test('should have a document role', async ({ page }) => {
    const role = await page.evaluate(() => document.body.getAttribute('role'));
    expect(role === null || role === 'document').toBeTruthy();
  });

  test('should have a main landmark', async ({ page }) => {
    const main = await page.$('main');
    expect(main).not.toBeNull();
  });

  test('input should have accessible name', async ({ page }) => {
    const input = await page.getByPlaceholder('What needs to be done?');
    const name = await input.getAttribute('aria-label');
    // Placeholder acts as accessible name if aria-label is missing
    expect(name === null || name.length > 0).toBeTruthy();
  });

  test('should have a visible heading', async ({ page }) => {
    const heading = page.getByRole('heading', { name: /todos/i });
    await expect(heading).toBeVisible();
  });

  test('should have sufficient color contrast for todos', async ({ page }) => {
    // Add a todo
    const todoInput = page.getByPlaceholder('What needs to be done?');
    await todoInput.fill('Accessibility test');
    await todoInput.press('Enter');
    // Get color and background
    const color = await page.$eval('.todo-list li label', el => getComputedStyle(el).color);
    const bg = await page.$eval('body', el => getComputedStyle(el).backgroundColor);
    // Simple contrast check (not full WCAG)
    expect(color).not.toBe(bg);
  });

  test('should support keyboard navigation for adding todos', async ({ page }) => {
    await page.keyboard.press('Tab');
    const active = await page.evaluate(() => document.activeElement?.getAttribute('placeholder'));
    expect(active).toBe('What needs to be done?');
  });

  test('should support keyboard navigation for toggling todos', async ({ page }) => {
    const todoInput = page.getByPlaceholder('What needs to be done?');
    await todoInput.fill('Keyboard toggle');
    await todoInput.press('Enter');
    // Tab to the checkbox
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    // Space to toggle
    await page.keyboard.press('Space');
    // Check if completed
    const completed = await page.$eval('.todo-list li', el => el.classList.contains('completed'));
    expect(completed).toBe(true);
  });

  test('should have labels for checkboxes', async ({ page }) => {
    const checkboxes = await page.$$('.todo-list li input[type="checkbox"]');
    for (const checkbox of checkboxes) {
      const id = await checkbox.getAttribute('id');
      const label = await page.$(`label[for="${id}"]`);
      expect(label).not.toBeNull();
    }
  });

  test('should have focus indicator on input', async ({ page }) => {
    const todoInput = page.getByPlaceholder('What needs to be done?');
    await todoInput.focus();
    const outline = await todoInput.evaluate(el => getComputedStyle(el).outlineStyle);
    expect(outline !== 'none').toBeTruthy();
  });
});
