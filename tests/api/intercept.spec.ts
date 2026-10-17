//what is intercept
// go to web application --> intercept the internal nw calls, in the inspect we have network tab we can see all the call, that we
//are getting here

//here we need to use star wild cart patterns means matches all the urls: ** = wildcard

import { test, expect } from '@playwright/test';

//intercept the network calls....
test('intercept and log the request', async ({ page }) => {
  await page.route('**/*', async (route) => {
    console.log(route.request().method(), route.request().url());
    await route.continue(); //url1 --capture and continue./url -2 --capture and continue ....keep doing this
    //methods() means - http methods-gget, post , put..
  });
  //route() it will help me to intercept all the nw calls

  //now this route litsner running in the backgroud and it will capture everything

  await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=common/home');
});

//here we are give **/* meas it will capure everything, if you give .png or .jpg it will capture that data, depends what exactly we are writting
//this is just for analyse something from logs, thts why we can use this

//-------------
//intercept with mocking - basic level of mocking
//what is mean by mock: means we are creating fake data here/facke response/dummy response, concept of mock:

//sometimes i'm writting some TCs and have to intergrate with payments apis, like as tester you are making the payment and you will get the details from icici server,
//so banck apis will not give you apis on qa or stage environmnet, then how we test intergation testing.
//so here i have to replicate the back server,  with the help of my automation, so in that case automation test engineers create mock server or create a mock
//we will supply the data to mock, and we are getting sucessully transaction done from mock , so in the pw we have this feature natively
//backend devs, web devs also then automation engineers also use the mock.
//in the playwright we have this feature natively

test('mock search data api', async ({ page }) => {
  let fakeProducts = [
    { name: 'fake MacBook Pro', price: '$599' },
    { name: 'fake iphone 20', price: '$999' }
  ];

  await page.route('**/index.php?route=product/search&search=macbook', (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(fakeProducts)
    }); //this fulfill method will help me to supply the response

    //here if someone trying to call this api/url index.php?route=product/search&search=macbook, then give me the above fakeProducts details
  });

  //so above litsner will run in the backend

  await page.goto('https://naveenautomationlabs.com/index.php?route=product/search&search=macbook');
  //now this url behave like mock data/fake data
  //check the browser

  await page.pause();

  //how to capture fake product:
  let fakeJson = await page.evaluate(async () => {
    let fakeResponse = await fetch('https://naveenautomationlabs.com/index.php?route=product/search&search=macbook'); //supply the url it will give you details which is avialable on web page
    return await fakeResponse.json();
  });
  console.log('fake json response: ', fakeJson);
});

//this mocking data we can use to to create your test data on the fly, dont you think this is the good apportunity
