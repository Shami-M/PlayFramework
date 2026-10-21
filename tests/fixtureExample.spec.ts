import {test} from '../fixture/loginFixture';
import {expect} from '@playwright/test';
import credentials from '../testdata/credentials.json'
import { AddItemsPage } from '../pages/AddItemsPage';
import { EditItemsInAddToCart } from '../pages/EditItemsInAddToCart';
import { CheckoutPage } from '../pages/CheckoutPage';
import items from '../testdata/items.json';

for (const item of items) {
test(`Adding ${item.itemName} to the cart`, async({loginPageCF, page})=> {
    const addItemsPage = new AddItemsPage(page);
    const edititemsInAddToCart = new EditItemsInAddToCart(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPageCF.login(credentials.userName, credentials.password);
    await expect(page).toHaveURL("https://practice.qabrains.com/ecommerce",);
    await expect(page.getByText("Products")).toBeVisible();

    //Click on item
    await addItemsPage.clickItem(item.itemName);
    //Click on add to cart btn
    await addItemsPage.clickAddToCard();

    //Check items in the cart
    await edititemsInAddToCart.checkAddedCartItems(item.itemName);
    //Update Item Count
    await edititemsInAddToCart.increaseTheItemCount(item.itemName);

    //Proceed with checkout
    await checkoutPage.clickCheckout();
    await checkoutPage.verifyEmailInCheckout(credentials.userName);
    await checkoutPage.clickContinueBtn();
    });
}