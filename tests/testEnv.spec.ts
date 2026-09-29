import {test, expect} from '@playwright/test'

test('Running tests using env files', async ({ page }) => {
  await page.goto('https://practice.qabrains.com/ecommerce/login');

  //"!"" means --> I know this environment variable exists, so treat it as a string rather than possibly undefined.
  await page.locator('#email').fill(process.env.USERNAME!);
  await page.locator('#password').fill(process.env.PASSWORD!);
  await page.getByRole('button', { name: 'Loginb' }).click();

  await page.waitForURL('**/ecommerce');
 await expect(page.getByText('practice@qabrains.com')).toBeVisible();

});