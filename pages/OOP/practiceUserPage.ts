import { Page, expect } from "playwright/test";
import { basePage } from "./basePage";

export class practiceUserPaqge extends basePage{ //Inheritance

    constructor(readonly page:Page){
        super(page);
    }

    async login(username: string, password: string): Promise<void> { // Polymorhism
        await super.login(username, password); 
        await expect(this.page.getByText('practice@qabrains.com')).toBeVisible();
        await expect(this.page.getByText('Sample Shoe Name')).toBeVisible();
    }
}