import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class HomePage extends BasePage {
  //private locators -

  private readonly logoutLink: Locator;
  private readonly headers: Locator;

  //constructor of the class and initialize locators
  constructor(page: Page) {
    super(page);

    this.logoutLink = page.getByRole('link', { name: 'Logout' });
    this.headers = page.getByRole('heading', { level: 2 });
  }
  //constructure is using private locators, called encapsulation

  //public page actions(methods)/behaviour of the page

  async goToLoginPage(): Promise<void> {
    await this.page.goto('opencart/index.php?route=account/login');
  }

  async isLogoutLinkExist(): Promise<boolean> {
    return await this.logoutLink.isVisible();
  }

  async getHomePageHeaders(): Promise<string[]> {
    return await this.headers.allInnerTexts();
  }

  async doSearch(searchkey: string): Promise<void> {
    console.log(`search key: ${searchkey}`);
    await this.searchBox.fill(searchkey);
    await this.searchIcon.click();
    //this.page.waitForTimeout(1000);
  }
}
