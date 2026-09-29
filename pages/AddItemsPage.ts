import { Locator, Page, expect } from "@playwright/test";

export class AddItemsPage{

    private readonly page:Page;
    private readonly btnAddToCart: Locator;
    private readonly bannerSuccess: Locator;

    constructor(page:Page){
        this.page = page;
        this.btnAddToCart = page.getByText('Add to cart');
        this.bannerSuccess = page.getByRole('listitem').filter({ hasText: 'Added to cart' })
    }

    itemLink(itemName: string): Locator {
        return this.page.getByAltText(itemName);
    }

    async clickItem(itemName: string) {
        await expect(this.itemLink(itemName)).toBeVisible();
        await this.itemLink(itemName).click();
        //Selected item is correct
        await expect(this.page.locator('.font-bold.mb-3')).toContainText(itemName);
    }

    async clickAddToCard(){
        await this.btnAddToCart.click();
        await expect(this.bannerSuccess).toBeVisible();
    }
}