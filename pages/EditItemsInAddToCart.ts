import { Locator, Page, expect } from "@playwright/test";

export class EditItemsInAddToCart{

    private readonly page:Page;
    private readonly iconCart: Locator;
    private readonly displayedItemInCart: Locator;

    constructor(page:Page){
        this.page = page;
        this.iconCart = page.locator('svg[stroke="currentColor"]').first();
        this.displayedItemInCart = page.locator('#cart .mt-3 h3');
    }

    productDetailsRow(itemName:string): Locator{
        return this.page.locator("//h3[text()='"+itemName+"']//ancestor::div[contains(@class,'justify-between')]");
    }

    async checkAddedCartItems(itemName:string){
        await expect(this.iconCart).toBeVisible();
        await this.iconCart.click();
        await expect(this.displayedItemInCart).toHaveText(itemName);
    }

    //async increaseTheItemCount(itemName:string, btnName:string){
    async increaseTheItemCount(itemName:string){
        //Increase the value by one
        //await this.productDetailsRow(itemName).locator("//button[contains(text(), '"+btnName+"')]").click();
        await this.productDetailsRow(itemName).locator("//button[contains(text(), '+')]").click();
        const priceValue = await this.productDetailsRow(itemName).getByText("Price").locator("xpath=following-sibling::p[1]").innerText();
        console.log(priceValue);
        //Verify the amount is accurate
        const actualTotalPriceValue = await this.productDetailsRow(itemName).getByText("Total").locator("xpath=following-sibling::p[1]").innerText();
        console.log(actualTotalPriceValue);

        // Remove the "$" sign and convert to number
        const expectedPriceValue = parseFloat(priceValue.replace('$', ''));
        // Now do your calculation
        const totalPriceValue = expectedPriceValue * 2;
        console.log(totalPriceValue); //178

        //const formattedexpectedPrice = `$${totalPriceValue.toFixed(2)}`;
        //OR
        const formattedexpectedPrice = '$' + totalPriceValue.toFixed(2);
        console.log(formattedexpectedPrice);
        expect(actualTotalPriceValue).toBe(formattedexpectedPrice);
        
    }

}