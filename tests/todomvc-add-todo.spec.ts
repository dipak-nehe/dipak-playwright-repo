import { test, expect } from '@playwright/test';

test.describe('TodoMVC - Add Todo Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the TodoMVC app
    await page.goto('https://demo.playwright.dev/todomvc');
  });

  test('should add a single todo item', async ({ page }) => {
    // Find the input field and add a todo
    const todoInput = page.getByPlaceholder('What needs to be done?');
    
    // Type a todo item
    await todoInput.fill('Buy groceries');
    
    // Press Enter to add the todo
    await todoInput.press('Enter');
    
    // Verify the todo item was added
    const todoItem = page.getByText('Buy groceries');
    await expect(todoItem).toBeVisible();
  });

  test('should add multiple todo items', async ({ page }) => {
    const todoInput = page.getByPlaceholder('What needs to be done?');
    
    const todos = ['Buy groceries', 'Walk the dog', 'Complete project'];
    
    for (const todo of todos) {
      await todoInput.fill(todo);
      await todoInput.press('Enter');
    }
    
    // Verify all todos were added
    for (const todo of todos) {
      const todoItem = page.getByText(todo);
      await expect(todoItem).toBeVisible();
    }
  });

  test('should display todo count correctly', async ({ page }) => {
    const todoInput = page.getByPlaceholder('What needs to be done?');
    
    // Add two todos
    await todoInput.fill('First todo');
    await todoInput.press('Enter');
    
    await todoInput.fill('Second todo');
    await todoInput.press('Enter');
    
    // Check if there are 2 items in the list
    const todoItems = page.locator('[data-testid="todo-item"]');
    await expect(todoItems).toHaveCount(2);
  });

  test('should clear input field after adding todo', async ({ page }) => {
    const todoInput = page.getByPlaceholder('What needs to be done?');
    
    await todoInput.fill('Test todo');
    await todoInput.press('Enter');
    
    // Verify input field is cleared
    await expect(todoInput).toHaveValue('');
  });
});
