import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class ProductInfoPage extends BasePage {
  //private locators -

  private readonly header: Locator;
  private readonly productImages: Locator;
  private readonly productMetaData: Locator;
  private readonly productPricing: Locator;
  private readonly productQty: Locator;
  private readonly addToCartButton: Locator;
  private readonly succesAlert: Locator;
  private readonly shoppingCartLink: Locator;
  private map: Map<string, string | number>;

  //constructor of the class and initialize locators
  constructor(page: Page) {
    super(page);

    this.header = page.getByRole('heading', { level: 1 });
    this.productImages = page.locator('div#content li img');
    this.productMetaData = page.locator('div#content ul.list-unstyled:nth-of-type(1) li');
    this.productPricing = page.locator('div#content ul.list-unstyled:nth-of-type(2) li');
    this.productQty = page.getByRole('textbox', { name: 'Qty' });
    this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' });
    this.succesAlert = page.locator('div.alert-success');
    this.shoppingCartLink = page.getByRole('link', { name: 'shopping cart' }).last();
    this.map = new Map<string, string | number>();
  }

  //page action
  async getProductHeader(): Promise<string> {
    return await this.header.innerText();
  }

  async getProductImagesCount(): Promise<number> {
    //await this.page.waitForTimeout(4000); this one we can not provide give below like
    await this.productImages.first().waitFor({ state: 'visible' });
    return await this.productImages.count();
  }

  /**
   *
   * @returns this method is returning actual product data: header, images, metadata, pricing data
   */
  async getProductInfo(): Promise<Map<string, string | Number>> {
    this.map.set('ProductHeader', await this.getProductHeader());
    this.map.set('ProductImages', await this.getProductImagesCount());
    await this.getProductMetaData();
    await this.getProductPricingData();
    return this.map;
  }

  //below methods made private -> following encapsulation rule , not giving access to call outside of the class , using above method they can get daat

  // Brand: Apple
  // Product Code: Product 18
  // Reward Points: 800
  // Availability: Out Of Stock
  private async getProductMetaData(): Promise<void> {
    let metaData = await this.productMetaData.allInnerTexts();
    for (let data of metaData) {
      //it will go in 1st row- Brand: Apple
      let meta = data.split(':'); //using split(':') we are splitting , means removing : between , so meta[0]=Brand and meta[1]=apple
      let metaKey = meta[0].trim();
      let metaVal = meta[1].trim();
      this.map.set(metaKey, metaVal);
    }
  }

  // $2,000.00
  // Ex Tax: $2,000.00
  private async getProductPricingData(): Promise<void> {
    let priceData = await this.productPricing.allInnerTexts();
    let productPrice = priceData[0].trim();
    let exTaxPrice = priceData[1].split(':')[1].trim();
    this.map.set('Product Price', productPrice);
    this.map.set('ExTaxPrice', productPrice);
  }

  async addToCartProduct(qty: string): Promise<void> {
    await this.productQty.fill(qty);
    console.log('Product quantity: ', qty);
    await this.addToCartButton.click();
  }

  async isSuccessAlertDisplayed(): Promise<boolean> {
    let successAlertText = await this.succesAlert.textContent();
    console.log(successAlertText);
    return await this.succesAlert.isVisible();
  }

  async selectShoppingCart() {
    await this.shoppingCartLink.click();
  }
}
