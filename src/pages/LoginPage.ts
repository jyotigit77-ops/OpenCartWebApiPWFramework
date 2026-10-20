import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class LoginPage extends BasePage {
  //private locators -
  private readonly emailId: Locator;
  private readonly password: Locator;
  private readonly loginBtn: Locator;
  private readonly forgotenPasswordLink: Locator;
  //private readonly logo: Locator;
  private readonly loginErrorMessage: Locator;

  //constructor of the class and initialize locators
  constructor(page: Page) {
    super(page);
    this.emailId = page.getByRole('textbox', { name: 'E-Mail Address' });
    this.password = page.getByRole('textbox', { name: 'password' });
    this.loginBtn = page.getByRole('button', { name: 'Login' });
    this.forgotenPasswordLink = page.getByRole('link', { name: 'Forgotten Password' }).first();
    //this.logo = page.getByAltText('naveenopencart');
    this.loginErrorMessage = page.locator('.alert.alert-danger.alert-dismissible');
  }
  //constructure is using private locators, called encapsulation

  //public page actions(methods)/behaviour of the page
  async goToLoginPage(): Promise<void> {
    await this.page.goto('opencart/index.php?route=account/login');
  }

  async getLoginPageTitle(): Promise<string> {
    return await this.page.title();
  }

  async isForgotPwdLinkExist(): Promise<boolean> {
    return await this.forgotenPasswordLink.isVisible();
  }

  async doLogin(username: string, password: string): Promise<void> {
    console.log(`user creds: ${username}: ${password}`);
    await this.emailId.fill(username);

    await this.password.fill(password);
    await this.loginBtn.click();
  }
  //this is encapsulation - pubic method using private variables

  async isInvalidErrorDisplayed(): Promise<boolean> {
    return await this.loginErrorMessage.isVisible();
  }
}
