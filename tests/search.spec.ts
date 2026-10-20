import { env } from 'node:process';
import { test, expect } from '../src/fixtures/pagefixtures.js';
import { CsvHelper } from '../src/utils/Csvhelper.js';

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goToLoginPage();
  await loginPage.doLogin(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);
});

//data provider
const productData = CsvHelper.readCsv('src/data/product.csv');
for (let row of productData) {
  test(`verify search result count - ${row.searchkey} - ${row.productname}`, async ({ homePage, searchResultsPage }) => {
    await homePage.doSearch(row.searchkey);
    expect(await searchResultsPage.getProductSearchResultsCount()).toBe(Number(row.resultcount));
  });
}

for (let row of productData) {
  test(`verify user is able to land on the product page - ${row.searchkey} - ${row.productname}`, async ({ homePage, searchResultsPage, page }) => {
    await homePage.doSearch(row.searchkey);
    await searchResultsPage.selectProduct(row.productname);
    expect(await page.title()).toBe(row.productname);
    //here destructured default page fixture
  });
}

//common test
test('comp logo exists on product page', async ({ basePage }) => {
  expect(await basePage.isLogoVisible()).toBeTruthy();
});

test('footer exist on product page', async ({ basePage }) => {
  expect(await basePage.getPageFooterCount()).toBe(16);
});
