import { Page, expect, Locator } from "playwright/test";

export class basePage{
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor( readonly page:Page){
        this.page = page;
        this.usernameInput = page.locator('#email');   //Encapsulation
        this.passwordInput = page.locator('#password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    async login(username: string, password: string) {  // Abstraction
        await this.page.goto('https://practice.qabrains.com/ecommerce/login');
        await expect(this.page).toHaveURL('https://practice.qabrains.com/ecommerce/login');  

        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        await expect(this.page).toHaveURL('https://practice.qabrains.com/ecommerce');
        await expect(this.page.getByText('Products')).toBeVisible();
    }

}