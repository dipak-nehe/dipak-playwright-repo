import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// WCAG accessibility audit for the entire page

test.describe('TodoMVC - WCAG Accessibility Audit', () => {
  test('should have no critical or serious WCAG violations', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
    await page.waitForSelector('input[placeholder="What needs to be done?"]');

    // Run axe-core accessibility scan
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    // Filter for critical and serious violations
    const violations = results.violations.filter(v => v.impact === 'critical' || v.impact === 'serious');

    if (violations.length > 0) {
      console.log('WCAG Violations:', JSON.stringify(violations, null, 2));
    }
    expect(violations.length, `WCAG violations found: ${violations.map(v => v.id).join(', ')}`).toBe(0);
  });
});
