import { Locator, Page, expect } from "@playwright/test";


export class CheckoutPage {
  
  private readonly checkoutBtn: Locator;
  private readonly email: Locator;
  private readonly continueBtn: Locator;
  // private readonly fName: Locator;
  // private readonly lName: Locator;
  // private readonly zipCode: Locator;

  constructor(private readonly page: Page) {
    this.checkoutBtn = page.locator('button[type="button"]').filter({ hasText: "Checkout" }),
    this.email = page.locator("//label[contains(text(), 'Email')]//following-sibling::input"),
    this.continueBtn = page.locator('button[type="button"]').filter({ hasText: "Continue" })
    // this.fName = page.getByPlaceholder('Ex. John'),
    // this.lName = page.getByPlaceholder("Ex. Doe"),
    // this.zipCode = page.locator("//label[contains(text(), 'Zip Code')]//following-sibling::input")
  }

  async clickCheckout() {
    if (await this.checkoutBtn.isVisible()) {
      await this.checkoutBtn.click();
    } else {
      throw new Error("Checkout button is not visible");
    }
  }

  async verifyEmailInCheckout(userName:string) {
    await expect(this.email).toHaveValue(userName);
  }

//   async addUserDetails(){
//     const generateRandomStringsNumbers = new stringUtils();
//   }

  async clickContinueBtn(){
    await expect(this.continueBtn).toBeVisible();
    await this.continueBtn.click();
    await expect(this.page.getByText('Checkout: Overview')).toBeVisible();
  }
}