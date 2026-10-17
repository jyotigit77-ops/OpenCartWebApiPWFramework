import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class SearchResultsPage extends BasePage {
  //private locators -

  private readonly searchResult: Locator;

  //constructor of the class and initialize locators
  constructor(page: Page) {
    super(page);

    this.searchResult = page.locator('div.product-layout');
  }

  //page action
  async getProductSearchResultsCount(): Promise<number> {
    return await this.searchResult.count();
  }

  async selectProduct(productName: string): Promise<void> {
    //creatiing dynamic elemet
    await this.page.getByRole('link', { name: productName, exact: true }).first().click();
  }
}
