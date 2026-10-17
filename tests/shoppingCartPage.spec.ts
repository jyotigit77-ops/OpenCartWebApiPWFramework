import { env } from 'node:process';
import { test, expect } from '../src/fixtures/pagefixtures.js';
import { CsvHelper } from '../src/utils/Csvhelper.js';

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goToLoginPage();
  await loginPage.doLogin(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);
});

test('comp logo exists on product page', async ({ basePage }) => {
  expect(await basePage.isLogoVisible()).toBeTruthy();
});

test('footer exist on product page', async ({ basePage }) => {
  expect(await basePage.getPageFooterCount()).toBe(16);
});

test('verify product images count', async ({ homePage, searchResultsPage, productInfoPage }) => {
  await homePage.doSearch('macbook');
  await searchResultsPage.selectProduct('MacBook Pro');
  let imgCount = await productInfoPage.getProductImagesCount();
  console.log('total images: ', imgCount);
  expect(imgCount).toBe(4);
});

test('user able to checkout', async ({ homePage, searchResultsPage, productInfoPage, shoppingCartPage }) => {
  await homePage.doSearch('macbook');
  await searchResultsPage.selectProduct('MacBook Pro');
  await productInfoPage.addToCartProduct('2');
  expect.soft(await productInfoPage.isSuccessAlertDisplayed()).toBeTruthy();
  await productInfoPage.selectShoppingCart();
  await shoppingCartPage.applyCouponCode();
  expect.soft(await shoppingCartPage.getAppliedCouponCode()).toBe('12345');
  await shoppingCartPage.applyShippingTaxes();
  expect.soft(await shoppingCartPage.getSelectedCountry()).toBe('India');
  expect.soft(await shoppingCartPage.getSelectedState()).toBe('Bihar');
  expect.soft(await shoppingCartPage.getPostCode()).toBe('411566');
  await shoppingCartPage.applyGiftCertificate();
  expect.soft(await shoppingCartPage.getAppliedCertificateCode()).toBe('123321');
  await shoppingCartPage.checkout();
});
