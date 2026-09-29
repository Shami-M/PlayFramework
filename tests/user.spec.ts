import { test, expect } from '@playwright/test';

//When you are using storageState make sure to run the spec files via CLI
test('User can access dashboard', async ({ page }) => {
   await page.goto('https://practice.qabrains.com/ecommerce');

   await expect(page.getByText('practice@qabrains.com')).toBeVisible();
});