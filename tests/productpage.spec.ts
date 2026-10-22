import { env } from 'node:process';
import { test, expect } from '../src/fixtures/pagefixtures.js';
import { CsvHelper } from '../src/utils/Csvhelper.js';

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goToLoginPage();
  await loginPage.doLogin(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);
});

test('@sanity comp logo exists on product page', async ({ basePage }) => {
  expect(await basePage.isLogoVisible()).toBeTruthy();
});

test('@sanity footer exist on product page', async ({ basePage }) => {
  expect(await basePage.getPageFooterCount()).toBe(16);
});

test('@smoke verify product images count', async ({ homePage, searchResultsPage, productInfoPage }) => {
  await homePage.doSearch('macbook');
  await searchResultsPage.selectProduct('MacBook Pro');
  let imgCount = await productInfoPage.getProductImagesCount();
  console.log('total images: ', imgCount);
  expect(imgCount).toBe(4);
});

test('@smoke verify product information/Data', async ({ homePage, searchResultsPage, productInfoPage }) => {
  await homePage.doSearch('macbook');
  await searchResultsPage.selectProduct('MacBook Pro');
  let actualProductInfoMap = await productInfoPage.getProductInfo();
  console.log('Actual product details: ', actualProductInfoMap);
  expect.soft(actualProductInfoMap.get('ProductHeader')).toBe('MacBook Pro');
  expect.soft(actualProductInfoMap.get('Brand')).toBe('Apple');
  expect.soft(actualProductInfoMap.get('Product Code')).toBe('Product 18');
  expect.soft(actualProductInfoMap.get('Reward Points')).toBe('800');
  expect.soft(actualProductInfoMap.get('Product Price')).toBe('$2,000.00');
  expect.soft(actualProductInfoMap.get('ExTaxPrice')).toBe('$2,000.00');
});

test('@regression user able to add product in cart', async ({ homePage, searchResultsPage, productInfoPage }) => {
  await homePage.doSearch('macbook');
  await searchResultsPage.selectProduct('MacBook Pro');
  await productInfoPage.addToCartProduct('2');
  expect(await productInfoPage.isSuccessAlertDisplayed()).toBeTruthy();
  await productInfoPage.selectShoppingCart();
});
