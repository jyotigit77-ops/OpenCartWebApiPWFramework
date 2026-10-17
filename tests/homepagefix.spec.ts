import { test, expect } from '../src/fixtures/pagefixtures.js';

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goToLoginPage();
  await loginPage.doLogin('pwtestbatch@open.com', 'pw123');
});

test('home page title test', async ({ homePage }) => {
  const pageTitle = await homePage.getPageTitle();
  console.log('home page title: ', pageTitle);
  expect(pageTitle).toBe('My Account');
});

test('logout link exist test', async ({ homePage }) => {
  expect(await homePage.isLogoutLinkExist()).toBeTruthy();
});

test('home page header exist test', async ({ homePage }) => {
  let allHeaders = await homePage.getHomePageHeaders();
  console.log('home page headers: ', allHeaders);
  expect.soft(allHeaders).toHaveLength(4);
  //assertion for arrays
  expect.soft(allHeaders).toEqual(['My Account', 'My Orders', 'My Affiliate Account', 'Newsletter']);
});
