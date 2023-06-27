import request from 'supertest';
import { setupServer } from '../setupServer.js';
let server;
let conn;
let app;
let testUserId;
let testJournalEntryId;
let accessToken;
let testTrailId;

beforeAll(async () => {
  const serverConn = await setupServer();
  server = serverConn.server;
  conn = serverConn.conn;
  app = serverConn.app;
  console.log('Server started');

  const userPayload = {
    username: 'footest',
    password: 'bartest',
  };
  const responseUserCreate = await request(app)
    .post('/users')
    .send(userPayload)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');

  const loginPayload = {
    username: 'footest',
    password: 'bartest',
  };

  const responseLogin = await request(app).post('/auth').send(loginPayload).set('Content-Type', 'application/json').set('Accept', 'application/json');

  accessToken = responseLogin.body.accessToken;

  const responseUsers = await request(app)
    .get('/users')
    .set('Authorization', 'Bearer ' + accessToken);
  testUserId = responseUsers.body[0]['_id'];

  const trailPayload = {
    name: 'Pacific Crest Trail',
  };
  const responseTrailCreate = await request(app)
    .post('/trails')
    .send(trailPayload)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer ' + accessToken);

  const responseTrails = await request(app)
    .get('/trails')
    .set('Authorization', 'Bearer ' + accessToken);
  testTrailId = responseTrails.body[0]['_id'];
});

afterAll(async () => {
  await conn.connection.dropDatabase();
  await conn.connection.close();
  await server.close();
});

test('Users API - GET all users (1)', async () => {
  const response = await request(app)
    .get('/users')
    .set('Authorization', 'Bearer ' + accessToken);
  expect(response.status).toBe(200);
  expect(response.body.length).toBe(1);
});

test('Users API - PATCH user', async () => {
  const payload = {
    id: testUserId,
    username: 'footestUpdated',
    isAdmin: true,
  };

  const responsePatch = await request(app)
    .patch('/users')
    .send(payload)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer ' + accessToken);
  const responseUsersUpdated = await request(app)
    .get('/users')
    .set('Authorization', 'Bearer ' + accessToken);
  expect(responsePatch.status).toBe(200);
  expect(responseUsersUpdated.body[0]['username']).toBe('footestUpdated');
  expect(responseUsersUpdated.body[0]['isAdmin']).toBe(true);
});

// Run JournalEntry tests before testing DELETE User

test('JournalEntry API - POST JournalEntry', async () => {
  const payload = {
    title: 'Foo Title',
    date: '2023-01-01',
    journalText: 'Lorem ipsum dolor sit',
    user: testUserId,
    trail: testTrailId,
  };
  const responseCreate = await request(app)
    .post('/journalEntrys')
    .send(payload)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer ' + accessToken);
  expect(responseCreate.status).toBe(201);

  // Test number JournalEntry = 1
  const responseJournalEntrys = await request(app)
    .get('/journalEntrys')
    .set('Authorization', 'Bearer ' + accessToken);
  expect(responseJournalEntrys.status).toBe(200);
  expect(responseJournalEntrys.body.length).toBe(1);
});

test('Users API - Attempt DELETE user with JournalEntry', async () => {
  const payload = {
    id: testUserId,
  };
  const responseDelete = await request(app)
    .delete('/users')
    .send(payload)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer ' + accessToken);
  expect(responseDelete.status).toBe(400);
});

test('JournalEntry API - GET all JournalEntry', async () => {
  const response = await request(app)
    .get('/journalEntrys')
    .set('Authorization', 'Bearer ' + accessToken);
  testJournalEntryId = response.body[0]['_id'];
  expect(response.status).toBe(200);
  expect(response.body.length).toBe(1);
});

test('JournalEntry API - PATCH JournalEntry', async () => {
  const payload = {
    id: testJournalEntryId,
    title: 'Foo Title - Updated',
    date: '2023-01-01',
    journalText: 'Lorem ipsum dolor sit',
    user: testUserId,
    trail: testTrailId,
  };
  const responsePatch = await request(app)
    .patch('/journalEntrys')
    .send(payload)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer ' + accessToken);

  const responseJournalEntryUpdated = await request(app)
    .get('/journalEntrys')
    .set('Authorization', 'Bearer ' + accessToken);

  expect(responsePatch.status).toBe(200);
  expect(responseJournalEntryUpdated.body[0]['title']).toBe('Foo Title - Updated');
});

test('JournalEntry API - DELETE JournalEntry', async () => {
  const payload = {
    id: testJournalEntryId,
  };
  const responseDelete = await request(app)
    .delete('/journalEntrys')
    .send(payload)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer ' + accessToken);
  expect(responseDelete.status).toBe(200);

  const responseUsersUpdated = await request(app)
    .get('/journalEntrys')
    .set('Authorization', 'Bearer ' + accessToken);
  expect(responseUsersUpdated.status).toBe(400);
});

test('Users API - DELETE user', async () => {
  const payload = {
    id: testUserId,
  };
  const responseDelete = await request(app)
    .delete('/users')
    .send(payload)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer ' + accessToken);
  expect(responseDelete.status).toBe(200);

  const responseUsersUpdated = await request(app)
    .get('/users')
    .set('Authorization', 'Bearer ' + accessToken);
  expect(responseUsersUpdated.status).toBe(400);
});
