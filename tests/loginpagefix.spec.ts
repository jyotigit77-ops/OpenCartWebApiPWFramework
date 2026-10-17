//spec file creating object of page classes/file and start calling the method, every method return something, for taht you have to write assertions

import { test, expect } from '../src/fixtures/pagefixtures.js';
import { CsvHelper } from '../src/utils/Csvhelper.js';
import { ExcelHelper } from '../src/utils/ExcelHelper.js';
import { JsonHelper } from '../src/utils/JsonHelper.js';

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goToLoginPage();
});

test('login page title test', async ({ loginPage }) => {
  const pageTitle = await loginPage.getLoginPageTitle();
  console.log('login page title: ', pageTitle);
  expect(pageTitle).toBe('Account Login');
});

test('forgot pwd link exist test', async ({ loginPage }) => {
  expect(await loginPage.isForgotPwdLinkExist()).toBeTruthy();
});

test('user able to login to app test', async ({ loginPage, homePage }) => {
  await loginPage.doLogin(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);
  expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy();
  expect.soft(await homePage.getPageTitle()).toBe('My Account');
});

//DD_1. sequence mode -- only 1 test is running with test data one by one using testData from fixture
test('login to app using wrong credentials with data driven test', async ({ loginPage, testData }) => {
  //testdata is kind of array so iterate it using for loop
  for (let row of testData) {
    await loginPage.doLogin(row.username, row.password);
    expect(await loginPage.isInvalidErrorDisplayed()).toBeTruthy();
  }
});

//DD_2. without fixture, parallel mode. read the csv data directly and loop the test method row wise..
let testData = CsvHelper.readCsv('src/data/logindata.csv');
for (let row of testData) {
  test(`invalid login test with - ${row.username} - ${row.password}`, async ({ loginPage }) => {
    await loginPage.doLogin(row.username, row.password);
    expect(await loginPage.isInvalidErrorDisplayed()).toBeTruthy();
  });
}

let loginTestData = ExcelHelper.readExcel('src/data/OpenCartTestData.xlsx');
for (let row of loginTestData) {
  test(`invalid login test with excel data - ${row.username} - ${row.password}`, async ({ loginPage }) => {
    await loginPage.doLogin(row.username, row.password);
    expect(await loginPage.isInvalidErrorDisplayed()).toBeTruthy();
  });
}

let loginJsonData = JsonHelper.readJson('src/data/loginData.json');
for (let row of loginJsonData) {
  test(`invalid login test with json data - ${row.username} - ${row.password}`, async ({ loginPage }) => {
    await loginPage.doLogin(row.username, row.password);
    expect(await loginPage.isInvalidErrorDisplayed()).toBeTruthy();
  });
}

//common test
test('comp logo exists on product page', async ({ basePage }) => {
  expect(await basePage.isLogoVisible()).toBeTruthy();
});

test('footer exist on product page', async ({ basePage }) => {
  expect(await basePage.getPageFooterCount()).toBe(16);
});
