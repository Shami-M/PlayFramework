import {test, expect} from "@playwright/test"

//Swagger : https://practice.expandtesting.com/notes/api/api-docs/#/Users/post_users_login
//UI website : https://practice.expandtesting.com/notes/app/login

test('This test is as an example for both API and UI combination', async ({ page, request }) => {
  const requestBody = {
    email: "mayac@yopmail.com",
    password: "Test@123",
  };

  // const loginResponse = await request.post('https://practice.expandtesting.com/notes/api/users/login', {data:requestBody});
  const loginResponse = await request.post("/notes/api/users/login", {
    data: requestBody,
  });
  const responseBody = await loginResponse.json();
  console.log(responseBody);

  const token = responseBody.data.token;
  console.log("Token is : " + token);

  //Add token to browser localStorage
  await page.addInitScript((token) => {
    window.localStorage.setItem("authToken", token);
  }, token);

  //verify the url
  //await page.goto('https://practice.expandtesting.com/notes/app')

  page.on("request", request => {
  if (request.url().includes("/api/")) {
    console.log("URL:", request.url());
    console.log("Headers:", request.headers());
  }
});
  await page.goto("notes/app/login");

  console.log('Current URL:', page.url());
  console.log(
    "Token:",
    await page.evaluate(() => {
      return localStorage.getItem("authToken");
    }),
  );

  // // Take a look at all localStorage values
  // console.log(
  //   "Local Storage:",
  //   await page.evaluate(() => {
  //     return Object.entries(localStorage);
  //   })
  // );

  await expect(page.locator('[data-testid="progress-info"]')).toHaveText('You have 0/1 notes completed in the all categories');
  //await expect(page.locator('[data-testid="home"]')).toHaveAttribute('href', '/notes/app');
})