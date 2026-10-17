import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { HomePage } from '../pages/HomePage.js';
import { CsvHelper } from '../utils/Csvhelper.js';
import { SearchResultsPage } from '../pages/SearchResultsPage.js';
import { ProductInfoPage } from '../pages/ProductInfoPage.js';
import { BasePage } from '../pages/BasePage.js';
import { ShoppingCartPage } from '../pages/ShoppingCartPage.js';

//define the type for page fixtures:
type pageFixtures = {
  basePage: BasePage;
  loginPage: LoginPage;
  homePage: HomePage;
  searchResultsPage: SearchResultsPage;
  productInfoPage: ProductInfoPage;
  shoppingCartPage: ShoppingCartPage;
  testData: Record<string, string>[];
  //record is the existing collection in the javascript, this will help you to store data kind of data that you fetching from csv file
  //<string,string> means if you passing 100 as well it will be conside as string, this is kind of header and valie schema
};

//extend Playwright baseTest:
export let test = baseTest.extend<pageFixtures>({
  //anonimus function with function expression loginPage
  loginPage: async ({ page }, use) => {
    let loginPage = new LoginPage(page);
    await use(loginPage);
    //use: supply data/page object to test methods using 'use' inbuilt callback function, this is supplied by automatically by pw
  },

  homePage: async ({ page }, use) => {
    let homePage = new HomePage(page);
    await use(homePage);
  },

  searchResultsPage: async ({ page }, use) => {
    let searchResultsPage = new SearchResultsPage(page);
    await use(searchResultsPage);
  },

  productInfoPage: async ({ page }, use) => {
    let productInfoPage = new ProductInfoPage(page);
    await use(productInfoPage);
  },
  basePage: async ({ page }, use) => {
    let basePage = new BasePage(page);
    await use(basePage);
  },
  shoppingCartPage: async ({ page }, use) => {
    let shoppingCartPage = new ShoppingCartPage(page);
    await use(shoppingCartPage);
  },

  testData: async ({}, use) => {
    let testData = CsvHelper.readCsv('src/data/logindata.csv');
    await use(testData);
  }
});

export { expect } from '@playwright/test';

//here in the import I renamed or overrided test with baseTest beacuse I dont want to use inbuilt test fixtures, I want my own custom fixtures thats why used baseTest, any name you can use
//any name here

//extend is the function in which we are passing defined page fixtures<pageFixtures>() like generic fixture we can provide

//this is like one time

//fixtures are helping me to maintain all the page objects at the common place and supplying to each and every test, so that each and every page
//I dont need to create objects unneccessory, its at the common place
