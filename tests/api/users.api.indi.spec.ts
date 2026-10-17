//this is the right way to write api

import { test, expect } from '../../src/fixtures/apifixtures.js';

const TOKEN = process.env.API_Token!;
const AUTH_HEADER = { Authorization: `Bearer ${TOKEN}` };

//post-get
//post-put
//post-get
//post-delete
//post is common here

//helper - generic function - heping to creating a fresh user

async function createUser(apiHelper: any) {
  let userData = {
    name: 'Jyoti API',
    email: `automation_${Date.now()}@open.com`,
    gender: 'male',
    status: 'active'
  };

  let response = await apiHelper.post('/public/v2/users', userData, AUTH_HEADER);
  console.log(response.body);
  expect(response.status).toBe(201);
  return response.body;
}

//Test 1: Create user test + verify: AAA
//POST --> userId --> GET/userId -- verify
test('POST -- create a user', async ({ apiHelper }) => {
  //create a user:
  let userResponse = await createUser(apiHelper);

  //get the user
  let response = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
  expect(response.status).toBe(200);
  expect(response.body.name).toBe('Jyoti API');
});

//Test 2: Create user test + verify: AAA
//POST --> userId -->PUT --> GET/userId -- verify
test('PUT -- update a user', async ({ apiHelper }) => {
  //create a user:
  let userResponse = await createUser(apiHelper);
  let userUpdatedData = {
    name: 'Jyoti API Updated',
    status: 'inactive'
  };

  //update the user
  let response = await apiHelper.put(`/public/v2/users/${userResponse.id}`, userUpdatedData, AUTH_HEADER);
  expect(response.status).toBe(200);
  expect(response.body.name).toBe(userUpdatedData.name);
  expect(response.body.status).toBe(userUpdatedData.status);

  //get the user
  let getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
  expect(getResponse.status).toBe(200);
  expect(getResponse.body.name).toBe(userUpdatedData.name);
  expect(getResponse.body.status).toBe(userUpdatedData.status);
});

//Test 3: delete user test + verify: AAA
//POST --> userId -->delete --> GET/userId -- verify
test('DELETE -- delete a user', async ({ apiHelper }) => {
  //create a user:
  let userResponse = await createUser(apiHelper);

  //update the user
  let response = await apiHelper.delete(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
  expect(response.status).toBe(204);

  //get the user
  let getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
  expect(getResponse.status).toBe(404);
  expect(getResponse.body.message).toBe('Resource not found');
});

/**
 * this is the right approach to write test cases, it is following AAA pattern
 *
 * if you not following this and you running your test cases in Cicd then chances are there to fail, there we are giving parallel execution only
 *
 * you need to write chain in order to write the API test
 *
 * at the time of interview expain in correct way
 */
