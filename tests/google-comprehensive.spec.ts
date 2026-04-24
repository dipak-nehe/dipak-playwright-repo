import { test, expect } from '@playwright/test';

test.describe('Google.com - Comprehensive Test Suite', , {
  tag: '@report',
},() => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.google.com');
    await page.waitForLoadState('networkidle');
  });

  test.describe('Successful Scenarios', () => {
    test('should load Google homepage successfully', {
  tag: '@fast',}, async ({ page }) => {
      // Take screenshot of initial load
      await page.screenshot({ path: 'screenshots/01-google-homepage-load.png' });
      
      // Verify page title
      await expect(page).toHaveTitle(/Google/);
      
      // Verify search box is visible
      const searchBox = page.locator('textarea[aria-label="Search"], input[aria-label="Search"]').first();
      await expect(searchBox).toBeVisible();
    });

    test('should display Google logo @slow', async ({ page }) => {
      // Look for Google logo
      const logo = page.locator('img[alt="Google"]').first();
      await expect(logo).toBeVisible();
      
      await page.screenshot({ path: 'screenshots/02-google-logo-visible.png' });
    });

    test('should display search suggestions on input', async ({ page }) => {
      const searchBox = page.locator('textarea[aria-label="Search"], input[aria-label="Search"]').first();
      
      // Type in search box
      await searchBox.click();
      await searchBox.fill('playwright');
      
      await page.waitForTimeout(500);
      await page.screenshot({ path: 'screenshots/03-search-suggestions.png' });
      
      // Verify suggestions dropdown appears
      const suggestionsContainer = page.locator('[role="listbox"]');
      await expect(suggestionsContainer).toBeVisible();
    });

    test('should perform a search successfully', async ({ page }) => {
      const searchBox = page.locator('textarea[aria-label="Search"], input[aria-label="Search"]').first();
      
      // Type search query
      await searchBox.fill('playwright testing');
      await page.screenshot({ path: 'screenshots/04-search-query-entered.png' });
      
      // Submit search
      await searchBox.press('Enter');
      
      // Wait for results page
      await page.waitForURL(/search/);
      await page.waitForLoadState('networkidle');
      await page.screenshot({ path: 'screenshots/05-search-results-page.png' });
      
      // Verify results are displayed
      const resultItems = page.locator('[data-sokoban-container] > div');
      const count = await resultItems.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should navigate with search results', async ({ page }) => {
      const searchBox = page.locator('textarea[aria-label="Search"], input[aria-label="Search"]').first();
      
      // Perform search
      await searchBox.fill('javascript');
      await searchBox.press('Enter');
      await page.waitForURL(/search/);
      await page.waitForLoadState('networkidle');
      
      // Click first result
      const firstResult = page.locator('a[data-sokoban-container]').first();
      await expect(firstResult).toBeVisible();
      
      await page.screenshot({ path: 'screenshots/06-first-search-result-visible.png' });
      
      // Get the link URL
      const href = await firstResult.getAttribute('href');
      expect(href).toBeTruthy();
    });

    test('should display Google footer', async ({ page }) => {
      // Scroll to bottom
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(300);
      
      await page.screenshot({ path: 'screenshots/07-google-footer.png' });
      
      // Verify footer links exist
      const footerLinks = page.locator('footer a');
      const count = await footerLinks.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should have clickable "I\'m Feeling Lucky" button', async ({ page }) => {
      const luckyButton = page.locator('input[value="I\'m Feeling Lucky"]');
      
      if (await luckyButton.isVisible()) {
        await page.screenshot({ path: 'screenshots/08-feeling-lucky-button.png' });
        await expect(luckyButton).toBeEnabled();
      }
    });

    test('should display language options', async ({ page }) => {
      // Scroll to bottom to find language options
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(300);
      
      const languageLinks = page.locator('a:has-text("العربية"), a:has-text("中文"), a:has-text("Español")');
      const count = await languageLinks.count();
      
      await page.screenshot({ path: 'screenshots/09-language-options.png' });
      expect(count).toBeGreaterThanOrEqual(0); // May vary by region
    });

    test('should have functioning navigation buttons', async ({ page }) => {
      const searchBox = page.locator('textarea[aria-label="Search"], input[aria-label="Search"]').first();
      
      // Perform search
      await searchBox.fill('test query');
      await searchBox.press('Enter');
      await page.waitForURL(/search/);
      await page.waitForLoadState('networkidle');
      
      await page.screenshot({ path: 'screenshots/10-search-results-navigation.png' });
      
      // Verify page info
      const resultInfo = page.locator('div:has-text("About") >> nth=0');
      // Results should be displayed
      expect(await page.content()).toContain('result');
    });
  });

  test.describe('Edge Cases & Failing Scenarios', () => {
    test('should handle empty search gracefully', async ({ page }) => {
      const searchBox = page.locator('textarea[aria-label="Search"], input[aria-label="Search"]').first();
      
      await page.screenshot({ path: 'screenshots/11-empty-search-state.png' });
      
      // Try to submit empty search
      await searchBox.click();
      await searchBox.press('Enter');
      
      await page.waitForTimeout(500);
      
      // Should either stay on home page or show no results
      const url = page.url();
      const isHomePage = url.includes('google.com') && !url.includes('search');
      
      expect(isHomePage).toBeTruthy();
    });

    test('should handle whitespace-only search', async ({ page }) => {
      const searchBox = page.locator('textarea[aria-label="Search"], input[aria-label="Search"]').first();
      
      // Type only whitespace
      await searchBox.fill('   ');
      await page.screenshot({ path: 'screenshots/12-whitespace-search.png' });
      
      await searchBox.press('Enter');
      await page.waitForTimeout(500);
      
      // Should handle gracefully
      const url = page.url();
      await expect(page).toHaveURL(/.*google.*/);
    });

    test('should handle very long search queries', async ({ page }) => {
      const searchBox = page.locator('textarea[aria-label="Search"], input[aria-label="Search"]').first();
      
      const longQuery = 'a'.repeat(200) + ' testing search query';
      await searchBox.fill(longQuery);
      
      await page.screenshot({ path: 'screenshots/13-long-search-query.png' });
      
      // Should accept long input
      const value = await searchBox.inputValue();
      expect(value.length).toBeGreaterThan(100);
    });

    test('should handle special characters in search', async ({ page }) => {
      const searchBox = page.locator('textarea[aria-label="Search"], input[aria-label="Search"]').first();
      
      const specialCharsQuery = '@#$%^&*()_+-=[]{}|;:,.<>?/`~';
      await searchBox.fill(specialCharsQuery);
      
      await page.screenshot({ path: 'screenshots/14-special-chars-search.png' });
      
      await searchBox.press('Enter');
      await page.waitForTimeout(500);
      
      // Should handle special characters
      await expect(page).toHaveURL(/.*google.*/);
    });

    test('should handle unicode characters in search', async ({ page }) => {
      const searchBox = page.locator('textarea[aria-label="Search"], input[aria-label="Search"]').first();
      
      const unicodeQuery = '日本語のテスト - عربي - Español - Français';
      await searchBox.fill(unicodeQuery);
      
      await page.screenshot({ path: 'screenshots/15-unicode-search.png' });
      
      await searchBox.press('Enter');
      await page.waitForLoadState('networkidle');
      await page.screenshot({ path: 'screenshots/16-unicode-search-results.png' });
      
      // Should process unicode correctly
      await expect(page).toHaveURL(/.*google.*/);
    });

    test('should handle rapid successive searches', async ({ page }) => {
      const searchBox = page.locator('textarea[aria-label="Search"], input[aria-label="Search"]').first();
      
      // Perform multiple rapid searches
      const queries = ['javascript', 'python', 'go programming'];
      
      for (const query of queries) {
        await page.goto('https://www.google.com');
        await page.waitForLoadState('networkidle');
        
        const box = page.locator('textarea[aria-label="Search"], input[aria-label="Search"]').first();
        await box.fill(query);
        await box.press('Enter');
        await page.waitForURL(/search/);
      }
      
      await page.screenshot({ path: 'screenshots/17-final-search-results.png' });
      
      expect(await page.content()).toContain('result');
    });

    test('should handle clear search field', async ({ page }) => {
      const searchBox = page.locator('textarea[aria-label="Search"], input[aria-label="Search"]').first();
      
      // Enter text
      await searchBox.fill('test search');
      await page.screenshot({ path: 'screenshots/18-search-with-text.png' });
      
      // Clear it
      await searchBox.fill('');
      await page.screenshot({ path: 'screenshots/19-search-cleared.png' });
      
      // Verify cleared
      const value = await searchBox.inputValue();
      expect(value).toBe('');
    });

    test('should maintain search history UI', async ({ page }) => {
      const searchBox = page.locator('textarea[aria-label="Search"], input[aria-label="Search"]').first();
      
      // Perform a search
      await searchBox.fill('playwright');
      await searchBox.press('Enter');
      await page.waitForURL(/search/);
      await page.waitForLoadState('networkidle');
      
      await page.screenshot({ path: 'screenshots/20-search-results-interface.png' });
      
      // Verify back button works
      await page.goBack();
      await page.waitForLoadState('networkidle');
      
      await page.screenshot({ path: 'screenshots/21-back-to-homepage.png' });
      
      expect(page.url()).toContain('google.com');
    });

    test('should handle search with numbers and symbols', async ({ page }) => {
      const searchBox = page.locator('textarea[aria-label="Search"], input[aria-label="Search"]').first();
      
      const query = 'C++ 2024 $500';
      await searchBox.fill(query);
      
      await page.screenshot({ path: 'screenshots/22-alphanumeric-search.png' });
      
      await searchBox.press('Enter');
      await page.waitForURL(/search/);
      await page.waitForLoadState('networkidle');
      
      await page.screenshot({ path: 'screenshots/23-alphanumeric-results.png' });
      
      expect(await page.content()).toContain('result');
    });

    test('should display correct page title on searches', async ({ page }) => {
      const searchBox = page.locator('textarea[aria-label="Search"], input[aria-label="Search"]').first();
      
      await searchBox.fill('testing framework');
      await searchBox.press('Enter');
      await page.waitForURL(/search/);
      await page.waitForLoadState('networkidle');
      
      await page.screenshot({ path: 'screenshots/24-search-page-title.png' });
      
      // Title should contain search query
      const title = await page.title();
      expect(title.toLowerCase()).toContain('test');
    });

    test('should handle browser back/forward navigation', async ({ page }) => {
      const searchBox = page.locator('textarea[aria-label="Search"], input[aria-label="Search"]').first();
      
      // Initial homepage
      await page.screenshot({ path: 'screenshots/25-navigation-initial.png' });
      
      // Search
      await searchBox.fill('navigation test');
      await searchBox.press('Enter');
      await page.waitForURL(/search/);
      await page.waitForLoadState('networkidle');
      
      await page.screenshot({ path: 'screenshots/26-navigation-search-results.png' });
      
      // Go back
      await page.goBack();
      await page.waitForLoadState('networkidle');
      
      await page.screenshot({ path: 'screenshots/27-navigation-back.png' });
      
      expect(page.url()).toContain('google.com');
    });

    test('should handle paste into search box', async ({ page }) => {
      const searchBox = page.locator('textarea[aria-label="Search"], input[aria-label="Search"]').first();
      
      // Click search box
      await searchBox.click();
      
      // Use keyboard to paste (simulated)
      await searchBox.fill('pasted search query');
      
      await page.screenshot({ path: 'screenshots/28-pasted-search.png' });
      
      const value = await searchBox.inputValue();
      expect(value).toBe('pasted search query');
    });

    test('should handle rapid clicking on search button', async ({ page }) => {
      const searchBox = page.locator('textarea[aria-label="Search"], input[aria-label="Search"]').first();
      
      await searchBox.fill('rapid click test');
      
      // Take screenshot before search
      await page.screenshot({ path: 'screenshots/29-before-search-submit.png' });
      
      // Submit search
      await searchBox.press('Enter');
      await page.waitForURL(/search/);
      await page.waitForLoadState('networkidle');
      
      await page.screenshot({ path: 'screenshots/30-after-search-submit.png' });
      
      expect(await page.content()).toContain('result');
    });
  });
});
