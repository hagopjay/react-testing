import { test, expect } from '@playwright/test';

test.describe('Todo App E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('creates a new todo', async ({ page }) => {
    await page.getByTestId('todo-input').fill('E2E Test Todo');
    await page.keyboard.press('Enter');
    await expect(page.getByText('E2E Test Todo')).toBeVisible();
  });

  test('completes a todo', async ({ page }) => {
    await page.getByTestId('todo-input').fill('Complete Me');
    await page.keyboard.press('Enter');
    await page.getByLabel('Mark as complete').click();
    
    const todoText = page.getByText('Complete Me');
    await expect(todoText).toHaveClass(/line-through/);
  });

  test('deletes a todo', async ({ page }) => {
    await page.getByTestId('todo-input').fill('Delete Me');
    await page.keyboard.press('Enter');
    await page.getByLabel('Delete todo').click();
    
    await expect(page.getByText('Delete Me')).not.toBeVisible();
  });

  test('clears completed todos', async ({ page }) => {
    // Add and complete first todo
    await page.getByTestId('todo-input').fill('Todo 1');
    await page.keyboard.press('Enter');
    await page.getByLabel('Mark as complete').click();
    
    // Add second todo but leave incomplete
    await page.getByTestId('todo-input').fill('Todo 2');
    await page.keyboard.press('Enter');
    
    // Clear completed
    await page.getByText('Clear completed').click();
    
    await expect(page.getByText('Todo 1')).not.toBeVisible();
    await expect(page.getByText('Todo 2')).toBeVisible();
  });
});