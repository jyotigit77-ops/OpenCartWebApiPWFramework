//spec file creating object of page classes/file and start calling the method, every method return something, for taht you have to write assertions

import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage.js';
import { HomePage } from '../src/pages/HomePage.js';

let loginPage: LoginPage;
let homePage: HomePage;
test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();
  await loginPage.doLogin('pwtestbatch@open.com', 'pw123');
  homePage = new HomePage(page);
});

test('home page title test', async () => {
  const pageTitle = await homePage.getPageTitle();
  console.log('home page title: ', pageTitle);
  expect(pageTitle).toBe('My Account');
});

test('logout link exist test', async () => {
  expect(await homePage.isLogoutLinkExist()).toBeTruthy();
});

test('home page header exist test', async () => {
  let allHeaders = await homePage.getHomePageHeaders();
  console.log('home page headers: ', allHeaders);
  expect.soft(allHeaders).toHaveLength(4);
  //assertion for arrays
  expect.soft(allHeaders).toEqual(['My Account', 'My Orders', 'My Affiliate Account', 'Newsletter']);
});
