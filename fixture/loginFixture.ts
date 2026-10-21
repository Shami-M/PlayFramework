import {test as base} from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

type CustomLoginFixture = {
    loginPageCF: LoginPage;
};

export const test = base.extend<CustomLoginFixture>({
    loginPageCF: async ({page}, use) =>{
        const loginPage1 = new LoginPage(page);
        await loginPage1.navigateToLoginPage();
        await use(loginPage1);
    },
});