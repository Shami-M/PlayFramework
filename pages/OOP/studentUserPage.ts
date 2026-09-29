import { Page, expect } from "playwright/test";
import { basePage } from "./basePage";

export class studentUserPage extends basePage{ //Inheritance

    constructor(readonly page:Page){
        super(page);
    }

    async login(username: string, password: string): Promise<void> { //Polymorphism
        await super.login(username, password);  
        await expect(this.page.getByText('student@qabrains.com')).toBeVisible();
        await expect(this.page.getByText('Sample Shirt Name')).toBeVisible();
    }
}