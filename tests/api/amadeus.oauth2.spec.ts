//very imp

import { test, expect } from '@playwright/test';

let OUTH_CONFIG = {
  tokenURL: 'https://test.api.amadeus.com/v1/security/oauth2/token',
  clientId: process.env.OAUTH_CLIENT_ID!,
  clientSecret: process.env.OAUTH_CLIENT_SECRET!,
  grantType: process.env.GRANT_TYPE!
};

let accessToken: string;

test.beforeEach('POST -- generate the access token', async ({ request }) => {
  let response = await request.post(OUTH_CONFIG.tokenURL, {
    form: {
      grant_type: OUTH_CONFIG.grantType,
      client_id: OUTH_CONFIG.clientId,
      client_secret: OUTH_CONFIG.clientSecret
    }
  });
  expect(response.status()).toBe(200);
  let jsonResponse = await response.json();
  console.log(jsonResponse);
  accessToken = jsonResponse.access_token;
});

test.skip('GET -- get location', async ({ request }) => {
  //https://test.api.amadeus.com/v1/referance-data/locations?subtype=CITY,AIRPORT&keyword=MUC&countryCode=DE
  //after the '?' this is called the query parameter, and query parameter always in key and value pair and it is seperated with '&'
  //means they are trying to go on all the locations and filter with given query parameter
  let baseURL = 'https://test.api.amadeus.com';
  let endPointURL = '/v1/referance-data/locations';

  let queryParam = {
    subType: 'CITY,AIRPORT',
    keyword: 'MUC',
    countryCode: 'DE'
  };

  //now we need to combine all together to create a complete url

  let locationResponse = await request.get(`${baseURL}${endPointURL}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    params: queryParam //how we have headers so same way we have param for query parameter in pw
  });

  expect(locationResponse.status).toBe(200);
  console.log(await locationResponse.json());
  //so now no need to worry about token expiry, before each all test above test will execute and all the time generate new token
  //we generate access token dynamically
  //for path parameter also yu need to do same thing

  let locationJson = await locationResponse.json();
  console.log(locationJson.meta.count);
  expect(locationJson.meta.count).toBe(2);

  //with array
  let location1 = locationJson.data[0];
  console.log(location1);
});
