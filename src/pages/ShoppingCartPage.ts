import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class ShoppingCartPage extends BasePage {
  //private locators -

  private readonly useCouponCodeLink: Locator;
  private readonly couponCode: Locator;
  private readonly estimateShippingTaxesLink: Locator;
  private readonly country: Locator;
  private readonly state: Locator;
  private readonly postCode: Locator;
  private readonly useGiftCertificateLink: Locator;
  private readonly giftCertificateCode: Locator;
  private readonly checkoutlink: Locator;

  //constructor of the class and initialize locators
  constructor(page: Page) {
    super(page);

    this.useCouponCodeLink = page.getByRole('link', { name: 'Use Coupon Code' });
    this.couponCode = page.getByRole('textbox', { name: 'Enter your coupon here' });
    this.estimateShippingTaxesLink = page.getByRole('link', { name: 'Estimate Shipping & Taxes' });
    this.country = page.getByRole('combobox', { name: '* Country' });
    this.state = page.getByRole('combobox', { name: '* Region / State' });
    this.postCode = page.locator('input#input-postcode');
    this.useGiftCertificateLink = page.getByRole('link', { name: 'Use Gift Certificate' });
    this.giftCertificateCode = page.getByRole('textbox', { name: 'Enter your gift certificate code here' });
    this.checkoutlink = page.locator('div.buttons div a').nth(1);
  }

  //page action
  async applyCouponCode(): Promise<void> {
    await this.useCouponCodeLink.click();
    await this.couponCode.fill('12345');
  }

  async getAppliedCouponCode(): Promise<string> {
    let appliedCoupCode = await this.couponCode.inputValue();
    return appliedCoupCode;
  }

  async applyShippingTaxes(): Promise<void> {
    await this.estimateShippingTaxesLink.click();
    await this.country.selectOption({ label: 'India' });
    await this.state.selectOption({ label: 'Bihar' });
    await this.postCode.fill('411566');
  }

  async getSelectedCountry(): Promise<string> {
    //to get selected option from dropdown
    return (await this.country.locator('option:checked').textContent())?.trim() ?? '';
  }

  async getSelectedState(): Promise<string> {
    //to get selected option from dropdown
    return (await this.state.locator('option:checked').textContent())?.trim() ?? '';
  }

  async getPostCode(): Promise<string> {
    return await this.postCode.inputValue();
  }

  async applyGiftCertificate(): Promise<void> {
    await this.useGiftCertificateLink.click();
    await this.giftCertificateCode.fill('123321');
  }

  async getAppliedCertificateCode(): Promise<string> {
    return await this.giftCertificateCode.inputValue();
  }

  async checkout(): Promise<void> {
    await this.checkoutlink.click();
  }
}
