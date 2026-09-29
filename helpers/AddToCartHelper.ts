import { Page, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { AddItemsPage } from "../pages/AddItemsPage";
import { EditItemsInAddToCart } from "../pages/EditItemsInAddToCart";

export class AddToCartHelper{

    //Private keyword to enforce encapsulation and prevent tests from directly accessing internal implementation details. 
    // I use readonly for objects like Playwright Page, Locator, API clients, and configuration values
    //  because they should be initialized once and not reassigned.
    private readonly page: Page;
    
    constructor(
        page:Page,
        private loginPage: LoginPage,
        private addItemsPage: AddItemsPage ,
        private edititemsInAddToCart: EditItemsInAddToCart       
        ) {
            this.page = page;
        }
    
    async addItemsToCart(username: string, password: string, itemName:string){
        //Broswe navigation
        await this.loginPage.navigateToLoginPage();
        
        //Login to the system
        await this.loginPage.login(username, password);
        await expect(this.page).toHaveURL('https://practice.qabrains.com/ecommerce');
        await expect(this.page.getByText('Products')).toBeVisible();

        //Click on item
        await this.addItemsPage.clickItem(itemName);

        //Click on add to cart btn
        await this.addItemsPage.clickAddToCard();

        //Check items in the cart
        await this.edititemsInAddToCart.checkAddedCartItems(itemName);

        //Update Item Count
        await this.edititemsInAddToCart.increaseTheItemCount(itemName);
    }


}
