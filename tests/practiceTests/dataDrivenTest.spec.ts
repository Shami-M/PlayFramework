import {test, expect} from '@playwright/test';
import dataDriven from '../../testdata/dataDriven.json';

const testData = [
  { userName: "test@qabrains.com", password: "Password123" },
  { userName: "practice@qabrains.com", password: "Password123" },
  { userName: "student@qabrains.com", password: "Password123" },
];

testData.forEach((data) => {
  test(`Data-driven tesing using array of data. User - ${data.userName}`, async ({ page }) => {
    await page.goto("https://practice.qabrains.com/ecommerce");
    await page.fill('#email',data.userName);
    await page.fill('#password',data.password);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(
      "https://practice.qabrains.com/ecommerce",
    );
    await expect(page.getByText("Products")).toBeVisible();
    await expect(page.getByText(data.userName)).toBeVisible();
    console.log(data.userName)
  });
});


for (const testCase of dataDriven) {
  test(`Data-driven tesing using a json file. User - ${testCase.userName}`, async ({page}) => {
    await page.goto("https://practice.qabrains.com/ecommerce");
    await page.fill("#email", testCase.userName);
    await page.fill("#password", testCase.password);
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page).toHaveURL("https://practice.qabrains.com/ecommerce");
    await expect(page.getByText("Products")).toBeVisible();
    await expect(page.getByText(testCase.userName)).toBeVisible();
    console.log(testCase.userName)
  });
}
