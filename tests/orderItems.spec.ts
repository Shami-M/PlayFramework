import{test} from '@playwright/test';
import { AddToCartHelper } from '../helpers/addToCartHelper';
import credentials from '../testdata/credentials.json'
import { LoginPage } from '../pages/loginPage';
import { AddItemsPage } from '../pages/AddItemsPage';
import { EditItemsInAddToCart } from '../pages/EditItemsInAddToCart';
import { CheckoutPage } from '../pages/CheckoutPage';

test('Order items', async({page})=>{
    const loginPage = new LoginPage(page);
    const addItemsPage = new AddItemsPage(page);
    const edititemsInAddToCart = new EditItemsInAddToCart(page)
    const addToCartHelpers = new AddToCartHelper(page, loginPage, addItemsPage, edititemsInAddToCart);
    const checkoutPage = new CheckoutPage(page);

    //Login to the system and and items to the cart
    await addToCartHelpers.addItemsToCart(credentials.userName, credentials.password,"Sample Shoe Name");

    //Proceed with checkout
    await checkoutPage.clickCheckout();
    await checkoutPage.verifyEmailInCheckout(credentials.userName);
    await checkoutPage.clickContinueBtn();



})