import request from 'supertest';
import { setupServer } from '../setupServer.js';
let server;
let conn;
let app;
let testUserId;
let testJournalEntryId;

beforeAll(async () => {
  const serverConn = await setupServer();
  server = serverConn.server;
  conn = serverConn.conn;
  app = serverConn.app;
  console.log('Server started');
});

afterAll(async () => {
  await conn.connection.dropDatabase();
  await conn.connection.close();
  await server.close();
});

test('Users API - GET all users (0 users)', async () => {
  const response = await request(app).get('/users');
  expect(response.status).toBe(400);
});

test('Users API - POST user', async () => {
  const payload = {
    username: 'footest',
    password: 'bartest',
  };
  const responseCreate = await request(app).post('/users').send(payload).set('Content-Type', 'application/json').set('Accept', 'application/json');
  expect(responseCreate.status).toBe(201);

  // Test number users = 1
  const responseUsers = await request(app).get('/users');
  testUserId = responseUsers.body[0]['_id'];
  expect(responseUsers.status).toBe(200);
  expect(responseUsers.body.length).toBe(1);
});

test('Users API - PATCH user', async () => {
  const payload = {
    id: testUserId,
    username: 'footestUpdated',
    isAdmin: true,
  };
  const responsePatch = await request(app).patch('/users').send(payload).set('Content-Type', 'application/json').set('Accept', 'application/json');
  const responseUsersUpdated = await request(app).get('/users');
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
  };
  const responseCreate = await request(app)
    .post('/journalEntry')
    .send(payload)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');
  expect(responseCreate.status).toBe(201);

  // Test number JournalEntry = 1
  const responseJournalEntrys = await request(app).get('/journalEntry');
  expect(responseJournalEntrys.status).toBe(200);
  expect(responseJournalEntrys.body.length).toBe(1);
});

test('Users API - Attempt DELETE user with JournalEntry', async () => {
  const payload = {
    id: testUserId,
  };
  const responseDelete = await request(app).delete('/users').send(payload).set('Content-Type', 'application/json').set('Accept', 'application/json');
  expect(responseDelete.status).toBe(400);
});

test('JournalEntry API - GET all JournalEntry', async () => {
  const response = await request(app).get('/journalEntry');
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
  };
  const responsePatch = await request(app)
    .patch('/journalEntry')
    .send(payload)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');
  const responseJournalEntryUpdated = await request(app).get('/journalEntry');
  expect(responsePatch.status).toBe(200);
  expect(responseJournalEntryUpdated.body[0]['title']).toBe('Foo Title - Updated');
});

test('JournalEntry API - DELETE JournalEntry', async () => {
  const payload = {
    id: testJournalEntryId,
  };
  const responseDelete = await request(app)
    .delete('/journalEntry')
    .send(payload)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');
  expect(responseDelete.status).toBe(200);

  const responseUsersUpdated = await request(app).get('/journalEntry');
  expect(responseUsersUpdated.status).toBe(400);
});

test('Users API - DELETE user', async () => {
  const payload = {
    id: testUserId,
  };
  const responseDelete = await request(app).delete('/users').send(payload).set('Content-Type', 'application/json').set('Accept', 'application/json');
  expect(responseDelete.status).toBe(200);

  const responseUsersUpdated = await request(app).get('/users');
  expect(responseUsersUpdated.status).toBe(400);
});
