import { test, expect } from '@playwright/test';

test('counter interactions', async ({ page }) => {
  await page.goto('/');
  
  // Check initial state
  await expect(page.getByTestId('count-value')).toHaveText('0');
  
  // Test increment
  await page.getByLabel('Increase count').click();
  await expect(page.getByTestId('count-value')).toHaveText('1');
  
  // Test decrement
  await page.getByLabel('Decrease count').click();
  await expect(page.getByTestId('count-value')).toHaveText('0');
  
  // Test multiple interactions
  await page.getByLabel('Increase count').click();
  await page.getByLabel('Increase count').click();
  await expect(page.getByTestId('count-value')).toHaveText('2');
});