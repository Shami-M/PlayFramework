import { test as setup } from '@playwright/test';

setup('authenticate admin', async ({ page }) => {
  await page.goto('https://practice.qabrains.com/ecommerce/login');

  await page.locator('#email').fill("student@qabrains.com");
  await page.locator('#password').fill("Password123");
  await page.getByRole('button', { name: 'Login' }).click();

  await page.waitForURL('**/ecommerce');

  console.log('Current URL:', page.url());

  console.log(
  await page.context().cookies()
);

//To save the authuntication state in the given path 
  await page.context().storageState({
    path: 'playwright/.auth/admin.json',
  });
});

setup('authenticate user', async ({ page }) => {
  await page.goto('https://practice.qabrains.com/ecommerce/login');

  await page.locator('#email').fill("practice@qabrains.com");
  await page.locator('#password').fill("Password123");
  await page.getByRole('button', { name: 'Login' }).click();

  await page.waitForURL('**/ecommerce');

  await page.context().storageState({
    path: 'playwright/.auth/user.json',
  });
});