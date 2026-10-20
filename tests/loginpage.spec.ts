//spec file creating object of page classes/file and start calling the method, every method return something, for taht you have to write assertions

import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage.js';
import { HomePage } from '../src/pages/HomePage.js';

let loginPage: LoginPage;
let homePage: HomePage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();
  homePage = new HomePage(page);
});

test.skip('login page title test', async () => {
  const pageTitle = await loginPage.getLoginPageTitle();
  console.log('login page title: ', pageTitle);
  expect(pageTitle).toBe('Account Login');
});

test.skip('forgot pwd link exist test', async () => {
  expect(await loginPage.isForgotPwdLinkExist()).toBeTruthy();
});

test.skip('user able to login to app test', async () => {
  await loginPage.doLogin('pwtestbatch@open.com', 'pw123');
  expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy();
  //expect.soft(await homePage.getHomePageTitle()).toBe('My Account');
});
