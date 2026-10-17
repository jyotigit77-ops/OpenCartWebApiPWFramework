import { test, expect } from '@playwright/test';

let AUTH_TOKEN = { Authorization: 'Bearer afa1c2c1386ac3bef518fb3acd7593aa2c13bc07474291100abda16280490aa9' };

test('get user test', async ({ request }) => {
  let response = await request.get('https://gorest.co.in/public/v2/users/', {
    headers: AUTH_TOKEN
  });
  // console.log(response);
  let jsonBody = await response.json();
  console.log(jsonBody);

  console.log(response.status());
  console.log(response.statusText());
  expect(response.status()).toBe(200);
});

test('post user test', async ({ request }) => {
  //JS object
  let userData = {
    name: 'Jyoti pw test new',
    email: `jyoti_${Date.now()}@open.com`,
    gender: 'female',
    status: 'active'
  };

  //JS object to JSON :Serialization //pw will do autoserialization we no need to anything for that
  let response = await request.post('https://gorest.co.in/public/v2/users', {
    headers: AUTH_TOKEN,
    data: userData
  });

  // console.log(response);
  let jsonBody = await response.json();
  console.log(jsonBody);

  console.log(response.status()); //201
  console.log(response.statusText()); //created
});

test('update a user test', async ({ request }) => {
  //JS object
  let userData = {
    name: 'Jyoti pw test new101',
    email: `jyoti_${Date.now()}@open.com`,
    gender: 'female',
    status: 'inactive'
  };

  //JS object to JSON :Serialization //pw will do autoserialization we no need to anything for that
  let response = await request.put('https://gorest.co.in/public/v2/users/8663541', {
    headers: AUTH_TOKEN,
    data: userData
  });

  // console.log(response);
  let jsonBody = await response.json();
  console.log(jsonBody);

  console.log(response.status()); //200
  console.log(response.statusText()); //ok
});

test('delete a user test', async ({ request }) => {
  //JS object to JSON :Serialization //pw will do autoserialization we no need to anything for that
  let response = await request.delete('https://gorest.co.in/public/v2/users/8663541', {
    headers: AUTH_TOKEN
  });

  console.log(response.status()); //204
  console.log(response.statusText()); //No Content
});
