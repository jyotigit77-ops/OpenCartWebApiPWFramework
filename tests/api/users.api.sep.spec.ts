import { test, expect } from '../../src/fixtures/apifixtures.js';

const TOKEN = process.env.API_Token!;
const AUTH_HEADER = { Authorization: `Bearer ${TOKEN}` };

let userId: number;

test.describe.serial('running e2e go rest crud api tests', () => {
  //test.describe.serial - means it will run in sequencial run
  //it will take worker one only
  //this not exactly right way to write API

  //GET test:
  test('GET API -- get all users', async ({ apiHelper }) => {
    let response = await apiHelper.get('/public/v2/users', AUTH_HEADER);
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  //POST test:
  test('POST API -- create a user', async ({ apiHelper }) => {
    let userData = {
      name: 'Jyoti API',
      email: `automation_${Date.now()}@open.com`,
      gender: 'male',
      status: 'active'
    };

    let response = await apiHelper.post('/public/v2/users', userData, AUTH_HEADER);
    console.log(response.body);
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(userData.name);
    userId = response.body.id;
    console.log('Created User Id: ', userId);
  });

  //PUT test
  test('PUT API -- update a user', async ({ apiHelper }) => {
    let userUpdatedData = {
      name: 'Jyoti API Updated',
      status: 'inactive'
    };

    let response = await apiHelper.put(`/public/v2/users/${userId}`, userUpdatedData, AUTH_HEADER);
    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(userUpdatedData.name);
    expect(response.body.status).toBe(userUpdatedData.status);
  });

  //DELETE test:
  test('DELETE API -- delete a user', async ({ apiHelper }) => {
    let response = await apiHelper.delete(`/public/v2/users/${userId}`, AUTH_HEADER);
    expect(response.status).toBe(204);
  });
});
