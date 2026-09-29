import { test, expect } from '@playwright/test';
//When you are using storageState make sure to run the spec files via CLI
test('Admin can access admin page - This is to test second admin page with auth file', async ({ page }) => {
  await page.goto('https://practice.qabrains.com/ecommerce');
  await expect(page.getByText('student@qabrains.com')).toBeVisible();
});