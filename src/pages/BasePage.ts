import { Locator, Page } from '@playwright/test';

export class BasePage {
  protected readonly page: Page;
  //additing here protector because i want access this only child class of this base base class

  //common locators across all pages ; like logo, footer,search button/icon
  protected readonly logo: Locator;
  protected readonly searchBox: Locator;
  protected readonly searchIcon: Locator;
  protected readonly footerLinks: Locator;
  protected readonly currency: Locator;
  protected readonly cartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.getByAltText('naveenopencart');
    this.searchBox = page.getByPlaceholder('search');
    this.searchIcon = page.locator('div#search button');
    this.currency = page.locator('#form-currency');
    this.footerLinks = page.locator('footer a');
    this.cartButton = page.locator('div#cart button').first();
  }

  //helper/generic methods for elements actions
  /**
   * eg -
   * clickOnElement -->click()
   * fillvalue --> fill('ddg')
   * getText --> innerText()
   * elementIsVisible --> isvisible()
   *
   * in the pw we dont need to erite unneccessory generic methods on top of elemets actions methods, it just we are adding unnecessary one more extar layer
   * pw methods inbuilt designed with autowait and taking screenshot on every actions
   * in selenium we need to write that try catch block and inside taht we are adding wait and taking screenshots such things are there, but here no need to worry about it
   * this is unneccessory over engineering we are calling to this
   *
   */

  //-----------------------------------

  //BasePage we can use for common locators/functionalities/actions so it can be autoinherited, so anyone can inherited

  //common locators across all pages ; like logo, footer,search button/icon

  //common actions:
  async isLogoVisible(): Promise<boolean> {
    return this.logo.isVisible();
  }

  async isSearchBoxVisible(): Promise<boolean> {
    return this.searchBox.isVisible();
  }

  async isCurrencyVisible(): Promise<boolean> {
    return this.currency.isVisible();
  }
  async isCartButtonVisible(): Promise<boolean> {
    return this.cartButton.isVisible();
  }

  async getPageFooterCount(): Promise<number> {
    return await this.footerLinks.count();
  }

  async getPageFooter(): Promise<string[]> {
    return await this.footerLinks.allInnerTexts();
  }

  //page level generic methods
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  getCurrentUrl(): string {
    return this.page.url();
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('load');
  }

  async takeScreenshot(name: string) {
    return await this.page.screenshot({
      fullPage: true,
      path: `reports/screenshot/${name}.png`
    });
  }
}
