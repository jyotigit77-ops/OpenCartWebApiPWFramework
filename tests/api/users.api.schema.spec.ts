//very imp:
//what is mean by schema and why we should we validate the schema -->
/**
 * schema means - type of response data, genereally we are checking schema for response not for the request
 *
 * schema is contract betwwn client and server this is valled as pact, this is always signed
 *
 * the type of data that we are getting that is always fixed in that contarct - like - id:number, name:string, email: string, status:string
 *
 *what if that contact has bridged , means instaed of id: number they giving id:string, then web application will break, then contact has bridged 
 thats why schema validatio is important,
 another thing is that suppose if there are the 4 required field, for taht as contact has signed, instead 4 what if producer is giving 3 fields only, it will break
 *
 *thats why as tester we have responsiblity to the schema validation
 */

import { ApiHelper } from '../../src/api/ApiHelper.js';
import { test, expect } from '../../src/fixtures/apifixtures.js';
import { Ajv } from 'ajv';

let TOKEN = process.env.API_Token;
let AUTH_HEADER = { Authorization: `Bearer ${TOKEN}` };

//setup the AJV, AJV is the class
let ajv = new Ajv();

//define JSON schema:
let userSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'number'
    },
    name: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    gender: {
      type: 'string'
    },
    status: {
      type: 'string'
    }
  },
  required: ['id', 'name', 'email', 'gender', 'status']
};

let userArraySchema = {
  type: 'array',
  items: userSchema
};

test('GET -- get a user', async ({ apiHelper }) => {
  let userData = {
    name: 'Jyoti pw test',
    email: `jyoti_${Date.now()}@opennew.com`,
    gender: 'female',
    status: 'active'
  };

  //post --> create user
  let createResponse = await apiHelper.post('/public/v2/users', userData, AUTH_HEADER);
  console.log(createResponse);
  expect(createResponse.status).toBe(201);
  let userId = createResponse.body.id;
  console.log('userId: ', userId);

  //get --> get user
  let getUserResponse = await apiHelper.get(`/public/v2/users/${userId}`, AUTH_HEADER);
  expect(getUserResponse.status).toBe(200);

  //schema validation code:
  let validate = ajv.compile(userSchema);
  //validate behave like function expression
  let isSchemaValid = validate(getUserResponse.body);

  if (!isSchemaValid) {
    console.log('schema error', validate.errors);
  }

  expect(isSchemaValid).toBeTruthy();
});

//if you in the schema, if you changing status:"string" to "boolean" , then in the console it will show status must be boolean, what else you need
//this is the only schema validation

test('GET -- get all user', async ({ apiHelper }) => {
  let getUsersResponse = await apiHelper.get(`/public/v2/users/`, AUTH_HEADER);
  expect(getUsersResponse.status).toBe(200);

  //schema validation code:
  let validate = ajv.compile(userArraySchema);
  //validate behave like function expression
  let isSchemaValid = validate(getUsersResponse.body);

  if (!isSchemaValid) {
    console.log('schema error', validate.errors);
  }

  expect(isSchemaValid).toBeTruthy();
});
