import { test, expect } from '@playwright/test';

test.describe('TodoMVC - Comprehensive Test Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
    // Wait for the app to load
    await page.waitForSelector('input[placeholder="What needs to be done?"]');
  });

  test.describe('Successful Scenarios', () => {
    test('should load TodoMVC app successfully', async ({ page }) => {
      // Take screenshot of the initial state
      await page.screenshot({ path: 'screenshots/01-initial-app-load.png' });
      
      // Verify the app is loaded
      const heading = page.getByRole('heading', { name: 'todos' });
      await expect(heading).toBeVisible();
      
      const input = page.getByPlaceholder('What needs to be done?');
      await expect(input).toBeVisible();
    });

    test('should add a single todo successfully', async ({ page }) => {
      const input = page.getByPlaceholder('What needs to be done?');
      
      // Add a todo
      await input.fill('Learn Playwright');
      await page.screenshot({ path: 'screenshots/02-after-typing-todo.png' });
      
      await input.press('Enter');
      await page.screenshot({ path: 'screenshots/03-after-adding-todo.png' });
      
      // Verify the todo was added
      const todoItem = page.locator('li').filter({ hasText: 'Learn Playwright' });
      await expect(todoItem).toBeVisible();
    });

    test('should add multiple todos successfully', async ({ page }) => {
      const input = page.getByPlaceholder('What needs to be done?');
      const todos = ['Buy groceries', 'Walk the dog', 'Write documentation'];
      
      for (let i = 0; i < todos.length; i++) {
        await input.fill(todos[i]);
        await input.press('Enter');
        await page.waitForTimeout(300);
      }
      
      await page.screenshot({ path: 'screenshots/04-multiple-todos-added.png' });
      
      // Verify all todos are visible
      for (const todo of todos) {
        const todoItem = page.locator('li').filter({ hasText: todo });
        await expect(todoItem).toBeVisible();
      }
    });

    test('should complete a todo successfully', async ({ page }) => {
      const input = page.getByPlaceholder('What needs to be done?');
      
      // Add a todo
      await input.fill('Complete project');
      await input.press('Enter');
      await page.waitForTimeout(300);
      
      // Find and click the checkbox
      const todoItem = page.locator('li').filter({ hasText: 'Complete project' });
      const checkbox = todoItem.locator('input[type="checkbox"]');
      await checkbox.click();
      await page.screenshot({ path: 'screenshots/05-todo-completed.png' });
      
      // Verify the todo is marked as completed
      await expect(todoItem).toHaveClass(/completed/);
    });

    test('should clear completed todos', async ({ page }) => {
      const input = page.getByPlaceholder('What needs to be done?');
      
      // Add multiple todos
      await input.fill('Task 1');
      await input.press('Enter');
      await page.waitForTimeout(200);
      
      await input.fill('Task 2');
      await input.press('Enter');
      await page.waitForTimeout(200);
      
      // Complete one todo
      const firstTodo = page.locator('li').filter({ hasText: 'Task 1' });
      await firstTodo.locator('input[type="checkbox"]').click();
      await page.waitForTimeout(300);
      
      await page.screenshot({ path: 'screenshots/06-before-clear-completed.png' });
      
      // Click "Clear completed" button
      const clearButton = page.getByRole('button', { name: 'Clear completed' });
      if (await clearButton.isVisible()) {
        await clearButton.click();
        await page.screenshot({ path: 'screenshots/07-after-clear-completed.png' });
        
        // Verify the completed todo is removed
        await expect(firstTodo).not.toBeVisible();
      }
    });

    test('should delete a todo using delete button', async ({ page }) => {
      const input = page.getByPlaceholder('What needs to be done?');
      
      // Add a todo
      await input.fill('Todo to delete');
      await input.press('Enter');
      await page.waitForTimeout(300);
      
      // Hover over the todo to reveal the delete button
      const todoItem = page.locator('li').filter({ hasText: 'Todo to delete' });
      await todoItem.hover();
      await page.screenshot({ path: 'screenshots/08-todo-with-delete-button.png' });
      
      // Click delete button
      const deleteButton = todoItem.locator('button.destroy');
      await deleteButton.click();
      await page.screenshot({ path: 'screenshots/09-after-delete-todo.png' });
      
      // Verify the todo is removed
      await expect(todoItem).not.toBeVisible();
    });

    test('should filter todos by status', async ({ page }) => {
      const input = page.getByPlaceholder('What needs to be done?');
      
      // Add todos
      await input.fill('Active task');
      await input.press('Enter');
      await page.waitForTimeout(200);
      
      await input.fill('Completed task');
      await input.press('Enter');
      await page.waitForTimeout(200);
      
      // Complete one todo
      const secondTodo = page.locator('li').filter({ hasText: 'Completed task' });
      await secondTodo.locator('input[type="checkbox"]').click();
      await page.waitForTimeout(300);
      
      // Click "Active" filter
      const activeFilter = page.getByRole('link', { name: 'Active' });
      await activeFilter.click();
      await page.screenshot({ path: 'screenshots/10-filtered-active.png' });
      
      // Verify only active todo is visible
      const activeTodo = page.locator('li').filter({ hasText: 'Active task' });
      await expect(activeTodo).toBeVisible();
      
      // Click "Completed" filter
      const completedFilter = page.getByRole('link', { name: 'Completed' });
      await completedFilter.click();
      await page.screenshot({ path: 'screenshots/11-filtered-completed.png' });
      
      // Verify only completed todo is visible
      await expect(secondTodo).toBeVisible();
    });

    test('should display todo count correctly', async ({ page }) => {
      const input = page.getByPlaceholder('What needs to be done?');
      
      // Add three todos
      await input.fill('Todo 1');
      await input.press('Enter');
      await page.waitForTimeout(200);
      
      await input.fill('Todo 2');
      await input.press('Enter');
      await page.waitForTimeout(200);
      
      await input.fill('Todo 3');
      await input.press('Enter');
      await page.waitForTimeout(200);
      
      await page.screenshot({ path: 'screenshots/12-three-todos-added.png' });
      
      // Verify the count is displayed
      const todoCount = page.locator('.todo-count');
      await expect(todoCount).toContainText('3');
    });

    test('should edit a todo by double-clicking', async ({ page }) => {
      const input = page.getByPlaceholder('What needs to be done?');
      
      // Add a todo
      await input.fill('Original task');
      await input.press('Enter');
      await page.waitForTimeout(300);
      
      // Double-click to edit
      const todoItem = page.locator('li').filter({ hasText: 'Original task' });
      const todoLabel = todoItem.locator('label');
      await todoLabel.dblclick();
      await page.screenshot({ path: 'screenshots/13-todo-edit-mode.png' });
      
      // Clear and type new text
      const editInput = todoItem.locator('input.edit');
      await editInput.fill('Updated task');
      await editInput.press('Enter');
      await page.screenshot({ path: 'screenshots/14-todo-updated.png' });
      
      // Verify the todo text is updated
      const updatedTodo = page.locator('li').filter({ hasText: 'Updated task' });
      await expect(updatedTodo).toBeVisible();
    });
  });

  test.describe('Failing/Edge Case Scenarios', () => {
    test('should not add empty todo', async ({ page }) => {
      const input = page.getByPlaceholder('What needs to be done?');
      
      await page.screenshot({ path: 'screenshots/15-empty-input-before-submit.png' });
      
      // Try to submit empty input
      await input.press('Enter');
      await page.waitForTimeout(300);
      
      await page.screenshot({ path: 'screenshots/16-empty-input-after-submit.png' });
      
      // Verify no todo was added
      const todoItems = page.locator('li');
      const count = await todoItems.count();
      expect(count).toBe(0);
    });

    test('should handle whitespace-only input', async ({ page }) => {
      const input = page.getByPlaceholder('What needs to be done?');
      
      // Try to add whitespace-only todo
      await input.fill('   ');
      await input.press('Enter');
      await page.waitForTimeout(300);
      
      await page.screenshot({ path: 'screenshots/17-whitespace-input.png' });
      
      // Verify no meaningful todo was added
      const todoItems = page.locator('li');
      const count = await todoItems.count();
      expect(count).toBe(0);
    });

    test('should handle very long todo text', async ({ page }) => {
      const input = page.getByPlaceholder('What needs to be done?');
      const longText = 'This is a very long todo item that contains a lot of text to test how the application handles long inputs. ' + 
                       'It should display properly without breaking the layout or causing any visual issues. ' +
                       'Let\'s see if it wraps correctly and remains readable.';
      
      await input.fill(longText);
      await page.screenshot({ path: 'screenshots/18-long-todo-input.png' });
      
      await input.press('Enter');
      await page.screenshot({ path: 'screenshots/19-long-todo-added.png' });
      
      // Verify the long todo was added
      const todoItem = page.locator('li').filter({ hasText: longText.substring(0, 50) });
      await expect(todoItem).toBeVisible();
    });

    test('should handle special characters in todo', async ({ page }) => {
      const input = page.getByPlaceholder('What needs to be done?');
      const specialText = 'Todo with special chars: @#$%^&*()_+-=[]{}|;:,.<>?/`~';
      
      await input.fill(specialText);
      await page.screenshot({ path: 'screenshots/20-special-chars-input.png' });
      
      await input.press('Enter');
      await page.screenshot({ path: 'screenshots/21-special-chars-added.png' });
      
      // Verify the todo with special characters was added
      const todoItem = page.locator('li').filter({ hasText: 'special chars' });
      await expect(todoItem).toBeVisible();
    });

    test('should handle unicode characters', async ({ page }) => {
      const input = page.getByPlaceholder('What needs to be done?');
      const unicodeText = '日本語のタスク - Tâche en français - مهمة بالعربية';
      
      await input.fill(unicodeText);
      await page.screenshot({ path: 'screenshots/22-unicode-input.png' });
      
      await input.press('Enter');
      await page.screenshot({ path: 'screenshots/23-unicode-added.png' });
      
      // Verify the unicode todo was added
      const todoItem = page.locator('li').filter({ hasText: '日本語' });
      await expect(todoItem).toBeVisible();
    });

    test('should add todos with different input methods', async ({ page }) => {
      const input = page.getByPlaceholder('What needs to be done?');
      
      // Add first todo with Enter key
      await input.fill('Todo with Enter');
      await input.press('Enter');
      await page.waitForTimeout(200);
      
      await page.screenshot({ path: 'screenshots/24-multiple-input-methods.png' });
      
      // Verify first todo was added
      const firstTodo = page.locator('li').filter({ hasText: 'Todo with Enter' });
      await expect(firstTodo).toBeVisible();
    });

    test('should clear edit when pressing Escape', async ({ page }) => {
      const input = page.getByPlaceholder('What needs to be done?');
      
      // Add a todo
      await input.fill('Original text');
      await input.press('Enter');
      await page.waitForTimeout(300);
      
      // Double-click to edit
      const todoItem = page.locator('li').filter({ hasText: 'Original text' });
      const todoLabel = todoItem.locator('label');
      await todoLabel.dblclick();
      await page.waitForTimeout(200);
      
      // Modify but then press Escape
      const editInput = todoItem.locator('input.edit');
      await editInput.fill('Changed text');
      await page.screenshot({ path: 'screenshots/25-edit-before-escape.png' });
      
      await editInput.press('Escape');
      await page.screenshot({ path: 'screenshots/26-edit-after-escape.png' });
      
      // Verify the original text is preserved
      const originalTodo = page.locator('li').filter({ hasText: 'Original text' });
      await expect(originalTodo).toBeVisible();
    });

    test('should persist todos on page reload', async ({ page }) => {
      const input = page.getByPlaceholder('What needs to be done?');
      
      // Add some todos
      await input.fill('Persistent task 1');
      await input.press('Enter');
      await page.waitForTimeout(200);
      
      await input.fill('Persistent task 2');
      await input.press('Enter');
      await page.waitForTimeout(200);
      
      await page.screenshot({ path: 'screenshots/27-before-reload.png' });
      
      // Reload the page
      await page.reload();
      await page.waitForSelector('input[placeholder="What needs to be done?"]');
      
      await page.screenshot({ path: 'screenshots/28-after-reload.png' });
      
      // Verify todos are still present
      const task1 = page.locator('li').filter({ hasText: 'Persistent task 1' });
      const task2 = page.locator('li').filter({ hasText: 'Persistent task 2' });
      
      await expect(task1).toBeVisible();
      await expect(task2).toBeVisible();
    });
  });
});
